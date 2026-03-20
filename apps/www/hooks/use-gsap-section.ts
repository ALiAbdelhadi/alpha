import { useIsomorphicLayoutEffect } from "@/lib/dom-utils";
import { gsap } from "@/lib/gsap";

interface GSAPSectionOptions {
  trigger: React.RefObject<HTMLElement | null>;
  conditions?: Record<string, string>;
  reducedMotionOnly?: boolean;
}

export function useGSAPSection(
  options: GSAPSectionOptions,
  setup: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!options.trigger.current) return;

    const mm = gsap.matchMedia();
    const conditions = options.conditions || {
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    };

    mm.add(conditions, (context) => {
      setup(context);
    }, options.trigger);

    return () => mm.revert();
  }, [options.trigger, ...deps]);
}
