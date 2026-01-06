"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientProps {
    className?: string
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        let angle = 0
        let animationFrameId: number

        const animate = () => {
            angle = (angle + 0.5) % 360
            element.style.background = `linear-gradient(${angle}deg, rgba(13, 148, 136, 0.1), rgba(6, 182, 212, 0.1), rgba(13, 148, 136, 0.1))`
            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div
            ref={ref}
            className={cn(
                "pointer-events-none absolute inset-0 opacity-50 blur-3xl",
                className
            )}
            aria-hidden="true"
        />
    )
}