import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./CountdownTimerClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/countdown-timer", "life", "countdown-timer");
}



export default function CountdownTimerPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.countdownTimer;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("브라우저 탭을 전환해도 타이머가 계속 되나요?", "Does the timer keep running if I switch tabs?"),
      a: L(
        "대부분의 모던 브라우저에서는 백그라운드 탭의 setInterval이 throttling(느려짐)됩니다. 즉 1초마다 울려야 할 알람이 몇 초 늦게 울릴 수 있습니다. 정확한 타이밍이 중요한 경우(예: 시험 시간), 가능한 한 이 탭을 앞에 두거나, 스마트폰의 기본 타이머 앱을 병행 사용하는 것이 안전합니다.",
        "Most modern browsers throttle setInterval in background tabs, potentially delaying the alarm by several seconds. For time-critical uses (e.g., exam timing), keep this tab focused or use a phone timer as backup.",
      ),
    },
    {
      q: L("알람 소리가 나지 않으면 어떻게 하나요?", "What if the alarm doesn't sound?"),
      a: L(
        "알람은 Web Audio API를 사용하며, 브라우저의 자동 재생 정책에 의해 차단될 수 있습니다. 페이지를 한 번 클릭하거나 키보드를 누른 뒤 타이머를 시작하면 소리가 활성화됩니다. 또한 OS 음소거 상태나 브라우저 탭 음소거 아이콘을 확인하세요.",
        "The alarm uses Web Audio API and may be blocked by autoplay policies. Click the page or press a key before starting the timer. Also check OS mute and the tab's audio icon.",
      ),
    },
    {
      q: L("最大 타이머 시간은 얼마인가요?", "What is the maximum timer duration?"),
      a: L(
        "이 계산기는 시간·분·초를 각각 독립적으로 설정할 수 있으므로,理屈上 23시간 59분 59초까지 가능합니다. 하루 이상의 긴 타이머가 필요한 경우 여러 번 나누어 설정하거나, 스마트폰 알람을 활용하는 것이 실용적입니다.",
        "Hours, minutes, and seconds are set independently, so up to 23h 59m 59s is possible. For longer durations, use multiple timers or a phone alarm.",
      ),
    },
    {
      q: L("진행률 게이지는 어떻게 계산되나요?", "How is the progress bar calculated?"),
      a: L(
        "진행률 = (경과 시간 ÷ 전체 시간) × 100%입니다. 타이머를 시작하면 0%에서 출발해 100%(알람 시점)까지 시각적으로 표시됩니다. 남은 시간이 실시간으로 줄어드는 것도 확인할 수 있습니다.",
        "Progress = (elapsed time ÷ total time) × 100%. It starts at 0% and reaches 100% when the alarm triggers; remaining time counts down in real time.",
      ),
    },
    {
      q: L("여러 개의 타이머를 동시에 실행할 수 있나요?", "Can I run multiple timers simultaneously?"),
      a: L(
        "이 계산기는 단일 타이머를 지원합니다. 여러 타이머가 필요한 경우 브라우저에서 여러 탭을 열어 각각 설정하면 됩니다. 다만 모든 탭의 알람 소리가 동시에 울리면 구분이 어려우므로, 각각 다른 시간을 설정해 순차적으로 울리도록 하는 것이 팁입니다.",
        "This tool supports one timer. Open multiple tabs for simultaneous timers. Stagger their durations so alarms don't overlap for easier identification.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">
          ${t.descriptionContent.heading}
        </p>
        <p>
          ${t.descriptionContent.p1}
        </p>
        <p>
          ${t.descriptionContent.p2}
        </p>
        <p>
          ${t.descriptionContent.p3}
        </p>
        <div class="mt-5">
          <h3 class="text-base font-semibold text-foreground mb-3">${isKo ? '용어 설명' : 'Terminology'}</h3>
          <dl class="space-y-3">
            ${t.glossary.map((g: { term: string; desc: string }) => `
            <div class="rounded-lg border border-border bg-muted/40 p-3">
              <dt class="font-semibold text-foreground">${g.term}</dt>
              <dd class="text-sm text-muted-foreground mt-1 leading-relaxed">${g.desc}</dd>
            </div>
            `).join('')}
          </dl>
        </div>
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("시간 설정", "Set time"),
            L("시간, 분, 초를 각각 입력합니다. 예: 5분 타이머 → 시간 0, 분 5, 초 0.", "Enter hours, minutes, and seconds. E.g., 5-min timer → 0h, 5m, 0s."),
          ],
          [
            L("시작 버튼 클릭", "Click start"),
            L("'시작' 버튼을 누르면 카운트다운이 시작됩니다. 시작 전에 브라우저에서 소리가 재생되도록 페이지를 한 번 클릭하세요.", "Press start to begin countdown. Click the page once first to enable audio."),
          ],
          [
            L("진행 상황 확인", "Monitor progress"),
            L("남은 시간과 진행률 게이지를 실시간으로 확인할 수 있습니다.", "Watch remaining time and the progress bar update in real time."),
          ],
          [
            L("일시정지·재개", "Pause and resume"),
            L("일시정지 버튼으로 멈추고, 다시 시작하면 이어서 카운트다운됩니다.", "Pause to stop, then resume to continue from where you left off."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 5분 타이머 (요리·운동)", "Example 1 — 5-minute timer (cooking/exercise)")}</p>
          <p>
            {L(
              "시간 0, 분 5, 초 0으로 설정 → 전체 300초. 1분 경과 시 20%, 3분 경과 시 60%가 되며, 0초가 되면 알람이 울립니다. 달걀 삶기, 인터벌 트레이닝 등 짧은 시간 관리에 적합합니다.",
              "Set 0h 5m 0s = 300 seconds total. At 1 min elapsed: 20%; at 3 min: 60%. Alarm sounds at 0. Ideal for egg timing, interval training, etc.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 25분 포모도로 타이머", "Example 2 — 25-minute Pomodoro timer")}</p>
          <p>
            {L(
              "시간 0, 분 25, 초 0 설정. 포모도로 기법은 25분 집중 + 5분 휴식의 반복입니다. 이 타이머로 25분을 설정하고, 종료 후 5분 타이머를 다시 설정하면 완벽한 포모도로 사이클이 됩니다.",
              "Set 0h 25m 0s. Pomodoro: 25 min focus + 5 min break. Set this timer for 25 min, then reset for 5 min — a complete Pomodoro cycle.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">${t.formula.heading}</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm">${t.formula.principle}</code>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">${t.formula.alarm}</h3>
          <p className="text-muted-foreground">
            ${t.formula.alarmDesc}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">${t.formula.progress}</h3>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm">${t.formula.progressFormula}</code>
          </div>
        </div>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <div className="p-4 rounded-lg border-l-4 border-primary bg-muted">
          <h3 className="font-semibold text-lg mb-2 text-foreground">${t.tips.heading}</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            ${t.tips.items.map((item: { title: string; desc: string }) => `
            <li><strong>${item.title}:</strong> ${item.desc}</li>
            `).join('')}
          </ul>
        </div>
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
