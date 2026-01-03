import { Metadata } from 'next'

const siteConfig = {
  name: 'Alpha',
  description: 'Alpha specializes in creating cutting-edge web applications with innovative interactions, stunning visuals, and exceptional user experiences that set your brand apart.',
  url: 'https://alpha.com', // Update with your actual domain
  ogImage: '/og-image.jpg', // Add OG image
  twitterHandle: '@alpha', // Update with your Twitter handle
}

export function generateMetadata(locale: string = 'en'): Metadata {
  const isArabic = locale === 'ar'
  
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'web development',
      'web design',
      'React',
      'Next.js',
      'TypeScript',
      'frontend development',
      'UI/UX design',
      'digital agency',
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_SA' : 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      // Add your social media links
      // 'https://twitter.com/alpha',
      // 'https://linkedin.com/company/alpha',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@alpha.com',
      contactType: 'Customer Service',
    },
  }
}



