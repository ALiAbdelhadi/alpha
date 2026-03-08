"use client"

export type CaseStudyMetric = {
  label: string
  value: string
  description?: string
}

export type CaseStudy = {
  slug: string
  name: string
  client: string
  industry: string
  year: string
  summary: string
  externalUrl?: string
  metrics: CaseStudyMetric[]
  problem: string
  solution: string
  outcome: string
  techStack: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "art-lighting-store",
    name: "Art Lighting Store",
    client: "Confidential E‑Commerce Brand",
    industry: "Premium home lighting",
    year: "2024",
    externalUrl: "https://eg-artlighting.vercel.app/",
    summary:
      "High-resolution product imagery at scale with real-time inventory and fast page loads for a premium lighting retailer.",
    metrics: [
      {
        label: "Conversion lift",
        value: "+34%",
        description: "Increase in completed purchases after launch.",
      },
      {
        label: "Initial load",
        value: "1.2s",
        description: "Average First Contentful Paint on 4G.",
      },
      {
        label: "Lighthouse score",
        value: "98",
        description: "Performance, accessibility, and SEO combined.",
      },
    ],
    problem:
      "The client sold high-end fixtures where material and detail matter, but their existing platform heavily compressed images and loaded slowly. Customers couldn’t properly inspect finishes or scale, and inventory was fragmented across multiple systems, creating overselling risk.",
    solution:
      "We designed a custom Next.js storefront with an image pipeline tuned for high‑resolution zoom without sacrificing load time. Inventory is synchronized via webhooks into a single source of truth, and pages are statically generated with targeted revalidation for fast, consistent performance.",
    outcome:
      "Within the first month, the new store shipped on schedule, improved conversion rate by 34%, cut perceived load time to nearly instant, and eliminated overselling incidents. The client’s team can now manage products and inventory without engineering support.",
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL + Prisma",
      "Image optimization pipeline",
    ],
  },
  {
    slug: "custom-case-builder",
    name: "Custom Case Builder",
    client: "CasesCobra",
    industry: "Direct‑to‑consumer accessories",
    year: "2024",
    externalUrl: "https://casescobra.vercel.app/",
    summary:
      "A real-time product configurator that lets customers design and preview phone cases in the browser before ordering.",
    metrics: [
      {
        label: "Configurator engagement",
        value: "3.4×",
        description: "More time spent interacting vs. previous catalogue.",
      },
      {
        label: "Return rate",
        value: "-18%",
        description: "Drop in returns due to clearer visual expectations.",
      },
    ],
    problem:
      "The brand’s previous site only offered static photos and a long options list. Customers couldn’t visualize combinations, which led to decision fatigue, abandoned carts, and higher return rates when expectations didn’t match reality.",
    solution:
      "We built a client‑side configurator in React that updates the preview in real time as users change device type, colors, and artwork. All configurations are encoded in a compact URL, allowing customers to share or resume designs, and orders are passed to the backend with a full configuration payload.",
    outcome:
      "The new experience turned the buying process into an interactive flow, significantly increasing engagement and reducing returns. Operations now receive complete, validated configurations, reducing back‑and‑forth and misprints.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Canvas/SVG rendering",
      "Prisma",
    ],
  },
  {
    slug: "bilingual-corporate-portal",
    name: "Bilingual Corporate Presence",
    client: "NewLight",
    industry: "Manufacturing & B2B",
    year: "2024",
    externalUrl: "https://www.newlight-eg.com/",
    summary:
      "A bilingual corporate site with full RTL support, product catalogue, and PWA shell for poor‑network environments.",
    metrics: [
      {
        label: "Time on site",
        value: "+27%",
        description: "Increase in session duration for mobile visitors.",
      },
      {
        label: "Bounce rate",
        value: "-22%",
        description: "Drop in early exits on key landing pages.",
      },
    ],
    problem:
      "NewLight’s previous site treated Arabic as a simple translation layer, leading to broken layouts, inconsistent typography, and poor readability. Sales teams needed a fast, offline‑friendly way to browse products during client visits with unreliable connectivity.",
    solution:
      "We rebuilt the site on Next.js with next‑intl, designing layouts that adapt structurally for RTL rather than just mirroring. The product catalogue is cached via a PWA shell so sales can browse and search products even on weak connections, with updates pushed on deploy.",
    outcome:
      "The new portal presents a coherent brand in both Arabic and English, reduced confusion on key pages, and gave the sales team a reliable tool in the field. Prospects now understand the offering quickly, in their preferred language and on whatever device they use.",
    techStack: [
      "Next.js App Router",
      "next-intl (EN/AR)",
      "Tailwind CSS",
      "PWA",
      "PostgreSQL + Prisma",
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug)
}

