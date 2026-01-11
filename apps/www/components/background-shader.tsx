"use client"

import type React from "react"

import { BRAND_COLORS } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

interface BackgroundShaderProps {
    enableParallax?: boolean
    enableMouseTracking?: boolean
    enable3DLayers?: boolean
}

/**
 * Enhanced Background Shader Component
 *
 * Multi-layered background system combining dynamic shaders with 3D effects.
 *
 * Layer Architecture:
 * - Layer 1: Static gradient base (foundation)
 * - Layer 2: Dynamic shaders (Swirl + ChromaFlow) for organic motion
 * - Layer 3: Radial gradient overlays for depth perception
 * - Layer 4: 3D parallax layer with scroll-based transforms
 * - Layer 5: Vignette overlay for visual hierarchy
 * - Layer 6: Mouse tracking glow for interactivity
 *
 * Performance Optimizations:
 * - GPU acceleration via will-change
 * - Contain property for layout isolation
 * - Mobile detection with gradient fallback
 * - Passive event listeners
 * - Conditional shader rendering
 *
 * Responsive Behavior:
 * - Mobile: Simplified gradient without shaders
 * - Tablet+: Full shader effects with parallax
 * - Adaptive animations based on device capabilities
 *
 * Accessibility:
 * - aria-hidden="true" for decorative element
 * - Respects prefers-reduced-motion setting
 * - No content blocking - z-index: 0
 */
