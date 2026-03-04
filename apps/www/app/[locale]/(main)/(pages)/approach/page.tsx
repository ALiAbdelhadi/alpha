"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export default function ApproachPage() {
    const sectionRef = useRef<HTMLElement>(null)

    return (
        <div ref={sectionRef} className="relative min-h-screen w-full">
            <OpeningSection />
            <ProblemSection />
            <DecisionsSection />
            <ConstraintsSection />
            <BilingualSection />
            <BoundariesSection />
            <ClosingSection />
        </div>
    )
}

function OpeningSection() {
    const t = useTranslations("approach.hero")
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

function ProblemSection() {
    const t = useTranslations("approach.contrasts")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-contrast-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 20 })

            const tween = gsap.to(item, {
                opacity: 1,
                y: 0,
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

    const contrasts = [
        { common: t("1.common"), anthupic: t("1.anthupic") },
        { common: t("2.common"), anthupic: t("2.anthupic") },
        { common: t("3.common"), anthupic: t("3.anthupic") },
    ]

    return (
        <section ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <h2 className="mb-3 font-sans font-normal text-primary">
                        {t("label.common")} vs {t("label.anthupic")}
                    </h2>
                </div>
                <div className="space-y-12">
                    {contrasts.map((contrast, i) => (
                        <div
                            key={i}
                            data-contrast-item
                            className="grid gap-8 md:grid-cols-2 md:gap-16"
                        >
                            <div className="flex items-center gap-6">
                                <div className="h-px flex-1 bg-foreground/25" />
                                <div className="max-w-md">
                                    <p className="body-lg text-primary/60">{contrast.common}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="h-px w-12 bg-foreground/25" />
                                <div className="max-w-md">
                                    <p className="body-lg font-medium text-primary">
                                        {contrast.anthupic}
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

function DecisionsSection() {
    const t = useTranslations("approach.decisions")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-decision-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, x: -20 })

            const tween = gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.08,
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

    const decisions = [
        { title: t("data.title"), desc: t("data.description") },
        { title: t("scale.title"), desc: t("scale.description") },
        { title: t("maintenance.title"), desc: t("maintenance.description") },
        { title: t("handoff.title"), desc: t("handoff.description") },
    ]

    return (
        <section ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <h2 className="mb-3 font-sans font-normal text-primary">
                        {t("title")}
                    </h2>
                </div>
                <div className="grid gap-12">
                    {decisions.map((decision, i) => (
                        <div
                            key={i}
                            data-decision-item
                            className="ltr:border-l-2 rtl:border-r-2 border-foreground/25 ltr:pl-8 rtl:pr-8"
                        >
                            <h3 className="mb-4 font-sans font-medium text-primary">
                                {decision.title}
                            </h3>
                            <p className="max-w-2xl body-lg text-primary/75">
                                {decision.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ConstraintsSection() {
    const t = useTranslations("approach.constraints")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })

    return (
        <section className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-12">
                    <h2 className="mb-3 font-sans font-normal text-primary">
                        {t("title")}
                    </h2>
                </div>
                <div ref={descRef} className="max-w-3xl space-y-6">
                    {t("paragraphs").split("\n\n").map((paragraph: string, i: number) => (
                        <p key={i} className="body-lg text-primary/85">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function BilingualSection() {
    const t = useTranslations("approach.bilingual")
    const [isRTL, setIsRTL] = useState(false)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })
    const demoRef = useReveal({ direction: "up", delay: 0.25, duration: 0.5 })

    return (
        <section className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-12">
                    <h2 className="mb-3 font-sans font-normal text-primary">
                        {t("title")}
                    </h2>
                </div>
                <div ref={descRef} className="mb-16 max-w-3xl space-y-6">
                    {t("paragraphs").split("\n\n").map((paragraph: string, i: number) => (
                        <p key={i} className="body-lg text-primary/85">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <div ref={demoRef} className="rounded-lg border border-foreground/25 p-8 md:p-12">
                    <div className="mb-8 flex items-center justify-between">
                        <p className="mono text-primary/60">Interactive Demo</p>
                        <button
                            onClick={() => setIsRTL(!isRTL)}
                            className="rounded-full border border-foreground/25 bg-foreground/5 px-4 py-2 mono small text-primary transition-colors transition-default hover:bg-foreground/10"
                        >
                            {isRTL ? "EN" : "AR"}
                        </button>
                    </div>
                    <div
                        dir={isRTL ? "rtl" : "ltr"}
                        className="space-y-4 transition-all duration-300 transition-default"
                    >
                        <h3 className="font-sans font-medium text-primary">
                            {isRTL ? "مثال على العنوان" : "Example Heading"}
                        </h3>
                        <p className="body text-primary/75">
                            {isRTL
                                ? "هذا نص توضيحي يظهر كيف يتكيف التصميم تماماً مع اتجاه الكتابة من اليمين إلى اليسار. كل عنصر يُعاد تصميمه، وليس مجرد انعكاس."
                                : "This is example text showing how the design adapts completely to right-to-left direction. Every element is reconsidered, not just mirrored."}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function BoundariesSection() {
    const t = useTranslations("approach.boundaries")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-boundary-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, x: -15 })

            const tween = gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.4,
                delay: index * 0.06,
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

    const boundaries = ["1", "2", "3", "4", "5"]

    return (
        <section ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-12">
                    <h2 className="mb-6 font-sans font-normal text-primary">
                        {t("title")}
                    </h2>
                    <p className="body-lg text-primary/75">{t("intro")}</p>
                </div>
                <div className="max-w-3xl space-y-4">
                    {boundaries.map((num) => (
                        <div
                            key={num}
                            data-boundary-item
                            className="flex items-start gap-4 body-lg text-primary/85"
                        >
                            <span className="mt-1 text-primary/60">-</span>
                            <p>{t(`items.${num}`)}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ClosingSection() {
    const t = useTranslations("approach.closing")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })
    const ctaRef = useReveal({ direction: "up", delay: 0.25, duration: 0.5 })

    return (
        <section className="section-padding">
            <Container>
                <div className="max-w-3xl">
                    <div ref={titleRef} className="mb-12">
                        <h2 className="mb-3 font-sans font-normal text-primary">
                            {t("title")}
                        </h2>
                    </div>
                    <div ref={descRef} className="mb-12 space-y-6">
                        <p className="body-lg text-primary/85">
                            {t("description")}
                        </p>
                    </div>
                    <div ref={ctaRef}>
                        <a
                            href="mailto:hello@anthupic.com"
                            className="inline-flex items-center gap-2 mono body-lg text-primary transition-colors transition-default hover:text-primary/70"
                        >
                            {t("cta")}
                            <svg className="h-4 w-4 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    )
}