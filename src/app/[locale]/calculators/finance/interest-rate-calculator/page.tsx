import TermGlossary from "@/components/calculators/TermGlossary";
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./InterestRateCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/interest-rate-calculator", "finance", "interest-rate-calculator");
}

export default function InterestRateCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "월이율을 연이율로 바꿀 때 그냥 12를 곱하면 되나요?" : "Is multiplying by twelve enough to annualize a monthly rate?",
      a: isKo
        ? "명목 연이율을 구하는 것이라면 맞습니다(월 0.4% × 12 = 연 4.8%). 하지만 매달 이자가 다시 굴러가는 복리 구조라면 실제 연 수익률은 (1+월이율)^12−1입니다. 월 0.4% 복리의 실제 연 수익은 약 4.907%로 단순 곱셈인 4.8%보다 높습니다. 이 계산기는 전자(명목 환산)를 보여주고, 실효 이자율 칸에서 후자를 확인할 수 있습니다."
        : "For the nominal figure, yes — 0.4% monthly × 12 = 4.8% annually. But if interest actually compounds each month, the true yearly yield is (1+r)^12 − 1: monthly 0.4% compounding produces about 4.907%, above the naive 4.8%. This tool shows the nominal conversion and lets you check the compounded reality in the effective-rate field.",
    },
    {
      q: isKo ? "카드 리볼빙 광고의 '일 0.05%'는 얼마나 위험한 건가요?" : "How risky is a card ad quoting '0.05% daily'?",
      a: isKo
        ? "일이율 0.05%를 연으로 환산하면 0.05% × 365 = 연 18.25%입니다. 여기에 복리 주기까지 반영하면 실질 부담은 그보다 더 높아집니다. 소액이고 짧게 쓰는 느낌 때문에 안전해 보이지만, 일이율 표시는 사실상 고금리 대출임을 감추는 관행적 표현입니다. 이런 상품을 검토할 때는 반드시 연환산 수치를 먼저 계산해 보세요."
        : "A daily 0.05% annualizes to 18.25% before any compounding, which pushes the real burden higher still. Small daily numbers feel safe while hiding near-usury annual rates — always convert to an annualized figure before judging such offers.",
    },
    {
      q: isKo ? "실효 이자율과 실질 이자율은 같은 말인가요?" : "Are 'effective' and 'real' rates the same thing?",
      a: isKo
        ? "다른 개념입니다. 실효 이자율은 복리 빈도를 반영한 명목 기준의 실제 금리이고(연 5% 월복리 → 실효 5.1162%), 실질 이자율은 물가상승을 반영한 구매력 기준 금리입니다(금리 5%, 물가 3% → 실질 약 2%). 예금 비교에는 실효, 저축 전략 판단에는 실질이 필요합니다. 두 가지를 모두 통과해야 진짜 유리한 상품입니다."
        : "No. The effective rate reflects compounding frequency on a nominal basis (5% nominal monthly-compounding → 5.1162% effective). The real rate strips inflation (5% yield under 3% inflation ≈ 2% real). Compare products with the former; judge your savings strategy with the latter — good products pass both.",
    },
    {
      q: isKo ? "복리 주기 입력란에는 무엇을 넣어야 하나요?" : "What should I enter as the compounding frequency?",
      a: isKo
        ? "상품 약관에 명시된 이자 지급·재투자 주기를 연간 횟수로 넣습니다. 연복리면 1, 반기 2, 분기 4, 월복리면 12, 일복리면 365입니다. 한국 정기예금은 만기 시 이자 재투자 구조라 통상 1(연복리), 적금은 매월 납입·이자 계산 특성상 월 단위 처리(12)에 가깝습니다. 모르겠다면 12로 두고 대략적인 실효치를 확인하는 것이 무난합니다."
        : "Enter how many times per year interest is credited back to principal per the product's terms: 1 for annual, 2 semi-annual, 4 quarterly, 12 monthly, 365 daily. Korean time deposits typically behave like annual compounding at maturity; installment savings run closer to monthly. When unsure, 12 gives a reasonable middle estimate.",
    },
    {
      q: isKo ? "대출 갈아타기 조건을 비교할 때 어떻게 쓰면 되나요?" : "How does this help when refinancing a loan?",
      a: isKo
        ? "두 대출의 표시 방식이 다르면 숫자만 보고 비교하면 안 됩니다. A사 '연 6% 월복리', B사 '월 0.52%'라면 B의 연 명목은 6.24%지만 실효는 (1+0.0624/12)^12−1 ≈ 6.42%로 A보다 비쌉니다. 이 계산기에 각각 넣어 실효 이자율을 같은 눈금에 세운 뒤 비교하고, 거기에 중도상환수수료 잔존분까지 더해 최종 판단하세요."
        : "When quotes use different conventions, never compare raw numbers. Lender A at '6% annual, monthly compounding' versus lender B at '0.52% monthly': B's nominal annualizes to 6.24%, yet its effective rate is about 6.42% — costlier than A. Normalize both through this calculator, then add any remaining prepayment penalties.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? '이자율 변환 계산기는 연이율, 월이율, 일이율을 서로 환산하고, 명목 이자율과 실효 이자율(복리 적용)의 차이를 보여주는 도구입니다. 예금·대출·적금 상품의 실질 이자를 비교할 때 유용합니다.' : 'The Interest Rate Calculator converts between annual, monthly, and daily rates and shows the difference between nominal and effective (compound) interest rates. Useful for comparing the real interest of deposits, loans, and savings products.'}</p>
        <TermGlossary items={[
          { term: isKo ? '명목 이자율' : 'Nominal Interest Rate', desc: isKo ? '복리를 고려하지 않은 표면상의 이자율입니다. 상품에서 제시하는 이자율이 이에 해당합니다.' : 'The stated interest rate without considering compounding. This is the rate quoted by financial products.' },
          { term: isKo ? '실효 이자율' : 'Effective Interest Rate', desc: isKo ? '복리를 포함한 실제 이자 부담율 또는 수익률입니다. 이자 계산 주기가 짧을수록 명목 이자율보다 높아집니다.' : 'The actual interest burden or yield including compounding. The more frequent the compounding, the higher it is relative to the nominal rate.' },
          { term: isKo ? '복리' : 'Compound Interest', desc: isKo ? '이자가 원금에 더해져 다음 기간의 이자 계산에 포함되는 방식으로, 단리보다 실질 수익이 높습니다.' : 'Interest added to the principal for the next period\'s calculation; yields more than simple interest.' },
          { term: isKo ? '이자 계산 주기' : 'Compounding Frequency', desc: isKo ? '이자가 원금에 합쳐지는 주기로, 연 1회(연복리), 월 1회(월복리), 매일(일복리) 등이 있습니다.' : 'How often interest is added to principal: annually, monthly, daily, etc.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "이자율 입력" : "Enter the rate",
            isKo ? "광고·약관에서 본 이자율 숫자를 그대로 입력합니다." : "Type the quoted figure exactly as advertised.",
          ],
          [
            isKo ? "입력 단위 선택" : "Pick the input unit",
            isKo ? "연이율·월이율·일이율 중 표시된 단위를 고르면 나머지 두 단위로 자동 환산됩니다." : "Choose annual, monthly, or daily — the other two convert automatically.",
          ],
          [
            isKo ? "복리 주기 입력" : "Set compounding frequency",
            isKo ? "연간 이자 재투자 횟수(월복리 12, 일복리 365 등)를 넣으면 실효 이자율이 계산됩니다." : "Crediting events per year (12 monthly, 365 daily) drive the effective-rate math.",
          ],
          [
            isKo ? "명목 vs 실효 비교" : "Compare nominal vs effective",
            isKo ? "하단 표에서 같은 상품을 명목·실효 눈금으로 나란히 보고 상품 간 비교에 쓰세요." : "The table lines both scales up side by side for product comparisons.",
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
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 1 — 연 5% 월복리 예금" : "Example 1 — a deposit at 5% nominal, compounded monthly"}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? "월이율: 5% ÷ 12 = 0.4167%, 일이율: 5% ÷ 365 = 0.1370%" : "Monthly: 5/12 = 0.4167%; daily: 5/365 = 0.1370%"}</li>
            <li>{isKo ? "실효 이자율: (1 + 0.05/12)^12 − 1 = 5.1162% → 명목보다 연 0.1162%p 더 벌어들임" : "Effective: (1+0.05/12)^12 − 1 = 5.1162% — an extra 0.1162 points per year"}</li>
            <li>{isKo ? "1,000만원 예치 시 1년 뒤 차이는 약 11,600원" : "On 10 million won that is about 11,600 extra won in a year"}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 2 — '일 0.05%' 카드 리볼빙" : "Example 2 — a card cash advance quoting 0.05% daily"}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? "연 환산: 0.05% × 365 = 연 18.25% (월 1.5208%)" : "Annualized: 0.05 × 365 = 18.25% (monthly 1.5208%)"}</li>
            <li>{isKo ? "월복리 기준 실효: (1 + 0.1825/12)^12 − 1 ≈ 19.8566%" : "Effective under monthly crediting: (1+0.1825/12)^12 − 1 ≈ 19.8566%"}</li>
            <li>{isKo ? "'하루 5천원씩'처럼 들리지만 100만원 빌리면 1년 뒤 이자 부담은 약 20만원 수준" : "'Just 500 won a day' on a million-won balance means roughly 200,000 in interest over a year"}</li>
          </ul>
        </div>
        <p>
          {isKo
            ? "두 예시가 보여주듯 같은 '숫자'라도 단위와 복리 주기에 따라 실제 금액은 전혀 다릅니다. 상품 비교의 첫걸음은 모든 이자율을 연 명목·실효로 통일하는 일입니다."
            : "Same digits, wildly different money — unit and frequency change everything. Step one of any comparison is normalizing every quote to annual nominal and effective terms."}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '이자율 환산 공식' : 'Interest Rate Conversion Formulas'}</p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 연·월·일 이자율 환산' : '1. Annual/Monthly/Daily Rate Conversion'}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm font-mono">
            <li>{isKo ? '연이율 = 월이율 × 12 = 일이율 × 365' : 'Annual = Monthly × 12 = Daily × 365'}</li>
            <li>{isKo ? '월이율 = 연이율 ÷ 12' : 'Monthly = Annual ÷ 12'}</li>
            <li>{isKo ? '일이율 = 연이율 ÷ 365' : 'Daily = Annual ÷ 365'}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 실효 이자율' : '2. Effective Interest Rate'}</h3>
          <BlockMath math={isKo ? "\\text{실효이자율} = \\left(1 + \\dfrac{\\text{명목이자율}}{n}\\right)^{n} - 1" : "\\text{Effective Rate} = \\left(1 + \\dfrac{\\text{Nominal Rate}}{n}\\right)^{n} - 1"} />
          <p className="text-xs text-muted-foreground mt-2">{isKo ? '※ n = 연간 복리 횟수 (월복리이면 12, 일복리이면 365)' : '※ n = compounding frequency per year (12 for monthly, 365 for daily)'}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '3. 복리 주기에 따른 실효 이자율 예시 (명목 연 5% 기준)' : '3. Effective Rate Examples by Compounding Frequency (Nominal 5%/year)'}</h3>
          <div className="text-sm space-y-1">
            <p>{isKo ? '연복리(1회): (1+0.05/1)^1 - 1 = 5.0000%' : 'Annual (1x): (1+0.05/1)^1 - 1 = 5.0000%'}</p>
            <p>{isKo ? '반기복리(2회): (1+0.05/2)^2 - 1 = 5.0625%' : 'Semi-annual (2x): (1+0.05/2)^2 - 1 = 5.0625%'}</p>
            <p>{isKo ? '분기복리(4회): (1+0.05/4)^4 - 1 = 5.0945%' : 'Quarterly (4x): (1+0.05/4)^4 - 1 = 5.0945%'}</p>
            <p>{isKo ? '월복리(12회): (1+0.05/12)^12 - 1 = 5.1162%' : 'Monthly (12x): (1+0.05/12)^12 - 1 = 5.1162%'}</p>
            <p>{isKo ? '일복리(365회): (1+0.05/365)^365 - 1 = 5.1267%' : 'Daily (365x): (1+0.05/365)^365 - 1 = 5.1267%'}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 이자율 비교 꿀팁' : '💡 Interest Rate Comparison Tips'}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '1. 실효 이자율로 비교하라' : '1. Compare Using Effective Rates'}</h3>
          <p className="mt-2">{isKo ? '예금·적금·대출 상품을 비교할 때는 반드시 실효 이자율로 비교하세요. 같은 명목 5%라도 월복리 상품이 연복리보다 실효 이자율이 높아 실질 수익이 더 큽니다.' : 'Always compare deposit, savings, and loan products using effective rates. The same nominal 5% monthly-compounding product yields more than annual compounding.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '2. 대출은 월이율로 비교하라' : '2. Compare Loans Using Monthly Rates'}</h3>
          <p className="mt-2">{isKo ? '대출 상품의 경우 월 상환금을 기준으로 비교하면 더 직관적입니다. 연이율을 월이율로 환산하면 월 이자 부담을 바로 파악할 수 있습니다.' : 'Comparing loan products by monthly payments is more intuitive. Converting the annual rate to a monthly rate lets you immediately assess monthly interest burden.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '3. 복리의 힘을 활용하라' : '3. Harness the Power of Compounding'}</h3>
          <p className="mt-2">{isKo ? '복리 투자는 시간이 길수록 효과가 극대화됩니다. 적금·예금·주식 투자 시 이자 계산 주기가 짧은 상품(월복리, 일복리)을 선택하면 같은 명목 이자율이라도 더 높은 실질 수익을 얻을 수 있습니다.' : 'Compound investments grow more over longer periods. Choosing products with more frequent compounding (monthly, daily) yields higher real returns at the same nominal rate.'}</p>
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
