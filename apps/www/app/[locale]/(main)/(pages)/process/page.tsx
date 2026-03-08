"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Link } from "@/i18n/navigation"
import { localizeNumbers } from "@/lib/number"
import { useLocale, useTranslations } from "next-intl"

import { useEffect, useRef } from "react"

export default function ProcessPage() {
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={sectionRef} className="relative min-h-screen w-full">
            <OpeningSection />
            <PhasesList />
            <ClosingSection />
        </div>
    )
}

function OpeningSection() {
    const t = useTranslations("process.hero")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.8 })
    const descRef = useReveal({ direction: "up", delay: 0.4, duration: 1.2 })

    return (
        <section className="flex min-h-screen items-center section-padding">
            <Container>
                <div className="max-w-4xl">
                    <div ref={titleRef}>
                        <h1 className="mb-8 font-sans font-normal text-primary">
                            {t("title")}
                        </h1>
                    </div>
                    <div ref={descRef}>
                        <p className="max-w-2xl body-lg text-primary/85">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function PhasesList() {
    const t = useTranslations("process.phases")
    const sectionRef = useRef<HTMLElement>(null)
    const locale = useLocale()
    useEffect(() => {
        if (!sectionRef.current) return

        const phases = sectionRef.current.querySelectorAll("[data-phase]")
        const triggers: ScrollTrigger[] = []

        phases.forEach((phase, index) => {
            gsap.set(phase, { opacity: 0, y: 30 })

            const tween = gsap.to(phase, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: phase,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const phases = [
        { number: "1", key: "discovery" },
        { number: "2", key: "wireframe" },
        { number: "3", key: "design" },
        { number: "4", key: "development" },
        { number: "5", key: "launch" },
    ]

    return (
        <section ref={sectionRef} className="section-padding">
            <Container>
                <div className="space-y-16">
                    {phases.map((phase, i) => (
                        <div
                            key={i}
                            data-phase
                            className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16"
                        >
                            <div>
                                <div className="mb-4 font-mono text-5xl font-light text-primary/60 md:text-6xl">
                                    {localizeNumbers(phase.number, locale)}
                                </div>

                                <div className="mono small text-primary/60">
                                    {localizeNumbers(t(`${phase.key}.timeline`), locale)}
                                </div>
                            </div>
                            <div className="max-w-2xl">
                                <h3 className="mb-6 font-sans font-medium text-primary">
                                    {t(`${phase.key}.title`)}
                                </h3>
                                <p className="mb-6 body-lg text-primary/75">
                                    {t(`${phase.key}.description`)}
                                </p>
                                <p className="mb-4 mono-uppercase text-primary/50">
                                    {t(`${phase.key}.yourRole`)}
                                </p>
                                <div className="space-y-2">
                                    <p className="mono-uppercase text-primary/60">
                                        {t("deliverables")}
                                    </p>
                                    <p className="small text-primary/75">
                                        {t(`${phase.key}.deliverables`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ClosingSection() {
    const t = useTranslations("process")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })
    const ctaRef = useReveal({ direction: "up", delay: 0.25, duration: 0.5 })

    return (
        <section className="section-padding">
            <Container>
                <div className="max-w-3xl">
                    <div ref={titleRef} className="mb-12">
                        <h2 className="mb-3 font-sans font-normal text-primary">
                            {t("flexibility.title")}
                        </h2>
                    </div>
                    <div ref={descRef} className="mb-12">
                        <p className="body-lg text-primary/85">
                            {t("flexibility.description")}
                        </p>
                    </div>
                    <div ref={ctaRef}>
                        <Link href="/schedule">
                            <MagneticButton variant="primary" size="lg" className="group">
                                <span className="flex items-center gap-2">
                                    {t("closing.cta")}
                                    <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
