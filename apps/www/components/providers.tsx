"use client"

import { LoadingProvider } from "@/components/providers/loading-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                {children}
            </LoadingProvider>
        </QueryClientProvider>
    )
}