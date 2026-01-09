"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function CaseStudyPage() {
    const t = useTranslations("caseStudy")
    const sectionRef = useRef<HTMLElement>(null)
    const heroRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })

    useEffect(() => {
        if (!sectionRef.current) return

        const sections = sectionRef.current.querySelectorAll("[data-section]")
        const triggers: ScrollTrigger[] = []

        sections.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 20 })

            const tween = gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => {
            triggers.forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <main ref={sectionRef} className="min-h-screen pt-24 md:pt-32">
            <Container>
                <section ref={heroRef} className="mb-20 md:mb-32">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="font-mono text-sm text-foreground/60">
                            {t("meta.client")}
                        </span>
                        <span className="h-px w-12 bg-foreground/20" />
                        <span className="font-mono text-sm text-foreground/60">
                            {t("meta.duration")}
                        </span>
                    </div>
                    <h1 className="mb-6 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        {t("title")}
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">
                        {t("subtitle")}
                    </p>
                </section>

                <section data-section className="mb-24 md:mb-32">
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                        {t("problem.title")}
                    </h2>
                    <div className="max-w-3xl space-y-6">
                        {t("problem.description")
                            .split("\n\n")
                            .map((para: string, i: number) => (
                                <p
                                    key={i}
                                    className="text-base leading-relaxed text-foreground/85"
                                >
                                    {para}
                                </p>
                            ))}
                    </div>
                </section>

                <section data-section className="mb-24 md:mb-32">
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                        {t("technical.title")}
                    </h2>
                    <div className="space-y-12">
                        {["decision1", "decision2", "decision3"].map((key) => (
                            <div key={key} className="max-w-3xl">
                                <h3 className="mb-3 text-xl font-medium text-foreground">
                                    {t(`technical.${key}.title`)}
                                </h3>
                                <p className="mb-4 text-base leading-relaxed text-foreground/75">
                                    {t(`technical.${key}.description`)}
                                </p>
                                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                                    <pre className="overflow-x-auto text-xs text-foreground/70">
                                        <code>{t(`technical.${key}.code`)}</code>
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section data-section className="mb-24 md:mb-32">
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                        {t("architecture.title")}
                    </h2>
                    <div className="max-w-3xl space-y-8">
                        <p className="text-base leading-relaxed text-foreground/85">
                            {t("architecture.description")}
                        </p>
                        <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-6">
                            <pre className="overflow-x-auto text-sm text-foreground/70">
                                <code>{t("architecture.structure")}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section data-section className="mb-24 md:mb-32">
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                        {t("performance.title")}
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {["lighthouse", "loadTime", "bundle"].map((metric) => (
                            <div
                                key={metric}
                                className="rounded-lg border border-foreground/10 p-6"
                            >
                                <p className="mb-2 font-mono text-3xl font-medium text-foreground">
                                    {t(`performance.metrics.${metric}.value`)}
                                </p>
                                <p className="mb-1 text-sm font-medium text-foreground/80">
                                    {t(`performance.metrics.${metric}.label`)}
                                </p>
                                <p className="text-xs text-foreground/60">
                                    {t(`performance.metrics.${metric}.detail`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section data-section className="mb-20 border-t border-foreground/10 pt-16">
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                        {t("results.title")}
                    </h2>
                    <div className="max-w-3xl space-y-6">
                        {t("results.description")
                            .split("\n\n")
                            .map((para: string, i: number) => (
                                <p
                                    key={i}
                                    className="text-base leading-relaxed text-foreground/85"
                                >
                                    {para}
                                </p>
                            ))}
                    </div>
                </section>
            </Container>
        </main>
    )
}