# Altruvex Design System 2026
## Precision-Driven Web Development

---

## Core Philosophy

**"Systems that outlast trends. Code that serves purpose. Design that earns trust."**

Every design decision must:
1. **Serve a clear business goal** - No element exists without purpose
2. **Answer a psychological question** - What does the visitor need to know or feel?
3. **Build authority through precision** - Demonstration, not claims
4. **Feel timeless** - Design for 5 years from now, not today

---

## Color System

### The Principle: Neutral Foundation + Reserved Brand

The visual language is built almost entirely from a 9-step neutral scale. Color is not a design tool here - contrast, weight, and spacing carry all hierarchy.

The brand color (`--brand`) enters the UI in exactly one role: **functional identity**. It marks interactive intent and active states. It is never decorative.

This is the same principle Apple uses on pages without product imagery - the system holds because the typography and spacing are doing the work.

---

### Neutral Scale

9 steps. Navy-tinted (hue 228–240°, chroma 0.004 → 0.024). Not grey - a cold, coherent system with a barely-perceptible navy cast that reads as engineered, not neutral.

| Token | Value | Role |
|-------|-------|------|
| `--n-0` | `oklch(0.970 0.004 240)` | Near-white, primary light bg |
| `--n-1` | `oklch(0.920 0.006 235)` | Light surface, secondary fills |
| `--n-2` | `oklch(0.820 0.008 232)` | Borders (light mode), n-2 text |
| `--n-3` | `oklch(0.620 0.010 230)` | Muted text |
| `--n-4` | `oklch(0.460 0.012 228)` | Secondary text, disabled states |
| `--n-5` | `oklch(0.320 0.015 228)` | Mid surface (dark bg) |
| `--n-6` | `oklch(0.200 0.018 230)` | Card/surface (dark bg) |
| `--n-7` | `oklch(0.130 0.022 232)` | Main background (dark) |
| `--n-8` | `oklch(0.072 0.024 235)` | Void - deepest background |

**Rule:** Every color reference in a component must resolve to an `--n-*` token or one of the named semantic tokens below. Writing oklch values inline in component files is a violation.

---

### Brand Color

