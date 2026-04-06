export type LocalizedText = {
  en: string;
  ar: string;
};

export type SiteAction = {
  href: string;
  label: LocalizedText;
  variant?: "primary" | "secondary" | "ghost";
};

export function resolveText(locale: string, text: LocalizedText) {
  return locale.startsWith("ar") ? text.ar : text.en;
}

export const siteActions = {
  estimator: {
    href: "/estimator",
    label: {
      en: "Get your project range",
      ar: "احصل على نطاق مشروعك",
    },
    variant: "primary" as const,
  },
  schedule: {
    href: "/schedule",
    label: {
      en: "Book a technical call",
      ar: "احجز مكالمة تقنية",
    },
    variant: "primary" as const,
  },
  work: {
    href: "/work",
    label: {
      en: "See selected work",
      ar: "شاهد الأعمال المختارة",
    },
    variant: "secondary" as const,
  },
  services: {
    href: "/services",
    label: {
      en: "Review service paths",
      ar: "راجع مسارات الخدمة",
    },
    variant: "secondary" as const,
  },
  pricing: {
    href: "/pricing",
    label: {
      en: "Review pricing",
      ar: "راجع الأسعار",
    },
    variant: "secondary" as const,
  },
  contact: {
    href: "/contact",
    label: {
      en: "Start the conversation",
      ar: "ابدأ المحادثة",
    },
    variant: "secondary" as const,
  },
} satisfies Record<string, SiteAction>;

export const navLinks = [
  {
    href: "/services",
    label: {
      en: "Services",
      ar: "الخدمات",
    },
  },
  {
    href: "/work",
    label: {
      en: "Work",
      ar: "الأعمال",
    },
  },
  {
    href: "/pricing",
    label: {
      en: "Pricing",
      ar: "الأسعار",
    },
  },
  {
    href: "/process",
    label: {
      en: "Process",
      ar: "آلية العمل",
    },
  },
  {
    href: "/writing",
    label: {
      en: "Writing",
      ar: "المقالات",
    },
  },
] as const;

export const footerContent = {
  tagline: {
    en: "Custom websites, portals, and product systems engineered for teams that need clarity, speed, and bilingual precision.",
    ar: "مواقع وبوابات وأنظمة رقمية مخصصة تُهندس للفرق التي تحتاج وضوحًا وسرعة ودقة ثنائية اللغة.",
  },
  groups: [
    {
      title: {
        en: "Company",
        ar: "الشركة",
      },
      links: [
        { href: "/services", label: { en: "Services", ar: "الخدمات" } },
        { href: "/work", label: { en: "Work", ar: "الأعمال" } },
        { href: "/approach", label: { en: "Approach", ar: "المنهج" } },
        { href: "/process", label: { en: "Process", ar: "آلية العمل" } },
      ],
    },
    {
      title: {
        en: "Explore",
        ar: "استكشف",
      },
      links: [
        { href: "/pricing", label: { en: "Pricing", ar: "الأسعار" } },
        { href: "/estimator", label: { en: "Estimator", ar: "المقدّر" } },
        { href: "/writing", label: { en: "Writing", ar: "المقالات" } },
        { href: "/contact", label: { en: "Contact", ar: "التواصل" } },
      ],
    },
    {
      title: {
        en: "Legal",
        ar: "قانوني",
      },
      links: [
        { href: "/privacy", label: { en: "Privacy", ar: "الخصوصية" } },
        { href: "/terms", label: { en: "Terms", ar: "الشروط" } },
      ],
    },
  ],
  contactLabel: {
    en: "Contact",
    ar: "التواصل",
  },
  contactValue: {
    en: "altruvex@gmail.com",
    ar: "altruvex@gmail.com",
  },
  locationLabel: {
    en: "Base",
    ar: "المقر",
  },
  locationValue: {
    en: "Cairo, Egypt",
    ar: "القاهرة، مصر",
  },
};

