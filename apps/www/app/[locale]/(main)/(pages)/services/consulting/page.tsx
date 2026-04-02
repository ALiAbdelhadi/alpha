"use client";

import { ConsultingBriefSection } from "@/components/consulting-brief-section";
import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { getCommercialCta } from "@/lib/commercial";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { localizeNumbers } from "@/lib/number";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export default function ConsultingPage() {
  return (
    <div className="relative min-h-screen w-full">
      <HeroSection />
      <div className="pb-48">
        <ConsultingBriefSection />
      </div>
      <AuditOfferSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  const t = useTranslations("serviceDetails.consulting");
  const locale = useLocale();
  const auditCta = getCommercialCta(locale, "technicalAudit");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText(DEFAULTS.heading);
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const ctaRef = useReveal({ ...DEFAULTS.element, delay: 0.25 });
  const scrollRef = useReveal({
    ...DEFAULTS.element,
    direction: "fade",
    delay: 0.45,
  });

  return (
    <section
      className="consulting-watermark relative flex w-full flex-col justify-end section-padding pb-24 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 ltr:left-1/4 rtl:right-1/4 h-full w-px bg-foreground/6" />
        <div className="absolute top-0 ltr:right-1/4 rtl:left-1/4 h-full w-px bg-foreground/6" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/5" />
      </div>
      <div
        ref={eyebrowRef}
        className="absolute top-24 ltr:right-8 rtl:left-8 hidden md:flex flex-col ltr:items-end rtl:items-start gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
            {t("subtitle")}
          </span>
        </div>
      </div>
      <Container>
        <div className="max-w-5xl">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-primary/50 uppercase tracking-[0.25em]">
              {t("subtitle")}
            </span>
          </div>
          <h1
            ref={titleRef}
            className="mb-10 font-sans font-normal text-primary leading-[1.03]"
            style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              letterSpacing: "-0.025em",
            }}
          >
            {t("title")}
            <br />
            <span
              className="text-display-italic"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
              }}
            >
              {t("titleItalic")}
            </span>
          </h1>
          <div
            ref={descRef}
            className="mb-12 grid md:grid-cols-[80px_1fr] gap-8 items-start"
          >
            <div className="h-px w-full bg-foreground/8 mt-3 hidden md:block" />
            <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">
              {t("description")}
            </p>
          </div>
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <MagneticButton size="lg" variant="primary" className="group">
              <Link href={auditCta.href}>
                <span className="flex items-center gap-2">
                  {auditCta.label}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary">
              <Link href="#audit-offer">{t("hero.ctaSecondary")}</Link>
            </MagneticButton>
          </div>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className="pointer-events-none absolute bottom-7 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="font-mono text-xs uppercase text-muted-foreground/70 tracking-[0.25em]">
          Scroll
        </p>
        <div className="relative h-10 w-px overflow-hidden bg-foreground/8">
          <div className="absolute top-0 h-1/2 w-full bg-foreground/40 animate-slide-down" />
        </div>
      </div>
    </section>
  );
}

