// ============================================================================
// Alpha BRAND COLORS - TEAL + NAVY HYBRID SYSTEM
// ============================================================================
// Strategic Approach: Monochromatic Teal (70%) + Deep Navy (30%)
// Primary: Teal/Cyan gradient (Clean, Modern, Tech)
// Depth: Navy/Midnight Blue (Professional, Powerful, Premium)
// Result: Apple-inspired minimalism + Corporate strength
// ============================================================================

export const BRAND_COLORS = {
  // ========== MONOCHROMATIC TEAL FAMILY (Primary 70%) ==========
  tealDarkest: '#064e3b',    // Darkest teal - Deep backgrounds
  tealDark: '#0f766e',       // Dark teal - Solid elements
  teal: '#0d9488',           // Core brand - Main color
  tealLight: '#14b8a6',      // Light teal - Hover states
  tealLighter: '#2dd4bf',    // Lighter teal - Accents

  // ========== CYAN FAMILY (Brightness) ==========
  cyanDark: '#0891b2',       // Deep cyan
  cyan: '#06b6d4',           // Bright cyan
  cyanLight: '#22d3ee',      // Light cyan
  cyanLighter: '#67e8f9',    // Extra light - Highlights
  cyanPale: '#a5f3fc',       // Pale cyan - Subtle backgrounds

  // ========== NAVY FAMILY (Depth & Premium 30%) ==========
  navyDeep: '#0a1929',       // Deep navy - Hero backgrounds
  navy: '#0f172a',           // Core navy - Dark sections
  navyMedium: '#1e293b',     // Medium navy - Cards
  navyLight: '#334155',      // Light navy - Borders
  navySlate: '#475569',      // Slate - Secondary text

  // ========== ACCENT & PREMIUM ==========
  accent: '#0ea5e9',         // Sky blue - CTAs
  accentLight: '#38bdf8',    // Light sky - Hover CTAs
  premium: '#0c4a6e',        // Deep blue - Pro badges

  // ========== NEUTRAL GRAYS ==========
  gray: '#64748b',           // Base gray
  grayLight: '#94a3b8',      // Light gray
  grayLighter: '#cbd5e1',    // Lighter gray
} as const

export type BrandColorKey = keyof typeof BRAND_COLORS

// ============================================================================
// COLOR ROLES & SEMANTIC NAMING
// ============================================================================

export const COLOR_ROLES = {
  // Primary brand (Teal-based)
  primary: BRAND_COLORS.teal,
  primaryLight: BRAND_COLORS.tealLight,
  primaryDark: BRAND_COLORS.tealDark,
  primaryDarkest: BRAND_COLORS.tealDarkest,

  // Secondary (Cyan-based)
  secondary: BRAND_COLORS.cyan,
  secondaryLight: BRAND_COLORS.cyanLight,
  secondaryDark: BRAND_COLORS.cyanDark,

  // Depth & Backgrounds (Navy-based)
  surface: BRAND_COLORS.navy,
  surfaceDeep: BRAND_COLORS.navyDeep,
  surfaceElevated: BRAND_COLORS.navyMedium,

  // Interactive
  accent: BRAND_COLORS.accent,
  accentHover: BRAND_COLORS.accentLight,

  // Premium
  premium: BRAND_COLORS.premium,
  premiumBadge: BRAND_COLORS.navyMedium,

  // Borders
  border: BRAND_COLORS.navyLight,
  borderSubtle: BRAND_COLORS.navyMedium,

  // Text
  textPrimary: BRAND_COLORS.cyanPale,
  textSecondary: BRAND_COLORS.grayLight,
  textMuted: BRAND_COLORS.navySlate,
} as const

// ============================================================================
// GRADIENT SYSTEM
// ============================================================================

