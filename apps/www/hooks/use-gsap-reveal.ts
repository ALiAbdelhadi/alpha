"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface UseGSAPRevealOptions {
  direction?: "up" | "down" | "left" | "right" | "fade"
  delay?: number
  duration?: number
  start?: string
  once?: boolean
}

export function useGSAPReveal(options: UseGSAPRevealOptions = {}) {
  const {
    direction = "up",
    delay = 0,
    duration = 0.8,
    start = "top 80%",
    once = true,
  } = options

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state based on direction
    const initialState: gsap.TweenVars = { opacity: 0 }
    
    switch (direction) {
      case "up":
        initialState.y = 40
        break
      case "down":
        initialState.y = -40
        break
      case "left":
        initialState.x = 40
        break
      case "right":
        initialState.x = -40
        break
      case "fade":
        // Only opacity
        break
    }

    gsap.set(element, initialState)

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
        once,
      },
    })

    const trigger = animation.scrollTrigger

    return () => {
      animation.kill()
      if (trigger) trigger.kill()
    }
  }, [direction, delay, duration, start, once])

  return ref
}

