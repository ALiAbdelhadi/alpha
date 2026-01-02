import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Props } from "@/types";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";


export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning dir={locale === "ar" ? "rtl" : "ltr"} >
      <body
        suppressHydrationWarning
        className={cn("min-h-screen flex flex-col antialiased")}
      >
        <ThemeScript />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-preference');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}