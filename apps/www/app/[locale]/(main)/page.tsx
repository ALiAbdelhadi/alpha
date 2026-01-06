"use client"

import { BackgroundShader } from "@/components/background-shader"
import { ErrorBoundary } from "@/components/error-boundary"
import { Nav } from "@/components/nav"
import { NAV_ITEMS } from "@/lib/constants"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
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

    const navItems = useMemo(() => NAV_ITEMS, [])

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
            <BackgroundShader />
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