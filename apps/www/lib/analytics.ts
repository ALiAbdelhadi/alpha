/**
 * Analytics tracking utilities
 */

export const trackEvent = (
  event: string,
  properties?: Record<string, any>
) => {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', event, properties)
  }

  // Plausible Analytics (if configured)
  if (window.plausible) {
    window.plausible(event, { props: properties })
  }

  // Custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties }),
    }).catch(() => {
      // Silently fail
    })
  }
}

// Web Vitals tracking
export function reportWebVitals(metric: {
  name: string
  value: number
  id: string
  delta: number
}) {
  if (typeof window === 'undefined') return

  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_delta: metric.delta,
      event_category: 'Web Vitals',
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
}

// Declare global types
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config',
      targetId: string,
      config?: Record<string, any>
    ) => void
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void
  }
}

