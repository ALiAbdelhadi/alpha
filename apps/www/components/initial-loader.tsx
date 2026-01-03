"use client"

import { useEffect, useRef, useState } from "react"
import { BRAND_COLORS } from "@/lib/constants"
import { ChromaFlow, Shader, Swirl } from "shaders/react"
import { cn } from "@/lib/utils"

/**
 * Initial Loader - Shows when user first opens the website
 * 
 * Features:
 * - Morphing geometric shapes that transform continuously
 * - 3D rotation effects
 * - Shader background with brand colors
 * - Particle trail effects
 * - Smooth fade-out transition
 */
export function InitialLoader() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [morphProgress, setMorphProgress] = useState(0)
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
    const [isVisible, setIsVisible] = useState(true)
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        // Check if page is loaded
        const checkPageLoaded = () => {
            if (document.readyState === 'complete') {
                // Wait a bit for shaders and content to load
                setTimeout(() => {
                    setIsVisible(false)
                    // Remove from DOM after fade-out animation
                    setTimeout(() => {
                        setShouldRender(false)
                    }, 500) // Match transition duration
                }, 800) // Minimum display time
                return true
            }
            return false
        }

        // Check immediately
        if (checkPageLoaded()) return

        // Listen for load event
        const handleLoad = () => {
            setTimeout(() => {
                setIsVisible(false)
                setTimeout(() => {
                    setShouldRender(false)
                }, 500)
            }, 800)
        }

        window.addEventListener('load', handleLoad)
        
        // Fallback: hide after max time
        const maxTimer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
                setShouldRender(false)
            }, 500)
        }, 3000)

        return () => {
            window.removeEventListener('load', handleLoad)
            clearTimeout(maxTimer)
        }
    }, [])

    useEffect(() => {
        if (!shouldRender) return

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

        // Morphing shape parameters
        let time = 0
        const shapes = [
            { type: "alpha", points: 8 },
            { type: "hexagon", points: 6 },
            { type: "star", points: 5 },
            { type: "circle", points: 100 },
        ]
        let currentShapeIndex = 0

        // Particles for trail effect
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            life: number
            maxLife: number
        }> = []

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const baseRadius = 80

        const getShapePoints = (shapeType: string, points: number, radius: number, morph: number) => {
            const shapePoints: Array<{ x: number; y: number }> = []
            const angleStep = (Math.PI * 2) / points

            for (let i = 0; i < points; i++) {
                const angle = i * angleStep
                let r = radius

                if (shapeType === "alpha") {
                    // Alpha symbol shape (A)
                    if (i < points / 2) {
                        r = radius * (1 + 0.3 * Math.sin(morph * Math.PI * 2))
                    } else {
                        r = radius * (0.7 + 0.3 * Math.sin(morph * Math.PI * 2 + Math.PI))
                    }
                } else if (shapeType === "star") {
                    // Star shape
                    const outerRadius = radius
                    const innerRadius = radius * 0.5
                    r = i % 2 === 0 ? outerRadius : innerRadius
                    r *= (1 + 0.2 * Math.sin(morph * Math.PI * 2))
                } else if (shapeType === "hexagon") {
                    // Hexagon with morphing
                    r = radius * (1 + 0.15 * Math.sin(morph * Math.PI * 2 + angle))
                } else {
                    // Circle
                    r = radius * (1 + 0.1 * Math.sin(morph * Math.PI * 2))
                }

                shapePoints.push({
                    x: centerX + Math.cos(angle) * r,
                    y: centerY + Math.sin(angle) * r,
                })
            }

            return shapePoints
        }

        const animate = () => {
            if (!shouldRender) return

            time += 0.016 // ~60fps
            const morph = (Math.sin(time * 0.5) + 1) / 2 // 0 to 1

            // Update morph progress for React state
            if (Math.floor(time * 0.1) % 4 !== currentShapeIndex) {
                currentShapeIndex = Math.floor(time * 0.1) % 4
            }

            setMorphProgress(morph)

            // Update rotation
            setRotation({
                x: Math.sin(time * 0.3) * 15,
                y: Math.cos(time * 0.4) * 15,
                z: time * 20,
            })

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const currentShape = shapes[currentShapeIndex]
            const shapePoints = getShapePoints(
                currentShape.type,
                currentShape.points,
                baseRadius,
                morph
            )

            // Draw shape with gradient
            const gradient = ctx.createLinearGradient(
                centerX - baseRadius,
                centerY - baseRadius,
                centerX + baseRadius,
                centerY + baseRadius
            )
            gradient.addColorStop(0, BRAND_COLORS.teal)
            gradient.addColorStop(0.5, BRAND_COLORS.cyan)
            gradient.addColorStop(1, BRAND_COLORS.tealLight)

            // Draw main shape
            ctx.save()
            ctx.translate(centerX, centerY)
            ctx.rotate((rotation.z * Math.PI) / 180)
            ctx.translate(-centerX, -centerY)

            ctx.beginPath()
            shapePoints.forEach((point, i) => {
                if (i === 0) {
                    ctx.moveTo(point.x, point.y)
                } else {
                    ctx.lineTo(point.x, point.y)
                }
            })
            ctx.closePath()

            ctx.strokeStyle = gradient
            ctx.lineWidth = 3
            ctx.lineJoin = "round"
            ctx.stroke()

            // Fill with glow effect
            ctx.shadowBlur = 20
            ctx.shadowColor = BRAND_COLORS.cyan
            ctx.fillStyle = `rgba(6, 182, 212, ${0.1 + morph * 0.1})`
            ctx.fill()

            ctx.restore()

            // Add particles at shape vertices
            if (time % 0.1 < 0.016) {
                shapePoints.forEach((point) => {
                    particles.push({
                        x: point.x,
                        y: point.y,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: 1,
                        maxLife: 1,
                    })
                })
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i]
                particle.x += particle.vx
                particle.y += particle.vy
                particle.life -= 0.02

                if (particle.life <= 0) {
                    particles.splice(i, 1)
                    continue
                }

                const alpha = particle.life / particle.maxLife
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.6})`
                ctx.fill()
            }

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRender])

    if (!shouldRender) return null

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-background",
                "transition-opacity duration-500 ease-out",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Shader Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Shader className="h-full w-full">
                    <Swirl
                        colorA={BRAND_COLORS.teal}
                        colorB={BRAND_COLORS.cyan}
                        speed={0.5}
                        detail={0.6}
                        blend={40}
                        coarseX={30}
                        coarseY={30}
                        mediumX={30}
                        mediumY={30}
                        fineX={30}
                        fineY={30}
                    />
                    <ChromaFlow
                        baseColor={BRAND_COLORS.tealLight}
                        upColor={BRAND_COLORS.cyan}
                        downColor={BRAND_COLORS.teal}
                        leftColor={BRAND_COLORS.cyanDark}
                        rightColor={BRAND_COLORS.cyanLight}
                        intensity={0.8}
                        radius={1.5}
                        momentum={25}
                        maskType="alpha"
                        opacity={0.6}
                    />
                </Shader>
            </div>

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <AnimatedGradient />
            </div>

            {/* Canvas for Morphing Shapes */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
                style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            />

            {/* Loading Text with Glow */}
            <div className="relative z-20 flex flex-col items-center gap-4">
                <div
                    className={cn(
                        "relative text-2xl font-bold tracking-wider text-foreground",
                        "transition-all duration-500"
                    )}
                    style={{
                        textShadow: `0 0 20px ${BRAND_COLORS.cyan}, 0 0 40px ${BRAND_COLORS.cyan}`,
                        opacity: 0.7 + morphProgress * 0.3,
                    }}
                >
                    <span className="inline-block animate-pulse">α</span>
                    <span className="ml-2">Loading</span>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all duration-300",
                                "bg-gradient-to-r from-teal-500 to-cyan-500"
                            )}
                            style={{
                                animationDelay: `${i * 0.2}s`,
                                animation: "pulse 1.5s ease-in-out infinite",
                                boxShadow: `0 0 10px ${BRAND_COLORS.cyan}`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Grain Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-30 opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                }}
            />
        </div>
    )
}

// Animated Gradient Component (inline)
function AnimatedGradient() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        let angle = 0
        const animate = () => {
            angle = (angle + 0.3) % 360
            element.style.background = `linear-gradient(${angle}deg, rgba(13, 148, 136, 0.15), rgba(6, 182, 212, 0.15), rgba(13, 148, 136, 0.15))`
            requestAnimationFrame(animate)
        }
        animate()
    }, [])

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 opacity-50 blur-3xl"
        />
    )
}

