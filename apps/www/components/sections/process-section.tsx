/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Container } from "@/components/container"
import { useLoading } from "@/components/providers/loading-provider"
import { ANIM } from "@/lib/animation-utils"
import { useInjectStyles } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react"

const DARK_C = {
  high: "rgba(250, 250, 250, 0.92)",
  mid: "rgba(255, 255, 255, 0.55)",
  low: "rgba(255, 255, 255, 0.35)",
  muted: "rgba(255, 255, 255, 0.20)",
  border: "rgba(255, 255, 255, 0.08)",
  borderHover: "rgba(255, 255, 255, 0.14)",
} as const

const LIGHT_C = {
  high: "rgba(10,  10,  10,  0.92)",
  mid: "rgba(0,   0,   0,   0.60)",
  low: "rgba(0,   0,   0,   0.42)",
  muted: "rgba(0,   0,   0,   0.25)",
  border: "rgba(0,   0,   0,   0.10)",
  borderHover: "rgba(0,   0,   0,   0.20)",
} as const

type CTokens = typeof DARK_C | typeof LIGHT_C
interface ProcessStep { index: string; key: string }

const steps: ProcessStep[] = [
  { index: "01", key: "step1" },
  { index: "02", key: "step2" },
  { index: "03", key: "step3" },
  { index: "04", key: "step4" },
]

const RESPONSIVE_CSS = `
  /* Process Section – Responsive + RTL/LTR Support */

  .ps-section {
    padding: clamp(32px, 6vw, 80px) clamp(16px, 5vw, 56px);
    box-sizing: border-box;
    position: relative;
    transition: color 0.4s ease;
  }

  /* Header layout */
  .ps-header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }

  /* Tabs grid */
  .ps-tabs-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

  /* Step button */
  .ps-step-btn {
    all: unset;
    cursor: pointer;
    width: 100%;
    display: grid;
    grid-template-columns: 72px 1fr auto;
    align-items: center;
    gap: 24px;
    padding: 24px 32px;
    box-sizing: border-box;
  }

  /* Deliverables/Timeline cards */
  .ps-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding-inline-start: 72px;
    max-width: 620px;
  }

  .ps-step-description {
    padding-inline-start: 72px;
    max-width: 580px;
    margin-bottom: 28px;
  }

  /* ── Mobile (max 640px) ─────────────────────────────── */
  @media (max-width: 640px) {
    .ps-tabs-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .ps-step-btn {
      grid-template-columns: 40px 1fr auto;
      gap: 12px;
      padding: 16px;
    }

    .ps-step-description,
    .ps-meta-grid {
      padding-inline-start: 0;
      max-width: 100%;
    }

    .ps-meta-grid {
      grid-template-columns: 1fr;
    }

    .ps-header-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .ps-step-content {
      padding: 0 16px 24px !important;
    }
  }

  /* ── Tablet (641 – 1024px) ──────────────────────────── */
  @media (min-width: 641px) and (max-width: 1024px) {
    .ps-step-btn {
      grid-template-columns: 48px 1fr auto;
      gap: 14px;
      padding: 20px;
    }

    .ps-step-description,
    .ps-meta-grid {
      padding-inline-start: 62px;
    }

    .ps-step-content {
      padding: 0 20px 28px !important;
    }
  }

  /* ── RTL Support ───────────────────────────────────── */

  [dir="rtl"] .ps-footer {
    flex-direction: row-reverse;
  }

  [dir="rtl"] .ps-header-row {
    flex-direction: row-reverse;
    text-align: right;
  }

  [dir="rtl"] .ps-heading,
  [dir="rtl"] .ps-heading-italic {
    font-family: 'Noto Naskh Arabic', 'Amiri', 'Scheherazade New', serif;
    font-style: normal;
    letter-spacing: 0;
  }

  [dir="rtl"] .ps-step-description,
  [dir="rtl"] .ps-meta-label,
  [dir="rtl"] .ps-meta-value-sm {
    font-family: 'Noto Kufi Arabic', 'IBM Plex Arabic', 'Tajawal', monospace;
    line-height: 2;
    letter-spacing: 0;
  }

  .ps-step-index {
    unicode-bidi: embed;
    direction: ltr;
    text-align: center;
  }

  [dir="rtl"] .ps-toggle-icon-open {
    transform: rotate(-45deg) !important;
  }
`

interface StepItemProps {
  i: number
  active: number
  step: ProcessStep
  t: any
  C: CTokens
  onToggle: (i: number) => void
}

