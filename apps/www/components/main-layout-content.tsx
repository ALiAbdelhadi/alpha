"use client"

import { Nav } from "@/components/nav"
import { useLoading } from "@/components/providers/loading-provider"
import { refreshAllTriggers } from "@/lib/animation-utils"
import { layoutChildren } from "@/types"
import { useEffect } from "react"
import { Footer } from "./footer"
import { WhatsAppFloat } from "./whatsapp-cta"

function AnimationController() {
    const { isInitialLoadComplete } = useLoading()

    useEffect(() => {
        if (!isInitialLoadComplete) return
        document.documentElement.setAttribute('data-initial-load', 'complete')

        const raf = requestAnimationFrame(() => {
            refreshAllTriggers(100)
        })

        return () => cancelAnimationFrame(raf)
    }, [isInitialLoadComplete])

    return null
}

export function MainLayoutContent({ children }: layoutChildren) {
    return (
        <main className="relative min-h-screen w-full bg-gray-100/40 dark:bg-gray-900/40">
            <AnimationController />
            <Nav />
            <div id="main-content" className="relative z-10">
                {children}
            </div>
            <Footer />
            {/* <WhatsAppFloat /> */}
        </main>
    )
}