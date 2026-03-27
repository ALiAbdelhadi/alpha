"use client"

import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { Container } from "../container";

interface ServiceData { key: string; index: string; span: "single" | "double" }

const services: ServiceData[] = [
    { key: "service1", index: "01", span: "double" },
    { key: "service2", index: "02", span: "single" },
    { key: "service3", index: "03", span: "single" },
    { key: "service4", index: "04", span: "double" },
]

const MONO = "var(--font-geist-mono), ui-monospace, 'SFMono-Regular', monospace"
const SERIF = "Georgia, 'Times New Roman', serif"

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
    service,
    t,
}: {
    service: ServiceData
    t: (key: string) => string
}) {
    const isDouble = service.span === "double"

    return (
        <div
            className="ps-service-card group"
            data-service-card
            style={{
                gridColumn: isDouble ? "span 2" : "span 1",
                position: "relative",
                border: "1px solid",
                borderColor: "var(--s-border)",
                borderRadius: 2,
                padding: isDouble ? "32px 24px" : "24px 16px",
                overflow: "hidden",
                cursor: "default",
                background: "transparent",
                transition: "border-color 0.35s ease, background-color 0.35s ease",
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
                    fontSize: "clamp(114px, 12vw, 144px)",
                    fontWeight: 700,
                    color: "transparent",
                    WebkitTextStroke: `1px var(--s-border)`,
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
                        fontSize: 12,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "var(--s-muted)",
                        border: "1px solid",
                        borderColor: "var(--s-border)",
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
                        color: "var(--s-low)",
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
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: isDouble ? 28 : 21,
                        fontWeight: 400,
                        letterSpacing: "-0.025em",
                        color: "var(--s-mid)",
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
                        fontSize: 14,
                        lineHeight: 1.8,
                        color: "var(--s-muted)",
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

export const ServicesSection = memo(function ServicesSection() {
    const t = useTranslations("services")

    const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
    const titleRef = useText<HTMLHeadingElement>({
        ...DEFAULTS.heading,
        ease: MOTION.ease.text,
    })
    const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

    const { first: firstPart, second: secondPart } = splitHeadline(t("title"))

    return (
        <div
            id="services"
            className="services-section bg-transparent relative section-padding"
        >
            <Container className="relative">
                <div
                    data-service-header
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12 mb-16"
                >
                    <div className="flex flex-col items-start justify-center w-full space-y-3">
                        <p
                            ref={eyebrowRef}
                            className="font-mono"
                            style={{
                                fontFamily: MONO,
                                fontSize: 12,
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "var(--s-muted)",
                                margin: 0,
                                transition: "color 0.4s ease",
                            }}
                        >
                            {t("eyebrow")}
                        </p>
                        <h2
                            ref={titleRef}
                            className="ps-heading"
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "clamp(32px, 4.5vw, 56px)",
                                fontWeight: 400,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.05,
                                color: "var(--s-high)",
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
                                            fontFamily: SERIF,
                                            fontStyle: "italic",
                                            color: "var(--s-low)",
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
                            fontSize: 15,
                            lineHeight: 1.85,
                            color: "var(--s-muted)",
                            margin: 0,
                        }}
                    >
                        {t("subtitle")}
                    </p>
                </div>

                <div
                    style={{ height: 1, background: "var(--s-border)", marginBottom: 20 }}
                />

                <div className="services-grid">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} t={t} />
                    ))}
                </div>

                <div className="ps-footer flex items-center justify-end gap-4 mt-9">
                    <div className="flex-1" style={{ height: 1, background: "var(--s-border)" }} />
                    <span
                        className="font-mono uppercase tracking-tight text-xs"
                        style={{ color: "var(--s-muted)" }}
                    >
                        {t("footerText")}
                    </span>
                </div>
            </Container>
        </div>
    )
})