// Config & types
export { MOTION, DEFAULTS } from "./config"
export type { MotionDistance, MotionDuration, MotionEase, MotionStagger, MotionTrigger } from "./config"

// Hooks
export { useBatch } from "@/lib/motion/hooks/use-batch"
export { useReveal } from "@/lib/motion/hooks/use-reveal"
export { useText } from "@/lib/motion/hooks/use-text"

// Types
export type { BatchConfig } from "@/lib/motion/hooks/use-batch"
export type { RevealConfig, RevealDirection } from "@/lib/motion/hooks/use-reveal"
export type { TextConfig } from "@/lib/motion/hooks/use-text"

// Presets
export { motion } from "./utils/presets"

// Smooth scroll provider