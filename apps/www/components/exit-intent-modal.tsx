"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { markAsConverted, useExitIntent } from "@/hooks/use-exit-intent"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { Mail, X } from "lucide-react"
import { useState } from "react"

interface ExitIntentModalProps {
  title?: string
  subtitle?: string
  offerTitle?: string
  offerDescription?: string
  buttonText?: string
  secondaryButtonText?: string
}

export const ExitIntentModal = ({
  title = "Wait! Before you go...",
  subtitle = "Get a free consultation",
  offerTitle = "Free Project Consultation & Quote",
  offerDescription = "Let's discuss your project requirements. We'll provide a detailed technical evaluation and a clear cost estimate.",
  buttonText = "Request Consultation",
  secondaryButtonText = "No thanks",
}: ExitIntentModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleExit = () => {
    setIsVisible(true)
    trackEvent("exit_intent_shown")
  }

  useExitIntent(handleExit, {
    threshold: 10,
    cooldown: 24 * 60 * 60 * 1000, // 24 hours
    maxDisplays: 3,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/exit-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit_intent_modal" }),
      })

      if (response.ok) {
        setIsSuccess(true)
        markAsConverted()
        trackEvent("exit_intent_captured", { email })
        
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className={cn(
        "relative w-full max-w-lg bg-background rounded-lg shadow-2xl",
        "border border-border p-8 animate-in fade-in zoom-in-95 duration-200"
      )}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-primary/40 hover:text-primary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-medium text-primary mb-2">
              Request Received
            </h3>
            <p className="text-primary/60">
              We&apos;ll contact you shortly at {email}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/40 mb-2">
                {subtitle}
              </p>
              <h2 className="text-2xl font-medium text-primary mb-2">
                {title}
              </h2>
            </div>

            <div className="bg-foreground/5 border border-border rounded-sm p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-medium text-primary mb-1">
                    {offerTitle}
                  </h3>
                  <p className="text-sm text-primary/60">
                    {offerDescription}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full",
                    error && "border-destructive"
                  )}
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </MagneticButton>
                
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm text-primary/40 hover:text-primary transition-colors"
                >
                  {secondaryButtonText}
                </button>
              </div>
            </form>
            <p className="text-xs text-primary/30 text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