export const homePageContent = {
  hero: {
    eyebrow: {
      en: "Custom Web Systems",
      ar: "أنظمة ويب مخصصة",
    },
    title: {
      en: "Build the site buyers trust. Then build the system your team can scale.",
      ar: "ابنِ الموقع الذي يثق به المشترون. ثم ابنِ النظام الذي يمكن لفريقك التوسع به.",
    },
    description: {
      en: "Altruvex designs and engineers bilingual websites, portals, and revenue-critical product experiences for teams that have outgrown template work.",
      ar: "تصمم Altruvex وتبني مواقع ثنائية اللغة وبوابات وتجارب رقمية مؤثرة على الإيراد للفرق التي تجاوزت حلول القوالب الجاهزة.",
    },
    proof: [
      {
        value: {
          en: "Arabic + English",
          ar: "العربية + الإنجليزية",
        },
        label: {
          en: "Engineered from day one",
          ar: "مُهندسة من اليوم الأول",
        },
      },
      {
        value: {
          en: "Founder-led",
          ar: "يقودها المؤسس",
        },
        label: {
          en: "Strategy, design, and build in one line of ownership",
          ar: "الاستراتيجية والتصميم والبناء ضمن خط ملكية واحد",
        },
      },
      {
        value: {
          en: "Handoff-ready",
          ar: "جاهزة للتسليم",
        },
        label: {
          en: "Clear scope, documentation, and clean codebase",
          ar: "نطاق واضح ووثائق وقاعدة كود نظيفة",
        },
      },
    ],
  },
  blockers: {
    eyebrow: {
      en: "What We Fix",
      ar: "ما الذي نعالجه",
    },
    title: {
      en: "Most websites lose trust before the sales conversation begins.",
      ar: "معظم المواقع تخسر الثقة قبل أن تبدأ المحادثة البيعية.",
    },
    description: {
      en: "The common failure is not visual polish. It is weak positioning, slow delivery, and a structure that makes buyers work too hard to understand the value.",
      ar: "الفشل الشائع ليس في الجماليات، بل في التموضع الضعيف والبطء والبنية التي تجعل العميل يبذل جهدًا لفهم القيمة.",
    },
    items: [
      {
        title: {
          en: "Unclear hierarchy",
          ar: "تسلسل هرمي غير واضح",
        },
        description: {
          en: "Visitors should know what you do, who it is for, and what to do next within seconds.",
          ar: "يجب أن يعرف الزائر ما الذي تقدمه ولمن والخطوة التالية خلال ثوانٍ.",
        },
      },
      {
        title: {
          en: "Template behavior",
          ar: "سلوك القوالب الجاهزة",
        },
        description: {
          en: "If every block looks borrowed, buyers assume the thinking behind the offer is borrowed too.",
          ar: "إذا بدا كل جزء مستعارًا، سيفترض العميل أن التفكير خلف العرض مستعار أيضًا.",
        },
      },
      {
        title: {
          en: "Weak conversion flow",
          ar: "تدفق تحويل ضعيف",
        },
        description: {
          en: "Too many actions, vague calls to action, and no commercial progression create hesitation instead of momentum.",
          ar: "كثرة الإجراءات وغموض الدعوات ونقص التدرج التجاري يخلق ترددًا بدل الزخم.",
        },
      },
    ],
  },
  services: {
    eyebrow: {
      en: "Service Paths",
      ar: "مسارات الخدمة",
    },
    title: {
      en: "Choose the engagement that matches the business problem.",
      ar: "اختر نوع التعاون الذي يطابق مشكلة العمل.",
    },
    description: {
      en: "Each path is built around a single outcome, a clear scope, and a direct next step.",
      ar: "كل مسار مبني حول نتيجة واحدة ونطاق واضح وخطوة تالية مباشرة.",
    },
    items: [
      {
        href: "/services/interface-design",
        title: {
          en: "Website Systems",
          ar: "أنظمة المواقع",
        },
        description: {
          en: "Sharper positioning, faster pages, and a cleaner conversion path for serious service or product businesses.",
          ar: "تموضع أوضح وصفحات أسرع ومسار تحويل أنظف للشركات الجادة.",
        },
        cta: {
          en: "See website systems",
          ar: "شاهد أنظمة المواقع",
        },
      },
      {
        href: "/services/development",
        title: {
          en: "Portals & Product Builds",
          ar: "البوابات وبناء المنتجات",
        },
        description: {
          en: "Dashboards, workflows, portals, and custom logic built around how the business actually operates.",
          ar: "لوحات تحكم وسير عمل وبوابات ومنطق مخصص مبني على طريقة تشغيل العمل فعليًا.",
        },
        cta: {
          en: "See product builds",
          ar: "شاهد مشاريع المنتجات",
        },
      },
      {
        href: "/services/consulting",
        title: {
          en: "Technical Audits",
          ar: "التدقيقات التقنية",
        },
        description: {
          en: "A fixed-scope decision layer for teams facing a rebuild, a slow platform, or unclear technical direction.",
          ar: "طبقة قرار محددة النطاق للفرق التي تواجه إعادة بناء أو منصة بطيئة أو اتجاهًا تقنيًا غير واضح.",
        },
        cta: {
          en: "See audit scope",
          ar: "شاهد نطاق التدقيق",
        },
      },
      {
        href: "/services/maintenance",
        title: {
          en: "Ongoing Support",
          ar: "الدعم المستمر",
        },
        description: {
          en: "Structured maintenance for live systems that need releases, monitoring, and a dependable technical partner.",
          ar: "صيانة منظمة للأنظمة الحية التي تحتاج إصدارات ومراقبة وشريكًا تقنيًا موثوقًا.",
        },
        cta: {
          en: "See support plans",
          ar: "شاهد خطط الدعم",
        },
      },
    ],
  },
};

