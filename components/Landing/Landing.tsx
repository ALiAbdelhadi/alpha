'use client'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { Fragment, useLayoutEffect, useRef } from 'react'
import Container from '../Container'

const Landing = () => {
    const mainRef = useRef(null)
    const headingRef = useRef(null)
    const ctaRef = useRef(null)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 })
            tl.from(headingRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                .from(".gradient-text", {
                    backgroundSize: "0% 100%",
                    duration: 1.50,
                    ease: "power2.out",
                    backgroundPosition: "0 200%",
                }, "-=0.9")
                .from(".hero-description", {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.8")
                .from(ctaRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2
                }, "-=0.4")
        }, mainRef)
        return () => ctx.revert()
    }, [])
    return (
        <Fragment>
            <div
                ref={mainRef}
                className="relative flex min-h-[86.5vh] py-8 items-center justify-center overflow-hidden transition-colors duration-300  "
            >
                <div className="absolute inset-0 bg-gradient-to-b from-primary from-[27%] via-primary/5 to-background via-45% to-[70%] transition-colors duration-700">
                    <div className="absolute inset-0 backdrop-blur-[100px]" />
                    <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
                </div>
                <Container className='relative'>
                    <div className="grid items-center gap-12 lg:gap-16">
                        <div className="flex flex-col justify-center space-y-12 lg:space-y-16 max-w-4xl">
                            <div className="space-y-8">
                                <h1 ref={headingRef} className="font-semibold text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
                                    Turning your ideas into
                                    <span className="gradient-text bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa] bg-[length:100%_100%] bg-clip-text px-2 text-transparent">
                                        digital solutions
                                    </span>
                                    that work.
                                </h1>
                                <p className=" max-w-2xl text-sm md:text-base text-muted-foreground lg:text-lg hero-description">
                                    Tired of the endless search for the perfect team or the high costs of agencies?
                                    We deliver your first product in just six weeks, efficiently and affordably.
                                </p>
                            </div>
                            <div ref={ctaRef} className="flex flex-col gap-6 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-primary px-8 py-6 text-base md:text-lg font-semibold text-primary-foreground transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/50"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Build Your First MVP
                                        <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 -z-10 bg-primary-foreground/10 transition-transform duration-300 ease-out group-hover:translate-x-full" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group border-2 border-primary px-8 py-6 font-semibold text-primary hover:bg-primary/5 transition-all duration-300 ease-out text-base md:text-lg"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default Landing