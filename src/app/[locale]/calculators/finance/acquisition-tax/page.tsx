import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./AcquisitionTaxClient";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/acquisition-tax", "finance", "acquisition-tax");
}

export default function AcquisitionTaxPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "다주택자 중과세율이 어떻게 되나요?" : "How does the multi-homeowner surcharge work?",
      a: isKo ? "조정대상지역 내 2주택은 8%, 3주택 이상은 12%의 높은 세율이 전체 취득가액에 적용됩니다(일반 1~3%에서 크게 오름)." : "In regulated areas, a 2nd home is taxed at 8% and a 3rd+ at 12% on the full price — far above the 1–3% base.",
    },
    {
      q: isKo ? "생애최초 구입 감면이란?" : "What is the first-time buyer relief?",
      a: isKo ? "생애 최초로 주택을 구입하고 취득가액이 12억 원 이하인 경우 취득세가 크게 감면(1% 수준)됩니다." : "First-time buyers purchasing under 1.2B KRW get a large acquisition-tax reduction (around 1%).",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "주택 취득세를 조정대상지역·다주택자 중과세율·생애최초 감면을 반영해 계산합니다." : "Calculate Korean real-estate acquisition tax with regulated-area, multi-homeowner surcharges, and first-time relief."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "거래가액과 보유 주택 수를 입력합니다." : "Enter the price and number of homes owned."}</li>
        <li>{isKo ? "지역 구분(일반/조정대상)과 생애최초 여부를 선택합니다." : "Select area type and first-time status."}</li>
        <li>{isKo ? "취득세 합계를 확인합니다." : "Review total acquisition tax."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="세액 = 취득가액 \times 세율(+지방교육세\,10\%)" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "세율: 일반 1~3%, 조정 2주택 8%, 3주택+ 12%" : "Rate: general 1–3%, 2nd home 8%, 3rd+ 12%"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "취득세는 매매가 아닌 '취득가액' 기준이며 신고가격과 등기부상 가액 중 큰 금액입니다." : "Tax base is the acquisition value (greater of reported price and registered value)."}</li>
        <li>{isKo ? "지방교육세·농어촌특별세가 추가될 수 있습니다." : "Local education and rural special taxes may apply on top."}</li>
      </ul>
    ),
    faq: (<div className="space-y-4">{faq.map((f, i) => (<FaqItem key={i} q={f.q} a={f.a} />))}</div>),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
