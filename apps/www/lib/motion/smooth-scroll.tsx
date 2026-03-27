"use client"

import { useEffect } from "react"
import type Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let cancelled = false
        let gsapInstance: typeof import("@/lib/gsap") | null = null
        let lenisInstance: Lenis | null = null
        let tickFn: ((time: number) => void) | null = null

        const init = async () => {
            try {
                const [{ gsap, ScrollTrigger }, { default: Lenis }, { MOTION }] = await Promise.all([
                    import("@/lib/gsap"),
                    import("lenis"),
                    import("@/lib/motion/config"),
                ])

                if (cancelled) return

                gsapInstance = { gsap, ScrollTrigger }

                const lenis = new Lenis({
                    duration: MOTION.lenis.duration,
                    easing: MOTION.lenis.easing,
                    smoothWheel: MOTION.lenis.smoothWheel,
                })

                lenisInstance = lenis

                lenis.on("scroll", () => {
                    ScrollTrigger.update()
                })

                tickFn = (time: number) => lenis.raf(time * 1000)

                gsap.ticker.add(tickFn)
                gsap.ticker.lagSmoothing(0)
            } catch (e) {
                console.warn("Failed to initialize smooth scroll:", e)
            }
        }

        init()

        return () => {
            cancelled = true
            if (gsapInstance && tickFn) {
                gsapInstance.gsap.ticker.remove(tickFn)
            }
            lenisInstance?.destroy()
        }
    }, [])

    return <>{children}</>
}