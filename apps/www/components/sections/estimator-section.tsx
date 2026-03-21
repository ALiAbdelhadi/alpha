/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Link } from "@/i18n/navigation"
import {
  buildPDFHtml,
  calculateQuickEstimate,
  DeliverableProject,
  DeliverableTier,
  generateEstimatePdf,
  generateProposalNarrative,
  HOSTING_RENEWAL,
  normalisePhone,
  pickLang,
  validatePhone,
} from "@/lib/estimator-utils"
import { gsap } from "@/lib/gsap"
import { localizeNumbers } from "@/lib/number"
import { ArrowLeft, ArrowRight, Check, Download, Phone } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { memo, useCallback, useMemo, useRef, useState } from "react"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { Container } from "../container"
import { MagneticButton } from "../magnetic-button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion"

type SectionTimeline = "urgent" | "soon" | "flexible"

export const ProposalNarrativeBlock = memo(function ProposalNarrativeBlock({
  projectType,
  tier,
  timelineKey,
  locale,
  brandIdentity,
  contentReadiness,
  deadlineUrgency,
}: {
  projectType: DeliverableProject
  tier: DeliverableTier
  timelineKey: string
  locale: string
  brandIdentity?: string | null
  contentReadiness?: string | null
  deadlineUrgency?: string | null
}) {
  const narrative = generateProposalNarrative({
    projectType, tier, timelineKey,
    brandIdentity, contentReadiness, deadlineUrgency,
  })
  const L = (obj: { ar: string; en: string }) => pickLang(obj, locale)
  const isRtl = locale.startsWith("ar")

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-primary/25 uppercase tracking-[0.22em] whitespace-nowrap">
          {L({ ar: narrative.headline.ar, en: narrative.headline.en })}
        </span>
        <div className="flex-1 h-px bg-foreground/8" />
      </div>
      <div className="flex gap-3 p-4 rounded-sm bg-foreground/2.5 border border-foreground/8">
        <div className="w-0.5 self-stretch rounded-full bg-primary/20 shrink-0" />
        <p className={`text-base text-primary/55 leading-relaxed ${isRtl ? "font-sans" : "font-mono"}`}>
          {L(narrative.closing)}
        </p>
      </div>
    </div>
  )
})

