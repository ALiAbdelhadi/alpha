"use client"

import { createContext, ReactNode, useContext, useState } from 'react'

interface NavigationContextType {
    currentSection: string
    setCurrentSection: (section: string) => void
    scrollToSection: ((sectionId: string) => void) | null
    setScrollToSection: (fn: ((sectionId: string) => void) | null) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [currentSection, setCurrentSection] = useState("home")
    const [scrollToSection, setScrollToSection] = useState<((sectionId: string) => void) | null>(null)

    return (
        <NavigationContext.Provider
            value={{
                currentSection,
                setCurrentSection,
                scrollToSection,
                setScrollToSection
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation() {
    const context = useContext(NavigationContext)
    if (context === undefined) {
        // Return default values if not in provider (for pages that don't need scroll tracking)
        return {
            currentSection: "home",
            setCurrentSection: () => {},
            scrollToSection: null,
            setScrollToSection: () => {}
        }
    }
    return context
}


