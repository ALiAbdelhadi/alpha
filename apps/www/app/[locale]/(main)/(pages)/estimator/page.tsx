// motion: useText(heading) for h1, useReveal for subtitle + badge + progress; step container keeps existing GSAP transition
"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { ProposalNarrativeBlock } from "@/components/sections/estimator-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"
import {
    BrandIdentity,
    Budget,
    Complexity,
    ContentReadiness,
    DeadlineUrgency,
    ProjectType,
    Timeline,
    useEstimator,
} from "@/hooks/use-estimator"
import { Link } from "@/i18n/navigation"
import {
    buildPDFHtml,
    generateEstimatePdf,
    mapBudgetTier,
    mapProjectType,
    normalisePhone,
    validatePhone,
} from "@/lib/estimator-utils"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Download, Phone } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { JSX, useEffect, useRef, useState } from "react"

const TIER_TO_BUDGET: Record<string, Budget> = {
    essential: "small",
    professional: "medium",
    flagship: "large",
}

export default function EstimatorPage() {
    const t = useTranslations("estimator")
    const locale = useLocale()
    const searchParams = useSearchParams()

    const incomingTier = searchParams.get("tier") ?? null
    const preselectedBudget = (incomingTier ? TIER_TO_BUDGET[incomingTier] ?? null : null) as Budget | null

    const {
        step, brandIdentity, contentReadiness, deadlineUrgency,
        projectType, complexity, timeline, budget,
        setBrandIdentity, setContentReadiness, setDeadlineUrgency,
        setProjectType, setComplexity, setTimeline, setBudget,
        nextStep, prevStep, reset, canProceed, getEstimate,
    } = useEstimator({ initialBudget: preselectedBudget })

    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [phoneError, setPhoneError] = useState<string | null>(null)
    const [phoneSubmitting, setPhoneSubmitting] = useState(false)
    const [phoneDone, setPhoneDone] = useState(false)
    const [pdfGenerating, setPdfGenerating] = useState(false)

    const DATA_STEPS = preselectedBudget ? 7 : 8
    const isPhoneStep = step === DATA_STEPS && !phoneDone
    const isResultsStep = step === DATA_STEPS && phoneDone
    const TOTAL_STEPS = preselectedBudget ? 7 : 8

    const estimate = getEstimate()

    // ── Static header animations (run once on mount) ──────────
    const titleRef = useText<HTMLHeadingElement>(DEFAULTS.heading)
    const subtitleRef = useReveal<HTMLParagraphElement>({ ...DEFAULTS.body, delay: 0.15 })
    const badgeRef = useReveal<HTMLDivElement>({ ...DEFAULTS.element, delay: 0.1 })
    const progressRef = useReveal<HTMLDivElement>({ ...DEFAULTS.element, delay: 0.25 })

    // ── Step container: GSAP transition on each step change ───
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!containerRef.current) return
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: MOTION.distance.sm },
            { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth })
    }, [step, phoneDone])

    const formatCurrency = (n: number) =>
        new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
            style: "currency", currency: "EGP", maximumFractionDigits: 0,
        }).format(n)

    const visibleStep = preselectedBudget
        ? step <= 1 ? step : step - 1
        : step

    const handlePhoneSubmit = async () => {
        if (!validatePhone(phone)) {
            setPhoneError(t("phoneCapture.phoneError"))
            return
        }
        setPhoneError(null)
        setPhoneSubmitting(true)
        try {
            await fetch(`/${locale}/api/estimator`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: normalisePhone(phone),
                    name: name || undefined,
                    projectType: projectType ?? undefined,
                    complexity: complexity ?? undefined,
                    timeline: timeline ?? undefined,
                    price: estimate ? Math.round((estimate.minPrice + estimate.maxPrice) / 2) : undefined,
                    priceMin: estimate?.minPrice,
                    priceMax: estimate?.maxPrice,
                    weeksMin: estimate?.minWeeks,
                    weeksMax: estimate?.maxWeeks,
                }),
            })
        } catch { /* silent */ }
        finally { setPhoneSubmitting(false) }
        setPhoneDone(true)
    }

    const handleDownloadPDF = async () => {
        if (!estimate || !projectType || !budget) return
        setPdfGenerating(true)
        try {
            const html = buildPDFHtml({
                locale, t,
                projectType: mapProjectType(projectType),
                tier: mapBudgetTier(budget),
                timelineKey: timeline ?? "standard",
                priceMin: Math.round((estimate.minPrice + estimate.maxPrice) / 2),
                priceMax: Math.round((estimate.minPrice + estimate.maxPrice) / 2),
                weeksMin: estimate.minWeeks,
                weeksMax: estimate.maxWeeks,
                phone: normalisePhone(phone),
                name,
                brandIdentity,
                contentReadiness,
                deadlineUrgency,
            })
            await generateEstimatePdf(html, `altruvex-estimate-${Date.now()}.pdf`)
        } catch (err) {
            console.error("PDF generation failed:", err)
        } finally {
            setPdfGenerating(false)
        }
    }

    const handleBack = () => {
        if (isResultsStep) { setPhoneDone(false); return }
        prevStep()
    }

    const handleReset = () => {
        reset()
        setPhone(""); setName(""); setPhoneDone(false); setPhoneError(null)
    }

    return (
        <div className="relative min-h-screen w-full">
            <section className="min-h-screen flex items-center section-padding">
                <Container>
                    <div className="max-w-3xl mx-auto">

                        {/* ── Static header — animated once on mount ── */}
                        <div className="text-center mb-12">
                            <h1
                                ref={titleRef}
                                className="font-sans font-normal text-primary mb-4"
                            >
                                {t("title")}
                            </h1>
                            <p ref={subtitleRef} className="body-lg text-primary/70">
                                {t("subtitle")}
                            </p>
                            {incomingTier && (
                                <div
                                    ref={badgeRef}
                                    className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-sm border border-foreground/12 bg-foreground/4"
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40">
                                        {t("preselected")}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                                        {t(`tierNames.${incomingTier}`)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* ── Progress bar — animated once on mount ── */}
                        <div
                            ref={progressRef}
                            className="flex items-center justify-center gap-1 mb-12"
                        >
                            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i <= visibleStep ? "w-8 bg-primary" : "w-6 bg-foreground/10"
                                    )}
                                />
                            ))}
                        </div>

                        {/* ── Step container — GSAP animates on each step ── */}
                        <div ref={containerRef} className="mb-12">
                            {step === 1 && <StepBrandIdentity selected={brandIdentity} onSelect={setBrandIdentity} t={t} />}
                            {step === 2 && !preselectedBudget && <StepBudget selected={budget} onSelect={setBudget} t={t} />}
                            {step === 3 && <StepContentReadiness selected={contentReadiness} onSelect={setContentReadiness} t={t} />}
                            {step === 4 && <StepDeadlineUrgency selected={deadlineUrgency} onSelect={setDeadlineUrgency} t={t} />}
                            {step === 5 && <StepProjectType selected={projectType} onSelect={setProjectType} t={t} />}
                            {step === 6 && <StepComplexity selected={complexity} onSelect={setComplexity} t={t} />}
                            {step === DATA_STEPS - 1 && !isPhoneStep && !isResultsStep && (
                                <StepTimeline selected={timeline} onSelect={setTimeline} t={t} />
                            )}
                            {isPhoneStep && (
                                <StepPhoneCapture
                                    phone={phone} name={name} error={phoneError}
                                    submitting={phoneSubmitting}
                                    onPhoneChange={(v) => { setPhone(v); setPhoneError(null) }}
                                    onNameChange={setName}
                                    onSubmit={handlePhoneSubmit}
                                    t={t}
                                />
                            )}
                            {isResultsStep && estimate && (
                                <>
                                    <StepResults
                                        estimate={estimate}
                                        formatCurrency={formatCurrency}
                                        t={t}
                                        locale={locale}
                                        projectType={projectType}
                                        budget={budget}
                                        timeline={timeline}
                                        brandIdentity={brandIdentity}
                                        contentReadiness={contentReadiness}
                                        deadlineUrgency={deadlineUrgency}
                                    />
                                    <PDFDownload onDownload={handleDownloadPDF} generating={pdfGenerating} t={t} />
                                </>
                            )}
                        </div>

                        {/* ── Navigation ── */}
                        <div className="flex items-center justify-between">
                            {(step > 1 || isResultsStep) ? (
                                <MagneticButton variant="secondary" onClick={isResultsStep ? handleReset : handleBack}>
                                    {isResultsStep ? t("startOver") : t("back")}
                                </MagneticButton>
                            ) : <div />}
                            {step < DATA_STEPS && !isPhoneStep && (
                                <MagneticButton
                                    variant="primary" onClick={nextStep}
                                    className={cn(!canProceed() && "opacity-50 pointer-events-none")}
                                >
                                    {step === DATA_STEPS - 1 ? t("getEstimate") : t("next")}
                                </MagneticButton>
                            )}
                        </div>

                    </div>
                </Container>
            </section>
        </div>
    )
}

