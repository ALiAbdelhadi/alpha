/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@repo/database"
import { z } from "zod"

/**
 * GET /api/admin/meetings
 * Fetch all meetings with filters
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get("status")
        const type = searchParams.get("type")
        const dateFrom = searchParams.get("dateFrom")
        const dateTo = searchParams.get("dateTo")
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = parseInt(searchParams.get("pageSize") || "50")

        const where: any = {}

        if (status && status !== "all") {
            where.status = status
        }

        if (type && type !== "all") {
            where.type = type
        }

        if (dateFrom || dateTo) {
            where.scheduledDate = {}
            if (dateFrom) {
                where.scheduledDate.gte = new Date(dateFrom)
            }
            if (dateTo) {
                where.scheduledDate.lte = new Date(dateTo)
            }
        }

        const [meetings, total] = await Promise.all([
            prisma.meeting.findMany({
                where,
                include: {
                    requestedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    assignedTo: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    contactSubmission: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            status: true,
                        },
                    },
                },
                orderBy: {
                    scheduledDate: "asc",
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prisma.meeting.count({ where }),
        ])

        return NextResponse.json({
            success: true,
            meetings,
            total,
            page,
            pageSize,
        })
    } catch (error) {
        console.error("Error fetching meetings:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch meetings",
            },
            { status: 500 }
        )
    }
}

/**
 * PATCH /api/admin/meetings
 * Update meeting (status, assignment, notes)
 */
const updateMeetingSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELLED", "RESCHEDULED"]).optional(),
    assignedToId: z.string().uuid().nullable().optional(),
    meetingUrl: z.string().url().optional().nullable(),
    adminNotes: z.string().max(1000).optional().nullable(),
})

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = updateMeetingSchema.parse(body)

        const updateData: any = {}

        if (validatedData.status) {
            updateData.status = validatedData.status
            // Auto-set approvedAt when status changes to APPROVED
            if (validatedData.status === "APPROVED") {
                const existing = await prisma.meeting.findUnique({
                    where: { id: validatedData.id },
                    select: { approvedAt: true },
                })
                if (!existing?.approvedAt) {
                    updateData.approvedAt = new Date()
                }
            }
            // Auto-set completedAt when status changes to COMPLETED
            if (validatedData.status === "COMPLETED") {
                const existing = await prisma.meeting.findUnique({
                    where: { id: validatedData.id },
                    select: { completedAt: true },
                })
                if (!existing?.completedAt) {
                    updateData.completedAt = new Date()
                }
            }
        }

        if (validatedData.assignedToId !== undefined) {
            updateData.assignedToId = validatedData.assignedToId
        }

        if (validatedData.meetingUrl !== undefined) {
            updateData.meetingUrl = validatedData.meetingUrl
        }

        if (validatedData.adminNotes !== undefined) {
            updateData.adminNotes = validatedData.adminNotes
        }

        const updated = await prisma.meeting.update({
            where: { id: validatedData.id },
            data: updateData,
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                contactSubmission: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            meeting: updated,
        })
    } catch (error) {
        console.error("Error updating meeting:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: error,
                },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update meeting",
            },
            { status: 500 }
        )
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Meeting ID is required",
                },
                { status: 400 }
            )
        }

        // Check if meeting exists
        const meeting = await prisma.meeting.findUnique({
            where: { id },
        })

        if (!meeting) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Meeting not found",
                },
                { status: 404 }
            )
        }

        // Delete the meeting
        await prisma.meeting.delete({
            where: { id },
        })

        return NextResponse.json({
            success: true,
            message: "Meeting deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting meeting:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete meeting",
            },
            { status: 500 }
        )
    }
}