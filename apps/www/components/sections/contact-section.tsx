"use client"

import type React from "react"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"
import { AlertCircle, Calendar, CheckCircle2, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Container } from "../container"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const t = useTranslations()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "left", delay: 0, duration: 0.5 })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    serviceInterest: undefined,
    projectTimeline: undefined,
    requestMeeting: false,
    preferredDate: undefined,
    preferredTime: undefined,
    website: "",
  })

  useEffect(() => {
    if (!sectionRef.current) return

    const sectionElement = sectionRef.current
    const leftElements = sectionElement.querySelectorAll("[data-contact-left]")
    const rightElements = sectionElement.querySelectorAll("[data-contact-right]")
    const formInputs = sectionElement.querySelectorAll("input, textarea, select")

    const allTriggers: ScrollTrigger[] = []

    if (leftElements.length > 0) {
      leftElements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          y: 15,
        })

        const revealTween = gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        })

        if (revealTween.scrollTrigger) {
          allTriggers.push(revealTween.scrollTrigger)
        }
      })
    }

    if (rightElements.length > 0) {
      rightElements.forEach((element, index) => {
        gsap.set(element, {
          opacity: 0,
          x: 20,
        })

        const revealTween = gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        })

        if (revealTween.scrollTrigger) {
          allTriggers.push(revealTween.scrollTrigger)
        }
      })
    }

    const inputHandlers: Array<{ input: Element; focus: () => void; blur: () => void }> = []

    formInputs.forEach((input) => {
      const handleFocus = () => {
        gsap.to(input, {
          scale: 1.005,
          duration: 0.15,
          ease: "power2.out",
        })
      }

      const handleBlur = () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
        })
      }

      input.addEventListener("focus", handleFocus, { passive: true })
      input.addEventListener("blur", handleBlur, { passive: true })
      inputHandlers.push({ input, focus: handleFocus, blur: handleBlur })
    })

    return () => {
      allTriggers.forEach((trigger) => trigger.kill())
      inputHandlers.forEach(({ input, focus, blur }) => {
        input.removeEventListener("focus", focus)
        input.removeEventListener("blur", blur)
      })
    }
  }, [])

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    setFormErrors({})

    try {
      const validatedData = contactFormSchema.parse(formData)

      const locale = window.location.pathname.split("/")[1] || document.documentElement.lang || "en"
      const apiPath = `/${locale}/api/contact`

      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validatedData,
          locale,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          message: "",
          serviceInterest: undefined,
          projectTimeline: undefined,
          requestMeeting: false,
          preferredDate: undefined,
          preferredTime: undefined,
          website: "",
        })
        setTimeout(() => setSubmitSuccess(false), 7000)
      } else {
        if (result.errors) {
          setFormErrors(result.errors)
          const errorMessages = Object.values(result.errors) as string[]
          setSubmitError(errorMessages[0] || result.message || "Please check your form and try again.")
        } else {
          setSubmitError(result.message || "Something went wrong. Please try again.")
        }
      }
    } catch (error: unknown) {
      console.error("Submission error:", error)
      if (error && typeof error === "object" && "errors" in error) {
        const zodErrors: Record<string, string> = {}
        const zodError = error as { errors: Array<{ path: (string | number)[]; message: string }> }
        zodError.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            zodErrors[String(err.path[0])] = err.message
          }
        })
        setFormErrors(zodErrors)
        const errorMessages = Object.values(zodErrors) as string[]
        setSubmitError(errorMessages[0] || "Please check your form and try again.")
      } else {
        setSubmitError("Network error. Please check your connection and try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      suppressHydrationWarning={true}
      ref={sectionRef}
      className="flex min-h-screen shrink-0 snap-start items-center py-20 sm:py-24 md:py-32 overflow-x-hidden"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
          <div className="flex flex-col justify-center">
            <div ref={titleRef} className="mb-12 sm:mb-14 md:mb-16">
              <h2 className="mb-3 font-sans text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                {t("contact.title")}
                <br />
                <span className="text-primary/75">{t("contact.title2")}</span>
              </h2>
              <p className="font-mono text-sm text-primary/60 tracking-wide sm:text-base">{t("contact.subtitle")}</p>
            </div>
            <div className="space-y-8 sm:space-y-9">
              <Link data-contact-left href={`mailto:${t("contact.emailValue")}`} className="group block">
                <div className="mb-2 flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary/60" />
                  <span className="font-mono text-xs text-primary/60 tracking-wide">{t("contact.email")}</span>
                </div>
                <p className="text-lg text-primary transition-colors group-hover:text-primary/75 md:text-xl lg:text-2xl">
                  {t("contact.emailValue")}
                </p>
              </Link>
              <div data-contact-left>
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  <span className="font-mono text-xs text-primary/60 tracking-wide">{t("contact.location")}</span>
                </div>
                <p className="text-lg text-primary md:text-xl lg:text-2xl">{t("contact.locationValue")}</p>
              </div>
              <div data-contact-left className="flex flex-wrap gap-3 pt-2 sm:gap-4">
                {[
                  t("contact.social.twitter"),
                  t("contact.social.instagram"),
                  t("contact.social.linkedin"),
                  t("contact.social.dribbble"),
                ].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-primary/60 transition-all hover:border-foreground/60 hover:text-primary/85 sm:text-sm"
                  >
                    {social}
                  </Link>
                ))}
              </div>
              <div data-contact-left className="pt-6 sm:pt-8">
                <Link href="/schedule">
                  <MagneticButton size="lg" className="h-11 w-auto sm:h-9 flex items-center justify-center">
                    <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>{t("contact.scheduleMeeting")}</span>
                  </MagneticButton>
                </Link>
                <p className="mt-3 text-xs text-primary/60 font-mono">{t("contact.scheduleDescription")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <div data-contact-right>
                <Label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                  {t("contact.form.name")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn(
                    "w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none sm:text-base transition-all",
                    formErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/25 focus:border-foreground/50",
                  )}
                  placeholder={t("contact.form.namePlaceholder")}
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div data-contact-right>
                <Label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                  {t("contact.form.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none sm:text-base transition-all",
                    formErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/25 focus:border-foreground/50",
                  )}
                  placeholder={t("contact.form.emailPlaceholder")}
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    <bdi>

                      {formErrors.email}
                    </bdi>
                  </p>
                )}
              </div>
              <div data-contact-right>
                <Label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                  {t("contact.form.message")} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className={cn(
                    "w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none resize-none sm:text-base transition-all",
                    formErrors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/25 focus:border-foreground/50",
                  )}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                  disabled={isSubmitting}
                />
                {formErrors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <Input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div data-contact-right className="pt-3">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </MagneticButton>
                {submitSuccess && (
                  <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-center font-mono text-sm text-primary flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {t("contact.form.success")}
                    </p>
                  </div>
                )}
                {submitError && (
                  <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-center font-mono text-sm text-primary flex items-center justify-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      {submitError}
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
