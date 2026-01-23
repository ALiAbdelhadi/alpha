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
            className="relative overflow-hidden"
            style={{
                minHeight: '100vh',
                paddingTop: 'clamp(6rem, 10vh, 8rem)',
                paddingBottom: 'clamp(6rem, 10vh, 8rem)'
            }}
            aria-label="Call to action section"
        >
            <Container>
                <div
                    ref={contentRef}
                    className="relative border-b border-foreground/10 pb-16"
                >
                    <div className="relative z-10 max-w-4xl">
                        <h2
                            ref={headingRef}
                            className="mb-8 font-sans font-normal text-primary"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 3.815rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            <span className="text-balance">
                                {t("title") || "Ready to transform your vision?"}
                            </span>
                        </h2>
                        <p
                            ref={descriptionRef}
                            className="mb-12 max-w-2xl text-primary/80"
                            style={{
                                fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                                lineHeight: 1.6,
                            }}
                        >
                            <span className="text-pretty">
                                {t("description") ||
                                    "Join us in creating something extraordinary. Let's collaborate on your next project and bring your ideas to life with innovation and precision."}
                            </span>
                        </p>
                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-8">
                            <MagneticButton
                                size="lg"
                                variant="primary"
                                onClick={() => scrollToSection?.("contact")}
                                aria-label={t("primaryAction") || "Schedule a consultation"}
                                className="group"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {t("primaryAction") || "Get started"}
                                    <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
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
                                            className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                        <p className="text-xs text-primary/60 font-mono tracking-wide">
                            {t("footnote") || "Typically respond within 24 hours • Available Mon-Fri, 9am-6pm"}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}