"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { memo, useMemo, useState } from "react"

type Mode = "generic" | "optimized"

interface Metric {
    label: string
    generic: string
    optimized: string
    delta: string
    good: boolean
}

const ModeSwitcher = memo(function ModeSwitcher({
    mode,
    onChange,
}: {
    mode: Mode
    onChange: (m: Mode) => void
}) {
    const isOptimized = mode === "optimized"

    return (
        <div
            role="group"
            aria-label="Toggle display mode"
            className="relative isolate flex h-12 items-center rounded-[4px] border border-foreground/8 bg-foreground/[0.02] p-1"
        >
            <div
                aria-hidden
                className={cn(
                    "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-[2px] bg-foreground/8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    isOptimized ? "left-[calc(50%+3px)]" : "left-1"
                )}
            />
            {(["generic", "optimized"] as const).map((m) => (
                <button
                    key={m}
                    type="button"
                    onClick={() => onChange(m)}
                    aria-pressed={mode === m}
                    className={cn(
                        "relative z-10 flex-1 h-full mono-uppercase transition-colors duration-300",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20",
                        mode === m ? "text-primary" : "text-primary/30 hover:text-primary/50"
                    )}
                >
                    {m}
                </button>
            ))}
        </div>
    )
})

const MetricRow = memo(function MetricRow({
    metric,
    isOptimized,
    isLast,
}: {
    metric: Metric
    isOptimized: boolean
    isLast: boolean
}) {
    return (
        <div
            className={cn(
                "group grid items-center gap-3 py-6",
                !isLast && "border-b border-foreground/8"
            )}
            style={{ gridTemplateColumns: "1fr auto" }}
        >
            <div className="flex items-start gap-4">
                <div className="pt-2 shrink-0">
                    <div className="h-px w-5 bg-foreground/8 group-hover:w-8 group-hover:bg-foreground/20 transition-all duration-400" />
                </div>
                <div className="space-y-1.5">
                    <p className="mono-uppercase text-primary/30">
                        {metric.label}
                    </p>
                    <p className="metric-value font-sans font-light text-primary tabular-nums leading-none">
                        {isOptimized ? metric.optimized : metric.generic}
                    </p>
                </div>
            </div>
            <span
                aria-label={`Change: ${metric.delta}`}
                className={cn(
                    "shrink-0 rounded-[3px] border font-mono text-[12px] tracking-[0.08em] px-2 py-0.5",
                    "transition-all duration-500",
                    isOptimized
                        ? "translate-x-0 scale-100 opacity-100 border-foreground/10 bg-foreground/[0.04] text-primary/60"
                        : "translate-x-2 scale-90 opacity-0 pointer-events-none border-foreground/8 bg-transparent text-primary/0"
                )}
            >
                {metric.delta}
            </span>
        </div>
    )
})

