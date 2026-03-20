"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { useEffect, useState } from "react"

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect
    }, [])

    const getErrorInfo = () => {
        const errorMessage = error.message?.toLowerCase() || ""

        if (errorMessage.includes("timeout") || errorMessage.includes("timed out")) {
            return { code: "504", title1: "Request", title2: "Timeout", message: "The request took too long to complete. Please try again." }
        }
        if (errorMessage.includes("not found") || errorMessage.includes("404")) {
            return { code: "404", title1: "Page Not", title2: "Found", message: "The requested resource could not be found." }
        }
        if (errorMessage.includes("unauthorized") || errorMessage.includes("401")) {
            return { code: "401", title1: "Access", title2: "Unauthorized", message: "You are not authorized to access this resource." }
        }
        if (errorMessage.includes("forbidden") || errorMessage.includes("403")) {
            return { code: "403", title1: "Access", title2: "Forbidden", message: "You do not have permission to access this resource." }
        }

        return { code: "500", title1: "System", title2: "Error", message: "An unexpected error occurred. Please try again later." }
    }

    const errorInfo = getErrorInfo()

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background section-padding">
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/[0.015]"
                style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}
            >
                {errorInfo.code}
            </div>

            <Container>
                <main
                    className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center"
                    role="main"
                    aria-label="Error page"
                >
                    <div
                        className={`flex flex-col items-center transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                            }`}
                    >
                        <div className="mb-8 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500/80 animate-pulse" />
                            <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
                                Error Code {errorInfo.code}
                            </span>
                        </div>
                        <h1
                            className="mb-8 font-sans font-normal text-primary leading-[1.05] tracking-tight"
                            style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.02em" }}
                        >
                            {errorInfo.title1}
                            <br />
                            <span
                                className="text-primary/35"
                                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
                            >
                                {errorInfo.title2}
                            </span>
                        </h1>

                        <div className="h-px w-24 bg-foreground/8 mb-8" />
                        <p className="mb-12 max-w-md text-base text-primary/60 leading-relaxed">
                            {errorInfo.message}
                        </p>
                        {error.digest && (
                            <div className="mb-12 w-full max-w-md text-left rtl:text-right">
                                <details className="group rounded-sm border border-foreground/8 bg-foreground/[0.015] p-4 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.03]">
                                    <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.15em] text-primary/40 group-hover:text-primary/70 transition-colors select-none">
                                        Error Digest
                                    </summary>
                                    <pre className="mt-4 overflow-auto rounded-sm bg-foreground/5 p-3 font-mono text-[10px] text-primary/50 leading-relaxed">
                                        <code>{error.digest}</code>
                                    </pre>
                                </details>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <MagneticButton
                                size="lg"
                                variant="primary"
                                onClick={reset}
                                className="group min-w-[160px] justify-center"
                            >
                                <span className="flex items-center gap-2">
                                    Try Again
                                    <svg
                                        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </span>
                            </MagneticButton>

                            <Link href="/">
                                <MagneticButton size="lg" variant="secondary" className="min-w-[160px] justify-center group">
                                    <span className="flex items-center gap-2">
                                        Go Home
                                        <svg
                                            className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                        <span className="mt-10 font-mono text-[10px] text-primary/20 uppercase tracking-[0.25em]">
                            System Diagnostics
                        </span>
                    </div>
                </main>
            </Container>
        </div>
    )
}