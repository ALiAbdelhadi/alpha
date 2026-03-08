import { z } from "zod"

export const estimatorLeadSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),
    projectType: z.string().min(1, "Project type is required"),
    complexity: z.string().min(1, "Complexity is required"),
    timeline: z.string().min(1, "Timeline is required"),
    priceMin: z.number().int().min(0),
    priceMax: z.number().int().min(0),
    weeksMin: z.number().int().min(0),
    weeksMax: z.number().int().min(0),
})

export type EstimatorLeadData = z.infer<typeof estimatorLeadSchema>
