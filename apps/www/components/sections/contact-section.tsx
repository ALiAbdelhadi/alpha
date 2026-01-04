"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useGSAPReveal } from "@/hooks/use-gsap-reveal"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Container } from "../container"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useGSAPReveal({ direction: "left", delay: 0, duration: 0.8 })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const leftElements = sectionElement.querySelectorAll("[data-contact-left]")
    const rightElements = sectionElement.querySelectorAll("[data-contact-right]")
    const formInputs = sectionElement.querySelectorAll("input, textarea")

    if (leftElements.length > 0) {
      leftElements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          x: -80,
          y: 20,
          scale: 0.95,
          force3D: true,
          willChange: "transform, opacity"
        })

        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            gsap.set(element, { willChange: "auto" })
          }
        })
      })
    }

    if (rightElements.length > 0) {
      rightElements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          x: 80,
          y: 20,
          scale: 0.95,
          force3D: true,
          willChange: "transform, opacity"
        })

        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            gsap.set(element, { willChange: "auto" })
          }
        })
      })
    }

    formInputs.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleBlur = () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      input.addEventListener("focus", handleFocus, { passive: true })
      input.addEventListener("blur", handleBlur, { passive: true })

      return () => {
        input.removeEventListener("focus", handleFocus)
        input.removeEventListener("blur", handleBlur)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (sectionElement?.contains(trigger.vars.trigger as Element)) {
          trigger.kill()
        }
      })
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen shrink-0 snap-start items-center py-16 sm:py-20 md:py-24 lg:py-0 overflow-x-hidden"
    >
      <Container>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-16 xl:gap-24">
          <div className="flex flex-col justify-center">
            <div ref={titleRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-14">
              <h2 className="mb-2 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl sm:mb-3 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                {t("contact.title")}
                <br />
                {t("contact.title2")}
              </h2>
              <p className="font-mono text-xs text-foreground/60 sm:text-sm md:text-base">
                / {t("contact.subtitle")}
              </p>
            </div>

            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <Link
                data-contact-left
                href={`mailto:${t("contact.emailValue")}`}
                className="group block transform-gpu"
              >
                <div className="mb-1 flex items-center gap-2 sm:mb-1.5">
                  <Mail className="h-3 w-3 text-foreground/60 sm:h-3.5 sm:w-3.5" />
                  <span className="font-mono text-xs text-foreground/60 sm:text-sm">
                    {t("contact.email")}
                  </span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 sm:text-lg md:text-xl lg:text-2xl break-all">
                  {t("contact.emailValue")}
                </p>
              </Link>
              <div data-contact-left className="transform-gpu">
                <div className="mb-1 flex items-center gap-2 sm:mb-1.5">
                  <MapPin className="h-3 w-3 text-foreground/60 sm:h-3.5 sm:w-3.5" />
                  <span className="font-mono text-xs text-foreground/60 sm:text-sm">
                    {t("contact.location")}
                  </span>
                </div>
                <p className="text-base text-foreground sm:text-lg md:text-xl lg:text-2xl">
                  {t("contact.locationValue")}
                </p>
              </div>

              <div data-contact-left className="flex flex-wrap gap-2 pt-2 sm:gap-3 md:pt-4 transform-gpu">
                {[
                  t("contact.social.twitter"),
                  t("contact.social.instagram"),
                  t("contact.social.linkedin"),
                  t("contact.social.dribbble"),
                ].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90 sm:text-sm"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-7">
              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none resize-none sm:text-base md:py-2.5 will-change-transform transition-all"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <div data-contact-right className="pt-2 transform-gpu">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50 text-sm sm:text-base py-3 sm:py-3.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-xs sm:text-sm text-foreground/80">
                    {t("contact.form.success")}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section >
  )
}