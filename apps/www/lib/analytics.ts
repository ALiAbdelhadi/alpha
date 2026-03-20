// Google Analytics 4 tracking utilities
// Use this for all custom event tracking

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize GA4
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return

  // Load GA script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  })
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track custom events
export const trackEvent = (
  action: string,
  params?: Record<string, unknown>
) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}

// Predefined events for common actions
export const AnalyticsEvents = {
  // CTA clicks
  ctaClick: (section: string, ctaLabel: string, destination?: string) =>
    trackEvent('cta_click', { section, cta_label: ctaLabel, destination }),

  // Estimator funnel
  estimatorStepViewed: (step: number, stepName: string) =>
    trackEvent('estimator_step_viewed', { step, step_name: stepName }),
  
  estimatorStepCompleted: (step: number, stepName: string, value?: string) =>
    trackEvent('estimator_step_completed', { step, step_name: stepName, value }),
  
  estimatorCompleted: (projectType: string, budget: string, timeline: string) =>
    trackEvent('estimator_completed', { project_type: projectType, budget, timeline }),
  
  estimatorLeadCaptured: (method: 'phone' | 'email') =>
    trackEvent('estimator_lead_captured', { method }),

  // Pricing interactions
  pricingCardViewed: (tier: string) =>
    trackEvent('pricing_card_viewed', { tier }),
  
  pricingCtaClicked: (tier: string, destination: string) =>
    trackEvent('pricing_cta_clicked', { tier, destination }),

  // Contact form
  contactFormStarted: () =>
    trackEvent('contact_form_started'),
  
  contactFormSubmitted: (serviceInterest?: string, budget?: string) =>
    trackEvent('contact_form_submitted', { service_interest: serviceInterest, budget }),

  // Scroll depth
  scrollDepth: (percentage: number, section: string) =>
    trackEvent('scroll_depth', { percentage, section }),

  // Section engagement
  sectionViewed: (section: string, timeSpentMs?: number) =>
    trackEvent('section_viewed', { section, time_spent_ms: timeSpentMs }),

  // Exit intent
  exitIntentShown: () =>
    trackEvent('exit_intent_shown'),
  
  exitIntentCaptured: (email: string) =>
    trackEvent('exit_intent_captured', { email }),

  // PDF downloads
  pdfDownloaded: (type: 'estimate' | 'proposal') =>
    trackEvent('pdf_downloaded', { type }),

  // Meeting scheduling
  meetingScheduled: (type: string) =>
    trackEvent('meeting_scheduled', { type }),

  // Service pages
  servicePageViewed: (service: string) =>
    trackEvent('service_page_viewed', { service }),
} as const

// Hook for scroll tracking
export const useScrollTracking = () => {
  if (typeof window === 'undefined') return

  const milestones = new Set<number>()
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )
    
    const milestones_to_track = [25, 50, 75, 90]
    
    milestones_to_track.forEach(milestone => {
      if (scrollPercent >= milestone && !milestones.has(milestone)) {
        milestones.add(milestone)
        trackEvent('scroll_depth', { percentage: milestone })
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

// Hook for section visibility tracking
export const useSectionTracking = (sectionId: string) => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('section_viewed', { section: sectionId })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  const element = document.getElementById(sectionId)
  if (element) observer.observe(element)

  return () => {
    if (element) observer.unobserve(element)
  }
}
