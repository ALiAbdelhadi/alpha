"use client"

import { AlphaLogo } from "@/components/alpha-logo"
import { AnimatedGradient } from "@/components/animated-gradient"
import { CustomCursor } from "@/components/custom-cursor"
import { FloatingParticles } from "@/components/floating-particles"
import { GrainOverlay } from "@/components/grain-overlay"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MagneticButton } from "@/components/magnetic-button"
import { MobileNav } from "@/components/mobile-nav"
import { ErrorBoundary } from "@/components/error-boundary"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WorkSection } from "@/components/sections/work-section"
import { BRAND_COLORS } from "@/lib/constants"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"
import { Link } from "@/i18n/navigation"

export default function Home() {
    const t = useTranslations()
    const [currentSection, setCurrentSection] = useState("home")
    const [isLoaded, setIsLoaded] = useState(false)
    const shaderContainerRef = useRef<HTMLDivElement>(null)

    const navItems = [
        { key: "home", sectionId: "home" },
        { key: "work", sectionId: "work" },
        { key: "services", sectionId: "services" },
        { key: "about", sectionId: "about" },
        { key: "contact", sectionId: "contact" },
    ]

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
    }, [])

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
        <>
            {/* Skip to content link for accessibility */}
            <Link
                href="#home"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:outline-none focus:ring-2 focus:ring-foreground/50"
            >
                {t("nav.skipToContent")}
            </Link>

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
                            speed={0.8}
                            detail={0.8}
                            blend={50}
                            coarseX={40}
                            coarseY={40}
                            mediumX={40}
                            mediumY={40}
                            fineX={40}
                            fineY={40}
                        />
                        <ChromaFlow
                            baseColor={BRAND_COLORS.tealLight}
                            upColor={BRAND_COLORS.cyan}
                            downColor={BRAND_COLORS.teal}
                            leftColor={BRAND_COLORS.cyanDark}
                            rightColor={BRAND_COLORS.cyanLight}
                            intensity={0.9}
                            radius={1.8}
                            momentum={25}
                            maskType="alpha"
                            opacity={0.97}
                        />
                    </Shader>
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <nav
                    className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-foreground/10 px-6 py-4 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    role="navigation"
                    aria-label={t("nav.mainNavigation")}
                >
                    <button
                        onClick={() => scrollToSection("home")}
                        className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 rounded-lg"
                        aria-label={t("nav.home")}
                    >
                        <AlphaLogo size="md" variant="full" />
                    </button>
                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => scrollToSection(item.sectionId)}
                                className={`group relative font-sans text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 rounded px-2 py-1 ${currentSection === item.sectionId
                                        ? "text-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                    }`}
                                aria-current={currentSection === item.sectionId ? "page" : undefined}
                            >
                                {t(`nav.${item.key}`)}
                                <span
                                    className={`absolute -bottom-1 left-2 right-2 h-px bg-foreground transition-all duration-300 ${currentSection === item.sectionId ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <div className="hidden md:block">
                            <MagneticButton variant="secondary" onClick={() => scrollToSection("contact")}>
                                {t("nav.getStarted")}
                            </MagneticButton>
                        </div>
                        <MobileNav
                            currentSection={currentSection}
                            navItems={navItems}
                            scrollToSection={scrollToSection}
                        />
                    </div>
                </nav>

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
            </main>
        </>
    )
}
