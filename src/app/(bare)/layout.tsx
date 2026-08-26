import Script from "next/script";
import "../globals.css";
import Providers from "../providers";
import Layout from "@/components/layout/Layout";
import { Toaster } from "sonner";

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
            __html:
              "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500});",
          }}
        />
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
          <Layout>{children}</Layout>
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
