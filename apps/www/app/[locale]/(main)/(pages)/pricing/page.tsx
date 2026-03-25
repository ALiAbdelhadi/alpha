"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { FaqSection } from "@/components/sections/faq-section"
import { Link } from "@/i18n/navigation"
import { DEFAULTS, useBatch, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"

const TIER_DESTINATION = {
    essential: "/estimator?tier=essential",
    professional: "/estimator?tier=professional",
    flagship: "/schedule",
} as const

export default function PricingPage() {
    const t = useTranslations("pricing")
    const heroEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const heroTitleRef = useText<HTMLHeadingElement>(DEFAULTS.heading)
    const heroDescRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const tierCardsRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".tier-card" })
    const roiEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const roiTitleRef = useText<HTMLHeadingElement>(DEFAULTS.heading)
    const roiBodyRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".roi-p" })
    const roiStatsRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const roiButtonsRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })

    const tiers = [
        {
            id: "essential" as const,
            name: t("tiers.essential.name"),
            priceRange: t("tiers.essential.priceRange"),
            originalPrice: t("tiers.essential.originalPrice"),
            idealFor: t("tiers.essential.idealFor"),
            notIncluded: t("tiers.essential.notIncluded"),
            highlight: false,
            features: Array.from({ length: 5 }, (_, i) => t(`tiers.essential.features.${i}`)),
        },
        {
            id: "professional" as const,
            name: t("tiers.professional.name"),
            priceRange: t("tiers.professional.priceRange"),
            originalPrice: t("tiers.professional.originalPrice"),
            idealFor: t("tiers.professional.idealFor"),
            notIncluded: t("tiers.professional.notIncluded"),
            highlight: true,
            features: Array.from({ length: 5 }, (_, i) => t(`tiers.professional.features.${i}`)),
        },
        {
            id: "flagship" as const,
            name: t("tiers.flagship.name"),
            priceRange: t("tiers.flagship.priceRange"),
            originalPrice: t("tiers.flagship.originalPrice"),
            idealFor: t("tiers.flagship.idealFor"),
            notIncluded: null,
            highlight: false,
            features: Array.from({ length: 5 }, (_, i) => t(`tiers.flagship.features.${i}`)),
        },
    ]

    return (
        <section className="section-padding">
            <Container>
                <div className="py-12 md:py-24">
                    <div className="mb-16 max-w-5xl">
                        <p
                            ref={heroEyebrowRef}
                            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                        >
                            {t("label")}
                        </p>
                        <h1
                            ref={heroTitleRef}
                            className="mb-6 font-sans font-normal text-primary leading-[1.03]"
                            style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}
                        >
                            {t("title")}
                            <br />
                            <span
                                className="text-primary/35"
                                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                            >
                                {t("titleItalic")}
                            </span>
                        </h1>
                        <p
                            ref={heroDescRef}
                            className="text-base text-primary/60 leading-relaxed max-w-[52ch]"
                        >
                            {t("description")}
                        </p>
                    </div>
                    <div className="h-px w-full bg-foreground/8 mb-12" />
                    <div ref={tierCardsRef} className="grid gap-4 md:grid-cols-3 mb-16">
                        {tiers.map((tier, i) => (
                            <article
                                key={tier.id}
                                className={[
                                    "tier-card relative border rounded-sm p-6 md:p-8 flex flex-col",
                                    tier.highlight
                                        ? "border-foreground/40 bg-foreground/4"
                                        : "border-foreground/8 bg-foreground/2",
                                ].join(" ")}
                            >
                                {tier.highlight && (
                                    <>
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/60 rounded-t-sm" />
                                        <div className="flex items-center gap-2 mb-3">
                                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/40">
                                                {t("recommended")}
                                            </p>
                                            <span className="px-2 py-0.5 rounded-[2px] bg-brand/10 text-brand text-[9px] font-mono uppercase tracking-wider border border-brand/20">
                                                Best Value
                                            </span>
                                        </div>
                                    </>
                                )}
                                <span
                                    className="font-mono font-light text-primary/10 leading-none select-none mb-4 block"
                                    style={{ fontSize: "clamp(40px, 4vw, 52px)", letterSpacing: "-0.03em" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h2
                                    className="font-sans font-medium text-primary mb-1"
                                    style={{ fontSize: "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em" }}
                                >
                                    {tier.name}
                                </h2>
                                {tier.highlight && tier.originalPrice && (
                                    <div className="text-xs text-primary/35 line-through mb-1">
                                        {tier.originalPrice}
                                    </div>
                                )}
                                <p className="font-mono text-xs text-primary/40 uppercase tracking-[0.15em] mb-4">
                                    {tier.priceRange}
                                </p>
                                <p className="text-sm text-primary/60 leading-relaxed mb-6">
                                    {tier.idealFor}
                                </p>
                                <ul className="space-y-2 mb-8 flex-1">
                                    {tier.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-primary/60">
                                            <div className="h-px w-3 bg-foreground/8 mt-2.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                {tier.notIncluded && (
                                    <p className="text-xs text-primary/35 leading-relaxed mb-6 border-t border-foreground/8 pt-4">
                                        {tier.notIncluded}
                                    </p>
                                )}
                                <Link href={TIER_DESTINATION[tier.id]}>
                                    <MagneticButton
                                        size="lg"
                                        variant={tier.highlight ? "primary" : "secondary"}
                                        className="w-full justify-center"
                                    >
                                        {t(`tiers.${tier.id}.cta`)}
                                    </MagneticButton>
                                </Link>
                            </article>
                        ))}
                    </div>
                    <div className="h-px w-full bg-foreground/8" />
                    <section className="pt-16">
                        <p
                            ref={roiEyebrowRef}
                            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                        >
                            {t("roi.eyebrow")}
                        </p>
                        <h2
                            ref={roiTitleRef}
                            className="font-sans font-normal text-primary leading-[1.05] mb-8"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {t("roi.title")}
                        </h2>
                        <div ref={roiBodyRef} className="grid md:grid-cols-2 gap-8 mb-10 max-w-3xl">
                            <p className="roi-p text-base text-primary/60 leading-relaxed">{t("roi.calculation")}</p>
                            <p className="roi-p text-base text-primary/60 leading-relaxed">{t("roi.question")}</p>
                        </div>
                        <div
                            ref={roiStatsRef}
                            className="mt-12 p-6 rounded-sm bg-foreground/3 border border-foreground/8"
                        >
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { label: "Typical Timeline", value: "4-8 weeks", sub: "From discovery to launch" },
                                    { label: "Your Time Saved", value: "40-60 hours", sub: "No hiring, managing, or code reviews" },
                                    { label: "What You Get", value: "Production-ready", sub: "Deployed, tested, documented" },
                                ].map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        className={i > 0 ? "md:border-l border-foreground/8 md:pl-6" : ""}
                                    >
                                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary/40 mb-2">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-light text-primary mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-primary/40">
                                            {stat.sub}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div ref={roiButtonsRef} className="flex flex-wrap gap-3 mt-8">
                            <Link href="/schedule">
                                <MagneticButton size="lg" variant="primary">
                                    {t("roi.ctaSchedule")}
                                </MagneticButton>
                            </Link>
                            <Link href="/work">
                                <MagneticButton size="lg" variant="secondary">
                                    {t("roi.ctaWork")}
                                </MagneticButton>
                            </Link>
                        </div>
                    </section>
                    <FaqSection namespace="pricing" className="pt-24 pb-0 border-t-0" />
                </div>
            </Container>
        </section>
    )
}