"use client"

import { useEffect } from "react"

/**
 * Lenis + GSAP ticker run after idle so first paint / hydration stay responsive (Lighthouse TBT).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let cancelled = false
        let teardown: (() => void) | undefined

        const useIdle =
            typeof window !== "undefined" && typeof window.requestIdleCallback !== "undefined"

        const idleId = useIdle
            ? window.requestIdleCallback(() => run(), { timeout: 2000 })
            : window.setTimeout(() => run(), 1)

        function run() {
            void (async () => {
                if (cancelled) return
                const [{ gsap, ScrollTrigger }, { default: Lenis }, { MOTION }] = await Promise.all([
                    import("@/lib/gsap"),
                    import("lenis"),
                    import("@/lib/motion/config"),
                ])
                if (cancelled) return

                const lenis = new Lenis({
                    duration: MOTION.lenis.duration,
                    easing: MOTION.lenis.easing,
                    smoothWheel: MOTION.lenis.smoothWheel,
                })

                lenis.on("scroll", () => {
                    ScrollTrigger.update()
                })

                const tick = (time: number) => lenis.raf(time * 1000)
                gsap.ticker.add(tick)
                gsap.ticker.lagSmoothing(0)

                teardown = () => {
                    gsap.ticker.remove(tick)
                    lenis.destroy()
                }
            })()
        }

        return () => {
            cancelled = true
            if (useIdle) window.cancelIdleCallback(idleId)
            else window.clearTimeout(idleId)
            teardown?.()
        }
    }, [])

    return <>{children}</>
}
