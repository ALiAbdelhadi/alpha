"use client"

/**
 * ULTRA-OPTIMIZED CUSTOM CURSOR
 * 
 * Performance Improvements:
 * 1. ✅ RAF only runs when cursor moves (idle detection)
 * 2. ✅ GPU-accelerated transforms (will-change, transform3d)
 * 3. ✅ Efficient pointer detection (event delegation)
 * 4. ✅ Memory-efficient cleanup
 * 5. ✅ Respects reduced motion
 * 6. ✅ Proper device detection
 * 7. ✅ Magnetic effect for interactive elements
 */

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

// Constants
const CURSOR_SIZE = { outer: 32, inner: 8 }
const IDLE_TIMEOUT = 2000 // Stop animation after 2s of no movement
const LERP_FACTOR = 0.15 // Smooth follow speed
const MAGNETIC_STRENGTH = 0.3 // Magnetic pull strength

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [shouldShow, setShouldShow] = useState(false)
  
  // Animation state
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    currentX: 0,
    currentY: 0,
    isPointer: false,
    isAnimating: false,
    lastMoveTime: Date.now(),
    animationFrameId: null as number | null,
    magneticTarget: null as { x: number; y: number; element: HTMLElement } | null,
  })

  useEffect(() => {
    const checkShouldShow = () => {
      // Only show on desktop with fine pointer
      if (window.matchMedia('(pointer: coarse)').matches) return false
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return window.matchMedia('(pointer: fine)').matches
    }

    setShouldShow(checkShouldShow())

    const mediaQueries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]

    const handleChange = () => setShouldShow(checkShouldShow())
    mediaQueries.forEach((mq) => mq.addEventListener('change', handleChange))

    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener('change', handleChange))
    }
  }, [])

  useEffect(() => {
    if (!shouldShow || !outerRef.current || !innerRef.current) return

    const outer = outerRef.current
    const inner = innerRef.current
    const state = stateRef.current

    /**
     * Update cursor position with lerp smoothing
     */
    const updateCursor = () => {
      const now = Date.now()
      
      // Stop animating if idle for too long
      if (now - state.lastMoveTime > IDLE_TIMEOUT) {
        state.isAnimating = false
        state.animationFrameId = null
        return
      }

      // Calculate target position
      let targetX = state.mouseX
      let targetY = state.mouseY

      // Apply magnetic effect if hovering interactive element
      if (state.magneticTarget) {
        const { x, y } = state.magneticTarget
        const dx = x - state.mouseX
        const dy = y - state.mouseY
        targetX += dx * MAGNETIC_STRENGTH
        targetY += dy * MAGNETIC_STRENGTH
      }

      // Lerp for smooth following
      state.currentX += (targetX - state.currentX) * LERP_FACTOR
      state.currentY += (targetY - state.currentY) * LERP_FACTOR

      // GPU-accelerated transform
      const scale = state.isPointer ? 1.5 : 1
      const innerScale = state.isPointer ? 0.5 : 1

      // Use transform3d for GPU acceleration
      gsap.set(outer, {
        x: state.currentX,
        y: state.currentY,
        scale,
        force3D: true,
      })

      gsap.set(inner, {
        x: state.currentX,
        y: state.currentY,
        scale: innerScale,
        force3D: true,
      })

      state.animationFrameId = requestAnimationFrame(updateCursor)
    }

    /**
     * Handle mouse move with magnetic effect
     */
    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX
      state.mouseY = e.clientY
      state.lastMoveTime = Date.now()

      // Find magnetic target
      const target = e.target as HTMLElement
      const magneticElement = target.closest('[data-magnetic]') as HTMLElement
      
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect()
        state.magneticTarget = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          element: magneticElement,
        }
      } else {
        state.magneticTarget = null
      }

      // Check if pointer
      const isPointer =
        target.hasAttribute('data-cursor-pointer') ||
        target.closest('[data-cursor-pointer]') !== null ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null

      if (isPointer !== state.isPointer) {
        state.isPointer = isPointer
      }

      // Start animation if not already running
      if (!state.isAnimating) {
        state.isAnimating = true
        updateCursor()
      }
    }

    // Add event listener with passive flag
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (state.animationFrameId !== null) {
        cancelAnimationFrame(state.animationFrameId)
      }
    }
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-white/10 backdrop-blur-sm mix-blend-difference    transition-transform duration-300 ease-out"
        style={{
          width: CURSOR_SIZE.outer,
          height: CURSOR_SIZE.outer,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
        aria-hidden="true"
      />
      
      {/* Inner cursor dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference   transition-transform duration-300 ease-out"
        style={{
          width: CURSOR_SIZE.inner,
          height: CURSOR_SIZE.inner,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor