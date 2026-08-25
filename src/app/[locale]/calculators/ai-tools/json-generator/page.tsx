import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./JsonGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/json-generator", "ai-tools", "json-generator");
}

export default function JsonGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: "What does a JSON generator do?",
      a: "A JSON generator creates realistic random JSON data based on the field names and structure you define. Instead of typing sample records by hand, you specify keys like name, age, or email and the tool produces multiple objects with plausible random values ready for testing or prototyping.",
    },
    {
      q: "Can I create custom schemas or field types?",
      a: "The generator infers data types from key names—keys containing 'age' produce numbers, 'email' produces addresses, 'name' produces person names, and so on. You can combine any number of fields and control the number of objects to shape a custom schema that fits your data model.",
    },
    {
      q: "Is this useful for generating sample data during development?",
      a: "Yes. It is ideal for filling mock databases, seeding test environments, prototyping API responses, and populating UI components. Generating realistic sample data this way saves time compared to hand-writing fixtures and covers a wider range of values.",
    },
    {
      q: "Is the generated output valid JSON?",
      a: "Yes. The output is always formatted as a valid JSON array with properly quoted keys, correct value types, and standard indentation. It can be parsed directly by JSON.parse or any other JSON parser without modification.",
    },
    {
      q: "How does type randomization work?",
      a: "Each field is assigned a type based on its name, then a random value is generated for that type on every record. For example, an 'age' key yields a different integer each time and an 'email' key yields a different address, so every generated object varies while staying realistic.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>JSON Generator</strong> creates random JSON data based on your specified key names and number of items. This is useful for testing APIs, prototyping, and filling mock databases.
        </p>
        <p>
          The generator intelligently detects key types from their names (e.g., keys containing "age" will generate numbers, "email" will generate email addresses) and creates realistic sample data.
        </p>
        <TermGlossary items={[
          { term: 'JSON', desc: isKo ? 'JavaScript Object Notation의 약자로, 키와 값의 쌍으로 데이터를 표현하는 가벼운 텍스트 기반 데이터 형식입니다. API 통신과 설정 파일에 널리 쓰입니다.' : 'Short for JavaScript Object Notation, a lightweight text-based data format that represents data as key-value pairs. Widely used for API communication and configuration files.' },
          { term: isKo ? '키-값 쌍(Key-Value Pair)' : 'Key-Value Pair', desc: isKo ? 'JSON에서 데이터를 표현하는 기본 단위입니다. "name": "John"처럼 고유한 키에 해당하는 값을 묶어 데이터의 의미를 정의합니다.' : 'The basic unit of data in JSON. It binds a value to a unique key—like "name": "John"—to define the meaning of the data.' },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">1</span>
          <div>
            <p className="font-semibold text-foreground">Choose your data types and fields</p>
            <p className="mt-1">Define the keys you want, such as name, age, and email. The generator detects each field's type from its name.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">2</span>
          <div>
            <p className="font-semibold text-foreground">Set the number of objects</p>
            <p className="mt-1">Choose how many records to generate so you get enough sample data for your tests or prototype.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">3</span>
          <div>
            <p className="font-semibold text-foreground">Generate</p>
            <p className="mt-1">Press the generate button to create a valid JSON array filled with realistic random values.</p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs mt-0.5">4</span>
          <div>
            <p className="font-semibold text-foreground">Copy your result</p>
            <p className="mt-1">Copy the output directly or download it as a .json file to use in your project.</p>
          </div>
        </li>
      </ol>
    ),
    workedExamples: (
      <div className="space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">Example 1 — User objects</p>
          <p>
            Generating 3 user records with the fields <code className="font-mono text-xs">name</code>, <code className="font-mono text-xs">age</code>, and <code className="font-mono text-xs">email</code> produces an array of three distinct objects, each with a random name, a random integer age, and a unique email address.
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`[
  { "name": "Alice", "age": 29, "email": "alice@example.com" },
  { "name": "Bob", "age": 34, "email": "bob@example.com" },
  { "name": "Carol", "age": 25, "email": "carol@example.com" }
]`}</pre>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Example 2 — Nested object</p>
          <p>
            Defining a field like <code className="font-mono text-xs">address</code> that itself contains <code className="font-mono text-xs">city</code> and <code className="font-mono text-xs">zip</code> generates a nested object inside each record, mirroring more complex real-world data structures.
          </p>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs whitespace-pre overflow-x-auto">{`{
  "name": "Dave",
  "address": {
    "city": "Seoul",
    "zip": "04524"
  }
}`}</pre>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">How it works:</p>
        <ul className="space-y-2 text-sm">
          <li><strong>Key Detection:</strong> The generator analyzes each key name to determine the appropriate data type and format.</li>
          <li><strong>Data Generation:</strong> For each item, random values are generated based on the detected key type.</li>
          <li><strong>Output:</strong> Results are formatted as a valid JSON array with proper indentation.</li>
        </ul>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-center font-mono text-sm">
            {'{'} "name": "John", "age": 28, "email": "user@example.com" {'}'}
          </p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Use descriptive key names so the generator can infer the right data type.</li>
          <li>Keep the number of items reasonable for testing purposes.</li>
          <li>You can copy the output directly or download it as a .json file.</li>
          <li>Use this data for API testing, database seeding, or UI prototyping.</li>
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
