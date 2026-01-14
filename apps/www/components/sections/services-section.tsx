"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"

export function ServicesSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const cards = sectionElement.querySelectorAll("[data-service-card]")
    if (cards.length === 0) return

    const triggers: ScrollTrigger[] = []

    cards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 20,
      })

      const revealTween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.4,      
        delay: index * 0.06, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      if (revealTween.scrollTrigger) {
        triggers.push(revealTween.scrollTrigger)
      }
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      suppressHydrationWarning={true}
      id="services"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-24 md:pt-32"
    >
      <Container>
        <div ref={titleRef} className="mb-16 md:mb-20">
          <h2 className="mb-3 font-sans text-5xl font-normal tracking-tight text-primary md:text-6xl lg:text-7xl">
            {t("services.title")}
          </h2>
          <p className="font-mono text-sm text-primary/60 tracking-wide md:text-base">
            {t("services.subtitle")}
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:gap-x-28">
          {[
            {
              title: t("services.service1.title"),
              description: t("services.service1.description"),
            },
            {
              title: t("services.service2.title"),
              description: t("services.service2.description"),
            },
            {
              title: t("services.service3.title"),
              description: t("services.service3.description"),
            },
            {
              title: t("services.service4.title"),
              description: t("services.service4.description"),
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; description: string }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const line = card.querySelector("[data-service-line]")
    const number = card.querySelector("[data-service-number]")

    const handleMouseEnter = () => {
      if (line) gsap.to(line, {
        width: 56,
        duration: 0.25,
        ease: "power2.out",
      })
      if (number) gsap.to(number, {
        x: 4,
        opacity: 0.8,
        duration: 0.25,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      if (line) gsap.to(line, {
        width: 40,
        duration: 0.25,
        ease: "power2.out",
      })
      if (number) gsap.to(number, {
        x: 0,
        opacity: 0.5,
        duration: 0.25,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      data-service-card
      className="group cursor-default"
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          data-service-line
          className="h-px w-10 bg-foreground/25 transition-colors group-hover:bg-foreground/40"
        />
        <span
          data-service-number
          className="font-mono text-xs text-primary/50 transition-all"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mb-3 font-sans text-2xl font-medium text-primary transition-colors group-hover:text-primary/90 md:text-3xl">
        {service.title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-primary/75 md:text-lg">
        {service.description}
      </p>
    </div>
  )
}