const GenericPlaceholder = memo(function GenericPlaceholder({
    issues,
}: {
    issues: string[]
}) {
    return (
        <div className="space-y-10">
            <div className="flex items-center gap-3 opacity-60">
                <div className="h-7 w-7 rounded-[3px] bg-foreground/10" />
                <div className="h-2 w-20 rounded-full bg-foreground/10" />
            </div>
            <div className="space-y-2.5 opacity-50">
                <div className="h-3.5 w-4/5 rounded-sm bg-foreground/10" />
                <div className="h-3.5 w-3/5 rounded-sm bg-foreground/10" />
                <div className="h-3.5 w-2/5 rounded-sm bg-foreground/[0.06]" />
            </div>
            <div className="space-y-3">
                {issues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <span
                            aria-hidden
                            className="mt-[1px] shrink-0 font-mono text-[12px] text-primary/20"
                        >
                            ×
                        </span>
                        <p className="font-mono text-sm text-primary/30 leading-relaxed">
                            {issue}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
})

const OptimizedPreview = memo(function OptimizedPreview({
    t,
    onCta,
}: {
    t: ReturnType<typeof useTranslations>
    onCta?: () => void
}) {
    return (
        <div className="space-y-10">
            <div className="flex items-center gap-3">
                <div className="h-7 w-7 flex items-center justify-center rounded-[3px] border border-foreground/8 bg-foreground/[0.03]">
                    <div className="h-2 w-2 rounded-full bg-foreground/30" />
                </div>
                <span className="mono-uppercase text-primary/40">
                    {t("brandName")}
                </span>
            </div>
            <div>
                <h3 className="font-sans font-normal text-primary leading-[1.05] section-subheading mb-4">
                    <span className="block">{t("optimized.headline")}</span>
                    <span className="block text-primary/35 font-display-serif">
                        {t("optimized.headlineAccent")}
                    </span>
                </h3>
                <p className="text-sm text-primary/50 leading-relaxed max-w-[38ch]">
                    {t("optimized.subtext")}
                </p>
            </div>
            <MagneticButton size="lg" variant="primary" onClick={onCta}>
                {t("optimized.cta")}
            </MagneticButton>
        </div>
    )
})


export const ComparisonDemo = memo(function ComparisonDemo({
    scrollToSection,
}: {
    scrollToSection?: (sectionId: string) => void
}) {
    const t = useTranslations("comparisonDemo")
    const [mode, setMode] = useState<Mode>("generic")
    const isOptimized = mode === "optimized"
    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText(DEFAULTS.heading)
    const descRef = useReveal<HTMLDivElement>({
        ...DEFAULTS.body,
        ease: MOTION.ease.smooth,
        delay: 0.15,
    })

    const metrics = useMemo<Metric[]>(
        () => [
            { label: t("metrics.loadTime"), generic: "4.8s", optimized: "0.9s", delta: "−81%", good: false },
            { label: t("metrics.bounceRate"), generic: "74%", optimized: "31%", delta: "−58%", good: false },
            { label: t("metrics.conversion"), generic: "1.2%", optimized: "5.7%", delta: "+375%", good: true },
        ],
        [t]
    )

    const genericIssues = useMemo<string[]>(
        () => [t("generic.issue1"), t("generic.issue2"), t("generic.issue3")],
        [t]
    )

    return (
        <section
            id="comparison"
            suppressHydrationWarning
            className="relative overflow-hidden section-padding"
            data-animate-section
        >
            <Container>
                <div data-reveal data-beat="0" className="max-w-3xl space-y-3 mb-16">
                    <p ref={eyebrowRef} className="mono-uppercase text-primary/25 block">
                        {t("eyebrow")}
                    </p>
                    <h2
                        ref={titleRef}
                        className="font-sans font-normal text-primary leading-[1.05] section-heading"
                    >
                        <span className="block overflow-hidden">
                            <span data-heading-line className="block">
                                {t("title")}
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <span
                                data-heading-line
                                data-motion-accent
                                className="block text-primary/35 font-display-serif"
                            >
                                {t("titleAccent")}
                            </span>
                        </span>
                    </h2>
                    <p ref={descRef} className="body text-primary/50 max-w-[52ch]">
                        {t("subtitle")}
                    </p>
                </div>
                <div
                    data-reveal
                    data-beat="1"
                    className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] md:gap-5"
                >
                    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/[0.02]">
                        <div className="absolute end-6 top-6 z-20">
                            <span className="inline-flex items-center gap-2 rounded-[3px] border border-foreground/8 bg-background/50 px-3 py-1 font-mono text-[12px] tracking-[0.18em] uppercase backdrop-blur-sm">
                                {isOptimized && (
                                    <span
                                        aria-hidden
                                        className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse"
                                    />
                                )}
                                <span className={isOptimized ? "text-primary/50" : "text-primary/20"}>
                                    {isOptimized ? t("statusOptimized") : t("statusGeneric")}
                                </span>
                            </span>
                        </div>
                        <div className="relative flex-1 p-8 md:p-12 min-h-[clamp(340px,38vh,460px)]">
                            <div
                                aria-hidden={isOptimized}
                                className={cn(
                                    "transition-all duration-500",
                                    isOptimized
                                        ? "pointer-events-none opacity-0 blur-sm"
                                        : "opacity-100 blur-0"
                                )}
                            >
                                <GenericPlaceholder issues={genericIssues} />
                            </div>
                            <div
                                aria-hidden={!isOptimized}
                                className={cn(
                                    "absolute inset-0 p-8 md:p-12 transition-all duration-500",
                                    isOptimized
                                        ? "pointer-events-auto opacity-100 translate-y-0"
                                        : "pointer-events-none opacity-0 translate-y-2"
                                )}
                            >
                                <OptimizedPreview
                                    t={t}
                                    onCta={() => scrollToSection?.("contact")}
                                />
                            </div>
                        </div>
                        <div className="border-t border-foreground/8 px-8 py-3 md:px-12">
                            <p className="mono-uppercase text-primary/20">
                                {isOptimized ? t("footnoteOptimized") : t("footnoteGeneric")}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ModeSwitcher mode={mode} onChange={setMode} />
                        <div className="flex flex-1 flex-col rounded-2xl border border-foreground/8 bg-foreground/[0.02] overflow-hidden">
                            <div className="border-b border-foreground/8 px-6 py-5">
                                <span className="mono-uppercase text-primary/25">
                                    {t("metricsTitle")}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col px-6 py-2">
                                {metrics.map((metric, i) => (
                                    <MetricRow
                                        key={metric.label}
                                        metric={metric}
                                        isOptimized={isOptimized}
                                        isLast={i === metrics.length - 1}
                                    />
                                ))}
                            </div>
                            <div className="border-t border-foreground/8 px-6 py-4">
                                <p className="font-mono text-[12px] tracking-[0.14em] text-primary/20 leading-relaxed">
                                    {isOptimized
                                        ? t("metricsFooterOptimized")
                                        : t("metricsFooterGeneric")}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-foreground/8 bg-foreground/[0.02] px-6 py-5">
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 shrink-0 flex h-7 w-7 items-center justify-center rounded-[3px] border border-foreground/8">
                                    {isOptimized ? (
                                        <svg
                                            aria-hidden
                                            className="h-3.5 w-3.5 text-primary/40"
                                            fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor" strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg
                                            aria-hidden
                                            className="h-3.5 w-3.5 text-primary/20"
                                            fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor" strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <p className="font-sans font-medium text-primary text-sm">
                                        {isOptimized
                                            ? t("contextTitleOptimized")
                                            : t("contextTitleGeneric")}
                                    </p>
                                    <p className="font-mono text-[13px] text-primary/35 leading-relaxed">
                                        {isOptimized
                                            ? t("contextBodyOptimized")
                                            : t("contextBodyGeneric")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-reveal data-beat="2" className="mt-10 flex items-center gap-5">
                    <div className="h-px flex-1 bg-foreground/6" />
                    <span className="mono-uppercase text-primary/20 shrink-0">
                        {t("footerNote")}
                    </span>
                </div>
            </Container>
        </section>
    )
})