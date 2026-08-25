import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./KoreanClothingSizeConverterClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/korean-clothing-size-converter", "conversion", "korean-clothing-size-converter");
}



const refTable = [
  { kr: 85, chest: '80~85', waist: '65~70', us: 'XS', eu: '38' },
  { kr: 90, chest: '85~90', waist: '70~75', us: 'S', eu: '40' },
  { kr: 95, chest: '90~95', waist: '75~80', us: 'M', eu: '42' },
  { kr: 100, chest: '95~100', waist: '80~85', us: 'L', eu: '44' },
  { kr: 105, chest: '100~105', waist: '85~90', us: 'XL', eu: '46' },
  { kr: 110, chest: '105~110', waist: '90~95', us: 'XXL', eu: '48' },
  { kr: 115, chest: '110~115', waist: '95~100', us: '3XL', eu: '50' },
  { kr: 120, chest: '115~120', waist: '100~105', us: '4XL', eu: '52' },
];

export default function KoreanClothingSizeConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('한국 의류 사이즈 숫자 체계는 어떻게 되나요?', 'How does the Korean clothing size numbering system work?'),
      a: L('한국 의류 사이즈는 가슴둘레(cm)를 기준으로 85에서 120까지 5단위로 표시됩니다. 예를 들어 100호는 가슴둘레 약 95~100cm에 해당합니다.', 'Korean clothing sizes are based on chest circumference (cm) and range from 85 to 120 in increments of 5. For example, size 100 corresponds to a chest of about 95~100 cm.'),
    },
    {
      q: L('정확한 사이즈를 위해 어떻게 측정하나요?', 'How do I measure myself for accurate sizing?'),
      a: L('상의는 가슴둘레를, 하의는 허리둘레와 엉덩이둘레를 줄자로 측정하세요. 측정 시 몸에 밀착되지 않게 여유를 두고, 측정값을 사이즈표와 비교해 선택하는 것이 좋습니다.', 'Measure chest circumference for tops, and waist and hip circumference for bottoms with a tape measure. Leave a little slack rather than pulling tight, then compare your measurements to the size chart.'),
    },
    {
      q: L('상의와 하의 사이즈 변환이 다른가요?', 'Do top and bottom size conversions differ?'),
      a: L('네. 상의 사이즈는 가슴둘레를 기준으로 하고, 하의 사이즈는 허리둘레를 기준으로 합니다. 따라서 같은 숫자(예: 100)라도 상의와 하의가 나타내는 신체 치수가 다를 수 있습니다.', 'Yes. Top sizes are based on chest circumference while bottom sizes are based on waist circumference. So the same number (e.g., 100) can represent different body measurements for tops versus bottoms.'),
    },
    {
      q: L('한국 의류 사이즈가 작게 나오는 이유는 무엇인가요?', 'Why do Korean clothing sizes run smaller?'),
      a: L('한국 사이즈는 가슴둘레 기준의 타이트한 핏 체계를 따르는 경우가 많고, 브랜드마다 여유분이 달라 미국이나 유럽 사이즈보다 작게 느껴질 수 있습니다. 구매 전 브랜드의 사이즈표를 반드시 확인하세요.', 'Korean sizes often follow a tighter fit based on chest circumference, and allowances vary by brand, so they can feel smaller than US or European sizes. Always check the brand\'s size chart before buying.'),
    },
    {
      q: L('남녀공용과 성별 구분 사이즈는 어떻게 다른가요?', 'How do unisex and gender-specific sizing differ?'),
      a: L('남녀공용(유니섹스) 사이즈는 주로 가슴둘레와 체형의 중간값을 기준으로 합니다. 여성 의류는 브랜드마다 사이즈 차이가 크고, 남성 의류는 비교적 표준화되어 있습니다. 성별에 따라 동일 숫자라도 실제 착용감이 다를 수 있습니다.', 'Unisex sizes are based on a middle value of chest circumference and body shape. Women\'s clothing varies greatly between brands, while men\'s clothing is relatively standardized. The same number can fit differently depending on gender.'),
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
          <strong>{L('한국 의류 사이즈 변환기', 'Korean Clothing Size Converter')}</strong>{L('는 한국 의류 사이즈(95, 100, 105...)를 미국(S, M, L...) 및 유럽 사이즈로 변환하는 도구입니다.', ' converts Korean clothing sizes (95, 100, 105...) to US (S, M, L...) and European sizes.')}
        </p>
        <p>
          {L('한국 의류 사이즈는 가슴둘레를 기준으로 합니다. 예를 들어, 100호는 가슴둘레 약 95~100cm를 의미합니다.', 'Korean clothing sizes are based on chest circumference. For example, size 100 means a chest circumference of about 95~100cm.')}
        </p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('해외 브랜드의 사이즈는 한국 사이즈와 차이가 있을 수 있으므로, 구매 전 반드시 사이즈표를 확인하세요.', 'Overseas brand sizes may differ from Korean sizes, so always check the size chart before purchasing.')}
        </p>
        <TermGlossary items={[
          { term: L('한국 의류 사이즈', 'Korean Clothing Size'), desc: L('가슴둘레(cm)를 기반으로 한 사이즈 시스템입니다. 85, 90, 95, 100, 105, 110 등으로 표시됩니다.', 'A size system based on chest circumference (cm). Shown as 85, 90, 95, 100, 105, 110, etc.') },
          { term: L('미국 의류 사이즈', 'US Clothing Size'), desc: L('XS, S, M, L, XL, XXL 같은 영문 레터 시스템을 사용합니다.', 'Uses letter-based systems like XS, S, M, L, XL, XXL.') },
          { term: L('유럽 의류 사이즈', 'EU Clothing Size'), desc: L('숫자 기반 시스템으로, 한국 사이즈보다 약 45~55 정도 큰 숫자를 사용합니다.', 'A numeric system that uses numbers approximately 45~55 larger than Korean sizes.') },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('한국 사이즈 체계', 'Korean Size System')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-2">
            <p className="font-mono text-sm text-center">한국 사이즈 = 가슴둘레(cm) 기준</p>
            <p className="text-xs text-muted-foreground text-center">{L('100호 = 가슴둘레 약 95~100cm', 'Size 100 = chest ~95~100cm')}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('대조표', 'Comparison Table')}</h4>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-2 text-left">KR</th>
                  <th className="p-2 text-left">US</th>
                  <th className="p-2 text-left">EU</th>
                  <th className="p-2 text-left">{L('가슴(cm)', 'Chest(cm)')}</th>
                  <th className="p-2 text-left">{L('허리(cm)', 'Waist(cm)')}</th>
                </tr>
              </thead>
              <tbody>
                {refTable.map(row => (
                  <tr key={row.kr} className="border-b border-border/50">
                    <td className="p-2 font-mono">{row.kr}호</td>
                    <td className="p-2">{row.us}</td>
                    <td className="p-2 font-mono">{row.eu}</td>
                    <td className="p-2 font-mono">{row.chest}</td>
                    <td className="p-2 font-mono">{row.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('의류 사이즈 선택 요령', 'Clothing Size Selection Tips')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{L('상의: 가슴둘레를 기준으로 선택합니다. 정 사이즈를 추천합니다.', 'Upper body: Choose based on chest circumference. True-to-size is recommended.')}</li>
            <li>{L('하의: 허리둘레와 엉덩이둘레를 함께 고려합니다.', 'Lower body: Consider both waist and hip circumference.')}</li>
            <li>{L('핏에 따라 사이즈가 달라집니다. 슬림핏은 정 사이즈, 레귤러핏은 약간 여유 있게, 루즈핏은 한 사이즈 크게 추천합니다.', 'Sizing varies by fit. Slim fit: true to size; Regular fit: slightly loose; Loose fit: one size up.')}</li>
            <li>{L('여성 의류는 브랜드마다 사이즈가 크게 다를 수 있습니다.', "Women's clothing sizes can vary greatly between brands.")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('해외 직구 시 사이즈 참고', 'Size Reference for International Shopping')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>{L('미국:', 'US:')}</strong> {L('한국 사이즈보다 보통 1~2 사이즈 작게 생각하면 됩니다. (100호 → L)', 'Think 1~2 sizes smaller than Korean size. (100 → L)')}</li>
            <li><strong>{L('유럽:', 'EU:')}</strong> {L('한국 사이즈 + 45~50 정도가 EU 사이즈입니다. (100호 → EU 44~45)', 'Korean size + 45~50 ≈ EU size. (100 → EU 44~45)')}</li>
            <li><strong>{L('일본:', 'JP:')}</strong> {L('한국과 거의 비슷하지만, 약간 작게 나올 수 있습니다.', 'Similar to Korean sizes, but may run slightly smaller.')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('카테고리를 선택하세요 (상의 또는 하의).', 'Select a category (top or bottom).')}</li>
          <li>{L('한국 의류 사이즈를 선택하세요.', 'Select a Korean clothing size.')}</li>
          <li>{L('미국/유럽/영국 등가 사이즈가 표시됩니다.', 'See the equivalent US/EU/UK sizes.')}</li>
          <li>{L('또는 직접 신체 치수를 입력해 권장 사이즈를 확인할 수 있습니다.', 'Alternatively, input your measurements to check the recommended size.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('상의 95호', 'Top size 95')}</h4>
          <p className="text-sm">{L('한국 상의 95호는 미국 L 사이즈에 해당하며, EU 약 52에 가깝습니다.', 'Korean top size 95 is equivalent to US L, approximately EU 52.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('하의 30', 'Bottom size 30')}</h4>
          <p className="text-sm">{L('한국 하의 30은 허리 30인치(약 76cm)에 해당합니다.', 'Korean bottom size 30 corresponds to a 30-inch (about 76 cm) waist.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('상의 105호', 'Top size 105')}</h4>
          <p className="text-sm">{L('한국 상의 105호는 미국 XL 사이즈에 해당합니다.', 'Korean top size 105 is equivalent to US XL.')}</p>
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
