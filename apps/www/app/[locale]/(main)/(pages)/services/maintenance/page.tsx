"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { ServiceCta } from "@/components/services/service-cta"
import { ServiceFeatures } from "@/components/services/service-features"
import { ServiceHero } from "@/components/services/service-hero"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { useReveal } from "@/hooks/use-animation"
import { cn } from "@/lib/utils"

export default function MaintenancePage() {
    const t = useTranslations("serviceDetails.maintenance")
    const tCommon = useTranslations("serviceDetails")

    const features = ["1", "2", "3", "4", "5", "6"].map(num => ({
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
        icon: (
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        )
    }))

    return (
        <div className="relative min-h-screen w-full">
            <ServiceHero
                subtitle={t("subtitle")}
                title={t("title")}
                description={t("description")}
                gradientPreset="emerald-cyan"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" },
                    secondary: { text: tCommon("ctaSecondary"), href: "#pricing" }
                }}
                visual={<MaintenanceVisual />}
            />
            
            <StatsSection />
            
            <ServiceFeatures
                title={tCommon("whatWeOffer")}
                subtitle={tCommon("whatWeOfferSubtitle")}
                features={features}
                columns={3}
            />
            
            <PricingSection />
            
            <ServiceCta
                title={t("cta.title")}
                description={t("cta.description")}
                gradientPreset="emerald-cyan"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" }
                }}
            />
        </div>
    )
}

function MaintenanceVisual() {
    const t = useTranslations("serviceDetails.maintenance")
    return (
        <div className="rounded-2xl border border-foreground/10 bg-foreground/3 backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-primary/60">{t("hero.systemStatus")}</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs text-emerald-500">{t("hero.operational")}</span>
                </div>
            </div>
            <div className="space-y-3">
                {["website", "database", "api", "cdn"].map((service, i) => (
                    <div key={service} className="flex items-center justify-between p-3 rounded-lg bg-foreground/5">
                        <span className="text-sm text-primary">{t(`hero.services.${service}`)}</span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${98 - i * 2}%` }} />
                            </div>
                            <span className="font-mono text-xs text-primary/60">{98 - i * 2}%</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t border-foreground/10 flex justify-between text-xs text-primary/50">
                <span>{t("hero.lastChecked")}</span>
                <span>{t("hero.uptimeLabel")}</span>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-3 -right-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-mono text-xs text-emerald-500">{t("hero.secured")}</span>
            </div>
        </div>
    )
}

function StatsSection() {
    const t = useTranslations("serviceDetails.maintenance")
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-stat-item]")
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
                    start: "top 90%",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const stats = [
        { value: "99.9%", label: "stats.uptime" },
        { value: "< 1hr", label: "stats.response" },
        { value: "24/7", label: "stats.monitoring" },
        { value: "100%", label: "stats.satisfaction" },
    ]

    return (
        <section ref={sectionRef} className="py-16 md:py-24 border-y border-foreground/5">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} data-stat-item className="text-center">
                            <div className="text-3xl md:text-4xl lg:text-5xl font-light text-emerald-500 mb-2">
                                {stat.value}
                            </div>
                            <p className="text-sm text-primary/60">{t(stat.label)}</p>
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
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const plans = ["essential", "professional", "enterprise"]

    return (
        <section id="pricing" ref={sectionRef} className="py-24 md:py-32 bg-foreground/2">
            <Container>
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl lg:text-5xl mb-4">
                        {t("pricing.title")}
                    </h2>
                    <p className="text-primary/60 max-w-xl mx-auto">
                        {t("pricing.subtitle")}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((planKey) => (
                        <div
                            key={planKey}
                            data-pricing-card
                            className={`relative p-8 rounded-2xl border transition-all ${planKey === "professional"
                                ? "border-emerald-500/50 bg-emerald-500/5 scale-105 z-10"
                                : "border-foreground/10 bg-background hover:border-foreground/20"
                                }`}
                        >
                            {planKey === "professional" && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                                    {t("pricing.recommended")}
                                </div>
                            )}
                            <h3 className="font-sans text-xl font-medium text-primary mb-2">{t(`pricing.plans.${planKey}.name`)}</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-light text-primary">{planKey === "essential" ? "$299" : planKey === "professional" ? "$599" : "Custom"}</span>
                                <span className="text-primary/60">{planKey !== "enterprise" ? "/month" : ""}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {[0, 1, 2, 3, 4].map((i) => {
                                    // Use type assertion to avoid TS errors with raw
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const feature = (t.raw(`pricing.plans.${planKey}.features`) as any)[i];
                                    if (!feature) return null;
                                    return (
                                        <li key={i} className="flex items-center gap-2 text-sm text-primary/70">
                                            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    )
                                })}
                            </ul>
                            <Link href="/contact" className="block">
                                <MagneticButton
                                    variant={planKey === "professional" ? "primary" : "secondary"}
                                    className={cn(
                                        "w-full justify-center",
                                        planKey === "professional" && "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white"
                                    )}
                                >
                                    {t("pricing.getStarted")}
                                </MagneticButton>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
