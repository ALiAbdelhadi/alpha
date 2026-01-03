"use client"

/**
 * Unified Animation Hook
 * 
 * Single source of truth for all scroll-triggered animations.
 * Replaces use-gsap-reveal.ts and use-reveal.ts with a more powerful,
 * consistent, and maintainable solution.
 * 
 * Features:
 * - Respects prefers-reduced-motion
 * - Consistent timing and easing
 * - Batch animations support
 * - Performance optimized
 */

import { useEffect, useRef, RefObject } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// ============================================================================
// TYPES
// ============================================================================

export type AnimationDirection = "up" | "down" | "left" | "right" | "fade" | "scale"

export interface AnimationConfig {
  /** Animation direction */
  direction?: AnimationDirection
  
  /** Delay before animation starts (seconds) */
  delay?: number
  
  /** Animation duration (seconds) */
  duration?: number
  
  /** Distance to travel for directional animations (pixels) */
  distance?: number
  
  /** GSAP easing function */
  ease?: string
  
  /** ScrollTrigger start position */
  start?: string
  
  /** ScrollTrigger end position */
  end?: string
  
  /** Whether to run animation only once */
  once?: boolean
  
  /** Whether animation should scrub with scroll */
  scrub?: boolean | number
  
  /** Stagger timing for batch animations (seconds) */
  stagger?: number
  
  /** ScrollTrigger markers (dev only) */
  markers?: boolean
}

export interface BatchAnimationConfig extends AnimationConfig {
  /** Target elements selector */
  targets: string
  
  /** Alternating pattern for batch animations */
  alternate?: boolean
}

// ============================================================================
// DEFAULTS
// ============================================================================

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

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Get initial animation state based on direction
 */
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
      // Only opacity
      break
  }

  return state
}

/**
 * Get animation target state
 */
const getTargetState = (): gsap.TweenVars => ({
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
})

// ============================================================================
// HOOKS
// ============================================================================

/**
 * useReveal - Primary animation hook for scroll-triggered reveals
 * 
 * @example
 * const ref = useReveal({ direction: 'up', delay: 0.2 })
 * return <div ref={ref}>Animated content</div>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  config: AnimationConfig = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
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
    if (!element) return

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    // Set initial state
    const initialState = getInitialState(direction, distance)
    gsap.set(element, initialState)

    // Create animation
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
  }, [direction, delay, duration, distance, ease, start, end, once, scrub, markers])

  return ref
}

/**
 * useBatchReveal - Animate multiple child elements
 * 
 * @example
 * const containerRef = useBatchReveal({
 *   targets: '[data-card]',
 *   direction: 'up',
 *   stagger: 0.1,
 *   alternate: true
 * })
 */
export function useBatchReveal<T extends HTMLElement = HTMLDivElement>(
  config: BatchAnimationConfig
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
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
    if (!container) return

    const elements = container.querySelectorAll(targets)
    if (!elements.length) return

    if (prefersReducedMotion()) {
      gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    const triggers: ScrollTrigger[] = []

    elements.forEach((element, index) => {
      // Alternate direction for even/odd items
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
  }, [targets, direction, delay, duration, distance, ease, start, once, stagger, alternate, markers])

  return ref
}

/**
 * useSequence - Choreograph multiple animations in sequence
 * 
 * Note: This hook requires refs to be passed from the component.
 * For simpler use cases, use useReveal with individual refs.
 * 
 * @example
 * const ref1 = useRef<HTMLDivElement>(null)
 * const ref2 = useRef<HTMLDivElement>(null)
 * useSequence([ref1, ref2], [
 *   { direction: 'up', duration: 0.6 },
 *   { direction: 'left', duration: 0.8, delay: 0.2 },
 * ])
 */
export function useSequence(
  refs: RefObject<HTMLElement | null>[],
  animations: AnimationConfig[]
): {
  play: () => void
} {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const allElements = refs
      .map((r) => r.current)
      .filter((el): el is HTMLElement => el !== null)
    
    if (allElements.length !== animations.length) return

    if (prefersReducedMotion()) {
      gsap.set(allElements, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    animations.forEach((config, index) => {
      const element = allElements[index]
      if (!element) return

      const {
        direction = DEFAULT_CONFIG.direction,
        duration = DEFAULT_CONFIG.duration,
        distance = DEFAULT_CONFIG.distance,
        ease = DEFAULT_CONFIG.ease,
        delay = 0,
      } = config

      const initialState = getInitialState(direction, distance)
      gsap.set(element, initialState)

      tl.to(
        element,
        {
          ...getTargetState(),
          duration,
          ease,
        },
        delay
      )
    })

    return () => {
      tl.kill()
    }
  }, [refs, animations])

  const play = () => {
    timelineRef.current?.play()
  }

  return {
    play,
  }
}

// ============================================================================
// PRESET CONFIGS
// ============================================================================

/**
 * Common animation presets for quick use
 */
export const animationPresets = {
  /** Quick fade in from below */
  fadeUp: (delay = 0): AnimationConfig => ({
    direction: "up",
    duration: 0.6,
    distance: 30,
    delay,
  }),

  /** Slide in from left */
  slideLeft: (delay = 0): AnimationConfig => ({
    direction: "left",
    duration: 0.7,
    distance: 50,
    delay,
  }),

  /** Slide in from right */
  slideRight: (delay = 0): AnimationConfig => ({
    direction: "right",
    duration: 0.7,
    distance: 50,
    delay,
  }),

  /** Gentle scale up */
  scaleIn: (delay = 0): AnimationConfig => ({
    direction: "scale",
    duration: 0.5,
    delay,
  }),

  /** Simple fade (no movement) */
  fade: (delay = 0): AnimationConfig => ({
    direction: "fade",
    duration: 0.6,
    delay,
  }),
} as const

