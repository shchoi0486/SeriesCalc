import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./JsonMinifierClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/json-minifier", "ai-tools", "json-minifier");
}

export default function JsonMinifierPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: "What does JSON minification remove?",
      a: "Minification strips all non-essential characters: whitespace, line breaks, carriage returns, and indentation between tokens. It keeps only the structural characters required by the JSON specification (braces, brackets, colons, and commas), producing output that is functionally identical to the original.",
    },
    {
      q: "How much smaller will my JSON become?",
      a: "Size savings depend on how the input was formatted. Pretty-printed JSON is typically 30-60% larger than its minified form because of indentation and line breaks. The more deeply nested and verbose the formatting, the greater the reduction.",
    },
    {
      q: "Is the minified output still valid JSON that JSON.parse can read?",
      a: "Yes. Minification only removes whitespace that JSON.parse ignores anyway, so the output parses to the exact same data structure as the input. You can safely paste minified output back into any JavaScript, Python, or other JSON parser without changes.",
    },
    {
      q: "What happens if I enter invalid JSON?",
      a: "The tool validates your input with JSON.parse before minifying. If the input contains a syntax error—such as a trailing comma, missing quote, or single quotes instead of double quotes—it returns a clear error message and does not produce output until the issue is fixed.",
    },
    {
      q: "What is the difference between formatting and minifying?",
      a: "Formatting (prettifying) adds indentation and line breaks to make JSON readable for humans, increasing size. Minifying does the opposite: it strips all whitespace to produce the smallest possible representation, which is better for storage and network transfer.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>JSON Minifier</strong> removes all unnecessary whitespace, line breaks, and indentation from JSON data, reducing file size for production deployment and network transfer.
        </p>
        <p>
          Minified JSON is functionally identical to pretty-printed JSON but takes significantly less space, which is critical for API performance and storage efficiency.
        </p>
        <TermGlossary items={[
          { term: 'JSON', desc: isKo ? 'JavaScript Object Notation의 약자로, 키와 값의 쌍으로 데이터를 표현하는 가벼운 텍스트 기반 데이터 형식입니다. API 통신과 설정 파일에 널리 쓰입니다.' : 'Short for JavaScript Object Notation, a lightweight text-based data format that represents data as key-value pairs. Widely used for API communication and configuration files.' },
          { term: isKo ? '미니파이(Minify)' : 'Minify', desc: isKo ? '불필요한 공백, 줄바꿈, 들여쓰기를 제거해 파일 크기를 줄이는 과정입니다. 기능은 동일하지만 네트워크 전송량과 저장 효율을 높입니다.' : 'The process of removing unnecessary whitespace, line breaks, and indentation to reduce file size. Functionality stays identical while improving transmission and storage efficiency.' },
          { term: isKo ? 'Gzip 압축' : 'Gzip Compression', desc: isKo ? '텍스트 기반 데이터를 추가로 압축하는 방식입니다. 미니파이된 JSON 위에 Gzip을 적용하면 전송 크기를 더욱 줄일 수 있습니다.' : 'A method that further compresses text-based data. Applying Gzip on top of minified JSON reduces the transfer size even more.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">1</span>
          <div>
            <p className="font-semibold text-foreground">Paste your JSON</p>
            <p className="mt-1">Copy your JSON data and paste it into the input box. It can be pretty-printed, compact, or anywhere in between.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">2</span>
          <div>
            <p className="font-semibold text-foreground">Click Minify</p>
            <p className="mt-1">Press the Minify button. The tool validates your JSON and strips all unnecessary whitespace and line breaks.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">3</span>
          <div>
            <p className="font-semibold text-foreground">Copy the compact output</p>
            <p className="mt-1">Use the copy button to grab the minified JSON, then paste it into your production code, API payload, or configuration file.</p>
          </div>
        </li>
      </ol>
    ),
    workedExamples: (
      <div className="space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">Example 1 — Removing spaces</p>
          <p>
            Starting with the JSON <code className="font-mono text-xs">{"{ \"a\": 1, \"b\": 2 }"}</code> (which contains spaces after colons and commas), minifying removes every space to produce <code className="font-mono text-xs">{'{"a":1,"b":2}'}</code>. The data is identical, but 7 characters of whitespace are eliminated.
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Example 2 — Nested object</p>
          <p>
            A multi-line nested object like a user profile shrinks dramatically:
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`{
  "user": {
    "name": "Alice",
    "age": 30,
    "active": true
  }
}`}</pre>
          <p className="mt-2">
            becomes <code className="font-mono text-xs">{'{"user":{"name":"Alice","age":30,"active":true}}'}</code>, removing all indentation and newlines for a single-line payload.
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Before (formatted):</p>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">
{`{
  "name": "John",
  "age": 30,
  "active": true
}`}
        </div>
        <p className="font-semibold">After (minified):</p>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs">
          {'{"name":"John","age":30,"active":true}'}
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Minification typically reduces JSON size by 30-60% depending on formatting.</li>
          <li>Always minify JSON for production API responses to reduce bandwidth usage.</li>
          <li>Keep pretty-printed JSON in development for easier debugging.</li>
          <li>Gzip compression on top of minification can reduce size even further.</li>
        </ul>
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
