import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./TimezoneConverterClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/timezone-converter", "conversion", "timezone-converter");
}



export default function TimezoneConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.timezoneConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('UTC와 GMT는 같은 것인가요?', 'Are UTC and GMT the same?'),
      a: L('UTC(협정 세계시)와 GMT(그리니치 평균시)는 거의 동일한 기준 시간대입니다. 다만 GMT는 천문 관측에 기반한 전통적인 용어이고, UTC는 원자시계에 기반한 현대적인 표준입니다.', 'UTC (Coordinated Universal Time) and GMT (Greenwich Mean Time) refer to nearly the same base time zone. However, GMT is a traditional term based on astronomical observation, while UTC is the modern standard based on atomic clocks.'),
    },
    {
      q: L('일광 절약 시간(DST)은 어떻게 처리되나요?', 'How is daylight saving time (DST) handled?'),
      a: L('일부 지역은 여름철에 시계를 앞당기는 DST를 적용합니다. 이 도구는 선택한 시간대의 현재 DST 상태를 반영하여 변환하므로, 계절에 따라 결과가 달라질 수 있습니다.', 'Some regions shift their clocks forward in summer for DST. This tool reflects the current DST status of the selected time zones, so results may change depending on the season.'),
    },
    {
      q: L('UTC 오프셋과 실제 시간대의 차이는 무엇인가요?', 'What is the difference between a UTC offset and an actual time zone?'),
      a: L('UTC 오프셋은 단순히 UTC와의 시차를 나타내며 DST를 고려하지 않습니다. 실제 시간대(예: KST, EST)는 해당 지역의 표준시와 DST 규칙까지 포함한 완전한 규칙을 정의합니다.', 'A UTC offset is simply the time difference from UTC and does not account for DST. An actual time zone (e.g., KST, EST) defines complete rules, including standard time and DST changes for a region.'),
    },
    {
      q: L('시간대가 다른 지역과 회의 일정을 어떻게 잡나요?', 'How do I schedule meetings across time zones?'),
      a: L('먼저 양쪽 지역의 시간대 오프셋을 비교해 시차를 계산한 뒤, 서로의 업무 시간(보통 9시~18시)이 겹치는 시간대를 찾으세요. 이 도구로 한 지역의 시간을 다른 지역의 시간으로 변환해 확인할 수 있습니다.', 'First compare the time zone offsets to find the difference, then look for a window where both regions\' working hours (typically 9 AM to 6 PM) overlap. Use this tool to convert a time in one region to the other.'),
    },
    {
      q: L('일부 시간대는 왜 30분 단위로 오프셋이 있나요?', 'Why do some time zones have 30-minute offsets?'),
      a: L('일부 국가는 정치적·지리적 이유로 정시(hour)가 아닌 30분 또는 45분 단위의 오프셋을 사용합니다. 예를 들어 인도(IST)는 UTC+5:30으로, 네팔은 UTC+5:45입니다.', 'Some countries use 30-minute or 45-minute offsets for political or geographical reasons rather than whole hours. For example, India (IST) is UTC+5:30 and Nepal is UTC+5:45.'),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{t.calculatorDescription.p1}</strong>
        </p>
        <p>
          {t.calculatorDescription.p2}
        </p>
        <p>
          {t.calculatorDescription.p3}
        </p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {t.calculatorDescription.note}
        </p>
        <TermGlossary items={[
          { term: t.glossary[0].term, desc: t.glossary[0].desc },
          { term: t.glossary[1].term, desc: t.glossary[1].desc },
          { term: t.glossary[2].term, desc: t.glossary[2].desc },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{t.formulaTitle}</h4>
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="text-center font-mono text-sm">{t.formulaExample}</p>
            <div className="mt-4 text-sm space-y-1">
              <p className="text-center font-mono text-xs">{t.formulaResult}</p>
            </div>
          </div>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg text-sm">
          <strong>{t.calculatorDescription.note}</strong>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{t.tips.title1}</h4>
          <ul className="space-y-3">
            {t.tips.items1.map((item, i) => (
              <li key={i} className="p-3 bg-muted rounded-lg border-l-4 border-primary">
                <p className="text-sm">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{t.tips.title2}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items2.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('시간대 A를 선택하세요.', 'Select timezone A.')}</li>
          <li>{L('시간대 B를 선택하세요.', 'Select timezone B.')}</li>
          <li>{L('변환할 시간을 입력하세요.', 'Enter the time you want to convert.')}</li>
          <li>{L('두 시간대에서의 변환된 시간이 함께 표시됩니다.', 'See the converted time shown in both time zones.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('KST → UTC', 'KST → UTC')}</h4>
          <p className="text-sm">{L('한국 표준시 9:00 (UTC+9)는 UTC 기준 0:00입니다.', '9:00 KST (UTC+9) is 0:00 UTC.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('EST → KST', 'EST → KST')}</h4>
          <p className="text-sm">{L('미국 동부 표준시 14:00 (UTC-5)는 다음 날 한국 시간 4:00입니다.', '14:00 EST (UTC-5) is 4:00 KST the next day.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
