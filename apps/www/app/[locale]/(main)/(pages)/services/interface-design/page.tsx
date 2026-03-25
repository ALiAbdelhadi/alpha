"use client"

import { Container } from "@/components/container"
import { DesignCompareSection } from "@/components/design-compare-section"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function WebDesignPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <DesignCompareSection />
            <ShowcaseSection />
            <FeaturesSection />
            <CtaSection />
        </div>
    )
}

function HeroSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText(DEFAULTS.heading)
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })
    const ctaRef = useReveal({ ...DEFAULTS.element, delay: 0.25 })
    const scrollRef = useReveal({ ...DEFAULTS.element, direction: "fade", delay: 0.45 })

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
                <p className="font-mono text-xs uppercase text-muted-foreground/70 tracking-[0.25em]">Scroll</p>
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
        { labelKey: "showcaseLanding", number: "04" },
    ]

    const getSpan = (i: number) =>
        i === 0 ? "md:col-span-2 md:row-span-2" :
            i === 1 ? "md:col-span-2 md:row-span-1" :
                "md:col-span-1 md:row-span-1"

    return (
        <section id="showcase" ref={sectionRef} className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
                        {t("showcaseEyebrow")}
                    </p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
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
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-foreground/2 pointer-events-none origin-left rtl:origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                            />
                            <div className="relative z-10 flex items-start justify-between">
                                <span className="font-mono text-xs text-muted-foreground/70 tracking-[0.2em]">{item.number}</span>
                                <span className="font-mono text-sm text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </div>
                            <div className="relative z-10 mt-auto">
                                <h3
                                    className="font-sans font-medium text-primary group-hover:text-primary/80 transition-colors duration-300"
                                    style={{ fontSize: i === 0 ? "clamp(18px, 2.4vw, 26px)" : "clamp(16px, 1.8vw, 20px)", letterSpacing: "-0.015em", lineHeight: 1.25 }}
                                >
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

const FEATURE_PALETTE: { r: number; g: number; b: number }[] = [
    { r: 37, g: 99, b: 235 },
    { r: 16, g: 185, b: 129 },
    { r: 234, g: 88, b: 12 },
    { r: 139, g: 92, b: 246 },
    { r: 236, g: 72, b: 153 },
    { r: 6, g: 182, b: 212 },
]

const GLOW_STYLES = `
[data-feature] {
    --gx: 50%;
    --gy: 50%;
    --go: 0;
    --tx: 0px;
    --ty: 0px;
}
[data-feature]::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(420px circle at var(--gx) var(--gy), var(--gc, rgba(37,99,235,.06)), transparent 68%);
    opacity: var(--go);
    transition: opacity 280ms ease;
    pointer-events: none;
    z-index: 0;
}
[data-feature-hero]::before {
    background: radial-gradient(600px circle at var(--gx) var(--gy), var(--gc, rgba(37,99,235,.09)), transparent 60%);
}
.feat-text-inner {
    transform: translate(var(--tx), var(--ty));
    will-change: transform;
    transition: transform 80ms linear;
}
.feat-num {
    font-family: var(--font-mono, monospace);
    font-size: clamp(52px, 7vw, 80px);
    font-weight: 800;
    letter-spacing: -.04em;
    line-height: 1;
    color: rgba(12,12,11,.055);
    transition: color 320ms ease;
    font-variant-numeric: tabular-nums;
    user-select: none;
    flex-shrink: 0;
    width: 72px;
}
[data-feature]:hover .feat-num { color: var(--nc, rgba(37,99,235,.18)); }
.feat-rule {
    position: absolute;
    bottom: 0; left: 0;
    height: 1px;
    width: 0%;
    background: linear-gradient(90deg, var(--lc, rgba(37,99,235,.4)), transparent);
    z-index: 2;
    transition: width 480ms cubic-bezier(.4,0,.2,1);
}
[data-feature]:hover .feat-rule { width: 100%; }
.feat-desc {
    font-size: 13.5px;
    color: rgba(12,12,11,.0);
    line-height: 1.75;
    max-width: 54ch;
    transform: translateY(6px);
    transition: color 380ms ease, transform 380ms ease, opacity 380ms ease;
    opacity: 0;
}
[data-feature]:hover .feat-desc {
    color: rgba(12,12,11,.52);
    transform: translateY(0);
    opacity: 1;
}
.feat-tag {
    font-family: var(--font-mono, monospace);
    font-size: 8.5px;
    font-weight: 500;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: rgba(12,12,11,.22);
    border: 1px solid rgba(12,12,11,.09);
    border-radius: 3px;
    padding: 2.5px 7px;
    white-space: nowrap;
    transition: color 280ms ease, border-color 280ms ease, background 280ms ease;
    flex-shrink: 0;
}
[data-feature]:hover .feat-tag {
    color: var(--tc, rgba(37,99,235,.65));
    border-color: var(--tbc, rgba(37,99,235,.22));
    background: var(--tbg, rgba(37,99,235,.04));
}
.feat-arrow {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(12,12,11,.09);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 280ms ease, background 280ms ease, transform 280ms ease;
    margin-left: auto;
}
[data-feature]:hover .feat-arrow {
    border-color: var(--tbc, rgba(37,99,235,.25));
    background: var(--tbg, rgba(37,99,235,.05));
    transform: translateX(2px);
}
.feat-arrow svg {
    width: 12px; height: 12px;
    color: rgba(12,12,11,.22);
    transition: color 280ms ease, transform 280ms ease, opacity 280ms ease;
    transform: translateX(-2px);
    opacity: 0;
}
[data-feature]:hover .feat-arrow svg {
    color: var(--tc, rgba(37,99,235,.6));
    transform: translateX(0);
    opacity: 1;
}
`

function FeaturesSection() {
    const t = useTranslations("serviceDetails.webDesign")
    const tCommon = useTranslations("serviceDetails")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    useEffect(() => {
        if (!sectionRef.current) return

        const cards = Array.from(
            sectionRef.current.querySelectorAll<HTMLElement>("[data-feature]")
        )
        const triggers: ScrollTrigger[] = []

        const cleanups = cards.map((card, idx) => {
            const p = FEATURE_PALETTE[idx] ?? FEATURE_PALETTE[0]
            const rgba = (a: number) => `rgba(${p.r},${p.g},${p.b},${a})`

            card.style.setProperty("--gc", rgba(idx === 0 ? 0.09 : 0.065))
            card.style.setProperty("--nc", rgba(0.2))
            card.style.setProperty("--lc", rgba(0.45))
            card.style.setProperty("--tc", rgba(0.65))
            card.style.setProperty("--tbc", rgba(0.22))
            card.style.setProperty("--tbg", rgba(0.05))

            const inner = card.querySelector<HTMLElement>(".feat-text-inner")

            const onMove = (e: MouseEvent) => {
                const r = card.getBoundingClientRect()
                card.style.setProperty("--gx", `${e.clientX - r.left}px`)
                card.style.setProperty("--gy", `${e.clientY - r.top}px`)
                card.style.setProperty("--go", "1")
                if (inner) {
                    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
                    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
                    inner.style.setProperty("--tx", `${dx * 1.8}px`)
                    inner.style.setProperty("--ty", `${dy * 1.2}px`)
                }
            }
            const onLeave = () => {
                card.style.setProperty("--go", "0")
                if (inner) {
                    inner.style.setProperty("--tx", "0px")
                    inner.style.setProperty("--ty", "0px")
                }
            }

            card.addEventListener("mousemove", onMove)
            card.addEventListener("mouseleave", onLeave)

            gsap.set(card, { opacity: 0, scale: 0.97, filter: "blur(8px)" })
            const tween = gsap.to(card, {
                opacity: 1, scale: 1, filter: "blur(0px)",
                duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%", once: true },
            })
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)

            return () => {
                card.removeEventListener("mousemove", onMove)
                card.removeEventListener("mouseleave", onLeave)
            }
        })

        return () => {
            cleanups.forEach(fn => fn())
            triggers.forEach(t => t.kill())
        }
    }, [])

    const features = ["01", "02", "03", "04", "05", "06"].map((num, i) => ({
        num,
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
        featured: i === 0,
    }))

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: GLOW_STYLES }} />

            <section ref={sectionRef} className="relative section-padding border-t border-foreground/8">
                <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

                <Container>
                    <div ref={titleRef} className="mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
                            {tCommon("whatWeOfferEyebrow")}
                        </p>
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.025em" }}
                        >
                            {tCommon("whatWeOffer")}
                            <br />
                            <span className="text-primary/35" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                                {tCommon("whatWeOfferItalic")}
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col">
                        {features.map((feature, i) => {
                            const isHero = feature.featured
                            const p = FEATURE_PALETTE[i]

                            return (
                                <div
                                    key={i}
                                    data-feature
                                    {...(isHero ? { "data-feature-hero": "" } : {})}
                                    className={[
                                        "group relative border-b border-foreground/8 overflow-hidden transition-all duration-500 p-6",
                                        isHero ? "py-14 md:py-20 border-t" : "py-8 hover:py-12",
                                    ].join(" ")}
                                >
                                    <div className="feat-rule" />

                                    {isHero ? (
                                        <div className="relative z-10 feat-text-inner">
                                            <div className="flex items-center gap-3 mb-8">
                                                <span
                                                    className="feat-tag"
                                                    style={{
                                                        color: `rgba(${p.r},${p.g},${p.b},.55)`,
                                                        borderColor: `rgba(${p.r},${p.g},${p.b},.2)`,
                                                        background: `rgba(${p.r},${p.g},${p.b},.05)`,
                                                    }}
                                                >
                                                    SERVICE_01
                                                </span>
                                                <span
                                                    className="font-mono uppercase"
                                                    style={{ fontSize: 9, letterSpacing: ".22em", color: "rgba(12,12,11,.2)" }}
                                                >
                                                    Featured
                                                </span>
                                            </div>
                                            <h3
                                                className="font-sans font-normal text-primary mb-5 leading-[1.08]"
                                                style={{ fontSize: "clamp(26px, 3.8vw, 48px)", letterSpacing: "-.028em", fontWeight: 300 }}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p style={{ fontSize: 14.5, color: "rgba(12,12,11,.48)", lineHeight: 1.75, maxWidth: "46ch" }}>
                                                {feature.description}
                                            </p>
                                            <div
                                                aria-hidden
                                                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 font-mono font-black leading-none"
                                                style={{
                                                    fontSize: "clamp(100px, 17vw, 200px)",
                                                    letterSpacing: "-.05em",
                                                    color: `rgba(${p.r},${p.g},${p.b},.04)`,
                                                    lineHeight: 0.82,
                                                }}
                                            >
                                                01
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative z-10 flex items-center gap-6 md:gap-8">
                                            <span className="feat-num hidden md:block">
                                                {feature.num}
                                            </span>
                                            <div className="feat-text-inner flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                                    <span className="feat-tag hidden sm:inline-flex">
                                                        SERVICE_{feature.num}
                                                    </span>
                                                    <h3
                                                        className="font-sans font-normal text-primary"
                                                        style={{ fontSize: "clamp(17px, 2.2vw, 24px)", letterSpacing: "-.02em", fontWeight: 300, lineHeight: 1.2 }}
                                                    >
                                                        {feature.title}
                                                    </h3>
                                                </div>
                                                <p className="feat-desc mt-2.5">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </section>
        </>
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
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">{t("cta.eyebrow")}</p>
                        <h2
                            className="font-sans font-normal text-primary leading-[1.05] mb-4"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {t("cta.title")}
                        </h2>
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
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 block">Colors</span>
                        <div className="flex gap-2">
                            {["bg-foreground/80", "bg-foreground/50", "bg-foreground/25", "bg-foreground/10", "bg-foreground/4"].map((c, i) => (
                                <div key={i} className={`flex-1 h-10 rounded-sm ${c}`} />
                            ))}
                        </div>
                        <p className="font-mono text-xs text-primary/30 tracking-widest">Tailored palette for your brand</p>
                    </div>
                    <div data-token-card className="border border-foreground/8 rounded-sm bg-foreground/2 p-6 space-y-3">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 block">Typography</span>
                        <div className="space-y-1">
                            <div className="font-sans font-normal text-primary leading-none" style={{ fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.025em" }}>Aa</div>
                            <div className="text-sm text-primary/40 font-sans">Body regular</div>
                            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary/20">Mono Label</div>
                        </div>
                    </div>
                    <div data-token-card className="border border-foreground/8 rounded-sm bg-foreground/2 p-6 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 block">Layout</span>
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