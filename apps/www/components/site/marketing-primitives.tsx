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
        <p className="mb-4 font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
          {resolveText(locale, eyebrow)}
        </p>
      ) : null}
      <h2 className="font-sans text-[clamp(2.125rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground">
        {resolveText(locale, title)}
      </h2>
      {description ? (
        <p className="mt-5 text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
          {resolveText(locale, description)}
        </p>
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
        <div
          key={item.label.en}
          className="rounded-md border border-border bg-card p-5 md:p-6"
        >
          <p className="text-[clamp(22px,2.8vw,34px)] tracking-[-0.03em] tabular-nums">
            {resolveText(locale, item.value)}
          </p>
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
          <p className="mb-5 font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
            {resolveText(locale, eyebrow)}
          </p>
          <h1 className="font-sans text-[clamp(3rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-foreground">
            {resolveText(locale, title)}
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
            {resolveText(locale, description)}
          </p>
          <ActionRow
            locale={locale}
            primary={primary}
            secondary={secondary}
            className="mt-8"
          />
        </div>
        <div className="rounded-md border border-border bg-card/80 p-6 backdrop-blur-sm lg:ml-auto lg:max-w-[320px]">
          <p className="mb-3 font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
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
    <Link
      href={href}
      className={cn(
        "group block rounded-md border border-border bg-card p-6 transition-colors hover:bg-muted/40",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {index ? (
            <p className="mb-4 font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
              {index}
            </p>
          ) : null}
          <h3 className="font-medium text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] text-foreground">
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
      <div className="grid gap-8 rounded-md border border-border bg-card/80 p-6 backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs leading-normal tracking-[0.22em] uppercase text-muted-foreground rtl:font-sans rtl:normal-case rtl:tracking-normal">
            {resolveText(locale, eyebrow)}
          </p>
          <h2 className="font-sans text-[clamp(2.125rem,4vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-foreground">
            {resolveText(locale, title)}
          </h2>
          <p className="mt-5 text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75] text-muted-foreground">
            {resolveText(locale, description)}
          </p>
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
