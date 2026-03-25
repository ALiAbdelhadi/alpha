import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Injects a temporary style block into the document head.
 */
export function useInjectStyles(id: string, css: string) {
  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(id)) return;
    
    const el = document.createElement("style");
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, css]);
}
