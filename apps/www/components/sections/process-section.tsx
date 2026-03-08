"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Container } from "../container"

export function ProcessSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const items = sectionElement.querySelectorAll("[data-process-item]")
    if (items.length === 0) return

    const triggers: ScrollTrigger[] = []

    items.forEach((item, index) => {
      const number = item.querySelector("[data-process-number]")
      const content = item.querySelector("[data-process-content]")
      const line = item.querySelector("[data-process-line]")

      // Initial state
      gsap.set(item, { opacity: 0, y: 30 })
      if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top" })

      // Reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        }
      })

      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })

      if (line) {
        tl.to(line, {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.inOut",
        }, "-=0.2")
      }

      const tween = tl.pause()
      
      // We manually add the triggers array so we can kill them on unmount
      if (tl.scrollTrigger) {
         triggers.push(tl.scrollTrigger)
      } else {
        tl.play() // fallback if scrollTrigger failed setup
      }
      
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      suppressHydrationWarning={true}
      id="process"
      ref={sectionRef}
      className="flex w-full items-center section-padding bg-background"
    >
      <Container>
        <div ref={titleRef} className="mb-16 md:mb-24">
           <span className="mono-uppercase text-primary/50 mb-4 tracking-widest block">
              {t("processHomePage.badge")}
           </span>
          <h2 className="mb-6 font-sans font-normal text-primary">
            {t("processHomePage.title")}
          </h2>
          <p className="max-w-2xl body-lg text-primary/70">
            {t("processHomePage.description")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical line for desktop */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border/40 hidden md:block" />
          
          <div className="space-y-12 md:space-y-20">
            {[1, 2, 3, 4].map((step, index) => (
              <div
                key={step}
                data-process-item
                className="relative flex flex-col md:flex-row gap-6 md:gap-16 group"
              >
                {/* Number & Line indicator */}
                <div className="relative z-10 hidden md:flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground/5 border border-border/50 text-2xl font-sans font-medium text-primary shadow-sm backdrop-blur-sm group-hover:border-foreground/20 group-hover:bg-foreground/[0.08] transition-colors duration-500">
                    <span data-process-number>0{step}</span>
                  </div>
                  {/* Connecting Line */}
                  {index < 3 && (
                     <div 
                       data-process-line 
                       className="w-px h-full bg-gradient-to-b from-foreground/20 to-transparent mt-4 mb-[-1.5rem]" 
                     />
                  )}
                </div>

                {/* Mobile Number Indicator */}
                <div className="flex md:hidden items-center gap-4 mb-2">
                   <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-foreground/5 border border-border/50 text-lg font-sans font-medium text-primary">
                      <span>0{step}</span>
                   </div>
                   <h3 className="text-xl font-medium text-primary">
                     {t(`processHomePage.steps.${step}.title` as any)}
                   </h3>
                </div>

                {/* Content */}
                <div data-process-content className="flex-1 pb-4">
                  <h3 className="hidden md:block text-2xl font-medium text-primary mb-4">
                    {t(`processHomePage.steps.${step}.title` as any)}
                  </h3>
                  <p className="body-lg text-primary/70 mb-6">
                    {t(`processHomePage.steps.${step}.description` as any)}
                  </p>
                  
                  {/* Deliverables / Timeline Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rtl:auto-cols-min p-5 rounded-xl bg-foreground/[0.02] border border-border/30">
                    <div>
                      <span className="mono-uppercase text-primary/40 text-xs tracking-wider block mb-2">
                         {t("processHomePage.deliverables")}
                      </span>
                      <p className="small text-primary/80">
                         {t(`processHomePage.steps.${step}.deliverables` as any)}
                      </p>
                    </div>
                    <div>
                      <span className="mono-uppercase text-primary/40 text-xs tracking-wider block mb-2">
                         {t("processHomePage.timeline")}
                      </span>
                      <p className="small tracking-wide font-medium text-primary/90">
                         {t(`processHomePage.steps.${step}.timeline` as any)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  )
}