**`--brand: oklch(0.62 0.14 250)` - Deep Engineering Blue (#3B6DF6)**

This is the only non-neutral color. Its function is identity, not decoration.

| Token | Value | Use |
|-------|-------|-----|
| `--brand` | `oklch(0.62 0.14 250)` | Primary CTA bg, active nav, focus ring |
| `--brand-hover` | `oklch(0.58 0.16 250)` | Hover state of brand elements |
| `--brand-soft` | `oklch(0.93 0.02 250)` | Subtle tint fill (light mode only) |
| `--brand-foreground` | `oklch(0.97 0.004 240)` | Text on brand background |

**Brand appears in exactly these contexts:**
- Primary button background
- Active navigation indicator
- Focus rings (`outline-ring`)
- Selected/active state on interactive elements (tabs, chips)
- `.glow-brand` on focused cards - not on hover by default

**Brand never appears in:**
- Section backgrounds or large fills
- Decorative borders
- Icon fills (use `--foreground` or `--muted-foreground`)
- More than 3 elements visible simultaneously in any viewport
- The `--brand-soft` tint in dark mode (use brand at low opacity instead)

---

### Semantic Colors

| Token | Value | Use |
|-------|-------|-----|
| `--success` | `oklch(0.70 0.16 150)` | Positive states, confirmation |
| `--warning` | `oklch(0.80 0.16 80)` | Caution, non-critical alerts |
| `--error` | `oklch(0.62 0.20 25)` | Validation errors, destructive |

Soft fills via utility classes: `.bg-success-soft`, `.bg-warning-soft`, `.bg-error-soft` (10% opacity).

---

### Light / Dark Mode Mapping

| Semantic Token | Light | Dark |
|----------------|-------|------|
| `--background` | `--n-0` | `--n-8` |
| `--foreground` | `--n-8` | `--n-0` |
| `--card` | near n-0 | `--n-7` |
| `--secondary` | `--n-1` | `--n-6` |
| `--muted` | `--n-1` | `--n-6` |
| `--muted-foreground` | `--n-4` | `--n-4` |
| `--border` | `--n-2` | `oklch(1 0 0 / 7%)` |
| `--border-mid` | n-2 lighter | `oklch(1 0 0 / 12%)` |
| `--accent` | `--brand` | `--brand` |
| `--ring` | `--brand` | `--brand` |

---

### Contrast Verification

| Combination | Ratio | WCAG |
|-------------|-------|------|
| `--n-8` on `--n-0` (light) | ~17:1 | AAA ✓ |
| `--n-0` on `--n-8` (dark) | ~17:1 | AAA ✓ |
| `--brand` on `--n-0` (light) | ~4.8:1 | AA ✓ |
| `--brand` on `--n-8` (dark) | ~5.5:1 | AA ✓ |
| `--n-4` on `--n-0` (light) | ~4.6:1 | AA ✓ |
| `--n-4` on `--n-8` (dark) | ~4.5:1 | AA ✓ |

---

## Typography

### Typefaces

| Stack | Font | Role |
|-------|------|------|
| `--font-sans` / headings | **Outfit** | All headings H1–H6 |
| `--font-body` | **Inter** | All body copy |
| `--font-mono` | **Geist Mono** | Labels, metadata, code |

Rationale: Outfit is geometric and authoritative without being cold. Inter is the most readable body font at screen sizes. Geist Mono signals technical precision.

---

### Scale

| Class / Element | Size | Weight | Line-height | Tracking |
|----------------|------|--------|-------------|---------|
| `h1` | `clamp(3.5rem, 8vw, 5rem)` | 600 | 1.03 | -0.025em |
| `h2` | `clamp(2rem, 5vw, 3.5rem)` | 400 | 1.05 | -0.02em |
| `h3` | `clamp(1.5rem, 2.5vw, 2.5rem)` | 400 | 1.15 | -0.018em |
| `h4` | `clamp(1.125rem, 2vw, 1.75rem)` | 500 | 1.2 | -0.015em |
| `.body-lg` | `clamp(1rem, 1.2vw, 1.2rem)` | 400 | 1.65 | 0 |
| `.body` | `1rem` | 400 | 1.65 | 0 |
| `.small` | `0.8125rem` | 400 | 1.5 | 0 |
| `.mono` | `0.8125rem` | 400 | 1.5 | 0.06em |
| `.mono-uppercase` | `0.625rem` | 400 | 1.5 | 0.25em |

**Weight discipline:**
- 600 - H1 only
- 500 - H4 and interactive emphasis
- 400 - everything else
- Never use 700+ anywhere

**Mono-uppercase is the visual signature of the Altruvex system.** Every section label, input label, card index, stat label uses `.mono-uppercase` + `--muted-foreground`. This creates the "technical precision" reading without requiring color.

---

## Spacing

**Base unit:** 8px (0.5rem)

```
--space-xs:  0.5rem   (8px)
--space-sm:  0.75rem  (12px)
--space-md:  1rem     (16px)
--space-lg:  1.5rem   (24px)
--space-xl:  2rem     (32px)
--space-2xl: 3rem     (48px)
--space-3xl: 4rem     (64px)
--space-4xl: 6rem     (96px)
--space-5xl: 8rem     (128px)
```

Section padding: `.section-padding` utility - `clamp(5rem, 10vh, 8rem)` top and bottom.
Container: max-width 1280px, padding `1.5rem` mobile / `2rem` desktop, centered.

No arbitrary pixel values in components. All spacing references the 8px grid.

---

## Motion

**Principle:** Motion confirms state. It never decorates.

### Duration Scale

| Name | Value | Use |
|------|-------|-----|
| Instant | 0.15s | Hover color, micro-state |
| Fast | 0.3s | Hover scale, border transition |
| Medium | 0.5s | Scroll reveal, modal enter |
| Slow | 0.8s | Complex multi-element reveal |

### Easing

```css
cubic-bezier(0.4, 0, 0.2, 1)   /* default - standard transitions  */
cubic-bezier(0.25, 0.1, 0.25, 1) /* smooth  - calm entries         */
cubic-bezier(0.4, 0, 0.6, 1)   /* snappy  - quick exits           */
```

### Scroll Reveal Pattern

```
Initial state: opacity 0, translateY(20px)
Final state:   opacity 1, translateY(0)
Duration: 0.5s | Easing: smooth | Stagger: 0.08s per child
```

**Always wrap in:**
```css
@media (prefers-reduced-motion: reduce) {
  /* opacity transition only - no transform */
}
```

### Hard Rules
- Animate `transform` and `opacity` only - GPU-accelerated, no layout thrash
- No `width`, `height`, `top`, `left`, `padding`, `margin` in transitions
- No parallax
- No auto-play
- No particle effects
- No translate distances over 20px
- 60fps target - profile before shipping

---

## Component Behavior

### Buttons

**Primary**
```
background:   var(--brand)
color:        var(--brand-foreground)
border-radius: var(--radius)  [0.375rem]
padding:       0.65rem 1.4rem
font:          Outfit, 0.875rem, weight 500
hover:         background → var(--brand-hover), scale(1.015), 0.2s
active:        scale(0.98)
focus-visible: outline 2px var(--ring), offset 3px
```

**Secondary**
```
background:    transparent
border:        1px solid var(--border-mid)
color:         var(--muted-foreground)
hover:         border-color → var(--n-4), color → var(--foreground), scale(1.015)
```

**Ghost** (tertiary, nav)
```
background:    transparent
border:        none
color:         var(--muted-foreground)
hover:         color → var(--foreground)
```

---

### Cards

```
background:    var(--card)
border:        1px solid var(--border)
border-radius: var(--radius)
hover:         border-color → oklch(0.62 0.14 250 / 0.35)
               box-shadow  → .glow-brand
transition:    border-color 0.3s, box-shadow 0.3s
```

Cards use a 1px border gap grid layout for service/work sections - no individual border-radius on the grid container, `overflow: hidden` clips the unified border.

---

### Inputs

```
background:       transparent
border:           none
border-bottom:    1px solid var(--border-mid)
color:            var(--foreground)
border-radius:    0  [intentional - minimal]
padding:          0.625rem 0
placeholder:      var(--muted-foreground)
focus:            border-bottom-color → var(--brand), 0.15s
label:            .mono-uppercase, var(--muted-foreground)
error state:      border-color → var(--error)
```

---

### Navigation

```
background on scroll: var(--background) with backdrop-blur(12px)
logo:                 var(--foreground)
links default:        var(--muted-foreground), .small or .body
links hover:          var(--foreground), 0.15s
active link:          var(--brand)
active indicator:     2px bottom border, var(--brand)
CTA in nav:           Secondary button style
```

---

## Section Architecture

### 1 - Hero
**Psychological question:** "Are these the people who can solve my problem?"

- H1: weight 600, tight tracking. Secondary line: weight 300, `var(--muted-foreground)` - creates contrast without color.
- Subheadline: `.body-lg`, `var(--muted-foreground)`
- CTA: Primary button (brand) + Secondary button. Spacing between: 0.75rem.
- Background: `var(--background)` only - no gradients, no fills.
- Entry animation: fade + translateY(20px → 0), 0.5s, stagger 0.08s.

---

### 2 - Work / Portfolio
**Psychological question:** "Can they build what I need?"

- Section label: `.mono-uppercase`, `var(--muted-foreground)`
- 3–4 projects maximum. No more.
- Card index: `.mono-uppercase`, `var(--muted-foreground)`
- Card title: H4, weight 500
- Technical descriptor: `.mono`, `var(--muted-foreground)`
- Problem statement: `.body`, `var(--muted-foreground)` at 85% opacity
- Grid layout with 1px gap, unified border system

---

### 3 - Services
**Psychological question:** "Do they understand my type of problem?"

- Grid layout - not card stack
- Service number: `.mono-uppercase`, `var(--brand)` - **this is one of the 3 permitted brand uses per viewport**
- Service name: H3 or H4, weight 400
- Description: `.body`, `var(--muted-foreground)`
- Include a constraint statement - "What we don't build." Plain `.body`, `var(--muted-foreground)`. Builds trust.
- Background: `var(--secondary)` - slight tonal shift from hero

---

### 4 - About / Metrics
**Psychological question:** "Can I trust these people?"

- Metric value: H1 or H2 scale, `var(--foreground)` - **contrast alone as emphasis, no brand color needed here**
- Metric label: `.mono-uppercase`, `var(--muted-foreground)`
- Narrative: `.body-lg`, `var(--foreground)`
- Include 2–3 constraints - what Altruvex specifically does not do

---

### 5 - Approach / Philosophy
**Psychological question:** "Are they thinking at the level I need?"

- Principle index: `.mono-uppercase`, `var(--muted-foreground)`
- Principle title: H3, weight 400
- Principle body: `.body`, `var(--muted-foreground)` at 85%
- No decorative dividers - spacing does the separation

---

### 6 - Contact
**Psychological question:** "How do I start?"

- Inputs: border-bottom only (see component spec)
- Labels: `.mono-uppercase`
- Submit: Primary button (brand bg)
- Expectation copy: `.small`, `var(--muted-foreground)`
- No fake urgency

---

## Brand Utility Classes Reference

```css
.bg-brand       /* brand bg + brand-foreground text - primary CTA */
.bg-brand-soft  /* soft tint fill - light mode only               */
.border-brand   /* brand-colored border                           */
.text-brand     /* brand text color                               */
.glow-brand     /* focused card glow effect                       */
```

**Zero tolerance rule:** The string `oklch(0.62 0.14 250)` must not appear in any component file. Use `var(--brand)` or the utility classes above.

---

## Implementation Checklist

- [ ] `globals.css` replaced with final version
- [ ] Neutral scale tokens confirmed - no hardcoded oklch in components
- [ ] Brand color appears in ≤3 elements per viewport simultaneously
- [ ] All section labels use `.mono-uppercase` + `var(--muted-foreground)`
- [ ] All input labels use `.mono-uppercase`
- [ ] All inputs: border-bottom only, no box/full border
- [ ] Primary button: brand bg confirmed across light and dark
- [ ] Card hover: `.glow-brand` applied, border-color → brand at 35%
- [ ] Scroll reveal: translateY(20px), 0.5s, prefers-reduced-motion respected
- [ ] All animations: transform + opacity only - no layout props
- [ ] WCAG AA verified on all text/background combinations
- [ ] Dark mode: card/bg separation perceptible (n-7 vs n-8)
- [ ] Focus states: visible on every interactive element
- [ ] No hardcoded hex, rgb(), or hsl() anywhere in codebase

---

## What Makes Altruvex Distinct

1. The neutral system signals confidence - color is not needed to command attention
2. `.mono-uppercase` throughout creates a technical, precise character without a single line of illustration
3. Brand color is rationed - when it appears, it matters
4. Constraints are stated explicitly, in the UI - this is the single strongest trust signal a web development company can send
5. The hierarchy is built from contrast, weight, and spacing - the same principles as the best-designed software in the world

---

*This document is the final design authority. When code conflicts with this document, the code is wrong.*