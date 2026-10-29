import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "미터법 vs 야드파운드법: 단위계 완전 가이드" : "Metric vs Imperial: The Complete Unit-System Guide",
    description: isKo
      ? "인치·피트·파운드·갤런의 정의와 미터법 환산, 자주 틀리는 포인트와 빠른 변환 요령, 자주 쓰는 환산표를 정리했습니다."
      : "Inches, feet, pounds and gallons defined and converted to metric, plus common pitfalls, fast tricks and a quick conversion table.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/conversion`;

  const faq = [
    {
      q: L("1피트는 몇 cm인가요?", "How many centimeters are in a foot?"),
      a: L(
        "1피트는 12인치이므로 12 × 2.54 = 30.48cm입니다. 키 6피트는 약 182.9cm가 됩니다. 길이 변환기에 피트 값을 넣으면 cm·m·인치를 한 번에 확인할 수 있습니다.",
        "One foot is 12 inches, so 12 × 2.54 = 30.48 cm. A 6-foot height is about 182.9 cm. Enter feet in the length converter to see cm, m and inches together.",
      ),
    },
    {
      q: L("온도 °F를 °C로 바꾸는 공식은?", "What is the °F to °C formula?"),
      a: L(
        "(°F − 32) × 5/9가 공식입니다. 체온 98.6°F는 37°C가 됩니다. 온도처럼 영점이 다른 단위는 단순 비례가 아니라 덧셈·뺄셈이 포함되므로 공식 확인이 필수입니다.",
        "The formula is (°F − 32) × 5/9. A body temperature of 98.6°F equals 37°C. Units with different zero points need addition and subtraction, not just scaling — always check the formula.",
      ),
    },
    {
      q: L("갤런은 왜 두 종류인가요?", "Why are there two kinds of gallons?"),
      a: L(
        "미국 갤런(약 3.785L)과 영국 갤런(약 4.546L)이 다릅니다. 자동차 연비·연료 규격처럼 출처가 미국인지 영국·유럽인지 먼저 확인하고 부피 변환기에서 단위를 고르세요.",
        "The US gallon (about 3.785 L) differs from the UK gallon (about 4.546 L). For fuel economy or fuel specs, check whether the source is American or British/European first, then pick the unit in the volume converter.",
      ),
    },
    {
      q: L("면적·부피 변환에서 자주 틀리는 부분은?", "Where do area/volume conversions go wrong?"),
      a: L(
        "1ft²는 30.48cm²가 아니라 929cm²입니다. 단위 변환 시 차원을 함께 올려야 합니다 (1ft = 30.48cm → 1ft² = 30.48² cm²). 부피도 마찬가지로 세제곱입니다.",
        "1 ft² is 929 cm², not 30.48 cm². You must raise the dimension (1 ft = 30.48 cm → 1 ft² = 30.48² cm²). Volumes cube the factor too.",
      ),
    },
    {
      q: L("톤의 세 종류는 무엇인가요?", "What are the three kinds of tons?"),
      a: L(
        "미터톤(1000kg), 미국톤(약 907kg, short ton), 영국톤(약 1016kg, long ton)이 다릅니다. 무역·해운 문서에서는 어느 톤인지 반드시 확인하세요.",
        "Metric ton (1000 kg), US short ton (about 907 kg) and UK long ton (about 1016 kg) differ. In trade and shipping documents, always confirm which ton is meant.",
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
      <ProsePage title={L("미터법 vs 야드파운드법 완전 가이드", "Metric vs Imperial: The Complete Guide")}>
        <ProseSection title={L("두 단위계의 기원", "Origins of the two systems")}>
          <p>
            {L(
              "미터법은 길이·질량을 10진수로 통일한 국제 표준(SI)이고, 야드파운드법은 미국·영국 등에서 관습적으로 이어져 온 단위계입니다. 과학·공학 문서는 미터법이 원칙이지만, 미국발 제품 규격·레시피·부동산 면적은 야드파운드법이 여전히 쓰이므로 두 체계를 오가는 능력이 필요합니다.",
              "Metric is the decimal international standard (SI) for length and mass; imperial units persist by custom in the US, UK and elsewhere. Science and engineering documents use metric by rule, yet US product specs, recipes and real-estate areas still run imperial — so converting between the two is a practical necessity.",
            )}
          </p>
          <p>
            <Link href={`${base}/unit-converter`} className="text-primary underline">{L("종합 단위 변환기", "All-in-One Unit Converter")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("외워두면 좋은 기준값", "Reference values worth memorizing")}>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("분야", "Category")}</th>
                  <th className="border p-2 text-left">{L("환산", "Conversion")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">{L("길이", "Length")}</td><td className="border p-2">1 in = 2.54 cm, 1 ft = 30.48 cm, 1 mi ≈ 1.609 km</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("무게", "Weight")}</td><td className="border p-2">1 lb ≈ 0.454 kg, 1 oz ≈ 28.35 g</td></tr>
                <tr><td className="border p-2">{L("부피", "Volume")}</td><td className="border p-2">1 US gal ≈ 3.785 L, 1 cup ≈ 236.6 mL (US)</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("온도", "Temperature")}</td><td className="border p-2">32°F = 0°C, 212°F = 100°C</td></tr>
                <tr><td className="border p-2">{L("면적", "Area")}</td><td className="border p-2">1 ft² ≈ 0.0929 m², 1 acre ≈ 4047 m²</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">{L("속도", "Speed")}</td><td className="border p-2">1 mph ≈ 1.609 km/h, 1 kn ≈ 1.852 km/h</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <Link href={`${base}/distance-converter`} className="text-primary underline">{L("길이 변환기", "Length Converter")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/weight-converter`} className="text-primary underline">{L("무게 변환기", "Weight Converter")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/volume-converter`} className="text-primary underline">{L("부피 변환기", "Volume Converter")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("자주 틀리는 포인트", "Where people go wrong")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("면적·부피 제곱/세제곱: 1ft²는 929cm²이지 30.48cm²가 아닙니다. 단위 변환 시 차원을 함께 올리세요.", "Area and volume powers: 1 ft² is 929 cm², not 30.48 cm². Raise the dimension together when converting.")}</li>
            <li>{L("파운드 질량 vs 힘: 파운드(lb)는 질량, 파운드힘(lbf)은 힘입니다. 공학 계산에서 구분하세요.", "Pound mass vs force: lb is mass, lbf is force — keep them apart in engineering math.")}</li>
            <li>{L("톤의 세 종류: 미터톤(1000kg)·미국톤(약 907kg)·영국톤(약 1016kg)이 다릅니다.", "Three kinds of tons: metric (1000 kg), US (about 907 kg) and UK (about 1016 kg) differ.")}</li>
            <li>{L("온도 영점: °F↔°C는 비례가 아니라 오프셋이 있는 공식입니다. (°F−32)×5/9.", "Temperature zero: °F↔°C uses an offset formula, not just scaling: (°F−32)×5/9.")}</li>
            <li>{L("UK vs US 갤런: 영국 갤런(4.546L)은 미국 갤런(3.785L)보다 20% 큽니다.", "UK vs US gallon: the UK gallon (4.546 L) is 20% larger than the US gallon (3.785 L).")}</li>
          </ul>
          <p>
            <Link href={`${base}/data-size-converter`} className="text-primary underline">{L("데이터 크기 변환기", "Data Size Converter")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/speed-converter`} className="text-primary underline">{L("속도 변환기", "Speed Converter")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/power-converter`} className="text-primary underline">{L("전력 변환기", "Power Converter")}</Link>
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
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 측정·규격 자문이 아닙니다. 실제 규격 적용은 해당 분야의 표준 문서를 따르세요.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute measurement or standards advice. Apply the relevant standard for your field.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
