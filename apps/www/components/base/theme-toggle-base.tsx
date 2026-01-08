'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        if (resolvedTheme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    if (!mounted || !resolvedTheme) {
    return (
        <button
            className="group rounded-lg p-2.5 sm:p-2 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center transition-all duration-200"
            disabled
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
    }

    return (
        <button
            onClick={toggleTheme}
            className="group rounded-lg p-2.5 sm:p-2 h-11 w-11 sm:h-9 sm:w-9 flex items-center justify-center transition-all duration-200 hover:bg-muted"
            aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
        >
            {resolvedTheme === 'light' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}