// ─── Step components (unchanged) ─────────────────────────────────────────────

interface StepProps {
    t: (key: string, values?: Record<string, string | number>) => string
}

const OPTION_BASE = "transition-all transition-default border"
const OPTION_SELECTED = "border-foreground/50 bg-foreground/10"
const OPTION_DEFAULT = "border-foreground/25 hover:border-foreground/50 hover:bg-foreground/5"

function StepPhoneCapture({
    phone, name, error, submitting,
    onPhoneChange, onNameChange, onSubmit, t,
}: StepProps & {
    phone: string; name: string; error: string | null; submitting: boolean
    onPhoneChange: (v: string) => void; onNameChange: (v: string) => void; onSubmit: () => void
}) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-normal text-primary mb-2">{t("phoneCapture.title")}</h2>
                <p className="text-sm text-primary/50 leading-relaxed">{t("phoneCapture.subtitle")}</p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label className="font-mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                        {t("phoneCapture.phoneLabel")} <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-primary/30" />
                        </div>
                        <Input
                            type="tel" dir="ltr" value={phone}
                            onChange={(e) => onPhoneChange(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !submitting && onSubmit()}
                            placeholder={t("phoneCapture.phonePlaceholder")}
                            className={cn("ltr:pl-10 rtl:pr-10 text-primary bg-transparent placeholder:text-primary/30",
                                error && "border-destructive")}
                        />
                    </div>
                    {error && <p className="mt-1.5 font-mono text-xs text-destructive">{error}</p>}
                    <p className="mt-2 font-mono text-[10px] text-primary/25 uppercase tracking-[0.12em]">
                        {t("phoneCapture.phoneHint")}
                    </p>
                </div>
                <div>
                    <Label className="font-mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                        {t("phoneCapture.nameLabel")}
                    </Label>
                    <Input
                        type="text" value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder={t("phoneCapture.namePlaceholder")}
                        className="text-primary bg-transparent placeholder:text-primary/30"
                    />
                </div>
            </div>
            <MagneticButton
                variant="primary" size="lg" className="w-full justify-center"
                onClick={onSubmit} disabled={submitting || !phone}
            >
                {submitting ? t("phoneCapture.submitting") : t("phoneCapture.button")}
            </MagneticButton>
        </div>
    )
}

