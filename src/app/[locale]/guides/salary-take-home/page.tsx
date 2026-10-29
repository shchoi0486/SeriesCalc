import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "연봉 실수령액 완전 가이드: 세전·세후, 4대보험 계산법" : "Take-Home Pay Guide: Gross vs Net Salary Explained",
    description: isKo
      ? "연봉 계약서의 숫자가 통장에 찍히는 금액과 다른 이유, 4대보험·소득세 공제 구조와 실수령액 계산법을 정리했습니다."
      : "Why your contract salary differs from your bank deposit — deductions, social insurance and income tax, plus how to estimate take-home pay.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const faq = [
    {
      q: L("연봉 5,000만 원이면 월 실수령액은 얼마인가요?", "What is the monthly take-home for a 50M KRW salary?"),
      a: L(
        "부양가족·비과세액 등 조건에 따라 다르지만, 1인 가구·국민연금·건강보험·소득세·지방세를 반영하면 월 350만~370만 원대가 됩니다. 연봉 실수령액 계산기에 본인 조건을 입력하면 바로 확인할 수 있습니다.",
        "It depends on dependents and tax-free allowances, but a single earner typically nets around 3.5–3.7M KRW per month after pension, health insurance, income and local tax. Enter your own figures in the take-home pay calculator.",
      ),
    },
    {
      q: L("세전 연봉만 보고 이직을 결정해도 되나요?", "Can I judge a job offer by gross salary alone?"),
      a: L(
        "위험합니다. 식대 비과세, 상여 구조, 퇴직연금(DC) 적립, 4대보험 사업주 부담분까지 포함하면 세전 차이가 뒤집히는 경우가 있습니다. 세후 실수령액과 복리후생을 함께 비교하세요.",
        "Risky. Meal allowances, bonus structures, DC pension contributions and employer insurance shares can overturn a gross-salary gap. Compare take-home pay plus benefits together.",
      ),
    },
    {
      q: L("4대보험 중 본인이 내는 비율은 얼마인가요?", "What share of the four insurances do I pay?"),
      a: L(
        "국민연금 약 4.5%, 건강보험 약 3.545%, 장기요양보험(건강보험료의 약 12.95%), 고용보험 약 0.9%를 본인이 부담합니다(요율은 연도별로 미세 조정됨). 나머지 절반은 회사가 부담합니다.",
        "Roughly 4.5% national pension, 3.545% health insurance, long-term care at about 12.95% of the health premium, and 0.9% employment insurance — the employer matches about half (rates adjust slightly each year).",
      ),
    },
    {
      q: L("소득세는 어떻게 계산되나요?", "How is income tax computed?"),
      a: L(
        "근로소득공제를 뺀 과세표준에 6~45% 누진세율을 적용하고 누진공제액을 뺀 뒤, 결정세액의 10%를 지방소득세로 더합니다. 소득이 오르면 한계세율이 올라가 실수령액 증가폭이 둔화됩니다.",
        "After the earned-income deduction, progressive rates of 6–45% apply to the tax base minus a quick deduction, plus 10% local tax on the computed amount. Higher income faces a higher marginal rate, so take-home growth slows down.",
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
      <ProsePage title={L("연봉 실수령액 완전 가이드", "The Complete Take-Home Pay Guide")}>
        <ProseSection title={L("세전 연봉과 실수령액이 다른 이유", "Why gross and net differ")}>
          <p>
            {L(
              "연봉 계약서에 적힌 금액은 세금과 사회보험을 떼기 전 숫자, 즉 세전(gross)입니다. 통장에 들어오는 실수령액(net)은 여기서 4대보험 본인부담분과 근로소득세·지방소득세를 뺀 나머지에 식대 같은 비과세 수당을 더한 금액입니다. 공제율이 15~25%에 달하므로 체감이 크게 다릅니다.",
              "The figure on your offer letter is gross — before taxes and social insurance. Net take-home subtracts your share of the four insurances plus income and local taxes, then adds tax-free allowances like meal support. With combined deductions of 15–25%, the gap feels large.",
            )}
          </p>
          <p>
            {L("직접 계산해 보세요: ", "Try it yourself: ")}
            {isKo ? (
              <>
                <Link href={`${base}/salary-calculator`} className="text-primary underline">
                  {L("연봉 실수령액 계산기", "Take-Home Pay Calculator")}
                </Link>
                {L(" · ", " · ")}
              </>
            ) : null}
            <Link href={`${base}/salary`} className="text-primary underline">
              {L("월급·연봉 변환 계산기", "Monthly–Yearly Salary Converter")}
            </Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("4대보험 공제 구조", "How the four insurances work")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("국민연금: 월급의 약 4.5%를 본인이, 같은 금액을 회사가 부담합니다. 상·하한액이 있어 초고소득자는 정액에 수렴합니다.", "National pension: you pay about 4.5% of monthly wage, matched by the employer. Caps mean very high earners converge to a flat amount.")}</li>
            <li>{L("건강보험·장기요양: 건강보험료율에 장기요양보험료(약 12.95%)가 얹힙니다. 피부양자가 있으면 본인 보험료에는 영향이 없습니다.", "Health + long-term care: the long-term-care premium (about 12.95% of the health premium) is added on top. Dependents do not change your own premium.")}</li>
            <li>{L("고용보험: 본인 약 0.9%. 실업급여·육아휴직급여의 재원이 되므로 체감 혜택이 큰 보험입니다.", "Employment insurance: about 0.9% from you. It funds unemployment and parental-leave benefits, so the perceived return is high.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("소득세·지방세 계산 흐름", "Income and local tax flow")}>
          <p>
            {L(
              "근로소득세는 총급여에서 근로소득공제·인적공제·연금보험료공제 등을 뺀 과세표준에 누진세율(6~45%)을 곱한 뒤 누진공제액을 빼고, 세액공제(표준 13만 원 등)를 차감해 결정됩니다. 결정세액의 10%가 지방소득세로 추가됩니다. 그래서 연봉이 오를수록 실수령액 증가폭은 세율 구간만큼 깎입니다.",
              "Taxable income equals gross pay minus the earned-income deduction, personal exemptions and pension deductions. Progressive rates (6–45%) apply, minus a quick deduction and tax credits (e.g. the 130,000 KRW standard credit). Local tax adds 10% of the computed tax — so each raise is trimmed by the marginal bracket.",
            )}
          </p>
          <p>
            {L("세금 시뮬레이션: ", "Simulate: ")}
            {isKo ? (
              <Link href={`${base}/income-tax-calculator`} className="text-primary underline">
                {L("소득세 계산기", "Income Tax Calculator")}
              </Link>
            ) : (
              <Link href={`${base}/salary`} className="text-primary underline">
                {L("월급·연봉 변환 계산기", "Monthly–Yearly Salary Converter")}
              </Link>
            )}
            .
          </p>
        </ProseSection>

        <ProseSection title={L("이직·협상 체크리스트", "Offer and negotiation checklist")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("세전이 아니라 세후 월 실수령액으로 오퍼를 비교하세요. 식대·차량유지비 같은 비과세 항목이 포함되면 격차가 좁혀집니다.", "Compare offers by monthly take-home, not gross. Tax-free items like meal or car allowances narrow the gap.")}</li>
            <li>{L("상여가 고정급인지 변동급인지 확인하세요. 변동 상여는 DSR·대출 심사 소득 산정에도 다르게 반영될 수 있습니다.", "Check whether bonuses are fixed or variable — variable pay can be treated differently in DSR and loan income assessments.")}</li>
            <li>{L("퇴직연금 DC형 적립률, 연차·주휴수당, 연장수당 기준(통상임금)을 함께 물어보세요.", "Ask about DC pension contribution rates, leave allowances and the ordinary-wage base for overtime together.")}</li>
          </ul>
          <p>
            {L("관련 계산기: ", "Related calculators: ")}
            {isKo ? (
              <>
                <Link href={`${base}/retirement`} className="text-primary underline">{L("퇴직금 계산기", "Severance Calculator")}</Link>
                {L(" · ", " · ")}
                <Link href={`${base}/weekly-holiday-allowance`} className="text-primary underline">{L("주휴수당 계산기", "Weekly Holiday Allowance Calculator")}</Link>
                {L(" · ", " · ")}
                <Link href={`${base}/ordinary-wage`} className="text-primary underline">{L("통상임금 계산기", "Ordinary Wage Calculator")}</Link>
              </>
            ) : (
              <>
                <Link href={`${base}/salary`} className="text-primary underline">Monthly–Yearly Salary Converter</Link>
                {L(" · ", " · ")}
                <Link href={`${base}/weekly-holiday-allowance`} className="text-primary underline">Weekly Holiday Allowance Calculator</Link>
              </>
            )}
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
