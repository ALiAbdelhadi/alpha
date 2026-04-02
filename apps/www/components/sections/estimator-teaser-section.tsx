"use client";

import { Container } from "@/components/container";
import { ArrowLabel } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import { ESTIMATOR_TEASER, getCommercialCta, pickCommercialText } from "@/lib/commercial";
import { Link } from "@/i18n/navigation";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { memo } from "react";

export const EstimatorTeaserSection = memo(function EstimatorTeaserSection() {
  const locale = useLocale();
  const estimatorCta = getCommercialCta(locale, "projectRange");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });

  return (
    <section id="estimator" className="section-padding border-t border-border">
      <Container>
        <div className="rounded-[32px] border border-border bg-foreground/[0.02] p-6 md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground/60">
                {pickCommercialText(locale, ESTIMATOR_TEASER.eyebrow)}
              </p>
              <h2 ref={titleRef} className="display-h2 mt-4 max-w-4xl font-normal text-primary">
                {pickCommercialText(locale, ESTIMATOR_TEASER.title)}
              </h2>
              <p ref={bodyRef} className="body-copy mt-5 max-w-3xl text-muted-foreground">
                {pickCommercialText(locale, ESTIMATOR_TEASER.body)}
              </p>
            </div>

            <MagneticButton
              asChild
              size="lg"
              variant="primary"
              className="group w-full justify-center lg:w-auto"
            >
              <Link href={estimatorCta.href}>
                <ArrowLabel>{estimatorCta.label}</ArrowLabel>
              </Link>
            </MagneticButton>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {ESTIMATOR_TEASER.checklist.map((item) => (
              <div
                key={item.en}
                className="rounded-[22px] border border-border bg-background/65 p-4"
              >
                <p className="body-secondary text-primary/78">
                  {pickCommercialText(locale, item)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});
