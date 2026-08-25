import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqItem from "@/components/calculators/FaqItem";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./MaterialComparisonClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/engineering/material-comparison", "engineering", "material-comparison");
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
          q: "이 데이터의 출처는 무엇이며 얼마나 신뢰할 수 있나요?",
          a: "재료공학 오픈 데이터베이스(MakeItFrom 계열)의 공개 자료를 기반으로 하며, 각 재료의 대표적인 물성 범위를 정리해 둔 것입니다. 금속은 열처리 상태, 판·봉·주물 등 제품 형태, 시험 방향에 따라 물성이 달라지므로 데이터베이스 값은 '대표값 또는 규격 범위'로 이해해야 합니다. 최종 설계에는 해당 재료의 밀(Mill) 시험성적서나 국가규격(KS D, ASTM 등) 원문으로 확정하세요.",
        },
        {
          q: "같은 재료 이름인데 검색 결과가 여러 개 나오는 이유는?",
          a: "동일 강종이라도 열처리 조건(어닐링, 담금질·템퍼링), 제품 형태(판, 봉, 파이프), 그리고 출처 규격별로 항목이 분리되어 있기 때문입니다. 예컨대 알루미늄 6061은 일반형과 T6 열처리형의 항복강도가 몇 배 차이가 납니다. 비교하려는 부품의 실제 조달 조건(열처리·형태)과 일치하는 항목을 고르는 것이 정확한 비교의 첫걸음입니다.",
        },
        {
          q: "물성값에 '18 ~ 20'처럼 범위로 표시되는 것은 무슨 뜻인가요?",
          a: "규격이 허용하는 최소~최대 범위입니다. 화학 성분(예: 크롬 18~20%)은 제조사가 목표치 안에서 배합한다는 뜻이고, 물성에서는 재료 등급 내 변동 폭을 보여줍니다. 범위 값의 하한이 설계에 중요합니다. 항복강도 같은 값은 최소보증치가 구조계산의 기준이 되고, 열전도도처럼 낮은 게 유리한 성질은 상한이 불리한 쪽입니다.",
        },
        {
          q: "CSV 다운로드는 어떤 용도로 쓰면 좋나요?",
          a: "선택한 재료들의 물성표를 스프레드시트로 내려받는 기능입니다. 사내 표준 자재 선정 회의 자료 만들기, 여러 후보 강종의 조건부 서식 비교(최소값 강조), 설계 계산서 입력용 데이터 정리 등에 유용합니다. 다운로드 파일에는 비교 테이블에 표시된 것과 동일한 물성·단위가 들어가므로, 보고서 첨부 전에 단위와 범위 표기를 한 번 더 확인하면 좋습니다.",
        },
        {
          q: "'비강도(Strength to Weight Ratio)' 항목은 언제 봐야 하나요?",
          a: "무게가 설계 변수인 경우 — 항공·운송기기·휴대기기 구조물, 로봇 암, 장비 이동성이 중요한 브래킷 등 — 에 핵심 지표입니다. 예컨대 강철 대비 알루미늄 6061-T6는 절대 강도는 낮지만 밀도가 약 1/3이라 비강도에서 역전될 수 있습니다. 다만 비강도만 보고 선정하면 강성(탄성계수) 부족으로 처짐이 커지는 함정이 있으므로, 하중 종류에 따라 탄성계수·피로강도를 함께 비교해야 합니다.",
        },
      ]
    : [
        {
          q: "Where does this data come from and how reliable is it?",
          a: "It builds on public materials-engineering databases of the MakeItFrom family, summarizing representative property ranges per material. Because metal properties shift with heat treatment, product form (plate, bar, casting), and test direction, treat these figures as typical values or specification ranges. Final design should be pinned down by mill test certificates or the original national standards (KS D, ASTM, etc.).",
        },
        {
          q: "Why do multiple entries appear under the same material name?",
          a: "One grade splits into several records by heat treatment (annealed versus quenched-and-tempered), product form, or source specification. Aluminium 6061 plain versus T6 differ in yield strength by several-fold. Match the entry to how your part will actually be procured — that is step one of an honest comparison.",
        },
        {
          q: "What does a range like '18 ~ 20' mean?",
          a: "The minimum-to-maximum band the specification allows. For chemistry it is the batch window manufacturers must hit; for properties it reflects within-grade variation. The lower bound usually matters most: yield strength designs to the guaranteed minimum, while for properties where lower is better (thermal conductivity) the upper bound is the pessimistic case.",
        },
        {
          q: "What is the CSV download good for?",
          a: "It exports the comparison table for spreadsheet work — building internal standard-material selection documents, conditional-formatting candidate alloys (highlight minimums), or feeding values into calculation sheets. The file mirrors exactly what the table shows, including units and ranges, so double-check those before attaching it to reports.",
        },
        {
          q: "When should I look at 'Strength to Weight Ratio'?",
          a: "Whenever mass is a design variable: aerospace and vehicle structures, robot arms, portable-equipment brackets. Against steel, 6061-T6 aluminium loses on absolute strength but can win specific strength thanks to roughly one-third the density. Beware the trap of selecting on specific strength alone — low stiffness (elastic modulus) means larger deflections, so compare modulus and fatigue strength alongside depending on load type.",
        },
      ];

  const sections = [
    {
      value: "description",
      title: t("계산기 설명", "Calculator Description"),
      content: (
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">{t("재료 물성 비교 도구", "Material Property Comparison Tool")}</strong>
            {isKo
              ? " 는 금속·폴리머·세라믹 데이터베이스에서 재료를 선택해 밀도, 항복강도, 인장강도, 열전도도, 전기전도도 등 수십 가지 물성을 나란히 비교하는 도구입니다. 기계·구조 설계에서 자재 후보를 좁히거나, 대체 재료 검토, 사양서 작성, 견적 대응 자료 준비에 사용하세요."
              : " pulls materials from a metals/polymers/ceramics database and lines up dozens of properties — density, yield strength, tensile strength, thermal conductivity, electrical conductivity — side by side. Use it to narrow candidate materials in mechanical and structural design, evaluate substitutions, draft specifications, or prepare quotation support data."}
          </p>
          <p>
            {isKo
              ? "비교 테이블은 기계적 → 열적 → 전기적 순서로 물성을 정렬하고, 한국어 물성명과 영문 원항목을 함께 보여줍니다. 합금 성분조성(C, Cr, Ni…)도 별도 섹션으로 표시되며, 각 재료는 스위치로 표시/숨김을 전환할 수 있어 많은 재료를 넣었다 빼면서 비교하기 편합니다."
              : "Properties sort mechanically → thermally → electrically, shown with Korean names beside the English source items. Alloy compositions (C, Cr, Ni…) appear in their own section, and each material has a visibility switch so you can juggle many candidates at once."}
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
              t("재료 찾기", "Find materials"),
              t("카테고리(대분류→중분류→소분류→재료)로 드릴다운하거나, 검색창에 강종명(예: SUS304, A36, 6061)을 직접 입력하세요.", "Drill through categories, or type a grade name such as SUS304, A36, or 6061 into the search box."),
            ],
            [
              t("비교 대상 추가", "Add comparators"),
              t("추가 버튼으로 비교할 재료를 모두 올립니다. 이미 추가된 재료는 중복 등록되지 않습니다.", "Load every candidate with the add button; duplicates are blocked automatically."),
            ],
            [
              t("물성표 읽기", "Read the property table"),
              t("기계적 → 열적 → 전기적 순서로 정렬된 표에서 항목별 차이를 확인합니다. 범위 값(~)은 규격 허용 범위입니다.", "Scan rows sorted mechanical → thermal → electrical. Range values (~) are specification bands."),
            ],
            [
              t("CSV로 내보내기", "Export if needed"),
              t("다운로드 버튼으로 스프레드시트 파일을 받아 보고서나 추가 분석에 활용하세요.", "Hit download for a spreadsheet copy usable in reports or further analysis."),
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
          <p>
            {t(
              "아래 수치는 널리 인용되는 대표값(데이터 소스에 따라 ±수% 오차 가능)으로, 도구에서 세 재료를 나란히 놓으면 이런 그림이 그려집니다.",
              "Figures below are widely cited representative values (±a few percent depending on source); loading these three materials shows exactly this picture.",
            )}
          </p>
          <div>
            <p className="font-semibold text-foreground mb-2">{t("예시 1 — 구조용 강재 vs 스테인리스 vs 알루미늄", "Example 1 — structural steel vs stainless vs aluminium")}</p>
            <p>
              {t(
                "A36 탄소강, SUS304, 6061-T6 알루미늄을 비교하면: 밀도는 약 7,850 / 8,000 / 2,700 kg/m³, 항복강도는 약 250 / 230~290 / 276 MPa, 열전도도는 약 52 / 16 / 167 W/m·K 수준입니다. 눈에 띄는 교차점은 두 가지입니다. 첫째, 스테인리스는 탄소강보다 강도가 비슷하거나 높으면서도 열전도도가 1/3 수준이라 열전달 부품에는 부적합하지만 보온·단열 구조에는 유리합니다. 둘째, 알루미늄은 절대 강도가 비슷해도 밀도가 약 1/3이라 무게당 성능(비강도)에서 앞서며, 탄성계수(약 69 GPa vs 강재 약 200 GPa)가 낮다는 점이 처짐·좌굴 검토의 함정이 됩니다.",
                "Compare A36 carbon steel, SUS304, and 6061-T6 aluminium: density ≈ 7,850 / 8,000 / 2,700 kg/m³; yield ≈ 250 / 230–290 / 276 MPa; thermal conductivity ≈ 52 / 16 / 167 W/m·K. Two crossovers stand out. First, stainless matches or beats carbon steel on strength while conducting only one-third the heat — poor for heat exchangers but handy where thermal isolation helps. Second, aluminium reaches similar strength at one-third density, winning strength-to-weight, yet its modulus (~69 GPa vs ~200 GPa) makes deflection and buckling the classic trap.",
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">{t("예시 2 — 성분조성으로 강종 구분하기", "Example 2 — telling grades apart by composition")}</p>
            <p>
              {t(
                "SUS304와 SUS316을 나란히 놓으면 성분조성 섹션에서 차이가 바로 드러납니다. 316은 304보다 크롬이 약간 적은 대신 몰리브덴 2~3%가 들어가 있습니다. 이 한 항목 차이가 염화물 환경(바닷물, 염수 분무)에서의 내식성 격차를 만들고, 재료 가격 차이로도 이어집니다. 카탈로그상 물성이 비슷한 강종들을 구분할 때 성분표가 가장 빠른 판별책입니다.",
                "Place SUS304 next to SUS316 and the composition section reveals the difference instantly: 316 trades a touch of chromium for 2–3% molybdenum. That single row drives the chloride-resistance gap — seawater, salt spray — and the price gap too. When datasheet numbers look identical, composition is the fastest fingerprint.",
              )}
            </p>
            <p className="mt-2 text-xs opacity-80">
              * {t("실제 조회 결과의 수치가 위 대표값과 조금씩 다를 수 있습니다. 도구의 값은 데이터베이스 원문 기준입니다.", "Your query results may differ slightly from these representative figures; the tool follows its source database verbatim.")}
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
          <li>{t("열처리 조건을 먼저 확인하세요. 같은 강종이라도 어닐링 상태와 T6 열처리 상태는 항복강도가 몇 배 차이 납니다.", "Check heat treatment first — the same grade can vary several-fold in yield strength between annealed and T6 conditions.")}</li>
          <li>{t("설계에는 범위의 최소보증값을 쓰세요. 평균값으로 설계했다가 하한 재료 로트에서 문제가 생기는 사례가 잦습니다.", "Design to the guaranteed minimum of a range, not the average — mid-range assumptions fail on low-end lots.")}</li>
          <li>{t("단일 물성으로 판단하지 마세요. 해양 환경이면 피로강도·Cl 저항, 고온이면 최대사용온도·열팽창, 전장품이면 전기전도도처럼 용도별 핵심 항목이 다릅니다.", "Never judge on one row. Marine service cares about fatigue and chloride resistance; high temperature about max service temperature and expansion; electrical parts about conductivity.")}</li>
          <li>{t("접촉하는 두 금속은 전위차(갈바닉 부식)도 생각하세요. 칼로멜 전위 항목이 있는 재료는 이 검토의 단서가 됩니다.", "For touching dissimilar metals, mind galvanic potential — the Calomel Potential row hints at this risk.")}</li>
          <li>{t("최종 선정은 밀 시험성적서와 규격 원문으로 확정하고, 중요 부재는 담당 재료엔지니어의 검토를 거치세요. 이 도구는 1차 스크리닝용입니다.", "Finalize selections with mill certificates and standards documents, and route critical members past a materials engineer — this tool is first-pass screening.")}</li>
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
