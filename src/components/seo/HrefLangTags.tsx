"use client";

import { usePathname } from "next/navigation";
import { locales, localeMeta, defaultLocale } from "@/i18n/config";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://seriescalc.com").replace(/\/$/, "");

// 각 언어 동일 콘텐츠의 중복 판정을 막기 위해 canonical + hreflang을 출력.
// locales/config.localeMeta 에서 자동 생성되므로 새 언어 추가 시 코드 수정 불필요.
// 클라이언트 컴포넌트로 둬서 정적 생성(SSG)을 유지한다.
export default function HrefLangTags() {
  const pathname = usePathname() || `/${defaultLocale}`;
  const match = pathname.match(/^\/(en|ko)(\/.*)?$/);
  const locale = (match?.[1] as (typeof locales)[number]) ?? defaultLocale;
  const rest = match?.[2] ?? "";

  const canonical = `${SITE_URL}/${locale}${rest}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
      {locales.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={localeMeta[l].hrefLang}
          href={`${SITE_URL}/${l}${rest}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/${defaultLocale}${rest}`} />
    </>
  );
}
