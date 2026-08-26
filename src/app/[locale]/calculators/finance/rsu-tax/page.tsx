import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./RsuTaxClient";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/rsu-tax", "finance", "rsu-tax");
}

export default function RsuTaxPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "RSU는 언제 과세되나요?" : "When are RSUs taxed?",
      a: isKo ? "주식이 베스팅(권리 확정)되는 시점의 시가(FMV)로 일반 소득으로 과세됩니다. 행사(Exercise)가 아닌 베스팅 시점이 기준입니다." : "RSUs are taxed as ordinary income at the fair market value when they vest — not when you exercise, because there is no exercise for RSUs.",
    },
    {
      q: isKo ? "주식으로 받고 팔지 않아도 세금을 내나요?" : "Do I owe tax if I don't sell?",
      a: isKo ? "네. 베스팅 시점에 이미 소득으로 과세되므로, 주식을 팔지 않아도 그해 세금이 부과됩니다( sell-to-cover로 주식을 내는 경우도 많습니다)." : "Yes. Vestin creates taxable ordinary income that year even if you hold the shares; many use sell-to-cover to pay it.",
    },
    {
      q: isKo ? "추후 가격 상승분은 어떻게 과세되나요?" : "How is later appreciation taxed?",
      a: isKo ? "베스팅 이후 보유 중 오른 가치는 자본이득(Capital Gains)으로 과세되며, 보유 기간 1년 이상이면 장기 자본이득 세율이 적용됩니다." : "Appreciation after vesting is a capital gain; holding over one year qualifies for lower long-term capital gains rates.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "미국 RSU 베스팅·스톡옵션 행사 시 연방세·주세·FICA를 반영한 세후 실수령 주식 가치를 계산합니다." : "Estimate the after-tax value of RSU vestings and option exercises with federal, state, and FICA taxes."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "베스팅 주식 수와 시가(FMV)를 입력합니다." : "Enter vested shares and FMV at vesting."}</li>
        <li>{isKo ? "연방·주·FICA 세율을 입력합니다." : "Enter federal, state, and FICA rates."}</li>
        <li>{isKo ? "세후 실수령액을 확인합니다." : "Review the after-tax value."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="Net = N \times P \times (1 - t_{fed} - t_{state} - t_{FICA})" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "N: 주식 수, P: 시가, t: 각 세율" : "N: shares, P: price, t: tax rates"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "베스팅 시점에 세금이 발생하므로 현금 유동성 계획이 필요합니다." : "Plan liquidity — tax hits at vesting regardless of selling."}</li>
        <li>{isKo ? "장기 보유 시 자본이득 세율이 낮아집니다." : "Long-term holding lowers capital-gains rates."}</li>
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
