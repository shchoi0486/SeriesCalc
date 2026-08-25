import type { Metadata } from "next";
import { BlockMath } from "react-katex";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./JeonseDepositCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/jeonse-deposit-calculator", "finance", "jeonse-deposit-calculator");
}

export default function JeonseDepositCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const W = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: W("계산 결과가 생각보다 작게 나오는데, DSR이 왜 이렇게 큰 제약인가요?", "Why does DSR constrain the limit so much?"),
      a: W(
        "이 계산기는 '월 상환 여력 → 대출 원금' 역산을 연 4%·2년 원리금균등 가정으로 수행합니다. 예를 들어 월소득 500만원의 40%(200만원)를 상환에 쓸 수 있다 해도, 24회에 걸쳐 상환할 때 그 월 납부액으로 뒷받침할 수 있는 원금은 약 4,539만원에 불과합니다. 실제 전세대출은 만기일시상환(기간 중 이자만 납부)이 많아 은행 실무 한도는 이보다 커질 수 있지만, 소득 대비 상환능력 검토가 핵심 게이트라는 원리는 동일합니다.",
        "The tool back-calculates principal from monthly repayment capacity assuming 4% over 24 months of equal installments. Even if you can devote 2 million won a month (40% of a 5-million monthly income), 24 payments only support about 45.39 million in principal. Real loans are often bullet-repaid so bank practice can stretch further — but income-based affordability remains the decisive gate either way.",
      ),
    },
    {
      q: W("전세보증금/주택가격 비율이 LTV를 바꾼다는 게 무슨 뜻인가요?", "What does the deposit-to-price ratio changing LTV mean?"),
      a: W(
        "전세보증금이 주택 시세와 가까울수록(갭투자 구간) 임대인 채무 위험이 커지는 대신 보증금 자체가 담보가치의 대부분을 차지합니다. 그래서 비율이 80% 이상이면 LTV를 90%로 올려 실거주 목적의 무주택 세대주가 제대로 된 금액을 빌릴 수 있게 하고, 반대로 보증금이 시세의 60% 미만인 저평가 전세는 80%만 인정합니다. 계산기 기본값(3억/4억 = 75%)에서는 중간 구간인 85%가 적용되어 LTV 한도가 25,500만원이 됩니다.",
        "When the deposit approaches the property's market value (the so-called gap-investment zone), the deposit itself constitutes most of the collateral value, so the ratio at or above 80% unlocks a 90% LTV; deposits below 60% of price get only 80%. The default example (300M deposit / 400M price = 75%) lands mid-band at 85%, giving an LTV limit of 255 million.",
      ),
    },
    {
      q: W("여기서 말하는 DSR/DTI 규제치는 몇 %를 넣어야 하나요?", "What DTI/DSR percentage should I enter?"),
      a: W(
        "금융권 일반 기준은 가계부채 관리 방침상 DSR 40%이며, 기금대출 특례나 무주택 실수요자 우대 등에서 차등이 있습니다. 본인에게 이미 다른 대출(학자금·신용·자동차)이 있다면 그 원리금이 먼저 DSR을 잠식하므로, 남는 한도에 해당하는 실효 %를 입력해야 정확합니다. 예컨대 월소득 500만원에서 다른 대출 원리금으로 50만원을 이미 쓴다면 전세대출에 배정 가능한 월 상환액은 150만원이고, 이는 실효 30%에 해당합니다.",
        "Household debt rules generally anchor DSR at 40%, with exceptions for fund loans and first-home buyers. Existing debts already consume your DSR, though: if 500,000 of a 5-million monthly income goes to other loan payments, only 1.5 million remains for the jeonse loan — effectively 30%. Enter the effective figure for accuracy.",
      ),
    },
    {
      q: W("LTV 한도와 DSR 한도 중 어느 쪽이 적용되나요?", "Which limit actually applies — LTV or DSR?"),
      a: W(
        "둘 중 작은 값이 최종 한도입니다. 기본값 예시에서는 LTV 한도 25,500만원 대비 DSR 한도 4,539만원이 훨씬 작아 소득이 병목입니다. 반대로 연소득 4억처럼 상환 여력이 크면 DSR 한도가 3억을 넘어 LTV 25,500만원이 새로운 천장이 됩니다. 두 값을 모두 확인하고 어느 쪽을 올려야 내 한도가 커지는지 파악하는 것이 이 계산기의 핵심 용법입니다.",
        "Whichever is smaller becomes your cap. In the default example the DSR ceiling (45.39M) dwarfs the LTV ceiling (255M), making income the bottleneck. With high repayment capacity — say 400M annual income — the DSR ceiling rises above three hundred million and LTV takes over as the binding constraint. Seeing which side binds tells you exactly what to change.",
      ),
    },
    {
      q: W("결과 외에 추가로 준비해야 할 돈이 있나요?", "Beyond this limit, what other costs should I plan for?"),
      a: W(
        "있습니다. 이사·입주 시 중개수수료, 전입신고 및 확정일자(공제 증액용), 전세보증금 반환보증(HUG·SGI) 보증료가 발생하며, 대출 실행에는 근저당 설정비와 인지세 등 부대비용이 붙습니다. 보증금의 일부는 통상 본인 자금으로 충당해야 하므로, '최대 한도 = 내가 받을 돈 전액'이 아니라는 점을 감안해 자금 계획을 세우세요.",
        "Yes. Moving costs, brokerage fees, deposit-return insurance premiums (HUG/SGI), mortgage registration charges, and stamp duty all sit on top of the loan itself — and some portion of the deposit usually must come from your own funds. The maximum limit is a ceiling on borrowing, not a promise that borrowing covers everything.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">{W("전세보증금 대출 한도 계산기", "Jeonse Deposit Loan Limit Calculator")}</strong>
          {W(
            " 는 전세자금대출을 받을 때 LTV(담보인정비율)와 DSR(총부채원리금상환비율)이라는 두 개의 서로 다른 자물쇠 중 어느 것이 나를 묶는지 계산해 보여줍니다. 전세보증금·주택가격·연소득·허용 DSR을 입력하면 각 기준별 한도와 그중 작은 값인 최종 한도가 만원 단위로 표시됩니다.",
            " shows which of two very different locks — LTV (loan-to-value) or DSR (debt service ratio) — actually caps your jeonse loan. Enter the deposit, housing price, annual income, and allowed DSR to see each ceiling plus whichever one ends up binding, all in units of 10,000 won.",
          )}
        </p>
        <p>
          {W(
            "전세보증금 대출은 전세보증금의 일정 비율(LTV)까지만 가능하고, 동시에 매달 내는 상환액이 소득의 일정 비율(DSR)을 넘지 않아야 합니다. 집값과 소득 중 무엇이 부족하느냐에 따라 병목이 달라지는데, 이 계산기를 쓰면 '내 경우 한도를 늘리려면 소득 증빙이 필요한가, 아니면 조건이 좋은 집을 찾아야 하는가'가 명확해집니다.",
            "A jeonse loan cannot exceed an LTV share of the deposit, and its repayments cannot exceed a DSR share of your income. Depending on whether your constraint is the property or your salary, the remedy differs — this calculator tells you which lever actually moves your limit.",
          )}
        </p>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            W("전세보증금·주택가격 입력", "Enter deposit and housing price"),
            W("매물의 보증금과 해당 주택의 실거래 시세를 만원 단위로 입력하세요. 두 값의 비율이 LTV 등판(80~90%)을 결정합니다.", "Use the listing's deposit and recent market price, in 10K-won units. Their ratio sets the LTV band (80–90%)."),
          ],
          [
            W("연소득·허용 DSR 입력", "Add income and allowed DSR"),
            W("세전 연소득과 규제 허용치(통상 40%)를 입력합니다. 다른 대출이 있다면 그 원리금만큼 뺀 실효치를 넣으면 더 정확합니다.", "Provide gross annual income and the regulatory allowance (usually 40%). Subtract existing loan payments first for precision."),
          ],
          [
            W("계산 후 세 줄 해석", "Read the three results"),
            W("LTV 한도, DSR 한도, 최종 한도(작은 값) 순으로 표시됩니다. 어느 줄이 최종 한도와 같은지가 곧 병목 지점입니다.", "You will see the LTV ceiling, the DSR ceiling, and their minimum as the final limit. The row equal to the final limit is your bottleneck."),
          ],
          [
            W("한도와 보증금 비교", "Compare against the deposit"),
            W("최종 한도가 보증금보다 작다면 차액은 본인 자금으로 준비해야 합니다. 결과 아래 '(전세보증금 대비 %)' 표시로 커버율을 확인하세요.", "If the final limit falls short of the deposit, fund the gap yourself — the percentage-of-deposit readout below the result shows coverage."),
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
          <p className="font-semibold text-foreground mb-2">{W("예시 1 — 기본값 (소득이 병목)", "Example 1 — Defaults (income binds)")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{W("보증금 30,000만원 · 주택가격 40,000만원 · 연소득 6,000만원 · DSR 40%", "Deposit 30,000 · price 40,000 · income 6,000/year · DSR 40%")}</li>
            <li>{W("보증금/시세 = 75% → LTV 85% 적용 → LTV 한도 = 30,000 × 0.85 = 25,500만원", "Deposit/price = 75% → 85% band → LTV ceiling = 25,500")}</li>
            <li>{W("월상환 여력 = (6,000 ÷ 12) × 40% = 200만원 → 연 4% · 24회 역산 → DSR 한도 ≈ 4,539만원", "Monthly capacity = (6,000 ÷ 12) × 40% = 200 → back-solved at 4%/24 months → DSR ceiling ≈ 4,539")}</li>
            <li><strong className="text-foreground">{W("최대 대출한도 = 4,539만원 — DSR이 제약", "Maximum loan = 4,539 — the DSR side binds")}</strong></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{W("예시 2 — 고소득 (LTV가 병목으로 교체)", "Example 2 — High earner (LTV takes over)")}</p>
          <p>
            {W(
              "같은 집에서 연소득만 40,000만원으로 올리면 월상환 여력이 1,333만원으로 늘어나 DSR 한도가 약 30,261만원으로 재계산됩니다. 이제 DSR은 여유가 생겼고 min(25,500, 30,261)에 따라 최종 한도가 25,500만원으로 바뀝니다. 소득을 더 올려도 한도가 오르지 않는 지점이 바로 LTV 천장이며, 이 시점부터는 조건이 좋은(보증금 비율이 높은) 매물을 찾는 것이 유일한 방법입니다.",
              "Raise income alone to 40,000 and monthly capacity grows to ~1,333, pushing the DSR ceiling to roughly 30,261. Now min(25,500, 30,261) makes the final limit 25,500. Further raises do nothing — that is the LTV wall, and beyond it only better-priced listings move the needle.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <h4 className="font-semibold text-foreground">{W("LTV 기준", "LTV Basis")}</h4>
        <div className="overflow-x-auto p-4 bg-card border border-border rounded-lg text-sm">
          {isKo ? <BlockMath math="\text{LTV 한도} = \text{전세보증금} \times \text{LTV 비율}" /> : <BlockMath math="\text{LTV Limit} = \text{Jeonse Deposit} \times \text{LTV Rate}" />}
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li>{W("전세보증금/주택가격 80% 이상 → LTV 90%", "Deposit/Housing Price ≥ 80% → LTV 90%")}</li>
          <li>{W("전세보증금/주택가격 60~80% → LTV 85%", "Deposit/Housing Price 60~80% → LTV 85%")}</li>
          <li>{W("전세보증금/주택가격 60% 미만 → LTV 80%", "Deposit/Housing Price < 60% → LTV 80%")}</li>
        </ul>
        <h4 className="font-semibold text-foreground mt-4">{W("DSR 기준", "DSR Basis")}</h4>
        <div className="overflow-x-auto p-4 bg-card border border-border rounded-lg text-sm">
          {isKo ? <BlockMath math="\text{최대 월 상환액} = \dfrac{\text{연소득}}{12} \times \text{DSR\%}" /> : <BlockMath math="\text{Max Monthly Payment} = \dfrac{\text{Annual Income}}{12} \times \text{DSR\%}" />}
        </div>
        <p className="mt-2">
          {W(
            "월 상환 여력을 원금으로 되돌리는 데는 연금현재가치 공식이 쓰입니다: P = PMT × ((1+r)^n − 1)/(r(1+r)^n). 이 계산기는 연 4%·24개월 가정을 사용합니다.",
            "Converting monthly capacity back into principal uses the annuity present-value formula: P = PMT × ((1+r)^n − 1)/(r(1+r)^n), here with a 4%/24-month assumption.",
          )}
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">1</span>
          <div>
            <p className="font-semibold text-foreground">{W("전세보증금 vs 주택가격 비율", "Deposit-to-Housing Price Ratio")}</p>
            <p className="mt-1">{W("전세보증금이 주택가격의 높은 비율을 차지할수록 LTV가 올라가 대출한도가 높아집니다.", "Higher deposit ratios relative to housing price raise the LTV band and the resulting limit.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">2</span>
          <div>
            <p className="font-semibold text-foreground">{W("버팀목 전세자금대출", "Boteumjeom Jeonse Loan")}</p>
            <p className="mt-1">{W("버팀목 대출은 연소득 5천만원 이하, 전세보증금 2억 이하 조건으로 저금리(1.5~2.1%) 대출이 가능합니다. 요건이 된다면 우선 검토하세요.", "Boteumjeom offers 1.5–2.1% rates for households earning under 50M with deposits under 200M — check eligibility first.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">3</span>
          <div>
            <p className="font-semibold text-foreground">{W("보증보험 가입", "Deposit Insurance")}</p>
            <p className="mt-1">{W("전세보증금 반환보증보험(HUG, SGI)에 가입하면 임대인의 보증금 미반환 위험을 줄일 수 있으며, 보증부 대출의 전제 조건이 되기도 합니다.", "Deposit-return insurance (HUG, SGI) guards against landlord default and often underpins guaranteed loans.")}</p>
          </div>
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
