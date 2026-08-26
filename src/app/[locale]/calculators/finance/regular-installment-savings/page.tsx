import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./RegularInstallmentSavingsClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/regular-installment-savings", "finance", "regular-installment-savings");
}

export default function RegularInstallmentSavingsPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo
            ? "매달 꾸준히, 차곡차곡! 목돈 만들기의 가장 기본적이면서도 확실한 방법, 바로 정기적금입니다. 정기적금은 은행 등 금융기관과 약속한 기간 동안 매월 일정한 금액을 납입하고, 만기일에 원금과 약속된 이자를 함께 돌려받는 가장 대표적인 저축 상품입니다."
            : "Saving a fixed amount every month is the most basic yet most reliable way to build a lump sum — that is the regular installment savings (Jeonggi-jeokgeum). It is the most representative savings product: you deposit a fixed amount each month for an agreed period and receive your principal plus the promised interest at maturity."}
        </p>
        <p>
          {isKo
            ? "여행 자금, 내 집 마련 계약금, 자녀 학자금 등 구체적인 목표를 위해 계획적으로 돈을 모으는 데 최적화되어 있습니다. 강제성이 부여되어 소비의 유혹을 이겨내고 꾸준한 저축 습관을 형성하는 데 큰 도움을 줍니다."
            : "It is ideal for planned saving toward concrete goals such as travel funds, a home down payment, or tuition. The built-in discipline helps you resist spending temptation and form a steady saving habit."}
        </p>
        <p>
          {isKo
            ? "본 정기적금 계산기는 여러분의 소중한 목표 달성을 돕는 스마트한 가이드입니다. 월 적립액, 이자율, 기간, 그리고 복잡한 세금 옵션까지 고려하여 만기 시 실제 손에 쥐게 될 금액을 미리 정확하게 계산해볼 수 있습니다."
            : "This calculator is your smart guide to reaching those goals. Enter your monthly deposit, interest rate, term, and tax option to see exactly how much you will receive at maturity — and compare products to choose the best one."}
        </p>
        <TermGlossary items={isKo ? [
          { term: '정기적금', desc: '약정한 기간 동안 매월 일정 금액을 납입하고 만기 시 원금과 이자를 돌려받는 대표적인 저축 상품입니다.' },
          { term: '단리', desc: '매월 납입한 원금에 대해서만 이자를 계산하는 방식으로, 정기적금에서 흔히 사용됩니다.' },
          { term: '월복리', desc: '매월 발생한 이자를 원금에 합산해 다음 달 이자를 계산하는 방식으로, 기간이 길수록 단리보다 유리합니다.' },
        ] : [
          { term: 'Installment savings', desc: 'A savings product where you deposit a fixed amount monthly and receive principal plus interest at maturity.' },
          { term: 'Simple interest', desc: 'Interest calculated only on the principal deposited each month; commonly used for installment savings.' },
          { term: 'Monthly compounding', desc: 'Interest earned each month is added to principal so next month interest is earned on principal + interest; better than simple interest over long terms.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">
          {isKo
            ? "정기적금의 이자는 크게 단리와 월복리 방식으로 계산됩니다. 어떤 방식을 선택하느냐에 따라 만기 수령액이 달라지므로, 그 차이를 명확히 이해하는 것이 중요합니다."
            : "Installment savings interest is calculated mainly as simple interest or monthly compound interest. The method you choose changes your maturity payout, so understanding the difference matters."}
        </p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? "1. 단리 계산법 (Simple Interest)" : "1. Simple Interest"}</h3>
          <p>{isKo ? "매월 납입한 원금에 대해서만 만기까지의 기간을 적용하여 이자를 계산하는 가장 기본적인 방식입니다." : "The most basic method: interest is applied over the deposit period to the principal deposited each month only."}</p>
          <BlockMath math="\text{Total Interest} = \text{Monthly Deposit} \times \dfrac{r_{year}}{12} \times \dfrac{n(n+1)}{2}" />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? "※ 각 월의 납입금이 예치되는 기간이 모두 다르기 때문에(첫 달은 12개월, 마지막 달은 1개월) 위와 같은 공식이 사용됩니다." : "※ Each month's deposit is held for a different period (first month 12 months, last month 1 month), hence the formula."}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? "2. 월복리 계산법 (Monthly Compound Interest)" : "2. Monthly Compound Interest"}</h3>
          <p>{isKo ? "매월 발생한 이자를 원금에 더하고, 다음 달에는 '원금+이자'에 대한 이자를 계산하는 방식입니다. 이자에 이자가 붙어 시간이 지날수록 눈덩이처럼 불어나는 효과가 있습니다." : "Each month's interest is added to principal, and next month interest is earned on principal + interest — the snowball effect grows over time."}</p>
          <BlockMath math="\text{Maturity} = \text{Monthly Deposit} \times \left[\dfrac{(1 + i_{month})^{n} - 1}{i_{month}}\right] \times (1 + i_{month})" />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? "※ 월이율 = 연이율 / 12" : "※ Monthly rate = annual rate / 12"}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? "3. 세금 계산법 (Tax Calculation)" : "3. Tax Calculation"}</h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><strong>{isKo ? "일반과세:" : "General taxation:"}</strong> {isKo ? "이자 소득의 15.4% (소득세 14% + 지방소득세 1.4%)" : "15.4% of interest income (14% income tax + 1.4% local tax)"}</li>
            <li><strong>{isKo ? "세금우대:" : "Tax preference:"}</strong> {isKo ? "이자 소득의 9.5% (특정 금융상품, 한도 내에서 적용)" : "9.5% of interest income (for qualifying products, within limits)"}</li>
            <li><strong>{isKo ? "비과세:" : "Tax-free:"}</strong> 0% {isKo ? "(비과세 종합저축 등 특정 요건 충족 시)" : "(when qualifying for tax-free composite savings, etc.)"}</li>
          </ul>
          <BlockMath math="\text{Net Payout} = \text{Principal} + (\text{Total Interest} - \text{Total Interest} \times \text{Tax Rate})" />
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-2">{isKo ? "계산 예시 (월 10만 원, 12개월, 연 3%, 단리, 일반과세)" : "Example (100,000/mo, 12 months, 3% annual, simple, general tax)"}</h4>
          <p className="text-sm text-muted-foreground">{isKo ? "원금 합계 = 100,000 × 12 = 1,200,000원" : "Total principal = 100,000 × 12 = 1,200,000"}</p>
          <p className="font-mono text-sm text-primary mt-1">{isKo ? "총 이자 = 100,000 × (12×13/2) × (0.03/12) = 19,500원" : "Total interest = 100,000 × (12×13/2) × (0.03/12) = 19,500"}</p>
          <p className="font-mono text-sm text-primary">{isKo ? "세금 = 19,500 × 15.4% = 3,003원" : "Tax = 19,500 × 15.4% = 3,003"}</p>
          <p className="font-mono text-sm text-primary">{isKo ? "세후 수령액 = 1,200,000 + (19,500 − 3,003) = 1,216,497원" : "Net payout = 1,200,000 + (19,500 − 3,003) = 1,216,497"}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold mt-10 mb-4">{isKo ? "💡 정기적금 200% 활용 가이드" : "💡 Getting the Most from Installment Savings"}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "1. '단리 vs 복리' 신화와 진실" : "1. Simple vs Compound — Myth and Truth"}</h3>
          <p className="mt-2">{isKo ? "흔히 복리는 무조건 좋다고 알려져 있지만, 1년 만기 정기적금에서는 단리와 월복리의 차이가 미미할 수 있습니다. 하지만 적금 기간이 길어지고 월 납입액이 커질수록 복리의 마법은 강력해집니다." : "Compound is often said to be always better, but for a 1-year installment plan the difference from simple interest is tiny. Over longer terms and larger deposits, however, compounding becomes powerful."}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "2. 금리 쇼핑은 필수! 0.1%의 나비효과" : "2. Rate Shopping Pays — The 0.1% Butterfly Effect"}</h3>
          <p className="mt-2">{isKo ? "발품, 아니 손품을 파는 만큼 이자는 올라갑니다. 주거래 은행만 고집하지 말고 인터넷 전문 은행이나 저축은행의 비대면 상품을 꼭 비교하세요." : "The more you shop, the higher your rate. Don't stick to your main bank — compare non-face-to-face products from internet-only and savings banks."}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "3. '선저축 후지출'을 위한 자동이체" : "3. Automate: Save First, Spend Later"}</h3>
          <p className="mt-2">{isKo ? "월급날 = 적금 이체일 공식을 만드세요. 월급이 들어오자마자 적금으로 자동이체하면 소비 유혹에서 벗어납니다." : "Set payday = transfer day. Auto-transfer to savings the moment salary arrives, removing the temptation to spend."}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "4. 비과세 종합저축 한도 놓치지 마세요" : "4. Don't Miss the Tax-Free Composite Savings Limit"}</h3>
          <p className="mt-2">{isKo ? "만 65세 이상, 장애인 등 조건 충족 시 전 금융기관 통합 5,000만 원 한도 내 이자 소득이 비과세됩니다." : "If you are 65+, disabled, or meet other criteria, interest income up to a 50M KRW combined limit across all banks is tax-free."}</p>
        </div>
      </div>
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
