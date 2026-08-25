import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./YamlGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/yaml-generator", "ai-tools", "yaml-generator");
}

export default function YamlGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: "What are the differences between YAML and JSON?",
      a: "YAML is designed to be human-readable and relies on indentation instead of braces and brackets, so it has no commas or closing characters. JSON is a strict subset of YAML, meaning valid JSON is also valid YAML, but YAML adds features like comments, anchors, and unquoted strings that JSON lacks.",
    },
    {
      q: "Why is indentation so important in YAML?",
      a: "YAML defines structure purely through indentation, not braces. Because of this, you must use spaces (never tabs) and keep consistent indentation at each nesting level. A single misplaced space can change the meaning of the document or cause a parse error.",
    },
    {
      q: "What are anchors and aliases in YAML?",
      a: "Anchors (marked with &) let you name a value once, and aliases (marked with *) let you reuse it elsewhere in the same document. This avoids repeating the same block of data, which is useful for sharing common configuration across multiple entries.",
    },
    {
      q: "Does YAML support comments?",
      a: "Yes. Any line starting with a # is treated as a comment and ignored when parsing. Comments are a key advantage over JSON and make YAML well suited for configuration files where you want to document settings next to their values.",
    },
    {
      q: "When should I use YAML instead of JSON?",
      a: "Use YAML for human-maintained configuration files—such as Docker Compose, Kubernetes manifests, GitHub Actions, and CI/CD pipelines—where readability and comments matter. Prefer JSON when you need a strict, machine-oriented format or are exchanging data over APIs.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>YAML Generator</strong> creates random YAML data with proper indentation and formatting. YAML is commonly used for configuration files, CI/CD pipelines, and data serialization.
        </p>
        <p>
          The output follows YAML best practices with proper document markers (--- and ...) and correct indentation for readability.
        </p>
        <TermGlossary items={[
          { term: 'YAML', desc: isKo ? 'YAML은 사람이 읽기 쉬운 데이터 직렬화 형식입니다. 들여쓰기를 기준으로 계층 구조를 표현하며 주로 설정 파일과 데이터 교환에 사용됩니다.' : 'YAML is a human-readable data serialization format. It expresses hierarchical structure through indentation and is mainly used for configuration files and data exchange.' },
          { term: 'CI/CD', desc: isKo ? '지속적 통합(Continuous Integration)과 지속적 배포(Continuous Delivery)를 뜻하며, 코드 변경을 자동으로 빌드·테스트·배포하는 파이프라인입니다. YAML로 설정 파일을 작성하는 경우가 많습니다.' : 'Short for Continuous Integration and Continuous Delivery—a pipeline that automatically builds, tests, and deploys code changes. Configuration is often written in YAML.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">1</span>
          <div>
            <p className="font-semibold text-foreground">Choose your structure</p>
            <p className="mt-1">Decide on the shape you need, such as a list of records or nested key-value groups, and define the fields you want to generate.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">2</span>
          <div>
            <p className="font-semibold text-foreground">Input your values</p>
            <p className="mt-1">Set the field names and the number of records. The generator infers appropriate values from the keys.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">3</span>
          <div>
            <p className="font-semibold text-foreground">Generate YAML</p>
            <p className="mt-1">Press generate to produce properly indented YAML with document start (---) and end (...) markers.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">4</span>
          <div>
            <p className="font-semibold text-foreground">Copy the output</p>
            <p className="mt-1">Copy the generated YAML into your config file, pipeline definition, or Kubernetes manifest.</p>
          </div>
        </li>
      </ol>
    ),
    workedExamples: (
      <div className="space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">Example 1 — Simple key-value pair</p>
          <p>
            A basic record with scalar values generates clean, readable YAML using indentation instead of braces:
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`---
name: John
age: 28
active: true
...`}</pre>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Example 2 — Nested list</p>
          <p>
            Generating multiple records under a list key produces a nested YAML sequence where each item is indented and each field is a separate key-value pair:
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`---
items:
  - id: 1
    name: John
    age: 28
  - id: 2
    name: Alice
    age: 31
...`}</pre>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">YAML Format:</p>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <pre className="text-xs font-mono">
{`---
items:
  - id: 1
    name: John
    age: 28
    email: user@example.com
...`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong>---:</strong> Document start marker.</li>
          <li><strong>Items:</strong> List of generated records using YAML sequence syntax.</li>
          <li><strong>Key-value pairs:</strong> Each field on a new line with proper indentation.</li>
          <li><strong>...:</strong> Document end marker.</li>
        </ul>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>YAML uses indentation (spaces, not tabs) to define structure.</li>
          <li>Strings containing special characters are automatically quoted.</li>
          <li>Common use cases: Docker Compose, Kubernetes configs, CI/CD pipelines.</li>
          <li>YAML is a superset of JSON - valid JSON is also valid YAML.</li>
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
