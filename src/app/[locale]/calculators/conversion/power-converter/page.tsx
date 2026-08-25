import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./PowerConverterClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/power-converter", "conversion", "power-converter");
}



export default function PowerConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.powerConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('와트(W)란 무엇인가요?', 'What is a watt (W)?'),
      a: L('와트는 전력의 국제단위(SI)로, 1초 동안 1줄(J)의 에너지가 전달되거나 변환되는 속도를 나타냅니다. 즉, 단위 시간당 소비되거나 생산되는 에너지의 양입니다.', 'A watt is the SI unit of power, representing the rate at which one joule (J) of energy is transferred or converted per second. It measures the amount of energy consumed or produced per unit of time.'),
    },
    {
      q: L('마력(hp)에도 종류가 있나요?', 'Are there different types of horsepower (hp)?'),
      a: L('네. 미터법 마력(PS)은 약 735.5W이고, 영국식/미국식 마력(hp)은 약 745.7W입니다. 두 값이 조금 달라서, 사용하는 지역이나 기준에 따라 변환 결과가 달라질 수 있습니다.', 'Yes. Metric horsepower (PS) is about 735.5 W, while imperial/US horsepower (hp) is about 745.7 W. Because the two values differ slightly, conversion results can vary depending on the region or standard used.'),
    },
    {
      q: L('kW를 hp로 어떻게 변환하나요?', 'How do I convert kW to hp?'),
      a: L('1kW는 약 1.341hp입니다. kW 값에 1.341을 곱하면 대략적인 마력 값을 얻을 수 있습니다. 예를 들어 2.5kW는 약 3.35hp입니다.', '1 kW is approximately 1.341 hp. Multiply the kW value by 1.341 to get an approximate horsepower value. For example, 2.5 kW is about 3.35 hp.'),
    },
    {
      q: L('가전제품에 왜 W 단위가 표시되나요?', 'Why do appliances list their power in watts?'),
      a: L('가전제품의 소비전력(W)은 제품이 얼마나 많은 전력을 사용하는지를 나타내며, 전기요금 계산과 전력용량 계획에 중요합니다. W와 사용시간을 곱하면 kWh 단위의 에너지 사용량을 알 수 있습니다.', 'The power rating in watts shows how much electricity an appliance uses, which matters for estimating electricity bills and planning electrical capacity. Multiplying watts by usage time gives energy consumption in kWh.'),
    },
    {
      q: L('전력(power)과 에너지(energy)의 차이는 무엇인가요?', 'What is the difference between power and energy?'),
      a: L('전력은 단위 시간당 에너지의 흐름(속도)을 나타내며 단위는 W(와트)입니다. 에너지는 총 사용량을 나타내며 단위는 Wh 또는 kWh입니다. 예를 들어 1000W 기기를 1시간 사용하면 1kWh의 에너지를 소비합니다.', 'Power is the rate of energy flow per unit time, measured in watts (W). Energy is the total amount used, measured in Wh or kWh. For example, using a 1000 W device for 1 hour consumes 1 kWh of energy.'),
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
            <BlockMath math="1\,\text{kW} = 1{,}000\,\text{W}" />
            <BlockMath math="1\,\text{MW} = 1{,}000\,\text{kW} = 1{,}000{,}000\,\text{W}" />
            <BlockMath math="1\,\text{hp(mech)} = 745.7\,\text{W}" />
            <BlockMath math="1\,\text{BTU/h} = 0.293071\,\text{W}" />
            <BlockMath math="1\,\text{kW} \approx 1.341\,\text{hp}" />
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
          <li>{L('입력 단위를 선택하세요 (W, kW, hp).', 'Choose the input unit (W, kW, hp).')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value you want to convert.')}</li>
          <li>{L('출력 단위를 선택하세요.', 'Choose the output unit.')}</li>
          <li>{L('변환 버튼을 누르면 결과가 즉시 표시됩니다.', 'Press convert and the result is displayed instantly.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1kW 변환', '1 kW Conversion')}</h4>
          <p className="text-sm">{L('1kW = 1,000W = 약 1.341hp입니다.', '1 kW = 1,000 W = approximately 1.341 hp.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('1hp 변환', '1 hp Conversion')}</h4>
          <p className="text-sm">{L('1hp(영국식) = 약 745.7W입니다.', '1 hp (imperial) = approximately 745.7 W.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('2.5kW 변환', '2.5 kW Conversion')}</h4>
          <p className="text-sm">{L('2.5kW = 약 3.35hp입니다.', '2.5 kW = approximately 3.35 hp.')}</p>
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
