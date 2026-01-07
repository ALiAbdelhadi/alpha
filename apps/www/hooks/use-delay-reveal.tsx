"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { gsap } from "@/lib/gsap"
import { RefObject, useEffect, useRef } from "react"
import type { AnimationConfig } from "./use-animation"

const DEFAULT_CONFIG: Required<Omit<AnimationConfig, "stagger" | "scrub" | "markers">> = {
    direction: "up",
    delay: 0,
    duration: 0.8,
    distance: 40,
    ease: "power3.out",
    start: "top 85%",
    end: "bottom 15%",
    once: true,
}

const getInitialState = (
    direction: AnimationConfig["direction"],
    distance: number
): gsap.TweenVars => {
    const state: gsap.TweenVars = { opacity: 0 }

    switch (direction) {
        case "up":
            state.y = distance
            break
        case "down":
            state.y = -distance
            break
        case "left":
            state.x = distance
            break
        case "right":
            state.x = -distance
            break
        case "scale":
            state.scale = 0.95
            break
        case "fade":
            break
    }

    return state
}

const getTargetState = (): gsap.TweenVars => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
})

/**
 * Custom hook that delays animations until initial loader is complete
 */
export function useDelayedReveal<T extends HTMLElement = HTMLDivElement>(
    config: AnimationConfig = {}
): RefObject<T | null> {
    const ref = useRef<T | null>(null)
    const { isInitialLoadComplete } = useLoading()

    const {
        direction,
        delay,
        duration,
        distance,
        ease,
        start,
        end,
        once,
        scrub,
        markers,
    } = { ...DEFAULT_CONFIG, ...config }

    useEffect(() => {
        const element = ref.current
        if (!element || !isInitialLoadComplete) return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 })
            return
        }

        const initialState = getInitialState(direction, distance)
        gsap.set(element, initialState)

        const animation = gsap.to(element, {
            ...getTargetState(),
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start,
                end,
                toggleActions: once ? "play none none none" : "play none none reverse",
                scrub,
                markers: markers && process.env.NODE_ENV === "development",
                once,
            },
        })

        return () => {
            animation.scrollTrigger?.kill()
            animation.kill()
        }
    }, [isInitialLoadComplete, direction, delay, duration, distance, ease, start, end, once, scrub, markers])

    return ref
}