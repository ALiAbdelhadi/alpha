/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Container } from "@/components/container";
import { ArrowIcon } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionWatermark } from "@/components/section-watermark";
import { CtaSection } from "@/components/sections/cta-section";
import { Link } from "@/i18n/navigation";
import {
  HOMEPAGE_OFFERS,
  getCommercialCta,
} from "@/lib/commercial";
import { monoCaps } from "@/lib/mono-caps";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { memo, useMemo } from "react";

export default memo(function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations("servicesPage");
  const tc = useTranslations("commercial.offers");
  const tCTAs = useTranslations("commercial.ctas");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0 });
  const titleRef = useText({ ...DEFAULTS.heading, ease: MOTION.ease.text });
  const descRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 });
  const statsRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.25 });

  const capabilityLinks = useMemo(() => [
    {
      href: "/services/interface-design",
      title: t("capabilities.interfaceDesign"),
    },
    {
      href: "/services/development",
      title: t("capabilities.development"),
    },
    {
      href: "/services/consulting",
      title: t("capabilities.consulting"),
    },
    {
      href: "/services/maintenance",
      title: t("capabilities.maintenance"),
    },
  ], [t]);

  const comparisonCards = useMemo(() => {
    const items = t.raw("comparison.items") as Array<{
      description: string;
      title: string;
    }>;

    return items.map((item, index) => ({
      ...item,
      href: capabilityLinks[index]?.href ?? "/services",
      label: capabilityLinks[index]?.title ?? t("detailLabel"),
    }));
  }, [capabilityLinks, t]);

  const stats = useMemo(() => [
    {
      value: locale === "ar" ? "+١٢٠" : "120+",
      label: t("stats.productsShipped"),
    },
    {
      value: locale === "ar" ? "٨ سنوات" : "8 yr",
      label: t("stats.industryExperience"),
    },
    {
      value: locale === "ar" ? "٩٩.٩٪" : "99.9%",
      label: t("stats.uptimeAverage"),
    },
  ], [t, locale]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <section className="relative overflow-hidden pt-(--section-y-top) pb-16">
        <SectionWatermark>00</SectionWatermark>
        <Container>
          <div className="max-w-5xl relative z-10">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
              <p
                ref={eyebrowRef}
                className={cn(monoCaps, "text-muted-foreground")}
              >
                {t("eyebrow")}
              </p>
            </div>
            <h1
              ref={titleRef}
              className="text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-normal text-foreground mb-6"
            >
              {t("title")}
            </h1>
            <p
              ref={descRef}
              className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] max-w-2xl text-muted-foreground"
            >
              {t("description")}
            </p>
            <div
              ref={statsRef}
              className="mt-10 flex flex-wrap gap-x-12 gap-y-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <p className="text-[clamp(24px,3vw,32px)] tracking-[-0.03em] tabular-nums font-sans font-light text-foreground leading-none">
                    {s.value}
                  </p>
                  <p className={cn(monoCaps, "text-muted-foreground text-sm")}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-24 pt-8">
        <Container>
          <div className="mb-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div>
              <p className={cn(monoCaps, "mb-4 text-muted-foreground")}>
                {t("comparison.eyebrow")}
              </p>
              <h2 className="text-[clamp(2.125rem,4vw,3.25rem)] tracking-[-0.02em] font-normal text-foreground leading-[1.08]">
                {t("comparison.title")}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {comparisonCards.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:bg-background/80"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={cn(monoCaps, "text-muted-foreground/70")}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 text-[clamp(1.2rem,1.6vw,1.45rem)] leading-[1.2] tracking-[-0.015em] font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                        {item.description}
                      </p>
                      <p className={cn(monoCaps, "mt-5 text-foreground")}>
                        {item.label}
                      </p>
                    </div>
                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                      <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1] rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-border mb-12" />
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                {t("comprehensiveSolutions.title")}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                {t("comprehensiveSolutions.description")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {capabilityLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full border border-border px-5 py-2",
                    monoCaps,
                    "text-muted-foreground transition-all duration-300",
                    "hover:border-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {HOMEPAGE_OFFERS.map((offer, index) => {
              const cta = getCommercialCta(locale, offer.ctaKey);
              const featured = index === 0 || index === HOMEPAGE_OFFERS.length - 1;

              return (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  index={index}
                  cta={{ ...cta, label: tCTAs(offer.ctaKey) }}
                  featured={featured}
                  t={t}
                  tc={tc}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <CtaSection />
    </div>
  );
});

interface OfferCardProps {
  offer: (typeof HOMEPAGE_OFFERS)[number];
  index: number;
  cta: { href: string; label: string };
  featured: boolean;
  t: any;
  tc: any;
}

const OfferCard = memo(function OfferCard({
  offer,
  index,
  cta,
  featured,
  t,
  tc,
}: OfferCardProps) {
  return (
    <Link
      href={offer.detailHref}
      data-double={featured ? "true" : undefined}
      className={cn(
        "group relative box-border flex flex-col justify-between overflow-hidden rounded-xl border border-s-border bg-s-surface/50 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:border-s-border-hover hover:bg-s-high-soft hover:shadow-xl",
        "max-md:col-span-1 p-6 md:p-8",
        featured ? "md:col-span-2 min-h-[300px]" : "min-h-[280px]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-e-6 top-1/2 -translate-y-1/2 select-none font-sans font-black leading-none text-transparent transition-all duration-700",
          "text-[clamp(100px,15vw,200px)] opacity-40",
          "[-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:var(--s-border)]",
          "group-hover:scale-110 group-hover:[-webkit-text-stroke-color:var(--s-border-hover)]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between gap-4">
          <span className={cn(monoCaps, "text-s-muted text-sm")}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn(monoCaps, "text-s-muted text-xs transition-colors duration-200 group-hover:text-s-low")}>
            {t("detailLabel")}
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-[clamp(1.5rem,2vw,1.75rem)] font-medium leading-[1.2] tracking-tight text-s-mid transition-colors duration-300 group-hover:text-s-high">
            {tc(`${offer.id}.title`)}
          </h2>
          <p className={cn(
            "text-base leading-relaxed text-s-low transition-colors duration-300",
            featured && "max-w-2xl"
          )}>
            {tc(`${offer.id}.audience`)}
          </p>
          {"tags" in offer && Array.isArray(offer.tags) && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {(offer.tags as string[]).map((tag: string) => (
                <span
                  key={tag}
                  className={cn(
                    monoCaps,
                    "rounded-md border border-(--s-border) bg-background/50 px-3 py-1 text-xs text-s-muted transition-colors duration-200 group-hover:border-s-border-hover group-hover:text-s-mid",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex-1 max-w-lg border-t border-(--s-border) pt-4">
            <p className={cn(monoCaps, "mb-1.5 text-xs text-s-muted")}>
              {t("expectedOutcome")}
            </p>
            <p className="text-sm leading-relaxed text-s-mid">
              {tc(`${offer.id}.outcome`)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {featured && (
              <MagneticButton
                asChild
                variant="primary"
                className="shrink-0"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </MagneticButton>
            )}
            <div className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full bg-s-surface border border-(--s-border)",
              "transition-all duration-500 ease-out",
              "group-hover:bg-foreground group-hover:border-foreground group-hover:text-background",
            )}>
              <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:scale-x-[-1] rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
