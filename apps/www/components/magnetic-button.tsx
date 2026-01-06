"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { gsap } from "@/lib/gsap"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "default" | "lg"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
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
  }

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-foreground/95 text-background hover:bg-foreground backdrop-blur-md",
    secondary:
      "bg-foreground/5 text-foreground hover:bg-foreground/10 backdrop-blur-xl border border-foreground/10 hover:border-foreground/20",
    ghost: "bg-transparent text-foreground hover:bg-foreground/5 backdrop-blur-sm",
  }

  const sizes: Record<ButtonSize, string> = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      className={`
        relative overflow-hidden rounded-full font-medium
        transition-colors duration-300 ease-out will-change-transform
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{
        transform: "translate3d(0px, 0px, 0)",
        contain: "layout style paint",
      }}
      data-cursor-pointer
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}