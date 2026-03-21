// motion: useText h2, useReveal for body + CTA block
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface ServiceCtaProps {
    title: string
    description: string
    buttons: {
        primary: {
            text: string
            href: string
        }
    }
    gradientPreset?: "emerald-brand"
}

const EMERALD_GRADIENT = "from-emerald-500/10 via-teal-500/5 to-transparent"
const EMERALD_BLUR = "from-emerald-500/20 to-teal-500/10"

export function ServiceCta({
    title,
    description,
    buttons,
    gradientPreset: _gradientPreset = "emerald-brand"
}: ServiceCtaProps) {
    const titleRef = useText({ ...DEFAULTS.heading, ease: MOTION.ease.text })
    const bodyRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })

    return (
        <section className="section-padding">
            <Container>
                <div
                    className={cn(
                        "relative overflow-hidden rounded-3xl border border-foreground/25 p-8 md:p-12 lg:p-16 bg-gradient-to-br",
                        EMERALD_GRADIENT
                    )}
                >
                    <div className="max-w-2xl relative z-10">
                        <h2 ref={titleRef} className="mb-6 font-sans font-normal text-primary">
                            {title}
                        </h2>
                        <div ref={bodyRef}>
                            <p className="mb-8 body-lg text-primary/80">
                                {description}
                            </p>
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
                        </div>
                    </div>
                    <div className={cn(
                        "absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br blur-3xl opacity-60",
                        EMERALD_BLUR
                    )} />
                </div>
            </Container>
        </section>
    )
}
