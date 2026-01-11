"use client"

import { Container } from "@/components/container"
import { LanguageChanger } from "@/components/language-switcher"
import { ThemeChanger } from "@/components/theme-changer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from "react"
import { AlphaLogo } from "./alpha-logo"
import { MagneticButton } from "./magnetic-button"
import { useLoading } from "./providers/loading-provider"

export function Nav() {
    const t = useTranslations('nav');
    const [isScrolled, setIsScrolled] = useState(false)
    const { isInitialLoadComplete } = useLoading()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const logoRef = useRef<HTMLAnchorElement>(null)
    const navItemsRef = useRef<HTMLElement>(null)
    const actionsRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    const navItems = [
        { key: 'approach', sectionId: 'approach', href: '/approach' },
        { key: 'process', sectionId: 'process', href: '/process' },
        { key: 'standards', sectionId: 'standards', href: '/standards' },
        { key: 'case-study', sectionId: 'case-Study', href: '/case-study' },
        { key: 'writing', sectionId: 'writing', href: '/writing' },
    ]


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (!isInitialLoadComplete) return
        if (!logoRef.current || !navItemsRef.current || !actionsRef.current) return

        const ctx = gsap.context(() => {
            gsap.set(logoRef.current, { opacity: 0, y: -10 })
            gsap.set(actionsRef.current, { opacity: 0, y: -10 })

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

            tl.to(
                actionsRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
                "-=0.3"
            )
        })

        return () => ctx.revert()
    }, [isInitialLoadComplete])

    const closeMobileMenu = () => {
        if (!mobileMenuRef.current) {
            setIsMobileMenuOpen(false)
            return
        }

        setIsClosing(true)

        const items = mobileMenuRef.current.querySelectorAll('.mobile-menu-item')
        if (items.length > 0) {
            gsap.to(Array.from(items), {
                opacity: 0,
                x: -20,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            })
        }

        gsap.to(mobileMenuRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
                setIsMobileMenuOpen(false)
                setIsClosing(false)
                document.body.style.overflow = "unset"
            }
        })
    }

    useEffect(() => {
        if (!mobileMenuRef.current) return

        if (isMobileMenuOpen && !isClosing) {
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
        }

        return () => {
            if (isMobileMenuOpen && !isClosing) {
                document.body.style.overflow = "unset"
            }
        }
    }, [isMobileMenuOpen, isClosing])

    const locale = useLocale() === "ar" ? "rtl" : "ltr"

    const handleMobileLinkClick = () => {
        closeMobileMenu()
    }

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            closeMobileMenu()
        } else {
            setIsMobileMenuOpen(true)
        }
    }

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 z-40 w-full transition-all duration-500",
                    isInitialLoadComplete ? "opacity-100" : "opacity-0 pointer-events-none",
                    isScrolled
                        ? "bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(20,20,20,0.4)] backdrop-blur-xl shadow-sm"
                        : "bg-transparent"
                )}
            >
                <Container>
                    <div className="flex h-16 items-center">
                        <div className="hidden lg:grid lg:grid-cols-3 w-full items-center gap-8">
                            <div className="flex justify-start">
                                <Link
                                    ref={logoRef}
                                    href="/"
                                    className="flex items-baseline gap-1 group relative"
                                >
                                    <AlphaLogo size="md" variant="full" />
                                </Link>
                            </div>
                            <nav ref={navItemsRef} className="flex items-center justify-center gap-1">
                                {navItems.map((item) => (
                                    <NavItem key={item.key}>
                                        <Link href={item.href}>
                                            <button
                                                className={`group relative font-sans text-sm font-medium transition-colors rounded px-3 py-1.5 text-nowrap`}
                                            >
                                                {t(item.key)}
                                                <span className="absolute -bottom-1 left-0 right-0 h-px bg-transparent group-hover:bg-foreground transition-all duration-300" />
                                            </button>
                                        </Link>
                                    </NavItem>
                                ))}
                            </nav>
                            <div ref={actionsRef} className="flex items-center justify-end gap-2">
                                <LanguageChanger />
                                <NavDivider />
                                <ThemeChanger />
                                <NavDivider />
                                <Link href="/schedule">
                                    <MagneticButton className="h-11 w-full sm:h-9 flex items-center justify-center">
                                        <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
                                        <span>{t('schedule')}</span>
                                    </MagneticButton>
                                </Link>
                            </div>
                        </div>
                        <div className="flex lg:hidden w-full items-center justify-between">
                            <Link
                                ref={logoRef}
                                href="/"
                                className="flex items-baseline gap-1 group relative z-50"
                            >
                                <AlphaLogo size="md" variant="full" />
                            </Link>
                            <button
                                onClick={toggleMobileMenu}
                                className="relative z-50 w-[24px] h-[24px] flex items-center justify-center"
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
            {(isMobileMenuOpen || isClosing) && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-2xl"
                    style={{ top: "64px" }}
                >
                    <Container className="h-full">
                        <ScrollArea className="h-[calc(100vh-64px)] w-full" dir={locale}>
                            <div className="py-8">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        {navItems.map((item) => (
                                            <MobileMenuItem key={item.key}>
                                                <Link
                                                    href={item.href}
                                                    onClick={handleMobileLinkClick}
                                                >
                                                    <button
                                                        className="block text-2xl font-light tracking-wide text-foreground hover:text-foreground/70 transition-colors py-2 w-full text-left"
                                                    >
                                                        {t(item.key)}
                                                    </button>
                                                </Link>
                                            </MobileMenuItem>
                                        ))}
                                    </div>
                                    <div className="h-px w-full bg-border/70" />
                                    <MobileMenuItem>
                                        <Link
                                            href="/schedule"
                                            className="block"
                                            onClick={handleMobileLinkClick}
                                        >
                                            <MagneticButton className="w-full justify-center">
                                                <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
                                                <span>{t('schedule')}</span>
                                            </MagneticButton>
                                        </Link>
                                    </MobileMenuItem>
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