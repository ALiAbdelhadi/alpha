"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function StandardsPage() {
    const t = useTranslations("standards")
    const sectionRef = useRef<HTMLElement>(null)

    return (
        <main ref={sectionRef} className="relative min-h-screen w-full bg-background">
            <OpeningSection />
            <CategoriesSection />
            <ClosingSection />
        </main>
    )
}

function OpeningSection() {
    const t = useTranslations("standards.hero")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const descRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <section className="flex min-h-screen items-center pt-24 md:pt-32">
            <Container>
                <div className="max-w-4xl">
                    <div ref={titleRef}>
                        <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
                            {t("title")}
                        </h1>
                    </div>
                    <div ref={descRef}>
                        <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl lg:text-2xl">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function CategoriesSection() {
    const t = useTranslations("standards")
    const tCat = useTranslations("standards.categories")
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const categories = sectionRef.current.querySelectorAll("[data-category]")
        const triggers: ScrollTrigger[] = []

        categories.forEach((category, index) => {
            gsap.set(category, { opacity: 0, y: 30 })

            const tween = gsap.to(category, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const categories = ["code", "performance", "accessibility", "security"]

    return (
        <section ref={sectionRef} className="py-24 md:py-32">
            <Container>
                <div className="space-y-24 md:space-y-32">
                    {categories.map((category) => (
                        <div key={category} data-category className="max-w-4xl">
                            <h2 className="mb-4 font-sans text-3xl font-medium text-foreground md:text-4xl">
                                {tCat(`${category}.title`)}
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-foreground/75">
                                {tCat(`${category}.description`)}
                            </p>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-6">
                                    <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-foreground/60">
                                        {t("requirements")}
                                    </h3>
                                    <div className="space-y-2 text-sm text-foreground/75">
                                        {tCat(`${category}.requirements`).split(" | ").map((req: string, i: number) => (
                                            <p key={i}>• {req}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-6">
                                    <h3 className="mb-4 font-mono text-sm font-medium uppercase tracking-wide text-foreground/60">
                                        {t("benchmarks")}
                                    </h3>
                                    <div className="space-y-2 text-sm text-foreground/75">
                                        {tCat(`${category}.benchmarks`).split(" | ").map((bench: string, i: number) => (
                                            <p key={i}>• {bench}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function ClosingSection() {
    const t = useTranslations("standards.enforcement")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const descRef = useReveal({ direction: "up", delay: 0.15, duration: 0.5 })

    return (
        <section className="py-24 pb-32 md:py-32 md:pb-40">
            <Container>
                <div className="max-w-3xl">
                    <div ref={titleRef} className="mb-8 md:mb-12">
                        <h2 className="mb-3 font-sans text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h2>
                    </div>
                    <div ref={descRef}>
                        <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
