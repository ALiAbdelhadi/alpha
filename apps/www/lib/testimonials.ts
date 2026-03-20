export type LocalizedString = {
  en: string
  ar: string
}

export type Testimonial = {
  id: string
  author: string
  role: LocalizedString
  company: string
  quote: LocalizedString
  avatar?: string
  caseStudySlug?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "art-lighting-store-founder",
    author: "Founder, Art Lighting Store",
    role: { en: "Founder", ar: "مؤسس" },
    company: "Art Lighting Store",
    quote: {
      en: "Our old store made it hard for customers to see the quality of our fixtures. The new experience feels premium and the numbers back it up-conversion is up and support tickets are down.",
      ar: "كان متجرنا القديم يصعّب على العملاء رؤية جودة تركيباتنا. التجربة الجديدة تبدو فاخرة والأرقام تدعم ذلك - التحويل ارتفع وتذاكر الدعم انخفضت.",
    },
    caseStudySlug: "art-lighting-store",
  },
  {
    id: "casescobra-owner",
    author: "Owner, CasesCobra",
    role: { en: "Owner", ar: "مالك" },
    company: "CasesCobra",
    quote: {
      en: "The configurator Altruvex built finally matches how our customers actually shop. We’ve seen a clear lift in average order value and far fewer ‘this isn’t what I expected’ messages.",
      ar: "أداة التكوين التي بنتها Altruvex تطابق أخيراً الطريقة التي يتسوق بها عملاؤنا فعلياً. لقد شهدنا زيادة واضحة في متوسط قيمة الطلب ورسائل أقل بكثير من نوع 'هذا ليس ما توقعته'.",
    },
    caseStudySlug: "custom-case-builder",
  },
  {
    id: "newlight-commercial-director",
    author: "Commercial Director, NewLight",
    role: { en: "Commercial Director", ar: "مدير تجاري" },
    company: "NewLight",
    quote: {
      en: "For the first time, our Arabic and English presence feels equally considered. The site is fast, stable, and our sales team actually relies on it in front of clients.",
      ar: "لأول مرة، يبدو حضورنا باللغتين العربية والإنجليزية مدروساً بشكل متساوٍ. الموقع سريع ومستقر، وفريق المبيعات لدينا يعتمد عليه فعلياً أمام العملاء.",
    },
    caseStudySlug: "bilingual-corporate-portal",
  },
]

export function getTestimonialsForCaseStudy(slug: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.caseStudySlug === slug)
}

