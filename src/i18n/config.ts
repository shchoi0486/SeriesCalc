import type { Dictionary } from './dictionaries/en';

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];
export type { Dictionary };

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// 언어 → 단위 체계
export type UnitSystem = 'metric' | 'imperial';

// 단일 소스: 새 언어 추가 시 이 맵에 한 줄만 추가하면 됨
// (이름 / Intl 태그 / OG 로케일 / hreflang / 기본 통화 / 단위 체계)
export const localeMeta: Record<
  Locale,
  {
    name: string;
    intl: string; // Intl.DateTimeFormat 등에 쓰는 BCP-47 태그
    ogLocale: string; // openGraph.locale (언더스코어 표기)
    hrefLang: string; // <link hreflang> 값
    currency: string;
    unitSystem: UnitSystem;
  }
> = {
  en: { name: 'English', intl: 'en-US', ogLocale: 'en_US', hrefLang: 'en-us', currency: 'USD', unitSystem: 'imperial' },
  ko: { name: '한국어', intl: 'ko-KR', ogLocale: 'ko_KR', hrefLang: 'ko-kr', currency: 'KRW', unitSystem: 'metric' },
};

// 하위 호환: LanguageSwitcher 등은 localeNames[l] 형태로 사용
export const localeNames: Record<Locale, string> = Object.fromEntries(
  (locales as readonly Locale[]).map((l) => [l, localeMeta[l].name]),
) as Record<Locale, string>;

export function getUnitSystem(locale: Locale): UnitSystem {
  return localeMeta[locale].unitSystem;
}

export function intlLocale(locale: Locale): string {
  return localeMeta[locale].intl;
}

export function defaultCurrency(locale: Locale): string {
  return localeMeta[locale].currency;
}
