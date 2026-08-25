
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./KoreanWindLoadClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/korean-wind-load", "engineering", "korean-wind-load");
}



const WIND_SPEED_TABLE = [
  { region: '도시 (Urban)', v10: '25.0', v50: '30.0', v100: '33.0' },
  { region: '해안 (Coastal)', v10: '30.0', v50: '36.0', v100: '40.0' },
  { region: '산간 (Mountainous)', v10: '28.0', v50: '33.0', v100: '37.0' },
];

export default function KoreanWindLoadPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("이 결과를 그대로 설계서에 써도 되나요?", "Can I use these results directly in design documents?"),
      a: L(
        "아니요. 이 계산기는 교육용·예비검토용 단순화 모델입니다. 실제 KDS 41 10 00은 지표면조도구분(A~D)별 고도분포로 속도압을 산정하고, 돌풍증폭계수 Gf는 구조감쇠비·밀도·폭과 높이의 비 등의 함수이며, 풍압계수 Cp도 건물 형상·면 위치(벽·지붕 모서리)마다 다른 값을 씁니다. 또한 국내 기본풍속은 지역별 재현기간 100년 값이 표로 관리됩니다. 인허가·시공 설계에는 반드시 KDS 원문과 검정된 전산 프로그램을 사용하고, 이 계산기는 규모감 잡기와 개념 학습에 활용하세요.",
        "No. This is a simplified educational model. Actual KDS 41 10 00 derives velocity pressure from terrain-category height profiles, treats the gust amplification factor as a function of damping, density, and building aspect ratios, and assigns pressure coefficients per surface and zone. Licensed design must follow the standard and validated software — use this tool for scale checks and learning.",
      ),
    },
    {
      q: L("풍압계수 Cp는 어떻게 정하나요?", "How should I pick the pressure coefficient Cp?"),
      a: L(
        "Cp는 바람이 미는 면에서는 양(+) 압력, 빨아당기는 면에서는 음(−) 흡입력으로 작용하며, 건물 평면·측면 비와 바라보는 면의 위치에 따라 달라집니다. 밀폐형 직사각형 건물 벽체는 대략 +0.8~+1.2(정면), −0.5~−1.2(측면·배면), 지붕은 경사와 코너 위치에 따라 더 큰 음압이 나오는 경우가 많습니다. 이 계산기에서는 절대값으로 입력해 하중 크기를 보수적으로 추정하는 방식입니다. 특정 면 설계에는 KDS 표에서 해당 형상·위치의 값을 찾으세요.",
        "Wind pushes on windward surfaces (positive) and sucks on leeward and side surfaces (negative suction); values depend on plan aspect ratio and which face you examine. Closed rectangular walls typically run about +0.8 to +1.2 windward and −0.5 to −1.2 leeward or side, with roofs seeing larger suctions at corners and ridges. Enter an absolute value here for a conservative magnitude estimate, and consult KDS tables for exact zone coefficients.",
      ),
    },
    {
      q: L("같은 풍속인데 지역구분만 바꿔도 결과가 왜 이렇게 달라지죠?", "Why does changing only the region type alter results so much?"),
      a: L(
        "지역구분이 두 군데서 작동하기 때문입니다. 첫째, 돌풍계수 Gf가 도시 1.5 / 산간 1.8 / 해안 2.0으로 달라집니다(60m 초과 시 추가 +0.2). 둘째, 실무에서는 지역마다 기본풍속 자체가 다릅니다 — 이 계산기 참고표 기준 재현기간 100년 풍속이 도시 33 m/s, 해안 40 m/s 수준이라, 해안은 Gf 증가와 풍속 증가가 동시에 붙습니다. 속도압은 풍속의 제곱에 비례하므로 풍속이 20% 커지면 q₀는 약 44% 커진다는 점도 기억하세요.",
        "Region affects two inputs at once. The gust factor shifts (urban 1.5, mountainous 1.8, coastal 2.0, plus 0.2 above 60 m), and in practice each region also carries its own basic wind speed — the built-in reference lists 33 m/s urban versus 40 m/s coastal at the 100-year return period. Since velocity pressure scales with speed squared, a 20% faster wind means roughly 44% higher base pressure.",
      ),
    },
    {
      q: L("결과 등급(낮음~매우 높음)은 무엇을 기준으로 하나요?", "What do the result grades (Low to Very High) mean?"),
      a: L(
        "계산된 풍하중 W를 뉴턴 값으로 분류한 참고 지표입니다(500N 이하 낮음, 1,500N 이하 보통, 3,000N 이하 높음, 초과 시 매우 높음). 넓은 정면투사면적을 통째로 넣으면 대부분 '매우 높음'이 나오는데, 그건 건물 규모 때문이지 설계 오류가 아닙니다. 창호 한 장, 간판, 부재 하나처럼 실제로 검토하려는 면적만 입력하면 등급 감각이 더 의미 있게 작동합니다.",
        "Grades classify the computed force in newtons (≤500 Low, ≤1,500 Moderate, ≤3,000 High, beyond that Very High). Feeding a whole facade naturally lands Very High — that reflects area, not error. For meaningful grading, enter the tributary area you actually care about, such as a single window unit or one sign panel.",
      ),
    },
    {
      q: L("뉴턴(N) 결과를 kgf로 바꾸려면?", "How do I convert newtons to kilogram-force?"),
      a: L(
        "1 kgf = 9.80665 N이므로 결과를 9.80665로 나누면 됩니다. 예컨대 W = 107,490 N이라면 약 10,962 kgf ≈ 11톤의 수평력이 정면에 작용하는 셈입니다. 현장에서는 톤 단위로 소통하는 일이 많으니 변환 감각을 익혀두면 유용합니다. 다만 구조 계산서는 SI 단위(N, kN)로 작성하는 것이 원칙입니다.",
        "Divide by 9.80665 (1 kgf = 9.80665 N). A load of 107,490 N equals roughly 10,962 kgf — about eleven tons of horizontal force on the facade. Field conversations often use tonnage, but structural documents should stay in SI units (N, kN).",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '이 계산기는 KDS 4110 (한국건설기술연구원 풍하중 기준)에 따라 건축물에 작용하는 풍하중을 계산합니다. 풍하중은 바람이 건물에 가하는 압력으로, 구조설계 시 반드시 검토해야 하는 주요 자연재해 하중 중 하나입니다.',
            'This calculator computes wind loads on buildings according to KDS 4110 (Korean Institute of Civil Engineering and Building Technology wind load standard). Wind load is the pressure exerted by wind on a structure and is a critical natural hazard load in structural design.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('계산 항목', 'What this calculator computes')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('기본풍압 q₀ = 0.5 × ρ × V²', 'Base pressure q₀ = 0.5 × ρ × V²')}</li>
            <li>{L('설계풍압 q = q₀ × Cp × Gf', 'Design pressure q = q₀ × Cp × Gf')}</li>
            <li>{L('풍하중 W = q × A (정면투사면적)', 'Wind load W = q × A (projected frontal area)')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L('건물 높이 입력', 'Building height'),
            L('검토 지점의 지상고를 미터로 넣습니다. 60m를 넘으면 돌풍계수에 +0.2가 자동 가산됩니다.', 'Enter height above ground; exceeding 60 m adds +0.2 to the gust factor automatically.'),
          ],
          [
            L('기본풍속 결정', 'Choose basic wind speed'),
            L('아래 참고표에서 지역과 재현기간(10·50·100년)에 맞는 풍속을 골라 입력합니다. 중요도가 높은 건물일수록 긴 재현기간 값을 씁니다.', 'Pick from the reference table by region and return period — longer return periods for higher-importance structures.'),
          ],
          [
            L('Cp와 면적 입력', 'Cp and area'),
            L('풍압계수는 검토 면의 성격에 맞게(정면 압력은 보통 0.8~1.3), 정면투사면적은 실제로 하중을 받는 면을 넣습니다.', 'Set Cp for the surface in question (0.8–1.3 typical windward) and enter the tributary frontal area.'),
          ],
          [
            L('지역구분 선택 후 해석', 'Select region and interpret'),
            L('q₀ → q → W 순서로 계산 과정이 표시됩니다. 부재 설계는 해당 부재 면적으로, 전체 골조 검토는 정면 전체 면적으로 나눠 확인하세요.', 'Results show q₀, q, then W step by step. Check member design with member area and overall frames with full facade area.'),
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
            '공기밀도 ρ = 1.225 kg/m³ 기준으로 세 가지 시나리오를 추적해 보겠습니다.',
            'Three scenarios with air density fixed at 1.225 kg/m³:',
          )}
        </p>
        {[
          {
            title: L('① 도시지역 30m 건물, 정면 전체', '① Urban 30 m building, full facade'),
            body: L(
              'v = 30 m/s, Cp = 1.3, A = 500㎡. q₀ = 0.5 × 1.225 × 30² = 551.25 Pa, Gf = 1.50 → q = 551.25 × 1.3 × 1.5 = 1,074.94 Pa → W ≈ 537,469 N (약 54.8톤). 구조골조가 견뎌야 할 수준감을 잡을 때 쓰는 값입니다.',
              'v = 30 m/s, Cp = 1.3, A = 500㎡: q₀ = 551.25 Pa, Gf = 1.50 → q = 1,074.94 Pa → W ≈ 537,469 N (~54.8 tonnes) — the scale the frame must resist.',
            ),
          },
          {
            title: L('② 같은 조건, 창호 한 장(2㎡)', '② Same building, one window unit (2㎡)'),
            body: L(
              'q는 동일한 1,074.94 Pa지만 A = 2㎡만 적용하면 W = 2,149.88 N (약 219 kgf), 등급은 높음에 해당합니다. 창호·간판 설계는 이렇게 부재 단위 면적만 넣어 확인합니다.',
              'Pressure stays 1,074.94 Pa, but with A = 2㎡ the load is W = 2,149.88 N (~219 kgf), graded High. Member-level checks use exactly this approach.',
            ),
          },
          {
            title: L('③ 같은 건물이 해안에 있었다면', '③ Same building on the coast'),
            body: L(
              'v = 36 m/s, Gf = 2.00. q₀ = 793.80 Pa, q = 793.80 × 1.3 × 2.0 = 2,063.88 Pa → W ≈ 1,031,940 N. 도시 대비 약 92% 증가입니다. 풍속 20% 증가(제곱 효과)와 돌풍계수 상승이 겹친 결과로, 해안 내풍설계가 왜 엄격한지 숫자로 보여줍니다.',
              'With v = 36 m/s and Gf = 2.00: q₀ = 793.80 Pa → q = 2,063.88 Pa → W ≈ 1,031,940 N, a 92% jump over urban conditions — squared wind speed plus a stiffer gust factor, quantifying why coastal design is stricter.',
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
          <h4 className="font-bold text-lg mb-2 border-l-4 border-blue-500 pl-3">
            {L('KDS 4110 풍하중 계산 공식', 'KDS 4110 Wind Load Formula')}
          </h4>
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <BlockMath math="q_0 = 0.5\,\rho V^{2} \times 1.0" />
            <BlockMath math="q = q_0 C_p G_f" />
            <BlockMath math="W = q A" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-blue-500">q₀</strong> — {L('기본풍압 [Pa]', 'Base wind pressure [Pa]')}</li>
          <li><strong className="font-semibold text-blue-600">ρ</strong> — {L('공기밀도 = 1.225 kg/m³ (표준대기)', 'Air density = 1.225 kg/m³ (standard atmosphere)')}</li>
          <li><strong className="font-semibold text-green-600">V</strong> — {L('기본풍속 [m/s] (지역 및 높이에 따라 결정)', 'Basic wind speed [m/s] (determined by region and height)')}</li>
          <li><strong className="font-semibold text-purple-600">Cp</strong> — {L('풍압계수 (건물 형상에 따라 0.7~2.0)', 'Pressure coefficient (0.7–2.0 depending on building shape)')}</li>
          <li><strong className="font-semibold text-orange-600">Gf</strong> — {L('돌풍계수 (1.0~2.2, 높이·지역에 따라 변동)', 'Gust factor (1.0–2.2, varies with height and region)')}</li>
          <li><strong className="font-semibold text-red-500">A</strong> — {L('정면투사면적 [㎡]', 'Projected frontal area [㎡]')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('KDS 4110 기본풍속 참고표', 'KDS 4110 Basic Wind Speed Reference')}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">{L('지역', 'Region')}</th>
                  <th className="border p-2 text-center">V₁₀ (m/s)</th>
                  <th className="border p-2 text-center">V₅₀ (m/s)</th>
                  <th className="border p-2 text-center">V₁₀₀ (m/s)</th>
                </tr>
              </thead>
              <tbody>
                {WIND_SPEED_TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-muted/50' : ''}>
                    <td className="border p-2 font-medium">{row.region}</td>
                    <td className="border p-2 text-center font-mono">{row.v10}</td>
                    <td className="border p-2 text-center font-mono">{row.v50}</td>
                    <td className="border p-2 text-center font-mono">{row.v100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('풍하중 설계 시 주의사항', 'Wind Load Design Considerations')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('고층건물(60m 이상)은 돌풍계수가 증가하므로 반드시 고층풍속 보정을 적용하세요.', 'Tall buildings (60m+) require gust factor adjustments; apply high-rise wind speed corrections.')}</li>
            <li>{L('해안지역은 기본풍속이 높으므로 내풍설계가 필수적입니다.', 'Coastal regions have higher basic wind speeds; wind-resistant design is essential.')}</li>
            <li>{L('건물 형상에 따라 풍압계수 Cp가 크게 달라지므로 형상계수를 정확히 적용해야 합니다.', 'Cp varies significantly with building shape; apply the correct shape coefficient.')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('돌풍계수(Gf) 산정 기준', 'Gust Factor (Gf) Determination')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('도시지역: Gf ≈ 1.5 (건축밀집 area)', 'Urban: Gf ≈ 1.5 (dense building area)')}</li>
            <li>{L('산간지역: Gf ≈ 1.8 (지형 효과 반영)', 'Mountainous: Gf ≈ 1.8 (terrain effects)')}</li>
            <li>{L('해안지역: Gf ≈ 2.0 (개방지형, 높은 돌풍)', 'Coastal: Gf ≈ 2.0 (open terrain, high gusts)')}</li>
            <li>{L('60m 이상 고층: 추가 보정 +0.2 적용', 'Buildings 60m+: additional correction +0.2')}</li>
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
