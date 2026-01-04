"use client"

import { useEffect, useRef, useState } from "react"
import { BRAND_COLORS } from "@/lib/constants"
import { ChromaFlow, Shader, Swirl } from "shaders/react"
import { useLocale } from "next-intl"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/**
 * Enhanced Loading Screen with Timer Counter & Typing Animation
 * 
 * Features:
 * - Progress counter (0-100%) with timer
 * - Apple-style greeting message (Hello/مرحباً) with typing animation
 * - Minimalist design matching design system
 * - Shows once only
 */
export default function Loading() {
    const locale = useLocale()
    const containerRef = useRef<HTMLDivElement>(null)
    const greetingRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [showGreeting, setShowGreeting] = useState(false)
    const [typedText, setTypedText] = useState("")
    const hasShownRef = useRef(false)

    const greeting = locale === "ar" ? "مرحباً" : "Hello"
    const duration = 2500 // 2.5 seconds total

    useEffect(() => {
        // Check if already shown (localStorage)
        const hasShown = typeof window !== "undefined" && localStorage.getItem("alpha-loader-shown") === "true"
        
        if (hasShown || hasShownRef.current) {
            // Hide immediately if already shown
            if (containerRef.current) {
                gsap.set(containerRef.current, { opacity: 0, pointerEvents: "none" })
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.display = "none"
                    }
                }, 100)
            }
            return
        }

        if (!containerRef.current) return

        // Mark as shown
        hasShownRef.current = true
        if (typeof window !== "undefined") {
            localStorage.setItem("alpha-loader-shown", "true")
        }

        // Initial setup
        gsap.set(containerRef.current, { opacity: 1 })
        gsap.set([greetingRef.current, counterRef.current, progressRef.current], { opacity: 0, y: 20 })

        // Progress counter animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const next = Math.min(prev + 2, 100)
                if (next >= 100) {
                    clearInterval(progressInterval)
                }
                return next
            })
        }, duration / 50) // Update every 50ms

        // Show greeting after 300ms
        setTimeout(() => {
            setShowGreeting(true)
            
            // Typing animation
            const text = greeting
            let currentIndex = 0
            
            const typingInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    setTypedText(text.slice(0, currentIndex + 1))
                    currentIndex++
                } else {
                    clearInterval(typingInterval)
                    
                    // Animate greeting in
                    if (greetingRef.current) {
                        gsap.to(greetingRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        })
                    }
                }
            }, 100) // Typing speed
        }, 300)

        // Show counter after 800ms
        setTimeout(() => {
            if (counterRef.current) {
                gsap.to(counterRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
            }
        }, 800)

        // Show progress bar after 1000ms
        setTimeout(() => {
            if (progressRef.current) {
                gsap.to(progressRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
            }
        }, 1000)

        // Fade out and hide after duration
        const fadeOutTimeout = setTimeout(() => {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        if (containerRef.current) {
                            containerRef.current.style.display = "none"
                        }
                    }
                })
            }
        }, duration)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(fadeOutTimeout)
        }
    }, [greeting, locale])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
            {/* Shader Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Shader className="h-full w-full">
                    <Swirl
                        colorA={BRAND_COLORS.teal}
                        colorB={BRAND_COLORS.cyan}
                        speed={0.4}
                        detail={0.5}
                        blend={30}
                        coarseX={20}
                        coarseY={20}
                        mediumX={20}
                        mediumY={20}
                        fineX={20}
                        fineY={20}
                    />
                    <ChromaFlow
                        baseColor={BRAND_COLORS.tealLight}
                        upColor={BRAND_COLORS.cyan}
                        downColor={BRAND_COLORS.teal}
                        leftColor={BRAND_COLORS.cyanDark}
                        rightColor={BRAND_COLORS.cyanLight}
                        intensity={0.6}
                        radius={1.2}
                        momentum={20}
                        maskType="alpha"
                        opacity={0.4}
                    />
                </Shader>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center gap-8">
                {/* Greeting with typing animation */}
                {showGreeting && (
                    <div
                        ref={greetingRef}
                        className={cn(
                            "font-sans text-6xl font-light tracking-tight text-foreground",
                            "md:text-7xl lg:text-8xl",
                            "transition-all duration-300"
                        )}
                        style={{
                            minHeight: "1.2em",
                            textShadow: `0 0 30px ${BRAND_COLORS.cyan}40`,
                        }}
                    >
                        {typedText}
                        {typedText.length < greeting.length && (
                            <span className="animate-pulse">|</span>
                        )}
                    </div>
                )}

                {/* Progress Counter */}
                <div
                    ref={counterRef}
                    className={cn(
                        "font-mono text-2xl font-light text-foreground/60",
                        "md:text-3xl",
                        "transition-all duration-300"
                    )}
                >
                    {progress}%
                </div>

                {/* Progress Bar */}
                <div
                    ref={progressRef}
                    className="relative h-px w-64 overflow-hidden rounded-full bg-foreground/10 md:w-80"
                >
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all duration-300 ease-out"
                        style={{
                            width: `${progress}%`,
                            boxShadow: `0 0 20px ${BRAND_COLORS.cyan}60`,
                        }}
                    />
                </div>
            </div>

            {/* Grain Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-30 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />
        </div>
    )
}
