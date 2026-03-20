export type LocalizedString = {
  en: string
  ar: string
}

export type CaseStudyMetric = {
  label: LocalizedString
  value: string
  description?: LocalizedString
}

export type CaseStudy = {
  slug: string
  name: LocalizedString
  client: LocalizedString
  industry: LocalizedString
  year: string
  summary: LocalizedString
  externalUrl?: string
  metrics: CaseStudyMetric[]
  problem: LocalizedString
  solution: LocalizedString
  outcome: LocalizedString
  techStack: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "art-lighting-store",
    name: {
      en: "Art Lighting Store",
      ar: "متجر آرت للإضاءة",
    },
    client: {
      en: "Confidential E‑Commerce Brand",
      ar: "علامة تجارية سرية للتجارة الإلكترونية",
    },
    industry: {
      en: "Premium home lighting",
      ar: "إضاءة منزلية فاخرة",
    },
    year: "2024",
    externalUrl: "https://eg-artlighting.vercel.app/",
    summary: {
      en: "High-resolution product imagery at scale with real-time inventory and fast page loads for a premium lighting retailer.",
      ar: "صور منتجات عالية الدقة على نطاق واسع مع مخزون في الوقت الفعلي وتحميل سريع للصفحات لبائع تجزئة للإضاءة الفاخرة.",
    },
    metrics: [
      {
        label: { en: "Conversion lift", ar: "زيادة التحويل" },
        value: "+34%",
        description: {
          en: "Increase in completed purchases after launch.",
          ar: "الزيادة في عمليات الشراء المكتملة بعد الإطلاق.",
        },
      },
      {
        label: { en: "Initial load", ar: "التحميل الأولي" },
        value: "1.2s",
        description: {
          en: "Average First Contentful Paint on 4G.",
          ar: "متوسط أول رسم للمحتوى على شبكة 4G.",
        },
      },
      {
        label: { en: "Lighthouse score", ar: "درجة Lighthouse" },
        value: "98",
        description: {
          en: "Performance, accessibility, and SEO combined.",
          ar: "الأداء وإمكانية الوصول وSEO مجتمعة.",
        },
      },
    ],
    problem: {
      en: "The client sold high-end fixtures where material and detail matter, but their existing platform heavily compressed images and loaded slowly. Customers couldn’t properly inspect finishes or scale, and inventory was fragmented across multiple systems, creating overselling risk.",
      ar: "كان العميل يبيع تركيبات راقية حيث تهم المادة والتفاصيل، لكن منصتهم الحالية كانت تضغط الصور بشدة وتحمل ببطء. لم يتمكن العملاء من فحص التشطيبات أو الحجم بشكل صحيح، وكان المخزون مجزأً عبر أنظمة متعددة، مما خلق خطر البيع المفرط.",
    },
    solution: {
      en: "We designed a custom Next.js storefront with an image pipeline tuned for high‑resolution zoom without sacrificing load time. Inventory is synchronized via webhooks into a single source of truth, and pages are statically generated with targeted revalidation for fast, consistent performance.",
      ar: "لقد صممنا واجهة متجر Next.js مخصصة مع خط أنابيب صور مضبوط للتكبير عالي الدقة دون التضحية بوقت التحميل. يتم مزامنة المخزون عبر webhooks في مصدر واحد للحقيقة، ويتم إنشاء الصفحات بشكل ثابت مع إعادة التحقق المستهدفة لأداء سريع ومتسق.",
    },
    outcome: {
      en: "Within the first month, the new store shipped on schedule, improved conversion rate by 34%, cut perceived load time to nearly instant, and eliminated overselling incidents. The client’s team can now manage products and inventory without engineering support.",
      ar: "في غضون الشهر الأول، تم شحن المتجر الجديد في الموعد المحدد، وتحسن معدل التحويل بنسبة 34٪، وتم تقليل وقت التحميل الملحوظ إلى فوري تقريباً، والقضاء على حوادث البيع المفرط. يمكن لفريق العميل الآن إدارة المنتجات والمخزون دون الحاجة لدعم هندسي.",
    },
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
    name: {
      en: "Custom Case Builder",
      ar: "منشئ حافظات مخصص",
    },
    client: {
      en: "CasesCobra",
      ar: "كيسز كوبرا",
    },
    industry: {
      en: "Direct‑to‑consumer accessories",
      ar: "إكسسوارات مباشرة للمستهلك",
    },
    year: "2024",
    externalUrl: "https://casescobra.vercel.app/",
    summary: {
      en: "A real-time product configurator that lets customers design and preview phone cases in the browser before ordering.",
      ar: "أداة تكوين منتج في الوقت الفعلي تتيح للعملاء تصميم ومعاينة حافظات الهاتف في المتصفح قبل الطلب.",
    },
    metrics: [
      {
        label: { en: "Configurator engagement", ar: "تفاعل أداة التكوين" },
        value: "3.4×",
        description: {
          en: "More time spent interacting vs. previous catalogue.",
          ar: "مزيد من الوقت الذي يقضيه العميل في التفاعل مقارنة بالكتالوج السابق.",
        },
      },
      {
        label: { en: "Return rate", ar: "معدل الإرجاع" },
        value: "-18%",
        description: {
          en: "Drop in returns due to clearer visual expectations.",
          ar: "انخفاض في المرتجعات بسبب التوقعات البصرية الأكثر وضوحاً.",
        },
      },
    ],
    problem: {
      en: "The brand’s previous site only offered static photos and a long options list. Customers couldn’t visualize combinations, which led to decision fatigue, abandoned carts, and higher return rates when expectations didn’t match reality.",
      ar: "كان موقع العلامة التجارية السابق يقدم فقط صوراً ثابتة وقائمة طويلة من الخيارات. لم يتمكن العملاء من تصور التركيبات، مما أدى إلى إرهاق اتخاذ القرار، وسلال المهملات المتروكة، وارتفاع معدلات الإرجاع عندما لم تتطابق التوقعات مع الواقع.",
    },
    solution: {
      en: "We built a client‑side configurator in React that updates the preview in real time as users change device type, colors, and artwork. All configurations are encoded in a compact URL, allowing customers to share or resume designs, and orders are passed to the backend with a full configuration payload.",
      ar: "لقد بنينا أداة تكوين من جانب العميل في React تقوم بتحديث المعاينة في الوقت الفعلي مع تغيير المستخدمين لنوع الجهاز والألوان والرسومات. يتم تشفير جميع التكوينات في عنوان URL مضغوط، مما يسمح للعملاء بمشاركة التصاميم أو استئنافها، ويتم تمرير الطلبات إلى الخلفية مع حمولة تكوين كاملة.",
    },
    outcome: {
      en: "The new experience turned the buying process into an interactive flow, significantly increasing engagement and reducing returns. Operations now receive complete, validated configurations, reducing back‑and‑forth and misprints.",
      ar: "حولت التجربة الجديدة عملية الشراء إلى تدفق تفاعلي، مما أدى إلى زيادة التفاعل بشكل كبير وتقليل المرتجعات. تتلقى العمليات الآن تكوينات كاملة ومعتمدة، مما يقلل من الأخذ والرد والأخطاء المطبعية.",
    },
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
    name: {
      en: "Bilingual Corporate Presence",
      ar: "واجهة شركة ثنائية اللغة",
    },
    client: {
      en: "NewLight",
      ar: "نيو لايت",
    },
    industry: {
      en: "Manufacturing & B2B",
      ar: "التصنيع وB2B",
    },
    year: "2024",
    externalUrl: "https://www.newlight-eg.com/",
    summary: {
      en: "A bilingual corporate site with full RTL support, product catalogue, and PWA shell for poor‑network environments.",
      ar: "موقع شركة ثنائي اللغة مع دعم كامل للـ RTL، وكتالوج المنتجات، وPWA لبيئات الشبكة الضعيفة.",
    },
    metrics: [
      {
        label: { en: "Time on site", ar: "الوقت المستغرق في الموقع" },
        value: "+27%",
        description: {
          en: "Increase in session duration for mobile visitors.",
          ar: "الزيادة في مدة الجلسة لزوار الهاتف المحمول.",
        },
      },
      {
        label: { en: "Bounce rate", ar: "معدل الارتداد" },
        value: "-22%",
        description: {
          en: "Drop in early exits on key landing pages.",
          ar: "انخفاض الخروج المبكر في صفحات الهبوط الرئيسية.",
        },
      },
    ],
    problem: {
      en: "NewLight’s previous site treated Arabic as a simple translation layer, leading to broken layouts, inconsistent typography, and poor readability. Sales teams needed a fast, offline‑friendly way to browse products during client visits with unreliable connectivity.",
      ar: "كان موقع نيو لايت السابق يعامل اللغة العربية كطبقة ترجمة بسيطة، مما أدى إلى تخطيطات مكسورة، وتيبوغرافيا غير متسقة، وضعف في القراءة. احتاجت فرق المبيعات إلى طريقة سريعة وصديقة للعمل دون اتصال لتصفح المنتجات أثناء زيارات العملاء في ظل اتصال غير موثوق.",
    },
    solution: {
      en: "We rebuilt the site on Next.js with next‑intl, designing layouts that adapt structurally for RTL rather than just mirroring. The product catalogue is cached via a PWA shell so sales can browse and search products even on weak connections, with updates pushed on deploy.",
      ar: "لقد أعدنا بناء الموقع على Next.js باستخدام next-intl، وصممنا تخطيطات تتكيف بنيوياً مع RTL بدلاً من مجرد الانعكاس. يتم تخزين كتالوج المنتجات مؤقتاً عبر PWA بحيث يمكن للمبيعات تصفح والبحث عن المنتجات حتى في ظل الاتصال الضعيف، مع دفع التحديثات عند النشر.",
    },
    outcome: {
      en: "The new portal presents a coherent brand in both Arabic and English, reduced confusion on key pages, and gave the sales team a reliable tool in the field. Prospects now understand the offering quickly, in their preferred language and on whatever device they use.",
      ar: "يقدم البوابة الجديدة علامة تجارية متماسكة باللغتين العربية والإنجليزية، مما قلل من الارتباك في الصفحات الرئيسية، ومنح فريق المبيعات أداة موثوقة في الميدان. يفهم العملاء المحتملون الآن العرض بسرعة، بلغتهم المفضلة وعلى أي جهاز يستخدمونه.",
    },
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

