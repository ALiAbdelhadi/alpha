/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"

const BRAND_COLORS = {
    tealDarkest: "#064e3b",
    tealDark: "#0f766e",
    teal: "#0d9488",
    tealLight: "#14b8a6",
    tealLighter: "#2dd4bf",
    cyanDark: "#0891b2",
    cyan: "#06b6d4",
    cyanLight: "#22d3ee",
    cyanLighter: "#67e8f9",
    navyDeep: "#0a1929",
    navy: "#0f172a",
    navyMedium: "#1e293b",
    accent: "#0ea5e9",
    accentLight: "#38bdf8",
} as const

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ")
}

interface GSAPType {
    timeline: (config?: any) => any
    context: (func: () => void, scope?: any) => { revert: () => void }
    set: (target: any, vars: any) => void
    to: (target: any, vars: any) => void
    from: (target: any, vars: any) => void
    fromTo: (target: any, fromVars: any, toVars: any) => void
}

declare global {
    interface Window {
        gsap?: GSAPType
    }
}

const useGSAP = () => {
    const [gsapRef, setGsapRef] = useState<GSAPType | null>(null)
    const loadingRef = useRef(false)

    useEffect(() => {
        if (loadingRef.current) return
        loadingRef.current = true

        if (typeof window !== "undefined" && window.gsap) {
            setGsapRef(() => window.gsap!)
            return
        }

        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        script.async = true
        script.onload = () => {
            if (window.gsap) {
                setGsapRef(() => window.gsap!)
            }
        }
        script.onerror = () => {
            console.error("Failed to load GSAP library")
            loadingRef.current = false
        }
        document.body.appendChild(script)

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
        }
    }, [])

    return gsapRef
}

const SimulatedShaderBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-background">
            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes floatReverse {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(-40px, 40px) scale(1.05); }
                    66% { transform: translate(30px, -30px) scale(0.95); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.6;
                    animation: float 18s infinite ease-in-out;
                    will-change: transform;
                }
                .orb-reverse {
                    animation: floatReverse 20s infinite ease-in-out;
                }
            `}</style>
            
            <div
                className="orb w-[65vw] h-[65vw] top-[-25%] left-[-15%]"
                style={{ 
                    background: `radial-gradient(circle, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)`,
                    animationDelay: "0s" 
                }}
            />
            
            <div
                className="orb orb-reverse w-[55vw] h-[55vw] bottom-[-15%] right-[-15%]"
                style={{ 
                    background: `radial-gradient(circle, ${BRAND_COLORS.teal} 0%, ${BRAND_COLORS.cyan} 100%)`,
                    animationDelay: "-6s",
                    opacity: 0.7
                }}
            />
            
            <div
                className="orb w-[45vw] h-[45vw] top-[35%] left-[35%]"
                style={{ 
                    background: `radial-gradient(circle, ${BRAND_COLORS.cyanLight} 0%, ${BRAND_COLORS.accent} 100%)`,
                    animationDelay: "-10s",
                    opacity: 0.4
                }}
            />
            
            <div
                className="orb orb-reverse w-[40vw] h-[40vw] top-[10%] right-[5%]"
                style={{ 
                    background: `radial-gradient(circle, ${BRAND_COLORS.navyMedium} 0%, ${BRAND_COLORS.tealDark} 100%)`,
                    animationDelay: "-14s",
                    opacity: 0.5
                }}
            />
            
            <div
                className="orb w-[35vw] h-[35vw] bottom-[5%] left-[10%]"
                style={{ 
                    background: `radial-gradient(circle, ${BRAND_COLORS.tealLight} 0%, ${BRAND_COLORS.cyanLighter} 100%)`,
                    animationDelay: "-3s",
                    opacity: 0.35
                }}
            />
            
            <div className="absolute inset-0 backdrop-blur-[90px]" />
            <div 
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 30% 40%, ${BRAND_COLORS.teal}10 0%, transparent 50%)`
                }}
            />
            <div className="absolute inset-0 bg-background/40" />
        </div>
    )
}

