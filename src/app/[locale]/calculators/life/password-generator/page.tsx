import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./PasswordGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/password-generator", "life", "password-generator");
}



export default function PasswordGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const dict = isKo ? koDict : enDict;
  const t = dict.passwordGenerator;
  const L = (koText: string, enText: string) => (isKo ? koText : enText);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("비밀번호 길이가 길수록 안전한가요?", "Is a longer password always more secure?"),
      a: L(
        "맞습니다. 비밀번호의 무차원 대입(brute-force) 방어력은 길이에 지수적으로 비례합니다. 예: 소문자+숫자(36자) 기준 8자리 = 2.8조, 12자리 = 4.7경 경우의 수. 따라서 12자 이상으로 설정하면 현행 컴퓨터로 수백 년이 걸립니다. 다만 너무 길면 입력이 불편하므로, 12~16자 사이가 실용적 균형점입니다.",
        "Yes. Brute-force resistance grows exponentially with length. At 36 charset, 8 chars = 2.8 trillion combos; 12 chars = 4.7 quintillion. 12–16 characters is the practical sweet spot.",
      ),
    },
    {
      q: L("문자 유형을 다양하게 섞어야 하나요?", "Should I mix character types?"),
      a: L(
        "소문자(a-z), 대문자(A-Z), 숫자(0-9), 특수문자(!@#$…)를 모두 포함하면 사용 가능한 문자 집합이 커져 대입 공격이 어려워집니다. 이 계산기에서 모든 체크박스를 켜면 94개 문자가 사용됩니다. 다만 예약어 필터 등에서 특수문자가 문제를 일으키는 경우가 있으므로, 사용처 제약 조건을 먼저 확인하세요.",
        "Including lowercase, uppercase, digits, and symbols expands the character pool (94 chars with all enabled). Check service-specific restrictions first, as some reject certain symbols.",
      ),
    },
    {
      q: L("생성된 비밀번호를 어디에 저장하나요?", "Where should I store the generated password?"),
      a: L(
        "이 도구는 브라우저에서만 비밀번호를 생성하며, 생성 후 어디에도 저장하지 않습니다(서버 전송 없음). 안전한 저장을 위해 비밀번호 관리자(LastPass, Bitwarden, 1Password 등) 사용을 강력히 권장합니다. 스프레드시트나 메모장에 평문 저장하는 것은 절대 하지 마세요.",
        "This tool generates passwords entirely in-browser and stores nothing. Use a dedicated password manager (LastPass, Bitwarden, 1Password). Never store passwords in plain text files.",
      ),
    },
    {
      q: L("이전에 생성한 비밀번호를 복구할 수 있나요?", "Can I recover a previously generated password?"),
      a: L(
        "아닙니다. 이 도구는 클라이언트 사이드에서 Math.random()을 사용해 일회성으로 생성합니다. 이전 결과는 저장되지 않으므로, 새로고침하면 사라집니다. 생성 즉시 비밀번호 관리자에 저장하거나 안전한 곳에 기록하세요.",
        "No. Passwords are generated client-side with Math.random() and are not persisted. Save them immediately to a password manager or secure vault.",
      ),
    },
    {
      q: L("Math.random()으로 만들어도 안전한가요?", "Is Math.random() secure enough?"),
      a: L(
        "Math.random()은 암호학적으로 안전한 난수 생성기(CSPRNG)가 아니므로, 이론적으로 예측 가능성이 있습니다. 다만 브라우저에서 비밀번호를 '빠르게 만들기 위한' 용도라면 충분합니다. 절대적으로 안전한 난수가 필요한 경우(암호화 키 생성 등)에는 Web Crypto API의 crypto.getRandomValues()를 직접 사용해야 합니다.",
        "Math.random() is not cryptographically secure, but is adequate for quick password generation. For absolute security (encryption keys), use crypto.getRandomValues() via the Web Crypto API.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: `
      <div className="space-y-4">
        <p className="text-lg font-semibold text-foreground">${t.descriptionContent.heading}</p>
        <p>${t.descriptionContent.p1}</p>
        <p>${t.descriptionContent.p2}</p>
        <p>${t.descriptionContent.p3}</p>
      </div>
    `,
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("길이 설정", "Set length"),
            L("비밀번호 길이를 4~64자 범위에서 설정합니다. 12~16자가 보안·편의성 균형점입니다.", "Set password length (4–64 chars). 12–16 is the security/convenience balance point."),
          ],
          [
            L("문자 유형 선택", "Choose character types"),
            L("대문자·소문자·숫자·특수문자 중 사용할 유형을 체크합니다. 모두 선택하면 가장 강력합니다.", "Check uppercase, lowercase, numbers, and symbols. Enable all for maximum strength."),
          ],
          [
            L("생성 버튼 클릭", "Click generate"),
            L("'생성' 버튼을 누르면 랜덤 비밀번호가 즉시 표시됩니다.", "Press generate to display a random password instantly."),
          ],
          [
            L("복사·저장", "Copy and save"),
            L("복사 버튼으로 클립보드에 복사한 뒤, 비밀번호 관리자에 즉시 저장하세요. 브라우저를 새로고침하면 사라집니다.", "Copy to clipboard, then save to a password manager immediately. Refreshing the page clears it."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 일반 계정용", "Example 1 — General account")}</p>
          <p>
            {L(
              "길이 16, 모든 문자 유형 선택 → 예: 'k9#Lm2@xPq$7nR!w'. 대문자 3개, 소문자 6개, 숫자 3개, 특수문자 4개가 포함되어 대입 공격에 매우 강합니다.",
              "Length 16, all types → e.g., 'k9#Lm2@xPq$7nR!w' with 3 uppercase, 6 lowercase, 3 digits, 4 symbols — highly resistant to brute force.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — Wi-Fi 비밀번호용 (특수문자 제외)", "Example 2 — Wi-Fi (no symbols)")}</p>
          <p>
            {L(
              "길이 12, 대문자+소문자+숫자만 선택 → 예: 'Ht7kM2pLx9Nq'. 기기 호환성을 위해 특수문자를 뺀 구성입니다.",
              "Length 12, uppercase+lowercase+digits only → e.g., 'Ht7kM2pLx9Nq'. Symbols excluded for device compatibility.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("위 예시는 참고용이며, 실제 생성 결과는 매번 다릅니다.", "Examples are illustrative; actual results differ each time.")}
        </p>
      </div>
    ),
    calculationFormula: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.formula.desc}</p>
      </div>
    `,
    usefulTips: `
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">${t.tips.heading}</p>
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
