"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ConsultingPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <ProcessTimelineSection />
            <ValuePropositionSection />
            <FeaturesSection />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.consulting")

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText(DEFAULTS.heading)
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const ctaRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })
    const scrollRef = useReveal({ ...DEFAULTS.element, direction: "fade", delay: 0.45 })

    return (
        <section
            className="relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/[0.028]"
                style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}
            >
                03
            </div>
            <div
                ref={eyebrowRef}
                className="absolute top-24 ltr:right-8 rtl:left-8 hidden md:flex flex-col ltr:items-end rtl:items-start gap-2"
            >
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
                        {t("subtitle")}
                    </span>
                </div>
            </div>

            <Container>
                <div className="max-w-5xl">
                    <div className="mb-8 flex items-center gap-2 md:hidden">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
                            {t("subtitle")}
                        </span>
                    </div>
                    <h1
                        ref={titleRef}
                        className="mb-10 font-sans font-normal text-primary leading-[1.03]"
                        style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}
                    >
                        {t("title")}
                        <br />
                        <span
                            className="text-primary/35"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
                        >
                            {t("titleItalic")}
                        </span>
                    </h1>
                    <div ref={descRef} className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start">
                        <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
                        <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">
                            {t("description")}
                        </p>
                    </div>
                    <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Link href="/schedule">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {t("hero.ctaPrimary")}
                                    <svg
                                        className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="#approach">
                            <MagneticButton size="lg" variant="secondary">
                                {t("hero.ctaSecondary")}
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
            <div
                ref={scrollRef}
                className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                aria-hidden="true"
            >
                <p className="font-mono text-xs uppercase text-primary/25 tracking-[0.25em]">Scroll</p>
                <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
                    <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
        </section >
    )
}

