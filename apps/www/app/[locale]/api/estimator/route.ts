import { prisma } from "@repo/database"
import { NextRequest, NextResponse } from "next/server"
import { z, ZodError } from "zod"

const estimatorLeadSchema = z.object({
    phone: z.string().regex(/^\+?\d{8,15}$/, "Invalid phone number"),
    name: z.string().max(120).optional(),
    projectType: z.enum(["ecommerce", "corporate", "custom", "performance"]),
    complexity: z.enum(["small", "medium", "large", "enterprise"]),
    timeline: z.enum(["urgent", "soon", "flexible"]),
    priceMin: z.number().positive(),
    priceMax: z.number().positive(),
    weeksMin: z.number().positive(),
    weeksMax: z.number().positive(),
})

const rateMap = new Map<string, { count: number; reset: number }>()

function checkRate(ip: string): boolean {
    const now = Date.now()
    const rec = rateMap.get(ip)
    if (!rec || now > rec.reset) { rateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return true }
    if (rec.count >= 5) return false
    rec.count++
    return true
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const origin = request.headers.get("origin")
        const allowed = [process.env.NEXT_PUBLIC_APP_URL].filter((v): v is string => !!v)
        if (allowed.length > 0 && (!origin || !allowed.includes(origin))) {
            return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
        if (!checkRate(ip)) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 },
            )
        }

        const data = estimatorLeadSchema.parse(body)

        await prisma.estimatorLead.create({
            data: {
                phone: data.phone,       
                name: data.name,
                projectType: data.projectType,
                complexity: data.complexity,
                timeline: data.timeline,
                priceMin: data.priceMin,
                priceMax: data.priceMax,
                weeksMin: data.weeksMin,
                weeksMax: data.weeksMax,
            },
        })

        return NextResponse.json(
            { success: true, message: "Lead captured" },
            { status: 201 },
        )

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.reduce((acc: Record<string, string>, e) => {
                        const k = e.path[0] as string
                        if (k) acc[k] = e.message
                        return acc
                    }, {}),
                },
                { status: 400 },
            )
        }
        if (process.env.NODE_ENV !== "production") {
            console.error("Estimator lead error:", error)
        }
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 },
        )
    }
}
