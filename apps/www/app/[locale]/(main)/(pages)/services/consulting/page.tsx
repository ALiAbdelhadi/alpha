"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ConsultingPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[600px] w-[600px] rounded-full bg-foreground/3 blur-3xl" />
                <div className="absolute top-1/2 ltr:-left-60 rtl:-right-60 h-[500px] w-[500px] rounded-full bg-foreground/2 blur-3xl" />
            </div>
            <StrategicHeroSection />
            <ProcessTimelineSection />
            <ValuePropositionSection />
            <FeaturesStrategicSection />
            <ConsultingCtaSection />
        </div>
    )
}

function StrategicHeroSection() {
    const t = useTranslations("serviceDetails.consulting")
    const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", delay: 0, duration: 0.8 })
    const descRef = useReveal<HTMLParagraphElement>({ direction: "up", delay: 0.2, duration: 0.6 })
    const badgeRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1, duration: 0.5 })
    const ctaRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.35, duration: 0.5 })

    return (
        <section className="relative min-h-screen flex items-center section-padding">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>

            <Container>
                <div className="relative max-w-5xl">
                    <div ref={badgeRef} className="mb-8 inline-flex items-center gap-3">
                        <div className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/60" />
                        </div>
                        <span className="mono-uppercase text-primary/50 tracking-widest">
                            {t("subtitle")}
                        </span>
                    </div>

                    <h1
                        ref={titleRef}
                        className="mb-8 font-sans font-normal text-primary"
                    >
                        <span className="text-balance block">{t("title")}</span>
                    </h1>

                    <p
                        ref={descRef}
                        className="mb-12 body-lg text-primary/70 max-w-2xl"
                    >
                        {t("description")}
                    </p>

                    <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                        <Link href="/schedule">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {t("hero.ctaPrimary")}
                                    <svg
                                        className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                <div
                    className="pointer-events-none absolute ltr:right-0 rtl:left-0 bottom-16 select-none"
                    aria-hidden="true"
                >
                    <span className="text-[clamp(8rem,20vw,18rem)] font-light leading-none text-foreground/4 tracking-tighter">
                        03
                    </span>
                </div>
            </Container>
        </section>
    )
}

