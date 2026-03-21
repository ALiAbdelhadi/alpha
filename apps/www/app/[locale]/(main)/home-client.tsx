"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { ComparisonDemo } from "@/components/sections/comparison-demo"
import { ProblemSection } from "@/components/sections/problem-section"
import { useNavigation } from "@/components/providers/navigation-provider"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { MOTION } from "@/lib/motion"
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { SectionSkeleton } from "@/components/section-skeleton"
import { useTheme } from "next-themes"

const ServicesSection = lazy(() => import("@/components/sections/services-section").then(m => ({ default: m.ServicesSection })))
const ProcessSection = lazy(() => import("@/components/sections/process-section").then(m => ({ default: m.ProcessSection })))
const WorkSection = lazy(() => import("@/components/sections/work-section").then(m => ({ default: m.WorkSection })))
const SocialProofSection = lazy(() => import("@/components/sections/social-proof-section").then(m => ({ default: m.SocialProofSection })))
const AboutSection = lazy(() => import("@/components/sections/about-section").then(m => ({ default: m.AboutSection })))
const CtaSection = lazy(() => import("@/components/sections/cta-section").then(m => ({ default: m.CtaSectionEnhanced })))
const EstimatorSection = lazy(() => import("@/components/sections/estimator-section").then(m => ({ default: m.EstimatorSection })))

export function HomeClient() {
    const { setCurrentSection, setScrollToSection } = useNavigation()
    const darkWrapperRef = useRef<HTMLDivElement>(null)
    const [hasEntered, setHasEntered] = useState(false)
    const themeRef = useRef<string | undefined>(undefined)

    const { resolvedTheme } = useTheme()

    // eslint-disable-next-line react-hooks/refs
    themeRef.current = resolvedTheme

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
            setCurrentSection(sectionId)
        }
    }, [setCurrentSection])

    useEffect(() => {
        setScrollToSection(scrollToSection)
        return () => setScrollToSection(null)
    }, [scrollToSection, setScrollToSection])

    useLayoutEffect(() => {
        if (!darkWrapperRef.current) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: darkWrapperRef.current,
                start: "top 65%",
                end: "bottom 30%",
                onEnter: () => setHasEntered(true),
                onLeaveBack: () => setHasEntered(false),
            })
        })

        return () => ctx.revert()
    }, [])
    useEffect(() => {
        if (!darkWrapperRef.current) return

        const bgTarget = hasEntered
            ? (resolvedTheme === "dark" ? "#f9f9f9" : "#080808")
            : "transparent"

        gsap.to(darkWrapperRef.current, {
            backgroundColor: bgTarget,
            duration: MOTION.duration.base,
            ease: MOTION.ease.ui,
        })
    }, [hasEntered, resolvedTheme])
    
    return (
        <>
            <ErrorBoundary>
                <ProblemSection />
            </ErrorBoundary>

            <ErrorBoundary>
                <ComparisonDemo />
            </ErrorBoundary>
            <div
                id="services-wrapper"
                ref={darkWrapperRef}
                className="ps-section"
                style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    overflow: "hidden",
                }}
            >
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                        opacity: 0.018,
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                        backgroundImage: "radial-gradient(circle, rgba(128,128,128,0.06) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<SectionSkeleton />}>
                            <ServicesSection invertColors={hasEntered} />
                        </Suspense>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <Suspense fallback={<SectionSkeleton />}>
                            <ProcessSection invertColors={hasEntered} />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>

            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <WorkSection />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <SocialProofSection />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <AboutSection scrollToSection={scrollToSection} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <CtaSection scrollToSection={scrollToSection} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
                <Suspense fallback={<SectionSkeleton />}>
                    <EstimatorSection />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}