export const homeDeliveryContent = {
  eyebrow: {
    en: "Delivery Model",
    ar: "نموذج التسليم",
  },
  title: {
    en: "Clear decisions. Clear phases. No vague middle.",
    ar: "قرارات واضحة. مراحل واضحة. بلا منطقة رمادية.",
  },
  description: {
    en: "Every project moves through diagnosis, definition, build, and launch with one owner responsible for the outcome.",
    ar: "كل مشروع يمر عبر التشخيص والتحديد والبناء والإطلاق مع مالك واحد مسؤول عن النتيجة.",
  },
  phases: [
    {
      title: {
        en: "Diagnose",
        ar: "شخّص",
      },
      description: {
        en: "Audit the offer, audience, technical constraints, and current friction.",
        ar: "تدقيق العرض والجمهور والقيود التقنية والاحتكاك الحالي.",
      },
    },
    {
      title: {
        en: "Define",
        ar: "حدّد",
      },
      description: {
        en: "Lock hierarchy, flows, scope boundaries, and delivery logic before execution.",
        ar: "ثبّت التسلسل والرحلات وحدود النطاق ومنطق التسليم قبل التنفيذ.",
      },
    },
    {
      title: {
        en: "Build",
        ar: "ابنِ",
      },
      description: {
        en: "Implement the system with bilingual precision, performance discipline, and clean handoff standards.",
        ar: "نفّذ النظام بدقة ثنائية اللغة وانضباط في الأداء ومعايير تسليم نظيفة.",
      },
    },
    {
      title: {
        en: "Launch",
        ar: "أطلق",
      },
      description: {
        en: "Ship with documentation, ownership clarity, and the next operating step already defined.",
        ar: "أطلق مع وثائق ووضوح في الملكية وخطوة التشغيل التالية محددة مسبقًا.",
      },
    },
  ],
};

export const homePricingContent = {
  eyebrow: {
    en: "Investment Logic",
    ar: "منطق الاستثمار",
  },
  title: {
    en: "Pricing is based on system depth, not inflated page counts.",
    ar: "التسعير مبني على عمق النظام، لا على عدد صفحات مضخم.",
  },
  description: {
    en: "The tiers below help buyers self-qualify quickly before opening the full estimator.",
    ar: "الشرائح التالية تساعد العميل على التأهل ذاتيًا بسرعة قبل فتح المقدّر الكامل.",
  },
  tiers: [
    {
      title: {
        en: "Focused Website",
        ar: "موقع مركز",
      },
      range: {
        en: "75,000 – 160,000 EGP",
        ar: "75,000 – 160,000 جنيه",
      },
      description: {
        en: "Custom marketing site with strong messaging, strong performance, and no template debt.",
        ar: "موقع تسويقي مخصص برسائل قوية وأداء قوي ودون ديون قوالب.",
      },
    },
    {
      title: {
        en: "Connected Platform",
        ar: "منصة متصلة",
      },
      range: {
        en: "160,000 – 320,000 EGP",
        ar: "160,000 – 320,000 جنيه",
      },
      description: {
        en: "Integrated website or light product flow with content operations, bilingual UX, and one or two key integrations.",
        ar: "موقع أو منصة خفيفة متصلة مع تشغيل محتوى وتجربة ثنائية اللغة وتكامل رئيسي أو اثنين.",
      },
    },
    {
      title: {
        en: "Operational Product",
        ar: "منتج تشغيلي",
      },
      range: {
        en: "320,000 EGP+",
        ar: "320,000 جنيه فأكثر",
      },
      description: {
        en: "Portal, dashboard, internal workflow, or product system with real architectural complexity.",
        ar: "بوابة أو لوحة تحكم أو نظام تشغيلي أو منتج بعمق معماري حقيقي.",
      },
    },
  ],
};

export const homeFinalCtaContent = {
  eyebrow: {
    en: "Next Step",
    ar: "الخطوة التالية",
  },
  title: {
    en: "If the scope matters, start with the right conversation.",
    ar: "إذا كان النطاق مهمًا، فابدأ بالمحادثة الصحيحة.",
  },
  description: {
    en: "Use the estimator to frame the budget, or book a technical call when you want to pressure-test the architecture directly.",
    ar: "استخدم المقدّر لتحديد الميزانية، أو احجز مكالمة تقنية عندما تريد اختبار المعمارية مباشرة.",
  },
  note: {
    en: "No sales script. No recycled proposal. Just the next decision made clearly.",
    ar: "لا نص مبيعات. لا عرض معاد تدويره. فقط القرار التالي بوضوح.",
  },
};

