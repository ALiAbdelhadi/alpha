"use client"

import { AnimatedGradient } from "@/components/animated-gradient"
import { CustomCursor } from "@/components/custom-cursor"
import { ErrorBoundary } from "@/components/error-boundary"
import { FloatingParticles } from "@/components/floating-particles"
import { GrainOverlay } from "@/components/grain-overlay"
import { Nav } from "@/components/nav"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WorkSection } from "@/components/sections/work-section"
import { BRAND_COLORS, SHADER_CONFIG, NAV_ITEMS } from "@/lib/constants"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

export default function Home() {
    const [currentSection, setCurrentSection] = useState("home")
    const [isLoaded, setIsLoaded] = useState(false)
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    const navItems = useMemo(() => NAV_ITEMS, [])

    // Check shader readiness
    useEffect(() => {
        const checkShaderReady = () => {
            if (shaderContainerRef.current) {
                const canvas = shaderContainerRef.current.querySelector("canvas")
                if (canvas && canvas.width > 0 && canvas.height > 0) {
                    setIsLoaded(true)
                    return true
                }
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

    // Track current section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => {
                const element = document.getElementById(item.sectionId)
                return { id: item.sectionId, element, top: element?.getBoundingClientRect().top ?? Infinity }
            })

            // Find the section currently in view
            const viewportMiddle = window.innerHeight / 2
            const current = sections.reduce((prev, curr) => {
                const prevDistance = Math.abs(prev.top - viewportMiddle)
                const currDistance = Math.abs(curr.top - viewportMiddle)
                return currDistance < prevDistance ? curr : prev
            })

            if (current.element && current.top < window.innerHeight * 0.8) {
                setCurrentSection(current.id)
            }
        }

        // Throttle scroll events
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        handleScroll() // Initial check

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [navItems])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const navHeight = 80 // Approximate nav height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
            setCurrentSection(sectionId)
        }
    }

    return (
        <main className="relative min-h-screen w-full bg-background">
            <CustomCursor />
            <GrainOverlay />
            <FloatingParticles />
            <AnimatedGradient className="z-0" />
            <div
                ref={shaderContainerRef}
                className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ contain: "strict" }}
                aria-hidden="true"
            >
                <Shader className="h-full w-full">
                    <Swirl
                        colorA={BRAND_COLORS.teal}
                        colorB={BRAND_COLORS.cyan}
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
                        baseColor={BRAND_COLORS.tealLight}
                        upColor={BRAND_COLORS.cyan}
                        downColor={BRAND_COLORS.teal}
                        leftColor={BRAND_COLORS.cyanDark}
                        rightColor={BRAND_COLORS.cyanLight}
                        intensity={SHADER_CONFIG.chromaFlow.intensity}
                        radius={SHADER_CONFIG.chromaFlow.radius}
                        momentum={SHADER_CONFIG.chromaFlow.momentum}
                        maskType={SHADER_CONFIG.chromaFlow.maskType}
                        opacity={SHADER_CONFIG.chromaFlow.opacity}
                    />
                </Shader>
                <div className="absolute inset-0 bg-black/20" />
            </div>
            <Nav scrollToSection={scrollToSection} currentSection={currentSection} />
            <div className="relative z-10">
                <ErrorBoundary>
                    <HeroSection scrollToSection={scrollToSection} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <WorkSection />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ServicesSection />
                </ErrorBoundary>
                <ErrorBoundary>
                    <AboutSection scrollToSection={scrollToSection} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ContactSection />
                </ErrorBoundary>
            </div>
        </main >
    )
}
