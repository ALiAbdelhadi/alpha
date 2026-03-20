"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { memo, startTransition, useEffect, useMemo, useRef, useState } from "react"

const INITIAL_LOAD_KEY = "Altruvex_initial_load_complete"

function splitIntoSegments(text: string): string[] {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const seg = new Intl.Segmenter("en", { granularity: "grapheme" })
        return Array.from(seg.segment(text), (s) => s.segment)
    }
    return Array.from(text.normalize("NFC").match(/./gu) || [])
}

export const InitialLoader = memo(function InitialLoader() {
    const locale = useLocale()
    const isRTL = locale === "ar"
    const greeting = isRTL ? "ألتروفيكس" : "Altruvex"

    const segments = useMemo(() => {
        return isRTL ? [greeting] : splitIntoSegments(greeting)
    }, [greeting, isRTL])

    const { setIsLoading } = useLoading()

    const containerRef = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const shaderRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    const [shouldRender, setShouldRender] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Use standardized scroll locking
    useLockBodyScroll(shouldRender)

    useEffect(() => {
        startTransition(() => {
            setMounted(true)

            if (sessionStorage.getItem(INITIAL_LOAD_KEY)) {
                setIsLoading(false)
                setShouldRender(false)
            } else {
                setShouldRender(true)
            }
        })
    }, [setIsLoading])

    useEffect(() => {
        if (!mounted || !shouldRender || !containerRef.current || hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        const ctx = gsap.context(() => {
            const handleExit = () => {
                sessionStorage.setItem(INITIAL_LOAD_KEY, "true")
                setShouldRender(false)
                setIsLoading(false)
            }

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: handleExit,
            })

            gsap.set(containerRef.current, { opacity: 1 })
            gsap.set(shaderRef.current, { opacity: 0, scale: 1.05 })

            tl.to(shaderRef.current, {
                opacity: 1, scale: 1, duration: 2.2, ease: "expo.out",
                force3D: true
            })

                if (isRTL) {
                    gsap.set(textContainerRef.current, {
                        opacity: 0, filter: "blur(10px)", scale: 1.1, y: 20,
                    })
                    tl.to(textContainerRef.current, {
                        opacity: 1, filter: "blur(0px)", scale: 1, y: 0,
                        duration: 1.8, ease: "expo.out",
                        force3D: true
                    }, "-=1.8")
                    
                    // Label entry
                    const label = containerRef.current?.querySelector(".loader-label")
                    if (label) {
                        tl.fromTo(label, 
                            { opacity: 0, y: 10 },
                            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                            "-=1.2"
                        )
                    }

                    tl.to(textContainerRef.current, {
                        scale: 1.01, duration: 1.6, ease: "power2.inOut",
                        force3D: true
                    }, "-=0.6")
                    tl.to(shaderRef.current, {
                        scale: 1.1, opacity: 0, duration: 1.4, ease: "expo.in",
                        force3D: true
                    }, "-=1.2")
                    tl.to(textContainerRef.current, {
                        y: -40, opacity: 0, filter: "blur(15px)",
                        duration: 1.1, ease: "expo.in",
                        force3D: true
                    }, "<")
                } else {
                    const chars = textContainerRef.current?.querySelectorAll(".char")
                    if (chars?.length) {
                            tl.to(chars, {
                                opacity: 1, filter: "blur(0px)", scale: 1, y: 0,
                                duration: 1.4,
                                ease: "expo.out",
                                stagger: { each: 0.08, from: "start" },
                                force3D: true
                            }, "-=1.8")
                        }

                    // Label entry
                    const label = containerRef.current?.querySelector(".loader-label")
                    if (label) {
                        tl.fromTo(label, 
                            { opacity: 0, y: 10 },
                            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                            "-=1.4"
                        )
                    }

                    tl.to(textContainerRef.current, {
                    scale: 1.01, letterSpacing: "0.02em",
                    duration: 1.6, ease: "power2.inOut",
                    force3D: true
                }, "-=0.6")
                tl.to(shaderRef.current, {
                    scale: 1.1, opacity: 0, duration: 1.4, ease: "expo.in",
                    force3D: true
                }, "-=1.2")
                if (chars?.length) {
                    tl.to(chars, {
                        y: -40, opacity: 0, filter: "blur(15px)",
                        duration: 1.1, ease: "expo.in",
                        stagger: { each: 0.04, from: "center" },
                        force3D: true
                    }, "<")
                }
            }

            // Animate orbs smoothly with GSAP instead of CSS
            const orbs = containerRef.current?.querySelectorAll(".loader-orb, .loader-orb-reverse")
            if (orbs?.length) {
                gsap.to(orbs, {
                    x: "random(-20, 20)",
                    y: "random(-20, 20)",
                    scale: "random(0.98, 1.05)",
                    duration: "random(4, 6)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: { each: 0.5, from: "random" }
                })
            }

            tl.to(containerRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.4")
        }, containerRef)

        return () => ctx.revert()
    }, [mounted, shouldRender, isRTL, setIsLoading])

    // Ensure scroll is unlocked on unmount (safety net)
    useEffect(() => {
        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    if (!mounted || !shouldRender) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden pointer-events-none"
            dir={isRTL ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <div
                ref={shaderRef}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <div className="absolute inset-0 bg-background" />
                <div
                    className="absolute rounded-full loader-orb"
                    style={{
                        width: "58vw",
                        height: "58vw",
                        top: "-20%",
                        left: "-12%",
                        background:
                            "radial-gradient(circle, rgba(20, 48, 77, 1) 0%, rgba(31, 75, 87, 1) 100%)",
                        filter: "blur(85px)",
                        opacity: 0.70,
                        willChange: "transform, opacity",
                    }}
                />
                <div
                    className="absolute rounded-full loader-orb-reverse"
                    style={{
                        width: "46vw",
                        height: "46vw",
                        bottom: "-12%",
                        right: "-10%",
                        background:
                            "radial-gradient(circle, rgba(55, 138, 140, 1) 0%, rgba(100, 175, 185, 1) 100%)",
                        filter: "blur(85px)",
                        opacity: 0.60,
                        animationDelay: "-5s",
                        willChange: "transform, opacity",
                    }}
                />
                <div
                    className="absolute rounded-full loader-orb"
                    style={{
                        width: "28vw",
                        height: "28vw",
                        top: "28%",
                        right: "18%",
                        background:
                            "radial-gradient(circle, rgba(140, 195, 205, 1) 0%, transparent 70%)",
                        filter: "blur(65px)",
                        opacity: 0.28,
                        animationDelay: "-9s",
                        willChange: "transform, opacity",
                    }}
                />
                <div className="absolute inset-0 backdrop-blur-[65px]" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, var(--color-background) 100%)",
                        opacity: 0.5,
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        opacity: 0.04,
                    }}
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-5">
                <div
                    ref={textContainerRef}
                    className={cn(
                        "flex items-center select-none overflow-visible",
                        "font-sans font-normal tracking-tight text-primary",
                        "text-6xl md:text-8xl lg:text-9xl",
                        isRTL && "font-arabic",
                    )}
                    style={{ letterSpacing: "-0.025em" }}
                >
                    {isRTL ? (
                        <span
                            className="inline-block"
                            style={{ willChange: "transform, opacity, filter" }}
                        >
                            {greeting}
                        </span>
                    ) : (
                        segments.map((segment, i) => (
                            <span
                                key={i}
                                className="char inline-block opacity-0"
                                style={{
                                    willChange: "transform, opacity, filter",
                                    filter: "blur(8px)",
                                    transform: "scale(1.1) translateY(12px)",
                                }}
                            >
                                {segment === " " ? "\u00A0" : segment}
                            </span>
                        ))
                    )}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-primary/30 loader-label">
                    Web Design Studio
                </span>
            </div>

            <style>{`
        .loader-orb, .loader-orb-reverse {
           will-change: transform, opacity;
        }
      `}</style>
        </div>
    )
})