"use client"

import { Container } from "@/components/container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTextReveal, useFadeUp } from "@/hooks/use-text-reveal"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface FaqSectionProps {
  namespace: string
  className?: string
}

export const FaqSection = memo(function FaqSection({ namespace, className }: FaqSectionProps) {
  const t = useTranslations(namespace)

  const headerRef = useTextReveal<HTMLDivElement>({
    delay: 0,
    duration: 1.0,
    blur: true,
    threshold: 0.15,  // Changed from 0.3 to 0.15 - trigger earlier
  })

  const contentRef = useFadeUp<HTMLDivElement>({
    delay: 0.15,
    duration: 0.8,
    distance: 28,
  })

  // Get keys for questions. Assuming 'questions' is an object with numeric keys "01", "02", etc.
  // We'll hardcode or dynamically determine. For our implementation, we added 5 questions.
  const questionKeys = ["01", "02", "03", "04", "05"]

  return (
    <section className={cn("py-24 border-t border-foreground/5", className)}>
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          <div ref={headerRef} className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
              {t("faq.title")}
            </p>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-primary leading-[1.1] tracking-tight mb-6">
              {t("faq.subtitle")}
            </h2>
          </div>

          <div ref={contentRef}>
            <Accordion type="single" collapsible className="w-full">
              {questionKeys.map((key) => (
                <AccordionItem key={key} value={key} className="border-foreground/8">
                  <AccordionTrigger className="text-lg md:text-xl font-sans font-light hover:text-primary transition-colors py-6">
                    {t(`faq.questions.${key}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-primary/60 leading-relaxed pb-8">
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
