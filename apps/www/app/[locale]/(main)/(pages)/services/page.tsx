"use client";

import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { CtaSection } from "@/components/sections/cta-section";
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

const capabilityLinks = [
  {
    href: "/services/interface-design",
    title: { en: "Interface Design", ar: "تصميم الواجهات" },
  },
  {
    href: "/services/development",
    title: { en: "Development", ar: "التطوير" },
  },
  {
    href: "/services/consulting",
    title: { en: "Consulting", ar: "الاستشارات" },
  },
  {
    href: "/services/maintenance",
    title: { en: "Maintenance", ar: "الصيانة" },
  },
];

export default memo(function ServicesPage() {
  const locale = useLocale();

  const eyebrowRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0 });
  const titleRef = useText({ ...DEFAULTS.heading, ease: MOTION.ease.text });
  const descRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <section className="section-padding pb-16">
        <Container>
          <div className="max-w-5xl">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground/60 mb-6">
              {pickCommercialText(locale, SERVICES_PAGE_CONTENT.eyebrow)}
            </p>
            <h1 ref={titleRef} className="display-h1 max-w-5xl font-normal text-primary">
              {pickCommercialText(locale, SERVICES_PAGE_CONTENT.title)}
            </h1>
            <p
              ref={descRef}
              className="body-copy mt-6 max-w-3xl text-muted-foreground"
            >
              {pickCommercialText(locale, SERVICES_PAGE_CONTENT.body)}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {HOMEPAGE_OFFERS.map((offer, index) => {
              const cta = getCommercialCta(locale, offer.ctaKey);
              return (
                <article
                  key={offer.id}
                  className="rounded-[30px] border border-border bg-foreground/[0.02] p-6 md:p-8"
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <p className="meta-eyebrow text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <Link
                      href={offer.detailHref}
                      className="meta-eyebrow text-primary/55 transition-colors hover:text-primary"
                    >
                      {pickCommercialText(locale, SERVICES_PAGE_CONTENT.detailLabel)}
                    </Link>
                  </div>

                  <h2 className="display-h3 font-medium text-primary">
                    {pickCommercialText(locale, offer.title)}
                  </h2>
                  <p className="body-secondary mt-4 text-muted-foreground">
                    {pickCommercialText(locale, offer.audience)}
                  </p>

                  <div className="mt-5 rounded-[24px] border border-border bg-background/70 p-4">
                    <p className="meta-eyebrow text-muted-foreground/55">
                      {locale === "ar" ? "النتيجة" : "Outcome"}
                    </p>
                    <p className="body-secondary mt-2 text-primary/78">
                      {pickCommercialText(locale, offer.outcome)}
                    </p>
                  </div>

                  <MagneticButton
                    asChild
                    variant="primary"
                    size="lg"
                    className="group mt-8 w-full justify-center sm:w-auto"
                  >
                    <Link href={cta.href}>{cta.label}</Link>
                  </MagneticButton>
                </article>
              );
            })}
          </div>

          <div className="mt-12 rounded-[28px] border border-border bg-background p-6">
            <p className="meta-eyebrow text-muted-foreground/55">
              {locale === "ar" ? "صفحات القدرات" : "Capability detail pages"}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {capabilityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-border px-4 py-2 text-sm text-primary/72 transition-colors hover:bg-foreground/[0.03] hover:text-primary"
                >
                  {pickCommercialText(locale, item.title)}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </div>
  );
});
