import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "단열·열전달 가이드: U값과 결로를 함께 보는 법" : "Insulation & Heat Transfer Guide: U-Values and Condensation",
    description: isKo
      ? "U값·R값 계산, 열관류율 기준, 결로 위험 판단과 단열재 선택 순서를 예시와 함께 정리했습니다."
      : "How U- and R-values work, insulation code limits, condensation risk, and how to choose insulation in order.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/engineering`;

  const faq = [
    {
      q: L("U값이 낮을수록 좋은 건가요?", "Is a lower U-value always better?"),
      a: L(
        "단열 성능은 낮을수록 좋습니다. U값은 1m² 면적에서 1K 온도차가 있을 때 빠져나가는 열량(W)이므로 작을수록 손실이 적습니다. 반대로 R값은 클수록 좋으며 두 값은 역수 관계입니다.",
        "Yes for insulation performance. U-value is the heat flow in watts through 1 m² per kelvin of temperature difference, so lower means less loss. R-value is the opposite — higher is better, and the two are reciprocals.",
      ),
    },
    {
      q: L("단열재를 두 배로 늘리면 열손실도 절반이 되나요?", "Does doubling insulation halve heat loss?"),
      a: L(
        "거의 그렇지만 정확히 절반은 아닙니다. 벽체 열저항에는 단열재 외에 콘크리트·석고보드·표면 열저항이 함께 포함되므로, 단열재만 늘리면 전체 R값 증가폭이 줄어듭니다. 기존 벽체의 R값을 먼저 계산한 뒤 비교해야 합니다.",
        "Roughly, but not exactly. Wall resistance includes concrete, gypsum board and surface films along with the insulation, so adding only insulation yields diminishing gains in total R. Compute the existing wall's R-value first, then compare.",
      ),
    },
    {
      q: L("결로는 단열만 보강하면 해결되나요?", "Does insulation alone fix condensation?"),
      a: L(
        "단열 보강은 표면 온도를 올려 도움이 되지만, 실내 습도가 높으면 여전히 결로가 생깁니다. 표면 온도가 이슬점보다 높아야 하므로 환기·제습과 함께 판단해야 합니다. 이슬점 계산기로 실내 조건의 이슬점을 먼저 확인하세요.",
        "Insulation raises surface temperature and helps, but high indoor humidity can still cause condensation. Surface temperature must exceed the dew point, so pair insulation with ventilation and dehumidification. Check the dew point for your indoor conditions first.",
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
      <ProsePage title={L("단열·열전달 완전 가이드", "The Complete Insulation & Heat Transfer Guide")}>
        <ProseSection title={L("U값과 R값, 무엇을 봐야 하나", "U-value vs R-value")}>
          <p>
            {L(
              "U값(열관류율)은 벽체 1m²를 통해 1K 온도차에서 빠져나가는 열량으로, 단위는 W/m²·K입니다. R값(열저항)은 반대로 열이 통과하기 어려운 정도를 나타내며 단위는 m²·K/W입니다. 관계는 U = 1/R 하나뿐이므로, 어느 쪽으로 표기됐든 상대 비교만 일관되면 됩니다.",
              "U-value (thermal transmittance) is the heat passing through 1 m² of assembly per kelvin, in W/m²·K. R-value (thermal resistance) measures how hard heat finds it to pass, in m²·K/W. The only relation is U = 1/R, so as long as you compare consistently, either notation works.",
            )}
          </p>
          <p>
            {L(
              "국내 기준은 U값, 미국·캐나다는 R값을 주로 씁니다. 해외 제품 사양을 국내 기준과 비교할 때 단위를 바꾸지 않고 숫자만 보면 큰 오해가 생깁니다. 예를 들어 R-19(미국식, ft²·°F·h/Btu)는 SI로 약 3.3 m²·K/W, U값으로는 약 0.30 W/m²·K입니다.",
              "Korean and European codes use U-values; US and Canadian practice uses R-values. Comparing an imported spec against a local limit without converting units invites serious mistakes. For example R-19 (US units) is about 3.3 m²·K/W in SI, or roughly 0.30 W/m²·K as a U-value.",
            )}
          </p>
          <p>
            <Link href={`${base}/u-value`} className="text-primary underline">{L("U값 계산기", "U-Value Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/heat-transfer`} className="text-primary underline">{L("열전달 계산기", "Heat Transfer Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("여러 층을 합치는 계산", "Combining layers")}>
          <p>
            {L(
              "벽체는 단열재 한 겹이 아니라 여러 재료의 직렬 저항입니다. 각 층의 두께를 열전도율(k)로 나눠 R을 구하고 모두 더한 뒤, 마지막에 역수를 취해 U값을 냅니다. 실내·실외 표면 열저항(보통 0.13 + 0.04 m²·K/W)도 더해야 실제에 가깝습니다.",
              "A wall is a series of resistances, not a single insulation layer. Divide each layer's thickness by its conductivity (k) to get R, sum them, then invert for U. Include interior and exterior surface films (typically 0.13 + 0.04 m²·K/W) for realistic results.",
            )}
          </p>
          <p>
            {L(
              "예를 들어 200mm 콘크리트(k=1.6), 100mm 단열재(k=0.035), 10mm 석고보드(k=0.21)라면 R은 0.125 + 2.857 + 0.048 = 3.03, 표면 열저항을 더하면 약 3.20이 되어 U값은 약 0.31 W/m²·K입니다.",
              "For 200 mm concrete (k = 1.6), 100 mm insulation (k = 0.035) and 10 mm gypsum (k = 0.21), R = 0.125 + 2.857 + 0.048 = 3.03; adding surface films gives about 3.20, so U ≈ 0.31 W/m²·K.",
            )}
          </p>
          <p>
            {L(
              "여기서 중요한 점은 가장 저항이 큰 층이 전체를 지배한다는 것입니다. 위 예에서 단열재가 전체 R의 89%를 차지하므로, 다른 층을 두껍게 하는 것은 거의 효과가 없습니다.",
              "The key insight: the layer with the largest resistance dominates. In the example, insulation owns 89% of total R, so thickening other layers accomplishes almost nothing.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("결로 위험 판단", "Judging condensation risk")}>
          <p>
            {L(
              "겨울철 실내 22°C·상대습도 50%라면 이슬점은 약 11°C입니다. 벽 내부 표면 온도가 이보다 낮으면 물방울이 맺힙니다. 단열이 부족한 벽은 실내 온도와 외기 온도 사이 어딘가에 표면 온도가 형성되므로, 단열 보강은 이 표면 온도를 끌어올리는 작업입니다.",
              "At 22°C indoor and 50% RH in winter, the dew point is about 11°C. If an interior surface falls below that, water forms. A poorly insulated wall settles at some temperature between indoor and outdoor air, so adding insulation is really about lifting that surface temperature.",
            )}
          </p>
          <p>
            {L(
              "다만 단열재를 실내 측에만 두면 벽체 중간에서 이슬점이 형성되어 구조체가 젖을 수 있습니다. 이른바 내부 결로이며, 외단열이 권장되는 이유입니다. 리모델링처럼 외단열이 어려우면 투습 방습층과 환기 계획을 함께 세워야 합니다.",
              "Insulating only on the interior side can push the dew point into the wall structure, wetting it — interstitial condensation, which is why exterior insulation is preferred. When exterior work is impossible in a retrofit, plan the vapor barrier and ventilation together.",
            )}
          </p>
          <p>
            <Link href={`${base}/dew-point`} className="text-primary underline">{L("이슬점 계산기", "Dew Point Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/psychrometric`} className="text-primary underline">{L("습공기 계산기", "Psychrometric Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("열교환기라면 LMTD를 쓰세요", "For heat exchangers, use LMTD")}>
          <p>
            {L(
              "벽체처럼 한쪽 방향으로 열이 빠져나가는 문제는 U값으로 충분하지만, 유체 두 개가 열을 주고받는 열교환기는 온도차가 위치마다 달라 로그평균온도차(LMTD)를 써야 합니다. 입출구 온도차가 클수록 산술평균과 LMTD의 차이도 커집니다.",
              "Walls losing heat in one direction are fine with U-values, but heat exchangers where two fluids trade heat need the log mean temperature difference (LMTD) because the driving delta varies along the unit. The larger the terminal differences, the bigger the gap between arithmetic mean and LMTD.",
            )}
          </p>
          <p>
            <Link href={`${base}/lmtd`} className="text-primary underline">LMTD {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/convection-heat-transfer`} className="text-primary underline">{L("대류 열전달 계산기", "Convection Heat Transfer Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/thermal-expansion`} className="text-primary underline">{L("열팽창 계산기", "Thermal Expansion Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
