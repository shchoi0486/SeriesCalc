import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./PercentageCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/percentage-calculator", "science", "percentage-calculator");
}



export default function PercentageCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("퍼센트를 계산하는 공식은 무엇인가요?", "What is the formula for calculating percentage?"),
      a: L("퍼센트는 100분의 1을 의미합니다. 'A의 B%'를 구하려면 A × (B/100)를 계산합니다. 예를 들어 150의 20%는 150 × 0.20 = 30입니다. 'A가 B의 몇 %인지'를 구하려면 (A / B) × 100을 계산합니다.", "A percentage means one hundredth. To find 'B% of A', compute A × (B/100). For example, 20% of 150 is 150 × 0.20 = 30. To find 'what percent A is of B', compute (A / B) × 100."),
    },
    {
      q: L("퍼센트 변화(증감률)는 어떻게 계산하나요?", "How do you calculate percentage change?"),
      a: L("퍼센트 변화는 (새 값 - 이전 값) ÷ 이전 값 × 100으로 구합니다. 예를 들어 50에서 60으로 증가하면 (60 - 50) ÷ 50 × 100 = 20% 증가입니다. 값이 감소하면 결과가 음수가 되어 감소율을 나타냅니다.", "Percentage change is calculated as (new value − old value) ÷ old value × 100. For example, an increase from 50 to 60 is (60 − 50) ÷ 50 × 100 = 20% increase. A decrease yields a negative result, representing the decrease rate."),
    },
    {
      q: L("할인 금액과 할인 후 가격은 어떻게 계산하나요?", "How do I calculate a discount and the discounted price?"),
      a: L("할인 금액 = 원래 가격 × 할인율입니다. 할인 후 가격 = 원래 가격 × (1 - 할인율)입니다. 예를 들어 59,900원 상품이 30% 할인되면 할인 후 가격은 59,900 × 0.70 = 41,930원입니다.", "Discount amount = original price × discount rate. Discounted price = original price × (1 − discount rate). For example, a 59,900 item at 30% off costs 59,900 × 0.70 = 41,930."),
    },
    {
      q: L("퍼센트(%)와 퍼센트포인트(%p)의 차이는 무엇인가요?", "What is the difference between percentage (%) and percentage point (%p)?"),
      a: L("퍼센트(%)는 비율을 나타내는 상대적 단위이고, 퍼센트포인트(%p)는 두 퍼센트 값 사이의 절대적 차이입니다. 예를 들어 금리가 3%에서 5%로 오르면 '2퍼센트포인트 증가'라고 하며, 이는 비율로는 66.7% 증가한 것입니다. 둘은 혼동하기 쉽지만 의미가 다릅니다.", "Percentage (%) is a relative unit of ratio, while percentage point (%p) is the absolute difference between two percentage values. For example, an interest rate rising from 3% to 5% is a '2 percentage point increase', which is a 66.7% relative increase. The two are easily confused but mean different things."),
    },
    {
      q: L("역퍼센트(역산) 계산은 어떻게 하나요?", "How do you do reverse percentage calculations?"),
      a: L("어떤 값이 전체의 B%일 때 전체를 구하려면 그 값을 (B/100)로 나눕니다. 예를 들어 '할인된 가격이 원가의 70%'라면 원래 가격 = 할인 후 가격 ÷ 0.70입니다. 즉 할인 후 가격이 70,000원이라면 원래 가격은 70,000 ÷ 0.70 = 100,000원입니다.", "To find the whole when you know it is B% of it, divide the known value by (B/100). For example, if a discounted price is 70% of the original, the original = discounted price ÷ 0.70. So a 70,000 discounted price means the original was 70,000 ÷ 0.70 = 100,000."),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('퍼센트 계산기', 'Percentage Calculator')}</strong>{L('는 일상생활과 업무에서 빈번하게 사용되는 퍼센트(%) 관련 계산을 손쉽게 수행할 수 있는 도구입니다. ', ' is a tool that makes it easy to perform percentage (%) calculations frequently used in daily life and work. ')}
          {L('할인율 계산, 세금 계산, 성적 분석, 수익률 비교 등 다양한 상황에서 활용됩니다.', 'It is used in various situations such as discount rate calculations, tax calculations, grade analysis, and return rate comparisons.')}
        </p>
        <p>
          {L('이 계산기는 세 가지 기본 퍼센트 계산 모드를 제공합니다:', 'This calculator provides three basic percentage calculation modes:')}
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>{L('A의 B%는?', 'What is B% of A?')}</strong> - {L('특정 값의 일정 비율을 계산합니다.', 'Calculates a certain proportion of a specific value.')}</li>
          <li><strong>{L('A는 B의 몇%?', 'A is what % of B?')}</strong> - {L('두 값 사이의 비율(퍼센트)을 구합니다.', 'Finds the ratio (percentage) between two values.')}</li>
          <li><strong>{L('A에서 B% 증감', 'A +/- B%')}</strong> - {L('값에 퍼센트를 적용하여 증감된 최종 값을 계산합니다.', 'Applies a percentage to a value and calculates the final value after increase or decrease.')}</li>
        </ul>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('퍼센트는 "100분의 1"을 의미하는 수학적 표현으로, 비율을 쉽게 비교하고 표현할 수 있게 해줍니다. 예를 들어, 50%는 절반, 25%는 사분의 일을 의미합니다.', 'Percentage is a mathematical expression meaning "one hundredth," making it easy to compare and express ratios. For example, 50% means half, 25% means one-quarter.')}
        </p>
        <TermGlossary items={[
          { term: L('퍼센트(%)', 'Percentage (%)'), desc: L('100을 기준으로 한 비율을 나타내는 수학적 표현입니다.', 'A mathematical expression representing a ratio based on 100.') },
          { term: L('비율(Ratio)', 'Ratio'), desc: L('두 값 사이의 크기 관계를 나타내며, 퍼센트는 이 비율을 100을 기준으로 표현한 것입니다.', 'Represents the size relationship between two values; percentage expresses this ratio based on 100.') },
          { term: L('감소율(Decrease Rate)', 'Decrease Rate'), desc: L('값이 감소한 비율을 나타내며, 음수 퍼센트로 표현할 수 있습니다.', 'The rate at which a value has decreased, which can be expressed as a negative percentage.') },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("계산 유형 선택", "Choose the calculation type"),
            L("퍼센트 계산 유형을 선택합니다: 'A의 B%는?'(값의 비율), 'A는 B의 몇%?'(비율 비교), 'A에서 B% 증감'(증감률 적용) 중 하나입니다.", "Select the calculation type: 'B% of A' (proportion of a value), 'A is what % of B' (ratio comparison), or 'A +/- B%' (applying a change rate)."),
          ],
          [
            L("값 입력", "Enter your values"),
            L("선택한 유형에 맞는 기준 값, 퍼센트 값, 또는 두 비교 값을 입력합니다. 예: 기준 값 150과 퍼센트 20.", "Enter the base value, percentage, or the two values to compare depending on the chosen type. For example: base value 150 and percentage 20."),
          ],
          [
            L("계산하기", "Calculate"),
            L("계산 버튼을 눌러 결과를 확인합니다. 계산기는 입력한 값을 바탕으로 퍼센트 결과를 즉시 계산해 표시합니다.", "Press the calculate button to see the result. The calculator computes and displays the percentage result instantly based on your input."),
          ],
          [
            L("결과 읽기", "Read the result"),
            L("결과 값을 확인하고, 필요하면 실생활 맥락(할인가, 수익률, 점수 등)에 맞게 해석합니다. 음수 결과는 감소율을 의미합니다.", "Review the result value and interpret it in your real-life context (discounted price, return rate, score, etc.). A negative result indicates a decrease."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 값의 비율", "Example 1 — Proportion of a value")}</p>
          <p>
            {L("150의 20%는 얼마인가요? 공식: 150 × (20/100) = 150 × 0.20 = 30. 따라서 150의 20%는 30입니다.", "What is 20% of 150? Formula: 150 × (20/100) = 150 × 0.20 = 30. So 20% of 150 is 30.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 비율 비교", "Example 2 — Ratio comparison")}</p>
          <p>
            {L("45는 180의 몇 %인가요? 공식: (45/180) × 100 = 0.25 × 100 = 25%. 따라서 45는 180의 25%입니다.", "45 is what percent of 180? Formula: (45/180) × 100 = 0.25 × 100 = 25%. So 45 is 25% of 180.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 3 — 증감률", "Example 3 — Percentage change")}</p>
          <p>
            {L("50에서 60으로 증가하면 증감률은 얼마인가요? 공식: (60 - 50) ÷ 50 × 100 = 20%. 따라서 20% 증가입니다.", "What is the percentage change from 50 to 60? Formula: (60 − 50) ÷ 50 × 100 = 20%. So it is a 20% increase.")}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('모드 1: A의 B% 계산', 'Mode 1: B% of A')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="A \times \dfrac{B}{100}" />
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>A</strong> - {L('기준 값 (전체)', 'Base value (total)')}</li>
            <li><strong>B</strong> - {L('퍼센트 값 (%)', 'Percentage value (%)')}</li>
            <li>{L('결과: A에서 B%에 해당하는 값', 'Result: The value corresponding to B% of A')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('모드 2: A는 B의 몇%?', 'Mode 2: A is what % of B?')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\left(\dfrac{A}{B}\right) \times 100" />
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>A</strong> - {L('부분 값', 'Part value')}</li>
            <li><strong>B</strong> - {L('전체 값', 'Whole value')}</li>
            <li>{L('결과: A가 B 전체에서 차지하는 비율(%)', 'Result: The ratio (%) that A represents of the whole B')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('모드 3: A에서 B% 증감', 'Mode 3: A +/- B%')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="A \times \left(1 \pm \dfrac{B}{100}\right)" />
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>A</strong> - {L('원래 값', 'Original value')}</li>
            <li><strong>B</strong> - {L('증감율 (%). 양수는 증가, 음수는 감소', 'Change rate (%). Positive for increase, negative for decrease')}</li>
            <li>{L('결과: 증감된 최종 값', 'Result: Final value after increase/decrease')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('계산 예시', 'Examples')}</h4>
          <div className="my-2 p-3 bg-muted rounded-lg space-y-2">
            <p className="font-mono text-sm">{L('모드 1: 200,000원의 15% = 200,000 × 0.15 = 30,000원', 'Mode 1: 15% of 200,000 = 200,000 × 0.15 = 30,000')}</p>
            <p className="font-mono text-sm">{L('모드 2: 30은 200의 몇%? = (30/200) × 100 = 15%', 'Mode 2: 30 is what % of 200? = (30/200) × 100 = 15%')}</p>
            <p className="font-mono text-sm">{L('모드 3: 100,000에서 20% 증가 = 100,000 × 1.2 = 120,000', 'Mode 3: 100,000 increased by 20% = 100,000 × 1.2 = 120,000')}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('실생활 활용 예시', 'Real-Life Applications')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>{L('쇼핑 할인:', 'Shopping discounts:')}</strong> {L('30% 할인된 59,900원 상품의 실제 가격: 59,900 × 0.7 = 41,930원', 'Actual price of a 30% discounted item at 59,900: 59,900 × 0.7 = 41,930')}</li>
            <li><strong>{L('세금 계산:', 'Tax calculation:')}</strong> {L('부가세 10% 포함 가격: 10,000원 × 1.1 = 11,000원', 'Price including 10% VAT: 10,000 × 1.1 = 11,000')}</li>
            <li><strong>{L('수익률:', 'Return rate:')}</strong> {L('1,000만원 투자 후 1,150만원이 되었다면 수익률 15%', 'If 10 million becomes 11.5 million, the return rate is 15%')}</li>
            <li><strong>{L('시험 점수:', 'Test scores:')}</strong> {L('50문제 중 42개 맞힘: (42/50) × 100 = 84%', '42 correct out of 50: (42/50) × 100 = 84%')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('자주 쓰는 퍼센트 변환', 'Common Percentage Conversions')}</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">10% = 0.1</div>
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">25% = 0.25</div>
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">33.3% ≈ 1/3</div>
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">50% = 0.5</div>
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">75% = 0.75</div>
            <div className="p-2 bg-muted rounded text-sm text-center font-mono">100% = 1</div>
          </div>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 rounded-r-lg">
          <p className="font-bold text-sm">{L('알고 계셨나요?', 'Did you know?')}</p>
          <p className="text-xs mt-1">
            {L('30% 할인과 30% 추가 할인은 60% 할인이 아닙니다! 100,000원 상품에 30% 할인 → 70,000원, 여기에 추가 30% 할인 → 49,000원 (총 51% 할인). 이는 퍼센트의 "기준 값"이 달라지기 때문입니다.', '30% off plus another 30% off is NOT 60% off! A 100,000 item with 30% off → 70,000, then another 30% off → 49,000 (total 51% off). This is because the "base value" changes for each percentage.')}
          </p>
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
