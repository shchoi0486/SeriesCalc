import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./CharterLoanCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/charter-loan-calculator", "finance", "charter-loan-calculator");
}

export default function CharterLoanCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const W = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: W("실제 전세대출은 매달 원금도 갚나요? 이 계산기와 다른 것 같은데요.", "Do real jeonse loans repay principal monthly? This calculator seems different."),
      a: W(
        "예리한 지적입니다. 실제 전세자금대출은 대부분 '만기일시상환' 방식으로, 계약 기간 동안에는 이자(위 예시 기준 월 43.75만원)만 내고 만기에 원금을 한꺼번에 상환합니다. 이 계산기가 채택한 원리금균등 방식은 매달 일부 원금을 함께 갚는 방식이라 월 부담이 크지만 총이자가 적습니다(553만원 vs 1,050만원). 두 방식의 차이를 이해하고 실제 가입 상품의 상환 조건을 반드시 확인하세요.",
        "Sharp observation. Most real jeonse loans use bullet repayment — you pay only interest during the term (43.75 per month in the example) and return the principal in a lump sum at maturity. This calculator models equal installment instead, where principal is repaid gradually: heavier monthly payments but far less total interest (5.53 million vs 10.5 million). Know which structure your actual product uses.",
      ),
    },
    {
      q: W("결과에 보증료나 기타 비용도 포함되어 있나요?", "Are guarantee fees included in the result?"),
      a: W(
        "아니요. 결과는 순수하게 대출 원금과 이자만 반영합니다. 주택도시기금 대출이나 은행권 보증부 전세대출은 별도의 보증료(보증금액에 연 0.02~0.04% 수준, 보증기관별 상이)가 추가되고, 전세보증금 반환보증(HUG·SGI 등) 가입 시 보증료도 따로 발생합니다. 실제 월 현금흐름은 이 계산 결과 + 보증료로 구성됩니다.",
        "No — the result reflects principal and interest only. Fund loans and guaranteed bank jeonse loans add separate guarantee fees (roughly 0.02–0.04% of the deposit per year, varying by guarantor), and joining a deposit-return insurance scheme like HUG or SGI carries its own premium. Your true monthly outflow is this result plus those fees.",
      ),
    },
    {
      q: W("전세자금대출 한도는 어떻게 정해지나요?", "How is my jeonse loan limit determined?"),
      a: W(
        "세 가지 틀이 겹쳐서 결정됩니다. ① 법적 LTV(투기과열지구 등 규제지역은 보증금의 80% 이내 등 지역별 상이) ② 보증기관 한도(HUG·주택도시기금 보증 가능액) ③ 소득 기준 DSR(연소득 대비 연간 부채상환액 40% 이내 등). 예를 들어 보증금 2억 집에서 DSR과 LTV를 모두 충족해도 소득 증빙이 부족하면 한도가 줄어들 수 있으므로, 계약 전 본인 소득 기준 모의계산을 해두는 것이 안전합니다.",
        "Three ceilings intersect: statutory LTV (e.g., capped at 80% of the deposit in regulated zones), the guarantor's maximum (HUG or the housing fund), and your income-based DSR (annual debt service within ~40% of annual income). Even on a 200-million-won lease you may receive less than requested if income documentation falls short — run the numbers on your own salary before signing a contract.",
      ),
    },
    {
      q: W("중도상환 수수료는 붙나요?", "Do prepayment penalties apply?"),
      a: W(
        "주택도시기금 버팀목 대출은 중도상환수수료가 없고, 은행권 전세대출은 통상 3년 이내 상환 시 잔여 원금의 1% 내외(상품별 상이)가 붙습니다. 특히 전세 계약은 2년 뒤 재계약 여부가 유동적이므로, '집주인이 팔면 언제든 나가야 할 수 있다'는 시나리오까지 생각해 수수료 조건을 미리 확인하세요.",
        "Fund-backed loans (like Boteumjeom) carry no prepayment fee; bank products typically charge around 1% of remaining principal if repaid within three years, varying by product. Since a two-year lease can end abruptly if the landlord sells, check penalty terms assuming you might have to exit early.",
      ),
    },
    {
      q: W("청년·신혼부부 이자 지원 제도도 활용할 수 있나요?", "Can youth or newlywed interest subsidies help?"),
      a: W(
        "많은 지자체와 주택도시기금이 청년·신혼 대상 이자율 우대 또는 이자 지원 프로그램을 운영합니다(소득·무주택 요건 충족 시). 지원 방식은 금리 자체를 깎아주는 방식과 납부한 이자의 일부를 환급하는 방식이 있습니다. 조건이 지자체별로 크게 다르므로 거주 예정 지역의 주거지원 담당 부서에 입주 전 문의하는 것이 확실합니다.",
        "Many municipalities and the housing fund operate rate discounts or interest subsidies for young adults and newlywed households meeting income and first-home criteria — some cut the rate itself, others rebate part of paid interest. Eligibility rules differ sharply by region, so contact the local housing-support office before moving in.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">{W("전세자금대출 계산기", "Charter Loan Calculator")}</strong>
          {W(
            " 는 전세 보증금을 마련하기 위해 필요한 대출 금액, 연이자율, 기간을 입력하면 매월 상환액과 기간 전체 이자를 계산합니다. 입력 단위는 만원입니다(기본값: 15,000만원 · 연 3.5% · 2년).",
            " computes the monthly repayment and lifetime interest for a loan taken to fund a jeonse deposit. Enter the amount (in units of 10,000 won), annual rate, and term — defaults are 15,000 × 10K won at 3.5% for two years.",
          )}
        </p>
        <p>
          {W(
            "전세자금대출은 아파트·오피스텔 등 주택 임차보증금을 목적으로 하는 대출로, 버팀목 전세자금대출(주택도시기금), 중기청 전세자금대출, 시중은행 전세대출 등 유형별로 금리와 요건이 크게 다릅니다. 같은 금액이라도 어떤 창구를 이용하느냐에 따라 이자 부담이 몇 배씩 달라질 수 있으므로, 먼저 본인 요건으로 받을 수 있는 최저 금리를 파악한 뒤 이 계산기로 상환 계획을 세우는 순서를 권합니다.",
            "Jeonse loans exist specifically to cover housing deposits, and their pricing varies enormously by channel — government fund programs, SME-agency loans, or commercial bank products. For the same amount, choosing the right window can multiply or divide your interest burden several times over, so identify the lowest rate you actually qualify for before planning repayment here.",
          )}
        </p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="font-semibold text-foreground mb-3">{W("전세자금대출 유형", "Jeonse Loan Types")}</p>
          <div className="space-y-3">
            <div className="border-b border-border pb-3">
              <p className="font-semibold text-foreground">{W("버팀목 전세자금대출", "Boteumjeom Loan")}</p>
              <p className="mt-1">{W("주택도시기금에서 운영. 연소득 5천만원 이하, 전세보증금 2억 이하(수도권 3억 이하) 조건. 금리 1.5~2.1%.", "Operated by Housing & Urban Fund. Income under 50M won, deposit under 200M won (300M in Seoul metro). Rate: 1.5~2.1%.")}</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="font-semibold text-foreground">{W("중기청 전세자금대출", "SMEs Loan")}</p>
              <p className="mt-1">{isKo ? "중소기업 재직자 대상. 연소득 5천만원 이하, 전세보증금 2억 이하. 금리 1.2~2.1%." : "For SME employees. Income under 50M won, deposit under 200M won. Rate: 1.2~2.1%."}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{W("은행 전세자금대출", "Bank Jeonse Loan")}</p>
              <p className="mt-1">{isKo ? "시중은행 대출. DSR 기반 한도 산정. 금리 3~5% 수준." : "Commercial bank loans. DSR-based limit calculation. Rate: 3~5%."}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            W("필요 대출액 확인", "Confirm how much you need"),
            W("전세보증금에서 보유 자금을 뺀 금액이 필요 대출액입니다. 보증기관 한도(LTV)와 DSR로 줄어들 수 있음을 감안하세요.", "Deposit minus your own funds equals the loan need. Remember limits (LTV, DSR) can shrink what you are approved for."),
          ],
          [
            W("받을 수 있는 금리 입력", "Enter a rate you can actually get"),
            W("버팀목 요건이 된다면 1~2%대, 아니라면 은행권 3~5%대가 현실적인 출발점입니다. 우대조건 반영 사전승인 견적이 있다면 그 금리를 넣으세요.", "If you qualify for fund programs start near 1–2%, otherwise bank rates of 3–5%. A pre-approval quote is even better."),
          ],
          [
            W("기간 입력 후 계산", "Set the term and calculate"),
            W("전세 계약 기간(통상 2년)을 입력하고 계산하기를 누르면 월 납부액·총이자·총상환액이 표시됩니다.", "Enter the lease length (usually two years) and press Calculate to see monthly payment, total interest, and total repaid."),
          ],
          [
            W("상환방식 관점에서 해석", "Interpret by repayment method"),
            W("이 결과는 원리금균등 기준입니다. 실제 많은 전세대출이 만기일시상환이라는 점을 고려해 아래 예시의 두 방식 비교도 함께 참고하세요.", "Results assume equal installment. Many real loans are bullet-repaid at maturity — compare both structures in the example below."),
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
        <p className="font-semibold text-foreground mb-1">{W("예시 — 15,000만원 · 연 3.5% · 2년", "Example — 15,000 (10K won) at 3.5% for two years")}</p>
        <div>
          <p className="font-semibold text-foreground mb-2">{W("원리금균등(이 계산기 기준)", "Equal installment (this calculator)")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{W("월 이자율 = 3.5% ÷ 12 ≈ 0.2917%, 납부 횟수 24회", "Monthly rate = 3.5% ÷ 12 ≈ 0.2917%, 24 payments")}</li>
            <li>{W("월 납부액 ≈ 648만원", "Monthly payment ≈ 648 (10K won)")}</li>
            <li>{W("총 상환액 ≈ 15,553만원 → 총 이자 ≈ 553만원", "Total repaid ≈ 15,553 → total interest ≈ 553 (10K won)")}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{W("만기일시상환(실제 전세대출의 흔한 방식)", "Bullet repayment (common for real jeonse loans)")}</p>
          <p>
            {W(
              "매달 이자만 내는 경우 월 이자는 15,000 × 0.2917% ≈ 43.75만원이고, 24개월간 총이자는 1,050만원에 이릅니다. 원리금균등(553만원)보다 이자가 약 500만원 더 큰 이유는 원금이 끝까지 남아 있기 때문입니다. 대신 월 부담은 648만원이 아니라 43.75만원으로 훨씬 가볍습니다. '월 현금흐름'과 '총비용'의 상충이 바로 여기서 발생합니다.",
              "Paying interest only costs about 43.75 per month (15,000 × 0.2917%), totaling 1,050 over 24 months — roughly five million more than amortizing, because the principal never shrinks. In exchange the monthly burden is a fraction of 648. The tension between monthly cash flow and total cost lives exactly here.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <h4 className="font-semibold text-foreground">{W("원리금균등 상환 공식", "Equal Installment Formula")}</h4>
        <div className="font-mono p-4 bg-card border border-border rounded-lg text-sm">
          <strong className="text-primary">M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]</strong>
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">M</strong> = {W("월 납부액 (만원)", "Monthly payment (10K won)")}</li>
          <li><strong className="text-foreground">P</strong> = {W("대출 원금 (만원)", "Loan principal (10K won)")}</li>
          <li><strong className="text-foreground">r</strong> = {W("월 이자율 (연이자율/12)", "Monthly rate (annual/12)")}</li>
          <li><strong className="text-foreground">n</strong> = {W("총 납부 횟수 (기간년 × 12)", "Total payments (years × 12)")}</li>
        </ul>
        <p className="pt-1">
          {W(
            "입력과 출력 모두 만원 단위로 통일되어 있습니다. 예컨대 15,000만원을 넣으면 월 납부액도 만원 단위의 648로 표시되며, 실제 금액으로는 648만원(=6,480,000원)입니다.",
            "Both input and output share the same unit. Entering 15,000 returns a monthly figure like 648 — meaning 648 × 10,000 won, i.e., 6,480,000 won.",
          )}
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">1</span>
          <div>
            <p className="font-semibold text-foreground">{W("대출 기간 선택", "Loan Term Selection")}</p>
            <p className="mt-1">{W("전세자금대출은 보통 1~2년 단위로 계약합니다. 만기 시 대출 연장이 필요하며, 이때 금리가 변동될 수 있습니다.", "Jeonse loans are typically one-to-two-year commitments; renewal rates at maturity can move.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">2</span>
          <div>
            <p className="font-semibold text-foreground">{W("버팀목 vs 은행 대출", "Boteumjeom vs Bank Loan")}</p>
            <p className="mt-1">{W("버팀목은 금리가 낮지만 소득·보증금 요건이 까다롭습니다. 요건 충족 시 버팀목을 우선 활용하세요. 1%p 차이는 위 예시에서 2년간 약 150만원의 이자 차이로 이어집니다.", "Fund loans are cheaper but strict on eligibility. One percentage point here is worth roughly 1.5 million won over the example's two years.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">3</span>
          <div>
            <p className="font-semibold text-foreground">{W("중도상환 수수료", "Prepayment Fees")}</p>
            <p className="mt-1">{W("일부 상품은 중도상환 시 수수료가 발생할 수 있습니다. 만기 전 상환 가능성이 있다면 가입 전에 확인하세요.", "Some products charge prepayment fees — verify before signing if early exit is plausible.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">4</span>
          <div>
            <p className="font-semibold text-foreground">{W("보증금 반환보증보험", "Deposit Return Insurance")}</p>
            <p className="mt-1">{W("전세보증금 반환보증보험(HUG, SGI)에 가입하면 임대인의 보증금 미반환 위험으로부터 보호받을 수 있습니다. 대출 실행 조건으로 요구되기도 합니다.", "Deposit-return insurance (HUG, SGI) protects you if the landlord fails to refund — sometimes required as a loan condition anyway.")}</p>
          </div>
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
