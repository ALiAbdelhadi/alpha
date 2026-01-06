import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { meetingRequestSchema, standaloneMeetingSchema } from "@/lib/validations/contact"
import { ZodError } from "zod"

/**
 * POST /api/schedule
 * Handle standalone meeting requests (from schedule page)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Check if this is a standalone meeting (has name/email) or linked to existing submission
        if (body.name && body.email && body.scheduledDate && body.scheduledTime) {
            // Standalone meeting request
            const validatedData = standaloneMeetingSchema.parse(body)

            // Parse the scheduled datetime
            const scheduledDate = new Date(validatedData.scheduledDate)

            // Check if date is in the past
            const now = new Date()
            if (scheduledDate < now) {
                return NextResponse.json(
                    { success: false, message: "Cannot schedule meetings in the past" },
                    { status: 400 }
                )
            }

            // Check if date is too far in the future (e.g., more than 3 months)
            const threeMonthsFromNow = new Date()
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
            if (scheduledDate > threeMonthsFromNow) {
                return NextResponse.json(
                    { success: false, message: "Please select a date within the next 3 months" },
                    { status: 400 }
                )
            }

            // Create contact submission first
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

            // Create meeting with precise time
            const meeting = await prisma.meeting.create({
                data: {
                    title: `Meeting with ${validatedData.name}`,
                    type: "CONSULTATION",
                    scheduledDate,
                    scheduledTime: validatedData.scheduledTime, // Store as "HH:MM" format
                    guestName: validatedData.name,
                    guestEmail: validatedData.email,
                    submissionId: submission.id,
                    notes: validatedData.message,
                },
            })

            // Create notifications for admins
            const admins = await prisma.user.findMany({
                where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
                select: { id: true },
            })

            await Promise.all(
                admins.map((admin) =>
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
            // Legacy: Meeting request linked to existing contact submission
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

            // Convert YYYY-MM-DD to Date object
            const dateParts = validatedData.preferredDate.split('-')
            const requestedDate = new Date(
                parseInt(dateParts[0]),
                parseInt(dateParts[1]) - 1,
                parseInt(dateParts[2]),
                12, 0, 0
            )

            // Check if date is in the past
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (requestedDate < today) {
                return NextResponse.json(
                    { success: false, message: "Cannot schedule meetings in the past" },
                    { status: 400 }
                )
            }

            // Check if date is too far in the future
            const threeMonthsFromNow = new Date()
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
            threeMonthsFromNow.setHours(23, 59, 59, 999)
            if (requestedDate > threeMonthsFromNow) {
                return NextResponse.json(
                    { success: false, message: "Please select a date within the next 3 months" },
                    { status: 400 }
                )
            }

            // Create meeting
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

            // Create notifications for admins
            const admins = await prisma.user.findMany({
                where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
                select: { id: true },
            })

            await Promise.all(
                admins.map((admin) =>
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
                    errors: error.errors.reduce((acc, err) => {
                        acc[err.path[0]] = err.message
                        return acc
                    }, {} as Record<string, string>),
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