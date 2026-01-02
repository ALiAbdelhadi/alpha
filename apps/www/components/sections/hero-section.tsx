"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { Container } from "../container"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const t = useTranslations()
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (badgeRef.current) badgeRef.current.style.opacity = '1'
      if (titleRef.current) titleRef.current.style.opacity = '1'
      if (descriptionRef.current) descriptionRef.current.style.opacity = '1'
      if (buttonsRef.current) buttonsRef.current.style.opacity = '1'
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = '1'
      return
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    if (badgeRef.current) {
      gsap.set(badgeRef.current, { opacity: 0, y: 20 })
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0)
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
    }

    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
      tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
    }

    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 })
      tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
    }

    if (scrollHintRef.current) {
      gsap.set(scrollHintRef.current, { opacity: 0 })
      tl.to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 0.8)
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-col justify-end"
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

