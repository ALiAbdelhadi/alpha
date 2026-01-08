"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { BRAND_COLORS } from "@/lib/constants"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState, useMemo, startTransition } from "react"

const INITIAL_LOAD_KEY = 'alpha_initial_load_complete'

function splitIntoSegments(text: string): string[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
        return Array.from(segmenter.segment(text), s => s.segment)
    }
    return Array.from(text.normalize('NFC').match(/./gu) || [])
}

export function InitialLoader() {
    const locale = useLocale()
    const isRTL = locale === "ar"
    const greeting = isRTL ? "ألفا" : "ALPHA"


    const segments = useMemo(() => {
        if (isRTL) {
            return [greeting]
        }
        return splitIntoSegments(greeting)
    }, [greeting, isRTL])

    const { setIsLoading } = useLoading()

    const containerRef = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const shaderRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    const [shouldRender, setShouldRender] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        startTransition(() => {
            setMounted(true)

            const hasSeenLoader = sessionStorage.getItem(INITIAL_LOAD_KEY)
            if (hasSeenLoader) {
                setIsLoading(false)
                setShouldRender(false)
            } else {
                setShouldRender(true)
            }
        })
    }, [setIsLoading])

    useEffect(() => {
        if (!mounted || !shouldRender || !containerRef.current || hasAnimatedRef.current) {
            return
        }

        hasAnimatedRef.current = true

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    sessionStorage.setItem(INITIAL_LOAD_KEY, 'true')

                    setTimeout(() => {
                        setShouldRender(false)
                        setIsLoading(false)
                    }, 100)
                },
            })

            gsap.set(containerRef.current, { opacity: 1 })
            gsap.set(shaderRef.current, { opacity: 0, scale: 1.05 })

            // Shader animation
            tl.to(shaderRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
            })

            if (isRTL) {
                gsap.set(textContainerRef.current, {
                    opacity: 0,
                    filter: "blur(10px)",
                    scale: 1.1,
                    y: 20
                })

                tl.to(textContainerRef.current, {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                }, "-=1.2")

                tl.to(textContainerRef.current, {
                    scale: 1.01,
                    duration: 1.2,
                    ease: "power2.inOut",
                }, "-=0.4")

                // Exit animation
                tl.to(shaderRef.current, {
                    scale: 1.08,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.in",
                }, "-=0.8")

                tl.to(textContainerRef.current, {
                    y: -60,
                    opacity: 0,
                    filter: "blur(15px)",
                    duration: 0.6,
                    ease: "power2.in",
                }, "<")

            } else {
                // للإنجليزية: نحرك كل حرف على حدة (الكود الأصلي)
                const chars = textContainerRef.current?.querySelectorAll(".char")

                if (chars && chars.length > 0) {
                    tl.to(chars, {
                        opacity: 1,
                        filter: "blur(0px)",
                        scale: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: {
                            each: 0.06,
                            from: "start",
                        },
                    }, "-=1.2")
                }

                tl.to(textContainerRef.current, {
                    scale: 1.01,
                    letterSpacing: "0.02em",
                    duration: 1.2,
                    ease: "power2.inOut",
                }, "-=0.4")

                // Exit animation
                tl.to(shaderRef.current, {
                    scale: 1.08,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.in",
                }, "-=0.8")

                if (chars && chars.length > 0) {
                    tl.to(chars, {
                        y: -60,
                        opacity: 0,
                        filter: "blur(15px)",
                        stagger: {
                            each: 0.03,
                            from: "center",
                        },
                        duration: 0.6,
                        ease: "power2.in",
                    }, "<")
                }
            }

            // Container fade out
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.4,
            }, "-=0.3")

        }, containerRef)

        return () => {
            ctx.revert()
        }
    }, [mounted, shouldRender, isRTL, setIsLoading])

    if (!mounted || !shouldRender) return null

    return (
        <div
            ref={containerRef}
            className="fixed min-h-screen inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden font-sans text-primary pointer-events-none"
            dir={isRTL ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <div
                ref={shaderRef}
                className="absolute inset-0 z-0 opacity-0 will-change-transform transform-gpu"
            >
                <div className="absolute inset-0 overflow-hidden bg-background">
                    <style jsx>{`
                        @keyframes float {
                            0%, 100% { transform: translate(0px, 0px) scale(1); }
                            50% { transform: translate(20px, -30px) scale(1.05); }
                        }
                        @keyframes floatReverse {
                            0%, 100% { transform: translate(0px, 0px) scale(1); }
                            50% { transform: translate(-25px, 25px) scale(1.03); }
                        }
                        .orb {
                            position: absolute;
                            border-radius: 50%;
                            filter: blur(80px);
                            opacity: 0.5;
                            animation: float 15s infinite ease-in-out;
                            will-change: transform;
                        }
                        .orb-reverse {
                            animation: floatReverse 18s infinite ease-in-out;
                        }
                    `}</style>

                    <div
                        className="orb w-[55vw] h-[55vw] top-[-20%] left-[-10%]"
                        style={{
                            background: `radial-gradient(circle, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)`,
                        }}
                    />

                    <div
                        className="orb orb-reverse w-[45vw] h-[45vw] bottom-[-10%] right-[-10%]"
                        style={{
                            background: `radial-gradient(circle, ${BRAND_COLORS.teal} 0%, ${BRAND_COLORS.cyan} 100%)`,
                            opacity: 0.6,
                            animationDelay: "-5s"
                        }}
                    />

                    <div className="absolute inset-0 backdrop-blur-[60px]" />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at 30% 40%, ${BRAND_COLORS.teal}08 0%, transparent 50%)`
                        }}
                    />
                    <div className="absolute inset-0 bg-background/50" />
                </div>
            </div>

            <div
                className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-20 flex flex-col items-center justify-center">
                <div className="relative">
                    <div
                        ref={textContainerRef}
                        className={cn(
                            "relative font-normal tracking-tight flex items-center select-none overflow-visible",
                            "text-6xl md:text-8xl lg:text-9xl",
                            isRTL ? "font-arabic" : "font-sans"
                        )}
                        style={{
                            textShadow: `
                                0 0 30px ${BRAND_COLORS.cyan}30,
                                0 0 60px ${BRAND_COLORS.teal}20
                            `,
                        }}
                    >
                        {isRTL ? (
                            <span className="inline-block" style={{ willChange: "transform, opacity, filter" }}>
                                {greeting}
                            </span>
                        ) : (
                            segments.map((segment, i) => (
                                <span
                                    key={i}
                                    data-char={i}
                                    className="char opacity-0 blur-sm scale-110 translate-y-2 inline-block"
                                    style={{ willChange: "transform, opacity, filter" }}
                                >
                                    {segment === " " ? "\u00A0" : segment}
                                </span>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}