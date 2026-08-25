import TermGlossary from "@/components/calculators/TermGlossary";
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./SalaryCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/salary-calculator", "finance", "salary-calculator");
}

export default function SalaryCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "계산된 실수령액이 실제 급여명세서와 다른데 왜죠?" : "Why does my payslip differ from this estimate?",
      a: isKo
        ? "이 계산기는 소득세를 과세표준 × 세율 − 누진공제액으로만 계산하는 단순화 모델입니다. 실제 원천징수에는 근로소득공제(연봉의 최소 74%~최대 45%), 인적공제, 표준세액공제 13만원, 개인연금 납입 등이 반영되어 실제 세금은 이 계산 결과보다 훨씬 적게 나옵니다. 즉 이 도구의 실수령액은 '보수적으로 잡은 하한선'이며, 정확한 예상은 근로소득 간이지급액명세서나 연말정산 시뮬레이션을 참고하세요."
        : "This tool computes income tax simply as taxable income × rate − quick deduction. Real withholding also applies earned-income deductions (45–74% of pay), personal deductions, the standard 130,000-won credit, pension contributions, and more — so actual tax comes out meaningfully lower. Treat this result as a conservative floor and consult an official withholding simulator for precision.",
    },
    {
      q: isKo ? "연봉에 상여금도 포함해서 입력하나요?" : "Should bonuses be included in annual salary?",
      a: isKo
        ? "회사가 제시하는 '연봉'이 통상 연간 총 보수를 의미한다면 그대로 입력하세요. 한국 관행상 연봉 = 기본급×12 + 고정상여(예: 4개월치 포함) 구조가 많고, 성과상여는 별도인 경우가 많습니다. 계약서의 연봉 조항에 상여가 몇 개월 포함되는지 확인해 같은 기준으로 환산해야 회사 간 비교가 공정합니다."
        : "Enter whatever the offer defines as annual compensation. Korean offers commonly bundle several fixed bonus months into the headline figure while leaving performance bonuses separate — check the contract's definition so cross-company comparisons stay apples-to-apples.",
    },
    {
      q: isKo ? "같은 연봉이라도 실수령액을 늘리는 방법이 있나요?" : "Can I raise take-home without raising gross pay?",
      a: isKo
        ? "있습니다. 대표적인 것이 비과세 수당입니다. 식대·자가운전보조·육아급여 등 월 한도 내 비과세 항목은 4대보험료와 소득세 양쪽에서 빠지므로 실수령률을 직접 끌어올립니다. 또는 개인연금납입·IRP 등 세액공제 항목은 당장의 월급은 그대로지만 연말정산 환급으로 연 실수령액을 늘립니다. 두 경로의 절세 효과는 본인 세율 구간이 높을수록 커집니다."
        : "Yes — non-taxable allowances (meal, vehicle upkeep, childcare within monthly caps) bypass both insurance premiums and income tax, directly lifting net pay. Pension-savings and IRP contributions work differently: they leave monthly pay untouched but return money at year-end settlement as credits. Both levers get stronger in higher tax brackets.",
    },
    {
      q: isKo ? "연봉 협상에서 500만원을 더 받으면 실제로 얼마가 늘어날까요?" : "If I negotiate 5 million more per year, what do I actually keep?",
      a: isKo
        ? "연봉 5천만원 구간에서 연 500만원이 오르면 매월 세전 41.67만원이 늘어납니다. 다만 이 단순 모델에서 5천~8,800만원 사이 소득은 24% 세율 구간이라 증분 세금은 월 약 11만원(소득세+지방세), 4대보험료 약 9.4%(월 약 3.9만원)를 더 빼면 체감 증가는 월 27만원 안팎입니다. 협상 때는 제안된 연봉 차이를 이 계산기에 각각 넣어 실수령액 차이로 바꿔 확인하면 판단이 쉬워집니다."
        : "A 5-million raise inside this range adds about 416,700 gross per month. But income between 50 and 88 million sits in the simplified model's 24% band: incremental tax takes roughly 110,000 a month (income + local), insurance another ~39,000, leaving take-home growth near 270,000. Running both offers through this calculator converts negotiation deltas into lived cash.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? '연봉 변환 계산기는 연봉과 월급을 서로 환산하고, 세후 예상 실수령액까지 확인할 수 있는 도구입니다. 연봉 협상 시 "이 연봉이면 실질적으로 월에 얼마를 받게 되는지"를 바로 확인할 수 있습니다.' : 'The Salary Converter Calculator converts between annual and monthly salary and shows estimated after-tax take-home pay. When negotiating salary, you can instantly see "how much you actually receive per month from this annual salary."'}</p>
        <TermGlossary items={[
          { term: isKo ? '연봉' : 'Annual Salary', desc: isKo ? '1년 동안의 총 보수(세전)를 의미합니다. 통상 협상하는 금액이 이에 해당합니다.' : 'Total remuneration (gross) for one year. The amount typically negotiated corresponds to this.' },
          { term: isKo ? '월급' : 'Monthly Salary', desc: isKo ? '연봉을 12로 나눈 월별 세전 보수입니다. 매월 통장에 찍히는 금액과는 다릅니다.' : 'Monthly pre-tax remuneration (annual salary ÷ 12). It differs from the amount deposited each month.' },
          { term: isKo ? '세후 금액' : 'After-tax Amount', desc: isKo ? '4대보험과 소득세, 지방소득세를 모두 제외한 실질 수령액입니다.' : 'The actual take-home amount after deducting 4 insurances, income tax, and local income tax.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "연봉 또는 월급 입력" : "Enter annual or monthly",
            isKo ? "아는 쪽 금액을 만원 단위로 입력하면 나머지가 자동 환산됩니다." : "Type the figure you know; the other converts automatically.",
          ],
          [
            isKo ? "세후 예상액 확인" : "Read the after-tax estimate",
            isKo ? "소득세 누진세율과 지방소득세 10%를 반영한 세후 월급이 표시됩니다." : "A progressive-rate estimate of after-tax monthly pay is shown.",
          ],
          [
            isKo ? "실수령 추정액 비교" : "Compare the take-home estimate",
            isKo ? "4대보험료율(국민연금 4.5% + 건강 3.545% + 장기요양 + 고용 0.9%)까지 반영한 추정치를 함께 확인하세요." : "The second line layers on social insurance premiums for a fuller picture.",
          ],
          [
            isKo ? "오퍼 비교에 활용" : "Use it to compare offers",
            isKo ? "협상 안건마다 입력해 실수령 기준 차이를 확인한 뒤 결정하세요." : "Run each offer through and compare on take-home, not headline figures.",
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
          <p className="font-semibold text-foreground mb-1">{isKo ? "예시 — 연봉 5,000만원 직장인" : "Example — a worker on 50 million won per year"}</p>
          <p className="mb-2">
            {isKo
              ? "월급여는 50,000,000 ÷ 12 = 4,166,667원입니다."
              : "Monthly gross is 50,000,000 ÷ 12 = 4,166,667 won."}
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>{isKo ? "연 소득세: 과세표준 5천만원은 15% 구간 → 50,000,000 × 0.15 − 1,260,000(누진공제) = 6,240,000원" : "Annual income tax: 15% band → 50M × 0.15 − 1,260,000 quick deduction = 6,240,000"}</li>
            <li>{isKo ? "지방소득세: 6,240,000 × 10% = 624,000원 → 세금 합계 연 6,864,000원 = 월 572,000원" : "Local tax at 10% adds 624,000 → total tax 6,864,000/yr = 572,000/mo"}</li>
            <li>{isKo ? "세후 월급: 4,166,667 − 572,000 ≈ 3,594,667원" : "After-tax monthly: ≈ 3,594,667"}</li>
            <li>{isKo ? "4대보험료(약 9.4%): 월 약 391,632원 → 실수령 추정 약 3,203,034원" : "Insurance (~9.4%) takes about 391,632 → estimated take-home ≈ 3,203,034"}</li>
          </ol>
        </div>
        <p>
          {isKo
            ? "같은 방식으로 연봉 6,000만원을 넣어 보면: 이 단순 모델에서는 과세표준이 24% 구간으로 넘어가 연 소득세 8,640,000원(누진공제 5,760,000원 적용), 세금 합계 월 792,000원이 되고 실수령 추정은 약 3,738,041원입니다. 연봉이 20% 늘었지만 실수령 증가는 약 16.7%에 그친다는 점이 협상 때 중요한 감각입니다."
            : "Plug in 60 million instead: in this simplified model taxable income jumps into the 24% band, giving annual tax of 8,640,000 (after the 5,760,000 quick deduction), total monthly tax of 792,000, and estimated take-home near 3,738,041. Gross rose 20%, but take-home only about 16.7% — useful negotiation intuition."}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '연봉 ↔ 월급 환산 공식' : 'Annual ↔ Monthly Salary Conversion'}</p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 기본 환산' : '1. Basic Conversion'}</h3>
          <BlockMath math={isKo ? "\\text{월급} = \\dfrac{\\text{연봉}}{12}" : "\\text{Monthly Salary} = \\dfrac{\\text{Annual Salary}}{12}"} />
          <BlockMath math={isKo ? "\\text{연봉} = \\text{월급} \\times 12" : "\\text{Annual Salary} = \\text{Monthly Salary} \\times 12"} />
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 세후 월급 추정' : '2. After-tax Monthly Estimate'}</h3>
          <BlockMath math={isKo ? "\\text{세후 월급} = \\text{월급} - \\text{4대보험} - \\dfrac{\\text{소득세}}{12} - \\dfrac{\\text{지방소득세}}{12}" : "\\text{After-tax Monthly} = \\text{Monthly Salary} - \\text{4 Insurances} - \\dfrac{\\text{Income Tax}}{12} - \\dfrac{\\text{Local Tax}}{12}"} />
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 연봉 협상 꿀팁' : '💡 Salary Negotiation Tips'}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '1. 세전 기준으로 협상하라' : '1. Negotiate Based on Gross Amount'}</h3>
          <p className="mt-2">{isKo ? '모든 연봉 협상은 세전( gross ) 금액을 기준으로 진행됩니다. 동종 업계·직무의 평균 연봉을 조사하고, 자신의 성과를 구체적 수치로 정리하여 협상하면 성공 확률이 높아집니다.' : 'All salary negotiations proceed on a gross (pre-tax) basis. Research average salaries for your industry and role, and present your achievements with concrete figures for a higher success rate.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '2. 총 보상 패키지를 확인하라' : '2. Check Total Compensation Package'}</h3>
          <p className="mt-2">{isKo ? '연봉 외에 상여금, 스톡옵션, 복리후생비(식대·교통비·주택자금 등)가 포함되는지 확인하세요. 비과세 항목이 많을수록 세후 실수령액이 높아집니다.' : 'Check whether bonuses, stock options, and welfare benefits (meal, transport, housing fund) are included in addition to salary. More non-taxable items lead to higher after-tax take-home.'}</p>
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
