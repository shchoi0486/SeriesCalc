import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./EarlyRepaymentFeeClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/early-repayment-fee", "finance", "early-repayment-fee");
}



export default function EarlyRepaymentFeePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.earlyRepaymentFee;

  const infoSection = {
    calculatorDescription: (
      <>
        <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
          <TermGlossary items={[
            { term: isKo ? '중도상환수수료' : 'Early Repayment Fee', desc: isKo ? '약정된 대출 기간을 채우지 못하고 원금을 미리 갚을 때 금융기관에 내는 위약금 성격의 수수료입니다.' : 'A penalty-type fee charged by the lender when principal is repaid before the agreed loan term ends.' },
            { term: isKo ? '슬라이딩 방식' : 'Sliding Scale', desc: isKo ? '대출 만기와 가까워질수록 수수료 부담이 점차 줄어드는 계산 방식으로, 보통 실행 후 3년이 지나면 면제됩니다.' : 'A calculation method where the fee burden gradually decreases as the loan maturity approaches; usually waived after 3 years.' },
          ]} />
      </>
    ),
    calculationFormula: (
      <div dangerouslySetInnerHTML={{ __html: t.formulaContent }} />
    ),
    usefulTips: (
      <div dangerouslySetInnerHTML={{ __html: t.tipsContent }} />
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
