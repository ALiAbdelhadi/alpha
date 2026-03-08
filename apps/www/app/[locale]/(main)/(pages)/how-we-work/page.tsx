"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export default function HowWeWorkPage() {
    const tApproachHero = useTranslations("approach.hero")
    const tProcessHero = useTranslations("process.hero")
    const tProcessPhases = useTranslations("process.phases")
    const tStandardsHero = useTranslations("standards.hero")

    const phases = ["discovery", "wireframe", "design", "development", "launch"] as const

    return (
        <main className="section-padding">
            <Container>
                <section className="max-w-5xl mx-auto py-16 md:py-20">
                    <p className="mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-3">
                        How we work
                    </p>
                    <h1 className="font-sans text-3xl md:text-5xl font-normal text-primary mb-6">
                        {tProcessHero("title")}
                    </h1>
                    <p className="body-lg text-primary/80 max-w-3xl mb-6">
                        {tApproachHero("description")}
                    </p>
                    <p className="body text-primary/70 max-w-3xl">
                        {tProcessHero("description")}
                    </p>
                </section>

                <section className="max-w-5xl mx-auto py-12 md:py-16 border-t border-foreground/15">
                    <h2 className="font-sans text-2xl md:text-3xl font-medium text-primary mb-6">
                        Architecture first, then execution
                    </h2>
                    <p className="body text-primary/80 max-w-3xl mb-4">
                        We start by understanding constraints and data before we talk about pages or pixels. This
                        is how we avoid rework and ship systems that last longer than the latest framework trend.
                    </p>
                    <p className="body text-primary/70 max-w-3xl">
                        Every project begins with a discovery session, a technical audit if needed, and a clear
                        definition of what we will not build. That clarity is what lets us move fast later without
                        cutting corners.
                    </p>
                </section>

                <section className="max-w-5xl mx-auto py-12 md:py-16 border-t border-foreground/15">
                    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h2 className="font-sans text-2xl md:text-3xl font-medium text-primary mb-3">
                                A clear, phased process
                            </h2>
                            <p className="body text-primary/75 max-w-3xl">
                                The same backbone for every engagement—adapted to your timeline and risk profile.
                            </p>
                        </div>
                        <p className="mono small text-primary/50">
                            {tProcessPhases("deliverables")} · {tProcessPhases("timeline")}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {phases.map((key) => (
                            <article
                                key={key}
                                className="rounded-2xl border border-foreground/15 bg-foreground/3 p-5 md:p-6"
                            >
                                <p className="mono text-xs uppercase tracking-[0.16em] text-primary/60 mb-1">
                                    {tProcessPhases(`${key}.timeline`)}
                                </p>
                                <h3 className="font-sans text-lg md:text-xl font-medium text-primary mb-2">
                                    {tProcessPhases(`${key}.title`)}
                                </h3>
                                <p className="body text-primary/80 mb-2">
                                    {tProcessPhases(`${key}.description`)}
                                </p>
                                <p className="mono small text-primary/60">
                                    {tProcessPhases(`${key}.deliverables`)}
                                </p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-8 body text-primary/70 max-w-3xl">
                        These phases are a framework, not a rigid contract. Some projects need more discovery,
                        others need to launch fast and iterate. We adjust the intensity of each phase without
                        abandoning the underlying discipline.
                    </p>
                </section>

                <section className="max-w-5xl mx-auto py-12 md:py-16 border-t border-foreground/15">
                    <h2 className="font-sans text-2xl md:text-3xl font-medium text-primary mb-4">
                        Standards we ship against
                    </h2>
                    <p className="body-lg text-primary/80 max-w-3xl mb-4">
                        {tStandardsHero("description")}
                    </p>
                    <p className="body text-primary/70 max-w-3xl mb-8">
                        Performance, accessibility, and code quality are not add‑ons. We define concrete targets
                        before development starts and check against them before launch.
                    </p>
                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="rounded-2xl border border-foreground/15 bg-foreground/3 p-4">
                            <p className="mono text-xs uppercase tracking-[0.16em] text-primary/60 mb-1">
                                Performance
                            </p>
                            <p className="body text-primary/80">
                                Lighthouse > 90, fast initial load, and lean bundles tuned for real devices.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-foreground/15 bg-foreground/3 p-4">
                            <p className="mono text-xs uppercase tracking-[0.16em] text-primary/60 mb-1">
                                Accessibility
                            </p>
                            <p className="body text-primary/80">
                                WCAG‑aligned interfaces, keyboard navigable flows, and contrast that passes audits.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-foreground/15 bg-foreground/3 p-4">
                            <p className="mono text-xs uppercase tracking-[0.16em] text-primary/60 mb-1">
                                Code quality
                            </p>
                            <p className="body text-primary/80">
                                Typed, reviewed, and documented code that your future team can understand and extend.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Link href="/standards" className="mono small text-primary/70 underline underline-offset-4">
                            Read the full standards →
                        </Link>
                    </div>
                </section>

                <section className="max-w-5xl mx-auto py-12 md:py-20 border-t border-foreground/15">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-sans text-2xl md:text-3xl font-medium text-primary mb-3">
                                Ready to see how this maps to your project?
                            </h2>
                            <p className="body text-primary/75 max-w-3xl">
                                We’ll walk you through how these phases and standards apply to your specific scope and
                                constraints—before you commit to anything.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/schedule">
                                <MagneticButton size="lg" variant="primary" className="w-full sm:w-auto">
                                    Schedule a discovery call
                                </MagneticButton>
                            </Link>
                            <Link href="/work">
                                <MagneticButton size="lg" variant="secondary" className="w-full sm:w-auto">
                                    See case studies
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    )
}

