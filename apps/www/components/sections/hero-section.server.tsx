import { Container } from "@/components/container";
import { SectionWatermark } from "@/components/section-watermark";
import { Link } from "@/i18n/navigation";
import { getCommercialCta } from "@/lib/commercial";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ArrowIcon } from "../directional-link";
import { HeroMotionClient } from "./hero-motion.client";

function splitTextTokens(text: string): ReactNode {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <span
      key={wi}
      style={{
        display: "inline-block",
        overflow: "hidden",
        paddingBottom: "0.12em",
        marginBottom: "-0.12em",
        verticalAlign: "bottom",
      }}
    >
      <span data-token style={{ display: "inline-block" }}>
        {word}
      </span>
      {wi < words.length - 1 ? (
        <span style={{ display: "inline-block", whiteSpace: "pre" }}> </span>
      ) : null}
    </span>
  ));
}

export async function HeroSectionServer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const tCTAs = await getTranslations({ locale, namespace: "commercial.ctas" });

  const title1 = t("hero.title");
  const title2 = t("hero.title2");
  const watermark = t("hero.watermark");
  const metrics = t.raw("hero.metrics") as Array<{ value: string; label: string }>;

  const primaryCta = getCommercialCta(locale, "projectRange");

  return (
    <section
      id="home"
      className="relative z-10 flex lg:min-h-screen w-full flex-col justify-end overflow-hidden pt-(--section-y-top) pb-(--section-y-bottom)"
      aria-label="Hero section"
      data-hero-root
      {...(locale.startsWith("ar") ? { "data-hero-rtl": "" } : {})}
    >
      <HeroMotionClient />
      <SectionWatermark>{watermark}</SectionWatermark>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -10%, var(--brand-soft), transparent)",
        }}
      />

      <h1 className="sr-only">
        {title1} {title2}
      </h1>
      <Container>
        <div className="lg:max-w-5xl max-w-2xl">
          <div data-hero-badge className="mb-8 flex items-center gap-2 md:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground/70">
              {t("hero.availability")}
            </span>
          </div>
          <div
            data-hero-badge
            className="absolute top-20 inset-e-8 hidden md:flex flex-col items-end rtl:items-start gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground">
                {t("hero.availability")}
              </span>
            </div>
            <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground/70">
              {t("hero.badge")}
            </span>
          </div>
          <div
            aria-hidden
            data-hero-headline
            className="text-[clamp(3rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] mb-8 font-sans font-light text-foreground select-none"
          >
            <span className="block">{splitTextTokens(title1)}</span>
            <span className="block text-foreground/45 font-serif italic font-light rtl:font-sans rtl:not-italic rtl:font-bold">
              {splitTextTokens(title2)}
            </span>
          </div>

          <div
            data-hero-sub
            className="mb-12 grid gap-6 md:grid-cols-[96px_1fr] md:gap-8 items-start"
          >
            <div className="h-px w-full bg-border mt-3 hidden md:block" />
            <div className="space-y-3 max-w-xl">
              <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
                {t("hero.problem")}
              </p>
            </div>
          </div>

          <div data-hero-cta className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              data-magnetic
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground/95 text-background hover:bg-foreground px-8 py-3.5 text-base font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/50 min-h-11 min-w-11"
            >
              <span className="inline-flex items-center gap-2">
                <span>{tCTAs("projectRange")}</span>
                <ArrowIcon />
              </span>
            </Link>
          </div>
          <div
            data-hero-stats
            className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-3 sm:gap-0"
          >
            {metrics.map((s, i, arr) => (
              <div
                key={s.value}
                className="sm:border-e sm:border-border sm:last:border-e-0"
                style={{
                  paddingInlineStart: i > 0 ? "clamp(16px, 3vw, 36px)" : 0,
                  paddingInlineEnd: i < arr.length - 1 ? "clamp(16px, 3vw, 36px)" : 0,
                }}
              >
                <span className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-light tabular-nums text-foreground block">
                  {s.value}
                </span>
                <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal mt-2 block text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <p
            data-hero-proof
            className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal mt-6 max-w-2xl text-muted-foreground"
          >
            {t("hero.productionCallout")}
          </p>
        </div>
      </Container>
      <div
        data-hero-scroll
        className="pointer-events-none absolute bottom-7 inset-s-1/2 -translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2 mt-6"
        aria-hidden
      >
        <p className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground">
          {t("hero.scrollHint")}
        </p>
        <div className="relative h-10 w-px overflow-hidden bg-border">
          <div className="absolute top-0 h-1/2 w-full bg-border-mid animate-slide-down" />
        </div>
      </div>
    </section>
  );
}