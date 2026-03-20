/* eslint-disable @typescript-eslint/no-explicit-any */
import { localizeNumbers } from "./number"

export type DeliverableTier = "small" | "medium" | "large" | "enterprise"
export type DeliverableProject = "ecommerce" | "corporate" | "custom" | "performance"

export function mapProjectType(raw: string | null): DeliverableProject {
  const map: Record<string, DeliverableProject> = {
    website: "corporate",
    webapp: "custom",
    ecommerce: "ecommerce",
    pwa: "custom",
    performance: "performance",
    corporate: "corporate",
    custom: "custom",
  }
  return map[raw ?? ""] ?? "corporate"
}

export function mapBudgetTier(raw: string | null): DeliverableTier {
  const map: Record<string, DeliverableTier> = {
    small: "small",
    medium: "medium",
    large: "large",
    custom: "enterprise",
    enterprise: "enterprise",
  }
  return map[raw ?? ""] ?? "medium"
}

// Aligned with use-estimator.ts PRICING_TABLE (medium tier = 1.0× multiplier)
// corporate = website standard · ecommerce = ecommerce standard
// custom = webapp/pwa standard · performance = website basic
const SECTION_PRICING: Record<DeliverableProject, [number, number]> = {
  ecommerce: [240_000, 400_000],
  corporate: [110_000, 190_000],
  custom: [260_000, 430_000],
  performance: [55_000, 105_000],
}

// Aligned with use-estimator.ts TIMELINE_TABLE (standard tier)
const SECTION_WEEKS: Record<DeliverableProject, [number, number]> = {
  ecommerce: [9, 14],
  corporate: [5, 8],
  custom: [10, 16],
  performance: [3, 5],
}

const SECTION_BUDGET_MUL: Record<DeliverableTier, number> = {
  small: 0.55,
  medium: 1.00,
  large: 1.90,
  enterprise: 3.80,
}

const SECTION_TIMELINE_MUL: Record<string, number> = {
  urgent: 1.30,
  soon: 1.00,
  standard: 1.00,
  flexible: 0.85,
}

export function calculateQuickEstimate(
  projectType: DeliverableProject,
  tier: DeliverableTier,
  timelineKey: string,
): { priceMin: number; priceMax: number; weeksMin: number; weeksMax: number } {
  const [baseMin, baseMax] = SECTION_PRICING[projectType]
  const [wBase1, wBase2] = SECTION_WEEKS[projectType]
  const bMul = SECTION_BUDGET_MUL[tier]
  const tMul = SECTION_TIMELINE_MUL[timelineKey] ?? 1.0
  const hosting = HOSTING_RENEWAL[tier]

  const priceMin = Math.round(((baseMin * bMul * tMul) + hosting) / 1_000) * 1_000
  const priceMax = Math.round(((baseMax * bMul * tMul) + hosting) / 1_000) * 1_000
  const urgencyOff = timelineKey === "urgent" ? -1 : timelineKey === "flexible" ? 2 : 0
  const weeksMin = Math.max(wBase1 + urgencyOff, 1)
  const weeksMax = wBase2 + (urgencyOff > 0 ? urgencyOff : 0)

  return { priceMin, priceMax, weeksMin, weeksMax }
}

// Annual infrastructure cost added to project price
// Reflects: Domain + SSL + Hosting + CDN + DB (where applicable)
export const HOSTING_RENEWAL: Record<DeliverableTier, number> = {
  small: 4_800,   // Domain + SSL + shared hosting
  medium: 14_400,  // Domain + SSL + VPS + CDN
  large: 28_800,  // Domain + SSL + VPS + CDN + DB hosting
  enterprise: 60_000,  // Full infra stack + monitoring
}

export const TIER_LABELS: Record<DeliverableTier, string> = {
  small: "Essential",
  medium: "Professional",
  large: "Premium",
  enterprise: "Enterprise",
}

export const PROJECT_LABELS: Record<DeliverableProject, string> = {
  ecommerce: "E-Commerce Platform",
  corporate: "Corporate Website",
  custom: "Custom Web Application",
  performance: "Performance Audit & Optimization",
}

export const TIMELINE_LABELS: Record<string, string> = {
  urgent: "Urgent - Sprint delivery",
  soon: "Standard - 1–3 months",
  flexible: "Extended - 3+ months",
  standard: "Standard - balanced pace",
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "")
  return /^(\+20|0020|0)?1[0125]\d{8}$/.test(cleaned)
}

export function normalisePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "")
  if (/^(\+20|0020|0)?1[0125]\d{8}$/.test(cleaned)) {
    if (cleaned.startsWith("+20")) return cleaned
    if (cleaned.startsWith("0020")) return "+" + cleaned.slice(2)
    if (cleaned.startsWith("0")) return "+20" + cleaned.slice(1)
    if (cleaned.startsWith("1")) return "+20" + cleaned
  }
  return cleaned
}

export interface NarrativeInsight {
  label: { ar: string; en: string }
  message: { ar: string; en: string }
}

export interface ProposalNarrative {
  headline: { ar: string; en: string }
  insights: NarrativeInsight[]
  closing: { ar: string; en: string }
}

