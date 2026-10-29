
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./HolidayCalendarClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/holiday-calendar", "life", "holiday-calendar");
}



export default function HolidayCalendarPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.holidayCalendar;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("내장된 공휴일 데이터는 어느 연도까지인가요?", "How far does the built-in holiday data go?"),
      a: L(
        "이 계산기는 2024~2026년 공휴일 데이터를 내장하고 있습니다. 이후 연도의 공휴일은 「관공서의 공휴일에 관한 규정」에 따라 확정되는 대로 업데이트합니다. 확정 전까지는 법원행정처의 공휴일 안내나 기획재정부가 공개하는 공휴일 자료를 참고하세요.",
        "The calculator has 2024–2026 holidays built in. Later years will be added once official designations under the Regulations on Public Holidays are published. Until then, refer to the National Court Administration or Ministry of Economy and Finance.",
      ),
    },
    {
      q: L("2026년 공휴일은 예년과 무엇이 다른가요?", "What is different about the 2026 holidays?"),
      a: L(
        "2026년에는 근로자의 날(5월 1일)과 제헌절(7월 17일)이 법정 공휴일로 적용됩니다. 또 3월 1일·5월 24일·8월 15일·10월 3일이 주말과 겹쳐 대체공휴일이 4회(3/2, 5/25, 8/17, 10/5) 지정되었습니다. 2026년은 주말을 제외한 공휴일이 16일, 달력 기준 22일입니다.",
        "In 2026, Workers' Day (May 1) and Constitution Day (July 17) are statutory public holidays. Because March 1, May 24, August 15 and October 3 fall on weekends, four substitute holidays apply (Mar 2, May 25, Aug 17, Oct 5). Excluding weekends, 2026 has 16 public holidays (22 dates on the calendar).",
      ),
    },
    {
      q: L("대체공휴일은 어떻게 표시되나요?", "How are substitute holidays shown?"),
      a: L(
        "대체공휴일은 원래 공휴일이 일요일과 겹치거나, 공휴일 다음 날이 '이번 주 근무일'인 경우 그 다음 첫 번째 비근무일이 대체공휴일로 지정됩니다. 이 캘린더에서는 해당 날짜에 '대체공휴일' 라벨로 별도 표시합니다. 대체공휴일 유무는 연도에 따라 다르며, 법정 공휴일(설날·추석·어버이날 등)에만 적용됩니다.",
        "Substitute holidays appear when a public holiday falls on Sunday or the next day is a workday. They're marked with a separate 'Substitute Holiday' label. Applicable only to statutory holidays (Lunar New Year, Chuseok, Parents' Day, etc.) and vary by year.",
      ),
    },
    {
      q: L("이 캘린더의 공휴일은 법적 효력이 있나요?", "Are these holidays legally binding?"),
      a: L(
        "이 캘린더는 참고용이며, 최종 공휴일 지정은 매년 기획재정부의 '공공기관의 공휴일에 관한 규정' 고시에 의해 확정됩니다. 각 기업이 자체적으로 공휴일을 다르게 운영할 수 있으므로(예: 대체휴무제), 실제 근무일정은 회사 내규를 확인하세요.",
        "This calendar is for reference. Official holidays are designated annually by the Ministry of Economy and Finance. Companies may operate differently (e.g., floating holiday systems) — check your company's policy.",
      ),
    },
    {
      q: L("양력·음력 차이로 공휴일 날짜가 달라지나요?", "Do lunar-calendar differences change holiday dates?"),
      a: L(
        "설날(음력 1월 1일), 추석(음력 8월 15일), 부처님 오신 날(음력 4월 8일)은 매년 양력 날짜가 바뀝니다. 이 캘린더에서는 실제 양력 날짜로 변환하여 표시하므로, 올해의 정확한 날짜를 바로 확인할 수 있습니다.",
        "Lunar New Year, Chuseok, and Buddha's Birthday shift in the Gregorian calendar each year. This calendar converts them to the correct Gregorian dates for instant lookup.",
      ),
    },
    {
      q: L("주말(토·일)과 공휴일이 겹치면 어떻게 되나요?", "What happens when a holiday overlaps with a weekend?"),
      a: L(
        "토요일이나 일요일과 공휴일이 겹치면, 해당 공휴일은 사실상 휴일로 작용하지만 '대체공휴일'이 지정되지 않는 한 별도의 보상 휴일은 없습니다(일부 법정 공휴일 제외). 근로자의 경우 주휴일(일요일)과 공휴일이 겹치면 그 다음 첫 비근무일이 대체공휴일이 될 수 있습니다. 다만 이는 법정 공휴일에 한하며, 관공서와 기업의 적용 범위가 다를 수 있습니다.",
        "When a holiday falls on a weekend, it functions as a day off but does not automatically create an extra day off unless designated as a substitute holiday. For workers, overlapping Sunday holidays may trigger substitute holidays for statutory holidays only — application varies between government offices and private companies.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        ${t.descriptionContent}
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("연도 선택", "Select year"),
            L("조회할 연도를 선택합니다(현재 2024~2026 지원, 올해가 기본 선택).", "Choose the year (2024–2026 supported; the current year is selected by default)."),
          ],
          [
            L("월 선택", "Select month"),
            L("특정 월을 선택하면 해당 월의 캘린더만 표시됩니다. 전체 연도를 보려면 아무것도 선택하지 마세요.", "Select a specific month to view just that month. Leave unselected for the full-year view."),
          ],
          [
            L("공휴일 확인", "Check holidays"),
            L("빨간색으로 표시된 날이 공휴일입니다. 마우스를 올리면 공휴일 이름이 툴팁으로 표시됩니다.", "Red-highlighted dates are public holidays. Hover to see the holiday name tooltip."),
          ],
          [
            L("대체공휴일 확인", "Check substitute holidays"),
            L("연한 빨간색 또는 별도 라벨로 표시된 대체공휴일도 함께 확인하세요.", "Also check substitute holidays, marked with lighter red or a separate label."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 2026년 설날 연휴", "Example 1 — 2026 Lunar New Year holiday")}</p>
          <p>
            {L(
              "2026년 설날은 양력 2월 17일(화)이고, 연휴는 2월 16일(월)~2월 18일(수) 사흘입니다. 앞선 주말(2/14~2/15)까지 붙이면 2월 14일(토)~2월 18일(수) 5일간 쉴 수 있습니다(회사 내규에 따라 다름). 이 캘린더에서 해당 기간을 확인하면 정확한 공휴일·대체공휴일 위치를 파악할 수 있습니다.",
              "2026 Lunar New Year falls on Feb 17 (Tue), with the holiday running Feb 16 (Mon)–Feb 18 (Wed). Adding the preceding weekend gives a 5-day break from Feb 14 (Sat) to Feb 18 (Wed) (varies by company). Use this calendar to locate exact holiday and substitute holiday positions.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 2026년 10월 연차 활용", "Example 2 — Using leave around October 2026")}</p>
          <p>
            {L(
              "2026년 10월은 3일(토) 개천절과 5일(월) 대체공휴일, 9일(금) 한글날이 놓여 있습니다. 10월 6~8일 사흘에 연차를 쓰면 10월 3일(토)~10월 11일(일) 9일 연속 휴무가 가능합니다. 캘린더에서 공휴일 위치를 미리 파악하면 연차 사용 계획을 효율적으로 세울 수 있습니다.",
              "October 2026 has National Foundation Day on Sat Oct 3, its substitute holiday on Mon Oct 5, and Hangul Day on Fri Oct 9. Taking three days of leave (Oct 6–8) yields a 9-day break from Oct 3 (Sat) to Oct 11 (Sun). Early calendar review helps plan efficient leave usage.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formulaContent}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tipsContent}</p>
      </div>
    `,
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
