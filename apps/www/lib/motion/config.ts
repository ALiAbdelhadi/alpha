export const DEFAULTS = {

    // Headings — byWord, blur, dramatic
    heading: {
        byWord: true,
        blur: true,
        duration: 1.1,
        stagger: 0.05,
        distance: 40,
    },

    // Subheadings / eyebrows — byLine, subtle
    subheading: {
        byLine: true,
        blur: false,
        duration: 0.9,
        stagger: 0.04,
        distance: 24,
    },

    // Body text / descriptions — no split, simple fade
    body: {
        duration: 0.8,
        distance: 20,
    },

    // Buttons / small elements
    element: {
        direction: "up" as const,
        duration: 0.7,
        distance: 16,
    },

    // Cards / grid items
    card: {
        duration: 0.7,
        stagger: 0.08,
        distance: 24,
    },

} as const


export const MOTION = {
    ease: {
        text: "cubic-bezier(0.2, 0, 0, 1)",      // Premium text reveal
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // General UI
        gentle: "cubic-bezier(0.65, 0, 0.35, 1)",       // Subtle transitions
        ui: "cubic-bezier(0.4, 0, 0.2, 1)",          // Standard interactions
        spring: "elastic.out(1, 0.75)",                   // Playful / bouncy
    },

    duration: {
        micro: 0.15,
        instant: 0.2,
        drawer: 0.3,
        fast: 0.4,
        magnetic: 0.6,
        base: 0.7,
        slow: 1.0,
        text: 0.9,
    },

    /** Cinematic initial load sequence — numeric timings only; eases stay GSAP-native in the component */
    loader: {
        shaderReveal: 2.2,
        textReveal: 1.8,
        charReveal: 1.4,
        label: 1.2,
        holdScale: 1.6,
        shaderExit: 1.4,
        textExit: 1.1,
        containerFade: 0.8,
        charStaggerEach: 0.08,
        charExitStaggerEach: 0.04,
        orbMin: 4,
        orbMax: 6,
        orbStaggerEach: 0.5,
    },

    distance: {
        xs: 8,
        sm: 16,
        md: 24,  // default
        lg: 40,
        xl: 64,
    },

    stagger: {
        tight: 0.04,
        base: 0.06,
        loose: 0.10,
    },

    trigger: {
        // "top bottom" = starts animating the moment element enters viewport from bottom
        default: "top bottom",
        // "top 85%"    = element must be 15% into the viewport before animating
        late: "top 85%",
        // "top 75%"    = element is well inside viewport before animating
        latest: "top 75%",
    },

    lenis: {
        duration: 0.9,
        smoothWheel: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
} as const

export type MotionEase = keyof typeof MOTION.ease
export type MotionDuration = keyof typeof MOTION.duration
export type MotionDistance = keyof typeof MOTION.distance
export type MotionStagger = keyof typeof MOTION.stagger
export type MotionTrigger = keyof typeof MOTION.trigger