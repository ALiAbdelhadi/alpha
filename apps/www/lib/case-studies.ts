import type { SupportedLocale } from "@/lib/metadata";

type LocalizedValue = Record<SupportedLocale, string>;

type CaseStudyMetric = {
  label: LocalizedValue;
  value: string;
};

export const CASE_STUDY_SLUGS = [
  "altruvex-site",
  "art-lighting-store",
  "custom-case-builder",
  "bilingual-corporate-portal",
] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export type CaseStudyRecord = {
  client: LocalizedValue;
  industry: LocalizedValue;
  keywords: Record<SupportedLocale, string[]>;
  metrics: CaseStudyMetric[];
  name: LocalizedValue;
  slug: CaseStudySlug;
  summary: LocalizedValue;
  year: string;
};

export const CASE_STUDIES: CaseStudyRecord[] = [
  {
    client: {
      ar: "داخلي / ألتروفيكس",
      en: "Internal / Altruvex",
    },
    industry: {
      ar: "هندسة الويب / وكالة",
      en: "Web Engineering / Agency",
    },
    keywords: {
      ar: [
        "دراسة حالة ألتروفيكس",
        "موقع وكالة Next.js",
        "موقع ثنائي اللغة",
        "هندسة ويب تقنية",
      ],
      en: [
        "altruvex case study",
        "next.js agency website",
        "bilingual website case study",
        "technical web engineering",
      ],
    },
    metrics: [
      {
        label: {
          ar: "وقت التفاعل على الجوال",
          en: "Mobile TTI",
        },
        value: "< 1s",
      },
      {
        label: {
          ar: "سرعة تبديل العربي",
          en: "RTL Switch",
        },
        value: "< 16ms",
      },
      {
        label: {
          ar: "تأهيل العملاء",
          en: "Discovery-call time",
        },
        value: "-40%",
      },
    ],
    name: {
      ar: "Altruvex.com — كان على الموقع نفسه أن يكون الدليل",
      en: "Altruvex.com — The Site Itself Had to Be the Proof",
    },
    slug: "altruvex-site",
    summary: {
      ar: "مشروع إثبات عربي/إنجليزي صُمم لإظهار الجودة التقنية والتنفيذ الأصلي لـ RTL وتأهيل العميل المحتمل قبل أول مكالمة.",
      en: "A bilingual Arabic/English proof build designed to demonstrate technical quality, native RTL execution, and lead qualification before the first call.",
    },
    year: "2025",
  },
  {
    client: {
      ar: "علامة تجارية سرية للتجارة الإلكترونية",
      en: "Confidential E-Commerce Brand",
    },
    industry: {
      ar: "إضاءة منزلية فاخرة",
      en: "Premium home lighting",
    },
    keywords: {
      ar: [
        "دراسة حالة متجر مخصص",
        "واجهة متجر Next.js",
        "تجارة إلكترونية عالية الأداء",
      ],
      en: [
        "custom storefront case study",
        "next.js ecommerce build",
        "high-performance retail website",
      ],
    },
    metrics: [
      {
        label: {
          ar: "زيادة التحويل",
          en: "Conversion lift",
        },
        value: "+34%",
      },
      {
        label: {
          ar: "التحميل الأولي",
          en: "Initial load",
        },
        value: "1.2s",
      },
      {
        label: {
          ar: "درجة Lighthouse",
          en: "Lighthouse score",
        },
        value: "98",
      },
    ],
    name: {
      ar: "متجر آرت للإضاءة",
      en: "Art Lighting Store",
    },
    slug: "art-lighting-store",
    summary: {
      ar: "صور منتجات عالية الدقة على نطاق واسع مع مخزون في الوقت الفعلي وتحميل سريع للصفحات لبائع تجزئة للإضاءة الفاخرة.",
      en: "High-resolution product imagery at scale with real-time inventory and fast page loads for a premium lighting retailer.",
    },
    year: "2024",
  },
  {
    client: {
      ar: "كيسز كوبرا",
      en: "CasesCobra",
    },
    industry: {
      ar: "إكسسوارات مباشرة للمستهلك",
      en: "Direct-to-consumer accessories",
    },
    keywords: {
      ar: ["مكوّن منتجات تفاعلي", "أداة تخصيص منتجات", "دراسة حالة React"],
      en: [
        "product configurator case study",
        "custom ecommerce configurator",
        "react product builder",
      ],
    },
    metrics: [
      {
        label: {
          ar: "تفاعل أداة التكوين",
          en: "Configurator engagement",
        },
        value: "3.4×",
      },
      {
        label: {
          ar: "معدل الإرجاع",
          en: "Return rate",
        },
        value: "-18%",
      },
    ],
    name: {
      ar: "منشئ حافظات مخصص",
      en: "Custom Case Builder",
    },
    slug: "custom-case-builder",
    summary: {
      ar: "أداة تكوين منتج في الوقت الفعلي تتيح للعملاء تصميم ومعاينة حافظات الهاتف في المتصفح قبل الطلب.",
      en: "A real-time product configurator that lets customers design and preview phone cases in the browser before ordering.",
    },
    year: "2024",
  },
  {
    client: {
      ar: "نيو لايت",
      en: "NewLight",
    },
    industry: {
      ar: "التصنيع وB2B",
      en: "Manufacturing & B2B",
    },
    keywords: {
      ar: ["موقع شركة ثنائي اللغة", "معمارية RTL", "بوابة B2B"],
      en: [
        "bilingual corporate portal",
        "rtl web architecture",
        "b2b website case study",
      ],
    },
    metrics: [
      {
        label: {
          ar: "الوقت المستغرق في الموقع",
          en: "Time on site",
        },
        value: "+27%",
      },
      {
        label: {
          ar: "معدل الارتداد",
          en: "Bounce rate",
        },
        value: "-22%",
      },
    ],
    name: {
      ar: "واجهة شركة ثنائية اللغة",
      en: "Bilingual Corporate Presence",
    },
    slug: "bilingual-corporate-portal",
    summary: {
      ar: "موقع شركة ثنائي اللغة مع دعم كامل للـ RTL وكتالوج منتجات وPWA لبيئات الشبكة الضعيفة.",
      en: "A bilingual corporate site with full RTL support, product catalogue, and a PWA shell for poor-network environments.",
    },
    year: "2024",
  },
];

export function getAllCaseStudies() {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudyRecord | null {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
