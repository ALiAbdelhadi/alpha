// lib/motion/hooks/use-text.ts
// ─────────────────────────────────────────────────────────────
// Text reveal animation with word/line splitting.
// Replaces: useText from old system.
//
// Key behavior:
// - byWord: splits text nodes only → preserves <em>, <span>, etc.
// - byLine: splits on <br /> tags → preserves inline markup per line
// - default: animates the element as a whole (same as useReveal)
// ─────────────────────────────────────────────────────────────

"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { RefObject, useRef } from "react"
import { MOTION } from "../config"
import { splitIntoLines, splitIntoWords } from "../utils/splite"


export interface TextConfig {
    delay?: number
    duration?: number
    stagger?: number
    distance?: number
    ease?: string
    trigger?: string
    once?: boolean
    byWord?: boolean
    byLine?: boolean
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
    byWord: false,
    byLine: false,
    blur: true,
}

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
        byWord = DEFAULTS.byWord,
        byLine = DEFAULTS.byLine,
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
                    gsap.set(el, { opacity: 1, y: 0, filter: "none" })
                    return
                }

                // ── Resolve targets ──────────────────────────────────
                let targets: Element[]

                const alreadySplit = el.hasAttribute("data-m-split")

                if (!alreadySplit) {
                    el.setAttribute("data-m-split", byWord ? "word" : byLine ? "line" : "none")

                    if (byWord) targets = splitIntoWords(el)
                    else if (byLine) targets = splitIntoLines(el)
                    else targets = [el]
                } else {
                    const splitType = el.getAttribute("data-m-split")
                    if (splitType === "word") targets = Array.from(el.querySelectorAll(".m-word"))
                    else if (splitType === "line") targets = Array.from(el.querySelectorAll(".m-line"))
                    else targets = [el]
                }

                // ── Initial state ────────────────────────────────────
                gsap.set(targets, {
                    opacity: 0,
                    y: distance,
                    willChange: "transform, opacity",
                    ...(blur && { filter: "blur(8px)" }),
                })

                // ── Animate ──────────────────────────────────────────
                gsap.to(targets, {
                    opacity: 1,
                    y: 0,
                    ...(blur && { filter: "blur(0px)" }),
                    duration,
                    stagger,
                    delay,
                    ease,
                    scrollTrigger: {
                        trigger: el,
                        start: trigger,
                        once,
                        toggleActions: once ? "play none none none" : "play none none reverse",
                    },
                    onComplete() {
                        gsap.set(targets, { willChange: "auto" })
                    },
                })
            },
        )

        return () => mm.revert()
    }, [isInitialLoadComplete, delay, duration, stagger, distance, ease, trigger, once, byWord, byLine, blur])

    return ref
}