/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Container } from "@/components/container"
import { DEFAULTS, MOTION, useReveal } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { useState } from "react"

const getMetrics = (t: any) => [
    { label: t("metrics.loadTime") ?? "Load Time", generic: "4.8s", optimized: "0.9s", delta: "-81%" },
    { label: t("metrics.bounceRate") ?? "Bounce Rate", generic: "74%", optimized: "31%", delta: "-58%" },
    { label: t("metrics.conversion") ?? "Conversion", generic: "1.2%", optimized: "5.7%", delta: "+375%" },
]

const getGenericIssues = (t: any) => [
    t("generic.issue1"),
    t("generic.issue2") ,
    t("generic.issue3") ,
]

export function ComparisonDemo() {
    const t = useTranslations("comparisonDemo")
    const [mode, setMode] = useState<"generic" | "optimized">("generic")
    const isOptimized = mode === "optimized"
    const genericIssues = getGenericIssues(t)
    const activeMetrics = getMetrics(t)

    const headerRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    return (
        <section className="relative py-32 overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />
            <Container>
                <div ref={headerRef} className="mb-20 max-w-2xl relative z-10">
                    <p className="text-xs font-mono text-primary/40 uppercase tracking-[0.3em] mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-primary mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
                    <div
                        className="relative rounded-3xl border border-primary/10 overflow-hidden transition-all duration-1000 bg-card/30 backdrop-blur-sm min-h-[450px]"
                        style={{
                            borderColor: isOptimized
                                ? "var(--optimized-border)"
                                : "var(--border)",
                            boxShadow: isOptimized
                                ? "0 0 40px -10px var(--optimized-glow)"
                                : "none"
                        }}
                    >
                        <div className={`absolute inset-0 transition-opacity duration-1000 ${isOptimized ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-optimized/10 blur-[100px] rounded-full" />
                        </div>
                        <div className="absolute top-6 right-6 z-20">
                            <span
                                className="text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border transition-all duration-500 backdrop-blur-md"
                                style={
                                    isOptimized
                                        ? {
                                            borderColor: "var(--optimized-border)",
                                            color: "var(--optimized)",
                                            background: "var(--optimized-glow)",
                                        }
                                        : {
                                            borderColor: "var(--border)",
                                            color: "var(--muted-foreground)",
                                            background: "var(--muted)",
                                        }
                                }
                            >
                                {isOptimized ? (t("optimizedLabelShort") ?? "Optimized") : (t("genericLabelShort") ?? "Generic")}
                            </span>
                        </div>

                        <div className="relative w-full h-full p-10 md:p-16">
                            {/* Generic Mode Content */}
                            <div 
                                className={`absolute inset-0 p-10 md:p-16 transition-all duration-700 ease-in-out ${
                                    !isOptimized ? 'opacity-100 blur-none z-10' : 'opacity-0 blur-md pointer-events-none -z-10'
                                }`}
                            >
                                <div className="space-y-8 opacity-40 grayscale">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10" />
                                        <div className="h-4 w-32 rounded-full bg-primary/10" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-8 w-full max-w-md rounded-lg bg-primary/5" />
                                        <div className="h-4 w-full max-w-sm rounded-lg bg-primary/5" />
                                    </div>
                                    <div className="grid gap-3 pt-10">
                                        {genericIssues.map((issue, i) => (
                                            <div key={i} className="flex items-center gap-3 text-xs font-mono text-primary/40">
                                                <span className="text-red-500/50">×</span> {issue}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div 
                                className={`absolute inset-0 p-10 md:p-16 transition-all duration-700 ease-in-out ${
                                    isOptimized ? 'opacity-100 blur-none z-10' : 'opacity-0 blur-md pointer-events-none -z-10'
                                }`}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="h-12 w-12 rounded-2xl bg-optimized/10 flex items-center justify-center border border-optimized/20">
                                            <div className="h-3 w-3 rounded-full bg-optimized shadow-[0_0_15px_var(--optimized-border)]" />
                                        </div>
                                        <span className="text-sm font-medium tracking-tight">
                                            {t("brandName") ?? "Anthupic UI"}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-light text-primary mb-4 leading-tight">
                                        {t("optimized.headline")}
                                    </h3>
                                    <p className="text-muted-foreground mb-10 max-w-sm">
                                        {t("optimized.subtext")}
                                    </p>
                                    <button className="group relative px-8 py-3 bg-optimized text-n-0 rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                        <span className="relative z-10 font-medium text-sm flex items-center gap-2">
                                            {t("optimized.cta")}
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="relative p-1 bg-muted/30 backdrop-blur-md border border-primary/5 rounded-2xl flex gap-1 isolate">
                            <div 
                                className="absolute inset-y-1 bg-background border border-primary/10 rounded-xl shadow-sm transition-all duration-500 ease-out z-0"
                                style={{
                                    left: isOptimized ? 'calc(50% + 2px)' : '4px',
                                    width: 'calc(50% - 6px)'
                                }}
                            />
                            
                            {(["generic", "optimized"] as const).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    className={`relative flex-1 py-3 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 z-10 ${
                                        mode === m ? 'text-primary' : 'text-primary/40 hover:text-primary/60'
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-primary/5">
                                <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em]">
                                    System Performance
                                </span>
                            </div>
                            <div className="divide-y divide-primary/5">
                                {activeMetrics.map((metric) => (
                                    <div key={metric.label} className="px-6 py-5 flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                                            <p className={`text-xl font-mono transition-colors duration-500 ${isOptimized ? 'text-optimized' : 'text-primary/60'}`}>
                                                {isOptimized ? metric.optimized : metric.generic}
                                            </p>
                                        </div>
                                        <div 
                                            className={`bg-optimized/10 text-optimized text-[10px] font-mono px-2 py-1 rounded-md border border-optimized/20 transition-all duration-500 ${
                                                isOptimized ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                            }`}
                                        >
                                            {metric.delta}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}