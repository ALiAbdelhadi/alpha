"use client"

import { useGSAPReveal } from "@/hooks/use-gsap-reveal"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function WorkSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useGSAPReveal({ direction: "left", delay: 0, duration: 0.8 })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll("[data-project-card]")
    
    cards.forEach((card, index) => {
      const direction = index % 2 === 0 ? "left" : "right"
      const xValue = direction === "left" ? -60 : 60

      gsap.set(card, { opacity: 0, x: xValue })

      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
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
      id="work"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center px-6 pt-20 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {t("work.title")}
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ {t("work.subtitle")}</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: t("work.projects.project1.title"),
              category: t("work.projects.project1.category"),
              year: t("work.projects.project1.year"),
            },
            {
              number: "02",
              title: t("work.projects.project2.title"),
              category: t("work.projects.project2.category"),
              year: t("work.projects.project2.year"),
            },
            {
              number: "03",
              title: t("work.projects.project3.title"),
              category: t("work.projects.project3.category"),
              year: t("work.projects.project3.year"),
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: { number: string; title: string; category: string; year: string }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    const title = card.querySelector("h3")

    const handleMouseEnter = () => {
      gsap.to(title, {
        x: 8,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(title, {
        x: 0,
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
    <div
      ref={cardRef}
      data-project-card
      className="group flex items-center justify-between border-b border-foreground/10 py-6 hover:border-foreground/20 md:py-8"
      style={{
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}
