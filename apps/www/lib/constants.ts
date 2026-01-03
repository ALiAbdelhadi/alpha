/**
 * Design system constants
 * Centralized spacing, animation, and brand values
 */

// Spacing scale (4px base unit)
export const SPACING = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
} as const

// Animation durations
export const ANIMATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.8,
  slower: 1.2,
} as const

// Brand colors (extracted from hardcoded values)
export const BRAND_COLORS = {
  teal: '#0d9488',
  cyan: '#06b6d4',
  tealLight: '#14b8a6',
  cyanLight: '#22d3ee',
  cyanDark: '#0891b2',
} as const

// Consolidate to single source of truth
export const COLORS = {
  brand: {
    teal: {
      DEFAULT: 'oklch(0.6 0.15 180)',
      light: 'oklch(0.7 0.15 180)',
      dark: 'oklch(0.5 0.15 180)',
    }
  }
} as const



// Section IDs for navigation
export const SECTIONS = {
  home: 'home',
  work: 'work',
  services: 'services',
  about: 'about',
  contact: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]



