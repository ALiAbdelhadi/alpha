/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function MaintenancePage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[600px] w-[600px] rounded-full bg-foreground/3 blur-3xl" />
                <div className="absolute top-1/2 ltr:-left-60 rtl:-right-60 h-[500px] w-[500px] rounded-full bg-foreground/2 blur-3xl" />
            </div>
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <PricingSection />
            <MaintenanceCtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const tCommon = useTranslations("serviceDetails")
    const badgeRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1, duration: 0.5 })
    const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", delay: 0, duration: 0.8 })
    const descRef = useReveal<HTMLParagraphElement>({ direction: "up", delay: 0.2, duration: 0.6 })
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
                        <span className="mono-uppercase text-primary/50 tracking-widest">{t("subtitle")}</span>
                    </div>

                    <h1 ref={titleRef} className="mb-8 font-sans font-normal text-primary">
                        <span className="text-balance block">{t("title")}</span>
                    </h1>

                    <p ref={descRef} className="mb-12 body-lg text-primary/70 max-w-2xl">
                        {t("description")}
                    </p>

                    <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {tCommon("ctaPrimary")}
                                    <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="#pricing">
                            <MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>

                <div className="pointer-events-none absolute ltr:right-0 rtl:left-0 bottom-16 select-none" aria-hidden="true">
                    <span className="text-[clamp(8rem,20vw,18rem)] font-light leading-none text-foreground/4 tracking-tighter">
                        04
                    </span>
                </div>
            </Container>
        </section>
    )
}

function StatsSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const sectionRef = useRef<HTMLElement>(null)
    const leftRef = useReveal({ direction: "right", delay: 0, duration: 0.6 })
    const rightRef = useReveal({ direction: "left", delay: 0.2, duration: 0.6 })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-stat-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 20 })
            const tween = gsap.to(item, {
                opacity: 1, y: 0, duration: 0.6, delay: index * 0.12, ease: "power3.out",
                scrollTrigger: { trigger: item, start: "top 90%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const stats = [
        { value: "99.9%", labelKey: "stats.uptime" },
        { value: "< 1hr", labelKey: "stats.response" },
        { value: "24/7", labelKey: "stats.monitoring" },
        { value: "100%", labelKey: "stats.satisfaction" },
    ]

    return (
        <section ref={sectionRef} className="section-padding">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div
                        ref={leftRef}
                        className="md:col-span-7 rounded-2xl border border-foreground/10 bg-foreground/3 p-10 md:p-14 backdrop-blur-sm"
                    >
                        <div className="mb-3 inline-flex items-center gap-2">
                            <div className="h-px w-6 bg-foreground/30" />
                            <span className="mono-uppercase text-xs text-primary/40">uptime</span>
                        </div>
                        <h2 className="mb-8 font-sans font-normal text-primary">
                            {t("stats.title")}
                        </h2>
                        <div className="space-y-6">
                            <p className="body-lg text-primary/70 leading-relaxed">{t("stats.body1")}</p>
                            <p className="body-lg text-primary/70 leading-relaxed">{t("stats.body2")}</p>
                        </div>
                    </div>
                    <div ref={rightRef} className="md:col-span-5 flex flex-col gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                data-stat-item
                                className="flex-1 rounded-2xl border border-foreground/10 bg-foreground/3 p-6 md:p-8 flex flex-col justify-between group hover:bg-foreground/6 transition-colors duration-300 backdrop-blur-sm"
                            >
                                <span className="body text-primary/55 mb-4 block">{t(stat.labelKey)}</span>
                                <span className="font-sans font-light text-primary text-4xl">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function FeaturesSection() {
    const t = useTranslations("serviceDetails.maintenance")
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
                        <h2 className="font-sans font-normal text-primary mb-4">{tCommon("whatWeOffer")}</h2>
                        <p className="mono text-primary/50">{tCommon("whatWeOfferSubtitle")}</p>
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
                                    <span className="mono text-xs text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                                    <svg
                                        className="w-4 h-4 text-primary/0 group-hover:text-primary/40 transition-all duration-300 ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <h3 className="mb-3 font-sans font-medium text-primary">{feature.title}</h3>
                                <p className="body text-primary/55 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function PricingSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-pricing-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 30 })
            const tween = gsap.to(card, {
                opacity: 1, y: 0, duration: 0.7, delay: index * 0.12, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const plans = [
        { key: "essential", price: "7,500 EGP", featured: false },
        { key: "professional", price: "15,000 EGP", featured: true },
        { key: "enterprise", price: null, featured: false },
    ]

    return (
        <section id="pricing" ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-20 flex items-end justify-between flex-wrap gap-8">
                    <div>
                        <h2 className="font-sans font-normal text-primary mb-4">{t("pricing.title")}</h2>
                        <p className="body-lg text-primary/50 max-w-xl">{t("pricing.subtitle")}</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="w-16 h-px bg-foreground/20" />
                        <span className="mono-uppercase text-xs text-primary/30">plans</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {plans.map(({ key, price, featured }) => (
                        <div
                            key={key}
                            data-pricing-card
                            className={cn(
                                "group relative rounded-2xl border bg-foreground/3 p-8 overflow-hidden",
                                "hover:bg-foreground/6 transition-all duration-300",
                                featured
                                    ? "border-foreground/25 md:scale-[1.02] z-10"
                                    : "border-foreground/10 hover:border-foreground/20"
                            )}
                        >
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br bg-foreground/4 to-transparent" />
                            <div className="relative">
                                {featured && (
                                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
                                        <span className="mono-uppercase text-xs text-primary/50">{t("pricing.recommended")}</span>
                                    </div>
                                )}
                                {!featured && (
                                    <div className="mb-5 mono text-xs text-primary/30">
                                        {String(plans.findIndex(p => p.key === key) + 1).padStart(2, "0")}
                                    </div>
                                )}
                                <h3 className="font-sans font-medium text-primary mb-6">
                                    {t(`pricing.plans.${key}.name`)}
                                </h3>
                                <div className="mb-8 pb-8 border-b border-foreground/10">
                                    <span className="font-sans font-light text-primary text-4xl">
                                        {price ?? t("pricing.customPrice")}
                                    </span>
                                    {price && (
                                        <span className="mono text-sm text-primary/40 ml-2">/month</span>
                                    )}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {[0, 1, 2, 3, 4].map((i) => {
                                        const feature = (t.raw(`pricing.plans.${key}.features`) as any)[i]
                                        if (!feature) return null
                                        return (
                                            <li key={i} className="flex items-start gap-3 body text-primary/55">
                                                <svg className="w-4 h-4 text-primary/30 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        )
                                    })}
                                </ul>
                                <Link href="/contact" className="block">
                                    <MagneticButton
                                        variant={featured ? "primary" : "secondary"}
                                        className="w-full justify-center group"
                                    >
                                        <span className="flex items-center gap-2">
                                            {t("pricing.getStarted")}
                                            <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </MagneticButton>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function MaintenanceCtaSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const tCommon = useTranslations("serviceDetails")
    const leftRef = useReveal({ direction: "right", delay: 0, duration: 0.6 })
    const rightRef = useReveal({ direction: "left", delay: 0.2, duration: 0.6 })

    const checks = [
        { label: t("cta.checks.uptime"), done: true },
        { label: t("cta.checks.security"), done: true },
        { label: t("cta.checks.backups"), done: true },
        { label: t("cta.checks.monitoring"), done: true },
    ]

    return (
        <section className="section-padding overflow-hidden">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div
                        ref={leftRef}
                        className="md:col-span-5 rounded-2xl border border-foreground/10 bg-foreground/3 p-8 md:p-10"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span className="mono-uppercase text-xs text-primary/40">system ready</span>
                            <div className="flex items-center gap-2">
                                <div className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground/60" />
                                </div>
                                <span className="mono text-xs text-primary/50">all systems go</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {checks.map((check, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-foreground/4 border border-foreground/6">
                                    <span className="body text-sm text-primary/70">{check.label}</span>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="mono text-xs text-primary/35">active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        ref={rightRef}
                        className="md:col-span-7 rounded-2xl border border-foreground/10 bg-foreground/3 p-8 md:p-12 flex flex-col justify-between"
                    >
                        <div>
                            <p className="mono-uppercase text-xs text-primary/35 mb-8 tracking-widest">protect your site</p>
                            <h2 className="font-sans font-normal text-primary mb-6">{t("cta.title")}</h2>
                            <p className="body-lg text-primary/55 mb-10">{t("cta.description")}</p>
                        </div>
                        <Link href="/contact" className="w-fit">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {tCommon("ctaPrimary")}
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
