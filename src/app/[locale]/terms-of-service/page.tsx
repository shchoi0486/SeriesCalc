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
    title: isKo ? "이용약관 | SeriesCalc" : "Terms of Service | SeriesCalc",
    description: isKo
      ? "SeriesCalc 서비스 이용과 관련된 약관을 안내합니다."
      : "The terms governing your use of the SeriesCalc Service.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function TermsOfServicePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  return (
    <ProsePage title={isKo ? "이용약관" : "Terms of Service"}>
      <p className="text-foreground">
        {isKo
          ? "본 이용약관(이하 \"약관\")은 SeriesCalc(이하 \"회사\")가 제공하는 모든 계산기 및 웹사이트 서비스(이하 \"서비스\")의 이용 조건 및 회사와 이용자 간의 권리·의무·책임사항을 규정합니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다."
          : "These Terms of Service (the \"Terms\") set out the conditions for using all calculators and the website provided by SeriesCalc (the \"Company\", \"we\"), and the rights, obligations, and responsibilities between the Company and users. By using the Service, you are deemed to have agreed to these Terms."}
      </p>

      <ProseSection title={isKo ? "1. 서비스의 성격" : "1. Nature of the Service"}>
        {isKo ? (
          <p>회사가 제공하는 모든 계산 결과는 <strong>참고·교육 목적</strong>이며, 어떠한 전문적 조언(금융·법률·의료·세무 등)으로 대체될 수 없습니다. 이용자는 계산 결과를 최종 의사결정에 활용하기 전 반드시 관련 전문가와 상담하시기 바랍니다.</p>
        ) : (
          <p>All calculation results provided by the Company are for <strong>reference and educational purposes only</strong> and are not a substitute for professional advice (financial, legal, medical, tax, etc.). Users should consult a qualified professional before relying on any result for final decisions.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "2. 면책 조항" : "2. Disclaimer of Warranties"}>
        {isKo ? (
          <>
            <p>회사는 서비스의 정확성·신뢰성·적시성을 보장하기 위해 노력하나, 다음 사항에 대해 어떠한 명시적·묵시적 보증도 하지 않습니다.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>계산 결과의 정확성(입력 오류, rounding, 외부 데이터 변동 등)</li>
              <li>서비스 이용으로 인한 직·간접 손해(수익 손실, 투자 손실 등)</li>
              <li>제3자 광고·링크 사이트의 내용 및 거래</li>
            </ul>
          </>
        ) : (
          <>
            <p>While we strive for accuracy, reliability, and timeliness, we provide the Service \"as is\" and make no express or implied warranties regarding:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The accuracy of calculation results (input errors, rounding, external data changes, etc.)</li>
              <li>Any direct or indirect damages arising from use of the Service (lost profits, investment losses, etc.)</li>
              <li>The content or transactions of third-party advertisements or linked sites</li>
            </ul>
          </>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "3. 지식재산권" : "3. Intellectual Property"}>
        {isKo ? (
          <p>서비스 내 모든 콘텐츠(텍스트, 수식, 디자인, 소프트웨어)의 저작권 및 지식재산권은 회사 또는 정당한 권리자에게 귀속됩니다. 이용자는 서비스를 통상적인 이용 범위 내에서만 사용할 수 있으며, 무단 복제·배포·상업적 이용은 금지됩니다.</p>
        ) : (
          <p>All content within the Service (text, formulas, design, software) is owned by the Company or its lawful licensors. Users may use the Service only within its ordinary scope and may not copy, redistribute, or use it commercially without permission.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "4. 금지 행위" : "4. Prohibited Uses"}>
        {isKo ? (
          <ul className="list-disc list-inside space-y-1">
            <li>서비스의 정상적인 운영을 방해하거나 취약점을 악용하는 행위</li>
            <li>자동화 도구를 통한 비정상적 접근 또는 과도한 요청</li>
            <li>타인의 정보 도용 및 관련 법령 위반 행위</li>
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            <li>Interfering with the normal operation of the Service or exploiting vulnerabilities</li>
            <li>Abnormal access or excessive requests via automated tools</li>
            <li>Identity theft or any act violating applicable laws</li>
          </ul>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "5. 제3자 서비스" : "5. Third-Party Services"}>
        {isKo ? (
          <p>서비스에는 Google AdSense 등 제3자가 제공하는 광고 및 분석 기능이 포함될 수 있습니다. 제3자 서비스와 관련된 사항은 각 서비스의 정책이 적용되며, 회사는 이에 대해 책임을 지지 않습니다.</p>
        ) : (
          <p>The Service may include advertising and analytics features provided by third parties such as Google AdSense. Such third-party services are governed by their own policies, for which the Company is not responsible.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "6. 약관의 변경" : "6. Changes to the Terms"}>
        {isKo ? (
          <p>회사는 관련 법령 및 서비스 운영 사유에 따라 본 약관을 변경할 수 있으며, 변경 시 웹사이트를 통해 사전 공지합니다. 변경 후에도 서비스를 계속 이용하는 것은 개정 약관에 동의한 것으로 봅니다.</p>
        ) : (
          <p>We may modify these Terms as required by law or service operation, with prior notice on the website. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
        )}
      </ProseSection>

      <ProseSection title={isKo ? "7. 준거법 및 관할" : "7. Governing Law"}>
        {isKo ? (
          <p>본 약관은 대한민국 법령에 따라 해석·적용되며, 서비스 이용과 관련한 분쟁의 관할은 회사 소재지를 관할하는 법원으로 합니다.</p>
        ) : (
          <p>These Terms are governed by and construed in accordance with the laws of the Republic of Korea, and disputes relating to the Service fall under the jurisdiction of the courts located at the Company's principal place of business.</p>
        )}
      </ProseSection>

      <p className="text-sm text-muted-foreground pt-4 border-t border-border">
        {isKo ? "시행일자: 2025년 1월 1일" : "Effective date: January 1, 2025"}
      </p>
    </ProsePage>
  );
}
