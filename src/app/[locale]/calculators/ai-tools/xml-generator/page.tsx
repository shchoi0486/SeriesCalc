import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./XmlGeneratorClient";
import FaqItem from "@/components/calculators/FaqItem";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/xml-generator", "ai-tools", "xml-generator");
}

export default function XmlGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "XML과 JSON의 차이는 무엇인가요?" : "What is the difference between XML and JSON?",
      a: isKo
        ? "XML은 태그 기반의 마크업 언어로 사람이 읽기 쉽고, 속성·네임스페이스·스키마(XSD) 등 복잡한 구조를 표현할 수 있습니다. JSON은 가볍고 간결해 기계가 파싱하기 쉽고, JavaScript 환경과 잘 어울립니다. XML은 문서 중심·호환성·표준(SOAP, XHTML 등)이 중요한 곳에, JSON은 웹 API 데이터 교환에 주로 사용됩니다."
        : "XML is a tag-based markup language that is human-readable and supports complex structures like attributes, namespaces, and schemas (XSD). JSON is lightweight, machine-friendly, and fits naturally with JavaScript. XML suits document-centric, standards-driven scenarios (SOAP, XHTML), while JSON dominates web API data exchange.",
    },
    {
      q: isKo ? "셀프 클로징 태그란 무엇인가요?" : "What are self-closing tags?",
      a: isKo
        ? "자식 요소가 없는 빈 요소를 표현하는 문법입니다. 예를 들어 <empty />와 같이 시작 태그 끝에 슬래시(/)를 붙여 작성합니다. XML에서는 모든 요소가 반드시 닫혀야 하므로, 내용이 없는 요소는 셀프 클로징 방식으로 작성해야 올바른 XML이 됩니다."
        : "Self-closing tags express empty elements that have no children, written like <empty /> with a slash at the end of the start tag. In XML every element must be closed, so elements with no content must be written this way to produce well-formed XML.",
    },
    {
      q: isKo ? "속성(attribute)과 요소(element) 중 무엇을 써야 하나요?" : "Should I use attributes or elements?",
      a: isKo
        ? "속성은 해당 요소의 메타데이터나 단일 값을 간결하게 표현할 때, 요소는 반복되는 구조나 계층적 데이터를 표현할 때 적합합니다. 일반적으로 데이터 자체는 요소로, 그 데이터를 설명하는 보조 정보는 속성으로 두는 것이 관례입니다. 이 도구는 두 방식을 모두 지원하므로 구조에 맞게 선택하면 됩니다."
        : "Attributes suit concise metadata or single values for an element, while elements suit repeated or hierarchical data. As a convention, store the data itself in elements and auxiliary descriptive information in attributes. This tool supports both, so choose according to your structure.",
    },
    {
      q: isKo ? "네임스페이스(namespace)는 어떻게 처리되나요?" : "How are namespaces handled?",
      a: isKo
        ? "네임스페이스는 서로 다른 출처의 요소 이름이 충돌하지 않도록 구분해 주는 메커니즘입니다. xmlns 속성으로 URI를 선언하며, 같은 이름의 요소라도 서로 다른 네임스페이스에 속하면 충돌하지 않습니다. 생성기는 필요에 따라 xmlns 선언을 넣어 구조화된 문서를 만들 수 있도록 돕습니다."
        : "Namespaces prevent name collisions between elements from different sources. Declared with the xmlns attribute referencing a URI, elements sharing a name can coexist when they belong to different namespaces. The generator helps you produce documents with xmlns declarations as needed.",
    },
    {
      q: isKo ? "JSON이 있는데 언제 XML을 사용해야 하나요?" : "When should I use XML instead of JSON?",
      a: isKo
        ? "XML은 복잡한 문서 구조·주석·스키마 검증·네임스페이스가 필요한 경우, 그리고 기존 엔터프라이즈 시스템(SOAP 웹 서비스, XHTML, RSS/Atom 피드, 금융·보험 등 규제 산업)과의 상호운용성이 중요할 때 여전히 널리 사용됩니다. 이런 환경에서는 XML이 표준인 경우가 많습니다."
        : "XML remains widely used where complex document structure, comments, schema validation, and namespaces matter, and where interoperability with existing enterprise systems (SOAP services, XHTML, RSS/Atom feeds, regulated industries like finance and insurance) is critical. In those contexts XML is often the standard.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>XML Generator</strong> creates well-formed random XML documents based on your specified element names and structure. Useful for testing XML parsers, SOAP services, and configuration file generation.
        </p>
        <p>
          The generator produces valid XML with proper indentation, escaping special characters as needed, and supporting both element and attribute configurations.
        </p>
        <TermGlossary items={[
          { term: 'XML', desc: isKo ? 'eXtensible Markup Language의 약자로, 태그를 사용해 데이터를 구조화하고 전송하는 마크업 언어입니다. HTML과 달리 사용자가 직접 태그를 정의할 수 있습니다.' : 'Short for eXtensible Markup Language, a markup language that structures and transmits data using tags. Unlike HTML, users can define their own tags.' },
          { term: isKo ? '이스케이프(Escaping)' : 'Escaping', desc: isKo ? 'XML 등 마크업 언어에서 <, >, & 같은 특수 문자가 태그와 혼동되지 않도록 &lt;, &gt;, &amp; 등으로 변환하는 처리입니다.' : 'In markup languages like XML, the process of converting special characters such as <, >, & into &lt;, &gt;, &amp; so they are not confused with tags.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">XML Structure:</p>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <pre className="text-xs font-mono">
{`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item>
    <fieldName>value</fieldName>
  </item>
</root>`}
          </pre>
        </div>
        <ul className="space-y-2 text-sm">
          <li><strong>Root element:</strong> The outermost container element.</li>
          <li><strong>Item elements:</strong> Each repeated record in the collection.</li>
          <li><strong>Field elements:</strong> Individual data values within each record.</li>
        </ul>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Use meaningful element names that describe your data structure.</li>
          <li>XML element names cannot contain spaces or start with numbers.</li>
          <li>The generator automatically escapes special XML characters (&lt;, &gt;, &amp;, etc.).</li>
          <li>Useful for testing XML-based APIs and configuration files.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "구조 선택" : "Choose a structure",
            isKo ? "생성할 XML의 루트 요소와 반복되는 항목 구조를 선택합니다." : "Choose the root element and the repeated item structure for the XML you want to generate.",
          ],
          [
            isKo ? "값 입력" : "Enter values",
            isKo ? "각 필드의 요소 이름과 값을 입력합니다. 필요한 경우 속성도 함께 지정할 수 있습니다." : "Enter the element names and values for each field, optionally specifying attributes as well.",
          ],
          [
            isKo ? "XML 생성" : "Generate XML",
            isKo ? "버튼을 눌러 올바른 들여쓰기와 이스케이프가 적용된 유효한 XML 문서를 생성합니다." : "Click the button to generate a valid XML document with proper indentation and escaping.",
          ],
          [
            isKo ? "복사" : "Copy",
            isKo ? "생성된 XML을 클립보드에 복사해 테스트, 저장 또는 API 요청에 사용합니다." : "Copy the generated XML to your clipboard for testing, saving, or use in API requests.",
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
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 1 — 단순 요소" : "Example 1 — Simple element"}</p>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="text-xs font-mono">{`<user>
  <name>Alice</name>
  <email>alice@example.com</email>
</user>`}</pre>
          </div>
          <p className="mt-2">
            {isKo
              ? "루트 요소 <user> 아래에 <name>과 <email> 두 개의 필드 요소를 배치했습니다. 반복하지 않는 단일 레코드는 이처럼 단순한 요소로 표현하면 됩니다."
              : "Two field elements, <name> and <email>, are nested under the root element <user>. A single, non-repeated record is expressed with simple elements like this."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 2 — 중첩 목록" : "Example 2 — Nested list"}</p>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="text-xs font-mono">{`<users>
  <user>
    <name>Alice</name>
    <role>admin</role>
  </user>
  <user>
    <name>Bob</name>
    <role>editor</role>
  </user>
</users>`}</pre>
          </div>
          <p className="mt-2">
            {isKo
              ? "반복되는 레코드는 <users> 루트 아래 <user> 요소를 여러 번 반복해 목록으로 표현합니다. 각 항목을 동일한 구조로 유지하면 XML 파서가 데이터를 일관되게 읽을 수 있습니다."
              : "Repeated records are expressed as a list by repeating the <user> element under the <users> root. Keeping each item in the same structure lets XML parsers read the data consistently."}
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