function PDFDownload({ onDownload, generating, t }: {
    onDownload: () => void; generating: boolean; t: StepProps["t"]
}) {
    return (
        <div className="mt-8 rounded-sm border border-foreground/20 bg-foreground/5 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 mb-1">{t("pdf.label")}</p>
                    <p className="body text-primary/70">{t("pdf.description")}</p>
                </div>
                <MagneticButton variant="secondary" onClick={onDownload} disabled={generating} className="shrink-0">
                    <span className="flex items-center gap-2">
                        {generating ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                {t("pdf.generating")}
                            </>
                        ) : (
                            <><Download className="w-4 h-4" />{t("pdf.button")}</>
                        )}
                    </span>
                </MagneticButton>
            </div>
        </div>
    )
}

function StepResults({
    estimate, formatCurrency, t, locale,
    projectType, budget, timeline,
    brandIdentity, contentReadiness, deadlineUrgency,
}: {
    estimate: { minWeeks: number; maxWeeks: number; minPrice: number; maxPrice: number }
    formatCurrency: (n: number) => string
    t: StepProps["t"]
    locale: string
    projectType: ProjectType
    budget: Budget
    timeline: Timeline
    brandIdentity?: BrandIdentity
    contentReadiness?: ContentReadiness
    deadlineUrgency?: DeadlineUrgency
}) {
    const projKey = mapProjectType(projectType)
    const tierKey = mapBudgetTier(budget)
    const tlKey = timeline ?? "standard"

    return (
        <div>
            <h2 className="text-2xl font-normal text-primary mb-6 text-center">{t("results.title")}</h2>
            <p className="body-lg text-primary/90 mb-8 text-center">
                {t("results.rangeCopy", {
                    min: formatCurrency(Math.round((estimate.minPrice + estimate.maxPrice) / 2)),
                    max: formatCurrency(Math.round((estimate.minPrice + estimate.maxPrice) / 2)),
                    weeksMin: estimate.minWeeks, weeksMax: estimate.maxWeeks,
                })}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-8 rounded-sm border border-foreground/25 bg-foreground/5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 mb-3">{t("results.timeline")}</p>
                    <p className="text-3xl font-light text-primary">
                        {estimate.minWeeks}–{estimate.maxWeeks}{" "}
                        <span className="body text-primary/60">{t("results.weeks")}</span>
                    </p>
                </div>
                <div className="p-8 rounded-sm border border-foreground/50 bg-foreground/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 mb-3">{t("results.investment")}</p>
                    <p className="text-3xl font-light text-primary">
                        {formatCurrency(Math.round((estimate.minPrice + estimate.maxPrice) / 2))}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/35 mt-2">
                        {t("results.vatExcluded")}
                    </p>
                </div>
            </div>
            <div className="mb-8">
                <ProposalNarrativeBlock
                    projectType={projKey}
                    tier={tierKey}
                    timelineKey={tlKey}
                    locale={locale}
                    brandIdentity={brandIdentity}
                    contentReadiness={contentReadiness}
                    deadlineUrgency={deadlineUrgency}
                />
            </div>
            <div className="mb-8 p-6 rounded-sm border border-foreground/20 bg-foreground/5 text-start flex gap-4 items-start">
                <div className="w-1 self-stretch rounded-full bg-primary shrink-0" />
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{t("results.rangeCtaLabel")}</p>
                    <p className="body text-primary/80 leading-relaxed">{t("results.rangeCta")}</p>
                </div>
            </div>
            <p className="small text-primary/50 mb-8 text-center">{t("results.consultationGate")}</p>
            <div className="flex flex-col gap-4 justify-center items-center mb-6">
                <Link href="/schedule">
                    <MagneticButton variant="primary" size="lg" className="group">
                        <span className="flex items-center gap-2">
                            {t("results.ctaPrimary")}
                            <svg className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function StepBudget({ selected, onSelect, t }: StepProps & { selected: Budget; onSelect: (v: Budget) => void }) {
    const options: Budget[] = ["small", "medium", "large", "custom"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.budget.title")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button key={opt} onClick={() => onSelect(opt)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-start", selected === opt ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <h3 className="font-medium text-primary mb-1">{t(`steps.budget.options.${opt}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.budget.options.${opt}.range`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepBrandIdentity({ selected, onSelect, t }: StepProps & { selected: BrandIdentity; onSelect: (v: BrandIdentity) => void }) {
    const options: BrandIdentity[] = ["complete", "partial", "scratch"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.brand.title")}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((opt) => (
                    <button key={opt} onClick={() => onSelect(opt)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-center", selected === opt ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <h3 className="font-medium text-primary mb-2">{t(`steps.brand.options.${opt}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.brand.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepContentReadiness({ selected, onSelect, t }: StepProps & { selected: ContentReadiness; onSelect: (v: ContentReadiness) => void }) {
    const options: ContentReadiness[] = ["provide", "need-help", "unsure"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.content.title")}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((opt) => (
                    <button key={opt} onClick={() => onSelect(opt)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-center", selected === opt ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <h3 className="font-medium text-primary mb-2">{t(`steps.content.options.${opt}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.content.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepDeadlineUrgency({ selected, onSelect, t }: StepProps & { selected: DeadlineUrgency; onSelect: (v: DeadlineUrgency) => void }) {
    const options: DeadlineUrgency[] = ["flexible", "2months", "1month", "urgent"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.deadline.title")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button key={opt} onClick={() => onSelect(opt)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-center", selected === opt ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <h3 className="font-medium text-primary mb-2">{t(`steps.deadline.options.${opt}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.deadline.options.${opt}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepProjectType({ selected, onSelect, t }: StepProps & { selected: ProjectType; onSelect: (v: ProjectType) => void }) {
    const options: { key: ProjectType; icon: JSX.Element }[] = [
        { key: "website", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
        { key: "webapp", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
        { key: "ecommerce", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
        { key: "pwa", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    ]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.projectType.title")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {options.map((option) => (
                    <button key={option.key} onClick={() => onSelect(option.key)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-start", selected === option.key ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-colors",
                            selected === option.key ? "bg-foreground/20 text-primary" : "bg-foreground/10 text-primary/70")}>
                            {option.icon}
                        </div>
                        <h3 className="font-medium text-primary mb-1">{t(`steps.projectType.options.${option.key}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.projectType.options.${option.key}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepComplexity({ selected, onSelect, t }: StepProps & { selected: Complexity; onSelect: (v: Complexity) => void }) {
    const options: Complexity[] = ["basic", "standard", "premium"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.complexity.title")}</h2>
            <div className="space-y-4">
                {options.map((option, i) => (
                    <button key={option} onClick={() => onSelect(option)}
                        className={cn(OPTION_BASE, "w-full p-6 rounded-sm text-start flex items-center gap-6", selected === option ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center shrink-0 font-mono text-sm",
                            selected === option ? "bg-foreground/20 text-primary" : "bg-foreground/10 text-primary/70")}>
                            {i + 1}
                        </div>
                        <div>
                            <h3 className="font-medium text-primary mb-1">{t(`steps.complexity.options.${option}.title`)}</h3>
                            <p className="small text-primary/60">{t(`steps.complexity.options.${option}.description`)}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

function StepTimeline({ selected, onSelect, t }: StepProps & { selected: Timeline; onSelect: (v: Timeline) => void }) {
    const options: Timeline[] = ["urgent", "standard", "flexible"]
    return (
        <div>
            <h2 className="text-2xl font-normal text-primary text-center mb-8">{t("steps.timeline.title")}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {options.map((option) => (
                    <button key={option} onClick={() => onSelect(option)}
                        className={cn(OPTION_BASE, "p-6 rounded-sm text-center", selected === option ? OPTION_SELECTED : OPTION_DEFAULT)}>
                        <h3 className="font-medium text-primary mb-2">{t(`steps.timeline.options.${option}.title`)}</h3>
                        <p className="small text-primary/60">{t(`steps.timeline.options.${option}.description`)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}