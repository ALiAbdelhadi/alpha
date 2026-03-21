"use client"

import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Frown, HelpCircle, Hourglass, TrendingDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { Container } from "../container"

export const ProblemSection = memo(function ProblemSection() {
  const t = useTranslations()

  const eyebrowRef = useReveal<HTMLParagraphElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0,
  })

  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

  const subtitleRef = useReveal<HTMLParagraphElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.15,
  })

  const cardsRef = useBatch<HTMLDivElement>({
    ...DEFAULTS.card,
    selector: ".problem-card",
    ease: MOTION.ease.smooth,
    stagger: MOTION.stagger.loose,
    once: true,
  })

  const quoteRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0,
  })

  const problems = [
    { icon: <Frown className="h-5 w-5" />, title: t("problem.issues.templates.title"), description: t("problem.issues.templates.description") },
    { icon: <Hourglass className="h-5 w-5" />, title: t("problem.issues.speed.title"), description: t("problem.issues.speed.description") },
    { icon: <HelpCircle className="h-5 w-5" />, title: t("problem.issues.confusion.title"), description: t("problem.issues.confusion.description") },
    { icon: <TrendingDown className="h-5 w-5" />, title: t("problem.issues.amateurs.title"), description: t("problem.issues.amateurs.description") },
  ]

  return (
    <section
      id="problem"
      className="section-padding border-y border-foreground/8"
    >
      <Container>
        <div className="max-w-3xl mb-20">
          <p ref={eyebrowRef} className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-6 block">
            01 - {t("problem.badge")}
          </p>
          <h2
            ref={titleRef}
            className="font-sans font-normal text-primary leading-[1.05] mb-8"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
          >
            {t("problem.title.pre")}{" "}
            <span className="text-primary/20 line-through decoration-primary/15">
              {t("problem.title.crossed")}
            </span>{" "}
            <span
              className="text-primary"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
            >
              {t("problem.title.gradient")}
            </span>
          </h2>
          <p ref={subtitleRef} className="text-base text-primary/50 leading-relaxed max-w-2xl">
            {t("problem.subtitle")}
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-28">
          {problems.map((problem, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className={cn("md:col-span-5 group flex flex-col items-start problem-card", isEven ? "md:col-start-1" : "md:col-start-7 lg:col-start-8")}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[10px] text-primary/20 tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px w-8 bg-foreground/8 group-hover:w-12 group-hover:bg-foreground/20 transition-all duration-500" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-primary/30 group-hover:text-primary/60 transition-colors duration-400">
                    {problem.icon}
                  </div>
                  <h3 className="font-sans font-medium text-primary text-xl tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="text-base text-primary/45 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-28 pt-16 border-t border-foreground/8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div ref={quoteRef} className="md:col-span-8">
            <p
              className="font-sans font-light text-primary/75 leading-snug"
              style={{ fontSize: "clamp(20px, 3vw, 30px)", letterSpacing: "-0.02em" }}
            >
              &ldquo;{t("problem.quote")}&rdquo;
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <div className="flex flex-col ltr:items-end rtl:items-start">
              <p className="font-mono text-xs text-primary/40 uppercase tracking-[0.25em] mb-1">
                - {t("problem.author")}
              </p>
              <span className="font-mono text-[10px] text-primary/20 uppercase tracking-[0.2em]">
                {t("problem.common.creativeDirection")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
})
