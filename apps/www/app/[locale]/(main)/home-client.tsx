import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";
const ProblemSection = dynamic(() => import("@/components/sections/problem-section").then(mod => mod.ProblemSection));
const SceneInversionWrapper = dynamic(() => import("@/components/scene-inversion-wrapper").then(mod => mod.SceneInversionWrapper), { loading: () => null });
const CtaSection = dynamic(() => import("@/components/sections/cta-section").then(mod => mod.CtaSection), { loading: () => null });
const EstimatorSection = dynamic(() => import("@/components/sections/estimator-section").then(mod => mod.EstimatorSection), { loading: () => null });
const TrustSection = dynamic(() => import("@/components/sections/trust-section").then(mod => mod.TrustSection), { loading: () => null });
const WorkSection = dynamic(() => import("@/components/sections/work-section").then(mod => mod.WorkSection), { loading: () => null });

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