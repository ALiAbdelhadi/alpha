"use client"

import { Container } from "@/components/container"
import { ServiceCta } from "@/components/services/service-cta"
import { ServiceFeatures } from "@/components/services/service-features"
import { ServiceHero } from "@/components/services/service-hero"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function WebDesignPage() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")

    const features = ["1", "2", "3", "4", "5", "6"].map(num => ({
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
    }))

    return (
        <div className="relative min-h-screen w-full">
            <ServiceHero
                subtitle={t("subtitle")}
                title={t("title")}
                description={t("description")}
                gradientPreset="blue-purple"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" },
                    secondary: { text: tCommon("ctaSecondary"), href: "#showcase" }
                }}
                visual={<WebDesignVisual />}
            />
            
            <ShowcaseSection />
            
            <ServiceFeatures
                title={tCommon("whatWeOffer")}
                subtitle={tCommon("whatWeOfferSubtitle")}
                features={features}
                columns={3}
            />
            
            <ServiceCta
                title={t("cta.title")}
                description={t("cta.description")}
                gradientPreset="blue-purple"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" }
                }}
            />
        </div>
    )
}

function WebDesignVisual() {
    return (
        <div className="relative">
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="h-6 rounded-full bg-foreground/10 max-w-xs" />
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="h-8 w-3/4 rounded bg-foreground/10" />
                    <div className="h-4 w-full rounded bg-foreground/5" />
                    <div className="h-4 w-5/6 rounded bg-foreground/5" />
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="h-24 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/10" />
                        <div className="h-24 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10" />
                        <div className="h-24 rounded-lg bg-gradient-to-br from-teal-500/20 to-green-500/10" />
                    </div>
                </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/20 backdrop-blur-sm animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 backdrop-blur-sm animate-pulse" style={{ animationDuration: "4s" }} />
        </div>
    )
}

function ShowcaseSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-showcase-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, scale: 0.95 })

            const tween = gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const showcaseItems = [
        { gradient: "from-rose-500/20 to-pink-500/10", label: t("showcaseEcommerce") },
        { gradient: "from-amber-500/20 to-orange-500/10", label: t("showcaseCorporate") },
        { gradient: "from-emerald-500/20 to-teal-500/10", label: t("showcasePortfolio") },
        { gradient: "from-blue-500/20 to-indigo-500/10", label: t("showcaseLanding") },
    ]

    return (
        <section id="showcase" ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="font-sans text-4xl font-normal tracking-tight text-primary md:text-5xl mb-4">
                        {t("showcaseTitle")}
                    </h2>
                    <p className="text-primary/70 max-w-2xl mx-auto">
                        {t("showcaseSubtitle")}
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {showcaseItems.map((item, i) => (
                        <div
                            key={i}
                            data-showcase-item
                            className={`aspect-[4/5] rounded-2xl bg-gradient-to-br ${item.gradient} border border-foreground/5 flex items-end p-6 hover:scale-[1.02] transition-transform cursor-default`}
                        >
                            <span className="font-mono text-sm text-primary/70">{item.label}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
