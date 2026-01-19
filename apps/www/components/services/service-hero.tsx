"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
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
    gradientPreset?: "blue-purple" | "emerald-cyan" | "rose-pink" | "amber-orange"
}

export function ServiceHero({
    subtitle,
    title,
    description,
    visual,
    buttons,
    gradientPreset = "blue-purple",
}: ServiceHeroProps) {
    const titleRef = useReveal<HTMLHeadingElement>({ direction: "up", delay: 0, duration: 0.8 })
    const descRef = useReveal<HTMLParagraphElement>({ direction: "up", delay: 0.2, duration: 0.6 })
    const buttonsRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.35, duration: 0.5 })

    const gradients = {
        "blue-purple": {
            bg: "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.7 0.15 280 / 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.65 0.12 260 / 0.1), transparent)",
            pill: "bg-blue-500",
            pillBorder: "border-blue-500/30 bg-blue-500/10",
            pillText: "text-blue-600 dark:text-blue-400",
        },
        "emerald-cyan": {
            bg: "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.7 0.15 160 / 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.65 0.12 180 / 0.1), transparent)",
            pill: "bg-emerald-500",
            pillBorder: "border-emerald-500/30 bg-emerald-500/10",
            pillText: "text-emerald-600 dark:text-emerald-400",
        },
        "rose-pink": {
            bg: "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.7 0.15 340 / 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.65 0.12 320 / 0.1), transparent)",
            pill: "bg-rose-500",
            pillBorder: "border-rose-500/30 bg-rose-500/10",
            pillText: "text-rose-600 dark:text-rose-400",
        },
        "amber-orange": {
            bg: "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.7 0.15 80 / 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.65 0.12 50 / 0.1), transparent)",
            pill: "bg-amber-500",
            pillBorder: "border-amber-500/30 bg-amber-500/10",
            pillText: "text-amber-600 dark:text-amber-400",
        },
    }

    const preset = gradients[gradientPreset]

    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: preset.bg }}
            />
            
            {/* Ambient noise texture overlay for 2026 feel */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div>
                        <div className={cn("mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm", preset.pillBorder)}>
                            <div className={cn("h-2 w-2 rounded-full animate-pulse", preset.pill)} />
                            <p className={cn("font-mono text-xs tracking-wide uppercase", preset.pillText)}>
                                {subtitle}
                            </p>
                        </div>
                        <h1
                            ref={titleRef}
                            className="mb-6 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl"
                        >
                            <span className="text-balance">{title}</span>
                        </h1>
                        <p
                            ref={descRef}
                            className="mb-10 max-w-xl text-lg leading-relaxed text-primary/80 md:text-xl"
                        >
                            {description}
                        </p>
                        <div ref={buttonsRef} className="flex flex-wrap gap-4">
                            <Link href={buttons.primary.href}>
                                <MagneticButton size="lg" variant="primary" className="group">
                                    <span className="flex items-center gap-2">
                                        {buttons.primary.text}
                                        <svg className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
