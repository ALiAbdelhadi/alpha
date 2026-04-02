"use client";

import { Container } from "@/components/container";
import { ArrowLabel, DirectionalLink } from "@/components/directional-link";
import { MagneticButton } from "@/components/magnetic-button";
import {
  FLAGSHIP_CASE_STUDY,
  FLAGSHIP_METRICS,
  HOMEPAGE_SUPPORTING_CASE_STUDIES,
  getCommercialCta,
  pickCommercialText,
  resolveCommercialLocale,
} from "@/lib/commercial";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { Link } from "@/i18n/navigation";
import { DEFAULTS, MOTION, useReveal, useText } from "@/lib/motion";
import { useLocale } from "next-intl";
import { memo } from "react";

const SUPPORTING_CASES = HOMEPAGE_SUPPORTING_CASE_STUDIES.map((slug) =>
  getCaseStudyBySlug(slug),
).filter(Boolean);

export const WorkSection = memo(function WorkSection() {
  const locale = useLocale();
  const commercialLocale = resolveCommercialLocale(locale);
  const flagshipCta = getCommercialCta(locale, "flagshipBuild");
  const genericProofCta = getCommercialCta(locale, "realBuild");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const bodyRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });

  return (
    <section id="work" className="section-padding">
      <Container>
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-4">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground/60">
              {pickCommercialText(locale, FLAGSHIP_CASE_STUDY.eyebrow)}
            </p>
            <h2 ref={titleRef} className="display-h2 max-w-4xl font-normal text-primary">
              {pickCommercialText(locale, FLAGSHIP_CASE_STUDY.title)}
            </h2>
          </div>
          <p ref={bodyRef} className="body-copy max-w-sm text-muted-foreground">
            {pickCommercialText(locale, FLAGSHIP_CASE_STUDY.summary)}
          </p>
        </div>

        <div className="rounded-[32px] border border-border bg-foreground/[0.02] p-6 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)]">
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {FLAGSHIP_METRICS.map((metric) => (
                  <div
                    key={metric.value.en}
                    className="rounded-[22px] border border-border bg-background/60 p-4"
                  >
                    <p className="display-h3 font-light text-primary">
                      {metric.value[commercialLocale]}
                    </p>
                    <p className="meta-eyebrow mt-2 text-muted-foreground/55">
                      {metric.label[commercialLocale]}
                    </p>
                  </div>
                ))}
              </div>

              {[
                {
                  label: FLAGSHIP_CASE_STUDY.problemLabel,
                  body: FLAGSHIP_CASE_STUDY.problem,
                },
                {
                  label: FLAGSHIP_CASE_STUDY.solutionLabel,
                  body: FLAGSHIP_CASE_STUDY.solution,
                },
                {
                  label: FLAGSHIP_CASE_STUDY.outcomeLabel,
                  body: FLAGSHIP_CASE_STUDY.outcome,
                },
              ].map((item) => (
                <div key={item.label.en} className="space-y-2">
                  <p className="meta-eyebrow text-muted-foreground/55">
                    {pickCommercialText(locale, item.label)}
                  </p>
                  <p className="body-copy max-w-3xl text-primary/78">
                    {pickCommercialText(locale, item.body)}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-border bg-[#0A0C14] p-6 text-white">
              <div className="mb-6 space-y-2">
                <p className="meta-eyebrow text-white/45">
                  {locale === "ar" ? "الدليل الحي" : "Live proof"}
                </p>
                <p className="body-secondary text-white/78">
                  {locale === "ar"
                    ? "المشروع الأساسي هنا هو الموقع نفسه، مع دراسة حالة كاملة وتفاصيل التنفيذ."
                    : "The primary proof asset is the site itself, backed by a full case study and build detail."}
                </p>
              </div>
              <div className="space-y-3">
                <MagneticButton
                  asChild
                  size="lg"
                  variant="primary"
                  className="group w-full justify-center"
                >
                  <Link href={flagshipCta.href}>
                    <ArrowLabel>{flagshipCta.label}</ArrowLabel>
                  </Link>
                </MagneticButton>
                <MagneticButton
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group w-full justify-center border-white/20 text-white hover:bg-white/8 hover:border-white/30"
                >
                  <Link href={genericProofCta.href}>
                    <ArrowLabel>{genericProofCta.label}</ArrowLabel>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SUPPORTING_CASES.map((caseStudy) =>
            caseStudy ? (
              <article
                key={caseStudy.slug}
                className="rounded-[28px] border border-border bg-background p-6 transition-colors duration-300 hover:bg-foreground/[0.02]"
              >
                  <p className="meta-eyebrow text-muted-foreground/50">
                  {caseStudy.client[commercialLocale]} · {caseStudy.year}
                  </p>
                <h3 className="display-h3 mt-4 font-medium text-primary">
                  {caseStudy.name[commercialLocale]}
                </h3>
                <p className="body-secondary mt-3 text-muted-foreground">
                  {caseStudy.summary[commercialLocale]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {caseStudy.metrics.slice(0, 2).map((metric) => (
                    <span
                      key={metric.label[commercialLocale]}
                      className="rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground"
                    >
                      {metric.label[commercialLocale]} · {metric.value}
                    </span>
                  ))}
                </div>
                <DirectionalLink
                  href={`/work/${caseStudy.slug}`}
                  className="meta-eyebrow mt-6 inline-flex text-primary transition-colors hover:text-primary/70"
                >
                  {locale === "ar" ? "اقرأ دراسة الحالة" : "Read the Case Study"}
                </DirectionalLink>
              </article>
            ) : null,
          )}
        </div>
      </Container>
    </section>
  );
});
