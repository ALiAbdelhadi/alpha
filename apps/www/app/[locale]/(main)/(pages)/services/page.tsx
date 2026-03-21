"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { CtaSectionEnhanced as CtaSection } from "@/components/sections/cta-section"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { memo, useEffect, useMemo, useRef } from "react"

export default memo(function ServicesPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[600px] w-[600px] rounded-full bg-foreground/3 blur-3xl" />
                <div className="absolute top-1/2 ltr:-left-60 rtl:-right-60 h-[500px] w-[500px] rounded-full bg-foreground/2 blur-3xl" />
            </div>
            <HeroSection />
            <ServicesGrid />
            <CtaSection />
        </div>
    )
})

const HeroSection = memo(function HeroSection() {
    const t = useTranslations("servicesPage")
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
                        <span className="mono-uppercase text-primary/50 tracking-widest">{t("badge")}</span>
                    </div>
                    <h1 ref={titleRef} className="mb-8 font-sans font-normal text-primary">
                        <span className="text-balance block">
                            {t("title")}
                            <br />
                            <span className="text-primary/50">{t("titleHighlight")}</span>
                        </span>
                    </h1>
                    <p ref={descRef} className="mb-12 body-lg text-primary/70 max-w-2xl">
                        {t("description")}
                    </p>
                    <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {t("ctaPrimary")}
                                    <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                        <Link href="/services/web-design">
                            <MagneticButton size="lg" variant="secondary">{t("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>
                <div className="pointer-events-none absolute ltr:right-0 rtl:left-0 bottom-16 select-none" aria-hidden="true">
                    <span className="text-[clamp(8rem,20vw,18rem)] font-light leading-none text-foreground/4 tracking-tighter">
                        00
                    </span>
                </div>
            </Container>
        </section>
    )
})

const ServicesGrid = memo(function ServicesGrid() {
    const t = useTranslations("servicesPage")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll("[data-service-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 24 })
            const revealTween = gsap.to(card, {
                opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 90%", once: true },
            })
            if (revealTween.scrollTrigger) triggers.push(revealTween.scrollTrigger)
        })

        return () => triggers.forEach((trigger) => trigger.kill())
    }, [])

    const services = useMemo(() => [
        { key: "webDesign", href: "/services/web-design", number: "01" },
        { key: "development", href: "/services/development", number: "02" },
        { key: "consulting", href: "/services/consulting", number: "03" },
        { key: "maintenance", href: "/services/maintenance", number: "04" },
    ], [])

    const getBentoClasses = (idx: number) => {
        switch (idx) {
            case 0: return "md:col-span-2"
            case 1: return "md:col-span-1"
            case 2: return "md:col-span-1"
            case 3: return "md:col-span-2"
            default: return "md:col-span-1"
        }
    }
    return (
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div ref={titleRef} className="mb-16 md:mb-20">
                    <h2 className="font-sans font-medium text-primary text-4xl md:text-5xl mb-4 tracking-tight text-balance">
                        {t("gridTitle")}
                    </h2>
                    <p className="text-primary/60 text-lg leading-relaxed max-w-2xl">
                        {t("gridSubtitle")}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[320px]">
                    {services.map((service, idx) => {
                        const sizeClasses = getBentoClasses(idx)
                        return (
                            <Link key={service.number} href={service.href} className={`block ${sizeClasses}`}>
                                <div
                                    data-service-card
                                    className="group relative h-full w-full rounded-3xl border border-primary/10 bg-primary/2 p-8 md:p-10 overflow-hidden flex flex-col justify-between hover:bg-primary/4 transition-colors duration-500"
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <span className="text-[clamp(2rem,6vw,6rem)] font-light leading-none text-foreground/4 tracking-tighter">
                                            {service.number}
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 bg-background group-hover:bg-primary group-hover:text-background group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative z-10 mt-auto">
                                        <h3 className="font-sans font-medium text-primary text-2xl md:text-3xl mb-3 leading-tight">
                                            {t(`services.${service.key}.title`)}
                                        </h3>
                                        <p className="text-primary/60 text-base leading-relaxed max-w-md line-clamp-2 md:line-clamp-3">
                                            {t(`services.${service.key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
})

