import { BlockMath } from "react-katex";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./IsaClient";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/isa", "finance", "isa");
}

export default function IsaPage({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";

  const faq = [
    {
      q: isKo ? "ISA 비과세 한도는 얼마인가요?" : "What is the ISA tax-free limit?",
      a: isKo ? "일반 가입자는 이자·배당 소득 연 200만 원, 서민·농어촌 가입자는 400만 원까지 비과세(또는 분리과세 15.4%) 혜택이 있습니다." : "General members get 2M KRW/year and qualifying members 4M KRW/year of tax-free (or 15.4% separate-taxed) interest and dividends.",
    },
    {
      q: isKo ? "청년도약계좌는 무엇이 다른가요?" : "How is the Youth Leap Account different?",
      a: isKo ? "청년도약계좌는 비과세 한도가 더 크고, 소득·나이 요건을 충족하면 정부기여금과 비과세 혜택이 결합되어 만기 수령액이 크게 커집니다." : "The Youth Leap Account has a larger tax-free limit plus government matching contributions when income/age criteria are met, boosting maturity value.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <p>{isKo ? "ISA와 청년도약계좌의 비과세·분리과세 혜택을 반영해 만기 예상 수령액과 일반계좌 대비 절세액을 계산합니다." : "Estimate the maturity value of ISA and Youth Leap Accounts with tax-free benefits and compare tax saved vs a normal account."}</p>
    ),
    howToUse: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>{isKo ? "월 납입액과 기간, 예상 수익률을 입력합니다." : "Enter monthly contribution, term, and expected return."}</li>
        <li>{isKo ? "연 비과세 한도와 계좌 유형을 선택합니다." : "Set the annual tax-free limit and account type."}</li>
        <li>{isKo ? "만기 수령액과 절세액을 확인합니다." : "Review maturity value and tax saved."}</li>
      </ol>
    ),
    calculationFormula: (
      <div className="p-4 mb-4 bg-muted rounded-lg text-center">
        <BlockMath math="FV = m\frac{(1+r)^{n}-1}{r},\quad 세금 = \max(0, 이자-비과세한도)\times 0.154" />
        <p className="text-xs text-muted-foreground mt-2">{isKo ? "m: 월 납입액, r: 월 수익률, n: 총 개월" : "m: monthly, r: monthly rate, n: months"}</p>
      </div>
    ),
    usefulTips: (
      <ul className="list-disc pl-5 space-y-1">
        <li>{isKo ? "비과세 한도를 채우는 게 핵심입니다." : "Maximizing the tax-free limit is key."}</li>
        <li>{isKo ? "청년도약계좌는 중도해지 시 혜택이 크게 줄어듭니다." : "Early withdrawal greatly reduces Youth Leap benefits."}</li>
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
