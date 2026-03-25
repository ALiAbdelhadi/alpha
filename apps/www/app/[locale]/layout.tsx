import { LayoutEffects } from "@/components/layout-effects";
import { Providers } from "@/components/providers";
import { routing } from "@/i18n/routing";
import "@/lib/env";
import { cn } from "@/lib/utils";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        <meta name="theme-color" content="#5b5bd6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Altruvex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    send_page_view: true,
                  });
                `,
              }}
            />
          </>
        ) : null}
        <Script
          id="initial-load-script"
          strategy="beforeInteractive"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const isComplete = sessionStorage.getItem('Altruvex_initial_load_complete');
                  if (isComplete) {
                    document.documentElement.setAttribute('data-initial-load', 'complete');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Microsoft Clarity */}
        {clarityId ? (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w1cg510edl");
              `,
            }}
          />
        ) : null}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Altruvex",
              "url": process.env.NEXT_PUBLIC_APP_URL || "https://altruvex.com",
              "logo": `${process.env.NEXT_PUBLIC_APP_URL || "https://altruvex.com"}/apple-touch-icon.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@altruvex.com"
              }
            })
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen flex flex-col antialiased overflow-x-auto",
          vazirmatn.variable
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:p-3 focus:px-5 focus:bg-white focus:text-black dark:focus:bg-black dark:focus:text-white focus:rounded-md focus:shadow-lg focus:border focus:border-border"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider>
          <Providers>
            <LayoutEffects>{children}</LayoutEffects>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}