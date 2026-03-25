// motion: DEFAULTS throughout - fixed raw values in FeaturesSection/PricingSection/CtaSection
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function MaintenancePage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <PricingSection />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const tCommon = useTranslations("serviceDetails")

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText(DEFAULTS.heading)
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const ctaRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })
    const scrollRef = useReveal({ ...DEFAULTS.element, direction: "fade", delay: 0.45 })

    return (
        <section className="relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden" style={{ minHeight: "100vh" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>
            <div aria-hidden="true" className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/[0.028]" style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}>04</div>
            <div ref={eyebrowRef} className="absolute top-24 ltr:right-8 rtl:left-8 hidden md:flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">{t("subtitle")}</span>
            </div>
            <Container>
                <div className="max-w-5xl">
                    <div className="mb-8 flex items-center gap-2 md:hidden">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">{t("subtitle")}</span>
                    </div>
                    <h1 ref={titleRef} className="mb-10 font-sans font-normal text-primary leading-[1.03]" style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}>
                        {t("title")}
                        <br />
                        <span className="text-primary/35" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>{t("titleItalic")}</span>
                    </h1>
                    <div ref={descRef} className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start">
                        <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
                        <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">{t("description")}</p>
                    </div>
                    <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {tCommon("ctaPrimary")}
                                    <svg className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="#pricing"><MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton></Link>
                    </div>
                </div>
            </Container>
            <div ref={scrollRef} className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
                <p className="font-mono text-xs uppercase text-muted-foreground/70 tracking-[0.25em]">Scroll</p>
                <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
                    <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
                </div>
            </div>
            <style>{`@keyframes slideDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
        </section>
    )
}

function StatsSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const leftRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
    const rightRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })

    const stats = [
        { value: "99.9%", labelKey: "stats.uptime" },
        { value: "< 1hr", labelKey: "stats.response" },
        { value: "24/7", labelKey: "stats.monitoring" },
        { value: "100%", labelKey: "stats.satisfaction" },
    ]

    return (
        <section className="section-padding border-t border-foreground/8">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div ref={leftRef} className="md:col-span-7 border border-foreground/8 rounded-sm bg-foreground/2 p-8 md:p-12">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">{t("stats.eyebrow")}</p>
                        <h2 className="font-sans font-normal text-primary leading-[1.05] mb-8" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>{t("stats.title")}</h2>
                        <div className="space-y-5">
                            <p className="text-base text-primary/60 leading-relaxed">{t("stats.body1")}</p>
                            <p className="text-base text-primary/60 leading-relaxed">{t("stats.body2")}</p>
                        </div>
                    </div>
                    <div ref={rightRef} className="md:col-span-5 grid grid-cols-2 gap-3">
                        {stats.map((stat, i) => (
                            <div key={i} className="border border-foreground/8 rounded-sm bg-foreground/2 p-5 md:p-6 flex flex-col justify-between group hover:bg-foreground/4 transition-colors duration-300">
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/35 mb-4">{t(stat.labelKey)}</p>
                                <span className="font-sans font-light text-primary leading-none" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", letterSpacing: "-0.03em" }}>{stat.value}</span>
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
    // ✅ fixed: was { direction: "up", delay: 0, duration: 0.5 }
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-feature-card]")
        const triggers: ScrollTrigger[] = []
        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: MOTION.distance.sm, willChange: "transform, opacity" })
            const tween = gsap.to(card, {
                opacity: 1, y: 0, duration: MOTION.duration.base, delay: index * MOTION.stagger.tight, ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
                onComplete() { gsap.set(card, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    const features = ["01", "02", "03", "04", "05", "06"].map((num, i) => ({
        num, title: t(`features.${num}.title`), description: t(`features.${num}.description`), wide: i === 0 || i === 5,
    }))

    return (
        <section ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">{tCommon("whatWeOfferEyebrow")}</p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2 className="font-sans font-normal text-primary leading-[1.05]" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>
                            {tCommon("whatWeOffer")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{tCommon("whatWeOfferItalic")}</span>
                        </h2>
                        <p className="font-mono text-sm text-primary/35 max-w-[28ch] hidden md:block tracking-[0.05em]">{tCommon("whatWeOfferSubtitle")}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-6 gap-4">
                    {features.map((feature, i) => (
                        <div key={i} data-feature-card className={["group relative border border-foreground/8 rounded-sm bg-foreground/2 p-6 md:p-8 overflow-hidden hover:bg-foreground/4 transition-colors duration-300", feature.wide ? "md:col-span-3" : "md:col-span-2"].join(" ")}>
                            <div className="flex items-start justify-between mb-6">
                                <span className="font-mono text-xs text-primary/20 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                                <svg className="w-4 h-4 text-primary/0 group-hover:text-primary/35 transition-all duration-300 ltr:-translate-x-2 group-hover:translate-x-0 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <h3 className="font-sans font-medium text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", letterSpacing: "-0.01em" }}>{feature.title}</h3>
                            <p className="text-sm text-primary/60 leading-relaxed">{feature.description}</p>
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
    // ✅ fixed: was { direction: "up", delay: 0, duration: 0.5 }
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-pricing-card]")
        const triggers: ScrollTrigger[] = []
        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: MOTION.distance.md, willChange: "transform, opacity" })
            const tween = gsap.to(card, {
                opacity: 1, y: 0, duration: MOTION.duration.base, delay: index * MOTION.stagger.base, ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
                onComplete() { gsap.set(card, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    const plans = [
        { key: "essential", price: "7,500 EGP", featured: false, index: "01" },
        { key: "professional", price: "15,000 EGP", featured: true, index: "02" },
        { key: "enterprise", price: null, featured: false, index: "03" },
    ]

    return (
        <section id="pricing" ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">{t("pricing.eyebrow")}</p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2 className="font-sans font-normal text-primary leading-[1.05]" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>
                            {t("pricing.title")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{t("pricing.titleItalic")}</span>
                        </h2>
                        <p className="font-mono text-sm text-primary/35 max-w-[36ch] hidden lg:block leading-relaxed">{t("pricing.subtitle")}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {plans.map(({ key, price, featured, index }) => (
                        <div key={key} data-pricing-card className={cn("group relative border rounded-sm bg-foreground/2 p-7 md:p-8 overflow-hidden flex flex-col transition-colors duration-300", featured ? "border-foreground/20" : "border-foreground/8 hover:bg-foreground/4")}>
                            {featured && <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/60" />}
                            <div aria-hidden className="font-mono text-xs text-primary/20 tracking-[0.2em] mb-6">{index}</div>
                            <div className="mb-1 flex items-center justify-between">
                                <h3 className="font-sans font-medium text-primary" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em" }}>{t(`pricing.plans.${key}.name`)}</h3>
                                {featured && <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/45 border border-foreground/15 px-2 py-0.5 rounded-full">{t("pricing.recommended")}</span>}
                            </div>
                            <div className="mt-6 mb-6 pb-6 border-b border-foreground/8">
                                <span className="font-sans font-light text-primary leading-none" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", letterSpacing: "-0.03em" }}>{price ?? t("pricing.customPrice")}</span>
                                {price && <span className="font-mono text-sm text-primary/35 ml-2">/month</span>}
                            </div>
                            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                                {([0, 1, 2, 3, 4] as const).map((i) => {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const feature = (t.raw(`pricing.plans.${key}.features`) as any)[i]
                                    if (!feature) return null
                                    return (
                                        <li key={i} className="flex items-start gap-3 text-sm text-primary/55 leading-relaxed">
                                            <span className="font-mono text-primary/30 mt-0.5 shrink-0 select-none">-</span>
                                            {feature}
                                        </li>
                                    )
                                })}
                            </ul>
                            <Link href="/contact" className="block mt-auto">
                                <MagneticButton variant={featured ? "primary" : "secondary"} className="w-full justify-center group">
                                    <span className="flex items-center gap-2">
                                        {t("pricing.getStarted")}
                                        <svg className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function CtaSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const tCommon = useTranslations("serviceDetails")
    // ✅ fixed: was { direction: "up", delay: 0, duration: 0.6 }
    const leftRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
    const rightRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.12 })

    const checks = [
        { label: t("cta.checks.uptime") },
        { label: t("cta.checks.security") },
        { label: t("cta.checks.backups") },
        { label: t("cta.checks.monitoring") },
    ]

    return (
        <section className="section-padding border-t border-foreground/8">
            <Container>
                <div className="grid md:grid-cols-12 gap-4">
                    <div ref={leftRef} className="md:col-span-5 border border-foreground/8 rounded-sm bg-foreground/2 p-7 md:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70">{t("cta.statusTitle")}</p>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-mono text-xs text-primary/40 tracking-[0.15em]">all systems go</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {checks.map((check, i) => (
                                <div key={i} className="flex items-center justify-between border border-foreground/8 rounded-sm bg-foreground/2 px-4 py-3">
                                    <span className="text-sm text-primary/60">{check.label}</span>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-emerald-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-mono text-[9px] uppercase text-primary/30 tracking-[0.15em]">active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div ref={rightRef} className="md:col-span-7 border border-foreground/8 rounded-sm bg-foreground/2 p-8 md:p-10 flex flex-col justify-between gap-8">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-6 block">{t("cta.eyebrow")}</p>
                            <h2 className="font-sans font-normal text-primary leading-[1.05] mb-5" style={{ fontSize: "clamp(24px, 4vw, 44px)", letterSpacing: "-0.02em" }}>{t("cta.title")}</h2>
                            <p className="text-base text-primary/60 leading-relaxed max-w-[44ch]">{t("cta.description")}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/contact" className="w-full">
                                <MagneticButton size="lg" variant="primary" className="group w-full justify-center">
                                    <span className="flex items-center gap-2">
                                        {tCommon("ctaPrimary")}
                                        <svg className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                            <Link href="/services" className="w-full">
                                <MagneticButton size="lg" variant="secondary" className="w-full justify-center">{t("cta.back")}</MagneticButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}