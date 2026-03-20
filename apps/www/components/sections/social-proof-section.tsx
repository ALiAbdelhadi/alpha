import { Container } from "@/components/container"
import { useBatchReveal, useReveal } from "@/hooks/use-animation"
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { memo } from "react"

export const SocialProofSection = memo(function SocialProofSection() {
  const t = useTranslations("socialProof")
  const testimonials: Testimonial[] = TESTIMONIALS

  const titleRef = useReveal<HTMLDivElement>({
    direction: "up",
  })

  const featuredRef = useReveal<HTMLDivElement>({
    direction: "up",
    delay: 0.1,
  })

  const gridRef = useBatchReveal<HTMLDivElement>({
    targets: ".testimonial-card",
    stagger: 0.1,
    once: true,
  })

  if (testimonials.length === 0) return null

  const [featured, ...rest] = testimonials

  return (
    <section
      id="social-proof"
      className="section-padding"
      aria-label={t("title")}
    >
      <Container>
        <div ref={titleRef} className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-4 block">
              {t("eyebrow")}
            </p>
            <h2
              className="font-sans font-normal text-primary leading-[1.05]"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)", letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h2>
          </div>
          <p className="font-mono text-sm text-primary/35 max-w-xs ltr:text-right rtl:text-left hidden md:block tracking-[0.05em]">
            {t("subtitle")}
          </p>
        </div>
        {featured && (
          <div
            ref={featuredRef}
            className="mb-12 border-t border-b border-foreground/8 py-12"
          >
            <div className="grid md:grid-cols-[1fr_200px] gap-8 items-end">
              <blockquote>
                <p
                  className="font-sans font-light text-primary leading-snug tracking-tight mb-8"
                  style={{ fontSize: "clamp(20px, 3.5vw, 36px)", letterSpacing: "-0.025em" }}
                >
                  &ldquo;{t(`testimonials.${featured.id}.quote`) ?? featured.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Author testimonial={featured} />
                </div>
              </blockquote>
              <div className="hidden md:flex justify-end">
                <span
                  className="font-sans font-light leading-none text-foreground/4 select-none"
                  style={{ fontSize: "clamp(80px, 12vw, 140px)" }}
                  aria-hidden
                >
                  &ldquo;
                </span>
              </div>
            </div>
          </div>
        )}
        {rest.length > 0 && (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-foreground/8">
            {rest.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card ltr:border-r rtl:border-l border-b border-foreground/8 px-6 py-8 group hover:bg-foreground/1.5 transition-colors duration-300"
                >
                <blockquote>
                  <p className="text-base text-primary/65 mb-6 leading-relaxed">
                    &ldquo;{t(`testimonials.${testimonial.id}.quote`) ?? testimonial.quote}&rdquo;
                  </p>
                  <Author testimonial={testimonial} />
                </blockquote>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
})

const Author = memo(function Author({ testimonial }: { testimonial: Testimonial }) {
  const t = useTranslations("socialProof")
  const authorName = t(`testimonials.${testimonial.id}.author`) ?? testimonial.author
  const role = t(`testimonials.${testimonial.id}.role`) ?? testimonial.role
  const company = t(`testimonials.${testimonial.id}.company`) ?? testimonial.company
  const initials = authorName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/4 font-mono text-xs font-medium text-primary border border-foreground/8 overflow-hidden"
        aria-hidden
      >
        {testimonial.avatar
          ? <Image
              src={testimonial.avatar}
              alt={authorName}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          : initials}
      </div>
      <div>
        <p className="font-medium text-primary text-sm">{authorName}</p>
        <p className="font-mono text-xs text-primary/35 uppercase tracking-[0.12em]">
          {role} · {company}
        </p>
      </div>
    </div>
  )
})