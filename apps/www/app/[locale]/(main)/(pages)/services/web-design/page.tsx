"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function WebDesignPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[600px] w-[600px] rounded-full bg-foreground/3 blur-3xl" />
                <div className="absolute top-1/2 ltr:-left-60 rtl:-right-60 h-[500px] w-[500px] rounded-full bg-foreground/2 blur-3xl" />
            </div>
            <HeroSection />
            <ShowcaseSection />
            <FeaturesSection />
            <WebDesignCtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.webDesign")
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
                        <Link href="#showcase">
                            <MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>
                <div className="pointer-events-none absolute ltr:right-0 rtl:left-0 bottom-16 select-none" aria-hidden="true">
                    <span className="text-[clamp(8rem,20vw,18rem)] font-light leading-none text-foreground/4 tracking-tighter">
                        01
                    </span>
                </div>
            </Container>
        </section>
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
            gsap.set(item, { opacity: 0, y: 24 })
            const tween = gsap.to(item, {
                opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: "power2.out",
                scrollTrigger: { trigger: item, start: "top 87%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const showcaseItems = [
        { labelKey: "showcaseEcommerce" },
        { labelKey: "showcaseCorporate" },
        { labelKey: "showcasePortfolio" },
        { labelKey: "showcaseLanding" },
    ]

    return (
        <section id="showcase" ref={sectionRef} className="section-padding">
            <Container>
                <div ref={titleRef} className="mb-20 flex items-end justify-between flex-wrap gap-8">
                    <div>
                        <h2 className="font-sans font-normal text-primary mb-4">{t("showcaseTitle")}</h2>
                        <p className="body-lg text-primary/50 max-w-xl">{t("showcaseSubtitle")}</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="w-16 h-px bg-foreground/20" />
                        <span className="mono-uppercase text-xs text-primary/30">showcase</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-6 gap-4">
                    {showcaseItems.map((item, i) => {
                        const wide = i === 0 || i === 3
                        return (
                            <div
                                key={i}
                                data-showcase-item
                                className={[
                                    "group relative rounded-2xl border border-foreground/10 bg-background overflow-hidden",
                                    "hover:border-foreground/25 hover:bg-foreground/3 transition-all duration-300",
                                    "aspect-4/5",
                                    wide ? "md:col-span-3" : "md:col-span-2",
                                ].join(" ")}
                            >
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/4 to-transparent" />
                                <div className="absolute top-6 ltr:left-6 rtl:right-6 ltr:right-6 rtl:left-6 flex items-center justify-between w-[calc(100%-3rem)]">
                                    <span className="mono text-xs text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                                    <svg
                                        className="w-4 h-4 text-primary/0 group-hover:text-primary/40 transition-all duration-300 ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="font-sans font-medium text-primary">
                                        {t(item.labelKey)}
                                    </h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

function FeaturesSection() {
    const t = useTranslations("serviceDetails.webDesign")
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

function WebDesignCtaSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cardsRef.current) return
        const cards = cardsRef.current.querySelectorAll("[data-token-card]")
        const triggers: ScrollTrigger[] = []
        cards.forEach((card, i) => {
            gsap.set(card, { opacity: 0, y: 20 })
            const tw = gsap.to(card, {
                opacity: 1, y: 0, duration: 0.5, delay: i * 0.12, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
            })
            if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
        })
        return () => triggers.forEach(t => t.kill())
    }, [])

    return (
        <section className="section-padding overflow-hidden">
            <Container>
                <div ref={titleRef} className="mb-16 flex items-end justify-between flex-wrap gap-8">
                    <div className="max-w-xl">
                        <h2 className="font-sans font-normal text-primary mb-4">{t("cta.title")}</h2>
                        <p className="body-lg text-primary/55">{t("cta.description")}</p>
                    </div>
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
                </div>
                <div ref={cardsRef} className="grid md:grid-cols-3 gap-4">
                    <div data-token-card className="rounded-2xl border border-foreground/10 bg-foreground/3 p-6 space-y-4">
                        <span className="mono-uppercase text-xs text-primary/35">colors</span>
                        <div className="flex gap-2">
                            {["bg-foreground/80", "bg-foreground/50", "bg-foreground/25", "bg-foreground/10", "bg-foreground/5"].map((c, i) => (
                                <div key={i} className={`flex-1 h-12 rounded-lg ${c}`} />
                            ))}
                        </div>
                        <p className="body text-xs text-primary/40">Tailored palette for your brand</p>
                    </div>
                    <div data-token-card className="rounded-2xl border border-foreground/10 bg-foreground/3 p-6 space-y-3">
                        <span className="mono-uppercase text-xs text-primary/35">typography</span>
                        <div className="space-y-1">
                            <div className="font-sans font-normal text-primary" style={{ fontSize: "2rem", lineHeight: 1 }}>Aa</div>
                            <div className="font-sans text-primary/40" style={{ fontSize: "1rem" }}>Body regular</div>
                            <div className="font-mono text-primary/25 text-xs">MONO UPPERCASE</div>
                        </div>
                    </div>
                    <div data-token-card className="rounded-2xl border border-foreground/10 bg-foreground/3 p-6 space-y-4">
                        <span className="mono-uppercase text-xs text-primary/35">layout</span>
                        <div className="grid grid-cols-4 gap-1.5">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className={`h-8 rounded-md ${i % 3 === 0 ? "col-span-2 bg-foreground/15" : "bg-foreground/7"}`} />
                            ))}
                        </div>
                        <p className="body text-xs text-primary/40">Responsive grid system</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
