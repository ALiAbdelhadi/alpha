"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Container } from "../container"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface FormState {
  name: string
  email: string
  message: string
  serviceInterest: string
  projectTimeline: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "left", delay: 0, duration: 0.8 })

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    serviceInterest: "",
    projectTimeline: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const leftElements = sectionElement.querySelectorAll("[data-contact-left]")
    const rightElements = sectionElement.querySelectorAll("[data-contact-right]")
    const formInputs = sectionElement.querySelectorAll("input, textarea, select")

    if (leftElements.length > 0) {
      leftElements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          x: 0,
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
          scale: 1.01,
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
    setSubmitError(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // This would call your API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     locale: router.locale,
      //     submittedAt: new Date().toISOString(),
      //     metadata: {
      //       userAgent: navigator.userAgent,
      //       referrer: document.referrer,
      //       timestamp: Date.now()
      //     }
      //   })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "", serviceInterest: "", projectTimeline: "" })

      // Reset success message after 7 seconds
      setTimeout(() => setSubmitSuccess(false), 7000)
    } catch (error) {
      setSubmitError(true)
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      suppressHydrationWarning={true}
      ref={sectionRef}
      className="flex min-h-screen shrink-0 snap-start items-center py-16 sm:py-20 md:py-24 lg:py-0 overflow-x-hidden"
    >
      <Container>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-16 xl:gap-24">
          {/* Left: Contact Info */}
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
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: undefined })
                  }}
                  required
                  className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-foreground/30'} bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all`}
                  placeholder={t("contact.form.namePlaceholder")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  required
                  className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-foreground/30'} bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all`}
                  placeholder={t("contact.form.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  Service Interest (Optional)
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground focus:border-foreground/50 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all"
                >
                  <option value="">Select a service...</option>
                  <option value="web-development">Web Development</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="multilingual">Multi-Language Sites</option>
                  <option value="ui-ux">UI/UX Implementation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div data-contact-right className="transform-gpu">
                <label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: undefined })
                  }}
                  required
                  className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-foreground/30'} bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none resize-none sm:text-base md:py-2.5 will-change-transform transition-all`}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <div data-contact-right className="pt-2 transform-gpu">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50 text-sm sm:text-base py-3 sm:py-3.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </MagneticButton>

                {submitSuccess && (
                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-center font-mono text-xs sm:text-sm text-foreground flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {t("contact.form.success")}
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-center font-mono text-xs sm:text-sm text-foreground flex items-center justify-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Something went wrong. Please try again or email us directly.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}