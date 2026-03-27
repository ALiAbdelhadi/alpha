"use client"

import { useInjectStyles } from "@/lib/dom-utils"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { memo, useEffect, useRef, useState } from "react"

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
  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .ps-service-card:hover {
    background: color-mix(in srgb, var(--foreground) 3%, transparent);
  }

  .ps-service-card:hover .ps-service-number {
    transform: translateY(-50%) scale(1.04);
  }

  .ps-service-card:hover .ps-service-tag {
    color: var(--section-mid);
    border-color: var(--section-border-hover);
  }

  .ps-service-card:hover .ps-service-arrow {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  .ps-service-card:hover .ps-service-title {
    color: var(--section-high);
  }

  .ps-service-card:hover .ps-service-body {
    color: var(--section-low);
  }

  [dir="rtl"] .ps-service-arrow {
    transform: scaleX(-1);
  }
  
  [dir="rtl"] .ps-service-card:hover .ps-service-arrow {
    transform: scaleX(-1) translate(2px, 2px);
  }

  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr !important;
    }
    .ps-service-card {
      grid-column: span 1 !important;
      min-height: auto !important;
    }
    .ps-service-number {
      font-size: clamp(64px, 15vw, 100px) !important;
      inset-inline-end: 20px !important;
    }
  }
`

function splitHeadline(value: string) {
    if (!value.trim()) return { first: "", second: "" }
    const sentenceMatch = value.match(/^(.+[.!?،])\s+(.+)$/)
    if (sentenceMatch) {
        return { first: sentenceMatch[1], second: sentenceMatch[2] }
    }

    const words = value.trim().split(/\s+/)
    if (words.length < 2) return { first: value, second: "" }
    const splitAt = Math.ceil(words.length / 2)
    return {
        first: words.slice(0, splitAt).join(" "),
        second: words.slice(splitAt).join(" "),
    }
}

const ServiceCard = memo(function ServiceCard({
    service, t, C,
}: {
    service: ServiceData
    t: (key: string) => string
    C: CTokens
}) {
    const isDouble = service.span === "double"

    return (
        <div
            className="ps-service-card group"
            data-service-card
            style={{
                ["--section-high" as string]: C.high,
                ["--section-mid" as string]: C.mid,
                ["--section-low" as string]: C.low,
                ["--section-border-hover" as string]: C.borderHover,
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
                transform: `translateY(${MOTION.distance.md}px)`,
                minHeight: isDouble ? 240 : 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}
        >
            <div
                aria-hidden
                className="ps-service-number font-mono"
                style={{
                    position: "absolute",
                    insetInlineEnd: isDouble ? 48 : 28,
                    top: "50%",
                    transform: "translateY(-50%)",
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
                }}
            >
                {service.index}
            </div>
            
            <div className="flex items-center justify-between w-full mb-8">
                <span
                    className="ps-service-tag font-mono"
                    style={{
                        fontSize: 10.5,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: C.muted,
                        border: "1px solid",
                        borderColor: C.border,
                        padding: "4px 10px",
                        borderRadius: 999,
                        transition: "color 0.3s ease, border-color 0.3s ease",
                    }}
                >
                    {t(`${service.key}.tag`)}
                </span>
                <span
                    className="ps-service-arrow"
                    style={{
                        fontFamily: "var(--font-body-mono)",
                        fontSize: 15,
                        color: C.low,
                        opacity: 0,
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >
                    ↗
                </span>
            </div>
            
            <div className="relative z-1" style={{ maxWidth: isDouble ? 500 : "100%" }}>
                <h3
                    className="ps-service-title"
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: isDouble ? 28 : 21,
                        fontWeight: 400,
                        letterSpacing: "-0.025em",
                        color: C.mid,
                        marginBottom: 12,
                        marginTop: 0,
                        lineHeight: 1.25,
                        transition: "color 0.3s ease",
                    }}
                >
                    {t(`${service.key}.title`)}
                </h3>
                <p
                    className="ps-service-body"
                    style={{
                        fontFamily: "var(--font-body-mono)",
                        fontSize: 13,
                        lineHeight: 1.8,
                        color: C.muted,
                        margin: 0,
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
    const { resolvedTheme } = useTheme()
    const sectionRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true) }, [])
    useInjectStyles("services-styles", SERVICES_CSS)

    const baseTokens: CTokens = (mounted && resolvedTheme === "dark") ? DARK_C : LIGHT_C
    const invertedTokens: CTokens = (mounted && resolvedTheme === "dark") ? LIGHT_C : DARK_C
    const C: CTokens = invertColors ? invertedTokens : baseTokens

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText<HTMLHeadingElement>({
        ...DEFAULTS.heading,
        ease: MOTION.ease.text,
    })
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

    const { first: firstPart, second: secondPart } = splitHeadline(t("title"))

    return (
        <div
            ref={sectionRef}
            id="services"
            className="services-section bg-transparent relative section-padding"
            style={{ color: C.high }}
        >
            <div className="relative">
                <div
                    data-service-header
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12 mb-16"
                >
                    <div className="flex flex-col items-start justify-center w-full space-y-3">
                        <p
                            ref={eyebrowRef}
                            className="font-mono"
                            style={{
                                fontFamily: "var(--font-body-mono)",
                                fontSize: 12,
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: C.muted,
                                margin: 0,
                                transition: "color 0.4s ease",
                            }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            ref={titleRef}
                            className="ps-services-heading"
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(32px, 4.5vw, 56px)",
                                fontWeight: 400,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.05,
                                color: C.high,
                                margin: 0,
                                transition: "color 0.4s ease",
                            }}
                        >
                            {firstPart}
                            {secondPart ? (
                                <>
                                    <br className="hidden md:block" />
                                    <span
                                        className="block mt-2 md:mt-0 md:inline"
                                        style={{
                                            fontFamily: "var(--font-serif)",
                                            fontStyle: "italic",
                                            color: C.low,
                                            transition: "color 0.4s ease",
                                        }}
                                    >
                                        {secondPart}
                                    </span>
                                </>
                            ) : null}
                        </h2>
                    </div>

                    <p
                        ref={descRef}
                        className="ps-services-body w-full lg:max-w-[320px] font-mono"
                        style={{
                            fontSize: 13,
                            lineHeight: 1.85,
                            color: C.muted,
                            margin: 0,
                        }}
                    >
                        {t("subtitle")}
                    </p>
                </div>
                
                <div
                    data-service-divider
                    className="scale-x-0"
                    style={{ height: 1, background: C.border, marginBottom: 20 }}
                />
                <div className="services-grid">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} t={t} C={C} />
                    ))}
                </div>
                <div
                    data-service-footer
                    className="flex items-center justify-end gap-4 mt-9"
                >
                    <div className="flex-1" style={{ height: 1, background: C.border }} />
                    <span
                    className="font-mono uppercase tracking-tight text-xs"
                        style={{
                            color: C.muted,
                        }}
                    >
                        {t("footerText")}
                    </span>
                </div>
            </div>
        </div>
    )
})