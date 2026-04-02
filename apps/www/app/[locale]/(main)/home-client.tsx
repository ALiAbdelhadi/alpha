"use client";
import { ErrorBoundary } from "@/components/error-boundary";
import { CtaSection } from "@/components/sections/cta-section";
import { EstimatorTeaserSection } from "@/components/sections/estimator-teaser-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WorkSection } from "@/components/sections/work-section";

export function HomeClient() {
  return (
    <>
      <ErrorBoundary>
        <ProblemSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ServicesSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <WorkSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <TrustSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <EstimatorTeaserSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <CtaSection />
      </ErrorBoundary>
    </>
  );
}
