"use client"

import { gsap } from "@/lib/gsap"
import type React from "react"
import { useEffect, useRef, useState } from "react"

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
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  soundEnabled = false,
  hapticEnabled = true,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    xTo.current = gsap.quickTo(ref.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    })
    yTo.current = gsap.quickTo(ref.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    })
  }, [prefersReducedMotion])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !xTo.current || !yTo.current || prefersReducedMotion) return

    const rect = ref.current.getBoundingClientRect()
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

  const handleMouseDown = () => {
    if (!prefersReducedMotion) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const playClickSound = () => {
    try {
      // يمكنك استبدال هذا بملف صوتي حقيقي
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
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
    if (!ref.current) return

    // إضافة Ripple effect
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rippleId = Date.now()

    setRipples((prev) => [...prev, { x, y, id: rippleId }])

    // حذف الـ ripple بعد انتهاء الأنيميشن
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleId))
    }, 600)

    // Haptic feedback للموبايل
    if (hapticEnabled && "vibrate" in navigator) {
      try {
        navigator.vibrate(10)
      } catch (error) {
        console.warn("Haptic feedback failed:", error)
      }
    }

    // تشغيل الصوت (اختياري)
    if (soundEnabled) {
      playClickSound()
    }

    // استدعاء onClick الأصلي
    if (onClick) {
      onClick(e)
    }
  }

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md",
    secondary:
      "bg-foreground/5 text-primary hover:bg-foreground/10 backdrop-blur-xl border border-foreground/10 hover:border-foreground/20",
    ghost: "bg-transparent text-primary hover:bg-foreground/5 backdrop-blur-sm",
  }

  const sizes: Record<ButtonSize, string> = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      onMouseDown={prefersReducedMotion ? undefined : handleMouseDown}
      onMouseUp={prefersReducedMotion ? undefined : handleMouseUp}
      className={`
        relative overflow-hidden rounded-full font-medium
        transition-all duration-300 ease-out will-change-transform
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/50
        ${variants[variant]}
        ${sizes[size]}
        ${isPressed && !prefersReducedMotion ? "scale-95" : "scale-100"}
        ${className}
      `}
      style={{
        transform: "translate3d(0px, 0px, 0)",
        contain: "layout style paint",
      }}
      data-cursor-pointer
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Ripple Effects */}
      {!prefersReducedMotion &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-current opacity-30 animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </button>
  )
}
