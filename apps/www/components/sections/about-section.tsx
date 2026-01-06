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
  const titleRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.8 })
  const descriptionRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2, duration: 0.8 })
  const buttonsRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.75, duration: 0.8 })
  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const stats = sectionElement.querySelectorAll("[data-stat]")
    const triggers: ScrollTrigger[] = []
    
    stats.forEach((stat, index) => {
      const isEven = index % 2 === 0
      const distance = isEven ? 80 : -80
      const valueElement = stat.querySelector("[data-stat-value]")
      const borderElement = stat.querySelector("[data-stat-border]")

      gsap.set(stat, {
        opacity: 0,
        x: distance,
        y: 20,
        scale: 0.95,
        force3D: true,
        willChange: "transform, opacity"
      })

      if (borderElement) {
        gsap.set(borderElement, {
          scaleX: 0,
          transformOrigin: "left center"
        })
      }
      const revealTween = gsap.to(stat, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.3 + (index * 0.2),
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(stat, { willChange: "auto" })
        }
      })

      if (revealTween.scrollTrigger) {
        triggers.push(revealTween.scrollTrigger)
      }
      if (borderElement) {
        const borderTween = gsap.to(borderElement, {
          scaleX: 1,
          duration: 0.8,
          delay: 0.3 + (index * 0.2) + 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
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
            duration: 1.5,
            delay: 0.3 + (index * 0.2) + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            onUpdate: function() {
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
      className="flex min-h-screen w-full items-center pt-20  md:pt-24"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <div ref={titleRef} className="mb-6 md:mb-12">
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                {t("about.title")}
                <br />
                {t("about.title2")}
                <br />
                <span className="text-foreground/40">{t("about.title3")}</span>
              </h2>
            </div>

            <div ref={descriptionRef} className="space-y-3 md:space-y-4">
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                {t("about.description1")}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                {t("about.description2")}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: t("about.stat1.value"), label: t("about.stat1.label"), sublabel: t("about.stat1.sublabel"), direction: "right" },
              { value: t("about.stat2.value"), label: t("about.stat2.label"), sublabel: t("about.stat2.sublabel"), direction: "left" },
              { value: t("about.stat3.value"), label: t("about.stat3.label"), sublabel: t("about.stat3.sublabel"), direction: "right" },
            ].map((stat, i) => (
              <div
                key={i}
                data-stat
                className="flex items-baseline gap-4 pl-4 md:gap-8 md:pl-8 relative will-change-transform"
                style={{
                  marginLeft: i % 2 === 0 ? "0" : "auto",
                  maxWidth: i % 2 === 0 ? "100%" : "85%",
                }}
              >
                <div 
                  data-stat-border
                  className="absolute left-0 top-0 h-full w-px bg-foreground/30 origin-left"
                />
                <div 
                  data-stat-value
                  className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl will-change-contents"
                >
                  {stat.value}
                </div>
                <div>
                  <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                  <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={buttonsRef} className="mt-8 flex flex-wrap gap-3 md:mt-16 md:gap-4">
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.("contact")}>
            {t("about.ctaPrimary")}
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.("work")}>
            {t("about.ctaSecondary")}
          </MagneticButton>
        </div>
      </Container>
    </section>
  )
}
