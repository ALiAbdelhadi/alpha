"use client"

import { gsap } from "@/lib/gsap"
import { MOTION } from "@/lib/motion"
import { Slot } from "@radix-ui/react-slot"
import React, { forwardRef, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "default" | "lg"

interface Ripple {
  x: number
  y: number
  id: number
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
  soundEnabled?: boolean
  hapticEnabled?: boolean
  asChild?: boolean
}

function useMergedRef<T>(...refs: (React.Ref<T> | null | undefined)[]) {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<T>).current = node
      })
    },
    refs
  )
}

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "default",
      soundEnabled = false,
      hapticEnabled = true,
      asChild = false,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const mergedRef = useMergedRef(internalRef, forwardedRef)

    const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
    const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
    const prefersReducedMotion = useSyncExternalStore(
      subscribeToReducedMotion,
      getReducedMotionPreference,
      () => false
    )
    const [isPressed, setIsPressed] = useState(false)
    const [ripples, setRipples] = useState<Ripple[]>([])

    const Comp = asChild ? Slot : "button"

    useEffect(() => {
      if (!internalRef.current || prefersReducedMotion) return
      xTo.current = gsap.quickTo(internalRef.current, "x", {
        duration: MOTION.duration.magnetic,
        ease: MOTION.ease.smooth,
      })
      yTo.current = gsap.quickTo(internalRef.current, "y", {
        duration: MOTION.duration.magnetic,
        ease: MOTION.ease.smooth,
      })
    }, [prefersReducedMotion])

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!internalRef.current || !xTo.current || !yTo.current || prefersReducedMotion) return
      const rect = internalRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      xTo.current(x * 0.15)
      yTo.current(y * 0.15)
    }

    const handleMouseLeave = () => {
      if (!xTo.current || !yTo.current || prefersReducedMotion) return
      xTo.current(0)
      yTo.current(0)
      setIsPressed(false)
    }

    const handleMouseDown = () => { if (!prefersReducedMotion) setIsPressed(true) }
    const handleMouseUp = () => setIsPressed(false)

    const playClickSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.frequency.value = 800
        oscillator.type = "sine"
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.warn("Audio playback failed:", error)
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!internalRef.current) return
      const rect = internalRef.current.getBoundingClientRect()
      const rippleId = Date.now()
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== rippleId)), 600)
      if (hapticEnabled && "vibrate" in navigator) {
        try { navigator.vibrate(10) } catch (e) { console.warn("Haptic failed:", e) }
      }
      if (soundEnabled) playClickSound()
      onClick?.(e)
    }

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md",
      secondary: "bg-transparent text-primary/85 border border-foreground/40 hover:bg-foreground/5 hover:border-foreground/60",
      ghost: "bg-transparent text-primary/75 hover:bg-foreground/5 border border-transparent",
    }

    const sizes: Record<ButtonSize, string> = {
      default: "min-h-11 min-w-11 px-6 py-2.5 text-sm",
      lg: "min-h-11 min-w-11 px-8 py-3.5 text-base",
    }

    return (
      <Comp
        ref={mergedRef}
        onClick={handleClick}
        onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
        onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
        onMouseDown={prefersReducedMotion ? undefined : handleMouseDown}
        onMouseUp={prefersReducedMotion ? undefined : handleMouseUp}
        className={`
          relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium
          transition-all duration-300 ease-out will-change-transform
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/50
          ${variants[variant]}
          ${sizes[size]}
          ${isPressed && !prefersReducedMotion ? "scale-95" : "scale-100"}
          ${className}
        `}
        style={{ transform: "translate3d(0px, 0px, 0)", contain: "layout style paint" }}
        data-cursor-pointer
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        {!prefersReducedMotion && ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-current opacity-30 animate-ripple"
            style={{ left: ripple.x, top: ripple.y, width: "10px", height: "10px", transform: "translate(-50%, -50%)" }}
          />
        ))}
      </Comp>
    )
  }
)

MagneticButton.displayName = "MagneticButton"