import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "전세 vs 월세: 무엇이 더 유리할까? (계산 가이드)" : "Jeonse vs Wolse (Rent): Which Is Better? A Calculation Guide",
    description: isKo
      ? "전세와 월세의 기회비용을 비교하고, 내 상황에 맞는 선택을 계산기로 확인해 보세요."
      : "Compare the opportunity cost of jeonse (lump-sum deposit) vs monthly rent, and find the right choice with our calculators.",
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
        </ProseSection>

        <ProseSection title={L("비교에 필요한 숫자들", "The numbers you need")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("전세 보증금 규모", "Jeonse deposit amount")}</li>
            <li>{L("예상 운용 수익률 (예: 4%)", "Expected return on the deposit (e.g., 4%)")}</li>
            <li>{L("월세 수준", "Monthly rent level")}</li>
            <li>{L("전세자금대출 금리 (이용 시)", "Jeonse loan interest rate, if used")}</li>
          </ul>
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
