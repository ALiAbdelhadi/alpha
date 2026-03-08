"use client"

import { Container } from "@/components/container"
import { CASE_STUDIES } from "@/lib/case-studies"
import { Link } from "@/i18n/navigation"

export default function WorkIndexPage() {
    return (
        <section className="section-padding">
            <Container>
                <div className="max-w-5xl mx-auto py-16 md:py-24">
                    <header className="mb-10 md:mb-14">
                        <p className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-3">
                            Selected work
                        </p>
                        <h1 className="font-sans text-3xl md:text-5xl font-normal text-primary mb-4">
                            Case studies
                        </h1>
                        <p className="body-lg text-primary/75 max-w-2xl">
                            Three recent projects that show how we think about performance, multilingual UX,
                            and conversion—not just aesthetics.
                        </p>
                    </header>

                    <div className="divide-y divide-foreground/15 border-y border-foreground/15">
                        {CASE_STUDIES.map((cs, index) => (
                            <article key={cs.slug}>
                                <Link href={`/work/${cs.slug}`}>
                                    <div className="flex flex-col gap-4 py-8 md:py-10 hover:bg-foreground/2 transition-colors">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-baseline gap-4 md:gap-8">
                                                <span className="mono text-primary/40">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <h2 className="font-sans text-xl md:text-2xl font-medium text-primary mb-1">
                                                        {cs.name}
                                                    </h2>
                                                    <p className="mono small text-primary/60">
                                                        {cs.client} · {cs.industry}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="hidden md:inline mono small text-primary/50">
                                                {cs.year}
                                            </span>
                                        </div>
                                        <p className="body text-primary/75 max-w-2xl">
                                            {cs.summary}
                                        </p>
                                        <div className="flex items-center justify-between gap-4 pt-1">
                                            <div className="flex flex-wrap gap-3">
                                                {cs.metrics.slice(0, 2).map((metric) => (
                                                    <div
                                                        key={metric.label}
                                                        className="inline-flex items-center gap-1 rounded-full border border-foreground/20 bg-foreground/3 px-3 py-1"
                                                    >
                                                        <span className="mono text-[11px] uppercase tracking-[0.16em] text-primary/60">
                                                            {metric.label}
                                                        </span>
                                                        <span className="mono text-xs text-primary">
                                                            {metric.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="inline-flex items-center gap-2 mono small text-primary/70">
                                                View case study
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
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

