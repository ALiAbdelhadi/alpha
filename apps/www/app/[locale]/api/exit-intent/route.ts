import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@repo/database"
import { notifyNewContact } from "@/lib/crm"

const exitIntentSchema = z.object({
    email: z.string().email(),
    source: z.string().default("exit_intent_modal"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, source } = exitIntentSchema.parse(body)

        // Store as a contact submission with special tag
        const submission = await prisma.contactSubmission.create({
            data: {
                name: "Exit Intent Lead",
                email,
                message: `Captured via ${source}`,
                priority: "HIGH", // Exit intent leads are high intent
                locale: "en",
            },
        })

        // Send notification
        await notifyNewContact({
            name: "Exit Intent Lead",
            email,
            message: `Captured via ${source}`,
        }, submission.id)

        return NextResponse.json(
            { success: true, message: "Email captured" },
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
