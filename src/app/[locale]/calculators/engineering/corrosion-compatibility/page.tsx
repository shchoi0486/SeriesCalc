import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqItem from "@/components/calculators/FaqItem";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./CorrosionCompatibilityClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/corrosion-compatibility", "engineering", "corrosion-compatibility");
}

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const t = (ko: string, en: string) => (isKo ? ko : en);

  const faqs = isKo
    ? [
        {
          q: "A 등급이 나오면 무조건 안전한가요?",
          a: "A 등급은 '균일 부식이 매우 느리다'는 의미일 뿐, 모든 파괴 메커니즘에서 안전하다는 뜻은 아닙니다. 스테인리스계 재료는 전체 부식량은 적더라도 염소이온 환경에서 핏팅·틈새부식 같은 국부부식으로 갑자기 관통될 수 있고, 응력부식균열도 등급표에 반영되지 않습니다. A 등급이라도 실제 설계에서는 온도 변동 범위와 국부부식 가능성을 별도로 검토해야 합니다.",
        },
        {
          q: "이 데이터의 출처는 무엇인가요?",
          a: "특수강 제조사 Alleima(구 Sandvik Materials Technology)가 공개하는 부식 저항성 데이터 테이블을 기반으로 합니다. 검색 결과에서 화학물질 이름 옆의 링크를 누르면 원본 출처 표로 이동해 농도별·온도별 세부 수치를 직접 확인할 수 있습니다.",
        },
        {
          q: "표에 없는 농도나 온도는 어떻게 해석하나요?",
          a: "보수적으로 해석하는 것이 원칙입니다. 원하는 조건보다 한 단계 가혹한(농도가 더 높거나 온도가 더 높은) 인접 조건의 등급을 따르세요. 예를 들어 표에 20%와 30%만 있는데 실제 사용 농도가 25%라면 30% 기준 등급을 참고합니다. 부식 속도는 대체로 농도·온도 상승에 대해 비선형으로 급격히 나빠지므로, 중간값을 선형 보간하는 것은 위험합니다.",
        },
        {
          q: "두 종류 이상의 화학물질이 섞인 용액도 조회할 수 있나요?",
          a: "가능하지만 해석에 주의가 필요합니다. 이 계산기는 최대 3개 성분의 혼합 조건을 지원하며, 데이터 표에 명시된 혼합 조합의 등급을 그대로 보여줍니다. 다만 표에 없는 임의의 배합비라면 개별 성분 등급이 모두 A여도 혼합물에서는 등급이 크게 달라질 수 있으므로, 실제 조성과 유사한 공개 데이터를 찾거나 침지 시험으로 검증해야 합니다.",
        },
        {
          q: "등급이 경계(C)인 재료는 어떤 기준으로 판단하나요?",
          a: "C 등급은 '제한적 사용' 구간으로, 부식 속도가 허용 가능한 수명 요구치와 점검·교체 주기에 달려 있다는 의미입니다. 예를 들어 내후년 10년이 필요한 배관이라면 C 등급 재료는 부적합할 확률이 높지만, 자주 교체하는 소모성 부품이라면 비용 대비 선택지가 될 수도 있습니다. 설계 수명, 점검 주기, 안전계수를 함께 고려해 결정하세요.",
        },
      ]
    : [
        {
          q: "Does an A rating guarantee the material is safe?",
          a: "An A rating means only that uniform corrosion is very slow — it does not certify safety against every failure mechanism. Stainless steels, for example, can suffer sudden pitting or crevice corrosion in chloride environments even when overall mass loss is negligible, and stress-corrosion cracking is not captured by these tables either. Even with an A rating, real designs must separately review temperature excursions and localized attack.",
        },
        {
          q: "Where does this data come from?",
          a: "The ratings are based on the publicly published corrosion tables of Alleima (formerly Sandvik Materials Technology), a specialty-steel manufacturer. Clicking the link next to each chemical name in the results opens the original source table, where you can inspect exact values by concentration and temperature.",
        },
        {
          q: "How do I interpret concentrations or temperatures not listed in the table?",
          a: "Interpret conservatively: adopt the rating of the nearest more-severe condition — higher concentration or higher temperature. If a table lists only 20% and 30% but your process runs at 25%, use the 30% rating. Corrosion rates typically worsen non-linearly as concentration and temperature rise, so linear interpolation between rows is unsafe.",
        },
        {
          q: "Can I look up mixtures of two or more chemicals?",
          a: "Yes, but read the result carefully. The tool supports up to three components and shows exactly what the source table says for that specific mixture. For arbitrary blend ratios not covered by the table, remember that a combination can corrode far faster than any individual ingredient suggests — look for published data matching your actual composition or verify with immersion testing.",
        },
        {
          q: "How should I treat a borderline (C) rating?",
          a: "C means 'limited use': the corrosion rate may be acceptable depending on required service life and inspection/replacement intervals. A C-rated pipe material is probably wrong for a 10-year design life, yet could be economical for frequently replaced consumable parts. Decide together with your required lifetime, maintenance schedule, and safety factor.",
        },
      ];

  const sections = [
    {
      value: "description",
      title: t("계산기 설명", "Calculator Description"),
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">{t("부식 적합성 계산기", "Corrosion Compatibility Calculator")}</strong>
            {isKo
              ? " 는 특정 재료(스테인리스, 합금, 플라스틱 등)가 특정 화학물질에 얼마나 견디는지를 농도·온도 조건별로 조회하는 도구입니다. 배관 자재 선정, 화학 플랜트 설비, 실험실 기구, 저장 탱크 설계 등에서 '이 액체에 이 소재를 써도 되는가'를 판단할 때 첫 번째 확인 단계로 사용하세요."
              : " looks up how well a specific material (stainless steel, alloy, plastic…) withstands a given chemical at various concentrations and temperatures. Use it as the first checkpoint when selecting piping materials, chemical plant equipment, laboratory glassware substitutes, or storage tank construction."}
          </p>
          <p>
            {isKo
              ? "부식은 눈에 잘 띄지 않게 진행되지만 그 피해 규모는 막대합니다. 전 세계적으로 매년 GDP의 약 3% 안팎이 부식으로 손실된다는 추정이 널리 인용되며, 잘못된 자재 선정으로 인한 누출 사고는 제품 손실을 넘어 안전 문제로 직결됩니다. 몇 분의 조회로 피할 수 있는 비용이 셀 수 없이 많습니다."
              : "Corrosion progresses quietly, but the losses are enormous — estimates commonly cited put global annual corrosion damage at around 3% of world GDP, and leaks caused by wrong material selection lead directly to safety incidents, not just product loss. A few minutes of checking can prevent enormous costs."}
          </p>
          <p>
            {isKo
              ? "결과의 색상 등급(A~D)은 공개 부식 저항 데이터에 기반한 균일 부식 기준 해석값입니다. 조회 결과에는 해당 화학물질의 원본 데이터 링크가 함께 표시되므로, 최종 설계 전에 원문 표의 세부 수치까지 확인하는 습관을 권장합니다."
              : "The color-coded ratings (A–D) interpret uniform corrosion from public resistance data. Each result includes a link to the original source table — make it a habit to check the underlying values before finalizing a design."}
          </p>
        </div>
      ),
    },
    {
      value: "how-to-use",
      title: t("사용 방법", "How to Use"),
      content: (
        <ol className="space-y-4 text-sm text-muted-foreground">
          {[
            [
              t("재료 선택", "Select the material"),
              t("검토 중인 소재(예: SUS304, SUS316, PVC, PTFE 등)를 목록에서 고릅니다. 후보가 여러 개라면 각각 조회해 비교할 수 있습니다.", "Pick the material under consideration (e.g., SUS304, SUS316, PVC, PTFE). Query several candidates to compare them side by side."),
            ],
            [
              t("화학물질 검색", "Search the chemical"),
              t("취급 물질의 이름(국문/영문/화학식 지원)을 입력해 검색합니다. 결과에서 원본 데이터 링크를 확인할 수 있습니다.", "Type the substance you handle (Korean or English names and formulas supported). Each result links to its source data."),
            ],
            [
              t("농도와 온도 조건 선택", "Choose concentration and temperature"),
              t("실제 공정 조건에 가장 가까운 농도 행과 온도 열을 선택하세요. 희석·가열 조건이 있다면 그 범위의 최악 조건 기준으로 보는 것이 안전합니다.", "Select the row/column closest to your actual process conditions. If dilution or heating occurs anywhere in the line, judge by the worst case within that range."),
            ],
            [
              t("등급 해석", "Read the rating"),
              t("A(녹색)=우수, B(노랑)=보통, C(주황)=제한적 사용, D(빨강)=부적합입니다. C 이하라면 대체 재료 검토 또는 방식 처리(코팅·라이닝)를 함께 고려하세요.", "A (green) = excellent, B (yellow) = fair, C (orange) = limited use, D (red) = unsuitable. At C or below, consider alternate materials or protective measures such as coatings or linings."),
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
    },
    {
      value: "worked-examples",
      title: t("예시로 이해하기", "Worked Examples"),
      content: (
        <div className="space-y-6 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-2">{t("예시 1 — 플라스틱이 강한 영역", "Example 1 — Where plastics shine")}</p>
            <p>
              {t(
                "실험실에서 상온의 묽은 염산(HCl)을 다루는 배관을 새로 깔아야 한다고 하겠습니다. SUS316 스테인리스를 떠올리기 쉽지만, 염소이온이 많은 환경에서 스테인리스는 핏팅 위험이 있습니다. 같은 조건으로 PVC를 조회하면 상온 광범위 농도에서 우수 등급이 나오는 경우가 많습니다. 즉 '금속이 항상 정답은 아니다'라는 것이 이 조회의 첫 번째 교훈입니다.",
                "Suppose you are routing piping for dilute hydrochloric acid at room temperature. Stainless SUS316 might come to mind first, but chloride-rich environments pose pitting risk to it. Querying PVC under the same conditions often returns excellent ratings across a wide concentration band at ambient temperature — the first lesson here being that metal is not always the answer.",
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">{t("예시 2 — 온도가 등급을 바꾸는 순간", "Example 2 — When temperature flips the verdict")}</p>
            <p>
              {t(
                "희석된 황산은 상온에서 일부 스테인리스 강종이 제한적으로 견딜 수 있지만, 같은 농도라도 60~80℃로 올라가면 부식 속도가 급격히 커져 부적합(D)으로 분류되는 조건이 흔합니다. 농도 행은 그대로 두고 온도 열만 바꿔서 다시 조회해 보세요. 하나의 변수 변경으로 등급이 A→D로 무너지는 것을 직접 확인하는 것이 이 도구의 가장 좋은 사용법입니다.",
                "Dilute sulfuric acid can be marginally tolerated by some stainless grades at room temperature, yet at 60–80 ℃ the same concentration often falls into the unsuitable (D) zone as corrosion rates climb steeply. Keep the concentration row fixed and move across temperature columns — watching a rating collapse from A to D over one variable change is the best way to learn this tool.",
              )}
            </p>
            <p className="mt-2 text-xs opacity-80">
              * {t("위 시나리오는 일반적인 부식 경향을 설명하기 위한 예이며, 실제 등급은 조회 결과의 원본 데이터 표를 기준으로 확인하세요.", "These scenarios illustrate typical tendencies; always confirm actual ratings in the source table linked from your query.")}
            </p>
          </div>
        </div>
      ),
    },
    {
      value: "tips",
      title: t("유용한 팁", "Useful Tips"),
      content: (
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>{t("온도는 농도만큼 중요합니다. 같은 농도에서 20℃ 차이로 등급이 두 단계 떨어지는 경우가 드물지 않으므로, 공정 최고 온도 기준으로 조회하세요.", "Temperature matters as much as concentration. A 20 ℃ rise often drops a rating by two steps — query at your maximum process temperature.")}</li>
          <li>{t("등급은 균일 부식 기준입니다. 핏팅·틈새부식·응력부식균열 같은 국부적 파괴는 별도 검토 항목입니다. 특히 염화물 환경의 스테인리스는 주의하세요.", "Ratings reflect uniform corrosion only. Localized mechanisms — pitting, crevice, stress-corrosion cracking — need separate review, especially for stainless steels in chloride service.")}</li>
          <li>{t("혼합 화학물질은 개별 성분 결과와 다를 수 있습니다. 세척액처럼 여러 성분이 섞인 액체는 혼합 조건으로 직접 조회하세요.", "Mixtures do not behave like their ingredients. For blended liquids such as cleaning agents, run the query on the mixture condition itself.")}</li>
          <li>{t("용접부와 표면 상태는 모재보다 취약한 경우가 많습니다. 실제 배관에서는 열영향부가 먼저 부식되는 사례가 흔합니다.", "Welds and surface finish are frequent weak points — heat-affected zones often corrode before the parent metal does.")}</li>
          <li>{t("중요 설비의 자재 선정은 반드시 원본 데이터 표와 제조사 기술자료, 필요시 재료공학 전문가의 검토를 거치세요. 이 도구는 1차 스크리닝용입니다.", "For critical equipment, follow up with the original data tables, manufacturer datasheets, and where appropriate a materials engineer. Treat this tool as a first-pass screen.")}</li>
        </ul>
      ),
    },
    {
      value: "faq",
      title: t("자주 묻는 질문", "Frequently Asked Questions"),
      content: (
        <div className="space-y-5 text-sm text-muted-foreground">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      ),
    },
  ];

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
      <CalculatorClient />
      <Accordion type="multiple" defaultValue={sections.map(s => s.value)} className="w-full max-w-5xl mx-auto px-4 space-y-4 mt-8">
        {sections.map(s => (
          <AccordionItem key={s.value} value={s.value} className="border rounded-lg bg-card">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline p-4 data-[state=open]:bg-accent/20 rounded-lg px-4">
              <span className="text-left">{s.title}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="accordion-content-optimized">{s.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
