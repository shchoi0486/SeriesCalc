import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import { BlockMath } from "react-katex";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./CompoundInterestClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/compound-interest", "finance", "compound-interest");
}



export default function CompoundInterestPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.compoundInterest;

  const infoSection = {
    calculatorDescription: (
      <>
        <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
          <TermGlossary items={[
            { term: isKo ? '복리 (Compound Interest)' : 'Compound Interest', desc: isKo ? '이자가 원금에 더해져 다음 기간의 이자 계산에 포함되는 방식으로, 시간이 지날수록 자산이 눈덩이처럼 불어납니다.' : 'Interest added to the principal so it earns interest in the next period; assets snowball and grow over time.' },
            { term: isKo ? '단리 (Simple Interest)' : 'Simple Interest', desc: isKo ? '처음 투자한 원금에 대해서만 이자를 계산하는 방식으로, 복리에 비해 동일 조건에서 최종 수령액이 적습니다.' : 'Interest calculated only on the initially invested principal; yields less than compound interest under the same conditions.' },
            { term: isKo ? '72의 법칙' : "The Rule of 72", desc: isKo ? '원금이 2배가 되는 데 걸리는 대략적인 기간(년)을 구하는 공식으로, 72를 연이율(%)로 나누면 됩니다.' : 'A formula to estimate the approximate years for principal to double: divide 72 by the annual interest rate (%).' },
          ]} />
      </>
    ),
    calculationFormula: (
      <>
        <div className="p-4 mb-4 bg-muted rounded-lg text-center">
          <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? 'P: 원금, r: 연 이자율, n: 연간 복리 횟수, t: 투자 기간(년)' : 'P: principal, r: annual rate, n: compounds per year, t: years'}</p>
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