export function pickLang(obj: { ar: string; en: string }, locale: string): string {
  return locale.startsWith("ar") ? obj.ar : obj.en
}

const PROJECT_COPY: Record<DeliverableProject, { ar: string; en: string }> = {
  ecommerce: {
    ar: "اخترت المتجر الإلكتروني - هدفك الأساسي تحويل الزوار إلى عملاء يدفعون. سنبني نظاماً يدعم بوابات الدفع المصرية (Paymob, Fawry)، إدارة مخزون حقيقية، وتجربة شراء سلسة على الجوال تُقلل معدل التخلي عن السلة.",
    en: "You chose an e-commerce platform - your core goal is converting visitors into paying customers. We'll build a system with Egyptian payment gateways (Paymob, Fawry), real inventory management, and a seamless mobile checkout that reduces cart abandonment.",
  },
  corporate: {
    ar: "اخترت موقع الشركة - يعني تريد حضوراً رقمياً يعكس احترافية عملك ويجذب العملاء المحتملين على مدار الساعة. سنبني واجهة تُقنع الزائر بالتواصل معك، مع أساس SEO قوي يضمن ظهورك في نتائج البحث.",
    en: "You chose a corporate website - you want a digital presence that reflects your brand's professionalism and generates leads around the clock. We'll build an interface that compels visitors to reach out, backed by solid SEO foundations.",
  },
  custom: {
    ar: "اخترت التطبيق المخصص - يعني عندك فكرة أو منطق عمل لا يوفره أي نظام جاهز في السوق. سنبنيه من الصفر بناءً على متطلباتك الفعلية، بدون تسويات أو قوالب.",
    en: "You chose a custom web application - your idea or business logic can't be served by any off-the-shelf system. We'll build it from scratch around your actual requirements, with no compromises or templates.",
  },
  performance: {
    ar: "اخترت تحسين الأداء - وهو قرار استثماري ذكي. موقعك الحالي يخسر عملاء محتملين بسبب بطء التحميل. سنقيس المشكلة الفعلية بدقة أولاً، ثم نُصلحها بشكل هندسي منهجي بدلاً من التخمين.",
    en: "You chose performance optimization - a smart investment decision. Your current site is losing potential customers to slow load times. We'll measure the real problem precisely first, then fix it systematically rather than guessing.",
  },
}

const TIER_COPY: Record<DeliverableTier, { ar: string; en: string }> = {
  small: {
    ar: "اخترت الباقة الأساسية - الخيار الصح إذا كنت في مرحلة الإطلاق أو تريد التحقق من الفكرة قبل الاستثمار الكبير. ستحصل على نظام متكامل وجاهز بنطاق محدد بوضوح، يمكن توسيعه لاحقاً.",
    en: "You chose the Essential tier - the right call if you're in launch mode or validating your concept before a larger investment. You get a complete, production-ready system with a clearly defined scope that can scale later.",
  },
  medium: {
    ar: "اخترت الباقة الاحترافية - الأكثر طلباً لأنها تُحقق التوازن الأمثل بين الجودة والتكلفة. ستحصل على نظام متكامل يدعم النمو الفعلي لعملك، مع تكاملات ومميزات لا توجد في الباقة الأساسية.",
    en: "You chose the Professional tier - the most requested because it hits the sweet spot between quality and cost. You get a full-featured system built to support real business growth, with integrations the Essential tier doesn't cover.",
  },
  large: {
    ar: "اخترت الباقة المتميزة - يعني أنك تبني لتدوم. تصميم مخصص بالكامل، أداء هندسي عالٍ، ودعم موسع بعد الإطلاق. مشروعك في هذه الباقة يُصبح أصلاً حقيقياً لشركتك لا مجرد موقع.",
    en: "You chose the Premium tier - you're building to last. Fully custom design, high-performance engineering, and extended post-launch support. At this level, your project becomes a genuine business asset, not just a website.",
  },
  enterprise: {
    ar: "اخترت الباقة المؤسسية - حجم عملك يستحق بنية تحتية لا تقبل التسوية. فريق متخصص، تكاملات مع أنظمتك الحالية (ERP, POS, CRM)، وSLA يضمن استمرارية العمل ٢٤/٧.",
    en: "You chose the Enterprise tier - your business scale demands infrastructure that accepts no compromise. A dedicated team, integrations with your existing systems (ERP, POS, CRM), and an SLA that guarantees 24/7 business continuity.",
  },
}

