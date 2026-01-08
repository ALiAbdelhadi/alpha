"use client"

import { LoadingProvider } from "@/components/providers/loading-provider"
import { NavigationProvider } from "@/components/providers/navigation-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <NavigationProvider>
                    {children}
                </NavigationProvider>
            </LoadingProvider>
        </QueryClientProvider>
    )
}