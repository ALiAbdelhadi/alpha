/**
 * API response types
 */

export interface ContactFormData {
    name: string
    email: string
    message: string
    website?: string // Honeypot field
}

export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface ContactResponse {
    messageId?: string
    success: boolean
    message: string
}

