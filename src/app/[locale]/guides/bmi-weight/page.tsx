import type { Metadata } from "next";
import Link from "next/link";
import ProsePage, { ProseSection } from "@/components/sections/ProsePage";
import AffiliateSlot from "@/components/sections/AffiliateSlot";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const isKo = params.locale === "ko";
  return {
    title: isKo ? "BMI·체중 관리 가이드: 지수 해석과 칼로리 계산법" : "BMI & Weight Guide: Reading the Index and Counting Calories",
    description: isKo
      ? "BMI 계산·판정 기준, 기초대사량과 목표 칼로리 구하는 법, 요요 없이 감량하는 순서와 BMI 분류표를 정리했습니다."
      : "How BMI is computed and judged, with a classification table, BMR and calorie targets, and how to lose weight without rebound.",
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
    {
      q: L("BMI를 얼마나 자주 측정해야 하나요?", "How often should I measure BMI?"),
      a: L(
        "월 1~2회 같은 조건(아침 공복, 같은 체중계)으로 측정해 추세를 보는 것이 좋습니다. 매일 측정하면 수분 변동에 흔들립니다.",
        "Measure 1–2 times a month under the same conditions (morning, fasted, same scale) and watch the trend. Daily weighing is noisy from water fluctuations.",
      ),
    },
    {
      q: L("체중 감량 속도는 어느 정도가 적당한가요?", "What is a sensible weight-loss rate?"),
      a: L(
        "주당 체중의 0.5~1% 감량이 권장됩니다. 더 빠르면 근손실과 요요 위험이 커집니다. 단기 다이어트보다 3~6개월 단위의 계획이 효과적입니다.",
        "Losing 0.5–1% of body weight per week is recommended. Faster loss risks muscle loss and rebound. A 3–6 month plan beats a crash diet.",
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
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/60">
                  <th className="border p-2 text-left">{L("BMI", "BMI")}</th>
                  <th className="border p-2 text-left">{L("WHO 분류", "WHO class")}</th>
                  <th className="border p-2 text-left">{L("아시아 기준", "Asian note")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">&lt; 18.5</td><td className="border p-2">{L("저체중", "Underweight")}</td><td className="border p-2">{L("저체중", "Underweight")}</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">18.5 ~ 24.9</td><td className="border p-2">{L("정상", "Normal")}</td><td className="border p-2">{L("정상", "Normal")}</td></tr>
                <tr><td className="border p-2">25.0 ~ 29.9</td><td className="border p-2">{L("과체중", "Overweight")}</td><td className="border p-2">{L("과체중 (23~)", "Overweight (23~)")}</td></tr>
                <tr className="bg-muted/20"><td className="border p-2">30.0 ~ 34.9</td><td className="border p-2">{L("비만 1단계", "Obese I")}</td><td className="border p-2">{L("비만", "Obese")}</td></tr>
                <tr><td className="border p-2">≥ 35.0</td><td className="border p-2">{L("비만 2~3단계", "Obese II–III")}</td><td className="border p-2">{L("고도비만", "Severe")}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {L(
              "* BMI는 체중과 키만 반영합니다. 근육량·체형·연령·성별은 반영되지 않으므로 보조 지표로 활용하세요.",
              "* BMI reflects only weight and height. It ignores muscle, frame, age and sex — use it as a supporting indicator.",
            )}
          </p>
          <p>
            <Link href={`${base}/bmi-calculator`} className="text-primary underline">BMI {L("계산기", "Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/body-fat-calculator`} className="text-primary underline">{L("체지방 계산기", "Body Fat Calculator")}</Link>
            {L(" · ", " · ")}
            <Link href={`${base}/ideal-weight-calculator`} className="text-primary underline">{L("표준 체중 계산기", "Ideal Weight Calculator")}</Link>
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
            {L(" · ", " · ")}
            <Link href={`${base}/bmr-calculator`} className="text-primary underline">{L("기초대사량 계산기", "BMR Calculator")}</Link>
            .
          </p>
        </ProseSection>

        <ProseSection title={L("마른 비만과 체지방 분포", "Normal-weight obesity and fat distribution")}>
          <p>
            {L(
              "BMI가 정상이어도 체지방률이 높거나 허리둘레가 큰 경우(남 90cm, 여 85cm 이상)가 있습니다. 이를 '마른 비만'이라 하며, 대사증후군·당뇨·심혈관 위험이 높아집니다. BMI와 함께 허리둘레·체지방률·혈압·혈중 지질을 종합적으로 보세요.",
              "Even with a normal BMI, high body-fat percentage or large waist (≥90cm men, ≥85cm women) indicates 'normal-weight obesity', raising metabolic syndrome, diabetes and cardiovascular risk. Assess BMI together with waist, body fat, blood pressure and lipids.",
            )}
          </p>
        </ProseSection>

        <ProseSection title={L("요요 없이 감량하는 순서", "Losing weight without rebound, in order")}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{L("현재 파악: BMI·체지방·허리둘레를 재고 사진·기록을 남기세요.", "Measure now: record BMI, body fat, waist and photos.")}</li>
            <li>{L("식단 2주 고정: 유지 칼로리에서 300kcal만 빼고 2주간 체중 추세를 봅니다.", "Fix diet for 2 weeks: cut just 300 kcal under maintenance and watch the trend.")}</li>
            <li>{L("근력+유산소: 주 3회 근력 운동이 기초대사량 하락을 막습니다.", "Strength plus cardio: lifting 3× weekly defends basal metabolic rate.")}</li>
            <li>{L("정체기 대응: 3주 이상 정체면 섭취를 더 줄이기보다 활동량을 늘리세요.", "Handle plateaus: after 3+ stalled weeks, add activity rather than cutting food further.")}</li>
            <li>{L("유지 단계: 목표 도달 후 4~8주간 유지 칼로리로 전환해 요요를 방지합니다.", "Maintenance: after reaching the goal, switch to maintenance calories for 4–8 weeks to prevent rebound.")}</li>
          </ul>
        </ProseSection>

        <ProseSection title={L("자주 묻는 질문", "Frequently Asked Questions")}>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i} className="rounded-xl border p-4">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </ProseSection>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {L(
              "면책: 본 페이지의 예시와 설명은 일반적인 정보 제공 목적이며, 의료·건강·영양 자문이 아닙니다. 개인의 건강 상태에 맞는 계획은 전문가와 상담하세요.",
              "Disclaimer: The examples and explanations here are for general information only and do not constitute medical, health or nutrition advice. Consult a professional for a plan tailored to you.",
            )}
          </p>
        </div>

        <AffiliateSlot placement="guide" />
      </ProsePage>
    </>
  );
}
