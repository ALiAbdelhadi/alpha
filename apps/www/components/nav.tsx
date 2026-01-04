"use client"

import { Container } from "@/components/container"
import { LanguageChanger } from "@/components/language-switcher"
import { ThemeChanger } from "@/components/theme-changer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from "react"
import { AlphaLogo } from "./alpha-logo"

interface NavProps {
    scrollToSection?: (sectionId: string) => void
    currentSection?: string
}

export function Nav({ scrollToSection, currentSection: externalCurrentSection }: NavProps) {
    const t = useTranslations('nav');
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    const logoRef = useRef<HTMLAnchorElement>(null)
    const navItemsRef = useRef<HTMLElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    const navItems = [
        { key: "home", sectionId: "home", href: "/" },
        { key: "work", sectionId: "work", href: "/#work" },
        { key: "services", sectionId: "services", href: "/#services" },
        { key: "about", sectionId: "about", href: "/#about" },
        { key: "contact", sectionId: "contact", href: "/#contact" },
    ]

    const currentSection = externalCurrentSection || "home"

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (!logoRef.current || !navItemsRef.current) return

        const ctx = gsap.context(() => {
            gsap.set(logoRef.current, { opacity: 0, y: -10 })

            const navChildren = navItemsRef.current?.children
            if (navChildren && navChildren.length > 0) {
                gsap.set(Array.from(navChildren), { opacity: 0, y: -10 })
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.to(logoRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            })

            if (navChildren && navChildren.length > 0) {
                tl.to(
                    Array.from(navChildren),
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.05,
                    },
                    "-=0.4"
                )
            }
        })

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        if (!mobileMenuRef.current) return

        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
            gsap.fromTo(
                mobileMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            )

            const items = mobileMenuRef.current.querySelectorAll('.mobile-menu-item')
            if (items.length > 0) {
                gsap.fromTo(
                    Array.from(items),
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
                )
            }
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    const handleMobileLinkClick = (sectionId?: string) => {
        setIsMobileMenuOpen(false)
        if (sectionId && scrollToSection) {
            setTimeout(() => scrollToSection(sectionId), 100)
        }
    }

    const handleNavClick = (item: typeof navItems[0]) => {
        if (scrollToSection) {
            scrollToSection(item.sectionId)
        }
    }

    const locale = useLocale() === "ar" ? "rtl" : "ltr"

    return (
        <>
            <header
                ref={navRef}
                className={`fixed top-0 z-40 w-full transition-all duration-500 ${isScrolled
                    ? "bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(20,20,20,0.4)] backdrop-blur-xl shadow-sm"
                    : "bg-transparent"
                    }`}
            >
                <Container>
                    <div className="flex h-16 items-center justify-center">
                        <div className="flex w-full items-center justify-between gap-8">
                            <Link
                                ref={logoRef}
                                href="/"
                                className="flex items-baseline gap-1 group relative z-50"
                                onClick={(e) => {
                                    if (scrollToSection) {
                                        e.preventDefault()
                                        scrollToSection("home")
                                    }
                                }}
                            >
                                <AlphaLogo size="md" variant="full" />
                            </Link>
                            <nav ref={navItemsRef} className="hidden lg:flex items-center gap-2 text-sm">
                                {navItems.map((item) => (
                                    <NavItem key={item.key}>
                                        <button
                                            onClick={() => handleNavClick(item)}
                                            className={`group relative font-sans text-sm font-medium transition-colors rounded px-2 py-1 ${currentSection === item.sectionId
                                                ? "text-foreground"
                                                : "text-foreground/80 hover:text-foreground"
                                                }`}
                                            aria-current={currentSection === item.sectionId ? "page" : undefined}
                                        >
                                            {t(item.key)}
                                            <span
                                                className={`absolute -bottom-1 left-0 right-0 h-px bg-foreground transition-all duration-300 ${currentSection === item.sectionId ? "w-full" : "w-0 group-hover:w-full"
                                                    }`}
                                            />
                                        </button>
                                    </NavItem>
                                ))}
                                <NavDivider />
                                <NavItem>
                                    <LanguageChanger />
                                </NavItem>
                                <NavDivider />
                                <NavItem>
                                    <ThemeChanger />
                                </NavItem>
                            </nav>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden relative z-50 w-[24px] h-[24px] flex items-center justify-center"
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <span
                                    className={cn(
                                        "absolute h-[2.2px] w-full bg-foreground transition-all duration-300 ease-in-out",
                                        isMobileMenuOpen
                                            ? "rotate-45 translate-y-0"
                                            : "-translate-y-[6px]"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "absolute h-[2.2px] w-full bg-foreground transition-all duration-300 ease-in-out",
                                        isMobileMenuOpen
                                            ? "-rotate-45 translate-y-0"
                                            : "translate-y-[6px]"
                                    )}
                                />
                            </button>
                        </div>
                    </div>
                </Container>
            </header>
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-2xl"
                    style={{ top: "64px" }}
                >
                    <Container className="h-full">
                        <ScrollArea className="h-[calc(100vh-64px)] w-full" dir={locale}>
                            <div className="py-8 px-2">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        {navItems.map((item) => (
                                            <MobileMenuItem key={item.key}>
                                                <button
                                                    onClick={() => handleMobileLinkClick(item.sectionId)}
                                                    className="block text-2xl font-light tracking-wide text-foreground hover:text-foreground/70 transition-colors py-2 w-full text-left"
                                                >
                                                    {t(item.key)}
                                                </button>
                                            </MobileMenuItem>
                                        ))}
                                    </div>
                                    <div className="h-px w-full bg-border/70" />
                                    <div className="space-y-4">
                                        <MobileMenuItem>
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-sm uppercase tracking-widest text-foreground/90 font-light">
                                                    {t('language') || 'Language'}
                                                </span>
                                                <LanguageChanger />
                                            </div>

                                        </MobileMenuItem>
                                        <MobileMenuItem>
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-sm uppercase tracking-widest text-foreground/90 font-light">
                                                    {t('theme') || 'Theme'}
                                                </span>
                                                <ThemeChanger />
                                            </div>
                                        </MobileMenuItem>
                                    </div>
                                    <div className="h-px w-full bg-border/30" />
                                </div>
                            </div>
                        </ScrollArea>
                    </Container>
                </div>
            )}
        </>
    )
}

function NavItem({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center">{children}</div>
}

function NavDivider() {
    return <div className="h-5 w-px bg-border/40 mx-1" />
}

function MobileMenuItem({ children }: { children: React.ReactNode }) {
    return <div className="mobile-menu-item">{children}</div>
}