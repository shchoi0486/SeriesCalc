import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";

const CONTACT_EMAIL = "seriessnap.co@gmail.com";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "편집 정책 | SeriesCalc" : "Editorial Policy | SeriesCalc",
    description: isKo
      ? "SeriesCalc가 계산기와 가이드 콘텐츠를 작성·검토·수정하는 기준을 공개합니다."
      : "How SeriesCalc writes, reviews and updates calculator pages and guides.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function EditorialPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  return (
    <ProsePage title={isKo ? "편집 정책" : "Editorial Policy"}>
      <p className="text-foreground">
        {isKo
          ? "SeriesCalc는 계산 도구와 설명 콘텐츠를 같은 기준으로 관리합니다. 이 문서는 누가, 무엇을 근거로, 어떻게 검토하고 고치는지를 공개하기 위해 작성되었습니다."
          : "SeriesCalc manages calculators and explanatory content under the same standard. This page discloses who writes it, what it is based on, and how it is reviewed and corrected."}
      </p>

      <ProseSection title={isKo ? "1. 콘텐츠 작성 원칙" : "1. How content is produced"}>
        {isKo ? (
          <ul className="list-disc list-inside space-y-2">
            <li>모든 계산기 페이지는 <strong>공식·입력값 의미·결과 해석·사용 예시</strong>를 함께 제공합니다.</li>
            <li>계산 로직은 공개된 표준식(예: 원리금균등 공식, Darcy-Weisbach, Barlow, NPSH)을 따르며, 임의 보정값을 숨기지 않습니다.</li>
            <li>가이드 글은 계산기 사용법과 배경지식을 연결하는 목적으로만 작성하며, 검색 유입만을 위한 반복 문장을 넣지 않습니다.</li>
            <li>자동 생성된 문장을 그대로 게시하지 않으며, 페이지마다 주제에 맞는 설명을 개별 작성합니다.</li>
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            <li>Every calculator page states the <strong>formula, the meaning of each input, how to read the result, and a worked example</strong>.</li>
            <li>Calculation logic follows published standard equations (e.g. amortization, Darcy-Weisbach, Barlow, NPSH) without hidden correction factors.</li>
            <li>Guides exist only to connect usage and background; we do not pad pages with repetitive keyword text.</li>
            <li>We do not publish raw auto-generated prose — explanations are written per topic.</li>
          </ul>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "2. 검토 절차" : "2. Review process"}>
        {isKo ? (
          <ol className="list-decimal list-inside space-y-2">
            <li>공식 및 단위 정의를 1차 확인합니다.</li>
            <li>예시 값을 손으로 계산해 결과와 대조합니다.</li>
            <li>적용 범위와 한계(가정, 예외 조건)를 페이지에 명시합니다.</li>
            <li>세율·요율처럼 변동되는 값은 기준 연도를 표기하고 개정 시 갱신합니다.</li>
          </ol>
        ) : (
          <ol className="list-decimal list-inside space-y-2">
            <li>Verify the formula and unit definitions first.</li>
            <li>Check example values by hand against the output.</li>
            <li>State the scope and limitations (assumptions, exceptions) on the page.</li>
            <li>For changing values such as tax rates, label the reference year and update on revision.</li>
          </ol>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "3. 수정과 정정" : "3. Corrections"}>
        <p>
          {isKo
            ? "오류 제보를 받으면 계산 로직 오류를 우선 확인하고, 사실 오류는 확인 후 수정합니다. 수정 시 페이지 하단의 갱신 정보를 함께 업데이트합니다. 정정 요청은 아래 이메일로 보내주세요."
            : "When an error is reported we check calculation logic first, then verify and fix factual issues. Updates refresh the page metadata as well. Send correction requests to the address below."}
        </p>
        <p className="text-foreground font-medium">{CONTACT_EMAIL}</p>
      </ProseSection>

      <ProseSection title={isKo ? "4. 광고와 편집의 분리" : "4. Advertising independence"}>
        <p>
          {isKo
            ? "SeriesCalc는 광고로 운영되지만, 광고주가 계산 결과나 설명 내용에 영향을 줄 수 없습니다. 광고 영역은 콘텐츠와 시각적으로 구분되며, 특정 상품을 추천하는 대가로 순위를 바꾸지 않습니다."
            : "SeriesCalc is ad-funded, but advertisers cannot influence results or explanations. Ad areas are visually separated from content, and we do not reorder content in exchange for promoting a product."}
        </p>
      </ProseSection>

      <ProseSection title={isKo ? "5. 운영자 정보" : "5. Publisher"}>
        <p>
          {isKo
            ? "SeriesCalc는 개인 운영자가 제작·운영하는 무료 계산기 서비스입니다. 사이트 전반의 기획, 계산 로직 구현, 콘텐츠 작성과 유지보수를 직접 담당합니다."
            : "SeriesCalc is an independently operated free calculator service. The operator handles planning, calculation logic, content writing and maintenance directly."}
        </p>
      </ProseSection>

      <p className="text-sm text-muted-foreground pt-4 border-t border-border">
        {isKo ? "시행일자: 2026년 1월 1일" : "Effective date: January 1, 2026"}
      </p>
    </ProsePage>
  );
}
