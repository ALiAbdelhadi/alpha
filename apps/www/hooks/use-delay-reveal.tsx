"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { gsap } from "@/lib/gsap"
import { RefObject, useLayoutEffect, useRef } from "react"
import {
    DEFAULT_CONFIG,
    getInitialState,
    getTargetState,
    type AnimationConfig,
} from "./use-animation"

export function useDelayedReveal<T extends HTMLElement = HTMLDivElement>(
    config: AnimationConfig = {},
): RefObject<T | null> {
    const ref = useRef<T | null>(null)
    const { isInitialLoadComplete } = useLoading()

    const direction = config.direction ?? DEFAULT_CONFIG.direction
    const delay = config.delay ?? DEFAULT_CONFIG.delay
    const duration = config.duration ?? DEFAULT_CONFIG.duration
    const distance = config.distance ?? DEFAULT_CONFIG.distance
    const ease = config.ease ?? DEFAULT_CONFIG.ease
    const start = config.start ?? DEFAULT_CONFIG.start
    const end = config.end ?? DEFAULT_CONFIG.end
    const once = config.once ?? DEFAULT_CONFIG.once
    const scrub = config.scrub
    const markers = config.markers

    useLayoutEffect(() => {
        const element = ref.current
        // Gate: do nothing until loader exits (no interim opacity:1 set)
        if (!element || !isInitialLoadComplete) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                reduced: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { reduced } = context.conditions as { reduced: boolean }

                if (reduced) {
                    gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 })
                    return
                }

                gsap.set(element, {
                    ...getInitialState(direction, distance),
                    willChange: "transform, opacity",
                })

                gsap.to(element, {
                    ...getTargetState(),
                    duration,
                    delay,
                    ease,
                    scrollTrigger: {
                        trigger: element,
                        start,
                        end,
                        once,
                        toggleActions: once ? "play none none none" : "play none none reverse",
                        scrub,
                        markers: markers && process.env.NODE_ENV === "development",
                    },
                    onComplete() {
                        gsap.set(element, { willChange: "auto" })
                    },
                })
            },
        )

        return () => mm.revert()
    }, [isInitialLoadComplete, direction, delay, duration, distance, ease, start, end, once, scrub, markers])

    return ref
}