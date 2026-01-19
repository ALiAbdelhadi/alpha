"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { useEstimator, ProjectType, Complexity, Timeline } from "@/hooks/use-estimator"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import { JSX, useEffect, useRef } from "react"
import Footer from "@/components/footer"

export default function EstimatorPage() {
    const t = useTranslations("estimator")
    const locale = useLocale()

    const {
        step,
        projectType,
        complexity,
        timeline,
        setProjectType,
        setComplexity,
        setTimeline,
        nextStep,
        prevStep,
        reset,
        canProceed,
        getEstimate,
    } = useEstimator()

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        )
    }, [step])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const estimate = getEstimate()

    return (
        <>
            <div className="relative min-h-screen w-full">
                <section className="min-h-screen flex items-center pt-24 md:pt-32 pb-24">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="font-sans text-4xl font-normal tracking-tight text-primary md:text-5xl lg:text-6xl mb-4">
                                    {t("title")}
                                </h1>
                                <p className="text-primary/70 text-lg">
                                    {t("subtitle")}
                                </p>
                            </div>

                            {/* Progress */}
                            <div className="flex items-center justify-center gap-2 mb-12">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            i <= step ? "w-12 bg-teal-500" : "w-8 bg-foreground/10"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Step Content */}
                            <div ref={containerRef} className="mb-12">
                                {step === 1 && (
                                    <StepProjectType
                                        selected={projectType}
                                        onSelect={setProjectType}
                                        t={t}
                                    />
                                )}
                                {step === 2 && (
                                    <StepComplexity
                                        selected={complexity}
                                        onSelect={setComplexity}
                                        t={t}
                                    />
                                )}
                                {step === 3 && (
                                    <StepTimeline
                                        selected={timeline}
                                        onSelect={setTimeline}
                                        t={t}
                                    />
                                )}
                                {step === 4 && estimate && (
                                    <StepResults
                                        estimate={estimate}
                                        formatCurrency={formatCurrency}
                                        t={t}
                                    />
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between">
                                {step > 1 ? (
                                    <MagneticButton
                                        variant="secondary"
                                        onClick={step === 4 ? reset : prevStep}
                                    >
                                        {step === 4 ? t("startOver") : t("back")}
                                    </MagneticButton>
                                ) : (
                                    <div />
                                )}

                                {step < 4 && (
                                    <MagneticButton
                                        variant="primary"
                                        onClick={nextStep}
                                        className={cn(!canProceed() && "opacity-50 pointer-events-none")}
                                    >
                                        {step === 3 ? t("getEstimate") : t("next")}
                                    </MagneticButton>
                                )}

                                {step === 4 && (
                                    <Link href="/schedule">
                                        <MagneticButton variant="primary" className="group">
                                            <span className="flex items-center gap-2">
                                                {t("results.cta")}
                                                <svg className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            "p-6 rounded-2xl border text-start transition-all",
                            selected === option.key
                                ? "border-teal-500 bg-teal-500/10"
                                : "border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                            selected === option.key ? "bg-teal-500/20 text-teal-500" : "bg-foreground/10 text-primary/70"
                        )}>
                            {option.icon}
                        </div>
                        <h3 className="font-medium text-primary mb-1">
                            {t(`steps.projectType.options.${option.key}.title`)}
                        </h3>
                        <p className="text-sm text-primary/60">
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
                            "w-full p-6 rounded-2xl border text-start transition-all flex items-center gap-6",
                            selected === option
                                ? "border-teal-500 bg-teal-500/10"
                                : "border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                            selected === option ? "bg-teal-500 text-white" : "bg-foreground/10 text-primary/70"
                        )}>
                            {i + 1}
                        </div>
                        <div>
                            <h3 className="font-medium text-primary mb-1">
                                {t(`steps.complexity.options.${option}.title`)}
                            </h3>
                            <p className="text-sm text-primary/60">
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
                            "p-6 rounded-2xl border text-center transition-all",
                            selected === option
                                ? "border-teal-500 bg-teal-500/10"
                                : "border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5"
                        )}
                    >
                        <h3 className="font-medium text-primary mb-2">
                            {t(`steps.timeline.options.${option}.title`)}
                        </h3>
                        <p className="text-sm text-primary/60">
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
            <h2 className="text-2xl font-normal text-primary mb-8">
                {t("results.title")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
                    <p className="text-sm text-primary/60 mb-2">{t("results.timeline")}</p>
                    <p className="text-3xl font-light text-primary">
                        {estimate.minWeeks}–{estimate.maxWeeks}{" "}
                        <span className="text-lg text-primary/60">{t("results.weeks")}</span>
                    </p>
                </div>
                <div className="p-8 rounded-2xl border border-teal-500/30 bg-teal-500/5">
                    <p className="text-sm text-primary/60 mb-2">{t("results.investment")}</p>
                    <p className="text-3xl font-light text-teal-600 dark:text-teal-400">
                        {formatCurrency(estimate.minPrice)}–{formatCurrency(estimate.maxPrice)}
                    </p>
                </div>
            </div>
            <p className="text-sm text-primary/50 mb-6">
                {t("results.disclaimer")}
            </p>
            <p className="text-primary/70">
                {t("results.ctaDescription")}
            </p>
        </div>
    )
}
