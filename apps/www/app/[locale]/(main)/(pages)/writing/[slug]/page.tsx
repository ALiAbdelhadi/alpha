import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Link } from "@/i18n/navigation";
import { getAllArticles, getArticle, getRelatedArticles } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type ArticleCtaConfig = {
  href: string;
  label: {
    en: string;
    ar: string;
  };
};

const ARTICLE_CTA_MAP: Record<string, ArticleCtaConfig> = {
  "why-not-wordpress": {
    href: "/pricing?tier=professional",
    label: {
      en: "See what we build instead",
      ar: "شاهد ما نبنيه بدلاً من ذلك",
    },
  },
  "technical-debt": {
    href: "/services/maintenance",
    label: {
      en: "Learn about our maintenance retainer",
      ar: "تعرّف على عقد الصيانة لدينا",
    },
  },
  "evaluating-developers": {
    href: "/services/consulting",
    label: {
      en: "Talk to us about your technical team",
      ar: "تحدث معنا عن فريقك التقني",
    },
  },
  "multilingual-architecture": {
    href: "/services/development",
    label: {
      en: "Build bilingual from day one",
      ar: "ابنِ ثنائي اللغة من اليوم الأول",
    },
  },
};

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: "en" | "ar" }>;
}

export async function generateStaticParams() {
  const en = (await getAllArticles("en")).map((a) => ({
    locale: "en" as const,
    slug: a.slug,
  }));
  const ar = (await getAllArticles("ar")).map((a) => ({
    locale: "ar" as const,
    slug: a.slug,
  }));
  return [...en, ...ar];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticle(slug, locale);
  if (!article) notFound();

  const related = await getRelatedArticles(
    slug,
    article.frontmatter.tags,
    locale,
  );
  const articleCta = ARTICLE_CTA_MAP[slug] ?? null;

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <Container>
        <Link
          href="/writing"
          className="group mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
        >
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 ltr:group-hover:-translate-x-0.5"
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
          Back to writing
        </Link>
        <article>
          <header className="mb-16 md:mb-20 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <time
                dateTime={article.frontmatter.date}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70"
              >
                {new Date(article.frontmatter.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-primary/20">·</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                {article.frontmatter.readTime}
              </span>
            </div>

            <h1
              className="mb-6 font-sans font-normal text-primary leading-[1.03]"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                letterSpacing: "-0.025em",
              }}
            >
              {article.frontmatter.title}
            </h1>
            <p className="text-base text-primary/60 leading-relaxed max-w-[52ch]">
              {article.frontmatter.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-foreground/8 bg-foreground/2 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/35"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="h-px w-full bg-foreground/8 mb-12 md:mb-16" />
          <div
            className="prose prose-lg max-w-3xl dark:prose-invert
            prose-headings:font-sans prose-headings:font-normal prose-headings:tracking-tight
            prose-p:text-primary/60 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/70
            prose-code:font-mono prose-code:text-sm
            prose-blockquote:border-foreground/8 prose-blockquote:text-primary/60
          "
          >
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>
        </article>
        {articleCta && (
          <section className="mt-16 border-t border-foreground/8 pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
              {locale === "ar" ? "الخطوة التالية" : "Next step"}
            </p>
            <Link
              href={articleCta.href}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
            >
              {articleCta.label[locale]}
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
            </Link>
          </section>
        )}
        {related.length > 0 && (
          <section className="mt-20 md:mt-32 border-t border-foreground/8 pt-12 md:pt-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 mb-4 block">
              Related Articles
            </p>
            <h2
              className="font-sans font-normal text-primary leading-[1.05] mb-10"
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                letterSpacing: "-0.02em",
              }}
            >
              Keep reading
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/writing/${rel.slug}`}
                  className="group border border-foreground/8 rounded-sm bg-foreground/2 p-6 hover:bg-foreground/4transition-colors duration-300"
                >
                  <h3
                    className="font-sans font-medium text-primary mb-2 group-hover:text-primary/70 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(15px, 1.5vw, 18px)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {rel.frontmatter.title}
                  </h3>
                  <p className="text-sm text-primary/60 leading-relaxed">
                    {rel.frontmatter.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <footer className="mb-20 mt-16 border-t border-foreground/8 pt-10">
          <Link
            href="/writing"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary/40 hover:text-primary/70 transition-colors duration-300"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 ltr:group-hover:-translate-x-0.5"
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
            Back to writing
          </Link>
        </footer>
      </Container>
    </div>
  );
}
