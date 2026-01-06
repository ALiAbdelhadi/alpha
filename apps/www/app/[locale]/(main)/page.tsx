"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { GrainOverlay } from "@/components/grain-overlay"
import { Nav } from "@/components/nav"
import { BRAND_COLORS, NAV_ITEMS, SHADER_CONFIG } from "@/lib/constants"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"

const CustomCursor = lazy(() => import("@/components/custom-cursor").then(m => ({ default: m.CustomCursor })))
const HeroSection = lazy(() => import("@/components/sections/hero-section").then(m => ({ default: m.HeroSection })))
const WorkSection = lazy(() => import("@/components/sections/work-section").then(m => ({ default: m.WorkSection })))
const ServicesSection = lazy(() => import("@/components/sections/services-section").then(m => ({ default: m.ServicesSection })))
const AboutSection = lazy(() => import("@/components/sections/about-section").then(m => ({ default: m.AboutSection })))
const ContactSection = lazy(() => import("@/components/sections/contact-section").then(m => ({ default: m.ContactSection })))

function SectionSkeleton() {
    return (
        <div className="min-h-screen w-full animate-pulse">
            <div className="mx-auto max-w-7xl px-6 py-32">
                <div className="mb-8 h-16 w-3/4 rounded-lg bg-foreground/5" />
                <div className="space-y-4">
                    <div className="h-4 w-full rounded bg-foreground/5" />
                    <div className="h-4 w-5/6 rounded bg-foreground/5" />
                    <div className="h-4 w-4/6 rounded bg-foreground/5" />
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [currentSection, setCurrentSection] = useState("home")
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    const navItems = useMemo(() => NAV_ITEMS, [])

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

    // Scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }

            scrollTimeoutRef.current = setTimeout(() => {
                const sections = navItems.map((item) => {
                    const element = document.getElementById(item.sectionId)
                    return {
                        id: item.sectionId,
                        top: element?.getBoundingClientRect().top ?? Infinity,
                    }
                })

                const viewportMiddle = window.innerHeight / 2
                const current = sections.reduce((prev, curr) => {
                    const prevDistance = Math.abs(prev.top - viewportMiddle)
                    const currDistance = Math.abs(curr.top - viewportMiddle)
                    return currDistance < prevDistance ? curr : prev
                })

                if (current.top < window.innerHeight * 0.8) {
                    setCurrentSection(current.id)
                }
            }, 100)
        }

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
        handleScroll()

        return () => {
            window.removeEventListener("scroll", onScroll)
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }
        }
    }, [navItems])

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const navHeight = 80
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
            setCurrentSection(sectionId)
        }
    }, [])

    // Section entrance animations
    useEffect(() => {
        const sections = ["work", "services", "about", "contact"]
        const sectionConfigs = {
            work: { x: -100, y: 0, rotation: -5 },
            services: { x: 0, y: 100, rotation: 0 },
            about: { x: 100, y: 0, rotation: 5 },
            contact: { x: 0, y: -100, rotation: 0 },
        }

        sections.forEach((sectionId) => {
            const section = document.getElementById(sectionId)
            if (!section) return

            const config = sectionConfigs[sectionId as keyof typeof sectionConfigs]
            
            gsap.set(section, {
                opacity: 0,
                x: config.x,
                y: config.y,
                rotation: config.rotation,
                scale: 0.95,
                force3D: true,
                willChange: "transform, opacity"
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerElement = trigger.vars.trigger as Element
                if (triggerElement && sections.some(id => {
                    const section = document.getElementById(id)
                    return section?.contains(triggerElement)
                })) {
                    trigger.kill()
                }
            })
        }
    }, [])

    return (
        <main className="relative min-h-screen w-full bg-background">
            <Suspense fallback={null}>
                <CustomCursor />
            </Suspense>
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
            <Nav scrollToSection={scrollToSection} currentSection={currentSection} />
            <div className="relative z-10">
                <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton />}>
                        <HeroSection scrollToSection={scrollToSection} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton />}>
                        <WorkSection />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton />}>
                        <ServicesSection />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton />}>
                        <AboutSection scrollToSection={scrollToSection} />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton />}>
                        <ContactSection />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </main>
    )
}