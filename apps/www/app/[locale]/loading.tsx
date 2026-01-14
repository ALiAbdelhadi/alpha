"use client"

import { BRAND_COLORS } from "@/lib/constants"
import { useLocale } from "next-intl"

export default function Loading() {
    const locale = useLocale()
    const isRTL = locale === "ar"
    const text = isRTL ? "جاري التحميل..." : "Loading..."

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div
                        className="w-16 h-16 rounded-full border-4 border-foreground/10"
                        style={{
                            borderTopColor: BRAND_COLORS.teal,
                            animation: 'spin 1s linear infinite'
                        }}
                    />
                    <div
                        className="absolute inset-0 rounded-full blur-xl opacity-20"
                        style={{
                            background: `radial-gradient(circle, ${BRAND_COLORS.cyan} 0%, transparent 70%)`
                        }}
                    />
                </div>
                <p className="font-mono text-sm text-primary/70 tracking-wide animate-pulse">
                    {text}
                </p>
            </div>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}