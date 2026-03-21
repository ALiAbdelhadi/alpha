# Altruvex — altruvex.com

> **Engineering Beyond Standard.**  
> Custom web systems. Built to outlast the next trend.

Production codebase for [altruvex.com](https://altruvex.com) — the official website of Altruvex, a custom web engineering studio based in Cairo, Egypt.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| i18n | [next-intl](https://next-intl-docs.vercel.app) — Arabic / English (RTL/LTR) |
| Monorepo | Turborepo |
| Deployment | Vercel |
| Analytics | Microsoft Clarity |
| PDF Generation | html2pdf.js + html2canvas |

---

## Project Structure

```
altruvex-www/
├── apps/
│   └── web/
│       ├── app/
│       │   └── [locale]/
│       │       ├── (main)/           # Marketing pages
│       │       ├── estimator/        # Project scope estimator (8-step flow)
│       │       ├── work/             # Case studies
│       │       ├── services/         # Service pages
│       │       ├── writing/          # Technical blog
│       │       └── schedule/         # Discovery call booking
│       ├── components/
│       │   ├── ui/                   # Base component library
│       │   ├── exit-intent-modal/    # Exit intent capture
│       │   └── magnetic-button/      # Magnetic CTA button
│       ├── hooks/
│       │   ├── use-estimator.ts      # Estimator state machine
│       │   └── use-exit-intent.ts    # Exit intent detection
│       ├── lib/
│       │   ├── analytics.ts          # Clarity + event tracking
│       │   ├── estimator-utils.ts    # Pricing logic, PDF builder, phone validation
│       │   └── utils.ts
│       └── messages/
│           ├── en.json
│           └── ar.json
└── packages/
    └── ui/                           # Shared design tokens
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
git clone https://github.com/altruvex/altruvex-www.git
cd altruvex-www
pnpm install
```

### Development

```bash
pnpm dev
```

Runs on `http://localhost:3000`. Default locale redirects to `/en`.

### Build

```bash
pnpm build
```

---

## Environment Variables

Create `.env.local` in `apps/web/`:

```env
# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=your_clarity_id

# Contact / Lead API (internal)
CONTACT_API_SECRET=your_secret

# Rate limiting (future: Upstash Redis)
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```

---

## Key Features

### Estimator (`/estimator`)
8-step project scoping flow. Captures project type, budget tier, scope level, delivery pace, timeline, content readiness, and brand status. Collects WhatsApp phone number as lead. Outputs a detailed PDF estimate via `html2pdf.js`.

**Pricing logic** lives in `estimator-utils.ts` — single fixed output per combination (range maximum used to protect against scope creep).

### Bilingual Architecture
Full RTL/LTR support. Arabic and English are first-class — not translations layered on top of an English layout. Every component is direction-aware. Bilingual proposal narratives use fully hardcoded copy per language to prevent label leakage.

### PDF Generation
Uses `html2pdf.js` with iframe injection. `oklch()`/`lab()` colors are neutralized via `color-scheme: light only` and `onclone` callback for `html2canvas` compatibility.

### Exit Intent
Captures WhatsApp phone number (not email) — consistent with Egyptian B2B market behavior. 24-hour cooldown, max 3 displays per user.

---

## Design System

| Token | Value |
|---|---|
| Background | `#F7F7F8` |
| Foreground | `#0A0C14` |
| Brand accent | `#4A6ED4` |
| Dark bg (proposals) | `#111827` |

Typography, spacing, and color tokens are defined in `globals.css` via CSS custom properties (`--n-0`, `--n-8`, `--brand`).

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, problem framing, case study teaser, estimator teaser |
| `/work` | Selected case studies |
| `/work/[slug]` | Individual case study |
| `/services` | Services overview |
| `/services/web-design` | Interface Design |
| `/services/development` | Custom Development |
| `/services/consulting` | Technical Strategy |
| `/services/maintenance` | System Maintenance |
| `/approach` | Engineering philosophy |
| `/process` | 5-phase delivery process |
| `/standards` | Quality benchmarks |
| `/pricing` | Investment tiers |
| `/estimator` | Project scope estimator |
| `/writing` | Technical blog |
| `/contact` | Contact form |
| `/schedule` | Discovery call booking |

---

## Deployment

Deployed on [Vercel](https://vercel.com). Production branch: `main`. Preview deployments on all PRs.

```bash
# Manual deploy via Vercel CLI
vercel --prod
```

---

## Contact

**Altruvex**  
Cairo, Egypt · Remote worldwide

- hello@altruvex.com  
- +20 102 312 5493  
- [altruvex.com](https://altruvex.com)

---

*© 2026 Altruvex. All rights reserved.*