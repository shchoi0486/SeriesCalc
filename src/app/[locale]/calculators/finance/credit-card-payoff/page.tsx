import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./CreditCardPayoffClient";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/credit-card-payoff", "finance", "credit-card-payoff");
}

export default function CreditCardPayoffPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "최소 납부액만 내면 왜 안 되나요?" : "Why is paying only the minimum bad?",
      a: isKo ? "최소 납부액은 대부분이 이자와 수수료에 흡수되어 원금이 거의 줄지 않아 수년간 빚을 지게 됩니다." : "Minimum payments mostly cover interest and fees, barely reducing principal, so debt lingers for years.",
    },
    {
      q: isKo ? "추가 납부가 왜 효과적인가요?" : "Why does paying extra help so much?",
      a: isKo ? "추가 금액은 전액 원금 상환에 쓰여 복리 이자 기초가 줄어듭니다. 같은 총액을 일찍 갚을수록 이자 절감이 커집니다." : "Extra payments go straight to principal, shrinking the base on which compounding interest accrues — saving grows the earlier you pay.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "신용카드 잔액을 APR 이자를 고려해 상환하는 데 걸리는 기간과 이자 총액, 추가 납부 시 절약액을 계산합니다." : "See how long it takes to pay off a credit card balance and how much interest you save by paying extra."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "잔액과 연 APR을 입력합니다." : "Enter your balance and annual APR."}</li>
        <li>{isKo ? "현재 월 납부액과 선택적 추가액을 입력합니다." : "Enter current monthly payment and optional extra."}</li>
        <li>{isKo ? "상환 기간과 이자 절감액을 비교합니다." : "Compare payoff time and interest saved."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="n = \left\lceil \frac{-\ln\!\left(1 - \frac{B\,r}{P}\right)}{\ln(1+r)} \right\rceil" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "B: 잔액, r: 월 이자율, P: 월 납부액" : "B: balance, r: monthly rate, P: monthly payment"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "0% 무이자 기간을 활용해 잔액을 집중 상환하세요." : "Use 0% intro periods to attack the balance."}</li>
        <li>{isKo ? "가장 높은 APR 카드부터 갚는 '눈덩이/ 눈보라' 전략을 쓰세요." : "Use avalanche (highest APR first) or snowball methods."}</li>
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
