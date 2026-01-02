"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

/**
 * CustomCursor - Optional enhancement that respects accessibility preferences
 * Only shows on desktop with mouse, respects prefers-reduced-motion
 */
export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isPointerRef = useRef(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Check if custom cursor should be enabled
    const checkShouldShow = () => {
      // Don't show on mobile/touch devices
      if (window.matchMedia('(pointer: coarse)').matches) {
        return false
      }
      // Don't show if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false
      }
      // Only show on devices with fine pointer (mouse)
      return window.matchMedia('(pointer: fine)').matches
    }

    setShouldShow(checkShouldShow())

    // Listen for changes
    const mediaQueries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]

    const handleChange = () => {
      setShouldShow(checkShouldShow())
    }

    mediaQueries.forEach((mq) => mq.addEventListener('change', handleChange))

    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener('change', handleChange))
    }
  }, [])

  useEffect(() => {
    if (!shouldShow || !outerRef.current || !innerRef.current) return

    const outer = outerRef.current
    const inner = innerRef.current

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animationFrameId: number

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.15
      currentY += (mouseY - currentY) * 0.15

      const scale = isPointerRef.current ? 1.5 : 1
      const innerScale = isPointerRef.current ? 0.5 : 1

      gsap.set(outer, {
        x: currentX,
        y: currentY,
        scale,
      })

      gsap.set(inner, {
        x: currentX,
        y: currentY,
        scale: innerScale,
      })

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement
      const isPointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null

      if (isPointer !== isPointerRef.current) {
        isPointerRef.current = isPointer
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    updateCursor()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [shouldShow])

  // Don't render if should not show
  if (!shouldShow) return null

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-foreground/10 backdrop-blur-sm mix-blend-difference transition-transform duration-300 ease-out"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference transition-transform duration-300 ease-out"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  )
}
