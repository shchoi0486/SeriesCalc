import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./JeonseVsWolseClient";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/jeonse-vs-wolse", "finance", "jeonse-vs-wolse");
}

export default function JeonseVsWolsePage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "전세 기회비용이란?" : "What is jeonse opportunity cost?",
      a: isKo ? "수억 원의 보증금을 묶어두면 그 돈을 은행에 넣었을 때 받을 수 있는 이자를 포기하게 됩니다. 이를 연금리·기간으로 환산한 값이 전세의 실질 비용입니다." : "Locking up a large deposit forfeits the interest you could have earned. That foregone interest, over the lease term, is jeonse's real cost.",
    },
    {
      q: isKo ? "월세가 항상 손해일까요?" : "Is renting always worse?",
      a: isKo ? "아닙니다. 예금 금리가 높거나 보증금이 클수록 전세 기회비용이 커져 월세가 유리해질 수 있습니다. 이사 잦은 경우에도 월세가 유리할 수 있습니다." : "No. When deposit rates are high or deposits are large, jeonse's opportunity cost grows, making renting competitive — especially if you move often.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "전세와 월세를 '보증금 예금 이자(기회비용)' 기준으로 비교해 나에게 유리한 주거 형태를 계산합니다." : "Compare Korea's jeonse (lump-sum deposit) and wolse (monthly rent) using the opportunity cost of deposit interest."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "전세 보증금과 월세 금액을 입력합니다." : "Enter the jeonse deposit and monthly rent."}</li>
        <li>{isKo ? "예금 금리와 비교 기간을 입력합니다." : "Enter the deposit interest rate and period."}</li>
        <li>{isKo ? "기회비용 기준 결론을 확인합니다." : "Review the opportunity-cost verdict."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="전세비용 = 보증금 \times r \times t,\quad 월세비용 = 월세 \times 12 \times t" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "r: 연 예금 금리, t: 기간(년)" : "r: annual deposit rate, t: years"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "금리 상승기엔 전세 기회비용이 커집니다." : "Rising rates raise jeonse opportunity cost."}</li>
        <li>{isKo ? "보증금 반환 리스크(전세 사기 등)는 별도로 고려하세요." : "Consider deposit-return risk separately."}</li>
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
