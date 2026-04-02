export type CommercialLocale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type CommercialCtaKey =
  | "projectRange"
  | "realBuild"
  | "technicalCall"
  | "technicalAudit"
  | "architecture"
  | "maintenancePlans"
  | "pricingEssential"
  | "pricingProfessional"
  | "pricingFlagship"
  | "flagshipBuild";

type CommercialCtaDefinition = {
  label: LocalizedText;
  href: string;
  hint: LocalizedText;
};

type OfferDefinition = {
  id: "website" | "portal" | "audit" | "maintenance";
  title: LocalizedText;
  audience: LocalizedText;
  outcome: LocalizedText;
  ctaKey: CommercialCtaKey;
  detailHref: string;
};

type TrustPoint = {
  value: LocalizedText;
  label: LocalizedText;
};

export function resolveCommercialLocale(locale: string): CommercialLocale {
  return locale.startsWith("ar") ? "ar" : "en";
}

export function pickCommercialText(
  locale: string,
  value: LocalizedText,
): string {
  return value[resolveCommercialLocale(locale)];
}

export const COMMERCIAL_CTAS: Record<
  CommercialCtaKey,
  CommercialCtaDefinition
> = {
  projectRange: {
    label: {
      en: "Get Your Project Range",
      ar: "احصل على نطاق مشروعك",
    },
    href: "/estimator",
    hint: {
      en: "Opens the full estimator so you can answer a few scoping questions and get a realistic range.",
      ar: "يفتح صفحة المقدّر الكاملة لتجيب عن أسئلة تحديد النطاق وتحصل على تقدير واقعي.",
    },
  },
  realBuild: {
    label: {
      en: "See a Real Build",
      ar: "شاهد مشروعًا حقيقيًا",
    },
    href: "/work/altruvex-site",
    hint: {
      en: "Opens the flagship case study and shows how the proof was built.",
      ar: "يفتح دراسة الحالة الرئيسية ويعرض كيف بُني هذا الدليل عمليًا.",
    },
  },
  technicalCall: {
    label: {
      en: "Book a Technical Call",
      ar: "احجز مكالمة تقنية",
    },
    href: "/schedule",
    hint: {
      en: "Opens the schedule page so you can pick a time for the working call.",
      ar: "يفتح صفحة الجدولة لتختار وقت المكالمة العملية المناسبة لك.",
    },
  },
  technicalAudit: {
    label: {
      en: "Start with a Technical Audit",
      ar: "ابدأ بتدقيق تقني",
    },
    href: "/contact?service=consulting&package=audit",
    hint: {
      en: "Opens contact with the audit path already selected.",
      ar: "يفتح صفحة التواصل مع تحديد مسار التدقيق مسبقًا.",
    },
  },
  architecture: {
    label: {
      en: "Talk Through the Architecture",
      ar: "ناقش معنا البنية التقنية",
    },
    href: "/contact?service=development&track=architecture",
    hint: {
      en: "Opens contact with the architecture track already selected.",
      ar: "يفتح صفحة التواصل مع تحديد مسار البنية التقنية مسبقًا.",
    },
  },
  maintenancePlans: {
    label: {
      en: "See Maintenance Plans",
      ar: "شاهد خطط الصيانة",
    },
    href: "/services/maintenance#pricing",
    hint: {
      en: "Jumps straight to the maintenance plans and support pricing.",
      ar: "ينقلك مباشرة إلى خطط الصيانة وتسعير الدعم.",
    },
  },
  pricingEssential: {
    label: {
      en: "Get Pricing for This Scope",
      ar: "احصل على تسعير هذا النطاق",
    },
    href: "/estimator?tier=essential",
    hint: {
      en: "Opens the estimator with the essential tier in mind.",
      ar: "يفتح المقدّر مع توجيه مسبق إلى الفئة الأساسية.",
    },
  },
  pricingProfessional: {
    label: {
      en: "Plan This Build",
      ar: "خطط هذا المشروع",
    },
    href: "/estimator?tier=professional",
    hint: {
      en: "Opens the estimator with the professional tier in mind.",
      ar: "يفتح المقدّر مع توجيه مسبق إلى الفئة الاحترافية.",
    },
  },
  pricingFlagship: {
    label: {
      en: "Talk Through the Architecture",
      ar: "ناقش معنا البنية التقنية",
    },
    href: "/schedule",
    hint: {
      en: "Takes you to a technical call for higher-complexity architecture planning.",
      ar: "ينقلك إلى مكالمة تقنية لتخطيط المشاريع الأعلى تعقيدًا.",
    },
  },
  flagshipBuild: {
    label: {
      en: "Plan a Build Like This",
      ar: "خطط مشروعًا بهذا المستوى",
    },
    href: "/estimator?tier=professional",
    hint: {
      en: "Starts estimator planning from a connected production-grade build.",
      ar: "يبدأ التخطيط في المقدّر من نقطة مشروع متصل بمستوى إنتاجي.",
    },
  },
};

