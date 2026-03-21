// CRM Integration utilities
// Handles notifications to Slack and other external services

interface SlackMessage {
  text: string
  blocks?: Array<{
    type: string
    text?: { type: string; text: string }
    fields?: Array<{ type: string; text: string; verbatim?: boolean }>
  }>
}

interface ContactSubmissionData {
  name: string
  phone: string
  email?: string
  message?: string
  serviceInterest?: string
  projectTimeline?: string
  budget?: string
  company?: string
}

interface EstimatorLeadData {
  phone: string
  name?: string
  projectType: string
  complexity: string
  timeline: string
  priceMin: number
  priceMax: number
  weeksMin: number
  weeksMax: number
}

// Send Slack notification
export const sendSlackNotification = async (
  webhookUrl: string,
  message: SlackMessage
): Promise<boolean> => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
    return response.ok
  } catch (error) {
    console.error("Failed to send Slack notification:", error)
    return false
  }
}

// Format contact submission for Slack
export const formatContactSlackMessage = (
  data: ContactSubmissionData,
  submissionId: string
): SlackMessage => {
  const fields = [
    `*Name:*\n${data.name}`,
    `*Phone:*\n${data.phone}`,
  ]

  if (data.email) fields.push(`*Email:*\n${data.email}`)
  if (data.company) fields.push(`*Company:*\n${data.company}`)
  if (data.serviceInterest) fields.push(`*Service:*\n${data.serviceInterest}`)
  if (data.budget) fields.push(`*Budget:*\n${data.budget}`)
  if (data.projectTimeline) fields.push(`*Timeline:*\n${data.projectTimeline}`)

  return {
    text: `New contact submission from ${data.name}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎉 New Contact Submission",
        },
      },
      {
        type: "section",
        fields: fields.map((field) => ({
          type: "mrkdwn",
          text: field,
          verbatim: false,
        })),
      },
      ... (data.message
        ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message:*\n${data.message}`,
            },
          },
        ]
        : []),
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<${process.env.NEXT_PUBLIC_APP_URL}/admin/contacts/${submissionId}|View in Admin>`,
        },
      },
    ],
  }
}

// Format estimator lead for Slack
export const formatEstimatorSlackMessage = (
  data: EstimatorLeadData
): SlackMessage => {
  const priceRange = `${data.priceMin.toLocaleString()} - ${data.priceMax.toLocaleString()} EGP`
  const timelineRange = `${data.weeksMin} - ${data.weeksMax} weeks`

  return {
    text: `New estimator lead from ${data.name || data.phone}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "💰 New Estimator Lead",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Phone:*\n${data.phone}`,
          },
          {
            type: "mrkdwn",
            text: `*Name:*\n${data.name || "N/A"}`,
          },
          {
            type: "mrkdwn",
            text: `*Project Type:*\n${data.projectType}`,
          },
          {
            type: "mrkdwn",
            text: `*Complexity:*\n${data.complexity}`,
          },
          {
            type: "mrkdwn",
            text: `*Timeline:*\n${data.timeline}`,
          },
          {
            type: "mrkdwn",
            text: `*Estimated Price:*\n${priceRange}`,
          },
        ].map((f) => ({ ...f, verbatim: false })),
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Estimated Duration:* ${timelineRange}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<${process.env.NEXT_PUBLIC_APP_URL}/admin/leads|View in Admin>`,
        },
      },
    ],
  }
}

// Send email via SendGrid or similar
export const sendNotificationEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<boolean> => {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    console.warn("SendGrid API key not configured")
    return false
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.FROM_EMAIL || "notifications@altruvex.com" },
        subject,
        content: [{ type: "text/html", value: html }],
      }),
    })
    return response.ok
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

// Trigger Zapier webhook
export const triggerZapierWebhook = async (
  webhookUrl: string,
  data: Record<string, unknown>
): Promise<boolean> => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.ok
  } catch (error) {
    console.error("Failed to trigger Zapier webhook:", error)
    return false
  }
}

// Main function to notify on new contact
export const notifyNewContact = async (
  data: ContactSubmissionData,
  submissionId: string
): Promise<void> => {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL

  if (slackWebhook) {
    const message = formatContactSlackMessage(data, submissionId)
    await sendSlackNotification(slackWebhook, message)
  }

  // Add other integrations here (Zapier, HubSpot, etc.)
  const zapierWebhook = process.env.ZAPIER_WEBHOOK_URL
  if (zapierWebhook) {
    await triggerZapierWebhook(zapierWebhook, {
      event: "new_contact",
      data: { ...data, submissionId },
    })
  }
}

// Main function to notify on new estimator lead
export const notifyNewEstimatorLead = async (
  data: EstimatorLeadData
): Promise<void> => {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL

  if (slackWebhook) {
    const message = formatEstimatorSlackMessage(data)
    await sendSlackNotification(slackWebhook, message)
  }

  // Add other integrations here
  const zapierWebhook = process.env.ZAPIER_WEBHOOK_URL
  if (zapierWebhook) {
    await triggerZapierWebhook(zapierWebhook, {
      event: "new_estimator_lead",
      data,
    })
  }
}
