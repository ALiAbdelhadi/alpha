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
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion";
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

  const rowsContainerRef = useBatch();

  const offerHeadingRef = useReveal({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0 });

  const capabilityLinks = useMemo(() => [
    { href: "/services/interface-design", title: t("capabilities.interfaceDesign") },
    { href: "/services/development", title: t("capabilities.development") },
    { href: "/services/consulting", title: t("capabilities.consulting") },
    { href: "/services/maintenance", title: t("capabilities.maintenance") },
  ], [t]);

  const serviceRows = useMemo(() => {
    const items = t.raw("comparison.items") as Array<{
      description: string;
      title: string;
    }>;
    return items.map((item, i) => ({
      title: item.title,
      description: item.description,
      href: capabilityLinks[i]?.href ?? "/services",
    }));
  }, [capabilityLinks, t]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <section className="relative overflow-hidden pt-(--section-y-top) pb-20">
        <SectionWatermark>01</SectionWatermark>
        <Container>
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-2.5 mb-8">
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
              className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.035em] font-normal text-foreground mb-8"
            >
              {t("title")}
            </h1>
            <p
              ref={descRef}
              className="text-[clamp(1rem,1.1vw,1.125rem)] leading-[1.75] max-w-xl text-muted-foreground"
            >
              {t("description")}
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          <div
            ref={rowsContainerRef}
            className="border-t border-border"
          >
            {serviceRows.map((row, index) => (
              <ServiceRow
                key={row.href}
                index={index}
                href={row.href}
                title={row.title}
                description={row.description}
                detailLabel={t("detailLabel")}
              />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-24 border-t border-border">
        <Container>
          <div className="mb-12 max-w-2xl">
            <p className={cn(monoCaps, "text-muted-foreground mb-4")}>
              {t("comprehensiveSolutions.eyebrow") ?? t("comparison.eyebrow")}
            </p>
            <h2
              ref={offerHeadingRef}
              className="text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.025em] font-normal text-foreground leading-[1.08]"
            >
              {t("comprehensiveSolutions.title")}
            </h2>
            <p className="mt-4 text-[clamp(0.9375rem,1vw,1rem)] leading-[1.75] text-muted-foreground">
              {t("comprehensiveSolutions.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {HOMEPAGE_OFFERS.map((offer, index) => {
              const cta = getCommercialCta(locale, offer.ctaKey);
              return (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  index={index}
                  cta={{ ...cta, label: tCTAs(offer.ctaKey) }}
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

interface ServiceRowProps {
  index: number;
  href: string;
  title: string;
  description: string;
  detailLabel: string;
}

const ServiceRow = memo(function ServiceRow({
  index,
  href,
  title,
  description,
  detailLabel,
}: ServiceRowProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-5 md:gap-10",
        "border-b border-border",
        "py-7 md:py-9",
        "transition-[padding,background-color] duration-300 ease-out",
        "hover:bg-surface",
        "ps-0 hover:ps-4",
      )}
    >
      <span
        className={cn(
          monoCaps,
          "tabular-nums shrink-0 w-8 text-muted-foreground/40",
          "transition-colors duration-300",
          "group-hover:text-brand",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <h2
          className={cn(
            "text-[clamp(1.3rem,2vw,1.75rem)] font-medium tracking-[-0.02em]",
            "text-foreground leading-[1.2] mb-1",
            "transition-colors duration-300",
          )}
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 md:line-clamp-none max-w-lg">
          {description}
        </p>
      </div>
      <span
        className={cn(
          monoCaps,
          "hidden md:block shrink-0 text-muted-foreground/40",
          "transition-colors duration-200",
          "group-hover:text-muted-foreground",
        )}
      >
        {detailLabel}
      </span>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          "border border-border bg-background/60",
          "transition-all duration-300 ease-out",
          "group-hover:border-foreground group-hover:bg-foreground group-hover:text-background",
        )}
      >
        <ArrowIcon
          className={cn(
            "transition-transform duration-200",
            "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            "rtl:scale-x-[-1] rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5",
          )}
        />
      </div>
    </Link>
  );
});

interface OfferCardProps {
  offer: (typeof HOMEPAGE_OFFERS)[number];
  index: number;
  cta: { href: string; label: string };
  t: ReturnType<typeof useTranslations<"servicesPage">>;
  tc: ReturnType<typeof useTranslations<"commercial.offers">>;
}

const OfferCard = memo(function OfferCard({
  offer,
  index,
  cta,
  t,
  tc,
}: OfferCardProps) {
  return (
    <Link
      href={offer.detailHref}
      className={cn(
        "group relative box-border flex flex-col justify-between",
        "overflow-hidden rounded-xl",
        "border border-s-border bg-s-surface/50 backdrop-blur-sm",
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:border-s-border-hover hover:bg-s-high-soft hover:shadow-xl",
        "p-6 md:p-8 min-h-[280px]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-e-4 top-1/2 -translate-y-1/2 select-none",
          "font-sans font-black leading-none text-transparent opacity-30",
          "text-[clamp(80px,12vw,160px)]",
          "[-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:var(--s-border)]",
          "transition-all duration-700",
          "group-hover:scale-105 group-hover:[-webkit-text-stroke-color:var(--s-border-hover)]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex flex-col gap-5 h-full">
        <div className="flex items-center justify-between gap-4">
          <span className={cn(monoCaps, "text-s-muted text-xs")}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              monoCaps,
              "text-s-muted text-xs",
              "transition-colors duration-200 group-hover:text-s-low",
            )}
          >
            {t("detailLabel")}
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h3
            className={cn(
              "text-[clamp(1.35rem,1.8vw,1.6rem)] font-medium leading-[1.2] tracking-tight",
              "text-s-mid transition-colors duration-300 group-hover:text-s-high",
            )}
          >
            {tc(`${offer.id}.title`)}
          </h3>
          <p className="text-sm leading-relaxed text-s-low transition-colors duration-300">
            {tc(`${offer.id}.audience`)}
          </p>
          {"tags" in offer && Array.isArray(offer.tags) && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {(offer.tags as string[]).map((tag: string) => (
                <span
                  key={tag}
                  className={cn(
                    monoCaps,
                    "rounded-md border border-(--s-border) bg-background/50",
                    "px-3 py-1 text-xs text-s-muted",
                    "transition-colors duration-200",
                    "group-hover:border-s-border-hover group-hover:text-s-mid",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-(--s-border) pt-4 space-y-4">
          <div>
            <p className={cn(monoCaps, "mb-1.5 text-xs text-s-muted")}>
              {t("expectedOutcome")}
            </p>
            <p className="text-sm leading-relaxed text-s-mid">
              {tc(`${offer.id}.outcome`)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <MagneticButton asChild variant="ghost" className="shrink-0 -ms-1">
              <Link href={cta.href}>{cta.label}</Link>
            </MagneticButton>

            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                "bg-s-surface border border-(--s-border)",
                "transition-all duration-500 ease-out",
                "group-hover:bg-foreground group-hover:border-foreground group-hover:text-background",
              )}
            >
              <ArrowIcon
                className={cn(
                  "transition-transform duration-200",
                  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                  "rtl:scale-x-[-1] rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5",
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});