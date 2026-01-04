"use client"

import { useReveal, useBatchReveal } from "@/hooks/use-animation"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useMemo } from "react"
import { Container } from "../container"

export function WorkSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal<HTMLDivElement>({ direction: "left", delay: 0, duration: 0.8 })

  useBatchReveal<HTMLElement>({
    targets: "[data-project-card]",
    direction: "left",
    distance: 60,
    duration: 0.6, 
    stagger: 0.1,
    alternate: true,
  })

  const projects = useMemo(() => [
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
  ], [t])

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
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const cardStyle = useMemo(() => ({
    marginLeft: index % 2 === 0 ? "0" : "auto",
    maxWidth: index % 2 === 0 ? "85%" : "90%",
  }), [index])

  useEffect(() => {
    const card = cardRef.current
    const title = titleRef.current
    if (!card || !title) return

    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.to(title, {
        x: 8,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.to(title, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      data-project-card
      className="group flex items-center justify-between border-b border-foreground/10 py-6 hover:border-foreground/20 md:py-8 will-change-transform"
      style={cardStyle}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3
            ref={titleRef}
            className="mb-1 font-sans text-2xl font-light text-foreground md:text-3xl lg:text-4xl will-change-transform"
          >
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}