"use client"

import { useEffect, useRef, useState } from "react"

/**
 * FloatingParticles - Optimized with performance considerations
 * - Pauses when tab is hidden
 * - Respects prefers-reduced-motion
 * - Disables on mobile/low-power devices
 */
export function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [shouldAnimate, setShouldAnimate] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const isLowPower = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (navigator as any).hardwareConcurrency < 4

        if (prefersReducedMotion || isLowPower) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShouldAnimate(false)
            return
        }

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            opacity: number
        }> = []

        const particleCount = 30
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            })
        }

        let animationFrameId: number
        let isPaused = false

        const animate = () => {
            if (isPaused || !shouldAnimate) {
                return // Actually stop the animation
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`
                ctx.fill()
            })

            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 150)})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                })
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleVisibilityChange = () => {
            isPaused = document.hidden
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        animate()

        return () => {
            window.removeEventListener("resize", resize)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [shouldAnimate])

    if (!shouldAnimate) return null

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0 opacity-30"
            style={{ mixBlendMode: "screen" }}
            aria-hidden="true"
        />
    )
}

