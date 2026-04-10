import { ErrorBoundary } from "@/components/error-boundary";
import { SceneInversionWrapper } from "@/components/scene-inversion-wrapper";
import { CtaSection } from "@/components/sections/cta-section";
import { EstimatorSection } from "@/components/sections/estimator-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WorkSection } from "@/components/sections/work-section";
export function HomeClient({ locale }: { locale: string }) {
  return (
    <>
      <ErrorBoundary>
        <ProblemSection />
      </ErrorBoundary>
      <SceneInversionWrapper />
      <ErrorBoundary>
        <WorkSection />
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