"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface ServicePageTemplateProps {
    serviceKey: "webDesign" | "development" | "consulting" | "maintenance"
}

export function ServicePageTemplate({ serviceKey }: ServicePageTemplateProps) {
    const t = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descriptionRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })
    const featuresRef = useRef<HTMLDivElement>(null)
    const featuresTitleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current || !featuresRef.current) return

        const cards = featuresRef.current.querySelectorAll("[data-feature-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, {
                opacity: 0,
                y: 20,
            })

            const revealTween = gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: index * 0.06,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (revealTween.scrollTrigger) {
                triggers.push(revealTween.scrollTrigger)
            }
        })

        return () => {
            triggers.forEach((trigger) => trigger.kill())
        }
    }, [])

    const features = ["1", "2", "3", "4", "5", "6"]

    return (
        <div className="flex flex-col min-h-screen">
            <section className="flex min-h-screen w-full items-center justify-center pt-24 md:pt-32">
                <Container>
                    <div className="max-w-4xl">
                        <div
                            ref={titleRef}
                            className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/10 px-4 py-2 backdrop-blur-sm"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                            <p className="font-mono text-xs text-primary/90 tracking-wide uppercase">
                                {t(`${serviceKey}.subtitle`)}
                            </p>
                        </div>
                        <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.08] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl">
                            <span className="text-balance">{t(`${serviceKey}.title`)}</span>
                        </h1>
                        <p
                            ref={descriptionRef}
                            className="mb-10 max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl"
                        >
                            <span className="text-pretty">{t(`${serviceKey}.description`)}</span>
                        </p>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link href="/contact">
                                    <MagneticButton
                                        size="lg"
                                        variant="primary"
                                        className="group relative"
                                    >
                                        <span className="flex items-center gap-2">{t("ctaPrimary")}</span>
                                        <svg
                                            className="ml-2 h-4 w-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </MagneticButton>
                                </Link>
                                <Link href="/#work">
                                    <MagneticButton size="lg" variant="secondary">
                                        {t("ctaSecondary")}
                                    </MagneticButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section
                id="features"
                ref={sectionRef}
                className="flex min-h-screen w-full items-center py-24 md:py-32"
            >
                <Container>
                    <div ref={featuresTitleRef} className="mb-16 md:mb-20">
                        <h2 className="mb-3 font-sans text-5xl font-normal tracking-tight text-primary md:text-6xl lg:text-7xl">
                            {t("whatWeOffer")}
                        </h2>
                        <p className="font-mono text-sm text-primary/60 tracking-wide md:text-base">
                            {t("whatWeOfferSubtitle")}
                        </p>
                    </div>
                    <div ref={featuresRef} className="grid gap-12 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:gap-x-28">
                        {features.map((num, i) => (
                            <div key={num} data-feature-card className="group cursor-default">
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="h-px w-10 bg-foreground/25 transition-colors group-hover:bg-foreground/40" />
                                    <span className="font-mono text-xs text-primary/50 transition-all">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="mb-3 font-sans text-2xl font-medium text-primary transition-colors group-hover:text-primary/90 md:text-3xl">
                                    {t(`${serviceKey}.features.${num}.title`)}
                                </h3>
                                <p className="max-w-md text-base leading-relaxed text-primary/75 md:text-lg">
                                    {t(`${serviceKey}.features.${num}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
