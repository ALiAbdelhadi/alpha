"use client"

import { LoadingProvider } from "@/components/providers/loading-provider"
import { type ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LoadingProvider>
            {children}
        </LoadingProvider>
    )
}
