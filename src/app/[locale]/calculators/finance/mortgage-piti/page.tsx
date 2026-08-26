import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./MortgagePitiClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/mortgage-piti", "finance", "mortgage-piti");
}

export default function MortgagePitiPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "PITI란 무엇인가요?" : "What does PITI mean?",
      a: isKo ? "Principal(원금), Interest(이자), Tax(재산세), Insurance(보험)의 약자로, 주택 소유에 따르는 실질 월 지출을 합산한 값입니다." : "Principal, Interest, Taxes, and Insurance — the full monthly cost of owning a home.",
    },
    {
      q: isKo ? "PMI는 언제 없어지나요?" : "When does PMI go away?",
      a: isKo ? "대출 비율(LTV)이 80% 이하, 즉 equity 20% 이상 확보 시 대부분 자동 취소되거나 요청해 제거할 수 있습니다." : "Once your loan-to-value drops below 80% (20% equity), PMI usually cancels automatically or by request.",
    },
    {
      q: isKo ? "재산세는 어디에 쓰이나요?" : "Where does property tax go?",
      a: isKo ? "지방 정부에 납부되며 학교, 도로, 치안 등 공공 서비스에 쓰입니다. 지역마다 세율이 크게 다릅니다." : "Paid to local government for schools, roads, and public services; rates vary widely by location.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "미국 주택담보대출의 월 상환액(PITI)을 원금·이자·재산세·보험료·PMI까지 포함해 계산합니다." : "Estimate your US mortgage monthly payment including principal, interest, property tax, insurance, and PMI."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "주택 가격과 계약금 비율을 입력합니다." : "Enter home price and down payment %."}</li>
        <li>{isKo ? "대출 기간, 이자율, 연 재산세·보험료를 입력합니다." : "Enter loan term, rate, annual tax and insurance."}</li>
        <li>{isKo ? "결과에서 월 PITI와 항목별 금액을 확인합니다." : "Review monthly PITI and its breakdown."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="M = P\,\frac{r(1+r)^n}{(1+r)^n-1},\quad PITI = M + \frac{T}{12} + \frac{I}{12} + PMI" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "P: 대출 원금, r: 월 이자율, n: 총 개월, T: 연 재산세, I: 연 보험료" : "P: loan principal, r: monthly rate, n: months, T: annual tax, I: annual insurance"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "계약금 20% 이상이면 PMI를 피할 수 있습니다." : "A 20%+ down payment avoids PMI."}</li>
        <li>{isKo ? "재산세는 거주 지역에 따라 월 지출 차이가 큽니다." : "Property tax varies widely by location."}</li>
      </ul>
    ),
    faq: (
      <div className="space-y-4">
        {faq.map((f, i) => (<FaqItem key={i} q={f.q} a={f.a} />))}
      </div>
    ),
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
