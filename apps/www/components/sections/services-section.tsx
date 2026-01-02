"use client"

import { useGSAPReveal } from "@/hooks/use-gsap-reveal"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ServicesSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useGSAPReveal({ direction: "up", delay: 0, duration: 0.8 })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll("[data-service-card]")

    cards.forEach((card, index) => {
      const directions = ["up", "right", "left", "down"]
      const direction = directions[index % 4]
      
      let initialState: gsap.TweenVars = { opacity: 0 }
      if (direction === "up") initialState.y = 40
      if (direction === "down") initialState.y = -40
      if (direction === "left") initialState.x = 40
      if (direction === "right") initialState.x = -40

      gsap.set(card, initialState)

      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (sectionRef.current?.contains(trigger.vars.trigger as Element)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
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
      </div>
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
          className="h-px w-8 bg-foreground/30 transition-colors group-hover:bg-foreground/50"
        />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
