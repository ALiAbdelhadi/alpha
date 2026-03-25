"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useLoading } from "@/components/providers/loading-provider"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { gsap } from "@/lib/gsap"
import { MOTION } from "@/lib/motion"
import { isRTLText } from "@/lib/motion/utils/splite"
import { useTranslations } from "next-intl"
import { type ReactNode, memo, useCallback, useEffect, useMemo, useRef } from "react"

const MAX_STAGGER_TOTAL = 0.55

function splitTextTokens(
  text: string,
  className?: string,
): { nodes: ReactNode; isRTL: boolean } {
  const rtl = isRTLText(text)

  if (rtl) {
    const words = text.split(" ")
    return {
      isRTL: true,
      nodes: words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block" }}>
          <span data-token className={className} style={{ display: "inline-block" }}>
            {word}
          </span>
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block", whiteSpace: "pre" }}>{" "}</span>
          )}
        </span>
      )),
    }
  }

  const words = text.split(" ")
  return {
    isRTL: false,
    nodes: words.map((word, wi) => (
      <span
        key={wi}
        style={{
          display: "inline-block",
          overflow: "hidden",
          paddingBottom: "0.12em",
          marginBottom: "-0.12em",
          verticalAlign: "bottom",
        }}
      >
        {word.split("").map((char, i) => (
          <span
            key={i}
            data-token
            className={className}
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        ))}
        {wi < words.length - 1 && (
          <span style={{ display: "inline-block", whiteSpace: "pre" }}>{" "}</span>
        )}
      </span>
    )),
  }
}

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()

  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const srTextRef = useRef<HTMLSpanElement>(null)

  const title1 = t("hero.title")
  const title2 = t("hero.title2")

  const split1 = useMemo(() => splitTextTokens(title1), [title1])
  const split2 = useMemo(() => splitTextTokens(title2), [title2])

  const headlineIsRTL = split1.isRTL || split2.isRTL

  useGSAPSection({ trigger: sectionRef }, (ctx) => {
    if (!isInitialLoadComplete || !sectionRef.current) return
    const { reduced } = ctx.conditions as { reduced: boolean }

    const tokens = headlineRef.current?.querySelectorAll<HTMLElement>("[data-token]") ?? []
    const content = [
      badgeRef.current,
      subRef.current,
      ctaRef.current,
      statsRef.current,
      scrollRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set([...tokens, ...content], { opacity: 1, y: 0 })
      return
    }

    const rawStagger = 0.022
    const effectiveStagger =
      tokens.length > 1
        ? Math.min(rawStagger, MAX_STAGGER_TOTAL / tokens.length)
        : rawStagger

    if (headlineIsRTL) {
      gsap.set(tokens, { opacity: 0, y: 40 })
    } else {
      gsap.set(tokens, { opacity: 0, y: 60, filter: "blur(8px)" })
    }
    gsap.set(content, { opacity: 0, y: 18 })

    const tl = gsap.timeline({ defaults: { ease: MOTION.ease.text } })

    tl.to(
      badgeRef.current,
      { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth },
      0.1,
    )

    const tokenAnim: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration: headlineIsRTL ? 0.85 : 1.1,
      stagger: { each: effectiveStagger, from: headlineIsRTL ? "end" : "start" },
      ease: "power4.out",
      onComplete() {
        gsap.set(tokens, { clearProps: "filter,willChange" })
      },
    }
    if (!headlineIsRTL) tokenAnim.filter = "blur(0px)"
    tl.to(tokens, tokenAnim, 0.2)

    tl.to(subRef.current, { opacity: 1, y: 0, duration: MOTION.duration.base, ease: MOTION.ease.smooth }, 0.55)
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth }, 0.70)
    tl.to(statsRef.current, { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth }, 0.80)
    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth }, 0.95)
  }, [isInitialLoadComplete, title1, title2, headlineIsRTL])

  useEffect(() => {
    if (!isInitialLoadComplete || !headlineRef.current || !sectionRef.current) return
    const tokens = headlineRef.current.querySelectorAll<HTMLElement>("[data-token]")
    if (!tokens.length) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollProps: gsap.TweenVars = headlineIsRTL
        ? { opacity: 0.12, stagger: { each: 0.006, from: "end" }, ease: "none" }
        : { yPercent: -30, opacity: 0.12, stagger: { each: 0.008, from: "end" }, ease: "none" }

      const st = gsap.to(tokens, {
        ...scrollProps,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      })
      return () => {
        st.scrollTrigger?.kill()
        st.kill()
      }
    })
    return () => mm.revert()
  }, [isInitialLoadComplete, headlineIsRTL, title1, title2])

  const handleContactClick = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])
  const handleWorkClick = useCallback(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-watermark relative z-10 flex lg:min-h-screen w-full flex-col justify-end section-padding overflow-hidden"
      aria-label="Hero section"
    >
      <span ref={srTextRef} className="sr-only">{title1} {title2}</span>
      <div
        ref={badgeRef}
        className="absolute top-20 ltr:right-8 rtl:left-8 hidden md:flex flex-col ltr:items-end rtl:items-start gap-2 opacity-0"
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em]">
            {t("hero.availability")}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.25em]">
          {t("hero.badge")}
        </span>
      </div>
      <Container>
        <div className="max-w-5xl">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-[0.25em]">
              {t("hero.availability")}
            </span>
          </div>
          <h1
            ref={headlineRef}
            aria-hidden
            className="mb-10 font-sans font-light text-primary leading-[1.02] select-none"
            style={{ fontSize: "clamp(44px, 7vw, 96px)", letterSpacing: "-0.028em" }}
          >
            <span className="block">{split1.nodes}</span>
            <span className="block text-primary/40 font-display-serif">
              {split2.nodes}
            </span>
          </h1>
          <div
            ref={subRef}
            className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start opacity-0"
          >
            <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
            <div className="space-y-3 max-w-xl">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t("hero.problem")}
              </p>
              <p className="font-mono text-xs md:text-sm text-muted-foreground/70 leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </div>
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row sm:items-center gap-4 opacity-0"
          >
            <MagneticButton size="lg" variant="primary" onClick={handleContactClick} className="group">
              <span className="flex items-center gap-2">
                {t("hero.ctaPrimary")}
                <svg
                  aria-hidden
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
                    {t("hero.clientsCount")}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand border-2 border-dashed border-brand/30">
                    +
                  </div>
                </div>
                <div className="h-6 w-px bg-foreground/10" />
                <div className="flex flex-col gap-0.5 text-muted-foreground/70 text-[11px]">
                  <span>100% on-time</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider">{t("hero.trust")}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={statsRef}
            className="mt-16 grid gap-6 border-t border-foreground/8 pt-10 sm:grid-cols-3 sm:gap-0 opacity-0"
          >
            {[
              { val: "< 1s", label: t("hero.stat1") },
              { val: "100%", label: t("hero.stat2") },
              { val: "AR/EN", label: t("hero.stat3") },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-foreground/10"
                style={{
                  paddingLeft: i > 0 ? "clamp(16px, 3vw, 36px)" : 0,
                  paddingRight: i < arr.length - 1 ? "clamp(16px, 3vw, 36px)" : 0,
                }}
              >
                <span
                  className="font-sans font-light text-foreground block"
                  style={{ fontSize: "clamp(18px, 2.5vw, 32px)", letterSpacing: "-0.024em", lineHeight: 1.1 }}
                >
                  {s.val}
                </span>
                <span
                  className="font-mono text-foreground/40 mt-1 uppercase block"
                  style={{ fontSize: "clamp(10px, 0.70vw, 12px)", letterSpacing: "0.18em" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2 mt-6 opacity-0"
        aria-hidden
      >
        <p className="font-mono text-xs uppercase text-muted-foreground/60 tracking-[0.25em]">
          {t("hero.scrollHint")}
        </p>
        <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
          <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-slide-down" />
        </div>
      </div>
    </section>
  )
})