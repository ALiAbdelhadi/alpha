import { DEFAULTS, MOTION } from "@/lib/motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/** @deprecated Prefer importing `MOTION.ease` from `@/lib/motion` */
export const EASE = {
    text: MOTION.ease.text,
    smooth: MOTION.ease.smooth,
    gentle: MOTION.ease.gentle,
    ui: MOTION.ease.ui,
    hero: MOTION.ease.text,
    ease: MOTION.ease.smooth,
    easeIn: MOTION.ease.ui,
    easeMid: MOTION.ease.gentle,
} as const

/** Legacy timeline helpers — durations/eases align with `MOTION` / `DEFAULTS` */
export const ANIM = {
    ease: MOTION.ease.smooth,
    easeIn: MOTION.ease.ui,
    easeMid: MOTION.ease.gentle,

    duration: {
        xs: MOTION.duration.fast,
        sm: MOTION.duration.magnetic,
        md: MOTION.duration.base,
        lg: MOTION.duration.text,
        xl: MOTION.duration.slow,
    },

    stagger: {
        tight: MOTION.stagger.tight,
        base: MOTION.stagger.base,
        loose: MOTION.stagger.loose,
        wide: MOTION.stagger.loose + MOTION.stagger.tight,
    },

    distance: {
        sm: DEFAULTS.body.distance,
        md: MOTION.distance.lg,
        lg: MOTION.distance.xl,
    },

    scroll: {
        start: "top 90%",
        startLate: "top 80%",
        startEarly: "top 95%",
    },
} as const

export interface RevealConfig {
    trigger?: Element | null
    delay?: number
    stagger?: number
    distance?: number
    duration?: number
    start?: string
    direction?: "up" | "down" | "left" | "right" | "fade"
}

export function setWillChange(targets: gsap.TweenTarget) {
    gsap.set(targets, { willChange: "transform, opacity" })
}

export function clearWillChange(targets: gsap.TweenTarget) {
    gsap.set(targets, { willChange: "auto" })
}

export function revealEl(
    target: Element,
    config: RevealConfig = {},
): gsap.core.Tween {
    return revealList([target], { stagger: 0, ...config })
}

export function revealList(
    targets: Element[] | NodeListOf<Element>,
    config: RevealConfig = {},
): gsap.core.Tween {
    const {
        trigger,
        delay = 0,
        stagger = ANIM.stagger.base,
        distance = ANIM.distance.md,
        duration = ANIM.duration.md,
        start = ANIM.scroll.start,
        direction = "up",
    } = config

    const arr = Array.from(targets) as Element[]
    const firstTarget = arr[0]

    setWillChange(arr)

    const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        ease: ANIM.ease,
        stagger,
        scrollTrigger: {
            trigger: trigger ?? firstTarget,
            start,
            once: true,
            toggleActions: "play none none none",
        },
        onComplete() {
            clearWillChange(arr)
        },
    }

    if (direction === "up") fromVars.y = distance
    if (direction === "down") fromVars.y = -distance
    if (direction === "left") fromVars.x = distance
    if (direction === "right") fromVars.x = -distance

    return gsap.from(arr, fromVars)
}

export interface BatchRevealConfig {
    start?: string
    distance?: number
    duration?: number
    stagger?: number
    interval?: number
    batchSize?: number
}

export function createBatchReveal(
    selector: string,
    scope: Element | null,
    config: BatchRevealConfig = {},
): void {
    if (!scope) return

    const {
        start = ANIM.scroll.start,
        distance = ANIM.distance.sm,
        duration = ANIM.duration.md,
        stagger = ANIM.stagger.base,
        interval = 0.1,
        batchSize = 4,
    } = config

    const targets = scope.querySelectorAll<HTMLElement>(selector)
    if (!targets.length) return

    setWillChange(targets)

    ScrollTrigger.batch(targets, {
        start,
        once: true,
        interval,
        batchMax: batchSize,
        onEnter: (batch) => {
            gsap.from(batch, {
                opacity: 0,
                y: distance,
                duration,
                stagger,
                ease: ANIM.ease,
                onComplete() {
                    clearWillChange(batch)
                },
            })
        },
    })
}

export function revealSection(
    container: HTMLElement,
    config: RevealConfig = {},
) {
    const start = config.start ?? ANIM.scroll.start

    const eyebrow = container.querySelector<Element>("[data-reveal-eyebrow]")
    const title = container.querySelector<Element>("[data-reveal-title]")
    const body = container.querySelector<Element>("[data-reveal-body]")
    const items = container.querySelectorAll<Element>("[data-reveal-item]")

    if (eyebrow)
        revealEl(eyebrow, { trigger: container, start, duration: ANIM.duration.sm, delay: 0 })
    if (title)
        revealEl(title, { trigger: container, start, duration: ANIM.duration.lg, delay: 0.05 })
    if (body)
        revealEl(body, { trigger: container, start, duration: ANIM.duration.md, delay: 0.15 })
    if (items.length)
        revealList(items, {
            trigger: container,
            start,
            duration: config.duration ?? ANIM.duration.md,
            stagger: config.stagger ?? ANIM.stagger.base,
            delay: 0.10,
            ...config,
        })
}

export function revealLine(
    target: Element,
    config: { trigger?: Element | null; delay?: number; start?: string } = {},
) {
    const { trigger, delay = 0, start = ANIM.scroll.start } = config

    gsap.fromTo(
        target,
        { scaleX: 0, transformOrigin: "left" },
        {
            scaleX: 1,
            duration: ANIM.duration.md,
            delay,
            ease: ANIM.ease,
            scrollTrigger: {
                trigger: trigger ?? target,
                start,
                once: true,
            },
        },
    )
}

let _refreshTimer: ReturnType<typeof setTimeout> | null = null

export function refreshAllTriggers(delay = 150) {
    if (_refreshTimer) clearTimeout(_refreshTimer)
    _refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh(true)
        _refreshTimer = null
    }, delay)
}
