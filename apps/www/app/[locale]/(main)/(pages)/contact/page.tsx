"use client"

import { useState } from "react"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { contactFormSchema } from "@/lib/validations/contact"
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

type FormErrors = Record<string, string>

export default function ContactPage() {
    const t = useTranslations("contactPage")
    const tContact = useTranslations("contact")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const leftRef = useReveal({ direction: "left", delay: 0.1, duration: 0.5 })
    const rightRef = useReveal({ direction: "right", delay: 0.15, duration: 0.5 })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [service, setService] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        setSubmitSuccess(false)
        setSubmitError(null)
        setFormErrors({})

        try {
            const payload = {
                name,
                email,
                message,
                serviceInterest:
                    service === "development"
                        ? "web-development"
                        : service === "web-design"
                            ? "ui-ux"
                            : service
                                ? "other"
                                : undefined,
                website: "",
            }

            const validatedData = contactFormSchema.parse(payload)

            const locale =
                typeof window !== "undefined"
                    ? window.location.pathname.split("/")[1] || document.documentElement.lang || "en"
                    : "en"

            const response = await fetch(`/${locale}/api/contact`, {
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
                setName("")
                setEmail("")
                setService("")
                setMessage("")
                setTimeout(() => setSubmitSuccess(false), 7000)
            } else {
                if (result.errors && typeof result.errors === "object") {
                    setFormErrors(result.errors as FormErrors)
                    const firstError = Object.values(result.errors as FormErrors)[0]
                    setSubmitError(firstError || result.message || t("form.errorGeneric"))
                } else {
                    setSubmitError(result.message || t("form.errorGeneric"))
                }
            }
        } catch (error: unknown) {
            console.error("Contact form submission error:", error)
            setSubmitError(t("form.errorNetwork"))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <section className="flex min-h-[70vh] w-full items-center justify-center pt-32 md:pt-40">
                    <Container>
                        <div className="max-w-4xl">
                            <div
                                ref={titleRef}
                                className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/10 px-4 py-2 backdrop-blur-sm"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                                <p className="font-mono text-xs text-primary/90 tracking-wide uppercase">
                                    {t("badge")}
                                </p>
                            </div>
                            <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.08] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl">
                                <span className="text-balance">{t("heroTitle")}</span>
                            </h1>
                            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl">
                                <span className="text-pretty">
                                    {t("heroDescription")}
                                </span>
                            </p>
                        </div>
                    </Container>
                </section>
                <section className="flex w-full items-center py-24 md:py-32">
                    <Container>
                        <div className="grid gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
                            <div ref={leftRef} className="flex flex-col justify-center">
                                <div className="mb-12 sm:mb-14 md:mb-16">
                                    <h2 className="mb-3 font-sans text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                                        {t("infoTitle")}
                                        <br />
                                        <span className="text-primary/75">{t("infoTitleHighlight")}</span>
                                    </h2>
                                    <p className="font-mono text-sm text-primary/60 tracking-wide sm:text-base">
                                        {t("infoSubtitle")}
                                    </p>
                                </div>
                                <div className="space-y-8 sm:space-y-9">
                                    <a href={`mailto:${tContact("emailValue")}`} className="group block">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("emailLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary transition-colors group-hover:text-primary/75 md:text-xl lg:text-2xl">
                                            {tContact("emailValue")}
                                        </p>
                                    </a>
                                    <a href={`tel:${t("phoneValue").replace(/\s/g, "")}`} className="group block">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("phoneLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary transition-colors group-hover:text-primary/75 md:text-xl lg:text-2xl">
                                            {t("phoneValue")}
                                        </p>
                                    </a>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("locationLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary md:text-xl lg:text-2xl">
                                            {t("address1")}
                                            <br />
                                            {t("address2")}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 pt-2 sm:gap-4">
                                        {["twitter", "instagram", "linkedin", "dribbble"].map((social) => (
                                            <a
                                                key={social}
                                                href="#"
                                                className="border-b border-transparent font-mono text-xs text-primary/60 transition-all hover:border-foreground/60 hover:text-primary/85 sm:text-sm"
                                            >
                                                {t(`social.${social}`)}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="pt-6 sm:pt-8">
                                        <Link href="/schedule">
                                            <MagneticButton size="lg" className="group relative">
                                                <span className="flex items-center gap-2">
                                                    {t("scheduleCall")}
                                                    <svg
                                                        className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </span>
                                            </MagneticButton>
                                        </Link>
                                        <p className="mt-3 text-xs text-primary/60 font-mono">
                                            {t("responseTime")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div ref={rightRef} className="flex flex-col justify-center">
                                <div className="p-8 rounded-2xl border border-foreground/10 bg-foreground/3 backdrop-blur-md">
                                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                        <div>
                                            <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                                {t("form.nameLabel")} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder={t("form.namePlaceholder")}
                                                className={`w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all ${formErrors.name ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                aria-invalid={!!formErrors.name}
                                                aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                                                disabled={isSubmitting}
                                            />
                                            {formErrors.name && (
                                                <p
                                                    id="contact-name-error"
                                                    className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                                                >
                                                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                                {t("form.emailLabel")} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t("form.emailPlaceholder")}
                                                className={`w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all ${formErrors.email ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                aria-invalid={!!formErrors.email}
                                                aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                                                autoComplete="email"
                                                disabled={isSubmitting}
                                            />
                                            {formErrors.email && (
                                                <p
                                                    id="contact-email-error"
                                                    className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                                                >
                                                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                                {t("form.serviceLabel")}
                                            </label>
                                            <select
                                                value={service}
                                                onChange={(e) => setService(e.target.value)}
                                                className="w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all"
                                                disabled={isSubmitting}
                                            >
                                                <option value="">{t("form.servicePlaceholder")}</option>
                                                <option value="web-design">{t("form.serviceWebDesign")}</option>
                                                <option value="development">{t("form.serviceDevelopment")}</option>
                                                <option value="consulting">{t("form.serviceConsulting")}</option>
                                                <option value="maintenance">{t("form.serviceMaintenance")}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                                {t("form.messageLabel")} <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder={t("form.messagePlaceholder")}
                                                rows={4}
                                                className={`w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none resize-none border-foreground/25 focus:border-foreground/50 transition-all ${formErrors.message ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                aria-invalid={!!formErrors.message}
                                                aria-describedby={formErrors.message ? "contact-message-error" : undefined}
                                                disabled={isSubmitting}
                                            />
                                            {formErrors.message && (
                                                <p
                                                    id="contact-message-error"
                                                    className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-500"
                                                >
                                                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                                                    {formErrors.message}
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            className="hidden"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            aria-hidden="true"
                                        />
                                        <div className="pt-3 space-y-3">
                                            <MagneticButton
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="w-full text-base"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? t("form.submitting") : t("form.submit")}
                                            </MagneticButton>
                                            <p className="text-center font-mono text-xs text-primary/60">
                                                {t("form.riskReversal")}
                                            </p>
                                            {submitSuccess && (
                                                <div className="mt-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-center">
                                                    <p className="flex items-center justify-center gap-2 font-mono text-xs text-primary">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                        {t("form.success")}
                                                    </p>
                                                </div>
                                            )}
                                            {submitError && (
                                                <div className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-center">
                                                    <p className="flex items-center justify-center gap-2 font-mono text-xs text-primary">
                                                        <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                                        {submitError}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}