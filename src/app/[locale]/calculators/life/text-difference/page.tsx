import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./TextDifferenceClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/text-difference", "life", "text-difference");
}



export default function TextDifferencePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.textDifference;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("이 도구는 어떤 알고리즘을 사용하나요?", "What algorithm does this tool use?"),
      a: L(
        "Longest Common Subsequence(LCS) 알고리즘을 사용합니다. 두 텍스트에서 공통으로 등장하는 가장 긴 문자열 시퀀스를 찾아, 나머지를 '추가됨'(초록) 또는 '삭제됨'(빨강)으로 표시합니다. 줄 단위 비교와 문자 단위 비교를 모두 지원합니다.",
        "It uses the Longest Common Subsequence (LCS) algorithm, finding the longest common character sequence and marking additions (green) and deletions (red). Both line-level and character-level diffs are supported.",
      ),
    },
    {
      q: L("긴 텍스트도 비교할 수 있나요?", "Can it compare long texts?"),
      a: L(
        " UIResponder의 브라우저 메모리 제한 때문에 매우 긴 텍스트(수만 줄 이상)는 비교 속도가 느려지거나 브라우저가 멈출 수 있습니다. 일반적인 문서 편집·번역 비교 용도(수백~수천 줄)에서는 무리 없이 작동합니다.",
        "Very long texts (tens of thousands of lines) may slow or freeze the browser due to memory limits. For typical document/translation comparisons (hundreds to thousands of lines), it works fine.",
      ),
    },
    {
      q: L("대소문자를 구분하나요?", "Is the comparison case-sensitive?"),
      a: L(
        "기본적으로 대소문자를 구분합니다(case-sensitive). 'Hello'와 'hello'는 다른 문자로 간주됩니다. 대소문자 무시 비교가 필요한 경우, 비교 전에 두 텍스트 모두 소문자로 변환한 뒤 입력하세요.",
        "By default it is case-sensitive — 'Hello' and 'hello' are treated as different. Convert both to lowercase before input for case-insensitive comparison.",
      ),
    },
    {
      q: L("공백·줄바꿈 차이도 비교되나요?", "Are whitespace and line breaks compared too?"),
      a: L(
        "예, 모든 문자(공백, 탭, 줄바꿈 포함)가 비교 대상입니다. 'Hello World'와 'Hello  World'(공백 2개)는 차이로 표시됩니다. 비교 전에 불필요한 공백을 정리하거나, 코드 비교라면 정규화(trim 등)를 적용하는 것이 좋습니다.",
        "All characters including spaces, tabs, and line breaks are compared. 'Hello World' vs 'Hello  World' (double space) shows a difference. Trim or normalize whitespace before comparing code.",
      ),
    },
    {
      q: L("비교 결과를 공유할 수 있나요?", "Can I share the comparison result?"),
      a: L(
        "이 도구는 클라이언트 사이드에서만 작동하며 결과를 서버에 저장하지 않습니다. 비교 결과를 공유하려면 스크린샷을 찍거나, 브라우저 인쇄 기능으로 PDF를 만들어 전달하세요.",
        "The tool runs entirely client-side with no server storage. Share results via screenshot or browser print-to-PDF.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        ${t.descriptionContent}
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("원본 텍스트 입력", "Enter original text"),
            L("비교 기준이 되는 텍스트를 왼쪽 영역에 붙여넣습니다.", "Paste the baseline text into the left area."),
          ],
          [
            L("비교 대상 텍스트 입력", "Enter comparison text"),
            L("변경된 텍스트를 오른쪽 영역에 붙여넣습니다.", "Paste the modified text into the right area."),
          ],
          [
            L("비교 버튼 클릭", "Click compare"),
            L("차이점이 색상으로 표시됩니다: 초록=추가, 빨강=삭제, 회색=변경 없음.", "Differences appear color-coded: green=added, red=removed, gray=unchanged."),
          ],
          [
            L("결과 확인", "Review results"),
            L("각 변경 블록에서 추가·삭제된 내용을 확인할 수 있습니다.", "Review each changed block for added and removed content."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 번역 교정 비교", "Example 1 — Translation revision")}</p>
          <p>
            {L(
              "원문: 'The quick brown fox jumps over the lazy dog' vs 수정: 'The quick brown fox jumped over the lazy dog' → 'jumps'가 'jumped'로 변경된 한 곳만 빨간색으로 표시됩니다. 시제 변화 같은 미세 교정을 빠르게 찾을 수 있습니다.",
              "Original: 'The quick brown fox jumps over the lazy dog' vs revised: '...jumped...' → Only 'jumps→jumped' is highlighted red. Quick way to spot subtle tense changes.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 코드 리뷰", "Example 2 — Code review")}</p>
          <p>
            {L(
              "두 버전의 코드를 나란히 넣으면 추가된 줄(초록)과 삭제된 줄(빨강)이 즉시 구분됩니다. Git diff와 유사한 시각화를 브라우저에서 바로 확인할 수 있어, 코드 리뷰·변경 이력 확인에 활용할 수 있습니다.",
              "Paste two code versions side by side: added lines (green) and removed lines (red) are instantly visible — similar to Git diff, directly in the browser.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formulaContent}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tipsContent}</p>
      </div>
    `,
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
