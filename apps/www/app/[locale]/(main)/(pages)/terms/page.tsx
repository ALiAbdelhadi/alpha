import { useTranslations, useLocale } from 'next-intl'

export default function TermsOfServicePage() {
    const t = useTranslations('terms')
    const locale = useLocale()

    const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-US'
    const lastModified = new Date('2026-03-16');

    const formattedDate = lastModified.toLocaleDateString(dateLocale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    return (
        <main id="main-content" className="section-padding py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-semibold text-primary tracking-tight mb-8">
                    {t('title')}
                </h1>

                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-primary/70">
                    <p className="text-lg text-primary/60">
                        {t('lastUpdated')} {formattedDate}
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.1.title')}</h2>
                        <p>{t('sections.1.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.2.title')}</h2>
                        <p>{t('sections.2.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.3.title')}</h2>
                        <p>{t('sections.3.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.4.title')}</h2>
                        <p>{t('sections.4.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.5.title')}</h2>
                        <p>{t('sections.5.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.6.title')}</h2>
                        <p>{t('sections.6.description')}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-medium text-primary">{t('sections.7.title')}</h2>
                        <p>
                            {t('sections.7.description')}
                            <a dir="ltr" href="mailto:hello@altruvex.com" className="text-brand underline underline-offset-4 hover:text-brand/80 transition-colors inline-block">
                                hello@altruvex.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}