/**
 * Contact System Data Model
 * Designed for future admin integration
 */

// ============================================================================
// FORM DATA
// ============================================================================

export interface ContactFormData {
    name: string
    email: string
    message: string
    serviceInterest?: ServiceType
    companyName?: string
    projectTimeline?: ProjectTimeline
    budgetRange?: BudgetRange
    referralSource?: string
    honeypot?: string // Anti-spam
}

// ============================================================================
// SUBMISSION (DATABASE RECORD)
// ============================================================================

export interface ContactSubmission extends ContactFormData {
    id: string
    status: SubmissionStatus
    submittedAt: Date
    lastUpdatedAt: Date
    assignedTo?: string
    notes?: ContactNote[]
    tags?: string[]
    priority: Priority
    locale: 'en' | 'ar'
    metadata: SubmissionMetadata
}

// ============================================================================
// ENUMS & TYPES
// ============================================================================

export type ServiceType =
    | 'web-development'
    | 'ecommerce'
    | 'multilingual'
    | 'ui-ux'
    | 'other'

export type SubmissionStatus =
    | 'new'           // Just submitted
    | 'viewed'        // Admin viewed
    | 'contacted'     // Initial outreach made
    | 'qualified'     // Real opportunity
    | 'proposal'      // Proposal sent
    | 'won'           // Converted to client
    | 'lost'          // Not a fit
    | 'spam'          // Filtered out

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type ProjectTimeline =
    | 'immediate'     // < 1 month
    | 'soon'          // 1-3 months
    | 'planning'      // 3-6 months
    | 'exploring'     // 6+ months

export type BudgetRange =
    | 'under-5k'
    | '5k-10k'
    | '10k-25k'
    | '25k-50k'
    | 'over-50k'
    | 'not-sure'

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

export interface ContactNote {
    id: string
    content: string
    createdBy: string
    createdAt: Date
    type: 'internal' | 'client-visible'
}

export interface SubmissionMetadata {
    userAgent: string
    ipAddress?: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    deviceType: 'mobile' | 'tablet' | 'desktop'
    browser: string
    timestamp: number
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ContactFormErrors {
    name?: string
    email?: string
    message?: string
    serviceInterest?: string
}

export interface FormValidationRules {
    name: {
        required: true
        minLength: 2
        maxLength: 100
    }
    email: {
        required: true
        pattern: RegExp
    }
    message: {
        required: true
        minLength: 10
        maxLength: 1000
    }
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ContactSubmissionResponse {
    success: boolean
    submissionId?: string
    message: string
    errors?: ContactFormErrors
}

export interface SubmissionListResponse {
    submissions: ContactSubmission[]
    total: number
    page: number
    pageSize: number
    filters: SubmissionFilters
}

export interface SubmissionFilters {
    status?: SubmissionStatus[]
    priority?: Priority[]
    serviceInterest?: ServiceType[]
    dateFrom?: Date
    dateTo?: Date
    search?: string
}

// ============================================================================
// ADMIN ACTIONS
// ============================================================================

export type AdminAction =
    | { type: 'UPDATE_STATUS'; status: SubmissionStatus }
    | { type: 'SET_PRIORITY'; priority: Priority }
    | { type: 'ASSIGN_TO'; userId: string }
    | { type: 'ADD_NOTE'; note: string }
    | { type: 'ADD_TAG'; tag: string }
    | { type: 'MARK_SPAM' }

// ============================================================================
// ANALYTICS
// ============================================================================

export interface ContactAnalytics {
    totalSubmissions: number
    conversionRate: number
    averageResponseTime: number
    statusDistribution: Record<SubmissionStatus, number>
    serviceInterestDistribution: Record<ServiceType, number>
    timelineDistribution: Record<ProjectTimeline, number>
}