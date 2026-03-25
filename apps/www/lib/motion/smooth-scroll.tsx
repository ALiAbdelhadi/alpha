"use client"

import { useEffect } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        let cancelled = false
        let teardown: (() => void) | undefined
        let initialized = false

        const initSmoothScroll = async () => {
            if (initialized || cancelled) return
            initialized = true

            try {
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
            } catch (e) {
                console.warn("Failed to initialize smooth scroll:", e)
            }
        }

        const handleFirstInteraction = () => {
            initSmoothScroll()
            window.removeEventListener("pointerdown", handleFirstInteraction)
            window.removeEventListener("keydown", handleFirstInteraction)
            window.removeEventListener("touchstart", handleFirstInteraction)
        }

        window.addEventListener("pointerdown", handleFirstInteraction, { once: true, passive: true })
        window.addEventListener("keydown", handleFirstInteraction, { once: true })
        window.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true })

        const fallbackTimer = setTimeout(() => {
            if (!initialized) {
                initSmoothScroll()
            }
        }, 3000)

        return () => {
            cancelled = true
            clearTimeout(fallbackTimer)
            window.removeEventListener("pointerdown", handleFirstInteraction)
            window.removeEventListener("keydown", handleFirstInteraction)
            window.removeEventListener("touchstart", handleFirstInteraction)
            teardown?.()
        }
    }, [])

    return <>{children}</>
}
