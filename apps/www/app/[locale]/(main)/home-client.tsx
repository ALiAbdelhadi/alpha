"use client"
import { ErrorBoundary } from "@/components/error-boundary"
import { SceneInversionWrapper } from "@/components/scene-inversion-wrapper"
import { AboutSection } from "@/components/sections/about-section"
import { CtaSection } from "@/components/sections/cta-section"
import { EstimatorSection } from "@/components/sections/estimator-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { SocialProofSection } from "@/components/sections/social-proof-section"
import { WorkSection } from "@/components/sections/work-section"

export function HomeClient() {
    return (
        <>
            <ErrorBoundary>
                <ProblemSection />
            </ErrorBoundary>
            <ErrorBoundary>
                <SceneInversionWrapper />
            </ErrorBoundary>
            <ErrorBoundary>
                <WorkSection />
            </ErrorBoundary>
            <ErrorBoundary>
                <SocialProofSection />
            </ErrorBoundary>
            <ErrorBoundary>
                <AboutSection />
            </ErrorBoundary>
            <ErrorBoundary>
                <EstimatorSection />
            </ErrorBoundary>
            <ErrorBoundary>
                <CtaSection />
            </ErrorBoundary>
        </>
    )
}