"use client"

import { Container } from "@/components/container"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useRef, useState } from "react"

interface TechNode {
    id: string
    name: string
    category: string
    description: string
    highlights: readonly string[]
    x: number
    y: number
    r: number
    primary?: boolean
    accent: string
}

interface Connection {
    from: string
    to: string
    dashed?: boolean
}


const NODES: TechNode[] = [
    {
        id: "nextjs", name: "Next.js", category: "Framework",
        description: "Full-stack React framework powering every project. App Router, server components, ISR, and edge runtime in one coherent system.",
        highlights: ["App Router", "Server Actions", "Edge Runtime"],
        x: 350, y: 220, r: 30, primary: true, accent: "#818CF8",
    },
    {
        id: "react", name: "React", category: "UI Library",
        description: "Component-based UI layer. Every interface is composable, reusable, and predictably state-driven with concurrent rendering.",
        highlights: ["Server Components", "Suspense", "Concurrent Mode"],
        x: 160, y: 155, r: 21, accent: "#61DAFB",
    },
    {
        id: "typescript", name: "TypeScript", category: "Language",
        description: "Strict type safety across the entire codebase - APIs, database queries, and UI components all share a single type system.",
        highlights: ["Strict mode", "Zero implicit any", "Shared types"],
        x: 350, y: 55, r: 21, accent: "#3B82F6",
    },
    {
        id: "nodejs", name: "Node.js", category: "Runtime",
        description: "Server runtime for API routes, background jobs, webhooks, and serverless functions. Non-blocking I/O at the core.",
        highlights: ["API routes", "Edge functions", "Streaming SSR"],
        x: 540, y: 155, r: 21, accent: "#4ADE80",
    },
    {
        id: "postgresql", name: "PostgreSQL", category: "Database",
        description: "Production-grade relational database. ACID compliant, with JSON column support, full-text search, and row-level security.",
        highlights: ["ACID compliant", "JSON columns", "Row-level security"],
        x: 490, y: 365, r: 21, accent: "#60A5FA",
    },
    {
        id: "prisma", name: "Prisma", category: "ORM",
        description: "Type-safe database client - schema is the source of truth, TypeScript types are generated automatically. No raw SQL drift.",
        highlights: ["Type-safe queries", "Migrations", "Schema-first"],
        x: 285, y: 385, r: 21, accent: "#A78BFA",
    },
    {
        id: "tailwind", name: "Tailwind", category: "Styling",
        description: "Utility-first CSS with design tokens baked in. Fast iteration, zero dead styles in production builds, and true dark mode.",
        highlights: ["Design tokens", "JIT compiler", "Dark mode"],
        x: 130, y: 320, r: 21, accent: "#22D3EE",
    },
    {
        id: "vercel", name: "Vercel", category: "Deployment",
        description: "Zero-config deployment with a global edge network, real-time analytics, instant rollbacks, and preview environments per branch.",
        highlights: ["Edge Network", "Preview deploys", "Analytics"],
        x: 585, y: 305, r: 21, accent: "#E4E4E7",
    },
]

const CONNECTIONS: Connection[] = [
    { from: "typescript", to: "react" },
    { from: "typescript", to: "nextjs" },
    { from: "typescript", to: "nodejs" },
    { from: "react", to: "nextjs" },
    { from: "nextjs", to: "tailwind" },
    { from: "nextjs", to: "nodejs" },
    { from: "nextjs", to: "vercel", dashed: true },
    { from: "nodejs", to: "postgresql" },
    { from: "postgresql", to: "prisma" },
]

// ── Node pill dimensions ───────────────────────────────────────────────────────
const NODE_W = 90
const NODE_H = 34
const NODE_RX = 3

// ── Helpers ───────────────────────────────────────────────────────────────────

