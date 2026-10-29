import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "펌프 선정 가이드: 유량·양정·동력 읽는 법" : "Pump Selection Guide: How to Read Flow, Head and Power",
    description: isKo
      ? "필요 유량과 전양정 구하는 법, 펌프 동력·효율 해석과 캐비테이션 회피 선정 순서를 정리했습니다."
      : "How to find required flow and total head, interpret pump power and efficiency, and select against cavitation.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/engineering`;

  const faq = [
    {
      q: L("전양정은 어떻게 구하나요?", "How do I find total head?"),
      a: L(
        "실양정(높이 차) + 흡입·토출 배관의 마찰 손실 + 필요 말단 압력을 모두 더합니다. 배관 마찰 계산기로 손실 수두를 구한 뒤 펌프 동력 계산기에 유량과 함께 입력하세요.",
        "Add static lift (elevation difference) + suction and discharge friction losses + required end pressure. Get loss head from the pipe friction calculator, then enter it with flow into the pump power calculator.",
      ),
    },
    {
      q: L("펌프가 크면 클수록 좋은가요?", "Is a bigger pump always better?"),
      a: L(
        "아닙니다. 과대 선정하면 최고효율점을 벗어나 효율이 떨어지고, 밸브를 조여 운전하면 에너지 낭비와 캐비테이션 위험이 커집니다. 필요점 대비 10~15% 여유가 일반적인 선정 기준입니다.",
        "No. Oversizing pushes operation off the best-efficiency point, wastes energy through throttled valves and raises cavitation risk. A 10–15% margin over the duty point is the usual rule.",
      ),
    },
    {
      q: L("수동력과 축동력은 무엇이 다른가요?", "What is the difference between hydraulic and shaft power?"),
      a: L(
        "수동력은 물에 실제로 전달되는 동력(ρgQH)이고, 축동력은 펌프 효율을 나눈 모터가 내야 하는 동력입니다. 모터 정격은 축동력에 여유율(10~25%)을 더해 선정합니다.",
        "Hydraulic power (ρgQH) is what the water actually receives; shaft power divides by pump efficiency to give what the motor must deliver. Size the motor rating with a 10–25% margin over shaft power.",
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
      <ProsePage title={L("펌프 선정 완전 가이드", "The Complete Pump Selection Guide")}>
        <ProseSection title={L("선정 순서 4단계", "Selection in four steps")}>
          <ol className="list-decimal pl-5 space-y-2">
            <li>{L("필요 유량 확정: 사용처의 최대 동시 사용량을 기준으로 정합니다.", "Fix required flow from peak simultaneous demand.")}</li>
            <li>{L("전양정 계산: 실양정 + 배관 마찰 손실 + 말단 필요 압력.", "Compute total head: static lift + pipe friction losses + required end pressure.")}</li>
            <li>{L("NPSH 검토: NPSHa가 NPSHr을 충분히 웃도는지 확인합니다.", "Check NPSH: confirm NPSHa comfortably exceeds NPSHr.")}</li>
            <li>{L("동력·효율 확정: 수동력→축동력→모터 정격 순으로 올림합니다.", "Fix power and efficiency: hydraulic → shaft → motor rating, rounding up.")}</li>
          </ol>
          <p>
            <Link href={`${base}/pump-power`} className="text-primary underline">{L("펌프 동력 계산기", "Pump Power Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/pipe-friction`} className="text-primary underline">{L("배관 마찰 계산기", "Pipe Friction Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/npsh`} className="text-primary underline">NPSH {L("계산기", "Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("성능곡선 읽는 법", "How to read performance curves")}>
          <p>
            {L(
              "펌프 카탈로그의 성능곡선은 유량(Q)-양정(H)-효율(η)-동력(P)-NPSHr의 관계를 보여줍니다. 선정점은 최고효율점(BEP)의 80~110% 구간에 들어가는 것이 이상적이며, 이 구간을 벗어난 장시간 운전은 진동·소음·수명 단축의 원인이 됩니다.",
              "Catalog curves show flow (Q), head (H), efficiency (η), power (P) and NPSHr together. The duty point should ideally sit at 80–110% of the best-efficiency point (BEP); long operation outside this band causes vibration, noise and shorter life.",
            )}
          </p>
          <p>
            {L(
              "병렬·직렬 운전, 인버터(회전수 제어)를 쓰면 유량 변화에 대응할 수 있습니다. 상사법칙으로 회전수 변경 시 유량·양정·동력이 어떻게 바뀌는지 펌프 상사법칙 계산기로 미리 확인하세요.",
              "Parallel or series operation and inverter (speed) control handle flow variation. Preview how flow, head and power shift with speed via the affinity laws — check with the pump affinity calculator.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("자주 하는 실수", "Common mistakes")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("마찰 손실 누락: 배관이 길수록 전양정의 절반 이상이 마찰일 수 있습니다.", "Ignoring friction losses: on long runs, friction can exceed half of total head.")}</li>
            <li>{L("단위 혼동: m³/h와 L/min, mAq와 kPa를 섞어 입력하면 선정이 통째로 틀어집니다.", "Mixing units: confusing m³/h with L/min or mAq with kPa ruins the whole selection.")}</li>
            <li>{L("여유 과다: 2배 펌프는 2배 전기요금이 아니라 그 이상이 될 수 있습니다.", "Excessive margin: a 2× pump can cost far more than 2× in electricity.")}</li>
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
