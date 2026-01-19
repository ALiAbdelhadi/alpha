"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useLocale, useTranslations } from "next-intl"
import { localizeNumbers } from "@/lib/number"

import { useEffect, useRef } from "react"

export default function ProcessPage() {
    const sectionRef = useRef<HTMLElement>(null)

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
        <section className="flex min-h-screen items-center pt-24 md:pt-32">
            <Container>
                <div className="max-w-4xl">
                    <div ref={titleRef}>
                        <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl">
                            {t("title")}
                        </h1>
                    </div>
                    <div ref={descRef}>
                        <p className="max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl">
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
        { number: "2", key: "architecture" },
        { number: "3", key: "development" },
        { number: "4", key: "launch" },
        { number: "5", key: "support" },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div className="space-y-24 md:space-y-32">
                    {phases.map((phase, i) => (
                        <div
                            key={i}
                            data-phase
                            className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16 lg:gap-24"
                        >
                            <div>
                                <div className="mb-4 font-mono text-5xl font-light text-primary/60 md:text-6xl">
                                    {localizeNumbers(phase.number, locale)}
                                </div>

                                <div className="font-mono text-sm text-primary/60">
                                    {localizeNumbers(t(`${phase.key}.timeline`), locale)}
                                </div>
                            </div>
                            <div className="max-w-2xl">
                                <h3 className="mb-6 font-sans text-3xl font-medium text-primary md:text-4xl">
                                    {t(`${phase.key}.title`)}
                                </h3>
                                <p className="mb-6 text-lg leading-relaxed text-primary/75 md:text-xl">
                                    {t(`${phase.key}.description`)}
                                </p>
                                <div className="space-y-2">
                                    <p className="font-mono text-xs font-medium uppercase tracking-wide text-primary/60">
                                        {t("deliverables")}
                                    </p>
                                    <p className="text-sm text-primary/75">
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
    const t = useTranslations("process.flexibility")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })

    return (
        <section className="py-24 pb-32 md:py-32 md:pb-40">
            <Container>
                <div className="max-w-3xl">
                    <div ref={titleRef} className="mb-8 md:mb-12">
                        <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-primary md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                    </div>
                    <div ref={descRef}>
                        <p className="text-lg leading-relaxed text-primary/85 md:text-xl">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