function getConnectedIds(nodeId: string): Set<string> {
    const ids = new Set<string>()
    CONNECTIONS.forEach(c => {
        if (c.from === nodeId) ids.add(c.to)
        if (c.to === nodeId) ids.add(c.from)
    })
    return ids
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TechDNASection() {
    const t = useTranslations("serviceDetails.development")

    const sectionRef = useRef<HTMLElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const animated = useRef(false)

    const [activeId, setActiveId] = useState<string | null>(null)
    const [detailKey, setDetailKey] = useState(0)
    const [mounted, setMounted] = useState(false)

    const titleRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
    const headingRef = useText(DEFAULTS.heading)

    const activeNode = activeId ? (NODES.find(n => n.id === activeId) ?? null) : null
    const connectedIds = activeId ? getConnectedIds(activeId) : new Set<string>()

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true) }, [])

    // ── Entry animation: draw lines, then pop nodes ────────────────────────────
    useEffect(() => {
        if (!sectionRef.current || !svgRef.current || animated.current) return

        const lines = svgRef.current.querySelectorAll<SVGLineElement>("[data-conn]")
        const nodeGrps = svgRef.current.querySelectorAll<SVGGElement>("[data-node]")

        // Manually compute line length via Pythagoras (SVGLineElement has no getTotalLength)
        lines.forEach(line => {
            const x1 = parseFloat(line.getAttribute("x1") ?? "0")
            const y1 = parseFloat(line.getAttribute("y1") ?? "0")
            const x2 = parseFloat(line.getAttribute("x2") ?? "0")
            const y2 = parseFloat(line.getAttribute("y2") ?? "0")
            const len = Math.hypot(x2 - x1, y2 - y1)
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
        })
        gsap.set(nodeGrps, { opacity: 0, y: 5 })

        const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
            onEnter: () => {
                animated.current = true
                const tl = gsap.timeline({ defaults: { ease: MOTION.ease.smooth } })

                tl.to(lines, {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.06,
                    onComplete: () => {
                        // Restore dashed stroke pattern for dashed connections after draw-in
                        svgRef.current
                            ?.querySelectorAll<SVGLineElement>("[data-dashed]")
                            .forEach(el => gsap.set(el, { strokeDasharray: "4 6" }))
                    },
                })
                tl.to(nodeGrps, {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.04,
                    ease: "power2.out",
                }, "-=0.5")
            },
        })

        return () => st.kill()
    }, [])

    const enter = useCallback((id: string) => {
        setActiveId(id)
        setDetailKey(k => k + 1)
    }, [])
    const leave = useCallback(() => setActiveId(null), [])

    // ── Visual state helpers ───────────────────────────────────────────────────

    const getNodeOpacity = (id: string): number => {
        if (!mounted || !activeId) return 1
        if (id === activeId) return 1
        if (connectedIds.has(id)) return 0.8
        return 0.12
    }

    const getConnStroke = (conn: Connection): string => {
        if (!mounted || !activeId) return "var(--foreground)"
        if (conn.from === activeId || conn.to === activeId) {
            return NODES.find(n => n.id === conn.from)?.accent ?? "var(--foreground)"
        }
        return "var(--foreground)"
    }

    const getConnOpacity = (conn: Connection): number => {
        if (!mounted || !activeId) return 0.1
        if (conn.from === activeId || conn.to === activeId) return 0.65
        return 0.04
    }

    const getConnWidth = (conn: Connection): number => {
        if (!mounted || !activeId) return 0.6
        if (conn.from === activeId || conn.to === activeId) return 1.25
        return 0.4
    }

    return (
        <section
            ref={sectionRef}
            id="tech-dna"
            className="section-padding border-t border-foreground/8"
        >
            <Container>

                {/* ── Header ──────────────────────────────────────────────────── */}
                <div ref={titleRef} className="mb-16">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
                        {t("techStack.eyebrow")}
                    </p>
                    <div className="flex items-end justify-between gap-8 flex-wrap">
                        <h2
                            ref={headingRef}
                            className="font-sans font-normal text-primary leading-[1.05]"
                            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                        >
                            {t("techStack.title")}
                            <br />
                            <span
                                className="text-primary/35"
                                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                            >
                                {t("techStack.titleItalic")}
                            </span>
                        </h2>
                        <p className="font-mono text-sm text-primary/35 max-w-[32ch] hidden lg:block tracking-[0.05em]">
                            {t("techStack.subtitle")}
                        </p>
                    </div>
                </div>

                {/* ── Constellation - desktop ──────────────────────────────────── */}
                <div className="hidden md:block relative">

                    {/* Dot-grid backdrop */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{
                            backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                            opacity: 0.04,
                        }}
                    />

                    {/* 700 × 462 viewport */}
                    <div className="relative" style={{ paddingBottom: "66%" }}>
                        <svg
                            ref={svgRef}
                            viewBox="0 0 700 462"
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            style={{ overflow: "visible", color: "var(--foreground)" }}
                            role="img"
                            aria-label="Service architecture diagram - select a node to inspect dependencies"
                        >
                            {/* ── Connection lines ────────────────────────────────── */}
                            <g>
                                {CONNECTIONS.map((conn, i) => {
                                    const a = NODES.find(n => n.id === conn.from)!
                                    const b = NODES.find(n => n.id === conn.to)!

                                    return (
                                        <line
                                            key={i}
                                            data-conn
                                            {...(conn.dashed ? { "data-dashed": "" } : {})}
                                            x1={a.x} y1={a.y}
                                            x2={b.x} y2={b.y}
                                            stroke={getConnStroke(conn)}
                                            strokeWidth={getConnWidth(conn)}
                                            strokeDasharray={conn.dashed ? "4 6" : undefined}
                                            style={{
                                                opacity: getConnOpacity(conn),
                                                transition: "opacity 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease",
                                            }}
                                        />
                                    )
                                })}
                            </g>

                            {/* ── Nodes ────────────────────────────────────────────── */}
                            <g>
                                {NODES.map((node) => {
                                    const isActive = node.id === activeId
                                    const isPrimary = !!node.primary
                                    const w = isPrimary ? NODE_W * 1.14 : NODE_W
                                    const bx = node.x - w / 2     // rect origin x
                                    const by = node.y - NODE_H / 2 // rect origin y

                                    return (
                                        <g
                                            key={node.id}
                                            data-node
                                            style={{
                                                cursor: "pointer",
                                                opacity: getNodeOpacity(node.id),
                                                transition: "opacity 0.2s ease",
                                            }}
                                            onMouseEnter={() => enter(node.id)}
                                            onMouseLeave={leave}
                                            onFocus={() => enter(node.id)}
                                            onBlur={leave}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${node.name} - ${node.category}`}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault()
                                                    isActive ? leave() : enter(node.id)
                                                }
                                            }}
                                        >
                                            {/* Node pill background */}
                                            <rect
                                                x={bx} y={by}
                                                width={w} height={NODE_H}
                                                rx={NODE_RX}
                                                fill={isActive ? `${node.accent}0D` : "var(--background)"}
                                                stroke={isActive ? node.accent : "var(--foreground)"}
                                                strokeWidth={isActive ? 1 : 0.5}
                                                strokeOpacity={isActive ? 0.6 : 0.16}
                                                style={{ transition: "fill 0.2s ease, stroke 0.2s ease, stroke-opacity 0.2s ease" }}
                                            />

                                            {/* Left accent stripe - appears on active */}
                                            {isActive && (
                                                <rect
                                                    x={bx} y={by}
                                                    width={2}
                                                    height={NODE_H}
                                                    rx={NODE_RX}
                                                    fill={node.accent}
                                                    opacity={0.75}
                                                />
                                            )}

                                            {/* Status dot - top-right */}
                                            <circle
                                                cx={bx + w - 7}
                                                cy={by + 7}
                                                r={2}
                                                fill={node.accent}
                                                opacity={isActive ? 0.9 : 0.3}
                                                style={{ transition: "opacity 0.2s ease" }}
                                            />

                                            {/* Service name */}
                                            <text
                                                x={node.x}
                                                y={node.y - 4}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{
                                                    fill: "var(--foreground)",
                                                    fontSize: isPrimary ? "11px" : "10px",
                                                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                                                    fontWeight: isActive ? "600" : "400",
                                                    opacity: isActive ? 1 : 0.7,
                                                    transition: "opacity 0.2s ease",
                                                    userSelect: "none",
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                {node.name}
                                            </text>

                                            {/* Category micro-label */}
                                            <text
                                                x={node.x}
                                                y={node.y + 8}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{
                                                    fill: isActive ? node.accent : "var(--foreground)",
                                                    fontSize: "7px",
                                                    fontFamily: "var(--font-mono, monospace)",
                                                    letterSpacing: "0.12em",
                                                    opacity: isActive ? 0.85 : 0.25,
                                                    transition: "fill 0.2s ease, opacity 0.2s ease",
                                                    userSelect: "none",
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                {node.category.toUpperCase()}
                                            </text>

                                        </g>
                                    )
                                })}
                            </g>

                        </svg>
                    </div>

                    {/* ── Detail panel ──────────────────────────────────────────── */}
                    <div style={{ height: 116, marginTop: 24, position: "relative" }}>

                        {/* Empty state */}
                        <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity: activeNode ? 0 : 1, transition: "opacity 0.18s ease" }}
                        >
                            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/18">
                                Select a service node to inspect
                            </p>
                        </div>

                        {/* Active detail - keyed for re-animation on each node change */}
                        <div
                            key={detailKey}
                            style={{
                                opacity: activeNode ? 1 : 0,
                                pointerEvents: activeNode ? "auto" : "none",
                                animation: activeNode ? "detailIn 0.22s ease forwards" : undefined,
                            }}
                        >
                            {activeNode && (
                                <div
                                    className="rounded-sm p-5 grid items-start gap-5"
                                    style={{
                                        gridTemplateColumns: "2px 1fr auto",
                                        border: `1px solid ${activeNode.accent}24`,
                                        background: `${activeNode.accent}07`,
                                    }}
                                >
                                    {/* Left accent bar */}
                                    <div
                                        style={{
                                            alignSelf: "stretch",
                                            background: activeNode.accent,
                                            borderRadius: 1,
                                            opacity: 0.65,
                                        }}
                                    />

                                    {/* Name + description */}
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                            <h3
                                                className="font-mono font-semibold text-primary"
                                                style={{ fontSize: "clamp(13px, 1.5vw, 15px)", letterSpacing: "-0.01em" }}
                                            >
                                                {activeNode.name}
                                            </h3>
                                            <span
                                                className="font-mono uppercase"
                                                style={{
                                                    fontSize: 8,
                                                    letterSpacing: "0.2em",
                                                    padding: "2px 8px",
                                                    borderRadius: 2,
                                                    color: activeNode.accent,
                                                    border: `1px solid ${activeNode.accent}32`,
                                                }}
                                            >
                                                {activeNode.category}
                                            </span>
                                        </div>
                                        <p
                                            className="text-sm leading-relaxed text-primary/45"
                                            style={{ maxWidth: "54ch" }}
                                        >
                                            {activeNode.description}
                                        </p>
                                    </div>

                                    {/* Highlight chips */}
                                    <div className="flex flex-col gap-1.5 shrink-0">
                                        {activeNode.highlights.map((h, i) => (
                                            <span
                                                key={h}
                                                className="font-mono uppercase text-primary/38 border border-foreground/8 bg-foreground/[0.03] rounded-sm whitespace-nowrap"
                                                style={{
                                                    fontSize: 9,
                                                    letterSpacing: "0.13em",
                                                    padding: "4px 10px",
                                                    animation: `chipIn 0.2s ease ${i * 0.055}s both`,
                                                }}
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* ── Mobile: 2-column grid ────────────────────────────────────── */}
                <div className="md:hidden grid grid-cols-2 gap-3">
                    {NODES.map((node) => (
                        <div
                            key={node.id}
                            className="border border-foreground/8 rounded-sm bg-foreground/[0.02] p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className="font-mono uppercase"
                                    style={{ fontSize: 9, letterSpacing: "0.18em", color: node.accent, opacity: 0.8 }}
                                >
                                    {node.category}
                                </span>
                                <div
                                    style={{
                                        width: 5, height: 5,
                                        borderRadius: "50%",
                                        background: node.accent,
                                        opacity: 0.5,
                                    }}
                                />
                            </div>
                            <p
                                className="font-mono font-medium text-primary mb-2"
                                style={{ fontSize: "clamp(12px, 1.4vw, 14px)", letterSpacing: "-0.01em" }}
                            >
                                {node.name}
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {node.highlights.map(h => (
                                    <span key={h} className="font-mono text-[10px] text-primary/28">
                                        - {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer ticker ────────────────────────────────────────────── */}
                <div className="mt-8 border-t border-foreground/8 pt-4 flex items-center gap-4">
                    <span className="font-mono text-xs uppercase text-primary/20 tracking-[0.25em]">
                        08 Technologies - ALTRUVEX
                    </span>
                    <div className="flex-1 h-px bg-foreground/4" />
                </div>

            </Container>

            {/* 
                Only two keyframes - both fire once per interaction.
                Nothing loops. Nothing paints continuously.
                prefers-reduced-motion respected.
            */}
            <style>{`
                @keyframes detailIn {
                    from { opacity: 0.2; transform: translateY(4px); }
                    to   { opacity: 1;   transform: translateY(0); }
                }
                @keyframes chipIn {
                    from { opacity: 0; transform: translateX(5px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

        </section>
    )
}