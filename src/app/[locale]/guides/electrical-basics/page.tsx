import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "전기 기초 가이드: 옴의 법칙부터 전압강하·전선 굵기까지" : "Electrical Basics: Ohm's Law, Voltage Drop and Cable Sizing",
    description: isKo
      ? "옴의 법칙과 전력, 전압강하 허용치, 전선 굵기 선정과 3상 전력 계산을 실무 순서로 정리했습니다."
      : "Ohm's law and power, allowable voltage drop, cable sizing and three-phase power — in practical order.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/engineering`;

  const faq = [
    {
      q: L("전선 굵기는 전류만 보고 정하면 되나요?", "Can I size cable by current alone?"),
      a: L(
        "아닙니다. 허용전류(발열)와 전압강하(거리)를 둘 다 만족해야 합니다. 짧은 배선은 허용전류가 지배하지만, 수십 미터 이상 길어지면 전압강하가 더 엄격한 제약이 됩니다. 두 계산기를 모두 돌려 큰 값으로 선정하세요.",
        "No — you must satisfy both ampacity (heating) and voltage drop (distance). Ampacity governs short runs, but beyond tens of meters voltage drop becomes the tighter constraint. Run both calculators and take the larger result.",
      ),
    },
    {
      q: L("전압강하 계산에서 길이를 왜 두 배로 잡나요?", "Why double the length in voltage-drop math?"),
      a: L(
        "전류가 전원에서 부하로 갔다가 다시 돌아오기 때문입니다. 왕복 경로 전체가 저항에 포함되므로 케이블 길이의 2배를 적용합니다. 3상에서는 중성선이 귀환을 담당해 √3 계수 형태로 계산합니다.",
        "Because current travels to the load and back. The full loop contributes resistance, so you use twice the cable length. In three-phase circuits the return path is handled differently, giving the familiar √3 form.",
      ),
    },
    {
      q: L("역률을 개선하면 어떤 이득이 있나요?", "What do I gain by improving power factor?"),
      a: L(
        "같은 유효 전력을 더 적은 전류로 공급할 수 있어 배선 손실(I²R)과 전압강하가 줄고, 여유 용량이 생깁니다. 일부 요금제는 역률이 낮으면 할증이 붙으므로 전기요금에도 직접 영향이 있습니다.",
        "You deliver the same real power with less current, cutting I²R losses and voltage drop while freeing capacity. Some tariffs add a low-power-factor penalty, so it hits the bill directly too.",
      ),
    },
    {
      q: L("단상과 3상은 무엇이 다른가요?", "How do single-phase and three-phase differ?"),
      a: L(
        "단상은 P = V·I·cosθ, 3상은 P = √3·V_L·I_L·cosθ입니다. 같은 전류라면 3상이 약 1.73배 많은 전력을 전송하며, 회전자계를 만들어 유도전동기를 자체 기동할 수 있다는 점도 큰 차이입니다.",
        "Single-phase is P = V·I·cosθ; three-phase is P = √3·V_L·I_L·cosθ. At the same current, three-phase carries about 1.73× the power, and it produces a rotating field that starts induction motors by itself.",
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
      <ProsePage title={L("전기 기초 완전 가이드", "The Complete Electrical Basics Guide")}>
        <ProseSection title={L("옴의 법칙과 전력", "Ohm's law and power")}>
          <p>
            {L(
              "V = I·R, P = V·I. 이 두 식이 전기 계산의 출발점입니다. 네 값(V·I·R·P) 중 두 개만 알면 나머지가 모두 정해지므로, 계산기에 세 개를 넣으면 서로 모순되는 값이 나올 수 있습니다. 두 개만 남기고 계산하세요.",
              "V = I·R and P = V·I are the starting point. Any two of the four values (V, I, R, P) determine the rest — which is why entering three in a calculator can produce contradictions. Leave exactly two and solve.",
            )}
          </p>
          <p>
            {L(
              "예를 들어 220V 회로에 10Ω 부하가 연결되면 전류는 22A, 전력은 4,840W입니다. 여기에 20m 케이블을 쓰면 케이블 자체 저항이 더해져 실제 부하 전압은 조금 낮아집니다. 이 차이가 전압강하입니다.",
              "For a 10 Ω load on a 220 V circuit, current is 22 A and power 4,840 W. Add a 20 m cable and its own resistance drops the voltage actually reaching the load — that difference is voltage drop.",
            )}
          </p>
          <p>
            <Link href={`${base}/ohms-law`} className="text-primary underline">{L("옴의 법칙 계산기", "Ohm's Law Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/ac-power`} className="text-primary underline">{L("교류 전력 계산기", "AC Power Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("전압강하와 전선 굵기", "Voltage drop and cable sizing")}>
          <p>
            {L(
              "전압강하는 ΔV = 2·L·I·R_per_m로 계산합니다(왕복). 실무 허용치는 조명·일반 회로 3%, 동력 회로 5% 수준이며, 설비 기준이 별도로 있으면 그쪽을 따릅니다. 허용치를 넘으면 기기가 오작동하고 모터는 기동 토크가 부족해집니다.",
              "Voltage drop is ΔV = 2·L·I·R_per_m (the round trip). Common practice allows 3% for lighting and general circuits and 5% for motor circuits, unless a site standard says otherwise. Exceed it and equipment misbehaves, while motors lose starting torque.",
            )}
          </p>
          <p>
            {L(
              "전선 굵기를 한 단계 키우면 저항이 단면적에 반비례해 줄어들므로 강하도 함께 줄어듭니다. 다만 굵기는 비용·포설 공간·단자 크기와 맞물리므로, 허용전류와 전압강하 두 조건을 모두 만족하는 가장 작은 규격을 고르는 것이 정석입니다.",
              "Stepping up one cable size cuts resistance in inverse proportion to cross-section, so drop falls too. But size interacts with cost, installation space and terminal ratings — the standard approach is the smallest conductor that satisfies both ampacity and voltage drop.",
            )}
          </p>
          <p>
            <Link href={`${base}/voltage-drop`} className="text-primary underline">{L("전압강하 계산기", "Voltage Drop Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/wire-gauge`} className="text-primary underline">{L("전선 굵기(AWG) 계산기", "Wire Gauge (AWG) Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("3상과 역률", "Three-phase and power factor")}>
          <p>
            {L(
              "3상 전력은 √3·V_L·I_L·cosθ입니다. √3은 각 상이 120°씩 어긋난 위상이 합쳐지며 생기는 계수입니다. 역률 cosθ가 1에 가까울수록 같은 전류로 더 많은 일을 할 수 있으므로, 유도전동기·용접기처럼 역률이 낮은 부하는 콘덴서로 보상합니다.",
              "Three-phase power is √3·V_L·I_L·cosθ, where √3 comes from combining phases 120° apart. The closer cosθ is to 1, the more work the same current does, so low-power-factor loads like induction motors and welders are compensated with capacitors.",
            )}
          </p>
          <p>
            {L(
              "무효전력은 사라지는 것이 아니라 전원과 부하 사이를 왕복합니다. 일을 하지 않지만 발전·변압·배선 용량을 차지하므로, 역률 개선은 단순한 요금 절감이 아니라 설비 여유 확보 수단입니다.",
              "Reactive power does not vanish — it oscillates between source and load. It performs no work yet occupies generation, transformer and wiring capacity, so power-factor correction is about freeing equipment capacity, not just trimming bills.",
            )}
          </p>
          <p>
            <Link href={`${base}/rc-circuit`} className="text-primary underline">{L("RC 회로 계산기", "RC Circuit Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("안전 체크리스트", "Safety checklist")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("차단기 정격은 부하 전류보다 크고, 케이블 허용전류보다 작아야 보호가 성립합니다.", "Breaker rating must exceed load current but stay below cable ampacity for protection to work.")}</li>
            <li>{L("접지와 누전차단기는 계산으로 대체할 수 없습니다. 시공 기준을 따르세요.", "Grounding and RCDs cannot be replaced by calculation — follow installation codes.")}</li>
            <li>{L("계산 결과는 설계 1차 검토용입니다. 실제 시공은 자격자의 확인을 받으세요.", "Results are for first-pass design review; actual installation requires a qualified person's sign-off.")}</li>
          </ul>
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
