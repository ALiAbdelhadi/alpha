"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

export default function ApproachPage() {
    const sectionRef = useRef<HTMLElement>(null)

    return (
        <main ref={sectionRef} className="relative min-h-screen w-full">
            <OpeningSection />
            <ProblemSection />
            <DecisionsSection />
            <ConstraintsSection />
            <BilingualSection />
            <BoundariesSection />
            <ClosingSection />
        </main>
    )
}

function OpeningSection() {
    const t = useTranslations("approach.hero")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const descRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <section className="flex min-h-screen items-center pt-24 md:pt-32">
            <Container>
                <div className="max-w-4xl">
                    <div ref={titleRef}>
                        <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
                            {t("title")}
                        </h1>
                    </div>
                    <div ref={descRef}>
                        <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl lg:text-2xl">
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
        { common: t("1.common"), alpha: t("1.alpha") },
        { common: t("2.common"), alpha: t("2.alpha") },
        { common: t("3.common"), alpha: t("3.alpha") },
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-16 md:mb-20">
                    <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {t("label.common")} vs {t("label.alpha")}
                    </h2>
                </div>
                <div className="space-y-12 md:space-y-16">
                    {contrasts.map((contrast, i) => (
                        <div
                            key={i}
                            data-contrast-item
                            className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
                        >
                            <div className="flex items-center gap-6">
                                <div className="h-px flex-1 bg-foreground/10" />
                                <div className="max-w-md">
                                    <p className="text-lg text-foreground/60 md:text-xl">{contrast.common}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="h-px w-12 bg-foreground/30" />
                                <div className="max-w-md">
                                    <p className="text-lg font-medium text-foreground md:text-xl">
                                        {contrast.alpha}
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
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-16 md:mb-20">
                    <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="grid gap-12 md:gap-16">
                    {decisions.map((decision, i) => (
                        <div
                            key={i}
                            data-decision-item
                            className="ltr:border-l-2 rtl:border-r-2 border-foreground/10 ltr:pl-8 rtl:pr-8"
                        >
                            <h3 className="mb-4 font-sans text-2xl font-medium text-foreground md:text-3xl">
                                {decision.title}
                            </h3>
                            <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
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
        <section className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-8 md:mb-12">
                    <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                </div>
                <div ref={descRef} className="max-w-3xl space-y-6">
                    {t("paragraphs").split("\n\n").map((paragraph: string, i: number) => (
                        <p key={i} className="text-lg leading-relaxed text-foreground/85 md:text-xl">
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
        <section className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-8 md:mb-12">
                    <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                </div>
                <div ref={descRef} className="mb-12 max-w-3xl space-y-6 md:mb-16">
                    {t("paragraphs").split("\n\n").map((paragraph: string, i: number) => (
                        <p key={i} className="text-lg leading-relaxed text-foreground/85 md:text-xl">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <div ref={demoRef} className="rounded-lg border border-foreground/10 p-8 md:p-12">
                    <div className="mb-8 flex items-center justify-between">
                        <p className="font-mono text-sm text-foreground/60">Interactive Demo</p>
                        <button
                            onClick={() => setIsRTL(!isRTL)}
                            className="rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 font-mono text-sm text-foreground transition-colors hover:bg-foreground/10"
                        >
                            {isRTL ? "EN" : "AR"}
                        </button>
                    </div>
                    <div
                        dir={isRTL ? "rtl" : "ltr"}
                        className="space-y-4 transition-all duration-300"
                    >
                        <h3 className="font-sans text-2xl font-medium text-foreground">
                            {isRTL ? "مثال على العنوان" : "Example Heading"}
                        </h3>
                        <p className="text-base leading-relaxed text-foreground/75">
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
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-12 md:mb-16">
                    <h2 className="mb-6 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-foreground/75">{t("intro")}</p>
                </div>
                <div className="max-w-3xl space-y-4">
                    {boundaries.map((num) => (
                        <div
                            key={num}
                            data-boundary-item
                            className="flex items-start gap-4 text-base text-foreground/85 md:text-lg"
                        >
                            <span className="mt-1 text-foreground/40">-</span>
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
        <section className="py-24 pb-32 md:py-32 md:pb-40">
            <Container>
                <div className="max-w-3xl">
                    <div ref={titleRef} className="mb-8 md:mb-12">
                        <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                    </div>
                    <div ref={descRef} className="mb-12 space-y-6">
                        <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
                            {t("description")}
                        </p>
                    </div>
                    <div ref={ctaRef}>
                        <a
                            href="mailto:hello@alpha.com"
                            className="inline-flex items-center gap-2 font-mono text-base text-foreground transition-colors hover:text-foreground/70 md:text-lg"
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