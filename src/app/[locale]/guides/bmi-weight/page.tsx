import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "BMI·체중 관리 가이드: 지수 해석과 칼로리 계산법" : "BMI & Weight Guide: Reading the Index and Counting Calories",
    description: isKo
      ? "BMI 계산·판정 기준, 기초대사량과 목표 칼로리 구하는 법, 요요 없이 감량하는 순서를 정리했습니다."
      : "How BMI is computed and judged, how to find BMR and calorie targets, and how to lose weight without rebound.",
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const base = `/${params.locale}/calculators/life`;

  const faq = [
    {
      q: L("BMI가 정상인데 뱃살이 고민이면?", "What if BMI is normal but belly fat worries me?"),
      a: L(
        "마른 비만일 수 있습니다. 허리둘레(남 90cm·여 85cm 기준)와 체지방률을 함께 보세요. 체지방 계산기로 현재 상태를 확인한 뒤 근력 운동 비중을 높이세요.",
        "You may have normal-weight obesity. Check waist circumference and body-fat percentage together. Assess with the body-fat calculator, then raise the share of strength training.",
      ),
    },
    {
      q: L("하루에 몇 칼로리를 먹어야 빠지나요?", "How many calories should I eat to lose weight?"),
      a: L(
        "유지 칼로리(TDEE)에서 300~500kcal를 뺀 수준이 무리 없는 감량 구간입니다. 기초대사량 이하로 내려가면 근손실·요요 위험이 커집니다. 칼로리 계산기에서 목표 섭취량을 구하세요.",
        "Eat 300–500 kcal below your maintenance (TDEE). Dropping under basal metabolic rate risks muscle loss and rebound. Get your target from the calorie calculator.",
      ),
    },
    {
      q: L("근육이 많은 사람은 BMI가 부정확한가요?", "Is BMI inaccurate for muscular people?"),
      a: L(
        "네. BMI는 체중만 보므로 근육형 체형은 과체중으로 판정될 수 있습니다. 이 경우 체지방률·허리둘레·인바디 추세를 함께 판단하세요.",
        "Yes — BMI only sees weight, so muscular builds read as overweight. Judge together with body-fat percentage, waist circumference and trend data.",
      ),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
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
      <ProsePage title={L("BMI·체중 관리 완전 가이드", "The Complete BMI & Weight Guide")}>
        <ProseSection title={L("BMI 계산과 판정", "Computing and judging BMI")}>
          <p>
            {L(
              "BMI는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. WHO 기준 18.5 미만 저체중, 18.5~24.9 정상, 25 이상 과체중·비만이며, 아시아 기준으로는 23부터 과체중으로 보는 경우가 많습니다.",
              "BMI is weight (kg) divided by height (m) squared. WHO sets underweight below 18.5, normal 18.5–24.9, overweight/obese at 25+; Asian standards often start overweight at 23.",
            )}
          </p>
          <p>
            <Link href={`${base}/bmi-calculator`} className="text-primary underline">BMI {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/body-fat-calculator`} className="text-primary underline">{L("체지방 계산기", "Body Fat Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("유지·감량 칼로리 구하기", "Finding maintenance and cutting calories")}>
          <p>
            {L(
              "기초대사량(BMR)은 가만히 있어도 쓰는 에너지이고, 활동량을 곱한 총소비(TDEE)가 유지 칼로리입니다. 감량은 TDEE보다 적게, 증량은 많게 먹으면 됩니다. 핵심은 BMR 이하로 내려가지 않으면서 300~500kcal의 적자를 만드는 것입니다.",
              "BMR is the energy you burn at rest; multiplying by activity gives TDEE, your maintenance calories. Lose by eating below TDEE, gain by eating above. The key is a 300–500 kcal deficit that never dips under BMR.",
            )}
          </p>
          <p>
            <Link href={`${base}/calorie-calculator`} className="text-primary underline">{L("칼로리 계산기", "Calorie Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("요요 없이 감량하는 순서", "Losing weight without rebound, in order")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("현재 파악: BMI·체지방·허리둘레를 재고 사진·기록을 남기세요.", "Measure now: record BMI, body fat, waist and photos.")}</li>
            <li>{L("식단 2주 고정: 유지 칼로리에서 300kcal만 빼고 2주간 체중 추세를 봅니다.", "Fix diet for 2 weeks: cut just 300 kcal under maintenance and watch the trend.")}</li>
            <li>{L("근력+유산소: 주 3회 근력 운동이 기초대사량 하락을 막습니다.", "Strength plus cardio: lifting 3× weekly defends basal metabolic rate.")}</li>
            <li>{L("정체기 대응: 3주 이상 정체면 섭취를 더 줄이기보다 활동량을 늘리세요.", "Handle plateaus: after 3+ stalled weeks, add activity rather than cutting food further.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
