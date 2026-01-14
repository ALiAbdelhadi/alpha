"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function CaseStudyPage() {
    return (
        <main className="relative min-h-screen w-full">
            <HeroSection />
            <ProblemSection />
            <TechnicalSection />
            <ArchitectureSection />
            <PerformanceSection />
            <ResultsSection />
        </main>
    )
}

function HeroSection() {
    const t = useTranslations("caseStudy")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const descRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <section className="flex items-center pt-24 md:pt-32 mb-24 md:mb-32">
            <Container>
                <div className="flex flex-col">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="font-mono text-sm text-primary/60">
                            {t("meta.client")}
                        </span>
                        <span className="h-px w-12 bg-foreground/20" />
                        <span className="font-mono text-sm text-primary/60">
                            {t("meta.duration")}
                        </span>
                    </div>
                    <div className="max-w-4xl">
                        <div ref={titleRef}>
                            <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl">
                                {t("title")}
                            </h1>
                        </div>
                        <div ref={descRef}>
                            <p className="max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function ProblemSection() {
    const t = useTranslations("caseStudy.problem")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    // Animation specifically for paragraphs
    useEffect(() => {
        if (!sectionRef.current) return
        const paragraphs = sectionRef.current.querySelectorAll("p")
        const triggers: ScrollTrigger[] = []

        paragraphs.forEach((para, index) => {
            gsap.set(para, { opacity: 0, y: 20 })
            const tween = gsap.to(para, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: para,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    return (
        <section ref={sectionRef} className="mb-24 md:mb-32">
            <Container>
                <div ref={titleRef}>
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="max-w-3xl space-y-6">
                    {t("description")
                        .split("\n\n")
                        .map((para: string, i: number) => (
                            <p
                                key={i}
                                className="text-base leading-relaxed text-primary/85"
                            >
                                {para}
                            </p>
                        ))}
                </div>
            </Container>
        </section>
    )
}

function TechnicalSection() {
    const t = useTranslations("caseStudy.technical")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-tech-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, x: -20 })
            const tween = gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    const decisions = ["decision1", "decision2", "decision3"]

    return (
        <section ref={sectionRef} className="mb-24 md:mb-32">
            <Container>
                <div ref={titleRef}>
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="space-y-12">
                    {decisions.map((key) => (
                        <div key={key} data-tech-item className="max-w-3xl">
                            <h3 className="mb-3 text-xl font-medium text-primary">
                                {t(`${key}.title`)}
                            </h3>
                            <p className="mb-4 text-base leading-relaxed text-primary/75">
                                {t(`${key}.description`)}
                            </p>
                            <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                                <pre className="overflow-x-auto text-xs text-primary/70">
                                    <code>{t(`${key}.code`)}</code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ArchitectureSection() {
    const t = useTranslations("caseStudy.architecture")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const contentRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <section className="mb-24 md:mb-32">
            <Container>
                <div ref={titleRef}>
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div ref={contentRef} className="max-w-3xl space-y-8">
                    <p className="text-base leading-relaxed text-primary/85">
                        {t("description")}
                    </p>
                    <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-6">
                        <pre className="overflow-x-auto text-sm text-primary/70">
                            <code>{t("structure")}</code>
                        </pre>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function PerformanceSection() {
    const t = useTranslations("caseStudy.performance")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-metric-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, scale: 0.95 })
            const tween = gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    const metrics = ["lighthouse", "loadTime", "bundle"]

    return (
        <section ref={sectionRef} className="mb-24 md:mb-32">
            <Container>
                <div ref={titleRef}>
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <div
                            key={metric}
                            data-metric-item
                            className="rounded-lg border border-foreground/10 p-6"
                        >
                            <p className="mb-2 font-mono text-3xl font-medium text-primary">
                                {t(`metrics.${metric}.value`)}
                            </p>
                            <p className="mb-1 text-sm font-medium text-primary/80">
                                {t(`metrics.${metric}.label`)}
                            </p>
                            <p className="text-xs text-primary/60">
                                {t(`metrics.${metric}.detail`)}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ResultsSection() {
    const t = useTranslations("caseStudy.results")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        gsap.fromTo(
            sectionRef.current.querySelector(".content-wrapper"),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    once: true,
                },
            }
        )
    }, [])

    return (
        <section ref={sectionRef} className="pb-24 md:p-32 border-t border-foreground/10 pt-16">
            <Container>
                <div ref={titleRef}>
                    <h2 className="mb-8 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="content-wrapper max-w-3xl space-y-6">
                    {t("description")
                        .split("\n\n")
                        .map((para: string, i: number) => (
                            <p
                                key={i}
                                className="text-base leading-relaxed text-primary/85"
                            >
                                {para}
                            </p>
                        ))}
                </div>
            </Container>
        </section>
    )
}