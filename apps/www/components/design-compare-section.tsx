"use client"

import { Container } from "@/components/container"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

const STYLES = `
  .dcs-section { padding: clamp(64px,8vw,128px) 0; border-top: 1px solid rgba(0,0,0,.08); }

  .dcs-header  { transition: opacity 280ms ease-out, transform 280ms ease-out; }
  .dcs-stage-w { transition: opacity 280ms ease-out 80ms, transform 280ms ease-out 80ms; }
  .dcs-stats   { transition: opacity 280ms ease-out 160ms, transform 280ms ease-out 160ms; }
  .dcs-reveal  { opacity:0; transform:translateY(12px); }
  .dcs-reveal.dcs-in { opacity:1; transform:none; }

  .dcs-handle  { transition: transform 180ms ease, border-color 180ms ease; }
  .dcs-stage:hover .dcs-handle { border-color:#2563EB!important; transform:translate(-50%,-50%) scale(1.06)!important; }
  .dcs-stage.dragging .dcs-handle { border-color:#2563EB!important; transform:translate(-50%,-50%) scale(1.06)!important; }
  .dcs-hint    { transition: opacity 400ms ease; }
`

export function DesignCompareSection() {
    const t = useTranslations("serviceDetails.webDesign")

    const [pct, setPct] = useState(50)
    const [dragging, setDragging] = useState(false)
    const [interacted, setInteracted] = useState(false)
    const [statsVisible, setStatsVisible] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const stageWrapRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    const clamp = (v: number) => Math.max(0, Math.min(100, v))

    const updateFromX = useCallback((clientX: number) => {
        if (!containerRef.current) return
        const r = containerRef.current.getBoundingClientRect()
        setPct(clamp((clientX - r.left) / r.width * 100))
        setInteracted(true)
    }, [])

    const onMouseDown = useCallback((e: React.MouseEvent) => { setDragging(true); updateFromX(e.clientX) }, [updateFromX])
    const onTouchStart = useCallback((e: React.TouchEvent) => { setDragging(true); updateFromX(e.touches[0].clientX) }, [updateFromX])

    useEffect(() => {
        const move = (e: MouseEvent) => { if (dragging) updateFromX(e.clientX) }
        const tMove = (e: TouchEvent) => { if (dragging) { e.preventDefault(); updateFromX(e.touches[0].clientX) } }
        const up = () => setDragging(false)

        window.addEventListener("mousemove", move)
        window.addEventListener("mouseup", up)
        window.addEventListener("touchmove", tMove, { passive: false })
        window.addEventListener("touchend", up)
        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mouseup", up)
            window.removeEventListener("touchmove", tMove)
            window.removeEventListener("touchend", up)
        }
    }, [dragging, updateFromX])

    useEffect(() => {
        const els = [headerRef.current, stageWrapRef.current, statsRef.current].filter(Boolean) as HTMLElement[]
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return
                entry.target.classList.add("dcs-in")
                if (entry.target === statsRef.current) setStatsVisible(true)
                io.unobserve(entry.target)
            })
        }, { threshold: 0.15 })

        els.forEach(el => io.observe(el))
        return () => io.disconnect()
    }, [])

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
            <section className="dcs-section" id="compare">
                <Container>
                    <div ref={headerRef} className="dcs-header dcs-reveal mb-12">
                        <p
                            className="mb-4 block"
                            style={{
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: 10,
                                fontWeight: 500,
                                letterSpacing: ".25em",
                                textTransform: "uppercase",
                                color: "rgba(12,12,11,.28)",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {t("compareEyebrow") ?? "SVC_CMP - See the difference"}
                        </p>

                        <div className="flex items-end justify-between gap-8 flex-wrap">
                            <h2
                                style={{
                                    fontSize: "clamp(32px,5vw,60px)",
                                    fontWeight: 300,
                                    lineHeight: 1.05,
                                    letterSpacing: "-.025em",
                                    color: "var(--text-primary, #0C0C0B)",
                                    fontVariationSettings: "'wght' 300",
                                }}
                            >
                                {t("compareTitle") ?? "Same content."}
                                <br />
                                <span
                                    style={{
                                        fontFamily: "Georgia, serif",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        color: "rgba(12,12,11,.35)",
                                        letterSpacing: "-.02em",
                                    }}
                                >
                                    {t("compareTitleItalic") ?? "Entirely different result."}
                                </span>
                            </h2>

                            <p
                                className="hidden lg:block"
                                style={{
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 11,
                                    color: "rgba(12,12,11,.45)",
                                    maxWidth: "36ch",
                                    lineHeight: 1.7,
                                    textAlign: "right",
                                    letterSpacing: ".01em",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {t("compareSubtitle") ?? "Drag the divider to compare a generic template against an Altruvex-crafted design."}
                            </p>
                        </div>
                    </div>
                    <div ref={stageWrapRef} className="dcs-stage-w dcs-reveal">
                        <div
                            ref={containerRef}
                            className={`dcs-stage relative w-full overflow-hidden select-none${dragging ? " dragging" : ""}`}
                            style={{
                                height: "clamp(400px,52vw,560px)",
                                border: "1px solid rgba(0,0,0,.12)",
                                borderRadius: 6,
                                cursor: "col-resize",
                                background: "#f0efed",
                            }}
                            onMouseDown={onMouseDown}
                            onTouchStart={onTouchStart}
                        >
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <GenericSide />
                            </div>
                            <div
                                className="absolute inset-0 w-full h-full overflow-hidden"
                                style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
                            >
                                <AltruvexSide />
                            </div>
                            <div
                                className="absolute z-10 pointer-events-none"
                                style={{
                                    top: 12, left: 12,
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 9, fontWeight: 500,
                                    letterSpacing: ".18em", textTransform: "uppercase",
                                    padding: "5px 10px", borderRadius: 20,
                                    background: "rgba(0,0,0,.55)", color: "#fff",
                                    fontVariantNumeric: "tabular-nums",
                                    opacity: Math.max(0, 1 - (pct - 10) / 20),
                                }}
                            >
                                {t("compareGenericLabel") ?? "Generic template"}
                            </div>
                            <div
                                className="absolute z-10 pointer-events-none"
                                style={{
                                    top: 12, right: 12,
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 9, fontWeight: 500,
                                    letterSpacing: ".18em", textTransform: "uppercase",
                                    padding: "5px 10px", borderRadius: 20,
                                    background: "rgba(37,99,235,.88)", color: "#fff",
                                    fontVariantNumeric: "tabular-nums",
                                    opacity: Math.max(0, 1 - (90 - pct) / 20),
                                }}
                            >
                                {t("compareAltruvexLabel") ?? "Altruvex crafted"}
                            </div>
                            <div
                                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                                style={{ left: `${pct}%`, transform: "translateX(-50%)", width: 1 }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{ width: 1, left: "50%", background: "rgba(12,12,11,.6)" }}
                                />
                                <div
                                    className="dcs-handle absolute flex items-center justify-center rounded-full"
                                    style={{
                                        width: 32, height: 32,
                                        top: "50%", left: "50%",
                                        transform: "translate(-50%,-50%)",
                                        background: "#fff",
                                        border: "1px solid rgba(0,0,0,.12)",
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 3 12 9 6" />
                                        <polyline points="15 6 21 12 15 18" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="dcs-hint absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                                style={{
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 9, fontWeight: 500,
                                    letterSpacing: ".2em", textTransform: "uppercase",
                                    padding: "5px 12px", borderRadius: 20,
                                    background: "rgba(0,0,0,.4)", color: "#fff",
                                    whiteSpace: "nowrap",
                                    opacity: interacted ? 0 : 1,
                                }}
                            >
                                ← drag to compare →
                            </div>
                        </div>
                        <div ref={statsRef} className="dcs-stats dcs-reveal grid grid-cols-3 gap-3 mt-3">
                            {[
                                { key: "1", label: t("compareStat1Label") ?? "Typography", value: "12×", sub: t("compareStat1Sub") ?? "More visual hierarchy" },
                                { key: "2", label: t("compareStat2Label") ?? "Whitespace", value: "3×", sub: t("compareStat2Sub") ?? "More breathing room" },
                                { key: "3", label: t("compareStat3Label") ?? "Visual noise", value: "−84%", sub: t("compareStat3Sub") ?? "Elements removed" },
                            ].map(s => (
                                <div
                                    key={s.key}
                                    style={{
                                        border: "1px solid rgba(0,0,0,.08)",
                                        borderRadius: 4,
                                        padding: 16,
                                        background: "rgba(12,12,11,.018)",
                                    }}
                                >
                                    <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 9, fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "rgba(12,12,11,.28)", marginBottom: 6, fontVariantNumeric: "tabular-nums" as const }}>
                                        {s.label}
                                    </p>
                                    <p style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 300, letterSpacing: "-.03em", lineHeight: 1, marginBottom: 4, fontVariantNumeric: "tabular-nums" as const }}>
                                        <AnimatedValue value={s.value} animate={statsVisible} />
                                    </p>
                                    <p style={{ fontSize: 10, color: "rgba(12,12,11,.45)", letterSpacing: ".01em" }}>
                                        {s.sub}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </Container>
            </section>
        </>
    )
}

function AnimatedValue({ value, animate }: { value: string; animate: boolean }) {
    const [display, setDisplay] = useState("0")
    const started = useRef(false)

    useEffect(() => {
        if (!animate || started.current) return
        started.current = true

        const prefix = value.startsWith("−") ? "−" : ""
        const suffix = value.endsWith("%") ? "%" : value.endsWith("×") ? "×" : ""
        const target = parseInt(value.replace(/[^0-9]/g, ""), 10)

        const duration = 800
        const start = performance.now()

        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            setDisplay(prefix + Math.round(ease * target) + suffix)
            if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [animate, value])

    return <>{animate ? display : value}</>
}

function GenericSide() {
    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden", background: "#f5f5f5", fontFamily: "Arial, Helvetica, sans-serif" }}>
            {/* Nav */}
            <div style={{ background: "#fff", padding: "0 20px", height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ddd" }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#222" }}>Meridian</span>
                <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#555" }}>
                    <span>Services</span><span>Portfolio</span><span>About</span><span>Blog</span>
                </div>
                <button style={{ background: "#0066cc", color: "#fff", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 4, border: "none" }}>GET QUOTE</button>
            </div>
            {/* Hero */}
            <div style={{ background: "#fff", padding: "22px 20px 16px", display: "grid", gridTemplateColumns: "1fr 140px", gap: 16 }}>
                <div>
                    <div style={{ fontSize: "clamp(18px,4vw,24px)", fontWeight: 900, color: "#111", lineHeight: 1.15, textTransform: "uppercase" as const, letterSpacing: "-.01em", marginBottom: 8 }}>
                        Transform your<br />digital presence
                    </div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, marginBottom: 14 }}>
                        We create stunning websites that drive real results for your business growth and online visibility.
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                        <button style={{ background: "#0066cc", color: "#fff", fontSize: 10, fontWeight: 700, padding: "7px 14px", borderRadius: 3, border: "none", letterSpacing: ".03em", textTransform: "uppercase" as const }}>GET STARTED</button>
                        <button style={{ background: "#fff", color: "#ff6600", fontSize: 10, fontWeight: 700, padding: "6px 13px", borderRadius: 3, border: "2px solid #ff6600", letterSpacing: ".03em", textTransform: "uppercase" as const }}>LEARN MORE</button>
                        <button style={{ background: "#ff6600", color: "#fff", fontSize: 10, fontWeight: 700, padding: "6px 13px", borderRadius: 3, border: "2px solid #ff6600", letterSpacing: ".03em", textTransform: "uppercase" as const }}>FREE TRIAL</button>
                    </div>
                </div>
                <div style={{ background: "#ddd", borderRadius: 4, border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#999", textTransform: "uppercase" as const, letterSpacing: ".1em", height: 110 }}>
                    IMAGE<br />HERE
                </div>
            </div>
            {/* Badge bar */}
            <div style={{ background: "#fff3f0", padding: "7px 20px", borderTop: "1px solid #ffd0b8", borderBottom: "1px solid #ffd0b8", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const }}>
                <span style={{ background: "#ff6600", color: "#fff", fontSize: 8, fontWeight: 700, padding: "3px 7px", borderRadius: 2, textTransform: "uppercase" as const, letterSpacing: ".05em" }}>NEW</span>
                <span style={{ fontSize: 9, color: "#cc3300", fontWeight: 700 }}>🔥 LIMITED TIME OFFER</span>
                <span style={{ fontSize: 9, color: "#555" }}>Get 30% off your first project!</span>
                <span style={{ background: "#0066cc", color: "#fff", fontSize: 8, fontWeight: 700, padding: "3px 7px", borderRadius: 2, textTransform: "uppercase" as const, letterSpacing: ".05em" }}>CLAIM NOW</span>
            </div>
            {/* Cards */}
            <div style={{ padding: "14px 20px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[
                    { t: "Interface Design", d: "Beautiful responsive websites designed to convert visitors.", c: "#0066cc" },
                    { t: "Development", d: "Full-stack solutions built with the latest technologies.", c: "#ff6600" },
                    { t: "SEO & Growth", d: "Data-driven strategies to boost your search rankings.", c: "#0066cc" },
                ].map(card => (
                    <div key={card.t} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4, padding: 12, boxShadow: "0 2px 6px rgba(0,0,0,.08)", borderTop: `3px solid ${card.c}` }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#111", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: ".03em" }}>{card.t}</div>
                        <div style={{ fontSize: 9.5, color: "#777", lineHeight: 1.5 }}>{card.d}</div>
                    </div>
                ))}
            </div>
            {/* Trust bar */}
            <div style={{ background: "#f0f7ff", padding: "8px 20px", borderTop: "1px solid #d0e4ff", fontSize: 9, display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ color: "#0066cc", fontWeight: 700 }}>✓ 100% Satisfaction</span>
                <span style={{ color: "#555" }}>✓ Free Consultation</span>
                <span style={{ color: "#555" }}>✓ 24/7 Support</span>
                <span style={{ color: "#ff6600", fontWeight: 700 }}>★★★★★ 500+ Reviews</span>
            </div>
        </div>
    )
}

