import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./SpeedConverterClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/speed-converter", "conversion", "speed-converter");
}



export default function SpeedConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.speedConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('m/s를 km/h로 어떻게 변환하나요?', 'How do I convert m/s to km/h?'),
      a: L('m/s 값에 3.6을 곱하면 km/h가 됩니다. 예를 들어 10m/s는 36km/h입니다. 반대로 km/h에서 m/s로 바꿀 때는 3.6으로 나눕니다.', 'Multiply the m/s value by 3.6 to get km/h. For example, 10 m/s is 36 km/h. Conversely, divide by 3.6 to convert km/h to m/s.'),
    },
    {
      q: L('노트(knot)란 무엇인가요?', 'What is a knot?'),
      a: L('노트는 항공과 해상에서 사용하는 속도 단위로, 1노트는 1시간에 1해리(nautical mile, 약 1,852m)를 이동하는 속도입니다. 따라서 1노트는 약 1.852km/h입니다.', 'A knot is a speed unit used in aviation and maritime, where 1 knot equals one nautical mile (about 1,852 m) per hour. So 1 knot is about 1.852 km/h.'),
    },
    {
      q: L('mph와 km/h는 어떻게 다른가요?', 'How do mph and km/h differ?'),
      a: L('mph는 마일(mile) 단위로 속도를 나타내며, 미국과 영국 등에서 주로 사용합니다. 1mph는 약 1.609km/h입니다. 반대로 1km/h는 약 0.6214mph입니다.', 'mph measures speed in miles and is mainly used in the US and UK. 1 mph is about 1.609 km/h. Conversely, 1 km/h is about 0.6214 mph.'),
    },
    {
      q: L('음속과 비교하면 어느 정도인가요?', 'How does this compare to the speed of sound?'),
      a: L('해수면에서 음속은 약 1,225km/h(약 340m/s)입니다. 이는 마하 1에 해당하며, 일반 자동차나 비행기의 속도와 비교할 때 매우 빠른 속도입니다.', 'At sea level, the speed of sound is about 1,225 km/h (about 340 m/s), which equals Mach 1. This is very fast compared to typical car or aircraft speeds.'),
    },
    {
      q: L('어디에서 어떤 속도 단위를 사용하나요?', 'Which speed unit is used where?'),
      a: L('항공에서는 국제적으로 노트(knot)를 사용하고, 도로 속도는 미국과 영국에서 mph, 대부분의 다른 국가에서 km/h를 사용합니다. 과학과 공학에서는 m/s를 자주 사용합니다.', 'Aviation uses knots internationally, road speeds use mph in the US and UK, and km/h in most other countries. Science and engineering often use m/s.'),
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
        <p className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          {t.calculatorDescription.note}
        </p>
        <TermGlossary items={[
          { term: t.glossary[0].term, desc: t.glossary[0].desc },
          { term: t.glossary[1].term, desc: t.glossary[1].desc },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center space-y-1">
            <BlockMath math="1\,\text{m/s} = 3.6\,\text{km/h} = 2.2369\,\text{mph}" />
            <BlockMath math="1\,\text{km/h} = 0.2778\,\text{m/s} = 0.6214\,\text{mph}" />
            <BlockMath math="1\,\text{knot} = 1.852\,\text{km/h} = 0.5144\,\text{m/s}" />
            <BlockMath math="1\,\text{ft/s} = 0.3048\,\text{m/s}" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle}</h4>
          <p>{t.formulaExample}</p>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formulaResult}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title1}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items1.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title2}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items2.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title3}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items3.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title4}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items4.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title5}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items5.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title6}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items6.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('입력 단위를 선택하세요 (m/s, km/h, mph, knot).', 'Choose the input unit (m/s, km/h, mph, knot).')}</li>
          <li>{L('변환할 속도 값을 입력하세요.', 'Enter the speed value you want to convert.')}</li>
          <li>{L('출력 단위를 선택하세요.', 'Choose the output unit.')}</li>
          <li>{L('변환 버튼을 누르면 결과가 즉시 표시됩니다.', 'Press convert and the result is displayed instantly.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('100km/h 변환', '100 km/h Conversion')}</h4>
          <p className="text-sm">{L('100km/h = 약 27.78m/s = 약 62.14mph입니다.', '100 km/h = about 27.78 m/s = about 62.14 mph.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1노트 변환', '1 Knot Conversion')}</h4>
          <p className="text-sm">{L('1노트 = 약 1.852km/h입니다.', '1 knot = about 1.852 km/h.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('10m/s 변환', '10 m/s Conversion')}</h4>
          <p className="text-sm">{L('10m/s = 36km/h입니다.', '10 m/s = 36 km/h.')}</p>
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
