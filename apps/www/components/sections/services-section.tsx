"use client"

import { useReveal, useBatchReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"

export function ServicesSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.8 })

  // Batch animate service cards with staggered timing
  useBatchReveal<HTMLElement>({
    targets: "[data-service-card]",
    direction: "up",
    distance: 40,
    duration: 0.8,
    stagger: 0.1,
  })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-20 md:pt-24"
    >
      <Container>
        <div ref={titleRef} className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t("services.title")}
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ {t("services.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
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

    const handleMouseEnter = () => {
      gsap.to(line, {
        width: 48,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(line, {
        width: 32,
        duration: 0.3,
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
    <div ref={cardRef} data-service-card className="group">
      <div className="mb-3 flex items-center gap-3">
        <div
          data-service-line
          className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/60"
        />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
