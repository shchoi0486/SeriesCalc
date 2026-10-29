import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "DTI·DSR 완전 가이드: 대출 한도를 결정하는 비율" : "DTI & DSR Guide: Ratios That Decide Your Loan Limit",
    description: isKo
      ? "DTI와 DSR의 차이, 계산 방법, 규제 기준과 대출 한도 늘리는 현실적인 방법을 정리했습니다."
      : "DTI vs DSR, how each is calculated, regulatory thresholds, and realistic ways to raise your borrowing limit.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("DTI와 DSR 중 대출 심사에서 더 중요한 것은?", "Which matters more in screening, DTI or DSR?"),
      a: L(
        "현재는 DSR이 사실상 상한선 역할을 합니다. DTI를 통과해도 DSR 규제 비율(은행권 기준 통상 40%)을 넘으면 대출이 거절되거나 한도가 깎입니다. 두 지표 모두 계산기로 미리 확인하세요.",
        "DSR is effectively the binding cap today. Even if DTI passes, breaching the DSR threshold (typically 40% at banks) means rejection or a smaller loan. Check both with the calculators in advance.",
      ),
    },
    {
      q: L("DSR을 낮추는 가장 빠른 방법은?", "What is the fastest way to lower DSR?"),
      a: L(
        "금리·한도보다 만기가 길수록 연간 원리금 상환액이 줄어 DSR이 내려갑니다. 다음으로 고금리 소액 대출부터 상환하는 것이 효과적입니다. 상환 스케줄 계산기로 시나리오별 연간 상환액을 비교해 보세요.",
        "Longer maturities shrink annual repayments and lower DSR faster than rateshopping. Next, repay small high-rate loans first. Compare annual repayments per scenario in the amortization calculator.",
      ),
    },
    {
      q: L("신용대출도 DSR에 포함되나요?", "Do credit loans count toward DSR?"),
      a: L(
        "네, 주택담보대출뿐 아니라 신용대출·카드론·할부금·리스까지 모든 금융권 대출의 연간 상환액이 합산됩니다. 다만 전세대출·정책대출 등 일부는 산정 방식에 예외가 있으니 DSR 계산기 입력 전 상품 조건을 확인하세요.",
        "Yes — mortgages plus credit loans, card loans, installments and leases all add up. Some products like jeonse or policy loans have special treatments, so check product terms before entering values.",
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
      <ProsePage title={L("DTI·DSR 완전 가이드", "The Complete DTI & DSR Guide")}>
        <ProseSection title={L("두 지표의 정의", "What the two ratios mean")}>
          <p>
            {L(
              "DTI(총부채상환비율)는 연소득 대비 주택담보대출 등의 연간 상환액 비율이고, DSR(총부채원리금상환비율)은 모든 금융권 대출의 연간 원리금 상환액을 연소득으로 나눈 비율입니다. DTI가 주택대출 중심이라면 DSR은 신용대출·카드론까지 포함한 전수 검사에 가깝습니다.",
              "DTI (debt-to-income) compares annual mortgage-type repayments to yearly income, while DSR (debt service ratio) divides all annual debt repayments across every lender by income. DTI focuses on housing loans; DSR is close to a full inspection including credit and card loans.",
            )}
          </p>
          <p>
            {L("직접 계산: ", "Calculate yours: ")}
            <Link href={`${base}/dti`} className="text-primary underline">DTI {L("계산기", "Calculator")}</Link>
            {isKo && (
              <>
                {L(" · ", " · ")}
                <Link href={`${base}/dsr-calculator`} className="text-primary underline">DSR {L("계산기", "Calculator")}</Link>
              </>
            )}
            .
          </p>
        </ProseSection>

        <ProseSection title={L("계산 방법과 예시", "How to compute, with an example")}>
          <p>
            {L(
              "연소득 6,000만 원인 차주가 주택담보대출 연 상환액 1,500만 원, 신용대출 연 상환액 600만 원을 갚는다면 DSR은 (1,500+600)/6,000 = 35%입니다. 은행권 규제 40% 안쪽이므로 여유가 있지만, 여기서 신용대출 500만 원을 추가하면 43.3%로 기준을 넘습니다.",
              "A borrower earning 60M KRW yearly with 15M mortgage and 6M credit repayments has DSR = (15+6)/60 = 35% — inside the typical 40% bank cap. Adding 5M more credit borrowing pushes it to 43.3%, over the line.",
            )}
          </p>
          <p>
            {L(
              "소득 산정에는 근로·사업소득 외에 인정되는 기타소득(임대·연금 등)이 포함될 수 있고, 상여·변동소득은 깐깐하게 반영됩니다. 대출 실행 전 은행의 소득 산정 방식을 먼저 확인하세요.",
              "Assessable income can include rental or pension income beyond wages, while bonuses and variable pay are discounted. Confirm your bank's income recognition rules before applying.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("한도를 늘리는 현실적인 방법", "Realistic ways to raise your limit")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("만기를 길게: 같은 금액도 만기가 길면 연간 상환액이 줄어 DSR이 내려갑니다. 총이자와 맞바꾸는 선택이므로 상환 스케줄 계산기로 비교하세요.", "Stretch maturity: the same balance over more years means smaller annual payments and lower DSR — traded against more total interest. Compare in the amortization calculator.")}</li>
            <li>{L("고금리 소액부터 상환: 신용대출·카드론을 먼저 정리하면 DSR 분자가 빠르게 줄어듭니다.", "Clear small high-rate balances first: credit and card loans shrink the DSR numerator fastest.")}</li>
            <li>{L("상환 방식 조정: 초기 상환액이 큰 원금균등보다 원리금균등이 연간 상환액 산정에 유리할 수 있습니다.", "Pick the repayment method wisely: equal-payment plans can look friendlier in annual-repayment math than front-loaded equal-principal ones.")}</li>
          </ul>
          <p>
            <Link href={`${base}/amortization-schedule`} className="text-primary underline">{L("상환 스케줄 계산기", "Amortization Schedule Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/principal-and-interest-equal-repayment`} className="text-primary underline">{L("원리금균등 계산기", "Equal Payment Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/principal-equal-amortization`} className="text-primary underline">{L("원금균등 계산기", "Equal Principal Calculator")}</Link>
            .
          </p>
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
