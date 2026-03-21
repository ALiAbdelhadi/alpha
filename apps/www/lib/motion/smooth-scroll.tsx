"use client"

import { gsap, ScrollTrigger } from "@/lib/gsap"
import Lenis from 'lenis'
import { useEffect } from "react"
import { MOTION } from "./config"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
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

        return () => {
            gsap.ticker.remove(tick)
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}