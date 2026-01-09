import { notFound } from "next/navigation"
import { ArticleContent } from "./article-content"

interface ArticlePageProps {
    params: Promise<{ slug: string }>
}

const validSlugs = [
    "why-not-wordpress",
    "technical-debt",
    "evaluating-developers",
    "multilingual-architecture",
]

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params

    if (!validSlugs.includes(slug)) {
        notFound()
    }

    return <ArticleContent slug={slug} />
}

export async function generateStaticParams() {
    return validSlugs.map((slug) => ({ slug }))
}