"use client";

import { Container } from "@/components/container";
import { ArrowLabel } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import { Link } from "@/i18n/navigation";
import { FINAL_CTA_CONTENT, getCommercialCta, pickCommercialText } from "@/lib/commercial";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { useRef } from "react";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const callCta = getCommercialCta(locale, "technicalCall");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0 });
  const titleRef = useText({ ...DEFAULTS.heading, ease: MOTION.ease.text });
  const contentRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden section-padding"
      aria-label="Call to action"
    >
      <Container>
        <div className="h-px w-full bg-border mb-16" />
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
          <div className="min-w-0">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground/70 mb-6 block">
              {pickCommercialText(locale, FINAL_CTA_CONTENT.eyebrow)}
            </p>
            <h2 ref={titleRef} className="display-h2 max-w-4xl font-normal text-primary">
              {pickCommercialText(locale, FINAL_CTA_CONTENT.title)}
            </h2>
          </div>
          <div ref={contentRef} className="flex min-w-0 flex-col gap-6">
            <p className="body-copy text-muted-foreground">
              {pickCommercialText(locale, FINAL_CTA_CONTENT.body)}
            </p>
            <MagneticButton
              size="lg"
            >
              <Link href={callCta.href}>
                <ArrowLabel>{callCta.label}</ArrowLabel>
              </Link>
            </MagneticButton>
            <p className="meta-eyebrow text-muted-foreground/55 text-center">
              {pickCommercialText(locale, FINAL_CTA_CONTENT.footnote)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}