export const servicesPageContent = {
  hero: {
    eyebrow: {
      en: "Services",
      ar: "الخدمات",
    },
    title: {
      en: "Four focused paths. One delivery standard.",
      ar: "أربعة مسارات مركزة. معيار تسليم واحد.",
    },
    description: {
      en: "Each service is designed around a single buyer outcome so the page, scope, and CTA all point in the same direction.",
      ar: "كل خدمة مصممة حول نتيجة واحدة للعميل حتى تشير الصفحة والنطاق والدعوة في الاتجاه نفسه.",
    },
  },
  comparison: {
    eyebrow: {
      en: "How To Choose",
      ar: "كيف تختار",
    },
    title: {
      en: "Start from the problem you need solved, not the deliverable name.",
      ar: "ابدأ من المشكلة التي تريد حلها، لا من اسم التسليم.",
    },
    items: [
      {
        title: {
          en: "Need a stronger market-facing presence?",
          ar: "تحتاج حضورًا أقوى أمام السوق؟",
        },
        description: {
          en: "Choose Website Systems.",
          ar: "اختر أنظمة المواقع.",
        },
      },
      {
        title: {
          en: "Need custom workflows or product logic?",
          ar: "تحتاج سير عمل أو منطق منتج مخصص؟",
        },
        description: {
          en: "Choose Portals & Product Builds.",
          ar: "اختر البوابات وبناء المنتجات.",
        },
      },
      {
        title: {
          en: "Need clarity before a risky decision?",
          ar: "تحتاج وضوحًا قبل قرار عالي المخاطر؟",
        },
        description: {
          en: "Choose Technical Audits.",
          ar: "اختر التدقيقات التقنية.",
        },
      },
      {
        title: {
          en: "Need reliable execution after launch?",
          ar: "تحتاج تنفيذًا موثوقًا بعد الإطلاق؟",
        },
        description: {
          en: "Choose Ongoing Support.",
          ar: "اختر الدعم المستمر.",
        },
      },
    ],
  },
};

