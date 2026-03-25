import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@repo/database"

const exitIntentSchema = z.object({
    phone: z.string(),
    source: z.string().default("exit_intent_modal"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { phone, source } = exitIntentSchema.parse(body)

        // Store as a contact submission with special tag
        const submission = await prisma.contactSubmission.create({
            data: {
                name: "Exit Intent Lead",
                phone,
                message: `Captured via ${source}`,
                priority: "HIGH", // Exit intent leads are high intent
                locale: "en",
            },
        } as any)

        return NextResponse.json(
            { success: true, message: "Contact captured" },
            { status: 201 }
        )
    } catch (error) {
        console.error("Exit intent error:", error)
        return NextResponse.json(
            { success: false, message: "Failed to capture email" },
            { status: 500 }
        )
    }
}
