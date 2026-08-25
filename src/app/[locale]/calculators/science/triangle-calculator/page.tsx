import TermGlossary from "@/components/calculators/TermGlossary";
import FaqItem from "@/components/calculators/FaqItem";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./TriangleCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/triangle-calculator", "science", "triangle-calculator");
}



export default function TriangleCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("삼각형의 세 각의 합은 항상 180°인가요?", "Do the three angles of a triangle always add up to 180°?"),
      a: L("네, 평면 기하에서 삼각형의 세 내각의 합은 항상 180°입니다. 따라서 두 각을 알면 나머지 각은 180°에서 두 각의 합을 빼서 구할 수 있습니다. 예: 두 각이 36.87°와 53.13°라면 세 번째 각은 180 − 36.87 − 53.13 = 90°입니다.", "Yes, in Euclidean geometry the sum of the three interior angles of a triangle is always 180°. So given two angles, the third is 180° minus their sum. Example: if two angles are 36.87° and 53.13°, the third is 180 − 36.87 − 53.13 = 90°."),
    },
    {
      q: L("피타고라스 정리는 무엇인가요?", "What is the Pythagorean theorem?"),
      a: L("직각삼각형에서 빗변(가장 긴 변, c)의 제곱은 다른 두 변의 제곱의 합과 같습니다: a² + b² = c². 예: 3-4-5 직각삼각형에서 3² + 4² = 9 + 16 = 25 = 5² 입니다. 이 정리는 직각삼각형에서 변의 길이를 구할 때 사용합니다.", "In a right triangle, the square of the hypotenuse (longest side, c) equals the sum of the squares of the other two sides: a² + b² = c². Example: in a 3-4-5 right triangle, 3² + 4² = 9 + 16 = 25 = 5². It is used to find side lengths in right triangles."),
    },
    {
      q: L("헤론의 공식은 무엇인가요?", "What is Heron's formula?"),
      a: L("헤론의 공식은 세 변의 길이만 알면 삼각형의 넓이를 구하는 공식입니다. 반둘레 s = (a + b + c) / 2라 할 때, 넓이 = √(s(s−a)(s−b)(s−c))입니다. 예: 세 변이 3, 4, 5이면 s = 6이고 넓이 = √(6×3×2×1) = √36 = 6입니다.", "Heron's formula gives the area of a triangle from its three side lengths alone. With semiperimeter s = (a + b + c) / 2, area = √(s(s−a)(s−b)(s−c)). Example: sides 3, 4, 5 give s = 6 and area = √(6×3×2×1) = √36 = 6."),
    },
    {
      q: L("삼각형 부등식이란 무엇인가요?", "What is the triangle inequality?"),
      a: L("삼각형이 성립하려면 임의의 두 변의 길이의 합이 나머지 한 변보다 반드시 커야 합니다. 예: 2, 3, 6은 2 + 3 = 5 < 6이므로 삼각형을 만들 수 없습니다. 이 계산기는 이 조건을 만족하지 않는 입력에 대해 오류를 표시합니다.", "For a triangle to exist, the sum of any two side lengths must be greater than the third. Example: sides 2, 3, and 6 cannot form a triangle because 2 + 3 = 5 < 6. This calculator shows an error for inputs that violate this condition."),
    },
    {
      q: L("삼각형의 넓이는 어떻게 구하나요?", "How do you calculate the area of a triangle?"),
      a: L("가장 기본적인 공식은 넓이 = ½ × 밑변 × 높이입니다. 밑변과 높이를 모를 때는 사인 공식 넓이 = ½ × a × b × sin(C)(두 변과 끼인 각) 또는 세 변만 알 때 헤론의 공식을 사용합니다.", "The most basic formula is area = ½ × base × height. If base and height are unknown, use the sine rule: area = ½ × a × b × sin(C) (two sides and the included angle), or Heron's formula when only the three sides are known."),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('삼각형 계산기', 'Triangle Calculator')}</strong>{L('는 삼각형의 알려진 변과 각의 정보를 기반으로 나머지 모든 변과 각, 넓이를 계산하는 기하학 도구입니다.', ' is a geometry tool that calculates all missing sides, angles, and area of a triangle based on known side and angle information.')}
        </p>
        <p>
          {L('삼각형을 정의하는 데 필요한 최소 조건에 따라 네 가지 계산 모드를 제공합니다:', 'Four calculation modes are provided based on the minimum conditions needed to define a triangle:')}
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>SAS</strong> - {L('양변과 포합각: 두 변과 그 사이의 각', 'Two sides and included angle')}</li>
          <li><strong>ASA</strong> - {L('양각과 포합변: 두 각과 그 사이의 변', 'Two angles and included side')}</li>
          <li><strong>SSS</strong> - {L('삼변: 세 변의 길이', 'Three sides')}</li>
          <li><strong>AAS</strong> - {L('양각과 비포합변: 두 각과 한 변', 'Two angles and a non-included side')}</li>
        </ul>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('삼각형의 세 각의 합은 항상 180°이며, 삼각형 부등식(임의의 두 변의 합이 나머지 변보다 커야 함)을 만족해야 합니다.', 'The sum of the three angles of a triangle is always 180°, and the triangle inequality (the sum of any two sides must be greater than the third side) must be satisfied.')}
        </p>
        <TermGlossary items={[
          { term: L('삼비(정비)', 'SSS'), desc: L('세 변의 길이만으로 삼각형을 정의하는 경우입니다.', 'When a triangle is defined by the lengths of three sides only.') },
          { term: L('양변+각(SAS)', 'SAS'), desc: L('두 변과 그 사이의 각이 주어진 경우입니다.', 'When two sides and the included angle are given.') },
          { term: L('코사인 법칙', 'Law of Cosines'), desc: L('c² = a² + b² - 2ab·cos(C): 임의의 삼각형에서 변과 각의 관계를 나타내는 공식입니다.', 'c² = a² + b² - 2ab·cos(C): Formula expressing the relationship between sides and angles in any triangle.') },
        ]} />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("계산 모드 선택", "Choose a calculation mode"),
            L("주어진 정보에 맞는 모드를 선택합니다: SSS(세 변), SAS(두 변 + 끼인 각), ASA(두 각 + 끼인 변), AAS(두 각 + 비포함 변).", "Choose the mode that matches your known data: SSS (three sides), SAS (two sides + included angle), ASA (two angles + included side), AAS (two angles + non-included side)."),
          ],
          [
            L("값 입력", "Enter your values"),
            L("선택한 모드에 맞는 변의 길이와 각도를 입력합니다. 각도는 도(°) 단위로 입력합니다.", "Enter the side lengths and angles required by the selected mode. Angles are entered in degrees (°)."),
          ],
          [
            L("계산하기", "Calculate"),
            L("계산 버튼을 눌러 삼각형을 해석합니다. 계산기는 알려진 정보로 나머지 모든 변과 각을 구합니다.", "Press the calculate button to solve the triangle. The calculator derives all remaining sides and angles from the known data."),
          ],
          [
            L("결과 읽기", "Read the results"),
            L("구해진 각(세 각의 합 180° 확인)과 넓이를 확인합니다. 예: 직각삼각형이면 빗변과 한 각도 함께 표시됩니다.", "Review the computed angles (the three should sum to 180°) and the area. For a right triangle, the hypotenuse and each angle are also shown."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 3-4-5 직각삼각형", "Example 1 — 3-4-5 right triangle")}</p>
          <p>
            {L("세 변이 3, 4, 5인 SSS 모드를 입력하면: 두 예각은 각각 약 36.87°와 53.13°이고, 나머지 각은 90°입니다. 넓이는 ½ × 3 × 4 = 6입니다.", "Entering SSS mode with sides 3, 4, 5 gives: the two acute angles are about 36.87° and 53.13°, and the remaining angle is 90°. The area is ½ × 3 × 4 = 6.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 정삼각형 (한 변 6)", "Example 2 — Equilateral triangle (side 6)")}</p>
          <p>
            {L("한 변이 6인 정삼각형(SSS: 6, 6, 6)을 입력하면 세 각은 모두 60°이고, 넓이는 (√3/4) × 6² = 9√3 ≈ 15.588입니다.", "Entering an equilateral triangle with sides 6, 6, 6 gives three 60° angles and an area of (√3/4) × 6² = 9√3 ≈ 15.588.")}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('코사인 법칙 (Law of Cosines)', 'Law of Cosines')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="c^{2} = a^{2} + b^{2} - 2ab\cos(C)" />
          </div>
          <p className="text-sm">{L('세 번째 변을 구할 때 사용합니다.', 'Used to find the third side.')}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('사인 법칙 (Law of Sines)', 'Law of Sines')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="\dfrac{a}{\sin(A)} = \dfrac{b}{\sin(B)} = \dfrac{c}{\sin(C)}" />
          </div>
          <p className="text-sm">{L(' 알려진 변-각 쌍을 이용해 나머지를 구할 때 사용합니다.', 'Used to find the remaining parts using a known side-angle pair.')}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('넓이 공식', 'Area Formulas')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center space-y-2">
            <BlockMath math="\text{Area} = \tfrac{1}{2}\,a\,b\sin(C)" />
            <div><BlockMath math="= \sqrt{s(s-a)(s-b)(s-c)}" /><p className="text-sm">{L('(헤론의 공식)', "(Heron's formula)")}</p></div>
            <BlockMath math="s = \dfrac{a + b + c}{2}" />
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('삼각형의 성질', 'Triangle Properties')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{L('세 각의 합 = 180°', 'Sum of three angles = 180°')}</li>
            <li>{L('삼각형 부등식: 임의의 두 변의 합 > 나머지 변', 'Triangle inequality: sum of any two sides > remaining side')}</li>
            <li>{L('큰 변은 큰 각에 맞닿아 있다', 'A larger side is opposite a larger angle')}</li>
            <li>{L('이등변삼각형: 두 변이 같으면 두 밑각도 같다', 'Isosceles triangle: two equal sides means two equal base angles')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('특수한 삼각형', 'Special Triangles')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>{L('직각삼각형:', 'Right triangle:')}</strong> {L('한 각이 90°, 피타고라스 정리 (a² + b² = c²)', 'One angle is 90°, Pythagorean theorem (a² + b² = c²)')}</li>
            <li><strong>{L('정삼각형:', 'Equilateral triangle:')}</strong> {L('세 변과 세 각이 모두 같음 (각 60°)', 'All three sides and angles are equal (60° each)')}</li>
            <li><strong>{L('30-60-90 삼각형:', '30-60-90 triangle:')}</strong> {L('변의 비율 1 : √3 : 2', 'Side ratio 1 : √3 : 2')}</li>
            <li><strong>{L('45-45-90 삼각형:', '45-45-90 triangle:')}</strong> {L('변의 비율 1 : 1 : √2', 'Side ratio 1 : 1 : √2')}</li>
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
