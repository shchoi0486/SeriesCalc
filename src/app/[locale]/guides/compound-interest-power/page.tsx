import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "복리의 힘: 적금·투자 복리 계산 완벽 가이드" : "The Power of Compound Interest: The Complete Guide",
    description: isKo
      ? "복리와 단리의 차이, 복리를 극대화하는 방법, 세금 효율적인 계좌까지 계산기로 직접 확인해 보세요."
      : "Understand compounding vs simple interest, how to maximize it, and tax-efficient accounts — with calculators you can try yourself.",
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
        </ProseSection>

        <ProseSection title={L("복리 vs 단리", "Compound vs simple interest")}>
          <p>
            {L(
              "단리는 원금 × 금리 × 기간으로 항상 일정한 이자가 붙지만, 복리는 '원금 + 누적 이자'를 기준으로 눈덩이처럼 불어납니다. 기간이 길어질수록 두 방식의 차이는 압도적으로 커집니다.",
              "Simple interest adds a fixed amount each period, while compound interest snowballs because it is calculated on principal plus accumulated interest. Over long periods the difference becomes enormous.",
            )}
          </p>
          <p>
            {L(
              "직접 비교해 보세요: ",
              "Compare them yourself: ",
            )}
            <Link href={`${base}/compound-interest`} className="text-primary underline">
              {L("복리 계산기", "Compound Interest Calculator")}
            </Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("복리를 극대화하는 4가지 방법", "Four ways to maximize compounding")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("빨리 시작하기 — 시간은 대체 불가능한 변수입니다.", "Start early — time is the one variable you cannot recover.")}</li>
            <li>{L("이자 재투자하기 — 인출하지 않고 그대로 둬야 복리가 살아납니다.", "Reinvest earnings — compounding only works if you leave gains invested.")}</li>
            <li>{L("세제 혜택 계좌 활용하기 — ISA·연금·401(k)로 세금 누수를 막으세요.", "Use tax-advantaged accounts — ISA, pensions, or 401(k) reduce tax leakage.")}</li>
            <li>{L("꾸준한 적립 — 변액보다 '꾸준함'이 복리를 지탱합니다.", "Contribute consistently — steadiness supports compounding more than chasing returns.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("계산기로 직접 시뮬레이션하기", "Simulate it with our calculators")}>
          <ul className="list-disc pl-5 space-y-2">
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
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
