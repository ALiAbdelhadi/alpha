"use client"

import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const switchLocale = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.push(newPath)
        setIsOpen(false)
    }

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
    ]

    const currentLang = languages.find((lang) => lang.code === locale) || languages[0]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/20"
            >
                <span className="text-sm">{currentLang.flag}</span>
                <span className="font-mono text-xs text-foreground/80">{currentLang.code.toUpperCase()}</span>
                <svg
                    className={cn(
                        "h-3 w-3 text-foreground/60 transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-lg border border-foreground/20 bg-foreground/10 backdrop-blur-md shadow-lg">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => switchLocale(lang.code)}
                                className={cn(
                                    "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors first:rounded-t-lg last:rounded-b-lg",
                                    locale === lang.code
                                        ? "bg-foreground/20 text-foreground"
                                        : "text-foreground/80 hover:bg-foreground/15 hover:text-foreground"
                                )}
                            >
                                <span className="text-sm">{lang.flag}</span>
                                <span className="font-mono text-xs">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

