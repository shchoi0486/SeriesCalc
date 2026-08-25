import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./FlowRateConverterClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/flow-rate-converter", "engineering", "flow-rate-converter");
}



export default function FlowRateConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const ko = isKo;
  const dict = isKo ? koDict : enDict;
  const L = (koText: string, enText: string) => (ko ? koText : enText);
  const t = dict?.calculatorNames;

  const faqs: { q: string; a: string }[] = [
    {
      q: L("US gal/min와 영국식(Imperial) gal/min는 얼마나 다른가요?", "How different are US and Imperial gallons per minute?"),
      a: L(
        "미국 갤런은 3.785412 L, 영국 제국갤런은 4.54609 L로 약 20% 차이가 납니다. 같은 '50 GPM'이라도 미국 기준이면 분당 189.27 L, 영국 기준이면 분당 227.30 L이라 펌프 선정에서 이 정도 오차는 치명적입니다. 이 계산기에 등록된 GPM·GPH는 모두 미국(US) 단위이며, 영국식 도면·규격을 다룰 때는 별도 계수(1 imp gpm = 0.07577 m³/h)를 적용해야 합니다.",
        "A US gallon is 3.785412 L while the imperial gallon is 4.54609 L — about 20% more. Fifty 'GPM' means 189 L/min in US units but 227 L/min imperial, an error that wrecks pump selection. The GPM and GPH entries here are US; apply a separate factor (1 imp gpm = 0.07577 m³/h) for British drawings.",
      ),
    },
    {
      q: L("질량 유량(kg/s, t/h)으로 바꾸고 싶은데요?", "Can I get mass flow (kg/s, t/h) instead?"),
      a: L(
        "이 계산기는 부피 유량 전용입니다. 질량 유량이 필요하면 결과에 밀도를 곱하세요: ṁ = ρ × Q. 예컨대 10 m³/h의 물(20℃, ρ ≈ 998 kg/m³)은 초당 998 × 10/3600 ≈ 2.772 kg/s, 시간당 약 9.98t입니다. 증기나 압축공기처럼 온도·압력에 따라 밀도가 크게 변하는 유체는 해당 조건의 밀도를 반드시 확인한 뒤 곱해야 합니다.",
        "This tool is volumetric only. For mass flow multiply by density: ṁ = ρ × Q. Water at 10 m³/h (20 °C, ρ ≈ 998 kg/m³) equals about 2.772 kg/s or roughly 9.98 t/h. Steam and compressed air change density dramatically with conditions, so confirm the operating-point density first.",
      ),
    },
    {
      q: L("CFM은 어떤 상황에서 쓰는 단위인가요?", "Where does CFM typically appear?"),
      a: L(
        "CFM(ft³/min)은 환기·공조·컴프레서 분야의 표준 단위입니다. 예컨대 주방 후드 배기팬 용량, 에어컨 풍량, 공구용 컴프레서 출력이 대부분 CFM으로 표기됩니다. 국내 습식 공정 설계에서는 m³/h로 바꿔 비교하는 일이 많은데 1 CFM = 1.6990 m³/h 관계만 기억하면 빠르게 환산됩니다. 다만 팬 카탈로그의 CFM은 흡입측 표준 조건 기준이 많아 고온·저압 환경에서는 실제 풍량이 달라집니다.",
        "CFM (ft³/min) is the standard for ventilation, HVAC, and compressors — range hoods, air conditioners, and shop-air tools all quote CFM. Remembering 1 CFM = 1.6990 m³/h covers most conversions, but note catalog figures assume standard inlet conditions that real hot or low-pressure installations won't match.",
      ),
    },
    {
      q: L("bbl/day는 어디에 쓰이는 단위죠?", "What uses bbl/day?"),
      a: L(
        "배럴/일(bbl/day)은 석유 산업의 원유 생산·정제 능력 단위입니다. 1 배럴 = 158.987 L이므로 하루 10만 bbl 정유시설은 연간 약 580만 kL를 처리하는 규모입니다. 화학플랜트 도면에서 원유 계통만 배럴 단위가 남아 있는 경우가 종종 있어, m³/h로 환산할 일이 생기면 1 bbl/day = 0.006624 m³/h임을 이용하면 됩니다.",
        "Barrels per day is petroleum's production unit. One barrel holds 158.987 L, so a 100,000 bbl/day refinery processes roughly 5.8 million kiloliters a year. When legacy oil-system drawings still use barrels, convert with 1 bbl/day = 0.006624 m³/h.",
      ),
    },
    {
      q: L("펌프 카탈로그의 유량 수치를 그대로 설계에 넣어도 되나요?", "Can I take pump-catalogue flow figures at face value?"),
      a: L(
        "그대로 쓰면 위험합니다. 카탈로그 유량은 성능곡선 위의 한 점일 뿐이며 실제 운전점은 배관 저항(펌프 곡선과 배관 곡선의 교점)에서 결정됩니다. 또한 정격 유량과 최대 유량, 임펠러 직경별 곡선이 다르고, 점도·온도가 카탈로그 조건과 다르면 보정이 필요합니다. 단위 환산은 첫 단계일 뿐, 최종 선정은 시스템 곡선 계산과 NPSH 확인까지 마친 뒤에 해야 합니다.",
        "Catalogue numbers are single points on performance curves; the actual operating point sits where the pump curve meets your system-resistance curve. Rated versus maximum flow differ, curves vary by impeller trim, and non-catalogue viscosity or temperature requires correction. Unit conversion is only step one — finish with system-curve analysis and an NPSH check before selecting.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '유량은 단위 시간당 흐르는 유체의 부피로, 배관·수처리·화학 공정 설계의 핵심 파라미터입니다. 이 계산기는 m³/s, m³/h, L/s, LPM(L/min), L/h, GPM(US), GPH(US), CFM(ft³/min), cfs, bbl/day 등 10개 부피 유량 단위를 상호 변환합니다.',
            'Flow rate — volume passing per unit time — is a core parameter of piping, water treatment, and process design. This calculator converts between ten volumetric units: m³/s, m³/h, L/s, LPM, L/h, US GPM, US GPH, CFM, cfs, and bbl/day.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('이 계산기가 구하는 것', 'What this calculator finds')}</h4>
          <p>
            {L(
              '입력값을 선택한 단위에서 기준 단위(m³/s)로 바꾼 뒤, 나머지 모든 단위의 값이 동시에 계산됩니다. 부피 유량 전용이며, 질량 유량(kg/s 등)은 별도로 밀도를 곱해 구해야 합니다.',
              'The input converts to the base unit (m³/s) and every other unit updates at once. Volumetric only — mass flows such as kg/s require multiplying by density separately.',
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('왜 필요한가', 'Why it matters')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('각국·각 산업에서 사용하는 유량 단위가 다르므로 정확한 변환이 필요합니다', 'Different countries and industries use different flow rate units, requiring accurate conversion')}</li>
            <li>{L('배관 설계, 밸브 선정, 펌프 용량 결정 시 단위 일치가 필수적입니다', 'Unit consistency is essential in piping design, valve selection, and pump sizing')}</li>
            <li>{L('외국 장비·도면의 유량 데이터를 국내 기준으로 환산해야 하는 경우가 많습니다', 'Converting flow data from foreign equipment/drawings to domestic standards is frequently needed')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L('값과 단위 입력', 'Enter value and unit'),
            L('카탈로그·도면에 적힌 숫자와 그 단위(GPM, LPM, CFM 등)를 그대로 선택합니다.', 'Pick the figure exactly as printed along with its unit.'),
          ],
          [
            L('필요한 대상 단위 확인', 'Read the target unit'),
            L('모든 단위가 동시에 환산되므로, 국내 설계서용 m³/h와 외국 장비용 GPM을 한 화면에서 비교할 수 있습니다.', 'Every unit updates simultaneously, letting you compare domestic m³/h against imported-equipment GPM on one screen.'),
          ],
          [
            L('자주 쓰는 관계 익히기', 'Memorize key relations'),
            L('1 GPM ≈ 0.2271 m³/h, 1 CFM ≈ 1.699 m³/h 두 개만 외워도 현장에서 즉님이 가능합니다.', 'Knowing 1 GPM ≈ 0.2271 m³/h and 1 CFM ≈ 1.699 m³/h answers most field questions instantly.'),
          ],
          [
            L('질량 유량이 필요하면', 'If you need mass flow'),
            L('결과에 유체 밀도를 직접 곱하세요(물 20℃ 기준 ρ ≈ 998 kg/m³). 가스는 조건별 밀도 확인이 필수입니다.', 'Multiply the result by fluid density yourself (water at 20 °C: ρ ≈ 998 kg/m³); gases demand condition-specific densities.'),
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
        {[
          {
            title: L('① 소방·급배수 배관: 5 L/s → ?', '① Plumbing branch: 5 L/s → ?'),
            body: L(
              '5 L/s는 0.005 m³/s이므로 m³/h로는 0.005 × 3600 = 18 m³/h, LPM으로는 300 L/min입니다. 국내 급배수 설계서(m³/h)와 해외 밸브 사양(LPM)을 맞출 때 바로 쓰이는 변환입니다.',
              'Five litres per second equal 0.005 m³/s, i.e. 18 m³/h and 300 L/min — the exact bridge between domestic hydraulic sheets and overseas valve datasheets.',
            ),
          },
          {
            title: L('② 미국산 펌프 카탈로그: 50 GPM → ?', '② Imported pump catalogue: 50 GPM → ?'),
            body: L(
              '1 GPM = 6.30902×10⁻⁵ m³/s이므로 50 GPM = 0.00315451 m³/s = 11.36 m³/h ≈ 189.3 L/min. 카탈로그가 요구 유량보다 큰지 판단할 때 이 값이 기준이 됩니다.',
              'At 6.30902×10⁻⁵ m³/s per gallon, 50 GPM is 0.00315451 m³/s — 11.36 m³/h or 189.3 L/min — the yardstick for catalogue adequacy checks.',
            ),
          },
          {
            title: L('③ 환기팬 용량: 200 CFM → ?', '③ Ventilation fan: 200 CFM → ?'),
            body: L(
              '200 × 0.000471947 = 0.0943894 m³/s → 339.8 m³/h. 예컨대 실 면적 40㎡, 천장고 2.5m(100m³) 사무실이라면 시간당 약 3.4회 환기에 해당합니다.',
              'Two hundred CFM is 0.0943894 m³/s — 339.8 m³/h. In a 100 m³ office that is about 3.4 air changes per hour.',
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
            {L('유량 변환 공식', 'Flow Rate Conversion Formulas')}
          </h4>
          <p className="text-sm mb-3">
            {L(
              '부피 유량은 Q = V / t로 정의되며, 질량 유량은 밀도를 곱하여 환산합니다.',
              'Volumetric flow rate is defined as Q = V/t, and mass flow rate is converted by multiplying by density.',
            )}
          </p>
          <div className="p-4 bg-muted rounded-lg flex flex-col items-center space-y-2">
            <BlockMath math="Q = \dfrac{V}{t}" />
            <BlockMath math="\dot{m} = \rho\,Q" />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong className="font-semibold text-green-600">Q</strong> — {L('부피 유량 [LPM, m³/h, GPM 등]', 'Volumetric flow rate [LPM, m³/h, GPM, etc.]')}</li>
          <li><strong className="font-semibold text-red-500">V</strong> — {L('유체 부피 [L, m³, gal]', 'Fluid volume [L, m³, gal]')}</li>
          <li><strong className="font-semibold text-blue-600">t</strong> — {L('시간 [min, h, s]', 'Time [min, h, s]')}</li>
          <li><strong className="font-semibold text-orange-600">ṁ</strong> — {L('질량 유량 [kg/s, lb/min]', 'Mass flow rate [kg/s, lb/min]')}</li>
          <li><strong className="font-semibold text-purple-600">ρ</strong> — {L('유체 밀도 [kg/m³, lb/ft³]', 'Fluid density [kg/m³, lb/ft³]')}</li>
        </ul>
        <div>
          <h4 className="font-bold text-base mb-2">{L('자주 쓰이는 환산 계수', 'Common conversion factors')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('1 LPM = 0.06 m³/h = 0.2642 GPM', '1 LPM = 0.06 m³/h = 0.2642 GPM')}</li>
            <li>{L('1 GPM = 3.785 LPM = 0.2271 m³/h', '1 GPM = 3.785 LPM = 0.2271 m³/h')}</li>
            <li>{L('1 m³/h = 16.667 LPM = 4.403 GPM', '1 m³/h = 16.667 LPM = 4.403 GPM')}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('실무 팁', 'Practical tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('질량 유량과 부피 유량을 혼동하지 마세요. 밀도를 반드시 고려하세요', 'Do not confuse mass flow rate and volumetric flow rate — always account for density')}</li>
            <li>{L('미국식 GPM(갤런)과 영국식 Imp GPM(임페리얼 갤런)은 다릅니다', 'US GPM (gallons) and Imperial GPM (Imp gal) are different')}</li>
            <li>{L('정상 유동 조건에서의 값이며, 비정상 유동(transient)에는 별도 해석이 필요합니다', 'Values are for steady-state flow; transient flow requires separate analysis')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('한계와 주의사항', 'Limitations & cautions')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('질량 유량 변환 시 유체 밀도를 별도로 입력해야 하며, 온도에 따라 밀도가 변합니다', 'Mass flow conversion requires separate density input, which changes with temperature')}</li>
            <li>{L('가스 유량은 압력·온도 조건에 따라 부피가 크게 달라지므로 표준 조건(Nm³/h)으로 환산이 필요합니다', 'Gas volume varies greatly with pressure/temperature, requiring conversion to standard conditions (Nm³/h)')}</li>
            <li>{L('비압축성 유체(액체)에 해당하는 변환이며, 가스의 경우 압축성까지 고려해야 합니다', 'Conversions apply to incompressible fluids (liquids); gases require compressibility considerations')}</li>
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
