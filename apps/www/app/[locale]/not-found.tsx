"use client"

import { Button } from "@/components/ui/button"
import { BRAND_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

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

        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            opacity: number
        }> = []

        const particleCount = 15
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: Math.random() * 2.5 + 1,
                opacity: Math.random() * 0.3 + 0.15,
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

                const pulse = Math.sin(time * 1.5 + particle.x * 0.01) * 0.2 + 0.8

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity * pulse})`
                ctx.fill()
            })

            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - distance / 100)})`
                        ctx.lineWidth = 0.8
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
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}15 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, ${BRAND_COLORS.cyan}12 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, ${BRAND_COLORS.navyDeep}08 0%, transparent 60%)
                        `
                    }}
                />
                <AnimatedGradient />
            </div>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center max-w-2xl">
                <div className="relative">
                    <h1
                        className={cn(
                            "text-[10rem] md:text-[12rem] font-bold leading-none tracking-tight",
                            "bg-linear-to-r from-teal-500 via-cyan-500 to-teal-500",
                            "bg-clip-text text-transparent"
                        )}
                        style={{
                            textShadow: `0 0 30px ${BRAND_COLORS.cyan}40`,
                        }}
                    >
                        404
                    </h1>
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-primary">
                        Page Not Found
                    </h2>
                    <p className="text-primary/75 text-lg max-w-md">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                        asChild
                        size="lg"
                        className={cn(
                            "bg-teal-600 hover:bg-teal-500",
                            "text-white shadow-md",
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
                            "border-foreground/20 hover:border-foreground/40",
                            "hover:bg-foreground/5",
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
            </div>
            <div
                className="absolute top-20 left-10 w-24 h-24 rounded-full blur-3xl opacity-15 bg-cyan-500 animate-pulse"
                style={{ animationDuration: '3s' }}
            />
            <div
                className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-3xl opacity-15 bg-teal-500 animate-pulse"
                style={{ animationDelay: "1.5s", animationDuration: '3s' }}
            />
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />
        </div>
    )
}

function AnimatedGradient() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        let angle = 0
        let animationId: number

        const animate = () => {
            angle = (angle + 0.3) % 360
            element.style.background = `linear-gradient(${angle}deg, rgba(13, 148, 136, 0.08), rgba(6, 182, 212, 0.08), rgba(13, 148, 136, 0.08))`
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 opacity-60 blur-2xl"
        />
    )
}