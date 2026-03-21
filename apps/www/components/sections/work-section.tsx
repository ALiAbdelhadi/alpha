// motion: useText(heading) h2, useReveal eyebrow/subtitle; MOTION on ScrollTrigger.batch cards
"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { memo, useMemo, useRef } from "react"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { Container } from "../container"

export const WorkSection = memo(function WorkSection() {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()
  const sectionRef = useRef<HTMLElement>(null)

  const eyebrowRef = useReveal<HTMLParagraphElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth })
  const titleRef = useText<HTMLHeadingElement>({ ...DEFAULTS.heading, ease: MOTION.ease.text })
  const subtitleRef = useReveal<HTMLParagraphElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.1 })

  useGSAPSection({ trigger: sectionRef }, () => {
    if (!isInitialLoadComplete || !sectionRef.current) return

    const cards = sectionRef.current!.querySelectorAll<HTMLElement>("[data-project-card]")
    if (!cards.length) return

    gsap.set(cards, { willChange: "transform, opacity" })

    ScrollTrigger.batch(cards, {
      start: MOTION.trigger.late,
      once: true,
      interval: 0.1,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: MOTION.distance.md,
          duration: MOTION.duration.text,
          stagger: MOTION.stagger.base,
          ease: MOTION.ease.smooth,
          onComplete() {
            gsap.set(batch, { willChange: "auto" })
          },
        })
      },
    })
  }, [isInitialLoadComplete])

  const projects = useMemo(() => [
    { number: "01", title: t("work.projects.project1.title"), category: t("work.projects.project1.category"), link: t("work.projects.project1.link"), year: t("work.projects.project1.year") },
    { number: "02", title: t("work.projects.project2.title"), category: t("work.projects.project2.category"), link: t("work.projects.project2.link"), year: t("work.projects.project2.year") },
    { number: "03", title: t("work.projects.project3.title"), category: t("work.projects.project3.category"), link: t("work.projects.project3.link"), year: t("work.projects.project3.year") },
    { number: "04", title: t("work.projects.project4.title"), category: t("work.projects.project4.category"), link: t("work.projects.project4.link"), year: t("work.projects.project4.year") },
  ], [t])

  return (
    <section
      id="work"
      suppressHydrationWarning
      ref={sectionRef}
      className="flex w-full items-center section-padding"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <div className="mb-6 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
              {t("work.eyebrow")}
            </p>
            <h2
              ref={titleRef}
              className="font-sans font-normal text-primary leading-[1.05]"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
            >
              {t("work.title")}
            </h2>
          </div>
          <p ref={subtitleRef} className="font-mono text-xs text-primary/35 hidden md:block tracking-widest">
            {t("work.subtitle")}
          </p>
        </div>
        <div className="h-px w-full bg-foreground/8 mb-0" />
        <div>
          {projects.map((project) => (
            <ProjectRow key={project.number} project={project} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase text-primary/20 tracking-[0.25em]">
            {projects.length.toString().padStart(2, "0")} {t("work.projectsLabel") ?? "Projects"}
          </span>
          <div className="flex-1 h-px bg-foreground/5" />
        </div>
      </Container>
    </section>
  )
})

const ProjectRow = memo(function ProjectRow({
  project,
}: {
  project: { number: string; title: string; category: string; year: string; link: string }
}) {
  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer">
      <div
        data-project-card
        className="relative overflow-hidden border-b border-foreground/8 py-8 cursor-pointer group px-4"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/2 pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        />
        <div
          className="relative z-10 grid items-center gap-6"
          style={{ gridTemplateColumns: "56px 1fr auto" }}
        >
          <span className="font-mono text-xl font-light text-primary/20 leading-none group-hover:text-primary/55 group-hover:-translate-x-0.5 transition-all duration-200">
            {project.number}
          </span>
          <div>
            <h3
              className="font-sans font-medium text-primary mb-1 group-hover:translate-x-1.5 transition-transform duration-200"
              style={{ fontSize: "clamp(17px, 2.5vw, 23px)", letterSpacing: "-0.015em" }}
            >
              {project.title}
            </h3>
            <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.18em]">
              {project.category}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-primary/25 hidden md:block">
              {project.year}
            </span>
            <svg
              className="h-4 w-4 text-primary/25 transition-all duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:text-primary/55 rtl:-rotate-180"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
})
