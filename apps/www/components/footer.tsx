"use client"

import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useReveal } from "@/hooks/use-animation"
import { Container } from "./container"
import { AnthupicLogo } from "./anthupic-logo"

export default function Footer() {
    const t = useTranslations("footer")
    const tLogo = useTranslations("logo")
    const taglineRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })
    const linksRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1, duration: 0.5 })
    const logoRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2, duration: 0.6 })
    const descRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.3, duration: 0.5 })
    const bottomRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.4, duration: 0.5 })
    const year = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-foreground/25">
            <Container className="w-full py-16">
                <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start mb-16">
                    <div ref={taglineRef} className="shrink-0">
                        <p className="body-lg font-sans text-primary">
                            {t("tagline")}
                        </p>
                    </div>
                    <div ref={linksRef} className="flex flex-col gap-8 sm:flex-row sm:gap-16">
                        <div className="flex flex-col gap-4">
                            <h3 className="body font-medium text-primary mb-2">{t("servicesTitle")}</h3>
                            <Link href="/services/web-design" className="body text-primary/70 transition-colors transition-default hover:text-primary">
                                {t("webDesign")}
                            </Link>
                            <Link href="/services/development" className="body text-primary/70 transition-colors transition-default hover:text-primary">
                                {t("development")}
                            </Link>
                            <Link href="/services/consulting" className="body text-primary/70 transition-colors transition-default hover:text-primary">
                                {t("consulting")}
                            </Link>
                            <Link href="/services/maintenance" className="body text-primary/70 transition-colors transition-default hover:text-primary">
                                {t("maintenance")}
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="body font-medium text-primary mb-2">{t("resourcesTitle")}</h3>
                            <Link href="/contact" className="body text-primary/70 transition-colors transition-default hover:text-primary">
                                {t("contact")}
                            </Link>
                        </div>
                    </div>
                </div>
                <div ref={logoRef} className="relative mb-12">
                    <div className="py-8">
                        <h2
                            className="font-semibold text-primary font-sans tracking-tighter select-none"
                            style={{ fontSize: 'clamp(120px, 20vw, 400px)', lineHeight: '0.9' }}
                        >
                            {tLogo("logo")}
                        </h2>
                    </div>
                </div>
                <div ref={descRef} className="mb-16 max-w-2xl">
                    <p className="body text-primary/60 leading-relaxed">
                        {t("description")}
                    </p>
                </div>
                <div 
                    ref={bottomRef} 
                    className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center border-t border-foreground/25 pt-8"
                    style={{ minHeight: '48px' }}
                >
                    <div className="flex items-center gap-2">
                        <AnthupicLogo size="sm" variant="icon" />
                        <span className="text-primary/70 small">{t("copyright", { year })}</span>
                    </div>
                    <div className="flex flex-wrap gap-6 sm:gap-8">
                        <Link href="/approach" className="text-primary/70 transition-colors transition-default small hover:text-primary">
                            {t("aboutAnthupic")}
                        </Link>
                        <Link href="/services" className="text-primary/70 transition-colors transition-default small hover:text-primary">
                            {t("servicesTitle")}
                        </Link>
                        <Link href="/contact" className="text-primary/70 transition-colors transition-default small hover:text-primary">
                            {t("contact")}
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}