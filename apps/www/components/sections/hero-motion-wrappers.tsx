"use client";

import { useReveal } from "@/lib/motion/hooks/use-reveal";
import { useText } from "@/lib/motion/hooks/use-text";
import { useBatch } from "@/lib/motion/hooks/use-batch";
import { motion } from "@/lib/motion/utils/presets";
import { ReactNode } from "react";

export function HeroHeadline({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useText<HTMLDivElement>(motion.heroHeadline());
  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}

export function HeroReveal({ children, className, delay = 0, distance }: { children: ReactNode; className?: string; delay?: number; distance?: number }) {
  const ref = useReveal<HTMLDivElement>(motion.fadeUp({ delay, distance }));
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function HeroBatch({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useBatch<HTMLDivElement>(motion.listItems({ delay }));
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
