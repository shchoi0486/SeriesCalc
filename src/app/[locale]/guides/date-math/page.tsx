import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "날짜 계산 가이드: 디데이·만나이·기념일 세는 법" : "Date Math Guide: D-Days, International Age and Anniversaries",
    description: isKo
      ? "두 날짜 사이 일수, 만나이·세는나이 변환, 기념일·디데이 계산의 헷갈리는 기준과 자주 쓰는 기간표를 정리했습니다."
      : "Days between dates, counting vs international age, common period tables, and the confusing rules behind anniversaries and D-days.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/life`;

  const faq = [
    {
      q: L("디데이는 당일을 0일로 보나요, 1일로 보나요?", "Is D-day itself day 0 or day 1?"),
      a: L(
        "관행상 당일은 D-day(0), 전날은 D-1로 셉니다. 다만 100일 계산처럼 시작한 날을 1일로 치는 경우도 있어 목적에 따라 기준이 달라집니다. 날짜 차이 계산기에서 양쪽 기준을 확인하세요.",
        "By convention the day itself is D-day (0) and the day before is D-1. But 100-day counts often treat the start as day 1 — the rule depends on purpose. Verify both conventions in the date difference calculator.",
      ),
    },
    {
      q: L("만나이와 세는나이는 왜 달라지나요?", "Why do international and counting ages differ?"),
      a: L(
        "세는나이는 태어난 해를 1살로 시작해 매년 1월 1일에 한 살씩 더하지만, 만나이는 생일이 지나야 한 살을 더합니다. 만나이 계산기에 생년월일을 넣으면 두 나이를 동시에 확인할 수 있습니다.",
        "Counting age starts at 1 in the birth year and adds one every January 1st; international age only increments on birthdays. Enter your birth date in the age calculator to see both side by side.",
      ),
    },
    {
      q: L("근속·임대 기간의 말일 포함 여부는?", "Do tenure or lease periods include the end date?"),
      a: L(
        "계약·법률 해석에 따라 시작일 불산입(첫날 제외)이 원칙인 경우가 많습니다. 1년 계약이 3월 1일 시작이면 종료는 다음 해 2월 말일이 됩니다. 분쟁 소지가 있으면 계약서 문구를 우선하세요.",
        "Legal interpretation often excludes the start day: a one-year term starting March 1 ends at the end of next February. When disputes are possible, the contract wording wins.",
      ),
    },
    {
      q: L("윤년은 날짜 계산에 어떻게 영향을 주나요?", "How do leap years affect date math?"),
      a: L(
        "2월 29일을 걸치는 기간은 하루가 추가됩니다. 4년마다 한 번(세기년은 400으로 나누어떨어질 때만) 윤년이므로, 장기 계약·대출 기간 계산 시 반드시 확인해야 합니다.",
        "Periods crossing February 29 gain a day. Leap years occur every 4 years (century years only when divisible by 400), so long-term contracts and loans must account for them.",
      ),
    },
    {
      q: L("시간대가 다른 일정은 어떻게 계산하나요?", "How do I handle events across time zones?"),
      a: L(
        "출발지와 도착지 시간대를 각각 입력해 UTC 기준으로 변환한 뒤 일수를 셉니다. 비행기·화상회의처럼 날짜가 바뀌는 경우가 많으니 도착지 현지 날짜를 기준으로 D-day를 정하세요.",
        "Convert both departure and arrival to UTC, then count days. Flights and video calls often cross midnight — set D-day based on the destination's local date.",
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
      <ProsePage title={L("날짜 계산 완전 가이드", "The Complete Date Math Guide")}>
        <ProseSection title={L("두 날짜 사이 일수 세기", "Counting days between dates")}>
          <p>
            {L(
              "프로젝트 기간, 근속 일수, 임대 잔여일을 셀 때는 시작일 포함 여부와 주말·공휴일 제외 여부를 먼저 정해야 합니다. 영업일 기준과 달력일 기준은 한 달만 돼도 수 일씩 벌어집니다.",
              "For projects, tenure or remaining leases, first fix whether the start day counts and whether weekends and holidays are excluded. Business-day and calendar-day counts diverge by several days within a single month.",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("기준", "Basis")}</th>
                  <th className="border p-2 text-left">{L("설명", "Description")}</th>
                  <th className="border p-2 text-right">{L("예시 (3/1~3/31)", "Example (Mar 1–31)")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("달력일", "Calendar days")}</td><td className="border p-2">{L("모든 날짜 포함", "All days included")}</td><td className="border p-2 text-right">31일</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("영업일", "Business days")}</td><td className="border p-2">{L("주말 제외", "Weekends excluded")}</td><td className="border p-2 text-right">23일</td></tr>
                <tr><td className="border p-2">{L("근무일", "Working days")}</td><td className="border p-2">{L("주말·공휴일 제외", "Weekends & holidays excluded")}</td><td className="border p-2 text-right">21~22일</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* 공휴일 수는 연도·국가에 따라 다릅니다. 한국 공휴일은 휴일 달력 페이지에서 확인하세요.",
              "* Holiday counts vary by year and country. Check the holiday calendar page for Korean holidays.",
            )}
          </p>
          <p>
            <Link href={`${base}/date-difference`} className="text-primary underline">{L("날짜 차이 계산기", "Date Difference Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/countdown-timer`} className="text-primary underline">{L("디데이 카운트다운", "D-Day Countdown")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("만나이·기념일 기준", "Age and anniversary rules")}>
          <p>
            {L(
              "법적·행정 기준은 만나이가 원칙이며, 기념일은 결혼·사귄 날의 월·연 단위 경과로 셉니다. 1주년은 1년이 지난 같은 월일이고, 100일·200일 같은 일 단위 기념일은 시작일을 1일로 치는 관행이 섞여 있으니 상대방과 기준을 맞추세요.",
              "Legal and administrative standards use international age; anniversaries count elapsed months or years from the wedding or first day. A 1st anniversary is the same month-day one year later, while 100-day counts often treat the start as day 1 — align the rule with the other party.",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("나이 구분", "Age type")}</th>
                  <th className="border p-2 text-left">{L("계산 방식", "How it's counted")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("만나이", "International age")}</td><td className="border p-2">{L("생일이 지난 횟수", "Number of birthdays passed")}</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("세는나이", "Counting age")}</td><td className="border p-2">{L("태어난 해 1살 + 매년 1월 1일 +1", "1 at birth year, +1 every Jan 1")}</td></tr>
                <tr><td className="border p-2">{L("연 나이", "Year age")}</td><td className="border p-2">{L("올해 연도 − 출생 연도", "Current year − birth year")}</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <Link href={`${base}/korean-age`} className="text-primary underline">{L("만나이 계산기", "Korean Age Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/anniversary`} className="text-primary underline">{L("기념일 계산기", "Anniversary Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 쓰는 기간 환산", "Common period conversions")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("1년 = 365일 (윤년 366일)", "1 year = 365 days (366 in a leap year)")}</li>
            <li>{L("1개월 ≈ 30.4일 (평균)", "1 month ≈ 30.4 days (average)")}</li>
            <li>{L("1주 = 7일", "1 week = 7 days")}</li>
            <li>{L("1분기 = 90~92일", "1 quarter = 90–92 days")}</li>
            <li>{L("100일 = 약 3개월 10일", "100 days ≈ 3 months 10 days")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("실수 방지 체크리스트", "Mistake-proof checklist")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("윤년 확인: 2월 29일을 걸치는 기간은 하루가 추가됩니다.", "Check leap years: periods crossing February 29 gain a day.")}</li>
            <li>{L("시간대 고정: 해외 일정은 출발지·도착지 시간대를 각각 입력하세요.", "Fix time zones: enter departure and arrival zones separately for overseas schedules.")}</li>
            <li>{L("마감 시각 명시: 'D-3'이 자정 기준인지 업무 종료 기준인지 합의하세요.", "State the cutoff: agree whether D-3 means midnight or end of business.")}</li>
            <li>{L("시작일 불산입: 계약서는 시작일을 제외하고 세는 경우가 많습니다.", "Exclude start day: contracts often count from the day after start.")}</li>
          </ul>
          <p>
            <Link href={`${base}/time-calculator`} className="text-primary underline">{L("시간 계산기", "Time Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/holiday-calendar`} className="text-primary underline">{L("휴일 달력", "Holiday Calendar")}</Link>
            .
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

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 법률·행정 자문이 아닙니다. 실제 계약·행정 기준은 관할 기관과 계약서 문구에 따릅니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute legal or administrative advice. Actual standards follow the relevant authority and your contract wording.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