const TIMELINE_COPY: Record<string, { ar: string; en: string }> = {
  urgent: {
    ar: "اخترت التسليم السريع - يعني لديك موعد حرج أو فرصة سوق لا تنتظر. سنُعيد هندسة نطاق العمل حول تاريخك لا العكس، مع تحديد ما يُطلق أولاً وما يأتي في المرحلة الثانية.",
    en: "You chose fast delivery - you have a critical deadline or a market window that won't stay open. We'll engineer the scope around your date, not the other way around - identifying what launches first and what follows in a second phase.",
  },
  soon: {
    ar: "اخترت التوقيت المتوازن - وهو الأذكى في معظم الحالات. يمنحنا وقتاً كافياً لاكتشاف المتطلبات بدقة، بناء نظام متين، واختباره جيداً قبل الإطلاق دون ضغط غير ضروري.",
    en: "You chose a balanced timeline - the smartest choice in most cases. It gives us enough time to gather requirements precisely, build a solid system, and test it thoroughly before launch without unnecessary pressure.",
  },
  standard: {
    ar: "اخترت التوقيت المتوازن - وهو الأذكى في معظم الحالات. يمنحنا وقتاً كافياً لاكتشاف المتطلبات بدقة، بناء نظام متين، واختباره جيداً قبل الإطلاق دون ضغط غير ضروري.",
    en: "You chose a balanced timeline - the smartest choice in most cases. It gives us enough time to gather requirements precisely, build a solid system, and test it thoroughly before launch without unnecessary pressure.",
  },
  flexible: {
    ar: "اخترت المرونة في التوقيت - وهذه ميزة هندسية حقيقية. وقت أطول يعني اختباراً أعمق، تحسيناً أكثر في الأداء، ونظاماً يصمد على المدى البعيد دون حاجة لإعادة بناء.",
    en: "You chose a flexible timeline - a genuine engineering advantage. More time means deeper testing, more performance refinement, and a system built to hold up long-term without needing a rebuild.",
  },
}

const BRAND_COPY: Record<string, { ar: string; en: string }> = {
  complete: {
    ar: "هويتك التجارية جاهزة - هذا يُسرّع مرحلة التصميم ويضمن اتساقاً بصرياً كاملاً من اليوم الأول.",
    en: "Your brand identity is ready - this accelerates the design phase and guarantees full visual consistency from day one.",
  },
  partial: {
    ar: "هويتك التجارية جزئية - سنعمل بما لديك وننسق معك لسد الفجوات خلال مرحلة التصميم دون تأخير.",
    en: "Your brand identity is partial - we'll work with what you have and coordinate to fill the gaps during the design phase without delay.",
  },
  scratch: {
    ar: "ستبدأ الهوية التجارية من الصفر - سنُدرج مرحلة تصميم الهوية في بداية المشروع قبل الشروع في بناء النظام.",
    en: "Your brand identity starts from scratch - we'll include an identity design phase at the project start before building the system.",
  },
}

const CONTENT_COPY: Record<string, { ar: string; en: string }> = {
  provide: {
    ar: "محتواك جاهز - هذا يحمي الجدول الزمني من أكثر أسباب التأخير شيوعاً في المشاريع الرقمية.",
    en: "Your content is ready - this protects the timeline from the most common cause of delays in digital projects.",
  },
  "need-help": {
    ar: "ستحتاج مساعدة في المحتوى - سنُدرج جلسة استراتيجية للمحتوى في بداية المشروع لتحديد ما تحتاجه بالضبط.",
    en: "You'll need content help - we'll include a content strategy session early in the project to define exactly what's needed.",
  },
  unsure: {
    ar: "المحتوى لا يزال في طور التخطيط - هذا طبيعي في المراحل الأولى. سنُحدد الاحتياجات الفعلية خلال جلسة الاكتشاف.",
    en: "Content is still being planned - that's normal at this stage. We'll define the actual needs during the discovery session.",
  },
}

const DEADLINE_COPY: Record<string, { ar: string; en: string }> = {
  urgent: {
    ar: "لديك موعد في أقل من ٤ أسابيع - سنُركز فوراً على المتطلبات الحرجة ونُطلق النسخة الأولى أولاً.",
    en: "You have a deadline under 4 weeks - we'll focus immediately on critical requirements and launch a first version first.",
  },
  "1month": {
    ar: "لديك شهر واحد - جدول ضيق لكنه قابل للتنفيذ مع تحديد نطاق عمل واضح من اليوم الأول.",
    en: "You have one month - a tight but achievable schedule with a clearly defined scope from day one.",
  },
  "2months": {
    ar: "لديك شهران - توقيت جيد يتيح دورة تصميم وتطوير متكاملة مع هامش للاختبار.",
    en: "You have two months - a solid timeline that allows a complete design-and-development cycle with room for testing.",
  },
  flexible: {
    ar: "التوقيت مرن - ميزة تتيح لنا التركيز على الجودة وليس السرعة فقط.",
    en: "Your timeline is flexible - an advantage that lets us focus on quality, not just speed.",
  },
}

