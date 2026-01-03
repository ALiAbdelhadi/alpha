"use client"

/**
 * Base Language Switcher Component
 * 
 * Unified base component for all language switcher variants.
 * Eliminates code duplication across LanguageChanger, LanguageChangerCompact, and LanguageChangerToggle.
 */

import { cn } from "@/lib/utils"
import { Check, ChevronDown, Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export type LanguageSwitcherVariant = "default" | "compact" | "toggle"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  direction: 'ltr' | 'rtl'
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "US", direction: 'ltr' },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "EG", direction: 'rtl' },
]

interface LanguageSwitcherBaseProps {
  variant?: LanguageSwitcherVariant
  className?: string
}

export function LanguageSwitcherBase({ variant = "default", className }: LanguageSwitcherBaseProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentLang = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0]

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setIsOpen(false)
  }

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      menuRef.current.style.opacity = isOpen ? '1' : '0'
      menuRef.current.style.transform = isOpen ? 'scale(1)' : 'scale(0.95)'
      menuRef.current.style.pointerEvents = isOpen ? 'auto' : 'none'
      return
    }

    if (isOpen) {
      gsap.set(menuRef.current, { opacity: 0, scale: 0.95, y: -10 })
      gsap.to(menuRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
        pointerEvents: "auto",
      })
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -10,
        duration: 0.15,
        ease: "power2.in",
        pointerEvents: "none",
      })
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Toggle variant (inline buttons)
  if (variant === "toggle") {
    return (
      <div className={cn("flex items-center gap-1 rounded-lg border border-foreground/20 bg-foreground/10 p-1 backdrop-blur-md", className)}>
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.code

          return (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              data-cursor-pointer
              className={cn(
                "relative px-3 py-1.5 rounded-md font-mono text-xs uppercase transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-1",
                isActive
                  ? "bg-foreground/90 text-background shadow-md"
                  : "text-foreground/60 hover:bg-foreground/20 hover:text-foreground"
              )}
              aria-label={`Switch to ${lang.name}`}
              aria-pressed={isActive}
            >
              {lang.code}

              {isActive && (
                <div className="absolute inset-0 rounded-md bg-foreground/10 blur-md -z-10" />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Default and Compact variants (dropdown)
  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-pointer
        className={cn(
          "group flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2",
          variant === "compact" && "h-9 w-9 p-0 justify-center"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {variant === "compact" ? (
          <>
            <Globe className="h-4 w-4 mx-auto text-foreground/80" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-mono font-semibold">
              {currentLang.code.charAt(0).toUpperCase()}
            </span>
          </>
        ) : (
          <>
            <span className="font-mono text-xs text-foreground/80 uppercase">
              {currentLang.code}
            </span>
            <ChevronDown
              className={cn(
                "h-3 w-3 text-foreground/60 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={cn(
          "absolute right-0 top-full z-50 mt-2 rounded-lg border border-foreground/20 bg-foreground/10 backdrop-blur-md shadow-lg",
          variant === "compact" ? "w-40" : "w-48"
        )}
        style={{ opacity: 0, pointerEvents: 'none' }}
        role="menu"
        aria-orientation="vertical"
      >
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.code

          return (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              data-cursor-pointer
              className={cn(
                "flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg",
                variant === "compact" ? "gap-2 px-3 py-2" : "gap-3 px-4 py-2.5",
                isActive
                  ? "bg-foreground/20 text-foreground"
                  : "text-foreground/80 hover:bg-foreground/15 hover:text-foreground"
              )}
              role="menuitem"
              aria-current={isActive ? "true" : undefined}
            >
              <div className="flex items-center gap-2">
                {variant === "compact" ? (
                  <span className="text-xs font-medium">{lang.nativeName}</span>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.nativeName}</span>
                    <span className="font-mono text-xs text-foreground/50">
                      {lang.name}
                    </span>
                  </div>
                )}
              </div>

              {isActive && (
                <Check className={cn("text-foreground", variant === "compact" ? "h-3.5 w-3.5" : "h-4 w-4")} strokeWidth={2.5} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

