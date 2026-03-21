"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { localizeNumbers } from "@/lib/number"
import { useLocale, useTranslations } from "next-intl"
import { memo, useRef } from "react"
import { Container } from "../container"
import { MagneticButton } from "../magnetic-button"

export const AboutSection = memo(function AboutSection({
  scrollToSection
}: {
  scrollToSection?: (sectionId: string) => void
}) {
  const t = useTranslations()
  const locale = useLocale()
  const { isInitialLoadComplete } = useLoading()
  const sectionRef = useRef<HTMLElement>(null)

  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

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



  useGSAPSection({ trigger: sectionRef }, (context) => {
    if (!isInitialLoadComplete || !sectionRef.current) return

    const { reduced } = context.conditions as { reduced: boolean }
    const stats = sectionRef.current!.querySelectorAll<HTMLElement>("[data-stat]")
    if (!stats.length) return

    if (reduced) {
      gsap.set(stats, { opacity: 1, y: 0 })
      return
    }

    // Premium stats animation with number counting
    gsap.set(stats, { opacity: 0, y: 28, willChange: "transform, opacity" })

    ScrollTrigger.batch(stats, {
      start: "top 92%",
      once: true,
      interval: 0.12,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.text,
          stagger: 0.1,
          ease: MOTION.ease.smooth,
          onComplete() {
            gsap.set(batch, { willChange: "auto" })
          },
        })
        if (statsEnabled) {
          batch.forEach((stat, index) => {
            const valueEl = stat.querySelector("[data-stat-value]")
            if (!valueEl) return

            const finalValue = valueEl.textContent || ""
            const numericValue = parseInt(finalValue.replace(/\D/g, ""))
            if (isNaN(numericValue)) return
            const obj = { value: 0 }
            gsap.to(obj, {
              value: numericValue,
              duration: MOTION.duration.slow,
              delay: index * MOTION.stagger.loose + 0.2,
              ease: MOTION.ease.gentle,
              onUpdate() {
                valueEl.textContent = localizeNumbers(
                  finalValue.replace(/\d+/, Math.floor(obj.value).toString()),
                  locale,
                )
              },
            })
          })
        }
      },
    })
  }, [isInitialLoadComplete, locale, statsEnabled])

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
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-16 block">
          {t("about.eyebrow") ?? "About"}
        </p>
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <div>
              <h2
                  ref={titleRef}
                  className="font-sans font-normal text-primary mb-8 leading-[1.05]"
                  style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                >
                  {t("about.title")}
                  <br />
                  {t("about.title2")}
                  <br />
                  <span
                    className="text-primary/35"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
                  >
                    {t("about.title3")}
                  </span>
                </h2>
              <div ref={descRef} className="space-y-4">
                <p className="text-base text-primary/65 max-w-[44ch] leading-relaxed">
                  {t("about.description1")}
                </p>
                <p className="text-base text-primary/65 max-w-[44ch] leading-relaxed">
                  {t("about.description2")}
                </p>
                {/* <div className="mt-4 p-4 rounded-sm bg-foreground/3 border border-foreground/8">
                  <p className="text-sm text-primary/70 leading-relaxed">
                    {t("about.founderNote")}
                  </p>
                </div> */}
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
                className="group border-b border-foreground/8 py-8 grid gap-6"
                style={{ gridTemplateColumns: statsEnabled ? "120px 1fr" : "32px 1fr" }}
              >
                {statsEnabled ? (
                  <div
                    data-stat-value
                    className="font-sans font-light text-primary tabular-nums leading-none pt-0.5"
                    style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em" }}
                  >
                    {item.value}
                  </div>
                ) : (
                  <div className="pt-1.5">
                    <div className="h-px w-5 bg-foreground/8 group-hover:w-8 group-hover:bg-foreground/25 transition-all duration-400" />
                  </div>
                )}
                <div>
                  <p className="font-sans font-medium text-primary text-base mb-1">{item.label}</p>
                  <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.18em]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
})