"use client"

import { useEffect } from "react"

/**
 * Theme initialization script moved to client component
 * Prevents XSS risks from inline scripts
 */
export function ThemeScript() {
  useEffect(() => {
    try {
      const theme = localStorage.getItem('theme-preference')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const shouldBeDark = theme === 'dark' || (!theme && prefersDark)
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }, [])

  return null
}

