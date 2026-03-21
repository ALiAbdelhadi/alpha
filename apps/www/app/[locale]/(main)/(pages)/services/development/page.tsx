// motion: DEFAULTS throughout — Hero(eyebrow/title/desc/cta/scroll), section wrappers via useReveal(body), items via GSAP+MOTION
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function DevelopmentPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <TechStackSection />
            <FeaturesSection />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText(DEFAULTS.heading)
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const ctaRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })
    const scrollRef = useReveal({ ...DEFAULTS.element, direction: "fade", delay: 0.45 })

    return (
        <section className="relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden" style={{ minHeight: "100vh" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>
            <div aria-hidden="true" className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/[0.028]" style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}>02</div>
            <div ref={eyebrowRef} className="absolute top-24 ltr:right-8 rtl:left-8 hidden md:flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">{t("subtitle")}</span>
            </div>
            <Container>
                <div className="max-w-5xl">
                    <div className="mb-8 flex items-center gap-2 md:hidden">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">{t("subtitle")}</span>
                    </div>
                    <h1 ref={titleRef} className="mb-10 font-sans font-normal text-primary leading-[1.03]" style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}>
                        {t("title")}
                        <br />
                        <span className="text-primary/35" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>{t("titleItalic") ?? "built to scale."}</span>
                    </h1>
                    <div ref={descRef} className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start">
                        <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
                        <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">{t("description")}</p>
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
                        <Link href="#tech-stack"><MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton></Link>
                    </div>
                </div>
            </Container>
            <div ref={scrollRef} className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
                <p className="font-mono text-xs uppercase text-primary/25 tracking-[0.25em]">Scroll</p>
                <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
                    <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
                </div>
            </div>
            <style>{`@keyframes slideDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
        </section>
    )
}

function TechStackSection() {
    const t = useTranslations("serviceDetails.development")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-tech-item]")
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

    const technologies = [
        { name: "Next.js", category: "Framework" },
        { name: "React", category: "Library" },
        { name: "TypeScript", category: "Language" },
        { name: "Node.js", category: "Runtime" },
        { name: "PostgreSQL", category: "Database" },
        { name: "Prisma", category: "ORM" },
        { name: "TailwindCSS", category: "Styling" },
        { name: "Vercel", category: "Deployment" },
    ]

    return (
        <section id="tech-stack" ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">{t("techStack.eyebrow") ?? "The Stack"}</p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2 className="font-sans font-normal text-primary leading-[1.05]" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>
                            {t("techStack.title")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{t("techStack.titleItalic") ?? "every tool, intentional."}</span>
                        </h2>
                        <p className="font-mono text-sm text-primary/35 max-w-[32ch] hidden lg:block tracking-[0.05em]">{t("techStack.subtitle")}</p>
                    </div>
                </div>
                <div className="h-px w-full bg-foreground/8 mb-0" />
                <div className="grid grid-cols-2 sm:grid-cols-4">
                    {technologies.map((tech, i) => (
                        <div key={tech.name} data-tech-item className="group relative border-b border-r border-foreground/8 p-6 md:p-8 hover:bg-foreground/3 transition-colors duration-300">
                            <div className="absolute top-4 ltr:right-4 rtl:left-4 h-1.5 w-1.5 rounded-full bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500" />
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/25 mb-3 block">{t(`techStack.categories.${tech.category}`)}</span>
                            <h3 className="font-sans font-medium text-primary group-hover:text-primary/80 transition-colors duration-300" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", letterSpacing: "-0.01em" }}>{tech.name}</h3>
                            <div aria-hidden className="absolute bottom-3 ltr:right-4 rtl:left-4 font-mono text-xs text-primary/15 tracking-[0.15em]">{String(i + 1).padStart(2, "0")}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-0 border-t border-foreground/8 pt-4 flex items-center gap-4">
                    <span className="font-mono text-xs uppercase text-primary/20 tracking-[0.25em]">08 Technologies - ALTRUVEX</span>
                    <div className="flex-1 h-px bg-foreground/4" />
                </div>
            </Container>
        </section>
    )
}

function FeaturesSection() {
    const t = useTranslations("serviceDetails.development")
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
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">{tCommon("whatWeOfferEyebrow") ?? "What's Included"}</p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2 className="font-sans font-normal text-primary leading-[1.05]" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}>
                            {tCommon("whatWeOffer")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{tCommon("whatWeOfferItalic") ?? "in every build."}</span>
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
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")
    const cardRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    return (
        <section className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={cardRef} className="border border-foreground/8 rounded-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-foreground/8 bg-foreground/2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/12" />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/12" />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/12" />
                        </div>
                        <span className="font-mono text-xs text-primary/25 tracking-[0.2em] mx-auto">new-project - bash</span>
                    </div>
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-10 border-b border-foreground/8 md:border-b-0 ltr:md:border-r rtl:md:border-l font-mono text-sm space-y-3">
                            <div className="flex gap-3 text-primary/40"><span className="select-none">~</span><span className="text-primary/50">$</span><span className="text-primary/70">npx start-project</span></div>
                            <div className="pl-6 space-y-1.5 text-primary/30">
                                <div>✓ Requirements gathered</div>
                                <div>✓ Timeline estimated</div>
                                <div>✓ Team assigned</div>
                            </div>
                            <div className="flex gap-3 text-primary/40"><span className="select-none">~</span><span className="text-primary/50">$</span><span className="text-primary/70">contact --team</span></div>
                            <div className="flex gap-2 text-primary/55"><span>→</span><span>Ready. Let&apos;s go.</span><span className="inline-block w-2 h-4 bg-primary/35 animate-pulse" /></div>
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-between gap-8">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-5 block">{t("cta.eyebrow") ?? "Ready to Ship"}</p>
                                <h2 className="font-sans font-normal text-primary leading-[1.05] mb-4" style={{ fontSize: "clamp(22px, 3.5vw, 38px)", letterSpacing: "-0.02em" }}>{t("cta.title")}</h2>
                                <p className="text-base text-primary/60 leading-relaxed max-w-[40ch]">{t("cta.description")}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href="/contact" className="w-full">
                                    <MagneticButton size="lg" variant="primary" className="group w-full justify-center">
                                        <span className="flex items-center gap-2">
                                            {tCommon("ctaPrimary")}
                                            <svg className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </MagneticButton>
                                </Link>
                                <Link href="/services" className="w-full">
                                    <MagneticButton size="lg" variant="secondary" className="w-full justify-center">{t("cta.back") ?? "View All Services"}</MagneticButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}