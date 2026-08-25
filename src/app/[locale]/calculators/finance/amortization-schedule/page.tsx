import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./AmortizationScheduleClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/amortization-schedule", "finance", "amortization-schedule");
}

export default function AmortizationSchedulePage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const W = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: W("원리금균등과 원금균등 중 어떤 게 유리한가요?", "Which is better — equal installment or equal principal?"),
      a: W(
        "총 이자만 보면 원금균등이 항상 유리합니다. 아래 예시에서 볼 수 있듯 1억 원을 연 5%, 10년 조건으로 빌릴 때 원리금균등의 총이자는 약 2,728만 원인 반면 원금균등은 약 2,521만 원으로 약 207만 원 차이가 납니다. 다만 원금균등은 초기 납부액이 125만 원으로 훨씬 무겁습니다. '매달 부담 안정성'을 원하면 원리금균등, '총비용 최소화'가 우선이고 초기 현금흐름에 여유가 있다면 원금균등을 선택하는 것이 기준입니다.",
        "Equal principal always wins on total interest. In the worked example below, borrowing 100 million at 5% for 10 years costs about 27.3 million in interest with equal installments versus about 25.2 million with equal principal — roughly 2 million saved. The catch is that early equal-principal payments are much heavier (~1.25 million vs ~1.06 million). Choose equal installment for payment stability, equal principal if cash flow allows the heavier start.",
      ),
    },
    {
      q: W("매월 같은 금액을 내는데 왜 이자와 원금 비율은 매달 다르죠?", "If my payment is fixed, why do interest and principal portions change each month?"),
      a: W(
        "이자는 항상 '남아 있는 잔액 × 월 이자율'로 계산되기 때문입니다. 첫 달에는 잔액이 1억 원 전체라 이자가 416,667원이지만, 갚을수록 잔액이 줄어 이자도 함께 줄어듭니다. 납부액이 고정된 상태에서 이자 부분이 작아진 만큼 원금 상환분이 커지는 구조라, 시간이 지날수록 같은 납부액 중 더 많은 몫이 원금을 깎습니다.",
        "Interest is always computed on the remaining balance: balance × monthly rate. In month one the full principal is outstanding so interest is highest; as the balance shrinks, the interest portion shrinks too. Since your payment stays constant, whatever interest no longer consumes flows straight to principal — later payments attack the debt faster.",
      ),
    },
    {
      q: W("중도상환은 언제 하는 것이 가장 유리한가요?", "When is the best time to prepay?"),
      a: W(
        "대출 초기일수록 유리합니다. 원리금균등 방식은 초반에 이자 비중이 크게 짜여 있어, 같은 금액이라도 1~2년 차에 상환하면 줄어드는 총이자가 후반부 상환보다 훨씬 큽니다. 예를 들어 위 조건에서 5년 차까지는 이미 이자를 60% 가까이 내고 있습니다. 다만 중도상환수수료 부과 기간(통상 3년)과 개인 신용 여력을 먼저 확인하고, 비상금 확보 후 남는 자금으로 실행하세요.",
        "The earlier the better. Because equal-installment schedules front-load interest, the same prepayment amount early in the loan eliminates far more future interest than late. On the terms above you will already have paid close to 60% of all interest by year five. Still, check any prepayment penalty window (often three years) and keep an emergency fund first.",
      ),
    },
    {
      q: W("계산된 스케줄과 은행에서 받은 내역이 다른데 왜죠?", "Why does my bank's statement differ from this schedule?"),
      a: W(
        "이 계산기는 금리 고정·중도상환 없음·수수료 없음이라는 순수 모델을 가정합니다. 실제 대출은 변동금리 재조정, 중도상환, 연체 이자, 담보 관련 비용 등으로 스케줄이 바뀝니다. 특히 변동금리 대출은 금리 인상기에 월 납부액 자체가 재산정되므로, 계산 결과는 '현재 금리가 유지된다면'의 기준선으로 활용하세요.",
        "This calculator models a pure scenario: fixed rate, no prepayments, no fees. Real loans shift with rate resets, extra payments, penalty charges, and collateral costs. Variable-rate loans in particular get their payments recalculated when rates move — treat this schedule as the baseline of what happens if today's rate held to maturity.",
      ),
    },
    {
      q: W("결과의 '이자비율'은 무엇을 의미하나요?", "What does the interest ratio mean?"),
      a: W(
        "총 납부액 중 이자가 차지하는 비중입니다. 위 예시에서 원리금균등의 이자비율은 약 21.4%(총 납부 1억 2,728만 원 중 이자 2,728만 원)로 나타납니다. 같은 금리라도 기간이 길수록 이 비율이 커집니다. 10년이면 21%대지만 30년 대출에서는 총 납부액의 절반 가까이가 이자가 되기도 하므로, 기간 선택 시 이 지표를 꼭 확인하세요.",
        "It is the share of everything you pay that goes to interest. In the example above, about 21.4% of the 127.3 million total is interest. The same rate stretched over a longer term pushes this ratio up dramatically — on a 30-year loan nearly half of all money paid can be interest — which is why this metric deserves a look before extending a term.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">{W("상환 스케줄 계산기", "Amortization Schedule Calculator")}</strong>
          {W(
            " 는 대출금액·연이자율·기간·상환방식을 입력하면 월별 납부액뿐 아니라 그중 원금이 얼마인지, 이자가 얼마인지, 매월 잔액이 어떻게 줄어드는지까지 한 달 단위로 보여줍니다.",
            " takes the loan amount, annual rate, term, and repayment method and shows month by month how much of each payment is principal, how much is interest, and what balance remains after every single payment.",
          )}
        </p>
        <p>
          {W(
            "월 납부액만 알려주는 일반 대출 계산기와 달리, 상환 스케줄은 '내돈이 어디로 가는가'를 드러냅니다. 대출 초반에는 납부액의 상당 부분이 이자로 빠져나가고 후반이 되어야 원금 상환 속도가 붙는데, 이 구조를 눈으로 확인하면 중도상환 타이밍이나 상환방식 선택 판단이 훨씬 명확해집니다.",
            "Unlike calculators that only quote a monthly figure, an amortization schedule reveals where your money actually goes. Early payments are heavily weighted toward interest, and only in later years does principal reduction accelerate — seeing that structure makes decisions like when to prepay or which repayment method to choose far clearer.",
          )}
        </p>
        <p>
          {W(
            "원리금균등 방식은 매월 동일한 금액을 납부하고, 원금균등 방식은 매월 동일한 원금에 잔액 기준 이자를 더합니다. 두 방식의 결과를 나란히 비교해 보면 총이자와 초기 부담 사이의 상충관계가 바로 드러납니다.",
            "Equal Installment (PMT) pays one fixed amount every month; Equal Principal repays a constant slice of principal plus interest on the shrinking remainder. Comparing both side by side exposes the trade-off between total interest and initial burden.",
          )}
        </p>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            W("대출 조건 입력", "Enter the loan terms"),
            W("대출금액, 연이자율(%), 기간(년)을 입력합니다. 기본값은 1억 원 · 연 5% · 10년입니다.", "Fill in the amount, annual rate (%), and term in years. Defaults are 100 million at 5% for 10 years."),
          ],
          [
            W("상환방식 선택", "Choose the repayment method"),
            W("원리금균등 또는 원금균등을 고릅니다. 두 방식을 번갈아 선택해 결과 차이를 비교해 보세요.", "Pick Equal Installment or Equal Principal — switching back and forth shows exactly how the two methods differ."),
          ],
          [
            W("계산 후 요약 확인", "Calculate and read the summary"),
            W("첫 달 납부액, 총 이자, 총 상환액, 이자비율이 요약 카드에 표시됩니다.", "The summary card shows first-month payment, total interest, total paid, and the interest share."),
          ],
          [
            W("월별 표 해석", "Read the monthly table"),
            W("아래 월별 상환 스케줄 표에서 납부액·원금·이자·잔액 열을 추적해 보세요. 이자 열이 매달 줄고 원금 열이 커지는 지점이 바로 이 계산의 핵심입니다.", "In the monthly schedule below, trace the Payment / Principal / Interest / Balance columns. Interest shrinking while principal grows month over month is the whole story."),
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
          <p className="font-semibold text-foreground mb-2">{W("예시 — 1억 원 · 연 5% · 10년", "Example — 100 million at 5% for 10 years")}</p>
          <p>
            {W(
              "기본값 조건(1억 원, 연 5%, 120회 납입)으로 계산해 보겠습니다. 월 이자율은 5% ÷ 12 ≈ 0.4167%입니다. 원리금균등 방식이라면:",
              "Using the default conditions (100 million, 5% annually, 120 payments), the monthly rate is 5% ÷ 12 ≈ 0.4167%. Under Equal Installment:",
            )}
          </p>
          <div className="overflow-x-auto p-4 my-3 bg-card border border-border rounded-lg text-sm">
            <BlockMath math="M = 100{,}000{,}000 \times \dfrac{0.004167 \times (1.004167)^{120}}{(1.004167)^{120} - 1} \approx 1{,}060{,}655" />
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>{W("매달 내는 돈: 약 1,060,655원 (10년간 동일)", "Monthly payment: about 1,060,655, identical for all 120 months")}</li>
            <li>{W("첫 달 분해: 이자 416,667원 + 원금 643,988원", "Month 1 split: 416,667 interest + 643,988 principal")}</li>
            <li>{W("총 납부액 약 1억 2,729만 원 → 총이자 약 2,729만 원 (이자비율 약 21.4%)", "Total paid ≈ 127.29 million → total interest ≈ 27.29 million (about 21.4%)")}</li>
          </ul>
          <p className="mt-3">
            {W(
              "같은 조건을 원금균등으로 바꾸면 매월 원금은 833,333원으로 고정됩니다. 첫 달 납부액은 이자 416,667원을 더한 1,250,000원이지만, 마지막 달에는 이자가 약 3,472원으로 줄어 약 836,806원만 내면 됩니다. 총이자는 정확히 25,208,333원으로, 원리금균등보다 약 207만 원 적습니다. 대신 초기 19만 원가량의 월 부담 차이를 감당할 수 있어야 합니다.",
              "Switching the same loan to Equal Principal fixes the principal slice at 833,333 per month. Month one costs 1,250,000 (833,333 + 416,667 interest), but by the final month interest has fallen to about 3,472, so the payment drops to roughly 836,806. Total interest comes to exactly 25,208,333 — about 2 million less than PMT — provided the heavier early payments fit your budget.",
            )}
          </p>
        </div>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <h4 className="font-semibold text-foreground">{W("원리금균등 (PMT 공식)", "Equal Installment (PMT Formula)")}</h4>
        <BlockMath math="M = P \times \dfrac{r(1+r)^n}{(1+r)^n - 1}" />
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-foreground">M</strong> = {W("월 납부액", "Monthly payment")}</li>
          <li><strong className="text-foreground">P</strong> = {W("대출 원금", "Loan principal")}</li>
          <li><strong className="text-foreground">r</strong> = {W("월 이자율 (연이자율/12)", "Monthly interest rate (annual/12)")}</li>
          <li><strong className="text-foreground">n</strong> = {W("총 납부 횟수 (기간 × 12)", "Total number of payments (term × 12)")}</li>
        </ul>
        <h4 className="font-semibold text-foreground mt-4">{W("원금균등", "Equal Principal")}</h4>
        <BlockMath math={isKo ? "\\text{매월 원금} = \\dfrac{\\text{대출금}}{\\text{총 납부 횟수}}" : "\\text{Monthly Principal} = \\dfrac{\\text{Loan Amount}}{\\text{Total Payments}}"} />
        <p>{W("이자 = 잔액 × 월 이자율, 매월 원금이 동일하고 이자가 줄어듭니다.", "Interest = Balance × Monthly rate. Principal is equal each month while interest decreases.")}</p>
        <p className="pt-1">
          {W(
            "두 방식 모두 매달 이자는 '직전 잔액 × r'로 먼저 계산되고, 남은 몫이 원금으로 배정됩니다(원리금균등) 또는 원금을 먼저 빼고 이자를 더합니다(원금균등). 계산 순서의 이 차이가 10년 뒤 총이자 200만 원 이상의 격차를 만듭니다.",
            "In both methods interest accrues first on the prior balance; under PMT the rest of the fixed payment goes to principal, under Equal Principal the principal slice is deducted first and interest added on top. That ordering difference alone compounds into millions over a decade.",
          )}
        </p>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">1</span>
          <div>
            <p className="font-semibold text-foreground">{W("원리금균등 vs 원금균등", "PMT vs Equal Principal")}</p>
            <p className="mt-1">{W("원리금균등은 초기 부담이 적고 일정하지만, 원금균등은 총 이자가 적습니다. 예시처럼 같은 조건에서도 200만 원 이상 차이가 날 수 있습니다.", "PMT keeps early payments manageable; Equal Principal minimizes total interest. On identical terms the gap can exceed two million won.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">2</span>
          <div>
            <p className="font-semibold text-foreground">{W("중도상환 수수료", "Prepayment Fees")}</p>
            <p className="mt-1">{W("스케줄은 예상치이며, 중도상환 시 수수료가 발생할 수 있습니다. 통상 3년 이내 상환 시 잔여 원금의 1~1.5% 수준이므로 상환 전 금융기관에 확인하세요.", "Schedules are estimates; early repayment may trigger penalties — typically 1–1.5% of remaining principal within the first three years. Confirm with your lender.")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">3</span>
          <div>
            <p className="font-semibold text-foreground">{W("이자율 변동", "Rate Changes")}</p>
            <p className="mt-1">{W("변동금리 대출은 금리 변동에 따라 스케줄 전체가 다시 그려집니다. 금리가 1%p 오르면 월 납부액과 총이자가 얼마나 늘어나는지 이 계산기로 미리 시뮬레이션해 두세요.", "Variable-rate loans redraw the entire schedule whenever the benchmark moves. Simulate a +1 percentage-point shock here before it happens.")}</p>
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
