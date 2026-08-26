import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "원리금균등 vs 원금균등 상환: 무엇이 더 유리할까?" : "Equal Payment vs Equal Principal: Which Mortgage Repayment Wins?",
    description: isKo
      ? "두 상환 방식의 원리와 총이자 차이를 이해하고, 내 대출에 맞는 방식을 계산기로 확인해 보세요."
      : "Understand how the two amortization methods work, the total-interest difference, and pick the right one with our calculators.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("원리금균등과 원금균등의 차이?", "What is the difference between equal payment and equal principal?"),
      a: L(
        "원리금균등은 매달 갚는 금액이 일정하고 초기 부담이 적지만 총이자가 많습니다. 원금균등은 매달 갚는 원금이 일정해 총이자가 적고, 금리 하락기에 유리하지만 초기 상환액이 큽니다.",
        "Equal payment keeps the monthly amount fixed (easier early on) but costs more total interest. Equal principal repays the same principal each month, saving interest but starting with a higher payment.",
      ),
    },
    {
      q: L("어느 쪽이 더 저렴한가요?", "Which one is cheaper?"),
      a: L(
        "동일한 대출금리라면 원금균등이 총이자에서 유리합니다. 다만 초기 현금흐름이 tight하다면 원리금균등이 현실적입니다.",
        "At the same rate, equal principal is cheaper in total interest. But if early cash flow is tight, equal payment is the practical choice.",
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
      <ProsePage title={L("원리금균등 vs 원금균등", "Equal Payment vs Equal Principal")}>
        <ProseSection title={L("두 방식의 원리", "How the two methods work")}>
          <p>
            {L(
              "원리금균등상환(대출금 상환)은 매달 갚는 원리금 합이 같습니다. 초기에는 이자 비중이 높고 원금 비중이 낮습니다. 원금균등상환은 매달 갚는 원금이 같고, 미상환 원금이 줄어들수록 이자도 줄어 듭니다.",
              "Equal-payment amortization keeps the total monthly payment constant; early payments are mostly interest. Equal-principal amortization repays the same principal each month, so interest falls as the balance drops.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("언제 원금균등이 유리한가", "When equal principal wins")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("총이자 비용을 줄이고 싶을 때", "When you want to minimize total interest")}</li>
            <li>{L("금리 하락기나 중도상환을 자주 할 때", "During falling rates or frequent prepayments")}</li>
            <li>{L("초기 여력이 충분할 때", "When you have enough early capacity")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("계산기로 직접 확인하기", "Check with our calculators")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link href={`${base}/principal-and-interest-equal-repayment`} className="text-primary underline">
                {L("원리금 균등상환 계산기", "Equal Payment Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/principal-equal-amortization`} className="text-primary underline">
                {L("원금 균등상환 계산기", "Equal Principal Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/mortgage-calculator`} className="text-primary underline">
                {L("주택담보대출 계산기", "Mortgage Calculator")}
              </Link>
            </li>
            <li>
              <Link href={`${base}/amortization-schedule`} className="text-primary underline">
                {L("상환 스케줄 계산기", "Amortization Schedule Calculator")}
              </Link>
            </li>
            {!isKo && (
              <li>
                <Link href={`${base}/mortgage-piti`} className="text-primary underline">
                  Mortgage PITI & PMI Calculator
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
