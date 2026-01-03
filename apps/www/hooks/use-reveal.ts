"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function useReveal(_threshold = 0.3) {
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated.current) return

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 30,
    })

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        once: true,
      },
    })

    const trigger = animation.scrollTrigger

    return () => {
      animation.kill()
      if (trigger) trigger.kill()
    }
  }, [])

  return { ref }
}
