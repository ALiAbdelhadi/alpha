"use client"

import { Container } from "@/components/container"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { useReveal } from "@/hooks/use-animation"

type DemoMode = "generic" | "optimized"

export function ComparisonDemo() {
    const t = useTranslations("comparisonDemo")
    const [mode, setMode] = useState<DemoMode>("generic")
    const sectionRef = useReveal<HTMLElement>({ direction: "up", delay: 0, duration: 0.6 })

    const switchMode = useCallback((newMode: DemoMode) => {
        if (newMode === mode) return
        setMode(newMode)
    }, [mode])

    return (
        <section
            ref={sectionRef}
            id="comparison"
            className="section-padding"
            aria-label={t("title")}
        >
            <Container>
                <div className="mb-12 text-center">
                    <h2 className="font-sans font-normal text-primary mb-4">
                        {t("title")}
                    </h2>
                    <p className="body-lg text-primary/70 max-w-2xl mx-auto mb-8">
                        {t("subtitle")}
                    </p>
                    <div
                        role="tablist"
                        aria-label={t("toggleLabel")}
                        className="inline-flex rounded-full border border-foreground/25 bg-foreground/5 p-1"
                    >
                        <button
                            role="tab"
                            aria-selected={mode === "generic"}
                            aria-controls="comparison-generic"
                            id="tab-generic"
                            onClick={() => switchMode("generic")}
                            className={cn(
                                "px-6 py-2.5 rounded-full mono small transition-all transition-default",
                                mode === "generic"
                                    ? "bg-foreground/15 text-primary"
                                    : "text-primary/60 hover:text-primary/80"
                            )}
                        >
                            {t("genericLabel")}
                        </button>
                        <button
                            role="tab"
                            aria-selected={mode === "optimized"}
                            aria-controls="comparison-optimized"
                            id="tab-optimized"
                            onClick={() => switchMode("optimized")}
                            className={cn(
                                "px-6 py-2.5 rounded-full mono small transition-all transition-default",
                                mode === "optimized"
                                    ? "bg-foreground/15 text-primary"
                                    : "text-primary/60 hover:text-primary/80"
                            )}
                        >
                            {t("optimizedLabel")}
                        </button>
                    </div>
                </div>

                {/* Use a grid stack so both panels occupy the same space without absolute positioning issues */}
                <div className="grid">
                    <div
                        id="comparison-generic"
                        role="tabpanel"
                        aria-labelledby="tab-generic"
                        aria-hidden={mode !== "generic"}
                        className={cn(
                            "col-start-1 row-start-1 rounded-2xl border p-8",
                            "transition-opacity duration-300",
                            mode === "generic"
                                ? "border-foreground/25 bg-foreground/5 opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        )}
                    >
                        <h3 className="mono-uppercase text-primary/50 mb-4">
                            {t("genericLabel")}
                        </h3>
                        <div className="space-y-4">
                            <h4 className="font-sans text-xl font-normal text-primary/70">
                                {t("generic.headline")}
                            </h4>
                            <p className="body text-primary/50">
                                {t("generic.subtext")}
                            </p>
                            <div className="flex gap-3 pt-4">
                                <span className="rounded border border-foreground/20 px-3 py-1.5 mono-uppercase text-xs text-primary/50">
                                    {t("generic.cta")}
                                </span>
                            </div>
                        </div>
                        <p className="mt-6 mono text-xs text-primary/40">
                            {t("generic.metric")}
                        </p>
                    </div>

                    <div
                        id="comparison-optimized"
                        role="tabpanel"
                        aria-labelledby="tab-optimized"
                        aria-hidden={mode !== "optimized"}
                        className={cn(
                            "col-start-1 row-start-1 rounded-2xl border p-8",
                            "transition-opacity duration-300",
                            mode === "optimized"
                                ? "border-emerald-500/30 bg-emerald-500/5 opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        )}
                    >
                        <h3 className="mono-uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                            {t("optimizedLabel")}
                        </h3>
                        <div className="space-y-4">
                            <h4 className="font-sans text-xl font-normal text-primary">
                                {t("optimized.headline")}
                            </h4>
                            <p className="body text-primary/80">
                                {t("optimized.subtext")}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-4 py-2 font-medium text-emerald-700 dark:text-emerald-300">
                                    {t("optimized.cta")}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="mono text-xs text-primary/70">{t("optimized.badge")}</span>
                                </span>
                            </div>
                        </div>
                        <p className="mt-6 mono text-xs text-emerald-600/80 dark:text-emerald-400/80">
                            {t("optimized.metric")}
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center mono small text-primary/50">
                    {t("footer")}
                </p>
            </Container>
        </section>
    )
}