"use client";

import { Container } from "@/components/container";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { getTestimonialsForCaseStudy } from "@/lib/testimonials";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export default function WorkCaseStudyPage() {
  const params = useParams<{ locale: string; slug: string }>();
  const locale = (params?.locale as "en" | "ar") || "en";
  const slug = params?.slug;
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const testimonials = slug ? getTestimonialsForCaseStudy(slug) : [];

  if (!caseStudy) {
    return (
      <section className="section-padding">
        <Container>
          <div className="max-w-2xl py-32">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
              Case study
            </p>
            <h1
              className="font-sans font-normal text-primary leading-[1.05] mb-4"
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              Case study not found
            </h1>
            <p className="text-base text-primary/60 leading-relaxed mb-8">
              The case study you are looking for does not exist or is not yet
              published.
            </p>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
            >
              <svg
                className="h-3.5 w-3.5 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to all work
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const labels = {
    challenge: locale === "ar" ? "التحدي" : "The challenge",
    approach: locale === "ar" ? "نهجنا" : "Our approach",
    results: locale === "ar" ? "النتائج" : "Results",
    techStack: locale === "ar" ? "مجموعة التقنيات" : "Tech stack",
    liveSite: locale === "ar" ? "الموقع المباشر" : "Live site",
    visitProj: locale === "ar" ? "زيارة المشروع" : "Visit project",
    clientPersp: locale === "ar" ? "رأي العميل" : "Client perspective",
    backLink: locale === "ar" ? "العودة إلى جميع الأعمال" : "Back to all work",
  };

  return (
    <section className="section-padding">
      <Container>
        <div className="py-12 md:py-24">
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
              Case study · {caseStudy.year}
            </p>
            <h1
              className="mb-4 font-sans font-normal text-primary leading-[1.03]"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.025em",
              }}
            >
              {caseStudy.name[locale]}
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/35 mb-5">
              {caseStudy.client[locale]} · {caseStudy.industry[locale]}
            </p>
            <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">
              {caseStudy.summary[locale]}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mb-16">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label[locale]}
                className="border border-foreground/8 rounded-sm bg-foreground/2 p-5 md:p-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                  {metric.label[locale]}
                </p>
                <p
                  className="font-sans font-light text-primary leading-none mb-1"
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {metric.value}
                </p>
                {metric.description?.[locale] && (
                  <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.15em] mt-2">
                    {metric.description[locale]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-foreground/8 mb-16" />
          <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-12">
              {[
                {
                  heading: labels.challenge,
                  content: caseStudy.problem[locale],
                },
                {
                  heading: labels.approach,
                  content: caseStudy.solution[locale],
                },
                { heading: labels.results, content: caseStudy.outcome[locale] },
              ].map(({ heading, content }) => (
                <section key={heading}>
                  <h2
                    className="font-sans font-normal text-primary leading-[1.05] mb-4"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {heading}
                  </h2>
                  <p className="text-base text-primary/60 leading-relaxed whitespace-pre-line">
                    {content}
                  </p>
                </section>
              ))}
            </div>
            <aside className="space-y-4">
              <div className="border border-foreground/8 rounded-sm bg-foreground/2 p-5">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">
                  {labels.techStack}
                </h3>
                <ul className="space-y-2">
                  {caseStudy.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-3 text-sm text-primary/60"
                    >
                      <div className="h-px w-3 bg-foreground/8 shrink-0" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {caseStudy.externalUrl && (
                <div className="border border-foreground/8 rounded-sm bg-foreground/2 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">
                    {labels.liveSite}
                  </h3>
                  <a
                    href={caseStudy.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-primary/60 hover:text-primary transition-colors duration-300"
                  >
                    <span className="border-b border-foreground/8 group-hover:border-foreground/40 transition-colors duration-300 pb-0.5">
                      {labels.visitProj}
                    </span>
                    <svg
                      className="h-3.5 w-3.5 rtl:-rotate-180"
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
              )}
              {testimonials.length > 0 && (
                <div className="border border-foreground/8 rounded-sm bg-foreground/2 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">
                    {labels.clientPersp}
                  </h3>
                  <blockquote className="text-base text-primary/60 leading-relaxed mb-4">
                    &ldquo;{testimonials[0].quote[locale]}&rdquo;
                  </blockquote>
                  <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.15em]">
                    {testimonials[0].author} · {testimonials[0].company}
                  </p>
                </div>
              )}
              <div className="pt-2">
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
                >
                  <svg
                    className="h-3.5 w-3.5 rtl:rotate-180 transition-transform duration-300 ltr:group-hover:-translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  {labels.backLink}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
