// lib/motion/utils/presets.ts
// ─────────────────────────────────────────────────────────────
// Named presets for common animation patterns.
// Use these instead of manually specifying every option.
//
// Usage:
//   useReveal(motion.fadeUp())
//   useReveal(motion.fadeUp({ delay: 0.2 }))
//   useText(motion.headline())
//   useBatch(motion.cardGrid())
// ─────────────────────────────────────────────────────────────

import { MOTION } from "../config"
import type { RevealConfig } from "../hooks/use-reveal"
import type { TextConfig } from "../hooks/use-text"
import type { BatchConfig } from "../hooks/use-batch"

// ─── Reveal presets ───────────────────────────────────────────

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

// ─── Text presets ─────────────────────────────────────────────

/** Large hero/section headings — word-by-word with blur */
const headline = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    byWord: true,
    blur: true,
    duration: MOTION.duration.text,
    stagger: MOTION.stagger.base,
    distance: MOTION.distance.lg,
    ease: MOTION.ease.text,
    ...overrides,
})

/** Subheadings — line-by-line, subtle */
const subheading = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    byLine: true,
    blur: false,
    duration: MOTION.duration.base,
    stagger: MOTION.stagger.tight,
    distance: MOTION.distance.md,
    ease: MOTION.ease.smooth,
    ...overrides,
})

/** Body text — single fade-up, no split */
const body = (overrides: Partial<TextConfig> = {}): TextConfig => ({
    byWord: false,
    byLine: false,
    blur: false,
    duration: MOTION.duration.base,
    distance: MOTION.distance.sm,
    ease: MOTION.ease.smooth,
    ...overrides,
})

// ─── Batch presets ────────────────────────────────────────────

/** Service / feature cards grid */
const cardGrid = (overrides: Partial<BatchConfig> = {}): BatchConfig => ({
    direction: "up",
    duration: MOTION.duration.base,
    distance: MOTION.distance.md,
    stagger: MOTION.stagger.loose,
    ease: MOTION.ease.smooth,
    ...overrides,
})

/** List items — tight stagger */
const listItems = (overrides: Partial<BatchConfig> = {}): BatchConfig => ({
    direction: "up",
    duration: MOTION.duration.fast,
    distance: MOTION.distance.sm,
    stagger: MOTION.stagger.tight,
    ease: MOTION.ease.smooth,
    ...overrides,
})

// ─── Export ───────────────────────────────────────────────────

export const motion = {
    // Reveal
    fadeUp,
    fadeIn,
    slideLeft,
    slideRight,
    scaleIn,
    // Text
    headline,
    subheading,
    body,
    // Batch
    cardGrid,
    listItems,
} as const