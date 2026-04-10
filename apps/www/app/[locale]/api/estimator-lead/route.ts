import { estimatorLeadSchema } from "@/lib/validations/estimator-lead"
import { prisma } from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { enforceRateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
    try {
        const rl = await enforceRateLimit(request, {
            scope: "public_api",
            route: "estimator_lead",
            limit: 5,
            windowSeconds: 60 * 60,
        })
        if (!rl.ok) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": rl.retryAfterSeconds.toString() },
                },
            )
        }

        const body = await request.json()

        const validatedData = estimatorLeadSchema.parse(body)

        await prisma.estimatorLead.create({
            data: {
                phone: validatedData.phone,
                name: validatedData.name,
                projectType: validatedData.projectType,
                complexity: validatedData.complexity,
                timeline: validatedData.timeline,
                priceMin: validatedData.priceMin,
                priceMax: validatedData.priceMax,
                weeksMin: validatedData.weeksMin,
                weeksMax: validatedData.weeksMax,
            },
        })

        return NextResponse.json(
            { success: true, message: "Estimate generated" },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.reduce(
                        (acc: Record<string, string>, err) => {
                            const path = err.path[0] as string
                            if (path) acc[path] = err.message
                            return acc
                        },
                        {}
                    ),
                },
                { status: 400 }
            )
        }
        if (process.env.NODE_ENV !== "production") {
            console.error("Estimator lead error:", error)
        }
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        )
    }
}
