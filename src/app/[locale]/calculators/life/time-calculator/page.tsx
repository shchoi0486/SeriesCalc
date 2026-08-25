import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./TimeCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/time-calculator", "life", "time-calculator");
}



export default function TimeCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("결과가 24시간을 초과하면 어떻게 되나요?", "What if the result exceeds 24 hours?"),
      a: L(
        "24시간을 초과하는 결과도 정상적으로 표시됩니다. 예를 들어 15:00 + 12:00 = 27:00으로 표시됩니다. 이는 '하루가 넘는 총 소요시간'을 의미하므로, 비행 시간·작업 시간 합산 등에서 유용합니다. 다만 '27:00'을 실제 시각(오전 3시)으로 해석하려면 24로 나눈 나머지를 취해야 합니다.",
        "Results exceeding 24 hours display correctly — 15:00 + 12:00 = 27:00. This represents total elapsed time, useful for flight durations or cumulative work. To convert to clock time, take the result modulo 24.",
      ),
    },
    {
      q: L("뺄셈 결과가 음수면 어떤 뜻인가요?", "What does a negative subtraction result mean?"),
      a: L(
        "음수 결과는 앞 시간이 뒷 시간보다 짧다는 뜻입니다. 예: 00:45:00 − 01:00:00 = −00:15:00은 '15분 부족'을 의미합니다. 훈련 기록 비교, 시간 초과 감시 등에서 '얼마나 모자랐는지'를 바로 알 수 있습니다.",
        "A negative result means the first time is shorter. 00:45 − 01:00 = −00:15:00 means '15 minutes short' — handy for tracking training improvement or time-overrun.",
      ),
    },
    {
      q: L("'시:분'과 '시:분:초' 모두 입력할 수 있나요?", "Can I enter both 'hh:mm' and 'hh:mm:ss'?"),
      a: L(
        "네. '1:30', '01:30', '1:30:45', '01:30:45' 등 모든 형식을 지원합니다. 초 단위가 없는 경우 0초로 처리됩니다. 따라서 '1:30'은 '1:30:00'과 동일하게 계산됩니다.",
        "Yes. All formats — '1:30', '01:30', '1:30:45' — are supported. Missing seconds default to 0, so '1:30' is treated as '1:30:00'.",
      ),
    },
    {
      q: L("이 계산기는 며칠 이상의 시간도 계산할 수 있나요?", "Can this calculator handle multi-day times?"),
      a: L(
        "아닙니다. 이 계산기는 0~23시 범위의 '시간:분:초'를 다룹니다. 며칠·몇 주 단위의 기간 계산은 별도의 날짜 차이 계산기(date-difference)를 사용하세요. 예컨대 '3일 5시간'은 이 도구로 직접 입력할 수 없지만, date-difference로 날짜를 뺀 뒤 남은 시간을 이 도구로 보정할 수 있습니다.",
        "No — this calculator handles hh:mm:ss within a single day. For multi-day periods, use the date-difference calculator instead, then adjust any remaining hours here.",
      ),
    },
    {
      q: L("실생활에서 이 계산기를 언제 쓰면 좋나요?", "When is this calculator most useful in daily life?"),
      a: L(
        "운동(러닝·수영 등) 기록의 총 합산, 근무 시간 계산, 비행·기차 소요시간 합산, 타이머·카운트다운 설정, 영상 편집 타임라인 계산 등에 유용합니다. 특히 여러 세션의 시간을 '시:분:초'로 더해야 할 때 초 단위 변환 없이 바로 결과를 얻을 수 있습니다.",
        "Useful for totalling exercise records, work-hour calculations, travel-time aggregation, timer setup, and video-editing timelines — especially when summing multiple hh:mm:ss segments without manual conversion.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('시간 덧셈/뺄셈 계산기', 'Time Addition/Subtraction Calculator')}</strong>{L('는 두 시간 값의 덧셈 또는 뺄셈을 수행하는 도구입니다.', ' performs addition or subtraction of two time values.')}
        </p>
        <p>
          {L('이 운동 시간 합산, 근무 시간 계산, 비행 시간 계산 등 다양한 상황에서 활용할 수 있습니다.', 'This can be used in various situations such as combining exercise times, calculating work hours, and flight time calculations.')}
        </p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('입력 형식은 "시:분:초" 또는 "시:분"으로, 초 단위까지 정확하게 계산됩니다.', 'Input format is "hh:mm:ss" or "hh:mm", with calculations accurate to the second.')}
        </p>
        <TermGlossary items={[
          { term: L('시간 덧셈', 'Time Addition'), desc: L('두 시간을 더하여 총 소요 시간을 구합니다.', 'Adding two times to find the total duration.') },
          { term: L('시간 뺄셈', 'Time Subtraction'), desc: L('두 시간의 차이를 구합니다. 뺄셈 결과가 음수가 되면 시간 초과를 의미합니다.', 'Finding the difference between two times. A negative result means overtime.') },
          { term: L('24시간 형식', '24-Hour Format'), desc: L('오전/오후 구분 없이 0~23시로 표시하는 시간 형식입니다.', 'A time format using 0~23 hours without AM/PM distinction.') },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("모드 선택", "Choose mode"),
            L("덧셈(+) 또는 뺄셈(−) 연산자를 선택합니다.", "Select the addition (+) or subtraction (−) operator."),
          ],
          [
            L("시간 입력", "Enter times"),
            L("두 시간 값을 '시:분' 또는 '시:분:초' 형식으로 입력합니다. 01:30 또는 1:30:45 등 어떤 형식이든 가능합니다.", "Enter two times as 'hh:mm' or 'hh:mm:ss'. Any format works — leading zeros optional."),
          ],
          [
            L("결과 확인", "Check result"),
            L("계산 결과가 '시:분:초' 형식으로 표시됩니다. 음수이면 앞 시간이 더 짧다는 뜻입니다.", "The result appears in 'hh:mm:ss'. A negative sign means the first time was shorter."),
          ],
          [
            L("활용", "Apply"),
            L("운동 기록 합산, 근무시간 차이 계산, 타이머 설정 등에 바로 활용할 수 있습니다.", "Use directly for exercise totals, work-hour differences, or timer settings."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 운동 시간 합산", "Example 1 — Total exercise time")}</p>
          <p>
            {L(
              "조깅 30분 + 수영 45분 + 스트레칭 15분 → 00:30:00 + 00:45:00 + 00:15:00 = 01:30:00. 총 운동 시간 1시간 30분.",
              "Jogging 30 min + swimming 45 min + stretching 15 min → 00:30 + 00:45 + 00:15 = 01:30:00. Total workout: 1 hour 30 minutes.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 기록 단축 비교", "Example 2 — Comparing record improvements")}</p>
          <p>
            {L(
              "이전 기록 01:30:00에서 이번 기록 01:25:30으로 단축 → 뺄셈: 01:25:30 − 01:30:00 = −00:04:30. 음수 4분 30초는 4분 30초가 빨라졌다는 뜻입니다.",
              "Previous 01:30:00, new 01:25:30 → subtraction: −00:04:30. The negative 4 min 30 sec means the new time is that much faster.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('변환 기준', 'Conversion Basis')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-2">
            <BlockMath math="1\,\text{시간} = 60\,\text{분} = 3{,}600\,\text{초}" />
            <BlockMath math="1\,\text{분} = 60\,\text{초}" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('계산 과정', 'Calculation Process')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-3">
            <p className="text-sm font-semibold">1. {L('입력값을 초 단위로 변환', 'Convert input to seconds')}</p>
            <BlockMath math="\text{시간(초)} = \text{시} \times 3{,}600 + \text{분} \times 60 + \text{초}" />
            <p className="text-sm font-semibold mt-3">2. {L('초 단위로 연산 수행', 'Perform arithmetic in seconds')}</p>
            <p className="font-mono text-xs">{L('덧셈: 초1 + 초2', 'Add: sec1 + sec2')} | {L('뺄셈: 초1 - 초2', 'Subtract: sec1 - sec2')}</p>
            <p className="text-sm font-semibold mt-3">3. {L('결과를 시간 형식으로 변환', 'Convert result back to time format')}</p>
            <p className="font-mono text-xs">{L('시 = 결과 ÷ 3,600', 'Hours = result ÷ 3600')} | {L('분 = (결과 % 3,600) ÷ 60', 'Minutes = (result % 3600) ÷ 60')} | {L('초 = 결과 % 60', 'Seconds = result % 60')}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('활용 예시', 'Examples')}</h4>
          <div className="space-y-2 mt-2">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('운동 시간 합산', 'Exercise Time Total')}</p>
              <p className="text-xs mt-1 font-mono">00:30:00 + 00:45:00 + 00:15:00 = 01:30:00</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('근무 시간 계산', 'Work Hours Calculation')}</p>
              <p className="text-xs mt-1 font-mono">09:00:00 ~ 18:00:00 = 09:00:00 (점심시간 포함)</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('이전 기록 대비 차이', 'Difference from Previous Record')}</p>
              <p className="text-xs mt-1 font-mono">01:25:30 - 01:30:00 = -00:04:30 ({L('4분 30초 단축', '4 min 30 sec faster')})</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('참고', 'Notes')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{L('24시간을 초과하는 결과도 정상적으로 계산됩니다.', 'Results exceeding 24 hours are calculated correctly.')}</li>
            <li>{L('뺄셈 결과가 음수면 시간이 모자란다는 의미입니다.', 'A negative subtraction result means the time is insufficient.')}</li>
            <li>{L('입력 시 "01:30:45" 또는 "1:30:45" 모두 가능합니다.', 'Both "01:30:45" and "1:30:45" formats work for input.')}</li>
          </ul>
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
