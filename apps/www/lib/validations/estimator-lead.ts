import { z } from "zod"

export const estimatorLeadSchema = z.object({
    phone: z.string().regex(/^(\+|00)?[1-9]\d{6,14}$|^01[0125]\d{8}$/, "Invalid phone number"),
    name: z.string().max(120).optional(),
    projectType: z.string().min(1, "Project type is required"),
    complexity: z.string().min(1, "Complexity is required"),
    timeline: z.string().min(1, "Timeline is required"),
    priceMin: z.number().int().min(0),
    priceMax: z.number().int().min(0),
    weeksMin: z.number().int().min(0),
    weeksMax: z.number().int().min(0),
})
