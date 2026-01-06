import { z } from "zod"

/**
 * Contact Form Validation Schema
 * Shared between client and server for type safety
 */
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .trim(),

    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must not exceed 1000 characters")
        .trim(),

    serviceInterest: z
        .enum([
            "web-development",
            "ecommerce",
            "multilingual",
            "ui-ux",
            "other"
        ])
        .optional(),

    projectTimeline: z
        .enum([
            "immediate",
            "soon",
            "planning",
            "exploring"
        ])
        .optional(),

    // Honeypot field - should always be empty
    website: z.string().max(0).optional(),

    // Scheduling fields (optional)
    requestMeeting: z.boolean().optional(),
    preferredDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
        .refine(
            (date) => {
                const selectedDate = new Date(date)
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return selectedDate >= today
            },
            { message: "Date must be today or in the future" }
        )
        .refine(
            (date) => {
                const selectedDate = new Date(date)
                const maxDate = new Date()
                maxDate.setMonth(maxDate.getMonth() + 3)
                return selectedDate <= maxDate
            },
            { message: "Date must be within the next 3 months" }
        )
        .optional(),
    preferredTime: z.enum([
        "morning",    // 9am-12pm
        "afternoon",  // 12pm-3pm
        "evening"     // 3pm-6pm
    ]).optional(),
}).refine(
    (data) => {
        // If meeting is requested, date and time are required
        if (data.requestMeeting) {
            return !!data.preferredDate && !!data.preferredTime
        }
        return true
    },
    {
        message: "Date and time are required when requesting a meeting",
        path: ["preferredDate"],
    }
)

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Meeting Request Validation Schema (for existing contact submission)
 */
export const meetingRequestSchema = z.object({
    contactSubmissionId: z.string().uuid(),
    preferredDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
        .refine(
            (date) => {
                const selectedDate = new Date(date)
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return selectedDate >= today
            },
            { message: "Date must be today or in the future" }
        )
        .refine(
            (date) => {
                const selectedDate = new Date(date)
                const maxDate = new Date()
                maxDate.setMonth(maxDate.getMonth() + 3)
                return selectedDate <= maxDate
            },
            { message: "Date must be within the next 3 months" }
        ),
    preferredTime: z.enum(["morning", "afternoon", "evening"]),
    notes: z.string().max(500).optional(),
})

export type MeetingRequestData = z.infer<typeof meetingRequestSchema>

/**
 * Standalone Meeting Schedule Schema (for new schedule page)
 */
export const standaloneMeetingSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),
    message: z.string().max(1000).trim().optional(),
    scheduledDate: z.string().datetime(), // ISO datetime string
    scheduledTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"), // "HH:MM" format
})

export type StandaloneMeetingData = z.infer<typeof standaloneMeetingSchema>