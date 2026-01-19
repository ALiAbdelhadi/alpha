import { notFound } from 'next/navigation';
import { getArticle, getAllArticles, getRelatedArticles } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/container';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
    params: Promise<{ slug: string; locale: 'en' | 'ar' }>;
}

export async function generateStaticParams() {
    const enSlugs = (await getAllArticles('en')).map((article) => ({
        locale: 'en' as const,
        slug: article.slug,
    }));

    const arSlugs = (await getAllArticles('ar')).map((article) => ({
        locale: 'ar' as const,
        slug: article.slug,
    }));

    return [...enSlugs, ...arSlugs];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug, locale } = await params;
    const article = await getArticle(slug, locale);

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(
        slug,
        article.frontmatter.tags,
        locale
    );

    return (
        <div className="min-h-screen pt-24 md:pt-32">
            <Container>
                <Link
                    href="/writing"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to writing
                </Link>
                <article>
                    <header className="mb-16 md:mb-20">
                        <div className="mb-6 flex items-center gap-4 font-mono text-xs text-primary/60">
                            <time dateTime={article.frontmatter.date}>
                                {new Date(article.frontmatter.date).toLocaleDateString(locale, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span>·</span>
                            <span>{article.frontmatter.readTime}</span>
                        </div>
                        <h1 className="mb-6 font-sans text-4xl font-normal leading-[1.1] tracking-tight text-primary md:text-5xl lg:text-6xl">
                            {article.frontmatter.title}
                        </h1>
                        <p className="max-w-2xl text-lg leading-relaxed text-primary/85">
                            {article.frontmatter.excerpt}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {article.frontmatter.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>
                    <div className="prose prose-lg max-w-3xl">
                        <MDXRemote source={article.content} components={mdxComponents} />
                    </div>
                </article>
                {relatedArticles.length > 0 && (
                    <section className="mt-20 border-t border-foreground/10 pt-12">
                        <h2 className="mb-8 font-sans text-2xl font-semibold">
                            Related Articles
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/writing/${related.slug}`}
                                    className="group rounded-lg border border-foreground/10 p-6 transition-colors hover:bg-foreground/5"
                                >
                                    <h3 className="mb-2 font-sans text-lg font-medium group-hover:text-primary/70">
                                        {related.frontmatter.title}
                                    </h3>
                                    <p className="text-sm text-primary/75">
                                        {related.frontmatter.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
                <footer className="mb-20 mt-16 border-t border-foreground/10 pt-12">
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/70 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to writing
                    </Link>
                </footer>
            </Container>
        </div>
    );
}
