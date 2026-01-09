// apps/www/components/sections/about-section.tsx (replace stat3)
"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"

export function AboutSection({ scrollToSection }: { scrollToSection?: (sectionId: string) => void }) {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)

  const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })
  const descriptionRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.15, duration: 0.5 })
  const buttonsRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.5, duration: 0.4 })

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const stats = sectionElement.querySelectorAll("[data-stat]")
    const triggers: ScrollTrigger[] = []

    stats.forEach((stat, index) => {
      const valueElement = stat.querySelector("[data-stat-value]")
      const borderElement = stat.querySelector("[data-stat-border]")

      gsap.set(stat, {
        opacity: 0,
        y: 20,
      })

      if (borderElement) {
        gsap.set(borderElement, {
          scaleY: 0,
          transformOrigin: "bottom center"
        })
      }

      const revealTween = gsap.to(stat, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      if (revealTween.scrollTrigger) {
        triggers.push(revealTween.scrollTrigger)
      }

      if (borderElement) {
        const borderTween = gsap.to(borderElement, {
          scaleY: 1,
          duration: 0.4,
          delay: index * 0.1 + 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          }
        })

        if (borderTween.scrollTrigger) {
          triggers.push(borderTween.scrollTrigger)
        }
      }

      if (valueElement) {
        const finalValue = valueElement.textContent || ""
        const numericValue = parseInt(finalValue.replace(/\D/g, ""))

        if (!isNaN(numericValue)) {
          const counterObj = { value: 0 }
          const counterTween = gsap.to(counterObj, {
            value: numericValue,
            duration: 1.0,
            delay: index * 0.1 + 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
            onUpdate: function () {
              const currentValue = Math.floor(counterObj.value)
              valueElement.textContent = finalValue.replace(/\d+/, currentValue.toString())
            }
          })

          if (counterTween.scrollTrigger) {
            triggers.push(counterTween.scrollTrigger)
          }
        }
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

  return (
    <section
      suppressHydrationWarning={true}
      id="about"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-24 md:pt-32"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
          <div>
            <div ref={titleRef} className="mb-10 md:mb-14">
              <h2 className="mb-4 font-sans text-4xl font-normal leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {t("about.title")}
                <br />
                {t("about.title2")}
                <br />
                <span className="text-foreground/70">{t("about.title3")}</span>
              </h2>
            </div>
            <div ref={descriptionRef} className="space-y-5 md:space-y-6">
              <p className="max-w-lg text-base leading-relaxed text-foreground/85 md:text-lg">
                {t("about.description1")}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-foreground/85 md:text-lg">
                {t("about.description2")}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-10 md:space-y-14">
            {[
              {
                value: t("about.stat1.value"),
                label: t("about.stat1.label"),
                sublabel: t("about.stat1.sublabel")
              },
              {
                value: t("about.stat2.value"),
                label: t("about.stat2.label"),
                sublabel: t("about.stat2.sublabel")
              },
              {
                value: t("about.stat3.value"),
                label: t("about.stat3.label"),
                sublabel: t("about.stat3.sublabel")
              },
            ].map((stat, i) => (
              <div
                key={i}
                data-stat
                className="flex items-baseline gap-6 pl-6 md:gap-10 md:pl-10 relative"
              >
                <div
                  data-stat-border
                  className="absolute left-0 top-0 bottom-0 w-px bg-foreground/25 origin-bottom"
                />
                <div
                  data-stat-value
                  className="text-4xl font-normal text-foreground md:text-5xl lg:text-6xl tabular-nums"
                >
                  {stat.value}
                </div>
                <div>
                  <div className="font-sans text-lg font-medium text-foreground md:text-xl">
                    {stat.label}
                  </div>
                  <div className="font-mono text-xs text-foreground/60 tracking-wide">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={buttonsRef} className="mt-12 flex flex-wrap gap-4 md:mt-20">
          <MagneticButton
            size="lg"
            variant="primary"
            onClick={() => scrollToSection?.("contact")}
          >
            {t("about.ctaPrimary")}
          </MagneticButton>
          <MagneticButton
            size="lg"
            variant="secondary"
            onClick={() => scrollToSection?.("work")}
          >
            {t("about.ctaSecondary")}
          </MagneticButton>
        </div>
      </Container>
    </section>
  )
}