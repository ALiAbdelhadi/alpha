"use client";

import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { useLoading } from "@/components/providers/loading-provider";
import { useGSAPSection } from "@/hooks/use-gsap-section";
import { Link } from "@/i18n/navigation";
import { getCommercialCta } from "@/lib/commercial";
import { gsap } from "@/lib/gsap";
import { DEFAULTS, MOTION, useReveal } from "@/lib/motion";
import { isRTLText } from "@/lib/motion/utils/splite";
import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, memo, useEffect, useMemo, useRef } from "react";
import { ArrowLabel } from "../directional-link";
import { SectionWatermark } from "../section-watermark";

function splitTextTokens(text: string): { nodes: ReactNode; isRTL: boolean } {
  const rtl = isRTLText(text);
  const words = text.split(" ");

  if (rtl) {
    return {
      isRTL: true,
      nodes: words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block" }}>
          <span data-token style={{ display: "inline-block" }}>
            {word}
          </span>
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block", whiteSpace: "pre" }}>
              {" "}
            </span>
          )}
        </span>
      )),
    };
  }

  return {
    isRTL: false,
    nodes: words.map((word, wi) => (
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
        {wi < words.length - 1 && (
          <span style={{ display: "inline-block", whiteSpace: "pre" }}> </span>
        )}
      </span>
    )),
  };
}

export const HeroSection = memo(function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const { isInitialLoadComplete } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeDesktopRef = useRef<HTMLDivElement>(null);
  const badgeMobileRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const proofRef = useReveal<HTMLParagraphElement>({ ...DEFAULTS.body, delay: 1.1 });

  const title1 = t("hero.title");
  const title2 = t("hero.title2");

  const split1 = useMemo(() => splitTextTokens(title1), [title1]);
  const split2 = useMemo(() => splitTextTokens(title2), [title2]);

  const headlineIsRTL = split1.isRTL || split2.isRTL;

  useGSAPSection(
    { trigger: sectionRef },
    (ctx) => {
      if (!isInitialLoadComplete || !sectionRef.current || !headlineRef.current)
        return;

      const { reduced } = ctx.conditions as { reduced: boolean };

      const tokens = Array.from(
        headlineRef.current.querySelectorAll<HTMLElement>("[data-token]"),
      );

      const uiTargets = [
        badgeDesktopRef.current,
        badgeMobileRef.current,
        subRef.current,
        ctaRef.current,
        statsRef.current,
        scrollRef.current,
      ].filter(Boolean) as HTMLElement[];

      gsap.set([...tokens, ...uiTargets], { opacity: 0, y: 18 });

      if (reduced) {
        gsap.set([...tokens, ...uiTargets], { opacity: 1, y: 0, filter: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: MOTION.ease.text } });

      const badges = [badgeDesktopRef.current, badgeMobileRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      if (badges.length) {
        tl.fromTo(
          badges,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth },
          0.1,
        );
      }

      if (tokens.length) {
        tl.fromTo(
          tokens,
          { opacity: 0, y: headlineIsRTL ? 40 : 50, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: { each: 0.06, from: headlineIsRTL ? "end" : "start" },
            ease: "power4.out",
            onComplete() {
              gsap.set(tokens, { clearProps: "filter,willChange" });
            },
          },
          0.2,
        );
      }

      if (subRef.current)
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.base, ease: MOTION.ease.smooth },
          0.55,
        );

      if (ctaRef.current)
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth },
          0.7,
        );

      if (statsRef.current)
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth },
          0.8,
        );

      if (scrollRef.current)
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.duration.fast, ease: MOTION.ease.smooth },
          0.95,
        );

      return () => {
        tl.kill();
      };
    },
    [isInitialLoadComplete, headlineIsRTL],
  );

  useEffect(() => {
    if (!isInitialLoadComplete || !headlineRef.current || !sectionRef.current)
      return;

    const tokens = Array.from(
      headlineRef.current.querySelectorAll<HTMLElement>("[data-token]"),
    );
    if (!tokens.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollProps: gsap.TweenVars = headlineIsRTL
        ? { opacity: 0.12, stagger: { each: 0.006, from: "end" }, ease: "none" }
        : {
          yPercent: -30,
          opacity: 0.12,
          stagger: { each: 0.008, from: "end" },
          ease: "none",
        };

      const tween = gsap.to(tokens, {
        ...scrollProps,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [isInitialLoadComplete, headlineIsRTL]);

  const tCTAs = useTranslations("commercial.ctas");
  const primaryCta = getCommercialCta(locale, "projectRange");
  const metrics = t.raw("hero.metrics") as Array<{ value: string; label: string }>;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative z-10 flex lg:min-h-screen w-full flex-col justify-end overflow-hidden pt-(--section-y-top) pb-(--section-y-bottom)"
      aria-label="Hero section"
    >
      <SectionWatermark>{t("hero.watermark")}</SectionWatermark>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -10%, var(--brand-soft), transparent)",
        }}
      />
      <div
        ref={badgeDesktopRef}
        className="absolute top-20 inset-e-8 hidden md:flex flex-col items-end rtl:items-start gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground">
            {t("hero.availability")}
          </span>
        </div>
        <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground/60">
          {t("hero.badge")}
        </span>
      </div>

      <Container>
        <div className="max-w-5xl">
          <div ref={badgeMobileRef} className="mb-8 flex items-center gap-2 md:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground/50">
              {t("hero.availability")}
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-[clamp(3rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em] mb-8 font-sans font-light text-foreground select-none"
          >
            <span className="block">{split1.nodes}</span>
            <span className="block text-foreground/45 font-serif italic font-light rtl:font-sans rtl:not-italic rtl:font-bold">
              {split2.nodes}
            </span>
          </h1>

          <div
            ref={subRef}
            className="mb-12 grid gap-6 md:grid-cols-[96px_1fr] md:gap-8 items-start"
          >
            <div className="h-px w-full bg-border mt-3 hidden md:block" />
            <div className="space-y-3 max-w-xl">
              <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
                {t("hero.problem")}
              </p>
            </div>
          </div>
          <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton asChild size="lg" variant="primary" className="group">
              <Link href={primaryCta.href}>
                <ArrowLabel>{tCTAs("projectRange")}</ArrowLabel>
              </Link>
            </MagneticButton>
          </div>
          <div
            ref={statsRef}
            className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-3 sm:gap-0"
          >
            {metrics.map((s, i, arr) => (
              <div
                key={s.value}
                className="sm:border-e sm:border-border sm:last:border-e-0"
                style={{
                  paddingInlineStart: i > 0 ? "clamp(16px, 3vw, 36px)" : 0,
                  paddingInlineEnd:
                    i < arr.length - 1 ? "clamp(16px, 3vw, 36px)" : 0,
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
            ref={proofRef}
            className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal mt-6 max-w-2xl text-muted-foreground"
          >
            {t("hero.productionCallout")}
          </p>
        </div>
      </Container>
      <div
        ref={scrollRef}
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
});