export function getCommercialCta(locale: string, key: CommercialCtaKey) {
  const definition = COMMERCIAL_CTAS[key];
  return {
    ...definition,
    label: pickCommercialText(locale, definition.label),
    hint: pickCommercialText(locale, definition.hint),
  };
}

export const HOMEPAGE_OFFERS: OfferDefinition[] = [
  {
    id: "website",
    title: {
      en: "Launch a bilingual business website",
      ar: "أطلق موقع أعمال ثنائي اللغة",
    },
    audience: {
      en: "For companies that have outgrown template agencies and need a site that builds trust and converts serious inquiries.",
      ar: "للشركات التي تجاوزت وكالات القوالب وتحتاج موقعًا يبني الثقة ويحوّل الاستفسارات الجادة.",
    },
    outcome: {
      en: "A custom Arabic/English website with strong performance, clear messaging, and conversion-ready structure.",
      ar: "موقع عربي/إنجليزي مخصص بأداء قوي ورسائل واضحة وهيكل جاهز للتحويل.",
    },
    ctaKey: "projectRange",
    detailHref: "/services/interface-design",
  },
  {
    id: "portal",
    title: {
      en: "Build a custom portal or internal system",
      ar: "ابنِ بوابة أو نظامًا داخليًا مخصصًا",
    },
    audience: {
      en: "For businesses managing workflows manually, or needing dashboards, portals, booking logic, approvals, or operational tools.",
      ar: "للشركات التي تدير سير العمل يدويًا أو تحتاج لوحات تحكم أو بوابات أو منطق حجوزات أو موافقات أو أدوات تشغيلية.",
    },
    outcome: {
      en: "A system that removes bottlenecks, supports scale, and fits how the business actually works.",
      ar: "نظام يزيل الاختناقات ويدعم التوسع ويتوافق مع طريقة عمل الشركة فعليًا.",
    },
    ctaKey: "architecture",
    detailHref: "/services/development",
  },
  {
    id: "audit",
    title: {
      en: "Start with a technical audit",
      ar: "ابدأ بتدقيق تقني",
    },
    audience: {
      en: "For teams with a slow site, unclear architecture, or a risky rebuild decision.",
      ar: "للفرق التي تعاني من موقع بطيء أو بنية غير واضحة أو قرار إعادة بناء عالي المخاطر.",
    },
    outcome: {
      en: "A fixed-scope audit, prioritized findings, and an execution-ready roadmap in 5 business days.",
      ar: "تدقيق ثابت النطاق مع نتائج مرتبة بالأولوية وخارطة طريق جاهزة للتنفيذ خلال 5 أيام عمل.",
    },
    ctaKey: "technicalAudit",
    detailHref: "/services/consulting",
  },
  {
    id: "maintenance",
    title: {
      en: "Keep the system stable after launch",
      ar: "حافظ على استقرار النظام بعد الإطلاق",
    },
    audience: {
      en: "For businesses with a live site or system that need updates, monitoring, fixes, and ongoing support.",
      ar: "للشركات التي لديها موقع أو نظام حي وتحتاج تحديثات ومراقبة وإصلاحات ودعمًا مستمرًا.",
    },
    outcome: {
      en: "Predictable maintenance without firefighting.",
      ar: "صيانة متوقعة دون إدارة أزمات مستمرة.",
    },
    ctaKey: "maintenancePlans",
    detailHref: "/services/maintenance",
  },
];

