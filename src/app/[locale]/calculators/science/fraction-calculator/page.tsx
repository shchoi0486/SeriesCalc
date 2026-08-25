import { en as enDict } from "@/i18n/dictionaries/en";
import { ko as koDict } from "@/i18n/dictionaries/ko";
import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./FractionCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/fraction-calculator", "science", "fraction-calculator");
}



export default function FractionCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const d = isKo ? koDict : enDict;
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("분수의 덧셈은 어떻게 하나요?", "How do you add fractions?"),
      a: L("분모가 같으면 분자끼리 더합니다. 분모가 다르면 최소공배수로 통분한 뒤 분자끼리 더합니다. 예: 1/2 + 1/4는 통분하면 2/4 + 1/4 = 3/4가 됩니다. 결과는 가능하면 기약분수로 약분합니다.", "If the denominators are the same, add the numerators. If not, find a common denominator (LCM), then add the numerators. Example: 1/2 + 1/4 becomes 2/4 + 1/4 = 3/4. Simplify the result to a reduced fraction when possible."),
    },
    {
      q: L("분수의 곱셈은 어떻게 하나요?", "How do you multiply fractions?"),
      a: L("분자끼리 곱하고 분모끼리 곱합니다: (a/b) × (c/d) = (a×c) / (b×d). 예: 2/3 × 3/4 = 6/12 = 1/2. 곱셈에서는 통분이 필요하지 않습니다.", "Multiply the numerators together and the denominators together: (a/b) × (c/d) = (a×c) / (b×d). Example: 2/3 × 3/4 = 6/12 = 1/2. Multiplication does not require a common denominator."),
    },
    {
      q: L("분수의 나눗셈은 어떻게 하나요?", "How do you divide fractions?"),
      a: L("나눗셈은 나누는 분수의 역수(분자와 분모를 뒤집은 값)를 곱하는 것으로 바꿉니다: (a/b) ÷ (c/d) = (a/b) × (d/c). 예: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1.5.", "Division is converted to multiplication by the reciprocal (flip the divisor): (a/b) ÷ (c/d) = (a/b) × (d/c). Example: 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1.5."),
    },
    {
      q: L("가분수와 대분수의 차이는 무엇인가요?", "What is the difference between improper and mixed fractions?"),
      a: L("가분수는 분자가 분모보다 크거나 같은 분수입니다(예: 7/3). 대분수는 정수 부분과 진분수로 이루어진 수입니다(예: 2 1/3). 가분수를 대분수로 바꾸려면 분자를 분모로 나눈 몫이 정수 부분, 나머지가 새 분자가 됩니다. 7/3 = 2와 나머지 1이므로 2 1/3입니다.", "An improper fraction has a numerator greater than or equal to its denominator (e.g., 7/3). A mixed fraction combines a whole number and a proper fraction (e.g., 2 1/3). To convert an improper fraction to a mixed number, divide the numerator by the denominator: the quotient is the whole part and the remainder is the new numerator. 7/3 = 2 with remainder 1, so 2 1/3."),
    },
    {
      q: L("분수를 소수로 변환하는 방법은 무엇인가요?", "How do you convert a fraction to a decimal?"),
      a: L("분자를 분모로 나누면 소수로 변환됩니다. 예: 3/4 = 3 ÷ 4 = 0.75. 어떤 분수는 유한 소수(예: 1/2 = 0.5)가 되지만, 1/3 = 0.333...처럼 무한 순환 소수가 되는 경우도 있습니다. 이 계산기는 기약분수와 소수 결과를 동시에 보여줍니다.", "Divide the numerator by the denominator to convert to a decimal. Example: 3/4 = 3 ÷ 4 = 0.75. Some fractions give a finite decimal (e.g., 1/2 = 0.5), while others repeat infinitely (e.g., 1/3 = 0.333...). This calculator shows both the reduced fraction and decimal result."),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('분수 계산기', 'Fraction Calculator')}</strong>{L('는 두 분수 간의 사칙연산(+, -, ×, ÷)을 수행하고 결과를 기약분수와 소수로 동시에 보여주는 도구입니다.', ' performs arithmetic operations (+, -, ×, ÷) between two fractions and displays the result as both a simplified fraction and a decimal.')}
        </p>
        <p>
          {L('분수는 정수로 표현할 수 없는 수의 크기를 나타낼 때 사용되며, 전체(분모) 중 일부(분자)를 의미합니다.', 'Fractions are used to express values that cannot be represented as whole numbers, where the denominator represents the whole and the numerator represents the part.')}
        </p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('이 계산기는 결과를 기약분수(분자와 분모의 최대공약수로 나눈 형태)로 자동 약분하여 가장 간단한 형태로 보여줍니다.', 'This calculator automatically simplifies the result to a reduced fraction (divided by the GCD of numerator and denominator) for the simplest form.')}
        </p>
        <TermGlossary items={[
          { term: L('분수(Fraction)', 'Fraction'), desc: L('전체를 같은 크기로 나눈 것 중 일부를 나타내는 수. 예: 3/4는 4등분 중 3개.', 'A number representing parts of a whole divided into equal pieces. E.g., 3/4 means 3 out of 4 parts.') },
          { term: L('분자(Numerator)', 'Numerator'), desc: L('분수에서 위에 오는 수로, 전체 중 몇 개인지를 나타냅니다.', 'The top number in a fraction, indicating how many parts are taken.') },
          { term: L('분모(Denominator)', 'Denominator'), desc: L('분수에서 아래에 오는 수로, 전체를 몇 등분했는지를 나타냅니다. 0이 될 수 없습니다.', 'The bottom number in a fraction, indicating into how many equal parts the whole is divided. Cannot be zero.') },
          { term: L('기약분수', 'Reduced Fraction'), desc: L('분자와 분모의 최대공약수(GCD)로 나누어 더 이상 약분할 수 없는 형태의 분수입니다.', 'A fraction where the numerator and denominator have been divided by their GCD so it cannot be simplified further.') },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("두 분수 입력", "Enter two fractions"),
            L("첫 번째와 두 번째 분수의 분자(numerator)와 분모(denominator)를 입력합니다. 분모는 0이 될 수 없습니다.", "Enter the numerator and denominator for the first and second fractions. The denominator cannot be zero."),
          ],
          [
            L("연산 선택", "Choose an operation"),
            L("덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷) 중 수행할 사칙연산을 선택합니다.", "Select the arithmetic operation to perform: addition (+), subtraction (−), multiplication (×), or division (÷)."),
          ],
          [
            L("계산하기", "Calculate"),
            L("계산 버튼을 눌러 두 분수의 연산 결과를 구합니다. 계산기는 결과를 기약분수로 약분해 보여줍니다.", "Press the calculate button to get the result of the operation. The calculator simplifies the result to a reduced fraction."),
          ],
          [
            L("결과 읽기", "Read the result"),
            L("결과를 분수와 소수 형식으로 모두 확인합니다. 필요하면 가분수/대분수 형태도 함께 확인할 수 있습니다.", "Review the result in both fraction and decimal form. You can also check the improper or mixed fraction form if needed."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 덧셈", "Example 1 — Addition")}</p>
          <p>
            {L("1/2 + 1/4를 계산해 봅시다. 통분하면 2/4 + 1/4 = 3/4입니다. 따라서 1/2 + 1/4 = 3/4 = 0.75입니다.", "Compute 1/2 + 1/4. Using a common denominator: 2/4 + 1/4 = 3/4. So 1/2 + 1/4 = 3/4 = 0.75.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 곱셈", "Example 2 — Multiplication")}</p>
          <p>
            {L("2/3 × 3/4를 계산해 봅시다. 분자끼리, 분모끼리 곱하면 6/12이며, 약분하면 1/2입니다. 따라서 2/3 × 3/4 = 1/2 = 0.5입니다.", "Compute 2/3 × 3/4. Multiply numerators and denominators: 6/12, which reduces to 1/2. So 2/3 × 3/4 = 1/2 = 0.5.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 3 — 나눗셈", "Example 3 — Division")}</p>
          <p>
            {L("3/4 ÷ 1/2를 계산해 봅시다. 역수를 곱하면 3/4 × 2/1 = 6/4 = 3/2입니다. 따라서 3/4 ÷ 1/2 = 3/2 = 1.5입니다.", "Compute 3/4 ÷ 1/2. Multiply by the reciprocal: 3/4 × 2/1 = 6/4 = 3/2. So 3/4 ÷ 1/2 = 3/2 = 1.5.")}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('덧셈/뺄셈', 'Addition/Subtraction')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\dfrac{a}{b} + \dfrac{c}{d} = \dfrac{ad + cb}{bd}" />
            <BlockMath math="\dfrac{a}{b} - \dfrac{c}{d} = \dfrac{ad - cb}{bd}" />
          </div>
          <p className="text-sm mt-2">{L('분모가 다를 때: 통분(최소공배수) 후 분자끼리 연산', 'When denominators differ: find LCM, then operate on numerators')}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('곱셈', 'Multiplication')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\dfrac{a}{b} \times \dfrac{c}{d} = \dfrac{ac}{bd}" />
          </div>
          <p className="text-sm mt-2">{L('분자 × 분자, 분모 × 분모', 'Numerator × Numerator, Denominator × Denominator')}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('나눗셈', 'Division')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \times \dfrac{d}{c} = \dfrac{ad}{bc}" />
          </div>
          <p className="text-sm mt-2">{L('나눗셈은 역수를 곱하는 것으로 변환', 'Division is converted to multiplication by the reciprocal')}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('약분 (GCD)', 'Simplification (GCD)')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\text{GCD}(a, b):\ \text{유클리드 호제법}" />
          </div>
          <p className="text-sm mt-2">{L('최대공약수(GCD)로 나누어 기약분수로 변환', 'Divide by the Greatest Common Divisor (GCD) to get the reduced fraction')}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('계산 예시', 'Examples')}</h4>
          <div className="space-y-3 mt-2">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('덧셈 예시', 'Addition Example')}</p>
              <BlockMath math="\dfrac{1}{2} + \dfrac{1}{3} = \dfrac{1 \times 3 + 1 \times 2}{2 \times 3} = \dfrac{5}{6}" />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('곱셈 예시', 'Multiplication Example')}</p>
              <BlockMath math="\dfrac{2}{3} \times \dfrac{3}{4} = \dfrac{6}{12} = \dfrac{1}{2}" />
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-semibold text-sm">{L('나눗셈 예시', 'Division Example')}</p>
              <BlockMath math="\dfrac{3}{5} \div \dfrac{2}{7} = \dfrac{3}{5} \times \dfrac{7}{2} = \dfrac{21}{10}" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('유용한 팁', 'Useful Tips')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{L('분모가 0인 분수는 정의되지 않습니다. 반드시 분모를 확인하세요.', 'A fraction with a denominator of 0 is undefined. Always check the denominator.')}</li>
            <li>{L('분수를 소수로 변환하려면 분자를 분모로 나누세요.', 'To convert a fraction to decimal, divide the numerator by the denominator.')}</li>
            <li>{L('가분수(예: 7/3)를 대분수(예: 2 1/3)로 변환하려면: 분모로 나눈 몫이 정수 부분, 나머지가 새로운 분자.', 'To convert an improper fraction (e.g., 7/3) to a mixed number (e.g., 2 1/3): quotient is the whole part, remainder is the new numerator.')}</li>
            <li>{L('통분: 두 분수의 분모를 같게 만들려면 각 분수의 분자와 분모를 상대 분모의 수만큼 곱합니다.', 'Finding a common denominator: multiply the numerator and denominator of each fraction by the other denominator.')}</li>
          </ul>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CalculatorClient infoSection={infoSection} />
    </>
  );
}
