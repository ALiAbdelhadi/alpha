"use client"

import { BRAND_COLORS, SHADER_CONFIG } from "@/lib/constants"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

export function BackgroundShader() {
    const [isLoaded, setIsLoaded] = useState(false)
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    // Shader loading detection
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
                    colorA={SHADER_CONFIG.swirl.colorA}
                    colorB={SHADER_CONFIG.swirl.colorB}
                    speed={SHADER_CONFIG.swirl.speed}
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
                    baseColor={SHADER_CONFIG.chromaFlow.baseColor}
                    upColor={SHADER_CONFIG.chromaFlow.upColor}
                    downColor={SHADER_CONFIG.chromaFlow.downColor}
                    leftColor={SHADER_CONFIG.chromaFlow.leftColor}
                    rightColor={SHADER_CONFIG.chromaFlow.rightColor}
                    intensity={SHADER_CONFIG.chromaFlow.intensity}
                    radius={SHADER_CONFIG.chromaFlow.radius}
                    momentum={SHADER_CONFIG.chromaFlow.momentum}
                    maskType={SHADER_CONFIG.chromaFlow.maskType}
                    opacity={SHADER_CONFIG.chromaFlow.opacity}
                />
            </Shader>
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, ${BRAND_COLORS.teal}30 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, ${BRAND_COLORS.navyDeep}50 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, ${BRAND_COLORS.cyanDark}20 0%, transparent 50%)
                    `
                }}
            />
            <div
                className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40"
            />
        </div>
    )
}

