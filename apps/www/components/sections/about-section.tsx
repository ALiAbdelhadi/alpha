"use client";

import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { Container } from "../container";
import { MagneticButton } from "../magnetic-button";

export const AboutSection = memo(function AboutSection({
  scrollToSection,
}: {
  scrollToSection?: (sectionId: string) => void;
}) {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText(DEFAULTS.heading);
  const descRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.15,
    distance: MOTION.distance.sm,
  });
  const buttonsRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.element,
    ease: MOTION.ease.smooth,
    delay: 0.3,
  });
  const founderCardRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.body,
    ease: MOTION.ease.smooth,
    delay: 0.2,
  });
  const founderLinkRef = useReveal<HTMLDivElement>({
    ...DEFAULTS.element,
    ease: MOTION.ease.smooth,
    delay: 0.3,
  });

  const statsEnabled =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_STATS_ENABLED === "true";

  const items = statsEnabled
    ? [
      {
        value: t("about.stat1.value"),
        label: t("about.stat1.label"),
        sub: t("about.stat1.sublabel"),
      },
      {
        value: t("about.stat2.value"),
        label: t("about.stat2.label"),
        sub: t("about.stat2.sublabel"),
      },
      {
        value: t("about.stat3.value"),
        label: t("about.stat3.label"),
        sub: t("about.stat3.sublabel"),
      },
    ]
    : [
      {
        value: null,
        label: t("about.values.bilingual.label"),
        sub: t("about.values.bilingual.sublabel"),
      },
      {
        value: null,
        label: t("about.values.noTemplate.label"),
        sub: t("about.values.noTemplate.sublabel"),
      },
      {
        value: null,
        label: t("about.values.outcome.label"),
        sub: t("about.values.outcome.sublabel"),
      },
    ];

  const founderLinkedInUrl = t("about.founder.linkedInUrl");
  const founderIsPlaceholderLink = founderLinkedInUrl === "#";

  return (
    <section
      suppressHydrationWarning
      id="about"
      ref={sectionRef}
      className="flex w-full items-center pt-(--section-y-top) pb-(--section-y-bottom)"
    >
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-3">
              <p ref={eyebrowRef} className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground block">
                {t("about.eyebrow")}
              </p>
              <h2 ref={titleRef} className="text-[clamp(2.125rem,4vw,3.25rem)] tracking-[-0.02em] font-normal text-foreground leading-[1.05]">
                {t("about.title")}
                <br />
                {t("about.title2")}
                <br />
                <span className="block font-serif italic font-light text-foreground/45 rtl:font-sans rtl:not-italic rtl:font-bold">
                  {t("about.title3")}
                </span>
              </h2>
              <div ref={descRef} className="space-y-4">
                <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground max-w-[44ch]">
                  {t("about.description1")}
                </p>
                <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground max-w-[44ch]">
                  {t("about.description2")}
                </p>
              </div>
            </div>
            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection?.("contact")}
              >
                {t("about.ctaPrimary")}
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection?.("work")}
              >
                {t("about.ctaSecondary")}
              </MagneticButton>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="h-px w-full bg-border mb-0" />
            {items.map((item, i) => (
              <div
                key={i}
                data-stat-value
                className="group border-b border-border py-8"
              >
                <div
                  className={
                    statsEnabled
                      ? "grid grid-cols-[minmax(88px,120px)_1fr] gap-4 md:gap-6"
                      : "grid grid-cols-[24px_1fr] gap-4 md:gap-6"
                  }
                >
                  {statsEnabled ? (
                    <div
                      className="font-sans text-[clamp(28px,4vw,40px)] font-light leading-none tracking-[-0.03em] text-foreground tabular-nums pt-0.5"
                    >
                      {item.value}
                    </div>
                  ) : (
                    <div className="pt-3">
                      <div className="h-px w-5 bg-border group-hover:w-8 group-hover:bg-border-mid transition-all duration-400" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="font-sans font-medium text-foreground text-base">
                      {item.label}
                    </p>
                    <p className="font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div
              ref={founderCardRef}
              className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-7"
            >
              <p className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground block">
                {t("about.founder.eyebrow")}
              </p>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-medium text-foreground">
                    {t("about.founder.name")}
                  </h3>
                  <p className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground mt-2">
                    {t("about.founder.role")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
                    {t("about.founder.philosophy1")}
                  </p>
                  <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
                    {t("about.founder.philosophy2")}
                  </p>
                </div>
                <div ref={founderLinkRef}>
                  <a
                    href={founderLinkedInUrl}
                    target={founderIsPlaceholderLink ? undefined : "_blank"}
                    rel={founderIsPlaceholderLink ? undefined : "noreferrer"}
                    className="group inline-flex items-center gap-2 font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {t("about.founder.linkedInLabel")}
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});