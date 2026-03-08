"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"

type PricingTier = {
    id: string
    name: string
    priceRange: string
    idealFor: string
    highlight?: boolean
    features: string[]
}

const TIERS: PricingTier[] = [
    {
        id: "essential",
        name: "Essential",
        priceRange: "50,000 – 150,000 EGP",
        idealFor: "Founders validating a product or lean corporate sites.",
        features: [
            "Up to 5 key pages or views",
            "Custom design based on your brand",
            "Production-grade Next.js + Tailwind implementation",
            "Core web vitals optimized at launch",
            "Email support during build",
        ],
    },
    {
        id: "professional",
        name: "Professional",
        priceRange: "150,000 – 450,000 EGP",
        idealFor: "Teams ready to scale with more complex UX or integrations.",
        highlight: true,
        features: [
            "Up to 12 pages or views",
            "Advanced animations and interactions",
            "Multi-language support (EN/AR) where needed",
            "Integration with your preferred CMS or API",
            "Estimation workshop + technical architecture",
        ],
    },
    {
        id: "flagship",
        name: "Flagship",
        priceRange: "450,000 EGP+",
        idealFor: "Product teams building a core digital product or high-traffic property.",
        features: [
            "Unlimited pages within agreed scope",
            "Complex flows, dashboards, or configurators",
            "Custom performance and accessibility budget",
            "Close collaboration with your in-house team",
            "Dedicated Slack/Teams channel during the build",
        ],
    },
]

export default function PricingPage() {
    return (
        <section className="section-padding">
            <Container>
                <div className="max-w-5xl mx-auto py-12 md:py-20">
                    <header className="mb-10 md:mb-14">
                        <p className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-3">
                            Pricing
                        </p>
                        <h1 className="font-sans text-3xl md:text-5xl font-normal text-primary mb-4">
                            Transparent, project-based pricing.
                        </h1>
                        <p className="body-lg text-primary/75 max-w-3xl">
                            These ranges reflect what similar projects have cost in the past. Your exact investment
                            depends on scope, complexity, and timeline—something we’ll clarify together before you
                            commit.
                        </p>
                    </header>

                    <div className="grid gap-6 md:grid-cols-3 mb-12">
                        {TIERS.map((tier) => (
                            <article
                                key={tier.id}
                                className={`rounded-2xl border p-5 md:p-6 ${
                                    tier.highlight
                                        ? "border-foreground/40 bg-foreground/5"
                                        : "border-foreground/15 bg-foreground/3"
                                }`}
                            >
                                {tier.highlight && (
                                    <p className="mono text-[11px] uppercase tracking-[0.16em] text-primary/65 mb-2">
                                        Recommended
                                    </p>
                                )}
                                <h2 className="font-sans text-xl font-medium text-primary mb-1">
                                    {tier.name}
                                </h2>
                                <p className="mono small text-primary/60 mb-3">
                                    {tier.priceRange}
                                </p>
                                <p className="small text-primary/75 mb-4">
                                    {tier.idealFor}
                                </p>
                                <ul className="space-y-2 mb-5">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="small text-primary/80">
                                            • {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/estimator">
                                    <MagneticButton
                                        size="lg"
                                        variant={tier.highlight ? "primary" : "secondary"}
                                        className="w-full justify-center"
                                    >
                                        Get tailored estimate
                                    </MagneticButton>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <section className="mt-10 md:mt-16 border-t border-foreground/15 pt-10">
                        <h2 className="font-sans text-2xl md:text-3xl font-medium text-primary mb-3">
                            Simple ROI framing
                        </h2>
                        <p className="body text-primary/75 max-w-3xl mb-5">
                            If your current site converts 2% of visitors and we help you reach 4%, with 10,000
                            monthly visitors and an average order value of 1,500 EGP, that’s roughly{" "}
                            <span className="font-medium">300,000 EGP</span> in additional monthly revenue.
                        </p>
                        <p className="body text-primary/70 max-w-3xl mb-6">
                            The question usually isn’t “Can we afford this build?”—it’s “Can we afford to keep
                            losing that upside every month?”
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/schedule">
                                <MagneticButton size="lg" variant="primary">
                                    Talk through your numbers
                                </MagneticButton>
                            </Link>
                            <Link href="/work">
                                <MagneticButton size="lg" variant="secondary">
                                    See projects in this range
                                </MagneticButton>
                            </Link>
                        </div>
                    </section>
                </div>
            </Container>
        </section>
    )
}

