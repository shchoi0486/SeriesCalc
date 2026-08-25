import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./CurrencyConverterClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/currency-converter", "conversion", "currency-converter");
}



export default function CurrencyConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.currencyConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('환율은 어디에서 가져오며 얼마나 자주 갱신되나요?', 'Where does the exchange rate come from and how often is it updated?'),
      a: L('이 계산기는 참고용 환율을 사용합니다. 실제 시장 환율은 경제 상황, 금리, 수급 등 다양한 요인으로 실시간으로 변동되므로, 실제 거래 전에는 은행이나 금융기관이 제공하는 최신 환율을 확인하세요.', 'This calculator uses reference exchange rates. Real market rates fluctuate in real time due to factors such as economic conditions, interest rates, and supply and demand, so check the latest rate from a bank or financial institution before an actual transaction.'),
    },
    {
      q: L('환율이 고정값인가요, 실시간인가요?', 'Is the exchange rate static or live?'),
      a: L('이 계산기의 환율은 예시용 고정값입니다. 실시간 시장 환율을 반영하지 않으므로, 변환 결과는 대략적인 참고용으로만 사용해 주세요.', 'The rates in this calculator are static sample values. They do not reflect real-time market rates, so the conversion result should only be used as an approximate reference.'),
    },
    {
      q: L('반대 방향 환율은 어떻게 구하나요?', 'How do I get the inverse exchange rate?'),
      a: L('반대 방향 환율은 1을 원래 환율로 나누면 됩니다. 예를 들어 1 USD = 1,350 KRW라면 1 KRW = 1 / 1,350 ≈ 0.00074 USD입니다.', 'Divide 1 by the original rate to get the inverse. For example, if 1 USD = 1,350 KRW, then 1 KRW = 1 / 1,350 ≈ 0.00074 USD.'),
    },
    {
      q: L('통화 기호(₩, $, €)는 어떻게 표시되나요?', 'How are currency symbols (₩, $, €) shown?'),
      a: L('국제적으로 통용되는 통화 코드(예: KRW, USD, EUR)와 기호가 함께 사용됩니다. KRW(원화)는 ₩, USD(달러)는 $, EUR(유로)는 € 기호로 표시되며, 지역에 따라 표기 방식이 다를 수 있습니다.', 'Internationally recognized currency codes (e.g., KRW, USD, EUR) are used together with symbols. KRW uses ₩, USD uses $, and EUR uses €, though notation can vary by region.'),
    },
    {
      q: L('은행 환율과 왜 다른가요?', 'Why does the result differ from the bank rate?'),
      a: L('은행은 매매 기준율, 환전 수수료, 송금 수수료 등이 반영된 환율을 적용합니다. 이 계산기는 중간 기준 환율(참고용)만 사용하므로 실제 은행 환율과 차이가 있을 수 있습니다.', 'Banks apply rates that include the base trading rate, exchange commissions, and transfer fees. This calculator only uses a mid-market reference rate, so it can differ from the actual bank rate.'),
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
          <li>{L('변환할 통화(출발 통화)를 선택하세요 (예: USD).', 'Select the source currency you want to convert from (e.g., USD).')}</li>
          <li>{L('변환 후의 통화(도착 통화)를 선택하세요 (예: KRW).', 'Select the target currency you want to convert to (e.g., KRW).')}</li>
          <li>{L('변환할 금액을 입력하세요.', 'Enter the amount to convert.')}</li>
          <li>{L('변환 버튼을 누르면 결과가 표시됩니다. 환율은 참고용 고정값일 수 있습니다.', 'Press convert to see the result. Note that rates may be static sample values.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('USD → KRW 변환', 'USD → KRW Conversion')}</h4>
          <p className="text-sm">{L('환율 1 USD = 1,350 KRW일 때, 100 USD는 100 × 1,350 = 135,000 KRW입니다.', 'At an exchange rate of 1 USD = 1,350 KRW, 100 USD equals 100 × 1,350 = 135,000 KRW.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('KRW → USD 변환', 'KRW → USD Conversion')}</h4>
          <p className="text-sm">{L('환율 1 USD = 1,350 KRW일 때, 1,000,000 KRW는 1,000,000 ÷ 1,350 ≈ 740.74 USD입니다.', 'At an exchange rate of 1 USD = 1,350 KRW, 1,000,000 KRW equals 1,000,000 ÷ 1,350 ≈ 740.74 USD.')}</p>
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