export const FLAGSHIP_CASE_STUDY = {
  eyebrow: {
    en: "Flagship Case Study",
    ar: "دراسة الحالة الرئيسية",
  },
  title: {
    en: "Altruvex.com — The Site Itself Had to Be the Proof",
    ar: "Altruvex.com — كان على الموقع نفسه أن يكون الدليل",
  },
  summary: {
    en: "A bilingual proof build designed to qualify leads, demonstrate engineering quality, and show what custom Arabic/English delivery looks like in production.",
    ar: "مشروع إثبات ثنائي اللغة صُمم لتأهيل العملاء المحتملين وإظهار الجودة الهندسية وما يعنيه تنفيذ عربي/إنجليزي مخصص في بيئة إنتاج حقيقية.",
  },
  problemLabel: {
    en: "Problem",
    ar: "المشكلة",
  },
  problem: {
    en: "In a market where many agencies compete on price, Altruvex needed its own site to prove technical quality without leaning on borrowed enterprise credibility.",
    ar: "في سوق تتنافس فيه وكالات كثيرة على السعر، كان على موقع Altruvex نفسه أن يثبت الجودة التقنية دون الاعتماد على مصداقية مستعارة من شعارات شركات كبرى.",
  },
  solutionLabel: {
    en: "Solution",
    ar: "الحل",
  },
  solution: {
    en: "We built a bilingual Arabic/English site on a custom Next.js stack with native RTL architecture, performance-first frontend engineering, and a pricing estimator that qualifies leads before the first conversation.",
    ar: "بنينا موقعًا عربيًا/إنجليزيًا على بنية Next.js مخصصة مع معمارية RTL أصلية، وهندسة واجهات تركّز على الأداء، ومقدّر أسعار يؤهل العميل المحتمل قبل أول محادثة.",
  },
  outcomeLabel: {
    en: "Outcome",
    ar: "النتيجة",
  },
  outcome: {
    en: "<1s mobile TTI, <16ms RTL switching with zero layout shift, and an estimated 40% reduction in discovery-call time because leads arrive better qualified.",
    ar: "أقل من ثانية لوقت التفاعل على الجوال، وأقل من 16ms للتبديل بين RTL دون أي اهتزاز بصري، وانخفاض تقديري 40٪ في وقت مكالمات الاكتشاف لأن العملاء يصلون أكثر تأهيلاً.",
  },
};

export const FLAGSHIP_METRICS: TrustPoint[] = [
  {
    value: { en: "<1s", ar: "<1ث" },
    label: { en: "Mobile TTI", ar: "وقت التفاعل على الجوال" },
  },
  {
    value: { en: "<16ms", ar: "<16ms" },
    label: { en: "RTL switching", ar: "تبديل RTL" },
  },
  {
    value: { en: "40%", ar: "40٪" },
    label: { en: "Less discovery-call time", ar: "وقت أقل لمكالمات الاكتشاف" },
  },
];

export const HOMEPAGE_SUPPORTING_CASE_STUDIES = [
  "bilingual-corporate-portal",
  "custom-case-builder",
] as const;

export const TRUST_BLOCK = {
  eyebrow: {
    en: "Why teams trust Altruvex",
    ar: "لماذا تثق الفرق في Altruvex",
  },
  title: {
    en: "Founder-led delivery, bilingual precision, and zero template shortcuts.",
    ar: "تنفيذ يقوده المؤسس، ودقة ثنائية اللغة، ومن دون أي اختصارات قائمة على القوالب.",
  },
  body: {
    en: "You work directly with the engineer shaping the system. Strategy, scope, implementation quality, and communication stay in one line of ownership from start to launch.",
    ar: "تتعامل مباشرة مع المهندس الذي يشكّل النظام. تبقى الاستراتيجية والنطاق وجودة التنفيذ والتواصل ضمن خط ملكية واحد من البداية حتى الإطلاق.",
  },
  points: [
    {
      title: {
        en: "Bilingual by architecture",
        ar: "ثنائي اللغة على مستوى المعمارية",
      },
      body: {
        en: "Arabic and English are engineered as equal experiences, not mirrored afterthoughts.",
        ar: "العربية والإنجليزية تُهندسان كتجربتين متكافئتين، لا كنسخة معكوسة تُضاف لاحقًا.",
      },
    },
    {
      title: {
        en: "No template delivery",
        ar: "لا تسليم قائم على القوالب",
      },
      body: {
        en: "Every scope starts from business needs, not from a recycled theme or plugin stack.",
        ar: "كل مشروع يبدأ من احتياجات العمل، لا من قالب معاد الاستخدام أو حزمة إضافات جاهزة.",
      },
    },
    {
      title: {
        en: "Clear commercial guidance",
        ar: "توجيه تجاري واضح",
      },
      body: {
        en: "Pricing, scope, and next steps stay explicit so buyers always know what happens next.",
        ar: "يبقى التسعير والنطاق والخطوة التالية واضحة حتى يعرف العميل دائمًا ما الذي سيحدث بعد ذلك.",
      },
    },
  ],
  founderEyebrow: {
    en: "Founder",
    ar: "المؤسس",
  },
  founderName: {
    en: "Ali Abdelhadi",
    ar: "علي عبد الهادي",
  },
  founderRole: {
    en: "Founder & Lead Engineer",
    ar: "المؤسس والمهندس الرئيسي",
  },
  founderBody: {
    en: "The goal is not to look premium. It is to build work with enough quality, clarity, and positioning that the surface can be copied, but the standard behind it cannot.",
    ar: "الهدف ليس أن يبدو العمل فاخرًا فقط، بل أن يُبنى بجودة ووضوح وتموضع يجعل من السهل تقليد السطح، لكن من الصعب تقليد المعيار الذي يقف خلفه.",
  },
  founderLinkLabel: {
    en: "View LinkedIn",
    ar: "عرض LinkedIn",
  },
  founderLinkHref: "https://www.linkedin.com/in/ali-abdelhadi-65094b283/",
};

