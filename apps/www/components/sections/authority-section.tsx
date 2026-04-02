"use client";

import { Container } from "@/components/container";
import { DEFAULTS, MOTION, useBatch, useReveal, useText } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const AuthoritySection = memo(function AuthoritySection() {
  const t = useTranslations("authority");

  const eyebrowRef = useReveal({ ...DEFAULTS.body, delay: 0 });
  const titleRef = useText<HTMLHeadingElement>({
    ...DEFAULTS.heading,
    ease: MOTION.ease.text,
  });
  const descRef = useReveal({ ...DEFAULTS.body, delay: 0.15 });
  const gridRef = useBatch({ ...DEFAULTS.card, selector: ".authority-card" });

  const cards = [
    {
      key: "card1",
      number: "01",
      title: t("cards.card1.title"),
      body: t("cards.card1.body"),
    },
    {
      key: "card2",
      number: "02",
      title: t("cards.card2.title"),
      body: t("cards.card2.body"),
    },
    {
      key: "card3",
      number: "03",
      title: t("cards.card3.title"),
      body: t("cards.card3.body"),
    },
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
            <p
              ref={eyebrowRef}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/70 block"
            >
              {t("eyebrow")}
            </p>
            <h2
              ref={titleRef}
              className="font-sans font-normal text-primary leading-[1.05]"
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("title")}
            </h2>
          </div>
          <p
            ref={descRef}
            className="max-w-xs font-mono text-sm tracking-[0.05em] text-muted-foreground ltr:text-right rtl:text-left md:block"
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
              className="authority-card border-r border-b border-border px-6 py-8 group hover:bg-muted/5 transition-colors duration-300"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/35 mb-6">
                {card.number}
              </p>
              <h3
                className="font-sans font-medium text-primary mb-3"
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  letterSpacing: "-0.015em",
                }}
              >
                {card.title}
              </h3>
              <p className="text-base text-primary/60 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});
