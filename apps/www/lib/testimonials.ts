export type Testimonial = {
  id: string
  author: string
  role: string
  company: string
  quote: string
  avatar?: string
  caseStudySlug?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "art-lighting-store-founder",
    author: "Founder, Art Lighting Store",
    role: "Founder",
    company: "Art Lighting Store",
    quote:
      "Our old store made it hard for customers to see the quality of our fixtures. The new experience feels premium and the numbers back it up—conversion is up and support tickets are down.",
    caseStudySlug: "art-lighting-store",
  },
  {
    id: "casescobra-owner",
    author: "Owner, CasesCobra",
    role: "Owner",
    company: "CasesCobra",
    quote:
      "The configurator Anthupic built finally matches how our customers actually shop. We’ve seen a clear lift in average order value and far fewer ‘this isn’t what I expected’ messages.",
    caseStudySlug: "custom-case-builder",
  },
  {
    id: "newlight-commercial-director",
    author: "Commercial Director, NewLight",
    role: "Commercial Director",
    company: "NewLight",
    quote:
      "For the first time, our Arabic and English presence feels equally considered. The site is fast, stable, and our sales team actually relies on it in front of clients.",
    caseStudySlug: "bilingual-corporate-portal",
  },
]

export function getTestimonialsForCaseStudy(slug: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.caseStudySlug === slug)
}

