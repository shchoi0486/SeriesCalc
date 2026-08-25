import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import "katex/dist/katex.min.css";
import Providers from "../providers";
import Layout from "@/components/layout/Layout";
import { Toaster } from "sonner";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ko } from "@/i18n/dictionaries/ko";
import { I18nProvider } from "@/i18n/I18nProvider";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allincalc.com"),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale: rawLocale } = params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale || defaultLocale;
  const dict = locale === "ko" ? ko : en;

  return (
    <html lang={locale} suppressHydrationWarning className="overflow-y-scroll">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            id="adsense-script"
            strategy="beforeInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`antialiased`} suppressHydrationWarning={true}>
        <Providers>
          <Layout>
            <I18nProvider locale={locale} dict={dict}>
              {children}
            </I18nProvider>
          </Layout>
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
