"use client"

import { Container } from "@/components/container"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { useReveal } from "@/hooks/use-animation"

interface FeatureItem {
    title: string
    description: string
    icon?: React.ReactNode
}

interface ServiceFeaturesProps {
    title: string
    subtitle: string
    features: FeatureItem[]
    columns?: 2 | 3
}

export function ServiceFeatures({ title, subtitle, features, columns = 3 }: ServiceFeaturesProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const cards = sectionRef.current.querySelectorAll("[data-feature-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 30 })

            const tween = gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    return (
        <section ref={sectionRef} className="section-padding relative">
            <Container>
                <div ref={headerRef} className="mb-16 max-w-2xl">
                    <h2 className="mb-4 font-sans font-normal text-primary">
                        {title}
                    </h2>
                    <p className="mono text-primary/60">
                        {subtitle}
                    </p>
                </div>
                
                <div className={cn(
                    "grid gap-6",
                    columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
                )}>
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            data-feature-card
                            className="group relative p-6 md:p-8 rounded-2xl border border-foreground/25 bg-background hover:bg-foreground/5 hover:border-foreground/50 transition-colors transition-default overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transition-default pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="mb-6 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 transition-default">
                                    {feature.icon ? (
                                        feature.icon
                                    ) : (
                                        <span className="mono small text-primary/40">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mb-3 font-sans font-medium text-primary">
                                    {feature.title}
                                </h3>
                                <p className="body text-primary/70">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
