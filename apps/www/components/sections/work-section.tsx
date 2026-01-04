"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useRef } from "react"
import { Container } from "../container"

export function WorkSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal<HTMLDivElement>({ direction: "left", delay: 0, duration: 0.8 })

  // Enhanced batch reveal with parallax effect
  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll("[data-project-card]")
    
    const sectionElement = sectionRef.current
    const triggers: ScrollTrigger[] = []

    cards.forEach((card, index) => {
      const isEven = index % 2 === 0
      const distance = isEven ? 80 : -80

      // Set initial state
      gsap.set(card, {
        opacity: 0,
        x: distance,
        y: 20,
        scale: 0.95,
        rotation: isEven ? -2 : 2,
        force3D: true,
        willChange: "transform, opacity"
      })

      // Create reveal animation
      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(card, { willChange: "auto" })
        }
      })

    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      if (sectionElement) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (sectionElement.contains(trigger.vars.trigger as Element)) {
            trigger.kill()
          }
        })
      }
    }
  }, [])

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
  const numberRef = useRef<HTMLSpanElement>(null)
  const categoryRef = useRef<HTMLParagraphElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const cardStyle = useMemo(() => ({
    marginLeft: index % 2 === 0 ? "0" : "auto",
    maxWidth: index % 2 === 0 ? "85%" : "90%",
  }), [index])

  useEffect(() => {
    const card = cardRef.current
    const title = titleRef.current
    const number = numberRef.current
    const category = categoryRef.current
    const year = yearRef.current
    if (!card || !title) return

    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.timeline()
      
      animationRef.current
        .to(title, {
          x: 12,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(number, {
          x: -4,
          opacity: 0.7,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(category, {
          x: 8,
          opacity: 0.8,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(year, {
          opacity: 0.6,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(card, {
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
    }

    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.timeline()
      
      animationRef.current
        .to(title, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(number, {
          x: 0,
          opacity: 0.3,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(category, {
          x: 0,
          opacity: 0.5,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(year, {
          opacity: 0.3,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
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
      className="group flex items-center justify-between border-b border-foreground/10 py-6 hover:border-foreground/20 md:py-8 will-change-transform cursor-pointer"
      style={cardStyle}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span 
          ref={numberRef}
          className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base will-change-transform"
        >
          {project.number}
        </span>
        <div>
          <h3
            ref={titleRef}
            className="mb-1 font-sans text-2xl font-light text-foreground md:text-3xl lg:text-4xl will-change-transform"
          >
            {project.title}
          </h3>
          <p 
            ref={categoryRef}
            className="font-mono text-xs text-foreground/50 md:text-sm will-change-transform"
          >
            {project.category}
          </p>
        </div>
      </div>
      <span 
        ref={yearRef}
        className="font-mono text-xs text-foreground/30 md:text-sm will-change-transform"
      >
        {project.year}
      </span>
    </div>
  )
}