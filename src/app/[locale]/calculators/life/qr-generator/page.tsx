import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./QrGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/qr-generator", "life", "qr-generator");
}



export default function QrGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.qrGenerator;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("QR 코드에 넣을 수 있는 텍스트 길이의 제한은?", "Is there a limit to QR code text length?"),
      a: L(
        "QR 코드 버전 40(최대) 기준 알파뉴메릭 약 4,296자, 한글 등 바이트 문자는 약 1,817자까지 인코딩 가능합니다. 이 계산기는 브라우저에서 canvas로 렌더링하므로, 텍스트가 길수록 QR 코드 모듈(점)이 조밀해져 스캔 어려움이 커집니다. 실사용에서는 100자 이내가 안전합니다.",
        "Version 40 QR supports ~4,296 alphanumeric or ~1,817 byte-mode characters. Longer text makes modules denser and harder to scan; keep under 100 characters for reliable scanning.",
      ),
    },
    {
      q: L("URL을 넣으면 자동으로 링크가 되나요?", "Does pasting a URL automatically create a clickable link?"),
      a: L(
        "아닙니다. QR 코드는 단순 텍스트 데이터를 저장합니다. 'https://example.com'이라는 텍스트를 넣으면 스캔한 기기의 QR 리더가 '이것은 URL이다'로 자동 인식해 링크로 열어줍니다. 다만 모든 QR 리더가 URL 인식을 잘하는 것은 아니므로, 중요한 링크는 스캔 테스트를 권장합니다.",
        "QR codes store plain text. Scanners auto-detect URLs and open them as links, but not all readers are reliable — test important links.",
      ),
    },
    {
      q: L("색상(전경·배경)을 바꿔도 스캔이 되나요?", "Can I change foreground/background colors and still scan?"),
      a: L(
        "전경과 배경의 대비가 충분하면 스캔 가능합니다. 일반적으로 어두운 전경(검정·남색) + 밝은 배경(흰색·노랑)이 가장 안전합니다. 다만 빨간색 전경은 일부 오래된 스캐너에서 인식률이 떨어질 수 있으므로, 피하는 것이 좋습니다.",
        "Sufficient contrast between foreground and background enables scanning. Dark foreground (black, navy) on light background (white, yellow) is safest. Red foreground may reduce recognition on older scanners.",
      ),
    },
    {
      q: L("인쇄 시 해상도는 어떻게 해야 하나요?", "What resolution should I use for printing?"),
      a: L(
        "최소 300dpi 이상을 권장합니다. QR 코드는 벡터 형식(SVG)으로 저장할 수 있으므로, 인쇄 시 선명도 저하 없이 원하는 크기로 확대 가능합니다. 캔버스에서 생성된 PNG는 해상도에 제한이 있으므로, 대형 인쇄물에는 SVG가 적합합니다.",
        "Minimum 300 dpi is recommended. Save as SVG for vector output that scales without quality loss. Canvas-rendered PNG has resolution limits; SVG is better for large-format prints.",
      ),
    },
    {
      q: L("오류 정정 기능은 어떻게 작동하나요?", "How does QR error correction work?"),
      a: L(
        "QR 코드는 Reed-Solomon 오류 정정을 사용해 코드의 일부가 손상되어도 스캔 가능합니다. 4단계(L: 7%, M: 15%, Q: 25%, H: 30%)가 있으며, 이 계산기는 중간 수준(M)을 기본으로 사용합니다. 로고를 중앙에 넣을 때는 H 레벨이 안전합니다.",
        "Reed-Solomon error correction allows scanning even if the code is partially damaged. Levels L(7%), M(15%), Q(25%), H(30%) exist. This tool uses M by default; use H when embedding a logo.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        ${t.descriptionContent}
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("텍스트 입력", "Enter text"),
            L("QR 코드에 담을 텍스트(URL, 메시지, 전화번호 등)를 입력합니다.", "Enter the text to encode (URL, message, phone number, etc.)."),
          ],
          [
            L("생성 버튼 클릭", "Click generate"),
            L("입력한 텍스트가 QR 코드 매트릭스로 변환되어 화면에 표시됩니다.", "The text is converted to a QR matrix and displayed on screen."),
          ],
          [
            L("저장·인쇄", "Save or print"),
            L("우클릭하여 이미지로 저장하거나, 브라우저 인쇄 기능으로 출력할 수 있습니다.", "Right-click to save as image, or use the browser print function."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — URL QR 코드", "Example 1 — URL QR code")}</p>
          <p>
            {L(
              "'https://example.com'을 입력하면 해당 URL을 인코딩한 QR 코드가 생성됩니다. 스마트폰 카메라로 스캔하면 바로 웹사이트로 연결됩니다. Wi-Fi 비밀번호 공유, 명함, 제품 안내서 등에 활용할 수 있습니다.",
              "Entering 'https://example.com' generates a QR encoding that URL. Scanning with a phone camera opens the website directly — useful for Wi-Fi passwords, business cards, product guides, etc.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 전화번호 연결", "Example 2 — Phone number link")}</p>
          <p>
            {L(
              "'tel:+821012345678'을 입력하면, 스캔 시 바로 전화 연결 화면으로 이동합니다. 오프라인 매장·전단지·포장에 부착하면 고객이 번호를 직접 입력할 필요 없이 전화를 걸 수 있습니다.",
              "Entering 'tel:+821012345678' makes the scan open the phone dialer — attach to offline stores, flyers, or packaging so customers can call without typing the number.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formulaContent}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tipsContent}</p>
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
