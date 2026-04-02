import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://altruvex.com'
  const currentDate = new Date()

  const routes = [
    '',
    '/approach',
    '/contact',
    '/estimator',
    '/how-we-work',
    '/pricing',
    '/privacy',
    '/process',
    '/schedule',
    '/services',
    '/services/consulting',
    '/services/development',
    '/services/maintenance',
    '/services/interface-design',
    '/standards',
    '/terms',
    '/work',
    '/writing'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}
