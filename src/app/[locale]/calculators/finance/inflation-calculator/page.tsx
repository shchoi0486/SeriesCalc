import TermGlossary from "@/components/calculators/TermGlossary";
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./InflationCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/inflation-calculator", "finance", "inflation-calculator");
}

export default function InflationCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "물가지수 값은 어디서 확인하나요?" : "Where can I find price index figures?",
      a: isKo
        ? "한국은행 경제통계시스템(ECOS)에서 소비자물가지수(CPI)를 연도별로 조회할 수 있고, 통계청 KOSIS에서도 같은 지표를 제공합니다. 조회 시 기준연도 표기를 반드시 확인하세요. 기준이 2020년=100인 시리즈와 2015년=100인 시리즈를 섞어 쓰면 결과가 완전히 어긋납니다. 두 지수는 같은 기준연도의 것을 짝지어 입력해야 합니다."
        : "The Bank of Korea's ECOS system publishes annual Consumer Price Index series, as does Statistics Korea (KOSIS). Always pair indices from the same base-year series — mixing a 2020=100 series with a 2015=100 one throws every result off.",
    },
    {
      q: isKo ? "연평균 물가상승률이 연도별 상승률의 단순 평균과 다른 이유는?" : "Why isn't the average annual rate just the arithmetic mean?",
      a: isKo
        ? "물가는 복리로 누적되므로 기하평균으로 잡아야 정확합니다. 예컨대 첫해에 10% 올랐다가 다음 해 10% 내렸다면 단순 평균은 0%지만, 실제 물가는 1.10×0.90 = 0.99로 원래보다 1% 낮은 수준입니다. 이 계산기의 공식 ((현재지수/과거지수)^(1/n) − 1)이 바로 그 기하평균 방식입니다."
        : "Prices compound, so the geometric mean is the correct average. A year up 10% followed by a year down 10% averages zero arithmetically, yet prices actually sit 1% below where they started (1.10 × 0.90 = 0.99). The formula used here — (current/past)^(1/n) − 1 — captures exactly that.",
    },
    {
      q: isKo ? "실질금리 계산에는 어떻게 활용하죠?" : "How do I use this for real interest rates?",
      a: isKo
        ? "명목 금리에서 예상 물가상승률을 빼면 대략적인 실질금리가 나옵니다. 연 3% 예금에 물가상승률이 3%라면 실질 수익은 0%로, 돈의 구매력이 그대로라는 뜻입니다. 정확한 정의는 (1+명목금리)/(1+물가상승률)−1이지만, 물가상승률이 낮은 구간에서는 뺄셈 근사로 충분히 실용적입니다. 예금·연금 설계 시 이 숫자가 마이너스면 현금 보유 전략을 재점검할 신호입니다."
        : "Subtract expected inflation from nominal yield for an approximation of real return: a 3% deposit under 3% inflation preserves purchasing power but grows it not at all. The precise definition divides rather than subtracts, though the difference is negligible at low inflation. A negative real rate on long-term savings is your cue to revisit the strategy.",
    },
    {
      q: isKo ? "체감 물가와 공식 지수가 다르게 느껴지는데요?" : "Official numbers don't match what I feel at the store. Why?",
      a: isKo
        ? "CPI는 도시 가구의 평균 소비 바구니 기준입니다. 외식·배달 비중이 크거나 전세→매매 전환처럼 주거 비용이 급변한 가구는 평균과 괴리가 큽니다. 특히 식료품·외식은 물가상승률이 전체 평균보다 높게 나오는 시기가 많아 '공부하는 사람은 2%인데 장바구니는 10%'라는 체감이 생깁니다. 본인 소비 패턴 항목의 지수를 따로 추적해 비교해 보는 것도 좋은 방법입니다."
        : "CPI reflects the average urban household basket. Households heavy on dining out, or those whose housing costs jumped through a jeonse-to-purchase switch, will diverge from that average. Food categories often run hotter than headline inflation, fueling the gap between official figures and grocery receipts — tracking the subindices matching your own spending helps reconcile them.",
    },
    {
      q: isKo ? "장기 재무목표는 어떻게 설정해야 하나요?" : "How should long-term financial targets account for this?",
      a: isKo
        ? "목표 금액을 '미래 화폐'로 말하기보다 현재 구매력 기준으로 정의하고, 이 계산기의 역방향 논리로 미래 필요액을 부풀려야 합니다. 예컨대 현재 가치 1억원이 필요한 노후 자금을 물가 3% 가정 30년 뒤에 준비한다면 1억 × 1.03^30 ≈ 2억 4,273만원이 되어야 같은 구매력입니다. 목표액을 인플레로 먼저 증식시킨 뒤 그 금액을 위한 저축·투자 계획을 세우는 순서가 안전합니다."
        : "Define goals in today's purchasing power, then gross them up by inflation before planning contributions. One hundred million won needed in 30 years under 3% inflation means accumulating roughly 242.73 million in future currency for the same real value. Inflate the target first, then plan toward the inflated number.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? '물가상승률 계산기는 과거의 금액이 현재의 화폐 가치로 환산하면 얼마나 되는지, 그리고 연평균 물가상승률은 어느 정도인지 계산해주는 도구입니다. 물가지수를 이용하여 실제 구매력의 변화를 확인할 수 있습니다.' : 'The Inflation Calculator converts a past amount to its current monetary value and computes the average annual inflation rate. Using price indices, it shows the real change in purchasing power.'}</p>
        <TermGlossary items={[
          { term: isKo ? '물가지수' : 'Price Index', desc: isKo ? '소비자물가의 변동을 측정하는 지표로, 기준연도를 100으로 하여 상대적으로 표시합니다.' : 'A measure of consumer price changes, expressed relatively with a base year set to 100.' },
          { term: isKo ? '구매력' : 'Purchasing Power', desc: isKo ? '화폐가 실제로 살 수 있는 재화·서비스의 양을 의미합니다. 물가가 오르면 구매력은 떨어집니다.' : 'The quantity of goods and services that currency can actually buy. When prices rise, purchasing power falls.' },
          { term: isKo ? '연평균 물가상승률' : 'Average Annual Inflation Rate', desc: isKo ? '연도별 물가 상승률의 기하평균으로, 일정 기간 동안의 평균적인 물가 상승 속도를 나타냅니다.' : 'The geometric mean of yearly inflation rates, representing the average pace of price increases over a period.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "과거 금액 입력" : "Enter the past amount",
            isKo ? "'그때 이만큼이면 이걸 살 수 있었다'는 금액을 만원 단위로 입력합니다." : "Type the amount whose purchasing power you want to trace.",
          ],
          [
            isKo ? "두 시점의 물가지수 입력" : "Add both price indices",
            isKo ? "한국은행 ECOS 등에서 조회한 과거 연도·현재 연도 CPI를 같은 기준년도 시리즈로 짝지어 넣습니다." : "Look up past and current CPI on ECOS, keeping both from the same base-year series.",
          ],
          [
            isKo ? "경과 연수 입력" : "Set the elapsed years",
            isKo ? "연평균 물가상승률을 계산할 때 쓰이며, 두 연도 사이 실제 간격(연)을 넣습니다." : "Used for the annualized rate — the real gap between the two years.",
          ],
          [
            isKo ? "결과 해석" : "Interpret the results",
            isKo ? "현재 동일 구매력 금액이 핵심 답이고, 배율과 연평균 상승률은 다른 기간·다른 나라와 비교할 때 유용합니다." : "The equivalent figure answers the core question; the multiplier and annual rate serve comparisons.",
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
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 — 5년 전 1만원의 가치 추적 (지수 85 → 110)" : "Example — tracing 10,000 from five years ago (index 85 → 110)"}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? "현재 동일 구매력: 10,000 × 110/85 = 12,941원 → 같은 생활을 하려면 지금 12,941원이 필요" : "Equivalent today: 10,000 × 110/85 = 12,941 won for the same basket"}</li>
            <li>{isKo ? "구매력 변화율: (110−85)/85 × 100 = 29.41% → 5년간 물가가 29.41% 오른 셈" : "Cumulative change: (110−85)/85 × 100 = 29.41% over five years"}</li>
            <li>{isKo ? "연평균 물가상승률: (110/85)^(1/5) − 1 ≈ 5.29%" : "Annualized: (110/85)^(1/5) − 1 ≈ 5.29%"}</li>
            <li>{isKo ? "물가 배율: 110/85 ≈ 1.2941배" : "Multiplier: 110/85 ≈ 1.2941x"}</li>
          </ul>
        </div>
        <p>
          {isKo
            ? "같은 결과를 돈으로 읽으면 이렇습니다. 당시 통장에 1,000만원을 그냥 현금으로 두었다면 그 돈으로 살 수 있는 것은 5년 전의 약 77%(1/1.2941)로 줄어듭니다. 반대로 연 5.29% 이상의 수익을 낸 투자만이 실질적으로 '벌었다'고 말할 수 있죠. 이 계산기가 알려주는 연평균 상승률은 곧 당신 현금의 손익분기점입니다."
            : "Read the same numbers as money: 10 million left idle in cash now buys about 77% of what it once did (1/1.2941). Only investments beating the 5.29% annualized rate truly earned anything in real terms — that figure is your cash's break-even line."}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '물가상승률 계산 공식' : 'Inflation Calculation Formulas'}</p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 현재 가치 환산' : '1. Present Value Conversion'}</h3>
          <BlockMath math={isKo ? "\\text{현재가치} = \\text{과거금액} \\times \\dfrac{\\text{현재물가지수}}{\\text{과거물가지수}}" : "\\text{Present Value} = \\text{Past Amount} \\times \\dfrac{\\text{Current Index}}{\\text{Past Index}}"} />
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 연평균 물가상승률' : '2. Average Annual Inflation Rate'}</h3>
          <BlockMath math={isKo ? "\\text{연평균 상승률} = \\left(\\dfrac{\\text{현재지수}}{\\text{과거지수}}\\right)^{1/n} - 1" : "\\text{Annual Rate} = \\left(\\dfrac{\\text{Current Index}}{\\text{Past Index}}\\right)^{1/n} - 1"} />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? '※ n = 경과 연수' : '※ n = number of years elapsed'}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '3. 구매력 변화율' : '3. Purchasing Power Change Rate'}</h3>
          <BlockMath math={isKo ? "\\text{변화율} = \\dfrac{\\text{현재지수} - \\text{과거지수}}{\\text{과거지수}} \\times 100" : "\\text{Change Rate} = \\dfrac{\\text{Current Index} - \\text{Past Index}}{\\text{Past Index}} \\times 100"} />
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 물가상승률 활용 팁' : '💡 Inflation Calculator Tips'}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '1. 투자 수익률은 실질 수익률로 비교하라' : '1. Compare Investment Returns Using Real Returns'}</h3>
          <p className="mt-2">{isKo ? '명목 수익률에서 물가상승률을 빼면 실질 수익률을 알 수 있습니다. 예를 들어 연 5% 수익률이지만 물가상승률이 3%라면 실질 수익률은 2%입니다. 물가를 감안한 투자 성과를 비교하는 것이 중요합니다.' : 'Subtract the inflation rate from the nominal return to get the real return. For example, a 5% return with 3% inflation gives a 2% real return. Comparing investment performance adjusted for inflation is crucial.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '2. 연금·저축 목표는 실질 가치로 설정하라' : '2. Set Pension/Savings Goals in Real Value'}</h3>
          <p className="mt-2">{isKo ? '은퇴 후 30년 뒤 10억 원이면 현재의 약 4~5억 원 정도의 구매력을 가집니다. 물가상승률을 반영하여 연금·저축 목표를 설정해야 합니다.' : '1 billion won in 30 years has the purchasing power of roughly 400-500 million won today. Set pension/savings goals reflecting inflation.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '3. 물가지수 선택이 중요하다' : '3. Choosing the Right Price Index Matters'}</h3>
          <p className="mt-2">{isKo ? '한국은행 소비자물가지수(CPI)가 가장 일반적으로 사용됩니다. 다만 식품·주택 등 개인별 지출 구조가 다르므로, 체감 물가와 차이가 있을 수 있습니다. GDP 디플레이터, 생산자물가지수 등도 참고하면 더 정확한 분석이 가능합니다.' : 'The Bank of Korea Consumer Price Index (CPI) is most commonly used. However, individual spending structures differ (food, housing, etc.), so perceived inflation may vary. GDP deflator and Producer Price Index provide more precise analysis.'}</p>
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
