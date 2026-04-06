import { Container } from "@/components/container";
import { MagneticButton } from "@/components/magnetic-button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  resolveText,
  type LocalizedText,
  type SiteAction,
} from "@/lib/site-content";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type MetricItem = {
  value: LocalizedText;
  label: LocalizedText;
};

export function PageSection({
  children,
  id,
  tone = "default",
  className,
}: {
  children: ReactNode;
  id?: string;
  tone?: "default" | "muted";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "page-section relative",
        tone === "muted" && "border-y border-border/70 bg-secondary/40",
        className,
      )}
    >
      <Container className="relative">{children}</Container>
    </section>
  );
}

export function SectionHeader({
  locale,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  locale: string;
  eyebrow?: LocalizedText;
  title: LocalizedText;
  description?: LocalizedText;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="section-kicker mb-4">{resolveText(locale, eyebrow)}</p>
      ) : null}
      <h2 className="section-title">{resolveText(locale, title)}</h2>
      {description ? (
        <p className="section-copy mt-5">{resolveText(locale, description)}</p>
      ) : null}
    </div>
  );
}

export function ActionRow({
  locale,
  primary,
  secondary,
  className,
}: {
  locale: string;
  primary?: SiteAction | null;
  secondary?: SiteAction | null;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {primary ? (
        <MagneticButton asChild variant="primary" size="lg">
          <Link href={primary.href}>{resolveText(locale, primary.label)}</Link>
        </MagneticButton>
      ) : null}
      {secondary ? (
        <MagneticButton asChild variant="secondary" size="lg">
          <Link href={secondary.href}>{resolveText(locale, secondary.label)}</Link>
        </MagneticButton>
      ) : null}
    </div>
  );
}

export function MetricGrid({
  locale,
  items,
  className,
}: {
  locale: string;
  items: MetricItem[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((item) => (
        <div key={item.label.en} className="surface-card">
          <p className="metric-value">{resolveText(locale, item.value)}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {resolveText(locale, item.label)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PageHero({
  locale,
  eyebrow,
  title,
  description,
  primary,
  secondary,
  metrics,
  className,
}: {
  locale: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  primary?: SiteAction | null;
  secondary?: SiteAction | null;
  metrics?: MetricItem[];
  className?: string;
}) {
  return (
    <PageSection className={cn("pt-32 md:pt-40", className)}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div className="max-w-4xl">
          <p className="section-kicker mb-5">{resolveText(locale, eyebrow)}</p>
          <h1 className="hero-title">{resolveText(locale, title)}</h1>
          <p className="hero-copy mt-6 max-w-3xl">
            {resolveText(locale, description)}
          </p>
          <ActionRow
            locale={locale}
            primary={primary}
            secondary={secondary}
            className="mt-8"
          />
        </div>
        <div className="surface-panel lg:ml-auto lg:max-w-[320px]">
          <p className="section-kicker mb-3">
            {locale.startsWith("ar") ? "كيف نعمل" : "How we work"}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {locale.startsWith("ar")
              ? "صفحات واضحة، دعوات متسقة، وتسليم يقوده شخص واحد من التشخيص حتى الإطلاق."
              : "Clear hierarchy, one dominant action, and founder-led delivery from diagnosis to launch."}
          </p>
        </div>
      </div>
      {metrics?.length ? <MetricGrid locale={locale} items={metrics} className="mt-12" /> : null}
    </PageSection>
  );
}

export function LinkCard({
  locale,
  href,
  title,
  description,
  cta,
  index,
  className,
}: {
  locale: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  cta?: LocalizedText;
  index?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("surface-link-card group block", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {index ? <p className="section-kicker mb-4">{index}</p> : null}
          <h3 className="text-[1.35rem] font-medium tracking-[-0.03em] text-foreground">
            {resolveText(locale, title)}
          </h3>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {resolveText(locale, description)}
      </p>
      {cta ? (
        <p className="mt-6 text-sm font-medium text-foreground">
          {resolveText(locale, cta)}
        </p>
      ) : null}
    </Link>
  );
}

export function ActionPanel({
  locale,
  eyebrow,
  title,
  description,
  note,
  primary,
  secondary,
}: {
  locale: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
  primary?: SiteAction | null;
  secondary?: SiteAction | null;
}) {
  return (
    <PageSection tone="muted">
      <div className="surface-panel grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="section-kicker mb-4">{resolveText(locale, eyebrow)}</p>
          <h2 className="section-title">{resolveText(locale, title)}</h2>
          <p className="section-copy mt-5">{resolveText(locale, description)}</p>
          {note ? (
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              {resolveText(locale, note)}
            </p>
          ) : null}
        </div>
        <ActionRow locale={locale} primary={primary} secondary={secondary} />
      </div>
    </PageSection>
  );
}
