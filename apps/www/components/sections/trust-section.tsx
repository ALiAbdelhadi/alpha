"use client";

import { Container } from "@/components/container";
import { ExternalDirectionalLink } from "@/components/directional-link";
import { TRUST_BLOCK, pickCommercialText } from "@/lib/commercial";
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { memo } from "react";

function splitHeadline(value: string) {
  if (!value.trim()) return { first: "", second: "" }
  const sentenceMatch = value.match(/^(.+[.!?،])\s+(.+)$/)
  if (sentenceMatch) return { first: sentenceMatch[1], second: sentenceMatch[2] }
  const words = value.trim().split(/\s+/)
  if (words.length < 2) return { first: value, second: "" }
  const splitAt = Math.ceil(words.length / 2)
  return {
    first: words.slice(0, splitAt).join(" "),
    second: words.slice(splitAt).join(" "),
  }
}

export const TrustSection = memo(function TrustSection() {
  const locale = useLocale();

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const gridRef = useBatch({ ...DEFAULTS.card, selector: ".trust-card" });

  const title = pickCommercialText(locale, TRUST_BLOCK.title);
  const { first: firstTitle, second: secondTitle } = splitHeadline(title);

  return (
    <section className="section-padding border-t border-border">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 md:gap-12 mb-16">
          <div className="space-y-3">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground m-0">
              {pickCommercialText(locale, TRUST_BLOCK.eyebrow)}
            </p>
            <h2 ref={titleRef} className="display-h2 font-normal text-foreground m-0">
              {firstTitle}
              {secondTitle ? (
                <>
                  <br className="hidden md:block" />
                  <span className="block mt-2 md:mt-0 md:inline font-serif italic text-muted-foreground">
                    {secondTitle}
                  </span>
                </>
              ) : null}
            </h2>
          </div>
          <p ref={bodyRef} className="font-mono text-[13px] leading-[1.8] text-muted-foreground max-w-[320px] m-0">
            {pickCommercialText(locale, TRUST_BLOCK.body)}
          </p>
        </div>
        <div className="h-px bg-border mb-5" />
        <div
          ref={gridRef}
          className="grid gap-0 border-l border-r border-border md:grid-cols-3"
        >
          {TRUST_BLOCK.points.map((point, i) => (
            <div
              key={point.title.en}
              className="trust-card border-r border-b border-border px-6 py-8 group hover:bg-surface transition-colors duration-300"
            >
              <p className="meta-eyebrow text-muted-foreground mb-6">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display-h3 font-medium text-foreground mb-3 tracking-tight">
                {pickCommercialText(locale, point.title)}
              </h3>
              <p className="body-copy text-muted-foreground leading-relaxed">
                {pickCommercialText(locale, point.body)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start border-t border-border pt-10">
          <div>
            <p className="meta-eyebrow text-muted-foreground mb-4">
              {pickCommercialText(locale, TRUST_BLOCK.founderEyebrow)}
            </p>
            <h3 className="display-h3 font-medium text-foreground mb-2">
              {pickCommercialText(locale, TRUST_BLOCK.founderName)}
            </h3>
            <p className="meta-eyebrow text-muted-foreground mb-6">
              {pickCommercialText(locale, TRUST_BLOCK.founderRole)}
            </p>
            <p className="body-copy text-muted-foreground max-w-xl">
              {pickCommercialText(locale, TRUST_BLOCK.founderBody)}
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <ExternalDirectionalLink
              href={TRUST_BLOCK.founderLinkHref}
              className="meta-eyebrow inline-flex text-foreground transition-colors hover:text-muted-foreground"
            >
              {pickCommercialText(locale, TRUST_BLOCK.founderLinkLabel)}
            </ExternalDirectionalLink>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-9">
          <span className="meta-eyebrow text-muted-foreground">
            {locale === "ar" ? "النزاهة فوق كل شيء" : "Integrity above all"}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </Container>
    </section>
  );
});