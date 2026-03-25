"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Calendar } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef } from "react"


export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("cta")

  const eyebrowRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0 })
  const titleRef = useText({ ...DEFAULTS.heading, ease: MOTION.ease.text })
  const contentRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden section-padding"
      aria-label="Call to action"
    >
      <Container>
        <div className="h-px w-full bg-border mb-16" />
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] gap-12 items-start">
          <div className="min-w-0">
            <p ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-6 block">
              {t("eyebrow")}
            </p>
            <h2
              ref={titleRef}
              className="font-sans font-normal text-primary leading-[1.05]"
              style={{ fontSize: "clamp(30px, 5.5vw, 68px)", letterSpacing: "-0.025em" }}
            >
              {t("title")}
            </h2>
          </div>
          <div ref={contentRef} className="flex min-w-0 flex-col gap-6">
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/2.5 px-3 py-1.5 w-fit">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.15em]">
                {t("availability")}
              </span>
            </div>
            <div ref={ctaRef} className="flex flex-col gap-3">
              <Link href="/schedule">
                <MagneticButton
                  size="lg"
                  variant="primary"
                  className="group w-full justify-center"
                >
                  <span className="flex items-center gap-2">
                    {t("primaryAction")}
                    <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </span>
                </MagneticButton>
              </Link>
              <Link href="/how-we-work" className="w-full">
                <MagneticButton size="lg" variant="secondary" className="w-full justify-center">
                  <span className="flex items-center justify-center gap-2">
                    {t("secondaryAction")}
                    <svg
                      className="w-4 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:-rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </MagneticButton>
              </Link>
              <p className="font-mono text-xs text-muted-foreground/70 text-center pt-1 uppercase tracking-[0.15em]">
                {t("footnote")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}