"use client";

import { Container } from "@/components/container";
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const AuthoritySection = memo(function AuthoritySection() {
  const t = useTranslations("authority");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({ ...DEFAULTS.heading, ease: MOTION.ease.text });
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const gridRef = useBatch({ ...DEFAULTS.card, selector: ".authority-card" });

  const cards = [
    { key: "card1", number: "01", title: t("cards.card1.title"), body: t("cards.card1.body") },
    { key: "card2", number: "02", title: t("cards.card2.title"), body: t("cards.card2.body") },
    { key: "card3", number: "03", title: t("cards.card3.title"), body: t("cards.card3.body") },
  ];

  return (
    <section
      id="authority"
      className="pt-[var(--section-y-top)] pb-[var(--section-y-bottom)]"
      aria-label={t("title")}
    >
      <Container>
        <div className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div className="space-y-3">
            <p ref={eyebrowRef} className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground block">
              {t("eyebrow")}
            </p>
            <h2 ref={titleRef} className="text-[clamp(2.125rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] font-normal text-foreground">
              {t("title")}
            </h2>
          </div>
          <p
            ref={descRef}
            className="text-[clamp(0.9375rem,0.98vw,1rem)] text-muted-foreground max-w-sm leading-relaxed md:max-w-xs lg:max-w-[20rem] text-end md:block"
          >
            {t("subtitle")}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-0 border-x border-border md:grid-cols-3"
        >
          {cards.map((card) => (
            <div
              key={card.key}
              className="authority-card border-e border-b border-border px-6 py-8 group hover:bg-surface transition-colors duration-300"
            >
              <p className="font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal text-muted-foreground mb-6">
                {card.number}
              </p>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-medium text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-[clamp(1.0625rem,1.05vw,1.125rem)] text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});