"use client"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import { AlertCircle, ArrowLeft, Calendar, CheckCircle2, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function SchedulePage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const t = useTranslations('schedule')

    const locale = pathname.split('/')[1] || 'en'

    const initialName = searchParams.get("name") || ""
    const initialEmail = searchParams.get("email") || ""
    const initialMessage = searchParams.get("message") || ""

    const [formData, setFormData] = useState({
        name: initialName,
        email: initialEmail,
        message: initialMessage,
        date: undefined as Date | undefined,
        time: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    // Refs for animation
    const backButtonRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([backButtonRef.current, headerRef.current], {
                opacity: 0,
                y: -20
            })

            gsap.set(".form-field", {
                opacity: 0,
                y: 30
            })

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.to(backButtonRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6
            })
                .to(headerRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, "-=0.4")
                .to(".form-field", {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08
                }, "-=0.3")
        })

        return () => ctx.revert()
    }, [])

    const handleInputChange = (field: string, value: string | Date | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = t('form.name.error')
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('form.email.error')
        }

        if (!formData.date) {
            newErrors.date = t('form.date.errorRequired')
        } else {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (formData.date < today) {
                newErrors.date = t('form.date.errorPast')
            }
            const maxDate = new Date()
            maxDate.setMonth(maxDate.getMonth() + 3)
            if (formData.date > maxDate) {
                newErrors.date = t('form.date.errorFuture')
            }
        }

        if (!formData.time) {
            newErrors.time = t('form.time.error')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitError(null)
        setSubmitSuccess(false)

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            const [hours, minutes] = formData.time.split(":")
            const scheduledDateTime = new Date(formData.date!)
            scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

            const response = await fetch(`/${locale}/api/schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    scheduledDate: scheduledDateTime.toISOString(),
                    scheduledTime: formData.time,
                }),
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setSubmitSuccess(true)
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            } else {
                setSubmitError(result.message || t('submit.errorGeneric'))
            }
        } catch (error) {
            console.error('Submission error:', error)
            setSubmitError(t('submit.errorNetwork'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="flex min-h-screen items-center py-16 sm:py-20 md:py-24">
            <Container>
                <div className="mx-auto max-w-2xl">
                    <div ref={backButtonRef}>
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="mb-6"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 rtl:-rotate-180" />
                            {t('back')}
                        </Button>
                    </div>
                    <div className="mb-8" ref={headerRef}>
                        <h1 className="mb-2 font-sans text-3xl font-light leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">
                            {t('title')}
                        </h1>
                        <p className="font-mono text-xs text-primary/60 sm:text-sm md:text-base">
                            {t('subtitle')}
                        </p>
                    </div>
                    <form ref={formRef} onSubmit={onSubmit} className="space-y-6" noValidate>
                        <div className="form-field">
                            <Label className="mb-1.5 block font-mono text-xs text-primary/60 sm:text-sm md:mb-2">
                                {t('form.name.label')} <span className="text-red-500">{t('form.name.required')}</span>
                            </Label>
                            <Input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={cn(
                                    "w-full border-b bg-transparent py-2 text-sm text-primary placeholder:text-primary/60 focus:outline-none sm:text-base md:py-2.5",
                                    errors.name
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-foreground/30 focus:border-foreground/50"
                                )}
                                placeholder={t('form.name.placeholder')}
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="form-field">
                            <Label className="mb-1.5 block font-mono text-xs text-primary/60 sm:text-sm md:mb-2">
                                {t('form.email.label')} <span className="text-red-500">{t('form.email.required')}</span>
                            </Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={cn(
                                    "w-full border-b bg-transparent py-2 text-sm text-primary placeholder:text-primary/60 focus:outline-none sm:text-base md:py-2.5",
                                    errors.email
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-foreground/30 focus:border-foreground/50"
                                )}
                                placeholder={t('form.email.placeholder')}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="form-field">
                            <Label className="mb-1.5 block font-mono text-xs text-primary/60 sm:text-sm md:mb-2">
                                {t('form.message.label')}
                            </Label>
                            <Textarea
                                value={formData.message}
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                rows={4}
                                className="w-full border-b bg-transparent py-2 text-sm text-primary placeholder:text-primary/60 focus:outline-none resize-none sm:text-base md:py-2.5"
                                placeholder={t('form.message.placeholder')}
                            />
                        </div>
                        <div className="form-field">
                            <Label className="mb-1.5 block font-mono text-xs text-primary/60 sm:text-sm md:mb-2">
                                <Calendar className="inline h-3.5 w-3.5 rtl:ml-1 ltr:mr-1" />
                                {t('form.date.label')} <span className="text-red-500">{t('form.date.required')}</span>
                            </Label>
                            <DatePicker
                                date={formData.date}
                                onDateChange={(date) => handleInputChange("date", date)}
                                disabled={isSubmitting}
                                placeholder={t('form.date.placeholder')}
                                minDate={new Date()}
                                maxDate={(() => {
                                    const maxDate = new Date()
                                    maxDate.setMonth(maxDate.getMonth() + 3)
                                    return maxDate
                                })()}
                                className={cn(
                                    errors.date ? "border-red-500 focus:border-red-500" : ""
                                )}
                            />
                            {errors.date && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.date}
                                </p>
                            )}
                        </div>
                        <div className="form-field">
                            <Label className="mb-1.5 block font-mono text-xs text-primary/60 sm:text-sm md:mb-2">
                                <Clock className="inline h-3.5 w-3.5 rtl:ml-1 ltr:mr-1" />
                                {t('form.time.label')} <span className="text-red-500">{t('form.time.required')}</span>
                            </Label>
                            <TimePicker
                                value={formData.time}
                                onChange={(time) => handleInputChange("time", time)}
                                disabled={isSubmitting}
                                className={cn(
                                    errors.time ? "border-red-500" : ""
                                )}
                            />
                            {errors.time && (
                                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.time}
                                </p>
                            )}
                            <p className="mt-2 text-xs text-muted-foreground">
                                {t('form.time.availableHours')}
                            </p>
                        </div>
                        <div className="pt-4 form-field">
                            <Button
                                type="submit"
                                variant="default"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? t('submit.submitting') : t('submit.button')}
                            </Button>
                            {submitSuccess && (
                                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <p className="text-center font-mono text-xs sm:text-sm text-primary flex items-center justify-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        {t('submit.success')}
                                    </p>
                                </div>
                            )}
                            {submitError && (
                                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <p className="text-center font-mono text-xs sm:text-sm text-primary flex items-center justify-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        {submitError}
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}