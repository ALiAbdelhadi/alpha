import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useLoading } from "@/components/providers/loading-provider"
import { Link } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { Calendar } from "lucide-react"
import { useTranslations } from "next-intl"
import { memo, useCallback, useRef } from "react"
import { useGSAPSection } from "@/hooks/use-gsap-section"
import { useFadeUp } from "@/hooks/use-text-reveal"

// Premium easing for CTA section
const EASE = {
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  gentle: "cubic-bezier(0.65, 0, 0.35, 1)",
  text: "cubic-bezier(0.2, 0, 0, 1)",
} as const

interface CtaSectionProps {
  scrollToSection?: (sectionId: string) => void
}

export const CtaSectionEnhanced = memo(function CtaSectionEnhanced({ scrollToSection }: CtaSectionProps) {
  const { isInitialLoadComplete } = useLoading()
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("cta")

  // Premium fade up animations
  const eyebrowRef = useFadeUp<HTMLParagraphElement>({ delay: 0, duration: 0.7, distance: 24 })
  const titleRef = useFadeUp<HTMLHeadingElement>({ delay: 0.1, duration: 0.9, distance: 28 })
  const contentRef = useFadeUp<HTMLDivElement>({ delay: 0.2, duration: 0.8, distance: 24 })

  useGSAPSection({ trigger: sectionRef }, (context) => {
    if (!isInitialLoadComplete || !sectionRef.current) return
    const { reduced } = context.conditions as { reduced: boolean }

    if (reduced) {
      gsap.set("[data-cta-line]", { scaleX: 1 })
      return
    }

    // Premium divider line animation - earlier trigger
    gsap.fromTo("[data-cta-line]",
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 1.4,
        ease: EASE.gentle,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        }
      }
    )
  }, [isInitialLoadComplete])

  const handleCtaClick = useCallback(() => scrollToSection?.("contact"), [scrollToSection])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden section-padding"
      aria-label="Call to action"
    >
      <Container>
        <div data-cta-line className="h-px w-full bg-foreground/8 mb-16 scale-x-0" />

        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">
          <div>
            <p ref={eyebrowRef} data-cta-content className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-6 block opacity-0">
              {t("eyebrow")}
            </p>
            <h2
              ref={titleRef}
              data-cta-content
              className="font-sans font-normal text-primary leading-[1.05] opacity-0"
              style={{ fontSize: "clamp(30px, 5.5vw, 68px)", letterSpacing: "-0.025em" }}
            >
              {t("title") ?? "Ready to transform your vision?"}
            </h2>
          </div>
          <div ref={contentRef} data-cta-content className="flex flex-col gap-6 opacity-0">
            <p className="text-base text-primary/55 leading-relaxed">
              {t("description") ?? "Let's build something that outlasts your competition."}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/8 bg-foreground/2.5 px-3 py-1.5 w-fit">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
              <span className="font-mono text-xs text-primary/45 uppercase tracking-[0.15em]">
                {t("availability")}
              </span>
            </div>
            <div ref={ctaRef} className="flex flex-col gap-3">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={handleCtaClick}
                className="group w-full justify-center"
              >
                <span className="flex items-center gap-2">
                  {t("primaryAction") ?? "Get started"}
                  <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </MagneticButton>
              <Link href="/how-we-work" className="w-full">
                <MagneticButton size="lg" variant="secondary" className="w-full justify-center">
                  <span className="flex items-center justify-center gap-2">
                    {t("secondaryAction") ?? "Explore portfolio"}
                    <svg
                      className="w-4 h-4 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:-rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </MagneticButton>
              </Link>
              <p className="font-mono text-xs text-primary/25 text-center pt-1 uppercase tracking-[0.15em]">
                {t("footnote")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
})
