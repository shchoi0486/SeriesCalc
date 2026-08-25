import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./ColorPickerClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/color-picker", "life", "color-picker");
}



export default function ColorPickerPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.colorPicker;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("HEX, RGB, HSL 중 어떤 형식을 써야 하나요?", "Which format should I use — HEX, RGB, or HSL?"),
      a: L(
        "용도에 따라 다릅니다. CSS·웹 디자인에서는 HEX(#3b82f6)이 가장 보편적입니다. 색상·채도·명도를 직관적으로 조절해야 할 때는 HSL(hsl(217, 91%, 60%))이 편리합니다. RGB는 이미지 편집기나 디스플레이 제어에서 자주 쓰입니다. 어떤 형식이든 이 계산기에서 서로 변환할 수 있습니다.",
        "HEX is most common for CSS/web design. HSL is easier for adjusting hue/saturation/lightness intuitively. RGB is common in image editors. This tool converts between all three.",
      ),
    },
    {
      q: L("접근성 대비율은 어떻게 확인하나요?", "How do I check accessibility contrast ratio?"),
      a: L(
        "WCAG 2.1 기준 일반 텍스트는 전경-배경 대비율 4.5:1 이상, 큰 텍스트(18pt 이상)는 3:1 이상이어야 합니다. 이 도구에서 두 색상을 입력하면 대비율과 등급(AAA/AA/ Fail)을 자동 계산해 줍니다. 웹사이트·앱 디자인 시 반드시 확인하세요.",
        "WCAG 2.1 requires ≥4.5:1 for normal text, ≥3:1 for large text (18pt+). Enter two colors here to auto-compute the ratio and grade (AAA/AA/Fail). Always verify for web/app design.",
      ),
    },
    {
      q: L("색상blind 접근성 검사는 어떻게 하나요?", "How do I check color-blind accessibility?"),
      a: L(
        "이 도구는 기본적인 대비율만 확인합니다. 색각 이상(protanopia, deuteranopia, tritanopia) 시뮬레이션은 별도 도구(Coblis, Color Oracle 등)를 사용하세요. 대비율이 높으면 색각 이상에서도 구별 가능성이 높아지므로, 이 도구에서 먼저 대비를 확보하는 것이 좋은 1단계입니다.",
        "This tool only checks contrast ratio. For color-blind simulation, use dedicated tools (Coblis, Color Oracle). High contrast ratios improve distinguishability for color-vision deficiencies — securing contrast here is a good first step.",
      ),
    },
    {
      q: L("색상 온도(따뜻한색·차가운색)는 어떻게 조절하나요?", "How do I adjust color temperature (warm/cool)?"),
      a: L(
        "HSL 모드에서 색상(H) 값을 조절하면 됩니다. H 0~60(빨강~노랑)은 따뜻한색, H 180~270(청록~보라)은 차가운색 영역입니다. 웹사이트 톤·브랜드 아이덴티티를 맞출 때 이 축을 이해하면 좋습니다.",
        "Adjust the Hue (H) value in HSL mode. H 0–60 (red–yellow) is warm; H 180–270 (cyan–purple) is cool. Understanding this axis helps match site tone or brand identity.",
      ),
    },
    {
      q: L("생성된 색상 값을 CSS에 바로 쓸 수 있나요?", "Can I use the generated color values directly in CSS?"),
      a: L(
        "네. HEX(#3b82f6), RGB(rgb(59,130,246)), HSL(hsl(217,91%,60%)) 모두 CSS 속성에 그대로 붙여넣을 수 있습니다. 복사 버튼으로 원하는 형식을 클립보드에 복사한 뒤, CSS 파일이나 스타일 시트에 바로 사용하세요.",
        "Yes. HEX, RGB, and HSL values copy directly into CSS properties. Use the copy button for clipboard convenience.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">${t.descriptionContent.heading}</p>
        <p>${t.descriptionContent.p1}</p>
        <p>${t.descriptionContent.p2}</p>
        <p>${t.descriptionContent.p3}</p>
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("색상 선택", "Pick a color"),
            L("색상 피커를 클릭하거나, HEX/RGB 값을 직접 입력합니다.", "Click the color picker or enter HEX/RGB values directly."),
          ],
          [
            L("변환 형식 확인", "Check converted formats"),
            L("HEX, RGB, HSL 세 가지 형식이 동시에 표시됩니다.", "HEX, RGB, and HSL formats are shown simultaneously."),
          ],
          [
            L("대비율 검사", "Check contrast ratio"),
            L("전경색·배경색을 지정하면 WCAG 기준 대비율과 등급이 자동 계산됩니다.", "Specify foreground and background colors for auto-computed WCAG contrast ratio and grade."),
          ],
          [
            L("복사·사용", "Copy and use"),
            L("원하는 형식의 복사 버튼을 눌러 CSS·디자인 파일에 바로 사용하세요.", "Click the copy button for your preferred format to use in CSS or design files."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 브랜드 메인 컬러", "Example 1 — Brand primary color")}</p>
          <p>
            {L(
              "HEX #3b82f6 (파란색) → RGB(59, 130, 246) → HSL(217, 91%, 60%). 흰색(#ffffff) 배경 대비율 = 4.63:1 → AA 등급(일반 텍스트 4.5:1 기준 충족). 이 색상을 버튼·링크 메인 컬러로 사용할 수 있습니다.",
              "HEX #3b82f6 → RGB(59,130,246) → HSL(217,91%,60%). Against white (#ffffff): contrast 4.63:1 → AA grade. Suitable as button/link primary color.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 어두운 테마 배경색", "Example 2 — Dark theme background")}</p>
          <p>
            {L(
              "HEX #1e293b (남색) → RGB(30, 41, 59) → HSL(215, 32%, 17%). 흰색 텍스트(#ffffff)와 대비율 = 12.7:1 → AAA 등급. 어두운 배경에 밝은 텍스트를 쓸 때 이 대비율을 확보하면 접근성이 보장됩니다.",
              "HEX #1e293b → RGB(30,41,59) → HSL(215,32%,17%). Against white: 12.7:1 → AAA. Secure this contrast for dark-theme readability.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formula.hexToRgbDesc}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tips.heading}</p>
      </div>
    `,
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
