"use client"

import { Container } from "@/components/container"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

export default function WritingPage() {
    const sectionRef = useRef<HTMLElement>(null)
    return (
        <div ref={sectionRef} className="relative min-h-screen w-full">
            <OpeningSection />
            <ListSection />
        </div>
    )
}



function OpeningSection() {
    const t = useTranslations("writing")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.6 })
    const descRef = useReveal({ direction: "up", delay: 0.2, duration: 0.6 })

    return (
        <section className="flex min-h-screen items-center pt-24 md:pt-32">
            <Container>
                <h1 ref={titleRef} className="mb-6 font-sans text-5xl font-normal leading-[1.1] tracking-tight text-primary md:text-6xl lg:text-7xl">
                    {t("hero.title")}
                </h1>
                <p ref={descRef} className="max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl">
                    {t("hero.description")}
                </p>
            </Container>
        </section>
    )
}

function ListSection() {
    const tArticles = useTranslations("writing.articles")
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const articles = sectionRef.current.querySelectorAll("[data-article]")

        articles.forEach((article, index) => {
            gsap.set(article, { opacity: 0, y: 20 })

            gsap.to(article, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: article,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            })
        })
    }, [])

    const articles = [
        {
            slug: "why-not-wordpress",
            date: "November 2024",
            readTime: "2 min read",
        },
        {
            slug: "technical-debt",
            date: "October 2024",
            readTime: "3 min read",
        },
        {
            slug: "evaluating-developers",
            date: "September 2024",
            readTime: "4 min read",
        },
        {
            slug: "multilingual-architecture",
            date: "August 2024",
            readTime: "3 min read",
        },
    ]

    return (
        <section className="flex items-center pt-24 md:pt-32 pb-24 pd:mb-32">
            <Container>
                {articles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/writing/${article.slug}`}
                        data-article
                        className="group block border-t border-foreground/10 py-8 transition-colors hover:bg-foreground/5 -mx-6 px-6 md:-mx-12 md:px-12"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex-1">
                                <h2 className="mb-2 font-sans text-2xl font-medium text-primary transition-colors group-hover:text-primary/70 md:text-3xl">
                                    {tArticles(`${article.slug}.title`)}
                                </h2>
                                <p className="text-base text-primary/75">
                                    {tArticles(`${article.slug}.excerpt`)}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 font-mono text-xs text-primary/60 md:text-sm">
                                <span>{article.date}</span>
                                <span>·</span>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </Container>
        </section>
    )
}