// Closing - full sentence per project, no interpolation
const CLOSING_COPY: Record<DeliverableProject, { ar: string; en: string }> = {
  ecommerce: {
    ar: "هذا التقدير مبني على اختياراتك الفعلية. الخطوة التالية مكالمة اكتشاف مجانية لمدة ٣٠ دقيقة نُحدد فيها النطاق الدقيق ونُقدم لك عرض سعر نهائياً ملزماً.",
    en: "This estimate is built on your actual selections. Next step is a free 30-minute discovery call where we define the exact scope and give you a binding final quote.",
  },
  corporate: {
    ar: "هذا التقدير مبني على اختياراتك الفعلية. الخطوة التالية مكالمة اكتشاف مجانية لمدة ٣٠ دقيقة نُحدد فيها النطاق الدقيق ونُقدم لك عرض سعر نهائياً ملزماً.",
    en: "This estimate is built on your actual selections. Next step is a free 30-minute discovery call where we define the exact scope and give you a binding final quote.",
  },
  custom: {
    ar: "هذا التقدير مبني على اختياراتك الفعلية. الخطوة التالية مكالمة اكتشاف مجانية لمدة ٣٠ دقيقة نُحدد فيها المتطلبات التقنية الفعلية.",
    en: "This estimate is built on your actual selections. Next step is a free 30-minute discovery call where we nail down the actual technical requirements.",
  },
  performance: {
    ar: "هذا التقدير مبني على اختياراتك الفعلية. الخطوة التالية تدقيق أولي مجاني نوضح فيه حجم المشكلة الحالية في موقعك.",
    en: "This estimate is built on your actual selections. Next step is a free initial audit where we show you exactly how much performance your current site is leaving on the table.",
  },
}

export interface NarrativeParams {
  projectType: DeliverableProject
  tier: DeliverableTier
  timelineKey: string
  brandIdentity?: string | null
  contentReadiness?: string | null
  deadlineUrgency?: string | null
}

export function generateProposalNarrative(p: NarrativeParams): ProposalNarrative {
  const insights: NarrativeInsight[] = [
    { label: { ar: "نوع المشروع", en: "Project type" }, message: PROJECT_COPY[p.projectType] },
    { label: { ar: "مستوى الباقة", en: "Scope tier" }, message: TIER_COPY[p.tier] },
    { label: { ar: "توقيت التسليم", en: "Delivery timeline" }, message: TIMELINE_COPY[p.timelineKey] ?? TIMELINE_COPY["standard"] },
  ]

  if (p.brandIdentity && BRAND_COPY[p.brandIdentity])
    insights.push({ label: { ar: "الهوية التجارية", en: "Brand identity" }, message: BRAND_COPY[p.brandIdentity] })

  if (p.contentReadiness && CONTENT_COPY[p.contentReadiness])
    insights.push({ label: { ar: "جاهزية المحتوى", en: "Content readiness" }, message: CONTENT_COPY[p.contentReadiness] })

  if (p.deadlineUrgency && DEADLINE_COPY[p.deadlineUrgency])
    insights.push({ label: { ar: "الجدول الزمني", en: "Deadline" }, message: DEADLINE_COPY[p.deadlineUrgency] })

  return {
    headline: { ar: "لماذا هذه الخطة مناسبة لك", en: "Why this plan fits your needs" },
    insights,
    closing: CLOSING_COPY[p.projectType],
  }
}

