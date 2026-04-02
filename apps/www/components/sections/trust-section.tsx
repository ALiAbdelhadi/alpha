"use client";

import { Container } from "@/components/container";
import { ExternalDirectionalLink } from "@/components/directional-link";
import { TRUST_BLOCK, pickCommercialText } from "@/lib/commercial";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { memo } from "react";

export const TrustSection = memo(function TrustSection() {
  const locale = useLocale();

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });

  return (
    <section className="section-padding border-t border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)]">
          <div>
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground/60">
              {pickCommercialText(locale, TRUST_BLOCK.eyebrow)}
            </p>
            <h2
              ref={titleRef}
              className="display-h2 mt-4 max-w-4xl font-normal text-primary"
            >
              {pickCommercialText(locale, TRUST_BLOCK.title)}
            </h2>
            <p ref={bodyRef} className="body-copy mt-5 max-w-2xl text-muted-foreground">
              {pickCommercialText(locale, TRUST_BLOCK.body)}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {TRUST_BLOCK.points.map((point) => (
                <article
                  key={point.title.en}
                  className="rounded-[24px] border border-border bg-foreground/[0.02] p-5"
                >
                  <h3 className="text-lg font-medium tracking-tight text-primary">
                    {pickCommercialText(locale, point.title)}
                  </h3>
                  <p className="body-secondary mt-3 text-muted-foreground">
                    {pickCommercialText(locale, point.body)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-border bg-background p-6 md:p-8">
            <p className="meta-eyebrow text-muted-foreground/55">
              {pickCommercialText(locale, TRUST_BLOCK.founderEyebrow)}
            </p>
            <h3 className="display-h3 mt-4 font-medium text-primary">
              {pickCommercialText(locale, TRUST_BLOCK.founderName)}
            </h3>
            <p className="body-secondary mt-2 text-muted-foreground">
              {pickCommercialText(locale, TRUST_BLOCK.founderRole)}
            </p>
            <p className="body-copy mt-6 text-primary/78">
              {pickCommercialText(locale, TRUST_BLOCK.founderBody)}
            </p>
            <ExternalDirectionalLink
              href={TRUST_BLOCK.founderLinkHref}
              className="meta-eyebrow mt-8 inline-flex text-primary transition-colors hover:text-primary/70"
            >
              {pickCommercialText(locale, TRUST_BLOCK.founderLinkLabel)}
            </ExternalDirectionalLink>
          </aside>
        </div>
      </Container>
    </section>
  );
});
