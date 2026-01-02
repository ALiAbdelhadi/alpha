"use client"

import { AlphaLogo } from "@/components/alpha-logo"
import { AnimatedGradient } from "@/components/animated-gradient"
import { CustomCursor } from "@/components/custom-cursor"
import { FloatingParticles } from "@/components/floating-particles"
import { GrainOverlay } from "@/components/grain-overlay"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MagneticButton } from "@/components/magnetic-button"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WorkSection } from "@/components/sections/work-section"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { ChromaFlow, Shader, Swirl } from "shaders/react"
import { gsap } from "gsap"

export default function Home() {
    const t = useTranslations()
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [currentSection, setCurrentSection] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const touchStartY = useRef(0)
    const touchStartX = useRef(0)
    const shaderContainerRef = useRef<HTMLDivElement>(null)
    const scrollThrottleRef = useRef<number>(0)
    
    const navItems = [
        { key: "home", index: 0 },
        { key: "work", index: 1 },
        { key: "services", index: 2 },
        { key: "about", index: 3 },
        { key: "contact", index: 4 },
    ]

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

    const scrollToSection = (index: number) => {
        if (scrollContainerRef.current) {
            const sectionWidth = scrollContainerRef.current.offsetWidth
            scrollContainerRef.current.scrollTo({
                left: sectionWidth * index,
                behavior: "smooth",
            })
            setCurrentSection(index)
        }
    }

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY
            touchStartX.current = e.touches[0].clientX
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
                e.preventDefault()
            }
        }

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY
            const touchEndX = e.changedTouches[0].clientX
            const deltaY = touchStartY.current - touchEndY
            const deltaX = touchStartX.current - touchEndX

            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
                if (deltaY > 0 && currentSection < 4) {
                    scrollToSection(currentSection + 1)
                } else if (deltaY < 0 && currentSection > 0) {
                    scrollToSection(currentSection - 1)
                }
            }
        }

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener("touchstart", handleTouchStart, { passive: true })
            container.addEventListener("touchmove", handleTouchMove, { passive: false })
            container.addEventListener("touchend", handleTouchEnd, { passive: true })
        }

        return () => {
            if (container) {
                container.removeEventListener("touchstart", handleTouchStart)
                container.removeEventListener("touchmove", handleTouchMove)
                container.removeEventListener("touchend", handleTouchEnd)
            }
        }
    }, [currentSection])

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault()

                if (!scrollContainerRef.current) return

                scrollContainerRef.current.scrollBy({
                    left: e.deltaY,
                    behavior: "instant",
                })

                const sectionWidth = scrollContainerRef.current.offsetWidth
                const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
                if (newSection !== currentSection) {
                    setCurrentSection(newSection)
                }
            }
        }

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false })
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel)
            }
        }
    }, [currentSection])

    useEffect(() => {
        const handleScroll = () => {
            if (scrollThrottleRef.current) return

            const rafId = requestAnimationFrame(() => {
                if (!scrollContainerRef.current) {
                    scrollThrottleRef.current = 0
                    return
                }

                const sectionWidth = scrollContainerRef.current.offsetWidth
                const scrollLeft = scrollContainerRef.current.scrollLeft
                const newSection = Math.round(scrollLeft / sectionWidth)

                if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
                    setCurrentSection(newSection)
                }

                scrollThrottleRef.current = 0
            })
            scrollThrottleRef.current = rafId
        }

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true })
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll)
            }
            if (scrollThrottleRef.current) {
                cancelAnimationFrame(scrollThrottleRef.current)
            }
        }
    }, [currentSection])

    return (
        <main className="relative h-screen w-full overflow-hidden bg-background">
            <CustomCursor />
            <GrainOverlay />
            <FloatingParticles />
            <AnimatedGradient className="z-0" />
            <div
                ref={shaderContainerRef}
                className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ contain: "strict" }}
            >
                <Shader className="h-full w-full">
                    <Swirl
                        colorA="#0d9488"
                        colorB="#06b6d4"
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
                        baseColor="#14b8a6"
                        upColor="#06b6d4"
                        downColor="#0d9488"
                        leftColor="#0891b2"
                        rightColor="#22d3ee"
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
                className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            >
                <button
                    onClick={() => scrollToSection(0)}
                    className="transition-transform hover:scale-105"
                >
                    <AlphaLogo size="md" variant="full" />
                </button>
                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => scrollToSection(item.index)}
                            className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === item.index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                                }`}
                        >
                            {t(`nav.${item.key}`)}
                            <span
                                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === item.index ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
                        {t("nav.getStarted")}
                    </MagneticButton>
                </div>
            </nav>

            <div
                ref={scrollContainerRef}
                data-scroll-container
                className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
                    <HeroContent t={t} scrollToSection={scrollToSection} />
                </section>
                <WorkSection />
                <ServicesSection />
                <AboutSection scrollToSection={scrollToSection} />
                <ContactSection />
            </div>
            <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </main>
    )
}

function HeroContent({ t, scrollToSection }: { t: ReturnType<typeof useTranslations>; scrollToSection: (index: number) => void }) {
    const badgeRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const scrollHintRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        if (badgeRef.current) {
            gsap.set(badgeRef.current, { opacity: 0, y: 20 })
            tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0)
        }

        if (titleRef.current) {
            gsap.set(titleRef.current, { opacity: 0, y: 40 })
            tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        }

        if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
            tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        }

        if (buttonsRef.current) {
            gsap.set(buttonsRef.current, { opacity: 0, y: 20 })
            tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        }

        if (scrollHintRef.current) {
            gsap.set(scrollHintRef.current, { opacity: 0 })
            tl.to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 0.8)
        }

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <>
            <div className="max-w-3xl">
                <div
                    ref={badgeRef}
                    className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md"
                >
                    <p className="font-mono text-xs text-foreground/90">{t("hero.badge")}</p>
                </div>
                <h1
                    ref={titleRef}
                    className="mb-6 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl"
                >
                    <span className="text-balance">
                        {t("hero.title")}
                        <br />
                        {t("hero.title2")}
                    </span>
                </h1>
                <p
                    ref={descriptionRef}
                    className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/90 md:text-xl"
                >
                    <span className="text-pretty">{t("hero.description")}</span>
                </p>
                <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(4)}>
                        {t("hero.ctaPrimary")}
                    </MagneticButton>
                    <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                        {t("hero.ctaSecondary")}
                    </MagneticButton>
                </div>
            </div>

            <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-foreground/80">{t("hero.scrollHint")}</p>
                    <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
                    </div>
                </div>
            </div>
        </>
    )
}
