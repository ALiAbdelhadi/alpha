"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"
import { Container } from "../container"

export function WorkSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal<HTMLDivElement>({ direction: "left", delay: 0, duration: 0.5 })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll("[data-project-card]")
    const sectionElement = sectionRef.current
    const triggers: ScrollTrigger[] = []

    cards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 20,
      })

      const revealTween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.08,
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
      link: t("work.projects.project1.link"),
      year: t("work.projects.project1.year"),
    },
    {
      number: "02",
      title: t("work.projects.project2.title"),
      category: t("work.projects.project2.category"),
      link: t("work.projects.project2.link"),
      year: t("work.projects.project2.year"),
    },
    {
      number: "03",
      title: t("work.projects.project3.title"),
      category: t("work.projects.project3.category"),
      link: t("work.projects.project3.link"),
      year: t("work.projects.project3.year"),
    },
    {
      number: "04",
      title: t("work.projects.project4.title"),
      category: t("work.projects.project4.category"),
      link: t("work.projects.project4.link"),
      year: t("work.projects.project4.year"),
    }
  ], [t])

  return (
    <section
      id="work"
      suppressHydrationWarning={true}
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-24 md:pt-32"
    >
      <Container>
        <div ref={titleRef} className="mb-16 md:mb-20">
          <h2 className="mb-3 font-sans text-5xl font-normal tracking-tight text-primary md:text-6xl lg:text-7xl">
            {t("work.title")}
          </h2>
          <p className="font-mono text-sm text-primary/60 tracking-wide md:text-base">
            {t("work.subtitle")}
          </p>
        </div>
        <div className="space-y-0">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} index={0} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectCard({
  project,
}: {
  project: { number: string; title: string; category: string; year: string; link: string }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const categoryRef = useRef<HTMLParagraphElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const title = titleRef.current
    const number = numberRef.current
    const category = categoryRef.current
    const year = yearRef.current
    if (!card || !title) return

    const handleMouseEnter = () => {
      if (title) gsap.to(title, {
        x: 6,
        duration: 0.25,
        ease: "power2.out",
      })
      if (number) gsap.to(number, {
        x: -2,
        opacity: 0.6,
        duration: 0.25,
        ease: "power2.out",
      })
      if (category) gsap.to(category, {
        x: 4,
        opacity: 0.75,
        duration: 0.25,
        ease: "power2.out",
      })
      if (year) gsap.to(year, {
        opacity: 0.5,
        duration: 0.25,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      const elements = [title, number, category, year].filter(Boolean) as Element[]
      if (elements.length === 0) return
      
      gsap.to(elements, {
        x: 0,
        opacity: (i, el) => {
          if (el === title) return 1
          if (el === number) return 0.4
          return 0.6
        },
        duration: 0.25,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer">
      <div
        ref={cardRef}
        data-project-card
        className="group flex items-center justify-between border-b border-foreground/10 py-8 hover:border-foreground/20 transition-colors md:py-10 cursor-pointer"
      >
        <div className="flex items-baseline gap-6 md:gap-10">
          <span
            ref={numberRef}
            className="font-mono text-sm text-primary/60 transition-all md:text-base"
          >
            {project.number}
          </span>
          <div>
            <h3
              ref={titleRef}
              className="mb-2 font-sans text-2xl font-medium text-primary transition-all md:text-3xl lg:text-4xl"
            >
              {project.title}
            </h3>
            <p
              ref={categoryRef}
              className="font-mono text-xs text-primary/60 transition-all md:text-sm"
            >
              {project.category}
            </p>
          </div>
        </div>
        <span
          ref={yearRef}
          className="hidden font-mono text-sm text-primary/60 transition-all md:block"
        >
          {project.year}
        </span>
        <svg 
          className="ml-4 h-5 w-5 text-primary/60 transition-all ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 group-hover:text-primary/70 rtl:-rotate-180" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}