"use client"

import { useInjectStyles } from "@/lib/dom-utils"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { memo, useCallback, useEffect, useRef, useState } from "react"

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

const MONO = "var(--font-geist-mono), ui-monospace, 'SFMono-Regular', monospace"
const SERIF = "Georgia, 'Times New Roman', serif"

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

  .ps-header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }

  .ps-tabs-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

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

  /* ── Mobile ───────────────────────────────────────────────────────── */
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

  /* ── Tablet ───────────────────────────────────────────────────────── */
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

  /* ── RTL ──────────────────────────────────────────────────────────── */
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
    font-family: 'Noto Kufi Arabic', 'IBM Plex Arabic', 'Tajawal', sans-serif;
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

function splitHeadline(value: string) {
  if (!value.trim()) return { first: "", second: "" }

  const sentenceMatch = value.match(/^(.+[.!?])\s+(.+)$/)
  if (sentenceMatch) {
    return { first: sentenceMatch[1], second: sentenceMatch[2] }
  }

  const words = value.trim().split(/\s+/)
  if (words.length < 2) return { first: value, second: "" }
  const splitAt = Math.ceil(words.length / 2)
  return {
    first: words.slice(0, splitAt).join(" "),
    second: words.slice(splitAt).join(" "),
  }
}

interface StepItemProps {
  i: number
  active: number
  step: ProcessStep
  t: (key: string) => string
  onToggle: (i: number) => void
  C: CTokens
}

const ProcessStepItem = memo(function ProcessStepItem({
  i, active, step, t, onToggle, C,
}: StepItemProps) {
  const isOpen = active === i
  const isLast = i === steps.length - 1

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
        background: isOpen
          ? C.high.replace(/[\d.]+\)$/, "0.025)")
          : "transparent",
        transition: `background ${MOTION.duration.fast}s ease, border-color 0.4s ease`,
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(i)}
        className="ps-step-btn"
        aria-expanded={isOpen}
        aria-controls={`step-panel-${i}`}
      >
        <span
          className="ps-step-index"
          style={{
            fontFamily: MONO,
            fontSize: 13,
            letterSpacing: "0.15em",
            color: isOpen ? C.mid : C.muted,
            transition: `color ${MOTION.duration.instant}s ease`,
          }}
        >
          {step.index}
        </span>
        <span
          className="ps-step-title"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: isOpen ? C.high : C.mid,
            transition: `color ${MOTION.duration.instant}s ease`,
            textAlign: "start",
          }}
        >
          {t(`steps.${step.key}.title`)}
        </span>
        <span
          className="ps-step-toggle flex items-center justify-center shrink-0"
          style={{
            width: 28,
            height: 28,
            border: "1px solid",
            borderColor: isOpen ? C.borderHover : C.border,
            borderRadius: 999,
            transition: `border-color ${MOTION.duration.instant}s ease`,
          }}
        >
          <span
            className={isOpen ? "ps-toggle-icon-open" : ""}
            style={{
              fontFamily: MONO,
              fontSize: 14,
              color: isOpen ? C.mid : C.muted,
              lineHeight: 1,
              display: "block",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: `transform ${MOTION.duration.fast}s ${MOTION.ease.ui}, color ${MOTION.duration.instant}s ease`,
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
          transition: `grid-template-rows ${MOTION.duration.fast}s ${MOTION.ease.ui}`,
        }}
      >
        <div className="overflow-hidden">
          <div className="p-6">
            <p
              className="ps-step-description"
              style={{
                fontFamily: MONO,
                fontSize: 13,
                lineHeight: 1.85,
                color: C.low,
                transition: "color 0.4s ease",
              }}
            >
              {t(`steps.${step.key}.description`)}
            </p>

            <div className="ps-meta-grid">
              {[
                {
                  label: t("meta.deliverables"),
                  value: t(`steps.${step.key}.deliverables`),
                  large: false,
                },
                {
                  label: t("meta.timeline"),
                  value: t(`steps.${step.key}.timeline`),
                  large: true,
                },
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
                      fontFamily: MONO,
                      fontSize: 11,
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
                      fontFamily: large
                        ? "var(--font-outfit), sans-serif"
                        : MONO,
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
  const { resolvedTheme } = useTheme()
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  useInjectStyles("ps-styles", RESPONSIVE_CSS)

  const baseTokens: CTokens = (mounted && resolvedTheme === "dark") ? DARK_C : LIGHT_C
  const invertedTokens: CTokens = (mounted && resolvedTheme === "dark") ? LIGHT_C : DARK_C
  const C: CTokens = invertColors ? invertedTokens : baseTokens

  const { first: firstTitle, second: secondTitle } = splitHeadline(t("title"))
  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

  const handleToggle = useCallback((index: number) => {
    setActive(index)
  }, [])
  return (
    <div
      ref={sectionRef}
      id="process"
      className="relative box-border"
      style={{
        backgroundColor: "transparent",
        color: C.high,
        transition: "color 0.4s ease",
      }}
    >
      <div className="relative">
        <div data-process-header className="mb-14">
          <p
            ref={eyebrowRef}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.muted,
              marginBottom: 16,
              marginTop: 0,
              transition: "color 0.4s ease",
            }}
          >
            {t("eyebrow")}
          </p>
          <div className="ps-header-row">
            <h2
              ref={titleRef}
              className="ps-heading"
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: C.high,
                margin: 0,
                transition: "color 0.4s ease",
              }}
            >
              {firstTitle}
              {secondTitle ? (
                <>
                  <br />
                  <span
                    className="ps-heading-italic"
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      color: C.low,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {secondTitle}
                  </span>
                </>
              ) : null}
            </h2>
            <p
              ref={descRef}
              style={{
                fontFamily: MONO,
                fontSize: 13,
                lineHeight: 1.8,
                color: C.low,
                maxWidth: 260,
                margin: 0,
                transition: "color 0.4s ease",
              }}
            >
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div
          data-process-divider
          className="scale-x-0"
          style={{ height: 1, background: C.border, marginBottom: 4 }}
        />
        <div data-process-tabs className="ps-tabs-grid">
          {steps.map((step, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleToggle(i)}
              className="cursor-pointer text-center"
              style={{ all: "unset", cursor: "pointer", padding: "10px 0", textAlign: "center" }}
            >
              <div
                style={{
                  height: 2,
                  background: i <= active ? C.mid : C.border,
                  borderRadius: 2,
                  transition: `background ${MOTION.duration.fast}s ease`,
                  marginBottom: 10,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: i === active ? C.mid : C.muted,
                  transition: `color ${MOTION.duration.instant}s ease`,
                  display: "block",
                }}
              >
                {t(`steps.${step.key}.tag`)}
              </span>
            </button>
          ))}
        </div>
        <div
          data-process-grid
          className="overflow-hidden"
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 2,
            transition: "border-color 0.4s ease",
          }}
        >
          {steps.map((step, i) => (
            <ProcessStepItem
              key={i}
              i={i}
              active={active}
              step={step}
              t={t}
              onToggle={handleToggle}
              C={C}
            />
          ))}
        </div>
        <div
          data-process-footer
          className="ps-footer flex items-center gap-4 mt-6"
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.muted,
              transition: "color 0.4s ease",
            }}
          >
            {t("footer")}
          </span>
          <div className="flex-1" style={{ height: 1, background: C.border }} />
        </div>
      </div>
    </div>
  )
})