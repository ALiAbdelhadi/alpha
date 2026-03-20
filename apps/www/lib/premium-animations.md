# Premium Animation System

## Overview

This document describes the premium animation system inspired by Anthropic's smooth, natural motion design language.

## Core Philosophy

- **Subtle & Natural**: Animations should feel organic, not mechanical
- **Premium Feel**: Using custom cubic-bezier curves for that "expensive" feel
- **Purposeful**: Every animation serves a UX purpose
- **Accessible**: Respects `prefers-reduced-motion` settings

## Easing Curves

### Primary Eases

```typescript
const EASE = {
  // Text reveals - smooth, premium feel (similar to expo.out)
  text: "cubic-bezier(0.2, 0, 0, 1)",

  // General purpose - natural motion (similar to power3.out)
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",

  // Very smooth, gentle (similar to quint.out)
  gentle: "cubic-bezier(0.65, 0, 0.35, 1)",

  // UI elements - quick and responsive
  ui: "cubic-bezier(0.4, 0, 0.2, 1)",
}
```

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `xs` | 0.35s | Micro-interactions, hover states |
| `sm` | 0.50s | Small UI elements, buttons |
| `md` | 0.65s | Cards, medium components |
| `lg` | 0.80s | Sections, large elements |
| `xl` | 1.00s | Hero animations, full reveals |

### Distance Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `sm` | 20px | Subtle shifts, small elements |
| `md` | 40px | Standard reveals |
| `lg` | 60px | Dramatic reveals, hero |

## Hooks

### useTextReveal

Premium text reveal with optional blur effect.

```typescript
const titleRef = useTextReveal<HTMLHeadingElement>({
  delay: 0,
  duration: 1.0,
  blur: true,        // Add blur during reveal
  threshold: 0.3,    // Trigger at 30% viewport
  once: true,        // Only animate once
})
```

### useFadeUp

Simple fade-up animation for general elements.

```typescript
const ref = useFadeUp<HTMLDivElement>({
  delay: 0.1,
  duration: 0.8,
  distance: 28,
})
```

### useStaggerReveal

Staggered reveal for multiple child elements.

```typescript
const containerRef = useStaggerReveal<HTMLDivElement>({
  delay: 0.1,
  duration: 0.9,
  stagger: 0.08,     // Time between each child
  distance: 32,
})
```

## Section Patterns

### Hero Section

```typescript
const tl = gsap.timeline({
  defaults: { ease: EASE.hero, duration: 1.4 }
})

tl.fromTo("[data-hero-content]",
  { opacity: 0, y: 28 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.08,
    duration: 1.1,
    ease: EASE.text,
  },
  0.15
)
```

### Standard Section

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 85%",
    once: true,
  }
})

// Header reveal
tl.fromTo("[data-header]",
  { opacity: 0, y: 36 },
  { opacity: 1, y: 0, duration: 1.1, ease: EASE.smooth }
)

// Divider line
tl.fromTo("[data-divider]",
  { scaleX: 0, transformOrigin: "left" },
  { scaleX: 1, duration: 1.2, ease: EASE.gentle },
  "-=0.7"
)

// Content
tl.fromTo("[data-content]",
  { opacity: 0, y: 28 },
  { opacity: 1, y: 0, duration: 0.9, ease: EASE.smooth },
  "-=0.5"
)
```

### Card/Item Batch Reveal

```typescript
ScrollTrigger.batch(cards, {
  start: "top 88%",
  once: true,
  interval: 0.1,
  onEnter: (batch) => {
    gsap.from(batch, {
      opacity: 0,
      y: 32,
      duration: 0.9,
      stagger: 0.06,
      ease: EASE.smooth,
    })
  },
})
```

## Step Transitions

For form step transitions (like estimator):

```typescript
const animateStep = useCallback((dir: "forward" | "back", cb: () => void) => {
  const fromY = dir === "forward" ? 24 : -24
  const toY = dir === "forward" ? -24 : 24

  gsap.to(container, {
    opacity: 0,
    y: toY,
    duration: 0.35,
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    onComplete: () => {
      cb()
      gsap.fromTo(container,
        { opacity: 0, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)",
        }
      )
    },
  })
}, [])
```

## Best Practices

1. **Always clear `willChange`**: Set `willChange: "auto"` after animation completes
2. **Use `once: true`**: Most animations should only play once
3. **Respect reduced motion**: Always check `prefers-reduced-motion`
4. **Stagger subtly**: Use 0.05-0.12s stagger for natural flow
5. **Start late enough**: Use `start: "top 85%"` or later for comfortable timing
6. **Clear transforms**: Use `clearProps: "transform"` when appropriate

## Migration Guide

### Before (Generic)
```typescript
import { useReveal } from "@/hooks/use-animation"
import { ANIM } from "@/lib/animation-utils"

const ref = useReveal({
  direction: "up",
  delay: 0,
  duration: ANIM.duration.lg,
})
```

### After (Premium)
```typescript
import { useTextReveal, useFadeUp } from "@/hooks/use-text-reveal"

const ref = useTextReveal({
  delay: 0,
  duration: 1.0,
  blur: true,
  threshold: 0.25,
})
```

## Files Updated

- `hooks/use-text-reveal.ts` - New premium hooks
- `components/sections/hero-section.tsx`
- `components/sections/work-section.tsx`
- `components/sections/about-section.tsx`
- `components/sections/services-section.tsx`
- `components/sections/process-section.tsx`
- `components/sections/estimator-section.tsx`
- `components/sections/contact-section.tsx`
- `components/sections/cta-section.tsx`
- `components/sections/faq-section.tsx`
