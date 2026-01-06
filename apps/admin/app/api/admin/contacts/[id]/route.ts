import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"

/**
 * GET /api/admin/contacts/[id]
 * Get single contact submission with full details
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const submission = await prisma.contactSubmission.findUnique({
            where: { id },
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                notes: {
                    include: {
                        createdBy: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                tags: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                meetings: {
                    orderBy: {
                        scheduledDate: "asc",
                    },
                },
            },
        })

        if (!submission) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Contact submission not found",
                },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            submission,
        })
    } catch (error) {
        console.error("Error fetching contact:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch contact",
            },
            { status: 500 }
        )
    }
}

