import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://alpha.com'
  const currentDate = new Date()

  const routes = [
    '',
    '/work',
    '/services',
    '/about',
    '/contact',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each locale
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

