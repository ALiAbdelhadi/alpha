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
      className="flex w-full flex-col items-center justify-center min-h-screen py-24 md:py-32"
      aria-label="Hero section"
    >
      <Container>
        <div className="max-w-4xl">
          <div
            ref={badgeRef}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/10 px-4 py-2 backdrop-blur-sm transition-colors hover:border-foreground/25"
            role="status"
            aria-live="polite"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <p className="font-mono text-xs text-primary/90 tracking-wide">{t("hero.badge")}</p>
          </div>
          <h1
            ref={titleRef}
            className="mb-8 font-sans text-5xl font-normal leading-[1.08] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-balance">
              {t("hero.title")}
              <br />
              <span className="text-primary/70">{t("hero.title2")}</span>
            </span>
          </h1>
          <p
            ref={descriptionRef}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl"
          >
            <span className="text-pretty">{t("hero.description")}</span>
          </p>

          <div ref={buttonsRef} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection("contact")}
                aria-label={t("hero.ctaPrimary")}
                className="group relative"
              >
                <span className="flex items-center gap-2">{t("hero.ctaPrimary")}</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
        </div>
        <div
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-xs text-primary/70 tracking-wider uppercase">{t("hero.scrollHint")}</p>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm p-1.5">
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/70"
                style={{ animationDuration: "1.5s" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
