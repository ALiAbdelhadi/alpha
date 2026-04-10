const fs = require('fs');
const path = require('path');

const arPath = path.join(__dirname, '../messages/ar.json');
const enPath = path.join(__dirname, '../messages/en.json');

const ar = JSON.parse(fs.readFileSync(arPath, 'utf-8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

if (!en.estimator.pdfContent) en.estimator.pdfContent = {};
if (!ar.estimator.pdfContent) ar.estimator.pdfContent = {};

en.estimator.pdfContent.projectLabels = {
    "ecommerce": "E-Commerce Platform",
    "corporate": "Corporate Website",
    "custom": "Custom Web Application",
    "performance": "Performance Audit & Optimization"
};

en.estimator.pdfContent.tierLabels = {
    "small": "Essential",
    "medium": "Professional",
    "large": "Premium",
    "enterprise": "Enterprise"
};

en.estimator.pdfContent.timelineLabels = {
    "urgent": "Urgent - Sprint delivery",
    "soon": "Standard - 1–3 months",
    "flexible": "Extended - 3+ months",
    "standard": "Standard - balanced pace"
};

ar.estimator.pdfContent.projectLabels = {
    "ecommerce": "منصة تجارة إلكترونية",
    "corporate": "موقع شركة",
    "custom": "تطبيق ويب مخصص",
    "performance": "تدقيق الأداء وتحسينه"
};

ar.estimator.pdfContent.tierLabels = {
    "small": "أساسي",
    "medium": "احترافي",
    "large": "ممتاز",
    "enterprise": "للمؤسسات"
};

ar.estimator.pdfContent.timelineLabels = {
    "urgent": "عاجل - تسليم سريع",
    "soon": "قياسي - ١–٣ أشهر",
    "flexible": "ممتد - ٣ أشهر أو أكثر",
    "standard": "قياسي - وتيرة متوازنة"
};

const deliverablesEn = {
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
      "1 month post-launch support"
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
      "3 months post-launch support"
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
      "6 months post-launch support + monitoring"
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
      "12 months dedicated engineering support"
    ]
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
      "1 month post-launch support"
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
      "3 months post-launch support"
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
      "6 months post-launch support + performance monitoring"
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
      "12 months dedicated engineering support"
    ]
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
      "1 month post-launch support"
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
      "3 months post-launch support"
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
      "6 months post-launch support + monitoring"
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
      "12 months dedicated engineering retainer"
    ]
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
      "1 follow-up Q&A session (45 min)"
    ],
    medium: [
      "Everything in Essential +",
      "Code splitting & lazy loading implementation",
      "Server-side rendering / ISR review & setup",
      "CDN configuration & edge caching strategy",
      "Third-party script audit & defer strategy",
      "Database query analysis report",
      "2 follow-up sessions + 30-day email support"
    ],
    large: [
      "Everything in Professional +",
      "Full performance implementation (not just audit)",
      "Load testing up to 10,000 concurrent users",
      "Server & infrastructure optimization",
      "Custom real-time monitoring dashboard",
      "3 months active performance monitoring",
      "Monthly performance report delivery"
    ],
    enterprise: [
      "Everything in Premium +",
      "Dedicated performance engineer (part-time retainer)",
      "Continuous optimization cycles (bi-weekly sprints)",
      "SLA performance guarantees (LCP / TTI targets)",
      "Full stack - frontend, backend, infrastructure",
      "6 months monitoring & optimization retainer"
    ]
  }
};

