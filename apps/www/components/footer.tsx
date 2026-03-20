"use client"

import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useReveal } from "@/hooks/use-animation"
import { Container } from "./container"
import { AltruvexLogo } from "./altruvex-logo"
import { localizeNumbers } from "@/lib/number"
import { useLoading } from "./providers/loading-provider"
import { memo, useMemo } from "react"

export const Footer = memo(function Footer() {
    const t = useTranslations("footer")
    const locale = useLocale()
    const { isInitialLoadComplete } = useLoading()

    const taglineRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0, duration: 0.5 })
    const linksRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.1, duration: 0.5 })
    const logoRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.2, duration: 0.6 })
    const descRef = useReveal<HTMLDivElement>({ direction: "up", delay: 0.3, duration: 0.5 })

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
                <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start mb-16">
                    <div ref={taglineRef} className="shrink-0">
                        <p
                            className="font-sans font-normal text-primary"
                            style={{ fontSize: "clamp(16px, 2vw, 20px)", letterSpacing: "-0.01em" }}
                        >
                            {t("tagline")}
                        </p>
                    </div>
                    <div ref={linksRef} className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-16">
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