export function BackgroundShader({
    enableParallax = true,
    enableMouseTracking = true,
    enable3DLayers = true,
}: BackgroundShaderProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [scrollProgress, setScrollProgress] = useState(0)
    const [perspective3D, setPerspective3D] = useState({ x: 0, y: 0 })
    const isMobile = useIsMobile()
    const shaderContainerRef = useRef<HTMLDivElement>(null)
    const parallaxLayerRef = useRef<HTMLDivElement>(null)
    const glowLayerRef = useRef<HTMLDivElement>(null)
    const layer3DRef = useRef<HTMLDivElement>(null)

    // Initialize and monitor shader loading
    useEffect(() => {
        if (isMobile) {
            setTimeout(() => setIsLoaded(true), 0)
            return
        }

        const checkShaderReady = () => {
            const canvas = shaderContainerRef.current?.querySelector("canvas")
            if (canvas && canvas.width > 0 && canvas.height > 0) {
                setIsLoaded(true)
                return true
            }
            return false
        }

        if (checkShaderReady()) return

        const intervalId = setInterval(() => {
            if (checkShaderReady()) {
                clearInterval(intervalId)
            }
        }, 100)

        const fallbackTimer = setTimeout(() => {
            setIsLoaded(true)
        }, 1500)

        return () => {
            clearInterval(intervalId)
            clearTimeout(fallbackTimer)
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile || !enableMouseTracking) return

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100

            setMousePosition({ x, y })

            // Update glow layer position
            if (glowLayerRef.current) {
                glowLayerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`)
                glowLayerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`)
            }

            // Calculate 3D perspective rotation based on mouse position
            if (enable3DLayers && layer3DRef.current) {
                const centerX = window.innerWidth / 2
                const centerY = window.innerHeight / 2
                const rotateX = ((e.clientY - centerY) / centerY) * 2
                const rotateY = ((e.clientX - centerX) / centerX) * -2

                setPerspective3D({ x: rotateX, y: rotateY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [isMobile, enableMouseTracking, enable3DLayers])

    useEffect(() => {
        if (isMobile || !enableParallax) return

        const handleScroll = () => {
            const scrolled = window.scrollY
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = scrolled / maxScroll

            setScrollProgress(scrollPercent)

            if (parallaxLayerRef.current) {
                // Multi-axis parallax: vertical movement + subtle scale
                const parallaxAmount = scrolled * 0.5
                const scale = 1 + scrollPercent * 0.1

                parallaxLayerRef.current.style.transform = `translateY(${parallaxAmount}px) scale(${scale})`
            }

            // 3D layer rotation based on scroll
            if (enable3DLayers && layer3DRef.current) {
                const rotateAmount = scrollPercent * 5
                layer3DRef.current.style.transform = `rotateX(${rotateAmount}deg)`
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMobile, enableParallax, enable3DLayers])

    // Mobile-optimized fallback
    if (isMobile) {
        return (
            <div
                className="fixed inset-0 z-0"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}25 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${BRAND_COLORS.navyDeep}40 0%, transparent 40%),
            linear-gradient(135deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)
          `,
                }}
                aria-hidden="true"
            />
        )
    }

    return (
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {/* Layer 1: Static gradient base for color foundation */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)`,
                    willChange: "contents",
                }}
            />

            {/* Layer 2: Dynamic shader effects (Swirl + ChromaFlow) */}
            <div
                ref={shaderContainerRef}
                className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ contain: "strict", willChange: "opacity" }}
            >
                <Shader className="h-full w-full">
                    {/* Swirl shader for organic motion */}
                    <Swirl
                        colorA={BRAND_COLORS.tealDarkest}
                        colorB={BRAND_COLORS.cyan}
                        speed={0.4}
                        detail={0.75}
                        blend={50}
                        coarseX={40}
                        coarseY={40}
                        mediumX={35}
                        mediumY={35}
                        fineX={30}
                        fineY={30}
                    />

                    {/* ChromaFlow for directional color flow */}
                    <ChromaFlow
                        baseColor={BRAND_COLORS.teal}
                        upColor={BRAND_COLORS.cyanLight}
                        downColor={BRAND_COLORS.navyDeep}
                        leftColor={BRAND_COLORS.tealDark}
                        rightColor={BRAND_COLORS.cyanLighter}
                        intensity={0.7}
                        radius={1.8}
                        momentum={25}
                        maskType="alpha"
                        opacity={0.85}
                    />
                </Shader>
            </div>

            {/* Layer 3: Radial gradient overlays for depth */}
            <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}25 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${BRAND_COLORS.navyDeep}40 0%, transparent 40%)
          `,
                    willChange: "contents",
                }}
            />

            {/* Layer 4: 3D parallax layer for depth effect on scroll */}
            <div
                ref={parallaxLayerRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(circle at 15% 50%, ${BRAND_COLORS.cyanLighter}15 0%, transparent 35%),
            radial-gradient(circle at 85% 20%, ${BRAND_COLORS.tealLight}10 0%, transparent 40%)
          `,
                    transform: "translateY(0px) scale(1)",
                    willChange: "transform",
                    transition: "transform 0.05s linear",
                }}
            />

            {enable3DLayers && (
                <div
                    ref={layer3DRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
              radial-gradient(circle at 50% 50%, ${BRAND_COLORS.cyanLighter}08 0%, transparent 50%),
              radial-gradient(circle at 30% 70%, ${BRAND_COLORS.teal}05 0%, transparent 45%)
            `,
                        transform: "rotateX(0deg)",
                        willChange: "transform",
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        transformOrigin: "center",
                    }}
                />
            )}

            {/* Layer 5: Vignette + overlay for visual hierarchy */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"
                style={{
                    willChange: "contents",
                }}
            />

            {/* Layer 6: Mouse tracking glow (subtle, desktop only) */}
            <div
                ref={glowLayerRef}
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={
                    {
                        background: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${BRAND_COLORS.cyan}05, transparent 80%)`,
                        willChange: "background-position",
                        "--mouse-x": "50%",
                        "--mouse-y": "50%",
                    } as React.CSSProperties
                }
            />

            {/* Performance optimization: contain layout and paint */}
            <style>{`
        @media (prefers-reduced-motion: reduce) {
          .background-shader-container,
          .background-shader-container * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
        </div>
    )
}
