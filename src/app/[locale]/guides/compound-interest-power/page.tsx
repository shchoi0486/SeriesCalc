import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "복리의 힘: 적금·투자 복리 계산 완벽 가이드" : "The Power of Compound Interest: The Complete Guide",
    description: isKo
      ? "복리와 단리의 차이, 복리를 극대화하는 방법, 72의 법칙, 세금 효율적인 계좌까지 계산기로 직접 확인해 보세요."
      : "Understand compounding vs simple interest, the rule of 72, how to maximize it, and tax-efficient accounts — with calculators you can try yourself.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("복리와 단리의 가장 큰 차이는 무엇인가요?", "What is the biggest difference between compound and simple interest?"),
      a: L(
        "단리는 원금에 대해서만 이자가 붙지만, 복리는 원금뿐 아니라 이미 쌓인 이자에 다시 이자가 붙습니다. 시간이 지날수록 격차는 기하급수적으로 벌어집니다.",
        "Simple interest is earned only on the principal, while compound interest is earned on the principal plus accumulated interest. The gap widens exponentially over time.",
      ),
    },
    {
      q: L("복리를 극대화하려면 무엇이 가장 중요할까요?", "What matters most to maximize compounding?"),
      a: L(
        "시작 시점을 앞당기는 것과 이자를 계속 재투자하는 것이 가장 큽니다. 수익률도 중요하지만, 시간은 대체 불가능한 변수입니다.",
        "Starting earlier and keeping interest reinvested matter most. Return rate helps, but time is the irreplaceable variable.",
      ),
    },
    {
      q: L("세금은 복리 효과에 어떤 영향을 주나요?", "How do taxes affect compounding?"),
      a: L(
        "과세가 붙으면 복리 효과가 깎입니다. ISA·연금·401(k) 같은 세제 혜택 계좌를 활용하면 세금 누수를 줄여 실질 복리 효과를 키울 수 있습니다.",
        "Taxes erode compounding. Tax-advantaged accounts like ISA, pensions, or 401(k) reduce leakage and boost real compounding.",
      ),
    },
    {
      q: L("복리 계산 시 복리 주기는 어떻게 정하나요?", "How do I choose the compounding frequency?"),
      a: L(
        "예금은 보통 월복리, 투자는 연복리가 기본입니다. 주기가 짧을수록 복리 효과가 커지지만, 차이는 크지 않으니 실제 상품 조건에 맞추세요.",
        "Deposits usually compound monthly, investments annually. Shorter periods help slightly, but match the product's actual terms.",
      ),
    },
    {
      q: L("인플레이션을 고려해야 하나요?", "Should I account for inflation?"),
      a: L(
        "네. 명목 수익률에서 인플레이션을 빼야 실질 복리 효과를 알 수 있습니다. 장기 투자일수록 인플레이션의 영향이 커집니다.",
        "Yes. Subtract inflation from the nominal return to see real compounding. The longer the horizon, the bigger inflation's impact.",
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
      <ProsePage title={L("복리의 힘", "The Power of Compound Interest")}>
        <ProseSection title={L("복리란 무엇인가요?", "What is compound interest?")}>
          <p>
            {L(
              "복리(Compound Interest)는 원금에 붙은 이자가 다시 원금처럼 굴러가는 방식입니다. 1년마다 이자가 원금에 더해지고, 다음 해에는 그 더해진 금액을 기준으로 이자가 계산됩니다.",
              "Compound interest is when earned interest is added to the principal and then earns interest itself. Each period, the base grows, so the next period's interest is calculated on a larger amount.",
            )}
          </p>
          <p>
            {L(
              "반면 단리는 원금에 대해서만 이자가 붙어 매년 같은 금액의 이자가 발생합니다. 복리는 '이자에 이자'가 붙어 시간이 지날수록 눈덩이처럼 불어납니다.",
              "By contrast, simple interest is earned only on the principal, producing the same interest each year. Compound interest adds 'interest on interest', snowballing over time.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("복리 vs 단리 비교 예시", "Compound vs simple: an example")}>
          <p>
            {L(
              "원금 1,000만원, 연 5%, 10년 조건에서 두 방식을 비교하면 다음과 같습니다.",
              "Comparing the two on 10M KRW at 5% annual over 10 years:",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("경과 연수", "Years")}</th>
                  <th className="border p-2 text-right">{L("단리", "Simple")}</th>
                  <th className="border p-2 text-right">{L("복리", "Compound")}</th>
                  <th className="border p-2 text-right">{L("차이", "Gap")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">1년</td><td className="border p-2 text-right">10,500,000원</td><td className="border p-2 text-right">10,500,000원</td><td className="border p-2 text-right">0원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">5년</td><td className="border p-2 text-right">12,500,000원</td><td className="border p-2 text-right">12,762,816원</td><td className="border p-2 text-right">262,816원</td></tr>
                <tr><td className="border p-2">10년</td><td className="border p-2 text-right">15,000,000원</td><td className="border p-2 text-right">16,288,946원</td><td className="border p-2 text-right">1,288,946원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">20년</td><td className="border p-2 text-right">20,000,000원</td><td className="border p-2 text-right">26,532,977원</td><td className="border p-2 text-right">6,532,977원</td></tr>
                <tr><td className="border p-2">30년</td><td className="border p-2 text-right">25,000,000원</td><td className="border p-2 text-right">43,219,424원</td><td className="border p-2 text-right">18,219,424원</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 단순화된 예시입니다. 실제 상품은 수수료·세금·인플레이션에 따라 달라집니다.",
              "* Simplified example; actual products vary with fees, taxes and inflation.",
            )}
          </p>
          <p>
            {L(
              "30년 후 복리 자산은 단리의 1.7배가 됩니다. 시간이 길수록 격차가 폭발적으로 벌어지는 것이 복리의 핵심입니다.",
              "After 30 years the compound asset is 1.7x the simple one. The longer the horizon, the more explosive the gap — that is the essence of compounding.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("72의 법칙", "The rule of 72")}>
          <p>
            {L(
              "자산이 두 배가 되는 데 걸리는 시간을 빠르게 추정하는 방법입니다. 72를 연 수익률로 나누면 대략적인 더블링 기간(년)이 나옵니다.",
              "A quick way to estimate how long it takes an asset to double: divide 72 by the annual return.",
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <code className="text-sm">더블링 기간 ≈ 72 ÷ 연 수익률(%)</code>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
            <li>{L("연 6% 수익 → 약 12년 만에 2배", "6% annual → about 12 years to double")}</li>
            <li>{L("연 8% 수익 → 약 9년 만에 2배", "8% annual → about 9 years to double")}</li>
            <li>{L("연 10% 수익 → 약 7.2년 만에 2배", "10% annual → about 7.2 years to double")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("복리를 극대화하는 4가지 방법", "Four ways to maximize compounding")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("빨리 시작하기 — 시간은 대체 불가능한 변수입니다.", "Start early — time is the one variable you cannot recover.")}</li>
            <li>{L("이자 재투자하기 — 인출하지 않고 그대로 둬야 복리가 살아납니다.", "Reinvest earnings — compounding only works if you leave gains invested.")}</li>
            <li>{L("세제 혜택 계좌 활용하기 — ISA·연금·401(k)로 세금 누수를 막으세요.", "Use tax-advantaged accounts — ISA, pensions, or 401(k) reduce tax leakage.")}</li>
            <li>{L("꾸준한 적립 — 변액보다 '꾸준함'이 복리를 지탱합니다.", "Contribute consistently — steadiness supports compounding more than chasing returns.")}</li>
            <li>{L("수수료 최소화 — 연 1% 수수료도 장기적으로 큰 차이를 만듭니다.", "Minimize fees — even 1% annually makes a large difference over decades.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("복리에 영향을 주는 변수", "Variables that affect compounding")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("원금(Principal): 시작 금액이 클수록 결과가 큽니다.", "Principal: a larger starting amount yields a larger result.")}</li>
            <li>{L("수익률(Return): 높을수록 유리하지만 변동성이 큽니다.", "Return: higher helps, but volatility rises too.")}</li>
            <li>{L("기간(Time): 가장 강력한 변수입니다.", "Time: the most powerful variable.")}</li>
            <li>{L("복리 주기(Frequency): 월/분기/연 단위로 이자가 재투자되는 주기입니다.", "Frequency: how often interest is reinvested (monthly, quarterly, annually).")}</li>
            <li>{L("세금·수수료: 실질 복리 효과를 깎는 요인입니다.", "Taxes and fees: factors that erode real compounding.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("계산기로 직접 시뮬레이션하기", "Simulate it with our calculators")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link href={`${base}/compound-interest`} className="text-primary underline">
                {L("복리 계산기", "Compound Interest Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/stock-compound-interest`} className="text-primary underline">
                {L("주식 복리 계산기", "Stock Compound Interest Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/regular-installment-savings`} className="text-primary underline">
                {L("정기적금 계산기", "Regular Installment Savings Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/installment-savings-monthly-compound-interest`} className="text-primary underline">
                {L("적립식 월 복리 계산기", "Monthly Compound Interest Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/cagr`} className="text-primary underline">
                {L("CAGR 계산기", "CAGR Calculator")}
              </Link>
            </li>
            {!isKo && (
              <li>
                <Link href={`${base}/401k`} className="text-primary underline">
                  401(k) / Roth IRA Calculator
                </Link>
              </li>
            )}
            {isKo && (
              <li>
                <Link href={`${base}/isa`} className="text-primary underline">
                  {L("ISA / 청년도약계좌 계산기", "ISA Calculator")}
                </Link>
              </li>
            )}
          </ul>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i} className="rounded-xl border p-4">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 투자·세무·금융 자문이 아닙니다. 실제 수익은 시장 상황과 세법에 따라 달라집니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute investment, tax or financial advice. Actual returns vary with market conditions and tax law.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
