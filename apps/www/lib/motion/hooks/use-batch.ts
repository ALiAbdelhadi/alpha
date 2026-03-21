"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { RefObject, useRef } from "react"
import { MOTION } from "../config"
import { RevealDirection } from "./use-reveal"

export interface BatchConfig {
    direction?: RevealDirection
    delay?: number
    duration?: number
    distance?: number
    stagger?: number
    ease?: string
    trigger?: string
    once?: boolean
    selector?: string   
    alternate?: boolean 
}

const DEFAULTS = {
    direction: "up" as RevealDirection,
    delay: 0,
    duration: MOTION.duration.base,
    distance: MOTION.distance.md,
    stagger: MOTION.stagger.base,
    ease: MOTION.ease.smooth,
    trigger: MOTION.trigger.default,
    once: true,
    selector: "",
    alternate: false,
} as const

export function useBatch<T extends HTMLElement = HTMLDivElement>(
    config: BatchConfig = {},
): RefObject<T | null> {
    const ref = useRef<T | null>(null)
    const { isInitialLoadComplete } = useLoading()

    const {
        direction = DEFAULTS.direction,
        delay = DEFAULTS.delay,
        duration = DEFAULTS.duration,
        distance = DEFAULTS.distance,
        stagger = DEFAULTS.stagger,
        ease = DEFAULTS.ease,
        trigger = DEFAULTS.trigger,
        once = DEFAULTS.once,
        selector = DEFAULTS.selector,
        alternate = DEFAULTS.alternate,
    } = config

    useIsomorphicLayoutEffect(() => {
        const container = ref.current
        if (!container || !isInitialLoadComplete) return

        const items = selector
            ? Array.from(container.querySelectorAll<HTMLElement>(selector))
            : Array.from(container.children) as HTMLElement[]

        if (!items.length) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                reduced: "(prefers-reduced-motion: reduce)",
            },
            (ctx) => {
                const { reduced } = ctx.conditions as { reduced: boolean }

                if (reduced) {
                    gsap.set(items, { opacity: 1, x: 0, y: 0, scale: 1 })
                    return
                }

                items.forEach((item, i) => {
                    // Alternate direction: odd items come from opposite side
                    const itemDir: RevealDirection =
                        alternate && i % 2 === 1
                            ? direction === "left" ? "right"
                                : direction === "right" ? "left"
                                    : direction
                            : direction

                    const from: gsap.TweenVars = { opacity: 0 }
                    if (itemDir === "up") from.y = distance
                    if (itemDir === "down") from.y = -distance
                    if (itemDir === "left") from.x = distance
                    if (itemDir === "right") from.x = -distance
                    if (itemDir === "scale") from.scale = 0.95

                    gsap.set(item, { ...from, willChange: "transform, opacity" })

                    gsap.to(item, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration,
                        delay: delay + i * stagger,
                        ease,
                        scrollTrigger: {
                            trigger: item,
                            start: trigger,
                            once,
                            toggleActions: once ? "play none none none" : "play none none reverse",
                        },
                        onComplete() {
                            gsap.set(item, { willChange: "auto" })
                        },
                    })
                })
            },
        )

        return () => mm.revert()
    }, [isInitialLoadComplete, direction, delay, duration, distance, stagger, ease, trigger, once, selector, alternate])

    return ref
}