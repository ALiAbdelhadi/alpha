"use client"

import { BRAND_COLORS } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

export function BackgroundShader() {
    const [isLoaded, setIsLoaded] = useState(false)
    const isMobile = useIsMobile()
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only check shader ready for desktop
        if (isMobile) {
            // Use setTimeout to avoid synchronous setState in effect
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

    if (isMobile) {
        return (
            <div
                className="fixed inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}25 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, ${BRAND_COLORS.navyDeep}40 0%, transparent 40%),
                        linear-gradient(135deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)
                    `
                }}
                aria-hidden="true"
            />
        )
    }

    return (
        <div
            ref={shaderContainerRef}
            className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ contain: "strict" }}
            aria-hidden="true"
        >
            <Shader className="h-full w-full">
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

            <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}25 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, ${BRAND_COLORS.navyDeep}40 0%, transparent 40%)
                    `
                }}
            />

            <div
                className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30"
            />
        </div>
    )
}