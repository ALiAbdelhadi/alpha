import { ErrorBoundary } from "@/components/error-boundary";
import { CtaSection } from "@/components/sections/cta-section";
import { EstimatorSection } from "@/components/sections/estimator-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WorkSection } from "@/components/sections/work-section";

export function HomeClient() {
  return (
    <>
      <HeroSection />
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
        <EstimatorSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <CtaSection />
      </ErrorBoundary>
    </>
  );
}