const AX_STYLES = `
  @keyframes ax-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
  .ax-root { position:relative; width:100%; height:100%; overflow:hidden;
    background:#080807; font-family:'Plus Jakarta Sans',system-ui,sans-serif;
    display:flex; flex-direction:column; }
  .ax-root::before { content:''; position:absolute; inset:0;
    background-image:radial-gradient(circle,rgba(255,255,255,.055) 1px,transparent 1px);
    background-size:22px 22px; pointer-events:none; z-index:0; }
  .ax-root > * { position:relative; z-index:1; }
  .ax-glow { position:absolute; pointer-events:none; z-index:0; }
  .ax-dot { width:6px;height:6px;border-radius:50%;background:#22c55e;
    box-shadow:0 0 6px rgba(34,197,94,.7);
    animation:ax-pulse 2.4s ease-in-out infinite; }
  .ax-metric-top::after { content:''; position:absolute; top:0;left:0;right:0;
    height:1px; background:linear-gradient(90deg,transparent,rgba(37,99,235,.6),transparent); }
  .ax-spark-bar.hi { background:#2563EB; }
`

function AltruvexSide() {
    const sparkHeights = [6, 9, 7, 14, 11, 18, 20, 24]
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: AX_STYLES }} />
            <div className="ax-root">
                <div className="ax-glow" style={{ top: -60, right: -60, width: 280, height: 280, background: "radial-gradient(ellipse,rgba(37,99,235,.28) 0%,transparent 65%)" }} />
                <div className="ax-glow" style={{ bottom: -40, left: -40, width: 220, height: 220, background: "radial-gradient(ellipse,rgba(124,58,237,.16) 0%,transparent 65%)" }} />
                <div className="ax-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, background: "radial-gradient(ellipse,rgba(37,99,235,.06) 0%,transparent 70%)" }} />
                <nav style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: ".5px solid rgba(255,255,255,.07)", background: "rgba(8,8,7,.7)", backdropFilter: "blur(12px)", flexShrink: 0, position: "relative", zIndex: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-.025em" }}>Meridian</span>
                    <div style={{ display: "flex", gap: 16, fontSize: 10, color: "rgba(255,255,255,.32)", letterSpacing: ".06em", textTransform: "uppercase" as const }}>
                        <span>Work</span><span>Services</span><span>Studio</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "rgba(255,255,255,.38)", letterSpacing: ".06em", textTransform: "uppercase" as const }}>
                        <div className="ax-dot" />
                        Available Q3
                    </div>
                </nav>
                <div style={{ padding: "16px 20px 10px", flexShrink: 0 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 8.5, textTransform: "uppercase" as const, letterSpacing: ".22em", color: "rgba(255,255,255,.28)", marginBottom: 10, fontVariantNumeric: "tabular-nums" as const }}>
                        <span style={{ width: 16, height: .5, background: "rgba(255,255,255,.2)", display: "inline-block" }} />
                        Web Engineering Studio - v2.4
                    </div>
                    <div style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 300, color: "rgba(255,255,255,.92)", lineHeight: 1.06, letterSpacing: "-.03em" }}>We build digital</div>
                    <div style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 300, fontStyle: "italic", fontFamily: "Georgia, serif", color: "rgba(255,255,255,.28)", letterSpacing: "-.02em", lineHeight: 1.06 }}>infrastructure.</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", lineHeight: 1.65, maxWidth: "34ch", margin: "9px 0 13px", letterSpacing: ".01em" }}>
                        Bespoke systems engineered for precision - not templates assembled for speed.
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, color: "#fff", background: "#2563EB", padding: "7px 14px", borderRadius: 20, letterSpacing: ".02em", boxShadow: "0 0 20px rgba(37,99,235,.45)" }}>
                            Start a project
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <span style={{ fontSize: 9.5, color: "rgba(255,255,255,.3)", letterSpacing: ".04em" }}>View case studies →</span>
                    </div>
                </div>

                <div style={{ padding: "0 20px 12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto", gap: 6, flexShrink: 0 }}>

                    <div className="ax-metric-top" style={{ gridColumn: "1/3", background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.1)", borderRadius: 6, padding: "11px 13px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, position: "relative", overflow: "hidden" }}>
                        <div>
                            <div style={{ fontSize: 8.5, textTransform: "uppercase" as const, letterSpacing: ".16em", color: "rgba(255,255,255,.25)", marginBottom: 5, fontVariantNumeric: "tabular-nums" as const }}>Avg. conversion lift</div>
                            <div style={{ fontSize: 28, fontWeight: 300, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const }}>+340%</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                            <div style={{ fontSize: 9, fontWeight: 600, color: "#22c55e", letterSpacing: ".04em", background: "rgba(34,197,94,.1)", padding: "2px 6px", borderRadius: 10, border: ".5px solid rgba(34,197,94,.25)" }}>↑ 12% this Q</div>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 24 }}>
                                {sparkHeights.map((h, i) => (
                                    <div key={i} className={i >= 5 ? "ax-spark-bar hi" : "ax-spark-bar"} style={{ width: 3, height: h, borderRadius: 1, background: i >= 5 ? "#2563EB" : "rgba(37,99,235,.4)" }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,.03)", border: ".5px solid rgba(255,255,255,.07)", borderRadius: 6, padding: 11 }}>
                        <div style={{ fontSize: 8, letterSpacing: ".14em", color: "rgba(255,255,255,.2)", marginBottom: 6, fontVariantNumeric: "tabular-nums" as const, textTransform: "uppercase" as const }}>SVC_03</div>
                        <div style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(255,255,255,.8)", letterSpacing: "-.01em", marginBottom: 3 }}>Consulting</div>
                        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", lineHeight: 1.5 }}>Architecture that ages well.</div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,.03)", border: ".5px solid rgba(255,255,255,.07)", borderRadius: 6, padding: 11 }}>
                        <div style={{ fontSize: 8, letterSpacing: ".14em", color: "rgba(255,255,255,.2)", marginBottom: 6, fontVariantNumeric: "tabular-nums" as const, textTransform: "uppercase" as const }}>SVC_01</div>
                        <div style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(255,255,255,.8)", letterSpacing: "-.01em", marginBottom: 3 }}>Interface Design</div>
                        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", lineHeight: 1.5 }}>Intent-driven interfaces.</div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,.03)", border: ".5px solid rgba(255,255,255,.07)", borderRadius: 6, padding: 11 }}>
                        <div style={{ fontSize: 8, letterSpacing: ".14em", color: "rgba(255,255,255,.2)", marginBottom: 6, fontVariantNumeric: "tabular-nums" as const, textTransform: "uppercase" as const }}>SVC_02</div>
                        <div style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(255,255,255,.8)", letterSpacing: "-.01em", marginBottom: 3 }}>Engineering</div>
                        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,.28)", lineHeight: 1.5 }}>Production-grade, not demos.</div>
                    </div>

                    <div style={{ gridColumn: "1/4", background: "rgba(255,255,255,.02)", border: ".5px solid rgba(255,255,255,.06)", borderRadius: 6, padding: "9px 13px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,.22)", letterSpacing: ".04em" }}>Stack</span>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                            {["Next.js", "TypeScript", "Postgres", "Figma", "Vercel"].map(tag => (
                                <span key={tag} style={{ fontSize: 7.5, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.3)", border: ".5px solid rgba(255,255,255,.1)", padding: "2px 6px", borderRadius: 10 }}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "auto", padding: "7px 20px", borderTop: ".5px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(8,8,7,.5)" }}>
                    <span style={{ fontSize: 7.5, textTransform: "uppercase" as const, letterSpacing: ".2em", color: "rgba(255,255,255,.18)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" as const }}>Meridian Studio - Cairo, EG</span>
                    <div style={{ flex: 1, height: .5, background: "rgba(255,255,255,.06)" }} />
                    <span style={{ fontSize: 7.5, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(37,99,235,.7)", border: ".5px solid rgba(37,99,235,.3)", padding: "2px 7px", borderRadius: 10 }}>v2.4.1</span>
                </div>
            </div>
        </>
    )
}