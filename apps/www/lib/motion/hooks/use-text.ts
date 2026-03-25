// lib/motion/hooks/use-text.ts
// ─────────────────────────────────────────────────────────────
// Text reveal animation with word/char/line splitting.
//
// Arabic-aware:
//   - Detects RTL content via autoSplit()
//   - Suppresses blur on Arabic (both visually wrong AND GPU-heavy)
//   - Uses y-distance reveal for RTL; x-distance (ltr-aware) for Latin
//
// Performance:
//   - willChange set immediately before animate, cleared onComplete
//   - No blur on RTL targets
//   - stagger values are capped for large char arrays
// ─────────────────────────────────────────────────────────────

"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { RefObject, useRef } from "react"
import { MOTION } from "../config"
import { autoSplit } from "../utils/splite"

export interface TextConfig {
    delay?: number
    duration?: number
    stagger?: number
    distance?: number
    ease?: string
    trigger?: string
    once?: boolean
    /** Split strategy: "char" (default), "word", or "line" */
    splitBy?: "char" | "word" | "line"
    /** Apply blur to Latin text (ignored automatically for Arabic) */
    blur?: boolean
}

const DEFAULTS: Required<TextConfig> = {
    delay: 0,
    duration: MOTION.duration.text,
    stagger: MOTION.stagger.base,
    distance: MOTION.distance.md,
    ease: MOTION.ease.text,
    trigger: MOTION.trigger.default,
    once: true,
    splitBy: "word",
    blur: true,
}

// Maximum stagger before capping — prevents long char arrays (80+ chars)
// from creating a 4-second animation tail.
const MAX_TOTAL_STAGGER_DURATION = 0.6 // seconds

export function useText<T extends HTMLElement = HTMLHeadingElement>(
    config: TextConfig = {},
): RefObject<T | null> {
    const ref = useRef<T | null>(null)
    const { isInitialLoadComplete } = useLoading()

    const {
        delay = DEFAULTS.delay,
        duration = DEFAULTS.duration,
        stagger = DEFAULTS.stagger,
        distance = DEFAULTS.distance,
        ease = DEFAULTS.ease,
        trigger = DEFAULTS.trigger,
        once = DEFAULTS.once,
        splitBy = DEFAULTS.splitBy,
        blur = DEFAULTS.blur,
    } = config

    useIsomorphicLayoutEffect(() => {
        const el = ref.current
        if (!el || !isInitialLoadComplete) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                reduced: "(prefers-reduced-motion: reduce)",
            },
            (ctx) => {
                const { reduced } = ctx.conditions as { reduced: boolean }

                if (reduced) {
                    gsap.set(el, { opacity: 1, y: 0, x: 0, filter: "none" })
                    return
                }

                // ── Split (idempotent via data-m-split guard) ────────────────
                let targets: Element[]
                let isRTL = false
                let canBlur = blur

                const alreadySplit = el.hasAttribute("data-m-split")

                if (!alreadySplit) {
                    el.setAttribute("data-m-split", splitBy)
                    const result = autoSplit(el, splitBy)
                    targets = result.targets
                    isRTL = result.isRTL
                    canBlur = blur && result.canBlur
                } else {
                    const splitType = el.getAttribute("data-m-split")
                    const selector =
                        splitType === "char" ? ".m-char"
                            : splitType === "word" ? ".m-word"
                                : ".m-line"
                    targets = Array.from(el.querySelectorAll(selector))
                    // Re-detect RTL from existing content
                    isRTL = targets.some((t) => (t as HTMLElement).dataset.script === "arabic")
                    canBlur = blur && !isRTL
                }

                if (!targets.length) {
                    // Fallback: animate the element as a whole
                    targets = [el]
                }

                // ── Cap stagger for large arrays ─────────────────────────────
                const effectiveStagger =
                    targets.length > 1
                        ? Math.min(stagger, MAX_TOTAL_STAGGER_DURATION / targets.length)
                        : stagger

                // ── Initial state ────────────────────────────────────────────
                // For RTL: translate from y only (Arabic text in RTL flow;
                // x-axis movement fights the bidi rendering pipeline)
                const from: gsap.TweenVars = {
                    opacity: 0,
                    y: distance,
                    willChange: "transform, opacity",
                }
                if (canBlur) {
                    from.filter = "blur(6px)"
                }

                gsap.set(targets, from)

                // ── Animate ──────────────────────────────────────────────────
                const animProps: gsap.TweenVars = {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger: { each: effectiveStagger, from: isRTL ? "end" : "start" },
                    delay,
                    ease,
                    scrollTrigger: {
                        trigger: el,
                        start: trigger,
                        once,
                        toggleActions: once ? "play none none none" : "play none none reverse",
                    },
                    onComplete() {
                        // Release GPU resources immediately after animation
                        gsap.set(targets, { clearProps: "willChange,filter" })
                    },
                }

                if (canBlur) {
                    animProps.filter = "blur(0px)"
                }

                gsap.to(targets, animProps)
            },
        )

        return () => mm.revert()
    }, [isInitialLoadComplete, delay, duration, stagger, distance, ease, trigger, once, splitBy, blur])

    return ref
}