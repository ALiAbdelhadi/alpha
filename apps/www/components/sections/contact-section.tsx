"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useGSAPReveal } from "@/hooks/use-gsap-reveal"
import { trackEvent } from "@/lib/analytics"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import type { ApiResponse, ContactFormData } from "@/types/api"
import { CheckCircle2, Loader2, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Container } from "../container"

export function ContactSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useGSAPReveal({ direction: "left", delay: 0, duration: 0.8 })

  // Fix: Type formData as ContactFormData
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const leftElements = section.querySelectorAll("[data-contact-left]")
    const rightElements = section.querySelectorAll("[data-contact-right]")

    const triggers: ScrollTrigger[] = []

    leftElements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, x: -60 })
      const animation = gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
      const trigger = animation.scrollTrigger
      if (trigger) triggers.push(trigger)
    })

    rightElements.forEach((el, i) => {
      gsap.set(el, { opacity: 0, x: 60 })
      const animation = gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
      const trigger = animation.scrollTrigger
      if (trigger) triggers.push(trigger)
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  // Client-side validation
  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        break
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Invalid email address'
        break
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        break
    }
    return undefined
  }

  const handleChange = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (name: keyof ContactFormData) => {
    const error = validateField(name, formData[name])
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all fields - Fix: Only validate fields that exist in formData
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    const fieldsToValidate: Array<keyof ContactFormData> = ['name', 'email', 'message']

    fieldsToValidate.forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data: ApiResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Track successful submission
      trackEvent('contact_form_submitted', {
        location: 'contact_section',
      })

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 8000)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      })
      trackEvent('contact_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen w-full items-center pt-20 md:pt-24"
    >
      <Container>
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
                data-cursor-pointer
                href={`mailto:${t("contact.emailValue")}`}
                className="group block"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{t("contact.email")}</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  {t("contact.emailValue")}
                </p>
              </a>

              <div data-contact-left>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{t("contact.location")}</span>
                </div>
                <p className="text-base text-foreground md:text-2xl">{t("contact.locationValue")}</p>
              </div>

              <div data-contact-left className="flex gap-2 pt-2 md:pt-4">
                {[
                  t("contact.social.twitter"),
                  t("contact.social.instagram"),
                  t("contact.social.linkedin"),
                  t("contact.social.dribbble"),
                ].map((social) => (
                  <a
                    key={social}
                    data-cursor-pointer
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div data-contact-right className="hidden">
                <label htmlFor="website" className="sr-only">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </div>
              <div data-contact-right>
                <label htmlFor="name" className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  required
                  autoComplete="name"
                  className={`w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/50 md:py-2 md:text-base transition-colors ${errors.name
                      ? 'border-red-500/50 focus:border-red-500/50'
                      : 'border-foreground/30 focus:border-foreground/50'
                    }`}
                  placeholder={t("contact.form.namePlaceholder")}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500/80" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div data-contact-right>
                <label htmlFor="email" className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  required
                  autoComplete="email"
                  className={`w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/50 md:py-2 md:text-base transition-colors ${errors.email
                      ? 'border-red-500/50 focus:border-red-500/50'
                      : 'border-foreground/30 focus:border-foreground/50'
                    }`}
                  placeholder={t("contact.form.emailPlaceholder")}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500/80" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div data-contact-right>
                <label htmlFor="message" className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  required
                  className={`w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/50 md:py-2 md:text-base transition-colors resize-none ${errors.message
                      ? 'border-red-500/50 focus:border-red-500/50'
                      : 'border-foreground/30 focus:border-foreground/50'
                    }`}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-red-500/80" role="alert">
                      {errors.message}
                    </p>
                  ) : (
                    <span className="text-xs text-foreground/40">
                      {formData.message.length}/1000
                    </span>
                  )}
                </div>
              </div>

              <div data-contact-right>
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.form.submitting")}
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </MagneticButton>
                {submitSuccess && (
                  <div
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-4 backdrop-blur-sm"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <p className="font-mono text-sm text-green-500">
                      {t("contact.form.success")} We&apos;ll respond within 24 hours.
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