"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { Container } from "../container"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const t = useTranslations()
  
  // Individual refs for hero elements with staggered animations
  const badgeRef = useReveal<HTMLDivElement>({ direction: "up", duration: 0.6, distance: 20, delay: 0 })
  const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", duration: 0.8, distance: 40, delay: 0.2 })
  const descriptionRef = useReveal<HTMLParagraphElement>({ direction: "up", duration: 0.8, distance: 30, delay: 0.4 })
  const buttonsRef = useReveal<HTMLDivElement>({ direction: "up", duration: 0.6, distance: 20, delay: 0.6 })
  const scrollHintRef = useReveal<HTMLDivElement>({ direction: "fade", duration: 0.6, delay: 0.8 })

  return (
    <section
      id="home"
      className="flex w-full flex-col items-center justify-center py-32"
    >
      <Container>
        <div className="max-w-3xl">
          <div
            ref={badgeRef}
            className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md"
          >
            <p className="font-mono text-xs text-foreground/90">{t("hero.badge")}</p>
          </div>
          <h1
            ref={titleRef}
            className="mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-balance">
              {t("hero.title")}
              <br />
              {t("hero.title2")}
            </span>
          </h1>
          <p
            ref={descriptionRef}
            className="mb-8 max-w-xl text-base leading-relaxed text-foreground/90 md:text-lg lg:text-xl"
          >
            <span className="text-pretty">{t("hero.description")}</span>
          </p>
          <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection("contact")}>
              {t("hero.ctaPrimary")}
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection("work")}>
              {t("hero.ctaSecondary")}
            </MagneticButton>
          </div>
        </div>
        <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs text-foreground/80">{t("hero.scrollHint")}</p>
            <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
              <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

