"use client"

import { BRAND_COLORS } from "@/lib/constants"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

export function BackgroundShader() {
    const [isLoaded, setIsLoaded] = useState(false)
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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
    }, [])

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
                    speed={0.4}           // أبطأ من 0.6
                    detail={0.75}         // أقل من 0.85
                    blend={50}            // أقل من 60
                    coarseX={40}          // أقل من 45
                    coarseY={40}
                    mediumX={35}          // أقل من 40
                    mediumY={35}
                    fineX={30}            // أقل من 35
                    fineY={30}
                />

                {/* ChromaFlow - إعدادات محسّنة */}
                <ChromaFlow
                    baseColor={BRAND_COLORS.teal}
                    upColor={BRAND_COLORS.cyanLight}
                    downColor={BRAND_COLORS.navyDeep}
                    leftColor={BRAND_COLORS.tealDark}
                    rightColor={BRAND_COLORS.cyanLighter}
                    intensity={0.7}       // أقل من 1.0
                    radius={1.8}          // أقل من 2.0
                    momentum={25}         // أقل من 30
                    maskType="alpha"
                    opacity={0.85}        // أقل من 0.92
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