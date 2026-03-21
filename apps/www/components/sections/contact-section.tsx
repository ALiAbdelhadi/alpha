/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useLoading } from "@/components/providers/loading-provider"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { Link } from "@/i18n/navigation"
import { AnalyticsEvents } from "@/lib/analytics"
import { gsap } from "@/lib/gsap"
import { DEFAULTS, MOTION, useText } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact"
import { AlertCircle, Calendar, CheckCircle2, Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { memo, useCallback, useRef, useState } from "react"
import { Container } from "../container"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

export const ContactSection = memo(function ContactSection() {
  const t = useTranslations()
  const { isInitialLoadComplete } = useLoading()
  const sectionRef = useRef<HTMLElement>(null)

  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const hasTrackedStartRef = useRef(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", phone: "", message: "",
    serviceInterest: undefined, projectTimeline: undefined,
    budget: undefined,
    requestMeeting: false, preferredDate: undefined,
    preferredTime: undefined, website: "",
  })

  useGSAPSection({ trigger: sectionRef }, () => {
    if (!isInitialLoadComplete || !sectionRef.current) return

    const leftEls = Array.from(sectionRef.current!.querySelectorAll<HTMLElement>("[data-contact-left]"))
    const rightEls = Array.from(sectionRef.current!.querySelectorAll<HTMLElement>("[data-contact-right]"))

    // Premium left side reveal - earlier trigger
    if (leftEls.length) {
      gsap.from(leftEls, {
        opacity: 0,
        y: MOTION.distance.sm,
        willChange: "transform, opacity",
        duration: MOTION.duration.base,
        stagger: MOTION.stagger.tight,
        ease: MOTION.ease.smooth,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: MOTION.trigger.late,
          once: true,
        },
        onComplete() { gsap.set(leftEls, { willChange: "auto" }) },
      })
    }

    // Premium right side reveal with horizontal slide - earlier trigger
    if (rightEls.length) {
      gsap.from(rightEls, {
        opacity: 0,
        x: MOTION.distance.sm,
        willChange: "transform, opacity",
        duration: MOTION.duration.text,
        stagger: MOTION.stagger.tight,
        ease: MOTION.ease.smooth,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: MOTION.trigger.late,
          once: true,
        },
        onComplete() { gsap.set(rightEls, { willChange: "auto" }) },
      })
    }
  }, [isInitialLoadComplete])

  const handleInputChange = useCallback((field: keyof ContactFormData, value: string | boolean | undefined) => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true
      try {
        AnalyticsEvents.contactFormStarted()
      } catch { /* noop */ }
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => { const e = { ...prev }; delete e[field]; return e })
    }
  }, [formErrors])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true); setSubmitError(null); setSubmitSuccess(false); setFormErrors({})
    try {
      const validatedData = contactFormSchema.parse(formData)
      const locale = window.location.pathname.split("/")[1] || document.documentElement.lang || "en"
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10_000)
      const response = await (async () => {
        try {
          return await fetch(`/${locale}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...validatedData, locale }),
            signal: controller.signal,
          })
        } finally {
          clearTimeout(timeoutId)
        }
      })()
      const result = await response.json()
      if (response.ok && result.success) {
        try {
          AnalyticsEvents.contactFormSubmitted(formData.serviceInterest, formData.budget)
        } catch { /* noop */ }
        setSubmitSuccess(true)
        setFormData({
          name: "", phone: "", message: "",
          serviceInterest: undefined, projectTimeline: undefined,
          budget: undefined,
          requestMeeting: false, preferredDate: undefined,
          preferredTime: undefined, website: "",
        })
        setTimeout(() => setSubmitSuccess(false), 7000)
      } else {
        try {
          AnalyticsEvents.contactFormSubmitted("error")
        } catch { /* noop */ }
        if (result.errors) {
          setFormErrors(result.errors)
          setSubmitError(Object.values(result.errors)[0] as string || result.message)
        } else {
          setSubmitError(result.message || "Something went wrong.")
        }
      }
    } catch (error: unknown) {
      try {
        AnalyticsEvents.contactFormSubmitted("error")
      } catch { /* noop */ }
      if (error && typeof error === "object" && "name" in error && (error as any).name === "AbortError") {
        setSubmitError("Request timed out. Please try again.")
      } else
      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as { errors: Array<{ path: (string | number)[]; message: string }> }
        const zodErrors: Record<string, string> = {}
        zodError.errors.forEach((err) => {
          if (err.path?.[0]) zodErrors[String(err.path[0])] = err.message
        })
        setFormErrors(zodErrors)
        setSubmitError(Object.values(zodErrors)[0] || "Please check your form.")
      } else {
        setSubmitError("Network error. Check your connection.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])

  return (
    <section
      id="contact"
      suppressHydrationWarning
      ref={sectionRef}
      className="flex min-h-screen w-full items-center overflow-x-hidden section-padding"
    >
      <Container>
        <div className="mb-16">
          <p className="mono-uppercase text-primary/25 tracking-[0.25em] text-xs mb-4">
            {t("contact.eyebrow") ?? "Get in Touch"}
          </p>
          <h2
            ref={titleRef}
            className="font-sans font-normal text-primary leading-tight"
            style={{ letterSpacing: "-0.02em", fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {t("contact.title")}
            <br />
            <span className="text-primary/40 italic">
              {t("contact.title2")}
            </span>
          </h2>
        </div>
        <div className="h-px w-full bg-foreground/8 mb-16" />
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div className="flex flex-col gap-10">
            <p className="mono text-sm text-primary/50 leading-relaxed" data-contact-left>
              {t("contact.subtitle")}
            </p>
            <div className="space-y-8">
              <Link data-contact-left href={`mailto:${t("contact.emailValue")}`} className="group block">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-3 w-3 text-primary/35" />
                  <span className="mono-uppercase text-primary/35 text-[9px] tracking-[0.2em]">
                    {t("contact.email")}
                  </span>
                </div>
                <p className="body-lg text-primary group-hover:text-primary/70 transition-colors duration-200">
                  {t("contact.emailValue")}
                </p>
              </Link>
              <div data-contact-left>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-3 w-3 text-primary/35" />
                  <span className="mono-uppercase text-primary/35 text-[9px] tracking-[0.2em]">
                    {t("contact.location")}
                  </span>
                </div>
                <p className="body-lg text-primary">{t("contact.locationValue")}</p>
              </div>
            </div>
            <div data-contact-left className="flex flex-wrap gap-5 pt-2">
              {[
                { name: t("contact.social.twitter"), url: t("contact.social.twitterUrl") ?? "https://twitter.com/altruvex" },
                { name: t("contact.social.instagram"), url: t("contact.social.instagramUrl") ?? "https://instagram.com/altruvex" },
                { name: t("contact.social.linkedin"), url: t("contact.social.linkedinUrl") ?? "https://linkedin.com/company/altruvex" },
                { name: t("contact.social.dribbble"), url: t("contact.social.dribbbleUrl") ?? "https://dribbble.com/altruvex" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-xs text-primary/40 hover:text-primary transition-colors duration-200"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <div data-contact-left className="pt-2">
              <Link href="/schedule">
                <MagneticButton size="lg" className="flex items-center justify-center gap-2 group">
                  <Calendar className="h-4 w-4" />
                  <span>{t("contact.scheduleMeeting")}</span>
                </MagneticButton>
              </Link>
              <p className="mt-3 mono text-xs text-primary/35">
                {t("contact.scheduleDescription")}
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div data-contact-right>
                <Label className="mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                  {t("contact.form.name")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text" value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn("w-full text-primary placeholder:text-primary/35 bg-transparent", formErrors.name && "border-destructive")}
                  placeholder={t("contact.form.namePlaceholder")}
                  aria-required="true" aria-invalid={!!formErrors.name} disabled={isSubmitting}
                />
                {formErrors.name && <FieldError msg={formErrors.name} id="name-error" />}
              </div>
              <div data-contact-right>
                <Label className="mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                  {t("contact.form.phone")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="tel" value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={cn("w-full text-primary placeholder:text-primary/35 bg-transparent", formErrors.phone && "border-destructive")}
                  placeholder={t("contact.form.phonePlaceholder")}
                  aria-required="true" aria-invalid={!!formErrors.phone} autoComplete="tel" disabled={isSubmitting}
                />
                {formErrors.phone && <FieldError msg={formErrors.phone} id="phone-error" />}
              </div>
              <div data-contact-right>
                <Label className="mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                  {t("contact.form.budget")} <span className="text-primary/20 ml-1 text-[10px] lowercase">(optional)</span>
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange("budget", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={cn("w-full bg-transparent text-primary", !formData.budget && "text-primary/35")}>
                    <SelectValue placeholder={t("contact.form.budgetPlaceholder") ?? "Select your budget range"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_10k">{t("contact.form.budgetScale.under_10k") ?? "Under $10k"}</SelectItem>
                    <SelectItem value="b_10k_25k">{t("contact.form.budgetScale.b_10k_25k") ?? "$10k - $25k"}</SelectItem>
                    <SelectItem value="b_25k_50k">{t("contact.form.budgetScale.b_25k_50k") ?? "$25k - $50k"}</SelectItem>
                    <SelectItem value="over_50k">{t("contact.form.budgetScale.over_50k") ?? "$50k+"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div data-contact-right>
                <Label className="mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                  {t("contact.form.message")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  className={cn("w-full text-primary placeholder:text-primary/35 bg-transparent resize-none", formErrors.message && "border-destructive")}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-required="true" aria-invalid={!!formErrors.message} disabled={isSubmitting}
                />
                {formErrors.message && <FieldError msg={formErrors.message} id="message-error" />}
              </div>
              <Input
                type="text" value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="hidden" tabIndex={-1} autoComplete="off" aria-hidden
              />
              <div data-contact-right className="pt-2">
                <MagneticButton type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting && (
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    )}
                    {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                  </span>
                </MagneticButton>
                <p className="mt-3 mono text-xs text-primary/30 text-center">
                  {t("contact.form.riskReversal")}
                </p>
                {submitSuccess && (
                  <div className="mt-4 p-4 rounded-lg bg-success-glow border border-success-border">
                    <p className="mono text-sm text-primary flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {t("contact.form.success")}
                    </p>
                  </div>
                )}
                {submitError && (
                  <div className="mt-4 p-4 rounded-lg bg-red-500/8 border border-red-500/15">
                    <p className="mono text-sm text-primary flex items-center justify-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
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
})

const FieldError = memo(function FieldError({ msg, id }: { msg: string; id: string }) {
  return (
    <p id={id} role="alert" aria-live="assertive" className="mt-1.5 mono text-xs text-destructive flex items-center gap-1">
      <AlertCircle className="h-3 w-3" aria-hidden />
      {msg}
    </p>
  )
})