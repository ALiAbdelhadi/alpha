"use client"

import { Container } from "@/components/container"
import { ServiceCta } from "@/components/services/service-cta"
import { ServiceFeatures } from "@/components/services/service-features"
import { ServiceHero } from "@/components/services/service-hero"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ConsultingPage() {
    const t = useTranslations("serviceDetails.consulting")
    const tCommon = useTranslations("serviceDetails")

    const features = ["1", "2", "3", "4", "5", "6"].map(num => ({
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
        icon: (
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }))

    return (
        <div className="relative min-h-screen w-full">
            <ServiceHero
                subtitle={t("subtitle")}
                title={t("title")}
                description={t("description")}
                gradientPreset="amber-orange"
                buttons={{
                    primary: { text: t("hero.ctaPrimary"), href: "/schedule" },
                    secondary: { text: t("hero.ctaSecondary"), href: "#approach" }
                }}
            />
            
            <ApproachSection />
            
            <ServiceFeatures
                title={tCommon("whatWeOffer")}
                subtitle={tCommon("whatWeOfferSubtitle")}
                features={features}
                columns={3}
            />
            
            <ServiceCta
                title={t("cta.title")}
                description={t("cta.description")}
                gradientPreset="amber-orange"
                buttons={{
                    primary: { text: t("cta.button"), href: "/schedule" }
                }}
            />
        </div>
    )
}

function ApproachSection() {
    const t = useTranslations("serviceDetails.consulting")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-approach-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 30 })

            const tween = gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.15,
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

    const steps = [
        { number: "01", title: "Understand", desc: "Deep dive into your current challenges and goals" },
        { number: "02", title: "Analyze", desc: "Thorough assessment of systems and processes" },
        { number: "03", title: "Strategize", desc: "Develop actionable recommendations" },
        { number: "04", title: "Execute", desc: "Guide implementation with ongoing support" },
    ]

    return (
        <section id="approach" ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl lg:text-5xl mb-4">
                        {t("approach.title")}
                    </h2>
                    <p className="text-primary/60 max-w-xl mx-auto">
                        {t("approach.subtitle")}
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            data-approach-item
                            className="relative p-6 rounded-2xl border border-foreground/10 bg-foreground/2 hover:bg-foreground/5 transition-colors group"
                        >
                            <div className="text-4xl font-light text-amber-500/50 mb-4 group-hover:text-amber-500 transition-colors">
                                {step.number}
                            </div>
                            <h3 className="font-sans text-xl font-medium text-primary mb-2">
                                {t(`approach.steps.${step.number.replace("0", "")}.title`)}
                            </h3>
                            <p className="text-sm text-primary/70">{t(`approach.steps.${step.number.replace("0", "")}.description`)}</p>
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 ltr:-right-3 rtl:-left-3 w-6 h-px bg-foreground/20" />
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
