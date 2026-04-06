"use client"

import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { memo, useCallback, useState } from "react"
import { Container } from "../container"

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
  if (sentenceMatch) return { first: sentenceMatch[1], second: sentenceMatch[2] }
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
      className={`transition-colors duration-300 ${isOpen ? "bg-surface" : "bg-transparent"}`}
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={() => onToggle(i)}
        className="ps-step-btn w-full flex items-center gap-4 px-6 py-5 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`step-panel-${i}`}
      >
        {/* Step index */}
        <span
          className={`font-mono text-[13px] tracking-[0.15em] shrink-0 transition-colors duration-200 ${
            isOpen ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {step.index}
        </span>

        {/* Step title */}
        <span
          className={`font-serif italic flex-1 text-start transition-colors duration-200 ${
            isOpen ? "text-foreground" : "text-muted-foreground"
          }`}
          style={{ fontSize: "clamp(16px, 2.5vw, 22px)", letterSpacing: "-0.02em" }}
        >
          {t(`steps.${step.key}.title`)}
        </span>

        {/* Toggle icon */}
        <span
          className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-full border transition-colors duration-200 ${
            isOpen ? "border-border-mid" : "border-border"
          }`}
        >
          <span
            className={`font-mono text-sm block leading-none transition-transform duration-300 ${
              isOpen ? "rotate-45 text-foreground" : "rotate-0 text-muted-foreground"
            }`}
          >
            +
          </span>
        </span>
      </button>

      {/* Expandable panel */}
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
            <p className="font-mono text-[13px] leading-[1.85] text-muted-foreground">
              {t(`steps.${step.key}.description`)}
            </p>

            <div className="ps-meta-grid grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {[
                { label: t("meta.deliverables"), value: t(`steps.${step.key}.deliverables`), large: false },
                { label: t("meta.timeline"), value: t(`steps.${step.key}.timeline`), large: true },
              ].map(({ label, value, large }) => (
                <div
                  key={label}
                  className="p-5 border border-border rounded-sm bg-surface"
                >
                  <p className="meta-eyebrow text-muted-foreground mb-2.5">
                    {label}
                  </p>
                  <p
                    className={
                      large
                        ? "text-[18px] font-medium text-foreground leading-[1.2] tracking-tight font-sans"
                        : "font-mono text-xs text-muted-foreground leading-[1.7]"
                    }
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
  const titleRef = useText<HTMLHeadingElement>({ ...DEFAULTS.heading, ease: MOTION.ease.text })
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

  const handleToggle = useCallback((index: number) => setActive(index), [])

  return (
    <div id="process" className="relative pb-36 section-padding">
      <Container className="relative">

        {/* Section header */}
        <div className="mb-14">
          <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground mb-4">
            {t("eyebrow")}
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <h2
              ref={titleRef}
              className="display-h2 font-normal text-foreground m-0"
            >
              {firstTitle}
              {secondTitle ? (
                <>
                  <br />
                  <span className="font-serif italic text-muted-foreground">
                    {secondTitle}
                  </span>
                </>
              ) : null}
            </h2>
            <p ref={descRef} className="font-mono text-[13px] leading-[1.8] text-muted-foreground max-w-[260px] m-0">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Top divider */}
        <div className="h-px bg-border mb-1" />

        {/* Step progress tabs */}
        <div className="grid grid-cols-4 gap-0 mb-1">
          {steps.map((step, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleToggle(i)}
              className="cursor-pointer p-0 bg-transparent border-none text-center py-2.5"
            >
              <div
                className="h-0.5 rounded-[2px] mb-2.5 transition-colors duration-300"
                style={{ background: i <= active ? "var(--brand)" : "var(--border)" }}
              />
              <span className={`meta-eyebrow block transition-colors duration-200 ${
                i === active ? "text-foreground" : "text-muted-foreground"
              }`}>
                {t(`steps.${step.key}.tag`)}
              </span>
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="overflow-hidden border border-border rounded-sm">
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

        {/* Footer */}
        <div className="flex items-center gap-4 mt-6">
          <span className="meta-eyebrow text-muted-foreground">
            {t("footer")}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

      </Container>
    </div>
  )
})