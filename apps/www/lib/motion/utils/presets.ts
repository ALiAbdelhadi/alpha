import { MOTION } from "../config"
import type { RevealConfig } from "../hooks/use-reveal"
import type { TextConfig } from "../hooks/use-text"
import type { BatchConfig } from "../hooks/use-batch"

const fadeUp = (overrides: Partial<RevealConfig> = {}): RevealConfig => ({
    direction: "up",
    duration: MOTION.duration.base,
    distance: MOTION.distance.md,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const fadeIn = (overrides: Partial<RevealConfig> = {}): RevealConfig => ({
    direction: "fade",
    duration: MOTION.duration.base,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const slideLeft = (overrides: Partial<RevealConfig> = {}): RevealConfig => ({
    direction: "left",
    duration: MOTION.duration.slow,
    distance: MOTION.distance.lg,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const slideRight = (overrides: Partial<RevealConfig> = {}): RevealConfig => ({
    direction: "right",
    duration: MOTION.duration.slow,
    distance: MOTION.distance.lg,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const scaleIn = (overrides: Partial<RevealConfig> = {}): RevealConfig => ({
    direction: "scale",
    duration: MOTION.duration.fast,
    ease: MOTION.ease.gentle,
    ...overrides,
})

const headline = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    splitBy: "word",
    blur: true,
    duration: MOTION.duration.text,
    stagger: MOTION.stagger.base,
    distance: MOTION.distance.lg,
    ease: MOTION.ease.text,
    ...overrides,
})

const subheading = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    splitBy: "line",
    blur: false,
    duration: MOTION.duration.base,
    stagger: MOTION.stagger.tight,
    distance: MOTION.distance.md,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const body = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    splitBy: "char",
    blur: false,
    duration: MOTION.duration.base,
    distance: MOTION.distance.sm,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const cardGrid = (overrides: Partial<BatchConfig> = {}): BatchConfig => ({
    direction: "up",
    duration: MOTION.duration.base,
    distance: MOTION.distance.md,
    stagger: MOTION.stagger.loose,
    ease: MOTION.ease.smooth,
    ...overrides,
})

const listItems = (overrides: Partial<BatchConfig> = {}): BatchConfig => ({
    direction: "up",
    duration: MOTION.duration.fast,
    distance: MOTION.distance.sm,
    stagger: MOTION.stagger.tight,
    ease: MOTION.ease.smooth,
    ...overrides,
})

export const motion = {
    fadeUp,
    fadeIn,
    slideLeft,
    slideRight,
    scaleIn,
    headline,
    subheading,
    body,
    cardGrid,
    listItems,
} as const
