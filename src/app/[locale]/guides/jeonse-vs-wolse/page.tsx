import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "전세 vs 월세: 무엇이 더 유리할까? (계산 가이드)" : "Jeonse vs Wolse (Rent): Which Is Better? A Calculation Guide",
    description: isKo
      ? "전세와 월세의 기회비용을 비교하고, 보증금·수익률·월세 수준별 예시와 결정 기준을 정리했습니다. 내 상황에 맞는 선택을 계산기로 확인해 보세요."
      : "Compare the opportunity cost of jeonse (lump-sum deposit) vs monthly rent, with examples by deposit, return and rent level, plus a decision guide.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("전세와 월세의 핵심 차이는?", "What is the core difference between jeonse and monthly rent?"),
      a: L(
        "전세는 큰 보증금을 맡기고 이자를 내지 않지만, 그 보증금을 금융자산으로 운용했을 때의 기회비용이 발생합니다. 월세는 매달 현금이 빠져나가지만 초기 자금 부담이 적습니다.",
        "Jeonse requires a large refundable deposit with no monthly rent, but carries the opportunity cost of that locked-up capital. Monthly rent drains cash flow but needs far less upfront money.",
      ),
    },
    {
      q: L("어떻게 하면 내게 유리한지를 가늠할 수 있나요?", "How can I tell which is better for me?"),
      a: L(
        "보증금을 안전하게 운용했을 때 기대 수익률과 월세 절감액을 비교하면 됩니다. 금리·수익률이 낮을수록 월세가, 높을수록 전세가 유리해지는 경향이 있습니다.",
        "Compare the expected return on the deposit versus the rent you would save. When rates/returns are low, renting tends to win; when they are high, jeonse tends to win.",
      ),
    },
    {
      q: L("전세자금대출을 쓰면 전세가 불리해지나요?", "Does using a jeonse loan make jeonse worse?"),
      a: L(
        "대출 이자가 운용 수익률보다 높으면 전세의 장점이 줄어듭니다. 대출 금리와 예상 수익률을 함께 비교해 결정하세요.",
        "If loan interest exceeds your expected return, jeonse's advantage shrinks. Compare the loan rate and expected return together.",
      ),
    },
    {
      q: L("월세 세액공제는 어떻게 받나요?", "How do I get the monthly-rent tax credit?"),
      a: L(
        "무주택 세대주 등 조건을 충족하면 연말정산에서 월세 세액공제를 받을 수 있습니다. 공제율과 한도는 세법에 따라 변동되므로 국세청 안내를 확인하세요.",
        "Eligible tenants (e.g. head of a household with no home) can claim a monthly-rent tax credit at year-end settlement. Rates and limits change with tax law — check the tax authority's guidance.",
      ),
    },
    {
      q: L("전세 사기 위험은 어떻게 줄이나요?", "How do I reduce jeonse-fraud risk?"),
      a: L(
        "등기부등본(근저당·가압류), 보증보험(HUG/SGI) 가입 여부, 집주인 신원, 시세 대비 보증금 비율을 확인하세요. 보증보험 가입은 필수에 가깝습니다.",
        "Check the registry (mortgages, liens), whether deposit insurance (HUG/SGI) is available, the landlord's identity, and the deposit-to-price ratio. Deposit insurance is close to mandatory.",
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
      <ProsePage title={L("전세 vs 월세 비교 가이드", "Jeonse vs Monthly Rent Guide")}>
        <ProseSection title={L("기회비용이 핵심입니다", "Opportunity cost is the key")}>
          <p>
            {L(
              "전세 보증금을 은행에 묶어두면 그만큼 다른 곳에 투자할 기회를 잃습니다. 반대로 월세를 내면 현금 흐름이 줄지만, 남은 자금으로 안정적인 수익을 낼 수 있다면 월세가 더 유리해질 수 있습니다.",
              "A jeonse deposit tied up in a house loses the chance to invest elsewhere. Paying monthly rent reduces cash flow, but if the freed-up capital earns steady returns, renting can come out ahead.",
            )}
          </p>
          <p>
            {L(
              "따라서 '전세 보증금 × 예상 수익률'과 '월세 × 12개월'을 비교하는 것이 출발점입니다. 여기에 전세자금대출 이자, 월세 세액공제, 보증보험 비용까지 더하면 더 정확한 비교가 가능합니다.",
              "So the starting comparison is 'jeonse deposit × expected return' versus 'monthly rent × 12'. Adding jeonse-loan interest, the monthly-rent tax credit and deposit-insurance cost makes it far more accurate.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("비교 예시: 3억원 주택", "Example: a 300M KRW home")}>
          <p>
            {L(
              "보증금 2억원 전세 vs 보증금 1,000만원·월세 80만원 월세를 비교해 보겠습니다 (운용 수익률 4% 가정).",
              "Compare jeonse with a 200M deposit against monthly rent of 800K with a 10M deposit (assuming 4% return).",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("항목", "Item")}</th>
                  <th className="border p-2 text-right">{L("전세", "Jeonse")}</th>
                  <th className="border p-2 text-right">{L("월세", "Monthly rent")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("초기 자금", "Upfront cash")}</td><td className="border p-2 text-right">200,000,000원</td><td className="border p-2 text-right">10,000,000원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("연간 기회비용/월세", "Annual cost")}</td><td className="border p-2 text-right">8,000,000원</td><td className="border p-2 text-right">9,600,000원</td></tr>
                <tr><td className="border p-2">{L("월세 세액공제 (가정)", "Rent tax credit (est.)")}</td><td className="border p-2 text-right">0원</td><td className="border p-2 text-right">-600,000원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("연간 순비용", "Net annual cost")}</td><td className="border p-2 text-right font-medium">8,000,000원</td><td className="border p-2 text-right font-medium">9,000,000원</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 단순화된 예시입니다. 실제 조건(대출, 보증보험, 수익률)에 따라 결과가 달라집니다.",
              "* Simplified example; results vary with loans, deposit insurance and returns.",
            )}
          </p>
          <p>
            {L(
              "이 예시에서는 전세가 연 100만원 정도 유리하지만, 수익률이 3%로 떨어지면 월세가 더 유리해질 수 있습니다. 자신의 조건으로 직접 계산해 보는 것이 중요합니다.",
              "Here jeonse is about 1M KRW cheaper per year, but if returns drop to 3%, renting can win. Run the numbers on your own terms.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("비교에 필요한 숫자들", "The numbers you need")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("전세 보증금 규모", "Jeonse deposit amount")}</li>
            <li>{L("예상 운용 수익률 (예: 4%)", "Expected return on the deposit (e.g., 4%)")}</li>
            <li>{L("월세 수준", "Monthly rent level")}</li>
            <li>{L("전세자금대출 금리 (이용 시)", "Jeonse loan interest rate, if used")}</li>
            <li>{L("월세 세액공제 가능 여부", "Whether the monthly-rent tax credit applies")}</li>
            <li>{L("보증보험 가입 비용", "Deposit-insurance premium")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("전세가 유리한 경우", "When jeonse wins")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("운용 수익률이 월세 환산율보다 높을 때", "When your expected return exceeds the rent's implied rate")}</li>
            <li>{L("대출 금리가 낮아 전세자금대출 부담이 적을 때", "When jeonse-loan rates are low")}</li>
            <li>{L("장기 거주 예정이고 주택 가격 상승을 기대할 때", "When you plan to stay long and expect price appreciation")}</li>
            <li>{L("보증금을 안전하게 운용할 수 있는 자산이 있을 때", "When you have assets to deploy the deposit safely")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("월세가 유리한 경우", "When renting wins")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("운용 수익률이 낮아 전세 기회비용이 클 때", "When low returns make the jeonse opportunity cost high")}</li>
            <li>{L("초기 자금이 부족해 보증금 마련이 어려울 때", "When you lack upfront cash for a large deposit")}</li>
            <li>{L("단기 거주 예정이거나 이동이 잦을 때", "When your stay is short or you move often")}</li>
            <li>{L("월세 세액공제를 받을 수 있어 실효 비용이 낮을 때", "When the rent tax credit lowers your effective cost")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("결정 기준 정리", "Decision checklist")}>
          <ol className="list-decimal pl-5 space-y-2">
            <li>{L("내 자금의 예상 수익률을 보수적으로 추정합니다 (예: 3~4%).", "Estimate your capital's expected return conservatively (e.g. 3–4%).")}</li>
            <li>{L("전세 보증금 × 수익률과 월세 × 12를 비교합니다.", "Compare jeonse deposit × return against monthly rent × 12.")}</li>
            <li>{L("전세자금대출 이자와 보증보험 비용을 더합니다.", "Add jeonse-loan interest and deposit-insurance cost.")}</li>
            <li>{L("월세 세액공제를 빼서 실효 비용을 계산합니다.", "Subtract the monthly-rent tax credit for the effective cost.")}</li>
            <li>{L("전세 사기 위험과 보증보험 가입 가능 여부를 확인합니다.", "Check jeonse-fraud risk and whether deposit insurance is available.")}</li>
          </ol>
        </ProseSection>

        <ProseSection title={L("계산기로 직접 비교하기", "Compare with our calculators")}>
          <ul className="list-disc pl-5 space-y-2">
            {isKo && (
              <li>
                <Link href={`${base}/jeonse-vs-wolse`} className="text-primary underline">
                  {L("전세 vs 월세 비교 계산기", "Jeonse vs Wolse Calculator")}
                </Link>
              </li>
            )}
            <li>
              <Link href={`${base}/mortgage-calculator`} className="text-primary underline">
                {L("주택담보대출 계산기", "Mortgage Calculator")}
              </Link>
            </li>
            {isKo && (
              <li>
                <Link href={`${base}/jeonse-deposit-calculator`} className="text-primary underline">
                  {L("전세보증금 대출 한도 계산기", "Jeonse Loan Limit Calculator")}
                </Link>
              </li>
            )}
            {!isKo && (
              <li>
                <Link href={`${base}/mortgage-piti`} className="text-primary underline">
                  Mortgage PITI & PMI Calculator
                </Link>
              </li>
            )}
            {isKo && (
              <li>
                <Link href={`${base}/acquisition-tax`} className="text-primary underline">
                  {L("주택 취득세 계산기", "Acquisition Tax Calculator")}
                </Link>
              </li>
            )}
            <li>
              <Link href={`${base}/rental-yield-calculator`} className="text-primary underline">
                {L("임대수익률 계산기", "Rental Yield Calculator")}
              </Link>
            </li>
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
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 세무·법률·금융 자문이 아닙니다. 실제 계약 조건은 임대차 계약서와 금융기관 약관에 따릅니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute tax, legal or financial advice. Actual contract terms follow your lease and lender agreement.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