function AuditOfferSection() {
  const locale = useLocale() as "en" | "ar";

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText(DEFAULTS.heading);
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const panelRef = useReveal({ ...DEFAULTS.element, delay: 0.25 });

  const content =
    locale === "ar"
      ? {
          eyebrow: "عرض دخول منخفض الاحتكاك",
          title: "التدقيق التقني — نطاق محدد، سعر ثابت",
          description:
            "نقطة بداية واضحة قبل أي إعادة بناء أو توسعة. نراجع البنية الحالية، نحدد المخاطر، ونرتب الخطوات التالية في خارطة طريق تنفيذية مباشرة.",
          priceLabel: "السعر الثابت",
          durationLabel: "المدة",
          includedLabel: "يشمل",
          price: `${localizeNumbers("15,000", locale)} EGP`,
          duration: `${localizeNumbers("5", locale)} أيام عمل`,
          cta: "ابدأ بالتدقيق التقني",
          included: [
            "مراجعة البنية والـ stack الحالي",
            "تحديد اختناقات الأداء",
            "تقييم سطح الأمان",
            "خارطة طريق تصحيحية قابلة للتنفيذ",
            "مكالمة إحاطة لمدة ساعة",
          ],
        }
      : {
          eyebrow: "Low-friction entry offer",
          title: "Technical Audit — Fixed Scope, Fixed Price",
          description:
            "A clear first engagement before any rebuild or scale-up. We review the current system, isolate the technical risk, and turn the findings into an execution-ready roadmap.",
          priceLabel: "Fixed price",
          durationLabel: "Duration",
          includedLabel: "What’s included",
          price: `${localizeNumbers("15,000", locale)} EGP`,
          duration: "5 business days",
          cta: "Start with the audit",
          included: [
            "Current stack & architecture review",
            "Performance bottleneck identification",
            "Security surface assessment",
            "Actionable remediation roadmap",
            "1-hour debrief call",
          ],
        };

  return (
    <section id="audit-offer" className="section-padding border-t border-foreground/8 pt-0">
      <Container>
        <div
          ref={panelRef}
          data-scene="inverted"
          className="overflow-hidden rounded-sm border border-white/10 bg-[#0A0C14]"
        >
          <div className="h-px w-full bg-[rgba(74,110,212,0.6)]" />
          <div className="grid gap-10 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,360px)] md:p-10">
            <div>
              <p
                ref={eyebrowRef}
                className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--s-muted)] mb-4 block"
              >
                {content.eyebrow}
              </p>
              <h2
                ref={titleRef}
                className="font-sans font-normal leading-[1.05] text-[color:var(--s-high)]"
                style={{
                  fontSize: "clamp(28px, 4.5vw, 52px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {content.title}
              </h2>
              <p
                ref={bodyRef}
                className="mt-6 max-w-[48ch] text-base leading-relaxed text-[color:var(--s-mid)]"
              >
                {content.description}
              </p>
              <div className="mt-8">
                <MagneticButton size="lg" variant="primary" className="group">
                  <Link href="/contact?service=consulting&package=audit">
                    <span className="flex items-center gap-2">
                      {content.cta}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <div className="border-b border-white/10 pb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--s-muted)] mb-2">
                    {content.priceLabel}
                  </p>
                  <p
                    className="font-sans font-light leading-none text-[color:var(--s-high)]"
                    style={{
                      fontSize: "clamp(28px, 4vw, 40px)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {content.price}
                  </p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--s-muted)] mb-2">
                    {content.durationLabel}
                  </p>
                  <p className="text-base leading-relaxed text-[color:var(--s-high)]">
                    {content.duration}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--s-muted)] mb-4">
                  {content.includedLabel}
                </p>
                <ul className="space-y-3">
                  {content.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[color:var(--s-mid)]"
                    >
                      <div className="h-px w-3 bg-white/20 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("serviceDetails.consulting");
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.smooth,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
      const targets = [
        headlineRef.current,
        subRef.current,
        ctaRef.current,
      ].filter(Boolean);
      targets.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: MOTION.distance.md,
          duration: MOTION.duration.base,
          delay: i * MOTION.stagger.loose,
          ease: MOTION.ease.smooth,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-foreground/8"
    >
      <Container>
        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-6 block">
              {t("cta.eyebrow")}
            </p>
            <h2
              ref={headlineRef}
              className="font-sans font-normal text-primary leading-[1.05]"
              style={{
                fontSize: "clamp(30px, 5.5vw, 68px)",
                letterSpacing: "-0.025em",
              }}
            >
              {t("cta.title")}
            </h2>
          </div>
          <div ref={subRef} className="flex flex-col gap-6">
            <p className="text-base text-primary/60 leading-relaxed">
              {t("cta.description")}
            </p>
            <div ref={ctaRef} className="flex flex-col gap-3">
              <Link href="/schedule" className="w-full">
                <MagneticButton
                  size="lg"
                  variant="primary"
                  className="group w-full justify-center"
                >
                  <span className="flex items-center gap-2">
                    {t("cta.button")}
                    <svg
                      className="w-4 h-4 transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </MagneticButton>
              </Link>
              <Link href="/services" className="w-full">
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  className="w-full justify-center"
                >
                  {t("cta.back")}
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
