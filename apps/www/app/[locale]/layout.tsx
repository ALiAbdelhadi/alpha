import { InitialLoader } from "@/components/initial-loader";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { BackgroundShader } from "@/components/background-shader";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from "next/navigation";
import "../globals.css";
import { Suspense } from "react";
import CustomCursor from "@/components/custom-cursor";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body
        suppressHydrationWarning
        className={cn("min-h-screen flex flex-col antialiased")}
      >
        <NextIntlClientProvider>
          <InitialLoader />
          <Providers>
            <ThemeScript />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>
              <BackgroundShader />
              <div id="main-content">
                {children}
              </div>
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}