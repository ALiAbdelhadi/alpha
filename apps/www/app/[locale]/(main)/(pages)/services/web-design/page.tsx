// motion: DEFAULTS throughout — Hero(eyebrow/title/desc/cta/scroll), section titles via useReveal on wrapper divs, feature cards via GSAP loop with MOTION constants
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function WebDesignPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <ShowcaseSection />
            <FeaturesSection />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")

    const eyebrowRef = useReveal({ ...DEFAULTS.body,    delay: 0 })
    const titleRef   = useText(DEFAULTS.heading)
    const descRef    = useReveal({ ...DEFAULTS.body,    delay: 0.15 })
    const ctaRef     = useReveal({ ...DEFAULTS.element, delay: 0.25 })
    const scrollRef  = useReveal({ ...DEFAULTS.element, direction: "fade", delay: 0.45 })

    return (
        <section
            className="relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden"
            style={{ minHeight: "100vh" }}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/[0.028]"
                style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}
            >
                01
            </div>
            <div
                ref={eyebrowRef}
                className="absolute top-24 ltr:right-8 rtl:left-8 hidden md:flex items-center gap-2"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
                    {t("subtitle")}
                </span>
            </div>
            <Container>
                <div className="max-w-5xl">
                    <div className="mb-8 flex items-center gap-2 md:hidden">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
                            {t("subtitle")}
                        </span>
                    </div>
                    <h1
                        ref={titleRef}
                        className="mb-10 font-sans font-normal text-primary leading-[1.03]"
                        style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}
                    >
                        {t("title")}
                        <br />
                        <span className="text-primary/35" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
                            {t("titleItalic")}
                        </span>
                    </h1>
                    <div ref={descRef} className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start">
                        <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
                        <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">
                            {t("description")}
                        </p>
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
                        <Link href="#showcase">
                            <MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
            <div
                ref={scrollRef}
                className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                aria-hidden="true"
            >
                <p className="font-mono text-xs uppercase text-primary/25 tracking-[0.25em]">Scroll</p>
                <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
                    <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
                </div>
            </div>
            <style>{`@keyframes slideDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
        </section>
    )
}

function ShowcaseSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-showcase-item]")
        const triggers: ScrollTrigger[] = []
        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: MOTION.distance.sm, willChange: "transform, opacity" })
            const tween = gsap.to(item, {
                opacity: 1, y: 0, duration: MOTION.duration.base, delay: index * MOTION.stagger.tight, ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: item, start: "top 90%", once: true },
                onComplete() { gsap.set(item, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    const showcaseItems = [
        { labelKey: "showcaseEcommerce", number: "01" },
        { labelKey: "showcaseCorporate", number: "02" },
        { labelKey: "showcasePortfolio", number: "03" },
        { labelKey: "showcaseLanding",   number: "04" },
    ]

    const getSpan = (i: number) =>
        i === 0 ? "md:col-span-2 md:row-span-2" :
        i === 1 ? "md:col-span-2 md:row-span-1" :
                  "md:col-span-1 md:row-span-1"

    return (
        <section id="showcase" ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
                        {t("showcaseEyebrow")}
                    </p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2 className="font-sans font-normal text-primary leading-[1.05]" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>
                            {t("showcaseTitle")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                                {t("showcaseTitleItalic")}
                            </span>
                        </h2>
                        <p className="font-mono text-sm text-primary/35 max-w-[36ch] hidden lg:block leading-relaxed">
                            {t("showcaseSubtitle")}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ gridAutoRows: "clamp(180px, 20vw, 260px)" }}>
                    {showcaseItems.map((item, i) => (
                        <div
                            key={i}
                            data-showcase-item
                            className={["group relative border border-foreground/8 rounded-sm bg-foreground/2 p-6 md:p-8 overflow-hidden flex flex-col justify-between hover:bg-foreground/4 transition-colors duration-300 cursor-pointer", getSpan(i)].join(" ")}
                        >
                            <div aria-hidden className="absolute inset-0 bg-foreground/2 pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                            <div className="relative z-10 flex items-start justify-between">
                                <span className="font-mono text-xs text-primary/25 tracking-[0.2em]">{item.number}</span>
                                <span className="font-mono text-sm text-primary/25 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </div>
                            <div className="relative z-10 mt-auto">
                                <h3 className="font-sans font-medium text-primary group-hover:text-primary/80 transition-colors duration-300" style={{ fontSize: i === 0 ? "clamp(18px, 2.4vw, 26px)" : "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                                    {t(item.labelKey)}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function FeaturesSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
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
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">{tCommon("whatWeOfferEyebrow")}</p>
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

function CtaSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
    const cardsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cardsRef.current) return
        const cards = cardsRef.current.querySelectorAll("[data-token-card]")
        const triggers: ScrollTrigger[] = []
        cards.forEach((card, i) => {
            gsap.set(card, { opacity: 0, y: MOTION.distance.sm, willChange: "transform, opacity" })
            const tween = gsap.to(card, {
                opacity: 1, y: 0, duration: MOTION.duration.base, delay: i * MOTION.stagger.base, ease: MOTION.ease.smooth,
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
                onComplete() { gsap.set(card, { willChange: "auto" }) },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })
        return () => triggers.forEach((t) => t.kill())
    }, [])

    return (
        <section ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16 flex items-end justify-between gap-8 flex-wrap">
                    <div className="max-w-xl">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">{t("cta.eyebrow")}</p>
                        <h2 className="font-sans font-normal text-primary leading-[1.05] mb-4" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>{t("cta.title")}</h2>
                        <p className="text-base text-primary/60 leading-relaxed max-w-[44ch]">{t("cta.description")}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {tCommon("ctaPrimary")}
                                    <svg className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="/services">
                            <MagneticButton size="lg" variant="secondary">{t("cta.back")}</MagneticButton>
                        </Link>
                    </div>
                </div>
                <div ref={cardsRef} className="grid md:grid-cols-3 gap-4">
                    <div data-token-card className="border border-foreground/8 rounded-sm bg-foreground/2 p-6 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 block">Colors</span>
                        <div className="flex gap-2">
                            {["bg-foreground/80", "bg-foreground/50", "bg-foreground/25", "bg-foreground/10", "bg-foreground/4"].map((c, i) => (
                                <div key={i} className={`flex-1 h-10 rounded-sm ${c}`} />
                            ))}
                        </div>
                        <p className="font-mono text-xs text-primary/30 tracking-widest">Tailored palette for your brand</p>
                    </div>
                    <div data-token-card className="border border-foreground/8 rounded-sm bg-foreground/2 p-6 space-y-3">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 block">Typography</span>
                        <div className="space-y-1">
                            <div className="font-sans font-normal text-primary leading-none" style={{ fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.025em" }}>Aa</div>
                            <div className="text-sm text-primary/40 font-sans">Body regular</div>
                            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary/20">Mono Label</div>
                        </div>
                    </div>
                    <div data-token-card className="border border-foreground/8 rounded-sm bg-foreground/2 p-6 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 block">Layout</span>
                        <div className="grid grid-cols-4 gap-1.5">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className={`h-7 rounded-sm ${i % 3 === 0 ? "col-span-2 bg-foreground/12" : "bg-foreground/6"}`} />
                            ))}
                        </div>
                        <p className="font-mono text-xs text-primary/30 tracking-widest">Responsive grid system</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}