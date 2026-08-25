import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./LoremIpsumGeneratorClient";
import FaqItem from "@/components/calculators/FaqItem";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/lorem-ipsum-generator", "ai-tools", "lorem-ipsum-generator");
}

export default function LoremIpsumGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "로렘 입숨(Lorem Ipsum)이란 무엇인가요?" : "What is Lorem Ipsum?",
      a: isKo
        ? "로렘 입숨은 디자인과 출판 분야에서 실제 내용 대신 임시로 쓰는 표본 텍스트입니다. 기원전 45년 키케로의 철학 저서 '최고선악론(De Finibus Bonorum et Malorum)'에서 파생된 단어들로 구성되어, 읽는 사람의 주의를 뜻보다는 레이아웃과 타이포그래피에 집중시키는 효과가 있습니다."
        : "Lorem Ipsum is placeholder text used in design and publishing in place of real content. Derived from Cicero's 45 BC philosophical work 'De Finibus Bonorum et Malorum', it keeps the reader's attention on layout and typography rather than meaning.",
    },
    {
      q: isKo ? "단락, 문장, 단어 중 무엇을 선택해야 하나요?" : "Should I generate paragraphs, sentences, or words?",
      a: isKo
        ? "용도에 따라 다릅니다. 문장(sentence)은 한 줄 수준의 간단한 폭·여백 테스트에, 단락(paragraph)은 본문 영역의 흐름과 높이를 확인할 때, 단어(word)는 긴 단어 래핑이나 좁은 열을 테스트할 때 적합합니다."
        : "It depends on the purpose. Sentences suit simple line-width and margin tests, paragraphs are best for checking body-flow and height, and words work well for testing long word-wrapping or narrow columns.",
    },
    {
      q: isKo ? "왜 디자인에서 로렘 입숨을 사용하나요?" : "Why is Lorem Ipsum used in design?",
      a: isKo
        ? "읽는 사람이 텍스트의 의미에 주의를 빼앗기지 않고 레이아웃, 글꼴, 간격, 색상 등 시각적 요소에 집중할 수 있기 때문입니다. 실제 내용을 미리 넣으면 자연어처럼 읽히면서 디자인 평가가 흐려지므로, 무의미한 표본 텍스트가 선호됩니다."
        : "Because it lets viewers focus on visual elements — layout, typeface, spacing, and color — instead of being distracted by the meaning of the text. Real content reads naturally and biases design evaluation, so meaningless sample text is preferred.",
    },
    {
      q: isKo ? "로렘 입숨의 라틴어는 실제 의미가 있나요?" : "Does the Latin in Lorem Ipsum have real meaning?",
      a: isKo
        ? "완전한 문장이 아니므로 직접적인 의미는 없습니다. 다만 단어들은 키케로의 저작에서 비롯되어 부분적으로 의미가 통합니다. 예를 들어 'dolor sit amet'는 '(고통에) 기꺼이 앉으리라'에 가까운 뜻을 지니며, 이후 단어들은 의도적으로 재배열되어 알아보기 어렵게 만들었습니다."
        : "It isn't coherent prose, so it has no direct meaning. The words originate from Cicero's work, however, and some partially translate — for instance 'dolor sit amet' roughly means 'willingly to sit in pain', and later words were deliberately scrambled to be unrecognizable.",
    },
    {
      q: isKo ? "한국어 플레이스홀더 텍스트도 생성할 수 있나요?" : "Can I generate Korean placeholder text?",
      a: isKo
        ? "네. 한글은 음절 단위로 조합되어 라틴 문자와 어절 길이가 달라 레이아웃이 크게 달라집니다. 한국어로 된 placeholder 텍스트를 사용하면 한글 폰트의 자간·줄높이·단어 래핑을 실제 사용 환경과 비슷하게 미리 확인할 수 있으므로, 한글 사이트를 만들 때는 한국어 샘플을 권장합니다."
        : "Yes. Korean combines syllable blocks, so line lengths differ greatly from Latin text. Using Korean placeholder text lets you preview hangul font spacing, line height, and word-wrapping close to the real environment, which is recommended when building Korean-language sites.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>Lorem Ipsum Generator</strong> creates random placeholder text that mimics the structure and appearance of natural language. It's the industry standard for dummy text in design and publishing.
        </p>
        <p>
          The generator creates text with realistic sentence structures, varied paragraph lengths, and natural word flow, making it ideal for testing layouts, typography, and content placement.
        </p>
        <TermGlossary items={[
          { term: 'Lorem Ipsum', desc: isKo ? '디자인과 출판 분야에서 의미 없는 채움글(더미 텍스트)로 쓰이는 라틴어 형태의 문장입니다. 1세기 키케로의 저작에서 유래했습니다.' : 'Latin-like filler text (dummy text) used in design and publishing where meaningful content is not needed. It originates from a 1st-century work by Cicero.' },
          { term: isKo ? '채움텍스트(Placeholder Text)' : 'Placeholder Text', desc: isKo ? '실제 내용이 없을 때 레이아웃, 타이포그래피, 내용 배치를 미리 확인하기 위해 임시로 넣는 표본 텍스트입니다.' : 'Sample text temporarily inserted to preview layout, typography, and content placement before the real content exists.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Generation Process:</p>
        <ul className="space-y-2 text-sm">
          <li><strong>Word Pool:</strong> Classical Latin words from Cicero's "De Finibus Bonorum et Malorum" (45 BC).</li>
          <li><strong>Sentence Structure:</strong> Varied sentence lengths (6-15 words) with realistic grammar.</li>
          <li><strong>Paragraph Formation:</strong> Multiple sentences joined to form coherent paragraphs.</li>
        </ul>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm italic">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Standard practice is 3-5 paragraphs with 4-8 sentences each for most layout tests.</li>
          <li>Lorem Ipsum helps focus on design and layout rather than content when prototyping.</li>
          <li>The text is derived from Cicero's philosophical work from 45 BC.</li>
          <li>For multilingual projects, consider using localized placeholder text.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "단위 선택" : "Choose a unit",
            isKo ? "단락(paragraph), 문장(sentence), 또는 단어(word) 중 생성할 단위를 선택합니다." : "Choose whether to generate paragraphs, sentences, or words.",
          ],
          [
            isKo ? "수량 설정" : "Set the count",
            isKo ? "생성할 단락·문장·단어의 개수를 입력합니다." : "Enter the number of paragraphs, sentences, or words to generate.",
          ],
          [
            isKo ? "생성" : "Generate",
            isKo ? "버튼을 눌러 자연스러운 문장 구조를 가진 표본 텍스트를 생성합니다." : "Click to generate sample text with natural sentence structure.",
          ],
          [
            isKo ? "복사" : "Copy",
            isKo ? "생성된 텍스트를 클립보드에 복사해 프로토타입이나 목업에 붙여넣습니다." : "Copy the generated text to your clipboard and paste it into prototypes or mockups.",
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
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 1 — 단락 생성" : "Example 1 — Generating paragraphs"}</p>
          <p>
            {isKo
              ? "'단락 3개'를 생성하면 일반적으로 약 15문장(각 단락 4~6문장)으로 구성된 본문이 만들어집니다. 예를 들어 3개 단락은 각각 5문장씩 총 15문장이 되어, 블로그 본문이나 페이지 설명 영역의 높이를 확인하는 데 적합합니다."
              : "Generating '3 paragraphs' typically produces roughly 15 sentences (4–6 per paragraph). Three paragraphs at about 5 sentences each gives ~15 sentences, suitable for checking the height of a blog body or page description area."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 2 — 단어 수 출력" : "Example 2 — Word count output"}</p>
          <p>
            {isKo
              ? "'단어 50개'를 선택하면 약 50단어로 이루어진 짧은 문단이 생성됩니다. 예를 들어 5~6문장에 50단어 정도의 텍스트는 표지나 캡션, 광고 문구 자리를 채우는 데 알맞은 분량입니다. 이 도구는 요청한 수량에 맞춰 단어 수를 맞춰 출력합니다."
              : "Selecting '50 words' produces a short passage of about 50 words. For instance, ~50 words across 5–6 sentences is a comfortable fill for covers, captions, or ad copy placeholders. The tool matches the word count to your requested quantity."}
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
