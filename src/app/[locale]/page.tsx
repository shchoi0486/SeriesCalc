import AllCalculators from '@/components/AllCalculators';
import CalculatorSearch from '@/components/calculators/CalculatorSearch';
import CalculatorCategories from '@/components/calculators/CalculatorCategories';
import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import FooterSection from '@/components/sections/FooterSection';
import { Card, CardContent } from "@/components/ui/card";
import CombinedUnitConverter from '@/components/calculators/CombinedUnitConverter';
import AdUnit from '@/components/ads/AdUnit';
import { en } from '@/i18n/dictionaries/en';
import { ko } from '@/i18n/dictionaries/ko';
import { isLocale, type Locale } from '@/i18n/config';

import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : 'en';
  const dict = locale === 'ko' ? ko : en;

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="text-center">
          {/* 애드센스 광고 영역 (슬롯 ID는 .env의 NEXT_PUBLIC_ADSENSE_SLOT_HOME 에서 지정) */}
          <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} className="my-3" minHeight={100} />
          <div className="mt-4 mx-auto">
            <CalculatorSearch />
          </div>
        </section>

        <section className="text-center">
          <p className="mt-2 text-base leading-7 text-muted-foreground">
            {locale === 'ko'
              ? '회원가입 없이 즉시 사용할 수 있으며, 입력하신 값은 브라우저 내에서만 처리되어 개인정보가 안전하게 보호됩니다.'
              : 'No sign-up required — your inputs are processed privately in your browser, keeping your data safe.'}
          </p>
        </section>

        <AllCalculators />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8 items-stretch">
          <div className="lg:col-span-3 h-full">
            <CombinedUnitConverter />
          </div>
          <div className="lg:col-span-2">
            <ScientificCalculator />
          </div>
        </div>
        <CalculatorCategories />

      </div>
      <FooterSection dict={dict} locale={locale} />
    </>
  );
}
