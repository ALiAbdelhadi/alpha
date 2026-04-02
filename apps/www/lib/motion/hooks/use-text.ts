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
    splitBy?: "char" | "word" | "line"
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
                    isRTL = targets.some((t) => (t as HTMLElement).dataset.script === "arabic")
                    canBlur = blur && !isRTL
                }

                if (!targets.length) {
                    targets = [el]
                }

                const effectiveStagger =
                    targets.length > 1
                        ? Math.min(stagger, MAX_TOTAL_STAGGER_DURATION / targets.length)
                        : stagger

                const from: gsap.TweenVars = {
                    opacity: 0,
                    y: distance,
                    willChange: "transform, opacity",
                }
                if (canBlur) {
                    from.filter = "blur(6px)"
                }

                gsap.set(targets, from)

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
