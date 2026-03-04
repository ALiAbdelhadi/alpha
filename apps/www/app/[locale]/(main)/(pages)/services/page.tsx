"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function ServicesPage() {
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
}

function HeroSection() {
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
                        04
                    </span>
                </div>
            </Container>
        </section>
    )
}

function ServicesGrid() {
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

    const services = [
        { key: "webDesign", href: "/services/web-design", number: "01" },
        { key: "development", href: "/services/development", number: "02" },
        { key: "consulting", href: "/services/consulting", number: "03" },
        { key: "maintenance", href: "/services/maintenance", number: "04" },
    ]

    return (
        <section ref={sectionRef} className="section-padding bg-foreground/2.5">
            <Container>
                <div ref={titleRef} className="mb-16 flex items-end justify-between flex-wrap gap-8">
                    <div className="max-w-xl">
                        <h2 className="font-sans font-normal text-primary mb-4">{t("gridTitle")}</h2>
                        <p className="mono text-primary/50">{t("gridSubtitle")}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                        <Link key={service.number} href={service.href}>
                            <div
                                data-service-card
                                className="group relative rounded-2xl border border-foreground/10 bg-background p-8 md:p-10 overflow-hidden hover:border-foreground/25 hover:bg-foreground/3 transition-all duration-300 cursor-pointer"
                            >
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/4 to-transparent" />
                                <div className="relative">
                                    <div className="mb-8 flex items-center justify-between">
                                        <span className="mono text-xs text-primary/30">{service.number}</span>
                                        <svg
                                            className="w-4 h-4 text-primary/0 group-hover:text-primary/40 transition-all duration-300 ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-3 font-sans font-medium text-primary">
                                        {t(`services.${service.key}.title`)}
                                    </h3>
                                    <p className="body text-primary/55 leading-relaxed">
                                        {t(`services.${service.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function CtaSection() {
    const t = useTranslations("servicesPage")
    const contentRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.6 })

    return (
        <section className="section-padding overflow-hidden">
            <Container>
                <div
                    ref={contentRef}
                    className="relative rounded-3xl border border-foreground/10 bg-foreground/3 px-8 py-20 md:px-20 md:py-28 text-center overflow-hidden"
                >
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-32 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 w-[500px] h-[500px] rounded-full bg-foreground/4 blur-3xl" />
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                                backgroundSize: "48px 48px",
                            }}
                        />
                    </div>
                    <div className="relative">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
                            <span className="mono-uppercase text-xs text-primary/50">get in touch</span>
                        </div>
                        <h2 className="mb-6 font-sans font-normal text-primary max-w-2xl mx-auto">{t("ctaTitle")}</h2>
                        <p className="mb-12 body-lg text-primary/60 max-w-xl mx-auto">{t("ctaDescription")}</p>
                        <Link href="/contact">
                            <MagneticButton size="lg" variant="primary" className="group">
                                <span className="flex items-center gap-2">
                                    {t("ctaButton")}
                                    <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}