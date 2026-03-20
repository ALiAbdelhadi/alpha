'use client';

import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
            <main
                className="flex w-full max-w-2xl flex-col items-center justify-center space-y-8 text-center"
                role="main"
                aria-label="404 Not Found page"
            >
                <div className="space-y-4">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="font-mono text-7xl font-bold tracking-tight text-destructive/80 md:text-8xl">
                            404
                        </p>
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        <h1 className="font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl lg:text-5xl">
                            <span className="text-balance">Page Not Found</span>
                        </h1>
                    </div>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <p className="max-w-xl text-lg leading-relaxed text-foreground/75 md:text-xl">
                        The page you&apos;re looking for doesn&apos;t exist. It may have been moved or deleted, or the URL might be
                        incorrect.
                    </p>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 w-full">
                    <div className="rounded-lg border border-border/50 bg-card/50 p-6 space-y-3">
                        <h2 className="font-sans text-sm font-semibold tracking-wide text-foreground/90 uppercase">
                            What you can try:
                        </h2>
                        <ul className="space-y-2 text-left text-sm text-foreground/70">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="h-5 w-5 text-primary/70 shrink-0 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>Check the URL for any typos or errors</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg
                                    className="h-5 w-5 text-primary/70 shrink-0 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8m0 0V3m0 5L18.74 2.26" />
                                </svg>
                                <span>Return to the homepage and navigate from there</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg
                                    className="h-5 w-5 text-primary/70 shrink-0 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Contact support if you believe this is an error</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <Link
                        href="/"
                        className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-sans text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-95"
                        aria-label="Return to home"
                    >
                        <svg
                            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        <span>Go Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-sans text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted/50 hover:border-border/80 active:scale-95"
                        aria-label="Go back to previous page"
                    >
                        <span>Go Back</span>
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
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
                <div className="sr-only" role="alert">
                    404 error: Page not found. The page you are looking for does not exist.
                </div>
            </main>
        </div>
    )
}
