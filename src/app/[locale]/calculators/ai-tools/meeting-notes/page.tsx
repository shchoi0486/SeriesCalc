import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./MeetingNotesClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/meeting-notes", "ai-tools", "meeting-notes");
}



export default function MeetingNotesPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">{L('회의록 작성기', 'Meeting Notes')}</strong>{L('는 회의 중 논의된 안건, 결정 사항, 액션 아이템 등을 체계적으로 기록하고, 표준화된 마크다운(Markdown) 형식의 회의록을 자동으로 생성하는 업무 생산성 도구입니다. 회의 제목, 날짜, 참석자, 안건별 논의 내용, 액션 아이템 등을 구조화된 폼에 입력하기만 하면 깔끔한 형식의 회의록이 즉시 생성됩니다.', ' is a productivity tool that systematically records agenda items, decisions, and action items discussed in a meeting and automatically generates a standardized Markdown-formatted minutes document. Simply enter the meeting title, date, attendees, per-agenda discussions, and action items into a structured form, and a clean minutes document is generated instantly.')}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L('팀 미팅, 프로젝트 회의, 스프린트 리뷰, 세미나, 워크숍 등 다양한 유형의 회의에서 활용할 수 있습니다. 회의 중이나 직후에 이 도구를 사용하면 회의 내용을 빠르게 정리할 수 있으며, 생성된 회의록은 마크다운 형식으로 제공되어 GitHub, Notion, Obsidian, Confluence 등 주요 협업 도구에 바로 통합할 수 있습니다.', 'It is useful for team meetings, project meetings, sprint reviews, seminars, and workshops. Using it during or right after a meeting lets you organize content quickly, and the generated minutes are in Markdown, ready to integrate with GitHub, Notion, Obsidian, Confluence, and other collaboration tools.')}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L('회의록의 핵심 요소인 액션 아이템(작업 내용, 담당자, 마감일)을 별도로 관리할 수 있어, 회의 후속 조치를 체계적으로 추적하는 데에도 유용합니다. 안건은 추가/삭제가 가능하여 회의 규모에 따라 유연하게 조절할 수 있습니다.', 'The core element — action items (task, assignee, deadline) — can be managed separately, making it easy to systematically track follow-up. Agenda items can be added/removed to flexibly fit the meeting size.')}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L('웹 브라우저에서 바로 사용 가능하며, 생성된 회의록은 마크다운 복사 버튼으로 클립보드에 복사하여 메일, 채팅, 문서 등에 즉시 공유할 수 있습니다. 회의록 표준화를 통해 팀 전체의 커뮤니케이션 효율성을 높여주는 실용적인 도구입니다.', 'It runs directly in the browser, and the generated minutes can be copied to the clipboard via the Markdown copy button and shared immediately via email, chat, or documents. It boosts team communication efficiency through standardized minutes.')}
        </p>
        <TermGlossary items={[
          { term: L('마크다운(Markdown)', 'Markdown'), desc: L('일반 텍스트에 가벼운 서식 문법(# 제목, - 목록, | 표 등)을 적용하는 마크업 언어입니다. GitHub, Notion, Obsidian 등에서 바로 렌더링됩니다.', 'A lightweight markup language that applies simple formatting syntax to plain text (# heading, - list, | table, etc.). Renders directly in GitHub, Notion, Obsidian, and more.') },
          { term: L('액션 아이템', 'Action Item'), desc: L('회의에서 결정된 후속 작업을 뜻합니다. 보통 작업 내용, 담당자, 마감일이 함께 관리되어 이행 여부를 추적합니다.', 'Follow-up tasks decided in a meeting. Usually tracked with task, assignee, and deadline to monitor completion.') },
          { term: L('안건', 'Agenda'), desc: L('회의에서 논의할 주제 또는 안건입니다. 안건별로 발표자, 논의 내용, 결정 사항을 정리하여 회의록을 구성합니다.', 'A topic or issue to discuss in a meeting. Each agenda item is organized with presenter, discussion, and decision to compose the minutes.') },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold text-foreground text-sm">{L('회의록 생성 알고리즘:', 'Meeting Notes Generation Algorithm:')}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {L('본 도구는 ', 'This tool uses a ')}<strong className="text-foreground">{L('구조화 데이터 → 마크다운 변환 알고리즘', 'structured data → Markdown conversion algorithm')}</strong>{L('을 사용합니다. 사용자가 입력한 회의 정보(제목, 날짜, 참석자, 안건, 액션 아이템)를 마크다운 문법으로 자동 변환하여 표준화된 회의록 문서를 생성합니다.', ' . It automatically converts the meeting information you entered (title, date, attendees, agenda, action items) into Markdown syntax to produce a standardized minutes document.')}
        </p>
        <div className="bg-muted p-4 rounded-lg space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">{L('1단계 - 회의 기본 정보 구성:', 'Step 1 - Compose basic meeting info:')}</strong> {L('회의 제목을 마크다운 제목(#), 날짜와 참석자를 목록(-) 형식으로 변환합니다. 입력되지 않은 정보는 "미정"으로 표시됩니다.', 'Convert the title to a Markdown heading (#), and date and attendees to a list (-). Missing info is shown as "TBD".')}</p>
          <p><strong className="text-foreground">{L('2단계 - 안건 및 논의 사항 정리:', 'Step 2 - Organize agenda & discussions:')}</strong> {L('각 안건을 번호 매긴 소제목(###)으로 구성하고, 발표자, 논의 내용, 결정 사항을 각각 마크다운 목록(-) 형식으로 변환합니다. 빈 안건은 자동으로 제외됩니다.', 'Compose each agenda item as a numbered subheading (###), and convert presenter, discussion, and decision into Markdown list (-) items. Empty items are excluded automatically.')}</p>
          <p><strong className="text-foreground">{L('3단계 - 액션 아이템 테이블 생성:', 'Step 3 - Generate action-item table:')}</strong> {L('액션 아이템(작업, 담당자, 마감일)을 마크다운 표(|) 형식으로 변환합니다. 이 형식은 GitHub, Notion 등에서 테이블로 깔끔하게 렌더링됩니다.', 'Convert action items (task, assignee, deadline) into a Markdown table (|). This renders cleanly as a table in GitHub, Notion, etc.')}</p>
          <p><strong className="text-foreground">{L('4단계 - 메모 영역 및 출처 표시:', 'Step 4 - Notes area & source:')}</strong> {L('추가 메모를 위한 빈 체크리스트(- [ ]) 영역과 회의록 생성 출처를 하단에 자동으로 추가합니다.', 'Automatically add an empty checklist (- [ ]) area for extra notes and a source note at the bottom.')}</p>
        </div>
        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
          <p><strong className="text-foreground">{L('출력 형식:', 'Output format:')}</strong> Markdown - {L('GitHub, Notion, Obsidian, Confluence, Typora 등 모든 마크다운 지원 플랫폼에서 바로 사용 가능합니다. 별도의 포맷 변환 없이 복사-붙여넣기만으로 깔끔한 회의록이 완성됩니다.', 'works directly in all Markdown-supporting platforms such as GitHub, Notion, Obsidian, Confluence, and Typora. A clean minutes document is complete with copy-paste, no format conversion needed.')}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold text-foreground text-sm">{L('효과적인 사용법과 팁:', 'Effective Usage and Tips:')}</p>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">{L('1. 회의 중 실시간으로 기록하세요', '1. Record in real time during the meeting')}</p>
            <p>{L('회의가 진행되는 동안 이 도구를 옆에 두고 안건과 논의 내용을 실시간으로 입력하면, 회의 종료 즉시 완성된 회의록을 확보할 수 있습니다. 회의 후 기억에 의존하는 것보다 정확하고 완전한 회의록을 작성할 수 있습니다.', 'Keep this tool nearby and enter agenda and discussions in real time as the meeting proceeds, so you have a finished minutes document the moment it ends — more accurate and complete than relying on memory afterward.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('2. 액션 아이템은 구체적으로 작성하세요', '2. Write action items concretely')}</p>
            <p>{L('"마케팅 자료 준비"보다는 "2분기 마케팅 예산 계획서 작성 (PDF)"처럼 구체적이고 측정 가능한 형태로 작성하세요. 담당자와 마감일을 반드시 지정하여 회의 후속 조치가 이행되도록 관리하세요.', 'Be specific and measurable, e.g. "Write Q2 marketing budget plan (PDF)" rather than "prepare marketing materials". Always assign an owner and deadline so follow-ups are executed.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('3. 안건은 주제별로 나누어 입력하세요', '3. Enter agenda items by topic')}</p>
            <p>{L('하나의 안건에 여러 가지 주제가 섞이면 가독성이 떨어집니다. 각 안건을 하나의 명확한 주제로 정의하고, 필요하면 안건을 추가하여 분리하세요. "안건 추가" 버튼으로 원하는 만큼 안건을 생성할 수 있습니다.', 'Mixing topics in one item hurts readability. Define each item as one clear topic, and add items as needed using the "Add agenda" button.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('4. 마크다운 형식의 장점을 활용하세요', '4. Leverage the Markdown format')}</p>
            <p>{L('생성된 회의록은 마크다운 형식이므로, GitHub 레포지토리의 문서로 저장하거나, Notion 페이지에 붙여넣기 하거나, Obsidian 메모로 활용할 수 있습니다. 각 플랫폼에서 자동으로 예쁜 서식으로 렌더링됩니다.', 'Because the output is Markdown, you can save it as a GitHub repo document, paste it into a Notion page, or use it as an Obsidian note — each platform renders it nicely automatically.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('5. 팀 공유 문서에 업데이트하세요', '5. Update your team’s shared doc')}</p>
            <p>{L('생성된 회의록을 팀이 공유하는 문서(Notion, Google Docs, Confluence 등)에 바로 업데이트하세요. 모든 팀원이 회의 내용과 액션 아이템을 확인할 수 있도록 하면 투명한 협업이 가능합니다.', 'Update the generated minutes directly into your team’s shared doc (Notion, Google Docs, Confluence, etc.) so all members can see the content and action items, enabling transparent collaboration.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('6. 정기적인 회의록 관리 습관을 만드세요', '6. Build a habit of managing minutes regularly')}</p>
            <p>{L('매 회의마다 이 도구를 사용하여 일관된 형식의 회의록을 작성하면, 시간 경과에 따른 의사 결정 추적과 프로젝트 관리가 훨씬 수월해집니다. 회의록 파일명에 날짜를 포함하는 것도 좋은 습관입니다.', 'Using this tool for every meeting produces consistent minutes, making decision tracking and project management over time much easier. Including the date in the filename is a good habit.')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{L('7. 메모 영역을 적극 활용하세요', '7. Make active use of the notes area')}</p>
            <p>{L('회의록 하단의 메모 영역은 회의 중 떠오른 아이디어, 추후 논의가 필요한 사항, 개인 메모 등을 기록하는 데 유용합니다. 체크리스트(- [ ]) 형식으로 제공되어 할 일 관리 도구로도 활용할 수 있습니다.', 'The notes area at the bottom is useful for ideas that come up, items to discuss later, and personal memos. Provided as a checklist (- [ ]), it can also serve as a to-do tool.')}</p>
          </div>
        </div>
      </div>
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
