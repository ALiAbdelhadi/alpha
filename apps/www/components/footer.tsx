// motion: useBatch for top row, useReveal for logo block + description - 3 hooks
"use client"

import { Link } from "@/i18n/navigation"
import { DEFAULTS, MOTION, useBatch, useReveal } from "@/lib/motion"
import { localizeNumbers } from "@/lib/number"
import { useLocale, useTranslations } from "next-intl"
import { memo, useMemo } from "react"
import { AltruvexLogo } from "./altruvex-logo"
import { Container } from "./container"
import { useLoading } from "./providers/loading-provider"

export const Footer = memo(function Footer() {
    const t = useTranslations("footer")
    const locale = useLocale()
    const { isInitialLoadComplete } = useLoading()

    const topRowRef = useBatch<HTMLDivElement>({
        ...DEFAULTS.card,
        ease: MOTION.ease.smooth,
        stagger: MOTION.stagger.tight,
    })
    const logoRef = useReveal<HTMLDivElement>({ ...DEFAULTS.element, ease: MOTION.ease.smooth, delay: 0.1 })
    const descRef = useReveal<HTMLDivElement>({ ...DEFAULTS.body, ease: MOTION.ease.smooth, delay: 0.15 })

    const localizedYear = useMemo(() => {
        const year = new Date().getFullYear()
        return locale === "ar" ? localizeNumbers(year.toString(), locale) : year.toString()
    }, [locale])

    const servicesLinks = useMemo(() => [
        { href: "/services/web-design", label: t("webDesign") },
        { href: "/services/development", label: t("development") },
        { href: "/services/consulting", label: t("consulting") },
        { href: "/services/maintenance", label: t("maintenance") },
    ], [t])

    const companyLinks = useMemo(() => [
        { href: "/approach", label: t("approach") },
        { href: "/work", label: t("work") },
        { href: "/process", label: t("process") },
        { href: "/standards", label: t("standards") }
    ], [t])

    const resourceLinks = useMemo(() => [
        { href: "/pricing", label: t("pricing") },
        { href: "/writing", label: t("writing") },
        { href: "/schedule", label: t("schedule") },
        { href: "/contact", label: t("contact") }
    ], [t])

    const legalLinks = useMemo(() => [
        { href: "/privacy", label: t("privacy") },
        { href: "/terms", label: t("terms") },
    ], [t])

    if (!isInitialLoadComplete) return null

    return (
        <footer className={`w-full border-t border-foreground/8 transition-opacity duration-500 ${isInitialLoadComplete ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <Container className="w-full py-16">
                <div ref={topRowRef} className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start mb-16">
                    <div className="shrink-0">
                        <p
                            className="font-sans font-normal text-primary"
                            style={{ fontSize: "clamp(16px, 2vw, 20px)", letterSpacing: "-0.01em" }}
                        >
                            {t("tagline")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-16">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-2">
                                {t("servicesTitle")}
                            </h3>
                            {servicesLinks.map(({ href, label }) => (
                                <Link key={label} href={href} className="text-sm text-primary/55 transition-colors duration-200 hover:text-primary">
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-2">
                                {t("companyTitle")}
                            </h3>
                            {companyLinks.map(({ href, label }) => (
                                <Link key={label} href={href} className="text-sm text-primary/55 transition-colors duration-200 hover:text-primary">
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary/25 mb-2">
                                {t("resourcesTitle")}
                            </h3>
                            {resourceLinks.map(({ href, label }) => (
                                <Link key={label} href={href} className="text-sm text-primary/55 transition-colors duration-200 hover:text-primary">
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div ref={logoRef} className="relative mb-12">
                    <div className="py-6">
                        <h2
                            className="font-semibold text-primary font-sans tracking-tighter select-none"
                            style={{ fontSize: "clamp(100px, 20vw, 380px)", lineHeight: "0.88" }}
                        >
                            Altruvex
                        </h2>
                    </div>
                </div>
                <div ref={descRef} className="mb-16 max-w-2xl">
                    <p className="text-[15px] text-primary/45 leading-relaxed">
                        {t("description")}
                    </p>
                </div>
                <div
                    className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center border-t border-foreground/8 pt-8"
                >
                    <div className="flex items-center gap-2">
                        <AltruvexLogo size="sm" variant="icon" />
                        <span className="font-mono text-xs text-primary/40 uppercase tracking-widest">
                            {t("copyright", { year: localizedYear })}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-6 sm:gap-8">
                        {legalLinks.map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="font-mono text-xs uppercase tracking-[0.18em] text-primary/40 transition-colors duration-200 hover:text-primary"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    )
})