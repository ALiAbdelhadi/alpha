import { LayoutEffects } from "@/components/layout-effects";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { routing } from "@/i18n/routing";
import "@/lib/env";
import { buildGlobalSchemas } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter, Outfit, Vazirmatn } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const isVercel = process.env.VERCEL === "1";

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isBot = /Lighthouse|Googlebot|Chrome-Lighthouse|Speed Insights|PageSpeed|GTmetrix/i.test(userAgent);

  const SpeedInsights = isVercel
    ? (await import("@vercel/speed-insights/next")).SpeedInsights
    : null;
  const Analytics = isVercel
    ? (await import("@vercel/analytics/next")).Analytics
    : null;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        <meta name="theme-color" content="#4a6ed4" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Altruvex" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen flex flex-col antialiased overflow-x-auto",
          vazirmatn.variable,
          inter.variable,
          outfit.variable,
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:p-3 focus:px-5 focus:rounded-md focus:shadow-lg focus:border focus:border-border focus:bg-background focus:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to main content
        </a>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js', 'enabled');(function(){try{var c=sessionStorage.getItem('Altruvex_initial_load_complete');if(c){document.documentElement.setAttribute('data-initial-load','complete')}}catch(e){}})();`,
          }}
        />
        <JsonLd schemas={buildGlobalSchemas(locale)} />
        <NextIntlClientProvider>
          <Providers isBot={isBot}>
            <LayoutEffects>{children}</LayoutEffects>
          </Providers>
        </NextIntlClientProvider>
        {SpeedInsights ? <SpeedInsights /> : null}
        {Analytics ? <Analytics /> : null}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
