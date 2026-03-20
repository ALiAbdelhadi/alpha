"use client"

import { useIsomorphicLayoutEffect } from "@/lib/dom-utils"
import { gsap } from "@/lib/gsap"
import { RefObject, useRef } from "react"
import { useLoading } from "@/components/providers/loading-provider"

// Premium easing curves - inspired by Anthropic's natural, expensive feel
export const EASE = {
  // Main text reveal ease - subtle, natural, premium
  text: "cubic-bezier(0.2, 0, 0, 1)",      // Similar to expo.out - smooth & premium
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",  // power3.out - natural
  gentle: "cubic-bezier(0.65, 0, 0.35, 1)",        // quint.out - very smooth
  ui: "cubic-bezier(0.4, 0, 0.2, 1)",              // Standard UI ease
} as const

export interface TextRevealConfig {
  delay?: number
  duration?: number
  stagger?: number
  threshold?: number  // Intersection percentage (0-1)
  once?: boolean
  byWord?: boolean    // Reveal word by word
  byLine?: boolean    // Reveal line by line
  blur?: boolean      // Add blur effect during reveal
}

const DEFAULT_CONFIG = {
  delay: 0,
  duration: 0.9,
  stagger: 0.03,
  threshold: 0.15,  // Changed from 0.2 to 0.15 - trigger earlier
  once: true,
  blur: true,
  byWord: false,
  byLine: false,
} as const

/**
 * Premium text reveal animation hook
 * Wraps text in spans and animates them with a smooth, natural motion
 * Inspired by Anthropic's text reveal style
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  config: TextRevealConfig = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { isInitialLoadComplete } = useLoading()

  const {
    delay = DEFAULT_CONFIG.delay,
    duration = DEFAULT_CONFIG.duration,
    stagger = DEFAULT_CONFIG.stagger,
    threshold = DEFAULT_CONFIG.threshold,
    once = DEFAULT_CONFIG.once,
    blur = DEFAULT_CONFIG.blur,
    byWord = DEFAULT_CONFIG.byWord,
    byLine = DEFAULT_CONFIG.byLine,
  } = config

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
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
          gsap.set(element, { opacity: 1, y: 0 })
          return
        }

        // Split text into words/lines if needed
        const shouldSplit = byWord || byLine
        let targets: Element[] = [element]

        if (shouldSplit && !element.hasAttribute("data-split-ready")) {
          const text = element.textContent || ""
          element.setAttribute("data-split-ready", "true")

          if (byLine) {
            // Split by lines (for elements with <br />)
            const parts = text.split("\n")
            element.innerHTML = parts
              .map((part, i) => `<span class="text-reveal-line" style="display:block">${part.trim()}</span>`)
              .join("")
            targets = Array.from(element.querySelectorAll(".text-reveal-line"))
          } else if (byWord) {
            // Split by words
            const words = text.split(" ")
            element.innerHTML = words
              .map((word, i) => `<span class="text-reveal-word" style="display:inline-block; white-space:nowrap">${word}${i < words.length - 1 ? " " : ""}</span>`)
              .join("")
            targets = Array.from(element.querySelectorAll(".text-reveal-word"))
          }
        } else if (!shouldSplit) {
          targets = [element]
        } else {
          targets = Array.from(element.querySelectorAll(".text-reveal-word, .text-reveal-line"))
        }

        // Set initial state
        gsap.set(targets, {
          opacity: 0,
          y: 24,
          willChange: "transform, opacity",
          ...(blur && { filter: "blur(8px)" }),
        })

        // Animate
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          ...(blur && { filter: "blur(0px)" }),
          duration,
          stagger,
          delay,
          ease: EASE.text,
          scrollTrigger: {
            trigger: element,
            start: `top ${threshold * 100}%`,
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
  }, [isInitialLoadComplete, delay, duration, stagger, threshold, once, blur, byWord, byLine])

  return ref
}

/**
 * Simplified hook for single-element fade-up animations
 * Perfect for body text, captions, and simple reveals
 */
export function useFadeUp<T extends HTMLElement = HTMLDivElement>(
  config: { delay?: number; duration?: number; distance?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { isInitialLoadComplete } = useLoading()

  const {
    delay = 0,
    duration = 0.7,
    distance = 24,
  } = config

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
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
          gsap.set(element, { opacity: 1, y: 0 })
          return
        }

        gsap.set(element, {
          opacity: 0,
          y: distance,
          willChange: "transform, opacity",
        })

        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
          onComplete() {
            gsap.set(element, { willChange: "auto" })
          },
        })
      },
    )

    return () => mm.revert()
  }, [isInitialLoadComplete, delay, duration, distance])

  return ref
}

/**
 * Hook for revealing multiple elements with stagger
 * Great for lists, cards, or grouped elements
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  config: { delay?: number; duration?: number; stagger?: number; distance?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const { isInitialLoadComplete } = useLoading()

  const {
    delay = 0,
    duration = 0.8,
    stagger = 0.08,
    distance = 32,
  } = config

  useIsomorphicLayoutEffect(() => {
    const container = ref.current
    if (!container || !isInitialLoadComplete) return

    const children = Array.from(container.children) as HTMLElement[]
    if (!children.length) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean }

        if (reduced) {
          gsap.set(children, { opacity: 1, y: 0 })
          return
        }

        gsap.set(children, {
          opacity: 0,
          y: distance,
          willChange: "transform, opacity",
        })

        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
          onComplete() {
            gsap.set(children, { willChange: "auto" })
          },
        })
      },
    )

    return () => mm.revert()
  }, [isInitialLoadComplete, delay, duration, stagger, distance])

  return ref
}