export const DELIVERABLES: Record<DeliverableProject, Record<DeliverableTier, string[]>> = {
  ecommerce: {
    small: [
      "Product catalog - up to 50 products, categories & filters",
      "Shopping cart & single-step checkout",
      "Paymob / Fawry payment integration",
      "Basic inventory tracking dashboard",
      "Order confirmation & shipping emails",
      "Customer-facing order status page",
      "Mobile-first responsive UI",
      "On-page SEO: meta, OG tags, sitemap",
      "Domain (.com or .eg) + Hosting - Year 1 included",
      "SSL certificate & CDN setup",
      "1 month post-launch support",
    ],
    medium: [
      "Unlimited product catalog with variants & bundles",
      "Advanced multi-step checkout with address book",
      "Multiple payment gateways (Paymob, Fawry, COD)",
      "Full inventory management & low-stock alerts",
      "Customer accounts, order history & returns",
      "Discount codes, vouchers & flash sale engine",
      "Advanced SEO + structured data (rich snippets)",
      "Google Analytics 4 + Meta Pixel integration",
      "Blog / content hub with CMS",
      "Domain + Hosting - Year 1 included",
      "SSL, CDN & automated backups",
      "3 months post-launch support",
    ],
    large: [
      "Everything in Professional +",
      "Custom storefront animations (GSAP / Framer Motion)",
      "Multi-currency & multi-language storefront",
      "Loyalty & rewards points system",
      "Abandoned cart recovery (email + SMS)",
      "Product recommendations engine",
      "Advanced analytics dashboard (custom KPIs)",
      "Performance engineering - Core Web Vitals 95+",
      "Load-tested to 5,000 concurrent users",
      "Domain + Hosting - Year 1 included",
      "6 months post-launch support + monitoring",
    ],
    enterprise: [
      "Everything in Premium +",
      "Headless commerce architecture (Next.js + custom API)",
      "ERP / POS / WMS integration",
      "Custom PWA mobile app (app-store ready)",
      "Dedicated server infrastructure with auto-scaling",
      "24/7 uptime monitoring & alerting",
      "SLA: 99.9% uptime guarantee",
      "Security audit & penetration testing",
      "Domain + Hosting - Year 1 included",
      "12 months dedicated engineering support",
    ],
  },
  corporate: {
    small: [
      "Up to 6 pages (Home, About, Services, Contact + 2 custom)",
      "Custom design fully matching your brand guidelines",
      "Contact form with email notifications",
      "Google Maps embed & directions",
      "Basic SEO foundation (meta, sitemap, robots.txt)",
      "Mobile-first responsive design",
      "Domain (.com or .eg) + Hosting - Year 1 included",
      "SSL certificate",
      "1 month post-launch support",
    ],
    medium: [
      "Up to 15 pages with consistent design system",
      "Blog / News section with headless CMS",
      "Lead generation forms with CRM-ready data export",
      "Full SEO setup: technical + on-page + sitemap",
      "Google Analytics 4 + Search Console integration",
      "Arabic + English (RTL/LTR) bilingual support",
      "Social media feeds & sharing integration",
      "Domain + Hosting - Year 1 included",
      "SSL, CDN & automated backups",
      "3 months post-launch support",
    ],
    large: [
      "Everything in Professional +",
      "Custom micro-animations (GSAP ScrollTrigger)",
      "Team directory with filterable bios",
      "Case studies & portfolio showcase section",
      "Integrated meeting booking (Cal.com or custom)",
      "Performance engineering - Lighthouse 95+",
      "Core Web Vitals optimization & audit",
      "Domain + Hosting - Year 1 included",
      "6 months post-launch support + performance monitoring",
    ],
    enterprise: [
      "Everything in Premium +",
      "Client-facing portal with secure login",
      "Document management & sharing system",
      "Custom CRM / ERP integration",
      "Multi-site or multi-brand architecture",
      "Dedicated server infrastructure",
      "Security audit & compliance review",
      "Domain + Hosting - Year 1 included",
      "12 months dedicated engineering support",
    ],
  },
  custom: {
    small: [
      "Core application features scoped in discovery",
      "User authentication & account management",
      "Basic role-based access (admin / user)",
      "Responsive dashboard UI",
      "REST API with documentation",
      "PostgreSQL database with schema design",
      "Domain + Hosting - Year 1 included",
      "SSL certificate & environment setup",
      "1 month post-launch support",
    ],
    medium: [
      "Full-stack custom web application",
      "Advanced role-based access control (RBAC)",
      "Admin dashboard with data tables & charts",
      "Up to 3 third-party API integrations",
      "Email notification system (transactional)",
      "File upload & media management",
      "Automated testing for critical user flows",
      "Full API documentation (Swagger / Postman)",
      "Domain + Hosting - Year 1 included",
      "3 months post-launch support",
    ],
    large: [
      "Everything in Professional +",
      "Real-time features (WebSockets / SSE)",
      "Advanced analytics & exportable reports",
      "Webhook system for third-party triggers",
      "Background job processing & queues",
      "Full security audit & OWASP compliance check",
      "Performance optimization & load testing",
      "Domain + Hosting - Year 1 included",
      "6 months post-launch support + monitoring",
    ],
    enterprise: [
      "Everything in Premium +",
      "Microservices or modular monolith architecture",
      "Multi-tenant SaaS with isolated data per tenant",
      "CI/CD pipeline (GitHub Actions / Railway)",
      "Auto-scaling infrastructure (containerised)",
      "White-label capability",
      "Compliance & security audit (ISO-aligned)",
      "Domain + Hosting - Year 1 included",
      "12 months dedicated engineering retainer",
    ],
  },
  performance: {
    small: [
      "Full Lighthouse audit across all key pages",
      "Core Web Vitals baseline measurement (LCP, INP, CLS)",
      "Image optimization report & implementation",
      "Up to 10 critical performance fixes applied",
      "Bundle analysis & dead-code report",
      "Detailed written technical report (PDF)",
      "Prioritized recommendations roadmap",
      "1 follow-up Q&A session (45 min)",
    ],
    medium: [
      "Everything in Essential +",
      "Code splitting & lazy loading implementation",
      "Server-side rendering / ISR review & setup",
      "CDN configuration & edge caching strategy",
      "Third-party script audit & defer strategy",
      "Database query analysis report",
      "2 follow-up sessions + 30-day email support",
    ],
    large: [
      "Everything in Professional +",
      "Full performance implementation (not just audit)",
      "Load testing up to 10,000 concurrent users",
      "Server & infrastructure optimization",
      "Custom real-time monitoring dashboard",
      "3 months active performance monitoring",
      "Monthly performance report delivery",
    ],
    enterprise: [
      "Everything in Premium +",
      "Dedicated performance engineer (part-time retainer)",
      "Continuous optimization cycles (bi-weekly sprints)",
      "SLA performance guarantees (LCP / TTI targets)",
      "Full stack - frontend, backend, infrastructure",
      "6 months monitoring & optimization retainer",
    ],
  },
}
export interface PDFParams {
  locale: string
  t: (key: string, values?: Record<string, string | number>) => string
  projectType: DeliverableProject
  tier: DeliverableTier
  timelineKey: string
  priceMin: number
  priceMax: number
  weeksMin: number
  weeksMax: number
  phone: string
  name: string
  brandIdentity?: string | null
  contentReadiness?: string | null
  deadlineUrgency?: string | null
}

