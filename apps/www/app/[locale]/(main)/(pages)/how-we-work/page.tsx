// motion: useText(heading) for h1/h2, useReveal for eyebrows/body, useBatch for phase cards and standard cards
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion"
import { useLocale, useTranslations } from "next-intl"

export default function HowWeWorkPage() {
    const locale = useLocale()
    const tApproach = useTranslations("approach.hero")
    const tProcessHero = useTranslations("process.hero")
    const tPhases = useTranslations("process.phases")
    const tStandards = useTranslations("standards.hero")
    const tNav = useTranslations("nav")
    const t = useTranslations("how-we-work")

    const phases = ["discovery", "wireframe", "design", "development", "launch"] as const

    // ── Hero section ──────────────────────────────────────────
    const heroEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const heroTitleRef = useText(DEFAULTS.heading)
    const heroDescRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

    // ── Architecture section ──────────────────────────────────
    const archEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const archTitleRef = useText(DEFAULTS.heading)
    const archBodyRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".arch-p" })

    // ── Phased process section ────────────────────────────────
    const processEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const processTitleRef = useText(DEFAULTS.heading)
    const processDescRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const phaseCardsRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".phase-card" })

    // ── Standards section ─────────────────────────────────────
    const standardsEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const standardsTitleRef = useText(DEFAULTS.heading)
    const standardsBodyRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".standards-p" })
    const standardsCardsRef = useBatch<HTMLDivElement>({ ...DEFAULTS.card, selector: ".standard-card" })
    const standardsLinkRef = useReveal({ ...DEFAULTS.element, delay: 0.15 })

    // ── CTA section ───────────────────────────────────────────
    const ctaEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const ctaTitleRef = useText(DEFAULTS.heading)
    const ctaDescRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const ctaButtonsRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })

    return (
        <main className="section-padding">
            <Container>

                {/* ── Hero ──────────────────────────────────────────────── */}
                <section className="py-16 md:py-24">
                    <p
                        ref={heroEyebrowRef}
                        className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-6 block"
                    >
                        {tNav("how-we-work")}
                    </p>
                    <h1
                        ref={heroTitleRef}
                        className="mb-10 font-sans font-normal text-primary leading-[1.03]"
                        style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}
                    >
                        {tProcessHero("title")}
                        <br />
                        <span
                            className="text-primary/35"
                            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                        >
                            {t("hero.italic")}
                        </span>
                    </h1>
                    <div
                        ref={heroDescRef}
                        className="grid md:grid-cols-[80px_1fr] gap-8 items-start"
                    >
                        <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
                        <div className="space-y-4 max-w-[52ch]">
                            <p className="text-base text-primary/60 leading-relaxed">
                                {tApproach("description")}
                            </p>
                            <p className="text-base text-primary/60 leading-relaxed">
                                {tProcessHero("description")}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="h-px w-full bg-foreground/8" />

                {/* ── Architecture ──────────────────────────────────────── */}
                <section className="max-w-5xl mx-auto py-16 md:py-20">
                    <p
                        ref={archEyebrowRef}
                        className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                    >
                        {t("architecture.eyebrow")}
                    </p>
                    <h2
                        ref={archTitleRef}
                        className="font-sans font-normal text-primary leading-[1.05] mb-10"
                        style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                    >
                        {t("architecture.title")}
                    </h2>
                    <div ref={archBodyRef} className="grid md:grid-cols-2 gap-8 max-w-3xl">
                        <p className="arch-p text-base text-primary/60 leading-relaxed">{t("architecture.p1")}</p>
                        <p className="arch-p text-base text-primary/60 leading-relaxed">{t("architecture.p2")}</p>
                    </div>
                </section>

                <div className="h-px w-full bg-foreground/8" />

                {/* ── Phased Process ────────────────────────────────────── */}
                <section className="max-w-5xl mx-auto py-16 md:py-20">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p
                                ref={processEyebrowRef}
                                className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                            >
                                {t("phasedProcess.eyebrow")}
                            </p>
                            <h2
                                ref={processTitleRef}
                                className="font-sans font-normal text-primary leading-[1.05] mb-4"
                                style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                            >
                                {t("phasedProcess.title")}
                            </h2>
                            <p
                                ref={processDescRef}
                                className="text-base text-primary/60 leading-relaxed max-w-[44ch]"
                            >
                                {t("phasedProcess.description")}
                            </p>
                        </div>
                        <p className="font-mono text-xs text-muted-foreground/70 uppercase tracking-[0.2em] shrink-0">
                            {tPhases("deliverables")} · {tPhases("timeline")}
                        </p>
                    </div>
                    <div ref={phaseCardsRef} className="grid gap-4 md:grid-cols-2">
                        {phases.map((key, i) => (
                            <article
                                key={key}
                                className="phase-card group border border-foreground/8 rounded-sm bg-foreground/2 p-6 md:p-8 hover:bg-foreground/4 transition-colors duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span
                                        className="font-mono font-light text-primary/20 leading-none select-none"
                                        style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "-0.03em" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70 pt-1">
                                        {tPhases(`${key}.timeline`)}
                                    </span>
                                </div>
                                <h3
                                    className="font-sans font-medium text-primary mb-2 group-hover:text-primary/80 transition-colors duration-300"
                                    style={{ fontSize: "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em" }}
                                >
                                    {tPhases(`${key}.title`)}
                                </h3>
                                <p className="text-base text-primary/60 leading-relaxed mb-4">
                                    {tPhases(`${key}.description`)}
                                </p>
                                <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.18em]">
                                    {tPhases(`${key}.deliverables`)}
                                </p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-8 text-base text-primary/60 leading-relaxed max-w-[52ch]">
                        {t("phasedProcess.footer")}
                    </p>
                </section>

                <div className="h-px w-full bg-foreground/8" />

                {/* ── Standards ─────────────────────────────────────────── */}
                <section className="max-w-5xl mx-auto py-16 md:py-20">
                    <p
                        ref={standardsEyebrowRef}
                        className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                    >
                        {t("standards.eyebrow")}
                    </p>
                    <h2
                        ref={standardsTitleRef}
                        className="font-sans font-normal text-primary leading-[1.05] mb-8"
                        style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                    >
                        {t("standards.title")}
                    </h2>
                    <div ref={standardsBodyRef} className="grid md:grid-cols-2 gap-6 max-w-3xl mb-6">
                        <p className="standards-p text-base text-primary/60 leading-relaxed">
                            {tStandards("description")}
                        </p>
                        <p className="standards-p text-base text-primary/60 leading-relaxed">
                            {t("standards.description")}
                        </p>
                    </div>
                    <div ref={standardsCardsRef} className="grid gap-4 md:grid-cols-3 mb-8">
                        {[
                            { key: "performance", label: t("standards.performance.label"), desc: t("standards.performance.description") },
                            { key: "accessibility", label: t("standards.accessibility.label"), desc: t("standards.accessibility.description") },
                            { key: "codeQuality", label: t("standards.codeQuality.label"), desc: t("standards.codeQuality.description") },
                        ].map(({ key, label, desc }) => (
                            <div
                                key={key}
                                className="standard-card border border-foreground/8 rounded-sm bg-foreground/2 p-5"
                            >
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                                    {label}
                                </p>
                                <p className="text-base text-primary/60 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <div ref={standardsLinkRef}>
                        <Link
                            href="/standards"
                            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
                        >
                            <span className="border-b border-transparent group-hover:border-foreground/30 transition-colors duration-300 pb-0.5">
                                {locale === "ar" ? "اقرأ المعايير الكاملة" : "Read the full standards"}
                            </span>
                            <svg
                                className="h-3.5 w-3.5 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <div className="h-px w-full bg-foreground/8" />

                {/* ── CTA ───────────────────────────────────────────────── */}
                <section className="max-w-5xl mx-auto py-16 md:py-24">
                    <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">
                        <div>
                            <p
                                ref={ctaEyebrowRef}
                                className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
                            >
                                {t("cta.eyebrow")}
                            </p>
                            <h2
                                ref={ctaTitleRef}
                                className="font-sans font-normal text-primary leading-[1.05] mb-4"
                                style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                            >
                                {t("cta.title")}
                                <br />
                                <span
                                    className="text-primary/35"
                                    style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                                >
                                    {t("cta.titleItalic")}
                                </span>
                            </h2>
                            <p
                                ref={ctaDescRef}
                                className="text-base text-primary/60 leading-relaxed max-w-[44ch]"
                            >
                                {t("cta.description")}
                            </p>
                        </div>
                        <div ref={ctaButtonsRef} className="flex flex-col gap-3">
                            <Link href="/schedule">
                                <MagneticButton size="lg" variant="primary" className="w-full justify-center">
                                    {t("cta.schedule")}
                                </MagneticButton>
                            </Link>
                            <Link href="/work">
                                <MagneticButton size="lg" variant="secondary" className="w-full justify-center">
                                    {t("cta.work")}
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    )
}