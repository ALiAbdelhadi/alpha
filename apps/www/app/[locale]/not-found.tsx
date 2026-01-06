"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { BRAND_COLORS, SHADER_CONFIG } from "@/lib/constants"
import { ChromaFlow, Shader, Swirl } from "shaders/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

/**
 * 404 Not Found Page
 * 
 * Beautiful error page matching the design system with:
 * - Shader background effects
 * - Animated gradient
 * - Interactive elements
 * - Brand colors
 */
export default function NotFound() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        // Floating particles
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            opacity: number
        }> = []

        const particleCount = 20
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.4 + 0.2,
            })
        }

        let time = 0
        const animate = () => {
            time += 0.016
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Pulsing effect
                const pulse = Math.sin(time * 2 + particle.x * 0.01) * 0.3 + 0.7

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity * pulse})`
                ctx.fill()
            })

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - distance / 120)})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                })
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden">
            {/* Shader Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Shader className="h-full w-full">
                    <Swirl
                        colorA={BRAND_COLORS.teal}
                        colorB={BRAND_COLORS.cyan}
                        speed={SHADER_CONFIG.swirl.speed * 0.7}
                        detail={SHADER_CONFIG.swirl.detail}
                        blend={SHADER_CONFIG.swirl.blend}
                        coarseX={SHADER_CONFIG.swirl.coarseX}
                        coarseY={SHADER_CONFIG.swirl.coarseY}
                        mediumX={SHADER_CONFIG.swirl.mediumX}
                        mediumY={SHADER_CONFIG.swirl.mediumY}
                        fineX={SHADER_CONFIG.swirl.fineX}
                        fineY={SHADER_CONFIG.swirl.fineY}
                    />
                    <ChromaFlow
                        baseColor={BRAND_COLORS.tealLight}
                        upColor={BRAND_COLORS.cyan}
                        downColor={BRAND_COLORS.teal}
                        leftColor={BRAND_COLORS.cyanDark}
                        rightColor={BRAND_COLORS.cyanLight}
                        intensity={SHADER_CONFIG.chromaFlow.intensity * 0.8}
                        radius={SHADER_CONFIG.chromaFlow.radius}
                        momentum={SHADER_CONFIG.chromaFlow.momentum}
                        maskType={SHADER_CONFIG.chromaFlow.maskType}
                        opacity={SHADER_CONFIG.chromaFlow.opacity * 0.7}
                    />
                </Shader>
            </div>

            {/* Animated Gradient */}
            <AnimatedGradient className="z-0" />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
                {/* Large 404 with Glow Effect */}
                <div className="relative">
                    <h1
                        className={cn(
                            "text-[12rem] font-bold leading-none tracking-tight",
                            "bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500",
                            "bg-clip-text text-transparent",
                            "animate-pulse"
                        )}
                        style={{
                            textShadow: `0 0 40px ${BRAND_COLORS.cyan}, 0 0 80px ${BRAND_COLORS.cyan}`,
                            filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))",
                        }}
                    >
                        404
                    </h1>
                    <div
                        className="absolute inset-0 blur-3xl opacity-30"
                        style={{
                            background: `radial-gradient(circle, ${BRAND_COLORS.cyan} 0%, transparent 70%)`,
                        }}
                    />
                </div>

                {/* Error Message */}
                <div className="space-y-4 max-w-md">
                    <h2 className="text-3xl font-semibold text-primary">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Let&apos;s get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                        asChild
                        size="lg"
                        className={cn(
                            "group relative overflow-hidden",
                            "bg-gradient-to-r from-teal-600 to-cyan-600",
                            "hover:from-teal-500 hover:to-cyan-500",
                            "text-white border-0 shadow-lg",
                            "hover:shadow-xl hover:shadow-cyan-500/50",
                            "transition-all duration-300"
                        )}
                    >
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className={cn(
                            "group relative overflow-hidden",
                            "border-2 border-teal-500/50",
                            "hover:border-teal-500 hover:bg-teal-500/10",
                            "transition-all duration-300"
                        )}
                        onClick={() => window.history.back()}
                    >
                        <button type="button">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </button>
                    </Button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-cyan-500 animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 bg-teal-500 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Grain Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.08]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />
        </div>
    )
}

// Animated Gradient Component
function AnimatedGradient({ className }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        let angle = 0
        const animate = () => {
            angle = (angle + 0.4) % 360
            element.style.background = `linear-gradient(${angle}deg, rgba(13, 148, 136, 0.1), rgba(6, 182, 212, 0.1), rgba(13, 148, 136, 0.1))`
            requestAnimationFrame(animate)
        }
        animate()
    }, [])

    return (
        <div
            ref={ref}
            className={cn(
                "pointer-events-none absolute inset-0 opacity-50 blur-3xl",
                className
            )}
        />
    )
}

