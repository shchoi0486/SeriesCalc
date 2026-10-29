import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "퍼센트 완전정복: 할인율·증감률·역산 계산법" : "Percentages Mastered: Discounts, Change Rates and Reverse Math",
    description: isKo
      ? "몇 % 할인이 얼마인지, 몇 % 올랐는지, 세전 가격 역산까지. 헷갈리는 퍼센트 계산을 유형별 예시와 표로 정리했습니다."
      : "What a discount really costs, how much something rose, and how to reverse-calculate pre-tax prices — percentages by type, with examples and tables.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/science`;

  const faq = [
    {
      q: L("30% 할인 후 20% 추가 할인이면 총 몇 % 할인인가요?", "Is 30% off plus another 20% a 50% discount?"),
      a: L(
        "아닙니다. 0.7 × 0.8 = 0.56이므로 총 44% 할인입니다. 할인율은 더하는 것이 아니라 곱하는 방식으로 누적됩니다. 퍼센트 계산기에 순서대로 입력하면 바로 확인할 수 있습니다.",
        "No — 0.7 × 0.8 = 0.56, so the total discount is 44%. Discounts multiply, they do not add. Enter them in sequence in the percentage calculator to verify.",
      ),
    },
    {
      q: L("부가세 포함가에서 공급가액을 역산하려면?", "How do I back out the net price from a VAT-inclusive price?"),
      a: L(
        "포함가를 1.1로 나누면 됩니다. 11만 원이면 공급가액 10만 원·부가세 1만 원입니다. 10%를 곱해 빼는 방식(11만 − 1.1만)은 틀린 계산이니 주의하세요.",
        "Divide the inclusive price by 1.1. A 110,000 total means 100,000 net plus 10,000 tax. Subtracting 10% of the total (110,000 − 11,000) is wrong — watch out.",
      ),
    },
    {
      q: L("증감률과 비율 포인트는 무엇이 다른가요?", "What is the difference between growth rate and percentage points?"),
      a: L(
        "금리 2%에서 3%가 되면 1%포인트 상승이지만 상승률은 50%입니다. 뉴스·계약서에서 두 표현을 구분하지 않으면 오해가 생기므로 단위를 항상 확인하세요.",
        "A rate moving from 2% to 3% rises by 1 percentage point but 50% in relative terms. News and contracts mix these up often — always check which unit is meant.",
      ),
    },
    {
      q: L("할인과 세금을 함께 적용할 때 순서는?", "Does the order of discount and tax matter?"),
      a: L(
        "네. 보통 할인 후 세금이 붙습니다(할인가 × 1.1). 세금 후 할인(세금 포함가 × 0.9)과 결과가 다릅니다. 영수증·견적서에서 어느 기준인지 확인하세요.",
        "Yes. Usually tax is applied after the discount (discounted price × 1.1). Applying the discount after tax (inclusive × 0.9) gives a different result — check the receipt or quote.",
      ),
    },
    {
      q: L("퍼센트를 소수로 바꿀 때 소수점은?", "How many decimals when converting percent to decimal?"),
      a: L(
        "30% = 0.30입니다. 계산 중간에는 충분한 자릿수를 유지하고 마지막에 반올림하세요. 너무 일찍 반올림하면 오차가 누적됩니다.",
        "30% = 0.30. Keep enough digits mid-calculation and round only at the end — early rounding accumulates error.",
      ),
    },
  ];

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
      <ProsePage title={L("퍼센트 완전정복 가이드", "The Complete Percentage Guide")}>
        <ProseSection title={L("기본 3유형", "The three basic types")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("비율 구하기: A는 B의 몇 %인가 → A ÷ B × 100", "Find the share: what % is A of B → A ÷ B × 100")}</li>
            <li>{L("값 구하기: B의 A%는 얼마인가 → B × A ÷ 100", "Find the value: what is A% of B → B × A ÷ 100")}</li>
            <li>{L("역산하기: A% 적용 후 값이 C일 때 원래 값 → C ÷ (1 ± A/100)", "Work backwards: original value when C follows an A% change → C ÷ (1 ± A/100)")}</li>
          </ul>
          <p>
            <Link href={`${base}/percentage-calculator`} className="text-primary underline">{L("퍼센트 계산기", "Percentage Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("할인 중첩 계산", "Stacked discounts")}>
          <p>
            {L(
              "할인율은 더하는 것이 아니라 곱합니다. 30% 할인 후 추가 20% 할인은 0.7 × 0.8 = 0.56, 즉 총 44% 할인입니다.",
              "Discounts multiply, not add. 30% off then 20% off = 0.7 × 0.8 = 0.56, i.e. 44% total.",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("상황", "Scenario")}</th>
                  <th className="border p-2 text-right">{L("계산", "Calc")}</th>
                  <th className="border p-2 text-right">{L("결과", "Result")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("정가 78,000원 30% 할인", "78,000 at 30% off")}</td><td className="border p-2 text-right">78,000 × 0.7</td><td className="border p-2 text-right">54,600원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("+ 10% 쿠폰 적용", "+ 10% coupon")}</td><td className="border p-2 text-right">54,600 × 0.9</td><td className="border p-2 text-right">49,140원</td></tr>
                <tr><td className="border p-2">{L("총 할인율", "Total discount")}</td><td className="border p-2 text-right">1 − 0.7×0.9</td><td className="border p-2 text-right">약 37%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 카드 청구 할인·포인트 적립도 같은 방식으로 한 번씩 더 곱하면 됩니다.",
              "* Card rebates and point accrual stack the same way — multiply once more each time.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("쇼핑에서 바로 쓰는 계산", "Shopping math you use immediately")}>
          <p>
            {L(
              "정가 78,000원 30% 할인은 78,000 × 0.7 = 54,600원입니다. 여기서 추가 10% 쿠폰은 54,600 × 0.9 = 49,140원이므로 총 할인율은 약 37%입니다.",
              "A 78,000 item at 30% off costs 78,000 × 0.7 = 54,600. An extra 10% coupon makes 54,600 × 0.9 = 49,140 — a total discount of about 37%.",
            )}
          </p>
          <p>
            {L(
              "팁·세금 포함가 계산도 같은 구조입니다. 미국 여행 중 15% 팁은 합계의 0.15를 더하는 것이 아니라 메뉴가 × 세금 × 팁 순으로 누적됩니다.",
              "Tip-and-tax totals work identically: a 15% tip on a US trip multiplies menu × tax × tip in sequence, not as a flat addition.",
            )}
          </p>
          <p>
            {L(
              "부가세 역산: 포함가 ÷ 1.1 = 공급가액. 11만원이면 공급가 10만원·부가세 1만원. 10%를 곱해 빼는 방식(11만 − 1.1만)은 틀린 계산이니 주의하세요.",
              "VAT reverse: inclusive ÷ 1.1 = net. 110,000 means 100,000 net + 10,000 tax. Subtracting 10% of the total (110,000 − 11,000) is wrong — watch out.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("증감률·수익률 해석", "Reading growth and return rates")}>
          <p>
            {L(
              "매출이 8억에서 10억이 되면 증가율은 (10−8)/8 = 25%입니다. 여러 해의 평균 성장률은 산술평균이 아니라 CAGR(연평균 복리성장률)로 구해야 정확합니다. 투자 수익률 비교도 같은 원칙입니다.",
              "Sales rising from 0.8B to 1.0B grow (1.0−0.8)/0.8 = 25%. Multi-year average growth must use CAGR (compound annual growth rate), not an arithmetic mean — the same rule applies to investment returns.",
            )}
          </p>
          <p>
            {L(
              "금리 2%에서 3%로 오르면 1%포인트 상승이지만 상대 상승률은 50%입니다. 뉴스·계약서에서 두 표현을 구분하지 않으면 오해가 생기므로 단위를 항상 확인하세요.",
              "A rate moving from 2% to 3% rises 1 percentage point but 50% in relative terms. News and contracts mix these up often — always check which unit is meant.",
            )}
          </p>
          <p>
            <Link href={`/${params.locale}/calculators/finance/cagr`} className="text-primary underline">CAGR {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/standard-deviation-calculator`} className="text-primary underline">{L("표준편차 계산기", "Standard Deviation Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i} className="rounded-xl border p-4">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 세무·금융 자문이 아닙니다. 실제 세금·할인 조건은 판매자·세법에 따라 달라집니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute tax or financial advice. Actual tax and discount terms vary by seller and tax law.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
