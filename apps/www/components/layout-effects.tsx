"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeScript } from "@/components/theme-script"
import dynamic from "next/dynamic"
import { Suspense, type ReactNode } from "react"

const CustomCursorLazy = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

const ExitIntentLazy = dynamic(
  () => import("@/components/exit-intent-modal").then((m) => ({ default: m.ExitIntentModal })),
  { ssr: false },
)

const InitialLoaderLazy = dynamic(
  () => import("@/components/initial-loader").then((m) => ({ default: m.InitialLoader })),
  { ssr: false },
)

const SmoothScrollLazy = dynamic(
  () =>
    import("@/components/providers/smooth-scroll-provider").then((m) => ({
      default: m.SmoothScrollProvider,
    })),
  { ssr: false },
)

export function LayoutEffects({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollLazy>
      <InitialLoaderLazy />
      <ThemeScript />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Suspense fallback={null}>
          <CustomCursorLazy />
        </Suspense>
        <div id="main-content" tabIndex={-1} role="main">
          {children}
        </div>
        <ExitIntentLazy />
      </ThemeProvider>
    </SmoothScrollLazy>
  )
}
