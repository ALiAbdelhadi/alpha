"use client";

import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background section-padding">
            <div
                aria-hidden
                className="pointer-events-none select-none absolute bottom-0 ltr:right-0 rtl:left-0 font-sans font-semibold leading-none"
                style={{
                    fontSize: "clamp(120px, 22vw, 340px)",
                    letterSpacing: "-0.06em",
                    color: "color-mix(in srgb, var(--foreground) 3%, transparent)",
                    lineHeight: 0.85,
                }}
            >
                404
            </div>
            <Container>
                <main className="relative z-10 max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/60 mb-6 block">
                        404 — Page not found
                    </p>
                    <h1
                        className="mb-8 font-sans font-normal text-primary leading-[1.05]"
                        style={{
                            fontSize: "clamp(36px, 5vw, 64px)",
                            letterSpacing: "-0.025em",
                        }}
                    >
                        This page
                        <br />
                        <span
                            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                            className="text-primary/40"
                        >
                            doesn&apos;t exist.
                        </span>
                    </h1>
                    <div className="h-px w-24 bg-foreground/8 mb-8" />
                    <p className="body-copy text-muted-foreground mb-12 max-w-md">
                        The URL may have changed or the page was removed. Head back to
                        explore what we&apos;re building.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <MagneticButton asChild size="lg" variant="primary">
                            <Link href="/">Go home</Link>
                        </MagneticButton>
                        <MagneticButton asChild size="lg" variant="secondary">
                            <Link href="/contact">Contact us</Link>
                        </MagneticButton>
                    </div>
                </main>
            </Container>
        </div>
    );
}