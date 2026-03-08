"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"
import { Frown, Hourglass, HelpCircle, TrendingDown } from "lucide-react"

export function ProblemSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
  const subtitleRef = useReveal({ direction: "up", delay: 0.1, duration: 0.5 })

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const cards = sectionElement.querySelectorAll("[data-problem-card]")
    if (cards.length === 0) return

    const triggers: ScrollTrigger[] = []

    cards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 30,
      })

      const revealTween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,      
        delay: index * 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
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

  const problems = [
    {
      icon: <Frown className="h-8 w-8 text-rose-500/80" strokeWidth={1.5} />,
      title: t("problem.issues.templates.title"),
      description: t("problem.issues.templates.description"),
    },
    {
      icon: <Hourglass className="h-8 w-8 text-amber-500/80" strokeWidth={1.5} />,
      title: t("problem.issues.speed.title"),
      description: t("problem.issues.speed.description"),
    },
    {
      icon: <HelpCircle className="h-8 w-8 text-blue-500/80" strokeWidth={1.5} />,
      title: t("problem.issues.confusion.title"),
      description: t("problem.issues.confusion.description"),
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-emerald-500/80" strokeWidth={1.5} />,
      title: t("problem.issues.amateurs.title"),
      description: t("problem.issues.amateurs.description"),
    },
  ]

  return (
    <section
      suppressHydrationWarning={true}
      id="problem"
      ref={sectionRef}
      className="flex w-full items-center section-padding bg-foreground/[0.01] border-y border-border/50"
    >
      <Container>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div ref={titleRef}>
             <span className="mono-uppercase text-primary/50 mb-4 tracking-widest block">
                {t("problem.badge")}
             </span>
             <h2 className="mb-6 font-sans font-normal text-primary">
               {t("problem.title.pre")}{" "}
               <span className="text-primary/40 line-through decoration-rose-500/50">
                 {t("problem.title.crossed")}
               </span>{" "}
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 font-medium">
                 {t("problem.title.gradient")}
               </span>
             </h2>
          </div>
          <p ref={subtitleRef} className="body-lg text-primary/70">
            {t("problem.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              data-problem-card
              className="relative group overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 transition-colors duration-300 hover:border-border hover:bg-foreground/[0.02]"
            >
              <div className="mb-6 inline-flex rounded-xl bg-foreground/5 p-3 ring-1 ring-inset ring-foreground/10">
                {problem.icon}
              </div>
              <h3 className="mb-3 text-xl font-medium text-primary">
                {problem.title}
              </h3>
              <p className="body text-primary/70">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bridge to solution */}
        <div className="mt-16 md:mt-24 text-center max-w-2xl mx-auto rounded-2xl bg-foreground/[0.03] border border-border/50 p-8 md:p-10">
            <p className="body-lg text-primary/90 italic mb-4">
              "{t("problem.quote")}"
            </p>
            <p className="mono small text-teal-500/70 uppercase tracking-widest">
              — {t("problem.author")}
            </p>
        </div>
      </Container>
    </section>
  )
}