const deliverablesAr = {
  ecommerce: {
    small: [
      "كتالوج منتجات - حتى 50 منتج، أقسام وفلاتر",
      "عربة تسوق ودفع في خطوة واحدة",
      "ربط بوابات الدفع Paymob / Fawry",
      "لوحة تحكم أساسية لتتبع المخزون",
      "رسائل بريد إلكتروني لتأكيد الطلب والشحن",
      "صفحة تتبع حالة الطلب للعملاء",
      "واجهة متجاوبة ومناسبة للجوال أولاً",
      "تحسين محركات البحث الأساسي: meta, sitemap",
      "شامل النطاق (.com أو .eg) والاستضافة للعام الأول",
      "إعداد شهادة SSL وشبكة CDN",
      "دعم فني بعد الإطلاق لمدة شهر"
    ],
    medium: [
      "كتالوج منتجات غير محدود مع متغيرات وباقات",
      "نظام دفع متقدم ودفتر عناوين",
      "بوابات دفع متعددة (Paymob, Fawry, COD)",
      "إدارة مخزون كاملة وتنبيهات عند نقص الكمية",
      "حسابات عملاء، وتاريخ طلبات وإرجاعات",
      "نظام أكواد خصم وعروض فلاش سير",
      "تحسين SEO متقدم + بيانات منظمة",
      "ربط Google Analytics 4 + Meta Pixel",
      "مدونة / قسم محتوى مزود بنظام إدارة محتوى",
      "شامل النطاق والاستضافة للعام الأول",
      "SSL و CDN ونسخ احتياطي تلقائي",
      "دعم فني بعد الإطلاق لمدة 3 أشهر"
    ],
    large: [
      "كل ما سبق في الباقة الاحترافية +",
      "حركات واجهة مخصصة (GSAP / Framer Motion)",
      "دعم متعدد العملات واللغات للمتجر",
      "نظام ولاء ونقاط مكافآت",
      "استعادة السلات المتروكة (بريد + رسائل قصيرة)",
      "محرك توصية بالمنتجات",
      "لوحة تحكم تحليلات متقدمة (مؤشرات مخصصة)",
      "هندسة أداء - Core Web Vitals +95",
      "اختبار تحمل حتى 5000 مستخدم متزامن",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم ومراقبة بعد الإطلاق لمدة 6 أشهر"
    ],
    enterprise: [
      "كل ما سبق في الباقة الممتازة +",
      "بنية Headless Commerce (Next.js + API مخصص)",
      "تكامل مع أنظمة تخطيط الموارد و نقاط البيع (ERP / POS)",
      "تطبيق جوال PWA جاهز للمتجر",
      "خوادم مخصصة متوسعة تلقائياً",
      "مراقبة استقرار وتنبيهات على مدار الساعة",
      "ضمان توفر بنسبة 99.9%",
      "تدقيق أمان واختبار اختراق",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم فني هندسي مخصص لمدة 12 شهر"
    ]
  },
  corporate: {
    small: [
      "حتى 6 صفحات (الرئيسية، عنا، الخدمات، تواصل + 2 مخصص)",
      "تصميم مخصص يطابق هويتك التجارية",
      "نموذج اتصال مع إشعارات عبر البريد",
      "تضمين خرائط جوجل واتجاهات",
      "أساسيات SEO (meta, sitemap, robots.txt)",
      "واجهة متجاوبة ومناسبة للجوال أولاً",
      "شامل النطاق (.com أو .eg) والاستضافة للعام الأول",
      "إعداد شهادة SSL",
      "دعم فني بعد الإطلاق لمدة شهر"
    ],
    medium: [
      "حتى 15 صفحة بنظام تصميم متناسق",
      "قسم مدونة / أخبار بنظام إدارة محتوى",
      "نماذج جمع بيانات جاهزة للربط بأنظمة CRM",
      "إعداد SEO متكامل: تقني وكلمات ومحتوى",
      "ربط Google Analytics 4 و Search Console",
      "دعم ثنائي اللغة (عربي/إنجليزي - RTL/LTR)",
      "دمج موجز الشبكات الاجتماعية للمشاركة",
      "شامل النطاق والاستضافة للعام الأول",
      "SSL و CDN ونسخ احتياطي تلقائي",
      "دعم فني بعد الإطلاق لمدة 3 أشهر"
    ],
    large: [
      "كل ما سبق في الباقة الاحترافية +",
      "تأثيرات دقيقة وحركات مخصصة (GSAP ScrollTrigger)",
      "دليل فريق العمل مع تصفية للسير الذاتية",
      "معرض دراسات حالة وأعمال",
      "تكامل لحجز المواعيد (Cal.com أو متخصص)",
      "هندسة أداء - درجة Lighthouse +95",
      "تحسين وتقييم Core Web Vitals",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم فني ومراقبة أداء لمدة 6 أشهر"
    ],
    enterprise: [
      "كل ما سبق في الباقة الممتازة +",
      "بوابة عملاء بتسجيل دخول آمن",
      "نظام إدارة ملفات ومشاركتها",
      "ربط مخصص بأنظمة الإدارة (CRM / ERP)",
      "بنية تتسع لمواقع أو علامات تجارية متعددة",
      "خوادم وبنية تحتية مخصصة",
      "تدقيق أمني ومراجعة معايير الامتثال",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم فني هندسي مخصص لمدة 12 شهر"
    ]
  },
  custom: {
    small: [
      "ميزات التطبيق الأساسية المحددة أثناء الاستكشاف",
      "مصادقة مستخدمين وإدارة حسابات",
      "نظام صلاحيات أساسي (إدارة / مستخدم)",
      "واجهة تحكم متجاوبة",
      "مطور مع بروتوكول REST API وموثق",
      "قاعدة بيانات PostgreSQL وهندسة المخطط",
      "شامل النطاق والاستضافة للعام الأول",
      "إعداد شهادة SSL وبيئة التشغيل",
      "دعم فني بعد الإطلاق لمدة شهر"
    ],
    medium: [
      "تطبيق ويب مخصص المتكامل الأطراف",
      "نظام تحكم في الصلاحيات متقدم (RBAC)",
      "لوحة تحكم إدارية بجداول بيانات ورسوم بيانية",
      "حتى 3 عمليات ربط برمجية (API) خارجية",
      "نظام إشعارات عبر البريد الإلكتروني",
      "إدارة الملفات والوسائط المرفوعة",
      "اختبارات آلية لمسارات المستخدمين الحرجة",
      "توثيق API شامل (Swagger / Postman)",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم فني بعد الإطلاق لمدة 3 أشهر"
    ],
    large: [
      "كل ما سبق في الباقة الاحترافية +",
      "ميزات بالوقت الفعلي (WebSockets / SSE)",
      "تحليلات متقدمة مع إمكانية تصدير التقارير",
      "نظام مستشعرات Webhooks لتنبيه الأطراف الخارجية",
      "نظام معالجة وتصريف المهام بالخلفية",
      "تدقيق אمني كامل ومطابقة معايير OWASP",
      "تحسين أداء واختبار تحمل",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم ومراقبة بعد الإطلاق لمدة 6 أشهر"
    ],
    enterprise: [
      "كل ما سبق في الباقة الممتازة +",
      "بنية خدمات مصغرة أو متجانسة مركبة",
      "برمجيات كخدمة (SaaS) للمتعددين وعزل البيانات",
      "خط تشغيل للإصدار الأوتوماتيكي (CI/CD Pipeline)",
      "بنية تحتية بالتوسع التلقائي",
      "دعم العلامة البيضاء للمنتجات",
      "مراجعة امتثال أمان وخصوصية",
      "شامل النطاق والاستضافة للعام الأول",
      "دعم هندسي مستمر لمدة 12 شهر"
    ]
  },
  performance: {
    small: [
      "تدقيق Lighthouse كامل لكل الصفحات الرئيسية",
      "طرح تقرير Core Web Vitals القياسية (LCP, INP, CLS)",
      "تقرير تحسين الصور وتنفيذه",
      "تطبيق إصلاحات لعدد يصل لـ 10 قضايا حرجة في الأداء",
      "تحليل وتخفيف حزم الكود غير المستخدم",
      "تقرير فني مكتوب مفصل (PDF)",
      "خارطة طريق بخطوات ذات أولوية",
      "مكالمة متابعة واحدة (45 دقيقة)"
    ],
    medium: [
      "كل ما سبق في الباقة الأساسية +",
      "تجزئة الكود وتطبيق التحميل البطيء (Lazy Loading)",
      "مراجعة وإعداد أنظمة (SSR / ISR)",
      "تهيئة شبكة المحتوى (CDN) واستراتيجية العرض المسبق",
      "تحليل السكربتات الخارجية واستراتيجية تأخيرها",
      "تقرير أداء الاستعلامات من قواعد البيانات",
      "2 جلسة متابعة و دعم 30 يوم بريد إلكتروني"
    ],
    large: [
      "كل ما سبق في الباقة الاحترافية +",
      "تنفيذ عملية التحسينات بشكل عملي بدلا من التقرير فقط",
      "اختبار تحمل أداء لحوالي 10,000 مستخدم متزامن",
      "أنظمة مخصصة و تحسين الخوادم",
      "لوحة تحكم حية لمراقبة الأداء",
      "3 أشهر متابعة دورية للأداء",
      "تلقين تقرير الأداء الدوري كل شهر"
    ],
    enterprise: [
      "كل ما سبق في الباقة الممتازة +",
      "مهندس أداء مخصص للعمل بالاحتفاظ",
      "دورات تحسين مستمرة متكررة",
      "ضامانات الأداء بمؤشرات حقيقية",
      "تحسين منصات البرمجة والخوادم كاملا",
      "دعم تقني وتحديث لمدة 6 أشهر بشكل مستمر"
    ]
  }
};

en.estimator.pdfContent.deliverables = deliverablesEn;
ar.estimator.pdfContent.deliverables = deliverablesAr;

fs.writeFileSync(enPath, JSON.stringify(en, null, 4));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 4));
console.log("Done extending messages.");
