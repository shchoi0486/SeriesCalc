import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./Base64DecoderClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/base64-decoder", "ai-tools", "base64-decoder");
}

export default function Base64DecoderPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("Base64란 무엇인가요?", "What is Base64?"),
      a: L(
        "Base64는 바이너리 데이터를 64개의 ASCII 문자(A-Z, a-z, 0-9, +, /)로 표현하는 인코딩 방식입니다. 텍스트만 다루는 채널(이메일, JSON, URL)에서 바이너리 데이터를 안전하게 전송하기 위해 사용합니다.",
        "Base64 is an encoding scheme that represents binary data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). It lets binary data travel safely over text-only channels like email, JSON, and URLs.",
      ),
    },
    {
      q: L("디코딩 결과가 깨져 보이면 어떻게 하나요?", "Why is the decoded text garbled?"),
      a: L(
        "원본 데이터가 텍스트가 아닌 바이너리(이미지, 파일)이거나, 인코딩된 바이트가 UTF-8로 해석될 수 없는 경우 깨져 보입니다. 텍스트라면 잘못된 문자셋으로 해석되었을 수 있으므로 다른 문자셋을 선택해 보세요.",
        "The decoded output appears garbled when the source was binary data (images, files) rather than text, or when the bytes are not valid UTF-8. For text, the bytes may be from a different charset — try another charset.",
      ),
    },
    {
      q: L("URL-safe Base64와 표준 Base64의 차이는 무엇인가요?", "What is the difference between URL-safe and standard Base64?"),
      a: L(
        "표준 Base64는 +와 / 문자를 사용하지만, 이들은 URL에서 특별한 의미를 갖습니다. URL-safe Base64는 +를 -로, /를 _로 바꾸고 끝의 = 패딩을 생략해 URL에 안전하게 넣을 수 있게 합니다. JWT 토큰이 대표적인 예입니다.",
        "Standard Base64 uses + and /, which have special meaning in URLs. URL-safe Base64 replaces + with - and / with _, and omits the trailing = padding so it fits safely in a URL — JWT tokens are a common example.",
      ),
    },
    {
      q: L("끝에 붙는 = 패딩은 왜 필요한가요?", "Why is there padding (=) at the end?"),
      a: L(
        "Base64는 원본 3바이트를 4문자로 표현하므로, 데이터 길이가 3의 배수가 아니면 마지막 그룹이 불완전해집니다. 이를 4의 배수 길이로 맞추기 위해 = 문자를 추가합니다. 디코딩할 때 이 패딩은 무시됩니다.",
        "Base64 encodes 3 bytes as 4 characters, so when the data length is not a multiple of 3 the final group is incomplete. The = character pads the output to a multiple of 4. This padding is ignored during decoding.",
      ),
    },
    {
      q: L("바이너리 데이터는 디코딩할 수 있나요?", "Can I decode binary data?"),
      a: L(
        "기술적으로 가능하지만, 바이너리 데이터를 텍스트로 표시하면 읽을 수 없는 문자가 섞입니다. 이미지나 파일 같은 바이너리 Base64는 전용 도구로 디코딩해 파일로 저장해야 합니다. 이 계산기는 텍스트(UTF-8) 디코딩에 최적화되어 있습니다.",
        "Technically yes, but binary data shown as text produces unreadable characters. Binary Base64 (images, files) should be decoded with a dedicated tool and saved to a file. This tool is optimized for decoding text (UTF-8).",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>Base64 Decoder</strong> converts Base64 encoded strings back to their original plain text. This is useful for decoding API responses, JWT tokens, email content, and other Base64-encoded data.
        </p>
        <p>
          The decoder handles Unicode/UTF-8 text properly, returning the exact original text that was encoded.
        </p>
        <TermGlossary items={[
          { term: 'Base64', desc: isKo ? '바이너리 데이터를 ASCII 문자 64개로 표현하는 인코딩 방식입니다. 디코딩하면 원래의 텍스트나 바이너리 데이터를 복원할 수 있습니다.' : 'An encoding scheme that represents binary data using 64 ASCII characters. Decoding restores the original text or binary data.' },
          { term: isKo ? '6비트 인코딩' : '6-bit Encoding', desc: isKo ? 'Base64는 각 문자가 원본 데이터의 6비트를 나타냅니다. 4개의 문자(4x6비트)가 원본 3바이트(24비트)를 표현하는 방식입니다.' : 'In Base64 each character represents 6 bits of the original data. Four characters (4×6 bits) represent the original 3 bytes (24 bits).' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Decoding Process:</p>
        <ul className="space-y-2 text-sm">
          <li><strong>Step 1:</strong> Validate the input contains only valid Base64 characters (A-Z, a-z, 0-9, +, /, =).</li>
          <li><strong>Step 2:</strong> Convert each Base64 character back to its 6-bit value.</li>
          <li><strong>Step 3:</strong> Reassemble the 6-bit groups into 8-bit bytes.</li>
          <li><strong>Step 4:</strong> Convert the byte array back to the original text encoding.</li>
        </ul>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-center font-mono text-sm">
            "SGVsbG8=" → "Hello"
          </p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Valid Base64 strings have a length that is a multiple of 4 (after padding with =).</li>
          <li>If you get garbled output, the original text might have been in a different encoding.</li>
          <li>Common sources of Base64 data: JWT headers, email attachments, HTTP Basic Auth headers.</li>
          <li>The output preserves the original text including any special characters and line breaks.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("Base64 문자열 붙여넣기", "Paste the Base64 string"),
            L("디코딩할 Base64 문자열(A-Z, a-z, 0-9, +, /, =)을 입력란에 붙여넣습니다.", "Paste the Base64 string (A-Z, a-z, 0-9, +, /, =) into the input."),
          ],
          [
            L("디코드 버튼 클릭", "Click decode"),
            L("버튼을 누르면 Base64가 원래 바이트로 변환되고 텍스트로 표시됩니다.", "Clicking the button converts the Base64 back to bytes and displays them as text."),
          ],
          [
            L("문자셋 선택", "Choose a charset"),
            L("텍스트가 깨지면 UTF-8 이외의 문자셋을 선택해 올바른 원문을 확인합니다.", "If the text is garbled, select a charset other than UTF-8 to recover the correct original."),
          ],
          [
            L("결과 확인", "View the decoded text"),
            L("디코딩된 원문이 올바른지 확인하고 필요하면 복사합니다.", "Verify the decoded original and copy it if needed."),
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
          <p className="font-mono text-xs">aGVsbG8= → "hello"</p>
          <p className="mt-2">
            {L(
              "5바이트의 'hello'가 Base64로 aGVsbG8=이 됩니다. 마지막 =는 3바이트 단위를 맞추기 위한 패딩입니다.",
              "The 5-byte string 'hello' encodes to aGVsbG8=. The trailing = is padding to complete the 3-byte grouping.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 두 단어", "Example 2 — Two words")}</p>
          <p className="font-mono text-xs">SGVsbG8gV29ybGQ= → "Hello World"</p>
          <p className="mt-2">
            {L(
              "'Hello World'는 공백을 포함해 11바이트이며, Base64로 SGVsbG8gV29ybGQ=이 됩니다. 대소문자와 공백이 정확히 보존됩니다.",
              "'Hello World' is 11 bytes including the space, encoding to SGVsbG8gV29ybGQ=. Case and the space are preserved exactly.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 3 — UTF-8 텍스트", "Example 3 — UTF-8 text")}</p>
          <p className="font-mono text-xs">7ZWY6rWt → "한글"</p>
          <p className="mt-2">
            {L(
              "한글 텍스트는 먼저 UTF-8 바이트로 변환된 뒤 Base64로 인코딩됩니다. 디코딩하면 UTF-8로 해석해 원래의 한글을 복원합니다.",
              "Korean text is first converted to UTF-8 bytes, then encoded to Base64. Decoding interprets those bytes as UTF-8 to restore the original Korean.",
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
