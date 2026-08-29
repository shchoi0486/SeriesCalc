import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "SeriesCalc 소개 | 모든 계산기를 한곳에" : "About SeriesCalc | Every Calculator in One Place",
    description: isKo
      ? "SeriesCalc는 일상부터 전문 분야까지 필요한 모든 계산기를 무료로, 개인정보 걱정 없이 제공합니다."
      : "SeriesCalc offers every calculator you need — from daily life to professional fields — for free and with privacy in mind.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  return (
    <ProsePage title={isKo ? "SeriesCalc 소개" : "About SeriesCalc"}>
      <p className="text-foreground">
        {isKo
          ? "SeriesCalc는 일상생활과 전문적인 작업에 필요한 모든 종류의 계산기를 한곳에 모아둔 종합 계산기 플랫폼입니다. 복잡한 수식부터 간단한 단위 변환까지, 사용자 친화적인 인터페이스로 빠르고 정확한 결과를 제공합니다."
          : "SeriesCalc is a comprehensive calculator platform that brings every type of calculator you need — from everyday life to specialized professional fields — into one place. From complex formulas to simple unit conversions, we deliver fast, accurate results through a friendly interface."}
      </p>

      <ProseSection title={isKo ? "우리의 미션" : "Our Mission"}>
        {isKo ? (
          <p>계산은 누구나 필요하지만, 신뢰할 수 있는 도구는 많지 않습니다. SeriesCalc는 광고로 수익을 내되 사용자 경험을 해치지 않으며, 회원가입 없이 즉시 사용할 수 있는 투명한 계산기 생태계를 만드는 것을 목표로 합니다.</p>
        ) : (
          <p>Everyone needs calculations, yet trustworthy tools are rare. SeriesCalc is funded by advertising without harming the user experience, and our goal is a transparent calculator ecosystem you can use instantly — no account required.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "제공 분야" : "What We Offer"}>
        {isKo ? (
          <ul className="list-disc list-inside space-y-1">
            <li><strong>금융</strong>: 대출·이자·저축·세금·투자 계산기</li>
            <li><strong>변환</strong>: 길이·무게·온도·통화·시간대 등 단위 변환</li>
            <li><strong>일상</strong>: 건강·날짜·쇼핑·물류 계산기</li>
            <li><strong>과학</strong>: 물리·화학·수학 계산기</li>
            <li><strong>공학</strong>: 유체·재료·열역학·전기 등 엔지니어링 계산기</li>
            <li><strong>AI 도구</strong>: 요약·이미지·코드 등 생산성 도구</li>
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Finance</strong>: loan, interest, savings, tax, and investment calculators</li>
            <li><strong>Conversion</strong>: length, weight, temperature, currency, timezone, and more</li>
            <li><strong>Life</strong>: health, date, shopping, and logistics calculators</li>
            <li><strong>Science</strong>: physics, chemistry, and math calculators</li>
            <li><strong>Engineering</strong>: fluid, material, thermodynamics, and electrical calculators</li>
            <li><strong>AI Tools</strong>: summarization, image, code, and productivity tools</li>
          </ul>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "운영 원칙" : "Our Principles"}>
        {isKo ? (
          <ul className="list-disc list-inside space-y-1">
            <li><strong>개인정보 보호</strong>: 입력값은 기본적으로 브라우저 내에서만 처리됩니다.</li>
            <li><strong>정확성</strong>: 공식과 계산 로직을 명확히 공개하고 검증합니다.</li>
            <li><strong>접근성</strong>: 회원가입 없이 누구나 무료로 이용할 수 있습니다.</li>
            <li><strong>투명성</strong>: 수수료·수익 모델을 숨기지 않습니다.</li>
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Privacy</strong>: your inputs are processed locally in the browser by default.</li>
            <li><strong>Accuracy</strong>: we disclose and verify our formulas and calculation logic.</li>
            <li><strong>Accessibility</strong>: anyone can use the Service for free, no sign-up needed.</li>
            <li><strong>Transparency</strong>: we do not hide our fees or revenue model.</li>
          </ul>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "함께 만들어갑니다" : "Built With You"}>
        {isKo ? (
          <p>더 나은 계산기를 위해 언제든 의견을 보내주세요. 새로운 계산기 제안, 오류 신고, 콘텐츠 개선 사항 모두 환영합니다. 문의는 하단 푸터의 \"문의하기\"를 이용해 주시기 바랍니다.</p>
        ) : (
          <p>We welcome your feedback to build better calculators — new ideas, bug reports, and content improvements. Please use the \"Contact\" link in the footer below.</p>
        )}
      </ProseSection>
    </ProsePage>
  );
}
