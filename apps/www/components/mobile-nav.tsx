"use client"

import { AlphaLogo } from "@/components/alpha-logo"
import { LanguageChanger } from "@/components/language-switcher"
import { MagneticButton } from "@/components/magnetic-button"
import { gsap } from "@/lib/gsap"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

interface MobileNavProps {
  currentSection: string
  navItems: Array<{ key: string; sectionId: string }>
  scrollToSection: (sectionId: string) => void
  onClose?: () => void
}

export function MobileNav({ currentSection, navItems, scrollToSection, onClose }: MobileNavProps) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
    onClose?.()
  }

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      menuRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)'
      overlayRef.current.style.opacity = isOpen ? '1' : '0'
      overlayRef.current.style.pointerEvents = isOpen ? 'auto' : 'none'
      return
    }

    if (isOpen) {
      gsap.set(menuRef.current, { x: '100%' })
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' })
      gsap.to(menuRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto', ease: 'power2.out' })
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none', ease: 'power2.in' })
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 rounded-lg"
        aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menu */}
      <nav
        ref={menuRef}
        className="fixed right-0 top-0 z-50 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-foreground/10 md:hidden"
        aria-label={t("nav.mobileNavigation")}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center justify-between">
            <AlphaLogo size="md" variant="full" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-foreground/50 rounded-lg"
              aria-label={t("nav.closeMenu")}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.sectionId)}
                className={`group relative rounded-lg px-4 py-3 text-left font-sans text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/50 ${
                  currentSection === item.sectionId
                    ? "bg-foreground/10 text-primary"
                    : "text-primary/80 hover:bg-foreground/5 hover:text-primary"
                }`}
              >
                {t(`nav.${item.key}`)}
                {currentSection === item.sectionId && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-foreground rounded-r" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 border-t border-foreground/10 pt-6">
            <LanguageChanger />
            <MagneticButton
              variant="primary"
              className="w-full"
              onClick={() => handleNavClick("contact")}
            >
              {t("nav.getStarted")}
            </MagneticButton>
          </div>
        </div>
      </nav>
    </>
  )
}

