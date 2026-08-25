import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./DataSizeConverterClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/data-size-converter", "conversion", "data-size-converter");
}



export default function DataSizeConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.dataSizeConverter;

  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L('2진법(1024)과 10진법(1000)의 차이는 무엇인가요?', 'What is the difference between binary (1024) and decimal (1000)?'),
      a: L('컴퓨터는 2의 거듭제곱을 사용하므로 1KB = 1,024바이트(2진법)로 계산합니다. 반면 하드디스크 제조사 등은 1KB = 1,000바이트(10진법)로 표기하는 경우가 많아, 같은 용량이라도 숫자가 달라질 수 있습니다.', 'Computers use powers of two, so 1 KB = 1,024 bytes (binary). In contrast, storage manufacturers often use 1 KB = 1,000 bytes (decimal), so the same capacity can be shown with different numbers.'),
    },
    {
      q: L('GB와 GiB는 어떻게 다른가요?', 'How do GB and GiB differ?'),
      a: L('GB는 10진법 기준 1,000,000,000바이트이고, GiB는 2진법 기준 1,073,741,824바이트입니다. 1GiB ≈ 1.074GB이며, 운영체제는 주로 GiB 단위를 표시하지만 GB로 부르는 경우가 많습니다.', 'GB is 1,000,000,000 bytes (decimal), while GiB is 1,073,741,824 bytes (binary). 1 GiB ≈ 1.074 GB, and operating systems often display GiB but call it GB.'),
    },
    {
      q: L('저장장치 표시 용량이 광고보다 적은 이유는?', 'Why does storage show less capacity than advertised?'),
      a: L('제조사는 10진법(1GB = 1,000MB)으로 용량을 표기하지만, 운영체제는 2진법(1GB = 1,024MB)으로 계산해 표시하기 때문에 실제 표시 용량이 광고보다 작아 보입니다.', 'Manufacturers list capacity in decimal (1 GB = 1,000 MB), but operating systems calculate and display in binary (1 GB = 1,024 MB), so the displayed capacity appears smaller than advertised.'),
    },
    {
      q: L('비트(bit)와 바이트(byte)의 차이는 무엇인가요?', 'What is the difference between a bit and a byte?'),
      a: L('비트는 정보의 가장 작은 단위로 0 또는 1을 나타내며, 바이트는 8개의 비트로 구성됩니다. 파일 크기는 주로 바이트 단위로 표시하고, 네트워크 속도는 비트 단위(예: Mbps)로 표시하는 경우가 많습니다.', 'A bit is the smallest unit of information representing 0 or 1, and a byte consists of 8 bits. File sizes are usually shown in bytes, while network speeds are often shown in bits (e.g., Mbps).'),
    },
    {
      q: L('데이터 단위 간 변환은 어떻게 하나요?', 'How do I convert between data units?'),
      a: L('더 큰 단위로 갈 때는 1,024로 나누고, 더 작은 단위로 갈 때는 1,024를 곱하면 됩니다. 예를 들어 2,048MB를 GB로 바꾸면 2,048 ÷ 1,024 = 2GB입니다.', 'Divide by 1,024 to go to a larger unit and multiply by 1,024 to go to a smaller unit. For example, 2,048 MB divided by 1,024 equals 2 GB.'),
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
        <p dangerouslySetInnerHTML={{ __html: t.calculatorDescription.p1 }} />
        <p>{t.calculatorDescription.p2}</p>
        <p>{t.calculatorDescription.p3}</p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {t.calculatorDescription.note}
        </p>
        <TermGlossary items={t.glossary} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{t.formulaTitle}</h4>
          <div className="p-4 bg-muted rounded-lg">
            <BlockMath math="1\,\text{KB} = 1{,}024\,\text{Byte}" />
            <BlockMath math="1\,\text{MB} = 1{,}024\,\text{KB} = 1{,}048{,}576\,\text{Byte}" />
            <BlockMath math="1\,\text{GB} = 1{,}024\,\text{MB} = 1{,}073{,}741{,}824\,\text{Byte}" />
            <BlockMath math="1\,\text{TB} = 1{,}024\,\text{GB}" />
            <BlockMath math="1\,\text{PB} = 1{,}024\,\text{TB}" />
          </div>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg text-sm">
          <strong>Note:</strong> {t.formulaNote}
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{t.tips.title1}</h4>
          <ul className="space-y-3">
            <li className="p-3 bg-muted rounded-lg border-l-4 border-primary">
              <p className="font-semibold text-sm">{t.tips.items1[0]}</p>
              <p className="text-xs mt-1">
                {t.tips.items1[1]}
              </p>
            </li>
            <li className="p-3 bg-muted rounded-lg border-l-4 border-primary">
              <p className="font-semibold text-sm">{t.tips.title2}</p>
              <p className="text-xs mt-1">
                {t.tips.items2[0]}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{t.tips.title3}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items3.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{t.tips.title4}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items4.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('입력 단위를 선택하세요 (B, KB, MB, GB, TB).', 'Choose the input unit (B, KB, MB, GB, TB).')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value to convert.')}</li>
          <li>{L('출력 단위를 선택하세요.', 'Choose the output unit.')}</li>
          <li>{L('변환 버튼을 누르면 결과가 표시됩니다.', 'Press convert to see the result.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('GB → MB 변환', 'GB → MB Conversion')}</h4>
          <p className="text-sm">{L('1GB = 1,024MB입니다.', '1 GB = 1,024 MB.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('MB → GB 변환', 'MB → GB Conversion')}</h4>
          <p className="text-sm">{L('2,048MB = 2,048 ÷ 1,024 = 2GB입니다.', '2,048 MB = 2,048 ÷ 1,024 = 2 GB.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-base mb-2">{L('TB → GB 변환', 'TB → GB Conversion')}</h4>
          <p className="text-sm">{L('5TB = 5 × 1,024 = 5,120GB입니다.', '5 TB = 5 × 1,024 = 5,120 GB.')}</p>
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
