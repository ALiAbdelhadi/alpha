"use client"

import { Container } from "@/components/container"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-animation"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { Mail, MapPin, Phone } from "lucide-react"
import Footer from "@/components/footer"

export default function ContactPage() {
    const t = useTranslations("contactPage")
    const tContact = useTranslations("contact")
    const titleRef = useReveal({ direction: "up", delay: 0, duration: 0.5 })
    const leftRef = useReveal({ direction: "left", delay: 0.1, duration: 0.5 })
    const rightRef = useReveal({ direction: "right", delay: 0.15, duration: 0.5 })

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <section className="flex min-h-screen w-full items-center justify-center pt-24 md:pt-32">
                    <Container>
                        <div className="max-w-4xl">
                            <div
                                ref={titleRef}
                                className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/10 px-4 py-2 backdrop-blur-sm"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                                <p className="font-mono text-xs text-primary/90 tracking-wide uppercase">
                                    {t("badge")}
                                </p>
                            </div>
                            <h1 className="mb-8 font-sans text-5xl font-normal leading-[1.08] tracking-tight text-primary md:text-6xl lg:text-7xl xl:text-8xl">
                                <span className="text-balance">{t("heroTitle")}</span>
                            </h1>
                            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary/85 md:text-xl lg:text-2xl">
                                <span className="text-pretty">
                                    {t("heroDescription")}
                                </span>
                            </p>
                        </div>
                    </Container>
                </section>
                <section className="flex min-h-screen w-full items-center pt-24 md:pt-32">
                    <Container>
                        <div className="grid gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
                            <div ref={leftRef} className="flex flex-col justify-center">
                                <div className="mb-12 sm:mb-14 md:mb-16">
                                    <h2 className="mb-3 font-sans text-4xl font-normal leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                                        {t("infoTitle")}
                                        <br />
                                        <span className="text-primary/75">{t("infoTitleHighlight")}</span>
                                    </h2>
                                    <p className="font-mono text-sm text-primary/60 tracking-wide sm:text-base">
                                        {t("infoSubtitle")}
                                    </p>
                                </div>
                                <div className="space-y-8 sm:space-y-9">
                                    <a href={`mailto:${tContact("emailValue")}`} className="group block">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("emailLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary transition-colors group-hover:text-primary/75 md:text-xl lg:text-2xl">
                                            {tContact("emailValue")}
                                        </p>
                                    </a>
                                    <a href="tel:+201234567890" className="group block">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Phone className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("phoneLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary transition-colors group-hover:text-primary/75 md:text-xl lg:text-2xl">
                                            +20 123 456 7890
                                        </p>
                                    </a>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-mono text-xs text-primary/60 tracking-wide">
                                                {t("locationLabel")}
                                            </span>
                                        </div>
                                        <p className="text-lg text-primary md:text-xl lg:text-2xl">
                                            {t("address1")}
                                            <br />
                                            {t("address2")}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 pt-2 sm:gap-4">
                                        {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((social) => (
                                            <a
                                                key={social}
                                                href="#"
                                                className="border-b border-transparent font-mono text-xs text-primary/60 transition-all hover:border-foreground/60 hover:text-primary/85 sm:text-sm"
                                            >
                                                {social}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="pt-6 sm:pt-8">
                                        <Link href="/schedule">
                                            <MagneticButton size="lg" className="group relative">
                                                <span className="flex items-center gap-2">
                                                    {t("scheduleCall")}
                                                    <svg
                                                        className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-rotate-180"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </span>
                                            </MagneticButton>
                                        </Link>
                                        <p className="mt-3 text-xs text-primary/60 font-mono">
                                            {t("responseTime")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div ref={rightRef} className="flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                            {t("form.nameLabel")} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={t("form.namePlaceholder")}
                                            className="w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                            {t("form.emailLabel")} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder={t("form.emailPlaceholder")}
                                            className="w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                            {t("form.serviceLabel")} <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none border-foreground/25 focus:border-foreground/50 transition-all">
                                            <option value="">{t("form.servicePlaceholder")}</option>
                                            <option value="web-design">{t("form.serviceWebDesign")}</option>
                                            <option value="development">{t("form.serviceDevelopment")}</option>
                                            <option value="consulting">{t("form.serviceConsulting")}</option>
                                            <option value="maintenance">{t("form.serviceMaintenance")}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block font-mono text-xs text-primary/60 tracking-wide sm:text-sm">
                                            {t("form.messageLabel")} <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            placeholder={t("form.messagePlaceholder")}
                                            rows={4}
                                            className="w-full border-b bg-transparent py-2.5 text-sm text-primary placeholder:text-primary/60 focus:outline-none resize-none border-foreground/25 focus:border-foreground/50 transition-all"
                                        />
                                    </div>

                                    <div className="pt-3">
                                        <MagneticButton type="submit" variant="primary" size="lg" className="w-full text-base">
                                            {t("form.submit")}
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}
