"use client";

import { usePathname } from "next/navigation";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://seriescalc.com").replace(/\/$/, "");

// ko/en 동일 콘텐츠의 중복 판정을 막기 위해 canonical + hreflang을 출력.
// 클라이언트 컴포넌트로 둬서 정적 생성(SSG)을 유지한다.
export default function HrefLangTags() {
  const pathname = usePathname() || "/ko";
  const match = pathname.match(/^\/(ko|en)(\/.*)?$/);
  const locale = match?.[1] ?? "ko";
  const rest = match?.[2] ?? "";

  const ko = `${SITE_URL}/ko${rest}`;
  const en = `${SITE_URL}/en${rest}`;
  const canonical = `${SITE_URL}/${locale}${rest}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ko-kr" href={ko} />
      <link rel="alternate" hrefLang="en-us" href={en} />
      <link rel="alternate" hrefLang="x-default" href={en} />
    </>
  );
}
