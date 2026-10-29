import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "NPSH·캐비테이션 가이드: 펌프가 망가지는 이유와 방지법" : "NPSH & Cavitation Guide: Why Pumps Fail and How to Prevent It",
    description: isKo
      ? "NPSHa·NPSHr의 의미, 캐비테이션 발생 원리와 소음·진동·침식 방지 대책을 계산 예시와 함께 정리했습니다. NPSH 공식과 여유 기준 포함."
      : "NPSHa vs NPSHr, why cavitation happens, and how to prevent noise, vibration and erosion — with formulas, margins and examples.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/engineering`;

  const faq = [
    {
      q: L("NPSHa는 얼마나 여유 있게 잡아야 하나요?", "How much NPSH margin is enough?"),
      a: L(
        "실무에서는 NPSHa ≥ NPSHr × 1.3 또는 0.5~1.0m 이상의 여유를 권장합니다. 고온·휘발성 유체일수록 여유를 크게 잡으세요. NPSH 계산기에서 탱크 위치·증기압·마찰 손실을 입력하면 바로 확인할 수 있습니다.",
        "Practice recommends NPSHa ≥ 1.3 × NPSHr, or at least 0.5–1.0 m of margin — more for hot or volatile fluids. Enter tank position, vapor pressure and friction losses in the NPSH calculator to verify.",
      ),
    },
    {
      q: L("캐비테이션이 일어나는 소리는 어떤가요?", "What does cavitation sound like?"),
      a: L(
        "자갈을 펌프 안에 넣고 돌리는 듯한 '그르륵' 소음과 진동이 대표 증상입니다. 효율이 떨어지고 임펠러 표면에 벌집 모양 침식이 생기면 이미 진행된 상태이므로 소음 단계에서 조치해야 합니다.",
        "A rattling noise like gravel inside the pump, plus vibration, is the classic symptom. Falling efficiency and honeycomb erosion on the impeller mean it is already advanced — act at the noise stage.",
      ),
    },
    {
      q: L("흡입 배관을 키우면 왜 도움이 되나요?", "Why does a bigger suction pipe help?"),
      a: L(
        "마찰 손실은 유속의 약 2제곱에 비례하고, 관경을 키우면 유속이 급격히 낮아져 손실 수두 Hl이 줄어 NPSHa가 커집니다. 배관 마찰 계산기에서 관경별 손실을 비교해 보세요.",
        "Friction loss scales roughly with velocity squared, so a larger bore drops velocity sharply, cutting head loss Hl and raising NPSHa. Compare diameters in the pipe friction calculator.",
      ),
    },
    {
      q: L("NPSHa와 NPSHr이 같으면 안전한가요?", "Is it safe when NPSHa equals NPSHr?"),
      a: L(
        "아닙니다. 0 여유는 캐비테이션 발생 직전 상태입니다. 실무에서는 최소 0.5~1.0m, 고온·휘발성 유체는 1.3배 이상의 여유를 권장합니다.",
        "No — zero margin means cavitation is imminent. Practice recommends at least 0.5–1.0 m, or 1.3× or more for hot or volatile fluids.",
      ),
    },
    {
      q: L("증기압은 어디서 구하나요?", "Where do I get vapor pressure?"),
      a: L(
        "물은 온도별 증기압 표(또는 Antoine 식)로 구하고, 기타 유체는 제조사 데이터시트를 사용합니다. 물 밀도 계산기 페이지의 참고값도 활용할 수 있습니다.",
        "For water, use vapor-pressure tables by temperature (or the Antoine equation); for other fluids, use manufacturer datasheets. The water density calculator page lists useful reference values.",
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
      <ProsePage title={L("NPSH·캐비테이션 완전 가이드", "The Complete NPSH & Cavitation Guide")}>
        <ProseSection title={L("NPSH란 무엇인가", "What NPSH is")}>
          <p>
            {L(
              "NPSH(순흡입수두)는 펌프 입구에서 액체가 기화하지 않고 빨려 들어갈 수 있는 압력 수두의 여유입니다. 시스템이 제공하는 NPSHa(Available)와 펌프가 요구하는 NPSHr(Required) 두 값이 핵심이며, NPSHa가 NPSHr보다 커야 안전합니다.",
              "NPSH (net positive suction head) is the pressure-head margin that lets liquid enter the pump without vaporizing. Two values matter: NPSHa (Available, provided by the system) and NPSHr (Required, demanded by the pump). Safety requires NPSHa above NPSHr.",
            )}
          </p>
          <p>
            {L(
              "NPSH 계산식: NPSHa = (P₀ − Pᵥ)/ρg + hₛ − hₗ",
              "NPSH formula: NPSHa = (P₀ − Pᵥ)/ρg + hₛ − hₗ",
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>P₀</strong> — {L("흡입 탱크 표면 압력 (대기압 또는 가압)", "Pressure on the suction-tank surface (atmospheric or pressurized)")}</li>
            <li><strong>Pᵥ</strong> — {L("액체의 증기압 (온도 의존)", "Fluid vapor pressure (temperature-dependent)")}</li>
            <li><strong>ρg</strong> — {L("액체의 비중량", "Specific weight of the fluid")}</li>
            <li><strong>hₛ</strong> — {L("액면에서 펌프 중심까지의 높이 (양수=양정)", "Elevation from liquid surface to pump center (positive = lift)")}</li>
            <li><strong>hₗ</strong> — {L("흡입 배관의 마찰·국부 손실 수두", "Friction and minor losses in the suction line")}</li>
          </ul>
          <p>
            <Link href={`${base}/npsh`} className="text-primary underline">NPSH {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/pipe-friction`} className="text-primary underline">{L("배관 마찰 계산기", "Pipe Friction Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/pump-power`} className="text-primary underline">{L("펌프 동력 계산기", "Pump Power Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("캐비테이션 발생 원리", "How cavitation happens")}>
          <p>
            {L(
              "흡입 측 압력이 해당 온도의 증기압 아래로 떨어지면 액체 속에 기포가 생겼다가 임펠러에서 압력이 회복되며 격렬하게 붕괴합니다. 이 충격이 반복되면 소음·진동·효율 저하를 넘어 임펠러와 케이싱이 패이고 결국 파손됩니다.",
              "When suction pressure falls below the fluid's vapor pressure at that temperature, bubbles form and then collapse violently as pressure recovers in the impeller. Repeated collapse causes noise, vibration and efficiency loss — and eventually pits and destroys the impeller and casing.",
            )}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("원인", "Cause")}</th>
                  <th className="border p-2 text-left">{L("영향", "Effect on NPSHa")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("고온 유체", "Hot fluid")}</td><td className="border p-2">{L("증기압 상승 → NPSHa 감소", "Vapor pressure rises → NPSHa drops")}</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("흡입 양정 과다", "Excess suction lift")}</td><td className="border p-2">{L("위치 수두 마이너스 → NPSHa 감소", "Position head negative → NPSHa drops")}</td></tr>
                <tr><td className="border p-2">{L("흡입 배관 손실", "Suction-line loss")}</td><td className="border p-2">{L("마찰 손실 증가 → NPSHa 감소", "Friction loss rises → NPSHa drops")}</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("흡입 탱크 저압", "Low tank pressure")}</td><td className="border p-2">{L("P₀ 감소 → NPSHa 감소", "P₀ drops → NPSHa drops")}</td></tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>{L("고온 유체: 온도가 오르면 증기압이 급상승해 NPSHa가 줄어듭니다.", "Hot fluids: higher temperature sharply raises vapor pressure, shrinking NPSHa.")}</li>
            <li>{L("흡입 양정 과다: 펌프보다 액면이 낮으면 위치 수두가 마이너스로 작용합니다.", "Excess suction lift: a liquid level below the pump subtracts position head.")}</li>
            <li>{L("흡입 배관 손실: 가늘고 긴 배관, 밸브·엘보가 많은 배치는 Hl을 키웁니다.", "Suction-line losses: thin, long runs with many valves and elbows raise Hl.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("방지 대책 4가지", "Four prevention measures")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("펌프를 낮추거나 탱크를 올리세요: 액면을 펌프 위에 두는 것만으로 NPSHa가 수 미터 늘어납니다.", "Lower the pump or raise the tank: keeping the liquid level above the pump alone adds meters of NPSHa.")}</li>
            <li>{L("흡입관을 키우세요: 관경 확대가 마찰 손실 감소에 가장 확실합니다.", "Enlarge the suction pipe: bigger bores are the surest way to cut friction loss.")}</li>
            <li>{L("불필요한 밸브·굴곡 제거: 흡입 측 저항 요소를 최소화하세요.", "Remove needless valves and bends: minimize suction-side resistance elements.")}</li>
            <li>{L("여유 있게 선정: NPSHr이 작은 펌프를 고르고 운전점은 최고효율점 근처로 맞추세요.", "Select with margin: pick pumps with small NPSHr and operate near the best-efficiency point.")}</li>
          </ul>
          <p>
            <Link href={`${base}/water-density`} className="text-primary underline">{L("물 밀도 계산기", "Water Density Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/pump-affinity`} className="text-primary underline">{L("펌프 상사법칙 계산기", "Pump Affinity Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i} className="rounded-xl border p-4">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 설계·시공 자문이 아닙니다. 실제 선정은 제조사 카탈로그와 현장 조건에 따릅니다.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute design or construction advice. Actual selection follows manufacturer catalogs and site conditions.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
