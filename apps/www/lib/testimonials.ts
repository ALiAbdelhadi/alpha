export type LocalizedString = {
  en: string;
  ar: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role: LocalizedString;
  company: string;
  quote: LocalizedString;
  avatar?: string;
  caseStudySlug?: string;
};

export const TESTIMONIALS: Testimonial[] = [];

export function getTestimonialsForCaseStudy(slug: string): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.caseStudySlug === slug);
}
