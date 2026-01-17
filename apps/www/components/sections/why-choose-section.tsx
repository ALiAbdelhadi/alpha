"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { CheckCircle, Code, Zap, Shield } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export function WhyChooseSection() {
    const t = useTranslations()
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-why-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 20 })

            const tween = gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const reasons = [
        {
            icon: Code,
            title: "Custom Code, No Templates",
            description: "Every line written specifically for your needs. No WordPress, no drag-and-drop builders.",
            color: "text-teal-500"
        },
        {
            icon: Zap,
            title: "Fast & Modern",
            description: "Built with Next.js, React, and TypeScript. Lighthouse scores above 90.",
            color: "text-cyan-500"
        },
        {
            icon: Shield,
            title: "Security First",
            description: "WCAG 2.1 compliant, secure authentication, and regular updates.",
            color: "text-teal-600"
        },
        {
            icon: CheckCircle,
            title: "Honest Communication",
            description: "No false promises. Clear timelines. Transparent pricing.",
            color: "text-cyan-600"
        }
    ]

    return (
        <section
            id="why-choose"
            ref={sectionRef}
            className="flex min-h-screen w-full items-center py-24 md:py-32"
        >
            <Container>
                <div ref={titleRef} className="mb-16 text-center md:mb-20">
                    <h2 className="mb-4 font-sans text-5xl font-normal tracking-tight text-primary md:text-6xl lg:text-7xl">
                        Why Choose Alpha?
                    </h2>
                    <p className="mx-auto max-w-2xl font-mono text-base text-primary/60 md:text-lg">
                        What makes us different from other agencies
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    {reasons.map((reason, i) => (
                        <div
                            key={i}
                            data-why-item
                            className="group rounded-xl border border-foreground/10 bg-foreground/5 p-8 transition-all hover:border-foreground/20 hover:bg-foreground/10"
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <div className="rounded-lg bg-foreground/10 p-3">
                                    <reason.icon className={`h-8 w-8 ${reason.color}`} />
                                </div>
                                <h3 className="font-sans text-2xl font-medium text-primary">
                                    {reason.title}
                                </h3>
                            </div>
                            <p className="text-lg leading-relaxed text-primary/75">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}