'use client'

import { LoadingIcon } from '@/components/icons/loading-icon'
import { useEffect, useState } from 'react'

export default function LoadingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const messages = [
        'Loading your content...',
        'Getting everything ready...',
        'Almost there...',
        'Preparing your page...',
        'Just a moment...',
    ]

    // eslint-disable-next-line react-hooks/purity
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
            <main
                className="flex w-full max-w-2xl flex-col items-center justify-center space-y-12 text-center"
                role="main"
                aria-label="Loading page"
            >
                <div className="flex flex-col items-center gap-6">
                    <div
                        className={`relative flex items-center justify-center transition-all duration-500 ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            }`}
                        role="status"
                        aria-live="polite"
                    >
                        <div
                            className="absolute h-24 w-24 rounded-full border-2 border-transparent border-t-primary/40 border-r-primary/40"
                            style={{
                                animation: 'spin 3s linear infinite',
                            }}
                        />
                        <div
                            className="absolute h-16 w-16 rounded-full border-2 border-transparent border-b-primary/60 border-l-primary/60"
                            style={{
                                animation: 'spin 2s linear infinite reverse',
                            }}
                        />
                        <LoadingIcon />
                    </div>
                    <div
                        className={`transition-all delay-200 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >
                        <h1 className="font-sans text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                            <span className="text-balance">Loading</span>
                        </h1>
                    </div>
                    <div
                        className={`transition-all delay-300 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                    >
                        <p className="max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            <span className="inline-block animate-pulse">{randomMessage}</span>
                        </p>
                    </div>
                </div>
                <div
                    className={`transition-all delay-400 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                >
                    <div className="flex items-center gap-1">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="h-1.5 w-1.5 rounded-full bg-primary/60"
                                style={{
                                    animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`,
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="sr-only" role="status" aria-live="assertive">
                    Page is loading. Please wait.
                </div>
            </main>
            <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
        </div>
    )
}
