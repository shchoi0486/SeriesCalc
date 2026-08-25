import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./UrlEncoderClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/url-encoder", "ai-tools", "url-encoder");
}

export default function UrlEncoderPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("어떤 문자가 인코딩되나요?", "Which characters get encoded?"),
      a: L(
        "영문자(A-Z, a-z), 숫자(0-9), 그리고 - _ . ! ~ * ' 는 인코딩되지 않습니다. 그 외 공백, 특수문자(&, #, ?, =, + 등), 한글 등 비 ASCII 문자는 모두 %XX 형식으로 인코딩됩니다.",
        "Letters (A-Z, a-z), digits (0-9), and - _ . ! ~ * ' are not encoded. Everything else — spaces, special characters (&, #, ?, =, +, etc.), and non-ASCII text like Korean — is encoded as %XX.",
      ),
    },
    {
      q: L("왜 공백이 %20으로 변환되나요?", "Why do spaces become %20?"),
      a: L(
        "URL에는 공백을 직접 넣을 수 없기 때문입니다. 공백의 ASCII 16진수 코드는 0x20이므로 %20으로 표시됩니다. HTML 폼의 application/x-www-form-urlencoded 방식에서는 공백이 +로 변환되지만, URL 인코딩에서는 %20을 사용합니다.",
        "Because URLs cannot contain raw spaces. The ASCII hex code for a space is 0x20, so it becomes %20. In HTML form encoding (application/x-www-form-urlencoded) a space becomes +, but in URL encoding it becomes %20.",
      ),
    },
    {
      q: L("UTF-8과 다른 문자셋의 차이는 무엇인가요?", "What is the difference between UTF-8 and other charsets?"),
      a: L(
        "한글 등 비 ASCII 문자는 사용된 문자셋에 따라 다른 바이트로 인코딩됩니다. UTF-8에서는 '한글'이 %ED%95%9C%EA%B8%80로 되지만, 다른 문자셋에서는 다른 값이 됩니다. 정확한 원복을 위해 인코딩할 때 문자셋(기본 UTF-8)을 일치시켜야 합니다.",
        "Non-ASCII text encodes to different bytes depending on the charset. Under UTF-8, '한글' becomes %ED%95%9C%EA%B8%80, but a different charset yields different values. Use a consistent charset (default UTF-8) so decoding recovers the original text.",
      ),
    },
    {
      q: L("URL 인코딩이 언제 필요한가요?", "When is URL encoding needed?"),
      a: L(
        "URL에 공백, 한글, 특수문자 등이 포함될 때 필요합니다. 쿼리 파라미터 값, 검색어, 파일명, 링크 공유, API 호출 등에서 잘못된 문자가 URL 구조를 깨뜨리지 않도록 인코딩합니다.",
        "Whenever a URL contains spaces, Korean text, or special characters. Query parameter values, search terms, file names, shared links, and API calls all need encoding so invalid characters don't break the URL structure.",
      ),
    },
    {
      q: L("이미 인코딩된 문자열은 어떻게 처리하나요?", "How do I handle already-encoded strings?"),
      a: L(
        "이미 %XX 형식인 문자열을 다시 인코딩하면 %가 %25로 이중 인코딩됩니다. 이미 인코딩된 문자열은 그대로 사용하거나, 필요하다면 먼저 디코딩한 뒤 다시 인코딩해야 합니다. 실수로 이중 인코딩되면 서버에서 올바르게 해석되지 않을 수 있습니다.",
        "Re-encoding a string that already contains %XX turns each % into %25 (double encoding). Use already-encoded strings as-is, or decode then re-encode if needed. Accidental double encoding can cause the server to misread the value.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>URL Encoder</strong> converts special characters in URLs and text into percent-encoded format (%XX) that can be safely transmitted over the internet.
        </p>
        <p>
          Two encoding modes are available:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>encodeURIComponent:</strong> Encodes all special characters. Use for individual parameter values.</li>
          <li><strong>encodeURI:</strong> Preserves URI structure characters (/, :, ?, etc.). Use for complete URLs.</li>
        </ul>
        <TermGlossary items={[
          { term: isKo ? 'URL 인코딩 (퍼센트 인코딩)' : 'URL Encoding (Percent Encoding)', desc: isKo ? 'URL에 들어갈 수 없는 공백이나 특수 문자를 % 뒤에 두 자리 16진수(예: %20)로 바꿔 안전하게 전송할 수 있도록 만드는 과정입니다.' : 'The process of turning spaces and special characters that are invalid in URLs into % followed by a two-digit hex code (e.g., %20) so they can be transmitted safely.' },
          { term: 'encodeURIComponent / encodeURI', desc: isKo ? '자바스크립트의 내장 인코딩 함수입니다. encodeURIComponent는 모든 특수 문자를, encodeURI는 URL 구조 문자(/, :, ? 등)를 보존하며 인코딩합니다.' : 'Built-in JavaScript encoding functions. encodeURIComponent encodes all special characters, while encodeURI preserves URL structure characters (/, :, ?, etc.).' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Encoding Examples:</p>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-2">
          <p className="font-mono text-xs">Space → %20</p>
          <p className="font-mono text-xs">! → %21</p>
          <p className="font-mono text-xs"># → %23</p>
          <p className="font-mono text-xs">& → %26</p>
          <p className="font-mono text-xs">+ → %2B</p>
        </div>
        <p className="text-sm">
          Each special character is replaced by % followed by its two-digit hexadecimal ASCII code.
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Use <code className="bg-muted px-1 py-0.5 rounded text-xs">encodeURIComponent</code> for query parameter values to avoid breaking the URL structure.</li>
          <li>Use <code className="bg-muted px-1 py-0.5 rounded text-xs">encodeURI</code> when you want to encode a complete URL but keep its structure intact.</li>
          <li>Letters, numbers, and - _ . ! ~ * ' are not encoded by encodeURIComponent.</li>
          <li>Spaces are encoded as %20 (not +) when using encodeURIComponent.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("텍스트 입력", "Type or paste text"),
            L("인코딩할 URL이나 텍스트를 입력란에 넣습니다.", "Enter the URL or text you want to encode into the input."),
          ],
          [
            L("인코드 버튼 클릭", "Click encode"),
            L("버튼을 누르면 특수문자와 공백이 %XX 형식으로 변환됩니다.", "Clicking the button converts spaces and special characters into %XX format."),
          ],
          [
            L("결과 확인", "Review the %XX output"),
            L("특수문자와 한글이 올바르게 인코딩되었는지 확인합니다.", "Check that special characters and Korean text were encoded correctly."),
          ],
          [
            L("결과 복사", "Copy the result"),
            L("인코딩된 문자열을 복사해 URL이나 API 요청에 사용합니다.", "Copy the encoded string for use in URLs or API requests."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 공백이 있는 문장", "Example 1 — Sentence with spaces")}</p>
          <p className="font-mono text-xs">"hello world" → hello%20world</p>
          <p className="mt-2">
            {L(
              "문장의 공백 두 곳이 각각 %20으로 변환됩니다. 검색어 'hello world'를 URL에 넣을 때 이렇게 인코딩합니다.",
              "The two spaces are each converted to %20. This is how the search phrase 'hello world' is placed into a URL.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 특수문자 포함", "Example 2 — With special characters")}</p>
          <p className="font-mono text-xs">"a&b=c" → a%26b%3Dc</p>
          <p className="mt-2">
            {L(
              "파라미터 값에 &와 =가 있으면 URL 쿼리 구조를 깨뜨리므로 각각 %26, %3D로 인코딩합니다. 이를 통해 값 전체가 하나의 파라미터로 전달됩니다.",
              "Inside a parameter value, & and = would break the query structure, so they become %26 and %3D. This keeps the whole value delivered as a single parameter.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 3 — 한글 인코딩", "Example 3 — Korean text")}</p>
          <p className="font-mono text-xs">"한글" → %ED%95%9C%EA%B8%80</p>
          <p className="mt-2">
            {L(
              "UTF-8에서 '한글'은 각 글자당 3바이트로 인코딩되며, 총 6바이트가 %ED%95%9C%EA%B8%80으로 표시됩니다.",
              "Under UTF-8, each Korean syllable is 3 bytes, so '한글' becomes 6 bytes rendered as %ED%95%9C%EA%B8%80.",
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