export const serviceDetailContent = {
  "interface-design": {
    hero: {
      eyebrow: {
        en: "Website Systems",
        ar: "أنظمة المواقع",
      },
      title: {
        en: "Design a website people understand in eight seconds.",
        ar: "صمّم موقعًا يفهمه الناس خلال ثماني ثوانٍ.",
      },
      description: {
        en: "We translate your offer into a sharper hierarchy, clearer message, and cleaner conversion flow so the site starts selling before your team gets on the call.",
        ar: "نحوّل عرضك إلى تسلسل أوضح ورسالة أنقى وتدفق تحويل أنظف حتى يبدأ الموقع بالبيع قبل أن يدخل فريقك المكالمة.",
      },
    },
    sections: {
      deliverablesTitle: {
        en: "What this service includes",
        ar: "ما الذي تتضمنه هذه الخدمة",
      },
      deliverables: [
        {
          en: "Offer positioning and page hierarchy",
          ar: "تموضع العرض والتسلسل الهرمي للصفحات",
        },
        {
          en: "Responsive interface system for desktop and mobile",
          ar: "نظام واجهات متجاوب للجوال وسطح المكتب",
        },
        {
          en: "Arabic and English page logic with true directional parity",
          ar: "منطق صفحات عربي وإنجليزي مع تكافؤ حقيقي بين الاتجاهين",
        },
        {
          en: "Conversion-led layouts, CTA placement, and proof structure",
          ar: "تخطيطات موجهة للتحويل وتوزيع دقيق للدعوات وهيكل مقنع للإثبات",
        },
      ],
      fitTitle: {
        en: "Best fit",
        ar: "مناسب عندما",
      },
      fitItems: [
        {
          en: "The current site looks acceptable but fails to convert.",
          ar: "يبدو الموقع الحالي مقبولًا لكنه لا يحقق التحويل.",
        },
        {
          en: "Your offer is strong but the message and hierarchy are weak.",
          ar: "عرضك قوي لكن الرسالة أو التسلسل الهرمي ضعيفان.",
        },
        {
          en: "You need a custom website, not a template with brand paint.",
          ar: "تحتاج موقعًا مخصصًا لا قالبًا بطلاء بصري فقط.",
        },
      ],
    },
  },
  development: {
    hero: {
      eyebrow: {
        en: "Portals & Product Builds",
        ar: "البوابات وبناء المنتجات",
      },
      title: {
        en: "Build the system behind the business, not just the front-end shell.",
        ar: "ابنِ النظام خلف العمل، لا القشرة الأمامية فقط.",
      },
      description: {
        en: "We design and engineer dashboards, portals, and custom workflows around real operations, permissions, data movement, and long-term maintainability.",
        ar: "نصمم ونبني لوحات تحكم وبوابات وسير عمل مخصصة حول العمليات الفعلية والصلاحيات وحركة البيانات وقابلية الصيانة الطويلة.",
      },
    },
    sections: {
      deliverablesTitle: {
        en: "What this service includes",
        ar: "ما الذي تتضمنه هذه الخدمة",
      },
      deliverables: [
        {
          en: "System architecture and technical scoping",
          ar: "معمارية النظام وتحديد النطاق التقني",
        },
        {
          en: "Bespoke admin, user, or partner experiences",
          ar: "تجارب مخصصة للإدارة أو المستخدمين أو الشركاء",
        },
        {
          en: "Role logic, workflow states, and key integrations",
          ar: "منطق الصلاحيات وحالات سير العمل والتكاملات الأساسية",
        },
        {
          en: "Deployment, QA, and handoff-ready codebase",
          ar: "النشر وضمان الجودة وقاعدة كود جاهزة للتسليم",
        },
      ],
      fitTitle: {
        en: "Best fit",
        ar: "مناسب عندما",
      },
      fitItems: [
        {
          en: "Manual operations are creating bottlenecks.",
          ar: "العمليات اليدوية تصنع اختناقات.",
        },
        {
          en: "You need dashboards, approvals, portals, or workflow control.",
          ar: "تحتاج لوحات تحكم أو موافقات أو بوابات أو تحكمًا في سير العمل.",
        },
        {
          en: "The business logic is too specific for off-the-shelf tools.",
          ar: "منطق العمل خاص جدًا بحيث لا يناسب الأدوات الجاهزة.",
        },
      ],
    },
  },
  consulting: {
    hero: {
      eyebrow: {
        en: "Technical Audits",
        ar: "التدقيقات التقنية",
      },
      title: {
        en: "Make the risky decision with better evidence.",
        ar: "اتخذ القرار عالي المخاطر بأدلة أفضل.",
      },
      description: {
        en: "When the team is unsure whether to rebuild, refactor, or keep investing in the current stack, the audit gives a sharper decision layer before budget is committed.",
        ar: "عندما لا يعرف الفريق هل يعيد البناء أم يحسن الموجود أم يواصل الاستثمار في المنصة الحالية، يمنح التدقيق طبقة قرار أوضح قبل التزام الميزانية.",
      },
    },
    sections: {
      deliverablesTitle: {
        en: "What this service includes",
        ar: "ما الذي تتضمنه هذه الخدمة",
      },
      deliverables: [
        {
          en: "Current-state technical diagnosis",
          ar: "تشخيص تقني للحالة الحالية",
        },
        {
          en: "Prioritized findings and commercial risk framing",
          ar: "نتائج مرتبة بالأولوية مع تأطير للمخاطر التجارية",
        },
        {
          en: "Recommended path: keep, refactor, or rebuild",
          ar: "المسار الموصى به: الاستمرار أو التحسين أو إعادة البناء",
        },
        {
          en: "Execution roadmap for the next step",
          ar: "خارطة طريق تنفيذية للخطوة التالية",
        },
      ],
      fitTitle: {
        en: "Best fit",
        ar: "مناسب عندما",
      },
      fitItems: [
        {
          en: "The current site is slow, fragile, or commercially unclear.",
          ar: "الموقع الحالي بطيء أو هش أو غير واضح تجاريًا.",
        },
        {
          en: "A rebuild is being discussed but the true cost is unclear.",
          ar: "تُناقش إعادة البناء لكن التكلفة الحقيقية غير واضحة.",
        },
        {
          en: "Leadership needs a technical decision with commercial context.",
          ar: "تحتاج الإدارة قرارًا تقنيًا ضمن سياق تجاري.",
        },
      ],
    },
  },
  maintenance: {
    hero: {
      eyebrow: {
        en: "Ongoing Support",
        ar: "الدعم المستمر",
      },
      title: {
        en: "Keep the system stable after launch.",
        ar: "حافظ على استقرار النظام بعد الإطلاق.",
      },
      description: {
        en: "Maintenance is not a rescue hotline. It is a structured support layer for updates, releases, fixes, monitoring, and technical continuity.",
        ar: "الصيانة ليست خط طوارئ، بل طبقة دعم منظمة للتحديثات والإصدارات والإصلاحات والمراقبة والاستمرارية التقنية.",
      },
    },
    sections: {
      deliverablesTitle: {
        en: "What this service includes",
        ar: "ما الذي تتضمنه هذه الخدمة",
      },
      deliverables: [
        {
          en: "Scheduled updates and release support",
          ar: "تحديثات مجدولة ودعم للإصدارات",
        },
        {
          en: "Bug triage and production fixes",
          ar: "فرز الأعطال وإصلاحات الإنتاج",
        },
        {
          en: "Monitoring, reporting, and technical continuity",
          ar: "مراقبة وتقارير واستمرارية تقنية",
        },
        {
          en: "A retained partner who already knows the system",
          ar: "شريك مستمر يعرف النظام مسبقًا",
        },
      ],
      fitTitle: {
        en: "Best fit",
        ar: "مناسب عندما",
      },
      fitItems: [
        {
          en: "The site or platform is already live and business-critical.",
          ar: "الموقع أو المنصة يعملان بالفعل ويؤثران على العمل مباشرة.",
        },
        {
          en: "Your team needs dependable execution without re-explaining the stack every month.",
          ar: "يحتاج فريقك إلى تنفيذ موثوق دون شرح النظام من جديد كل شهر.",
        },
        {
          en: "You want planned improvements instead of reactive firefighting.",
          ar: "تريد تحسينات مخططة بدل إطفاء الحرائق بشكل مستمر.",
        },
      ],
    },
  },
} as const;

