"use client"

import { Container } from "@/components/container"
import { useLoading } from "@/components/providers/loading-provider"
import { ANIM } from "@/lib/animation-utils"
import { useInjectStyles } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { memo, useLayoutEffect, useRef, useState } from "react"

const DARK_C = {
  high: "rgba(250, 250, 250, 0.92)",
  mid: "rgba(255, 255, 255, 0.55)",
  low: "rgba(255, 255, 255, 0.35)",
  muted: "rgba(255, 255, 255, 0.20)",
  border: "rgba(255, 255, 255, 0.08)",
  borderHover: "rgba(255, 255, 255, 0.16)",
} as const

const LIGHT_C = {
  high: "rgba(10,  10,  10,  0.92)",
  mid: "rgba(0,   0,   0,   0.60)",
  low: "rgba(0,   0,   0,   0.42)",
  muted: "rgba(0,   0,   0,   0.25)",
  border: "rgba(0,   0,   0,   0.10)",
  borderHover: "rgba(0,   0,   0,   0.20)",
} as const

type CTokens = typeof DARK_C | typeof LIGHT_C

interface ServiceData { key: string; index: string; span: "single" | "double" }

const services: ServiceData[] = [
  { key: "service1", index: "01", span: "double" },
  { key: "service2", index: "02", span: "single" },
  { key: "service3", index: "03", span: "single" },
  { key: "service4", index: "04", span: "double" },
]

const SERVICES_CSS = `
  /* Services Section – RTL/LTR Support */

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  /* Arrow icon flip for RTL */
  [dir="rtl"] .ps-service-arrow {
    transform: scaleX(-1);
  }

  /* Arabic font for headings */
  [dir="rtl"] .ps-services-heading {
    font-family: 'Noto Naskh Arabic', 'Amiri', 'Scheherazade New', serif;
    font-style: normal;
  }

  /* Arabic font for body text */
  [dir="rtl"] .ps-services-body {
    font-family: 'Noto Kufi Arabic', 'IBM Plex Arabic', 'Tajawal', monospace;
    line-height: 2;
    letter-spacing: 0;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr !important;
    }
    .services-grid > div {
      grid-column: span 1 !important;
    }
  }
`

const ServiceCard = memo(function ServiceCard({
  service, t, C,
}: {
  service: ServiceData
  t: (key: string) => string; C: CTokens
}) {
  const isDouble = service.span === "double"
  return (
    <div
      className="group opacity-0"
      data-service-card
      style={{
        gridColumn: isDouble ? "span 2" : "span 1",
        position: "relative",
        border: "1px solid",
        borderColor: C.border,
        borderRadius: 2,
        padding: isDouble ? "32px 24px" : "24px 16px",
        overflow: "hidden",
        cursor: "default",
        background: "transparent",
        transition: "border-color 0.35s ease, background-color 0.35s ease",
        transform: `translateY(${ANIM.distance.md}px)`,
        minHeight: isDouble ? 200 : 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div
        aria-hidden
        className="ps-service-number group-hover:transform-[translateY(-50%)_scale(1.04)]"
        style={{
          position: "absolute",
          insetInlineEnd: isDouble ? 48 : 28,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "monospace",
          fontSize: "clamp(88px, 12vw, 144px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: `1px ${C.border}`,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
          transition: "transform 0.45s ease, -webkit-text-stroke 0.35s ease",
          unicodeBidi: "embed",
          direction: "ltr",
        }}
      >
        {service.index}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          className="group-hover:text-(--section-mid)!"
          style={{
            fontFamily: "monospace", fontSize: 10.5, letterSpacing: "0.25em",
            textTransform: "uppercase", color: C.muted,
            border: "1px solid", borderColor: C.border,
            padding: "4px 10px", borderRadius: 999,
            transition: "color 0.3s ease, border-color 0.3s ease",
          }}
        >
          {t(`${service.key}.tag`)}
        </span>
        <span
          className="ps-service-arrow group-hover:opacity-100! group-hover:transform-[translate(2px,-2px)]!"
          style={{
            fontFamily: "monospace", fontSize: 15, color: C.low,
            opacity: 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          ↗
        </span>
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: isDouble ? 500 : "100%" }}>
        <h3
          className="group-hover:text-(--c-high)!"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: isDouble ? 28 : 21, fontWeight: 400,
            letterSpacing: "-0.025em", color: C.mid,
            marginBottom: 12, marginTop: 0, lineHeight: 1.25,
            transition: "color 0.3s ease",
          }}
        >
          {t(`${service.key}.title`)}
        </h3>
        <p
          className="group-hover:text-(--c-low)!"
          style={{
            fontFamily: "monospace", fontSize: 14, lineHeight: 1.8,
            color: C.muted, margin: 0,
            transition: "color 0.35s ease",
          }}
        >
          {t(`${service.key}.description`)}
        </p>
      </div>
    </div>
  )
})

