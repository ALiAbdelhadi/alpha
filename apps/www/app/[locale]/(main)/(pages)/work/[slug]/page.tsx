"use client"

import { Container } from "@/components/container"
import { getCaseStudyBySlug } from "@/lib/case-studies"
import { getTestimonialsForCaseStudy } from "@/lib/testimonials"
import { Link } from "@/i18n/navigation"
import { useParams } from "next/navigation"

export default function WorkCaseStudyPage() {
    const params = useParams<{ slug: string }>()
    const slug = params?.slug
    const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined
    const testimonials = slug ? getTestimonialsForCaseStudy(slug) : []

    if (!caseStudy) {
        return (
            <section className="section-padding">
                <Container>
                    <div className="max-w-2xl py-32">
                        <p className="mono text-primary/60 mb-3">Case study</p>
                        <h1 className="font-sans text-3xl md:text-4xl font-normal text-primary mb-4">
                            Case study not found
                        </h1>
                        <p className="body text-primary/70 mb-6">
                            The case study you are looking for does not exist or is not yet published.
                        </p>
                        <Link href="/work" className="mono small text-primary/70 underline underline-offset-4">
                            Back to all work
                        </Link>
                    </div>
                </Container>
            </section>
        )
    }

    return (
        <section className="section-padding">
            <Container>
                <div className="max-w-5xl mx-auto py-12 md:py-20">
                    <div className="mb-8">
                        <p className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-3">
                            Case study · {caseStudy.year}
                        </p>
                        <h1 className="font-sans font-normal text-3xl md:text-5xl text-primary mb-4">
                            {caseStudy.name}
                        </h1>
                        <p className="body text-primary/70 mb-2">
                            {caseStudy.client} · {caseStudy.industry}
                        </p>
                        <p className="body-lg text-primary/80 max-w-2xl">
                            {caseStudy.summary}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 mb-12 md:mb-16">
                        {caseStudy.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="rounded-2xl border border-foreground/15 bg-foreground/3 px-5 py-4"
                            >
                                <p className="mono text-xs text-primary/60 mb-1">{metric.label}</p>
                                <p className="text-2xl font-sans font-light text-primary mb-1">
                                    {metric.value}
                                </p>
                                {metric.description && (
                                    <p className="small text-primary/60">
                                        {metric.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] mb-16">
                        <div className="space-y-8">
                            <section>
                                <h2 className="font-sans text-xl md:text-2xl font-medium text-primary mb-3">
                                    The challenge
                                </h2>
                                <p className="body text-primary/80 whitespace-pre-line">
                                    {caseStudy.problem}
                                </p>
                            </section>
                            <section>
                                <h2 className="font-sans text-xl md:text-2xl font-medium text-primary mb-3">
                                    Our approach
                                </h2>
                                <p className="body text-primary/80 whitespace-pre-line">
                                    {caseStudy.solution}
                                </p>
                            </section>
                            <section>
                                <h2 className="font-sans text-xl md:text-2xl font-medium text-primary mb-3">
                                    Results
                                </h2>
                                <p className="body text-primary/80 whitespace-pre-line">
                                    {caseStudy.outcome}
                                </p>
                            </section>
                        </div>
                        <aside className="space-y-6">
                            <div className="rounded-2xl border border-foreground/10 bg-foreground/3 px-5 py-4">
                                <h3 className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-2">
                                    Tech stack
                                </h3>
                                <ul className="space-y-1">
                                    {caseStudy.techStack.map((tech) => (
                                        <li key={tech} className="small text-primary/80">
                                            • {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {caseStudy.externalUrl && (
                                <div className="rounded-2xl border border-foreground/10 bg-foreground/3 px-5 py-4">
                                    <h3 className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-2">
                                        Live site
                                    </h3>
                                    <a
                                        href={caseStudy.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 body text-primary hover:text-primary/80 underline underline-offset-4"
                                    >
                                        Visit project
                                        <svg
                                            className="h-4 w-4 rtl:-rotate-180"
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
                                <div className="rounded-2xl border border-foreground/10 bg-foreground/3 px-5 py-4">
                                    <h3 className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-2">
                                        Client perspective
                                    </h3>
                                    <blockquote className="body text-primary/85 mb-3">
                                        &ldquo;{testimonials[0].quote}&rdquo;
                                    </blockquote>
                                    <p className="mono small text-primary/60">
                                        {testimonials[0].author} · {testimonials[0].company}
                                    </p>
                                </div>
                            )}
                            <div className="pt-4">
                                <Link
                                    href="/work"
                                    className="mono small text-primary/70 hover:text-primary underline underline-offset-4"
                                >
                                    ← Back to all work
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </Container>
        </section>
    )
}
