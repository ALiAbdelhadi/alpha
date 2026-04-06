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
      id="social-proof"
      className="section-padding"
      aria-label={t("title")}
    >
      <Container>
        <div className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div className="space-y-3">
            <p ref={eyebrowRef} className="meta-eyebrow text-muted-foreground block">
              {t("eyebrow")}
            </p>
            <h2 ref={titleRef} className="display-h2 font-normal text-foreground leading-[1.05]">
              {t("title")}
            </h2>
          </div>
          <p
            ref={descRef}
            className="max-w-xs font-mono text-[13px] leading-[1.8] text-muted-foreground ltr:text-right rtl:text-left md:block"
          >
            {t("subtitle")}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-0 border-l border-r border-border md:grid-cols-3"
        >
          {cards.map((card) => (
            <div
              key={card.key}
              className="authority-card border-r border-b border-border px-6 py-8 group hover:bg-surface transition-colors duration-300"
            >
              <p className="meta-eyebrow text-muted-foreground mb-6">
                {card.number}
              </p>
              <h3 className="display-h3 font-medium text-foreground mb-3">
                {card.title}
              </h3>
              <p className="body-copy text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});