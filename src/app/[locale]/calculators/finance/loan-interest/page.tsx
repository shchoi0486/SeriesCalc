import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./LoanInterestClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/loan-interest", "finance", "loan-interest");
}



export default function LoanInterestPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.loanInterest;

  const infoSection = {
    calculatorDescription: (
      <>
        <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
        <TermGlossary items={[
          { term: t.tabs.equalPayment, desc: t.glossary.equalPayment },
          { term: t.tabs.equalPrincipal, desc: t.glossary.equalPrincipal },
          { term: t.tabs.bulletLoan, desc: t.glossary.bulletLoan },
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
