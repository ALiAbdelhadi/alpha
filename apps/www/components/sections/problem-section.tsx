"use client"

import { Container } from "@/components/container"
import { ArrowLabel } from "@/components/directional-link"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { getCommercialCta } from "@/lib/commercial"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useLocale, useTranslations } from "next-intl"
import { memo, useRef } from "react"

const PAINS = [
  { number: "01", titleKey: "problem.issues.templates.title", bodyKey: "problem.issues.templates.description" },
  { number: "02", titleKey: "problem.issues.speed.title", bodyKey: "problem.issues.speed.description" },
  { number: "03", titleKey: "problem.issues.confusion.title", bodyKey: "problem.issues.confusion.description" },
  { number: "04", titleKey: "problem.issues.amateurs.title", bodyKey: "problem.issues.amateurs.description" },
]

export const ProblemSection = memo(function ProblemSection() {
  const t = useTranslations()
  const locale = useLocale()
  const auditCta = getCommercialCta(locale, "technicalAudit")

  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative border-y border-border bg-background section-padding"
    >
      <Container>
        <div className="max-w-3xl mb-12 space-y-4">
          <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground">
            01 — {t("problem.badge")}
          </p>
          <h2 ref={titleRef} className="display-h2 font-normal tracking-tight text-foreground">
            {t("problem.title.pre")}{" "}
            <span className="text-muted-foreground line-through decoration-border"> {t("problem.title.crossed")} </span>
            <br />
            <span className="italic font-serif text-muted-foreground">
              {t("problem.title.gradient")}
            </span>
          </h2>
          <p ref={descRef} className="body-copy text-muted-foreground max-w-2xl">
            {t("problem.subtitle")}
          </p>
          <MagneticButton asChild size="lg" variant="secondary" className="group w-fit">
            <Link href={auditCta.href}>
              <ArrowLabel>{auditCta.label}</ArrowLabel>
            </Link>
          </MagneticButton>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-border"
        >
          {PAINS.map((pain, i) => (
            <div
              key={pain.number}
              data-pain
              className={`
                group relative px-6 py-10 md:px-12 md:py-16 border-b border-border
                ${i % 2 === 0 ? "md:border-r md:rtl:border-r-0 md:rtl:border-l" : ""}
              `}
            >
              <div className="flex items-start gap-6 relative z-10">
                <span className="font-mono text-2xl tracking-widest text-muted-foreground mt-1.5">
                  {pain.number}
                </span>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-medium text-foreground tracking-tight">
                    {t(pain.titleKey)}
                  </h3>
                  <p className="body-secondary text-muted-foreground max-w-sm">
                    {t(pain.bodyKey)}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none bg-linear-to-br from-muted/50 to-transparent" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
})