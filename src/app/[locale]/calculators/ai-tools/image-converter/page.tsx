import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./ImageConverterClient";
import FaqItem from "@/components/calculators/FaqItem";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/image-converter", "ai-tools", "image-converter");
}

export default function ImageConverterPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "어떤 이미지 형식을 지원하나요?" : "Which image formats are supported?",
      a: isKo
        ? "PNG, JPEG, WebP 형식 간 변환을 지원합니다. PNG는 무손실·투명 배경, JPEG는 손실 압축으로 사진에 적합하며, WebP는 손실/무손실을 모두 지원해 같은 화질에서 JPEG보다 약 25~35% 더 작습니다. 브라우저에서 지원하는 다른 형식도 내부적으로 처리됩니다."
        : "The converter supports PNG, JPEG, and WebP. PNG is lossless with transparency, JPEG uses lossy compression for photos, and WebP supports both lossy and lossless modes at roughly 25–35% smaller than JPEG at equal quality. Other browser-supported formats are also handled internally.",
    },
    {
      q: isKo ? "품질 설정과 파일 크기는 어떤 관계인가요?" : "How does quality relate to file size?",
      a: isKo
        ? "JPEG와 WebP의 손실 모드에서는 품질 값이 높을수록 파일이 커지고, 낮을수록 작아집니다. 예를 들어 품질 90에서 85로 낮추면 화질 차이는 거의 느껴지지 않으면서 크기를 크게 줄일 수 있습니다. 사진에는 80~90 품질이 화질과 용량의 좋은 균형점입니다."
        : "In lossy JPEG and WebP, higher quality values produce larger files and lower values produce smaller ones. Dropping from quality 90 to 85, for example, noticeably shrinks size with little visible difference. A 80–90 quality range is a good balance for photos.",
    },
    {
      q: isKo ? "브라우저에서의 변환은 개인정보에 안전한가요?" : "Is browser-side conversion private?",
      a: isKo
        ? "네. 모든 변환은 사용자의 브라우저 안에서만 로컬로 처리되며, 이미지가 서버로 업로드되거나 외부로 전송되지 않습니다. 민감한 문서, 개인 사진, 서명 이미지 등을 안심하고 변환할 수 있습니다."
        : "Yes. All conversion happens locally within your browser, and images are never uploaded to or transmitted to any server. You can safely convert sensitive documents, personal photos, or signature images.",
    },
    {
      q: isKo ? "매우 큰 이미지도 변환할 수 있나요?" : "Can I convert very large images?",
      a: isKo
        ? "가능하지만 브라우저 메모리와 기기 성능의 영향을 받습니다. 매우 큰 이미지는 처리 속도가 느려지고 메모리 부족으로 중단될 수 있습니다. 이 경우 미리 해상도를 낮추거나, 긴 변이 몇 천 픽셀 이하가 되도록 축소한 뒤 변환하는 것을 권장합니다."
        : "Yes, but it depends on browser memory and device performance. Very large images process more slowly and may run out of memory. Consider downscaling to a few thousand pixels on the long side before converting.",
    },
    {
      q: isKo ? "PNG의 투명 배경을 JPG로 바꾸면 어떻게 되나요?" : "What happens to a transparent background when converting PNG to JPG?",
      a: isKo
        ? "JPEG는 투명도를 지원하지 않으므로, 투명 영역은 흰색(또는 지정된 배경색)으로 채워집니다. 만약 투명 배경을 유지해야 한다면 PNG 또는 WebP(무손실 모드)를 사용하는 것이 적합합니다."
        : "JPEG does not support transparency, so transparent areas are filled with white (or a chosen background color). If you need to keep the transparency, use PNG or lossless WebP instead.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>Image Format Converter</strong> converts images between PNG, JPEG, and WebP formats directly in your browser. No server upload required - all processing happens locally.
        </p>
        <p>
          Choose the right format for your needs: PNG for transparency and lossless quality, JPEG for small file sizes with photos, and WebP for the best of both worlds.
        </p>
        <TermGlossary items={[
          { term: 'PNG', desc: isKo ? '무손실 압축을 사용하는 이미지 형식으로, 투명 배경을 지원합니다. 로고나 그래픽, 스크린샷에 적합합니다.' : 'A lossless image format that supports transparent backgrounds. Ideal for logos, graphics, and screenshots.' },
          { term: 'JPEG', desc: isKo ? '손실 압축을 사용하는 이미지 형식으로, 사진처럼 복잡한 이미지를 작은 파일 크기로 저장할 때 적합합니다. 투명도는 지원하지 않습니다.' : 'A lossy image format suited for storing complex images like photos at small file sizes. Does not support transparency.' },
          { term: 'WebP', desc: isKo ? '구글이 만든 현대적 이미지 형식으로, 손실/무손실 모드를 모두 지원하며 같은 화질에서 JPEG보다 25~35% 더 작습니다.' : 'A modern image format by Google supporting both lossy and lossless modes, 25-35% smaller than JPEG at the same quality.' },
          { term: isKo ? '손실/무손실 압축' : 'Lossy/Lossless Compression', desc: isKo ? '손실 압축은 품질을 약간 희생해 용량을 줄이고, 무손실 압축은 원본 품질을 그대로 유지하며 압축합니다.' : 'Lossy compression reduces size by sacrificing some quality, while lossless compression keeps the original quality intact.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Format Comparison:</p>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold">PNG</p>
            <p>Lossless compression, supports transparency. Best for graphics, logos, and screenshots.</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold">JPEG</p>
            <p>Lossy compression, adjustable quality. Best for photographs and complex images.</p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="font-bold">WebP</p>
            <p>Modern format with both lossy and lossless modes. 25-35% smaller than JPEG at same quality.</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>PNG to JPEG conversion will remove transparency (filled with white background).</li>
          <li>Lower quality settings significantly reduce file size for JPEG and WebP.</li>
          <li>WebP is supported by all modern browsers but not by older versions of Safari.</li>
          <li>All conversions happen in your browser - no data is uploaded to any server.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "이미지 업로드" : "Upload an image",
            isKo ? "변환할 이미지 파일을 선택하거나 끌어다 놓습니다. 모든 처리는 브라우저에서 로컬로 이루어집니다." : "Select or drag and drop the image file to convert. All processing happens locally in your browser.",
          ],
          [
            isKo ? "출력 형식 선택" : "Choose the output format",
            isKo ? "PNG, JPG, WebP 중 원하는 대상 형식을 선택합니다." : "Choose the target format: PNG, JPG, or WebP.",
          ],
          [
            isKo ? "변환" : "Convert",
            isKo ? "필요하면 품질을 조정한 뒤 변환 버튼을 눌러 이미지를 새 형식으로 변환합니다." : "Adjust the quality if needed, then press convert to produce the image in the new format.",
          ],
          [
            isKo ? "다운로드" : "Download",
            isKo ? "변환된 이미지를 다운로드해 사용합니다." : "Download the converted image for your use.",
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
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 1 — PNG에서 JPG로 용량 줄이기" : "Example 1 — Reducing size from PNG to JPG"}</p>
          <p>
            {isKo
              ? "예를 들어 1200×800px 사진이 PNG로 2.5MB라면, 동일한 이미지를 JPG(품질 85)로 변환하면 대개 300~400KB 수준으로 줄어듭니다. 투명 배경이 필요 없는 사진이라면 JPG로 바꾸는 것이 웹 로딩 속도에 크게 도움이 됩니다."
              : "A 1200×800px photo at 2.5MB as PNG typically drops to roughly 300–400KB when converted to JPG at quality 85. For photos that don't need transparency, converting to JPG significantly improves web loading speed."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 2 — WebP와 PNG 용량 비교" : "Example 2 — WebP vs PNG size comparison"}</p>
          <p>
            {isKo
              ? "같은 로고 이미지가 PNG로 500KB라면, WebP(무손실)로 변환하면 약 350KB, 손실 모드로는 그보다 더 작게 줄어듭니다. WebP는 같은 화질에서 PNG나 JPEG보다 평균 25~35% 작아 현대 웹사이트에서 자주 권장됩니다."
              : "The same logo at 500KB as PNG becomes roughly 350KB in lossless WebP, and even smaller in lossy mode. WebP is on average 25–35% smaller than PNG or JPEG at the same quality, making it a common recommendation for modern websites."}
          </p>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
