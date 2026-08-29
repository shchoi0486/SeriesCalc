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
import SiteStructuredData from "@/components/seo/SiteStructuredData";
import HrefLangTags from "@/components/seo/HrefLangTags";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://seriescalc.com").replace(/\/$/, "");
  const isKo = locale === "ko";
  const title = isKo
    ? "SeriesCalc - 공학·금융·생활 계산기 모음"
    : "SeriesCalc - Engineering, Finance & Life Calculators";
  const description = isKo
    ? "SeriesCalc는 공학, 금융, 생활, 단위 변환 등 350여 개의 계산기를 한곳에서 제공합니다."
    : "SeriesCalc provides 350+ calculators for engineering, finance, life, and unit conversion in one place.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | SeriesCalc`,
    },
    description,
    applicationName: "SeriesCalc",
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: "SeriesCalc",
      title,
      description,
      locale: isKo ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
        <meta name="naver-site-verification" content="f8b1fc72e9049871a46d76d6a9865fcf400cd9a4" />
        <meta name="google-site-verification" content="Sh-CbQLycbp5kg8gDPE2Cz9TjIbrEvVXNbhDI_xnCwA" />
        <HrefLangTags />
        <Script
          id="consent-mode-v2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500});",
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            id="ga4-loader"
            strategy="beforeInteractive"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            id="ga4-config"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
            }}
          />
        )}
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
        <SiteStructuredData locale={locale} />
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
