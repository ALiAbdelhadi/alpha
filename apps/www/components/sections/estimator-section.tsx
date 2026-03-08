/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useReveal } from "@/hooks/use-animation"
import { gsap } from "@/lib/gsap"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { Container } from "../container"
import { MagneticButton } from "../magnetic-button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

type ProjectType = "ecommerce" | "corporate" | "custom" | "performance" | null
type BudgetRange = "small" | "medium" | "large" | "enterprise" | null
type Timeline = "urgent" | "soon" | "flexible" | null

export function EstimatorSection() {
  const t = useTranslations("estimator")
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
  
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState<{
    type: ProjectType;
    budget: BudgetRange;
    timeline: Timeline;
  }>({
    type: null,
    budget: null,
    timeline: null
  })
  
  const formContainerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (formContainerRef.current) {
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => {
          setStep((s) => Math.min(4, s + 1))
          gsap.fromTo(
            formContainerRef.current!,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4 }
          )
        },
      })
    }
  }

  const handlePrev = () => {
    if (formContainerRef.current) {
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          setStep((s) => Math.max(1, s - 1))
          gsap.fromTo(
            formContainerRef.current!,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4 }
          )
        },
      })
    }
  }

  const locale = useLocale()

  const calculateEstimate = () => {
    let base = 0
    if (selections.type === "ecommerce") base += 350000 // ~7000 USD
    if (selections.type === "corporate") base += 150000  // ~3000 USD
    if (selections.type === "custom") base += 500000     // ~10000 USD
    if (selections.type === "performance") base += 75000 // ~1500 USD
    
    // Add complexity based on budget
    if (selections.budget === "medium") base *= 1.5
    if (selections.budget === "large") base *= 2.5
    if (selections.budget === "enterprise") base *= 4.0
    
    // Adjust for timeline
    if (selections.timeline === "urgent") base *= 1.3
    
    return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(base)
  }

  return (
    <section
      suppressHydrationWarning={true}
      id="estimator"
      ref={sectionRef}
      className="flex w-full items-center section-padding bg-foreground/2"
    >
      <Container>
        <div ref={titleRef} className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="mono-uppercase text-teal-500/70 mb-4 tracking-widest block font-bold">
            {t("badge")}
          </span>
          <h2 className="mb-6 font-sans font-normal text-primary">
            {t("title")}
          </h2>
          <p className="body-lg text-primary/70">
            {t("description")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-background rounded-2xl border border-border/50 p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/5">
            <div
              className="h-full bg-linear-to-r from-teal-400 to-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div ref={formContainerRef} className="pt-4">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-primary mb-6">
                  {t("step1.question")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["ecommerce", "corporate", "custom", "performance"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelections((s) => ({ ...s, type: type as ProjectType }))
                        setTimeout(handleNext, 300)
                      }}
                      className={`relative p-5 rounded-xl border text-start transition-all duration-300 ${
                        selections.type === type
                          ? "border-teal-500/50 bg-teal-500/5 ring-1 ring-teal-500/50"
                          : "border-border/50 bg-foreground/2 hover:border-foreground/20 hover:bg-foreground/4"
                      }`}
                    >
                      <h4 className="font-medium text-primary mb-1">
                        {t(`step1.options.${type}.title` as any)}
                      </h4>
                      <p className="small text-primary/60">
                        {t(`step1.options.${type}.desc` as any)}
                      </p>
                      {selections.type === type && (
                        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-teal-500">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-primary mb-6">
                  {t("step2.question")}
                </h3>
                <div className="grid grid-cols-1 flex-col gap-4">
                  {["small", "medium", "large", "enterprise"].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => {
                        setSelections((s) => ({ ...s, budget: budget as BudgetRange }))
                        setTimeout(handleNext, 300)
                      }}
                      className={`relative p-5 rounded-xl border text-start transition-all duration-300 ${
                        selections.budget === budget
                          ? "border-teal-500/50 bg-teal-500/5 ring-1 ring-teal-500/50"
                          : "border-border/50 bg-foreground/2 hover:border-foreground/20 hover:bg-foreground/4"
                      }`}
                    >
                      <h4 className="font-medium text-primary">
                        {t(`step2.options.${budget}` as any)}
                      </h4>
                      {selections.budget === budget && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 rtl:left-4 rtl:right-auto text-teal-500">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-primary mb-6">
                  {t("step3.question")}
                </h3>
                <div className="grid grid-cols-1 flex-col gap-4">
                  {["urgent", "soon", "flexible"].map((timeline) => (
                    <button
                      key={timeline}
                      onClick={() => {
                        setSelections((s) => ({ ...s, timeline: timeline as Timeline }))
                        setTimeout(handleNext, 300)
                      }}
                      className={`relative p-5 rounded-xl border text-start transition-all duration-300 ${
                        selections.timeline === timeline
                          ? "border-teal-500/50 bg-teal-500/5 ring-1 ring-teal-500/50"
                          : "border-border/50 bg-foreground/2 hover:border-foreground/20 hover:bg-foreground/4"
                      }`}
                    >
                      <h4 className="font-medium text-primary">
                        {t(`step3.options.${timeline}.title` as any)}
                      </h4>
                      <p className="small text-primary/60">
                        {t(`step3.options.${timeline}.desc` as any)}
                      </p>
                      {selections.timeline === timeline && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 rtl:left-4 rtl:right-auto text-teal-500">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 py-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-2">
                  <Check className="h-8 w-8 text-teal-500" strokeWidth={3} />
                </div>
                <h3 className="text-3xl md:text-4xl font-sans font-medium text-primary">
                  {t("results.title")}
                </h3>
                <div className="p-8 rounded-2xl bg-foreground/3 border border-border/50 max-w-lg mx-auto">
                  <p className="mono-uppercase text-primary/50 text-sm mb-2">
                    {t("results.investment")}
                  </p>
                  <p className="text-5xl font-sans font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-cyan-600 mb-6 drop-shadow-sm">
                    {selections.type && calculateEstimate()}
                    {!selections.type && (locale === "ar" ? "???? ج.م" : "???? EGP")}
                  </p>
                  <p className="body text-primary/70 mb-8 px-4 text-center">
                    {t("results.consultationGate")}
                  </p>
                  <Link href="/estimator">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      className="w-full text-base group"
                    >
                      <span className="flex items-center gap-2">
                        {t("results.ctaPrimary")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" />
                      </span>
                    </MagneticButton>
                  </Link>
                </div>
                <p className="small text-primary/40 mt-4 max-w-md mx-auto text-center">
                  {t("results.disclaimer")}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          {step > 1 && step < 4 && (
            <div className="mt-8 flex justify-between items-center border-t border-border/40 pt-6">
              <button
                onClick={handlePrev}
                className="text-primary/60 hover:text-primary transition-colors flex items-center gap-2 small font-medium group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-rotate-180" />
                {t("back")}
              </button>
              <span className="mono text-primary/30 text-xs">
                {step} / 3
              </span>
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !selections.type) ||
                  (step === 2 && !selections.budget) ||
                  (step === 3 && !selections.timeline)
                }
                className="text-primary/60 hover:text-primary transition-colors flex items-center gap-2 small font-medium disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                {t("next")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
