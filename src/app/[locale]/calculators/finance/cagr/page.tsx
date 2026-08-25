import type { Metadata } from "next";
import { BlockMath } from "react-katex";
import TermGlossary from "@/components/calculators/TermGlossary";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./CagrClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/cagr", "finance", "cagr");
}

export default function CagrPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

    const infoSectionContent = {
    calculatorDescription: (
      <>
        <h2 className="text-2xl font-bold mb-4">{isKo ? 'CAGR 계산기: 투자의 진정한 성과를 측정하는 눈' : 'CAGR Calculator: The Eye That Measures True Investment Performance'}</h2>
        <p className="text-foreground">
          {isKo ? <>변동성이 큰 투자의 세계에서 특정 기간의 수익률만 보고 웃고 우는 것은 나무만 보고 숲을 보지 못하는 것과 같습니다. <strong>연평균 성장률(CAGR, Compound Annual Growth Rate)</strong>은 바로 그 숲, 즉 당신의 투자가 시간이 지남에 따라 어떤 '평균적인' 성장세를 보였는지 알려주는 강력한 나침반입니다. 매년 들쑥날쑥하는 수익률의 안개를 걷어내고, 마치 매년 일정하게 복리로 성장한 것처럼 환산하여 투자의 장기적인 성과를 명료하게 보여줍니다.</> : <>In a volatile investment world, laughing or crying over a single period's return is like seeing only the trees and missing the forest. The <strong>Compound Annual Growth Rate (CAGR)</strong> is a powerful compass that shows the forest—the 'average' growth your investment has shown over time. It clears the fog of fluctuating yearly returns and clearly reveals long-term performance as if it grew at a steady compound rate each year.</>}
        </p>
        <p className="mt-4 text-foreground">
          {isKo ? "All-in-Calc의 CAGR 계산기는 주식, 펀드, 부동산, 암호화폐 등 다양한 자산의 성과를 객관적으로 평가하고, 여러 투자 대안을 동일한 기준으로 비교할 수 있도록 돕습니다. 더 나아가 기업의 매출 성장률, 사용자 증가 추이 등 비즈니스 성과를 분석하는 데에도 핵심적인 지표로 활용될 수 있습니다. 이제 복잡한 계산은 저희에게 맡기고, 당신은 데이터가 말해주는 통찰에만 집중하세요." : "All-in-Calc's CAGR calculator objectively evaluates the performance of various assets—stocks, funds, real estate, crypto—and lets you compare investment alternatives on the same basis. It can also serve as a key metric for analyzing business performance such as revenue growth and user growth trends. Leave the complex math to us and focus on the insights the data reveals."}
        </p>        <TermGlossary items={[
          { term: isKo ? 'CAGR (연평균 성장률)' : 'CAGR (Compound Annual Growth Rate)', desc: isKo ? '특정 기간 동안 자산이 매년 일정하게 복리로 성장했다고 가정할 때의 연평균 성장률을 의미합니다.' : 'The average annual growth rate assuming the asset grew at a steady compound rate each year over the period.' },
          { term: isKo ? '72의 법칙' : 'Rule of 72', desc: isKo ? '원금이 2배가 되는 기간(년)을 어림짐작하는 공식으로, 72를 연평균 성장률(%)로 나누면 됩니다.' : 'A formula to estimate the years for principal to double: divide 72 by the annual growth rate (%).' },
          { term: isKo ? 'MDD (최대 낙폭)' : 'MDD (Maximum Drawdown)', desc: isKo ? '투자 기간 중 발생한 최고점 대비 최저점의 하락폭으로, 투자의 변동성(위험)을 나타내는 지표입니다.' : 'The peak-to-trough decline during the investment period, an indicator of volatility (risk).' },
        ]} />

      </>
    ),
    calculationFormula: (
      <>
        <h3 className="text-xl font-semibold mt-6 mb-4">{isKo ? '📈 CAGR 공식, 복리의 마법을 숫자로 풀다' : '📈 The CAGR Formula: Compounding Magic in Numbers'}</h3>
        <p className="mb-4">
          {isKo ? "CAGR의 핵심은 '복리'의 개념을 역으로 추적하는 데 있습니다. 최종 자산이 초기 자산으로부터 매년 복리로 성장했다고 가정할 때, 그 평균적인 연간 성장률이 얼마인지를 계산하는 것입니다." : "The core of CAGR is tracing the concept of 'compounding' backwards. It calculates the average annual growth rate, assuming the ending value grew from the starting value at a compound rate each year."}
        </p>
        <div className="mt-4 p-6 bg-muted rounded-lg text-center shadow-inner">
          <BlockMath math="\text{CAGR} = \left( \frac{\text{EV}}{\text{BV}} \right)^{\frac{1}{n}} - 1" />
        </div>
        <div className="mt-6 space-y-4 text-sm">
          <p><strong className="text-primary">{isKo ? '- 최종 가치 / 초기 가치:' : '- Ending Value / Starting Value:'}</strong> {isKo ? '전체 기간 동안 자산이 총 몇 배로 성장했는지를 나타냅니다.' : 'Shows how many times the asset grew over the whole period.'}</p>
          <p><strong className="text-primary">{isKo ? '- ^(1 / 기간):' : '- ^(1 / Period):'}</strong> {isKo ? "'거듭제곱근' 계산입니다. 총 성장 배수를 투자 기간(년)으로 나누어 연평균 성장률을 구하는 과정입니다. 예를 들어 5년이면 5제곱근을, 10년이면 10제곱근을 취하는 것과 같습니다." : "The 'root' calculation. It divides the total growth multiple by the investment period (years) to find the average annual growth—e.g., the 5th root for 5 years, the 10th root for 10 years."}</p>
          <p><strong className="text-primary">{isKo ? '- (- 1) * 100:' : '- (- 1) * 100:'}</strong> {isKo ? '계산된 연평균 성장률을 백분율(%)로 변환합니다.' : 'Converts the computed annual growth rate into a percentage (%).'}</p>
        </div>
        <div className="mt-6 p-4 border-l-4 border-primary bg-muted">
          <h4 className="font-semibold text-md mb-2">{isKo ? '계산 예시)' : 'Example)'}</h4>
          <p>{isKo ? '2020년 초에 1,000만 원으로 시작한 투자가 2025년 초에 2,500만 원이 되었다면, 투자 기간은 5년입니다.' : 'If an investment starting at 10M KRW in early 2020 became 25M KRW in early 2025, the period is 5 years.'}</p>
          <ul className="list-decimal list-inside mt-2 space-y-1">
            <li>{isKo ? '총 성장 배수: 2,500만 원 / 1,000만 원 = 2.5배' : 'Total growth multiple: 25M / 10M = 2.5x'}</li>
            <li>{isKo ? '연평균 성장률 환산: 2.5 ^ (1/5) ≈ 1.2011' : 'Annual growth conversion: 2.5 ^ (1/5) ≈ 1.2011'}</li>
            <li>{isKo ? '백분율 변환: (1.2011 - 1) * 100 ≈ 20.11%' : 'Percentage conversion: (1.2011 - 1) * 100 ≈ 20.11%'}</li>
          </ul>
          <p className="mt-2 font-semibold">{isKo ? <>→ 즉, 이 투자는 5년간 매년 평균 <strong>20.11%</strong>씩 복리로 성장한 것과 같습니다.</> : <>→ That is, this investment grew at an average compound rate of <strong>20.11%</strong> per year over 5 years.</>}</p>
        </div>
      </>
    ),
    usefulTips: (
      <>
        <h3 className="text-xl font-semibold mt-6 mb-4">{isKo ? '💡 투자 고수처럼 CAGR 활용하기: 5가지 실전 전략' : '💡 Use CAGR Like a Pro: 5 Practical Strategies'}</h3>
        <ul className="space-y-6">
          <li className="p-4 rounded-md bg-muted shadow">
            <h4 className="font-semibold text-lg mb-2 text-primary">{isKo ? "1. '기간'이 다른 투자 성과, 공정하게 비교하기" : '1. Fairly Compare Investments With Different Periods'}</h4>
            <p>{isKo ? <>"A 주식은 3년간 50% 수익, B 펀드는 5년간 80% 수익." 언뜻 보면 B 펀드가 더 우수해 보입니다. 정말 그럴까요? CAGR로 연평균 수익률을 계산해보면 진실이 보입니다.<br/>- A 주식 CAGR: ((1.5)^(1/3) - 1) * 100 ≈ <strong>14.47%</strong><br/>- B 펀드 CAGR: ((1.8)^(1/5) - 1) * 100 ≈ <strong>12.47%</strong><br/>결론적으로 연평균 성장률은 A 주식이 더 높았습니다. 이처럼 CAGR은 투자 기간의 함정을 제거하고 객관적인 비교를 가능하게 합니다.</> : <>"Stock A: 50% over 3 years, Fund B: 80% over 5 years." At first glance B looks better. Really? Computing the annual return with CAGR reveals the truth.<br/>- Stock A CAGR: ((1.5)^(1/3) - 1) * 100 ≈ <strong>14.47%</strong><br/>- Fund B CAGR: ((1.8)^(1/5) - 1) * 100 ≈ <strong>12.47%</strong><br/>In fact Stock A had the higher annual growth. CAGR removes the trap of differing periods and enables objective comparison.</>}</p>
          </li>
          <li className="p-4 rounded-md bg-muted shadow">
            <h4 className="font-semibold text-lg mb-2 text-primary">{isKo ? "2. '과정의 변동성'이라는 숨겨진 리스크를 인지하기" : "2. Recognize the Hidden Risk of 'Path Volatility'"}</h4>
            <p>{isKo ? <>CAGR은 시작과 끝만 보기 때문에 중간의 롤러코스터 같은 변동성을 보여주지 않습니다. CAGR 10%를 달성한 두 상품이 있더라도, 하나는 꾸준히 성장했고 다른 하나는 +100%와 -50%를 오갔을 수 있습니다. 높은 변동성은 투자 심리를 흔들어 잘못된 매매를 유발할 수 있습니다. CAGR과 함께 <strong>표준편차</strong>나 <strong>MDD(최대 낙폭)</strong> 같은 변동성 지표를 함께 확인하여 투자의 '질'을 평가하는 습관을 들이세요.</> : <>Because CAGR looks only at the start and end, it hides the roller-coaster volatility in between. Two products with 10% CAGR—one grew steadily, the other swung between +100% and -50%. High volatility shakes investor psychology and triggers bad trades. Build the habit of evaluating investment 'quality' with volatility metrics like <strong>standard deviation</strong> or <strong>MDD (maximum drawdown)</strong> alongside CAGR.</>}</p>
          </li>
          <li className="p-4 rounded-md bg-muted shadow">
            <h4 className="font-semibold text-lg mb-2 text-primary">{isKo ? '3. 과거 데이터는 참고자료일 뿐, 미래를 보장하지 않는다' : '3. Past Data Is Only a Reference, Not a Guarantee of the Future'}</h4>
            <p>{isKo ? <>과거의 높은 CAGR이 미래의 고수익을 약속하는 수정 구슬은 아닙니다. 특히 기술주처럼 폭발적으로 성장한 산업의 과거 CAGR은 매우 높게 나타날 수 있습니다. 과거 성과의 원인을 분석하고, <strong>산업의 패러다임 변화, 경쟁 환경, 규제 리스크, 기업의 펀더멘털</strong> 등 질적 요소를 반드시 함께 고려하여 미래 성장 지속 가능성을 판단해야 합니다.</> : <>A high past CAGR is not a crystal ball promising future high returns. Explosively growing industries like tech stocks can show very high historical CAGR. Analyze the cause of past performance and always consider qualitative factors like <strong>industry paradigm shifts, competitive landscape, regulatory risk, and company fundamentals</strong> to judge future growth sustainability.</>}</p>
          </li>
          <li className="p-4 rounded-md bg-muted shadow">
            <h4 className="font-semibold text-lg mb-2 text-primary">{isKo ? "4. '72의 법칙'으로 복리의 힘을 직관적으로 이해하기" : "4. Intuitively Grasp Compounding With the 'Rule of 72'"}</h4>
            <p>{isKo ? <>CAGR과 함께 알아두면 유용한 것이 '72의 법칙'입니다. <strong>'72 / CAGR(%) ≈ 원금이 2배가 되는 기간(년)'</strong> 입니다. 예를 들어, CAGR이 12%라면 원금이 2배가 되는 데 약 6년(72/12)이 걸린다고 빠르게 어림짐작할 수 있습니다. 이는 장기 투자의 목표를 세우고 복리의 힘을 체감하는 데 유용한 사고 도구입니다.</> : <>Useful alongside CAGR is the 'Rule of 72': <strong>'72 / CAGR(%) ≈ years to double the principal'</strong>. For example, at 12% CAGR you can quickly estimate ~6 years (72/12) to double. It is a handy mental tool for setting long-term goals and feeling the power of compounding.</>}</p>
          </li>
          <li className="p-4 rounded-md bg-muted shadow">
            <h4 className="font-semibold text-lg mb-2 text-primary">{isKo ? '5. CAGR의 한계를 명확히 알고 보완 지표 활용하기' : '5. Know CAGR\u2019s Limits and Use Complementary Metrics'}</h4>
            <p>{isKo ? <>CAGR은 중간에 자금을 추가 투입하거나 인출하는 경우를 전혀 반영하지 못합니다. 매월 적립식으로 투자하는 경우, CAGR은 실제 최종 수익률과 큰 차이를 보일 수 있습니다. 이럴 때는 현금 흐름까지 고려하는 <strong>금액가중수익률(MWRR)</strong>이나, 외부 요인(입출금)을 제거하고 순수 운용 성과만 측정하는 <strong>시간가중수익률(TWRR)</strong>을 참고하는 것이 더 정확할 수 있습니다. CAGR의 한계를 명확히 인지하고 상황에 맞는 지표를 선택하는 것이 중요합니다.</> : <>CAGR does not reflect adding or withdrawing funds midway. For monthly installment investing, CAGR can differ greatly from the actual final return. In such cases, referencing the <strong>money-weighted rate of return (MWRR)</strong>, which considers cash flows, or the <strong>time-weighted rate of return (TWRR)</strong>, which removes external factors (deposits/withdrawals) to measure pure performance, can be more accurate. Recognize CAGR's limits and choose the right metric for the situation.</>}</p>
          </li>
        </ul>
      </>
    ),
  };

  return <CalculatorClient infoSection={infoSectionContent} />;
}
