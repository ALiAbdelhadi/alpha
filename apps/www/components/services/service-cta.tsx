"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
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
    gradientPreset?: "blue-purple" | "emerald-cyan" | "rose-pink" | "amber-orange"
}

export function ServiceCta({ 
    title, 
    description, 
    buttons, 
    gradientPreset = "blue-purple" 
}: ServiceCtaProps) {
    const contentRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })

    const gradients = {
        "blue-purple": "from-violet-500/10 via-purple-500/5 to-transparent",
        "emerald-cyan": "from-emerald-500/10 via-teal-500/5 to-transparent",
        "rose-pink": "from-rose-500/10 via-pink-500/5 to-transparent",
        "amber-orange": "from-amber-500/10 via-orange-500/5 to-transparent",
    }
    
    const blurs = {
        "blue-purple": "from-violet-500/20 to-purple-500/10",
        "emerald-cyan": "from-emerald-500/20 to-teal-500/10",
        "rose-pink": "from-rose-500/20 to-pink-500/10",
        "amber-orange": "from-amber-500/20 to-orange-500/10",
    }

    return (
        <section className="py-24 md:py-32">
            <Container>
                <div
                    ref={contentRef}
                    className={cn(
                        "relative overflow-hidden rounded-3xl border border-foreground/10 p-8 md:p-12 lg:p-16 bg-gradient-to-br",
                        gradients[gradientPreset]
                    )}
                >
                    <div className="max-w-2xl relative z-10">
                        <h2 className="mb-6 font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        <p className="mb-8 text-lg text-primary/80">
                            {description}
                        </p>
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
                    </div>
                    <div className={cn(
                        "absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br blur-3xl opacity-60",
                        blurs[gradientPreset]
                    )} />
                </div>
            </Container>
        </section>
    )
}
