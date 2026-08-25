import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./Base64EncoderClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/base64-encoder", "ai-tools", "base64-encoder");
}

export default function Base64EncoderPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("Base64 인코딩이 왜 필요한가요?", "Why is Base64 encoding needed?"),
      a: L(
        "이메일, JSON, URL 등 텍스트만 다루는 채널은 바이너리 데이터를 직접 전송할 수 없습니다. Base64는 바이너리 데이터를 안전한 ASCII 문자로 바꿔 이런 채널에서도 문제없이 전송할 수 있게 해줍니다.",
        "Channels that only handle text — email, JSON, URLs — cannot carry raw binary data. Base64 converts binary into safe ASCII characters so it can travel through those channels without corruption.",
      ),
    },
    {
      q: L("인코딩하면 크기가 얼마나 늘어나나요?", "How much does encoding increase the size?"),
      a: L(
        "Base64는 3바이트를 4문자로 표현하므로 출력이 약 33% 커집니다. 예를 들어 3바이트는 4문자, 6바이트는 8문자가 됩니다. 작은 데이터에서는 1~2문자의 패딩이 추가됩니다.",
        "Base64 encodes 3 bytes as 4 characters, so output grows by about 33%. For example, 3 bytes become 4 characters and 6 bytes become 8. Small inputs add 1–2 characters of padding.",
      ),
    },
    {
      q: L("한글 같은 비 ASCII 문자도 인코딩되나요?", "Can non-ASCII text like Korean be encoded?"),
      a: L(
        "네. 한글 같은 문자는 먼저 UTF-8 바이트로 변환된 뒤 Base64로 인코딩됩니다. UTF-8에서 '한글'은 6바이트이므로 8문자의 Base64 문자열이 됩니다. 디코딩할 때도 UTF-8로 해석하면 원래 문자를 복원합니다.",
        "Yes. Non-ASCII text like Korean is first converted to UTF-8 bytes, then encoded to Base64. Under UTF-8 '한글' is 6 bytes, so it becomes an 8-character Base64 string. Decoding interprets those bytes as UTF-8 to restore the original.",
      ),
    },
    {
      q: L("끝에 붙는 =는 무엇인가요?", "What is the trailing = for?"),
      a: L(
        "Base64 출력 길이를 4의 배수로 맞추기 위한 패딩입니다. 원본 데이터가 3의 배수가 아니면 마지막 그룹에 =을 1~2개 추가합니다. 예를 들어 'hello'(5바이트)는 aGVsbG8=처럼 =이 하나 붙습니다.",
        "It is padding that makes the Base64 output a multiple of 4. When the source is not a multiple of 3 bytes, one or two = characters are appended. For example, 'hello' (5 bytes) becomes aGVsbG8= with one =.",
      ),
    },
    {
      q: L("데이터 URI에서 어떻게 사용되나요?", "How is it used in data URIs?"),
      a: L(
        "이미지 등의 바이너리 데이터를 HTML이나 CSS에 직접 내장할 때 `data:image/png;base64,` 뒤에 Base64 문자열을 넣습니다. 이를 통해 별도 파일 요청 없이 데이터를 문서에 포함할 수 있습니다.",
        "To embed binary data like images directly in HTML or CSS, put the Base64 string after `data:image/png;base64,`. This includes the data in the document without a separate file request.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>Base64 Encoder</strong> converts plain text into Base64 encoded format. Base64 is a binary-to-text encoding scheme that represents binary data using ASCII characters.
        </p>
        <p>
          Base64 encoding is commonly used for transmitting data over media that handle text (like email, URLs, JSON) and for embedding images or other binary data in HTML/CSS.
        </p>
        <TermGlossary items={[
          { term: 'Base64', desc: isKo ? '바이너리 데이터를 ASCII 문자(A-Z, a-z, 0-9, +, /) 64개로 표현하는 인코딩 방식입니다. 이메일 첨부나 데이터 URI 등 텍스트 환경에서 데이터를 다룰 때 사용합니다.' : 'An encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). Used for handling data in text environments such as email attachments and data URIs.' },
          { term: isKo ? '패딩(Padding)' : 'Padding', desc: isKo ? 'Base64 출력 길이를 4의 배수로 맞추기 위해 붙이는 = 문자입니다. 원본 데이터가 3바이트 단위로 나누어 떨어지지 않을 때 사용합니다.' : 'The = character appended to make the Base64 output length a multiple of 4. Used when the original data is not evenly divisible into 3-byte units.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">How Base64 Works:</p>
        <ul className="space-y-2 text-sm">
          <li><strong>Character Set:</strong> Uses 64 characters: A-Z, a-z, 0-9, +, /</li>
          <li><strong>Padding:</strong> = character(s) added to make the output length a multiple of 4.</li>
          <li><strong>Size Increase:</strong> Encoded output is approximately 33% larger than the input.</li>
        </ul>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-center font-mono text-sm">
            "Hello" → "SGVsbG8=" (4 bytes → 8 characters)
          </p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Base64 is <strong>not encryption</strong> - it's just encoding. Anyone can decode it.</li>
          <li>Common use cases: email attachments (MIME), embedding images in CSS/HTML, JWT tokens.</li>
          <li>For secure data transmission, always use HTTPS and proper encryption on top of Base64.</li>
          <li>The encoder handles Unicode/UTF-8 text properly.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("텍스트 입력", "Type text"),
            L("인코딩할 평문 텍스트를 입력란에 넣습니다.", "Enter the plain text you want to encode."),
          ],
          [
            L("인코드 버튼 클릭", "Click encode"),
            L("버튼을 누르면 텍스트가 Base64 문자열로 변환됩니다.", "Clicking the button converts the text into a Base64 string."),
          ],
          [
            L("결과 확인", "Review the Base64 output"),
            L("A-Z, a-z, 0-9, +, /, = 문자로 구성된 출력을 확인합니다.", "Check the output, which uses A-Z, a-z, 0-9, +, /, and = characters."),
          ],
          [
            L("결과 복사", "Copy the result"),
            L("인코딩된 문자열을 복사해 이메일, JSON, 데이터 URI 등에 사용합니다.", "Copy the encoded string for use in email, JSON, data URIs, and more."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 기본 문자열", "Example 1 — Basic string")}</p>
          <p className="font-mono text-xs">"hello" → aGVsbG8=</p>
          <p className="mt-2">
            {L(
              "'hello'(5바이트)가 aGVsbG8=로 인코딩됩니다. 마지막 =는 3바이트 단위를 맞추기 위한 패딩입니다.",
              "'hello' (5 bytes) encodes to aGVsbG8=. The trailing = is padding to complete the 3-byte grouping.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 두 단어", "Example 2 — Two words")}</p>
          <p className="font-mono text-xs">"Hello World" → SGVsbG8gV29ybGQ=</p>
          <p className="mt-2">
            {L(
              "'Hello World'는 공백을 포함해 11바이트이며 SGVsbG8gV29ybGQ=로 인코딩됩니다.",
              "'Hello World' (11 bytes including the space) encodes to SGVsbG8gV29ybGQ=.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 3 — 한글 인코딩", "Example 3 — Korean text")}</p>
          <p className="font-mono text-xs">"한글" → 7ZWY6rWt</p>
          <p className="mt-2">
            {L(
              "UTF-8에서 '한글'은 6바이트이며 Base64로 7ZWY6rWt가 됩니다. 패딩이 필요 없는 6바이트(4의 배수 문자가 됨)이므로 =이 붙지 않습니다.",
              "Under UTF-8 '한글' is 6 bytes and encodes to 7ZWY6rWt. Since 6 bytes fill complete 4-character groups, no padding = is needed.",
            )}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
