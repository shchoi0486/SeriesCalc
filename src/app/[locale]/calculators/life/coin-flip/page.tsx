import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./CoinFlipClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/coin-flip", "life", "coin-flip");
}



export default function CoinFlipPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.coinFlip;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("앞면·뒷면 확률은 항상 50:50인가요?", "Are heads and tails always 50:50?"),
      a: L(
        "이론적으로는 그렇습니다. 다만 실제 동전은 무게 중심이 약간 치우쳐 있어(양면의 조각 세밀 차이), 통계적으로 아주 약간의 편향이 있을 수 있습니다. Harvard 대학의 350,757번 던지기 실험에서는 앞면 50.67%로 약간 더 자주 나왔으나, 이 차이는 우연의 영역입니다. 이 도구는 Math.random()으로 완전히 균일한 확률을 사용합니다.",
        "Theoretically yes. Physical coins have slight weight asymmetries; a Harvard study of 350,757 flips found heads at 50.67%, but this is within random variance. This tool uses Math.random() for perfectly uniform probability.",
      ),
    },
    {
      q: L("100번 던져서 60번 앞면이 나올 수 있나요?", "Can I get 60 heads out of 100 flips?"),
      a: L(
        "가능합니다. 100번 던져서 앞면이 60번 이상 나올 확률은 약 2.8%입니다(이항분포). 이것이 '대법률의 법칙(Law of Large Numbers)'을 보여주는 예시입니다: 소수의 시도에서는 편향이 크게 나타나지만, 수천 번 이상 던지면 50%에 수렴합니다.",
        "Yes. The probability of ≥60 heads in 100 flips is ~2.8% (binomial). This illustrates the Law of Large Numbers: small samples show large variance, but thousands of flips converge to 50%.",
      ),
    },
    {
      q: L("연속으로 같은 면이 나올 확률은?", "What's the probability of the same side streak?"),
      a: L(
        "연속 n번 동일 면이 나올 확률은 (1/2)^n입니다. 연속 5번 = 1/32 ≈ 3.1%, 연속 10번 = 1/1024 ≈ 0.098%. 많은 사람들이 '앞면 3번 연속이면 뒷면이 나올 차례'라고 생각하지만(도박사의 오류), 각 던지는 것은 독립적이라 이전 결과는 다음에 영향을 주지 않습니다.",
        "Probability of n consecutive same sides = (1/2)^n. Five in a row ≈ 3.1%; ten ≈ 0.1%. The gambler's fallacy — 'tails is due after three heads' — ignores that each flip is independent.",
      ),
    },
    {
      q: L("Math.random()의 난수 품질은 어떤가요?", "How good is Math.random()'s randomness?"),
      a: L(
        "Math.random()은 Mersenne Twister 기반으로, 일반적인 용도에는 충분한 의사난수를 생성합니다. 다만 암호학적으로는 예측 가능성이 있어, 도박·추첨 등 공정성이 요구되는 상황에서는 crypto.getRandomValues()가 더 적합합니다. 이 도구는 장난감·재미 목적이므로 Math.random()으로 충분합니다.",
        "Math.random() uses Mersenne Twister, adequate for general purposes but not cryptographically secure. For fairness-critical applications (gambling, lotteries), crypto.getRandomValues() is more appropriate. For entertainment, Math.random() suffices.",
      ),
    },
    {
      q: L("여러 동전을 동시에 던질 수 있나요?", "Can I flip multiple coins at once?"),
      a: L(
        "이 도구는 한 번에 하나의 동전만 던집니다. 여러 동전을 동시에 던지는 시뮬레이션이 필요한 경우, 같은 횟수를 반복 실행하면 됩니다. 예: 3동전 동시 던지기 → 한 동전을 3번 연속 던져서 '앞-뒷-앞' 패턴을 만들면 됩니다.",
        "This tool flips one coin at once. For simultaneous multi-coin simulation, run it consecutively — e.g., for 3 coins, flip three times to build a 'heads-tails-heads' pattern.",
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
            L("던지기 버튼 클릭", "Click flip"),
            L("'던지기' 버튼을 누르면 동전이 애니메이션과 함께 앞면 또는 뒷면으로 떨어집니다.", "Press flip to toss the coin with animation — it lands on heads or tails."),
          ],
          [
            L("결과 확인", "Check result"),
            L("앞면/뒷면이 표시되고, 누적 통계(앞면 횟수, 뒷면 횟수, 총 던지기 횟수)가 업데이트됩니다.", "Heads/tails is shown; cumulative stats (counts and total flips) update."),
          ],
          [
            L("반복 실행", "Repeat"),
            L("원하는 횟수만큼 반복하여 통계적 패턴을 체험할 수 있습니다.", "Repeat as many times as you like to experience statistical patterns."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 — 10번 던지기 시뮬레이션", "Example — Simulating 10 flips")}</p>
          <p>
            {L(
              "10번 연속 던진 결과: 앞 6, 뒷 4. 앞면 비율 60%. 이것이 '50%에서 벗어난' 것처럼 보이지만, 10번이라는 적은 횟수에서는 이 정도 편차는 정상 범위입니다. 횟수를 100번, 1000번으로 늘리면 앞면 비율이 점차 50%에 가까워지는 것을 직접 확인할 수 있습니다.",
              "10 flips: 6 heads, 4 tails (60%). This seems biased, but with only 10 trials, such variance is normal. Increase to 100 or 1000 flips to watch the ratio converge toward 50%.",
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
