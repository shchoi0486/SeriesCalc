import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import { BlockMath } from "react-katex";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./DtiClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/dti", "finance", "dti");
}



export default function DtiPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.dti;

  const infoSection = {
      calculatorDescription: (
        <>
          <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
          <TermGlossary items={[
            { term: isKo ? 'DTI (총부채상환비율)' : 'DTI (Debt-to-Income Ratio)', desc: isKo ? '연소득 대비 주택담보대출 원리금과 기타 부채 이자의 합이 차지하는 비율로, 대출 한도를 결정하는 지표입니다.' : 'The ratio of total annual housing loan principal & interest plus other debt interest to annual income; a key indicator for determining loan limits.' },
            { term: isKo ? 'DSR (총부채원리금상환비율)' : 'DSR (Debt Service Ratio)', desc: isKo ? '연소득 대비 모든 가계대출의 연간 원리금 상환액 비율로, DTI보다 포괄적인 대출 규제 기준입니다.' : 'The ratio of total annual principal & interest repayments on all household loans to annual income; a more comprehensive lending regulation standard than DTI.' },
            { term: isKo ? '스트레스 DSR' : 'Stress DSR', desc: isKo ? '미래 금리 인상 가능성을 반영해 실제 금리에 가산금리를 더해 DSR을 산정하는 제도입니다.' : 'A system that adds a surcharge rate to the actual rate to reflect possible future rate hikes when calculating DSR.' },
          ]} />
        </>
      ),
      calculationFormula: (
        <>
          <div className="p-4 mb-4 bg-muted rounded-lg text-center">
            <BlockMath math={isKo ? "\\text{DTI} = \\frac{\\text{연간 원리금 상환액}}{\\text{연소득}} \\times 100" : "\\text{DTI} = \\frac{\\text{Annual Debt Payments}}{\\text{Annual Income}} \\times 100"} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: t.formulaContent }} />
        </>
      ),
      usefulTips: (
        <div dangerouslySetInnerHTML={{ __html: t.tipsContent }} />
      ),
    };

  return <CalculatorClient infoSection={infoSection} />;
}
