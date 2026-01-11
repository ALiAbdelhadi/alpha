"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { Container } from "@/components/container"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface CtaSectionProps {
    scrollToSection?: (sectionId: string) => void
}

export function CtaSectionEnhanced({ scrollToSection }: CtaSectionProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const headingRef = useRef<HTMLHeadingElement | null>(null)
    const descriptionRef = useRef<HTMLParagraphElement | null>(null)
    const buttonsRef = useRef<HTMLDivElement | null>(null)
    const decorativeLineRef = useRef<HTMLDivElement | null>(null)

    const t = useTranslations("cta")
    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 32 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                },
            )

            // Staggered animations for child elements
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    },
                )
            }

            if (descriptionRef.current) {
                gsap.fromTo(
                    descriptionRef.current,
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    },
                )
            }

            if (buttonsRef.current) {
                gsap.fromTo(
                    buttonsRef.current,
                    { opacity: 0, y: 12 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    },
                )
            }

            // Decorative line animation
            if (decorativeLineRef.current) {
                gsap.fromTo(
                    decorativeLineRef.current,
                    { scaleX: 0, transformOrigin: "left" },
                    {
                        scaleX: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        delay: 0.15,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            once: true,
                        },
                    },
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="cta"
            className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
            aria-label="Call to action section"
        >
            <Container>
                <div
                    ref={contentRef}
                    className="relative overflow-hidden rounded-3xl border border-foreground/10 backdrop-blur-md bg-foreground/2 p-8 sm:p-10 md:p-16 lg:p-20 will-animate-gpu"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `
                radial-gradient(circle at 20% 30%, oklch(0.645 0.15 185)/8 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, oklch(0.35 0.12 185)/8 0%, transparent 40%)
              `,
                        }}
                        aria-hidden="true"
                    />
                    <div className="relative z-10">
                        <h2
                            ref={headingRef}
                            className="mb-6 sm:mb-8 font-sans text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight text-foreground"
                        >
                            <span className="text-balance">{t("title") || "Ready to transform your vision?"}</span>
                        </h2>
                        <p
                            ref={descriptionRef}
                            className="mb-10 sm:mb-12 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-foreground/80"
                        >
                            <span className="text-pretty">
                                {t("description") ||
                                    "Join us in creating something extraordinary. Let's collaborate on your next project and bring your ideas to life with innovation and precision."}
                            </span>
                        </p>
                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8 sm:mb-10">
                            <MagneticButton
                                size="lg"
                                variant="primary"
                                onClick={() => scrollToSection?.("contact")}
                                aria-label={t("primaryAction") || "Schedule a consultation"}
                                className="group relative"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {t("primaryAction") || "Get started"}
                                    <Calendar className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                                </span>
                            </MagneticButton>
                            <Link href="/approach">
                                <MagneticButton
                                    size="lg"
                                    variant="secondary"
                                    aria-label={t("secondaryAction") || "View our work"}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {t("secondaryAction") || "Explore portfolio"}
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/60 font-mono tracking-wide">
                            {t("footnote") || "Typically respond within 24 hours • Available Mon-Fri, 9am-6pm"}
                        </p>
                    </div>
                    <div
                        className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: "radial-gradient(circle, oklch(0.75 0.18 190)/10 0%, transparent 70%)",
                        }}
                        aria-hidden="true"
                    />
                </div>
            </Container>
        </section>
    )
}
