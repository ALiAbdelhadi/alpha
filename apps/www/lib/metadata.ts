import { Metadata } from 'next'

const siteConfig = {
  name: 'Altruvex',
  description: 'Altruvex specializes in creating cutting-edge web applications with innovative interactions, stunning visuals, and exceptional user experiences that set your brand apart.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://altruvex.com',
  ogImage: '/og/home-en.jpg',
  twitterHandle: '@altruvex',
}

const pageMetadata = {
  home: {
    en: {
      title: 'Altruvex - Premium Web Development Agency',
      description: 'Cutting-edge web applications with innovative interactions, stunning visuals, and exceptional user experiences. Custom development for enterprise clients.',
      ogImage: '/og/home-en.jpg',
    },
    ar: {
      title: 'Altruvex - وكالة تطوير مواقع ويب متميزة',
      description: 'تطبيقات ويب متطورة مع تفاعلات مبتكرة وتصاميم مذهلة وتجارب مستخدم استثنائية. تطوير مخصص للعملاء الكبار.',
      ogImage: '/og/home-ar.jpg',
    },
  },
  about: {
    en: {
      title: 'About Us - Altruvex',
      description: 'Learn about Altruvex, a premium web development agency specializing in custom solutions for enterprise clients.',
      ogImage: '/og/about-en.jpg',
    },
    ar: {
      title: 'من نحن - Altruvex',
      description: 'تعرف على Altruvex، وكالة تطوير ويب متميزة متخصصة في الحلول المخصصة للعملاء الكبار.',
      ogImage: '/og/about-ar.jpg',
    },
  },
  services: {
    en: {
      title: 'Our Services - Altruvex',
      description: 'Web development, e-commerce, multilingual websites, UI/UX design, and custom solutions for your business.',
      ogImage: '/og/services-en.jpg',
    },
    ar: {
      title: 'خدماتنا - Altruvex',
      description: 'تطوير المواقع، التجارة الإلكترونية، المواقع متعددة اللغات، تصميم UI/UX، وحلول مخصصة لعملك.',
      ogImage: '/og/services-ar.jpg',
    },
  },
  work: {
    en: {
      title: 'Our Work - Altruvex',
      description: 'Explore our portfolio of premium web applications and digital experiences crafted for leading businesses.',
      ogImage: '/og/work-en.jpg',
    },
    ar: {
      title: 'أعمالنا - Altruvex',
      description: 'استكشف محفظة أعمالنا من تطبيقات الويب المتميزة والتجارب الرقمية المصممة للشركات الرائدة.',
      ogImage: '/og/work-ar.jpg',
    },
  },
  contact: {
    en: {
      title: 'Contact Us - Altruvex',
      description: 'Get in touch with Altruvex . Schedule a consultation and let\'s discuss your next web project.',
      ogImage: '/og/contact-en.jpg',
    },
    ar: {
      title: 'اتصل بنا - Altruvex',
      description: 'تواصل مع Altruvex . احجز استشارة ودعنا نناقش مشروعك القادم.',
      ogImage: '/og/contact-ar.jpg',
    },
  },
}

export function generateMetadata(
  locale: string = 'en',
  page: keyof typeof pageMetadata = 'home'
): Metadata {
  const isArabic = locale === 'ar'
  const pageMeta = (pageMetadata[page]?.[locale as 'en' | 'ar']) || pageMetadata.home[locale as 'en' | 'ar']
  const baseUrl = siteConfig.url
  const canonicalPath = locale === 'en' ? '/' : `/${locale}`
  const canonicalUrl = `${baseUrl}${canonicalPath}`

  return {
    title: {
      default: pageMeta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: pageMeta.description,
    keywords: [
      'web development',
      'web design',
      'React',
      'Next.js',
      'TypeScript',
      'frontend development',
      'UI/UX design',
      'digital agency',
      'custom web development',
      'enterprise web solutions',
      'premium web design',
      locale === 'ar' ? 'تطوير مواقع' : '',
      locale === 'ar' ? 'تصميم مواقع' : '',
    ].filter(Boolean),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_SA' : 'en_US',
      url: canonicalUrl,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.name,
      images: [
        {
          url: pageMeta.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [pageMeta.ogImage],
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
      // Add your verification codes when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/altruvex-logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [
      // Add your social media links when available
      // 'https://twitter.com/altruvex',
      // 'https://linkedin.com/company/altruvex',
      // 'https://github.com/altruvex',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@altruvex.com',
      contactType: 'Customer Service',
      areaServed: ['Worldwide', 'Egypt', 'UAE', 'Saudi Arabia'],
      availableLanguage: ['en', 'ar'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
    priceRange: '$$',
    serviceType: [
      'Web Development',
      'Web Design',
      'UI/UX Design',
      'Frontend Development',
      'Full Stack Development',
      'E-Commerce Development',
      'Multilingual Websites',
    ],
    areaServed: {
      '@type': 'Country',
      name: ['Egypt', 'UAE', 'Saudi Arabia', 'Worldwide'],
    },
  }
}

// Generate Service Schema for individual services
export function generateServiceSchema(service: {
  name: string
  description: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/brand/altruvex-logo.png`,
    },
    serviceType: service.serviceType,
    areaServed: {
      '@type': 'Country',
      name: ['Egypt', 'UAE', 'Saudi Arabia', 'Worldwide'],
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteConfig.url}/contact`,
      serviceType: 'Online',
    },
  }
}



