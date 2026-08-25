import TermGlossary from "@/components/calculators/TermGlossary";
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./NetSalaryCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/net-salary-calculator", "finance", "net-salary-calculator");
}

export default function NetSalaryCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "실제 급여명세서와 결과가 다른데 어느 쪽이 맞나요?" : "My payslip differs from this result — which is right?",
      a: isKo
        ? "급여명세서가 맞습니다. 이 계산기는 소득세를 과세소득 × 세율 − 누진공제로만 잡는 단순화 모델이라, 근로소득공제(연 500만~1억 구간에서 최대 740만원), 인적공제, 표준세액공제 13만원, 개인연금 세액공제 등이 빠져 있습니다. 그래서 소득세가 실제보다 높게 나오고 실수령액은 낮게 나옵니다. 공제 구조를 반영한 정밀 견적이 필요하면 국세청 간이세액표나 회사 인사팀의 원천징수 기준을 따르세요."
        : "Trust your payslip. This simplified model omits earned-income deductions (up to 7.4 million won), personal deductions, the standard 130,000-won credit, and pension credits — so it overstates tax and understates take-home. For precise figures use the NTS withholding table or your HR team's basis.",
    },
    {
      q: isKo ? "월급이 높은데 국민연금이 더 안 늘어나요. 왜죠?" : "Why does my National Pension stop growing at high salaries?",
      a: isKo
        ? "국민연금에는 기준소득월액 상하한이 있습니다(현재 하한 37만원, 상한 590만원). 월급이 590만원을 넘으면 초과분에는 연금료가 붙지 않아 보험료가 고정됩니다. 덕분에 고연봉자일수록 전체 공제 중 보험료 비중이 상대적으로 작아지는 특성이 있으며, 반대로 저임금 근로자는 하한 37만원 기준으로 최소 보험료를 냅니다."
        : "National Pension premiums apply only between a floor and a ceiling on pensionable income (370K–5.9M won monthly). Above the cap no further premium accrues, so high earners see a smaller insurance share of total deductions, while very low earners pay the floor amount.",
    },
    {
      q: isKo ? "비과세 수당을 입력하면 얼마나 유리해지나요?" : "How much do non-taxable allowances actually save?",
      a: isKo
        ? "이 계산기 기준으로는 소득세 절감 효과가 직접 나타납니다. 예를 들어 월급 300만원 중 20만원을 비과세 식대로 바꾸면 연 과세소득이 360만원 줄어 연 소득세가 396,000원 감소해 월 실수령이 약 33,000원 늘어납니다. 실무에서는 건강보험료 산정에서도 비과세가 일부 제외되므로 실제 절감은 여기보다 다소 더 큽니다. 단, 비과세는 회사 급여 체계가 해당 항목을 지급해야 적용됩니다."
        : "In this calculator the saving shows up as income tax: converting 200,000 of a 3-million salary into a non-taxable meal allowance cuts annual taxable income by 2.4 million, reducing yearly tax by 396,000 — about 33,000 more per month. Real-world payroll also trims health-insurance assessment on such allowances, so actual savings run slightly higher. It only works if your employer structures pay that way.",
    },
    {
      q: isKo ? "고용보험료율이 사람마다 다르다고 들었는데요?" : "Isn't the employment-insurance rate different for some people?",
      a: isKo
        ? "일반 근로자는 0.9%(실업급여 포함)가 표준입니다. 다만 65세 이상 고용 근로자는 실업급여 대상에서 빠져 0.25%, 60~64세는 0.8% 등 연령별·유형별로 다른 요율이 적용될 수 있습니다. 이 계산기는 가장 흔한 일반 근로자 기준 0.9%를 사용합니다."
        : "Standard workers pay 0.9%. Reduced rates apply to older workers — roughly 0.25% past 65 (outside unemployment benefits) and about 0.8% for ages 60–64 — among other categories. This calculator uses the standard 0.9%.",
    },
    {
      q: isKo ? "이 결과와 연말정산은 어떤 관계인가요?" : "How does this relate to year-end settlement?",
      a: isKo
        ? "매달 빠지는 소득세는 '예납'에 가깝고, 연말정산에서 공제·세액감면을 반영해 최종 확정됩니다. 그래서 의료비·교육비·기부금·개인연금 공제를 잘 챙기면 이 계산기가 보여주는 월 세금보다 실질 세부담이 낮아지고 환급으로 돌아옵니다. 즉 이 도구의 실수령액은 공제 전 순수 급여 기준 추정치이며, 연말정산 결과가 좋을수록 실제 체감 수령액은 이보다 유리해집니다."
        : "Monthly withholding is essentially a prepayment; year-end settlement finalizes the true bill after deductions and credits. Good documentation of medical, education, donation, and pension contributions means your real burden lands below what any monthly estimate shows, with the difference refunded. Treat this tool's figure as a deduction-free baseline that settlement can only improve.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? '실수령액 계산기는 매월 급여에서 실제로 빠져나가는 4대보험(국민연금, 건강보험, 장기요양보험, 고용보험)과 소득세, 지방소득세를 정확히 계산하여, 통장에 찍히는 실질 금액을 알려주는 도구입니다.' : 'The Net Salary Calculator accurately computes the 4 insurances (National Pension, Health Insurance, Long-term Care Insurance, Employment Insurance), income tax, and local income tax deducted from your monthly salary to show the actual amount deposited into your account.'}
        </p>
        <p>
          {isKo ? '계약서에 명시된 월급(세전)에서 비과세 금액을 제외한 과세 대상 금액을 기준으로 각 보험료율과 소득세 누진세율을 적용하여 산출합니다. 비과세 항목(식대, 차량유지비 등)을 활용하면 실수령액을 높일 수 있습니다.' : 'It calculates based on the taxable amount (monthly salary minus non-taxable items), applying each insurance rate and progressive income tax rates. Using non-taxable items (meal allowance, vehicle upkeep, etc.) can increase your net salary.'}
        </p>
        <TermGlossary items={[
          { term: isKo ? '4대보험' : 'Four Insurances', desc: isKo ? '국민연금, 건강보험, 장기요양보험, 고용보험으로 근로자의 사회안전망을 위한 공제 항목입니다.' : 'National Pension, Health Insurance, Long-term Care Insurance, and Employment Insurance—the deductions funding the workers\' social safety net.' },
          { term: isKo ? '비과세 소득' : 'Non-taxable Income', desc: isKo ? '과세 대상에서 제외되는 소득으로, 식대·차량유지비 등이 해당됩니다. 4대보험료와 소득세를 함께 절약할 수 있습니다.' : 'Income excluded from the tax base, such as meal and vehicle allowances; it saves both insurance premiums and income tax.' },
          { term: isKo ? '간이세표' : 'Simplified Tax Table', desc: isKo ? '국세청에서 제공하는 근로소득 간이세액표를 기준으로 소득세를 산출하는 방식입니다.' : 'A method of computing income tax based on the NTS Earned Income Simplified Tax Table.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "월급여 입력" : "Enter monthly salary",
            isKo ? "세전 월급여를 만원 단위로 입력합니다. 연봉이라면 12으로 나눈 금액을 넣으세요." : "Gross monthly pay in 10K-won units — divide your annual figure by twelve first.",
          ],
          [
            isKo ? "비과세 수당 입력(있으면)" : "Add non-taxable allowances if any",
            isKo ? "식대·자가운전보조·육아급여 등 비과세 항목의 월 합계를 입력하면 과세 대상에서 빠집니다." : "Meal, vehicle, and childcare allowances are removed from the taxable base.",
          ],
          [
            isKo ? "공제 내역 확인" : "Review the deduction breakdown",
            isKo ? "국민연금·건강보험·장기요양·고용보험과 소득세·지방소득세가 항목별로 표시되고 실수령액이 계산됩니다." : "Each premium and tax line is itemized alongside the resulting net salary.",
          ],
          [
            isKo ? "시나리오로 비교" : "Compare scenarios",
            isKo ? "비과세 금액을 바꿔 가며 계산해 보면 회사와 급여 체계를 협의할 때 절세 규모를 수치로 제시할 수 있습니다." : "Varying the allowance field quantifies the case for negotiating pay structure.",
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
        <div>
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 1 — 월급 300만원, 비과세 없음" : "Example 1 — 3 million monthly, no non-taxable items"}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? "4대보험: 국민연금 135,000 + 건강보험 106,350 + 장기요양 13,623 + 고용보험 27,000 = 월 281,973원" : "Insurances: pension 135,000 + health 106,350 + long-term care 13,623 + employment 27,000 = 281,973/mo"}</li>
            <li>{isKo ? "소득세: 연 과세소득 3,600만원 × 15% − 누진공제 126만원 = 414만원 → 월 345,000원, 지방소득세 34,500원" : "Income tax: 36M taxable × 15% − 1.26M quick deduction = 4.14M/yr → 345,000/mo, plus local 34,500"}</li>
            <li>{isKo ? "실수령액: 3,000,000 − 661,473 ≈ 2,338,527원 (실수령률 약 78%)" : "Net: 3,000,000 − 661,473 ≈ 2,338,527 won (about 78% of gross)"}</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 2 — 같은 조건에 비과세 식대 20만원 추가" : "Example 2 — same salary with a 200,000 non-taxable meal allowance"}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? "연 과세소득이 3,360만원으로 줄어 소득세는 연 378만원(월 315,000원), 지방세 31,500원" : "Taxable income drops to 33.6M: income tax falls to 3,780,000/yr (315,000/mo), local 31,500"}</li>
            <li>{isKo ? "보험료는 이 모델에서 그대로(월 281,973원)" : "Insurance stays at 281,973 in this model"}</li>
            <li>{isKo ? "실수령액 약 2,371,527원 → 매달 약 33,000원 절약" : "Net rises to ≈ 2,371,527 — a saving of about 33,000 every month"}</li>
          </ul>
        </div>
        <p>
          {isKo
            ? "두 예시의 차이가 곧 비과세 설계의 가치입니다. 같은 총액이라도 어떻게 나눠 지급하느냐에 따라 세후 수령액이 달라지므로, 채용 협상 때 '비과세 포함 여부'를 반드시 확인하세요."
            : "The gap between the two examples is the value of structuring pay: same total, different net. Always ask whether an offer's figures include non-taxable allowances."}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '실수령액 계산 공식 (2024년 기준)' : 'Net Salary Calculation Formula (2024)'}</p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 4대 사회보험' : '1. Four Social Insurances'}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>{isKo ? <><strong>국민연금:</strong> 기준소득월액의 4.5% (상한 590만원, 하한 37만원)</> : <><strong>National Pension:</strong> 4.5% of standard pension income (cap 5.9M, floor 370K)</>}</li>
            <li>{isKo ? <><strong>건강보험:</strong> 보수월액의 3.545%</> : <><strong>Health Insurance:</strong> 3.545% of monthly remuneration</>}</li>
            <li>{isKo ? <><strong>장기요양보험:</strong> 건강보험료의 12.81%</> : <><strong>Long-term Care Insurance:</strong> 12.81% of health insurance premium</>}</li>
            <li>{isKo ? <><strong>고용보험:</strong> 보수월액의 0.9%</> : <><strong>Employment Insurance:</strong> 0.9% of monthly remuneration</>}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 소득세 및 지방소득세' : '2. Income Tax & Local Income Tax'}</h3>
          <BlockMath math={isKo ? "\\text{소득세} = \\text{간이세표 적용}\\ (\\text{연간 과세소득 기준 누진세율})" : "\\text{Income Tax} = \\text{Simplified tax table (progressive, annual taxable income)}"} />
          <BlockMath math={isKo ? "\\text{지방소득세} = \\text{소득세} \\times 10\\%" : "\\text{Local Income Tax} = \\text{Income Tax} \\times 10\\%"} />
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '3. 실수령액' : '3. Net Salary'}</h3>
          <BlockMath math={isKo ? "\\text{실수령액} = \\text{월급} - \\text{4대보험} - \\text{소득세} - \\text{지방소득세}" : "\\text{Net Salary} = \\text{Monthly Salary} - \\text{4 Insurances} - \\text{Income Tax} - \\text{Local Income Tax}"} />
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 실수령액 높이는 꿀팁' : '💡 Tips to Increase Your Net Salary'}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '1. 비과세 항목을 최대한 활용하라' : '1. Maximize Non-taxable Items'}</h3>
          <p className="mt-2">{isKo ? '식대(월 20만원), 차량유지비(월 20만원), 육아수당(월 20만원) 등 비과세 항목은 4대보험료와 소득세 모두를 절약할 수 있는 가장 효과적인 방법입니다.' : 'Meal allowance (200K/month), vehicle upkeep (200K/month), childcare allowance (200K/month) etc. are the most effective ways to save on both insurance premiums and income tax.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '2. 연금저축/IRP로 세액공제를 받으라' : '2. Get Tax Credits with Pension Savings/IRP'}</h3>
          <p className="mt-2">{isKo ? '연간 최대 900만원까지 세액공제가 가능한 연금저축/IRP는 실질적인 세 부담을 줄여주는 강력한 절세 상품입니다. 근로소득 세액공제율은 1,200만원 이하 16.5%, 1,200만원 초과 13.2%입니다.' : 'Pension Savings/IRP, eligible for tax credits up to 9M per year, is a powerful tax saver that effectively reduces your tax burden. The credit rate is 16.5% for contributions ≤12M and 13.2% for contributions >12M.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '3. 부양가족 공제를 꼼꼼히 챙겨라' : '3. Carefully Claim Dependent Deductions'}</h3>
          <p className="mt-2">{isKo ? '기본공제(150만원), 부양가족공제, 의료비·교육비 공제 등 연말정산 공제 항목을 빠짐없이 챙기면 환급금을 받을 수 있습니다. 특히 자녀·부모님 인적공제와 의료비 공제는 놓치기 쉬운 항목입니다.' : 'Carefully claiming year-end settlement deductions—basic (1.5M), dependent, medical, education—can yield refunds. Especially dependent deductions for children/parents and medical expense deductions are commonly missed.'}</p>
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
