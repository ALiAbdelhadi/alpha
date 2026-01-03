"use client"

import { useReveal, useBatchReveal } from "@/hooks/use-animation"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"

export function WorkSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal<HTMLDivElement>({ direction: "left", delay: 0, duration: 0.8 })

  // Batch animate project cards with alternating directions
  useBatchReveal<HTMLElement>({
    targets: "[data-project-card]",
    direction: "left",
    distance: 60,
    duration: 0.8,
    stagger: 0.15,
    alternate: true,
  })

  return (
    <section
      id="work"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-20 md:pt-24"
    >
      <Container>
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
      </Container>
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
