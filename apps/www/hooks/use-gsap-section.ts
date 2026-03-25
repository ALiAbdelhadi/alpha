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
    const scope = options.trigger.current;
    if (!scope) return;

    const mm = gsap.matchMedia();
    const conditions = options.conditions || {
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    };

    // GSAP expects an Element or selector string for matchMedia scope — not a RefObject
    mm.add(conditions, (context) => {
      setup(context);
    }, scope);

    return () => mm.revert();
  }, [options.trigger, ...deps]);
}