function ProcessTimelineSection() {
    const t = useTranslations("serviceDetails.consulting")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-process-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: MOTION.distance.sm, willChange: "transform, opacity" })
            const tween = gsap.to(item, {
                opacity: 1, y: 0,
                duration: MOTION.duration.base,
                delay: index * MOTION.stagger.base,
                ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: item, start: "top 90%", once: true },
                onComplete() { gsap.set(item, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const steps = [
        { number: "01", key: "01" },
        { number: "02", key: "02" },
        { number: "03", key: "03" },
        { number: "04", key: "04" },
    ]

    return (
        <section id="approach" ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
                        {t("approach.eyebrow")}
                    </p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {t("approach.title")}
                            <br />
                            <span
                                className="text-primary/35"
                                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                            >
                                {t("approach.titleItalic")}
                            </span>
                        </h2>
                        <p className="font-mono text-base text-primary/35 max-w-[36ch] hidden lg:block leading-relaxed">
                            {t("approach.subtitle")}
                        </p>
                    </div>
                </div>
                <div className="h-px w-full bg-foreground/8 mb-0" />
                <div>
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            data-process-item
                            className="group not-last:border-b not-last:border-foreground/8 py-8 md:py-10 grid gap-6 md:grid-cols-[180px_1fr_1fr] items-start"
                        >
                            <div>
                                <div
                                    aria-hidden
                                    className="font-mono font-light text-primary/[0.07] leading-none select-none mb-2"
                                    style={{ fontSize: "clamp(52px, 7vw, 80px)", letterSpacing: "-0.04em" }}
                                >
                                    {step.number}
                                </div>
                            </div>
                            <h3
                                className="font-sans font-medium text-primary group-hover:text-primary/80 transition-colors duration-300 pt-1"
                                style={{ fontSize: "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em" }}
                            >
                                {t(`approach.steps.${step.key}.title`)}
                            </h3>
                            <p className="text-base text-primary/60 leading-relaxed">
                                {t(`approach.steps.${step.key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ValuePropositionSection() {
    const t = useTranslations("serviceDetails.consulting")
    const leftRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
    const rightRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })

    const stats = [
        { label: t("value.stats.systemsThinking"), value: "100%" },
        { label: t("value.stats.dataDriven"), value: "100%" },
        { label: t("value.stats.longTerm"), value: "100%" },
    ]

    return (
        <section className="section-padding border-t border-foreground/8">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div
                        ref={leftRef}
                        className="md:col-span-7 border border-foreground/8 rounded-sm bg-foreground/2 p-8 md:p-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
                            {t("value.eyebrow")}
                        </p>
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05] mb-8"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {t("value.title")}
                        </h2>
                        <div className="space-y-5">
                            <p className="text-base text-primary/60 leading-relaxed">
                                {t("value.body1")}
                            </p>
                            <p className="text-base text-primary/60 leading-relaxed">
                                {t("value.body2")}
                            </p>
                        </div>
                    </div>
                    <div ref={rightRef} className="md:col-span-5 flex flex-col gap-4">
                        {stats.map((item, i) => (
                            <div
                                key={i}
                                className="flex-1 border border-foreground/8 rounded-sm bg-foreground/2 p-6 md:p-8 flex flex-col justify-between group hover:bg-foreground/4 transition-colors duration-300"
                            >
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/35 mb-4">
                                    {item.label}
                                </p>
                                <span
                                    className="font-sans font-light text-primary leading-none"
                                    style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.03em" }}
                                >
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function FeaturesSection() {
    const t = useTranslations("serviceDetails.consulting")
    const tCommon = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-feature-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: MOTION.distance.sm, willChange: "transform, opacity" })
            const tween = gsap.to(card, {
                opacity: 1, y: 0,
                duration: MOTION.duration.base,
                delay: index * MOTION.stagger.tight,
                ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
                onComplete() { gsap.set(card, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const features = ["01", "02", "03", "04", "05", "06"].map((num, i) => ({
        num,
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
        wide: i === 0 || i === 5,
    }))

    return (
        <section ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
                        {tCommon("whatWeOfferEyebrow")}
                    </p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {tCommon("whatWeOffer")}
                            <br />
                            <span
                                className="text-primary/35"
                                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                            >
                                {tCommon("whatWeOfferItalic")}
                            </span>
                        </h2>
                        <p className="font-mono text-base text-primary/35 max-w-[28ch] hidden md:block tracking-[0.05em]">
                            {tCommon("whatWeOfferSubtitle")}
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-6 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            data-feature-card
                            className={[
                                "group relative border border-foreground/8 rounded-sm bg-foreground/2 p-6 md:p-8 overflow-hidden",
                                "hover:bg-foreground/4 transition-colors duration-300",
                                feature.wide ? "md:col-span-3" : "md:col-span-2",
                            ].join(" ")}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <span className="font-mono text-xs text-primary/20 tracking-[0.2em]">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <svg
                                    className="w-4 h-4 text-primary/0 group-hover:text-primary/35 transition-all duration-300 ltr:-translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <h3
                                className="font-sans font-medium text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300"
                                style={{ fontSize: "clamp(15px, 1.6vw, 18px)", letterSpacing: "-0.01em" }}
                            >
                                {feature.title}
                            </h3>
                            <p className="text-sm text-primary/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function CtaSection() {
    const t = useTranslations("serviceDetails.consulting")
    const sectionRef = useRef<HTMLElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: "left" },
                {
                    scaleX: 1, duration: MOTION.duration.slow, ease: MOTION.ease.smooth,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
                },
            )
            const targets = [headlineRef.current, subRef.current, ctaRef.current].filter(Boolean)
            targets.forEach((el, i) => {
                if (!el) return
                gsap.from(el, {
                    opacity: 0, y: MOTION.distance.md,
                    duration: MOTION.duration.base, delay: i * MOTION.stagger.loose, ease: MOTION.ease.smooth,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
                })
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-6 block">
                            {t("cta.eyebrow")}
                        </p>
                        <h2
                            ref={headlineRef}
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(30px, 5.5vw, 68px)", letterSpacing: "-0.025em" }}
                        >
                            {t("cta.title")}
                        </h2>
                    </div>
                    <div ref={subRef} className="flex flex-col gap-6">
                        <p className="text-base text-primary/60 leading-relaxed">
                            {t("cta.description")}
                        </p>
                        <div ref={ctaRef} className="flex flex-col gap-3">
                            <Link href="/schedule" className="w-full">
                                <MagneticButton size="lg" variant="primary" className="group w-full justify-center">
                                    <span className="flex items-center gap-2">
                                        {t("cta.button")}
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                            <Link href="/services" className="w-full">
                                <MagneticButton size="lg" variant="secondary" className="w-full justify-center">
                                    {t("cta.back")}
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}