"use client";

import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { useLoading } from "@/components/providers/loading-provider";
import { useGSAPSection } from "@/hooks/use-gsap-section";
import {
  FLAGSHIP_METRICS,
  getCommercialCta,
  resolveCommercialLocale,
} from "@/lib/commercial";
import { gsap } from "@/lib/gsap";
import { DEFAULTS, MOTION, useReveal } from "@/lib/motion";
import { isRTLText } from "@/lib/motion/utils/splite";
import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, memo, useEffect, useMemo, useRef } from "react";

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
  const commercialLocale = resolveCommercialLocale(locale);
  const { isInitialLoadComplete } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const srTextRef = useRef<HTMLSpanElement>(null);
  const proofRef = useReveal({ ...DEFAULTS.body, delay: 1.1 });

  const title1 = t("hero.title");
  const title2 = t("hero.title2");

  const split1 = useMemo(() => splitTextTokens(title1), [title1]);
  const split2 = useMemo(() => splitTextTokens(title2), [title2]);

  const headlineIsRTL = split1.isRTL || split2.isRTL;

  useGSAPSection(
    { trigger: sectionRef },
    (ctx) => {
      if (!isInitialLoadComplete || !sectionRef.current) return;
      const { reduced } = ctx.conditions as { reduced: boolean };

      setTimeout(() => {
        const tokens =
          headlineRef.current?.querySelectorAll<HTMLElement>("[data-token]") ??
          [];
        const content = [
          badgeRef.current,
          subRef.current,
          ctaRef.current,
          statsRef.current,
          scrollRef.current,
        ].filter(Boolean);

        if (reduced) {
          gsap.set([...tokens, ...content], {
            opacity: 1,
            y: 0,
            filter: "none",
          });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: MOTION.ease.text } });

        if (badgeRef.current) {
          tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.1,
          );
        }

        if (tokens.length > 0) {
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
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.smooth,
            },
            0.55,
          );
        if (ctaRef.current)
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.7,
          );
        if (statsRef.current)
          tl.fromTo(
            statsRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.8,
          );
        if (scrollRef.current)
          tl.fromTo(
            scrollRef.current,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.95,
          );
      }, 50);
    },
    [isInitialLoadComplete, title1, title2, headlineIsRTL],
  );

  useEffect(() => {
    if (!isInitialLoadComplete || !headlineRef.current || !sectionRef.current)
      return;

    const timeoutId = setTimeout(() => {
      const tokens =
        headlineRef.current?.querySelectorAll<HTMLElement>("[data-token]");
      if (!tokens || !tokens.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollProps: gsap.TweenVars = headlineIsRTL
          ? {
            opacity: 0.12,
            stagger: { each: 0.006, from: "end" },
            ease: "none",
          }
          : {
            yPercent: -30,
            opacity: 0.12,
            stagger: { each: 0.008, from: "end" },
            ease: "none",
          };

        const st = gsap.to(tokens, {
          ...scrollProps,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        return () => {
          st.scrollTrigger?.kill();
          st.kill();
        };
      });
      return () => mm.revert();
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [isInitialLoadComplete, headlineIsRTL, title1, title2]);

  const primaryCta = getCommercialCta(locale, "projectRange");
  const secondaryCta = getCommercialCta(locale, "realBuild");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-watermark relative z-10 flex lg:min-h-screen w-full flex-col justify-end section-padding overflow-hidden"
      aria-label="Hero section"
    >
      <span ref={srTextRef} className="sr-only">
        {title1} {title2}
      </span>
      <div
        ref={badgeRef}
        className="absolute top-20 ltr:right-8 rtl:left-8 hidden md:flex flex-col ltr:items-end rtl:items-start gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.25em]">
            {t("hero.availability")}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.25em]">
          {t("hero.badge")}
        </span>
      </div>
      <Container>
        <div className="max-w-5xl">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-[0.25em]">
              {t("hero.availability")}
            </span>
          </div>
          <h1
            ref={headlineRef}
            aria-hidden
            className="display-h1 mb-8 font-sans font-light text-primary select-none"
          >
            <span className="block">{split1.nodes}</span>
            <span className="block text-primary/40 font-display-serif">
              {split2.nodes}
            </span>
          </h1>
          <div
            ref={subRef}
            className="mb-12 grid gap-6 md:grid-cols-[96px_1fr] md:gap-8 items-start"
          >
            <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
            <div className="space-y-3 max-w-xl">
              <p className="body-copy text-muted-foreground">
                {t("hero.problem")}
              </p>
              <p className="body-secondary text-muted-foreground/72">
                {t("hero.description")}
              </p>
            </div>
          </div>
          <div
            ref={ctaRef}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton
              size="lg"
              variant="primary"
              className="group"
            >
              {primaryCta.label}
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" className="group">
              {secondaryCta.label}
            </MagneticButton>
          </div>
          <div
            ref={statsRef}
            className="mt-16 grid gap-6 border-t border-foreground/8 pt-10 sm:grid-cols-3 sm:gap-0"
          >
            {FLAGSHIP_METRICS.map((s, i, arr) => (
              <div
                key={s.value.en}
                className="sm:not-last:border-r sm:not-last:border-foreground/10"
                style={{
                  paddingLeft: i > 0 ? "clamp(16px, 3vw, 36px)" : 0,
                  paddingRight:
                    i < arr.length - 1 ? "clamp(16px, 3vw, 36px)" : 0,
                }}
              >
                <span
                  className="display-h3 font-light text-foreground block"
                >
                  {s.value[commercialLocale]}
                </span>
                <span className="meta-eyebrow mt-2 block text-foreground/48">
                  {s.label[commercialLocale]}
                </span>
              </div>
            ))}
          </div>
          <p
            ref={proofRef}
            className="meta-eyebrow mt-6 max-w-2xl text-primary/45"
          >
            {t("hero.productionCallout")}
          </p>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2 mt-6"
        aria-hidden
      >
        <p className="font-mono text-xs uppercase text-muted-foreground/60 tracking-[0.25em]">
          {t("hero.scrollHint")}
        </p>
        <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
          <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-slide-down" />
        </div>
      </div>
    </section>
  );
});
