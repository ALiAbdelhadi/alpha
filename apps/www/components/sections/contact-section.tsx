"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useGSAPReveal } from "@/hooks/use-gsap-reveal"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState, type FormEvent } from "react"

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

    const leftElements = sectionRef.current.querySelectorAll("[data-contact-left]")
    const rightElements = sectionRef.current.querySelectorAll("[data-contact-right]")

    // استخدام batch للعناصر اليسرى - أداء أفضل بكثير
    if (leftElements.length > 0) {
      gsap.set(leftElements, {
        opacity: 0,
        x: -60,
        // تفعيل GPU acceleration
        force3D: true,
        willChange: "transform, opacity"
      })

      ScrollTrigger.batch(leftElements, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            // تحسين الأداء
            force3D: true,
            onComplete: () => {
              // إزالة will-change بعد انتهاء الـ animation
              gsap.set(batch, { willChange: "auto" })
            }
          })
        },
        start: "top 85%",
        once: true,
      })
    }

    // استخدام batch للعناصر اليمنى
    if (rightElements.length > 0) {
      gsap.set(rightElements, {
        opacity: 0,
        x: 60,
        force3D: true,
        willChange: "transform, opacity"
      })

      ScrollTrigger.batch(rightElements, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            force3D: true,
            onComplete: () => {
              gsap.set(batch, { willChange: "auto" })
            }
          })
        },
        start: "top 85%",
        once: true,
      })
    }

    return () => {
      // تنظيف أفضل
      ScrollTrigger.getAll().forEach((trigger) => {
        if (sectionRef.current?.contains(trigger.vars.trigger as Element)) {
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
      ref={sectionRef}
      className="flex min-h-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div ref={titleRef} className="mb-6 md:mb-12">
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                {t("contact.title")}
                <br />
                {t("contact.title2")}
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">/ {t("contact.subtitle")}</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                data-contact-left
                href={`mailto:${t("contact.emailValue")}`}
                className="group block transform-gpu"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{t("contact.email")}</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  {t("contact.emailValue")}
                </p>
              </a>

              <div data-contact-left className="transform-gpu">
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{t("contact.location")}</span>
                </div>
                <p className="text-base text-foreground md:text-2xl">{t("contact.locationValue")}</p>
              </div>

              <div data-contact-left className="flex gap-2 pt-2 md:pt-4 transform-gpu">
                {[
                  t("contact.social.twitter"),
                  t("contact.social.instagram"),
                  t("contact.social.linkedin"),
                  t("contact.social.dribbble"),
                ].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-4">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div data-contact-right className="transform-gpu">
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{t("contact.form.name")}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{t("contact.form.email")}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{t("contact.form.message")}</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <div data-contact-right className="transform-gpu">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">{t("contact.form.success")}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}