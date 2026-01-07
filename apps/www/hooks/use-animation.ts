"use client"

import { useLoading } from "@/components/providers/loading-provider"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { RefObject, useEffect, useMemo, useRef } from "react"

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

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

const getInitialState = (
  direction: AnimationDirection,
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

export function useReveal<T extends HTMLElement = HTMLDivElement>(
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
  } = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config])

  useEffect(() => {
    const element = ref.current
    if (!element || !isInitialLoadComplete) return

    if (prefersReducedMotion()) {
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

export function useBatchReveal<T extends HTMLElement = HTMLDivElement>(
  config: BatchAnimationConfig
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { isInitialLoadComplete } = useLoading()

  const {
    targets,
    direction = DEFAULT_CONFIG.direction,
    delay = DEFAULT_CONFIG.delay,
    duration = DEFAULT_CONFIG.duration,
    distance = DEFAULT_CONFIG.distance,
    ease = DEFAULT_CONFIG.ease,
    start = DEFAULT_CONFIG.start,
    once = DEFAULT_CONFIG.once,
    stagger = 0.1,
    alternate = false,
    markers,
  } = config

  useEffect(() => {
    const container = ref.current
    if (!container || !isInitialLoadComplete) return

    const elements = container.querySelectorAll(targets)
    if (!elements.length) return

    if (prefersReducedMotion()) {
      gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    const triggers: ScrollTrigger[] = []

    elements.forEach((element, index) => {
      const itemDirection = alternate && index % 2 === 1
        ? (direction === "left" ? "right" : direction === "right" ? "left" : direction)
        : direction

      const initialState = getInitialState(itemDirection, distance)
      gsap.set(element, initialState)

      const animation = gsap.to(element, {
        ...getTargetState(),
        duration,
        delay: delay + (index * stagger),
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
          markers: markers && process.env.NODE_ENV === "development",
          once,
        },
      })

      const trigger = animation.scrollTrigger
      if (trigger) triggers.push(trigger)
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [isInitialLoadComplete, targets, direction, delay, duration, distance, ease, start, once, stagger, alternate, markers])

  return ref
}

export const animationPresets = {
  fadeUp: (delay = 0): AnimationConfig => ({
    direction: "up",
    duration: 0.6,
    distance: 30,
    delay,
  }),

  slideLeft: (delay = 0): AnimationConfig => ({
    direction: "left",
    duration: 0.7,
    distance: 50,
    delay,
  }),

  slideRight: (delay = 0): AnimationConfig => ({
    direction: "right",
    duration: 0.7,
    distance: 50,
    delay,
  }),

  scaleIn: (delay = 0): AnimationConfig => ({
    direction: "scale",
    duration: 0.5,
    delay,
  }),

  fade: (delay = 0): AnimationConfig => ({
    direction: "fade",
    duration: 0.6,
    delay,
  }),
} as const