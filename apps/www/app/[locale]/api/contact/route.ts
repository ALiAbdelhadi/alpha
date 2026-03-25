/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactFormSchema } from "@/lib/validations/contact"
import { prisma } from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const origin = request.headers.get("origin")
        const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL].filter(
            (value): value is string => !!value
        )

        if (allowedOrigins.length > 0 && (!origin || !allowedOrigins.includes(origin))) {
            return NextResponse.json(
                { success: false, message: "Forbidden" },
                { status: 403 }
            )
        }

        const validatedData = contactFormSchema.parse(body)

        if (validatedData.website && validatedData.website.length > 0) {
            return NextResponse.json(
                { success: true, message: "Thank you for your submission" },
                { status: 200 }
            )
        }

        const userAgent = request.headers.get("user-agent") || undefined
        const forwardedFor = request.headers.get("x-forwarded-for")
        const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined
        const referer = request.headers.get("referer") || undefined

        const submission = await prisma.contactSubmission.create({
            data: {
                name: validatedData.name,
                phone: validatedData.phone,
                message: validatedData.message,
                serviceInterest: validatedData.serviceInterest
                    ? validatedData.serviceInterest.toUpperCase().replace(/-/g, "_") as any
                    : undefined,
                projectTimeline: validatedData.projectTimeline
                    ? validatedData.projectTimeline.toUpperCase() as any
                    : undefined,
                budget: validatedData.budget
                    ? validatedData.budget.toUpperCase() as any
                    : undefined,
                locale: body.locale || "en",
                userAgent,
                ipAddress,
                referrer: referer,
                utmSource: body.utmSource,
                utmMedium: body.utmMedium,
                utmCampaign: body.utmCampaign,
                priority: validatedData.projectTimeline === "immediate" ? "URGENT" :
                    validatedData.projectTimeline === "soon" ? "HIGH" : "MEDIUM",
            },
        } as any)

        const admins = await prisma.user.findMany({
            where: { role: { in: ["ADMIN", "SUPERADMIN"] } },
            select: { id: true },
        })

        await Promise.all(
            admins.map((admin: { id: string }) =>
                prisma.notification.create({
                    data: {
                        type: "NEW_CONTACT",
                        title: "New Contact Submission",
                        message: `${validatedData.name} submitted a contact form`,
                        userId: admin.id,
                        entityType: "contact",
                        entityId: submission.id,
                    },
                })
            )
        )

        if (validatedData.requestMeeting && validatedData.preferredDate && validatedData.preferredTime) {
            const dateParts = validatedData.preferredDate.split('-')
            const scheduledDate = new Date(
                parseInt(dateParts[0]),
                parseInt(dateParts[1]) - 1,
                parseInt(dateParts[2]),
                12, 0, 0
            )

            await prisma.meeting.create({
                data: {
                    title: `Discovery Call - ${validatedData.name}`,
                    type: "DISCOVERY",
                    scheduledDate,
                    scheduledTime: validatedData.preferredTime,
                    guestName: validatedData.name,
                    submissionId: submission.id,
                    notes: validatedData.message,
                },
            })

            await Promise.all(
                admins.map((admin: { id: string }) =>
                    prisma.notification.create({
                        data: {
                            type: "NEW_MEETING",
                            title: "New Meeting Request",
                            message: `${validatedData.name} requested a meeting`,
                            userId: admin.id,
                            entityType: "meeting",
                            entityId: submission.id,
                        },
                    })
                )
            )
        }

        return NextResponse.json(
            {
                success: true,
                submissionId: submission.id,
                message: "Thank you for your submission. We'll get back to you within 24 hours.",
            },
            { status: 201 }
        )

    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.error("Contact submission error:", error)
        }

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
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