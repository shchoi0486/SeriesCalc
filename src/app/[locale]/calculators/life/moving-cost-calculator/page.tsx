import TermGlossary from "@/components/calculators/TermGlossary";

import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./MovingCostCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/moving-cost-calculator", "life", "moving-cost-calculator");
}

export default function MovingCostCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = [
    {
      q: L("계산 결과에 포장비도 포함되어 있나요?", "Does the estimate include packing?"),
      a: L(
        "포함되어 있지 않습니다. 이 계산기는 기본 운송비, 거리비, 층수 추가비, 옵션 비용만 반영하는 '일반이사' 기준 추정치입니다. 전문 포장이사(하드포장·패킹이사)는 인력과 자재가 추가되어 같은 조건이라도 30~80만 원 이상 비쌉니다. 견적서를 받을 때는 일반/포장 여부와 자재비 포함 여부를 반드시 분리해서 확인하세요.",
        "No. This calculator reflects base transport, distance, floor surcharge, and optional services only — essentially a standard (non-packing) move. Full-service packing moves add labor and materials and typically cost 300,000–800,000 KRW more under the same conditions. When comparing quotes, always separate transport fees from packing material charges.",
      ),
    },
    {
      q: L("성수기에는 실제로 얼마나 더 비싸지나요?", "How much more expensive is peak season really?"),
      a: L(
        "2~3월(학기 시작·입사 성수기)과 9~10월(가을 이사철)에는 업체 수요가 몰려 견적이 평소보다 20~30% 높아지고, 월말 특히 토요일은 더욱 비쌉니다. 반대로 4~8월의 평일, 그중에서도 화요일~목요일은 할인 폭이 가장 큽니다. 이사 날짜를 하루만 조정해도 수십만 원을 아낄 수 있습니다.",
        "During late February–March (school year start, new jobs) and September–October, demand spikes push quotes up by 20–30%, with month-end Saturdays the most expensive. Off-peak weekdays — especially Tuesday through Thursday between April and August — see the deepest discounts. Moving your date by even one day can save hundreds of thousands of won.",
      ),
    },
    {
      q: L("층수 추가비는 언제 붙나요?", "When does the floor surcharge apply?"),
      a: L(
        "6층 이상인데 엘리베이터가 없는 경우에만 적용됩니다. 이 계산기에서는 6층부터 한 층당 1만 원씩 추가되며, 실제 시장에서는 사다리차 사용 여부와 물품 양에 따라 업체별 편차가 큽니다. 반대로 엘리베이터가 있거나 5층 이하라면 층수 추가비는 발생하지 않습니다.",
        "Only when you are moving into or out of a 6th-floor unit or higher with no elevator access. This calculator adds 10,000 KRW per floor above the 5th. In practice, costs vary widely by mover depending on ladder-truck use and cargo volume — while buildings with elevators (or floors 1–5) incur no surcharge at all.",
      ),
    },
    {
      q: L("견적은 몇 곳 정도 받아 비교하는 게 좋나요?", "How many quotes should I compare?"),
      a: L(
        "최소 3곳, 가능하면 5곳을 권장합니다. 비교할 때는 총액만 보지 말고 ①포장 자재 내역 ②인력 수 ③출발·도착지 층수와 엘리베이터 정보 ④파손 시 보상 규정까지 같은 항목으로 맞춰야 공정한 비교가 됩니다. 지나치게 싼 견적은 당일 인력 축소나 추가 요구로 이어지는 경우가 많습니다.",
        "Get at least three quotes — five if possible. Compare them item by item: packing materials, number of movers, floors and elevator access at both ends, and damage compensation terms. Only then is the comparison fair. Suspiciously cheap quotes often lead to fewer movers showing up or surprise add-on charges on moving day.",
      ),
    },
    {
      q: L("이사 후 파손이 생기면 어떻게 보상받나요?", "What if something gets damaged during the move?"),
      a: L(
        "이사업체는 화물운송주선법상 면책 한도(무게당)가 있어 고가 물품은 별도 파손보험이나 특약이 필요할 수 있습니다. 이사 당일 출발 전 가전·가구 상태를 사진으로 남기고, 파손 발견 즉시 기록 후 업체에 서면 통지하세요. 대형 가전(피아노·에어컨 등)은 설치 불량으로 인한 누수 등이 나중에 발견되므로 A/S 보장 기간도 확인하세요.",
        "Movers carry limited liability per kilogram under freight regulations, so high-value items may need separate moving insurance or a special rider. Photograph electronics and furniture before loading, document any damage immediately on arrival, and notify the company in writing. For appliances like air conditioners or pianos, also check the installation warranty period — leaks and tuning issues can surface days later.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L("이사 비용 계산기", "Moving Cost Calculator")}</strong>
          {L(
            "는 이사 유형, 이동 거리, 층수 조건, 추가 옵션을 입력하면 예상 이사 비용을 즉시 계산해 줍니다. 원룸부터 사무실까지 유형별 한국 시장 평균가를 기준으로 삼기 때문에, 업체 견적서를 받기 전에 '대략 얼마 정도가 정상 범위인가'를 판단하는 기준점으로 활용할 수 있습니다.",
            " estimates your moving cost instantly from the type of move, travel distance, floor conditions, and extra options. Based on average Korean market prices for everything from studio apartments to offices, it gives you a reference point for judging whether a mover's quote is within a normal range before you ever receive one.",
          )}
        </p>
        <p>
          {L(
            "이사 비용은 견적마다 천차만별이라 '감'이 없으면 과요금을 냈는지 알기 어렵습니다. 같은 조건에서도 업체에 따라 몇십만 원씩 차이 나는 것이 이사 시장의 현실이며, 그 차이는 대부분 포장 자재·인력 수·시즌 할증에서 발생합니다. 이 계산기는 최소 단위의 객관적 비용 구조를 먼저 보여줌으로써, 견적 비교의 출발선을 잡아 줍니다.",
            "Moving quotes vary wildly, and without a baseline it is hard to tell whether you are being overcharged. Even under identical conditions, prices can differ by hundreds of thousands of won from company to company — mostly due to packing materials, crew size, and seasonal surcharges. By showing you the objective cost structure first, this calculator sets the starting line for comparing quotes.",
          )}
        </p>
        <TermGlossary
          items={[
            { term: L("기본 이사비", "Base Moving Cost"), desc: L("이사 유형에 따른 기본 운송비입니다.", "Base transport cost based on moving type.") },
            { term: L("운송 거리비", "Distance Cost"), desc: L("이사 거리(km)에 따라 추가되는 비용입니다.", "Additional cost based on distance.") },
            { term: L("이사 성수기", "Peak Season"), desc: L("2~3월, 9~10월은 비용이 20~30% 높아질 수 있습니다.", "Costs may increase by 20-30% during peak months.") },
          ]}
        />
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("이사 유형 선택", "Select the moving type"),
            L("원룸·투룸·쓰리룸 중 현재 주거 규모를 선택하세요. 짐의 양은 방 개수와 대체로 비례한다고 보면 됩니다.", "Pick the size that matches your home — studio, two-room, or three-room. Cargo volume scales roughly with room count."),
          ],
          [
            L("이동 거리 입력", "Enter the distance"),
            L("출발지와 도착지를 지도 앱에서 검색해 실제 도로 거리(km)를 확인한 뒤 입력하세요. 직선거리가 아니라 차량 이동 거리 기준입니다.", "Look up the actual road distance (km) between origin and destination in a map app — driving distance, not straight-line."),
          ],
          [
            L("층수와 엘리베이터 정보 입력", "Add floor and elevator info"),
            L("출발지 또는 도착지가 6층 이상이면서 엘리베이터가 없다면 층수 추가비가 붙습니다. 건물 조건은 견적 편차의 큰 요인입니다.", "A surcharge applies only for 6th floor or above without an elevator — a major source of quote variation."),
          ],
          [
            L("옵션 선택 후 계산", "Choose options and calculate"),
            L("에어컨 이전, 피아노 운반처럼 전문 인력이 필요한 항목을 선택하고 계산하기를 누르면 항목별 비용과 총액이 표시됩니다.", "Select specialist items such as air-conditioner relocation or piano transport, then calculate to see the itemized breakdown."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 투룸, 가까운 거리", "Example 1 — Two-room, short distance")}</p>
          <p>
            {L(
              "투룸 아파트에서 같은 구내로 15km 이사한다고 해보겠습니다. 3층에 엘리베이터가 있고, 에어컨 이전 옵션을 선택했습니다. 투룸 기본비 225,000원(범위 15~30만 원의 평균) + 거리비 7,500원(15km × 500원) + 층수 추가비 0원 + 에어컨 50,000원 =",
              "You are moving from a two-room apartment 15 km away. Third floor with an elevator, plus an air-conditioner relocation option: two-room base 225,000 KRW (midpoint of the 150,000–300,000 range) + distance 7,500 KRW (15 km × 500) + floor surcharge 0 + air conditioner 50,000 KRW =",
            )}{" "}
            <strong className="text-foreground">{L("282,500원", "282,500 KRW")}</strong>
            {L("입니다. 이 금액보다 40만 원 이상 비싼 일반이사 견적이 나온다면 포장 자재나 할증 항목을 하나하나 따져봐야 합니다.", ". If a standard-move quote comes in more than ~400,000 KRW higher than this, go through the packing-material and surcharge lines line by line.")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 쓰리룸, 장거리 + 무엘리베이터", "Example 2 — Three-room, long distance, no elevator")}</p>
          <p>
            {L(
              "쓰리룸에서 30km 떨어진 곳으로 이사하는데, 도착지가 엘리베이터 없는 8층이고 피아노를 옮긴다면: 기본비 375,000원 + 거리비 15,000원 + 층수 추가비 30,000원((8−5층) × 1만 원) + 피아노 운반 150,000원 =",
              "Moving a three-room home 30 km, into an 8th-floor walk-up, with a piano: base 375,000 KRW + distance 15,000 KRW + floor surcharge 30,000 KRW ((8−5) × 10,000) + piano transport 150,000 KRW =",
            )}{" "}
            <strong className="text-foreground">{L("570,000원", "570,000 KRW")}</strong>
            {L("이 됩니다. 같은 조건이라도 2~3월에는 이 금액에 20~30%가 더해질 수 있다는 점을 감안하세요.", ". Keep in mind that in February–March this figure can rise by another 20–30% due to peak-season demand.")}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-4">
        <h4 className="font-bold">{L("비용 계산 공식", "Cost Formula")}</h4>
        <div className="p-4 bg-muted rounded-lg font-mono text-sm text-center space-y-2">
          <p>{L("총 비용 = 기본비 + 거리비 + 층수추가비 + 옵션비", "Total = Base + Distance + Floor Surcharge + Options")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p><strong>{L("기본비", "Base")}:</strong> {L("이사 유형에 따른 범위 내 평균", "Average within type range")}</p>
          <p><strong>{L("거리비", "Distance")}:</strong> {L("km x \u20A9500", "km x \u20A9500")}</p>
          <p><strong>{L("층수추가비", "Floor")}:</strong> {L("6층 이상 + 엘리베이터 없음: (층수-5) x \u20A910,000", "6F+ no elevator: (floor-5) x \u20A910,000")}</p>
        </div>
        <p className="text-sm">
          {L(
            "각 항목은 독립적으로 더해지므로, 견적서를 받았을 때 역산해 보면 업체가 어느 항목에서 얼마를 더 청구하는지 바로 드러납니다. 특히 거리비는 km당 500원이 시장의 통상 수준이며, 이보다 훨씬 높다면 장거리 할증 명목의 추가 요금입니다.",
            "Because each component adds independently, you can reverse-engineer any quote to see exactly where a mover charges above market rate. Distance at 500 KRW/km is the typical benchmark — significantly higher amounts are usually labeled as long-haul surcharges.",
          )}
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4">
        <h4 className="font-bold">{L("이사 비용 절약 팁", "Cost Saving Tips")}</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>{L("이사 성수기(2~3월, 9~10월)를 피하면 비용을 절약할 수 있습니다. 특히 토요일과 월말은 피하고 화~목요일 평일 오전을 노리세요.", "Avoiding peak season saves money. Skip weekends and month-ends entirely — Tuesday-to-Thursday mornings get the best rates.")}</li>
          <li>{L("최소 3곳 이상의 이사업체에서 견적을 받아 비교하세요. 같은 항목 기준으로 비교해야 공정합니다.", "Collect quotes from at least three movers, compared on identical line items.")}</li>
          <li>{L("불필요한 물건을 미리 정리하면 이사 비용을 줄일 수 있습니다. 짐의 부피가 곧 인력과 차량 비용입니다.", "Declutter before the move — less volume means less labor and smaller trucks.")}</li>
          <li>{L("에어컨, 피아노 등 대형 가전/가구는 사전에 업체에 알려 정확한 견적을 받으세요. 당일 추가 요금의 최대 원인이 이 항목들입니다.", "Declare large items like air conditioners and pianos in advance — they are the top cause of day-of price hikes.")}</li>
          <li>{L("박스 포장은 스스로 하고 가구만 업체에 맡기는 '반포장' 방식을 선택하면 자재비와 인력비를 동시에 줄일 수 있습니다.", "Choosing semi-service (self-pack boxes, movers handle furniture only) cuts both material and labor costs.")}</li>
        </ul>
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
