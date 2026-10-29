import AllCalculators from '@/components/AllCalculators';
import CalculatorSearch from '@/components/calculators/CalculatorSearch';
import CalculatorCategories from '@/components/calculators/CalculatorCategories';
import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import FooterSection from '@/components/sections/FooterSection';
import { Card, CardContent } from "@/components/ui/card";
import CombinedUnitConverter from '@/components/calculators/CombinedUnitConverter';
import AdUnit from '@/components/ads/AdUnit';
import Link from 'next/link';
import { en } from '@/i18n/dictionaries/en';
import { ko } from '@/i18n/dictionaries/ko';
import { isLocale, type Locale } from '@/i18n/config';

import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const HOME_FAQ = [
  {
    qKo: 'SeriesCalc는 무료인가요? 회원가입이 필요한가요?',
    qEn: 'Is SeriesCalc free? Do I need an account?',
    aKo: '네, 모든 계산기는 무료이며 회원가입 없이 사용할 수 있습니다. 입력값은 브라우저 안에서만 처리되어 서버에 저장되지 않습니다.',
    aEn: 'Yes — every calculator is free with no account required. Your inputs are processed locally in your browser and never stored on a server.',
  },
  {
    qKo: '계산 결과는 얼마나 정확한가요?',
    qEn: 'How accurate are the results?',
    aKo: '각 계산기는 공식과 가정을 페이지 하단에 공개합니다. 다만 세율·요율 변동, 반올림, 개별 조건 차이로 실제와 다를 수 있어 중요한 결정 전에는 원천 자료를 확인하세요.',
    aEn: 'Each calculator discloses its formulas and assumptions at the bottom of the page. Rates change and individual conditions differ, so verify against primary sources before important decisions.',
  },
  {
    qKo: '어떤 계산기부터 써야 할지 모르겠어요.',
    qEn: 'Where should I start?',
    aKo: '상단 검색창에 단어(예: 연봉, 복리, BMI)를 입력하거나 아래 계산 가이드에서 목적별로 찾아보세요. 자주 쓰는 주제는 가이드 글에 정리되어 있습니다.',
    aEn: 'Type a word (e.g. salary, compound, BMI) in the search box above, or browse the calculation guides below by goal.',
  },
];

const HOME_GUIDES = [
  { slug: 'salary-take-home', ko: '연봉 실수령액 가이드', en: 'Take-Home Pay Guide' },
  { slug: 'dti-dsr', ko: 'DTI·DSR 가이드', en: 'DTI & DSR Guide' },
  { slug: 'deposit-savings', ko: '예금·적금 이자 가이드', en: 'Savings Interest Guide' },
  { slug: 'compound-interest-power', ko: '복리의 힘', en: 'Power of Compound Interest' },
  { slug: 'npsh-cavitation', ko: 'NPSH·캐비테이션 가이드', en: 'NPSH & Cavitation Guide' },
  { slug: 'percentage-mastery', ko: '퍼센트 완전정복', en: 'Percentage Mastery' },
];

export default function Home({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : 'en';
  const dict = locale === 'ko' ? ko : en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: HOME_FAQ.map((f) => ({
              '@type': 'Question',
              name: locale === 'ko' ? f.qKo : f.qEn,
              acceptedAnswer: { '@type': 'Answer', text: locale === 'ko' ? f.aKo : f.aEn },
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />
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

        <section className="max-w-3xl mx-auto rounded-2xl border bg-card p-6 sm:p-8 space-y-4 mt-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {locale === 'ko' ? 'SeriesCalc로 숫자를 결정하는 법' : 'How to decide with SeriesCalc'}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            {locale === 'ko'
              ? 'SeriesCalc는 금융·단위변환·생활·과학·공학·AI도구 180여 종의 계산기를 한곳에 모은 무료 계산 플랫폼입니다. 대출 상환액, 연봉 실수령액, 복리 성장, BMI, 배관 마찰 손실처럼 답이 하나로 정해지지 않는 문제일수록 먼저 수치로 시뮬레이션하고 배경지식을 확인하는 것이 손해를 줄이는 지름길입니다.'
              : 'SeriesCalc is a free platform gathering 180+ calculators across finance, unit conversion, lifestyle, science, engineering and AI tools. For questions with no single answer — loan payments, take-home pay, compound growth, BMI, pipe friction loss — simulating the numbers first and learning the background is the shortcut to fewer costly mistakes.'}
          </p>
          <ul className="space-y-3">
            {[
              { tKo: '목적부터 정하세요', tEn: 'Start from the goal', bKo: '대출 비교인지 예산 파악인지에 따라 볼 지표(월 상환액 vs 총이자)가 달라집니다.', bEn: 'Comparing loans or planning a budget changes which metric matters (monthly payment vs total interest).' },
              { tKo: '조건을 동일하게 맞추세요', tEn: 'Keep conditions identical', bKo: '금리·기간·세금을 통일해야 계산기끼리 비교가 성립합니다.', bEn: 'Comparisons only hold when rate, term and taxes are unified across calculators.' },
              { tKo: '가이드를 함께 읽으세요', tEn: 'Read a guide alongside', bKo: '숫자 뒤의 공식·가정·예외는 아래 계산 가이드에 정리되어 있습니다.', bEn: 'Formulas, assumptions and exceptions behind each number live in the guides below.' },
            ].map((s, i) => (
              <li key={i} className="flex gap-3 text-sm sm:text-base">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{locale === 'ko' ? s.tKo : s.tEn}</p>
                  <p className="mt-0.5 text-muted-foreground">{locale === 'ko' ? s.bKo : s.bEn}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mx-auto mt-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4 text-center">
            {locale === 'ko' ? '계산 가이드' : 'Calculation guides'}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOME_GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/${locale}/guides/${g.slug}`}
                  className="block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-semibold text-foreground">{locale === 'ko' ? g.ko : g.en}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center">
            <Link href={`/${locale}/guides`} className="text-sm font-medium text-primary hover:underline">
              {locale === 'ko' ? '모든 가이드 보기 →' : 'View all guides →'}
            </Link>
          </p>
        </section>

        <section className="max-w-3xl mx-auto rounded-2xl border bg-card p-6 sm:p-8 mt-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4">
            {locale === 'ko' ? '자주 묻는 질문' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-4">
            {HOME_FAQ.map((f, i) => (
              <div key={i}>
                <p className="font-semibold text-foreground text-sm sm:text-base">{locale === 'ko' ? f.qKo : f.qEn}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{locale === 'ko' ? f.aKo : f.aEn}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <FooterSection dict={dict} locale={locale} />
    </>
  );
}
