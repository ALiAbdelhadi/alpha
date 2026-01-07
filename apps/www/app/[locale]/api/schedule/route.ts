import { meetingRequestSchema, standaloneMeetingSchema } from "@/lib/validations/contact"
import { prisma } from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (body.name && body.email && body.scheduledDate && body.scheduledTime) {
            const validatedData = standaloneMeetingSchema.parse(body)

            const scheduledDate = new Date(validatedData.scheduledDate)

            const now = new Date()
            if (scheduledDate < now) {
                return NextResponse.json(
                    { success: false, message: "Cannot schedule meetings in the past" },
                    { status: 400 }
                )
            }

            const threeMonthsFromNow = new Date()
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
            if (scheduledDate > threeMonthsFromNow) {
                return NextResponse.json(
                    { success: false, message: "Please select a date within the next 3 months" },
                    { status: 400 }
                )
            }

            const userAgent = request.headers.get("user-agent") || undefined
            const forwardedFor = request.headers.get("x-forwarded-for")
            const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined
            const referer = request.headers.get("referer") || undefined

            const submission = await prisma.contactSubmission.create({
                data: {
                    name: validatedData.name,
                    email: validatedData.email,
                    message: validatedData.message || "Meeting request from schedule page",
                    locale: body.locale || "en",
                    userAgent,
                    ipAddress,
                    referrer: referer,
                    priority: "HIGH",
                },
            })

            const meeting = await prisma.meeting.create({
                data: {
                    title: `Meeting with ${validatedData.name}`,
                    type: "CONSULTATION",
                    scheduledDate,
                    scheduledTime: validatedData.scheduledTime,
                    guestName: validatedData.name,
                    guestEmail: validatedData.email,
                    submissionId: submission.id,
                    notes: validatedData.message,
                },
            })
            const admins = await prisma.user.findMany({
                where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
                select: { id: true },
            })

            await Promise.all(
                admins.map((admin: { id: string }) =>
                    prisma.notification.create({
                        data: {
                            type: "NEW_MEETING",
                            title: "New Meeting Request",
                            message: `${validatedData.name} scheduled a meeting on ${scheduledDate.toLocaleDateString()} at ${validatedData.scheduledTime}`,
                            userId: admin.id,
                            entityType: "meeting",
                            entityId: meeting.id,
                        },
                    })
                )
            )

            return NextResponse.json(
                {
                    success: true,
                    meetingId: meeting.id,
                    message: "Meeting scheduled successfully. We'll confirm the details shortly.",
                },
                { status: 201 }
            )
        } else {
            const validatedData = meetingRequestSchema.parse(body)

            const submission = await prisma.contactSubmission.findUnique({
                where: { id: validatedData.contactSubmissionId },
            })

            if (!submission) {
                return NextResponse.json(
                    { success: false, message: "Contact submission not found" },
                    { status: 404 }
                )
            }

            const dateParts = validatedData.preferredDate.split('-')
            const requestedDate = new Date(
                parseInt(dateParts[0]),
                parseInt(dateParts[1]) - 1,
                parseInt(dateParts[2]),
                12, 0, 0
            )

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (requestedDate < today) {
                return NextResponse.json(
                    { success: false, message: "Cannot schedule meetings in the past" },
                    { status: 400 }
                )
            }

            const threeMonthsFromNow = new Date()
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
            threeMonthsFromNow.setHours(23, 59, 59, 999)
            if (requestedDate > threeMonthsFromNow) {
                return NextResponse.json(
                    { success: false, message: "Please select a date within the next 3 months" },
                    { status: 400 }
                )
            }

            const meeting = await prisma.meeting.create({
                data: {
                    title: `Meeting with ${submission.name}`,
                    type: "CONSULTATION",
                    scheduledDate: requestedDate,
                    scheduledTime: validatedData.preferredTime,
                    guestName: submission.name,
                    guestEmail: submission.email,
                    submissionId: submission.id,
                    notes: validatedData.notes,
                },
            })

            const admins = await prisma.user.findMany({
                where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
                select: { id: true },
            })

            await Promise.all(
                admins.map((admin: { id: string }) =>
                    prisma.notification.create({
                        data: {
                            type: "NEW_MEETING",
                            title: "New Meeting Request",
                            message: `${submission.name} requested a meeting on ${requestedDate.toLocaleDateString()}`,
                            userId: admin.id,
                            entityType: "meeting",
                            entityId: meeting.id,
                        },
                    })
                )
            )

            return NextResponse.json(
                {
                    success: true,
                    meetingId: meeting.id,
                    message: "Meeting request submitted successfully. We'll confirm the details shortly.",
                },
                { status: 201 }
            )
        }

    } catch (error) {
        console.error("Meeting request error:", error)

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    errors: error.issues.reduce((acc: Record<string, string>, err: any) => {
                        acc[err.path[0]] = err.message
                        return acc
                    }, {}),
                },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred. Please try again later.",
            },
            { status: 500 }
        )
    }
}