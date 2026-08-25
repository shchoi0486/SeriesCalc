import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./NotepadClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/notepad", "life", "notepad");
}



export default function NotepadPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.notepad;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("메모장 데이터가 브라우저 외부에 저장되나요?", "Is notepad data saved outside the browser?"),
      a: L(
        "아닙니다. 모든 데이터는 브라우저의 localStorage에 저장되며, 서버로 전송되지 않습니다. 같은 브라우저·같은 기기에서만 접근할 수 있으며, 브라우저 데이터를 삭제하면 메모도 함께 사라집니다.",
        "No. All data is stored in browser localStorage only — never sent to a server. Accessible only on the same browser/device; clearing browser data deletes the notes.",
      ),
    },
    {
      q: L("자동 저장은 얼마나 자주 되나요?", "How often is auto-save triggered?"),
      a: L(
        "텍스트가 변경될 때마다 자동으로 저장됩니다(키 입력 시마다). 수동으로 저장 버튼을 누를 필요가 없습니다. 다만 브라우저가 비정상적으로 종료되면 마지막 자동 저장 이후의 내용이 일부 누락될 수 있습니다.",
        "Auto-saves on every keystroke — no manual save needed. If the browser crashes, some content after the last auto-save may be lost.",
      ),
    },
    {
      q: L("여러 기기에서 동기화되나요?", "Does it sync across devices?"),
      a: L(
        "아니요, 동기화 기능은 없습니다. 각 브라우저의 localStorage는 독립적이므로, PC에서 작성한 메모를 모바일에서 보려면 복사-붙여넣기나 파일 내보내기가 필요합니다. 클라우드 동기화가 필요한 경우 별도의 메모 앱(Notion, Obsidian 등)을 사용하세요.",
        "No sync. Each browser's localStorage is isolated. To view PC notes on mobile, copy-paste or export. Use dedicated note apps (Notion, Obsidian) for cloud sync.",
      ),
    },
    {
      q: L("메모를 파일로 내보낼 수 있나요?", "Can I export notes to a file?"),
      a: L(
        "이 버전에서는 자동 내보내기 기능이 없을 수 있습니다. 텍스트를 선택한 뒤 Ctrl+C로 복사하여 텍스트 파일(.txt)에 붙여넣으면 됩니다. 데이터 백업이 중요한 경우 정기적으로 수동 복사를 권장합니다.",
        "This version may not have auto-export. Select all text, copy with Ctrl+C, and paste into a .txt file. Manual backup is recommended for important notes.",
      ),
    },
    {
      q: L("localStorage 용량 제한은?", "Is there a localStorage size limit?"),
      a: L(
        "대부분의 브라우저에서 localStorage는 도메인당 약 5~10MB입니다. 일반적인 메모(수천 줄)는 이 제한에 걸리지 않지만, 매우 긴 텍스트나 이미지를 텍스트로 인코딩한 경우 한도에 도달할 수 있습니다. 한도 초과 시最早的 저장된 데이터가 잘립니다.",
        "Most browsers allow ~5–10 MB per domain for localStorage. Normal notes won't hit this, but very long text may. Exceeding the limit truncates the earliest data.",
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
            L("텍스트 입력", "Enter text"),
            L("텍스트 영역에 메모할 내용을 입력합니다. 변경되는 즉시 자동 저장됩니다.", "Type in the text area. Changes auto-save immediately."),
          ],
          [
            L("자동 저장 확인", "Verify auto-save"),
            L("입력하면 상태 표시에 '저장됨'이 표시됩니다. 수동 저장 버튼은 필요 없습니다.", "A 'Saved' indicator appears as you type — no manual save needed."),
          ],
          [
            L("새로고침 테스트", "Test refresh"),
            L("브라우저를 새로고침해도 메모가 유지되는지 확인할 수 있습니다.", "Refresh the browser to confirm notes persist."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 — 회의 메모", "Example — Meeting notes")}</p>
          <p>
            {L(
              "회의 중 빠르게 메모를 작성하고, 회의가 끝난 뒤 브라우저에서 복사하여 사내 문서 시스템에 붙여넣습니다. 브라우저를 닫아도 메모가 남아 있으므로, 퇴근 후 다시 확인할 수 있습니다.",
              "Jot meeting notes quickly, then copy-paste to your internal doc system after the meeting. Notes persist after closing the browser, so you can review them later.",
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
