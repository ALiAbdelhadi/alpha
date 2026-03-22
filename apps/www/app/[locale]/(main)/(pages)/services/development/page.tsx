"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { TechDNASection } from "@/components/tech-dna-section"
import { Link } from "@/i18n/navigation"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import React, { useEffect, useRef, useState } from "react"


const T = {
    bg: "#0D1117",
    paper: "247, 248, 250",
    accent: "74, 110, 212",
    border: "rgba(247, 248, 250, 0.07)",
    borderM: "rgba(247, 248, 250, 0.12)",
    stages: [
        "74,  110, 212",
        "93,  202, 165",
        "248, 163,  50",
        "96,  165, 250",
        "167, 139, 250",
        "52,  211, 153",
    ],
} as const

export default function DevelopmentPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <HeroSection />
            <TechDNASection />
            <PipelineSection />
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
        <section
            className="relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden min-h-screen"
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
            </div>
            <div
                aria-hidden
                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 font-sans font-semibold tracking-tighter text-foreground/[0.028] leading-none"
                style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}
            >
                02
            </div>
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
                    <h1
                        ref={titleRef}
                        className="mb-10 font-sans font-normal text-primary leading-[1.03]"
                        style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.025em" }}
                    >
                        {t("title")}
                        <br />
                        <span className="text-primary/35" style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic" }}>
                            {t("titleItalic")}
                        </span>
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
                        <Link href="#pipeline">
                            <MagneticButton size="lg" variant="secondary">{tCommon("ctaSecondary")}</MagneticButton>
                        </Link>
                    </div>
                </div>
            </Container>
            <div
                ref={scrollRef}
                className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                aria-hidden
            >
                <p className="font-mono text-xs uppercase text-primary/25 tracking-[0.25em]">Scroll</p>
                <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
                    <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>{`@keyframes slideDown{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
        </section>
    )
}

type StageStatus = "queued" | "running" | "done"

interface Stage {
    id: string
    key: string
    desc: string
    dur: [number, number]
    parallel?: boolean
    logs: string[]
}

const STAGES: Stage[] = [
    {
        id: "01", key: "DISCOVERY", desc: "Requirements locked, scope defined",
        dur: [800, 1200],
        logs: [
            "[info] Scanning stakeholder requirements",
            "[info] Auditing existing systems",
            "[ok]   Scope document finalised - 14 constraints identified",
        ],
    },
    {
        id: "02", key: "ARCHITECTURE", desc: "Service boundaries, API contracts set",
        dur: [900, 1400],
        logs: [
            "[info] Defining service boundaries",
            "[info] Generating OpenAPI schemas",
            "[ok]   Data contracts locked - 6 services mapped",
        ],
    },
    {
        id: "03", key: "DEVELOPMENT", desc: "Iterative build, CI enforced",
        dur: [1000, 1600], parallel: true,
        logs: [
            "[info] Sprint 1 initiated - 24 tickets",
            "[info] CI pipeline active",
            "[warn] Coverage threshold: 82% (target 90%)",
            "[ok]   Build passing - 3 sprints complete",
        ],
    },
    {
        id: "04", key: "TESTING", desc: "Unit · integration · load coverage",
        dur: [800, 1300], parallel: true,
        logs: [
            "[info] Unit suite: 847 tests",
            "[info] Integration: 134 scenarios",
            "[ok]   Load test passed - p99: 142 ms",
        ],
    },
    {
        id: "05", key: "DEPLOYMENT", desc: "Blue-green release, rollback armed",
        dur: [700, 1100],
        logs: [
            "[info] Provisioning blue environment",
            "[info] Health checks passing",
            "[ok]   Traffic shifted - zero downtime",
        ],
    },
    {
        id: "06", key: "SCALE", desc: "Observability live, auto-scaling active",
        dur: [600, 1000],
        logs: [
            "[info] Dashboards provisioned",
            "[info] Tracing enabled across 6 services",
            "[ok]   Auto-scaling policies active",
        ],
    },
]

function nowStr() {
    return new Date().toTimeString().slice(0, 8)
}

function jitter(stage: Stage) {
    return stage.dur[0] + Math.random() * (stage.dur[1] - stage.dur[0])
}

function PipelineSection() {
    const [statuses, setStatuses] = useState<StageStatus[]>(STAGES.map(() => "queued"))
    const [times, setTimes] = useState<string[]>(STAGES.map(() => "--:--:--"))
    const [expanded, setExpanded] = useState<number | null>(null)
    const [running, setRunning] = useState(false)
    const [complete, setComplete] = useState(false)
    const [footerMsg, setFooterMsg] = useState("awaiting trigger")
    const [revealed, setRevealed] = useState(false)

    const sectionRef = useRef<HTMLElement>(null)
    const runningRef = useRef(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setRevealed(true) },
            { threshold: 0.08 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    const doneCount = statuses.filter(s => s === "done").length
    const statusLabel = complete ? "complete" : running ? "running" : "idle"

    const setStageStatus = (i: number, status: StageStatus) => {
        setStatuses(prev => prev.map((s, j) => j === i ? status : s))
        if (status !== "queued") {
            const ts = nowStr()
            setTimes(prev => prev.map((s, j) => j === i ? ts : s))
        }
    }

    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    const reset = () => {
        setStatuses(STAGES.map(() => "queued"))
        setTimes(STAGES.map(() => "-- : -- : --"))
        setExpanded(null)
        setComplete(false)
        setRunning(false)
        setFooterMsg("awaiting trigger")
        runningRef.current = false
    }

    const execute = async () => {
        if (runningRef.current) return
        runningRef.current = true
        setRunning(true)
        setComplete(false)
        setStatuses(STAGES.map(() => "queued"))
        setTimes(STAGES.map(() => "--:--:--"))

        setStageStatus(0, "running"); setFooterMsg("discovery in progress")
        await sleep(jitter(STAGES[0]))
        setStageStatus(0, "done")

        setStageStatus(1, "running"); setFooterMsg("architecture phase")
        await sleep(jitter(STAGES[1]))
        setStageStatus(1, "done")

        setStageStatus(2, "running"); setStageStatus(3, "running")
        setFooterMsg("build ∥ test running in parallel")
        await Promise.all([
            sleep(jitter(STAGES[2])).then(() => setStageStatus(2, "done")),
            sleep(jitter(STAGES[3])).then(() => setStageStatus(3, "done")),
        ])

        setStageStatus(4, "running"); setFooterMsg("deploying to production")
        await sleep(jitter(STAGES[4]))
        setStageStatus(4, "done")

        setStageStatus(5, "running"); setFooterMsg("enabling observability")
        await sleep(jitter(STAGES[5]))
        setStageStatus(5, "done")

        setFooterMsg("all services deployed")
        setComplete(true)
        setRunning(false)
        runningRef.current = false
    }

    const dur = (n: number) => `${Math.round(n * 1000)}ms`
    const ease = MOTION.ease.smooth

    return (
        <>
            <style>{`
        /* ── pulse ring ── */
        @keyframes pl-ring {
          0%   { transform: scale(1);   opacity: .65; }
          70%  { transform: scale(2.5); opacity: 0;   }
          100% { transform: scale(2.5); opacity: 0;   }
        }
        /* ── dot breathe ── */
        @keyframes pl-breathe {
          0%,100% { opacity: 1;   }
          50%     { opacity: .2;  }
        }
        /* ── cursor blink ── */
        @keyframes pl-blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        /* ── row scan ── */
        @keyframes pl-scan {
          0%   { transform: translateX(-100%); opacity: 0;  }
          8%   { opacity: 1;                               }
          92%  { opacity: 1;                               }
          100% { transform: translateX(200%);  opacity: 0;  }
        }
        /* ── log line in ── */
        @keyframes pl-line-in {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        /* ── row entrance ── */
        @keyframes pl-row-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* ── shimmer (complete heading) ── */
        @keyframes pl-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        /* ── accent bar scale in ── */
        @keyframes pl-bar-in {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        .pl-breathe  { animation: pl-breathe  .9s ease-in-out infinite; }
        .pl-blink    { animation: pl-blink    1.1s step-end    infinite; }
        .pl-scan     { animation: pl-scan     2.4s linear      infinite; }
        .pl-log-line { animation: pl-line-in  .28s ease both; }
        .pl-bar-in   { transform-origin: top; animation: pl-bar-in .32s cubic-bezier(.22,1,.36,1) both; }

        /* ── responsive pipeline grid ── */
        .pl-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 10px;
        }
        .pl-col-ts     { display: none; }
        .pl-col-stage  { display: flex;  }

        @media (min-width: 640px) {
          .pl-row    { gap: 12px; }
        }
        @media (min-width: 1024px) {
          .pl-row {
            grid-template-columns: 84px 196px 1fr 104px;
            gap: 14px;
          }
          .pl-col-ts { display: block; }
        }
      `}</style>

            <section
                ref={sectionRef}
                id="pipeline"
                className="font-mono py-16 md:py-20"
                style={{ background: T.bg }}
            >
                <Container>
                    <p
                        className="transition-[opacity,transform]"
                        style={{
                            fontSize: "11px",
                            letterSpacing: ".28em",
                            textTransform: "uppercase",
                            color: `rgba(${T.paper},.22)`,
                            marginBottom: "11px",
                            opacity: revealed ? 1 : 0,
                            transform: revealed ? "translateY(0)" : "translateY(6px)",
                            transitionDuration: dur(MOTION.duration.base),
                            transitionTimingFunction: ease,
                        }}
                    >
                        service architecture
                    </p>
                    <h2
                        className="font-sans font-light leading-[1.06] transition-[opacity,transform]"
                        style={{
                            fontSize: "clamp(28px, 4.3vw, 51px)",
                            letterSpacing: "-.03em",
                            color: `rgb(${T.paper})`,
                            marginBottom: "32px",
                            opacity: revealed ? 1 : 0,
                            transform: revealed ? "translateY(0)" : "translateY(10px)",
                            transitionDuration: dur(MOTION.duration.text),
                            transitionDelay: dur(MOTION.duration.micro),
                            transitionTimingFunction: ease,
                        }}
                    >
                        How we build
                        <br />
                        <span
                            style={{
                                fontFamily: "Georgia, serif",
                                fontStyle: "italic",
                                fontWeight: 300,
                                color: `rgba(${T.paper},.26)`,
                            }}
                        >
                            systems that last
                        </span>
                    </h2>
                    <div
                        className="transition-[opacity,transform] overflow-hidden"
                        style={{
                            border: T.border,
                            borderWidth: "0.5px",
                            borderStyle: "solid",
                            borderRadius: "2px",
                            opacity: revealed ? 1 : 0,
                            transform: revealed ? "translateY(0)" : "translateY(16px)",
                            transitionDuration: dur(MOTION.duration.base),
                            transitionDelay: dur(MOTION.duration.fast),
                            transitionTimingFunction: ease,
                        }}
                    >
                        <div
                            className="flex items-center justify-between flex-wrap gap-2"
                            style={{
                                padding: "9px 16px",
                                borderBottom: `0.5px solid rgba(${T.paper},.06)`,
                            }}
                        >
                            <span style={{ fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: `rgba(${T.paper},.28)` }}>
                                system.build.pipeline / production
                            </span>
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span style={{ fontSize: "11px", letterSpacing: ".1em", color: `rgba(${T.paper},.38)` }}>
                                    <span
                                        className="inline-block transition-transform duration-300"
                                        style={{ color: `rgba(${T.paper},.55)`, transform: doneCount > 0 ? "scale(1.1)" : "scale(1)" }}
                                    >
                                        {doneCount}
                                    </span>
                                    /6 deployed
                                </span>
                                <span
                                    className="transition-colors duration-300"
                                    style={{
                                        fontSize: "11px",
                                        letterSpacing: ".18em",
                                        textTransform: "uppercase",
                                        color: complete
                                            ? `rgba(${T.stages[1]},.65)`
                                            : running
                                                ? `rgba(${T.stages[2]},.65)`
                                                : `rgba(${T.paper},.18)`,
                                    }}
                                >
                                    {statusLabel}
                                </span>
                            </div>
                        </div>
                        {STAGES.map((stage, i) => {
                            const status = statuses[i]
                            const isExp = expanded === i
                            const isRunning = status === "running"
                            const isDone = status === "done"
                            const isActive = isRunning || isDone
                            const color = T.stages[i]
                            return (
                                <React.Fragment key={stage.id}>
                                    <div
                                        className="pl-row relative items-start cursor-pointer overflow-hidden transition-colors duration-300"
                                        style={{
                                            padding: "13px 16px",
                                            borderBottom: `0.5px solid rgba(${T.paper},.04)`,
                                            backgroundColor: isExp
                                                ? `rgba(${color},.055)`
                                                : isRunning
                                                    ? `rgba(${color},.03)`
                                                    : isActive
                                                        ? `rgba(${T.paper},.008)`
                                                        : "transparent",
                                            animation: revealed ? `pl-row-in ${dur(MOTION.duration.fast)} cubic-bezier(.22,1,.36,1) ${dur(i * 0.065)} both` : "none",
                                        }}
                                        onClick={() => setExpanded(isExp ? null : i)}
                                    >
                                        {isRunning && (
                                            <div
                                                className="pl-scan pointer-events-none absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(90deg, transparent, rgba(${color},.07), transparent)`,
                                                    width: "40%",
                                                }}
                                            />
                                        )}
                                        <div
                                            className="absolute inset-y-0 ltr:left-0 rtl:right-0 transition-opacity duration-300"
                                            style={{
                                                width: "2.5px",
                                                backgroundColor: `rgb(${color})`,
                                                opacity: isActive || isExp ? 1 : 0,
                                                animation: (isActive || isExp) ? "pl-bar-in .32s cubic-bezier(.22,1,.36,1) both" : "none",
                                            }}
                                        />
                                        <span
                                            className="pl-col-ts tabular-nums transition-colors duration-300"
                                            style={{
                                                fontSize: "11.5px",
                                                letterSpacing: ".06em",
                                                paddingTop: "1px",
                                                color: isActive ? `rgba(${color},.5)` : `rgba(${T.paper},.16)`,
                                            }}
                                        >
                                            {times[i]}
                                        </span>
                                        <span
                                            className="pl-col-stage items-center gap-1.5 transition-colors duration-300 self-start"
                                            style={{
                                                fontSize: "11.5px",
                                                letterSpacing: ".12em",
                                                textTransform: "uppercase",
                                                paddingTop: "1px",
                                                color: isActive ? `rgb(${color})` : `rgba(${T.paper},.28)`,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            <span style={{ color: `rgba(${T.paper},.16)` }}>[{stage.id}]</span>
                                            <span className="hidden sm:inline">{stage.key}</span>
                                            <span className="sm:hidden">{stage.key.slice(0, 4)}</span>
                                            {stage.parallel && (
                                                <span
                                                    className="text-[9px] border px-1 py-px hidden sm:inline"
                                                    style={{
                                                        borderRadius: "1px",
                                                        color: `rgba(${color},.6)`,
                                                        borderColor: `rgba(${color},.25)`,
                                                    }}
                                                >
                                                    ||
                                                </span>
                                            )}
                                        </span>
                                        <span
                                            className="transition-colors duration-300 text-sm sm:text-[13px] leading-relaxed"
                                            style={{
                                                letterSpacing: ".01em",
                                                paddingTop: "1px",
                                                color: isActive ? `rgba(${T.paper},.48)` : `rgba(${T.paper},.22)`,
                                            }}
                                        >
                                            {stage.desc}
                                        </span>
                                        <span
                                            className="flex items-center gap-1.5 transition-colors duration-300 self-start justify-end"
                                            style={{
                                                fontSize: "11px",
                                                letterSpacing: ".10em",
                                                textTransform: "uppercase",
                                                paddingTop: "2px",
                                                color: isRunning
                                                    ? `rgba(${color},.75)`
                                                    : isDone
                                                        ? `rgba(${color},.55)`
                                                        : `rgba(${T.paper},.16)`,
                                            }}
                                        >
                                            <span className="relative flex items-center justify-center shrink-0" style={{ width: 8, height: 8, marginTop: 1 }}>
                                                {isRunning && (
                                                    <span
                                                        className="absolute inset-0 rounded-full"
                                                        style={{ backgroundColor: `rgb(${color})`, animation: `pl-ring 1.4s ease-out infinite` }}
                                                    />
                                                )}
                                                <span
                                                    className={`relative rounded-full transition-colors duration-300 ${isRunning ? "pl-breathe" : ""}`}
                                                    style={{
                                                        width: 5,
                                                        height: 5,
                                                        backgroundColor: isActive ? `rgb(${color})` : `rgba(${T.paper},.14)`,
                                                    }}
                                                />
                                            </span>
                                            <span className="hidden sm:inline">{status}</span>
                                        </span>
                                    </div>
                                    <div
                                        className="overflow-hidden transition-[max-height,opacity]"
                                        style={{
                                            maxHeight: isExp ? "280px" : "0px",
                                            opacity: isExp ? 1 : 0,
                                            transitionDuration: dur(MOTION.duration.fast),
                                            transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                                        }}
                                    >
                                        <div
                                            className="space-y-0.5"
                                            style={{
                                                padding: "12px 16px 14px",
                                                borderTop: `0.5px solid rgba(${T.paper},.04)`,
                                                background: "rgba(0,0,0,.25)",
                                            }}
                                        >
                                            {stage.logs.map((line, li) => (
                                                <div
                                                    key={li}
                                                    className="pl-log-line"
                                                    style={{
                                                        fontSize: "11.5px",
                                                        lineHeight: 1.85,
                                                        letterSpacing: ".04em",
                                                        animationDelay: `${li * 55}ms`,
                                                        color: line.startsWith("[ok]")
                                                            ? `rgba(${T.stages[1]},.65)`
                                                            : line.startsWith("[warn]")
                                                                ? `rgba(${T.stages[2]},.6)`
                                                                : `rgba(${T.stages[3]},.55)`,
                                                    }}
                                                >
                                                    <span style={{ color: `rgba(${T.paper},.12)`, marginRight: 8 }}>-</span>
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        <div
                            className="flex items-center justify-between flex-wrap gap-3"
                            style={{
                                padding: "11px 16px",
                                borderTop: `0.5px solid rgba(${T.paper},.06)`,
                            }}
                        >
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="text-[11.5px] transition-colors duration-500"
                                    style={{
                                        letterSpacing: ".10em",
                                        color: complete ? `rgba(${T.stages[1]},.65)` : `rgba(${T.paper},.22)`,
                                    }}
                                >
                                    {footerMsg}
                                </span>
                                <span
                                    className="pl-blink inline-block"
                                    style={{
                                        width: "5px",
                                        height: "11px",
                                        background: `rgba(${T.paper},.4)`,
                                        opacity: running ? 1 : 0,
                                        transition: `opacity ${dur(MOTION.duration.instant)}`,
                                    }}
                                />
                            </div>

                            <button
                                className="cursor-pointer transition-[color,border-color,background-color] disabled:opacity-30 disabled:cursor-not-allowed"
                                disabled={running}
                                onClick={complete ? reset : execute}
                                style={{
                                    fontFamily: "monospace",
                                    fontSize: "11.5px",
                                    letterSpacing: ".18em",
                                    textTransform: "uppercase",
                                    background: "transparent",
                                    border: `0.5px solid ${complete
                                        ? `rgba(${T.stages[1]},.28)`
                                        : `rgba(${T.paper},.14)`}`,
                                    borderRadius: "2px",
                                    padding: "7px 16px",
                                    color: complete
                                        ? `rgba(${T.stages[1]},.7)`
                                        : `rgba(${T.paper},.5)`,
                                    transitionDuration: dur(MOTION.duration.instant),
                                }}
                                onMouseEnter={e => {
                                    if (!running) {
                                        const btn = e.currentTarget
                                        btn.style.color = `rgba(${T.paper},.88)`
                                        btn.style.borderColor = `rgba(${T.paper},.28)`
                                        btn.style.background = `rgba(${T.paper},.04)`
                                    }
                                }}
                                onMouseLeave={e => {
                                    const btn = e.currentTarget
                                    btn.style.color = complete ? `rgba(${T.stages[1]},.7)` : `rgba(${T.paper},.5)`
                                    btn.style.borderColor = complete ? `rgba(${T.stages[1]},.28)` : `rgba(${T.paper},.14)`
                                    btn.style.background = "transparent"
                                }}
                            >
                                {complete ? "↺ re-execute" : running ? "running…" : "▶ execute"}
                            </button>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

function CtaSection() {
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")
    const cardRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })

    return (
        <section className="section-padding border-t border-foreground/8">
            <Container>
                <div ref={cardRef} className="border border-foreground/8 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-foreground/8 bg-foreground/2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full border-red-500/10 bg-red-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full border-yellow-500/10 bg-yellow-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full border-green-500/10 bg-green-500/70" />
                        </div>
                        <span className="font-mono text-xs text-primary/25 tracking-[0.2em] mx-auto">
                            new-project - bash
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-10 border-b border-foreground/8 md:border-b-0 ltr:md:border-r rtl:md:border-l font-mono text-sm space-y-3">
                            <div className="flex gap-3 text-primary/40">
                                <span className="select-none">~</span>
                                <span className="text-primary/50">$</span>
                                <span className="text-primary/70">npx start-project</span>
                            </div>
                            <div className="pl-6 space-y-1.5 text-primary/30">
                                <div>✓ Requirements gathered</div>
                                <div>✓ Timeline estimated</div>
                                <div>✓ Team assigned</div>
                            </div>
                            <div className="flex gap-3 text-primary/40">
                                <span className="select-none">~</span>
                                <span className="text-primary/50">$</span>
                                <span className="text-primary/70">contact --team</span>
                            </div>
                            <div className="flex gap-2 text-primary/55">
                                <span>→</span>
                                <span>Ready. Let&apos;s go.</span>
                                <span className="inline-block w-2 h-4 bg-primary/35 animate-pulse" />
                            </div>
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-between gap-8">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-5 block">
                                    {t("cta.eyebrow")}
                                </p>
                                <h2
                                    className="font-sans font-normal text-primary leading-[1.05] mb-4"
                                    style={{ fontSize: "clamp(22px, 3.5vw, 38px)", letterSpacing: "-0.02em" }}
                                >
                                    {t("cta.title")}
                                </h2>
                                <p className="text-base text-primary/60 leading-relaxed max-w-[40ch]">
                                    {t("cta.description")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link href="/contact" className="w-full">
                                    <MagneticButton size="lg" variant="primary" className="group w-full justify-center">
                                        <span className="flex items-center gap-2">
                                            {tCommon("ctaPrimary")}
                                            <svg
                                                className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </MagneticButton>
                                </Link>
                                <Link href="/services" className="w-full">
                                    <MagneticButton size="lg" variant="secondary" className="w-full justify-center">
                                        {t("cta.back")}
                                    </MagneticButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}