"use client"

import { Container } from "@/components/container"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

interface Testimonial {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

const hasTestimonials = false

export function SocialProofSection() {
    if (!hasTestimonials) return null

    const t = useTranslations("socialProof")
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })

    const testimonials: Testimonial[] = []

    useEffect(() => {
        if (!sectionRef.current) return

        const cards = sectionRef.current.querySelectorAll("[data-testimonial-card]")
        const triggers: ScrollTrigger[] = []

        cards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 24 })

            const tween = gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })

            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
        })

        return () => triggers.forEach((trigger) => trigger.kill())
    }, [])

    return (
        <section
            ref={sectionRef}
            id="social-proof"
            className="section-padding"
            aria-label={t("title")}
        >
            <Container>
                <div ref={titleRef} className="mb-16 text-center">
                    <h2 className="font-sans font-normal text-primary">
                        {t("title")}
                    </h2>
                    <p className="mt-4 body-lg text-primary/70 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <TestimonialCard key={i} testimonial={testimonial} />
                    ))}
                </div>
            </Container>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const initials = testimonial.author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <div
            data-testimonial-card
            className="rounded-2xl border border-foreground/15 bg-foreground/5 p-6 transition-colors hover:border-foreground/25"
        >
            <blockquote className="body text-primary/90 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground/15 font-mono text-sm font-medium text-primary"
                    aria-hidden
                >
                    {testimonial.avatar ? (
                        <img
                            src={testimonial.avatar}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        initials
                    )}
                </div>
                <div>
                    <p className="font-medium text-primary">{testimonial.author}</p>
                    <p className="mono small text-primary/60">
                        {testimonial.role} · {testimonial.company}
                    </p>
                </div>
            </div>
        </div>
    )
}
