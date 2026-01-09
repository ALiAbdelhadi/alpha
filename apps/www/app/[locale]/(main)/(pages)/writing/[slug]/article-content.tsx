"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

interface ArticleContentProps {
    slug: string
}

export function ArticleContent({ slug }: ArticleContentProps) {
    const t = useTranslations("articles")
    const heroRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const contentRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <main className="min-h-screen pt-24 md:pt-32">
            <Container>
                <Link
                    href="/writing"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToWriting")}
                </Link>

                <article>
                    <header ref={heroRef} className="mb-16 md:mb-20">
                        <div className="mb-6 flex items-center gap-4 font-mono text-xs text-foreground/60">
                            <span>{t(`${slug}.meta.date`)}</span>
                            <span>·</span>
                            <span>{t(`${slug}.meta.readTime`)}</span>
                        </div>
                        <h1 className="mb-6 font-sans text-4xl font-normal leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            {t(`${slug}.title`)}
                        </h1>
                        <p className="max-w-2xl text-lg leading-relaxed text-foreground/85">
                            {t(`${slug}.excerpt`)}
                        </p>
                    </header>

                    <div ref={contentRef} className="prose prose-lg max-w-3xl">
                        {t(`${slug}.content`)
                            .split("\n\n")
                            .map((section: string, i: number) => {
                                if (section.startsWith("## ")) {
                                    return (
                                        <h2
                                            key={i}
                                            className="mb-4 mt-12 font-sans text-2xl font-medium text-foreground md:text-3xl"
                                        >
                                            {section.replace("## ", "")}
                                        </h2>
                                    )
                                }
                                if (section.startsWith("### ")) {
                                    return (
                                        <h3
                                            key={i}
                                            className="mb-3 mt-8 font-sans text-xl font-medium text-foreground"
                                        >
                                            {section.replace("### ", "")}
                                        </h3>
                                    )
                                }
                                if (section.startsWith("```")) {
                                    const code = section
                                        .replace(/```\w*/g, "")
                                        .trim()
                                    return (
                                        <pre
                                            key={i}
                                            className="my-6 overflow-x-auto rounded-lg border border-foreground/10 bg-foreground/5 p-4"
                                        >
                                            <code className="text-sm text-foreground/70">
                                                {code}
                                            </code>
                                        </pre>
                                    )
                                }
                                if (section.startsWith("- ")) {
                                    const items = section.split("\n")
                                    return (
                                        <ul key={i} className="my-6 space-y-2">
                                            {items.map((item, j) => (
                                                <li key={j} className="text-base leading-relaxed text-foreground/85">
                                                    {item.replace("- ", "")}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                                return (
                                    <p
                                        key={i}
                                        className="mb-6 text-base leading-relaxed text-foreground/85"
                                    >
                                        {section}
                                    </p>
                                )
                            })}
                    </div>
                </article>

                <footer className="mb-20 mt-16 border-t border-foreground/10 pt-12">
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-sm text-foreground hover:text-foreground/70 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("backToWriting")}
                    </Link>
                </footer>
            </Container>
        </main>
    )
}