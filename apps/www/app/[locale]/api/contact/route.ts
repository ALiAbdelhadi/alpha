/* eslint-disable @typescript-eslint/no-explicit-any */
import { contactFormSchema } from "@/lib/validations/contact"
import { prisma } from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input
        const validatedData = contactFormSchema.parse(body)

        // Honeypot check - if website field is filled, it's likely a bot
        if (validatedData.website && validatedData.website.length > 0) {
            console.log("Honeypot triggered - potential spam")
            return NextResponse.json(
                { success: true, message: "Thank you for your submission" },
                { status: 200 }
            )
        }

        // Extract metadata
        const userAgent = request.headers.get("user-agent") || undefined
        const forwardedFor = request.headers.get("x-forwarded-for")
        const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined
        const referer = request.headers.get("referer") || undefined

        // Create contact submission
        const submission = await prisma.contactSubmission.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                message: validatedData.message,
                serviceInterest: validatedData.serviceInterest
                    ? validatedData.serviceInterest.toUpperCase().replace(/-/g, "_") as any
                    : undefined,
                projectTimeline: validatedData.projectTimeline
                    ? validatedData.projectTimeline.toUpperCase() as any
                    : undefined,
                locale: body.locale || "en",
                userAgent,
                ipAddress,
                referrer: referer,
                utmSource: body.utmSource,
                utmMedium: body.utmMedium,
                utmCampaign: body.utmCampaign,
                // Auto-prioritize based on timeline
                priority: validatedData.projectTimeline === "immediate" ? "URGENT" :
                    validatedData.projectTimeline === "soon" ? "HIGH" : "MEDIUM",
            },
        })

        // Create notification for admins
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

        // If meeting was requested, create meeting request
        if (validatedData.requestMeeting && validatedData.preferredDate && validatedData.preferredTime) {
            // Convert YYYY-MM-DD to Date object (set to noon to avoid timezone issues)
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
                    guestEmail: validatedData.email,
                    submissionId: submission.id,
                    notes: validatedData.message,
                },
            })

            // Create meeting notification
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
        console.error("Contact submission error:", error)

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

/**
 * Rate limiting implementation (currently not active)
 * To enable: Add middleware check at the start of POST handler
 * Example: if (!checkRateLimit(ipAddress)) return NextResponse.json({...}, {status: 429})
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const limit = rateLimitMap.get(ip)

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 })
        return true
    }

    if (limit.count >= 3) {
        return false
    }

    limit.count++
    return true
}