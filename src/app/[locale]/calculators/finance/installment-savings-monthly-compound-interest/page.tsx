import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./InstallmentSavingsMonthlyCompoundInterestClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/installment-savings-monthly-compound-interest", "finance", "installment-savings-monthly-compound-interest");
}

export default function InstallmentSavingsMonthlyCompoundInterestPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-6">
        <p>
          {isKo
            ? "월복리 적금 계산기는 재테크의 가장 기본이면서도 강력한 원리인 '복리'의 힘을 시각적으로 체험하게 해주는 스마트한 도구입니다. 이 계산기는 매월 꾸준히 납입하는 소중한 저축액이 시간과 이자율이라는 두 개의 날개를 달고 어떻게 거대한 눈덩이처럼 불어나는지를 명확하게 보여줍니다."
            : "The Monthly Compound Interest Savings calculator is a smart tool that visualizes the power of compounding — the most basic yet strongest principle of wealth building. It clearly shows how your steady monthly deposits grow into a snowball over time, powered by time and interest rate."}
        </p>
        <p>
          {isKo
            ? "단순히 만기 금액을 알려주는 데 그치지 않고, 월초/월말 납입 선택이라는 미세한 차이가 어떤 나비효과를 가져오는지, 금리가 0.1% 변동할 때 미래 자산이 얼마나 달라지는지 등 다양한 시나리오를 시뮬레이션할 수 있습니다."
            : "Beyond the maturity amount, it simulates scenarios such as the butterfly effect of choosing beginning- vs end-of-month deposits, and how a 0.1% rate change alters your future wealth."}
        </p>
        <p>
          {isKo
            ? "특히 사회초년생이나 목돈 마련을 처음 시작하는 분들에게 이 계산기는 훌륭한 금융 멘토가 될 것입니다. 지금 바로 당신의 미래를 위한 첫걸음을 시작해보세요!"
            : "It is a great financial mentor especially for first-time savers. Start your first step toward the future today!"}
        </p>
        <TermGlossary items={isKo ? [
          { term: '월복리', desc: '매월 발생한 이자를 원금에 합산하여 다음 달 이자에 포함시키는 방식으로, 단리보다 장기적으로 유리합니다.' },
          { term: '기수불 / 기말불', desc: '매월 초(기수불)에 납입하면 말(기말불)보다 한 달치 이자를 더 받아 최종 수령액이 커집니다.' },
          { term: '비과세 종합저축', desc: '요건 충족 시 전 금융기관 통합 5,000만 원 한도 내 이자 소득이 면제되는 적금 상품입니다.' },
        ] : [
          { term: 'Monthly compounding', desc: 'Interest earned each month is added to principal and earns interest next month; better than simple interest long-term.' },
          { term: 'Annuity due / Ordinary', desc: 'Depositing at the start of each month (annuity due) earns one extra month of interest vs the end (ordinary), increasing the final payout.' },
          { term: 'Tax-free composite savings', desc: 'For qualifying savers, interest income up to a 50M KRW combined limit across all banks is exempt.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-8">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-3">{isKo ? "📈 복리, 이자가 이자를 낳는 마법" : "📈 Compound Interest — Interest on Interest"}</h3>
          <p>
            {isKo
              ? "복리는 '이자에 대한 이자'가 붙는다는 점에서 단리와 근본적인 차이를 가집니다. 발생한 이자를 원금에 포함시켜 다음 기간의 이자를 계산하며, 이 작은 차이가 장기적으로 '눈덩이 효과'를 만들어냅니다."
              : "Compound interest differs from simple interest in that it earns 'interest on interest'. Earned interest is added to principal for the next period, and this small difference creates the long-term 'snowball effect'."}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-3">{isKo ? "🧮 월복리 적금 만기액 계산 공식" : "🧮 Maturity Formula for Monthly Compound Savings"}</h3>
          <p className="mb-4">
            {isKo
              ? "월복리 적금의 최종 수령액은 매월 언제 납입하는지에 따라 달라집니다. 하루라도 먼저 넣는 것이 이득이라는 사실을 수식으로 확인해 보세요."
              : "The final payout depends on when each month's deposit is made. Even a day earlier helps — see the formulas below."}
          </p>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "1. 월초 납입 (기수불, Annuity Due)" : "1. Beginning-of-month (Annuity Due)"}</h4>
            <p className="mt-2 mb-3 text-sm">{isKo ? "매월 초반에 납입하면 납입금이 한 달치 이자를 온전히 다 받아 월말 납입보다 유리합니다." : "Depositing early in the month earns a full extra month of interest, better than end-of-month."}</p>
            <BlockMath math="S = A(1 + r)\left[\dfrac{(1 + r)^{n} - 1}{r}\right]" />
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary mt-6">
            <h4 className="font-bold text-lg text-primary">{isKo ? "2. 월말 납입 (기말불, Ordinary Annuity)" : "2. End-of-month (Ordinary Annuity)"}</h4>
            <p className="mt-2 mb-3 text-sm">{isKo ? "매월 마지막 날에 납입하면 월초 납입 공식에서 (1+r) 항이 빠진 것을 볼 수 있습니다." : "Depositing at month-end drops the (1+r) factor compared to the beginning-of-month formula."}</p>
            <BlockMath math="S = A\left[\dfrac{(1 + r)^{n} - 1}{r}\right]" />
          </div>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p><strong className="font-semibold text-foreground">S</strong>: {isKo ? "만기 시 총 수령액 (원금 + 이자)" : "Total maturity payout (principal + interest)"}</p>
            <p><strong className="font-semibold text-foreground">A</strong>: {isKo ? "매월 납입하는 금액 (월 적립금)" : "Monthly deposit amount"}</p>
            <p><strong className="font-semibold text-foreground">r</strong>: {isKo ? "월 이자율 (연이율 / 12)" : "Monthly rate (annual rate / 12)"}</p>
            <p><strong className="font-semibold text-foreground">n</strong>: {isKo ? "총 납입 개월 수 (기간)" : "Total number of monthly deposits (term)"}</p>
          </div>
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">{isKo ? "계산 예시 (월 10만 원, 12개월, 연 5%, 월초 납입)" : "Example (100,000/mo, 12 months, 5% annual, beginning-of-month)"}</h4>
            <p className="text-sm text-muted-foreground">r = 5% / 12 ≈ 0.0041667</p>
            <p className="font-mono text-sm text-primary mt-1">S = 100,000 × 1.0041667 × [((1.0041667)^12 − 1) / 0.0041667] ≈ 1,229,980</p>
            <p className="text-xs text-muted-foreground mt-1">{isKo ? "원금 합계 1,200,000원 대비 이자 약 29,980원 (월말 납입 시 약 1,225,132원)" : "About 29,980 interest on 1,200,000 principal (vs ~1,225,132 if end-of-month)"}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? "🚀 적금을 성공으로 이끄는 7가지 필승 전략" : "🚀 7 Winning Strategies for Successful Savings"}</h2>
        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "1. '시간의 마법'을 믿고, 지금 당장 시작하세요." : "1. Trust the Magic of Time — Start Now"}</h4>
            <p className="mt-2">{isKo ? "복리의 가장 친한 친구는 '시간'입니다. 25세에 매월 30만원씩 연 5% 복리 적금을 시작하면 60세에 약 4억 3천만원을 모을 수 있지만, 10년 늦은 35세에 시작하면 약 2억 3천만원에 그칩니다. 중요한 것은 '지금 바로' 시작하는 것입니다." : "Time is compounding's best friend. Starting 10 years earlier can nearly double your final amount. Even small sums help — the key is to start now."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "2. 세금, 모르면 손해! '세금우대'와 '비과세'를 활용하세요." : "2. Taxes Hurt If Ignored — Use Tax Breaks"}</h4>
            <p className="mt-2">{isKo ? "일반 적금 이자에는 15.4%의 세금이 붙습니다. ISA 등을 활용하면 절세 혜택을 누릴 수 있고, 조건 충족 시 9.5% 저율과세나 완전 비과세 상품도 있습니다. 5,000만원 한도 비과세 종합저축도 잊지 마세요." : "General savings interest is taxed at 15.4%. ISA and other vehicles can cut tax; qualifying savers may get 9.5% preferential or fully tax-free rates. Don't forget the 50M KRW tax-free composite savings limit."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "3. '월초 납입' 습관, 티끌 모아 태산을 만듭니다." : "3. Develop the Beginning-of-Month Habit"}</h4>
            <p className="mt-2">{isKo ? "급여일이 25일이라면 자동이체일을 다음달 1일로 설정하세요. 월초 납입은 월말 대비 더 많은 이자를 줍니다. 작은 차이가 모여 부를 이룹니다." : "If payday is the 25th, set auto-transfer for the 1st of next month. Beginning-of-month deposits earn more interest than end-of-month — small details build wealth."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "4. '실질금리'를 계산하여 돈의 가치를 지키세요." : "4. Calculate the Real Rate to Protect Value"}</h4>
            <p className="mt-2">{isKo ? "은행이 제시하는 금리는 '명목금리'입니다. 물가상승률을 뺀 '실질금리'가 플러스가 되도록, 적어도 물가상승률 이상의 금리를 제공하는 상품을 선택하세요." : "The bank's rate is 'nominal'. Subtract inflation to get the 'real' rate; choose products whose rate beats expected inflation to avoid losing purchasing power."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "5. '만기 유지'는 철칙, '긴급 예비 자금'을 준비하세요." : "5. Keep to Maturity — Build an Emergency Fund"}</h4>
            <p className="mt-2">{isKo ? "중도 해지 시 약정 복리 이자는커녕 중도해지이율이 적용됩니다. 3~6개월치 생활비를 별도 통장에 마련해두세요." : "Early withdrawal forfeits the agreed compounding rate. Keep 3–6 months of living expenses in a separate account to avoid breaking savings."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "6. '특판 상품'과 '제2금융권'을 노리세요." : "6. Target Special Rates and Tier-2 Banks"}</h4>
            <p className="mt-2">{isKo ? "저축은행·신협·새마을금고 등은 시중은행보다 높은 금리를 제공합니다. 예금자보호법상 1인·1기관당 원리금 5,000만원까지 보호되니 그 한도 내에서 활용하세요." : "Savings banks, credit unions, and community banks often pay higher rates than big banks. Deposits are protected up to 50M KRW per person per institution — use that limit wisely."}</p>
          </div>
          <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
            <h4 className="font-bold text-lg text-primary">{isKo ? "7. '72의 법칙'으로 미래를 예측하세요." : "7. Predict the Future with the Rule of 72"}</h4>
            <p className="mt-2">{isKo ? "'72의 법칙'은 원금이 2배가 되는 데 걸리는 시간을 가늠하는 공식입니다. '72 ÷ 연이율(%)'로 계산합니다. 연 6%라면 약 12년(72÷6)입니다." : "The Rule of 72 estimates doubling time: 72 ÷ annual rate (%). At 6% it takes about 12 years (72 ÷ 6) to double your money."}</p>
          </div>
        </div>
      </div>
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
