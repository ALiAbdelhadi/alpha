"use client"

import { Container } from "@/components/container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DEFAULTS, MOTION, useReveal } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface FaqSectionProps {
  namespace: string
  className?: string
}

export const FaqSection = memo(function FaqSection({ namespace, className }: FaqSectionProps) {
  const t = useTranslations(namespace)

  const headerRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, delay: 0 })
  const contentRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    delay: 0.15,
    ease: MOTION.ease.smooth,
    distance: 28,
  })

  const questionKeys = ["01", "02", "03", "04", "05"]

  return (
    <section className={cn("border-t border-border section-padding", className)}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div ref={headerRef} className="max-w-md">
            <p className="meta-eyebrow text-muted-foreground mb-4 block">
              {t("faq.title")}
            </p>
            <h2 className="display-h2 font-normal text-foreground leading-[1.1] mb-6">
              {t("faq.subtitle")}
            </h2>
          </div>

          <div ref={contentRef} className="rounded-2xl border border-border bg-surface px-5 md:px-8">
            <Accordion type="single" collapsible className="w-full">
              {questionKeys.map((key) => (
                <AccordionItem key={key} value={key} className="border-border">
                  <AccordionTrigger className="body-copy font-sans font-light hover:text-foreground transition-colors py-6 text-start">
                    {t(`faq.questions.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="body-secondary text-muted-foreground leading-relaxed pb-8">
                    {t(`faq.questions.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  )
})