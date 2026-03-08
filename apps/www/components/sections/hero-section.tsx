"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useLoading } from "@/components/providers/loading-provider"
import { useReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { Container } from "../container"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()

  const badgeRef = useReveal<HTMLDivElement>({
    direction: "up",
    duration: 0.6,
    distance: 15,
    delay: isInitialLoadComplete ? 0 : 9999,
  })

  const titleRef = useReveal<HTMLHeadingElement>({
    direction: "up",
    duration: 0.7,
    distance: 25,
    delay: isInitialLoadComplete ? 0.15 : 9999,
  })

  const descriptionRef = useReveal<HTMLParagraphElement>({
    direction: "up",
    duration: 1,
    distance: 20,
    delay: isInitialLoadComplete ? 0.25 : 9999,
  })

  const problemRef = useReveal<HTMLParagraphElement>({
    direction: "up",
    duration: 0.9,
    distance: 18,
    delay: isInitialLoadComplete ? 0.2 : 9999,
  })

  const buttonsRef = useReveal<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
    distance: 15,
    delay: isInitialLoadComplete ? 0.35 : 9999,
  })

  const scrollHintRef = useReveal<HTMLDivElement>({
    direction: "fade",
    duration: 0.6,
    delay: isInitialLoadComplete ? 0.45 : 9999,
  })

  return (
    <section
      id="home"
      className="relative flex w-full flex-col items-center justify-center section-padding"
      style={{ minHeight: '100vh' }}
      aria-label="Hero section"
    >
      <Container>
          <div
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <div className="h-1 w-1 rounded-full bg-foreground/40" />
          <p className="mono-uppercase text-primary/60">
            {t("hero.badge")}
          </p>
        </div>
          <h1
            ref={titleRef}
            className="mb-12 font-sans font-normal text-primary"
          >
            <span className="text-balance block">
              {t("hero.title")}
              <br />
              <span className="text-primary/70">{t("hero.title2")}</span>
            </span>
          </h1>
          <p
            ref={problemRef}
            className="mb-4 max-w-3xl body text-primary/80"
          >
            <span className="text-pretty">{t("hero.problem")}</span>
          </p>
          <p
            ref={descriptionRef}
            className="mb-12 max-w-3xl body-lg text-primary/85"
          >
            <span className="text-pretty">{t("hero.description")}</span>
          </p>
          <div ref={buttonsRef} className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-primary/70">
                {t("hero.availability")}
              </span>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={() => scrollToSection("contact")}
              aria-label={t("hero.ctaPrimary")}
              className="group"
            >
              <span className="flex items-center gap-2">
                {t("hero.ctaPrimary")}
                <svg
                  className="h-4 w-4 transition-transform duration-300 transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("work")}
              aria-label={t("hero.ctaSecondary")}
            >
              {t("hero.ctaSecondary")}
            </MagneticButton>
            </div>
          </div>
          <p className="mt-4 mono small text-primary/60">
            {t("hero.trust")}
          </p>
        <div
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="mono-uppercase text-primary/50">
              {t("hero.scrollHint")}
            </p>
            <div className="h-8 w-px bg-primary/20" />
          </div>
        </div>
      </Container>
    </section>
  )
}
