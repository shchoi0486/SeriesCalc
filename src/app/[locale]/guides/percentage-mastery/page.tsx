import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "퍼센트 완전정복: 할인율·증감률·역산 계산법" : "Percentages Mastered: Discounts, Change Rates and Reverse Math",
    description: isKo
      ? "몇 % 할인이 얼마인지, 몇 % 올랐는지, 세전 가격 역산까지. 헷갈리는 퍼센트 계산을 유형별로 정리했습니다."
      : "What a discount really costs, how much something rose, and how to reverse-calculate pre-tax prices — percentages by type.",
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

        <ProseSection title={L("쇼핑에서 바로 쓰는 계산", "Shopping math you use immediately")}>
          <p>
            {L(
              "정가 78,000원 30% 할인은 78,000 × 0.7 = 54,600원입니다. 여기서 추가 10% 쿠폰은 54,600 × 0.9 = 49,140원이므로 총 할인율은 약 37%입니다. 카드 청구할인까지 겹치면 같은 방식으로 한 번씩 더 곱하면 됩니다.",
              "A 78,000 item at 30% off costs 78,000 × 0.7 = 54,600. An extra 10% coupon makes 54,600 × 0.9 = 49,140 — a total discount of about 37%. Stack card rebates the same way, multiplying once more each time.",
            )}
          </p>
          <p>
            {L(
              "팁·세금 포함가 계산도 같은 구조입니다. 미국 여행 중 15% 팁은 합계의 0.15를 더하는 것이 아니라 메뉴가 × 세금 × 팁 순으로 누적됩니다.",
              "Tip-and-tax totals work identically: a 15% tip on a US trip multiplies menu × tax × tip in sequence, not as a flat addition.",
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
            <Link href={`/${params.locale}/calculators/finance/cagr`} className="text-primary underline">CAGR {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/standard-deviation-calculator`} className="text-primary underline">{L("표준편차 계산기", "Standard Deviation Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
