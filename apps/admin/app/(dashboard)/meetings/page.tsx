"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Calendar,
    Clock,
    Mail,
    Search,
    User,
    Video
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type MeetingStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED"
type MeetingType = "DISCOVERY" | "CONSULTATION" | "PROPOSAL" | "FOLLOWUP"

interface Meeting {
    id: string
    title: string
    description?: string | null
    type: MeetingType
    status: MeetingStatus
    scheduledDate: string
    scheduledTime: string
    durationMinutes: number
    guestName?: string | null
    guestEmail?: string | null
    meetingUrl?: string | null
    notes?: string | null
    adminNotes?: string | null
    assignedTo?: { name: string | null; email: string } | null
    contactSubmission?: { id: string; name: string; email: string } | null
    createdAt: string
    approvedAt?: string | null
    completedAt?: string | null
}

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [typeFilter, setTypeFilter] = useState<string>("all")
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchMeetings()
    }, [statusFilter, typeFilter])

    const fetchMeetings = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (statusFilter !== "all") params.append("status", statusFilter)
            if (typeFilter !== "all") params.append("type", typeFilter)
            if (searchQuery) params.append("search", searchQuery)

            const response = await fetch(`/api/admin/meetings?${params.toString()}`)
            const data = await response.json()
            if (data.success) {
                setMeetings(data.meetings || [])
            }
        } catch (error) {
            console.error("Error fetching meetings:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateMeeting = async (
        id: string,
        updates: { status?: MeetingStatus; meetingUrl?: string | null; adminNotes?: string | null }
    ) => {
        try {
            setUpdating(id)
            const response = await fetch("/api/admin/meetings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            })

            const data = await response.json()
            if (data.success) {
                await fetchMeetings()
            }
        } catch (error) {
            console.error("Error updating meeting:", error)
        } finally {
            setUpdating(null)
        }
    }

    const filteredMeetings = meetings.filter((meeting) => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return (
                meeting.title.toLowerCase().includes(query) ||
                meeting.guestName?.toLowerCase().includes(query) ||
                meeting.guestEmail?.toLowerCase().includes(query) ||
                meeting.notes?.toLowerCase().includes(query)
            )
        }
        return true
    })

    const getStatusColor = (status: MeetingStatus) => {
        const colors: Record<MeetingStatus, string> = {
            PENDING: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
            APPROVED: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
            REJECTED: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
            COMPLETED: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
            CANCELLED: "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30",
            RESCHEDULED: "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30",
        }
        return colors[status] || colors.PENDING
    }

    const getTypeColor = (type: MeetingType) => {
        const colors: Record<MeetingType, string> = {
            DISCOVERY: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
            CONSULTATION: "bg-green-500/20 text-green-700 dark:text-green-400",
            PROPOSAL: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
            FOLLOWUP: "bg-orange-500/20 text-orange-700 dark:text-orange-400",
        }
        return colors[type] || colors.DISCOVERY
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getTimeSlot = (time: string) => {
        const slots: Record<string, string> = {
            morning: "9:00 AM - 12:00 PM",
            afternoon: "12:00 PM - 3:00 PM",
            evening: "3:00 PM - 6:00 PM",
        }
        return slots[time] || time
    }

    if (loading && meetings.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">Loading meetings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Scheduled Meetings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track all meeting requests and scheduled calls
                    </p>
                </div>
                <div className="text-sm text-muted-foreground">
                    {filteredMeetings.length} {filteredMeetings.length === 1 ? "meeting" : "meetings"}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by title, guest name, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        <SelectItem value="RESCHEDULED">Rescheduled</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="DISCOVERY">Discovery</SelectItem>
                        <SelectItem value="CONSULTATION">Consultation</SelectItem>
                        <SelectItem value="PROPOSAL">Proposal</SelectItem>
                        <SelectItem value="FOLLOWUP">Follow-up</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Meeting
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Guest
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredMeetings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No meetings found
                                    </td>
                                </tr>
                            ) : (
                                filteredMeetings.map((meeting) => (
                                    <tr key={meeting.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="font-medium">{meeting.title}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {meeting.type.replace(/_/g, " ")}
                                            </div>
                                            {meeting.meetingUrl && (
                                                <a
                                                    href={meeting.meetingUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                                                >
                                                    <Video className="h-3 w-3" />
                                                    Join Meeting
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            {meeting.guestName && (
                                                <div className="font-medium flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {meeting.guestName}
                                                </div>
                                            )}
                                            {meeting.guestEmail && (
                                                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                    <Mail className="h-3 w-3" />
                                                    {meeting.guestEmail}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(meeting.scheduledDate)}
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                <Clock className="h-3 w-3" />
                                                {getTimeSlot(meeting.scheduledTime)} ({meeting.durationMinutes} min)
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Select
                                                value={meeting.status}
                                                onValueChange={(value) =>
                                                    updateMeeting(meeting.id, {
                                                        status: value as MeetingStatus,
                                                    })
                                                }
                                                disabled={updating === meeting.id}
                                            >
                                                <SelectTrigger className={`text-xs h-8 w-[140px] ${getStatusColor(meeting.status)}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                                    <SelectItem value="RESCHEDULED">Rescheduled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${getTypeColor(
                                                    meeting.type
                                                )}`}
                                            >
                                                {meeting.type.replace(/_/g, " ")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            {meeting.contactSubmission && (
                                                <Link
                                                    href={`/contacts/${meeting.contactSubmission.id}`}
                                                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                                >
                                                    <User className="h-4 w-4" />
                                                    View Contact
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

