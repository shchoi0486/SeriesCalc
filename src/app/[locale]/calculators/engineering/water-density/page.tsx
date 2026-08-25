import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./WaterDensityClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/water-density", "engineering", "water-density");
}



export default function WaterDensityPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const ko = isKo;
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("이 값은 정확히 어떤 물의 밀도인가요?", "Exactly which water is this density for?"),
      a: L(
        "이 공식은 순수 증류수·탈이온수(용해 소금·가스가 거의 없는 상태) 기준입니다. 지하수·수돗물·해수는 용존 고형물(TDS) 때문에 밀도가 약간 높습니다. 일반 수돗물(TDS 200~500ppm)은 증류수 대비 약 0.02~0.05% 무겁고, 해수(염도 약 3.5%)는 약 2.5% 무거워 약 1,025 kg/m³입니다. 배관 설계에서 이 차이가 중요할 때는 밀도계로 실측하세요.",
        "The formula is for pure distilled or deionised water (virtually no dissolved salts or gases). Groundwater, tap water, and seawater are denser because of dissolved solids: typical tap water (TDS 200–500 ppm) is roughly 0.02–0.05% heavier; seawater (~3.5% salinity) sits around 1,025 kg/m³. When this margin matters, measure with a hydrometer.",
      ),
    },
    {
      q: L("왜 4℃에서 밀도가 최대가 되나요?", "Why does density peak at 4 °C?"),
      a: L(
        "물 분자가 온도에 따라 두 가지 상반된 작용을 하기 때문입니다. 온도가 내려가면 분자 운동이 느려져 부피가 줄어들고 밀도가 올라갑니다. 그러나 4℃ 이하에서는 수소결합이 온도를 낮추는 힘을 이기고 분자를 더 넓게 배치시켜 부피가 오히려 커집니다. 이 두 효과가 3.98℃에서 정확히 상쇄되어 밀도가 극대가 되고, 0℃에서 결빙 시에는 부피가 약 9% 팽창합니다.",
        "Two opposing effects meet: cooling slows molecular motion (contracting volume), but below 4 °C hydrogen bonds push molecules apart (expanding volume). The two balance at ≈3.98 °C, giving maximum density. At 0 °C, ice expands ~9% by volume.",
      ),
    },
    {
      q: L("고압 조건(예: 50bar)에서도 이 값이 맞나요?", "Is this valid at high pressure, e.g. 50 bar?"),
      a: L(
        "아닙니다. 이 공식은 대기압 근처(1bar)의 액상수 전용입니다. 10bar 이상의 압력에서는 압력에 의한 압축 효과로 밀도가 약간 더 높아집니다(수십 bar에서 약 0.2~0.5% 증가). 고압 냉각수계나 보일러 급수 계산에는 IAPWS-IF97 등 압력 보정 공식을 별도로 사용해야 합니다.",
        "No — the formula assumes near-atmospheric pressure. Above 10 bar, compression raises density by a fraction of a percent; at tens of bar the shift reaches ~0.2–0.5%. High-pressure cooling circuits and boiler feed calculations require pressure-corrected models such as IAPWS-IF97.",
      ),
    },
    {
      q: L("증기 밀도도 이 계산기로 구할 수 있나요?", "Can I find steam density with this tool?"),
      a: L(
        "증기 영역(기화점 이상)은 이 다항식이 적용되지 않습니다. 포화수증기 밀도는 100℃에서 약 0.598 kg/m³, 150℃에서 약 2.5 kg/m³으로 온도·압력에 따라 급격히 변하므로, 증기 배관·보일러 설계에는 IAPWS 기준 포화수 테이블이나 스팀 테이블을 직접 사용해야 합니다.",
        "The polynomial does not apply in the steam zone. Saturated steam density is ~0.598 kg/m³ at 100 °C and ~2.5 kg/m³ at 150 °C, varying steeply with temperature and pressure. Steam design must use IAPWS steam tables, not this formula.",
      ),
    },
    {
      q: L("해수 밀도를 따로 계산하는 공식이 있나요?", "Is there a separate formula for seawater density?"),
      a: L(
        "해수 밀도는 염도·온도·압력 3변수 함수로, UNESCO/TEOS-10의 실용적 상태방정식이 표준입니다. 간단 근사로는 ρ_seawater ≈ 1025 kg/m³(20℃, 염도 35ppt)를 기준으로, 온도 보정(약 −0.15 kg/m³/℃)을 적용합니다. 정확도가 요구되면 UNESCO 공식 또는 TEOS-10 온라인 계산기를 사용하세요.",
        "Seawater density is a function of salinity, temperature, and pressure — the UNESCO/TEOS-10 equation of state is the standard. A quick approximation starts at ≈1025 kg/m³ (20 °C, 35 ppt) with a temperature correction of roughly −0.15 kg/m³ per °C. For precision use the full UNESCO or TEOS-10 calculators.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '물의 밀도는 온도에 따라 변하며, 4°C에서 최대값(약 1000 kg/m³)을 나타냅니다. 이 계산기는 온도를 입력받아 물의 밀도를 다항식 근사 공식으로 계산합니다.',
            'Water density varies with temperature, reaching its maximum (approximately 1000 kg/m³) at 4°C. This calculator computes water density from temperature using a polynomial approximation formula.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('이 계산기가 구하는 것', 'What this calculator finds')}</h4>
          <p>
            {L(
              '주어진 온도(0~100°C 범위)에서 물의 밀도를 kg/m³ 또는 g/cm³ 단위로 계산합니다. 액상수(기본)와 증기 모두 지원합니다.',
              'It calculates water density at a given temperature (0–100°C range) in kg/m³ or g/cm³. Both liquid water (default) and steam are supported.',
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('왜 필요한가', 'Why it matters')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('유체역학 계산에서 밀도는 Reynolds 수, 유량, 압력 강하 등에 직접 영향을 줍니다', 'Density directly affects Reynolds number, flow rate, pressure drop, and other fluid dynamics calculations')}</li>
            <li>{L('열전달 계산에서 자연 대류의 부력력은 밀도 차이에 의해 결정됩니다', 'Buoyancy force in natural convection is determined by density differences in heat transfer calculations')}</li>
            <li>{L('화학 공정에서 반응물 농도·유량 조절에 물 밀도의 정확한 값이 필요합니다', 'Accurate water density is needed for adjusting reactant concentration and flow rates in chemical processes')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("온도 입력", "Enter temperature"),
            L("측정하거나 계산하고 싶은 물의 온도를 입력합니다. °C, °F, K 단위를 선택할 수 있습니다.", "Enter the water temperature of interest. You may select °C, °F, or K."),
          ],
          [
            L("결과 확인", "Check results"),
            L("밀도(kg/m³), 비중량(kN/m³), 동적 점도(Pa·s)가 동시에 표시됩니다. 밀도는 배관·탱크 설계의 기본 입력이고, 점도는 펌프 전력·마찰 계수 계산에 쓰입니다.", "Density (kg/m³), specific weight (kN/m³), and dynamic viscosity (Pa·s) are shown together. Density feeds piping/tank design; viscosity feeds pump power and friction calculations."),
          ],
          [
            L("단위 확인", "Verify units"),
            L("미국 단위계에서는 lb/ft³와 lbf/ft³으로 표시됩니다. SI↔Imperial 변환은 1 kg/m³ = 0.06243 lb/ft³ 관계를 따릅니다.", "In imperial mode the display switches to lb/ft³ and lbf/ft³. The SI↔imperial bridge is 1 kg/m³ = 0.06243 lb/ft³."),
          ],
          [
            L("참고값과 비교", "Compare with reference"),
            L("계산값이 참고 밀도값(4°C=1000, 20°C=998.2, 100°C=958.4 kg/m³)과 일치하는지 확인하면 입력 오류를 빠르게 잡을 수 있습니다.", "Quick sanity-check against reference values (4 °C ≈ 1000, 20 °C ≈ 998.2, 100 °C ≈ 958.4 kg/m³) catches input mistakes instantly."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 상온 물 (20℃)", "Example 1 — Room-temperature water (20 °C)")}</p>
          <p>
            {L(
              "20℃를 입력하면 ρ = 999.842594 + 0.06793952×20 − 0.00909529×400 + 0.0001001685×8000 − 0.000001120083×160000 = 998.185 kg/m³. 비중량 γ = 998.185 × 9.80665 / 1000 = 9.789 kN/m³, 동적 점도 μ ≈ 1.001 × 10⁻³ Pa·s. 이 밀도값은 Reynolds 수 계산(ρvl/μ)에서 가장 자주 쓰이는 입력입니다.",
              "At 20 °C the polynomial gives ρ ≈ 998.185 kg/m³; specific weight γ ≈ 9.789 kN/m³; dynamic viscosity μ ≈ 1.001 × 10⁻³ Pa·s. This density is the most common input for Reynolds number calculations.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 4℃ 최대 밀도 vs 100℃", "Example 2 — Maximum density at 4 °C vs 100 °C")}</p>
          <p>
            {L(
              "4℃에서 ρ ≈ 999.97 kg/m³(이 공식상 거의 1000 kg/m³), 100℃에서 ρ ≈ 958.4 kg/m³. 차이는 약 42 kg/m³(4.2%)로, 1,000L 탱크 기준 약 42kg의 질량 차이가 납니다. 냉난방 설계에서 순환수의 부피 팽창·수축을 보정할 때 이 차이가 현실적인 영향을 줍니다.",
              "At 4 °C ρ ≈ 999.97 kg/m³; at 100 °C ≈ 958.4 kg/m³. The 42 kg/m³ (4.2%) gap equals ~42 kg in a 1,000 L tank — significant when compensating for thermal expansion/contraction in HVAC loop design.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("이 값들은 순수 증류수 기준이며, 실제 수돗물·지하수·해수는 용존 물질 때문에 약간 다를 수 있습니다.", "Values are for distilled water; actual tap water, groundwater, or seawater may differ slightly due to dissolved substances.")}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">
            {L('물 밀도 다항식 근사', 'Polynomial Approximation for Water Density')}
          </h4>
          <p className="text-sm mb-3">
            {L(
              'Kell의 다항식을 단순화한 근사 공식을 사용하며, 0~100°C 범위에서 ±0.05% 이내의 정확도를 가집니다.',
              'A simplified version of Kell\'s polynomial is used, providing accuracy within ±0.05% over the 0–100°C range.',
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="\rho(T) = 999.842594 + 6.793952{\times}10^{-2}T - 9.095290{\times}10^{-3}T^{2} + 1.001685{\times}10^{-4}T^{3} - 1.120083{\times}10^{-6}T^{4}" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-green-600">ρ(T)</strong> — {L('온도 T에서의 물 밀도 [kg/m³]', 'Water density at temperature T [kg/m³]')}</li>
          <li><strong className="font-semibold text-red-500">T</strong> — {L('섭씨 온도 [°C] (0~100°C)', 'Temperature in Celsius [°C] (0–100°C)')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('참고 밀도값', 'Reference density values')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('0°C: 999.8 kg/m³', '0°C: 999.8 kg/m³')}</li>
            <li>{L('4°C: 1000.0 kg/m³ (최대 밀도)', '4°C: 1000.0 kg/m³ (maximum density)')}</li>
            <li>{L('20°C: 998.2 kg/m³', '20°C: 998.2 kg/m³')}</li>
            <li>{L('100°C: 958.4 kg/m³', '100°C: 958.4 kg/m³')}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('실무 팁', 'Practical tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('일반 공정 계산에서는 20°C에서 998.2 kg/m³을 근사값으로 자주 사용합니다', 'For general process calculations, 998.2 kg/m³ at 20°C is commonly used as an approximation')}</li>
            <li>{L('4°C 부근에서 밀도 변화가 작으므로, 냉수 시스템에서는 온도 영향이 크지 않습니다', 'Density change is minimal near 4°C, so temperature effects are small in chilled water systems')}</li>
            <li>{L('해수의 밀도는 염도(약 3.5%) 때문에 약 1025 kg/m³으로 일반 물과 다릅니다', 'Seawater density differs from fresh water at approximately 1025 kg/m³ due to salinity (~3.5%)')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('한계와 주의사항', 'Limitations & cautions')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('이 공식은 순수한 물(증류수) 기준이며, 용해된 염류·가스에 의한 밀도 변화는 반영하지 않습니다', 'This formula is for pure (distilled) water and does not account for density changes from dissolved salts or gases')}</li>
            <li>{L('고압 조건(10 bar 이상)에서는 압력에 의한 밀도 변화를 별도로 고려해야 합니다', 'At high pressures (>10 bar), pressure-induced density changes must be considered separately')}</li>
            <li>{L('결빙 시 부피가 약 9% 팽창하므로, 동결 방지 설계 시 주의가 필요합니다', 'Freezing causes ~9% volume expansion, requiring caution in freeze protection design')}</li>
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
