import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./DiscountCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/discount-calculator", "life", "discount-calculator");
}



export default function DiscountCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.discountCalculator;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("여러 할인을 중복으로 적용할 수 있나요?", "Can I stack multiple discounts?"),
      a: L(
        "이 계산기는 하나의 할인율만 적용합니다. 실제 매장에서는 '30% 할인 + 추가 쿠폰 10%'처럼 여러 할인을 순차 적용하는 경우가 많습니다. 이때 최종 할인율은 단순 합(40%)이 아니라 순차 적용한 값(0.70 × 0.90 = 0.63, 즉 37% 할인)이 됩니다. 여러 할인을 순차 적용하려면, 첫 번째 결과 금액을 다시 원래가격으로 넣고 다음 할인율을 적용하세요.",
        "This calculator applies one discount at a time. In practice, multiple discounts (e.g., 30% off + 10% coupon) apply sequentially, yielding 0.70 × 0.90 = 0.63 (37% off), not 40%. For stacked discounts, enter the first result back as the new original price.",
      ),
    },
    {
      q: L("할인된 가격에서 원래 가격을 구하는 공식은?", "How do I find the original price from a sale price?"),
      a: L(
        "원래가격 = 할인판매가 ÷ (1 − 할인율/100)입니다. 예: 77,000원에 30% 할인出售→ 원래가격 = 77,000 ÷ 0.70 = 110,000원. 이 계산기의 '역산' 모드가 이 공식을 자동으로 수행합니다.",
        "Original = sale price ÷ (1 − rate/100). Example: ₩77,000 at 30% off → ₩77,000 ÷ 0.70 = ₩110,000. The calculator's reverse mode does this automatically.",
      ),
    },
    {
      q: L("세금 포함 가격도 이 계산기로 계산할 수 있나요?", "Can I calculate tax-inclusive prices with this tool?"),
      a: L(
        "이 계산기는 할인율만 다룹니다(부가세 별도). 할인 적용 후 세금을 더하려면, 먼저 이 계산기로 할인된 금액을 구하고, 그 결과에 부가세율(한국 10%)을 적용하면 됩니다. 예: 100,000원의 20% 할인 후 → 80,000원, 여기에 부가세 10% → 88,000원(합계).",
        "This calculator handles discount only (tax separate). For tax-inclusive: compute the discounted price here, then apply VAT (Korea: 10%). E.g., ₩100,000 at 20% off → ₩80,000, plus 10% VAT → ₩88,000 total.",
      ),
    },
    {
      q: L("할인율 역산 시 소수점이 발생하면 어떻게 하나요?", "What about decimals when reversing the discount rate?"),
      a: L(
        "원래가격을 역산할 때 소수점이 나오는 경우가 빈번합니다. 실무에서는 통상 1원 단위로 반올림합니다. 다만 카드 결제·현금영수증 처리 시 1원 오차가 누적될 수 있으므로, 대량 거래에서는 역산 공식 대신 원래가격 기준으로 할인 금액을 직접 계산해 맞추는 것이 정확합니다.",
        "Reverse calculations often produce fractional won. Round to 1 won in practice. For bulk transactions, compute the discount amount from the original price instead of reversing, to avoid cumulative 1-won rounding errors.",
      ),
    },
    {
      q: L("'최대 할인'과 '평균 할인'은 어떻게 다른가요?", "What's the difference between maximum and average discount?"),
      a: L(
        "여러 상품의 할인율을 비교할 때 단순 평균(평균 할인율)과 금액 기준 가중평균(실질 절감율)이 다릅니다. 비싼 상품의 할인율이 낮고 저렴한 상품의 할인율이 높으면, 평균 할인율은 높아도 실제 절약하는 금액 비율은 낮을 수 있습니다. 장바구니 전체 할인율을 비교할 때는 '총 절약액 ÷ 총 원래가격'으로 계산하세요.",
        "Average discount rate and weighted-average (by price) can differ significantly. If expensive items have low discounts and cheap items high, the average rate looks generous but actual savings percentage is lower. Compare basket-level savings as total saved ÷ total original price.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">
          {t.descriptionContent.heading}
        </p>
        <p>
          {t.descriptionContent.p1}
        </p>
        <p>
          {t.descriptionContent.p2}
        </p>
        <p>
          {t.descriptionContent.p3}
        </p>
        <TermGlossary items={t.glossary} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("모드 선택", "Choose mode"),
            L("'정방향'은 원래가격에서 할인가를 구할 때, '역산'은 할인판매가에서 원래가격을 찾을 때 사용합니다.", "Use 'forward' for sale price from original; 'reverse' for original price from sale price."),
          ],
          [
            L("가격·할인율 입력", "Enter price and rate"),
            L("정방향: 원래가격과 할인율(%). 역산: 원래가격(알 때)과 할인판매가를 입력합니다.", "Forward: enter original price and discount %. Reverse: enter both original and sale price."),
          ],
          [
            L("결과 확인", "Check results"),
            L("할인액, 최종가, 할인율이 함께 표시됩니다. 역산 모드에서는 절약한 비율(%)이 추가로 표시됩니다.", "Discount amount, final price, and rate appear. Reverse mode also shows the savings percentage."),
          ],
          [
            L("실무 활용", "Practical use"),
            L("장바구니 전체 할인율을 비교할 때는 총 절약액을 총 원래가격으로 나눈 값이 가장 정확합니다.", "For basket-level comparison, total saved ÷ total original price is the most accurate metric."),
          ],
        ].map(([title, body], i) => (
          <li key={i} className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">{i + 1}</span>
            <div>
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-1">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    ),
    workedExamples: (
      <div className="space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 정방향: 200,000원의 30% 할인", "Example 1 — Forward: 30% off ₩200,000")}</p>
          <p>
            {L(
              "원래가격 ₩200,000에 할인율 30% → 할인액 = 200,000 × 0.30 = ₩60,000, 최종가 = 200,000 − 60,000 = ₩140,000. 세금 별도로 이 가격에서 부가세 10%를 붙이면 ₩154,000입니다.",
              "Original ₩200,000 at 30% → discount ₩60,000, final ₩140,000. With 10% VAT added separately: ₩154,000.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 역산: 154,000원 구매 → 몇 % 할인?", "Example 2 — Reverse: ₩154,000 purchased → what % off?")}</p>
          <p>
            {L(
              "원래가격 ₩200,000에서 ₩140,000에 구매(세금 별도) → 절약액 = ₩60,000 → 할인율 = 60,000 ÷ 200,000 × 100 = 30%. 이 계산기의 역산 모드가 이 값을 자동 계산합니다.",
              "Bought at ₩140,000 from ₩200,000 original → saved ₩60,000 → rate = 30%. The reverse mode computes this automatically.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">{t.formula.heading}</h3>
        <div className="space-y-4 text-sm">
          <div className="p-3 bg-card rounded-md shadow-sm border border-border">
            <p className="font-semibold text-primary">{t.formula.step1Title}</p>
            <p className="text-xs text-muted-foreground mt-1 mb-2">
              {t.formula.step1Desc}
            </p>
            <code className="block bg-muted p-2 rounded-md my-2 text-xs">
              {t.formula.step1Formula1}
            </code>
            <code className="block bg-muted p-2 rounded-md my-2 text-xs">
              {t.formula.step1Formula2}
            </code>
            <p className="text-xs mt-2 text-muted-foreground">
              {t.formula.step1Example}
            </p>
          </div>
          <div className="p-3 bg-card rounded-md shadow-sm border border-border">
            <p className="font-semibold text-primary">{t.formula.step2Title}</p>
            <p className="text-xs text-muted-foreground mt-1 mb-2">
              {t.formula.step2Desc}
            </p>
            <code className="block bg-muted p-2 rounded-md my-2 text-xs">
              {t.formula.step2Formula}
            </code>
            <p className="text-xs mt-2 text-muted-foreground">
              {t.formula.step2Example}
            </p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-3">{t.tips.heading}</h3>
        <div className="space-y-4">
          {t.tips.items.map((item, i) => (
            <div key={i} className="p-3 border-l-4 border-primary bg-muted rounded-lg">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs mt-1 text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-5 text-sm text-muted-foreground">
        {faqs.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
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
