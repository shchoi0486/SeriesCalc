import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./401kClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/401k", "finance", "401k");
}

export default function Retire401kPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "401(k)와 Roth IRA의 가장 큰 차이는?" : "What is the biggest difference between 401(k) and Roth IRA?",
      a: isKo
        ? "401(k)는 고용주가 제공하는 직장 연금으로 Traditional형은 납입 시 세액공제를 받고 인출 시 과세되며, Roth형은 세후 납입 후 인출 시 비과세입니다. Roth IRA는 개인이 개설하는 계좌로 소득 한도가 있습니다."
        : "A 401(k) is employer-sponsored; Traditional gives a tax deduction now and is taxed on withdrawal, while Roth is after-tax now and tax-free later. A Roth IRA is individual, with income limits.",
    },
    {
      q: isKo ? "회사 매칭(Employer Match)은 무조건 챙겨야 하나요?" : "Should I always capture the full employer match?",
      a: isKo
        ? "네. 매칭은 사실상 즉시 수익률이 붙는 무료 복리 혜택입니다. 대부분 '연봉의 6%까지 50% 매칭' 형태이므로, 최소 그 한도까지는 기여하는 것이 유리합니다."
        : "Yes. Match is essentially free money compounding over time. If your plan offers 50% match up to 6% of salary, contributing at least to that cap is usually optimal.",
    },
    {
      q: isKo ? "59.5세 이전 인출 시 벌금이 있나요?" : "Is there a penalty for withdrawing before age 59.5?",
      a: isKo
        ? "원칙적으로 59.5세 이전 인출에는 10% 조기 인출 벌금이 부과되며, Traditional의 경우 인출액에 대해 소득세도 과세됩니다. 일부 예외(첫 주택 구입 등)가 있습니다."
        : "Withdrawals before 59.5 generally incur a 10% early-withdrawal penalty, plus ordinary income tax for Traditional. Some exceptions (e.g., first home) apply.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>
        {isKo
          ? "401(k)·Roth IRA 은퇴 적립금을 회사 매칭(Employer Match), 예상 수익률, 세금 혜택을 반영해 시뮬레이션합니다. Traditional과 Roth의 세후 가치를 비교해 볼 수 있습니다."
          : "Project your 401(k) or Roth IRA balance with employer match, expected return, and tax treatment. Compare after-tax value between Traditional and Roth."}
      </p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "현재 나이와 은퇴 목표 나이를 입력합니다." : "Enter your current age and target retirement age."}</li>
        <li>{isKo ? "연봉과 본인 기여율, 회사 매칭 조건을 입력합니다." : "Enter your salary, your contribution %, and employer match terms."}</li>
        <li>{isKo ? "예상 연 수익률과 세율을 설정 후 결과를 확인합니다." : "Set expected return and tax rates, then review the result."}</li>
      </ol>
    ),
    workedExamples: (
      <div className="space-y-2">
        <p className="font-medium">{isKo ? "예시: 연봉 $80,000, 본인 10%, 회사 50% 매칭(상한 6%)" : "Example: $80,000 salary, 10% own, 50% match (cap 6%)"}</p>
        <p className="text-sm text-muted-foreground">
          {isKo
            ? "본인 연간 기여 $8,000, 회사 매칭은 연봉 6%($4,800)까지의 50% = $2,400. 연간 총 적립 $10,400이 복리로 성장합니다."
            : "Your annual contribution $8,000; employer matches 50% of up to 6% of salary ($4,800) = $2,400. Total $10,400 compounds annually."}
        </p>
      </div>
    ),
    calculationFormula: (
      <>
        <div className="p-4 mb-4 bg-muted rounded-lg text-center">
          <BlockMath math="FV = B(1+r)^{n} + \frac{C}{12}\frac{(1+r)^{n}-1}{r}" />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? "B: 현재 잔액, C: 연간 총 적립액, r: 월 수익률, n: 총 개월 수" : "B: current balance, C: annual total contribution, r: monthly rate, n: total months"}</p>
        </div>
      </>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "매칭 상한까지는 반드시 채우세요(무료 수익)." : "Always contribute at least to the match cap (free return)."}</li>
        <li>{isKo ? "Traditional은 현재 고세율·은퇴 저세율일 때 유리합니다." : "Traditional favors you when your current tax rate exceeds retirement rate."}</li>
      </ul>
    ),
    faq: (
      <div className="space-y-4">
        {faq.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
