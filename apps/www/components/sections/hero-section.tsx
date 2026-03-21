/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useLoading } from "@/components/providers/loading-provider"
import { gsap } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { memo, useCallback, useRef } from "react"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { Container } from "../container"
import { DEFAULTS, MOTION, useText } from "@/lib/motion"

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

  useGSAPSection({ trigger: sectionRef }, (context) => {
    if (!isInitialLoadComplete || !sectionRef.current) return
    const { reduced } = context.conditions as { reduced: boolean }

    if (reduced) {
      gsap.set("[data-hero-watermark],[data-hero-content],[data-hero-scroll]", { opacity: 1, x: 0, y: 0 })
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: MOTION.ease.text, duration: 1.0 }
    })

    tl.fromTo("[data-hero-watermark]",
      { opacity: 0, x: 12 },
      {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: MOTION.ease.gentle
      },
      0
    )

    tl.fromTo("[data-hero-content]",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: MOTION.ease.smooth,
        force3D: true,
        clearProps: "transform"
      },
      0.12
    )

    tl.fromTo("[data-hero-scroll]",
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: MOTION.ease.smooth
      },
      "-=0.55"
    )
  }, [isInitialLoadComplete])

  const handleContactClick = useCallback(() => {
    try {
      if (typeof window !== "undefined" && typeof (window as any).clarity === "function") {
        (window as any).clarity("event", "cta_click", { section: "hero", cta: "primary" })
      }
    } catch { /* noop */ }
    const element = document.getElementById("contact")
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }, [])

  const handleWorkClick = useCallback(() => {
    try {
      if (typeof window !== "undefined" && typeof (window as any).clarity === "function") {
        (window as any).clarity("event", "cta_click", { section: "hero", cta: "secondary" })
      }
    } catch { /* noop */ }
    const element = document.getElementById("work")
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex w-full flex-col justify-end section-padding overflow-hidden"
      aria-label="Hero section"
    >
      <div
        aria-hidden="true"
        data-hero-watermark
        className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 leading-none font-sans font-semibold tracking-tighter text-foreground/4 opacity-0"
        style={{ fontSize: "clamp(120px, 22vw, 340px)", lineHeight: 0.85 }}
      >
        {t("hero.watermark")}
      </div>
      <div data-hero-content className="absolute top-20 ltr:right-8 rtl:left-8 hidden md:flex flex-col ltr:items-end rtl:items-start gap-2 opacity-0">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
            {t("hero.availability")}
          </span>
        </div>
        <span className="font-mono text-[10px] text-primary/25 uppercase tracking-[0.25em]">
          {t("hero.badge")}
        </span>
      </div>
      <Container>
        <div className="max-w-5xl">
          <div data-hero-content className="mb-8 flex items-center gap-2 md:hidden opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
              {t("hero.availability")}
            </span>
          </div>
          <h1
            ref={titleRef}
            className="mb-10 font-sans font-normal text-primary leading-[1.03] tracking-tight"
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              letterSpacing: "-0.025em",
            }}
          >
            {t("hero.title")}
            <br />
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }} className="text-primary/35">
              {t("hero.title2")}
            </span>
          </h1>
          <div data-hero-content className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start opacity-0">
            <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
            <div className="space-y-3 max-w-xl">
              <p className="text-base text-primary/65 leading-relaxed">
                {t("hero.problem")}
              </p>
              <p className="font-mono text-sm text-primary/40 leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </div>
          <div data-hero-content className="flex flex-col sm:flex-row sm:items-center gap-4 opacity-0">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={handleContactClick}
              className="group"
            >
              <span className="flex items-center gap-2">
                {t("hero.ctaPrimary")}
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" onClick={handleWorkClick}>
              {t("hero.ctaSecondary")}
            </MagneticButton>
            <div className="hidden sm:flex flex-col gap-1 ltr:ml-4 rtl:mr-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">
                    {t("hero.clientsCount") || "2"}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand border-2 border-dashed border-brand/30">
                    +
                  </div>
                </div>
                <div className="h-6 w-px bg-foreground/8" />
                <div className="flex items-start flex-col gap-1 text-primary/60 text-[10px]">
                  <span className="text-primary/40">100%  on-time</span>
                  <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider">
                    {t("hero.trust")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div
        data-hero-scroll
        className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2 mt-6 opacity-0"
        aria-hidden="true"
      >
        <p className="font-mono text-xs uppercase text-primary/25 tracking-[0.25em]">
          {t("hero.scrollHint")}
        </p>
        <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
          <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-[slideDown_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%);  }
        }
      `}</style>
    </section>
  )
})