export function buildPDFHtml(p: PDFParams): string {
  const isRtl = p.locale === "ar"
  const dir = isRtl ? "rtl" : "ltr"
  const alignLeft = isRtl ? "right" : "left"
  const alignRight = isRtl ? "left" : "right"

  const f = (n: number) =>
    new Intl.NumberFormat(isRtl ? "ar-EG" : "en-EG", {
      style: "currency", currency: "EGP", maximumFractionDigits: 0,
    }).format(n)

  const today = new Intl.DateTimeFormat(p.locale, {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date())

  // ── Deliverables ──────────────────────────────────────────────────────────
  let items: string[] = []
  try {
    const rawT = p.t as any
    if (rawT.raw) {
      items = rawT.raw(`pdfContent.deliverables.${p.projectType}.${p.tier}`) || []
    } else {
      items = (p.t as any)(
        `pdfContent.deliverables.${p.projectType}.${p.tier}`,
        { returnObjects: true }
      ) || []
    }
  } catch { items = [] }
  if (!Array.isArray(items) || items.length === 0) {
    items = DELIVERABLES[p.projectType][p.tier] || []
  }

  const hosting = HOSTING_RENEWAL[p.tier]
  const half = Math.ceil(items.length / 2)
  const col1 = items.slice(0, half)
  const col2 = items.slice(half)

  // ── Labels - from translations, with hardcoded fallbacks ─────────────────
  const lblProjectType = p.t(`pdfContent.projectLabels.${p.projectType}`) || PROJECT_LABELS[p.projectType]
  const lblTier = p.t(`pdfContent.tierLabels.${p.tier}`) || TIER_LABELS[p.tier]
  const lblTimelineFull = p.t(`pdfContent.timelineLabels.${p.timelineKey}`) || TIMELINE_LABELS[p.timelineKey] || p.timelineKey
  const lblTimeline = lblTimelineFull.split("-")[0].trim()
  const tTier = p.t("pdfContent.tier", { tier: lblTier })

  // ── Narrative - uses hardcoded bilingual copy, no {label} interpolation ──
  const narrative = generateProposalNarrative({
    projectType: p.projectType,
    tier: p.tier,
    timelineKey: p.timelineKey,
    brandIdentity: p.brandIdentity,
    contentReadiness: p.contentReadiness,
    deadlineUrgency: p.deadlineUrgency,
  })
  const L = (obj: { ar: string; en: string }) => pickLang(obj, p.locale)

  const fontBody = isRtl ? "'Tajawal', sans-serif" : "'Inter', sans-serif"
  const fontDisplay = isRtl ? "'Tajawal', sans-serif" : "'Outfit', sans-serif"
  const clientName = p.name || p.t("pdfContent.prospectiveClient")

  // ── HTML helpers ──────────────────────────────────────────────────────────
  const mkCol = (arr: string[]) =>
    arr.map((d) => `
      <div style="display:flex;align-items:flex-start;gap:9px;padding:7px 0;border-bottom:1px solid #EEECE6;">
        <svg width="12" height="12" viewBox="0 0 12 12" style="margin-top:3px;flex-shrink:0;">
          <circle cx="6" cy="6" r="2" fill="#0A0A0A" opacity="0.4"/>
        </svg>
        <span style="font-family:${fontBody};font-size:11.5px;color:#3D3D3A;line-height:1.55;">${d}</span>
      </div>`).join("")

  const hdr = (label: string, sub: string) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:1.5px solid #0A0A0A;margin-bottom:20px;">
      <span style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:600;letter-spacing:.14em;color:#0A0A0A;">ALTRUVEX</span>
      <div style="text-align:${alignRight};">
        <span style="font-family:monospace;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:#888780;display:block;margin-bottom:2px;">${label}</span>
        <span style="font-family:monospace;font-size:11px;color:#444441;">${sub}</span>
      </div>
    </div>`

  const sCard = (l: string, v: string) => `
    <div style="padding:12px 14px;border:1px solid #E8E6DE;border-radius:4px;background:#FAFAF7;text-align:${alignLeft};">
      <span style="font-family:monospace;font-size:7.5px;letter-spacing:.22em;text-transform:uppercase;color:#888780;display:block;margin-bottom:4px;">${l}</span>
      <span style="font-family:${fontDisplay};font-size:12px;font-weight:500;color:#0A0A0A;">${v}</span>
    </div>`

  const secHead = (lbl: string) => `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <span style="font-family:monospace;font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:#888780;white-space:nowrap;">${lbl}</span>
      <div style="flex:1;height:1px;background:#E8E6DE;"></div>
    </div>`

  // FIX 1: page number - wrap in LTR span to prevent RTL reversal
  const foot = (pg: string, disc: string) => `
    <div style="border-top:1px solid #E8E6DE;padding-top:11px;display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;">
      <div style="font-family:monospace;font-size:7.5px;color:#B4B2A9;max-width:68%;line-height:1.6;text-align:${alignLeft};">${disc}</div>
      <span style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;color:#B4B2A9;direction:ltr;unicode-bidi:isolate;">${pg}</span>
    </div>`

  // ── Narrative rows for PDF ─────────────────────────────────────────────────
  const narrativeRows = narrative.insights.map((ins) => `
    <div style="padding:9px 12px;border:1px solid #E8E6DE;border-radius:4px;background:#FBFAF5;text-align:${alignLeft};">
      <span style="font-family:monospace;font-size:7.5px;letter-spacing:.2em;text-transform:uppercase;color:#B4B2A9;display:block;margin-bottom:3px;">${L(ins.label)}</span>
      <span style="font-family:${fontBody};font-size:11px;color:#444441;line-height:1.65;">${L(ins.message)}</span>
    </div>`).join("")

  return `<!DOCTYPE html>
<html ${isRtl ? 'lang="ar" dir="rtl"' : 'lang="en" dir="ltr"'}>
<head>
<meta charset="UTF-8"/>
<title>${p.t("pdf.label")} · ALTRUVEX · ${today}</title>
<style data-pdf-style="true">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Outfit:wght@300;400;500;600&family=Tajawal:wght@400;500;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{
    font-family:${fontBody};
    background:#F7F6F0;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;
    direction:${dir};
    text-align:${alignLeft};
  }
  /* FIX 2: tighter padding to prevent page 1 overflow */
  .page{
    width:210mm;
    min-height:297mm;
    background:#FFF;
    margin:0 auto;
    padding:11mm 13mm 10mm;
    display:flex;
    flex-direction:column;
  }
  .page+.page{page-break-before:always;}
  @media print{
    body{background:#fff;}
    .page{margin:0;padding:9mm 12mm;}
    @page{size:A4 portrait;margin:0;}
  }
</style>
</head>
<body>

<!-- PAGE 1 -->
<div class="page">
  ${hdr(p.t("pdf.label"), `${today}${p.name ? ` · ${p.name}` : ""}`)}

  <!-- Hero -->
  <div style="background:#0A0A0A;border-radius:5px;padding:20px 24px;margin-bottom:18px;">
    <span style="font-family:monospace;font-size:8px;letter-spacing:.25em;text-transform:uppercase;color:#73726C;display:block;margin-bottom:8px;">${p.t("pdfContent.engineeringBeyond")}</span>
    <div style="font-family:${fontDisplay};font-size:24px;font-weight:500;color:#FAFAF7;line-height:1.2;margin-bottom:6px;">${lblProjectType}</div>
    <div style="font-family:monospace;font-size:12px;color:#73726C;">${tTier} &nbsp;·&nbsp; ${lblTimelineFull}</div>
  </div>

  <!-- 3-col summary -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
    ${sCard(p.t("pdfContent.projectType"), lblProjectType)}
    ${sCard(p.t("pdfContent.scopeTier"), lblTier)}
    ${sCard(p.t("pdfContent.deliveryMode"), lblTimeline)}
  </div>

  <!-- FIX 3: narrative uses hardcoded bilingual copy - no English leaks in AR -->
  ${secHead(L(narrative.headline))}
  <div style="display:grid;grid-template-columns:1fr;gap:7px;margin-bottom:16px;">
    ${narrativeRows}
  </div>

  <!-- Investment -->
  ${secHead(p.t("pdfContent.investmentEstimate"))}
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px;margin-bottom:16px;">
    <div style="padding:18px 20px;background:#FAFAF7;border:1px solid #DDDBD3;border-radius:4px;">
      <span style="font-family:monospace;font-size:7.5px;letter-spacing:.2em;text-transform:uppercase;color:#888780;display:block;margin-bottom:8px;">${p.t("pdfContent.totalRange")}</span>
      <div style="font-family:${fontDisplay};font-size:28px;font-weight:500;letter-spacing:-.02em;color:#0A0A0A;line-height:1.1;">${f(p.priceMin)}</div>
      <div style="font-size:13px;color:#888780;margin-top:3px;">- ${f(p.priceMax)}</div>
      <span style="font-family:monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#B4B2A9;margin-top:10px;display:block;">${p.t("pdfContent.inclDomain")}</span>
    </div>
    <div style="padding:18px 20px;background:#F3F2EB;border-radius:4px;">
      <span style="font-family:monospace;font-size:7.5px;letter-spacing:.2em;text-transform:uppercase;color:#888780;display:block;margin-bottom:8px;">${p.t("pdfContent.estimatedDelivery")}</span>
      <div style="font-family:${fontDisplay};font-size:28px;font-weight:500;letter-spacing:-.02em;color:#0A0A0A;line-height:1.1;">${localizeNumbers(p.weeksMin.toString(), p.locale)}–${localizeNumbers(p.weeksMax.toString(), p.locale)}</div>
      <div style="font-size:12px;color:#888780;margin-top:3px;">${p.t("pdfContent.weeksFromKickoff")}</div>
      <span style="font-family:monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;color:#B4B2A9;margin-top:10px;display:block;">${p.t("pdfContent.discoverySeparate")}</span>
    </div>
  </div>

  <!-- Infrastructure -->
  ${secHead(p.t("pdfContent.infraIncluded"))}
  <div style="display:flex;gap:12px;padding:13px 16px;background:#F3F2EB;border-radius:4px;margin-bottom:16px;">
    <div style="width:6px;height:6px;border-radius:50%;background:#4A6ED4;margin-top:3px;flex-shrink:0;"></div>
    <div>
      <span style="font-family:monospace;font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#4A6ED4;display:block;margin-bottom:3px;">${p.t("pdfContent.whatsCovered")}</span>
      <span style="font-size:11.5px;color:#444441;line-height:1.65;font-family:${fontBody};">
        ${p.t("pdfContent.infraDetails")}<br/>
        <strong style="font-weight:600;display:block;margin-top:3px;">${p.t("pdfContent.renewalFromYear2", { amount: f(hosting) })}</strong>
      </span>
    </div>
  </div>

  <!-- CTA bar -->
  <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:#0A0A0A;border-radius:4px;margin-bottom:16px;">
    <div>
      <div style="font-family:${fontDisplay};font-size:15px;font-weight:500;color:#FAFAF7;margin-bottom:3px;">${p.t("pdfContent.readyToMoveForward")}</div>
      <div style="font-family:monospace;font-size:11px;color:#73726C;">${p.t("pdfContent.bookCall")}</div>
    </div>
    <div style="text-align:${alignRight};">
      <span style="font-family:monospace;font-size:12px;color:#FAFAF7;display:block;margin-bottom:2px;">hello@altruvex.com</span>
      <span style="font-family:monospace;font-size:11px;color:#73726C;">altruvex.com</span>
    </div>
  </div>

  ${foot("ALTRUVEX · 1 / 2", p.t("pdfContent.estimateValid"))}
</div>

<!-- PAGE 2 -->
<div class="page">
  ${hdr(p.t("pdfContent.scopeOfDeliverables"), `${lblProjectType} · ${lblTier}`)}

  <div style="padding:14px 0 18px;">
    <p style="font-family:${fontDisplay};font-size:22px;font-weight:400;letter-spacing:-.02em;color:#0A0A0A;margin-bottom:4px;">${p.t("pdfContent.whatsIncluded")}</p>
    <p style="font-family:monospace;font-size:12px;color:#888780;">${p.t("pdfContent.deliverablesCount", { count: localizeNumbers(items.length.toString(), p.locale), tier: lblTier })}</p>
  </div>

  ${secHead(p.t("pdfContent.fullDeliverablesList"))}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 28px;margin-bottom:28px;">
    <div>${mkCol(col1)}</div>
    <div>${mkCol(col2)}</div>
  </div>

  <div>
    ${secHead(p.t("pdfContent.howWeWork"))}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      ${[
      [p.t("pdfContent.phase1Title"), p.t("pdfContent.phase1Desc")],
      [p.t("pdfContent.phase2Title"), p.t("pdfContent.phase2Desc")],
      [p.t("pdfContent.phase3Title"), p.t("pdfContent.phase3Desc", {
        min: localizeNumbers(Math.max(p.weeksMin - 3, 1).toString(), p.locale),
        max: localizeNumbers(Math.max(p.weeksMax - 3, 1).toString(), p.locale),
      })],
      [p.t("pdfContent.phase4Title"), p.t("pdfContent.phase4Desc")],
    ].map(([phase, desc]) => `
        <div style="padding:12px 15px;border:1px solid #E8E6DE;border-radius:4px;background:#FAFAF7;">
          <p style="font-family:monospace;font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:#888780;margin-bottom:5px;">${phase}</p>
          <p style="font-size:11.5px;color:#444441;line-height:1.55;font-family:${fontBody};">${desc}</p>
        </div>`).join("")}
    </div>
  </div>

  ${foot("ALTRUVEX · 2 / 2", p.t("pdfContent.confidential", { name: clientName }))}
</div>

<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),600))</script>
</body>
</html>`
}

export async function generateEstimatePdf(html: string, filename: string) {
  const html2pdf = (await import("html2pdf.js")).default

  const iframe = document.createElement("iframe")
  iframe.style.cssText =
    "position:fixed;left:-9999px;top:0;width:210mm;height:297mm;border:none;opacity:0;pointer-events:none;"
  document.body.appendChild(iframe)

  try {
    iframe.contentDocument!.open()
    iframe.contentDocument!.write(html)
    iframe.contentDocument!.close()

    const killStyle = iframe.contentDocument!.createElement("style")
    killStyle.setAttribute("data-pdf-style", "true")
    killStyle.textContent = `*, *::before, *::after { color-scheme: light !important; }`
    iframe.contentDocument!.head.appendChild(killStyle)

    // Give fonts/layout a short moment to settle before rasterizing
    await new Promise((resolve) => setTimeout(resolve, 900))

    await (html2pdf() as any)
      .set({
        margin: 0,
        filename,
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          onclone: (_doc: Document, el: HTMLElement) => {
            el.style.colorScheme = "light"
            // Strip any external/global styles so html2canvas doesn't see unsupported
            // color functions like lab()/oklch() from the main app theme.
            Array.from(_doc.querySelectorAll("link, style:not([data-pdf-style])")).forEach((node) =>
              node.remove(),
            )
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "css", before: ".page + .page" },
      })
      .from(iframe.contentDocument!.body)
      .save()
  } finally {
    document.body.removeChild(iframe)
  }
}