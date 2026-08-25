import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./TypingSpeedClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/typing-speed", "life", "typing-speed");
}



export default function TypingSpeedPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.typingSpeed;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("WPM은 어떻게 계산되나요?", "How is WPM calculated?"),
      a: L(
        "WPM(Words Per Minute) = (입력한 문자 수 ÷ 5) ÷ 경과 시간(분)입니다. '1단어 = 5글자'라는 산업 표준을 따릅니다. 예: 250자를 1분에 입력하면 250÷5 = 50 WPM. 정확도가 100%가 아니면 유효 WPM(Net WPM)은 이 값에서 오타 비율을 차감합니다.",
        "WPM = (characters typed ÷ 5) ÷ elapsed minutes. 1 word = 5 characters is the industry standard. E.g., 250 chars in 1 min = 50 WPM. With errors, Net WPM deducts the error rate.",
      ),
    },
    {
      q: L("정확도는 어떻게 측정하나요?", "How is accuracy measured?"),
      a: L(
        "정확도(%) = ((총 입력字符 - 오타 수) ÷ 총 입력字符) × 100입니다. 오타는 목표 텍스트와 다른 문자를 입력했을 때 카운트됩니다. 대소문자·공백도 오타에 포함됩니다. 95% 이상이면 보통, 98% 이상이면 우수, 99% 이상이면 전문가 수준입니다.",
        "Accuracy % = ((total chars − errors) ÷ total chars) × 100. Errors include wrong characters (case-sensitive, spaces included). 95%+ is average, 98%+ is good, 99%+ is expert.",
      ),
    },
    {
      q: L("한글 타자와 영어 타자의 WPM 차이는?", "How do Korean and English WPM differ?"),
      a: L(
        "한글 자판은 1키 1음절(초성+중성+종성 조합)로, 영어 대비 동일 WPM이라도 실제 정보 전달률이 높습니다. 또한 한글은 오타 교정이 더 어려우므로, 이 도구에서 한글·영어 각각 별도로 연습하는 것이 좋습니다. 일반적으로 숙련자의 한글 타자 속도는 분당 400~600타(약 80~120 WPM) 수준입니다.",
        "Korean keys produce one syllable each, conveying more information per WPM than English. Error correction is harder in Korean, so practice both languages separately. Typists typically reach 400–600 keystrokes/min (≈80–120 WPM) in Korean.",
      ),
    },
    {
      q: L("타자 속도를 높이는 방법은?", "How can I improve typing speed?"),
      a: L(
        "가장 효과적인 방법은 정확한 자세에서 반복 연습입니다. ① 10-Finger(양손 열 손가락) 자세를 유지하고, ② 화면을 보지 않고 키보드를 치는(블라인드 타이핑) 연습을 하고, ③ 매일 10~15분씩 꾸준히 하는 것이 중요합니다. 속도보다 정확도를 먼저 늘리면, 장기적으로 속도도 함께 오릅니다.",
        "The most effective method: maintain proper 10-finger posture, practice blind typing (without looking at the keyboard), and train 10–15 min daily. Improving accuracy first leads to sustained speed gains.",
      ),
    },
    {
      q: L("이 도구는 서버에 데이터를 저장하나요?", "Does this tool store data on a server?"),
      a: L(
        "아닙니다. 타이핑 텍스트와 결과는 모두 브라우저 메모리에서만 처리되며, 서버로 전송되거나 저장되지 않습니다. 새로운 테스트를 시작하면 이전 데이터는 사라집니다.",
        "No. All typing text and results are processed in browser memory only — nothing is sent to or stored on a server. Previous data is lost when a new test starts.",
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
            L("텍스트 선택", "Choose text"),
            L("제공되는 샘플 텍스트 중 하나를 선택하거나, 직접 텍스트를 입력합니다.", "Select a provided sample or enter your own text."),
          ],
          [
            L("타이핑 시작", "Start typing"),
            L("텍스트 입력란에 포커스되면 자동으로 타이머가 시작됩니다.", "The timer starts automatically when you focus on the input area."),
          ],
          [
            L("실시간 피드백", "Real-time feedback"),
            L("입력 중 올바른 글자(초록), 오타(빨강)가 실시간으로 표시됩니다.", "Correct characters (green) and errors (red) are shown in real time."),
          ],
          [
            L("결과 확인", "Check results"),
            L("WPM(분당 단어 수), 정확도(%), 총 입력 시간이 표시됩니다.", "WPM, accuracy (%), and total time are displayed."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 영어 타자 테스트", "Example 1 — English typing test")}</p>
          <p>
            {L(
              "샘플 텍스트 'The quick brown fox jumps over the lazy dog' (35글자)를 20초에 입력 → WPM = (35÷5)÷(20÷60) = 7×3 = 21 WPM. 오타 2개 → 정확도 = (35−2)÷35×100 = 94.3%.",
              "Sample text (35 chars) typed in 20 sec → WPM = (35/5)/(20/60) = 21 WPM. 2 errors → accuracy = 94.3%.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 숙련자 기준", "Example 2 — Proficient typist")}</p>
          <p>
            {L(
              "1분 동안 500자를 오타 없이 입력 → WPM = (500÷5)÷1 = 100 WPM, 정확도 100%. 이 수준은 전문 타이피스트·데이터 입력 직업군의 상위권 성적입니다.",
              "500 chars in 1 minute, no errors → WPM = 100, accuracy 100%. This is the upper range for professional typists and data-entry roles.",
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
