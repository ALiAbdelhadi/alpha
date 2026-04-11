import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";
const ProblemSection = dynamic(() => import("@/components/sections/problem-section").then(mod => mod.ProblemSection));
const SceneInversionWrapper = dynamic(() => import("@/components/scene-inversion-wrapper").then(mod => mod.SceneInversionWrapper));
const CtaSection = dynamic(() => import("@/components/sections/cta-section").then(mod => mod.CtaSection));
const EstimatorSection = dynamic(() => import("@/components/sections/estimator-section").then(mod => mod.EstimatorSection));
const TrustSection = dynamic(() => import("@/components/sections/trust-section").then(mod => mod.TrustSection));
const WorkSection = dynamic(() => import("@/components/sections/work-section").then(mod => mod.WorkSection));

export function HomeClient() {
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