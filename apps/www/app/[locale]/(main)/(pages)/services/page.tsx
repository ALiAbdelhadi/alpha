"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ServicesPage() {
    return (
        <div className="relative min-h-screen w-full">
            <HeroSection />
            <ServicesGrid />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("servicesPage")
    const badgeRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.6 })
    const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", delay: 0.15, duration: 0.7 })
    const descRef = useReveal<HTMLParagraphElement>({ direction: "up", delay: 0.25, duration: 0.6 })
    const buttonsRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.35, duration: 0.6 })

    return (
        <section className="flex min-h-screen items-center justify-center pt-20 pb-12">
            <Container>
                <div>
                    <div
                        ref={badgeRef}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/10 px-4 py-2 backdrop-blur-sm"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                        <p className="font-mono text-xs text-primary/90 tracking-wide uppercase">
                            {t("badge")}
                        </p>
                    </div>
                    <h1
                        ref={titleRef}
                        className="mb-6 font-sans font-normal text-primary"
                        style={{
                            fontSize: 'clamp(2.5rem, 7vw, 4.768rem)',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        <span className="text-balance">
                            {t("title")}
                            <br />
                            <span className="text-primary/70">{t("titleHighlight")}</span>
                        </span>
                    </h1>

                    <p
                        ref={descRef}
                        className="mb-10 text-primary/85"
                        style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                            lineHeight: 1.6,
                            maxWidth: '42ch'
                        }}
                    >
                        <span className="text-pretty">{t("description")}</span>
                    </p>
                    <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row sm:items-center ">
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group relative">
                                <span className="flex items-center gap-2">
                                    {t("ctaPrimary")}
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="/services/web-design">
                            <MagneticButton size="lg" variant="secondary">
                                {t("ctaSecondary")}
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function ServicesGrid() {
    const t = useTranslations("servicesPage")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const cards = sectionRef.current.querySelectorAll("[data-service-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 20 })

            const revealTween = gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (revealTween.scrollTrigger) {
                triggers.push(revealTween.scrollTrigger)
            }
        })

        return () => triggers.forEach((trigger) => trigger.kill())
    }, [])

    const services = [
        { key: "webDesign", href: "/services/web-design", number: "01" },
        { key: "development", href: "/services/development", number: "02" },
        { key: "consulting", href: "/services/consulting", number: "03" },
        { key: "maintenance", href: "/services/maintenance", number: "04" },
    ]

    return (
        <section ref={sectionRef} className="py-20 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <h2
                        className="font-sans font-normal tracking-tight text-primary"
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.815rem)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {t("gridTitle")}
                    </h2>
                    <p className="font-mono text-sm text-primary/60 tracking-wide md:text-base mt-3">
                        {t("gridSubtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {services.map((service) => (
                        <Link key={service.number} href={service.href}>
                            <div
                                data-service-card
                                className="group cursor-pointer border-b border-foreground/10 transition-colors duration-300 hover:bg-foreground/2"
                                style={{
                                    paddingTop: 'clamp(2rem, 4vh, 3rem)',
                                    paddingBottom: 'clamp(2rem, 4vh, 3rem)',
                                    paddingLeft: 'clamp(1rem, 2vw, 2rem)',
                                    paddingRight: 'clamp(1rem, 2vw, 2rem)',
                                }}
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="h-px w-10 bg-foreground/25 transition-colors group-hover:bg-foreground/40" />
                                    <span className="font-mono text-xs text-primary/50 transition-all group-hover:text-primary/70">
                                        {service.number}
                                    </span>
                                </div>
                                <h3
                                    className="mb-3 font-sans font-medium text-primary transition-colors group-hover:text-primary/90"
                                    style={{
                                        fontSize: 'clamp(1.5rem, 2.5vw, 2.441rem)',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {t(`services.${service.key}.title`)}
                                </h3>
                                <p
                                    className="text-primary/75"
                                    style={{
                                        fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                                        lineHeight: 1.6,
                                        maxWidth: '38ch'
                                    }}
                                >
                                    {t(`services.${service.key}.description`)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function CtaSection() {
    const t = useTranslations("servicesPage")
    const contentRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.6 })

    return (
        <section className="py-20 md:py-32">
            <Container>
                <div
                    ref={contentRef}
                    className="relative overflow-hidden rounded-3xl border border-foreground/10 backdrop-blur-md bg-foreground/2"
                    style={{
                        padding: 'clamp(2rem, 5vw, 5rem)'
                    }}
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
                            className="mb-6 font-sans font-normal text-primary"
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.815rem)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            <span className="text-balance">{t("ctaTitle")}</span>
                        </h2>
                        <p
                            className="mb-10 text-primary/80"
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                                lineHeight: 1.6,
                                maxWidth: '42ch'
                            }}
                        >
                            <span className="text-pretty">{t("ctaDescription")}</span>
                        </p>
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group relative">
                                <span className="flex items-center gap-2">
                                    {t("ctaButton")}
                                    <svg
                                        className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}