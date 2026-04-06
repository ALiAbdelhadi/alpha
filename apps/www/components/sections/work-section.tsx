"use client"

import { Container } from "@/components/container"
import { ArrowLabel, DirectionalLink } from "@/components/directional-link"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { getCaseStudyBySlug } from "@/lib/case-studies"
import {
  FLAGSHIP_CASE_STUDY,
  FLAGSHIP_METRICS,
  HOMEPAGE_SUPPORTING_CASE_STUDIES,
  getCommercialCta,
  pickCommercialText,
  resolveCommercialLocale,
} from "@/lib/commercial"
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion"
import { useLocale } from "next-intl"
import { memo } from "react"

function splitHeadline(value: string) {
  if (!value.trim()) return { first: "", second: "" }
  const sentenceMatch = value.match(/^(.+[.!?،])\s+(.+)$/)
  if (sentenceMatch) return { first: sentenceMatch[1], second: sentenceMatch[2] }
  const words = value.trim().split(/\s+/)
  if (words.length < 2) return { first: value, second: "" }
  const splitAt = Math.ceil(words.length / 2)
  return {
    first: words.slice(0, splitAt).join(" "),
    second: words.slice(splitAt).join(" "),
  }
}

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
  const gridRef = useBatch({ ...DEFAULTS.card, selector: ".work-card" });

  const { first: firstTitle, second: secondTitle } = splitHeadline(
    pickCommercialText(locale, FLAGSHIP_CASE_STUDY.title),
  );

  return (
    <section id="work" className="section-padding">
      <Container>
        {/* ── Section header — same pattern as services/process ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 md:gap-12 mb-16">
          <div className="space-y-3">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground">
              {pickCommercialText(locale, FLAGSHIP_CASE_STUDY.eyebrow)}
            </p>
            <h2 ref={titleRef} className="display-h2 font-normal text-foreground m-0">
              {firstTitle}
              {secondTitle ? (
                <>
                  <br className="hidden md:block" />
                  <span className="block mt-2 md:mt-0 md:inline font-serif italic text-muted-foreground">
                    {secondTitle}
                  </span>
                </>
              ) : null}
            </h2>
          </div>
          <p ref={bodyRef} className="font-mono text-[13px] leading-[1.8] text-muted-foreground max-w-[320px] m-0">
            {pickCommercialText(locale, FLAGSHIP_CASE_STUDY.summary)}
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-border mb-5" />

        {/* ── Flagship metrics — flat border-grid, same as hero stats ── */}
        <div className="grid gap-0 border-t border-border sm:grid-cols-3">
          {FLAGSHIP_METRICS.map((metric, i, arr) => (
            <div
              key={metric.value.en}
              className="border-b border-border sm:not-last:border-r px-6 py-8"
            >
              <span className="display-h3 font-light text-foreground block">
                {metric.value[commercialLocale]}
              </span>
              <span className="meta-eyebrow mt-2 block text-muted-foreground">
                {metric.label[commercialLocale]}
              </span>
            </div>
          ))}
        </div>

        {/* ── Flagship detail — flat editorial blocks ── */}
        <div className="grid gap-0 border-l border-r border-border md:grid-cols-3 mt-0">
          {[
            { label: FLAGSHIP_CASE_STUDY.problemLabel, body: FLAGSHIP_CASE_STUDY.problem },
            { label: FLAGSHIP_CASE_STUDY.solutionLabel, body: FLAGSHIP_CASE_STUDY.solution },
            { label: FLAGSHIP_CASE_STUDY.outcomeLabel, body: FLAGSHIP_CASE_STUDY.outcome },
          ].map((item) => (
            <div
              key={item.label.en}
              className="border-r border-b border-border px-6 py-8 group hover:bg-surface transition-colors duration-300"
            >
              <p className="meta-eyebrow text-muted-foreground mb-4">
                {pickCommercialText(locale, item.label)}
              </p>
              <p className="body-copy text-muted-foreground">
                {pickCommercialText(locale, item.body)}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA row — flat, divider-based ── */}
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
          <div className="space-y-3">
            <p className="meta-eyebrow text-muted-foreground">
              {locale === "ar" ? "الدليل الحي" : "Live proof"}
            </p>
            <p className="body-copy text-muted-foreground max-w-xl">
              {locale === "ar"
                ? "المشروع الأساسي هنا هو الموقع نفسه، مع دراسة حالة كاملة وتفاصيل التنفيذ."
                : "The primary proof asset is the site itself, backed by a full case study and build detail."}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <MagneticButton
              asChild
              size="lg"
              variant="primary"
              className="group"
            >
              <Link href={flagshipCta.href}>
                <ArrowLabel>{flagshipCta.label}</ArrowLabel>
              </Link>
            </MagneticButton>
            <MagneticButton
              asChild
              size="lg"
              variant="secondary"
              className="group"
            >
              <Link href={genericProofCta.href}>
                <ArrowLabel>{genericProofCta.label}</ArrowLabel>
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-border mt-10 mb-0" />

        {/* ── Supporting case studies — border-grid pattern ── */}
        {SUPPORTING_CASES.length > 0 && (
          <div
            ref={gridRef}
            className="grid gap-0 border-l border-r border-border md:grid-cols-2"
          >
            {SUPPORTING_CASES.map((caseStudy) =>
              caseStudy ? (
                <div
                  key={caseStudy.slug}
                  className="work-card border-r border-b border-border px-6 py-8 group hover:bg-surface transition-colors duration-300"
                >
                  <p className="meta-eyebrow text-muted-foreground mb-4">
                    {caseStudy.client[commercialLocale]} · {caseStudy.year}
                  </p>
                  <h3 className="display-h3 font-medium text-foreground mb-3">
                    {caseStudy.name[commercialLocale]}
                  </h3>
                  <p className="body-secondary text-muted-foreground mb-5">
                    {caseStudy.summary[commercialLocale]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {caseStudy.metrics.slice(0, 2).map((metric) => (
                      <span
                        key={metric.label[commercialLocale]}
                        className="rounded-full border border-border px-3 py-1 meta-eyebrow text-muted-foreground"
                      >
                        {metric.label[commercialLocale]} · {metric.value}
                      </span>
                    ))}
                  </div>
                  <DirectionalLink
                    href={`/work/${caseStudy.slug}`}
                    className="meta-eyebrow inline-flex text-foreground transition-colors hover:text-muted-foreground"
                  >
                    {locale === "ar" ? "اقرأ دراسة الحالة" : "Read the Case Study"}
                  </DirectionalLink>
                </div>
              ) : null,
            )}
          </div>
        )}

        {/* ── Footer — same pattern as services/process ── */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-px bg-border" />
          <span className="meta-eyebrow text-muted-foreground">
            {locale === "ar" ? "أعمال مبنية على الأداء" : "Built on performance"}
          </span>
        </div>
      </Container>
    </section>
  );
});