"use client"

import { Container } from "@/components/container"
import { Input } from "@/components/ui/input"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { useEstimator, ProjectType, Complexity, Timeline, BrandIdentity, ContentReadiness, DeadlineUrgency } from "@/hooks/use-estimator"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import { JSX, useEffect, useRef, useState } from "react"

export default function EstimatorPage() {
    const t = useTranslations("estimator")
    const locale = useLocale()

    const {
        step,
        brandIdentity,
        contentReadiness,
        deadlineUrgency,
        projectType,
        complexity,
        timeline,
        setBrandIdentity,
        setContentReadiness,
        setDeadlineUrgency,
        setProjectType,
        setComplexity,
        setTimeline,
        nextStep,
        prevStep,
        reset,
        canProceed,
        getEstimate,
    } = useEstimator()

    const TOTAL_STEPS = 7

    const containerRef = useRef<HTMLDivElement>(null)
    const [email, setEmail] = useState("")
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [emailSubmitting, setEmailSubmitting] = useState(false)
    const [emailError, setEmailError] = useState<string | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        )
    }, [step])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
            style: "currency",
            currency: "EGP",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const estimate = getEstimate()

    return (
        <>
            <div className="relative min-h-screen w-full">
                <section className="min-h-screen flex items-center section-padding">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="font-sans font-normal text-primary mb-4">
                                    {t("title")}
                                </h1>
                                <p className="body-lg text-primary/70">
                                    {t("subtitle")}
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-1 mb-12">
                                {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            i <= step ? "w-8 bg-teal-500" : "w-6 bg-foreground/10"
                                        )}
                                    />
                                ))}
                            </div>

                   
                            <div ref={containerRef} className="mb-12">
                                {step === 1 && (
                                    <StepBrandIdentity
                                        selected={brandIdentity}
                                        onSelect={setBrandIdentity}
                                        t={t}
                                    />
                                )}
                                {step === 2 && (
                                    <StepContentReadiness
                                        selected={contentReadiness}
                                        onSelect={setContentReadiness}
                                        t={t}
                                    />
                                )}
                                {step === 3 && (
                                    <StepDeadlineUrgency
                                        selected={deadlineUrgency}
                                        onSelect={setDeadlineUrgency}
                                        t={t}
                                    />
                                )}
                                {step === 4 && (
                                    <StepProjectType
                                        selected={projectType}
                                        onSelect={setProjectType}
                                        t={t}
                                    />
                                )}
                                {step === 5 && (
                                    <StepComplexity
                                        selected={complexity}
                                        onSelect={setComplexity}
                                        t={t}
                                    />
                                )}
                                {step === 6 && (
                                    <StepTimeline
                                        selected={timeline}
                                        onSelect={setTimeline}
                                        t={t}
                                    />
                                )}
                                {step === 7 && estimate && (
                                    <>
                                        <StepResults
                                            estimate={estimate}
                                            formatCurrency={formatCurrency}
                                            t={t}
                                        />
                                        <EstimatorEmailCapture
                                            email={email}
                                            setEmail={setEmail}
                                            emailSubmitted={emailSubmitted}
                                            emailSubmitting={emailSubmitting}
                                            emailError={emailError}
                                            setEmailError={setEmailError}
                                            onSuccess={() => setEmailSubmitted(true)}
                                            onSubmitting={(v) => setEmailSubmitting(v)}
                                            estimate={estimate}
                                            projectType={projectType!}
                                            complexity={complexity!}
                                            timeline={timeline!}
                                            locale={locale}
                                            t={t}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
                                {step > 1 ? (
                                    <MagneticButton
                                        variant="secondary"
                                        onClick={step === 7 ? reset : prevStep}
                                    >
                                        {step === 7 ? t("startOver") : t("back")}
                                    </MagneticButton>
                                ) : (
                                    <div />
                                )}

                                {step < 7 && (
                                    <MagneticButton
                                        variant="primary"
                                        onClick={nextStep}
                                        className={cn(!canProceed() && "opacity-50 pointer-events-none")}
                                    >
                                        {step === 6 ? t("getEstimate") : t("next")}
                                    </MagneticButton>
                                )}

                                {step === 7 && (
                                    <Link href="/schedule">
                                        <MagneticButton variant="primary" className="group">
                                            <span className="flex items-center gap-2">
                                                {t("results.ctaPrimary")}
                                                <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </MagneticButton>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

interface StepProps {
    t: (key: string) => string
}

function StepBrandIdentity({
    selected,
    onSelect,
    t,
}: StepProps & { selected: BrandIdentity; onSelect: (v: BrandIdentity) => void }) {
    const options: BrandIdentity[] = ["complete", "partial", "scratch"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.brand.title")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className={cn(
                            "p-6 rounded-2xl border text-center transition-all transition-default",
                            selected === opt
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <h3 className="font-medium text-primary mb-2">
                            {t(`steps.brand.options.${opt}.title`)}
                        </h3>
                        <p className="small text-primary/60">{t(`steps.brand.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepContentReadiness({
    selected,
    onSelect,
    t,
}: StepProps & { selected: ContentReadiness; onSelect: (v: ContentReadiness) => void }) {
    const options: ContentReadiness[] = ["provide", "need-help", "unsure"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.content.title")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className={cn(
                            "p-6 rounded-2xl border text-center transition-all transition-default",
                            selected === opt
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <h3 className="font-medium text-primary mb-2">
                            {t(`steps.content.options.${opt}.title`)}
                        </h3>
                        <p className="small text-primary/60">{t(`steps.content.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepDeadlineUrgency({
    selected,
    onSelect,
    t,
}: StepProps & { selected: DeadlineUrgency; onSelect: (v: DeadlineUrgency) => void }) {
    const options: DeadlineUrgency[] = ["flexible", "2months", "1month", "urgent"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.deadline.title")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className={cn(
                            "p-6 rounded-2xl border text-center transition-all transition-default",
                            selected === opt
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <h3 className="font-medium text-primary mb-2">
                            {t(`steps.deadline.options.${opt}.title`)}
                        </h3>
                        <p className="small text-primary/60">{t(`steps.deadline.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

interface StepProjectTypeProps extends StepProps {
    selected: ProjectType
    onSelect: (type: ProjectType) => void
}

function StepProjectType({ selected, onSelect, t }: StepProjectTypeProps) {
    const options: { key: ProjectType; icon: JSX.Element }[] = [
        {
            key: "website",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
        },
        {
            key: "webapp",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            key: "ecommerce",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            key: "pwa",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
    ]

    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.projectType.title")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => onSelect(option.key)}
                        className={cn(
                            "p-6 rounded-2xl border text-start transition-all transition-default",
                            selected === option.key
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors transition-default",
                            selected === option.key ? "bg-foreground/20 text-primary" : "bg-foreground/10 text-primary/70"
                        )}>
                            {option.icon}
                        </div>
                        <h3 className="font-medium text-primary mb-1">
                            {t(`steps.projectType.options.${option.key}.title`)}
                        </h3>
                        <p className="small text-primary/60">
                            {t(`steps.projectType.options.${option.key}.description`)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}

interface StepComplexityProps extends StepProps {
    selected: Complexity
    onSelect: (complexity: Complexity) => void
}

function StepComplexity({ selected, onSelect, t }: StepComplexityProps) {
    const options: Complexity[] = ["basic", "standard", "premium"]

    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.complexity.title")}
            </h2>
            <div className="space-y-4">
                {options.map((option, i) => (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className={cn(
                            "w-full p-6 rounded-2xl border text-start transition-all transition-default flex items-center gap-6",
                            selected === option
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors transition-default",
                            selected === option ? "bg-foreground/20 text-primary" : "bg-foreground/10 text-primary/70"
                        )}>
                            {i + 1}
                        </div>
                        <div>
                            <h3 className="font-medium text-primary mb-1">
                                {t(`steps.complexity.options.${option}.title`)}
                            </h3>
                            <p className="small text-primary/60">
                                {t(`steps.complexity.options.${option}.description`)}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

interface StepTimelineProps extends StepProps {
    selected: Timeline
    onSelect: (timeline: Timeline) => void
}

function StepTimeline({ selected, onSelect, t }: StepTimelineProps) {
    const options: Timeline[] = ["urgent", "standard", "flexible"]

    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">
                {t("steps.timeline.title")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className={cn(
                            "p-6 rounded-2xl border text-center transition-all transition-default",
                            selected === option
                                ? "border-foreground/50 bg-foreground/10"
                                : "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"
                        )}
                    >
                        <h3 className="font-medium text-primary mb-2">
                            {t(`steps.timeline.options.${option}.title`)}
                        </h3>
                        <p className="small text-primary/60">
                            {t(`steps.timeline.options.${option}.description`)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}

interface StepResultsProps extends StepProps {
    estimate: {
        minWeeks: number
        maxWeeks: number
        minPrice: number
        maxPrice: number
    }
    formatCurrency: (amount: number) => string
}

function StepResults({ estimate, formatCurrency, t }: StepResultsProps) {
    const contentRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })

    return (
        <div ref={contentRef} className="text-center">
            <h2 className="text-2xl font-normal text-primary mb-6">
                {t("results.title")}
            </h2>
            <p className="body-lg text-primary/90 mb-8">
                {t("results.rangeCopy")
                    .replace("{min}", formatCurrency(estimate.minPrice))
                    .replace("{max}", formatCurrency(estimate.maxPrice))
                    .replace("{weeksMin}", String(estimate.minWeeks))
                    .replace("{weeksMax}", String(estimate.maxWeeks))}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-8 rounded-2xl border border-foreground/25 bg-foreground/5">
                    <p className="small text-primary/60 mb-2">{t("results.timeline")}</p>
                    <p className="text-3xl font-light text-primary">
                        {estimate.minWeeks}–{estimate.maxWeeks}{" "}
                        <span className="body text-primary/60">{t("results.weeks")}</span>
                    </p>
                </div>
                <div className="p-8 rounded-2xl border border-foreground/50 bg-foreground/10">
                    <p className="small text-primary/60 mb-2">{t("results.investment")}</p>
                    <p className="text-3xl font-light text-primary">
                        {formatCurrency(estimate.minPrice)}–{formatCurrency(estimate.maxPrice)}
                    </p>
                </div>
            </div>
            <p className="small text-primary/50 mb-8">
                {t("results.consultationGate")}
            </p>
            <div className="flex flex-col gap-4 justify-center items-center mb-6">
                <Link href="/schedule">
                    <MagneticButton variant="primary" size="lg" className="group">
                        <span className="flex items-center gap-2">
                            {t("results.ctaPrimary")}
                            <svg className="w-4 h-4 transition-transform transition-default ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </MagneticButton>
                </Link>
                <p className="mono text-primary/50">{t("results.or")}</p>
            </div>
        </div>
    )
}

interface EstimatorEmailCaptureProps {
    email: string
    setEmail: (v: string) => void
    emailSubmitted: boolean
    emailSubmitting: boolean
    emailError: string | null
    setEmailError: (v: string | null) => void
    onSuccess: () => void
    onSubmitting: (v: boolean) => void
    estimate: { minWeeks: number; maxWeeks: number; minPrice: number; maxPrice: number }
    projectType: string
    complexity: string
    timeline: string
    locale: string
    t: (key: string) => string
}

function EstimatorEmailCapture({
    email,
    setEmail,
    emailSubmitted,
    emailSubmitting,
    emailError,
    setEmailError,
    onSuccess,
    onSubmitting,
    estimate,
    projectType,
    complexity,
    timeline,
    locale,
    t,
}: EstimatorEmailCaptureProps) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setEmailError(null)
        if (!email.trim()) {
            setEmailError(t("emailCapture.invalid"))
            return
        }
        onSubmitting(true)
        try {
            const res = await fetch(`/${locale}/api/estimator-lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    projectType,
                    complexity,
                    timeline,
                    priceMin: estimate.minPrice,
                    priceMax: estimate.maxPrice,
                    weeksMin: estimate.minWeeks,
                    weeksMax: estimate.maxWeeks,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                setEmailError(data.message || t("emailCapture.error"))
                return
            }
            onSuccess()
        } catch {
            setEmailError(t("emailCapture.error"))
        } finally {
            onSubmitting(false)
        }
    }

    if (emailSubmitted) {
        return (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <p className="font-medium text-primary">{t("emailCapture.success")}</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-foreground/25 bg-foreground/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                    <Input
                        type="email"
                        placeholder={t("emailCapture.placeholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        disabled={emailSubmitting}
                    />
                </div>
                <MagneticButton type="submit" variant="secondary" disabled={emailSubmitting}>
                    {emailSubmitting ? t("emailCapture.sending") : t("emailCapture.button")}
                </MagneticButton>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-primary/50">
                {t("emailCapture.hint")}
            </p>
            {emailError && (
                <p className="mt-2 text-center text-sm text-destructive">{emailError}</p>
            )}
        </form>
    )
}
