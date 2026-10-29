import type { Metadata } from "next";
import Link from "next/link";
import { locales } from "@/i18n/config";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "SeriesCalc 소개 | 필요한 계산기, 모두 한곳에" : "About SeriesCalc | Every Calculator in One Place",
    description: isKo
      ? "SeriesCalc는 일상부터 전문 분야까지 필요한 계산기를 무료로, 개인정보 걱정 없이 제공합니다."
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
          ? "SeriesCalc는 일상과 전문 작업에 필요한 계산기를 한곳에 모아둔 종합 계산기 플랫폼입니다. 복잡한 수식부터 간단한 단위 변환까지, 직관적인 인터페이스로 빠르고 정확한 결과를 제공합니다."
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

      <ProseSection title={isKo ? "운영 주체와 콘텐츠 제작 방식" : "Who Runs SeriesCalc and How Content Is Made"}>
        {isKo ? (
          <div className="space-y-3">
            <p>SeriesCalc는 소규모 독립 팀이 직접 기획·개발·운영하는 무료 계산기 서비스입니다. 계산기 설명, 공식, 예시, 주의사항은 외부 콘텐츠 대행사에 위탁하지 않고 운영자가 직접 작성하고 검토합니다.</p>
            <p>각 계산기 페이지는 <strong>① 근거 공식·법령 확인 → ② 계산 로직 구현 → ③ 예시와 한계 서술 → ④ 결과 교차 검증</strong> 순서로 제작됩니다. 어떤 기준으로 콘텐츠를 쓰고 검토하는지는 <Link href={`/${params.locale}/editorial-policy`} className="text-primary underline">편집 정책</Link>에 공개하고 있습니다.</p>
            <p>세율·보험료율·법정 공휴일처럼 시간에 따라 달라지는 값은 개정 시점에 맞춰 갱신하며, 각 페이지에 데이터 기준 연도를 함께 표시합니다. 오류를 발견하시면 <Link href={`/${params.locale}/contact`} className="text-primary underline">문의하기</Link>로 알려주세요. 확인되는 즉시 수정하고, 계산 결과에 영향을 주는 정정은 페이지에 반영합니다.</p>
            <p>운영 비용은 광고 수익으로 충당합니다. 광고는 콘텐츠 영역과 분리되어 있으며, 광고주가 계산 로직이나 서술 내용에 개입할 수 없습니다. 수집하는 정보와 광고 쿠키에 대한 내용은 <Link href={`/${params.locale}/privacy-policy`} className="text-primary underline">개인정보처리방침</Link>에서 확인할 수 있습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p>SeriesCalc is a free calculator service planned, built, and operated directly by a small independent team. The explanations, formulas, worked examples, and caveats on each page are written and reviewed by the operator — not outsourced to a content agency.</p>
            <p>Every calculator page follows the same sequence: <strong>(1) confirm the underlying formula or regulation, (2) implement the calculation logic, (3) write examples and stated limits, (4) cross-check the results</strong>. The standards we apply are published in our <Link href={`/${params.locale}/editorial-policy`} className="text-primary underline">editorial policy</Link>.</p>
            <p>Values that change over time — tax rates, insurance contribution rates, statutory holidays — are updated as rules are revised, and each page states the reference year of its data. If you spot an error, please tell us through <Link href={`/${params.locale}/contact`} className="text-primary underline">Contact</Link>. We fix confirmed errors promptly and note any correction that changes a calculation result.</p>
            <p>Running costs are covered by advertising. Ads are kept separate from the content area, and no advertiser can influence our formulas or wording. Details on data collection and advertising cookies are in our <Link href={`/${params.locale}/privacy-policy`} className="text-primary underline">Privacy Policy</Link>.</p>
          </div>
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
