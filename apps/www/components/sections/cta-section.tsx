"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "../container"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
gsap.registerPlugin(ScrollTrigger)

export function CtaSection({
    scrollToSection,
}: {
    scrollToSection?: (sectionId: string) => void
}) {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const t = useTranslations("cta")
    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".cta-inner",
                { opacity: 0, y: 32 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-28">
            <Container>
                <div className="cta-inner relative overflow-hidden rounded-3xl border px-10 py-16 md:px-16">
                    <div className="pointer-events-none absolute inset-0" />
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                            {t("title")}
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                            {t("description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/schedule">
                                <Button size="lg" className="gap-2">
                                    {t("primaryAction")}
                                    <Calendar className="w-4 h-4" />
                                </Button>
                            </Link>

                            <Link href="/approach">
                                <Button size="lg" variant="ghost" className="gap-2">
                                    {t("secondaryAction")}
                                    <ArrowRight className="w-4 h-4 rtl:-rotate-180" />
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-foreground/70">
                            {t("footnote")}
                        </p>
                    </div>
                </div>
            </Container>
        </section >
    )
}
