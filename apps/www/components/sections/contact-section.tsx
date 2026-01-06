"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useReveal } from "@/hooks/use-animation"
import { Link, useRouter } from "@/i18n/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"
import { AlertCircle, Calendar, CheckCircle2, Clock, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Container } from "../container"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const t = useTranslations()
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "left", delay: 0, duration: 0.8 })

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

      const locale = window.location.pathname.split('/')[1] || document.documentElement.lang || 'en'
      const apiPath = `/${locale}/api/contact`

      const response = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validatedData,
          locale,
        })
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
      console.error('Submission error:', error)
      if (error && typeof error === 'object' && 'errors' in error) {
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
      className="flex min-h-screen shrink-0 snap-start items-center py-16 sm:py-20 md:py-24 lg:py-32o overflow-x-hidden"
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
            <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6" noValidate>
              <div data-contact-right className="transform-gpu">
                <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.name")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn(
                    "w-full border-b bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all",
                    formErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/30 focus:border-foreground/50"
                  )}
                  placeholder={t("contact.form.namePlaceholder")}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div data-contact-right className="transform-gpu">
                <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "w-full border-b bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none sm:text-base md:py-2.5 will-change-transform transition-all",
                    formErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/30 focus:border-foreground/50"
                  )}
                  placeholder={t("contact.form.emailPlaceholder")}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div data-contact-right className="transform-gpu">
                <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  Service Interest (Optional)
                </Label>
                <Select
                  value={formData.serviceInterest || ""}
                  onValueChange={(value) => handleInputChange("serviceInterest", value || undefined)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full border-b border-foreground/30 bg-transparent rounded-md p-2 text-sm text-foreground focus:border-foreground/50 focus:outline-none sm:text-base md:p-2.5 will-change-transform transition-all hover:bg-transparent">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="multilingual">Multi-Language Sites</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Implementation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div data-contact-right className="transform-gpu">
                <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  Project Timeline (Optional)
                </Label>
                <Select
                  value={formData.projectTimeline || ""}
                  onValueChange={(value) => handleInputChange("projectTimeline", value || undefined)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full border-b rounded-md bg-transparent p-2 text-sm text-foreground focus:outline-none sm:text-base md:p-2.5 will-change-transform transition-all hover:bg-transparent">
                    <SelectValue placeholder="Select timeline..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                    <SelectItem value="soon">Soon (1-3 months)</SelectItem>
                    <SelectItem value="planning">Planning (3-6 months)</SelectItem>
                    <SelectItem value="exploring">Exploring (6+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div data-contact-right className="transform-gpu">
                <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                  {t("contact.form.message")} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className={cn(
                    "w-full border-b bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none resize-none sm:text-base md:py-2.5 will-change-transform transition-all",
                    formErrors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-foreground/30 focus:border-foreground/50"
                  )}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                  disabled={isSubmitting}
                />
                {formErrors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.message}
                  </p>
                )}
              </div>
              <div data-contact-right className="transform-gpu">
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams()
                    if (formData.name) params.append("name", formData.name)
                    if (formData.email) params.append("email", formData.email)
                    if (formData.message) params.append("message", formData.message)
                    router.push(`/schedule?${params.toString()}`)
                  }}
                  className="w-full text-left p-3 rounded-md border border-foreground/20 hover:border-foreground/40 bg-foreground/5 hover:bg-foreground/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Clock className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <div className="font-mono text-base font-medium text-foreground">
                        Schedule a Meeting
                      </div>
                      <div className="text-sm text-foreground/70 mt-0.5">
                        Choose exact date and time
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Quick Meeting Request Toggle */}
              <div data-contact-right className="transform-gpu">
                <Label className="flex items-center gap-3 cursor-pointer">
                  <Input
                    type="checkbox"
                    checked={formData.requestMeeting}
                    onChange={(e) => handleInputChange("requestMeeting", e.target.checked)}
                    className="h-4 w-4 rounded border-foreground/30 text-foreground focus:ring-2 focus:ring-foreground/50"
                    disabled={isSubmitting}
                  />
                  <span className="flex items-center gap-2 font-mono text-xs sm:text-sm text-foreground/80">
                    <Calendar className="h-3.5 w-3.5" />
                    Or use quick selection (time slots)
                  </span>
                </Label>
              </div>
              {formData.requestMeeting && (
                <>
                  <div data-contact-right className="transform-gpu">
                    <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </Label>
                    <DatePicker
                      date={formData.preferredDate ? new Date(formData.preferredDate) : undefined}
                      onDateChange={(date) => {
                        if (date) {
                          const dateStr = date.toISOString().split('T')[0]
                          handleInputChange("preferredDate", dateStr)
                        } else {
                          handleInputChange("preferredDate", undefined)
                        }
                      }}
                      disabled={isSubmitting}
                      placeholder="Select a date"
                      minDate={new Date()}
                      maxDate={(() => {
                        const maxDate = new Date()
                        maxDate.setMonth(maxDate.getMonth() + 3)
                        return maxDate
                      })()}
                      className={cn(
                        formErrors.preferredDate
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      )}
                    />
                    {formErrors.preferredDate && (
                      <p id="date-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.preferredDate}
                      </p>
                    )}
                  </div>
                  <div data-contact-right className="transform-gpu">
                    <Label className="mb-1.5 block font-mono text-xs text-foreground/60 sm:text-sm md:mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.preferredTime || ""}
                      onValueChange={(value) => handleInputChange("preferredTime", value || undefined)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className={cn(
                        "w-full border-b rounded-md bg-transparent p-2 text-sm text-foreground focus:outline-none sm:text-base md:p-2.5 will-change-transform transition-all hover:bg-transparent",
                        formErrors.preferredTime
                          ? "border-red-500 focus:border-red-500"
                          : "border-foreground/30 focus:border-foreground/50"
                      )}>
                        <SelectValue placeholder="Select time slot..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm - 3pm)</SelectItem>
                        <SelectItem value="evening">Evening (3pm - 6pm)</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.preferredTime && (
                      <p id="time-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {formErrors.preferredTime}
                      </p>
                    )}
                    <div className="mt-3">
                      <Button
                        variant={"link"}
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams()
                          if (formData.name) params.append("name", formData.name)
                          if (formData.email) params.append("email", formData.email)
                          if (formData.message) params.append("message", formData.message)
                          if (formData.preferredDate) params.append("date", formData.preferredDate)
                          router.push(`/schedule?${params.toString()}`)
                        }}
                      >
                        <Clock className="h-3 w-3" />
                        Need precise time? Click here
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <Input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div data-contact-right className="pt-2 transform-gpu">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-sm sm:text-base py-3 sm:py-3.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                </MagneticButton>
                {submitSuccess && (
                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-center font-mono text-xs sm:text-sm text-foreground flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {t("contact.form.success")}
                    </p>
                  </div>
                )}
                {submitError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-center font-mono text-xs sm:text-sm text-foreground flex items-center justify-center gap-2">
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