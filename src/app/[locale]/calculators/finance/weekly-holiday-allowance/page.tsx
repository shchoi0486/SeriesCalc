import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./WeeklyHolidayAllowanceClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/weekly-holiday-allowance", "finance", "weekly-holiday-allowance");
}



export default function WeeklyHolidayAllowancePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.weeklyHoliday;

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <div dangerouslySetInnerHTML={{ __html: t.descriptionContent }} />
          <TermGlossary items={[
            { term: isKo ? '주휴수당' : 'Weekly Holiday Allowance', desc: isKo ? '1주일 소정근로시간을 모두 채운 근로자에게 주 1회 유급 휴일을 보장하고, 그날 일하지 않아도 하루치 임금을 추가로 지급하는 제도입니다.' : 'Guarantees one paid holiday per week to employees who complete their scheduled weekly hours, paying a day’s wage even when not worked.' },
            { term: isKo ? '소정근로시간' : 'Scheduled Working Hours', desc: isKo ? '근로계약서에 명시된 약정 근로시간으로, 주휴수당 발생 여부(주 15시간 이상)와 수당 금액 산정의 기준이 됩니다.' : 'The agreed working hours stated in the labor contract; the basis for whether weekly holiday allowance arises (15+ hrs/week) and how much is paid.' },
          ]} />
      </div>
    ),
    calculationFormula: (
      <div dangerouslySetInnerHTML={{ __html: t.formulaContent }} />
    ),
    usefulTips: (
      <div dangerouslySetInnerHTML={{ __html: t.tipsContent }} />
    )
  };

  return <CalculatorClient infoSection={infoSection} />;
}
