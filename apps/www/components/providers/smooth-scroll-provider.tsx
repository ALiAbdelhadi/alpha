"use client"

import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        lenis.on('scroll', () => {
            ScrollTrigger.update()
        })

        const updateLenis = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(updateLenis)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(updateLenis)
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

