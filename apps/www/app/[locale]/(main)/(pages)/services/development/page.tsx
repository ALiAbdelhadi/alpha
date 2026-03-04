"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function DevelopmentPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[600px] w-[600px] rounded-full bg-foreground/3 blur-3xl" />
                <div className="absolute top-1/2 ltr:-left-60 rtl:-right-60 h-[500px] w-[500px] rounded-full bg-foreground/2 blur-3xl" />
            </div>
            <HeroSection />
            <TechStackSection />
            <FeaturesSection />
            <DevelopmentCtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")
    const badgeRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1, duration: 0.5 })
    const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", delay: 0, duration: 0.8 })
    const descRef = useReveal<HTMLParagraphElement>({ direction: "up", delay: 0.2, duration: 0.6 })
    const ctaRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.35, duration: 0.5 })

    return (
        <section className="relative min-h-screen flex items-center section-padding">
            {/* Decorative grid lines */}
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
                        <Link href="#tech-stack">
                            <MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>
                <div className="pointer-events-none absolute ltr:right-0 rtl:left-0 bottom-16 select-none" aria-hidden="true">
                    <span className="text-[clamp(8rem,20vw,18rem)] font-light leading-none text-foreground/4 tracking-tighter">
                        02
                    </span>
                </div>
            </Container>
        </section>
    )
}

function TechStackSection() {
    const t = useTranslations("serviceDetails.development")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return
        const items = sectionRef.current.querySelectorAll("[data-tech-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 24 })
            const tween = gsap.to(item, {
                opacity: 1, y: 0, duration: 0.6, delay: index * 0.08, ease: "power2.out",
                scrollTrigger: { trigger: item, start: "top 90%", once: true },
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
        <section id="tech-stack" ref={sectionRef} className="section-padding">
            <Container>
                {/* Section header — exact consulting pattern */}
                <div ref={titleRef} className="mb-20 flex items-end justify-between flex-wrap gap-8">
                    <div>
                        <h2 className="font-sans font-normal text-primary mb-4">{t("techStack.title")}</h2>
                        <p className="body-lg text-primary/50 max-w-xl">{t("techStack.subtitle")}</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="w-16 h-px bg-foreground/20" />
                        <span className="mono-uppercase text-xs text-primary/30">stack</span>
                    </div>
                </div>

                {/* Bento grid — exact consulting feature card pattern */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {technologies.map((tech, i) => (
                        <div
                            key={tech.name}
                            data-tech-item
                            className="group relative rounded-2xl border border-foreground/10 bg-foreground/3 p-7 overflow-hidden hover:border-foreground/25 hover:bg-foreground/6 transition-all duration-300 cursor-default"
                        >
                            {/* Hover gradient overlay */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/4 to-transparent" />

                            <div className="relative">
                                {/* Index + arrow row */}
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="mono text-xs text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                                    <svg
                                        className="w-4 h-4 text-primary/0 group-hover:text-primary/40 transition-all duration-300 ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0 rtl:group-hover:translate-x-0 rtl:-rotate-180"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 font-sans font-medium text-primary">{tech.name}</h3>
                                <p className="body text-primary/55">{t(`techStack.categories.${tech.category}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

/* ─────────────────────────────────────────
   FEATURES  (exact FeaturesStrategicSection)
───────────────────────────────────────── */
function FeaturesSection() {
    const t = useTranslations("serviceDetails.development")
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
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-foreground/4to-transparent" />
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

function DevelopmentCtaSection() {
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")
    const cardRef = useReveal({ direction: "up", delay: 0, duration: 0.7 })

    return (
        <section className="section-padding overflow-hidden">
            <Container>
                <div ref={cardRef} className="relative rounded-2xl border border-foreground/10 bg-foreground/3 overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/10 bg-foreground/2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                            <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <span className="mono text-xs text-primary/30">new-project — bash</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-8 md:p-12 border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-foreground/10 font-mono text-sm space-y-3">
                            <div className="flex gap-3 text-primary/40">
                                <span className="select-none">~</span>
                                <span className="text-primary/60">$</span>
                                <span className="text-primary/80">npx start-project</span>
                            </div>
                            <div className="pl-6 space-y-1.5 text-primary/35">
                                <div>✓ Requirements gathered</div>
                                <div>✓ Timeline estimated</div>
                                <div>✓ Team assigned</div>
                            </div>
                            <div className="flex gap-3 text-primary/40">
                                <span className="select-none">~</span>
                                <span className="text-primary/60">$</span>
                                <span className="text-primary/80">contact --team</span>
                            </div>
                            <div className="flex gap-2 text-primary/60">
                                <span>→</span>
                                <span>Ready. Let&apos;s go.</span>
                                <span className="inline-block w-2 h-4 bg-primary/40 animate-pulse" />
                            </div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <p className="mono-uppercase text-xs text-primary/35 mb-6 tracking-widest">ready to ship</p>
                            <h2 className="font-sans font-normal text-primary mb-6">{t("cta.title")}</h2>
                            <p className="body text-primary/55 mb-8">{t("cta.description")}</p>
                            <Link href="/contact">
                                <MagneticButton size="lg" variant="primary" className="group w-fit">
                                    <span className="flex items-center gap-2">
                                        {tCommon("ctaPrimary")}
                                        <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}