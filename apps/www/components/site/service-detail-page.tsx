import {
  ActionPanel,
  LinkCard,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/site/marketing-primitives";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

type ActionItem = {
  href: string;
  label: ReactNode;
};

type ServicePageProps = {
  hero: {
    eyebrow: ReactNode;
    title: ReactNode;
    description: ReactNode;
  };
  sections: {
    deliverablesTitle: ReactNode;
    deliverables: ReactNode[];
    fitTitle: ReactNode;
    fitItems: ReactNode[];
  };
  primary: ActionItem;
  secondary: ActionItem;
  proofCard?: {
    href: string;
    title: ReactNode;
    description: ReactNode;
    cta: ReactNode;
  };
  labels?: {
    scopeEyebrow?: ReactNode;
    fitEyebrow?: ReactNode;
    nextStepEyebrow?: ReactNode;
    nextStepTitle?: ReactNode;
    nextStepDescription?: ReactNode;
  };
};

export function ServiceDetailPage({
  hero,
  sections,
  primary,
  secondary,
  proofCard,
  labels,
}: ServicePageProps) {
  const t = useTranslations("serviceDetails");

  return (
    <>
      <PageHero
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
              eyebrow={labels?.scopeEyebrow || t("scopeLabel")}
              title={sections.deliverablesTitle}
            />
            <div className="mt-8 grid gap-4">
              {sections.deliverables.map((item, index) => (
                <div key={index} className="rounded-md border border-border bg-card p-5 md:p-6 flex gap-4">
                  <p className="font-mono text-sm leading-normal tracking-wider text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground mt-1 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-6 text-foreground/85">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow={labels?.fitEyebrow || t("fitLabel")}
              title={sections.fitTitle}
            />
            <div className="mt-8 grid gap-4">
              {sections.fitItems.map((item, index) => (
                <div key={index} className="rounded-md border border-border bg-card p-5 md:p-6">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            {proofCard ? (
              <LinkCard
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
        eyebrow={labels?.nextStepEyebrow || t("nextStepEyebrow")}
        title={labels?.nextStepTitle || t("nextStepTitle")}
        description={labels?.nextStepDescription || t("nextStepDescription")}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
}

