import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import ContactForm from "@/components/sections/ContactForm";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "문의하기 | SeriesCalc" : "Contact | SeriesCalc",
    description: isKo
      ? "SeriesCalc에 문의사항이 있으신가요? 언제든 연락 주세요."
      : "Have a question for SeriesCalc? Reach out to us anytime.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  return (
    <ProsePage title={isKo ? "문의하기" : "Contact Us"}>
      <p className="text-foreground">
        {isKo
          ? "계산기 오류 제보, 새로운 계산기 제안, 콘텐츠 개선 의견 등 무엇이든 환영합니다. 아래 양식을 작성하시면 편리한 메일 프로그램으로 문의가 전송됩니다."
          : "We welcome bug reports, suggestions for new calculators, and content improvements. Fill out the form below and your inquiry will open in your email client."}
      </p>

      <ContactForm isKo={isKo} />

      <ProseSection title={isKo ? "직접 이메일 보내기" : "Email Us Directly"}>
        <p>{isKo ? "양식을 사용하기 어려우시다면 아래 이메일로 직접 연락 주세요." : "If the form is inconvenient, email us directly at:"}</p>
        <p className="text-foreground font-medium">seriessnap.co@gmail.com</p>
      </ProseSection>

      <ProseSection title={isKo ? "응답 시간" : "Response Time"}>
        <p>{isKo ? "영업일 기준 2~3일 이내에 답변드리겠습니다. 광고·제휴 문의는 별도 검토가 필요할 수 있습니다." : "We typically respond within 2–3 business days. Advertising and partnership inquiries may require additional review."}</p></ProseSection>
    </ProsePage>
  );
}
