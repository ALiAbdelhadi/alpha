"use client"

import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

type TransitionVariant = "fade" | "slide" | "scale" | "reveal" | "split"

interface TransitionSectionProps {
    from: string
    to: string
    description?: string
    variant?: TransitionVariant
    className?: string
    accentColor?: string
}

export function TransitionSection({
    from,
    to,
    description,
    variant = "fade",
    className = "",
    accentColor = "currentColor",
}: TransitionSectionProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const fromRef = useRef<HTMLDivElement>(null)
    const toRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            })

            switch (variant) {
                case "fade":
                    tl.from(fromRef.current, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power3.out",
                    })
                        .from(
                            lineRef.current,
                            {
                                scaleX: 0,
                                transformOrigin: "left center",
                                duration: 1.2,
                                ease: "power3.inOut",
                            },
                            "-=0.5"
                        )
                        .from(
                            toRef.current,
                            {
                                opacity: 0,
                                y: 50,
                                duration: 1,
                                ease: "power3.out",
                            },
                            "-=0.8"
                        )
                    break

                case "slide":
                    tl.from(fromRef.current, {
                        x: -100,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                    })
                        .from(
                            lineRef.current,
                            {
                                scaleX: 0,
                                duration: 1,
                                ease: "power2.inOut",
                            },
                            "-=0.5"
                        )
                        .from(
                            toRef.current,
                            {
                                x: 100,
                                opacity: 0,
                                duration: 1,
                                ease: "power3.out",
                            },
                            "-=0.8"
                        )
                    break

                case "scale":
                    tl.from(fromRef.current, {
                        scale: 0.5,
                        opacity: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                    })
                        .from(
                            lineRef.current,
                            {
                                scaleX: 0,
                                duration: 0.8,
                                ease: "power2.inOut",
                            },
                            "-=0.3"
                        )
                        .from(
                            toRef.current,
                            {
                                scale: 0.5,
                                opacity: 0,
                                duration: 1,
                                ease: "back.out(1.7)",
                            },
                            "-=0.6"
                        )
                    break

                case "reveal":
                    tl.from(fromRef.current, {
                        clipPath: "inset(0 100% 0 0)",
                        duration: 1.2,
                        ease: "power4.inOut",
                    })
                        .from(
                            lineRef.current,
                            {
                                scaleX: 0,
                                duration: 1,
                                ease: "power3.out",
                            },
                            "-=0.6"
                        )
                        .from(
                            toRef.current,
                            {
                                clipPath: "inset(0 0 0 100%)",
                                duration: 1.2,
                                ease: "power4.inOut",
                            },
                            "-=0.8"
                        )
                    break

                case "split":
                    tl.from(fromRef.current, {
                        opacity: 0,
                        rotateX: -90,
                        transformOrigin: "bottom center",
                        duration: 1,
                        ease: "power3.out",
                    })
                        .from(
                            lineRef.current,
                            {
                                scaleX: 0,
                                duration: 0.8,
                            },
                            "-=0.4"
                        )
                        .from(
                            toRef.current,
                            {
                                opacity: 0,
                                rotateX: 90,
                                transformOrigin: "top center",
                                duration: 1,
                                ease: "power3.out",
                            },
                            "-=0.6"
                        )
                    break
            }

            // Description animation
            if (descRef.current) {
                tl.from(
                    descRef.current,
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    "-=0.5"
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [variant])

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-screen flex items-center justify-center py-20 px-4 ${className}`}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto w-full">
                <div className="flex flex-col items-center gap-8 md:gap-12">
                    {/* From Section */}
                    <div ref={fromRef} className="text-center">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
                            {from}
                        </h2>
                    </div>

                    {/* Connecting Line with Dot */}
                    <div className="relative w-full max-w-md">
                        <div
                            ref={lineRef}
                            className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
                            style={{
                                background: `linear-gradient(to right, transparent, ${accentColor}20, transparent)`,
                            }}
                        />
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                            style={{ backgroundColor: accentColor }}
                        >
                            <div
                                className="absolute inset-0 rounded-full animate-ping opacity-75"
                                style={{ backgroundColor: accentColor }}
                            />
                        </div>
                    </div>

                    {/* To Section */}
                    <div ref={toRef} className="text-center">
                        <h2
                            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
                            style={{ color: accentColor }}
                        >
                            {to}
                        </h2>
                    </div>

                    {/* Description (Optional) */}
                    {description && (
                        <p
                            ref={descRef}
                            className="text-center text-base md:text-lg text-muted-foreground max-w-2xl mt-4"
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-foreground/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-foreground/5 rounded-full blur-3xl" />
            </div>
        </section>
    )
}