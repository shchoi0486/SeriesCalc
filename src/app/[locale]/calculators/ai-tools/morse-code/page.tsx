import TermGlossary from "@/components/calculators/TermGlossary";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./MorseCodeClient";
import FaqItem from "@/components/calculators/FaqItem";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/ai-tools/morse-code", "ai-tools", "morse-code");
}

export default function MorseCodePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const faqs: { q: string; a: string }[] = [
    {
      q: isKo ? "모스 부호의 역사는 어떻게 되나요?" : "What is the history of Morse code?",
      a: isKo
        ? "1830년대 새뮤얼 모스(Samuel Morse)와 알프레드 베일(Alfred Vail)이 전신용으로 개발했으며, 1844년 워싱턴-볼티모어 사이 첫 전신선에서 'What hath God wrought'가 최초로 전송되었습니다. 점·대시 조합으로 문자를 표현해 전신기와 무선 통신의 핵심이 되었고, 이후 국제 표준으로 정립되었습니다."
        : "Developed in the 1830s by Samuel Morse and Alfred Vail for telegraphy, it sent its first public message 'What hath God wrought' in 1844 between Washington and Baltimore. Dots and dashes represented characters, becoming central to telegraph and radio, later standardized internationally.",
    },
    {
      q: isKo ? "점과 대시의 타이밍 규칙은 무엇인가요? (SOS 기준)" : "What are the dot and dash timing rules? (SOS example)",
      a: isKo
        ? "한 단위의 길이를 기준으로, 점은 1단위, 대시는 3단위의 길이로 발신합니다. 문자 내부 요소 사이는 1단위, 문자와 문자 사이는 3단위, 단어와 단어 사이는 7단위의 공백을 둡니다. SOS는 '. . . (3) --- (3) . . .'로, 정확한 타이밍으로 전송해야 수신기가 정확히 해독할 수 있습니다."
        : "Using one time unit as base, a dot is 1 unit and a dash is 3 units. Gaps are 1 unit between elements within a character, 3 units between characters, and 7 units between words. SOS is '. . . (3) --- (3) . . .' — accurate timing is essential for correct decoding.",
    },
    {
      q: isKo ? "국제 모스 부호와 미국식 모스 부호의 차이는?" : "What is the difference between International and American Morse?",
      a: isKo
        ? "미국식(American) 모스 부호는 초기 전신 시대에 사용된 구식 방식으로 문자별 길이가 불규칙합니다. 국제(International) 모스 부호는 1865년 국제전신연합(ITU)에서 정립한 표준으로, 점·대시 길이가 균일하고 현재 전 세계에서 사용되는 방식입니다. 이 도구는 국제 표준을 따릅니다."
        : "American Morse is the older system from early telegraphy with irregular per-character lengths. International Morse, standardized by the ITU in 1865, uses uniform dot/dash lengths and is the globally used system today. This tool follows the international standard.",
    },
    {
      q: isKo ? "문자와 숫자의 인코딩 규칙은 무엇인가요?" : "What are the encoding rules for letters and numbers?",
      a: isKo
        ? "알파벳은 빈도가 높은 문자일수록 짧은 부호를 배정합니다. 예를 들어 E(.)와 T(-)는 가장 짧고, Z(--..)나 Q(--.-)는 깁니다. 숫자 0-9는 5개의 점·대시로 구성되며, 1(.----)부터 9(----.)까지 규칙적으로 증가하고 0은 (-----)입니다. 부호는 대소문자를 구분하지 않습니다."
        : "Frequent letters get the shortest codes: E (.) and T (-) are shortest, while Z (--..) and Q (--.-) are long. Numbers 0–9 each use five elements, progressing regularly from 1 (.----) through 9 (----.) and 0 (-----). Codes are case-insensitive.",
    },
    {
      q: isKo ? "모스 부호를 배우기 위한 자료는 무엇이 있나요?" : "What resources can help me learn Morse code?",
      a: isKo
        ? "점과 대시를 소리로 반복 청취하는 '코흐(Koch) 방식' 훈련 앱이나 단어 사전표, ITU 공식 규격 문서 등이 유용합니다. 소리 기반으로 학습하면 단순 시각 기억보다 빠르게 숙달되며, 초보자는 자주 쓰이는 문자(S, O, T, E, A 등)부터 연습하는 것을 권장합니다."
        : "Koch-method audio training apps, character reference charts, and the official ITU specification are helpful. Learning by sound (rather than visual memory) builds proficiency faster, and beginners should start with frequent characters like S, O, T, E, and A.",
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>Morse Code Translator</strong> converts between plain text and International Morse Code. Morse code uses dots (.) and dashes (-) to represent letters, numbers, and special characters.
        </p>
        <p>
          This tool supports bidirectional conversion and includes a sound playback feature that generates the actual audio tones for the Morse code pattern.
        </p>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
          <p><strong>A</strong> = .-  |  <strong>B</strong> = -...  |  <strong>C</strong> = -.-.  |  <strong>D</strong> = -..  |  <strong>E</strong> = .</p>
        </div>
        <TermGlossary items={[
          { term: isKo ? '모스 부호' : 'Morse Code', desc: isKo ? '짧은 신호(점)와 긴 신호(대시)의 조합으로 문자, 숫자, 기호를 나타내는 통신 부호입니다.' : 'A communication code that represents letters, numbers, and symbols using a combination of short signals (dots) and long signals (dashes).' },
          { term: isKo ? '점(Dot)과 대시(Dash)' : 'Dot and Dash', desc: isKo ? '모스 부호를 구성하는 두 가지 기본 신호입니다. 점은 1단위, 대시는 3단위의 길이로 발신되며, 이 조합으로 각 문자를 구분합니다.' : 'The two basic signals that make up Morse code. A dot is sent at 1 unit length and a dash at 3 units; their combinations distinguish each character.' },
          { term: isKo ? '국제 모스 부호' : 'International Morse Code', desc: isKo ? '전 세계에서 통용되는 모스 부호 표준입니다. 문자·숫자뿐 아니라 단어 사이 구분 기호(/) 등이 정해져 있습니다.' : 'The internationally recognized Morse code standard. It defines characters, numbers, and the word separator (/) among others.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <p className="font-semibold">Morse Code Structure:</p>
        <ul className="space-y-2 text-sm">
          <li><strong>Dot (.)</strong> = short signal (1 unit duration)</li>
          <li><strong>Dash (-)</strong> = long signal (3 units duration)</li>
          <li><strong>Letter gap</strong> = 3 units between letters</li>
          <li><strong>Word gap</strong> = 7 units between words (represented by /)</li>
        </ul>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="font-mono text-xs text-center">SOS: ... --- ...</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <p className="font-semibold">Tips:</p>
        <ul className="space-y-2 text-sm">
          <li>Morse code is case-insensitive - uppercase and lowercase letters produce the same code.</li>
          <li>Use / (space-slash-space) to separate words in Morse code.</li>
          <li>SOS (... --- ...) is the universal distress signal - recognizable even without knowing Morse code.</li>
          <li>The sound playback uses a 600Hz sine wave, which is the standard frequency for Morse code audio.</li>
        </ul>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            isKo ? "텍스트 입력" : "Type text",
            isKo ? "변환할 일반 텍스트를 입력합니다. 영문 알파벳, 숫자, 일부 기호를 지원합니다." : "Enter the plain text you want to convert. Letters, numbers, and some symbols are supported.",
          ],
          [
            isKo ? "모스 부호 확인" : "See the Morse output",
            isKo ? "입력한 텍스트가 점(.)과 대시(-)로 이루어진 국제 모스 부호로 변환되어 표시됩니다." : "Your input is converted to International Morse code using dots (.) and dashes (-).",
          ],
          [
            isKo ? "소리 재생" : "Play the sound",
            isKo ? "사용 가능한 경우 재생 버튼을 눌러 실제 모스 부호의 오디오 톤을 들을 수 있습니다." : "If available, press the play button to hear the actual audio tones of the Morse pattern.",
          ],
          [
            isKo ? "복사" : "Copy",
            isKo ? "변환된 모스 부호를 클립보드에 복사해 메시지 전송이나 학습 자료로 사용합니다." : "Copy the converted Morse code to your clipboard for transmission or study.",
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
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 1 — SOS" : "Example 1 — SOS"}</p>
          <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            S O S = ... --- ...
          </p>
          <p className="mt-2">
            {isKo
              ? "S는 '...' , O는 '---' 로, 'SOS'는 '... --- ...'가 됩니다. 공백으로 구분된 세 글자 사이에는 3단위의 문자 간격이 필요합니다. SOS는 전 세계에서 통용되는 조난 신호로, 모스 부호를 몰라도 알아볼 수 있을 정도로 단순합니다."
              : "S is '...' and O is '---', so 'SOS' becomes '... --- ...'. A 3-unit character gap separates the three letters. SOS is the universally recognized distress signal, simple enough to recognize even without knowing Morse."}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{isKo ? "예시 2 — HELLO" : "Example 2 — HELLO"}</p>
          <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            H E L L O = .... . .-.. .-.. ---
          </p>
          <p className="mt-2">
            {isKo
              ? "H는 '....', E는 '.', L은 '.-..', O는 '---'이므로 'HELLO'는 '.... . .-.. .-.. ---'로 변환됩니다. 반복되는 L이 '.-..'로 두 번 나타나는 것을 확인할 수 있습니다. 문자 사이는 공백으로, 단어 사이는 '/'로 구분합니다."
              : "H is '....', E is '.', L is '.-..', and O is '---', so 'HELLO' becomes '.... . .-.. .-.. ---'. Notice the repeated L appears as '.-..' twice. Letters are separated by spaces and words by '/'."}
          </p>
        </div>
      </div>
    ),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
