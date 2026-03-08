import { estimatorLeadSchema } from "@/lib/validations/estimator-lead"
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

        const validatedData = estimatorLeadSchema.parse(body)

        await prisma.estimatorLead.create({
            data: {
                email: validatedData.email,
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
            { success: true, message: "Estimate sent to your email" },
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
        console.error("Estimator lead error:", error)
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        )
    }
}
