// motion: useText(DEFAULTS.heading) h1, useReveal body + element CTAs
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ServiceHeroProps {
    subtitle: string
    title: string
    description: string
    visual?: ReactNode
    buttons: {
        primary: {
            text: string
            href: string
        }
        secondary: {
            text: string
            href: string
        }
    }
    gradientPreset?: "emerald-cyan"
}

const EMERALD_PRESET = {
    bg: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 197, 94, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(16, 185, 129, 0.1), transparent)",
    pill: "bg-emerald-500",
    pillBorder: "border-emerald-500/30 bg-emerald-500/10",
    pillText: "text-emerald-600 dark:text-emerald-400",
}

export function ServiceHero({
    subtitle,
    title,
    description,
    visual,
    buttons,
    gradientPreset = "emerald-cyan",
}: ServiceHeroProps) {
    const titleRef = useText<HTMLHeadingElement>({ ...DEFAULTS.heading, ease: MOTION.ease.text })
    const descRef = useReveal<HTMLParagraphElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })
    const buttonsRef = useReveal<HTMLDivElement>({ ...DEFAULTS.element, ease: MOTION.ease.smooth, delay: 0.25 })

    const preset = EMERALD_PRESET

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden section-padding">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: preset.bg }}
            />
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <div className={cn("mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm", preset.pillBorder)}>
                            <div className={cn("h-2 w-2 rounded-full animate-pulse", preset.pill)} />
                            <p className={cn("mono-uppercase", preset.pillText)}>
                                {subtitle}
                            </p>
                        </div>
                        <h1
                            ref={titleRef}
                            className="mb-6 font-sans font-normal text-primary"
                        >
                            <span className="text-balance">{title}</span>
                        </h1>
                        <p
                            ref={descRef}
                            className="mb-10 max-w-xl body-lg text-primary/80"
                        >
                            {description}
                        </p>
                        <div ref={buttonsRef} className="flex flex-wrap gap-4">
                            <Link href={buttons.primary.href}>
                                <MagneticButton size="lg" variant="primary" className="group">
                                    <span className="flex items-center gap-2">
                                        {buttons.primary.text}
                                        <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </MagneticButton>
                            </Link>
                            <Link href={buttons.secondary.href}>
                                <MagneticButton size="lg" variant="secondary">
                                    {buttons.secondary.text}
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        {visual}
                    </div>
                </div>
            </Container>
        </section>
    )
}
