import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./HeatCapacityClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/heat-capacity", "engineering", "heat-capacity");
}



export default function HeatCapacityPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const ko = isKo;
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("물이 냉각제로 좋은 이유가 비열 용량 때문인가요?", "Is water's cooling ability due to its specific heat?"),
      a: L(
        "맞습니다. 물의 비열 용량(4.186 kJ/kg·K)은 강(0.49)이나 알루미늄(0.90)보다 4~9배 높아 같은 질량 같은 온도 상승에서 훨씬 많은 열을 흡수합니다. 이 성질 때문에 전력·반도체·자동차 엔진의 냉각수로 물이 기본입니다. 다만 고온 응용에서는 비열이 높은 대신 기화잠열(증발 냉각)까지 활용할 때 비등점 제한이 생기므로, 고온 냉각에는 특수 냉매가 필요합니다.",
        "Yes. Water's specific heat (4.186 kJ/kg·K) is 4–9× that of steel or aluminium, absorbing far more heat for the same mass and temperature rise — the core reason it is the default coolant in power, semiconductor, and automotive cooling. At very high temperatures the boiling point limits single-phase cooling, necessitating specialised coolants.",
      ),
    },
    {
      q: L("온도 범위가 넓으면 비열 용량을 어떻게 넣어야 하나요?", "How should I handle Cp over a wide temperature range?"),
      a: L(
        "비열은 온도에 따라 변하므로, 예컨대 물이 10℃에서 90℃로 오를 때(ΔT=80K) 상온의 4.186을 그대로 쓰면 오차가 생깁니다. 해결책은 두 가지입니다. 첫째, 계산 구간 양끝점의 비열 평균값을 입력합니다. 둘째(더 정확한 방법), 구간을 나눠 각각 계산한 뒤 합산합니다. 10→50℃ 구간과 50→90℃ 구간의 평균 Cp가 다르면 따로 계산하는 것이 정확합니다.",
        "Cp varies with temperature, so using the room-temperature value across a wide range introduces error. Two fixes: (1) average the Cp values at the two endpoints; (2) for better accuracy, split the range into sub-intervals, compute each, then sum. This second approach is worth the effort when ΔT exceeds ~50 K.",
      ),
    },
    {
      q: L("상변화(끓는 것, 얼어붙는 것)가 있을 때는 어떻게 하나요?", "What about phase changes — boiling or freezing?"),
      a: L(
        "이 공식은 sensible heat(현열, 온도 변화에 필요한 열)만 계산합니다. 끓는점에서 물이 기화하려면 약 2,257 kJ/kg의 latent heat(잠열, 기화열)가 별도로 필요합니다. 마찬가지로 얼음이 녹을 때 약 334 kJ/kg의 융해열이 들어갑니다. 상변화가 포함된 설계에서는 sensible heat + latent heat를 따로 계산해 합산해야 합니다.",
        "This formula computes sensible heat only. At the boiling point, vaporisation requires an additional ~2,257 kJ/kg (latent heat of vaporisation); freezing/melting adds ~334 kJ/kg (latent heat of fusion). Designs involving phase change must compute and sum both sensible and latent terms separately.",
      ),
    },
    {
      q: L("기체의 Cp와 Cv는 왜 다른 건가요?", "Why do Cp and Cv differ for gases?"),
      a: L(
        "정압비열(Cp)은 압력이 일정할 때 가열하면 팽창 work(=PΔV)가 추가로 필요하기 때문에 Cv보다 큽니다. 이상기체에서는 Cp − Cv = R(기체상수) 관계가 성립합니다. 예컨대 공기의 Cv ≈ 0.718, Cp ≈ 1.005 kJ/kg·K이고 Cp/Cv = γ(비열비) = 1.4입니다. 고체·액체는 기체에 비해 팽창 work가 극히 작아 Cp ≈ Cv로 보아도 무방합니다.",
        "At constant pressure (Cp) the gas also does expansion work (PΔV), so Cp > Cv; for an ideal gas Cp − Cv = R. For air Cv ≈ 0.718, Cp ≈ 1.005 kJ/kg·K, ratio γ = 1.4. In solids and liquids the expansion work is negligible, so Cp ≈ Cv.",
      ),
    },
    {
      q: L("혼합물의 비열 용량은 어떻게 구하나요?", "How do I find Cp for a mixture?"),
      a: L(
        "대략적인 추정이 가능하지만 정확하지 않을 수 있습니다. 부피 가산 가정에서 Cp_mixed = Σ(wᵢ × Cpᵢ) (wᵢ는 부피 분율)로 근사합니다. 예: 물 70% + 에틸렌글리콜 30%(냉각수)의 Cp ≈ 0.7×4.186 + 0.3×2.43 = 3.66 kJ/kg·K 정도. 다만 실제 혼합물은 분자간 상호작용 때문에 이 값과 약간 다르며, 정밀 설계에서는 실험값을 사용하세요.",
        "An approximate estimate is Cp_mix ≈ Σ(wᵢ × Cpᵢ) by volume fraction under an additive assumption — e.g., 70/30 water–ethylene glycol ≈ 3.66 kJ/kg·K. Real mixtures deviate due to molecular interactions; for precise designs use experimentally measured values.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '열용량(Heat Capacity)은 물질의 온도를 1도 올리기 위해 필요한 열에너지의 양입니다. 질량에 비례하며, 물질의 비열 용량(specific heat capacity)에 질량을 곱하여 구합니다.',
            'Heat capacity is the amount of thermal energy required to raise the temperature of a substance by one degree. It is proportional to mass and is found by multiplying specific heat capacity by mass.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('이 계산기가 구하는 것', 'What this calculator finds')}</h4>
          <p>
            {L(
              '물질의 질량, 비열 용량, 온도 변화량을 입력하면 필요한 열에너지를 J(줄), kJ, kcal, BTU 등 다양한 단위로 계산합니다.',
              'Enter the mass, specific heat capacity, and temperature change of a substance to calculate the required heat energy in various units (J, kJ, kcal, BTU).',
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('왜 필요한가', 'Why it matters')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('가열·냉각 장치(히터, 쿨러, 보일러 등)의 용량 결정에 필수적입니다', 'Essential for determining capacity of heating/cooling equipment (heaters, coolers, boilers, etc.)')}</li>
            <li>{L('공정열 계산에서 에너지 균형(energy balance)의 핵심 항목입니다', 'Key item in energy balance for process heat calculations')}</li>
            <li>{L('설비의 냉각 시간 예측 및 열 관리 설계에 활용됩니다', 'Used for predicting cooling time and thermal management design')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("물질 선택", "Select material"),
            L("드롭다운에서 재료를 고르거나, '직접 입력' 체크박스를 켜서 비열 값을 직접 넣습니다. 재료별 기본 Cp는 물(4,186), 알루미늄(897), 구리(385), 강(502), 콘크리트(880), 유리(840) J/(kg·K)입니다.", "Choose a preset material or tick 'Manual Input' to enter your own Cp. Defaults: water 4,186, Al 897, Cu 385, steel 502, concrete 880, glass 840 J/(kg·K)."),
          ],
          [
            L("질량·온도 변화 입력", "Enter mass and ΔT"),
            L("질량(kg, g, lb, ton)과 온도 변화(ΔT, K/°C/°F)를 넣습니다. ΔT는 T_final − T_initial입니다.", "Set mass (kg/g/lb/ton) and temperature change (ΔT in K/°C/°F), where ΔT = T_final − T_initial."),
          ],
          [
            L("결과 확인", "Check results"),
            L("필요 열에너지(J 또는 MJ)와 kW·h 단위가 동시에 표시됩니다. 1,000,000 J 이상이면 MJ로 전환됩니다.", "Required heat energy appears in J (or MJ if ≥ 1,000,000) and in kWh simultaneously."),
          ],
          [
            L("단위 환산 활용", "Use unit conversions"),
            L("결과값은 J/kJ/kcal/BTU 단위로 환산 가능합니다. 공식 섹션의 환산 관계(1 kJ = 0.239 kcal = 0.9478 BTU)를 참고하세요.", "Results convert across J/kJ/kcal/BTU using the conversion factors in the formula section."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 물 가열", "Example 1 — Heating water")}</p>
          <p>
            {L(
              "물 1kg, Cp = 4,186 J/(kg·K), ΔT = 50 K → Q = 1 × 4,186 × 50 = 209,300 J ≈ 209.3 kJ. kW·h로는 209,300 ÷ 3,600,000 = 0.0581 kWh. 즉 보일러로 물 1L의 온도를 50℃ 올리는 데 약 0.058kWh의 전력이 필요합니다.",
              "1 kg water, Cp = 4,186 J/(kg·K), ΔT = 50 K → Q = 209,300 J ≈ 209.3 kJ ≈ 0.0581 kWh — the electrical energy a heater needs to warm 1 litre by 50 °C.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 구리 부품 가열", "Example 2 — Heating a copper part")}</p>
          <p>
            {L(
              "구리 2kg, Cp = 385 J/(kg·K), 20℃→220℃ (ΔT=200K) → Q = 2 × 385 × 200 = 154,000 J = 154 kJ. 물과 비교하면, 같은 질량·ΔT에서 구리에 필요한 열은 물의 약 18.4% 수준입니다(385/4,186). 비열이 낮은 금속은 온도가 빨리 올라가고, 빨리 식는다는 뜻입니다.",
              "2 kg copper, Cp = 385, ΔT = 200 K → Q = 154,000 J = 154 kJ. Compared to water under equal conditions, copper needs only ~18% as much heat (385/4186) — low-Cp metals heat up fast and cool down fast.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("상기 수치는 상온 근처의 대표 Cp值 기준이며, 실제 Cp는 온도·압력에 따라 변할 수 있습니다.", "Values use room-temperature representative Cp; actual Cp may shift with temperature and pressure.")}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">
            {L('열용량 계산 공식', 'Heat Capacity Formula')}
          </h4>
          <p className="text-sm mb-3">
            {L(
              '기본 열전달 공식은 Q = m × c × ΔT이며, 이는 물질의 온도 변화에 필요한 열에너지양을 나타냅니다.',
              'The fundamental heat transfer formula is Q = m × c × ΔT, representing the heat energy required for a temperature change.',
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="Q = m c \Delta T" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-green-600">Q</strong> — {L('필요 열에너지 [J, kJ, kcal, BTU]', 'Required heat energy [J, kJ, kcal, BTU]')}</li>
          <li><strong className="font-semibold text-red-500">m</strong> — {L('질량 [kg, g, lb]', 'Mass [kg, g, lb]')}</li>
          <li><strong className="font-semibold text-blue-600">c</strong> — {L('비열 용량 [J/(kg·K), kJ/(kg·°C), kcal/(kg·°C), BTU/(lb·°F)]', 'Specific heat capacity [J/(kg·K), kJ/(kg·°C), kcal/(kg·°C), BTU/(lb·°F)]')}</li>
          <li><strong className="font-semibold text-orange-600">ΔT</strong> — {L('온도 변화량 [K, °C, °F] (T_final − T_initial)', 'Temperature change [K, °C, °F] (T_final − T_initial)')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('일반적인 비열 용량 참고값 (상온)', 'Common specific heat capacity values (at room temperature)')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('물: 4.186 kJ/(kg·K) = 1.000 kcal/(kg·°C)', 'Water: 4.186 kJ/(kg·K) = 1.000 kcal/(kg·°C)')}</li>
            <li>{L('알루미늄: 0.897 kJ/(kg·K)', 'Aluminum: 0.897 kJ/(kg·K)')}</li>
            <li>{L('구리: 0.385 kJ/(kg·K)', 'Copper: 0.385 kJ/(kg·K)')}</li>
            <li>{L('강: 0.490 kJ/(kg·K)', 'Steel: 0.490 kJ/(kg·K)')}</li>
            <li>{L('에어(공기): 1.005 kJ/(kg·K)', 'Air: 1.005 kJ/(kg·K)')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('단위 환산', 'Unit conversion')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('1 kJ = 0.239 kcal = 0.9478 BTU', '1 kJ = 0.239 kcal = 0.9478 BTU')}</li>
            <li>{L('1 kcal = 4.186 kJ = 3.968 BTU', '1 kcal = 4.186 kJ = 3.968 BTU')}</li>
            <li>{L('1 BTU = 1.055 kJ = 0.252 kcal', '1 BTU = 1.055 kJ = 0.252 kcal')}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('실무 팁', 'Practical tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('물의 비열 용량이 매우 크므로, 냉각제로 물을 사용하면 효과적인 열 전달이 가능합니다', 'Water\'s high specific heat capacity makes it an effective cooling medium')}</li>
            <li>{L('비열 용량은 온도에 따라 변하므로, 넓은 온도 범위에서는 평균 비열 용량을 사용하는 것이 좋습니다', 'Specific heat capacity changes with temperature; use average values for wide temperature ranges')}</li>
            <li>{L('상변화(증발, 응고)가 동반되면 latent heat(잠열)를 별도로 추가해야 합니다', 'When phase changes (evaporation, solidification) occur, latent heat must be added separately')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('한계와 주의사항', 'Limitations & cautions')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('비열 용량은 온도·압력에 따라 변하므로, 상온 근처의 근사값임을 유의하세요', 'Specific heat capacity varies with temperature/pressure; note these are near-room-temperature approximations')}</li>
            <li>{L('기체의 경우 정압비열(Cp)과 정적비열(Cv)이 다르며, 사용 조건에 맞는 값을 선택해야 합니다', 'For gases, specific heat at constant pressure (Cp) and constant volume (Cv) differ; select the appropriate value')}</li>
            <li>{L('혼합물의 비열 용량은 조성에 따라 달라지므로 실험 측정이 권장됩니다', 'Mixture heat capacity varies with composition; experimental measurement is recommended')}</li>
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
