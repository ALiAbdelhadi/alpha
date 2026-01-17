'use client'

import { LoadingIcon } from '@/components/icons/loading-icon'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    // Determine error type and message
    const getErrorInfo = () => {
        const errorMessage = error.message?.toLowerCase() || ''

        if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
            return {
                code: '504',
                title: 'Request Timeout',
                message: 'The request took too long to complete. Please try again.',
                type: 'timeout',
            }
        }

        if (errorMessage.includes('not found') || errorMessage.includes('404')) {
            return {
                code: '404',
                title: 'Not Found',
                message: 'The requested resource could not be found.',
                type: 'notfound',
            }
        }

        if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
            return {
                code: '401',
                title: 'Unauthorized',
                message: 'You are not authorized to access this resource.',
                type: 'unauthorized',
            }
        }

        if (errorMessage.includes('forbidden') || errorMessage.includes('403')) {
            return {
                code: '403',
                title: 'Forbidden',
                message: 'You do not have permission to access this resource.',
                type: 'forbidden',
            }
        }

        return {
            code: '500',
            title: 'Server Error',
            message: 'An unexpected error occurred. Please try again later.',
            type: 'generic',
        }
    }

    const errorInfo = getErrorInfo()

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
            <main
                className="flex w-full max-w-2xl flex-col items-center justify-center space-y-8 text-center"
                role="main"
                aria-label="Error page"
            >
                <div className="space-y-4">
                    <div
                        className={`transition-all duration-500 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                            }`}
                    >
                        <p className="font-mono text-7xl font-bold tracking-tight text-destructive/80 md:text-8xl">
                            {errorInfo.code}
                        </p>
                    </div>
                    <div
                        className={`transition-all delay-100 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >
                        <h1 className="font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl lg:text-5xl">
                            <span className="text-balance">{errorInfo.title}</span>
                        </h1>
                    </div>
                </div>
                <div
                    className={`transition-all delay-200 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    <p className="max-w-xl text-lg leading-relaxed text-foreground/75 md:text-xl">
                        {errorInfo.message}
                    </p>
                </div>
                {error.digest && (
                    <div
                        className={`transition-all delay-300 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >
                        <details className="rounded-lg border border-border/50 bg-card p-4">
                            <summary className="cursor-pointer font-mono text-xs text-foreground/60 hover:text-foreground/80">
                                Error Details (Click to expand)
                            </summary>
                            <pre className="mt-3 overflow-auto rounded bg-muted p-3 text-left font-mono text-xs text-foreground/70">
                                <code>{error.digest}</code>
                            </pre>
                        </details>
                    </div>
                )}
                <div
                    className={`flex flex-col gap-3 sm:flex-row sm:gap-4 transition-all delay-400 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    <button
                        onClick={reset}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-sans text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-95"
                        aria-label="Try again"
                    >
                        <LoadingIcon />
                        <span>Try Again</span>
                    </button>

                    <Link
                        href="/"
                        className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-sans text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted/50 hover:border-border/80 active:scale-95"
                        aria-label="Return to home"
                    >
                        <span>Go Home</span>
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="sr-only" role="alert">
                    {errorInfo.code} error: {errorInfo.title}. {errorInfo.message}
                </div>
            </main>
        </div>
    )
}
