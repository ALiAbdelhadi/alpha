import { JsonLd } from "@/components/seo/json-ld";
import WorkCaseStudyPageClient from "./page-client";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { generateRouteMetadata } from "@/lib/metadata";
import { buildCaseStudyPageSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale === "ar" ? "ar" : "en";
  const cs = getCaseStudyBySlug(slug);
  const pathSuffix = `/work/${slug}`;
  if (!cs) {
    return generateRouteMetadata(locale, "workCaseStudy", pathSuffix, {
      title: loc === "ar" ? "دراسة غير موجودة" : "Case study not found",
      description:
        loc === "ar"
          ? "دراسة الحالة التي تبحث عنها غير متوفرة."
          : "The case study you are looking for does not exist or is not yet published.",
      robots: {
        follow: false,
        googleBot: {
          follow: false,
          index: false,
        },
        index: false,
      },
    });
  }
  return generateRouteMetadata(locale, "workCaseStudy", pathSuffix, {
    description: cs.summary[loc],
    keywords: [
      ...cs.keywords[loc],
      cs.client[loc],
      cs.industry[loc],
      loc === "ar" ? "دراسة حالة" : "case study",
    ],
    title: cs.name[loc],
  });
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  return (
    <>
      {cs ? <JsonLd schemas={buildCaseStudyPageSchemas(locale, cs)} /> : null}
      <WorkCaseStudyPageClient locale={locale} slug={slug} />
    </>
  );
}
