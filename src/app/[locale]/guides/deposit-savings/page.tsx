import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "예금·적금 이자 가이드: 단리·복리·세후 수령액 비교법" : "Savings Interest Guide: Simple vs Compound, After Tax",
    description: isKo
      ? "같은 금리인데 수령액이 다른 이유. 단리·복리·월복리 차이와 세후 실수령액 계산법을 예시와 함께 정리했습니다."
      : "Why the same rate pays differently — simple vs compound vs monthly compounding and after-tax returns, with examples.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("단리와 복리는 실제로 얼마나 차이 나나요?", "How big is the simple vs compound gap in practice?"),
      a: L(
        "1,000만 원을 연 4%로 3년 맡기면 단리는 약 120만 원, 연복리는 약 125만 원으로 5만 원가량 차이납니다. 기간이 길고 금리가 높을수록 격차는 눈덩이처럼 커집니다. 예금 이자 계산기에서 직접 비교해 보세요.",
        "Parking 10M KRW at 4% for 3 years pays about 1.2M simple vs 1.25M annually-compounded — a 50K gap. Longer terms and higher rates snowball the difference. Compare directly in the deposit interest calculator.",
      ),
    },
    {
      q: L("이자에도 세금이 붙나요?", "Is savings interest taxed?"),
      a: L(
        "네. 이자소득세 14%와 농어촌특별세 1.4%를 합쳐 15.4%가 원천징수됩니다. ISA·연금저축 같은 세제 혜택 계좌를 활용하면 이 누수를 줄일 수 있습니다.",
        "Yes — 14% income tax plus a 1.4% surtax are withheld, 15.4% in total. Tax-advantaged accounts like ISAs or pension savings reduce this leakage.",
      ),
    },
    {
      q: L("월복리 적금이 항상 유리한가요?", "Is monthly-compounding savings always better?"),
      a: L(
        "같은 표시 금리라면 월복리가 유리합니다. 다만 표시 금리가 다른 상품끼리는 총이자를 직접 비교해야 합니다. 월복리 적금 계산기와 일반 적금 계산기에 같은 납입 조건을 넣고 세후 수령액을 비교하세요.",
        "At the same advertised rate, monthly compounding wins. But across different advertised rates you must compare total interest head-to-head — run identical contributions in both calculators and judge after-tax maturity values.",
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
      <ProsePage title={L("예금·적금 이자 완전 가이드", "The Complete Savings Interest Guide")}>
        <ProseSection title={L("단리·복리·월복리의 차이", "Simple vs compound vs monthly compounding")}>
          <p>
            {L(
              "단리는 원금에만 이자가 붙고, 복리는 원금+누적 이자에 이자가 붙습니다. 월복리는 매달 이자를 원금에 더하므로 연 1회 복리보다 유리합니다. 표시 금리가 같아도 복리 주기에 따라 만기 수령액이 달라지는 이유입니다.",
              "Simple interest accrues on principal only; compound interest accrues on principal plus accumulated interest. Monthly compounding folds interest into principal every month, beating once-a-year compounding at the same advertised rate — which is why maturity values differ.",
            )}
          </p>
          <p>
            {L("비교해 보기: ", "Compare: ")}
            <Link href={`${base}/deposit-interest`} className="text-primary underline">{L("예금 이자 계산기", "Deposit Interest Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/installment-savings-monthly-compound-interest`} className="text-primary underline">{L("월복리 적금 계산기", "Monthly Compound Savings Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/regular-installment-savings`} className="text-primary underline">{L("적금 계산기", "Installment Savings Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("세후 실수령액 계산법", "Computing after-tax returns")}>
          <p>
            {L(
              "이자에서 15.4%를 먼저 떼고 남은 금액이 실수령입니다. 예컨대 세전 이자 100만 원이면 세후 약 84.6만 원을 받습니다. 상품을 고를 때는 세전 금리가 아니라 세후 수령액으로 줄 세우는 것이 정확합니다.",
              "Subtract 15.4% from interest first — 1M KRW of gross interest nets about 846K. Rank products by after-tax proceeds, not advertised rates.",
            )}
          </p>
          <p>
            {L(
              "ISA·청년 전용 계좌처럼 비과세 한도가 있는 상품은 이 구간만큼 세금이 0원이므로, 일반 과세 상품보다 표시 금리가 낮아도 실수령이 앞서는 경우가 있습니다.",
              "Products with tax-free allowances (like ISAs or youth accounts) pay zero tax inside the allowance, so a lower advertised rate can still net more than a fully-taxed product.",
            )}
          </p>
          <p>
            {isKo ? (
              <>
                <Link href={`${base}/isa`} className="text-primary underline">{L("ISA 계산기", "ISA Calculator")}</Link>
                {L(" · ", " · ")}
                <Link href={`${base}/compound-interest`} className="text-primary underline">{L("복리 계산기", "Compound Interest Calculator")}</Link>
              </>
            ) : (
              <>
                <Link href={`${base}/compound-interest`} className="text-primary underline">Compound Interest Calculator</Link>
                {L(" · ", " · ")}
                <Link href={`${base}/deposit-interest`} className="text-primary underline">Deposit Interest Calculator</Link>
              </>
            )}
            .
          </p>
        </ProseSection>

        <ProseSection title={L("상품 고르는 순서", "How to choose, in order")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("목표 기간 확정: 1년 이내 단기라면 세후 단기 금리 순으로, 3년 이상이면 복리 효과가 큰 상품 순으로 봅니다.", "Fix the horizon: for under a year rank by short-term after-tax rates; for 3+ years rank by compounding power.")}</li>
            <li>{L("납입 방식 매칭: 목돈이 있으면 예금, 매달 모으면 적금. 자유적금은 목표 금액에서 역산해 월 납입액을 정하세요.", "Match the deposit style: lump sums go to term deposits, monthly savers to installment plans. For flexible goals, back-calculate the monthly amount from the target.")}</li>
            <li>{L("우대조건 현실성: 카드 실적·급여이체 같은 우대조건을 실제 달성 가능한지 따지고, 미달성 시 기본 금리로 비교하세요.", "Check bonus-rate realism: judge by the base rate if you cannot reliably meet card-spending or payroll conditions.")}</li>
          </ul>
          <p>
            <Link href={`${base}/free-installment-savings`} className="text-primary underline">{L("자유적금 계산기", "Flexible Savings Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/interest-rate-calculator`} className="text-primary underline">{L("실효금리 계산기", "Effective Rate Calculator")}</Link>
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
