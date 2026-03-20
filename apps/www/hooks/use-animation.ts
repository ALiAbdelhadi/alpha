"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { gsap } from "@/lib/gsap"
import { RefObject, useRef } from "react"
import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"

export type AnimationDirection = "up" | "down" | "left" | "right" | "fade" | "scale"

export interface AnimationConfig {
  direction?: AnimationDirection
  delay?: number
  duration?: number
  distance?: number
  ease?: string
  start?: string
  end?: string
  once?: boolean
  scrub?: boolean | number
  stagger?: number
  markers?: boolean
}

export interface BatchAnimationConfig extends AnimationConfig {
  targets: string
  alternate?: boolean
}

export const DEFAULT_CONFIG = {
  direction: "up" as AnimationDirection,
  delay: 0,
  duration: 0.8,
  distance: 40,
  ease: "power3.out",
  start: "top 85%",
  end: "bottom 15%",
  once: true,
} as const

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export const getInitialState = (
  direction: AnimationDirection,
  distance: number,
): gsap.TweenVars => {
  const state: gsap.TweenVars = { opacity: 0 }
  switch (direction) {
    case "up": state.y = distance; break
    case "down": state.y = -distance; break
    case "left": state.x = distance; break
    case "right": state.x = -distance; break
    case "scale": state.scale = 0.95; break
  }
  return state
}

export const getTargetState = (): gsap.TweenVars => ({
  opacity: 1, x: 0, y: 0, scale: 1, visibility: "visible",
})

export function useReveal<T extends HTMLElement = HTMLDivElement>(
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

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    if (!isInitialLoadComplete) {
      gsap.set(element, { opacity: 0, visibility: "hidden" })
      return
    }

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
          visibility: "visible",
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoadComplete, direction, delay, duration, distance, ease, start, end, once, scrub, markers])

  return ref
}

export function useBatchReveal<T extends HTMLElement = HTMLDivElement>(
  config: BatchAnimationConfig,
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { isInitialLoadComplete } = useLoading()

  const targets = config.targets
  const direction = config.direction ?? DEFAULT_CONFIG.direction
  const delay = config.delay ?? DEFAULT_CONFIG.delay
  const duration = config.duration ?? DEFAULT_CONFIG.duration
  const distance = config.distance ?? DEFAULT_CONFIG.distance
  const ease = config.ease ?? DEFAULT_CONFIG.ease
  const start = config.start ?? DEFAULT_CONFIG.start
  const once = config.once ?? DEFAULT_CONFIG.once
  const stagger = config.stagger ?? 0.1
  const alternate = config.alternate ?? false
  const markers = config.markers

  useIsomorphicLayoutEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>(targets)
    if (!elements.length) return

    if (!isInitialLoadComplete) {
      gsap.set(elements, { opacity: 0, visibility: "hidden" })
      return
    }

    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean }

        if (reduced) {
          gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 })
          return
        }

        gsap.set(elements, { visibility: "visible", willChange: "transform, opacity" })

        elements.forEach((element, index) => {
          const itemDirection: AnimationDirection =
            alternate && index % 2 === 1
              ? direction === "left" ? "right"
                : direction === "right" ? "left"
                  : direction
              : direction

          gsap.set(element, getInitialState(itemDirection, distance))

          gsap.to(element, {
            ...getTargetState(),
            duration,
            delay: delay + index * stagger,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: once ? "play none none none" : "play none none reverse",
              once,
              markers: markers && process.env.NODE_ENV === "development",
            },
            onComplete() {
              gsap.set(element, { willChange: "auto" })
            },
          })
        })
      },
    )

    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoadComplete, targets, direction, delay, duration, distance, ease, start, once, stagger, alternate, markers])

  return ref
}

export const animationPresets = {
  fadeUp: (delay = 0): AnimationConfig => ({ direction: "up", duration: 0.6, distance: 30, delay }),
  slideLeft: (delay = 0): AnimationConfig => ({ direction: "left", duration: 0.7, distance: 50, delay }),
  slideRight: (delay = 0): AnimationConfig => ({ direction: "right", duration: 0.7, distance: 50, delay }),
  scaleIn: (delay = 0): AnimationConfig => ({ direction: "scale", duration: 0.5, delay }),
  fade: (delay = 0): AnimationConfig => ({ direction: "fade", duration: 0.6, delay }),
} as const