export const pricingPageContent = {
  hero: {
    eyebrow: {
      en: "Pricing",
      ar: "الأسعار",
    },
    title: {
      en: "Scoped to the system you need, not padded with vanity line items.",
      ar: "محدد حسب النظام الذي تحتاجه، لا بنود شكلية مضخمة.",
    },
    description: {
      en: "These ranges help serious buyers frame the likely investment before opening the estimator or booking a technical call.",
      ar: "تساعد هذه النطاقات العملاء الجادين على فهم الاستثمار المتوقع قبل فتح المقدّر أو حجز مكالمة تقنية.",
    },
  },
  notes: [
    {
      title: {
        en: "What drives price",
        ar: "ما الذي يحدد السعر",
      },
      description: {
        en: "Architecture, workflows, integrations, bilingual complexity, and the quality bar required to ship cleanly.",
        ar: "المعمارية وسير العمل والتكاملات وتعقيد الثنائية اللغوية ومستوى الجودة المطلوب للإطلاق بشكل نظيف.",
      },
    },
    {
      title: {
        en: "What does not drive price",
        ar: "ما الذي لا يحدد السعر",
      },
      description: {
        en: "Artificial page counts, decorative add-ons, or a bloated scope built to justify a bigger number.",
        ar: "عدد صفحات مصطنع أو إضافات شكلية أو نطاق متضخم فقط لتبرير رقم أكبر.",
      },
    },
    {
      title: {
        en: "What to do next",
        ar: "الخطوة التالية",
      },
      description: {
        en: "Use the estimator for a sharper range. Book a call when the architecture needs to be pressure-tested live.",
        ar: "استخدم المقدّر لنطاق أدق. احجز مكالمة عندما تحتاج المعمارية إلى اختبار مباشر.",
      },
    },
  ],
};

