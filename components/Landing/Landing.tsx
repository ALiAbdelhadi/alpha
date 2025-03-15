'use client'

import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fragment, useLayoutEffect, useRef } from 'react'
import Container from '../Container'
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}
const Landing = () => {
    const mainRef = useRef(null)
    const headingRef = useRef(null)
    const ctaRef = useRef(null)
    const gridRef = useRef(null)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })
            tl.from(headingRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            })
                .from(".gradient-text", {
                    backgroundSize: "0% 100%",
                    duration: 1.8,
                    ease: "power2.out",
                    backgroundPosition: "0 200%",
                }, "-=1.1")
                .from(".hero-description", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                }, "-=1")
                .from(ctaRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                }, "-=0.6")
            gsap.to(".gradient-bg", {
                backgroundPosition: "200% 200%",
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })
            gsap.to(gridRef.current, {
                backgroundPosition: "40px 40px",
                duration: 20,
                repeat: -1,
                ease: "linear",
            })
            const buttons = document.querySelectorAll('button')
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.03,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                })
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                })
            })
            ScrollTrigger.create({
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const progress = self.progress
                    gsap.to(".gradient-bg", {
                        opacity: 1 - (progress * 0.2),
                        duration: 0.5
                    })
                }
            })
        }, mainRef)
        return () => ctx.revert()
    }, [])
    return (
        <Fragment>
            <div
                ref={mainRef}
                className="relative flex min-h-screen items-center justify-center overflow-hidden transition-colors duration-300 top-0"
            >
                {/* Enhanced gradient background */}
                <div className="gradient-bg absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/30 to-purple-700/30 transition-colors duration-700 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 repeat-infinite">
                    <div className="absolute inset-0 backdrop-blur-[100px]" />
                    {/* Additional gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-secondary/10 animate-gradient" />
                    {/* Noise texture */}
                    <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
                </div>
                {/* Grid pattern overlay */}
                <div ref={gridRef} className="absolute inset-0 bg-grid-pattern opacity-[0.07] dark:opacity-[0.03]" />
                {/* Main content */}
                <Container className='relative'>
                    <div className="grid items-center gap-12 lg:gap-16">
                        <div className="flex flex-col justify-center space-y-12 lg:space-y-16 max-w-4xl">
                            <div className="space-y-8">
                                <h1 ref={headingRef} className="text-3xl font-semibold leading-[1.20em] sm:text-4xl md:text-5xl lg:text-6xl text-gray-950 dark:text-gray-100">
                                    Turning your ideas into
                                    <span className="gradient-text bg-gradient-to-r from-primary via-purple-800/30 to-accent bg-[length:100%_100%] bg-clip-text px-2 text-transparent">
                                        digital solutions
                                    </span>
                                    that work.
                                </h1>
                                <p className="max-w-2xl text-lg text-muted-foreground md:text-xl hero-description">
                                    Struggling to hire the right team? Or finding agencies too costly?
                                    We deliver your first product within six weeks, efficiently and affordably.
                                </p>
                            </div>
                            <div ref={ctaRef} className="flex flex-col gap-6 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground"
                                >
                                    <span className="relative z-10">Build Your First MVP</span>
                                    <div className="absolute inset-0 -z-0 bg-primary-foreground/10 transition-transform duration-300 group-hover:translate-x-full" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group border-2 border-primary px-6 py-4 text-lg font-semibold text-primary hover:bg-primary/90 hover:text-primary-foreground"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>

                </Container>
                <style jsx>{`
                .bg-grid-pattern {
                    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                        linear-gradient(90deg, var(--border) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .gradient-bg {
                    background-size: 400% 400%;
                    animation: gradient 25s ease infinite;
                }
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
                }
                @keyframes gradient {
                    0% {
                        background-position: 0% 0%;
                    }
                    25% {
                        background-position: 50% 100%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    75% {
                        background-position: 50% 0%;
                    }
                    100% {
                        background-position: 0% 0%;
                    }
                }
            `}</style>
            </div>
        </Fragment>
    )
}
export default Landing