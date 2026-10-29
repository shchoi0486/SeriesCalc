import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "원리금균등 vs 원금균등 상환: 무엇이 더 유리할까?" : "Equal Payment vs Equal Principal: Which Mortgage Repayment Wins?",
    description: isKo
      ? "두 상환 방식의 원리와 총이자 차이를 이해하고, 1억원 대출 예시로 월 상환액·총이자를 비교하며 내 대출에 맞는 방식을 계산기로 확인해 보세요."
      : "Understand how the two amortization methods work, compare monthly payments and total interest on a sample loan, and pick the right one with our calculators.",
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
    {
      q: L("중도상환을 자주 할 예정인데 어떤 방식이 유리한가요?", "I plan to prepay often — which method is better?"),
      a: L(
        "중도상환이 잦다면 원금균등이 보통 유리합니다. 잔액이 빠르게 줄어 이자 부담이 더 빨리 감소하기 때문입니다. 원리금균등은 초기에 원금 상환이 느려 중도상환 효과가 상대적으로 작습니다.",
        "Frequent prepayment usually favors equal principal: the balance falls faster, so interest drops sooner. Equal payment repays principal slowly at first, muting prepayment savings.",
      ),
    },
    {
      q: L("금리가 오를 때는 어느 쪽이 유리한가요?", "Which is better when rates rise?"),
      a: L(
        "변동금리 대출이라면 원리금균등이 초기 부담을 줄여주어 금리 상승기에 현금흐름을 지키는 데 도움이 됩니다. 다만 총이자 부담은 커질 수 있으므로 대출 기간·상환 능력을 함께 고려하세요.",
        "For variable-rate loans, equal payment softens early cash flow during rate hikes. Total interest still grows, so weigh term and repayment capacity together.",
      ),
    },
    {
      q: L("대출 기간을 짧게 하면 차이가 줄어드나요?", "Does a shorter term shrink the gap?"),
      a: L(
        "네. 기간이 짧을수록 두 방식의 총이자 차이가 줄어듭니다. 반대로 장기 대출일수록 원금균등의 이자 절감 효과가 커집니다.",
        "Yes. Shorter terms narrow the total-interest gap; longer terms magnify the savings from equal principal.",
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
              "원리금균등상환은 매달 갚는 원리금 합이 동일합니다. 초기에는 이자 비중이 높고 원금 비중이 낮으며, 시간이 지날수록 원금 비중이 커집니다. 원금균등상환은 매달 갚는 원금이 같고, 미상환 원금이 줄어들수록 이자도 줄어듭니다.",
              "Equal-payment amortization keeps the total monthly payment constant; early payments are mostly interest and the principal share grows over time. Equal-principal amortization repays the same principal each month, so interest falls as the balance drops.",
            )}
          </p>
          <p>
            {L(
              "두 방식 모두 대출금리와 기간이 같다면 월 상환액의 합(총 상환액)은 다르며, 원금균등이 보통 총이자에서 유리합니다. 차이는 대출 규모와 기간, 금리에 따라 달라지므로 실제 조건으로 계산해 보는 것이 중요합니다.",
              "Both methods share the same rate and term, but the sum of monthly payments (total repayment) differs; equal principal is usually cheaper in total interest. The size of the gap depends on loan size, term and rate, so run the numbers on your own terms.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("1억원 대출 예시로 비교", "A 100M KRW example")}>
          <p>
            {L(
              "대출 1억원, 연 4%, 30년(360개월) 조건에서 두 방식을 비교하면 다음과 같습니다.",
              "Comparing the two methods on a 100M KRW loan at 4% annual, 30 years (360 months):",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("구분", "Item")}</th>
                  <th className="border p-2 text-right">{L("원리금균등", "Equal payment")}</th>
                  <th className="border p-2 text-right">{L("원금균등", "Equal principal")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("첫 달 상환액", "First payment")}</td><td className="border p-2 text-right">477,415원</td><td className="border p-2 text-right">555,556원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("마지막 달 상환액", "Last payment")}</td><td className="border p-2 text-right">477,415원</td><td className="border p-2 text-right">277,778원</td></tr>
                <tr><td className="border p-2">{L("총 상환액", "Total repaid")}</td><td className="border p-2 text-right">171,869,400원</td><td className="border p-2 text-right">160,000,000원</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("총 이자", "Total interest")}</td><td className="border p-2 text-right">71,869,400원</td><td className="border p-2 text-right">60,000,000원</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 위 수치는 단순화된 예시이며, 실제 대출은 금리·수수료·중도상환수수료 등에 따라 달라집니다.",
              "* Simplified example; actual loans vary by rate, fees and prepayment penalties.",
            )}
          </p>
          <p>
            {L(
              "예시에서 원금균등은 총이자를 약 1,187만원 덜 내지만, 첫 달 부담이 약 7.8만원 더 큽니다. 이 차이를 감당할 여력이 있는지가 선택의 핵심입니다.",
              "In this example equal principal saves about 11.87M KRW in interest, but the first payment is about 78K KRW higher. Whether you can absorb that gap is the crux of the choice.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("언제 원금균등이 유리한가", "When equal principal wins")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("총이자 비용을 줄이고 싶을 때", "When you want to minimize total interest")}</li>
            <li>{L("금리 하락기나 중도상환을 자주 할 때", "During falling rates or frequent prepayments")}</li>
            <li>{L("초기 여력이 충분할 때", "When you have enough early capacity")}</li>
            <li>{L("대출 기간이 길어 이자 절감 효과가 클 때", "When the term is long and interest savings are large")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("언제 원리금균등이 유리한가", "When equal payment wins")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("초기 현금흐름이 빠듯할 때", "When early cash flow is tight")}</li>
            <li>{L("변동금리 대출로 금리 상승기에 부담을 분산하고 싶을 때", "When you want to spread burden during rate hikes on a variable-rate loan")}</li>
            <li>{L("가계 예산 계획을 단순하게 유지하고 싶을 때", "When you want a predictable household budget")}</li>
            <li>{L("대출 기간이 짧아 두 방식의 차이가 작을 때", "When the term is short and the gap is small")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("결정 가이드", "Decision guide")}>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              {L(
                "현재 월 가처분소득을 계산하고, 첫 달 상환액(원금균등 기준)을 감당할 수 있는지 확인합니다.",
                "Compute your current monthly disposable income and check whether you can afford the first payment under equal principal.",
              )}
            </li>
            <li>
              {L(
                "대출 기간이 10년 이상이면 원금균등의 이자 절감 효과를 계산기로 직접 확인합니다.",
                "For terms of 10+ years, run the numbers in a calculator to see the interest savings from equal principal.",
              )}
            </li>
            <li>
              {L(
                "중도상환 계획이 있다면 중도상환수수료까지 포함해 총비용을 비교합니다.",
                "If you plan to prepay, include prepayment fees in the total-cost comparison.",
              )}
            </li>
            <li>
              {L(
                "변동금리라면 금리 상승 시나리오(예: +1%p, +2%p)를 가정해 월 상환액 변화를 시뮬레이션합니다.",
                "For variable rates, simulate monthly payments under rate-rise scenarios (e.g. +1%p, +2%p).",
              )}
            </li>
          </ol>
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
            <li>
              <Link href={`${base}/early-repayment-fee`} className="text-primary underline">
                {L("중도상환수수료 계산기", "Prepayment Fee Calculator")}
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
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 세무·법률·금융 자문이 아닙니다. 실제 대출 조건은 금융기관의 약관과 심사 결과에 따릅니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute tax, legal or financial advice. Actual loan terms follow your lender's agreement and underwriting.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
