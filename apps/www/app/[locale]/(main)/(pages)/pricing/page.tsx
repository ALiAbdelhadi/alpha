"use client";

import { Container } from "@/components/container";
import { ArrowLabel } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import { FaqSection } from "@/components/sections/faq-section";
import {
  PRICING_COMMERCIAL,
  getCommercialCta,
  pickCommercialText,
} from "@/lib/commercial";
import { Link } from "@/i18n/navigation";
import { DEFAULTS, useBatch, useReveal, useText } from "@/lib/motion";
import { useLocale, useTranslations } from "next-intl";

const TIER_DESTINATION = {
  essential: "/estimator?tier=essential",
  professional: "/estimator?tier=professional",
  flagship: "/schedule",
} as const;

export default function PricingPage() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const heroEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const heroTitleRef = useText<HTMLHeadingElement>(DEFAULTS.heading);
  const heroDescRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const tierCardsRef = useBatch<HTMLDivElement>({
    ...DEFAULTS.card,
    selector: ".tier-card",
  });
  const commercialNotesRef = useBatch<HTMLDivElement>({
    ...DEFAULTS.card,
    selector: ".commercial-note",
  });
  const roiEyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const roiTitleRef = useText<HTMLHeadingElement>(DEFAULTS.heading);
  const roiBodyRef = useBatch<HTMLDivElement>({
    ...DEFAULTS.card,
    selector: ".roi-p",
  });
  const roiStatsRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });

  const tiers = [
    {
      id: "essential" as const,
      name: t("tiers.essential.name"),
      buyerLabel: pickCommercialText(locale, PRICING_COMMERCIAL.essential.buyerLabel),
      internalLabel: pickCommercialText(locale, PRICING_COMMERCIAL.essential.internalLabel),
      ctaLabel: getCommercialCta(locale, PRICING_COMMERCIAL.essential.ctaKey).label,
      priceRange: t("tiers.essential.priceRange"),
      originalPrice: t("tiers.essential.originalPrice"),
      idealFor: t("tiers.essential.idealFor"),
      notIncluded: t("tiers.essential.notIncluded"),
      highlight: false,
      nextStep:
        locale === "ar"
          ? "الخطوة التالية: افتح المقدّر وحدد نطاق الموقع المناسب."
          : "Next step: open the estimator and scope the right website range.",
      features: Array.from({ length: 5 }, (_, i) =>
        t(`tiers.essential.features.${i}`),
      ),
    },
    {
      id: "professional" as const,
      name: t("tiers.professional.name"),
      buyerLabel: pickCommercialText(locale, PRICING_COMMERCIAL.professional.buyerLabel),
      internalLabel: pickCommercialText(locale, PRICING_COMMERCIAL.professional.internalLabel),
      ctaLabel: getCommercialCta(locale, PRICING_COMMERCIAL.professional.ctaKey).label,
      priceRange: t("tiers.professional.priceRange"),
      originalPrice: t("tiers.professional.originalPrice"),
      idealFor: t("tiers.professional.idealFor"),
      notIncluded: t("tiers.professional.notIncluded"),
      highlight: true,
      nextStep:
        locale === "ar"
          ? "الخطوة التالية: افتح المقدّر وأكمل نطاق النظام المتكامل."
          : "Next step: open the estimator and continue with the integrated build scope.",
      features: Array.from({ length: 5 }, (_, i) =>
        t(`tiers.professional.features.${i}`),
      ),
    },
    {
      id: "flagship" as const,
      name: t("tiers.flagship.name"),
      buyerLabel: pickCommercialText(locale, PRICING_COMMERCIAL.flagship.buyerLabel),
      internalLabel: pickCommercialText(locale, PRICING_COMMERCIAL.flagship.internalLabel),
      ctaLabel: getCommercialCta(locale, PRICING_COMMERCIAL.flagship.ctaKey).label,
      priceRange: t("tiers.flagship.priceRange"),
      originalPrice: t("tiers.flagship.originalPrice"),
      idealFor: t("tiers.flagship.idealFor"),
      notIncluded: null,
      highlight: false,
      nextStep:
        locale === "ar"
          ? "الخطوة التالية: احجز مكالمة تقنية لتخطيط البنية المعقدة."
          : "Next step: book a technical call to plan the custom architecture.",
      features: Array.from({ length: 5 }, (_, i) =>
        t(`tiers.flagship.features.${i}`),
      ),
    },
  ];

  const roiStats = [
    {
      key: "timeline",
      label: t("roi.stats.timeline.label"),
      value: t("roi.stats.timeline.value"),
      sub: t("roi.stats.timeline.sub"),
    },
    {
      key: "timeSaved",
      label: t("roi.stats.timeSaved.label"),
      value: t("roi.stats.timeSaved.value"),
      sub: t("roi.stats.timeSaved.sub"),
    },
    {
      key: "deliverable",
      label: t("roi.stats.deliverable.label"),
      value: t("roi.stats.deliverable.value"),
      sub: t("roi.stats.deliverable.sub"),
    },
  ];

  const commercialNotes = [
    {
      key: "vat",
      label: t("commercial.items.vat.label"),
      value: t("commercial.items.vat.value"),
    },
    {
      key: "yearOne",
      label: t("commercial.items.yearOne.label"),
      value: t("commercial.items.yearOne.value"),
    },
    {
      key: "exclusions",
      label: t("commercial.items.exclusions.label"),
      value: t("commercial.items.exclusions.value"),
    },
    {
      key: "programs",
      label: t("commercial.items.programs.label"),
      value: t("commercial.items.programs.value"),
    },
  ];

  return (
    <section className="section-padding">
      <Container>
        <div className="py-12 md:py-24">
          <div className="mb-16 max-w-5xl">
            <p
              ref={heroEyebrowRef}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
            >
              {t("label")}
            </p>
            <h1
              ref={heroTitleRef}
              className="mb-6 font-sans font-normal text-primary leading-[1.03]"
              style={{
                fontSize: "clamp(44px, 7vw, 96px)",
                letterSpacing: "-0.025em",
              }}
            >
              {t("title")}
              <br />
              <span
                className="text-display-italic"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {t("titleItalic")}
              </span>
            </h1>
            <p
              ref={heroDescRef}
              className="text-base text-primary/60 leading-relaxed max-w-[52ch]"
            >
              {t("description")}
            </p>
          </div>
          <div className="h-px w-full bg-foreground/8 mb-12" />
          <div ref={tierCardsRef} className="grid gap-4 md:grid-cols-3 mb-16">
            {tiers.map((tier, i) => (
              <article
                key={tier.id}
                className={[
                  "tier-card relative border rounded-sm p-6 md:p-8 flex flex-col",
                  tier.highlight
                    ? "border-foreground/40 bg-foreground/4"
                    : "border-foreground/8 bg-foreground/2",
                ].join(" ")}
              >
                {tier.highlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/60 rounded-t-sm" />
                    <div className="mb-3">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/40">
                        {t("recommended")}
                      </p>
                    </div>
                  </>
                )}
                <span
                  className="font-mono font-light text-primary/10 leading-none select-none mb-4 block"
                  style={{
                    fontSize: "clamp(40px, 4vw, 52px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-sans font-medium text-primary mb-1"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {tier.buyerLabel}
                </h2>
                <p className="meta-eyebrow text-primary/35 mb-2">
                  {tier.internalLabel}
                </p>
                {tier.highlight && tier.originalPrice && (
                  <div className="text-xs text-primary/35 line-through mb-1">
                    {tier.originalPrice}
                  </div>
                )}
                <p className="font-mono text-xs text-primary/40 uppercase tracking-[0.15em] mb-4">
                  {tier.priceRange}
                </p>
                <p className="text-sm text-primary/60 leading-relaxed mb-6">
                  {tier.idealFor}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-primary/60"
                    >
                      <div className="h-px w-3 bg-foreground/8 mt-2.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.notIncluded && (
                  <p className="text-xs text-primary/35 leading-relaxed mb-6 border-t border-foreground/8 pt-4">
                    {tier.notIncluded}
                  </p>
                )}
                <p className="text-xs text-primary/45 leading-relaxed mb-4">
                  {tier.nextStep}
                </p>
                <MagneticButton
                  asChild
                  size="lg"
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="group w-full justify-center"
                >
                  <Link href={TIER_DESTINATION[tier.id]}>
                    <ArrowLabel>{tier.ctaLabel}</ArrowLabel>
                  </Link>
                </MagneticButton>
              </article>
            ))}
          </div>
          <div
            ref={commercialNotesRef}
            className="grid gap-4 md:grid-cols-2 mb-16"
          >
            {commercialNotes.map((note) => (
              <div
                key={note.key}
                className="commercial-note rounded-sm border border-foreground/8 bg-foreground/2 p-5 md:p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/40 mb-3">
                  {note.label}
                </p>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {note.value}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px w-full bg-foreground/8" />
          <section className="pt-16">
            <p
              ref={roiEyebrowRef}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block"
            >
              {t("roi.eyebrow")}
            </p>
            <h2
              ref={roiTitleRef}
              className="font-sans font-normal text-primary leading-[1.05] mb-8"
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("roi.title")}
            </h2>
            <div
              ref={roiBodyRef}
              className="grid md:grid-cols-2 gap-8 mb-10 max-w-3xl"
            >
              <p className="roi-p text-base text-primary/60 leading-relaxed">
                {t("roi.calculation")}
              </p>
              <p className="roi-p text-base text-primary/60 leading-relaxed">
                {t("roi.question")}
              </p>
            </div>
            <div
              ref={roiStatsRef}
              className="mt-12 p-6 rounded-sm bg-foreground/3 border border-foreground/8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {roiStats.map((stat, i) => (
                  <div
                    key={stat.key}
                    className={
                      i > 0 ? "md:border-l border-foreground/8 md:pl-6" : ""
                    }
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary/40 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-light text-primary mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-primary/40">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <FaqSection namespace="pricing" className="pt-24 pb-0 border-t-0" />
        </div>
      </Container>
    </section>
  );
}