interface ServicesSectionProps {
  invertColors?: boolean
}

export const ServicesSection = memo(function ServicesSection({ invertColors = false }: ServicesSectionProps) {
  const t = useTranslations("services")
  const locale = useLocale()
  const { isInitialLoadComplete } = useLoading()
  const { resolvedTheme } = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useInjectStyles("services-styles", SERVICES_CSS)

  useLayoutEffect(() => { setMounted(true) }, [])

  const baseTokens: CTokens = (mounted && resolvedTheme === "dark") ? DARK_C : LIGHT_C
  const invertedTokens: CTokens = (mounted && resolvedTheme === "dark") ? LIGHT_C : DARK_C
  const C: CTokens = invertColors ? invertedTokens : baseTokens

  useLayoutEffect(() => {
    if (!isInitialLoadComplete || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        }
      })

      // Premium header reveal
      tl.fromTo("[data-service-header]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }
      )

      // Divider - smooth scale
      tl.fromTo("[data-service-divider]",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)"
        },
        "-=0.7"
      )

      // Service cards - staggered premium reveal
      tl.to("[data-service-card]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        force3D: true,
        clearProps: "transform"
      }, "-=0.5")

      // Footer - gentle fade
      tl.fromTo("[data-service-footer]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)"
        },
        "-=0.5"
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isInitialLoadComplete])

  const titleParts = t("title").split(". ")
  const firstPart = titleParts[0] ? `${titleParts[0]}.` : ""
  const secondPart = titleParts[1] || ""

  return (
    <div
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: "transparent",
        color: C.high,
        padding: "96px 0 48px",
        position: "relative",
        boxSizing: "border-box",
        transition: "color 0.4s ease, background-color 0.4s ease",
      }}
    >
      <Container>
        <div style={{ margin: "0 auto", position: "relative" }}>
          <div
            data-service-header
            className="opacity-0"
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", marginBottom: 56,
              gap: 40, flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.muted, marginBottom: 16, marginTop: 0, transition: "color 0.4s ease" }}>
                {t("eyebrow")}
              </p>
              <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05, color: C.high, margin: 0, transition: "color 0.4s ease" }}>
                {firstPart}
                <br />
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", color: C.low, transition: "color 0.4s ease" }}>
                  {secondPart}
                </span>
              </h2>
            </div>
            <p style={{ fontFamily: "monospace", fontSize: 14, lineHeight: 1.85, color: C.muted, maxWidth: 260, margin: 0, transition: "color 0.4s ease" }}>
              {t("subtitle")}
            </p>
          </div>
          <div data-service-divider style={{ height: 1, background: C.border, marginBottom: 20, transition: "background 0.4s ease" }} className="scale-x-0" />

          <div className="services-grid">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                t={t}
                C={C}
              />
            ))}
          </div>

          <div data-service-footer className="opacity-0" style={{ marginTop: 36, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: C.border, transition: "background 0.4s ease" }} />
            <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: C.muted, transition: "color 0.4s ease" }}>
              04 Core Services - ALTRUVEX
            </span>
          </div>
        </div>
      </Container>
    </div>
  )
})