interface SplitTextProps {
    text: string
    isRTL: boolean
}

const SplitText = ({ text, isRTL }: SplitTextProps) => {
    const isArabic = /[\u0600-\u06FF]/.test(text)

    return (
        <span>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    data-char={i}
                    className={cn(
                        "char opacity-0 blur-sm scale-110 translate-y-2",
                        isArabic ? "inline" : "inline-block"
                    )}
                    style={{ willChange: "transform, opacity, filter" }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    )
}

export function InitialLoader() {
    const locale = useLocale()
    const isRTL = locale === "ar"
    const greeting = isRTL ? "ألفا" : "ALPHA"

    const containerRef = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const shaderRef = useRef<HTMLDivElement>(null)
    const hasAnimatedRef = useRef(false)

    const [shouldRender, setShouldRender] = useState(true)

    const gsap = useGSAP()

    useEffect(() => {
        if (!shouldRender || !gsap || !containerRef.current || hasAnimatedRef.current) {
            return
        }

        hasAnimatedRef.current = true

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "expo.out" },
                onComplete: () => {
                    if (typeof window !== "undefined") {
                        sessionStorage.setItem("alpha-loader", "true")
                    }
                    setTimeout(() => setShouldRender(false), 100)
                },
            })

            const chars = textContainerRef.current?.querySelectorAll(".char")

            gsap.set(containerRef.current, { opacity: 1 })
            gsap.set(shaderRef.current, { opacity: 0, scale: 1.1 })

            tl.to(shaderRef.current, {
                opacity: 1,
                scale: 1,
                duration: 2.8,
                ease: "power2.out",
            })

            if (chars && chars.length > 0) {
                tl.to(chars, {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    y: 0,
                    x: 0,
                    duration: 1.3,
                    stagger: {
                        each: 0.09,
                        from: "start",
                    },
                }, "-=2.0")
            }

            tl.to(textContainerRef.current, {
                scale: 1.02,
                letterSpacing: isRTL ? "0em" : "0.03em",
                duration: 2.2,
                ease: "power1.inOut",
            }, "-=0.6")

            tl.to(shaderRef.current, {
                scale: 1.15,
                opacity: 0,
                duration: 1.3,
                ease: "power3.in",
            }, "-=1.6")

            tl.to(chars, {
                y: -90,
                opacity: 0,
                filter: "blur(25px)",
                stagger: {
                    each: 0.04,
                    from: "center",
                },
                duration: 0.9,
                ease: "power3.in",
            }, "<")

            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
            }, "-=0.4")

        }, containerRef)

        return () => {
            ctx.revert()
        }
    }, [gsap, shouldRender, isRTL])

    if (!shouldRender) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden font-sans text-foreground pointer-events-none"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div
                ref={shaderRef}
                className="absolute inset-0 z-0 opacity-0 will-change-transform transform-gpu"
            >
                <SimulatedShaderBackground />
            </div>

            <div
                className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            <div
                className="absolute inset-0 z-5 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${BRAND_COLORS.cyanLight}20 0%, transparent 60%)`
                }}
            />

            <div className="relative z-20 flex flex-col items-center justify-center">
                <div className="relative">
                    <div
                        ref={textContainerRef}
                        className={cn(
                            "relative font-light tracking-tight flex items-center select-none overflow-visible",
                            "text-6xl md:text-8xl lg:text-9xl",
                            isRTL ? "font-arabic" : "font-sans"
                        )}
                        style={{
                            textShadow: `
                                0 0 40px ${BRAND_COLORS.cyan}40,
                                0 0 80px ${BRAND_COLORS.teal}30,
                                0 0 120px ${BRAND_COLORS.accent}20
                            `,
                        }}
                    >
                        <SplitText text={greeting} isRTL={isRTL} />
                    </div>
                </div>
            </div>
        </div>
    )
}