import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./JsonPrettifierClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/json-prettifier", "ai-tools", "json-prettifier");
}

export default function JsonPrettifierPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: "What does prettifying a JSON do?",
      a: "Prettifying (also called formatting) converts a compact, single-line JSON string into a multi-line, indented structure. It adds spaces, newlines, and indentation to reveal the hierarchy of objects and arrays, making the data much easier to read and debug without changing its meaning.",
    },
    {
      q: "What indent size should I choose?",
      a: "The most common choices are 2 or 4 spaces. Two spaces keeps deeply nested data compact and fits more on screen, while four spaces is more visually separated and common in some code style guides. Choose whichever matches your team's convention—the tool supports any size from 1 to 8 spaces.",
    },
    {
      q: "What happens if I paste invalid JSON?",
      a: "The tool parses your input with JSON.parse before formatting. If the JSON is malformed—such as having a trailing comma, missing quotes on keys, or single quotes instead of double quotes—you get a clear error message describing the problem so you can fix it.",
    },
    {
      q: "Can it handle very large JSON files?",
      a: "Yes, in most cases. Formatting is performed entirely in your browser, so there is no server round-trip or size limit. Very large files are processed quickly, though extremely large payloads may take a moment to render in the output box.",
    },
    {
      q: "Why is the key order preserved after prettifying?",
      a: "JavaScript objects preserve the insertion order of their keys (except for integer-like keys, which are sorted first). Since prettifying only re-adds whitespace and never reorders keys, the output keeps the exact same key sequence as your input—only the formatting changes.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>JSON Prettifier</strong> formats minified or compact JSON into a human-readable format with proper indentation. This is essential for debugging API responses, reading configuration files, and reviewing JSON data.
        </p>
        <p>
          The tool validates your JSON and provides clear error messages if the input is malformed, helping you quickly identify syntax issues.
        </p>
        <TermGlossary items={[
          { term: 'JSON', desc: isKo ? 'JavaScript Object Notation의 약자로, 키와 값의 쌍으로 데이터를 표현하는 가벼운 텍스트 기반 데이터 형식입니다. API 통신과 설정 파일에 널리 쓰입니다.' : 'Short for JavaScript Object Notation, a lightweight text-based data format that represents data as key-value pairs. Widely used for API communication and configuration files.' },
          { term: isKo ? '들여쓰기(Indentation)' : 'Indentation', desc: isKo ? '중첩된 데이터 구조를 사람이 읽기 쉽게 계층별로 공백을 추가해 정렬하는 방식입니다. 보통 2칸 또는 4칸 공백을 사용합니다.' : 'Adding spaces per level so nested data structures are easy for humans to read. Usually 2 or 4 spaces are used per level.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">1</span>
          <div>
            <p className="font-semibold text-foreground">Paste minified JSON</p>
            <p className="mt-1">Copy your compact, single-line JSON and paste it into the input box.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">2</span>
          <div>
            <p className="font-semibold text-foreground">Click Format</p>
            <p className="mt-1">Optionally set your preferred indent size, then press the Format button to validate and reformat the JSON.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">3</span>
          <div>
            <p className="font-semibold text-foreground">View the indented output</p>
            <p className="mt-1">Read the result or copy it for use in code editors, documentation, or logs.</p>
          </div>
        </li>
      </ol>
    ),
    workedExamples: (
      <div className="space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">Example 1 — Object with array</p>
          <p>
            Starting from the minified input <code className="font-mono text-xs">{'{"name":"John","scores":[1,2]}'}</code>, prettifying with a 2-space indent produces a readable multi-line structure:
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`{
  "name": "John",
  "scores": [
    1,
    2
  ]
}`}</pre>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Example 2 — Nested profile</p>
          <p>
            The compact object <code className="font-mono text-xs">{'{"user":{"name":"Alice","age":30,"active":true}}'}</code> becomes a clearly indented hierarchy where the nesting level of each property is immediately visible.
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Before (minified):</p>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs">
          {'{"name":"John","age":30,"active":true}'}
        </div>
        <p className="font-semibold">After (prettified):</p>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">
{`{
  "name": "John",
  "age": 30,
  "active": true
}`}
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Common causes of invalid JSON: trailing commas, missing quotes around keys, single quotes instead of double quotes.</li>
          <li>Use 2 spaces for standard formatting, or 4 spaces for more readable output.</li>
          <li>Prettified JSON is larger in file size but much easier to read and debug.</li>
          <li>Most code editors have built-in JSON formatting, but this tool is useful for quick one-off formatting.</li>
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
