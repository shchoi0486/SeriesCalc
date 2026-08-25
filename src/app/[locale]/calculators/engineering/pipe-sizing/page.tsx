import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./PipeSizingClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/pipe-sizing", "engineering", "pipe-sizing");
}



export default function PipeSizingPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const ko = isKo;
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("유속 범위는 어떻게 정하나요?", "How do I pick the right velocity range?"),
      a: L(
        "용도별 권장치가 다르고, 이 계산기 기본값(급수 3m/s)은 KS/ISO 설계기준의 일반적 상한입니다. 배관 길이·유체 점도·허용 압력 강하에 따라 조정이 필요합니다. 예컨대 펌프 출구 직전이나 배관 길이가 100m 이상이면 1.0~1.5 m/s로 낮추는 것이 안전합니다. 증기 배관은 응축수 배출 문제 때문에 최소 유속(보통 15~20 m/s)도 동시에 만족해야 합니다.",
        "Allowable velocity depends on service: the default (3 m/s for cold water) is the typical upper bound in KS/ISO practice but must be adjusted for pipe length, fluid viscosity, and acceptable pressure drop. Near pump discharge or on runs exceeding 100 m, dropping to 1.0–1.5 m/s is safer. Steam pipes impose both a minimum (≈15–20 m/s to sweep condensate) and a maximum — both must be met.",
      ),
    },
    {
      q: L("계산 결과 '표준 규격 없음'이 뜨면 어떻게 하나요?", "What if the result says 'No standard size'?"),
      a: L(
        "계산된 이론 직경이 기준 규격(KS, ANSI 등) 범위 밖일 때 발생합니다. 두 가지 가능성이 있습니다. 첫째, 유속이 너무 낮아 매우 큰 배관이 필요한 경우 — 유속 상한을 올려 다시 계산하거나, 산업용 대구경 배관 규격(KS D 3572 등)을 별도 확인하세요. 둘째, 유량이 매우 작아 최소 규격보다 작은 경우 — 이때는 2차 분배 배관을 추가하거나, 이론값 그대로 쓸 수 있는 비표준 배관(NPS 1/2 이하) 사용을 검토합니다.",
        "This occurs when the theoretical diameter falls outside the built-in standard range. Either the allowable velocity is too low (raising it recalculates to a smaller size, or check large-bore industrial standards like KS D 3572), or the flow is very small (consider sub-headers or non-standard pipe below NPS ½).",
      ),
    },
    {
      q: L("이 결과로 압력 강하도 알 수 있나요?", "Does the result give pressure drop too?"),
      a: L(
        "아니요. 이 계산기는 연속 방정식 기반으로 최소 직경과 유속·레이놀즈 수만 계산합니다. 마찰 압력 강하는 공식 섹션에 Darcy-Weisbach 공식을 제시해 두었으나, 직접 산출되지는 않습니다. 압력 강하가 필요한 경우 배관 길이·마찰 계수를 별도로 구해 ΔP = f·(L/D)·(ρv²/2)로 산출하거나 전문 배관 설계 소프트웨어를 활용하세요.",
        "No. This tool uses the continuity equation to find the minimum diameter and Reynolds number only. The Darcy-Weisbach formula is shown for reference but is not computed — obtain the friction factor separately and apply ΔP = f·(L/D)·(ρv²/2), or use dedicated piping-design software.",
      ),
    },
    {
      q: L("레이놀즈 수 2,300이 경계인 이유는?", "Why is Reynolds 2,300 the boundary?"),
      a: L(
        "실험적으로 관내 유동이 Re ≈ 2,300 이하에서 층류(laminar), 4,000 이상에서 난류(turbulent)로 안정되게 전환됩니다. 2,300~4,000 사이의 과도 영역은 유동 상태가 불안정해 설계에 사용하기 어렵습니다. 배관 설계에서는 항상 난류(Re > 4,000)를 가정하므로, 계산 결과가 이 값 아래라면 유속을 높이거나 배관을 줄여야 난류 영역으로 들어갑니다.",
        "Experiments show pipe flow transitions to laminar below Re ≈ 2,300 and fully turbulent above Re ≈ 4,000. The unstable transition zone between 2,300 and 4,000 is unsuitable for design assumptions. Piping design always assumes turbulent flow (Re > 4,000); if the result falls below that, increase velocity or reduce pipe size.",
      ),
    },
    {
      q: L("가스 배관에도 이 계산기를 쓸 수 있나요?", "Can I use this for gas piping?"),
      a: L(
        "부피 유량 기준 변환 자체는 가능하지만, 가스는 압축성이 있어 밀도가 압력에 따라 변하므로 결과 해석이 달라집니다. 특히 고압 가스 배관(10 bar 이상)이나 압력 강하가 큰 장거리 배관에서는 압축성을 고려한 전용 계산( filosofia·Weymouth 방정식 등)이 필요합니다. 이 계산기는 비압축성 액체(물, 오일 등)에 최적화되어 있습니다.",
        "Unit conversion still works, but gases are compressible — density changes with pressure, invalidating the incompressible assumption. High-pressure (>10 bar) or long-distance gas lines require compressible-flow equations (Panhandle, Weymouth, etc.). This tool is optimised for incompressible liquids.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '배관 사이즈 계산은 유량과 허용 유속을 기반으로 최적의 배관 내경을 결정하는 과정입니다. 유속이 너무 빠르면 마찰 압력 강하가 커지고, 너무 느리면 설비비가 증가합니다.',
            'Pipe sizing determines the optimal pipe diameter based on flow rate and allowable velocity. Excessive velocity increases frictional pressure drop, while too low velocity raises equipment costs.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('이 계산기가 구하는 것', 'What this calculator finds')}</h4>
          <p>
            {L(
              '유량과 허용 유속을 입력하면 최소 배관 내경을 계산하고, 표준 배관 규격(KS, ANSI, JIS 등)에서 가장 가까운 사이즈를 추천합니다. 유속·마찰 계수·압력 강하도 함께 계산합니다.',
              'Enter the flow rate and allowable velocity to calculate the minimum pipe diameter, and the closest standard pipe specification (KS, ANSI, JIS, etc.) is recommended. Velocity, friction factor, and pressure drop are also calculated.',
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('왜 필요한가', 'Why it matters')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('배관비(배관+피팅+설치비)는 전체 플랜트 비용의 30~50%를 차지하므로 경제적 사이즈 선택이 중요합니다', 'Piping costs (pipe+fittings+installation) account for 30–50% of total plant cost, making economical sizing important')}</li>
            <li>{L('과도한 유속은 에로전(부식), 진동, 소음을 유발합니다', 'Excessive velocity causes erosion, vibration, and noise')}</li>
            <li>{L('배관 사이즈에 따라 펌프 전력·운전비가 결정됩니다', 'Pipe size determines pump power and operating costs')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("유량과 단위 설정", "Set flow rate and unit"),
            L("설계 유량을 입력합니다. 급배수는 m³/h, 설비 카탈로그는 GPM/LPM, 냉동기는 L/s 등 현장에 맞는 단위를 선택하세요.", "Enter design flow rate. Pick the unit matching your source: m³/h for domestic hydraulics, GPM/LPM for imported catalogue data, L/s for chillers."),
          ],
          [
            L("허용 유속 입력", "Enter allowable velocity"),
            L("용도별 권장 유속(급수 1.0~2.0m/s, 냉동수 1.0~2.5m/s, 증기 20~40m/s)을 참고해 상한값을 넣습니다.", "Refer to recommended velocity ranges (cold water 1.0–2.0 m/s, chilled water 1.0–2.5 m/s, steam 20–40 m/s) and enter the upper limit."),
          ],
          [
            L("결과 확인", "Check results"),
            L("최소 내경(mm/inch), 실제 유속, 레이놀즈 수, 유동 체제(층류·과도·난류)가 표시됩니다. 레이놀즈 수 4,000 이상이면 난류입니다.", "Minimum diameter, actual velocity, Reynolds number, and flow regime (laminar/transitional/turbulent) are displayed. Re > 4,000 confirms turbulent flow."),
          ],
          [
            L("표준 규격 매칭", "Match to standard size"),
            L("계산값보다 큰 첫 번째 표준 배관 규격을 선택합니다. 실제로는 부식·스케일 여유를 위해 이론값의 약 10~20% 여유를 두는 것이 일반적입니다.", "Choose the first standard size above the calculated value. In practice, add 10–20% margin over the theoretical minimum to account for corrosion and scale buildup."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 급수 배관 (SI)", "Example 1 — Cold water supply (SI)")}</p>
          <p>
            {L(
              "Q = 50 m³/h, v_max = 3 m/s → Q = 0.013889 m³/s → D = √(4 × 0.013889 / (π × 3)) = 0.07678 m = 76.78 mm. KS 규격으로는 DN80(以内径 약 80mm)을 선택하며, 이때 실제 유속은 약 2.76 m/s로 허용 범위 내입니다. 레이놀즈 수 Re = 1000 × 3 × 0.0768 / 0.001 = 약 230,340 → 난류 유동.",
              "Q = 50 m³/h, v_max = 3 m/s → Q = 0.013889 m³/s → D = √(4 × 0.013889 / (π × 3)) ≈ 76.8 mm. Select DN80 (ID ≈ 80 mm) per KS; actual velocity ≈ 2.76 m/s, Re ≈ 230,000 — turbulent.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 냉동수 배관", "Example 2 — Chilled water piping")}</p>
          <p>
            {L(
              "냉동기 출구 유량 120 GPM, 허용 유속 2.0 m/s → 120 GPM = 7.57 L/s = 0.00757 m³/s → D = √(4 × 0.00757 / (π × 2)) = 0.0694 m = 69.4 mm. 가장 가까운 표준 규격은 DN75(2.5인치) 또는 DN80(3인치)이며, 스케일 여유를 고려하면 DN80이 안전합니다.",
              "Chiller outlet 120 GPM at allowable 2.0 m/s → 0.00757 m³/s → D ≈ 69.4 mm. Nearest standard size is DN75 (2.5″) or DN80 (3″); with scale margin DN80 is the safer pick.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("위 수치는 기본 물성(물, 20℃) 기준이며, 점도가 높은 유체(오일 등)는 레이놀즈 수가 크게 달라질 수 있어 별도 검토가 필요합니다.", "Values assume water at 20 °C; high-viscosity fluids such as oil yield very different Reynolds numbers and need separate review.")}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">
            {L('배관 사이즈 계산 공식', 'Pipe Sizing Formulas')}
          </h4>
          <p className="text-sm mb-3">
            {L(
              '기본 원리는 연속 방정식(유량 보존)과 유속-단면적 관계입니다.',
              'The basic principle is the continuity equation (flow conservation) and the velocity–cross-section relationship.',
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="Q = A v" />
            <BlockMath math="A = \dfrac{\pi D^{2}}{4}" />
            <BlockMath math="D = \sqrt{\dfrac{4Q}{\pi v}}" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-green-600">Q</strong> — {L('부피 유량 [m³/s]', 'Volumetric flow rate [m³/s]')}</li>
          <li><strong className="font-semibold text-red-500">A</strong> — {L('배관 단면적 [m²]', 'Pipe cross-sectional area [m²]')}</li>
          <li><strong className="font-semibold text-blue-600">v</strong> — {L('유속 [m/s]', 'Velocity [m/s]')}</li>
          <li><strong className="font-semibold text-orange-600">D</strong> — {L('배관 내경 [m]', 'Pipe inner diameter [m]')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('마찰 압력 강하 (Darcy-Weisbach)', 'Frictional Pressure Drop (Darcy-Weisbach)')}</h4>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="\Delta P = f\,\dfrac{L}{D}\,\dfrac{\rho v^{2}}{2}" />
          </div>
          <ul className="space-y-2 text-sm mt-2">
            <li><strong className="font-semibold text-green-600">ΔP</strong> — {L('마찰 압력 강하 [Pa]', 'Frictional pressure drop [Pa]')}</li>
            <li><strong className="font-semibold text-red-500">f</strong> — {L('Darcy 마찰 계수 (무차원)', 'Darcy friction factor (dimensionless)')}</li>
            <li><strong className="font-semibold text-blue-600">L</strong> — {L('배관 길이 [m]', 'Pipe length [m]')}</li>
            <li><strong className="font-semibold text-orange-600">ρ</strong> — {L('유체 밀도 [kg/m³]', 'Fluid density [kg/m³]')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('권장 유속 범위', 'Recommended velocity ranges')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('급수 배관: 1.0~2.0 m/s', 'Water supply piping: 1.0–2.0 m/s')}</li>
            <li>{L('온수 배관: 0.8~1.5 m/s', 'Hot water piping: 0.8–1.5 m/s')}</li>
            <li>{L('증기 배관: 20~40 m/s (포화증기)', 'Steam piping: 20–40 m/s (saturated steam)')}</li>
            <li>{L('냉동수 배관: 1.0~2.5 m/s', 'Chilled water piping: 1.0–2.5 m/s')}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('실무 팁', 'Practical tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('배관은 이론 최소 직경보다 한 단계 큰 표준 규격을 선택하는 것이 일반적입니다', 'It is common to select one standard size larger than the theoretical minimum diameter')}</li>
            <li>{L('배관 길이가 짧고 직경이 클수록 마찰 손실이 작으므로, 경제 배관 속도를 벗어나지 않는 범위에서 큰 직경을 선호합니다', 'Shorter, larger-diameter pipes have less friction loss, so larger diameters are preferred within the economic velocity range')}</li>
            <li>{L('점도가 높은 액체(오일 등)는 유속을 더 낮게 설계해야 합니다', 'High-viscosity liquids (oil, etc.) require lower design velocities')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('한계와 주의사항', 'Limitations & cautions')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('이 계산기는 정상 유동(steady-state) 기준이며, 수격(hammer)·과도 유동은 별도 검토가 필요합니다', 'This calculator is for steady-state flow; water hammer and transient flow require separate analysis')}</li>
            <li>{L('배관 피팅·벤드의 국소 손실-loss는 포함되지 않으며, 별도의 등가 길이 환산이 필요합니다', 'Minor losses from fittings and bends are not included and require separate equivalent length conversion')}</li>
            <li>{L('부식·스케일 축적을 고려하여 설계 직경을 여유 있게 잡는 것이 좋습니다', 'Design diameter should have margin to account for corrosion and scale buildup')}</li>
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
