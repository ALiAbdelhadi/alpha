"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { markAsConverted, useExitIntent } from "@/hooks/use-exit-intent"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

export const ExitIntentModal = () => {
  const t = useTranslations("exitIntent")
  const [isVisible, setIsVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const locale = useLocale()
  const handleExit = () => {
    setIsVisible(true)
    trackEvent("exit_intent_shown")
  }

  useExitIntent(handleExit, {
    threshold: 10,
    cooldown: 24 * 60 * 60 * 1000,
    maxDisplays: 3,
  })

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    return cleaned.length >= 8 && cleaned.length <= 15
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(phone)) {
      setError(t("phoneError"))
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/${locale}/api/exit-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, source: "exit_intent_modal" }),
      })

      if (response.ok) {
        setIsSuccess(true)
        markAsConverted()
        trackEvent("exit_intent_captured", { phone })
        setTimeout(() => setIsVisible(false), 3000)
      } else {
        setError(t("phoneError"))
      }
    } catch {
      setError(t("phoneError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    trackEvent("exit_intent_dismissed")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        className={cn(
          "relative w-full max-w-md rounded-[1.75rem] border border-border bg-background/96 shadow-2xl backdrop-blur-xl",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-foreground/30 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        {isSuccess ? (
          <div className="p-8 text-center">
            <p className="font-mono text-sm leading-normal tracking-wider text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-foreground/40 mb-4">
              {t("successTitle")}
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {t("successDescription")}
            </p>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-8">
              <p className="font-mono text-sm leading-normal tracking-wider text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-foreground/40 mb-3">
                {t("subtitle")}
              </p>
              <h2 className="text-2xl font-medium text-foreground tracking-tight mb-3">
                {t("title")}
              </h2>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {t("description")}
              </p>
            </div>
            <div className="border-t border-border mb-6" />
            <div className="mb-8 grid grid-cols-3 gap-3">
              {[
                { value: "30 min", label: t("stats.noPitch") },
                { value: "Free", label: t("stats.noCommitment") },
                { value: "Direct", label: t("stats.founderAccess") },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-foreground/8 bg-foreground/[0.02] px-3 py-3">
                  <p className="text-sm font-medium text-foreground">{value}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <div
                  className={cn(
                    "flex items-center border-b border-border pb-2 gap-2",
                    error && "border-destructive"
                  )}
                >
                  <input
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setError("")
                    }}
                    disabled={isSubmitting}
                    className={cn(
                      "flex-1 bg-transparent text-sm text-foreground",
                      "placeholder:text-foreground/30 outline-none"
                    )}
                  />
                </div>
                {error && (
                  <p className="text-xs text-destructive mt-1.5">{error}</p>
                )}
                <p className="text-xs text-foreground/30 mt-1.5">
                  {t("phoneHint")}
                </p>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("submitting") : t("buttonText")}
                </MagneticButton>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors whitespace-nowrap"
                >
                  {t("secondaryButtonText")}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
