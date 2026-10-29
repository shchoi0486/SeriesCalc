import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo
      ? "연봉별 실수령액 표 2026 | 세전 연봉과 월·연 실수령액 비교"
      : "2026 Take-Home Pay Table by Gross Salary | Gross vs Net in Korea",
    description: isKo
      ? "2026년 4대보험·근로소득세·지방소득세 기준 연봉별 실수령액 표. 연봉 3,000만원~1억원 구간, 월 실수령액·공제율·계산법과 주의사항까지 정리했습니다."
      : "Korean gross-to-net table for 2026 (pension, health, employment, income & local tax). Covers KRW 30M–100M with assumptions, notes and FAQs.",
    alternates: {
      canonical: `https://seriescalc.com/${params.locale}/guides/salary-take-home-table`,
      languages: {
        ko: "https://seriescalc.com/ko/guides/salary-take-home-table",
        en: "https://seriescalc.com/en/guides/salary-take-home-table",
      },
    },
    openGraph: {
      title: isKo
        ? "연봉별 실수령액 표 2026 | 세전 연봉과 월·연 실수령액 비교"
        : "2026 Take-Home Pay Table by Gross Salary",
      description: isKo
        ? "연봉 구간별 월 실수령액, 연 실수령액, 대략적 공제율을 한눈에 확인하세요."
        : "See approximate monthly/yearly take-home pay by gross salary in Korea.",
      type: "article",
      url: `https://seriescalc.com/${params.locale}/guides/salary-take-home-table`,
    },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/finance`;

  const table = [
    { gross: "30,000,000", monthlyGross: "2,500,000", monthlyNet: "2,205,000", yearlyNet: "26,460,000", rate: "88.2%" },
    { gross: "32,000,000", monthlyGross: "2,666,667", monthlyNet: "2,345,000", yearlyNet: "28,140,000", rate: "87.9%" },
    { gross: "34,000,000", monthlyGross: "2,833,333", monthlyNet: "2,485,000", yearlyNet: "29,820,000", rate: "87.7%" },
    { gross: "36,000,000", monthlyGross: "3,000,000", monthlyNet: "2,625,000", yearlyNet: "31,500,000", rate: "87.5%" },
    { gross: "38,000,000", monthlyGross: "3,166,667", monthlyNet: "2,765,000", yearlyNet: "33,180,000", rate: "87.3%" },
    { gross: "40,000,000", monthlyGross: "3,333,333", monthlyNet: "2,905,000", yearlyNet: "34,860,000", rate: "87.2%" },
    { gross: "42,000,000", monthlyGross: "3,500,000", monthlyNet: "3,045,000", yearlyNet: "36,540,000", rate: "87.0%" },
    { gross: "44,000,000", monthlyGross: "3,666,667", monthlyNet: "3,185,000", yearlyNet: "38,220,000", rate: "86.9%" },
    { gross: "46,000,000", monthlyGross: "3,833,333", monthlyNet: "3,320,000", yearlyNet: "39,840,000", rate: "86.6%" },
    { gross: "48,000,000", monthlyGross: "4,000,000", monthlyNet: "3,455,000", yearlyNet: "41,460,000", rate: "86.4%" },
    { gross: "50,000,000", monthlyGross: "4,166,667", monthlyNet: "3,590,000", yearlyNet: "43,080,000", rate: "86.2%" },
    { gross: "52,000,000", monthlyGross: "4,333,333", monthlyNet: "3,725,000", yearlyNet: "44,700,000", rate: "85.9%" },
    { gross: "54,000,000", monthlyGross: "4,500,000", monthlyNet: "3,855,000", yearlyNet: "46,260,000", rate: "85.7%" },
    { gross: "56,000,000", monthlyGross: "4,666,667", monthlyNet: "3,985,000", yearlyNet: "47,820,000", rate: "85.4%" },
    { gross: "58,000,000", monthlyGross: "4,833,333", monthlyNet: "4,115,000", yearlyNet: "49,380,000", rate: "85.1%" },
    { gross: "60,000,000", monthlyGross: "5,000,000", monthlyNet: "4,245,000", yearlyNet: "50,940,000", rate: "84.9%" },
    { gross: "65,000,000", monthlyGross: "5,416,667", monthlyNet: "4,570,000", yearlyNet: "54,840,000", rate: "84.4%" },
    { gross: "70,000,000", monthlyGross: "5,833,333", monthlyNet: "4,895,000", yearlyNet: "58,740,000", rate: "83.9%" },
    { gross: "75,000,000", monthlyGross: "6,250,000", monthlyNet: "5,215,000", yearlyNet: "62,580,000", rate: "83.4%" },
    { gross: "80,000,000", monthlyGross: "6,666,667", monthlyNet: "5,530,000", yearlyNet: "66,360,000", rate: "83.0%" },
    { gross: "85,000,000", monthlyGross: "7,083,333", monthlyNet: "5,845,000", yearlyNet: "70,140,000", rate: "82.5%" },
    { gross: "90,000,000", monthlyGross: "7,500,000", monthlyNet: "6,155,000", yearlyNet: "73,860,000", rate: "82.1%" },
    { gross: "95,000,000", monthlyGross: "7,916,667", monthlyNet: "6,465,000", yearlyNet: "77,580,000", rate: "81.7%" },
    { gross: "100,000,000", monthlyGross: "8,333,333", monthlyNet: "6,775,000", yearlyNet: "81,300,000", rate: "81.3%" },
  ];

  const faq = [
    {
      q: L("연봉별 실수령액 표의 수치는 정확한가요?", "Are the numbers in this table exact?"),
      a: L(
        "아니요. 본 표는 2026년 기준 대표요율을 적용한 근사치입니다. 부양가족 수, 비과세 항목(식대/자가운전보조금 등), 연말정산 공제, 중소기업 취업자 감면, 퇴직연금 유형 등에 따라 실수령액은 달라질 수 있습니다.",
        "These are approximations for 2026 based on standard rates. Actual take-home pay varies by dependents, tax-free allowances, year-end deductions, employment-type credits and pension setup."
      ),
    },
    {
      q: L("왜 연봉이 높아질수록 실수령률(실수령/세전)이 내려가나요?", "Why does the take-home ratio drop as gross rises?"),
      a: L(
        "근로소득세가 누진세율(6~45%)로 적용되기 때문입니다. 소득구간이 올라갈수록 한계세율이 높아져, 같은 금액을 더 받아도 실수령액 증가분은 점점 줄어듭니다. 여기에 지방소득세(결정세액의 10%)도 함께 부과됩니다.",
        "Because Korea applies progressive income tax (6–45%) with local tax (10% of computed tax). As you move to higher brackets, marginal tax rises and net growth slows."
      ),
    },
    {
      q: L("월 실수령액을 가장 정확하게 계산하려면 어떻게 하나요?", "How can I get the most accurate monthly take-home?"),
      a: L(
        "본인 조건(부양가족 수, 비과세 금액, 연말정산 예상 공제)을 그대로 입력해서 계산하는 것이 가장 정확합니다. SeriesCalc의 연봉 실수령액 계산기를 사용하면 2026년 요율을 반영해 즉시 계산할 수 있습니다.",
        "Use a calculator with your exact inputs (dependents, tax-free amounts, expected deductions). Our salary/take-home calculators apply current 2026 rates for a much closer estimate."
      ),
    },
    {
      q: L("연봉 협상 시 세전과 세후 중 무엇을 비교해야 하나요?", "Should I compare gross or net when negotiating?"),
      a: L(
        "가능한 한 세후(월 실수령액)를 기준으로 비교하는 것이 가장 현실적입니다. 다만 상여금 성격, 퇴직연금(DC/DB), 복리후생, 비과세 항목까지 함께 따져봐야 공정한 비교가 됩니다.",
        "Compare by net take-home whenever possible. Also check bonuses, severance/pension type, benefits and tax-free items before deciding."
      ),
    },
    {
      q: L("식대 비과세가 실수령액에 영향을 주나요?", "Does a tax-free meal allowance affect take-home pay?"),
      a: L(
        "영향을 줍니다. 식대 등 일정 한도 내 비과세 수당은 4대보험·소득세 과세대상에서 제외되므로, 세전은 같아도 실수령액은 더 높아질 수 있습니다. 따라서 오퍼 비교 시 '비과세 포함 여부'를 반드시 확인하세요.",
        "Yes. Tax-free allowances within limits are excluded from taxable/income-insurance bases in many cases, so equal gross can mean different net. Always check if meal/support allowances are tax-free."
      ),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: L("연봉별 실수령액 표 2026", "2026 Take-Home Pay Table by Gross Salary"),
    description: L(
      "2026년 기준 연봉 3,000만원~1억원 구간의 월·연 실수령액 근사표와 계산 원리, 주의사항을 정리한 가이드",
      "Guide with a 2026 Korea gross-to-net table (KRW 30M–100M), assumptions and tips for accurate comparison."
    ),
    inLanguage: isKo ? "ko-KR" : "en-US",
    author: { "@type": "Organization", name: "SeriesCalc" },
    publisher: { "@type": "Organization", name: "SeriesCalc" },
    about: ["Salary", "Take-home pay", "Korean income tax", "National Pension", "Health Insurance"],
    mainEntity: [
      {
        "@type": "Table",
        about: L("연봉별 실수령액 근사표(1인, 무부양, 비과세 최소 가정)", "Approximate take-home by gross salary (single, no dependents, minimal tax-free)"),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProsePage title={L("연봉별 실수령액 표 2026", "2026 Take-Home Pay Table by Gross Salary (Korea)")}>
        <ProseSection title={L("한눈에 보는 연봉별 실수령액", "Quick gross-to-net table")}>
          <p>
            {L(
              "아래 표는 2026년 4대보험(국민연금·건강보험·장기요양·고용보험)과 근로소득세·지방소득세를 반영한 근사치입니다. 가정: 1인 가구, 부양가족 없음, 비과세는 식대 등 최소 수준 위주로 가정했습니다.",
              "The table below is a 2026 approximation reflecting the four insurances and income/local tax. Assumptions: single taxpayer, no dependents, minimal tax-free allowances."
            )}
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-right font-semibold">{L("세전 연봉(연)", "Gross (annual)")}</th>
                  <th className="border p-2 text-right font-semibold">{L("세전 월급", "Gross (monthly)")}</th>
                  <th className="border p-2 text-right font-semibold">{L("월 실수령액(추정)", "Net (monthly, est.)")}</th>
                  <th className="border p-2 text-right font-semibold">{L("연 실수령액(추정)", "Net (annual, est.)")}</th>
                  <th className="border p-2 text-right font-semibold">{L("실수령률", "Net/Gross")}</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="border p-2 text-right tabular-nums">{row.gross}원</td>
                    <td className="border p-2 text-right tabular-nums">{row.monthlyGross}원</td>
                    <td className="border p-2 text-right font-medium tabular-nums">{row.monthlyNet}원</td>
                    <td className="border p-2 text-right tabular-nums">{row.yearlyNet}원</td>
                    <td className="border p-2 text-right tabular-nums">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 위 수치는 참고용 근사값입니다. 실제 금액은 급여명세서의 공제내역과 연말정산 결과에 따라 달라질 수 있습니다.",
              "* Values are approximate for reference only. Check your payslip or run a precise calculation for your case."
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("어떻게 읽어야 할까?", "How to use this table")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              {L(
                "오퍼 비교: '연봉 5,000만원'을 비교할 때 세전이 아닌 월 실수령액(위 표의 월 실수령액) 위주로 비교하세요.",
                "Compare offers by monthly take-home, not gross. Use the 'Net (monthly)' column as a reality check."
              )}
            </li>
            <li>
              {L(
                "이직·연봉협상: 비과세 항목이 많은 기업일수록 실수령액 격차는 더 벌어질 수 있습니다.",
                "If another offer has more tax-free allowances, net can be higher even at similar gross."
              )}
            </li>
            <li>
              {L(
                "대출·전세: 일부 대출 심사에서는 소득 산정 방식이 다릅니다. 실수령액 자체보다 심사 기준(인정소득)을 먼저 확인하세요.",
                "For loans/jeonse, lenders may use different recognized income than your net pay. Check their criteria first."
              )}
            </li>
          </ul>
          <p>
            {L("정확한 계산이 필요하면 ", "For a precise result, use ")}
            <Link href={`${base}/salary-calculator`} className="text-primary underline">
              {L("연봉 실수령액 계산기", "Take-Home Pay Calculator")}
            </Link>
            {L(" 또는 ", " or ")}
            <Link href={`${base}/salary`} className="text-primary underline">
              {L("월급·연봉 변환 계산기", "Monthly–Yearly Salary Converter")}
            </Link>
            {L("를 이용해보세요.", ".")}
          </p>
        </ProseSection>

        <ProseSection title={L("실수령액에 영향을 주는 주요 요소", "Key factors that affect take-home")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">{L("공제 성격", "Deductions")}</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                <li>{L("국민연금: 소득 상한/하한 적용", "National Pension: subject to min/max")}</li>
                <li>{L("건강보험 + 장기요양보험", "Health Insurance + Long-term Care")}</li>
                <li>{L("고용보험(실업급여 재원)", "Employment Insurance")}</li>
                <li>{L("근로소득세·지방소득세(누진)", "Income Tax & Local Tax (progressive)")}</li>
              </ul>
            </div>
            <div className="rounded-xl border p-4">
              <h3 className="font-semibold">{L("개인별 변수", "Personal factors")}</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                <li>{L("부양가족 수(소득공제/세액공제)", "Number of dependents")}</li>
                <li>{L("비과세 항목(식대, 자가운전보조금 등)", "Tax-free allowances")}</li>
                <li>{L("연말정산 공제(신용카드, IRP, 월세 등)", "Year-end deductions")}</li>
                <li>{L("상여금 지급 방식·비과세 적용 여부", "Bonus structure & tax treatment")}</li>
              </ul>
            </div>
          </div>
        </ProseSection>

        <ProseSection title={L("계산 흐름 이해하기", "Understanding the calculation flow")}>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              {L(
                "세전 연봉(월급×12)에서 4대보험 본인부담분을 먼저 차감",
                "Start from gross annual/monthly pay, subtract employee share of the four insurances"
              )}
            </li>
            <li>
              {L(
                "근로소득공제 등 공제 후 과세표준 산출 → 근로소득세(누진세율+누진공제) 계산",
                "Apply earned-income deduction to get tax base → compute income tax by progressive rates + quick deduction"
              )}
            </li>
            <li>
              {L(
                "결정세액의 10%를 지방소득세로 가산",
                "Add local income tax = 10% of determined income tax"
              )}
            </li>
            <li>
              {L(
                "비과세 수당은 과세대상에서 제외되므로 실제 차감액은 더 줄어듦",
                "Tax-free allowances reduce the tax/insurance bases in eligible cases, increasing net pay"
              )}
            </li>
          </ol>
          <p className="mt-2">
            {L("더 자세한 배경은 ", "For a deeper explanation, read ")}
            <Link href={`/${params.locale}/guides/salary-take-home`} className="text-primary underline">
              {L("연봉 실수령액 완전 가이드", "The Complete Take-Home Pay Guide")}
            </Link>
            {L("를 참고하세요.", ".")}
          </p>
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

        <ProseSection title={L("관련 가이드 & 계산기", "Related Guides & Calculators")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link href={`/${params.locale}/guides/salary-take-home`} className="text-primary underline">
                {L("연봉 실수령액 완전 가이드", "Complete Take-Home Pay Guide")}
              </Link>{" "}
              {L("– 공제구조·이직체크리스트", "– Deductions, offer comparison checklist")}
            </li>
            <li>
              <Link href={`${base}/salary-calculator`} className="text-primary underline">
                {L("연봉 실수령액 계산기", "Take-Home Pay Calculator")}
              </Link>{" "}
              {L("– 부양가족/비과세까지 반영해 정확히 계산", "– Include dependents & tax-free items for accuracy")}
            </li>
            <li>
              <Link href={`${base}/income-tax-calculator`} className="text-primary underline">
                {L("근로소득세 계산기", "Income Tax Calculator")}
              </Link>{" "}
              {L("– 세율구간·누진공제 확인", "– Check brackets & quick deductions")}
            </li>
            <li>
              <Link href={`${base}/weekly-holiday-allowance`} className="text-primary underline">
                {L("주휴수당 계산기", "Weekly Holiday Allowance Calculator")}
              </Link>{" "}
              {L("– 주 15시간 이상 시 필수 체크", "– Important for part-time/retail workers")}
            </li>
            <li>
              <Link href={`${base}/retirement`} className="text-primary underline">
                {L("퇴직금 계산기", "Severance Pay Calculator")}
              </Link>{" "}
              {L("– 이직 전 퇴직금 예상액 확인", "– Estimate before changing jobs")}
            </li>
          </ul>
        </ProseSection>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 표와 설명은 일반적인 정보 제공 목적이며, 세무·법률·금융 자문이 아닙니다. 최종적인 공제액과 세액은 회사의 급여규정, 국세청 고시, 연말정산 결과에 따릅니다.",
              "Disclaimer: This page is for general informational purposes only and does not constitute tax, legal or financial advice. Final amounts depend on your employer's payroll rules, official notices and your year-end tax settlement."
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
