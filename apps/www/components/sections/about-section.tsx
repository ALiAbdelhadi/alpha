"use client"

import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { memo, useRef } from "react"
import { Container } from "../container"
import { MagneticButton } from "../magnetic-button"

export const AboutSection = memo(function AboutSection({
  scrollToSection
}: {
  scrollToSection?: (sectionId: string) => void
}) {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
  const titleRef = useText(DEFAULTS.heading)
  const descRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.15,
    distance: MOTION.distance.sm,
  })
  const buttonsRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.element,
    ease: MOTION.ease.smooth,
    delay: 0.3,
  })

  const statsEnabled =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_STATS_ENABLED === "true"

  const items = statsEnabled
    ? [
      { value: t("about.stat1.value"), label: t("about.stat1.label"), sub: t("about.stat1.sublabel") },
      { value: t("about.stat2.value"), label: t("about.stat2.label"), sub: t("about.stat2.sublabel") },
      { value: t("about.stat3.value"), label: t("about.stat3.label"), sub: t("about.stat3.sublabel") },
    ]
    : [
      { value: null, label: t("about.values.bilingual.label"), sub: t("about.values.bilingual.sublabel") },
      { value: null, label: t("about.values.noTemplate.label"), sub: t("about.values.noTemplate.sublabel") },
      { value: null, label: t("about.values.outcome.label"), sub: t("about.values.outcome.sublabel") },
    ]

  return (
    <section
      suppressHydrationWarning
      id="about"
      ref={sectionRef}
      className="flex w-full items-center section-padding"
    >
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-3">
              <p ref={eyebrowRef} className="mono-uppercase text-muted-foreground/70 block">
                {t("about.eyebrow")}
              </p>
              <h2
                ref={titleRef}
                className="font-sans font-normal text-primary leading-[1.05] section-heading"
              >
                {t("about.title")}
                <br />
                {t("about.title2")}
                <br />
                <span className="block text-primary/35 font-display-serif">
                  {t("about.title3")}
                </span>
              </h2>
              <div ref={descRef} className="space-y-4">
                <p className="body text-primary/60 max-w-[44ch]">
                  {t("about.description1")}
                </p>
                <p className="body text-primary/60 max-w-[44ch]">
                  {t("about.description2")}
                </p>
              </div>
            </div>
            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.("contact")}>
                {t("about.ctaPrimary")}
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.("work")}>
                {t("about.ctaSecondary")}
              </MagneticButton>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="h-px w-full bg-foreground/8 mb-0" />
            {items.map((item, i) => (
              <div
                key={i}
                data-stat
                className="group border-b border-foreground/8 py-8"
              >
                <div className={statsEnabled
                  ? "grid grid-cols-[minmax(88px,120px)_1fr] gap-4 md:gap-6"
                  : "grid grid-cols-[24px_1fr] gap-4 md:gap-6"
                }>
                  {statsEnabled ? (
                    <div
                      data-stat-value
                      className="stat-value font-sans font-light text-primary tabular-nums leading-none pt-0.5"
                    >
                      {item.value}
                    </div>
                  ) : (
                    <div className="pt-3">
                      <div className="h-px w-5 bg-foreground/8 group-hover:w-8 group-hover:bg-foreground/25 transition-all duration-400" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="font-sans font-medium text-primary text-base">{item.label}</p>
                    <p className="mono-uppercase text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
})