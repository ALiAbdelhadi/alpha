"use client";

import { useLoading } from "@/components/providers/loading-provider";
import { MOTION } from "@/lib/motion/config";
import { useEffect, useRef } from "react";

export function HeroMotionClient() {
  const { isInitialLoadComplete } = useLoading();
  const cleanupRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (!isInitialLoadComplete) return;

    let cancelled = false;

    const startDelay = window.setTimeout(async () => {
      if (cancelled) return;

      const root = document.querySelector<HTMLElement>("[data-hero-root]");
      if (!root) return;

      const isRTL = root.hasAttribute("data-hero-rtl");

      const tokens = Array.from(
        root.querySelectorAll<HTMLElement>("[data-token]"),
      );
      const badges = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero-badge]"),
      );
      const sub = root.querySelector<HTMLElement>("[data-hero-sub]");
      const cta = root.querySelector<HTMLElement>("[data-hero-cta]");
      const stats = root.querySelector<HTMLElement>("[data-hero-stats]");
      const scrollHint = root.querySelector<HTMLElement>("[data-hero-scroll]");

      const content = [badges, sub, cta, stats, scrollHint]
        .flat()
        .filter(Boolean);

      if (!tokens.length) return;

      try {
        const { gsap } = await import("@/lib/gsap");
        if (cancelled) return;
        const reduced = window.matchMedia?.(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduced) {
          gsap.set([...tokens, ...content], {
            opacity: 1,
            y: 0,
            filter: "none",
          });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: MOTION.ease.text } });
        if (badges.length) {
          tl.fromTo(
            badges,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.1,
          );
        }

        if (tokens.length) {
          tl.fromTo(
            tokens,
            { opacity: 0, y: isRTL ? 40 : 50, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: { each: 0.06, from: isRTL ? "end" : "start" },
              ease: "power4.out",
              onComplete() {
                gsap.set(tokens, { clearProps: "filter,willChange" });
              },
            },
            0.2,
          );
        }

        if (sub) {
          tl.fromTo(
            sub,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.base,
              ease: MOTION.ease.smooth,
            },
            0.55,
          );
        }

        if (cta) {
          tl.fromTo(
            cta,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.7,
          );
        }

        if (stats) {
          tl.fromTo(
            stats,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.8,
          );
        }

        if (scrollHint) {
          tl.fromTo(
            scrollHint,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.fast,
              ease: MOTION.ease.smooth,
            },
            0.95,
          );
        }

        const proof = root.querySelector<HTMLElement>("[data-hero-proof]");
        if (proof) {
          gsap.set(proof, {
            opacity: 0,
            y: 20,
            willChange: "transform, opacity",
          });
          gsap.to(proof, {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            delay: 1.1,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
              trigger: proof,
              start: MOTION.trigger.default,
              once: true,
              toggleActions: "play none none none",
            },
            onComplete() {
              gsap.set(proof, { willChange: "auto" });
            },
          });
        }

        const magneticTargets = root.querySelectorAll<HTMLElement>(
          "[data-magnetic]",
        );
        const magnetCleanups: Array<() => void> = [];

        magneticTargets.forEach((el) => {
          const xTo = gsap.quickTo(el, "x", {
            duration: 0.6,
            ease: "power2.out",
          });
          const yTo = gsap.quickTo(el, "y", {
            duration: 0.6,
            ease: "power2.out",
          });

          const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.15);
            yTo(y * 0.15);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mousemove", handleMouseMove);
          el.addEventListener("mouseleave", handleMouseLeave);
          magnetCleanups.push(() => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
          });
        });

        let scrollCleanup: (() => void) | null = null;
        const scrollDelay = window.setTimeout(() => {
          if (cancelled) return;

          const mm = gsap.matchMedia();
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const scrollProps: gsap.TweenVars = isRTL
              ? {
                  opacity: 0.12,
                  stagger: { each: 0.006, from: "end" as const },
                  ease: "none",
                }
              : {
                  yPercent: -30,
                  opacity: 0.12,
                  stagger: { each: 0.008, from: "end" as const },
                  ease: "none",
                };

            const st = gsap.to(tokens, {
              ...scrollProps,
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            });

            return () => {
              st.scrollTrigger?.kill();
              st.kill();
            };
          });

          scrollCleanup = () => mm.revert();
        }, 1500);

        cleanupRef.current = () => {
          tl.kill();
          window.clearTimeout(scrollDelay);
          scrollCleanup?.();
          magnetCleanups.forEach((fn) => fn());
        };
      } catch (err) {
        console.error("Hero animation failed:", err);
      }
    }, 50);

    return () => {
      cancelled = true;
      window.clearTimeout(startDelay);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [isInitialLoadComplete]);

  return null;
}