export const ESTIMATOR_TEASER = {
  eyebrow: {
    en: "Estimator",
    ar: "المقدّر",
  },
  title: {
    en: "Get a serious project range before the first call.",
    ar: "احصل على نطاق جاد لمشروعك قبل أول مكالمة.",
  },
  body: {
    en: "The estimator gives teams a realistic baseline for custom websites, portals, and technical scopes before anyone has to jump onto a sales call.",
    ar: "يعطيك المقدّر خط أساس واقعيًا لمشاريع المواقع والبوابات والنطاقات التقنية المخصصة قبل أن يضطر أي طرف إلى الدخول في مكالمة مبيعات.",
  },
  checklist: [
    {
      en: "3-minute qualification flow",
      ar: "تأهيل خلال 3 دقائق",
    },
    {
      en: "Range shaped by real custom scope",
      ar: "نطاق مبني على أعمال مخصصة حقيقية",
    },
    {
      en: "Dedicated next step after results",
      ar: "خطوة تالية واضحة بعد النتيجة",
    },
  ],
};

export const FINAL_CTA_CONTENT = {
  eyebrow: {
    en: "Technical next step",
    ar: "الخطوة التقنية التالية",
  },
  title: {
    en: "If the scope is serious, the next move is a technical call.",
    ar: "إذا كان النطاق جادًا، فالخطوة التالية هي مكالمة تقنية.",
  },
  body: {
    en: "Use the call to pressure-test the scope, clarify technical risk, and decide the right build path before committing budget.",
    ar: "استخدم المكالمة لاختبار النطاق وتوضيح المخاطر التقنية وتحديد مسار البناء الصحيح قبل اعتماد الميزانية.",
  },
  footnote: {
    en: "Direct founder conversation. No sales script.",
    ar: "محادثة مباشرة مع المؤسس. دون نص مبيعات.",
  },
};

export const SERVICES_PAGE_CONTENT = {
  eyebrow: {
    en: "Ways to Work With Us",
    ar: "طرق العمل معنا",
  },
  title: {
    en: "Choose the commercial path that fits the system you need.",
    ar: "اختر المسار التجاري المناسب للنظام الذي تحتاجه.",
  },
  body: {
    en: "Start from the buyer outcome first. Then use the detail pages when you need to inspect the capability layer behind the delivery.",
    ar: "ابدأ من النتيجة التجارية التي تريد شراءها، ثم ارجع لصفحات التفاصيل عندما تحتاج رؤية طبقة القدرات التي تقف خلف التنفيذ.",
  },
  detailLabel: {
    en: "Capability detail",
    ar: "تفاصيل القدرات",
  },
};

export const PRICING_COMMERCIAL = {
  essential: {
    buyerLabel: {
      en: "Business Website",
      ar: "موقع أعمال",
    },
    internalLabel: {
      en: "Static System",
      ar: "نظام ثابت",
    },
    ctaKey: "pricingEssential" as const,
  },
  professional: {
    buyerLabel: {
      en: "Integrated Website",
      ar: "موقع متكامل",
    },
    internalLabel: {
      en: "Connected System",
      ar: "نظام متصل",
    },
    ctaKey: "pricingProfessional" as const,
  },
  flagship: {
    buyerLabel: {
      en: "Custom Product / Portal",
      ar: "منتج أو بوابة مخصصة",
    },
    internalLabel: {
      en: "Full Infrastructure",
      ar: "بنية تحتية كاملة",
    },
    ctaKey: "pricingFlagship" as const,
  },
};
