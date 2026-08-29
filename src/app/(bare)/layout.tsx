import Script from "next/script";
import "../globals.css";
import Providers from "../providers";
import Layout from "@/components/layout/Layout";
import { Toaster } from "sonner";
import SiteStructuredData from "@/components/seo/SiteStructuredData";
import CookieConsent from "@/components/layout/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DRNNY830QB";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-7279511347629270";

const EEA_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES',
  'SE', 'IS', 'LI', 'NO', 'GB',
];

export default function BareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-scroll">
      <head>
        <Script
          id="consent-mode-v2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500},{'region':[${EEA_REGIONS.map((r) => `'${r}'`).join(',')}]});`,
          }}
        />
        <Script
          id="ga4-loader"
          strategy="beforeInteractive"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="ga4-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}');`,
          }}
        />
        <Script
          id="adsense-script"
          strategy="beforeInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`antialiased`} suppressHydrationWarning={true}>
        <SiteStructuredData />
        <Providers>
          <Layout>{children}</Layout>
          <CookieConsent locale="en" />
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
