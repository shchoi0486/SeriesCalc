import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./RetirementClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/retirement", "finance", "retirement");
}



export default function RetirementPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.retirement;

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
          <TermGlossary items={[
            { term: isKo ? '퇴직금' : 'Severance Pay', desc: isKo ? '1년 이상 근무한 근로자가 퇴직할 때 받는 급여로, 1일 평균임금의 30일분에 총 재직일수를 365일로 나눈 값을 곱해 산정합니다.' : 'Pay received by an employee upon retirement after 1+ years, calculated as 30 days of average daily wage times total tenure divided by 365.' },
            { term: isKo ? '1일 평균임금' : 'Average Daily Wage', desc: isKo ? '퇴직 전 3개월 임금 총액(상여금·연차수당 환산 포함)을 그 기간 총 일수로 나눈 금액입니다.' : 'Total wages for the 3 months before retirement (including bonuses and converted annual-leave pay) divided by the total days in that period.' },
            { term: isKo ? 'IRP (개인형 퇴직연금)' : 'IRP (Individual Retirement Pension)', desc: isKo ? '퇴직금을 이전받아 운용하는 계좌로, 과세를 이연하고 절세 혜택을 누릴 수 있습니다.' : 'An account that receives and manages severance pay, allowing tax deferral and tax-saving benefits.' },
          ]} />
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: t.formulaContent }} />
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8" dangerouslySetInnerHTML={{ __html: t.tipsContent }} />
    )
  };

  return <CalculatorClient infoSection={infoSection} />;
}
