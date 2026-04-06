import {
  ActionPanel,
  LinkCard,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/site/marketing-primitives";
import {
  resolveText,
  siteActions,
  type LocalizedText,
  type SiteAction,
} from "@/lib/site-content";

type ServicePageProps = {
  locale: string;
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
  };
  sections: {
    deliverablesTitle: LocalizedText;
    deliverables: LocalizedText[];
    fitTitle: LocalizedText;
    fitItems: LocalizedText[];
  };
  primary?: SiteAction | null;
  secondary?: SiteAction | null;
  proofCard?: {
    href: string;
    title: LocalizedText;
    description: LocalizedText;
    cta: LocalizedText;
  };
};

export function ServiceDetailPage({
  locale,
  hero,
  sections,
  primary = siteActions.schedule,
  secondary = siteActions.work,
  proofCard,
}: ServicePageProps) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primary={primary}
        secondary={secondary}
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <SectionHeader
              locale={locale}
              eyebrow={{
                en: "Scope",
                ar: "النطاق",
              }}
              title={sections.deliverablesTitle}
            />
            <div className="mt-8 grid gap-4">
              {sections.deliverables.map((item, index) => (
                <div key={item.en} className="surface-card flex gap-4">
                  <p className="section-kicker mt-1 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-6 text-foreground/85">
                    {resolveText(locale, item)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader
              locale={locale}
              eyebrow={{
                en: "Fit",
                ar: "المناسبة",
              }}
              title={sections.fitTitle}
            />
            <div className="mt-8 grid gap-4">
              {sections.fitItems.map((item) => (
                <div key={item.en} className="surface-card">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {resolveText(locale, item)}
                  </p>
                </div>
              ))}
            </div>
            {proofCard ? (
              <LinkCard
                locale={locale}
                href={proofCard.href}
                title={proofCard.title}
                description={proofCard.description}
                cta={proofCard.cta}
                className="mt-4"
              />
            ) : null}
          </div>
        </div>
      </PageSection>

      <ActionPanel
        locale={locale}
        eyebrow={{
          en: "Next Step",
          ar: "الخطوة التالية",
        }}
        title={{
          en: "Move from evaluation to a real technical decision.",
          ar: "انتقل من التقييم إلى قرار تقني حقيقي.",
        }}
        description={{
          en: "If this service matches the problem, the best next move is either a project range or a direct technical call.",
          ar: "إذا كانت هذه الخدمة تطابق المشكلة، فأفضل خطوة تالية هي نطاق مشروع أو مكالمة تقنية مباشرة.",
        }}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
}