export const EstimatorSection = memo(function EstimatorSection() {
  const t = useTranslations("estimator")
  const locale = useLocale()

  const sectionRef = useRef<HTMLElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const tweenCtxRef = useRef<gsap.Context | null>(null)

  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  })

  const badgeRef = useReveal<HTMLParagraphElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.2,
  })

  const descriptionRef = useReveal<HTMLParagraphElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.35,
  })

  const formRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.15,
    distance: MOTION.distance.sm,
  })

  useIsomorphicLayoutEffect(() => {
    if (!formContainerRef.current) return
    tweenCtxRef.current = gsap.context(() => { }, formContainerRef)
    return () => { tweenCtxRef.current?.revert(); tweenCtxRef.current = null }
  }, [])

  const [step, setStep] = useState(1)
  const [isGenerating, setIsGen] = useState(false)
  const [isSubmitting, setIsSub] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [hasAutoDownloaded, setHasAutoDownloaded] = useState(false)

  const [sel, setSel] = useState<{
    projectType: DeliverableProject | null
    tier: DeliverableTier | null
    timeline: SectionTimeline | null
    phone: string
    name: string
  }>({ projectType: null, tier: null, timeline: null, phone: "", name: "" })

  const animateStep = useCallback((dir: "forward" | "back", cb: () => void) => {
    if (!formContainerRef.current) { cb(); return }

    const fromY = dir === "forward" ? MOTION.distance.md : -MOTION.distance.md
    const toY = dir === "forward" ? -MOTION.distance.md : MOTION.distance.md

    gsap.set(formContainerRef.current, { willChange: "transform, opacity" })
    tweenCtxRef.current?.add(() => {
      gsap.to(formContainerRef.current!, {
        opacity: 0,
        y: toY,
        duration: MOTION.duration.fast,
        ease: MOTION.ease.ui,
        onComplete: () => {
          cb()
          gsap.fromTo(formContainerRef.current!,
            { opacity: 0, y: fromY },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.gentle,
              onComplete() {
                gsap.set(formContainerRef.current!, { willChange: "auto" })
              }
            })
        },
      })
    })
  }, [])

  const goNext = useCallback(() => animateStep("forward", () => setStep((s) => s + 1)), [animateStep])
  const goPrev = useCallback(() => animateStep("back", () => setStep((s) => s - 1)), [animateStep])

  const estimate = sel.projectType && sel.tier && sel.timeline
    ? calculateQuickEstimate(sel.projectType, sel.tier, sel.timeline)
    : null

  const selection = useMemo(() => (
    sel.projectType && sel.tier && sel.timeline
      ? { projectType: sel.projectType, tier: sel.tier, timeline: sel.timeline }
      : null
  ), [sel.projectType, sel.tier, sel.timeline])

  const formatEGP = useCallback((n: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
      style: "currency", currency: "EGP", maximumFractionDigits: 0,
    }).format(n), [locale])

  const handlePhoneSubmit = useCallback(async () => {
    if (!selection || !estimate) return
    if (!validatePhone(sel.phone)) {
      setPhoneError(t("phoneCapture.phoneError"))
      return
    }
    setPhoneError(null)
    setIsSub(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10_000)
      try {
        await fetch(`/${locale}/api/estimator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: normalisePhone(sel.phone),
            name: sel.name || undefined,
            projectType: selection.projectType,
            complexity: selection.tier,
            timeline: selection.timeline,
            price: Math.round((estimate.priceMin + estimate.priceMax) / 2),
            priceMin: estimate.priceMin,
            priceMax: estimate.priceMax,
            weeksMin: estimate.weeksMin,
            weeksMax: estimate.weeksMax,
          }),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeoutId)
      }
    } catch { /* silent */ }
    finally {
      setIsSub(false)
    }
    setLeadCaptured(true)
    animateStep("forward", () => setStep(5))
  }, [animateStep, estimate, locale, sel.name, sel.phone, selection, t])

  const handleDownloadPDF = useCallback(async () => {
    if (!selection || !estimate) return
    setIsGen(true)

    try {
      const html = buildPDFHtml({
        locale,
        t,
        projectType: selection.projectType,
        tier: selection.tier,
        timelineKey: selection.timeline,
        priceMin: Math.round((estimate.priceMin + estimate.priceMax) / 2),
        priceMax: Math.round((estimate.priceMin + estimate.priceMax) / 2),
        weeksMin: estimate.weeksMin,
        weeksMax: estimate.weeksMax,
        phone: normalisePhone(sel.phone),
        name: sel.name,
      })

      await generateEstimatePdf(html, `altruvex-estimate-${Date.now()}.pdf`)
    } catch (err) {
      console.error("PDF generation failed:", err)
    } finally {
      setIsGen(false)
    }
  }, [estimate, locale, sel.name, sel.phone, selection, t])

  useIsomorphicLayoutEffect(() => {
    if (!leadCaptured) return
    if (hasAutoDownloaded) return
    if (!estimate) return
    if (!sel.phone) return

    setHasAutoDownloaded(true)
    void handleDownloadPDF()
  }, [estimate, leadCaptured, handleDownloadPDF, hasAutoDownloaded, sel.phone])

  const optCls = (selected: boolean) =>
    `relative p-5 rounded-sm border text-start transition-all duration-300 ${selected
      ? "border-foreground/40 bg-foreground/4 ring-1 ring-foreground/30"
      : "border-foreground/8 bg-foreground/[0.015] hover:border-foreground/20 hover:bg-foreground/[0.03]"
    }`

  return (
    <section
      suppressHydrationWarning
      id="estimator"
      ref={sectionRef}
      className="flex w-full items-center section-padding"
    >
      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <p ref={badgeRef} className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
            {t("badge")}
          </p>
          <h2
            ref={titleRef}
            className="mb-6 font-sans font-normal text-primary leading-[1.05]"
            style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
          >
            {t("title")}
          </h2>
          <p ref={descriptionRef} className="text-base text-primary/55 leading-relaxed">{t("description")}</p>
        </div>
        <div className="h-px w-full bg-foreground/8 mb-12 max-w-3xl mx-auto" />
        <div ref={formRef} className="max-w-3xl mx-auto bg-background rounded-sm border border-foreground/8 p-6 md:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/6">
            <div
              className="h-full bg-foreground/60 transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
          <div ref={formContainerRef} className="pt-4">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-sans font-normal text-primary" style={{ fontSize: "clamp(18px,3vw,24px)", letterSpacing: "-0.015em" }}>
                  {t("step1.question")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(["ecommerce", "corporate", "custom", "performance"] as DeliverableProject[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => { setSel((s) => ({ ...s, projectType: type })); setTimeout(goNext, 300) }}
                      className={optCls(sel.projectType === type)}
                    >
                      <h4 className="font-medium text-primary mb-1 text-base">{t(`step1.options.${type}.title` as any)}</h4>
                      <p className="text-xs text-primary/50 leading-relaxed">{t(`step1.options.${type}.desc` as any)}</p>
                      {sel.projectType === type && (
                        <div className="absolute top-4 ltr:right-4 rtl:left-4 text-primary/60">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-sans font-normal text-primary" style={{ fontSize: "clamp(18px,3vw,24px)", letterSpacing: "-0.015em" }}>
                  {t("step2.question")}
                </h3>
                <div className="flex flex-col gap-3">
                  {(["small", "medium", "large", "enterprise"] as DeliverableTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => { setSel((s) => ({ ...s, tier })); setTimeout(goNext, 300) }}
                      className={optCls(sel.tier === tier)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-primary text-base">{t(`step2.options.${tier}` as any)}</h4>
                        {sel.tier === tier && <Check className="h-4 w-4 text-primary/60" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-sans font-normal text-primary" style={{ fontSize: "clamp(18px,3vw,24px)", letterSpacing: "-0.015em" }}>
                  {t("step3.question")}
                </h3>
                <div className="flex flex-col gap-3">
                  {(["urgent", "soon", "flexible"] as SectionTimeline[]).map((timeline) => (
                    <button
                      key={timeline}
                      onClick={() => { setSel((s) => ({ ...s, timeline })); setTimeout(goNext, 300) }}
                      className={optCls(sel.timeline === timeline)}
                    >
                      <h4 className="font-medium text-primary text-base">{t(`step3.options.${timeline}.title` as any)}</h4>
                      <p className="text-base text-primary/50 mt-0.5">{t(`step3.options.${timeline}.desc` as any)}</p>
                      {sel.timeline === timeline && (
                        <div className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 text-primary/60">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3
                    className="font-sans font-normal text-primary mb-2"
                    style={{ fontSize: "clamp(18px,3vw,24px)", letterSpacing: "-0.015em" }}
                  >
                    {t("phoneCapture.title")}
                  </h3>
                  <p className="text-base text-primary/50 leading-relaxed">{t("phoneCapture.subtitle")}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="font-mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                      {t("phoneCapture.phoneLabel")} <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-primary/30" />
                      </div>
                      <Input
                        type="tel"
                        dir="ltr"
                        value={sel.phone}
                        onChange={(e: any) => {
                          setSel((s) => ({ ...s, phone: e.target.value }))
                          setPhoneError(null)
                        }}
                        onKeyDown={(e: any) => e.key === "Enter" && !isSubmitting && !leadCaptured && handlePhoneSubmit()}
                        placeholder={t("phoneCapture.phonePlaceholder")}
                        className={`ltr:pl-10 rtl:pr-10 text-primary bg-transparent placeholder:text-primary/30 ${phoneError ? "border-destructive" : ""}`}
                      />
                    </div>
                    {phoneError && <p className="mt-1.5 font-mono text-xs text-destructive">{phoneError}</p>}
                    <p className="mt-2 font-mono text-[10px] text-primary/25 uppercase tracking-[0.12em]">
                      {t("phoneCapture.phoneHint")}
                    </p>
                  </div>
                  <div>
                    <Label className="font-mono text-xs text-primary/40 uppercase tracking-[0.18em] mb-2 block">
                      {t("phoneCapture.nameLabel")}
                    </Label>
                    <Input
                      type="text"
                      value={sel.name}
                      onChange={(e: any) => setSel((s) => ({ ...s, name: e.target.value }))}
                      placeholder={t("phoneCapture.namePlaceholder")}
                      className="text-primary bg-transparent placeholder:text-primary/30"
                    />
                  </div>
                </div>

                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={handlePhoneSubmit}
                  disabled={isSubmitting || !sel.phone}
                >
                  {isSubmitting ? t("phoneCapture.submitting") : t("phoneCapture.button")}
                </MagneticButton>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-7 py-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/8 bg-foreground/3 px-3 py-1 mb-4">
                    <Check className="h-3 w-3 text-primary/40" strokeWidth={2.5} />
                    <span className="font-mono text-[10px] text-primary/40 uppercase tracking-[0.15em]">{t("results.badge")}</span>
                  </div>
                  <h3 className="font-sans font-normal text-primary" style={{ fontSize: "clamp(20px,3.5vw,30px)", letterSpacing: "-0.02em" }}>
                    {t("results.title")}
                  </h3>
                </div>
                {estimate && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-6 rounded-sm bg-primary text-primary-foreground">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-40 mb-3">{t("results.investment")}</p>
                        <p className="font-sans font-light leading-none mb-1" style={{ fontSize: "clamp(18px,3.5vw,26px)", letterSpacing: "-0.03em" }}>
                          {formatEGP(Math.round((estimate.priceMin + estimate.priceMax) / 2))}
                        </p>
                        <p className="font-mono text-xs opacity-40">{t("results.vatExcluded")}</p>
                        <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-30 mt-3">{t("results.hostingIncluded")}</p>
                      </div>
                      <div className="p-6 rounded-sm bg-foreground/3 border border-foreground/8">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/25 mb-3">{t("results.timeline")}</p>
                        <p className="font-sans font-light text-primary leading-none mb-1" style={{ fontSize: "clamp(18px,3.5vw,26px)", letterSpacing: "-0.03em" }}>
                          {localizeNumbers(estimate.weeksMin.toString(), locale)}–{localizeNumbers(estimate.weeksMax.toString(), locale)}
                        </p>
                        <p className="font-mono text-xs text-primary/35">{t("results.weeks")}</p>
                      </div>
                    </div>
                    {selection && (
                      <ProposalNarrativeBlock
                        projectType={selection.projectType}
                        tier={selection.tier}
                        timelineKey={selection.timeline}
                        locale={locale}
                      />
                    )}
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/25 mb-3">{t("results.whatYouGet")}</p>
                      <div className="space-y-2.5">
                        {(() => {
                          if (!selection) return []
                          const items = (t as any).raw(`pdfContent.deliverables.${selection.projectType}.${selection.tier}`) || []
                          return (
                            <>
                              {items.slice(0, 5).map((d: string, i: number) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="h-1.5 w-1.5 rounded-full bg-foreground/25 mt-[7px] shrink-0" />
                                  <p className="text-base text-primary/65 leading-relaxed">{d}</p>
                                </div>
                              ))}
                              {items.length > 5 && (
                                <p className="font-mono text-[10px] text-primary/25 uppercase tracking-[0.12em] ltr:pl-5 rtl:pr-5 pt-1">
                                  {t("results.moreInPdf", { count: items.length - 5 })}
                                </p>
                              )}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-sm bg-foreground/2.5 border border-foreground/6">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/30 mt-2 shrink-0" />
                      <p className="font-mono text-xs text-primary/45 leading-relaxed">
                        <span className="text-primary/60 font-medium">{t("results.infraLabel")}:</span>{" "}
                        {selection ? t("results.infraDescription", { amount: formatEGP(HOSTING_RENEWAL[selection.tier]) }) : null}
                      </p>
                    </div>
                    <div className="p-6 rounded-sm border border-foreground/8 bg-foreground/3 flex gap-5 items-start">
                      <div className="w-1.5 self-stretch rounded-full bg-primary/30 shrink-0" />
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/40 mb-2">{t("results.rangeCtaLabel")}</p>
                        <p className="text-base text-primary/60 leading-relaxed font-sans">{t("results.rangeCta")}</p>
                      </div>
                    </div>
                    <div className="space-y-3 pt-1">
                      <MagneticButton
                        variant="primary"
                        size="lg"
                        className="w-full justify-center group"
                        onClick={handleDownloadPDF}
                        disabled={isGenerating}
                      >
                        <span className="flex items-center gap-2">
                          {isGenerating ? t("pdf.generating") : (
                            <>
                              <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                              {t("pdf.button")}
                            </>
                          )}
                        </span>
                      </MagneticButton>
                      <Link href="/estimator">
                        <MagneticButton variant="secondary" size="lg" className="w-full justify-center group">
                          <span className="flex items-center gap-2">
                            {t("results.ctaPrimary")}
                            <ArrowRight className="h-4 w-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:-rotate-180" />
                          </span>
                        </MagneticButton>
                      </Link>
                    </div>
                    <p className="font-mono text-xs text-primary/20 text-center uppercase tracking-[0.15em]">
                      {t("results.disclaimer")}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          {step > 1 && step < 5 && (
            <div className="mt-8 flex justify-between items-center border-t border-foreground/8 pt-6">
              {step === 4 ? (
                <button onClick={goPrev} className="text-primary/40 hover:text-primary/70 transition-colors flex items-center gap-2 text-base font-mono group">
                  <ArrowLeft className="h-3.5 w-3.5 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:-rotate-180" />
                  {t("back")}
                </button>
              ) : (
                <button onClick={goPrev} className="text-primary/40 hover:text-primary/70 transition-colors flex items-center gap-2 text-base font-mono group">
                  <ArrowLeft className="h-3.5 w-3.5 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:-rotate-180" />
                  {t("back")}
                </button>
              )}
              <span className="font-mono text-primary/20 text-xs tracking-[0.15em]">{step} / 5</span>
              {step < 4 ? (
                <button
                  onClick={goNext}
                  disabled={(step === 2 && !sel.tier) || (step === 3 && !sel.timeline)}
                  className="text-primary/40 hover:text-primary/70 transition-colors flex items-center gap-2 text-base font-mono disabled:opacity-20 disabled:cursor-not-allowed group"
                >
                  {t("next")}
                  <ArrowRight className="h-3.5 w-3.5 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:-rotate-180" />
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
          {step === 5 && (
            <div className="mt-6 border-t border-foreground/8 pt-6 flex justify-between items-center">
              <button onClick={() => animateStep("back", () => setStep(4))} className="text-primary/40 hover:text-primary/70 transition-colors flex items-center gap-2 text-base font-mono group">
                <ArrowLeft className="h-3.5 w-3.5 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:-rotate-180" />
                {t("back")}
              </button>
              <Link href="/estimator">
                <button className="text-primary/40 hover:text-primary/70 transition-colors flex items-center gap-2 text-base font-mono group">
                  {t("startOver")}
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-sans font-normal text-primary mb-3" style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              {t("faq.title")}
            </h3>
            <p className="text-primary/50 text-base">{t("faq.subtitle")}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-primary font-sans text-base">{t("faq.q1")}</AccordionTrigger>
              <AccordionContent className="text-primary/60 text-base leading-relaxed">
                {t("faq.a1")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-primary font-sans text-base">{t("faq.q2")}</AccordionTrigger>
              <AccordionContent className="text-primary/60 text-base leading-relaxed">
                {t("faq.a2")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-primary font-sans text-base">{t("faq.q3")}</AccordionTrigger>
              <AccordionContent className="text-primary/60 text-base leading-relaxed">
                {t("faq.a3")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-primary font-sans text-base">{t("faq.q4")}</AccordionTrigger>
              <AccordionContent className="text-primary/60 text-base leading-relaxed">
                {t("faq.a4")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </section>
  )
})
