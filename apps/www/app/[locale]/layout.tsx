import CustomCursor from "@/components/custom-cursor";
import { InitialLoader } from "@/components/initial-loader";
import { Providers } from "@/components/providers";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
        className={cn("min-h-screen flex flex-col antialiased", inter.variable, outfit.variable)}
      >
        <NextIntlClientProvider>
          <Providers>
            <SmoothScrollProvider>
              <InitialLoader />
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
                <div id="main-content">
                  {children}
                </div>
              </ThemeProvider>
            </SmoothScrollProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}