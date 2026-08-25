import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./HoursCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/hours-calculator", "life", "hours-calculator");
}



export default function HoursCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("야간근무수당과 연장근무수당이 동시에 적용되나요?", "Do night premium and overtime premium stack?"),
      a: L(
        "예. 야간(22:00~06:00)에 연장근무를 하면 기본 150%(연장) + 50%(야간 추가가산) = 200%가 적용됩니다. 휴일 야간근무는 200%(휴일) + 50%(야간) = 250%입니다. 이 계산기는 각 항목을 따로 계산한 뒤 합산하므로, 실제 급여 명세서와 비교할 때 각 가산율이 올바르게 반영되었는지 확인하세요.",
        "Yes. Overtime during night hours (22:00–06:00) gets 150% (overtime) + 50% (night surcharge) = 200%. Holiday night work reaches 200% + 50% = 250%. The calculator computes each component separately then sums — verify each rate matches your payslip.",
      ),
    },
    {
      q: L("2024년 최저시급은 얼마인가요?", "What is the 2024 minimum wage?"),
      a: L(
        "2024년 기준 최저시급은 ₩10,030입니다. 주 40시간 근무 기준 월 약 2,099,220원(소정근로 209시간 기준)이며, 여기에 주휴수당이 별도로 붙습니다. 이 계산기의 시급 입력란에 현재 적용받는 시급을 넣으면 정확한 월급여를 계산할 수 있습니다.",
        "The 2024 minimum hourly wage is ₩10,030. At 40h/week, monthly pay is approximately ₩2,099,220 (209 hours), with weekly holiday allowance added separately. Enter your applicable hourly wage in the calculator for accurate monthly totals.",
      ),
    },
    {
      q: L("주휴수당은 어떻게 계산하나요?", "How is the weekly holiday allowance calculated?"),
      a: L(
        "주 15시간 이상 근무하고 주 1회 유급휴일이 보장되면, 시급 × 유급휴일 근무시간(보통 8시간)이 주휴수당으로 지급됩니다. 예: 시급 ₩10,030 × 8시간 = ₩80,240/주. 월 4.3주 기준 약 ₩345,032가 월급에 추가됩니다. 이 계산기는 주휴수당을 별도 항목으로 포함하고 있지 않으므로, 월 총급여 산정 시 별도로 더해야 합니다.",
        "If you work 15+ hours per week with at least one paid day off, weekly holiday pay = hourly wage × paid holiday hours (typically 8). E.g., ₩10,030 × 8 = ₩80,240/week ≈ ₩345,032/month. This calculator does not include weekly holiday pay separately — add it manually for total monthly compensation.",
      ),
    },
    {
      q: L("휴게시간은 어떻게 입력하나요?", "How do I enter break time?"),
      a: L(
        "근로기준법 제54조에 따라 4시간 근무 시 30분, 8시간 근무 시 1시간 이상의 휴게시간을 부여해야 합니다. 계산기의 '휴게시간' 칸에 실제 쉰 시간(분)을 넣으면, 총 근무시간에서 자동 차감됩니다. 휴게시간은 근로시간에 포함되지 않으므로 급여 계산에서도 빠집니다.",
        "Under Korean Labor Standards Act Article 54, 30-min break for 4-hour shifts and 60-min for 8-hour shifts is mandatory. Enter actual break minutes; the calculator subtracts them from total hours. Breaks are excluded from working hours and thus from pay.",
      ),
    },
    {
      q: L("이 계산기 결과가 실제 급여와 다르면 어떻게 하나요?", "What if this result differs from my actual pay?"),
      a: L(
        "이 도구는 법정 기본 가산율만 반영한 참고용 계산기입니다. 실제 급여는 고용계약서, 단체협약, 회사 복리후생 규정, 특별근로계약에 따라 달라질 수 있습니다. 예를 들어 기본급 외에 직급수당·식대·교통비가 포함되거나, 특정 사업장은 법정 최소보다 높은 가산율을 적용할 수 있습니다. 정확한 확인은 인사팀과 상담하세요.",
        "This is a reference tool reflecting only statutory minimum premiums. Actual pay varies by employment contract, collective agreement, and company policies — some workplaces add allowances or exceed statutory rates. Consult HR for confirmed figures.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('근무시간 계산기', 'Working Hours Calculator')}</strong>{L('는 대한민국 노동법 기준으로 근무시간과 급여를 계산하는 도구입니다.', ' calculates working hours and pay based on Korean labor law.')}
        </p>
        <p>
          {L('기본근무, 연장근무, 야간근무, 휴일근무를 구분하여 계산하며, 각각 다른 가산율이 적용됩니다.', 'Distinguishes between regular, overtime, night, and holiday work, each with different premium rates.')}
        </p>
        <p className="p-4 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 rounded-r-lg">
          {L('휴일근무는 별도로 지정된 공휴일이나 유급휴일에 해당하는 시간만 입력해야 합니다. 주 6일 근무라도 토요일이 유급휴일인지 확인하세요.', 'Holiday work should only include hours on designated public or paid holidays. Even with 6-day workweeks, verify if Saturday is a paid holiday.')}
        </p>
        <TermGlossary items={[
          { term: L('기본근무', 'Regular Work'), desc: L('하루 8시간, 주 40시간 이내의 일반 근무시간입니다.', 'Regular working hours within 8 hours/day, 40 hours/week.') },
          { term: L('연장근무', 'Overtime'), desc: L('하루 8시간을 초과하는 근무시간으로, 법정 연장근무 한도는 1일 4시간, 주 12시간입니다.', 'Work exceeding 8 hours/day; legal limit is 4h/day, 12h/week.') },
          { term: L('야간근무', 'Night Work'), desc: L('밤 10시~오전 6시 사이의 근무시간으로, 통상임금의 50% 가산이 적용됩니다.', 'Work between 10 PM and 6 AM; 50% premium applies.') },
          { term: L('휴일근무', 'Holiday Work'), desc: L('공휴일 또는 유급휴일에 근무하는 경우로, 200%의 가산이 적용됩니다. 주 5일 근무제에서 토요일은 유급휴일일 수 있습니다.', 'Work on public/paid holidays; 200% premium. Saturday may be a paid holiday under 5-day workweek.') },
          { term: L('주 52시간 제도', '52-Hour Workweek'), desc: L('기본 40시간 + 연장 12시간 = 주간 총 52시간을 초과할 수 없습니다.', 'Regular 40h + overtime 12h = max 52h per week.') },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('근무시간 계산', 'Working Hours Calculation')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-2">
            <BlockMath math="\text{총 근무시간} = \text{퇴근시간} - \text{출근시간} - \text{휴게시간}" />
            <BlockMath math="\text{기본근무} = \min(\text{총 근무시간},\ 8\,\text{시간})" />
            <BlockMath math="\text{연장근무} = \max(0,\ \text{총 근무시간} - 8\,\text{시간}),\ \text{최대 } 4\,\text{시간}" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('급여 계산 (가산율)', 'Pay Calculation (Premium Rates)')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-3">
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">{L('기본급', 'Base Pay')}</p>
              <BlockMath math="\text{기본근무시간} \times \text{시급} \times 100\%" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">{L('연장근무수당', 'Overtime Pay')}</p>
              <BlockMath math="\text{연장근무시간} \times \text{시급} \times 150\%" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">{L('야간근무수당', 'Night Pay')}</p>
              <BlockMath math="\text{야간시간} \times \text{시급} \times 50\%\ (\text{추가 가산})" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">{L('휴일근무수당', 'Holiday Pay')}</p>
              <BlockMath math="\text{휴일근무시간} \times \text{시급} \times 200\%" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('2024년 최저시급', '2024 Minimum Wage')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="text-2xl font-bold">₩10,030</p>
            <p className="text-xs text-muted-foreground mt-1">{L('시간당 최저임금 (2024년 기준)', 'Hourly minimum wage (2024 standard)')}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('주 52시간 제도 핵심', '52-Hour Workweek Key Points')}</h4>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>{L('기본:', 'Regular:')}</strong> {L('주 40시간 (1일 8시간 × 5일)', '40h/week (8h/day × 5 days)')}</li>
            <li><strong>{L('연장:', 'Overtime:')}</strong> {L('주 12시간 (1일 4시간 한도)', '12h/week (max 4h/day)')}</li>
            <li><strong>{L('총 한도:', 'Total limit:')}</strong> {L('주 52시간 초과 불가', 'Cannot exceed 52h/week')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('야간근무 가산', 'Night Work Premium')}</h4>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{L('야간근무(22:00~06:00)에는 통상임금의 50% 이상을 가산 지급해야 합니다.', 'Night work (22:00~06:00) requires at least 50% premium.')}</li>
            <li>{L('연장야간근무는 150% + 50% = 200%가 적용됩니다.', 'Overtime night work: 150% + 50% = 200%.')}</li>
            <li>{L('휴일야간근무는 200% + 50% = 250%가 적용됩니다.', 'Holiday night work: 200% + 50% = 250%.')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-orange-500 pl-3">{L('휴일근무 구분', 'Holiday Work Distinction')}</h4>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{L('주 5일 근무: 토요일은 유급휴일이 아닐 수 있음 (회사 내규 확인 필요)', '5-day week: Saturday may not be a paid holiday (check company rules)')}</li>
            <li>{L('주 6일 근무: 토요일 근무 시 유급휴일 여부에 따라 휴일수당 적용 여부가 달라짐', '6-day week: Saturday holiday premium depends on whether it is a paid holiday')}</li>
            <li>{L('법정 공휴일(설날, 추석 등) 근무 시에는 반드시 휴일수당(200%)이 적용됩니다', 'Legal holidays (Lunar New Year, Chuseok, etc.) always qualify for 200% holiday premium')}</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg">
          <p className="font-bold text-sm">{L('주의사항', 'Important Notice')}</p>
          <p className="text-xs mt-1">
            {L('이 계산기는 일반적인 참고용 도구입니다. 실제 급여는 고용계약서, 단체협약, 회사 내규, 특별근로계약 등에 따라 달라질 수 있으므로, 정확한 급여 확인은 인사팀과 상담하시기 바랍니다.', 'This calculator is for general reference only. Actual pay may vary based on employment contracts, collective agreements, and company rules. Please consult your HR department for accurate pay details.')}
          </p>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("출퇴근 시간 입력", "Enter clock-in/out times"),
            L("실제 출근·퇴근 시각을 24시간 형식(HH:MM)으로 입력합니다.", "Enter actual clock-in and clock-out times in 24-hour format."),
          ],
          [
            L("휴게시간 입력", "Enter break time"),
            L("식사·휴식 등으로 쉰 시간을 분 단위로 입력합니다. 근로기준법상 8시간 근무 시 60분 이상이어야 합니다.", "Enter break duration in minutes. For 8-hour shifts, at least 60 minutes is legally required."),
          ],
          [
            L("근무일수·야간 설정", "Set workdays and night hours"),
            L("주 근무일수와 야간근무 시간대(기본 22:00~06:00)를 설정합니다. 휴일근무 시간이 있으면 별도 입력하세요.", "Set weekly workdays and night-shift window (default 22:00–06:00). Add holiday hours separately if applicable."),
          ],
          [
            L("시급 입력 후 결과 확인", "Enter hourly wage and check results"),
            L("기본급·연장·야간·휴일 각 수당과 총 급여가 항목별로 표시됩니다.", "Base pay, overtime, night, and holiday premiums are displayed individually, then summed."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 일반 사무직 (기본 8시간)", "Example 1 — Standard office work (8 hours)")}</p>
          <p>
            {L(
              "출근 09:00, 퇴근 18:00, 휴게 60분, 시급 ₩10,030 → 총 9시간 - 휴게 1시간 = 기본 8시간, 연장 0시간. 기본급 = 8 × 10,030 = ₩80,240/일. 월 22일 기준 약 ₩1,765,280입니다(주휴수당 별도).",
              "Clock in 09:00, out 18:00, 60-min break, wage ₩10,030 → 8 regular hours, 0 overtime. Daily: ₩80,240; monthly (22 days): ≈₩1,765,280 (weekly holiday pay not included).",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 야간 포함 연장근무", "Example 2 — Overtime with night shift")}</p>
          <p>
            {L(
              "출근 14:00, 퇴근 24:00, 휴게 60분, 시급 ₩10,030 → 총 10시간 - 휴게 1시간 = 9시간. 기본 8시간 + 연장 1시간, 야간(22:00~24:00) 2시간. 기본급 8×10,030=₩80,240, 연장 1×10,030×1.5=₩15,045, 야간 2×10,030×0.5=₩10,030 → 일 합계 ₩105,315.",
              "14:00–24:00, 60-min break, ₩10,030/hr → 9 working hours: 8 regular + 1 overtime; night (22:00–24:00) = 2h. Base ₩80,240 + OT ₩15,045 + night ₩10,030 = ₩105,315/day.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("위 예시는 주휴수당·4대 보험 공제를 포함하지 않은 참고용 계산입니다.", "Examples omit weekly holiday pay and social-insurance deductions; for reference only.")}
        </p>
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
