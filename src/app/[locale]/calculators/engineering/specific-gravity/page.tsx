
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./SpecificGravityClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/specific-gravity", "engineering", "specific-gravity");
}



export default function SpecificGravityPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const ko = isKo;
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("밀도와 비중은 뭐가 다른 건가요?", "What separates density from specific gravity?"),
      a: L(
        "밀도는 kg/m³처럼 단위를 갖는 절대량이고, 비중은 물을 1로 놓고 본 상대값이라 단위가 없습니다. 그래서 비중은 단위 체계(SI/미국 단위)와 무관하게 같은 숫자가 나옵니다 — 도면과 카탈로그가 국가 단위를 달리해도 SG만 맞추면 소통이 됩니다. 다만 '무차원'이라고 해서 정보가 덜한 것은 아니고, 물 기준이라는 조건이 숨어 있으므로 어떤 온도의 물인지가 항상 따라다녀야 합니다.",
        "Density carries units (kg/m³); specific gravity is water-referenced and dimensionless, so the same number holds across unit systems — handy when drawings and catalogues disagree on conventions. The catch is the hidden qualifier: SG only means something once you state which temperature of water it references.",
      ),
    },
    {
      q: L("기준 온도를 입력하는 이유는?", "Why must I enter a reference temperature?"),
      a: L(
        "물 밀도 자체가 온도마다 다르기 때문입니다. 물은 약 4℃에서 최대 밀도(약 999.97 kg/m³)를 가지며, 20℃에서는 약 998.19, 25℃에서는 약 996.98 kg/m³로 줄어듭니다. 이 계산기는 입력한 온도의 물 밀도를 내부 다항식으로 자동 계산해 나눗셈에 쓰므로, 같은 물질이라도 온도 설정에 따라 SG 넷째 자리가 바뀔 수 있습니다. 규격서의 SG 값과 비교할 때는 반드시 같은 기준 온도를 맞추세요.",
        "Because water's own density moves with temperature: peak ~999.97 kg/m³ near 4 ℃, about 998.19 at 20 ℃, 996.98 at 25 ℃. The tool computes reference-water density internally from your temperature, so the fourth decimal of SG shifts with that setting alone. When checking against a datasheet value, match its reference temperature exactly.",
      ),
    },
    {
      q: L("기체의 비중도 이 계산기로 구할 수 있나요?", "Can I use this for gases?"),
      a: L(
        "권장하지 않습니다. 기체 비중은 통상 같은 온도·압력의 공기를 1로 보는 별개의 정의(공기 밀도 약 1.225 kg/m³ 기준)를 쓰는데, 이 계산기는 물을 기준으로 설계되어 있습니다. 기체라면 밀도를 공기 밀도로 나눠 별도 계산하거나, 몰 질량 비(분자량 ÷ 28.97)로 구하는 것이 표준적입니다. 예컨대 메테인(분자량 16.04)의 기체 비중은 약 0.554입니다.",
        "Not recommended. Gas specific gravity normally references air (= 1) at equal temperature and pressure, whereas this tool divides by water. For gases divide density by air density (~1.225 kg/m³), or take molecular weight over 28.97 — methane (16.04) gives roughly 0.554.",
      ),
    },
    {
      q: L("석유 업계에서 말하는 API 중력과는 무슨 관계죠?", "How does API gravity relate to this?"),
      a: L(
        "API 중력 = (141.5 / SG₆₀) − 131.5 공식으로 서로 변환됩니다(SG₆₀은 15.6℃ 기준 비중). 가솔린처럼 가벼운 유류는 SG ≈ 0.74로 API 중력이 약 60, 무거운 중유는 SG ≈ 0.95에서 약 10 안팎입니다. API 값이 클수록 가볍다는 직관적 반전 때문에 헷갈리기 쉬우니, 이 계산기에서 SG를 구한 뒤 위 식으로 바꿔 확인하는 습관이 안전합니다.",
        "They convert via API = (141.5 / SG₆₀) − 131.5, where SG₆₀ references 15.6 ℃. Light gasoline at SG ≈ 0.74 lands near 60° API while heavy fuel oil around SG ≈ 0.95 sits near 10° — the counterintuitive higher-is-lighter convention trips people up, so compute SG here and transform with the formula.",
      ),
    },
    {
      q: L("두 액체를 섞었을 때 비중은 어떻게 추정하나요?", "How do I estimate the specific gravity of a mixture?"),
      a: L(
        "부피 가산을 가정하면 1/SG_혼합 = w₁/SG₁ + w₂/SG₂ (w는 부피 분율)로 근사할 수 있습니다. 예컨대 SG 1.000 물 70% + SG 0.79 에탄올 30%라면 1/SG = 0.7 + 0.3/0.79 = 1.0796 → SG ≈ 0.93입니다. 다만 실제 혼합은 분자간 인력 때문에 부피가 줄어드는 수축 현상이 있어 이 근사보다 약간 더 무겁게 측정되는 경우가 많으니, 정확도가 필요하면 밀도계로 실측하세요.",
        "Assuming additive volumes: 1/SG_mix = w₁/SG₁ + w₂/SG₂ by volume fraction. Seventy percent water plus thirty percent ethanol (SG 0.79) gives 1/SG = 0.7 + 0.3797 ≈ 1.0797 → SG ≈ 0.93. Real mixtures contract slightly on blending, measuring heavier than this estimate — verify with a hydrometer when accuracy matters.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '비중(Specific Gravity, SG)은 어떤 물질의 밀도를 동일 온도의 물 밀도로 나눈 무차원 수치입니다. 물보다 무거우면 SG > 1, 가볍면 SG < 1이 됩니다.',
            'Specific Gravity (SG) is the ratio of a substance\'s density to the density of water at the same temperature. It is dimensionless: SG > 1 means heavier than water, SG < 1 means lighter.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('이 계산기가 구하는 것', 'What this calculator finds')}</h4>
          <p>
            {L(
              '물질의 밀도와 온도를 입력하면, 해당 온도의 물 밀도를 기준으로 비중을 계산합니다. 반대로 비중으로부터 물질 밀도도 구할 수 있습니다.',
              'Enter a substance\'s density and temperature to calculate its specific gravity relative to water density at that temperature. You can also find the substance density from its specific gravity.',
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('왜 필요한가', 'Why it matters')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('부양·침강 판단: SG < 1이면 물에 뜨고, SG > 1이면 가라앉습니다', 'Buoyancy/sinking judgment: SG < 1 floats, SG > 1 sinks in water')}</li>
            <li>{L('화학 물질 식별: 비중은 물질의 순도·조성을 판별하는 빠른 방법입니다', 'Substance identification: specific gravity is a quick way to assess purity and composition')}</li>
            <li>{L('배관·탱크 설계: 유체의 비중은 펌프 전력, 배관 압력 강하 계산에 필수적입니다', 'Piping/tank design: fluid specific gravity is essential for pump power and pressure drop calculations')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("물질 밀도 입력", "Substance density"),
            L("주형별·비교서적 등에서 찾은 물질 밀도를 kg/m³ 단위로 입력합니다. 범위값이면 대표값(보수적으로 작은 값)을 쓰세요.", "Enter the density from a datasheet or reference book in kg/m³. Use a representative figure, or conservatively the lower end of a range."),
          ],
          [
            L("기준 온도 입력", "Reference temperature"),
            L("데이터 기준 온도(보통 4℃ 또는 20℃)를 넣으면 계산기 내부에서 해당 온도의 물 밀도를 자동 계산합니다.", "Set the same reference temperature from your source — the tool computes water density for that point internally."),
          ],
          [
            L("결과 해석", "Interpret results"),
            L("SG 값과 함께 '물보다 무거운지/가벼운지' 자동 판정이 표시됩니다. SG 1 기준 경계선(±0.001)은 기기 오차 범위를 감안한 것입니다.", "The SG value is shown alongside an automatic heavier/lighter verdict; the ±0.001 boundary reflects practical instrument uncertainty."),
          ],
          [
            L("역변환 활용", "Inverse calculation"),
            L("밀도·비중 중 하나만 있으면 나머지를 구할 수 있으므로, 밀도계 측정값을 비중으로 바꿔 규격서와 비교할 때 유용합니다.", "Having either density or SG finds the other — handy when converting hydrometer readings for datasheet comparison."),
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
        <p>
          {L(
            "물 밀도 함수를 실제 계산으로 따라가 보겠습니다.",
            "Trace the water-density function with concrete inputs:",
          )}
        </p>
        {[
          {
            title: L("① 알루미늄(ρ = 2,700 kg/m³) 기준 4℃", "① Aluminium (2,700 kg/m³) at 4 ℃"),
            body: L(
              "4℃ 물 밀도는 약 999.97 kg/m³이므로 SG = 2,700 / 999.97 = 2.7001 → 약 2.70. 금속의 밀도 비로 잘 알려진 수치입니다. 4℃ 기준이면 'ρ_water = 1,000 kg/m³' 근사와 거의 같습니다.",
              "Water density at 4 ℃ is ~999.97 kg/m³, giving SG = 2700 / 999.97 ≈ 2.7001, which matches the well-known ratio for aluminium. At 4 ℃ the shortcut ρ_water = 1,000 kg/m³ makes barely any difference.",
            ),
          },
          {
            title: L("② 에탄올(ρ = 789 kg/m³) 기준 20℃", "② Ethanol (789 kg/m³) at 20 ℃"),
            body: L(
              "20℃ 물 밀도는 약 998.19 kg/m³이므로 SG = 789 / 998.19 = 0.7904 → 약 0.79. 물보다 가벼워 뜨며, 비중을 화학 규격서와 비교할 때는 반드시 20℃/20℃ 기준임을 명시해야 합니다.",
              "At 20 ℃, water density is ~998.19 kg/m³ → SG = 789 / 998.19 ≈ 0.7904. Ethanol floats on water; always quote 20 °C/20 °C when matching chemical specifications.",
            ),
          },
          {
            title: L("③ 해수(ρ ≈ 1,025 kg/m³) 기준 20℃", "③ Seawater (≈1,025 kg/m³) at 20 ℃"),
            body: L(
              "SG = 1,025 / 998.19 = 1.0269 → 약 1.027. 해수는 소금 성분으로 물보다 약간 무거워, 기선의 흘수(水線 깊이) 계산이나 해양배관·탱크의 압력 계산에서 이 차이가 결정적입니다.",
              "SG = 1025 / 998.19 ≈ 1.0269. The slight extra weight of salt matters greatly in ship draft calculations and the pressure ratings of marine tanks and piping.",
            ),
          },
        ].map((s, i) => (
          <div key={i}>
            <p className="font-semibold text-foreground mb-1">{s.title}</p>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">
            {L('비중 계산 공식', 'Specific Gravity Formula')}
          </h4>
          <p className="text-sm mb-3">
            {L(
              '비중은 물질의 밀도를 같은 온도의 물 밀도로 나누어 구합니다. 4°C의 물 밀도(1000 kg/m³)를 기준으로 하거나, 계산 온도의 물 밀도를 사용할 수 있습니다.',
              'Specific gravity is found by dividing the substance density by water density at the same temperature. Either 4°C water density (1000 kg/m³) or the water density at the calculation temperature can be used.',
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="SG = \dfrac{\rho_{\text{substance}}}{\rho_{\text{water}}}" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-green-600">SG</strong> — {L('비중 (무차원)', 'Specific gravity (dimensionless)')}</li>
          <li><strong className="font-semibold text-red-500">ρ<sub>substance</sub></strong> — {L('물질의 밀도 [kg/m³]', 'Density of the substance [kg/m³]')}</li>
          <li><strong className="font-semibold text-blue-600">ρ<sub>water</sub></strong> — {L('같은 온도의 물 밀도 [kg/m³]', 'Density of water at the same temperature [kg/m³]')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('밀도 역변환', 'Inverse density calculation')}</h4>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="\rho_{\text{substance}} = SG \times \rho_{\text{water}}" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('일반적인 비중 참고값', 'Common specific gravity reference values')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('가솔린: 0.70~0.78', 'Gasoline: 0.70–0.78')}</li>
            <li>{L('알코올(에탄올): 0.79', 'Alcohol (ethanol): 0.79')}</li>
            <li>{L('물: 1.000 (기준)', 'Water: 1.000 (reference)')}</li>
            <li>{L('해수: 1.025', 'Seawater: 1.025')}</li>
            <li>{L('염화나트륨 용액(포화): 1.20', 'Sodium chloride solution (saturated): 1.20')}</li>
            <li>{L('수은: 13.55', 'Mercury: 13.55')}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('실무 팁', 'Practical tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('비중은 온도에 따라 변하므로, 측정 온도를 반드시 기록하세요', 'Specific gravity changes with temperature, so always record the measurement temperature')}</li>
            <li>{L('일반적으로 20°C/4°C 기준(ρ_water = 998.2 kg/m³) 또는 15.6°C/15.6°C(60°F/60°F) 기준을 사용합니다', 'Commonly used references are 20°C/4°C (ρ_water = 998.2 kg/m³) or 15.6°C/15.6°C (60°F/60°F)')}</li>
            <li>{L('비중은 액체 레벨 측정(부이)에서 밀도 보정에 활용됩니다', 'Specific gravity is used for density correction in liquid level measurement (buoyancy)')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('한계와 주의사항', 'Limitations & cautions')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('비중은 기준 온도에 따라 값이 달라지므로, 기준 온도를 명확히 밝혀야 합니다', 'Specific gravity values vary with reference temperature; the basis must be clearly stated')}</li>
            <li>{L('기체의 비중은 보통 공기(ρ ≈ 1.225 kg/m³) 대비로 정의되며, 이 계산기는 액체 기준입니다', 'Gas specific gravity is typically relative to air (ρ ≈ 1.225 kg/m³); this calculator is for liquids')}</li>
            <li>{L('혼합 액체의 비중은 조성에 따라 크게 달라지므로 실험 측정이 권장됩니다', 'Mixture specific gravity varies greatly with composition; experimental measurement is recommended')}</li>
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
