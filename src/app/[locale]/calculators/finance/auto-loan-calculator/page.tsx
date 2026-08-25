import type { Metadata } from "next";
import { BlockMath } from "react-katex";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./AutoLoanCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/auto-loan-calculator", "finance", "auto-loan-calculator");
}

export default function AutoLoanCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = isKo
    ? [
        {
          q: "선수금은 얼마나 내는 것이 좋나요?",
          a: "일반적으로 차량 가격의 20% 이상을 선수금으로 내는 것이 권장됩니다. 선수금이 클수록 대출 원금이 줄어 매월 납부액과 총 이자 부담이 함께 감소하고, 차량 가치가 잔존 대출금보다 빨리 떨어지는 '네거티브 이퀴티' 상태에 빠질 위험도 낮아집니다. 예를 들어 3,000만 원짜리 차량이라면 최소 600만 원을 현금 또는 기존 차량 중고 판매 대금으로 마련하는 것이 좋습니다.",
        },
        {
          q: "딜러가 제시하는 0% APR 프로모션은 정말 유리한가요?",
          a: "무이자 할부는 매력적으로 보이지만, 보통 현금 구매 고객에게 제공되는 리베이트(인센티브)를 포기해야 합니다. 예를 들어 무이자 36개월 대출 대신 리베이트 200만 원을 받아 현금을 더 보태고 금리 6%대 대출을 이용하는 쪽이 총비용이 낮을 수 있습니다. 반드시 두 시나리오의 총 납부액을 각각 계산해서 비교해 보세요.",
        },
        {
          q: "중도상환 수수료는 어떻게 확인하나요?",
          a: "차량 대출 계약서에는 3년 이내 상환 시 수수료율(통상 잔여 원금의 1~2%)이 명시됩니다. 다만 대출 실행 후 일정 기간이 지나면 면제되는 경우가 많으므로, 자동차 구매 후 몇 년 안에 전체 상환 계획이 있다면 계약 전에 수수료 조건부터 확인하세요. 요즘은 중도상환 수수료가 아예 없는 상품도 많습니다.",
        },
        {
          q: "대출 기간은 짧게 하는 것이 좋나요?",
          a: "기간이 짧으면 월 납부액은 커지지만 총 이자가 크게 줄어듭니다. 위 예시에서 볼 수 있듯 60개월 대신 36개월을 선택하면 약 230만 원의 이자를 절약할 수 있습니다. 다만 월 납부액이 가계 예산의 15~20%를 넘는다면 무리한 단축은 연체 위험으로 이어질 수 있으므로, 월 부담과 총비용 사이의 균형을 맞추는 것이 중요합니다.",
        },
        {
          q: "월 납부액 외에 따로 준비해야 할 비용이 있나요?",
          a: "있습니다. 이 계산기의 결과는 순수하게 대출 원리금만 반영합니다. 실제 차량 보유 비용에는 연간 자동차세, 보험료, 유류비, 정비 비용, 통행료 등이 추가되며, 이는 차량 가격의 연 10~15%에 달할 수 있습니다. 특히 미국의 경우 주(州)별 등록세와 판매세도 구매 시점에 별도로 발생하므로, 구매 예산을 세울 때 반드시 함께 고려하세요.",
        },
      ]
    : [
        {
          q: "How much down payment should I make?",
          a: "A down payment of at least 20% of the vehicle price is generally recommended. A larger down payment reduces the loan principal, which lowers both your monthly payment and total interest. It also protects you from negative equity — the situation where you owe more than the car is worth. For a $30,000 vehicle, that means putting down at least $6,000 in cash or trade-in value.",
        },
        {
          q: "Are dealer 0% APR promotions really worth it?",
          a: "Zero-percent financing looks attractive, but it usually requires giving up a cash rebate offered to other buyers. In many cases, taking the rebate (say $2,000), adding it to your down payment, and financing at a regular rate like 6% APR results in a lower total cost. Always calculate both scenarios and compare the total amount paid over the life of each loan.",
        },
        {
          q: "What about prepayment penalties?",
          a: "Many auto loans charge a fee if you pay off the balance early, typically 1–2% of the remaining principal within the first few years. Some lenders waive it after a set period, and plenty of modern auto loans have no prepayment penalty at all. If there is any chance you will pay the loan off early, confirm the terms before signing.",
        },
        {
          q: "Is a shorter loan term always better?",
          a: "Shorter terms mean higher monthly payments but substantially less interest. In the worked example below, choosing 36 months instead of 60 months saves roughly $2,300 in interest. That said, if the higher payment would exceed about 15–20% of your monthly budget, the risk of missed payments outweighs the interest savings. Balance affordability against total cost.",
        },
        {
          q: "Does the monthly payment include everything?",
          a: "No. This calculator reflects only principal and interest on the loan itself. Real ownership costs add insurance premiums, fuel, maintenance, registration fees, and taxes, which together can reach 10–15% of the vehicle's value per year. Sales tax on the purchase may also apply depending on your state or country, so include it when budgeting.",
        },
      ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">{isKo ? "자동차 대출 계산기" : "Auto Loan Calculator"}</strong>
          {isKo
            ? " 는 차량 가격, 선수금, 대출기간, 연이자율(APR)을 입력하면 매월 내야 할 납부액을 즉시 계산해 줍니다. 딜러의 견적 앞에서 '월 얼마까지가 내 한계인가'를 미리 알고 있는 것과 모르고 있는 것은 협상 결과 자체를 바꿉니다."
            : " estimates your monthly car payment from the vehicle price, down payment, loan term, and APR. Walking into a dealership already knowing what monthly payment fits your budget changes the negotiation entirely."}
        </p>
        <p>
          {isKo
            ? "계산 결과는 두 가지 관점에서 확인해야 합니다. 첫째는 매달 나가는 월 납부액이고, 둘째는 대출 기간 동안 내게 될 총 이자입니다. 같은 차를 사더라도 기간과 금리 조합에 따라 총 이자가 수백만 원씩 달라질 수 있으므로, 월 납부액만 보고 대출 조건을 결정하면 안 됩니다."
            : "Evaluate the result from two angles: the monthly payment that leaves your account each month, and the total interest you will pay over the life of the loan. Depending on how term and APR are combined, total interest can swing by thousands of dollars on the same car."}
        </p>
        <p>
          {isKo
            ? "APR(연간백분율)은 표면 이자율에 대출 수수료 같은 부대비용까지 포함한 실효 비용입니다. 금리는 같아 보여도 수수료 구조에 따라 APR이 다른 대출이 있으므로, 여러 금융사 조건을 비교할 때는 반드시 표시된 금리가 아니라 APR 기준으로 비교하세요."
            : "APR (Annual Percentage Rate) includes not just the nominal interest rate but also lender fees, so it represents the true cost of borrowing. Two loans with identical headline rates can carry different APRs — always compare offers by APR, not by the advertised rate."}
        </p>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "차량 가격 입력" : "Enter the vehicle price",
            isKo
              ? "구매하려는 차량의 실제 판매 가격을 입력합니다. 옵션 비용이나 할인이 확정돼 있다면 그 최종 금액을 넣는 것이 정확합니다."
              : "Type in the negotiated selling price of the car. If options and discounts are already settled, use that final number rather than the sticker price.",
          ],
          [
            isKo ? "선수금(및 트레이드인) 입력" : "Add your down payment",
            isKo
              ? "현금 선수금과 기존 차량 중고 판매(트레이드인) 대금을 합친 금액을 입력합니다. 이 금액만큼 대출 원금이 줄어듭니다."
              : "Include cash plus any trade-in credit. Every dollar here reduces the amount you actually finance.",
          ],
          [
            isKo ? "대출 기간 선택" : "Choose the loan term",
            isKo
              ? "보통 36~72개월 범위에서 선택합니다. 기간을 바꿔가며 계산해 보면 월 납부액과 총 이자가 어떻게 반대 방향으로 움직이는지 바로 확인됩니다."
              : "Most auto loans run 36–72 months. Try several terms and watch monthly payment and total interest move in opposite directions.",
          ],
          [
            isKo ? "APR 입력 후 계산" : "Enter APR and calculate",
            isKo
              ? "본인 신용등급 기준으로 사전 승인(pre-approval)을 받아 둔 APR을 입력하세요. 딜러 금융과 은행·신용조합 대출의 APR을 번갈아 입력해 비교하는 것도 좋은 방법입니다."
              : "Use the APR from a pre-approval based on your own credit profile, then swap in dealer-offered rates to compare. Getting pre-approved from a bank or credit union gives you leverage at the table.",
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
          <p className="font-semibold text-foreground mb-2">
            {isKo ? "예시 1 — 기본 시나리오" : "Example 1 — Baseline scenario"}
          </p>
          <p>
            {isKo
              ? "3만 2천 달러짜리 SUV를 구매하면서 선수금 5천 달러를 내고, 나머지 27,000달러를 연 7.9% APR로 60개월(5년) 빌린다고 하겠습니다. 월 이자율은 7.9% ÷ 12 ≈ 0.658%이고, 공식에 대입하면:"
              : "You buy a $32,000 SUV, put $5,000 down, and finance $27,000 for 60 months at 7.9% APR. The monthly rate is 7.9% ÷ 12 ≈ 0.658%. Plugging into the formula:"}
          </p>
          <div className="overflow-x-auto p-4 my-3 bg-card border border-border rounded-lg text-sm">
            <BlockMath math="\text{PMT} = \$27{,}000 \times \dfrac{0.00658 \times (1.00658)^{60}}{(1.00658)^{60} - 1} \approx \$546/\text{month}" />
          </div>
          <p>
            {isKo
              ? "월 약 546달러, 60개월 총 납부액은 약 32,770달러이므로 총 이자는 약 5,770달러입니다. 차값 대신 '총 지출 3만 2천 달러+'라는 숫자를 기억해 두세요."
              : "That works out to about $546 per month. Over 60 months you would pay roughly $32,770 in total, meaning around $5,770 in interest — remember the car costs you $32,000+, not $27,000."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">
            {isKo ? "예시 2 — 기간을 36개월로 줄이면" : "Example 2 — Shortening to 36 months"}
          </p>
          <p>
            {isKo
              ? "같은 조건에서 기간만 36개월로 줄이면 월 납부액은 약 845달러로 올라가지만, 총 이자는 약 3,400달러로 줄어듭니다. 즉 60개월 대신 36개월을 선택하는 것만으로 약 2,300달러(한화 약 300만 원 이상)가 절약됩니다. 월 300달러 차이를 감당할 수 있다면 기간 단축이 가장 확실한 이자 절약책입니다."
              : "Keep everything identical but change the term to 36 months: the payment rises to about $845, yet total interest drops to roughly $3,400. Choosing 36 months over 60 saves about $2,300 — one of the most reliable ways to cut borrowing costs if the higher payment fits your budget."}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="overflow-x-auto p-4 bg-card border border-border rounded-lg text-sm">
          <BlockMath math="\text{PMT} = P \times \dfrac{r(1+r)^n}{(1+r)^n - 1}" />
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">PMT</strong> = {isKo ? "월 납부액" : "Monthly payment"}</li>
          <li><strong className="text-foreground">P</strong> = {isKo ? "원금 (차량가격 − 선수금)" : "Principal (vehicle price − down payment)"}</li>
          <li><strong className="text-foreground">r</strong> = {isKo ? "월 이자율 (APR ÷ 12)" : "Monthly interest rate (APR / 12)"}</li>
          <li><strong className="text-foreground">n</strong> = {isKo ? "총 개월 수" : "Number of months"}</li>
        </ul>
        <p className="pt-1">
          {isKo
            ? "이 공식은 '원리금균등상환' 방식입니다. 매달 내는 금액 중 초기에는 이자 비중이 크고 갚을수록 원금 비중이 커지는데, 이 때문에 대출 초기에 중도상환하면 이자 절감 효과가 특히 큽니다."
            : "This is the standard amortization formula. Early payments are mostly interest; as the loan matures, more of each payment goes toward principal — which is why extra payments made early in the loan save the most interest."}
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">1</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? "선수금은 20% 이상" : "Put 20% down or more"}</p>
            <p className="mt-1">{isKo ? "20% 이상의 선수금은 네거티브 이퀴티를 피하고 더 낮은 이자율을 받는 데 도움이 됩니다." : "A larger down payment helps you avoid negative equity and often qualifies you for a lower rate."}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">2</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? "금리가 아니라 APR 비교" : "Compare APR, not just the rate"}</p>
            <p className="mt-1">{isKo ? "같은 이자율의 두 대출도 수수료 차이로 APR이 다를 수 있습니다. 항상 APR 기준으로 비교하세요." : "Identical headline rates can hide different fee structures. Compare loans by their APRs."}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">3</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? "기간 단축이 최고의 절약" : "Shorter terms save the most"}</p>
            <p className="mt-1">{isKo ? "예산이 허락한다면 48개월 이하를 목표로 하세요. 72개월 대출은 총 이자가 급격히 늘고 차량 가치 하락 속도를 따라잡지 못합니다." : "If your budget allows, aim for 48 months or less. 72-month loans accumulate heavy interest and can leave you underwater on the car."}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">4</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? "딜러 금융만 보지 말 것" : "Shop outside the dealership"}</p>
            <p className="mt-1">{isKo ? "은행·신용협동조합의 사전 승인 금리를 받아 두면 딜러 제시 조건과 직접 비교할 수 있고, 경쟁 구도 자체가 협상 카드가 됩니다." : "Bring a pre-approved rate from your bank or credit union. Competing offers are themselves negotiating leverage."}</p>
          </div>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-5 text-sm text-muted-foreground">
        {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
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
