"use client";

import { Container } from "@/components/container";
import { ArrowLabel, DirectionalLink } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import {
  HOMEPAGE_OFFERS,
  SERVICES_PAGE_CONTENT,
  getCommercialCta,
  pickCommercialText,
} from "@/lib/commercial";
import { Link } from "@/i18n/navigation";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { memo } from "react";

export const ServicesSection = memo(function ServicesSection() {
  const locale = useLocale();

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });

  return (
    <section
      id="services"
      data-scene="inverted"
      className="relative overflow-hidden section-padding bg-[#0A0C14] text-white dark:bg-[#F7F8FA] dark:text-[#0A0C14]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(74,110,212,0.18), transparent 28%), radial-gradient(circle at bottom left, rgba(74,110,212,0.08), transparent 24%)",
        }}
      />
      <Container className="relative">
        <div className="mb-12 max-w-4xl space-y-4 md:mb-16">
          <p ref={eyebrowRef} className="meta-eyebrow text-[color:var(--s-muted)]">
            {pickCommercialText(locale, SERVICES_PAGE_CONTENT.eyebrow)}
          </p>
          <h2
            ref={titleRef}
            className="display-h2 max-w-4xl font-normal text-[color:var(--s-high)]"
          >
            {pickCommercialText(locale, SERVICES_PAGE_CONTENT.title)}
          </h2>
          <p
            ref={bodyRef}
            className="body-copy max-w-2xl text-[color:var(--s-mid)]"
          >
            {pickCommercialText(locale, SERVICES_PAGE_CONTENT.body)}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {HOMEPAGE_OFFERS.map((offer, index) => {
            const cta = getCommercialCta(locale, offer.ctaKey);
            return (
              <article
                key={offer.id}
                className="rounded-[28px] border border-[color:var(--s-border)] bg-[color:var(--s-high-soft)] p-6 md:p-8"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="meta-eyebrow text-[color:var(--s-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-[color:var(--s-border)] px-3 py-1 text-[11px] text-[color:var(--s-muted)]">
                    {pickCommercialText(locale, SERVICES_PAGE_CONTENT.detailLabel)}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="display-h3 font-medium text-[color:var(--s-high)]">
                    {pickCommercialText(locale, offer.title)}
                  </h3>
                  <p className="body-secondary text-[color:var(--s-mid)]">
                    {pickCommercialText(locale, offer.audience)}
                  </p>
                  <div className="rounded-[22px] border border-[color:var(--s-border)] bg-background/60 p-4">
                    <p className="meta-eyebrow text-[color:var(--s-muted)]">
                      {locale === "ar" ? "النتيجة" : "Outcome"}
                    </p>
                    <p className="body-secondary mt-2 text-[color:var(--s-high)]">
                      {pickCommercialText(locale, offer.outcome)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <MagneticButton
                    asChild
                    variant="primary"
                    size="lg"
                    className="group w-full sm:flex-1"
                  >
                    <Link href={cta.href}>
                      <ArrowLabel>{cta.label}</ArrowLabel>
                    </Link>
                  </MagneticButton>
                  <DirectionalLink
                    href={offer.detailHref}
                    className="meta-eyebrow text-[color:var(--s-mid)] transition-colors hover:text-[color:var(--s-high)]"
                  >
                    {locale === "ar" ? "شاهد تفاصيل الخدمة" : "See service details"}
                  </DirectionalLink>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
});
