"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

const CURSOR_SIZE = { outer: 32, inner: 8 }
const IDLE_TIMEOUT = 2000
const LERP_FACTOR = 0.15
const MAGNETIC_STRENGTH = 0.3

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [shouldShow, setShouldShow] = useState(false)

  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    currentX: 0,
    currentY: 0,
    isPointer: false,
    isAnimating: false,
    // eslint-disable-next-line react-hooks/purity
    lastMoveTime: Date.now(),
    animationFrameId: null as number | null,
    magneticTarget: null as { x: number; y: number; element: HTMLElement } | null,
  })

  useEffect(() => {
    const checkShouldShow = () => {
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

    const updateCursor = () => {
      const now = Date.now()

      if (now - state.lastMoveTime > IDLE_TIMEOUT) {
        state.isAnimating = false
        state.animationFrameId = null
        return
      }

      let targetX = state.mouseX
      let targetY = state.mouseY

      if (state.magneticTarget) {
        const { x, y } = state.magneticTarget
        const dx = x - state.mouseX
        const dy = y - state.mouseY
        targetX += dx * MAGNETIC_STRENGTH
        targetY += dy * MAGNETIC_STRENGTH
      }

      state.currentX += (targetX - state.currentX) * LERP_FACTOR
      state.currentY += (targetY - state.currentY) * LERP_FACTOR
      const scale = state.isPointer ? 1.5 : 1
      const innerScale = state.isPointer ? 0.5 : 1

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

    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX
      state.mouseY = e.clientY
      state.lastMoveTime = Date.now()

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

      if (!state.isAnimating) {
        state.isAnimating = true
        updateCursor()
      }
    }

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
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-white/10 backdrop-blur-sm mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          width: CURSOR_SIZE.outer,
          height: CURSOR_SIZE.outer,
          willChange: "transform",
          zIndex: 9998,
        }}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 rounded-full bg-foreground mix-blend-difference transition-transform duration-300 ease-out"
        style={{
          width: CURSOR_SIZE.inner,
          height: CURSOR_SIZE.inner,
          willChange: "transform",
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor