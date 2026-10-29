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
    title: isKo ? "개인정보처리방침 | SeriesCalc" : "Privacy Policy | SeriesCalc",
    description: isKo
      ? "SeriesCalc가 사용자의 개인정보를 어떻게 수집·이용·보호하는지 안내합니다."
      : "How SeriesCalc collects, uses, and protects your personal information.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function PrivacyPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  return (
    <ProsePage title={isKo ? "개인정보처리방침" : "Privacy Policy"}>
      <p className="text-foreground">
        {isKo
          ? "본 개인정보처리방침은 SeriesCalc(이하 \"회사\")가 제공하는 계산기 및 웹사이트 서비스(이하 \"서비스\")를 이용함에 있어, 회사가 사용자의 개인정보를 어떻게 수집·이용·보호·관리하는지 설명합니다. 본 방침은 한국 개인정보 보호법 및 유럽 일반개인정보보호법(GDPR) 등 관련 법령을 준수하기 위해 작성되었습니다."
          : "This Privacy Policy explains how SeriesCalc (\"we\", \"us\", or \"the Company\") collects, uses, protects, and manages your personal information when you use our calculators and website (the \"Service\"). It is written to comply with the Korean Personal Information Protection Act (PIPA) and the EU General Data Protection Regulation (GDPR)."}
      </p>

      <ProseSection title={isKo ? "1. 수집하는 개인정보" : "1. Information We Collect"}>
        {isKo ? (
          <>
            <p>회사는 서비스 제공을 위해 원칙적으로 별도의 회원가입 없이 계산기 기능을 이용할 수 있도록 설계되어 있으며, 입력하신 대부분의 값(금액, 날짜, 단위 등)은 <strong>사용자 브라우저 내에서만 처리</strong>되고 서버로 전송되거나 저장되지 않습니다.</p>
            <p>다만, 다음 정보는 서비스 운영·분석·광고를 위해 수집될 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>자동 수집 정보: IP 주소, 브라우저 종류, 방문 페이지, 접속 시간, 쿠키 및 유사 기술 식별자</li>
              <li>문의하기를 통해 자발적으로 제공하신 이름, 이메일, 문의 내용</li>
              <li>Google AdSense 등 광고 서비스가 제공하는 비식별화된 광고 식별자</li>
            </ul>
          </>
        ) : (
          <>
            <p>By design, the Service requires no account or registration, and most values you enter (amounts, dates, units, etc.) are <strong>processed entirely within your browser</strong> and are never transmitted to or stored on our servers.</p>
            <p>However, the following information may be collected for operation, analytics, and advertising purposes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Automatically collected data: IP address, browser type, pages visited, access time, cookies and similar technology identifiers</li>
              <li>Information you voluntarily provide through the Contact form (name, email, message)</li>
              <li>Non-identifying advertising identifiers provided by services such as Google AdSense</li>
            </ul>
          </>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "2. 수집 목적" : "2. How We Use Information"}>
        {isKo ? (
          <ul className="list-disc list-inside space-y-1">
            <li>계산기 서비스 제공 및 성능 최적화</li>
            <li>서비스 이용 통계 분석 및 콘텐츠 개선</li>
            <li>맞춤형 광고 게재(Google AdSense) 및 광고 성과 측정</li>
            <li>문의에 대한 회신 및 고객 지원</li>
            <li>법령 준수 및 부정 이용 방지</li>
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            <li>Providing and optimizing the calculator Service</li>
            <li>Analyzing usage statistics and improving content</li>
            <li>Displaying personalized ads (Google AdSense) and measuring ad performance</li>
            <li>Responding to inquiries and providing customer support</li>
            <li>Complying with laws and preventing abuse</li>
          </ul>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "3. 쿠키 및 제3자 서비스" : "3. Cookies and Third-Party Services"}>
        {isKo ? (
          <>
            <p>회사는 서비스 품질 향상과 광고 게재를 위해 쿠키를 사용합니다. 주요 제3자 서비스는 다음과 같습니다.</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Google Analytics</strong>: 비식별화된 이용 통계 수집</li>
              <li><strong>Google AdSense</strong>: 광고 게재 및 광고 쿠키 사용</li>
            </ul>
            <p>
              <strong>제3자 광고 사업자 고지</strong>: Google을 포함한 제3자 광고 사업자는 쿠키(예: DoubleClick 쿠키)를 사용하여
              이용자가 본 웹사이트 또는 다른 웹사이트를 이전에 방문한 기록에 기반한 광고를 게재할 수 있습니다. Google이 광고
              쿠키를 사용함으로써 Google과 파트너는 이용자의 본 사이트 및/또는 인터넷상 다른 사이트 방문 기록을 바탕으로
              광고를 게재합니다. 이용자는{" "}
              <a className="text-primary underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>
              에서 맞춤 광고를 사용 중지할 수 있으며,{" "}
              <a className="text-primary underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>
              에서 제3자 광고 사업자의 맞춤 광고 쿠키를 일괄적으로 거부할 수 있습니다. Google이 파트너 사이트의 정보를 어떻게
              이용하는지는{" "}
              <a className="text-primary underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google 파트너 사이트 정책</a>
              에서 확인할 수 있습니다.
            </p>
            <p>사용자는 브라우저 설정을 통해 쿠키를 거부할 수 있습니다. 다만 쿠키를 거부하면 광고가 이용자의 관심사와 무관하게 표시될 수 있고, 일부 기능 이용에 제약이 있을 수 있습니다. 유럽경제지역(EEA)·영국 이용자의 경우 동의 관리 배너에서 선택하기 전까지 광고·분석 쿠키가 기본적으로 비활성화됩니다.</p>
          </>
        ) : (
          <>
            <p>We use cookies to improve the Service and to serve advertisements. Key third-party services include:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Google Analytics</strong>: collection of non-identifying usage statistics</li>
              <li><strong>Google AdSense</strong>: ad delivery and use of advertising cookies</li>
            </ul>
            <p>
              <strong>Third-party vendors disclosure</strong>: Third-party vendors, including Google, use cookies (such as the
              DoubleClick cookie) to serve ads based on your prior visits to this website or other websites. Google&apos;s use of
              advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other
              sites on the Internet. You may opt out of personalized advertising by visiting{" "}
              <a className="text-primary underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>
              , and you can opt out of third-party vendors&apos; use of cookies for personalized advertising at{" "}
              <a className="text-primary underline" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>
              . For details on how Google uses information from partner sites, see{" "}
              <a className="text-primary underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>
              .
            </p>
            <p>You can also refuse cookies through your browser settings. If you do, ads may be less relevant to your interests and some features may be limited. For visitors in the EEA and the UK, advertising and analytics cookies remain disabled by default until you choose otherwise in our consent banner.</p>
          </>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "4. 개인정보 보관 및 파기" : "4. Data Retention and Deletion"}>
        {isKo ? (
          <p>회사는 수집한 개인정보를 목적 달성 후 지체 없이 파기합니다. 문의를 통해 수집된 정보는 문의 처리 후 합리적인 기간(통상 1년) 내에 파기됩니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 안전하게 보관합니다.</p>
        ) : (
          <p>We delete collected personal information without delay once the purpose is fulfilled. Information submitted through the Contact form is deleted within a reasonable period (typically one year) after the inquiry is resolved, except where retention is required by law.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "5. 어린이의 개인정보" : "5. Children's Privacy"}>
        {isKo ? (
          <p>회사는 만 14세 미만 아동을 대상으로 의도적으로 개인정보를 수집하지 않습니다. 부모님 또는 보호자는 자녀의 개인정보가 수집되었다고 판단되는 경우 문의 채널을 통해 삭제를 요청할 수 있습니다.</p>
        ) : (
          <p>We do not knowingly collect personal information from children under the age of 14. Parents or guardians who believe their child's information has been collected may request deletion through our contact channels.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "6. 국외 전송" : "6. International Data Transfers"}>
        {isKo ? (
          <p>Google이 제공하는 분석·광고 서비스 이용 과정에서 데이터가 대한민국 외의 지역(예: 미국)으로 전송·처리될 수 있으며, 이 경우 해당 서비스의 개인정보 처리방침 및 표준 계약조건이 적용됩니다.</p>
        ) : (
          <p>Through analytics and advertising services provided by Google, data may be transferred to and processed in regions outside your country (e.g., the United States), in which case the privacy policies and standard contractual terms of those services apply.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "7. 보안" : "7. Security"}>
        {isKo ? (
          <p>회사는 개인정보 보호를 위해 업계 표준 보안 조치를 적용하고 있습니다. 단, 인터넷 기반 서비스의 특성상 절대적인 보안을 보장할 수는 없으며, 사용자도 개인정보 보호를 위해 브라우저 최신 상태 유지 등에 협조해 주시기 바랍니다.</p>
        ) : (
          <p>We apply industry-standard security measures to protect personal information. Because no internet-based service can be absolutely secure, we also ask users to help protect their information, for example by keeping browsers up to date.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "8. 이용자의 권리" : "8. Your Rights"}>
        {isKo ? (
          <>
            <p>이용자는 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 행사 방법은 아래 문의 채널로 연락 주시면 신속히 조치하겠습니다.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>유럽 거주자: GDPR에 따른 접근·정정·잊힐 권리 등</li>
              <li>한국 거주자: 개인정보 보호법에 따른 권리</li>
            </ul>
          </>
        ) : (
          <>
            <p>You may exercise rights to access, correct, delete, or restrict the processing of your personal information at any time. Contact us through the channel below and we will respond promptly.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>EU residents: rights under the GDPR, including access, rectification, and the right to be forgotten</li>
              <li>Korea residents: rights under the Personal Information Protection Act</li>
            </ul>
          </>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "9. 정책 변경" : "9. Changes to This Policy"}>
        {isKo ? (
          <p>본 방침은 법령 및 서비스 변경에 따라 수정될 수 있으며, 변경 시 웹사이트 공지사항을 통해 고지합니다. 개정된 방침은 공지된 시점부터 효력이 발생합니다.</p>
        ) : (
          <p>This Policy may be revised to reflect changes in law or the Service. Any changes will be announced through a notice on the website and take effect from the announced date.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "10. 문의처" : "10. Contact"}>
        {isKo ? (
          <p>개인정보와 관련된 문의는 아래 이메일로 연락 주시기 바랍니다.</p>
        ) : (
          <p>For any privacy-related questions, please contact us at:</p>
        )}
        <p className="text-foreground font-medium">{CONTACT_EMAIL}</p>
      </ProseSection>

      <p className="text-sm text-muted-foreground pt-4 border-t border-border">
        {isKo ? "시행일자: 2026년 1월 1일" : "Effective date: January 1, 2026"}
      </p>
    </ProsePage>
  );
}
