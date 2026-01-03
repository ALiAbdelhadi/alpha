// import { NextRequest, NextResponse } from 'next/server'
// import type { ApiResponse, ContactFormData, ContactResponse } from '@/types/api'

// // Rate limiting (simple in-memory store - use Redis/Upstash in production)
// // Note: This will reset on serverless cold starts. For production, use:
// // import { Ratelimit } from "@upstash/ratelimit"
// // import { Redis } from "@upstash/redis"
// const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
// const RATE_LIMIT = {
//   maxRequests: 5,
//   windowMs: 15 * 60 * 1000, // 15 minutes
// }

// function checkRateLimit(ip: string): boolean {
//   const now = Date.now()
//   const record = rateLimitMap.get(ip)

//   if (!record || now > record.resetTime) {
//     rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
//     return true
//   }

//   if (record.count >= RATE_LIMIT.maxRequests) {
//     return false
//   }

//   record.count++
//   return true
// }

// // Email validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// // Validate form data
// function validateFormData(data: unknown): { valid: boolean; error?: string; data?: ContactFormData } {
//   if (!data || typeof data !== 'object') {
//     return { valid: false, error: 'Invalid request body' }
//   }

//   const formData = data as Partial<ContactFormData>

//   // Honeypot check - if filled, it's a bot
//   if (formData.website && formData.website.trim() !== '') {
//     // Silently return success to avoid alerting bots
//     return { valid: false, error: 'Bot detected' }
//   }

//   // Required fields
//   if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length < 2) {
//     return { valid: false, error: 'Name must be at least 2 characters' }
//   }

//   if (!formData.email || typeof formData.email !== 'string' || !emailRegex.test(formData.email)) {
//     return { valid: false, error: 'Invalid email address' }
//   }

//   if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
//     return { valid: false, error: 'Message must be at least 10 characters' }
//   }

//   if (formData.message.length > 1000) {
//     return { valid: false, error: 'Message must be less than 1000 characters' }
//   }

//   return {
//     valid: true,
//     data: {
//       name: formData.name.trim(),
//       email: formData.email.trim().toLowerCase(),
//       message: formData.message.trim(),
//     },
//   }
// }

// // Send email using Resend (if configured) or log for development
// async function sendEmail(data: ContactFormData): Promise<{ success: boolean; messageId?: string }> {
//   const resendApiKey = process.env.RESEND_API_KEY
//   const recipientEmail = process.env.CONTACT_EMAIL || 'hello@alpha.com'
//   const fromEmail = process.env.FROM_EMAIL || 'Alpha <noreply@alpha.com>'

//   // If Resend is configured, use it
//   if (resendApiKey) {
//     try {
//       // Dynamic import to avoid bundling in client
//       const { Resend } = await import('resend')
//       const resend = new Resend(resendApiKey)

//       // Send notification email
//       const notificationResult = await resend.emails.send({
//         from: fromEmail,
//         to: recipientEmail,
//         subject: `New contact form submission from ${data.name}`,
//         html: `
//           <h2>New Contact Form Submission</h2>
//           <p><strong>Name:</strong> ${data.name}</p>
//           <p><strong>Email:</strong> ${data.email}</p>
//           <p><strong>Message:</strong></p>
//           <p>${data.message.replace(/\n/g, '<br>')}</p>
//         `,
//         replyTo: data.email,
//       })

//       // Send auto-reply to user
//       await resend.emails.send({
//         from: fromEmail,
//         to: data.email,
//         subject: 'Thanks for contacting Alpha',
//         html: `
//           <h2>Thank you for reaching out!</h2>
//           <p>Hi ${data.name},</p>
//           <p>We've received your message and will get back to you within 24 hours.</p>
//           <p>Best regards,<br>The Alpha Team</p>
//         `,
//       })

//       return {
//         success: true,
//         messageId: notificationResult.data?.id,
//       }
//     } catch (error) {
//       console.error('Resend email error:', error)
//       // Fall through to logging
//     }
//   }

//   // Development/fallback: log to console
//   console.log('Contact form submission:', {
//     name: data.name,
//     email: data.email,
//     message: data.message,
//     timestamp: new Date().toISOString(),
//   })

//   return { success: true }
// }

// export async function POST(
//   request: NextRequest
// ): Promise<NextResponse<ApiResponse<ContactResponse>>> {
//   try {
//     // Get client IP
//     const ip =
//       request.headers.get('x-forwarded-for')?.split(',')[0] ||
//       request.headers.get('x-real-ip') ||
//       'unknown'

//     // Rate limiting
//     if (!checkRateLimit(ip)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Too many requests. Please try again later.',
//         },
//         { status: 429 }
//       )
//     }

//     // Parse and validate request body
//     const body = await request.json()
//     const validation = validateFormData(body)

//     if (!validation.valid || !validation.data) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: validation.error || 'Invalid form data',
//         },
//         { status: 400 }
//       )
//     }

//     // Send email
//     const emailResult = await sendEmail(validation.data)

//     if (!emailResult.success) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Failed to send email. Please try again later.',
//         },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: {
//           success: true,
//           message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
//           messageId: emailResult.messageId,
//         },
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('Contact form error:', error)
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'An unexpected error occurred. Please try again later.',
//       },
//       { status: 500 }
//     )
//   }
// }



