import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./StockCompoundInterestClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/stock-compound-interest", "finance", "stock-compound-interest");
}

export default function StockCompoundInterestPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p className="text-lg font-semibold">
          {isKo
            ? "\"투자의 여덟 번째 불가사의.\" - 알버트 아인슈타인이 복리 효과를 묘사한 말입니다."
            : "\"The eighth wonder of the world.\" — how Albert Einstein reportedly described compound interest."}
        </p>
        <p>
          {isKo
            ? "주식 복리 계산기는 이 강력한 원리를 시각적으로 체험하게 해주는 금융 도구입니다. 초기 투자금과 매월 꾸준히 적립하는 금액이 연평균 수익률과 만나 어떤 놀라운 결과를 만들어내는지 직접 확인해보세요."
            : "The Stock Compound Interest calculator is a financial tool that visualizes this powerful principle. See directly how your initial investment and steady monthly contributions combine with an average annual return to produce surprising results."}
        </p>
        <p>
          {isKo
            ? "특히 장기적인 관점에서 투자를 계획하는 분들에게 유용합니다. 사회초년생이 은퇴 자금을 마련하거나 자녀 교육 자금을 준비할 때 현실적인 시뮬레이션이 가능합니다. S&P 500이나 KOSPI 200 같은 지수 추종 ETF에 장기 적립식 투자 시 미래를 예측해보세요."
            : "It is especially useful for long-term planning — building retirement funds or preparing for a child's education. Simulate the future of a long-term, systematic investment in index-tracking ETFs such as the S&P 500 or KOSPI 200."}
        </p>
        <p>
          {isKo
            ? "이 계산기는 과거 데이터나 기대 수익률을 기반으로 한 예측이며 미래 수익을 보장하지 않습니다. 하지만 복리의 마법을 이해하는 것만으로도 금융 여정의 훌륭한 나침반이 될 것입니다."
            : "The calculator is a prediction based on historical data or your expected return and does not guarantee future results. Yet understanding compounding alone makes it a great compass for your financial journey."}
        </p>
        <TermGlossary items={isKo ? [
          { term: '복리 (Compound Interest)', desc: '발생한 수익을 원금에 합산하여 재투자함으로써 시간이 지날수록 자산이 기하급수적으로 증식하는 원리입니다.' },
          { term: '적립식 투자 (DCA)', desc: '일정 주기마다 정해진 금액을 투자하여 평균 매수 단가를 낮추는 전략으로 시장 타이밍 위험을 줄여줍니다.' },
          { term: '실질 수익률', desc: '명목 수익률에서 물가상승률을 뺀 실질적인 구매력 증가분을 의미합니다.' },
        ] : [
          { term: 'Compound Interest', desc: 'Reinvesting earned returns into principal so assets grow exponentially over time.' },
          { term: 'Dollar-Cost Averaging', desc: 'Investing a fixed amount at regular intervals to lower the average purchase price and reduce market-timing risk.' },
          { term: 'Real Return', desc: 'The nominal return minus inflation — the actual increase in purchasing power.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4 p-4 bg-muted rounded-md">
        <h3 className="text-xl font-bold">{isKo ? "복리 계산의 작동 원리" : "How the Compound Calculation Works"}</h3>
        <p>{isKo ? "본 계산기는 매년 말에 수익이 재투자되고, 연초에 연간 적립금이 추가되는 것을 가정하여 계산합니다." : "The calculator assumes returns are reinvested at each year-end and the annual contribution is added at the start of the year."}</p>
        <ul className="list-decimal list-inside space-y-2">
          <li>
            <strong>{isKo ? "1년차 평가금액:" : "Year 1 value:"}</strong>
            <p className="pl-4 mt-1 bg-card p-2 rounded"><code>({isKo ? "초기 투자금 + (월 추가 투자금 × 12)" : "Initial Investment + (Monthly Contribution × 12)"}) × (1 + {isKo ? "연 수익률" : "Annual Return"})</code></p>
            <p className="text-sm text-muted-foreground mt-1">{isKo ? "첫 해에는 초기 자본과 1년치 적립금이 합쳐진 후 연말에 수익이 발생합니다." : "In the first year, initial capital and one year of contributions are combined, then returns are applied at year-end."}</p>
          </li>
          <li>
            <strong>{isKo ? "2년차 이후 평가금액:" : "Year 2 and beyond:"}</strong>
            <p className="pl-4 mt-1 bg-card p-2 rounded"><code>({isKo ? "이전 년도 평가금액 + (월 추가 투자금 × 12)" : "Previous Year Value + (Monthly Contribution × 12)"}) × (1 + {isKo ? "연 수익률" : "Annual Return"})</code></p>
            <p className="text-sm text-muted-foreground mt-1">{isKo ? "두 번째 해부터는 누적 자산에 다시 1년치 적립금을 더하고 그 총액에 수익이 붙는 복리 효과가 본격적으로 나타납니다." : "From year two, another year of contributions is added to the accumulated balance and returns compound on the total."}</p>
          </li>
        </ul>
        <div className="border-l-4 border-primary pl-4 mt-4">
          <p><strong>{isKo ? "핵심 변수 해설:" : "Key variables:"}</strong></p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>{isKo ? "초기 투자금:" : "Initial investment:"}</strong> {isKo ? "투자의 씨앗이 되는 돈입니다. 금액이 클수록 복리 효과를 더 빨리 누릴 수 있습니다." : "The seed money. A larger amount lets you enjoy compounding sooner."}</li>
            <li><strong>{isKo ? "월 추가 투자금:" : "Monthly contribution:"}</strong> {isKo ? "적립식 투자의 힘을 보여주는 변수입니다. 꾸준함이 비범함을 만듭니다." : "The power of systematic investing — consistency beats brilliance."}</li>
            <li><strong>{isKo ? "연 수익률:" : "Annual return:"}</strong> {isKo ? "자산을 불리는 엔진입니다. S&P 500의 역사적 연평균은 약 10~12%이나 보장된 수치는 아닙니다." : "The engine of growth. The S&P 500's historical average is ~10–12% but is not guaranteed."}</li>
            <li><strong>{isKo ? "투자 기간:" : "Investment period:"}</strong> {isKo ? "복리 효과를 극대화하는 가장 중요한 요소입니다." : "The single most important factor for maximizing compounding."}</li>
          </ul>
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-2">{isKo ? "계산 예시 (초기 100만 원, 월 10만 원, 연 8%, 1년차)" : "Example (1,000,000 initial, 100,000/mo, 8% annual, year 1)"}</h4>
          <p className="text-sm text-muted-foreground">{isKo ? "1년차 평가금액 = (초기 1,000,000 + 월적립 1,200,000) × (1 + 0.08)" : "Year 1 = (1,000,000 + 1,200,000) × 1.08"}</p>
          <p className="font-mono text-sm text-primary mt-1">= 2,200,000 × 1.08 = 2,376,000</p>
          <p className="text-xs text-muted-foreground mt-1">{isKo ? "2년차부터는 직전 평가금액에 다시 1년치 적립금을 더한 뒤 8% 수익이 복리로 붙습니다." : "From year 2, another year of contributions is added to the prior balance, then 8% compounds on the total."}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-2">{isKo ? "1. 현실적인 수익률 설정의 중요성" : "1. Set a Realistic Return Assumption"}</h4>
          <p>{isKo ? "높은 수익률은 매력적이지만 비현실적인 기대는 잘못된 결정으로 이어집니다. S&P 500 약 10%를 기준으로 삼고, 보수적(5~7%)과 낙관적(12~15%) 시나리오를 함께 비교하세요." : "High returns are tempting, but unrealistic expectations lead to bad decisions. Use ~10% (S&P 500) as a baseline and compare conservative (5–7%) and optimistic (12–15%) scenarios."}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-2">{isKo ? "2. '72의 법칙'으로 자산 증식 속도 가늠하기" : "2. Gauge Speed with the Rule of 72"}</h4>
          <p>{isKo ? "복잡한 계산 없이 자산이 두 배가 되는 시간을 어림짐작할 수 있는 공식입니다. '72 ÷ 연 수익률(%)'로 계산합니다. 연 8%라면 약 9년마다 자산이 두 배로 불어납니다." : "Estimate doubling time without complex math: 72 ÷ annual return (%). At 8%, your money doubles roughly every 9 years."}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-2">{isKo ? "3. 적립식 투자(DCA)의 마법" : "3. The Magic of Dollar-Cost Averaging"}</h4>
          <p>{isKo ? "매월 정해진 금액을 투자하는 적립식 투자는 시장 타이밍 위험을 줄여줍니다. 주가가 낮을 때 더 many 수량을 매수하여 평균 단가를 낮추는 검증된 전략입니다." : "Investing a fixed amount monthly reduces market-timing risk. You buy more shares when prices are low and fewer when high, lowering the average cost — a proven strategy."}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-2">{isKo ? "4. 세금과 수수료를 잊지 마세요" : "4. Don't Forget Taxes and Fees"}</h4>
          <p>{isKo ? "계산 결과는 세전 기준입니다. 증권거래세, 배당소득세(15.4%), 해외 주식 양도소득세(22%) 등이 실제 수익을 깎습니다. 연금저축·ISA 등 절세 계좌를 활용하세요." : "Results are pre-tax. Securities transaction tax, dividend tax (15.4%), and overseas capital gains tax (22%) all reduce real returns. Use tax-advantaged accounts like pensions or ISA."}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-2">{isKo ? "5. 인플레이션을 감안한 실질 수익률" : "5. Real Return After Inflation"}</h4>
          <p>{isKo ? "화폐 가치는 시간이 지남에 따라 하락합니다. 10% 수익 중 물가가 3% 올랐다면 실질 증가는 약 7%입니다. 명목이 아닌 실질 수익률로 목표를 세우세요." : "Currency loses value over time. If you earn 10% but inflation is 3%, your real gain is ~7%. Plan on real, not nominal, returns."}</p>
        </div>
      </div>
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
