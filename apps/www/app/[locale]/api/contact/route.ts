import { contactFormSchema } from "@/lib/validations/contact"
import {
    BudgetRange,
    prisma,
    ProjectTimeline,
    ServiceType,
    type Prisma,
} from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

const SERVICE_TYPE_MAP: Record<NonNullable<Prisma.ContactSubmissionCreateInput["serviceInterest"]>, ServiceType> = {
    WEB_DEVELOPMENT: ServiceType.WEB_DEVELOPMENT,
    ECOMMERCE: ServiceType.ECOMMERCE,
    MULTILINGUAL: ServiceType.MULTILINGUAL,
    UI_UX: ServiceType.UI_UX,
    OTHER: ServiceType.OTHER,
}

const PROJECT_TIMELINE_MAP: Record<NonNullable<Prisma.ContactSubmissionCreateInput["projectTimeline"]>, ProjectTimeline> = {
    IMMEDIATE: ProjectTimeline.IMMEDIATE,
    SOON: ProjectTimeline.SOON,
    PLANNING: ProjectTimeline.PLANNING,
    EXPLORING: ProjectTimeline.EXPLORING,
}

const BUDGET_RANGE_MAP: Record<NonNullable<Prisma.ContactSubmissionCreateInput["budget"]>, BudgetRange> = {
    UNDER_10K: BudgetRange.UNDER_10K,
    B_10K_25K: BudgetRange.B_10K_25K,
    B_25K_50K: BudgetRange.B_25K_50K,
    OVER_50K: BudgetRange.OVER_50K,
}

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

        const serviceInterestKey = validatedData.serviceInterest?.toUpperCase().replace(/-/g, "_") as keyof typeof SERVICE_TYPE_MAP | undefined
        const projectTimelineKey = validatedData.projectTimeline?.toUpperCase() as keyof typeof PROJECT_TIMELINE_MAP | undefined
        const budgetKey = validatedData.budget?.toUpperCase() as keyof typeof BUDGET_RANGE_MAP | undefined

        const submissionData: Prisma.ContactSubmissionCreateInput = {
            name: validatedData.name,
            phone: validatedData.phone,
            message: validatedData.message,
            serviceInterest: serviceInterestKey ? SERVICE_TYPE_MAP[serviceInterestKey] : undefined,
            projectTimeline: projectTimelineKey ? PROJECT_TIMELINE_MAP[projectTimelineKey] : undefined,
            budget: budgetKey ? BUDGET_RANGE_MAP[budgetKey] : undefined,
            locale: body.locale || "en",
            userAgent,
            ipAddress,
            referrer: referer,
            utmSource: body.utmSource,
            utmMedium: body.utmMedium,
            utmCampaign: body.utmCampaign,
            priority: validatedData.projectTimeline === "immediate" ? "URGENT" :
                validatedData.projectTimeline === "soon" ? "HIGH" : "MEDIUM",
        }

        const submission = await prisma.contactSubmission.create({
            data: submissionData,
        })

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
                    errors: error.issues.reduce((acc: Record<string, string>, issue) => {
                        const [firstPath] = issue.path
                        if (typeof firstPath === "string") {
                            acc[firstPath] = issue.message
                        }
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