export const GRADIENTS = {
  // ===== MONOCHROMATIC TEAL GRADIENTS =====
  teal: `linear-gradient(135deg, ${BRAND_COLORS.tealDark} 0%, ${BRAND_COLORS.teal} 100%)`,
  tealLight: `linear-gradient(135deg, ${BRAND_COLORS.teal} 0%, ${BRAND_COLORS.tealLight} 100%)`,
  tealBright: `linear-gradient(135deg, ${BRAND_COLORS.tealLight} 0%, ${BRAND_COLORS.cyanLight} 100%)`,

  // ===== TEAL TO CYAN (Primary Brand) =====
  primary: `linear-gradient(135deg, ${BRAND_COLORS.teal} 0%, ${BRAND_COLORS.cyan} 100%)`,
  primaryReverse: `linear-gradient(135deg, ${BRAND_COLORS.cyan} 0%, ${BRAND_COLORS.teal} 100%)`,

  // ===== NAVY + TEAL (Depth & Sophistication) =====
  hero: `linear-gradient(135deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.tealDarkest} 100%)`,
  heroAlt: `linear-gradient(180deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.navy} 50%, ${BRAND_COLORS.tealDarkest} 100%)`,

  // ===== PREMIUM & PRO =====
  premium: `linear-gradient(135deg, ${BRAND_COLORS.premium} 0%, ${BRAND_COLORS.teal} 100%)`,
  premiumSubtle: `linear-gradient(135deg, ${BRAND_COLORS.navyMedium} 0%, ${BRAND_COLORS.tealDark} 100%)`,

  // ===== INTERACTIVE & CTAs =====
  cta: `linear-gradient(135deg, ${BRAND_COLORS.accent} 0%, ${BRAND_COLORS.cyan} 100%)`,
  ctaHover: `linear-gradient(135deg, ${BRAND_COLORS.accentLight} 0%, ${BRAND_COLORS.cyanLight} 100%)`,

  // ===== SUBTLE BACKGROUNDS =====
  subtle: `linear-gradient(135deg, ${BRAND_COLORS.navyDeep} 0%, ${BRAND_COLORS.navy} 100%)`,
  subtleElevated: `linear-gradient(135deg, ${BRAND_COLORS.navy} 0%, ${BRAND_COLORS.navyMedium} 100%)`,

  // ===== SPECIAL EFFECTS =====
  glow: `radial-gradient(circle at center, ${BRAND_COLORS.cyan}40 0%, transparent 70%)`,
  shimmer: `linear-gradient(90deg, transparent 0%, ${BRAND_COLORS.cyanLight}20 50%, transparent 100%)`,

  // ===== MESH GRADIENTS (Complex backgrounds) =====
  mesh: `
    radial-gradient(at 0% 0%, ${BRAND_COLORS.navyDeep} 0%, transparent 50%),
    radial-gradient(at 100% 0%, ${BRAND_COLORS.tealDarkest} 0%, transparent 50%),
    radial-gradient(at 100% 100%, ${BRAND_COLORS.navy} 0%, transparent 50%),
    radial-gradient(at 0% 100%, ${BRAND_COLORS.tealDark} 0%, transparent 50%)
  `,
} as const

// ============================================================================
// COMPONENT COLOR SCHEMES
// ============================================================================

export const COMPONENT_SCHEMES = {
  // Free tier components (Teal-based)
  free: {
    bg: BRAND_COLORS.navy,
    bgHover: BRAND_COLORS.navyMedium,
    border: BRAND_COLORS.tealDark,
    text: BRAND_COLORS.cyanLight,
    accent: BRAND_COLORS.teal,
    gradient: GRADIENTS.teal,
  },

  // Pro tier components (Navy + Premium teal)
  pro: {
    bg: BRAND_COLORS.navyMedium,
    bgHover: BRAND_COLORS.navyLight,
    border: BRAND_COLORS.accent,
    text: BRAND_COLORS.cyanPale,
    accent: BRAND_COLORS.accent,
    badge: BRAND_COLORS.premium,
    gradient: GRADIENTS.premium,
  },

  // Premium blocks (Full gradient)
  premium: {
    bg: BRAND_COLORS.navyDeep,
    border: BRAND_COLORS.cyanDark,
    text: BRAND_COLORS.cyanLighter,
    accent: BRAND_COLORS.accentLight,
    gradient: GRADIENTS.hero,
  },

  // Interactive states
  button: {
    default: {
      bg: BRAND_COLORS.teal,
      text: BRAND_COLORS.navyDeep,
      border: BRAND_COLORS.teal,
    },
    hover: {
      bg: BRAND_COLORS.tealLight,
      text: BRAND_COLORS.navyDeep,
      border: BRAND_COLORS.tealLight,
    },
    active: {
      bg: BRAND_COLORS.tealDark,
      text: BRAND_COLORS.cyanPale,
      border: BRAND_COLORS.tealDark,
    },
  },

  // Card variants
  card: {
    default: {
      bg: BRAND_COLORS.navy,
      border: BRAND_COLORS.navyLight,
      shadow: `${BRAND_COLORS.navyDeep}80`,
    },
    elevated: {
      bg: BRAND_COLORS.navyMedium,
      border: BRAND_COLORS.tealDark,
      shadow: `${BRAND_COLORS.teal}20`,
    },
    premium: {
      bg: BRAND_COLORS.navyDeep,
      border: BRAND_COLORS.accent,
      gradient: GRADIENTS.premiumSubtle,
      shadow: `${BRAND_COLORS.cyan}30`,
    },
  },
} as const

// ============================================================================
// SPACING & LAYOUT
// ============================================================================

export const SPACING = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px - Base
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
  '5xl': '8rem',  // 128px
} as const

// ============================================================================
// TYPOGRAPHY SYSTEM (1.250 - Major Third Scale)
// ============================================================================

export const TYPOGRAPHY = {
  fontSizes: {
    h1: '4.768rem',    // 76.29px - Hero statements
    h2: '3.815rem',    // 61.04px - Section titles
    h3: '3.052rem',    // 48.83px - Subsection titles
    h4: '2.441rem',    // 39.06px - Card titles
    bodyLg: '1.25rem', // 20px - Important body text
    body: '1rem',      // 16px - Standard body text
    small: '0.8rem',   // 12.8px - Labels, captions
    mono: '0.875rem',  // 14px - Code, technical text
  },
  lineHeights: {
    tight: 1.1,      // Headings (authoritative)
    snug: 1.15,      // Tight headings
    normal: 1.5,     // Mono, technical
    relaxed: 1.6,    // Body text
    loose: 1.75,     // Comfortable reading
  },
  letterSpacing: {
    tighter: '-0.03em', // Large headings
    tight: '-0.02em',   // Standard headings
    normal: '0',        // Body text
    wide: '0.05em',     // Mono text
    wider: '0.1em',    // Uppercase labels
  },
} as const

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

