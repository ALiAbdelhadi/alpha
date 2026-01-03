'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { reportWebVitals } from '@/lib/analytics'

export function Analytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_ID

    useEffect(() => {
        // Web Vitals tracking
        if (typeof window !== 'undefined') {
            import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
                onCLS(reportWebVitals)
                onFID(reportWebVitals)
                onFCP(reportWebVitals)
                onLCP(reportWebVitals)
                onTTFB(reportWebVitals)
            })
        }
    }, [])

    if (!gaId) {
        return null
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}

