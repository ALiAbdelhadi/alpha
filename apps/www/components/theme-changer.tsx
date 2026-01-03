"use client"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeChanger() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-lg border border-foreground/20 bg-foreground/10 backdrop-blur-md" />
        )
    }

    const isDark = theme === "dark"

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            data-cursor-pointer
            className="group relative h-9 w-16 rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            role="switch"
        >
            {/* Toggle slider */}
            <div
                className={cn(
                    "absolute top-0.5 h-8 w-8 rounded-full bg-foreground/90 shadow-lg transition-all duration-300 ease-out",
                    "flex items-center justify-center",
                    isDark ? "left-[calc(100%-2.125rem)]" : "left-0.5"
                )}
            >
                {isDark ? (
                    <Moon className="h-4 w-4 text-background" strokeWidth={2.5} />
                ) : (
                    <Sun className="h-4 w-4 text-background" strokeWidth={2.5} />
                )}
            </div>

            {/* Background icons (decorative) */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun
                    className={cn(
                        "h-3.5 w-3.5 transition-all duration-300",
                        !isDark ? "opacity-0" : "opacity-30"
                    )}
                />
                <Moon
                    className={cn(
                        "h-3.5 w-3.5 transition-all duration-300",
                        isDark ? "opacity-0" : "opacity-30"
                    )}
                />
            </div>
        </button>
    )
}

/**
 * Alternative vertical variant
 */
export function ThemeChangerVertical() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex flex-col gap-1 rounded-lg border border-foreground/20 bg-foreground/10 p-1 backdrop-blur-md">
                <div className="h-8 w-8 rounded-md" />
                <div className="h-8 w-8 rounded-md" />
            </div>
        )
    }

    const themes = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
    ]

    return (
        <div className="flex flex-col gap-1 rounded-lg border border-foreground/20 bg-foreground/10 p-1 backdrop-blur-md">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    data-cursor-pointer
                    className={cn(
                        "group relative h-8 w-8 rounded-md transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-1",
                        theme === value
                            ? "bg-foreground/90 text-background shadow-md"
                            : "text-foreground/60 hover:bg-foreground/20 hover:text-foreground"
                    )}
                    aria-label={`Switch to ${label} mode`}
                    aria-pressed={theme === value}
                >
                    <Icon className="h-4 w-4 mx-auto" strokeWidth={2.5} />

                    {/* Active indicator */}
                    {theme === value && (
                        <div className="absolute inset-0 rounded-md bg-foreground/10 blur-md -z-10" />
                    )}
                </button>
            ))}
        </div>
    )
}

/**
 * Compact single-icon variant
 */
export function ThemeChangerCompact() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-lg border border-foreground/20 bg-foreground/10 backdrop-blur-md" />
        )
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            data-cursor-pointer
            className="group relative h-9 w-9 rounded-lg border border-foreground/20 bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {/* Animated icon transition */}
            <div className="relative h-full w-full flex items-center justify-center">
                <Sun
                    className={cn(
                        "absolute h-4 w-4 transition-all duration-300",
                        isDark
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                    )}
                    strokeWidth={2.5}
                />
                <Moon
                    className={cn(
                        "absolute h-4 w-4 transition-all duration-300",
                        isDark
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-0 opacity-0"
                    )}
                    strokeWidth={2.5}
                />
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-lg bg-foreground/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-md -z-10" />
        </button>
    )
}