function ProcessTimelineSection() {
    const t = useTranslations("serviceDetails.consulting")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-process-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 40 })
            const tween = gsap.to(item, {
                opacity: 1, y: 0, duration: 0.7, delay: index * 0.12, ease: "power3.out",
                scrollTrigger: { trigger: item, start: "top 88%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const steps = [
        { number: "01", key: "1" },
        { number: "02", key: "2" },
        { number: "03", key: "3" },
        { number: "04", key: "4" },
    ]

    return (
        <section id="approach" ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-20 flex items-end justify-between flex-wrap gap-8">
                    <div>
                        <h2 className="font-sans font-normal text-primary mb-4">
                            {t("approach.title")}
                        </h2>
                        <p className="body-lg text-primary/50 max-w-xl">
                            {t("approach.subtitle")}
                        </p>
                    </div>
                    {/* Decorative line */}
                    <div className="hidden lg:flex items-center gap-3 text-primary/30">
                        <div className="w-16 h-px bg-foreground/20" />
                        <span className="mono-uppercase text-xs">process</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-0 relative">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            data-process-item
                            className="relative group"
                        >
                            {/* Connector line between steps */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-13 ltr:left-full rtl:right-full w-full h-px bg-foreground/15 z-0" />
                            )}

                            <div className="relative z-10 ltr:pr-8 rtl:pl-8 pb-8">
                                {/* Step number circle */}
                                <div className="mb-6 relative inline-flex">
                                    <div className="w-14 h-14 rounded-full border border-foreground/20 bg-background flex items-center justify-center group-hover:border-foreground/50 transition-colors duration-300">
                                        <span className="mono text-sm font-medium text-primary/50 group-hover:text-primary/80 transition-colors duration-300">
                                            {step.number}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-sans font-medium text-primary mb-3">
                                    {t(`approach.steps.${step.key}.title`)}
                                </h3>
                                <p className="body text-primary/55 leading-relaxed">
                                    {t(`approach.steps.${step.key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ValuePropositionSection() {
    const t = useTranslations("serviceDetails.consulting")
    const leftRef = useReveal({ direction: "right", delay: 0, duration: 0.6 })
    const rightRef = useReveal({ direction: "left", delay: 0.2, duration: 0.6 })

    const stats = [
        { label: t("value.stats.systemsThinking"), value: "100%" },
        { label: t("value.stats.dataDriven"), value: "100%" },
        { label: t("value.stats.longTerm"), value: "100%" },
    ]

    return (
        <section className="section-padding">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div
                        ref={leftRef}
                        className="md:col-span-7 rounded-2xl border border-foreground/10 bg-foreground/3 p-10 md:p-14 backdrop-blur-sm"
                    >
                        <div className="mb-3 inline-flex items-center gap-2">
                            <div className="h-px w-6 bg-foreground/30" />
                            <span className="mono-uppercase text-xs text-primary/40">value</span>
                        </div>
                        <h2 className="mb-8 font-sans font-normal text-primary">
                            {t("value.title")}
                        </h2>
                        <div className="space-y-6">
                            <p className="body-lg text-primary/70 leading-relaxed">
                                {t("value.body1")}
                            </p>
                            <p className="body-lg text-primary/70 leading-relaxed">
                                {t("value.body2")}
                            </p>
                        </div>
                    </div>
                    <div ref={rightRef} className="md:col-span-5 flex flex-col gap-4">
                        {stats.map((item, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-2xl border border-foreground/10 bg-foreground/3 p-6 md:p-8 flex flex-col justify-between group hover:bg-foreground/6 transition-colors duration-300 backdrop-blur-sm"
                            >
                                <span className="body text-primary/55 mb-4 block">
                                    {item.label}
                                </span>
                                <span className="font-sans font-light text-primary text-4xl">
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

function FeaturesStrategicSection() {
    const t = useTranslations("serviceDetails.consulting")
    const tCommon = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-feature-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 24 })
            const tween = gsap.to(card, {
                opacity: 1, y: 0, duration: 0.6, delay: index * 0.08, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const features = ["1", "2", "3", "4", "5", "6"].map((num, i) => ({
        num,
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
        wide: i === 0 || i === 5,
    }))

    return (
        <section ref={sectionRef} className="section-padding bg-foreground/2.5">
            <Container>
                <div ref={titleRef} className="mb-16 flex items-end justify-between flex-wrap gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-sans font-normal text-primary mb-4">
                            {tCommon("whatWeOffer")}
                        </h2>
                        <p className="mono text-primary/50">
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
                                "group relative rounded-2xl border border-foreground/10 bg-background p-7 overflow-hidden",
                                "hover:border-foreground/25 hover:bg-foreground/3 transition-all duration-300",
                                feature.wide ? "md:col-span-3" : "md:col-span-2",
                            ].join(" ")}
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/4 to-transparent" />
                            <div className="relative">
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="mono text-xs text-primary/30">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-primary/0 group-hover:text-primary/40 transition-all duration-300 ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <h3 className="mb-3 font-sans font-medium text-primary">
                                    {feature.title}
                                </h3>
                                <p className="body text-primary/55 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ConsultingCtaSection() {
    const t = useTranslations("serviceDetails.consulting")
    const lineRef = useReveal({ direction: "up", delay: 0, duration: 0.9 })
    const btnRef = useReveal({ direction: "up", delay: 0.3, duration: 0.6 })

    return (
        <section className="section-padding overflow-hidden">
            <Container>
                <div className="relative">
                    <div className="mb-16 h-px bg-foreground/10" />
                    <div ref={lineRef} className="overflow-hidden">
                        <h2 className="font-sans font-normal text-primary/15 hover:text-primary/30 transition-colors duration-700 cursor-default"
                            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
                        >
                            {t("cta.title")}
                        </h2>
                    </div>
                    <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <p ref={btnRef} className="body-lg text-primary/50 max-w-sm">
                            {t("cta.description")}
                        </p>
                        <div>
                            <Link href="/schedule">
                                <MagneticButton size="lg" variant="primary" className="group">
                                    <span className="flex items-center gap-2">
                                        {t("cta.button")}
                                        <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 h-px bg-foreground/10" />
                </div>
            </Container>
        </section>
    )
}