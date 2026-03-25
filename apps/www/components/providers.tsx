"use client"

import { LoadingProvider } from "@/components/providers/loading-provider"
import { NavigationProvider } from "@/components/providers/navigation-provider"
import { type ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LoadingProvider>
            <NavigationProvider>{children}</NavigationProvider>
        </LoadingProvider>
    )
}
