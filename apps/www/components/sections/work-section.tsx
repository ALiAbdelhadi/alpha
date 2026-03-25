"use client"

import { Container } from "@/components/container"
import { useLoading } from "@/components/providers/loading-provider"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { memo, useLayoutEffect, useRef } from "react"

interface Project {
  number: string
  title: string
  cat: string
  year: string
  link: string
  accent: string
}

const ProjectPreview = memo(function ProjectPreview({
  category,
  number,
  accent,
}: {
  title: string
  category: string
  number: string
  accent: string
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 18%, ${accent.replace(/[\d.]+\)$/, "0.22)")} 0%, transparent 30%), linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 42%, rgba(0,0,0,0.12) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-x-6 top-16 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">
            {category}
          </span>
          <span className="font-mono text-[10px] text-white/35">{number}</span>
        </div>
        <div className="grid gap-3">
          <div className="h-3 w-24 rounded-full bg-white/15" />
          <div className="h-10 max-w-[16rem] rounded-[1rem] bg-white/10" />
          <div className="grid gap-2 pt-3 md:grid-cols-2">
            <div className="h-20 rounded-[1.25rem] border border-white/10 bg-black/15" />
            <div className="h-20 rounded-[1.25rem] border border-white/10 bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  )
})
const ProjectCard = memo(function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={p.link} target="_blank" rel="noopener noreferrer" className="group block flex-none">
      <div
        data-hcard
        className="project-card relative select-none"
        style={{
          width: "clamp(360px, 36vw, 640px)",
          aspectRatio: "16 / 10",
          borderRadius: "6px",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(10,10,10,1) 100%)",
        }}
      >
        <ProjectPreview title={p.title} category={p.cat} number={p.number} accent={p.accent} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.05) 0%, transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${p.accent} 0%, transparent 75%)`,
            opacity: 0.55,
          }}
        />
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 pt-6">
          <span
            className="font-mono uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.52)" }}
          >
            {p.cat}
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.34)", letterSpacing: "0.14em" }}
          >
            {p.year}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
          <div className="flex items-end justify-between gap-4">
            <h3
              className="font-sans text-white"
              style={{
                fontSize: "clamp(18px, 1.8vw, 26px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                fontWeight: 400,
                maxWidth: "80%",
              }}
            >
              {p.title}
            </h3>
            <div
              className="shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 34,
                height: 34,
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.68)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.6"
                className="rtl:-rotate-180 transition-transform duration-500 group-hover:translate-x-[2px]"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
        <p className="project-card-label font-mono" style={{ fontSize: "12px", letterSpacing: "0.14em" }}>
          {p.title}
        </p>
        <span className="project-card-meta font-mono" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
          {p.cat}
        </span>
      </div>
    </Link>
  )
})


export const WorkSection = memo(function WorkSection() {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()

  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 })
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 })

  const projects: Project[] = [
    {
      number: "01",
      title: t("work.projects.project1.title"),
      cat: t("work.projects.project1.category"),
      year: t("work.projects.project1.year"),
      link: t("work.projects.project1.link"),
      accent: "rgba(74,110,212,0.6)",
    },
    {
      number: "02",
      title: t("work.projects.project2.title"),
      cat: t("work.projects.project2.category"),
      year: t("work.projects.project2.year"),
      link: t("work.projects.project2.link"),
      accent: "rgba(52,211,153,0.5)",
    },
    {
      number: "03",
      title: t("work.projects.project3.title"),
      cat: t("work.projects.project3.category"),
      year: t("work.projects.project3.year"),
      link: t("work.projects.project3.link"),
      accent: "rgba(248,163,50,0.5)",
    },
    {
      number: "04",
      title: t("work.projects.project4.title"),
      cat: t("work.projects.project4.category"),
      year: t("work.projects.project4.year"),
      link: t("work.projects.project4.link"),
      accent: "rgba(167,139,250,0.5)",
    },
  ]

  useLayoutEffect(() => {
    if (!isInitialLoadComplete) return
    if (!outerRef.current || !stickyRef.current || !trackRef.current) return

    const isRTL = document.documentElement.dir === "rtl"
    const mm = gsap.matchMedia()

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      let teardown: (() => void) | undefined

      const setup = () => {
        const outer = outerRef.current
        const sticky = stickyRef.current
        const track = trackRef.current
        if (!outer || !sticky || !track) return

        const trackW = track.scrollWidth
        const viewW = document.documentElement.clientWidth
        const moveBy = trackW - viewW + 96

        gsap.set(track, { x: 0 })

        if (moveBy <= 0) {
          outer.style.height = ""
          return
        }

        outer.style.height = `${moveBy + window.innerHeight}px`

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: () => `+=${trackRef.current!.scrollWidth - document.documentElement.clientWidth + 96}`,
            pin: sticky,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh() {
              if (!outerRef.current || !trackRef.current) return
              const newMoveBy = trackRef.current.scrollWidth - document.documentElement.clientWidth + 96
              outerRef.current.style.height =
                newMoveBy > 0 ? `${newMoveBy + window.innerHeight}px` : ""
            },
          },
        })

        tl.to(track, { x: isRTL ? moveBy : -moveBy, ease: "none" })
        ScrollTrigger.refresh()

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      }

      const raf = requestAnimationFrame(() => { teardown = setup() })

      return () => {
        cancelAnimationFrame(raf)
        teardown?.()
      }
    })

    mm.add("(max-width: 899px)", () => {
      if (outerRef.current) outerRef.current.style.height = ""
      if (trackRef.current) gsap.set(trackRef.current, { clearProps: "transform" })
    })

    return () => mm.revert()
  }, [isInitialLoadComplete])


  return (
    <div id="work">
      <div
        ref={outerRef}
        data-animate-section
        className="relative hidden min-[900px]:block"
        style={{ overflowX: "clip" }}
      >
        <div ref={stickyRef} className="sticky top-0 h-screen w-full flex flex-col">
          <div className="relative p-8 md:p-12 pb-0!">
            <div
              data-service-header
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12"
            >
              <div className="space-y-3 flex items-start flex-col justify-center w-full">
                <p
                  ref={eyebrowRef}
                  className="mono-uppercase text-xs tracking-[0.25em] text-muted-foreground/60"
                >
                  {t("work.eyebrow")}
                </p>
                <h2
                  ref={titleRef}
                  className="font-sans font-light text-primary leading-[1.05]"
                  style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
                >
                  {t("work.title")}
                </h2>
                <p ref={descRef} className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {t("work.subtitle")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center" style={{ overflowX: "clip" }}>
            <div
              ref={trackRef}
              className="flex gap-10 items-center"
              style={{ paddingInlineStart: "40px", paddingInlineEnd: "120px" }}
            >
              {projects.map((p) => (
                <ProjectCard key={p.number} p={p} />
              ))}
            </div>
          </div>
          <div className="flex-none px-10 pb-5 flex items-center gap-4">
            <div className="flex-1 h-px bg-foreground/5" />
            <div className="flex items-center gap-2 text-primary/20">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">scroll</span>
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                className="rtl:-rotate-180"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <section
        className="w-full section-padding min-[900px]:hidden"
        data-animate-section
      >
        <Container>
          <div data-reveal data-beat="0" className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-3">
              {t("work.eyebrow")}
            </p>
            <h2
              className="font-sans font-light text-primary"
              style={{
                fontSize: "clamp(26px, 7vw, 40px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {t("work.title")}
            </h2>
          </div>
          <div className="h-px w-full bg-foreground/6 mb-6" />
          <div className="flex flex-col gap-10">
            {projects.map((p) => (
              <Link
                key={p.number}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                data-project-card
              >
                <div
                  className="relative w-full overflow-hidden mb-3"
                  style={{ aspectRatio: "16 / 9", borderRadius: "8px" }}
                >
                  <ProjectPreview title={p.title} category={p.cat} number={p.number} accent={p.accent} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}
                  />
                  <span
                    className="absolute bottom-4 ltr:left-4 rtl:right-4 font-mono uppercase backdrop-blur-sm"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.7)",
                      border: "0.5px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.08)",
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {p.cat}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 px-1">
                  <div>
                    <p
                      className="font-mono text-muted-foreground/60 mb-1.5"
                      style={{ fontSize: "12px", letterSpacing: "0.18em" }}
                    >
                      {p.number}
                    </p>
                    <h3
                      className="font-sans font-normal text-primary group-hover:text-primary/60 transition-colors duration-300"
                      style={{
                        fontSize: "clamp(15px, 4vw, 19px)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[12px] text-muted-foreground/60 shrink-0 mt-1">
                    {p.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase text-muted-foreground/40 tracking-[0.25em]">
              {String(projects.length).padStart(2, "0")} {t("work.projectsLabel")}
            </span>
            <div className="flex-1 h-px bg-foreground/5" />
          </div>
        </Container>
      </section>
    </div>
  )
})