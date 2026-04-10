"use client"

import { Container } from "@/components/container"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"

const INK = {
  red: "rgba(210, 68,  68,  0.82)",
  amber: "rgba(190, 145, 32,  0.78)",
  green: "rgba(42,  168, 100, 0.72)",
  gray: "rgba(105, 105, 105, 0.55)",
} as const

type InkColor = keyof typeof INK

interface StageAction {
  type: "underline" | "strike" | "highlight" | "note" | "connector"
  target: string
  delay: number
}
interface Stage { key: string; label: string; actions: StageAction[] }
interface Note { id: string; label: string; body: string; color: InkColor }

const D = (n: number) => `${Math.round(n * 1000)}ms`

export function ConsultingBriefSection() {
  const t = useTranslations("serviceDetails.consulting")
  const locale = useLocale()
  const isRtl = locale === "ar"

  const STAGES: Stage[] = useMemo(() => [
    {
      key: "discovery", label: t("brief.stages.discovery"),
      actions: [
        { type: "underline", target: "ul-release", delay: 0 },
        { type: "note", target: "note-symptom", delay: 280 },
        { type: "underline", target: "ul-monolith", delay: 520 },
      ],
    },
    {
      key: "audit", label: t("brief.stages.audit"),
      actions: [
        { type: "underline", target: "ul-decompose", delay: 0 },
        { type: "strike", target: "st-decompose", delay: 240 },
        { type: "note", target: "note-rflag", delay: 460 },
        { type: "connector", target: "conn-1", delay: 680 },
        { type: "note", target: "note-question", delay: 900 },
      ],
    },
    {
      key: "roadmap", label: t("brief.stages.roadmap"),
      actions: [
        { type: "underline", target: "ul-shareddb", delay: 0 },
        { type: "highlight", target: "hl-tracing", delay: 240 },
        { type: "note", target: "note-connected", delay: 460 },
        { type: "connector", target: "conn-2", delay: 680 },
        { type: "note", target: "note-finding", delay: 900 },
      ],
    },
    {
      key: "delivery", label: t("brief.stages.delivery"),
      actions: [
        { type: "underline", target: "ul-load", delay: 0 },
        { type: "highlight", target: "hl-release", delay: 240 },
        { type: "highlight", target: "hl-decompose", delay: 440 },
        { type: "note", target: "note-action", delay: 660 },
      ],
    },
  ], [t])

  const NOTES: Note[] = useMemo(() => [
    { id: "note-symptom", color: "red", label: t("brief.notes.symptom.label"), body: t("brief.notes.symptom.body") },
    { id: "note-rflag", color: "red", label: t("brief.notes.rflag.label"), body: t("brief.notes.rflag.body") },
    { id: "note-question", color: "amber", label: t("brief.notes.question.label"), body: t("brief.notes.question.body") },
    { id: "note-connected", color: "amber", label: t("brief.notes.connected.label"), body: t("brief.notes.connected.body") },
    { id: "note-finding", color: "green", label: t("brief.notes.finding.label"), body: t("brief.notes.finding.body") },
  ], [t])

  function getPrimaryNote(stageIndex: number): Note | null {
    if (stageIndex < 0) return null
    const noteActions = STAGES[stageIndex].actions.filter(a => a.type === "note")
    if (!noteActions.length) return null
    const id = noteActions[noteActions.length - 1].target
    return NOTES.find(n => n.id === id) ?? null
  }

  const collectTargets = useCallback((upToIndex: number): Set<string> => {
    const targets = new Set<string>()
    for (let i = 0; i <= upToIndex; i++) {
      STAGES[i].actions.forEach(a => targets.add(a.target))
    }
    return targets
  }, [STAGES])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const chevronAnim = useRef<gsap.core.Tween | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const currentStage = useRef(-1)

  const headerRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body })
  const headRef = useText({ ...DEFAULTS.heading, trigger: MOTION.trigger.late, delay: 0.15 })

  const [activeStage, setActiveStage] = useState(-1)
  const [scrollStage, setScrollStage] = useState(-1)
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )
  const [hintVisible, setHintVisible] = useState(true)
  const [activeTargets, setActiveTargets] = useState<Set<string>>(new Set())

  useIsomorphicLayoutEffect(() => {
    const el = progressBarRef.current
    if (!el) return
    el.style.willChange = "width"
    return () => { el.style.willChange = "auto" }
  }, [])

  useEffect(() => {
    const el = chevronRef.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      chevronAnim.current = gsap.to(el, { y: -3, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" })
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    if (!hintVisible) { chevronAnim.current?.kill(); chevronAnim.current = null }
  }, [hintVisible])

  const goStage = useCallback((index: number) => {
    if (index === currentStage.current) return
    tlRef.current?.kill()
    const prev = currentStage.current
    currentStage.current = index
    setActiveStage(index)
    setHintVisible(false)

    if (index > prev) {
      if (index - prev > 1) {
        const skipped = collectTargets(index - 1)
        setActiveTargets(current => {
          const next = new Set(current)
          skipped.forEach(t => next.add(t))
          return next
        })
      }
      const tl = gsap.timeline()
      STAGES[index].actions.forEach(action => {
        tl.call(
          () => setActiveTargets(current => new Set(current).add(action.target)),
          undefined,
          action.delay / 1000,
        )
      })
      tlRef.current = tl
    } else {
      setActiveTargets(new Set())
      const tl = gsap.timeline({ delay: 0.032 })
      tl.call(() => setActiveTargets(collectTargets(index)))
      tlRef.current = tl
    }
  }, [STAGES, collectTargets])

  useIsomorphicLayoutEffect(() => {
    if (!mounted || !wrapperRef.current || !stickyRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current!,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current!,
        pinSpacing: false,
        onEnter: () => { },
        onLeave: () => { },
        onEnterBack: () => { },
        onLeaveBack: () => { setScrollStage(-1) },
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`
          }
          setScrollStage(
            self.progress <= 0 ? -1 : Math.min(3, Math.floor(self.progress * 4))
          )
        },
      })
    }, wrapperRef)
    return () => { tlRef.current?.kill(); ctx.revert() }
  }, [mounted])

  useEffect(() => {
    if (scrollStage < 0) {
      const resetId = window.requestAnimationFrame(() => {
        tlRef.current?.kill()
        currentStage.current = -1
        setActiveStage(-1)
        setHintVisible(true)
        setActiveTargets(new Set())
      })
      return () => window.cancelAnimationFrame(resetId)
    }

    const stageId = window.requestAnimationFrame(() => {
      goStage(scrollStage)
    })

    return () => window.cancelAnimationFrame(stageId)
  }, [scrollStage, goStage])

  const a = activeTargets
  const mobileNote = getPrimaryNote(activeStage)
  const showMobileCard = activeStage >= 0 && !!mobileNote

  return (
    <>
      <style>{`
        .cb-phrase { position: relative; display: inline-block; }

        .cb-underline { opacity: 0; }
        .cb-underline path {
          fill: none;
          stroke-dasharray:  var(--path-len, 9999);
          stroke-dashoffset: var(--path-len, 9999);
        }
        .cb-underline.drawn { opacity: 1; }
        .cb-underline.drawn path {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.62s cubic-bezier(0.2, 0, 0, 1);
        }

        .cb-strike {
          position: absolute; top: 50%; left: 0; right: 0;
          height: 1.5px; pointer-events: none;
          background: color-mix(in srgb, hsl(var(--foreground)) 45%, transparent);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1);
        }
        [dir="rtl"] .cb-strike { transform-origin: right; }
        .cb-strike.drawn { transform: scaleX(1); }

        .cb-hl {
          border-radius: 2px; padding: 0 1px;
          transition: background 0.52s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .cb-hl.drawn { background: rgba(190, 145, 32, 0.14); }

        .cb-conn {
          stroke-dasharray:  var(--path-len, 9999);
          stroke-dashoffset: var(--path-len, 9999);
          opacity: 0;
          transition:
            opacity           0.22s ease,
            stroke-dashoffset 1.1s  cubic-bezier(0.4, 0, 0.2, 1) 0.22s;
        }
        .cb-conn.drawn { stroke-dashoffset: 0; opacity: 1; }

        .cb-note {
          opacity: 0;
          transform: translateX(9px);
          filter: blur(4px);
          transition:
            opacity   0.44s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.44s cubic-bezier(0.16, 1, 0.3, 1),
            filter    0.44s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        [dir="rtl"] .cb-note { transform: translateX(-9px); }
        .cb-note.shown { opacity: 1; transform: translateX(0); filter: blur(0px); }

        @media (prefers-reduced-motion: reduce) {
          .cb-underline path, .cb-strike, .cb-hl, .cb-conn, .cb-note {
            transition: none !important; filter: none !important;
          }
          .cb-underline.drawn path { stroke-dashoffset: 0; }
          .cb-strike.drawn         { transform: scaleX(1); }
          .cb-conn.drawn           { stroke-dashoffset: 0; opacity: 1; }
          .cb-note.shown           { opacity: 1; transform: translateX(0); }
        }

        .cb-sticky-inner {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100dvh;
        }

        .cb-doc-grid {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
        }
        @media (min-width: 768px) {
          .cb-doc-grid { grid-template-columns: 1fr clamp(172px, 22vw, 320px); }
        }
        @media (min-width: 1024px) {
          .cb-doc-grid { grid-template-columns: 1fr clamp(200px, 20vw, 300px); }
        }

        .cb-stage-abbr { display: inline; }
        .cb-stage-full { display: none; }
        @media (min-width: 480px) {
          .cb-stage-abbr { display: none; }
          .cb-stage-full { display: inline; }
        }

        .cb-body-text {
          font-size: clamp(11px, 1.05vw, 14px);
          line-height: 1.88;
        }
        @media (max-width: 479px) {
          .cb-body-text { font-size: 11px; line-height: 1.6; }
        }

        .cb-mobile-note {
          display: block;
          margin-top: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity   0.38s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .cb-mobile-note.shown {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        @media (min-width: 768px) {
          .cb-mobile-note { display: none; }
        }
      `}</style>

      <div ref={wrapperRef} style={{ height: "415vh" }} id="brief" className="p-0 m-0 w-full">
        <Container>
          <div ref={stickyRef} className="cb-sticky-inner pt-(--section-y-top) pb-(--section-y-bottom)">

            <div ref={headerRef} style={{ flexShrink: 0, marginBottom: "clamp(6px, 1.2vh, 20px)" }}>
              <p className="font-mono text-sm leading-normal tracking-wider uppercase text-foreground/40 mb-2 md:mb-3 block">
                {t("brief.eyebrow")}
              </p>
              <div className="flex items-end justify-between gap-4 md:gap-6 flex-wrap">
                <h2
                  ref={headRef}
                  className="font-sans font-normal text-foreground leading-[1.05]"
                  style={{ fontSize: "clamp(20px, 3.2vw, 48px)", letterSpacing: "-0.022em" }}
                >
                  {t("brief.title")}
                  <br />
                  <span className="font-serif italic font-light rtl:font-sans rtl:not-italic rtl:font-bold text-foreground/45">
                    {t("brief.titleItalic")}
                  </span>
                </h2>
                <p className="font-mono text-sm leading-normal tracking-wider text-foreground/45 max-w-[38ch] hidden lg:block">
                  {t("brief.subtitle")}
                </p>
              </div>
            </div>

            <div
              className="flex border border-foreground/12 overflow-hidden"
              style={{
                flexShrink: 0,
                marginBottom: "clamp(4px, 0.8vh, 12px)",
                opacity: mounted ? 1 : 0,
                transition: `opacity ${D(MOTION.duration.base)}`,
              }}
            >
              {STAGES.map((s, i) => (
                <button
                  key={s.key}
                  className="flex-1 relative font-mono text-sm leading-normal tracking-wider uppercase"
                  style={{
                    padding: "8px 4px",
                    fontSize: "clamp(9px, 0.80vw, 14px)",
                    letterSpacing: "0.12em",
                    background: i === activeStage
                      ? "color-mix(in srgb, hsl(var(--foreground)) 6%, transparent)"
                      : "transparent",
                    color: i <= activeStage
                      ? "hsl(var(--foreground))"
                      : "color-mix(in srgb, hsl(var(--foreground)) 28%, transparent)",
                    borderRight: i < STAGES.length - 1
                      ? "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 10%, transparent)"
                      : "none",
                    transition: "color 0.22s cubic-bezier(0.4,0,0.2,1), background 0.28s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  aria-current={i === activeStage ? "step" : undefined}
                  onClick={() => goStage(i)}
                >
                  <span
                    className="absolute inset-x-0 bottom-0"
                    style={{
                      height: "1.5px",
                      background: "hsl(var(--foreground))",
                      transformOrigin: isRtl ? "right" : "left",
                      transform: i <= activeStage ? "scaleX(1)" : "scaleX(0)",
                      transition: i === activeStage ? `transform 0.48s ${MOTION.ease.smooth}` : "none",
                    }}
                  />
                  <span className="cb-stage-abbr">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cb-stage-full">{s.label}</span>
                </button>
              ))}
            </div>

            {mounted && (
              <div style={{ width: "100%" }}>
                <div className="cb-doc-grid border border-foreground/12">

                  <div
                    className="relative p-3 sm:p-4 md:p-5 lg:p-7"
                    style={{
                      borderRight: isRtl ? "none" : "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 10%, transparent)",
                      borderLeft: isRtl ? "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 10%, transparent)" : "none",
                    }}
                  >
                    <ConnectorsSvg conn1Drawn={a.has("conn-1")} conn2Drawn={a.has("conn-2")} />
                    <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
                      <span
                        className="font-mono text-sm leading-normal tracking-wider text-foreground/45"
                        style={{ fontSize: "clamp(8px, 0.75vw, 12px)", textTransform: "uppercase", letterSpacing: "0.2em" }}
                      >
                        {t("brief.docMeta")}
                      </span>
                      <span
                        className="font-mono text-sm leading-normal tracking-wider text-foreground/35 hidden sm:block"
                        style={{ fontSize: "clamp(8px, 0.75vw, 12px)", textTransform: "uppercase", letterSpacing: "0.18em" }}
                      >
                        {t("brief.docRef")}
                      </span>
                    </div>
                    <p
                      className="font-mono text-sm leading-normal tracking-wider text-foreground/55 mb-2 md:mb-3 lg:mb-4 pb-2 md:pb-3"
                      style={{
                        fontSize: "clamp(9px, 0.80vw, 14px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        borderBottom: "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 8%, transparent)",
                      }}
                    >
                      {t("brief.docTitle")}
                    </p>
                    <div className="cb-body-text text-muted-foreground space-y-2 md:space-y-3">
                      <p>
                        {t("brief.body.p1")}{" "}
                        <span className="cb-phrase">
                          <span className={`cb-hl${a.has("hl-release") ? " drawn" : ""}`}>
                            {t("brief.body.p1_hl1")}
                          </span>
                          <BriefUnderline id="ul-release" color={INK.red} drawn={a.has("ul-release")} />
                        </span>{" "}
                        {t("brief.body.p1_extra")}{" "}
                        <span className="cb-phrase">
                          {t("brief.body.p1_hl2")}
                          <BriefUnderline id="ul-monolith" color={INK.red} drawn={a.has("ul-monolith")} />
                        </span>
                      </p>
                      <p>
                        {t("brief.body.p2")}{" "}
                        <span style={{ position: "relative" }}>
                          <span className={`cb-hl${a.has("hl-decompose") ? " drawn" : ""}`}>
                            {t("brief.body.p2_hl")}{" "}
                          </span>
                          <span className="cb-phrase">
                            <span className={`cb-hl${a.has("hl-decompose") ? " drawn" : ""}`}>
                              {t("brief.body.p2_strike")}
                            </span>
                            <BriefUnderline id="ul-decompose" color={INK.red} drawn={a.has("ul-decompose")} />
                          </span>
                          <span
                            className={`cb-strike${a.has("st-decompose") ? " drawn" : ""}`}
                            style={{ left: 0, right: 0 }}
                          />
                        </span>{" "}
                        {t("brief.body.p2_extra")}
                      </p>
                      <p>
                        {t("brief.body.p3")}{" "}
                        <span className="cb-phrase">
                          {t("brief.body.p3_hl")}
                          <BriefUnderline id="ul-shareddb" color={INK.amber} drawn={a.has("ul-shareddb")} />
                        </span>{" "}
                        {t("brief.body.p3_extra")}{" "}
                        <span className={`cb-hl${a.has("hl-tracing") ? " drawn" : ""}`}>
                          {t("brief.body.p3_tracing")}
                        </span>
                      </p>
                      <p>
                        {t("brief.body.p4")}{" "}
                        <span className="cb-phrase">
                          {t("brief.body.p4_hl")}
                          <BriefUnderline id="ul-load" color={INK.green} drawn={a.has("ul-load")} />
                        </span>{" "}
                        {t("brief.body.p4_extra")}
                      </p>
                    </div>
                  </div>

                  <div
                    className="hidden md:flex flex-col"
                    style={{
                      background: "color-mix(in srgb, hsl(var(--foreground)) 3.5%, transparent)",
                    }}
                  >
                    <div
                      className="flex-none px-3 pt-3 pb-2"
                      style={{ borderBottom: "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 8%, transparent)" }}
                    >
                      <p
                        className="font-mono text-sm leading-normal tracking-wider text-foreground/30"
                        style={{ fontSize: "clamp(8px, 0.7vw, 10px)", textTransform: "uppercase", letterSpacing: "0.2em" }}
                      >
                        {t("brief.annotationsLabel")}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(4px, 0.6vh, 10px)",
                        padding: "clamp(6px, 1vh, 14px)",
                      }}
                    >
                      {NOTES.map(note => (
                        <BriefNote key={note.id} note={note} shown={a.has(note.id)} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {mobileNote && (
              <div
                className={`cb-mobile-note${showMobileCard ? " shown" : ""}`}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "3px",
                    borderTop: "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 12%, transparent)",
                    borderRight: "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 12%, transparent)",
                    borderBottom: "0.5px solid color-mix(in srgb, hsl(var(--foreground)) 12%, transparent)",
                    borderLeft: isRtl ? "none" : `3px solid ${INK[mobileNote.color]}`,
                    borderRightColor: isRtl ? INK[mobileNote.color] : undefined,
                    borderRightWidth: isRtl ? "3px" : undefined,
                    background: "hsl(var(--background))",
                  }}
                >
                  <p
                    className="font-mono text-sm leading-normal tracking-wider mb-1.5"
                    style={{ fontSize: "7px", textTransform: "uppercase", letterSpacing: ".18em", color: INK[mobileNote.color] }}
                  >
                    {mobileNote.label}
                  </p>
                  <p style={{ fontSize: "clamp(12px, 3.2vw, 13px)", color: "color-mix(in srgb, hsl(var(--foreground)) 68%, transparent)", lineHeight: 1.6 }}>
                    {mobileNote.body}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className="mt-2 md:mt-3 text-center overflow-hidden"
            style={{
              flexShrink: 0,
              opacity: hintVisible ? 1 : 0,
              transition: `opacity ${D(MOTION.duration.slow)}`,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <p
              className="font-mono text-sm leading-normal tracking-wider text-foreground/35 inline-flex items-center gap-1.5 whitespace-nowrap"
              style={{ fontSize: "clamp(8px, 0.75vw, 10px)", textTransform: "uppercase", letterSpacing: "0.2em" }}
            >
              <span className="hidden sm:inline">scroll to read through the engagement</span>
              <span className="sm:hidden">scroll to explore</span>
              <svg ref={chevronRef} width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <polyline points="1,1 5,5 1,9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}

function BriefUnderline({ id, color, drawn }: { id: string; color: string; drawn: boolean }) {
  const pathRef = useRef<SVGPathElement>(null)
  useIsomorphicLayoutEffect(() => {
    const p = pathRef.current
    if (!p) return
    try { p.style.setProperty("--path-len", String(Math.ceil(p.getTotalLength()))) }
    catch { }
  }, [])
  return (
    <svg
      id={id}
      className={`cb-underline${drawn ? " drawn" : ""}`}
      style={{ position: "absolute", bottom: "-2px", left: 0, width: "100%", height: "3px", overflow: "visible", pointerEvents: "none" }}
      viewBox="0 0 100 3"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path ref={pathRef} d="M0 1.5 Q50 3 100 1.5" stroke={color} strokeWidth={1.6} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function ConnectorsSvg({ conn1Drawn, conn2Drawn }: { conn1Drawn: boolean; conn2Drawn: boolean }) {
  const conn1Ref = useRef<SVGPathElement>(null)
  const conn2Ref = useRef<SVGPathElement>(null)
  useIsomorphicLayoutEffect(() => {
    for (const ref of [conn1Ref, conn2Ref]) {
      const p = ref.current
      if (!p) continue
      try { p.style.setProperty("--path-len", String(Math.ceil(p.getTotalLength()))) }
      catch { }
    }
  }, [])
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "hidden" }}
      viewBox="0 0 420 280"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path ref={conn1Ref} id="conn-1" className={`cb-conn${conn1Drawn ? " drawn" : ""}`} d="M 58 66 C 95 82, 172 95, 58 126" fill="none" stroke={INK.gray} strokeWidth={0.8} />
      <path ref={conn2Ref} id="conn-2" className={`cb-conn${conn2Drawn ? " drawn" : ""}`} d="M 198 165 C 235 185, 198 208, 120 226" fill="none" stroke={INK.gray} strokeWidth={0.8} />
    </svg>
  )
}

function BriefNote({ note, shown }: { note: Note; shown: boolean }) {
  return (
    <div
      id={note.id}
      className={`cb-note${shown ? " shown" : ""}`}
      style={{ padding: "8px 11px", borderRadius: "4px", borderLeft: `2px solid ${INK[note.color]}`, background: "hsl(var(--background))" }}
    >
      <p
        className="font-mono text-sm leading-normal tracking-wider mb-1"
        style={{ fontSize: "clamp(7px, 0.72vw, 10px)", textTransform: "uppercase", letterSpacing: ".18em", color: INK[note.color] }}
      >
        {note.label}
      </p>
      <p style={{ fontSize: "clamp(10px, 0.88vw, 13px)", color: "color-mix(in srgb, hsl(var(--foreground)) 62%, transparent)", lineHeight: 1.6 }}>
        {note.body}
      </p>
    </div>
  )
}