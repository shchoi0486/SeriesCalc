import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./VirtualDiceClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/virtual-dice", "life", "virtual-dice");
}



export default function VirtualDicePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.virtualDice;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L(" 주사위 면 수를 설정할 수 있나요?", "Can I set the number of dice faces?"),
      a: L(
        "이 도구는 일반적인 6면체 주사위를 기본으로 지원합니다. 4면, 8면, 10면, 12면, 20면 등 다면체 주사위(D&D 등)를 지원하는지 여부는 버전에 따라 다를 수 있습니다. 현재 구현에서는 6면체만 지원합니다.",
        "This tool supports standard 6-sided dice by default. Multi-sided dice (4, 8, 10, 12, 20 for D&D etc.) support depends on the version; currently 6-sided only.",
      ),
    },
    {
      q: L("Math.random()으로 공정한 결과가 나오나요?", "Is the result fair with Math.random()?"),
      a: L(
        "Math.random()은 Mersenne Twister 의사난수 생성기로, 일반적인 entertaintment 용도에는 충분히 균일한 분포를 보장합니다. 다만 온라인 도박·추첨처럼 공정성이 법적으로 요구되는 상황에서는 crypto.getRandomValues() 기반 난수가 필요할 수 있습니다.",
        "Math.random() uses Mersenne Twister, which provides sufficiently uniform distribution for entertainment. For legally fairness-critical uses (gambling, lotteries), crypto.getRandomValues()-based randomness may be required.",
      ),
    },
    {
      q: L("여러 개의 주사위를 동시에 던질 수 있나요?", "Can I roll multiple dice at once?"),
      a: L(
        "지원 여부는 현재 구현에 따라 다릅니다. 여러 개의 주사위가 동시에 지원되는 경우, 각 주사위의 결과가 독립적으로 계산되어 합산 결과와 함께 표시됩니다. 한 번에 하나씩 던지는 것이 기본입니다.",
        "Depends on the implementation. When supported, multiple dice are independent and results appear with a sum. Single-die roll is the default.",
      ),
    },
    {
      q: L("결과 이력은 저장되나요?", "Are roll results saved?"),
      a: L(
        "이 도구는 서버에 결과를 저장하지 않습니다. 브라우저 세션 동안의 결과만 표시되며, 새로고침하면 사라집니다. 게임 기록이 필요한 경우 별도로 메모하세요.",
        "No server storage. Results persist only during the browser session and are lost on refresh. Record game history separately if needed.",
      ),
    },
    {
      q: L("주사위 도트 패턴은 어떻게 렌더링되나요?", "How are the dice dot patterns rendered?"),
      a: L(
        "각 면은 3×3 불리안 그리드로 표현됩니다. 예: 1은 가운데 점 하나, 6은 양쪽 세 줄. 이 패턴은 코드에 하드코딩되어 있으며, 실제 육면체 주사위의 전통적인 도트 배치를 따릅니다.",
        "Each face is a 3×3 boolean grid — e.g., 1 is a center dot, 6 is three rows of two. Patterns are hardcoded to match traditional die dot layouts.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">${t.descriptionContent.heading}</p>
        <p>${t.descriptionContent.p1}</p>
        <p>${t.descriptionContent.p2}</p>
        <p>${t.descriptionContent.p3}</p>
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("던지기 버튼 클릭", "Click roll"),
            L("'던지기' 버튼을 누르면 주사위가 애니메이션과 함께 랜덤 숫자로 멈춥니다.", "Press roll to see the dice animate and land on a random number."),
          ],
          [
            L("결과 확인", "Check result"),
            L("주사위 눈(1~6)이 도트 패턴으로 표시됩니다.", "The dice face (1–6) is displayed as a dot pattern."),
          ],
          [
            L("반복 실행", "Repeat"),
            L("원하는 횟수만큼 반복하여 게임·결정에 활용할 수 있습니다.", "Repeat as needed for games or decisions."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 — 보드게임에서의 활용", "Example — Board game use")}</p>
          <p>
            {L(
              " monopolie(부루마불) 등에서 이동 칸 수를 결정할 때: 주사위를 2번 던져 합산합니다. 첫 번째 4, 두 번째 6 → 총 10칸 이동. 이 도구에서 두 번 연속 '던지기'를 누르면 됩니다.",
              "For games like Monopoly: roll twice and sum. First roll 4, second 6 → move 10 spaces. Press 'roll' twice consecutively.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formula.desc}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tips.heading}</p>
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