const ProcessStepItem = memo(function ProcessStepItem({
  i, active, step, t, C, onToggle
}: StepItemProps) {
  const isOpen = active === i
  const isLast = i === steps.length - 1
  return (
    <div
      style={{
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
        background: isOpen ? C.high.replace(/[\d.]+\)$/, "0.025)") : "transparent",
        transition: `background ${ANIM.duration.sm}s ease, border-color 0.4s ease`,
      }}
    >
      <button
        onClick={() => onToggle(i)}
        className="ps-step-btn"
      >
        <span
          className="ps-step-index"
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.15em",
            color: isOpen ? C.mid : C.muted,
            transition: `color ${ANIM.duration.xs}s ease`,
          }}
        >
          {step.index}
        </span>
        <span
          className="ps-step-title"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: isOpen ? C.high : C.mid,
            transition: `color ${ANIM.duration.xs}s ease`,
            textAlign: "start",
          }}
        >
          {t(`steps.${step.key}.title`)}
        </span>
        <span
          className="ps-step-toggle"
          style={{
            width: 28,
            height: 28,
            border: "1px solid",
            borderColor: isOpen ? C.borderHover : C.border,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: `border-color ${ANIM.duration.xs}s ease`,
          }}
        >
          <span
            className={isOpen ? "ps-toggle-icon-open" : ""}
            style={{
              fontSize: 14,
              color: isOpen ? C.mid : C.muted,
              lineHeight: 1,
              display: "block",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.3s ease",
            }}
          >
            +
          </span>
        </span>
      </button>

      <div
        id={`step-panel-${i}`}
        role="region"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="p-6">
            <p
              className="ps-step-description"
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                lineHeight: 1.85,
                color: C.low,
                transition: "color 0.4s ease",
              }}
            >
              {t(`steps.${step.key}.description`)}
            </p>
            <div className="ps-meta-grid">
              {[
                { label: t("meta.deliverables"), value: t(`steps.${step.key}.deliverables`), large: false },
                { label: t("meta.timeline"), value: t(`steps.${step.key}.timeline`), large: true },
              ].map(({ label, value, large }) => (
                <div
                  key={label}
                  className="ps-meta-card"
                  style={{
                    padding: "20px 24px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 2,
                    background: C.high.replace(/[\d.]+\)$/, "0.02)"),
                    transition: "border-color 0.4s ease, background 0.4s ease",
                  }}
                >
                  <p
                    className="ps-meta-label"
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: C.muted,
                      marginBottom: 10,
                      marginTop: 0,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className={large ? undefined : "ps-meta-value-sm"}
                    style={{
                      fontFamily: large ? "Georgia, serif" : "monospace",
                      fontSize: large ? 18 : 12,
                      fontWeight: large ? 500 : 400,
                      letterSpacing: large ? "-0.02em" : "normal",
                      lineHeight: large ? 1.2 : 1.7,
                      color: large ? C.high : C.mid,
                      margin: 0,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

interface ProcessSectionProps {
  invertColors?: boolean
}

export const ProcessSection = memo(function ProcessSection({ invertColors = false }: ProcessSectionProps) {
  const t = useTranslations("process")
  const locale = useLocale()
  const { isInitialLoadComplete } = useLoading()
  const { resolvedTheme } = useTheme()
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useInjectStyles("ps-styles", RESPONSIVE_CSS)

  const baseTokens: CTokens = resolvedTheme === "dark" ? DARK_C : LIGHT_C
  const invertedTokens: CTokens = resolvedTheme === "dark" ? LIGHT_C : DARK_C
  const C: CTokens = invertColors ? invertedTokens : baseTokens

  const handleToggle = useCallback((index: number) => {
    setActive(index)
  }, [])

  useLayoutEffect(() => {
    if (!isInitialLoadComplete || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        }
      })

      // Premium header reveal with smooth easing
      tl.fromTo("[data-process-header]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }
      )

      // Divider line - smooth scale reveal
      tl.fromTo("[data-process-divider]",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)"
        },
        "-=0.7"
      )

      // Tabs - subtle fade up
      tl.fromTo("[data-process-tabs]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        },
        "-=0.5"
      )

      // Grid - smooth reveal
      tl.fromTo("[data-process-grid]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        },
        "-=0.5"
      )

      // Footer - gentle fade
      tl.fromTo("[data-process-footer]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)"
        },
        "-=0.5"
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isInitialLoadComplete])

  return (
    <div
      ref={sectionRef}
      id="process"
      style={{
        backgroundColor: "transparent",
        color: C.high,
        position: "relative",
        boxSizing: "border-box",
        transition: "color 0.4s ease",
      }}
    >
      <Container>
        <div style={{ margin: "0 auto", position: "relative" }}>

          <div data-process-header className="opacity-0" style={{ marginBottom: 56 }}>
            <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.muted, marginBottom: 16, marginTop: 0, transition: "color 0.4s ease" }}>
              {t("eyebrow")}
            </p>
            <div className="ps-header-row">
              <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05, color: C.high, margin: 0, transition: "color 0.4s ease" }}>
                {t("title").split(" ").slice(0, 3).join(" ")}
                <br />
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", color: C.low, transition: "color 0.4s ease" }}>
                  {t("title").split(" ").slice(3).join(" ")}
                </span>
              </h2>
              <p style={{ fontFamily: "monospace", fontSize: 14, lineHeight: 1.8, color: C.low, maxWidth: 260, margin: 0, transition: "color 0.4s ease" }}>
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div data-process-divider className="opacity-0 scale-x-0" style={{ height: 1, background: C.border, marginBottom: 4, transition: "background 0.4s ease" }} />

          <div data-process-tabs className="ps-tabs-grid opacity-0">
            {steps.map((step, i) => (
              <button key={i} onClick={() => handleToggle(i)} style={{ all: "unset", cursor: "pointer", padding: "10px 0", textAlign: "center" }}>
                <div style={{ height: 2, background: i <= active ? C.mid : C.border, borderRadius: 2, transition: `background ${ANIM.duration.sm}s ease`, marginBottom: 10 }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: i === active ? C.mid : C.muted, transition: `color ${ANIM.duration.xs}s ease`, display: "block" }}>
                  {t(`steps.${step.key}.tag`)}
                </span>
              </button>
            ))}
          </div>

          <div data-process-grid className="opacity-0" style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", transition: "border-color 0.4s ease" }}>
            {steps.map((step, i) => (
              <ProcessStepItem
                key={i}
                i={i}
                active={active}
                step={step}
                t={t}
                C={C}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <div data-process-footer className="opacity-0 ps-footer" style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.muted, transition: "color 0.4s ease" }}>
              {t("footer")}
            </span>
            <div style={{ flex: 1, height: 1, background: C.border, transition: "background 0.4s ease" }} />
          </div>
        </div>
      </Container>
    </div>
  )
})