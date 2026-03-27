"use client"

import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { memo, useCallback, useState } from "react"
import { Container } from "../container"

const MONO = "var(--font-geist-mono), ui-monospace, 'SFMono-Regular', monospace"
const SERIF = "Georgia, 'Times New Roman', serif"

interface ProcessStep { index: string; key: string }

const steps: ProcessStep[] = [
  { index: "01", key: "step1" },
  { index: "02", key: "step2" },
  { index: "03", key: "step3" },
  { index: "04", key: "step4" },
]

function splitHeadline(value: string) {
  if (!value.trim()) return { first: "", second: "" }
  const sentenceMatch = value.match(/^(.+[.!?،])\s+(.+)$/)
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
}

const ProcessStepItem = memo(function ProcessStepItem({
  i, active, step, t, onToggle,
}: StepItemProps) {
  const isOpen = active === i
  const isLast = i === steps.length - 1

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : `1px solid var(--s-border)`,
        background: isOpen ? "var(--s-high-soft)" : "transparent",
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
            color: isOpen ? "var(--s-mid)" : "var(--s-muted)",
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
            color: isOpen ? "var(--s-high)" : "var(--s-mid)",
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
            borderColor: isOpen ? "var(--s-border-hover)" : "var(--s-border)",
            borderRadius: 999,
            transition: `border-color ${MOTION.duration.instant}s ease`,
          }}
        >
          <span
            className={isOpen ? "ps-toggle-icon-open" : ""}
            style={{
              fontFamily: MONO,
              fontSize: 14,
              color: isOpen ? "var(--s-mid)" : "var(--s-muted)",
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
                color: "var(--s-low)",
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
                    border: `1px solid var(--s-border)`,
                    borderRadius: 2,
                    background: "var(--s-high-soft)",
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
                      color: "var(--s-muted)",
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
                      color: large ? "var(--s-high)" : "var(--s-mid)",
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

export const ProcessSection = memo(function ProcessSection() {
  const t = useTranslations("process")
  const [active, setActive] = useState(0)

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
      id="process"
      className="relative pb-36"
      style={{ color: "var(--s-high)", transition: "color 0.4s ease" }}
    >
      <Container className="relative">
        <div className="mb-14">
          <p
            ref={eyebrowRef}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--s-muted)",
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
                color: "var(--s-high)",
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
                      color: "var(--s-low)",
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
                color: "var(--s-low)",
                maxWidth: 260,
                margin: 0,
                transition: "color 0.4s ease",
              }}
            >
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--s-border)", marginBottom: 4 }} />

        <div className="ps-tabs-grid">
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
                  background: i <= active ? "var(--s-mid)" : "var(--s-border)",
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
                  color: i === active ? "var(--s-mid)" : "var(--s-muted)",
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
          className="overflow-hidden"
          style={{
            border: `1px solid var(--s-border)`,
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
            />
          ))}
        </div>

        <div className="ps-footer flex items-center gap-4 mt-6">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--s-muted)",
              transition: "color 0.4s ease",
            }}
          >
            {t("footer")}
          </span>
          <div className="flex-1" style={{ height: 1, background: "var(--s-border)" }} />
        </div>
      </Container>
    </div>
  )
})