"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { NAV_ITEMS } from "@/lib/constants"
import { useNavigation } from "@/components/providers/navigation-provider"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef } from "react"

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
    const { setCurrentSection, setScrollToSection } = useNavigation()
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const navItems = useMemo(() => NAV_ITEMS, [])

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
    }, [setCurrentSection])

    // Register scrollToSection function in context
    useEffect(() => {
        setScrollToSection(scrollToSection)
        return () => setScrollToSection(null)
    }, [scrollToSection, setScrollToSection])

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
            }, 80)
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
    }, [navItems, setCurrentSection])

    return (
        <>
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
        </>
    )
}