import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./EnergyConverterClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/energy-converter", "conversion", "energy-converter");
}



export default function EnergyConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.energyConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('줄(J)과 칼로리(cal)의 관계는 무엇인가요?', 'What is the relationship between joules (J) and calories (cal)?'),
      a: L('1칼로리(cal)는 약 4.184줄(J)입니다. 즉 1kcal = 1,000cal = 4,184J = 4.184kJ입니다. 반대로 1J는 약 0.239cal입니다.', 'One calorie (cal) is about 4.184 joules (J). So 1 kcal = 1,000 cal = 4,184 J = 4.184 kJ. Conversely, 1 J is about 0.239 cal.'),
    },
    {
      q: L('kWh는 무엇을 의미하나요?', 'What does kWh mean?'),
      a: L('kWh는 킬로와트시로, 1,000W(1kW) 전력 기기를 1시간 동안 사용했을 때 소비하는 에너지량입니다. 1kWh = 3,600,000J = 3.6MJ이며, 전기요금 계산에 주로 사용됩니다.', 'kWh (kilowatt-hour) is the energy consumed by a 1,000 W (1 kW) device running for 1 hour. 1 kWh = 3,600,000 J = 3.6 MJ, and it is commonly used for electricity billing.'),
    },
    {
      q: L('음식 칼로리(kcal)와 물리학의 칼로리(cal)는 다른가요?', 'Do food calories (kcal) differ from physics calories (cal)?'),
      a: L('음식 라벨의 칼로리는 실제로는 킬로칼로리(kcal)입니다. 1음식 칼로리 = 1kcal = 1,000cal입니다. 따라서 음식 에너지를 줄로 환산하면 1kcal = 약 4,184J입니다.', 'Food labels use kilocalories (kcal). One food calorie = 1 kcal = 1,000 cal. So converting food energy to joules, 1 kcal = about 4,184 J.'),
    },
    {
      q: L('와트(W)와 줄(J)의 차이는 무엇인가요?', 'What is the difference between a watt (W) and a joule (J)?'),
      a: L('와트는 전력(단위 시간당 에너지)의 단위이고, 줄은 에너지(일)의 단위입니다. 1W = 1J/s이므로, W에 시간을 곱하면 에너지(J 또는 Wh)가 됩니다.', 'A watt measures power (energy per unit time), while a joule measures energy (work). 1 W = 1 J/s, so multiplying watts by time gives energy in J or Wh.'),
    },
    {
      q: L('에너지 단위 변환 계수는 무엇인가요?', 'What are the conversion factors between energy units?'),
      a: L('주요 변환 계수는 1kcal = 4,184J, 1cal = 4.184J, 1Wh = 3,600J, 1kWh = 3.6MJ, 1BTU ≈ 1,055.06J입니다. 이 계수들을 이용해 어떤 단위든 서로 변환할 수 있습니다.', 'Key conversion factors are 1 kcal = 4,184 J, 1 cal = 4.184 J, 1 Wh = 3,600 J, 1 kWh = 3.6 MJ, and 1 BTU ≈ 1,055.06 J. Using these, any unit can be converted to another.'),
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
          { term: t.glossary[2].term, desc: t.glossary[2].desc },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center space-y-1">
            <BlockMath math="1\,\text{kcal} = 4{,}184\,\text{J} = 4.184\,\text{kJ}" />
            <BlockMath math="1\,\text{cal} = 4.184\,\text{J}" />
            <BlockMath math="1\,\text{Wh} = 3{,}600\,\text{J}" />
            <BlockMath math="1\,\text{kWh} = 3{,}600{,}000\,\text{J} = 3.6\,\text{MJ}" />
            <BlockMath math="1\,\text{BTU} = 1{,}055.06\,\text{J}" />
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
          <li>{L('입력 단위를 선택하세요 (J, kJ, kcal, Wh, kWh).', 'Choose the input unit (J, kJ, kcal, Wh, kWh).')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value to convert.')}</li>
          <li>{L('출력 단위를 선택하세요.', 'Choose the output unit.')}</li>
          <li>{L('변환 버튼을 누르면 결과가 표시됩니다.', 'Press convert to see the result.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1kWh 변환', '1 kWh Conversion')}</h4>
          <p className="text-sm">{L('1kWh = 3.6MJ = 약 860.4kcal입니다.', '1 kWh = 3.6 MJ = approximately 860.4 kcal.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1kcal 변환', '1 kcal Conversion')}</h4>
          <p className="text-sm">{L('1kcal = 4,184J = 4.184kJ입니다.', '1 kcal = 4,184 J = 4.184 kJ.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1,000J 변환', '1,000 J Conversion')}</h4>
          <p className="text-sm">{L('1,000J = 1,000 ÷ 4,184 ≈ 0.239kcal입니다.', '1,000 J = 1,000 ÷ 4,184 ≈ 0.239 kcal.')}</p>
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