export const LAYOUT = {
  containerMaxWidth: '1280px',
  containerPadding: {
    mobile: '1.5rem',  // 24px
    desktop: '2rem',   // 32px
  },
  sectionPadding: {
    vertical: '8rem',   // 128px - Heroic spacing
    verticalStandard: '4rem', // 64px - Standard sections
    verticalTight: '2rem',    // 32px - Dense sections
  },
  gridGap: {
    large: '2rem',      // 32px
    medium: '1.5rem',  // 24px
    small: '1rem',     // 16px
    tight: '0.5rem',   // 8px
  },
} as const

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

export const ANIMATION = {
  durations: {
    instant: 0.15,  // Micro-interactions
    fast: 0.3,     // Hover states
    medium: 0.5,   // Transitions
    slow: 0.8,     // Page transitions
    slower: 1.2,   // Complex animations
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Material Design
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',   // Ease
    snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',        // Ease-in-out
  },
  transforms: {
    hoverScale: 1.02,      // Subtle button hover
    hoverScaleLarge: 1.05, // Card hover
    activeScale: 0.98,     // Button active
    translateReveal: 20,   // Max scroll reveal distance (px)
  },
} as const

// ============================================================================
// NAVIGATION
// ============================================================================

export const SECTIONS = {
  home: 'home',
  work: 'work',
  services: 'services',
  about: 'about',
  contact: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]

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

export const SHADER_CONFIG = {
  // Monochromatic teal swirl
  swirl: {
    colorA: BRAND_COLORS.tealDarkest,
    colorB: BRAND_COLORS.cyan,
    speed: 0.6,
    detail: 0.85,
    blend: 60,
    coarseX: 45,
    coarseY: 45,
    mediumX: 40,
    mediumY: 40,
    fineX: 35,
    fineY: 35,
  },

  // ChromaFlow with navy depth
  chromaFlow: {
    baseColor: BRAND_COLORS.teal,
    upColor: BRAND_COLORS.cyanLight,
    downColor: BRAND_COLORS.navyDeep,
    leftColor: BRAND_COLORS.tealDark,
    rightColor: BRAND_COLORS.cyanLighter,
    intensity: 1.0,
    radius: 2.0,
    momentum: 30,
    maskType: 'alpha' as const,
    opacity: 0.92,
  },

  // Alternative: Navy-dominant for premium sections
  swirlPremium: {
    colorA: BRAND_COLORS.navyDeep,
    colorB: BRAND_COLORS.teal,
    speed: 0.5,
    detail: 0.9,
    blend: 65,
    coarseX: 50,
    coarseY: 50,
    mediumX: 45,
    mediumY: 45,
    fineX: 40,
    fineY: 40,
  },
} as const

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================

export const PERFORMANCE = {
  minHardwareConcurrency: 4,
  particleCount: 35,
  particleConnectionDistance: 160,
  shaderQuality: {
    low: { resolution: 0.5, fps: 30 },
    medium: { resolution: 0.75, fps: 45 },
    high: { resolution: 1, fps: 60 },
  },
} as const

// ============================================================================
// USAGE EXAMPLES & PATTERNS
// ============================================================================

/**
 * DESIGN PATTERNS:
 * 
 * ===== BACKGROUNDS =====
 * - Hero sections: navy + teal gradient
 * - Standard sections: navy solid
 * - Cards: navy medium with teal borders
 * 
 * ===== TEXT =====
 * - Headings: cyan light to pale
 * - Body: gray light
 * - Muted: navy slate
 * 
 * ===== INTERACTIVE =====
 * - Buttons: teal bg → teal light hover
 * - Links: cyan → cyan light hover
 * - Borders: navy light → teal on focus
 * 
 * ===== FREE vs PRO =====
 * - Free: Teal accents, navy bg
 * - Pro: Accent blue borders, premium badge with navy
 * 
 * EXAMPLE CODE:
 * 
 * // Hero Section
 * <section className="bg-gradient-to-br from-[${BRAND_COLORS.navyDeep}] to-[${BRAND_COLORS.tealDarkest}]">
 * 
 * // Card
 * <div className="bg-[${BRAND_COLORS.navy}] border border-[${BRAND_COLORS.navyLight}] hover:border-[${BRAND_COLORS.teal}]">
 * 
 * // Button
 * <button className="bg-[${BRAND_COLORS.teal}] hover:bg-[${BRAND_COLORS.tealLight}] text-[${BRAND_COLORS.navyDeep}]">
 * 
 * // Pro Badge
 * <span className="bg-[${BRAND_COLORS.premium}] text-[${BRAND_COLORS.accentLight}] border border-[${BRAND_COLORS.accent}]">
 */