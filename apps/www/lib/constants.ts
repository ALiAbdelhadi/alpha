/**
 * Design System Constants
 * 
 * Centralized source of truth for all design tokens, brand values,
 * and configuration constants used throughout the Alpha website.
 * 
 * Philosophy: Single source of truth eliminates inconsistencies
 * and makes global changes simple and predictable.
 */

// ============================================================================
// BRAND COLORS
// ============================================================================

/**
 * Brand Colors - Primary Identity
 * 
 * These colors define Alpha's visual identity and are used consistently
 * across all shaders, gradients, and UI elements.
 * 
 * All colors are defined in hex format for compatibility with:
 * - CSS (direct usage)
 * - Shader libraries (Swirl, ChromaFlow)
 * - Tailwind config (if needed)
 */
export const BRAND_COLORS = {
  // Primary teal shades
  teal: '#0d9488',        // Main brand color - deep teal
  tealLight: '#14b8a6',   // Lighter variant for accents
  
  // Primary cyan shades
  cyan: '#06b6d4',        // Main accent color - vibrant cyan
  cyanLight: '#22d3ee',   // Lighter variant for highlights
  cyanDark: '#0891b2',    // Darker variant for depth
} as const

/**
 * Type-safe brand color keys
 */
export type BrandColorKey = keyof typeof BRAND_COLORS

// ============================================================================
// SPACING SCALE
// ============================================================================

/**
 * Spacing Scale - 4px base unit
 * 
 * Consistent spatial rhythm creates visual harmony.
 * All spacing values are multiples of 4px.
 */
export const SPACING = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px - Base unit
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
} as const

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

/**
 * Animation Durations (seconds)
 * 
 * Standardized timing for consistent motion across the site.
 * All durations are in seconds for GSAP compatibility.
 */
export const ANIMATION = {
  fast: 0.3,      // Quick micro-interactions
  medium: 0.6,   // Standard transitions
  slow: 0.8,     // Emphasis animations
  slower: 1.2,   // Page transitions
} as const

// ============================================================================
// NAVIGATION
// ============================================================================

/**
 * Section IDs for Navigation
 * 
 * Centralized section identifiers ensure consistency between:
 * - Navigation menu
 * - Scroll tracking
 * - URL anchors
 * - Analytics tracking
 */
export const SECTIONS = {
  home: 'home',
  work: 'work',
  services: 'services',
  about: 'about',
  contact: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]

/**
 * Navigation items configuration
 * Used for generating navigation menus and scroll tracking
 */
export const NAV_ITEMS = [
  { key: 'home', sectionId: SECTIONS.home },
  { key: 'work', sectionId: SECTIONS.work },
  { key: 'services', sectionId: SECTIONS.services },
  { key: 'about', sectionId: SECTIONS.about },
  { key: 'contact', sectionId: SECTIONS.contact },
] as const

// ============================================================================
// SHADER CONFIGURATION
// ============================================================================

/**
 * Shader Effect Configuration
 * 
 * Default values for 3D shader effects (Swirl, ChromaFlow).
 * These values create the signature Alpha visual identity.
 */
export const SHADER_CONFIG = {
  swirl: {
    speed: 0.8,
    detail: 0.8,
    blend: 50,
    coarseX: 40,
    coarseY: 40,
    mediumX: 40,
    mediumY: 40,
    fineX: 40,
    fineY: 40,
  },
  chromaFlow: {
    intensity: 1.2,
    radius: 1.8,
    momentum: 35,
    maskType: 'alpha' as const,
    opacity: 0.97,
  },
} as const

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================

/**
 * Performance Thresholds
 * 
 * Values used to determine when to disable heavy effects
 * for better performance on low-end devices.
 */
export const PERFORMANCE = {
  minHardwareConcurrency: 4,  // Minimum CPU cores for particles
  particleCount: 30,          // Number of floating particles
  particleConnectionDistance: 150, // Max distance for particle connections
} as const