export const approachPageContent = {
  hero: {
    eyebrow: {
      en: "Approach",
      ar: "المنهج",
    },
    title: {
      en: "We do not design pages first. We design decisions first.",
      ar: "نحن لا نصمم الصفحات أولًا. نحن نصمم القرارات أولًا.",
    },
    description: {
      en: "The interface, architecture, copy, and CTA strategy all come from the same question: what does the buyer need to understand and do next?",
      ar: "الواجهة والمعمارية والنسخ واستراتيجية الدعوات تنطلق كلها من سؤال واحد: ماذا يحتاج العميل أن يفهم وأن يفعل بعد ذلك؟",
    },
  },
  principles: [
    {
      title: {
        en: "Business clarity before visual polish",
        ar: "وضوح العمل قبل التجميل البصري",
      },
      description: {
        en: "If the offer is unclear, more animation only hides the problem.",
        ar: "إذا كان العرض غير واضح، فالمزيد من الحركة لا يفعل سوى إخفاء المشكلة.",
      },
    },
    {
      title: {
        en: "Structure before decoration",
        ar: "الهيكل قبل الزخرفة",
      },
      description: {
        en: "A high-converting page is built from hierarchy, rhythm, and intent, not from surface effects.",
        ar: "الصفحة عالية التحويل تُبنى من التسلسل والإيقاع والنية، لا من المؤثرات السطحية.",
      },
    },
    {
      title: {
        en: "Constraints create trust",
        ar: "الحدود تصنع الثقة",
      },
      description: {
        en: "We say what the system will not do as clearly as what it will do.",
        ar: "نقول ما الذي لن يفعله النظام بوضوح يوازي ما الذي سيفعله.",
      },
    },
    {
      title: {
        en: "Arabic is not a mirrored afterthought",
        ar: "العربية ليست نسخة معكوسة لاحقة",
      },
      description: {
        en: "Direction, reading rhythm, and interface behavior are re-considered for each language.",
        ar: "الاتجاه وإيقاع القراءة وسلوك الواجهة يُعاد التفكير فيها لكل لغة.",
      },
    },
  ],
  boundaries: [
    {
      en: "We do not sell template customization as custom strategy.",
      ar: "لا نبيع تخصيص القوالب على أنه استراتيجية مخصصة.",
    },
    {
      en: "We do not hide weak scope behind vague premium language.",
      ar: "لا نخفي النطاق الضعيف خلف لغة مبهمة تبدو فاخرة.",
    },
    {
      en: "We do not overload pages with competing actions.",
      ar: "لا نحمّل الصفحات بدعوات متنافسة.",
    },
    {
      en: "We do not treat launch as the end of ownership.",
      ar: "لا نتعامل مع الإطلاق على أنه نهاية المسؤولية.",
    },
  ],
};

export const processPageContent = {
  hero: {
    eyebrow: {
      en: "Process",
      ar: "آلية العمل",
    },
    title: {
      en: "A four-phase delivery system that removes ambiguity early.",
      ar: "نظام تسليم من أربع مراحل يزيل الغموض مبكرًا.",
    },
    description: {
      en: "Every phase has one purpose, one output, and one reason it exists. That is how projects move quickly without becoming chaotic.",
      ar: "لكل مرحلة هدف واحد ومخرج واحد وسبب واضح لوجودها. هكذا تتحرك المشاريع بسرعة من دون فوضى.",
    },
  },
  phases: [
    {
      index: "01",
      title: {
        en: "Diagnosis",
        ar: "التشخيص",
      },
      description: {
        en: "We map the business problem, technical constraints, and buyer journey before proposing a solution.",
        ar: "نرسم مشكلة العمل والقيود التقنية ورحلة العميل قبل اقتراح الحل.",
      },
      deliverables: {
        en: "Audit notes, scope direction, risk map",
        ar: "ملاحظات التدقيق واتجاه النطاق وخريطة المخاطر",
      },
    },
    {
      index: "02",
      title: {
        en: "Definition",
        ar: "التحديد",
      },
      description: {
        en: "We define hierarchy, screens, states, integrations, boundaries, and what the build should deliberately exclude.",
        ar: "نحدد التسلسل والشاشات والحالات والتكاملات والحدود وما الذي يجب استبعاده عمدًا من البناء.",
      },
      deliverables: {
        en: "Architecture plan, page logic, delivery scope",
        ar: "خطة معمارية ومنطق الصفحات ونطاق التسليم",
      },
    },
    {
      index: "03",
      title: {
        en: "Execution",
        ar: "التنفيذ",
      },
      description: {
        en: "The system is implemented against the agreed logic, with progress that can be reviewed without guesswork.",
        ar: "يُنفذ النظام وفق المنطق المتفق عليه مع تقدم يمكن مراجعته بلا تخمين.",
      },
      deliverables: {
        en: "Production build, QA, staging review",
        ar: "بناء إنتاجي وضمان جودة ومراجعة على بيئة تجريبية",
      },
    },
    {
      index: "04",
      title: {
        en: "Launch & Handoff",
        ar: "الإطلاق والتسليم",
      },
      description: {
        en: "The final launch includes documentation, access clarity, and the next operating path after go-live.",
        ar: "يشمل الإطلاق النهائي الوثائق ووضوح الصلاحيات ومسار التشغيل التالي بعد الانطلاق.",
      },
      deliverables: {
        en: "Deployment, documentation, ownership handoff",
        ar: "النشر والوثائق وتسليم الملكية",
      },
    },
  ],
};

