"use client"

/**
 * Theme Switcher Components
 * 
 * Wrapper components that use the unified ThemeSwitcherBase.
 * Maintains backward compatibility while eliminating code duplication.
 */

import { ThemeToggle } from "./base/theme-toggle-base"

export function ThemeChanger() {
    return <ThemeToggle />
}