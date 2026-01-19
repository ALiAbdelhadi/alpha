"use client"

import { Container } from "@/components/container"
import { ServiceCta } from "@/components/services/service-cta"
import { ServiceFeatures } from "@/components/services/service-features"
import { ServiceHero } from "@/components/services/service-hero"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function DevelopmentPage() {
    const t = useTranslations("serviceDetails.development")
    const tCommon = useTranslations("serviceDetails")

    const features = ["1", "2", "3", "4", "5", "6"].map(num => ({
        title: t(`features.${num}.title`),
        description: t(`features.${num}.description`),
    }))

    return (
        <div className="relative min-h-screen w-full">
            <ServiceHero
                subtitle={t("subtitle")}
                title={t("title")}
                description={t("description")}
                gradientPreset="emerald-cyan"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" },
                    secondary: { text: tCommon("ctaSecondary"), href: "#tech-stack" }
                }}
                visual={<DevelopmentVisual />}
            />
            
            <TechStackSection />
            
            <ServiceFeatures
                title={tCommon("whatWeOffer")}
                subtitle={tCommon("whatWeOfferSubtitle")}
                features={features}
                columns={2}
            />
            
            <ServiceCta
                title={t("cta.title")}
                description={t("cta.description")}
                gradientPreset="emerald-cyan"
                buttons={{
                    primary: { text: tCommon("ctaPrimary"), href: "/contact" }
                }}
            />
        </div>
    )
}

function DevelopmentVisual() {
    return (
        <div className="relative">
            <div className="rounded-xl border border-foreground/10 bg-gray-950 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-4 font-mono text-xs text-gray-500">terminal</span>
                </div>
                <div className="p-5 font-mono text-sm space-y-2">
                    <div className="flex gap-2">
                        <span className="text-emerald-400">$</span>
                        <span className="text-gray-300">npx create-next-app@latest</span>
                    </div>
                    <div className="text-gray-500">✓ Creating your project...</div>
                    <div className="text-gray-500">✓ Installing dependencies...</div>
                    <div className="flex gap-2">
                        <span className="text-emerald-400">$</span>
                        <span className="text-gray-300">npm run dev</span>
                    </div>
                    <div className="text-emerald-400">→ Ready on http://localhost:3000</div>
                    <div className="h-3 w-2 bg-emerald-400 animate-pulse inline-block" />
                </div>
            </div>
            <div className="absolute -top-4 -left-4 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 font-mono text-xs text-blue-400">
                TypeScript
            </div>
            <div className="absolute -bottom-4 -right-4 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 font-mono text-xs text-cyan-400">
                React / Next.js
            </div>
        </div>
    )
}

function TechStackSection() {
    const t = useTranslations("serviceDetails.development")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

    useEffect(() => {
        if (!sectionRef.current) return

        const items = sectionRef.current.querySelectorAll("[data-tech-item]")
        const triggers: ScrollTrigger[] = []

        items.forEach((item, index) => {
            gsap.set(item, { opacity: 0, y: 20 })

            const tween = gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: index * 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((t) => t.kill())
    }, [])

    const technologies = [
        { name: "Next.js", category: "Framework" },
        { name: "React", category: "Library" },
        { name: "TypeScript", category: "Language" },
        { name: "Node.js", category: "Runtime" },
        { name: "PostgreSQL", category: "Database" },
        { name: "Prisma", category: "ORM" },
        { name: "TailwindCSS", category: "Styling" },
        { name: "Vercel", category: "Deployment" },
    ]

    return (
        <section id="tech-stack" ref={sectionRef} className="py-24 md:py-32 border-y border-foreground/5">
            <Container>
                <div ref={titleRef} className="text-center mb-12">
                    <h2 className="font-sans text-3xl font-normal tracking-tight text-primary md:text-4xl mb-3">
                        {t("techStack.title")}
                    </h2>
                    <p className="text-primary/60 font-mono text-sm">
                        {t("techStack.subtitle")}
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {technologies.map((tech) => (
                        <div
                            key={tech.name}
                            data-tech-item
                            className="group px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/2 hover:bg-foreground/5 hover:border-emerald-500/30 transition-all cursor-default"
                        >
                            <p className="font-sans text-sm font-medium text-primary group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {tech.name}
                            </p>
                            <p className="font-mono text-xs text-primary/50">{t(`techStack.categories.${tech.category}`)}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