export const standardsPageContent = {
  hero: {
    eyebrow: {
      en: "Standards",
      ar: "المعايير",
    },
    title: {
      en: "Quality is a delivery requirement, not a bonus round.",
      ar: "الجودة شرط للتسليم، لا مرحلة إضافية.",
    },
    description: {
      en: "The system has to be fast, readable, accessible, and maintainable enough that the next decision after launch is easier, not harder.",
      ar: "يجب أن يكون النظام سريعًا ومقروءًا ومتاحًا وقابلًا للصيانة بحيث تصبح القرارات بعد الإطلاق أسهل لا أصعب.",
    },
  },
  categories: [
    {
      title: {
        en: "Performance",
        ar: "الأداء",
      },
      description: {
        en: "Lean pages, disciplined assets, and interaction decisions that help rather than delay comprehension.",
        ar: "صفحات خفيفة وأصول منضبطة وقرارات تفاعلية تساعد على الفهم بدل أن تؤخره.",
      },
    },
    {
      title: {
        en: "Accessibility",
        ar: "إمكانية الوصول",
      },
      description: {
        en: "Clear contrast, keyboard support, readable forms, and obvious focus states across the journey.",
        ar: "تباين واضح ودعم كامل للوحة المفاتيح ونماذج مقروءة وحالات تركيز واضحة عبر الرحلة.",
      },
    },
    {
      title: {
        en: "Bilingual execution",
        ar: "التنفيذ الثنائي اللغة",
      },
      description: {
        en: "Arabic and English are reviewed as separate user experiences, not a direct mirror of one another.",
        ar: "تُراجع العربية والإنجليزية كتجربتين منفصلتين، لا كمرآة مباشرة إحداهما للأخرى.",
      },
    },
    {
      title: {
        en: "Maintainability",
        ar: "القابلية للصيانة",
      },
      description: {
        en: "The codebase, content model, and component logic should support change without creating fragility.",
        ar: "يجب أن تدعم قاعدة الكود ونموذج المحتوى ومنطق المكونات التغيير دون خلق هشاشة.",
      },
    },
  ],
};

export const contactPageContent = {
  hero: {
    eyebrow: {
      en: "Contact",
      ar: "التواصل",
    },
    title: {
      en: "Bring the real problem, not the polished brief.",
      ar: "احضر المشكلة الحقيقية، لا الملخص المصقول فقط.",
    },
    description: {
      en: "A good first conversation is enough to understand the real blocker, the likely scope, and whether the project deserves a deeper technical step.",
      ar: "تكفي محادثة أولى جيدة لفهم العائق الحقيقي والنطاق المتوقع وما إذا كان المشروع يستحق خطوة تقنية أعمق.",
    },
    sideNotes: [
      {
        title: {
          en: "Best for",
          ar: "الأفضل لـ",
        },
        description: {
          en: "Early-stage conversations, technical questions, and scope clarification before scheduling a full working call.",
          ar: "المحادثات الأولية والأسئلة التقنية وتوضيح النطاق قبل حجز مكالمة عمل كاملة.",
        },
      },
      {
        title: {
          en: "Response",
          ar: "الرد",
        },
        description: {
          en: "Usually within 24 hours.",
          ar: "عادة خلال 24 ساعة.",
        },
      },
    ],
  },
};

export const schedulePageContent = {
  hero: {
    eyebrow: {
      en: "Technical Call",
      ar: "المكالمة التقنية",
    },
    title: {
      en: "Use the call to pressure-test the scope live.",
      ar: "استخدم المكالمة لاختبار النطاق مباشرة.",
    },
    description: {
      en: "This is the right step when the project is real, the stakes are meaningful, and you need a clearer technical path before moving.",
      ar: "هذه هي الخطوة الصحيحة عندما يكون المشروع حقيقيًا والرهان مهمًا وتحتاج مسارًا تقنيًا أوضح قبل التحرك.",
    },
    expectations: [
      {
        en: "30 minutes, direct and practical",
        ar: "30 دقيقة، مباشرة وعملية",
      },
      {
        en: "Focused on risk, architecture, and next step",
        ar: "تركز على المخاطر والمعمارية والخطوة التالية",
      },
      {
        en: "No sales deck, no generic discovery script",
        ar: "لا عرض مبيعات ولا نص اكتشاف عام",
      },
    ],
  },
};

export const writingPageContent = {
  hero: {
    eyebrow: {
      en: "Writing",
      ar: "المقالات",
    },
    title: {
      en: "Practical thinking for buyers making technical decisions.",
      ar: "تفكير عملي للعملاء الذين يتخذون قرارات تقنية.",
    },
    description: {
      en: "Short, direct pieces on architecture, delivery risk, multilingual UX, and how to buy custom digital work without getting trapped by surface-level signals.",
      ar: "مقالات قصيرة ومباشرة عن المعمارية ومخاطر التسليم وتجربة المستخدم متعددة اللغات وكيفية شراء العمل الرقمي المخصص دون الوقوع في إشارات سطحية.",
    },
  },
};
