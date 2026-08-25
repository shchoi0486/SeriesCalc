import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./DsrCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/dsr-calculator", "finance", "dsr-calculator");
}

export default function DsrCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const W = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: W("DSR과 DTI의 실질적 차이는 무엇인가요?", "What is the practical difference between DSR and DTI?"),
      a: W(
        "DTI(총부채상환비율)는 주택담보대출 원리금에 다른 대출은 '이자만' 더하는 구식 지표이고, DSR은 모든 대출의 원리금 전체를 잡습니다. 예컨대 월 50만원씩 갚는 학자금 대출이 있다면 DTI 계산에는 그 이자 몇만 원만 반영되지만 DSR 계산에는 50만원 전체가 들어갑니다. 그래서 같은 사람의 DTI는 30%인데 DSR은 42%로 규제선을 넘는 일이 생기고, 현재 은행 심사는 DSR을 기준으로 합니다.",
        "DTI counts mortgage principal-and-interest plus only the interest on other debts — an older, narrower gauge. DSR captures full principal and interest of every loan. A student loan costing 500,000 a month barely registers under DTI but counts fully under DSR. That is why someone can show 30% DTI yet breach the line at 42% DSR — and banks now judge by DSR.",
      ),
    },
    {
      q: W("계산 결과가 '위험' 구간이면 대출이 아예 안 되나요?", "If my result shows 'Risk', can I not borrow at all?"),
      a: W(
        "꼭 그렇지는 않습니다. 총대출 1억원 이하 차주에게는 예외·완화 규정이 적용되는 경우가 있고(1억원 이하 신규 대출 시 DSR 산제외 등 상품별 상이), 비은행권은 규제 강도가 다릅니다. 다만 '빌릴 수 있으니 괜찮다'와 '감당할 수 있다'는 별개 문제입니다. 위험 구간이라면 금융기관 승인 여부보다 먼저 금리 인상 시 월 현금흐름이 버티는지를 점검하세요. 스트레스 DSR 개념처럼 금리 +1%p를 가정해 보는 것이 좋습니다.",
        "Not necessarily. Borrowers with total debt under one hundred million may fall under exceptions or lighter rules depending on product and lender type. But being able to borrow is different from being able to afford it. In the risk zone, test whether your cash flow survives a rate hike before worrying about approval — stress-test at +1 percentage point.",
      ),
    },
    {
      q: W("DSR을 낮추려면 무엇부터 해야 하나요?", "What should I do first to lower my DSR?"),
      a: W(
        "효과 순서는 다음과 같습니다. ① 고금리 소액 대출부터 상환해 기타 월 상환액을 없애기 ② 남은 대출의 만기를 연장해 월 납부액 자체를 낮추기(단, 총이자는 늘어남) ③ 대환대출로 금리를 낮춰 이자분 축소. 반대로 소득 인정 범위도 넓힐 수 있습니다. 연소득에는 상여금·부업소득 중 증빙 가능한 항목이 포함될 수 있으므로, 급여통장 하나로만 계산하지 말고 금융사와 소득 인정 범위를 상담해 보세요.",
        "In order of impact: pay off small high-rate loans to delete whole monthly payments; extend remaining terms to lower each payment (accepting more lifetime interest); refinance rates down. On the other side of the fraction, certified income matters too — bonuses and documented side income can count, so discuss income recognition with your bank rather than assuming salary alone.",
      ),
    },
    {
      q: W("스트레스 DSR 때문에 실제보다 한도가 덜 나오는데 정상인가요?", "Stress DSR reduces my limit below what this shows — is that normal?"),
      a: W(
        "정상입니다. 가계대출 심사에는 변동금리 대출에 가산금리(연 0.6~1.75%p, 주택담보대출 기준 단계별 적용)를 얹어 미래 금리 인상 가능성을 미리 반영합니다. 이 계산기는 현재 금리 기준의 DSR을 보여주므로, 실제 은행 한도는 여기서 나온 값보다 작게 나올 수 있습니다. 특히 만기일시상환 구조의 신용·전세대출은 스트레스 DSR에서 원리금균등 환산으로 잡히며 한도가 크게 줄어드는 요인이 됩니다.",
        "Yes. Lenders layer an add-on rate (roughly 0.6–1.75 percentage points for variable-rate mortgages, tiered by product) onto future-looking assessments. This calculator shows today's-rate DSR, so real bank limits can come out smaller. Bullet-repayment loans in particular get converted into amortizing equivalents under stress rules, shrinking limits substantially.",
      ),
    },
    {
      q: W("월 원금과 월 이자를 따로 입력하는 이유가 있나요?", "Why enter principal and interest separately?"),
      a: W(
        "두 입력란은 사실 DSR 계산에서는 합쳐져 동일하게 처리됩니다(원리금 = 원금 + 이자). 분리해 둔 것은 대출 명세서에서 두 항목이 따로 표시되는 실무 편의 때문입니다. 만기일시상환 대출이라면 매달 내는 돈이 전부 이자이므로 원금 0, 이자에 해당 월 이자액을 넣으면 됩니다.",
        "For the DSR arithmetic itself they are simply summed — principal plus interest equals your payment. The separation mirrors how loan statements list them. For bullet-repayment loans where you pay interest only, put zero in principal and the monthly interest amount in its field.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">{isKo ? 'DSR(총부채원리금상환비율)' : 'DSR (Debt Service Ratio)'} </strong>
          {isKo
            ? '은 본인의 연 소득 대비 매년 갚아야 할 모든 대출의 원리금이 차지하는 비율을 말합니다. 쉽게 말해 소득에서 대출 상환에 쓰는 비중을 나타내는 지표입니다.'
            : ' is the ratio of all annual loan principal and interest repayments to your annual income. It indicates what portion of your income goes toward loan repayment.'}
        </p>
        <p>
          {isKo
            ? '금융위원회에서는 DSR 40% 규제를 시행하여, 총대출 1억원을 초과하는 모든 가계대출에 대해 DSR이 40%를 넘으면 대출을 제한하고 있습니다.'
            : 'The Financial Services Commission enforces a 40% DSR regulation, restricting loans when DSR exceeds 40% for all household loans exceeding 100 million won.'}
        </p>
        <p>
          {isKo
            ? '2018년 주택담보대출에 먼저 도입되었고, 2022년 1월부터 전체 가계대출(신용대출, 전세자금대출, 자동차대출 등)로 확대 적용되었습니다. 2024년 현재 총대출 1억원 이상인 모든 차입자에게 적용됩니다.'
            : 'Introduced for mortgages in 2018, expanded to all household loans (credit, jeonse, auto, etc.) from January 2022. As of 2024, it applies to all borrowers with total loans exceeding 100 million won.'}
        </p>
        <div className="mt-3 p-3 bg-muted rounded-lg">
          <p className="font-semibold text-foreground mb-1">{isKo ? 'DSR 40% 규제 요약' : 'DSR 40% Regulation Summary'}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{isKo ? '총대출 1억원 초과 시 전체 가계대출에 DSR 40% 적용' : 'Applies to all household loans when total loans exceed 100M won'}</li>
            <li>{isKo ? '2018년: 주택담보대출에 먼저 도입' : '2018: Initially introduced for mortgages'}</li>
            <li>{isKo ? '2022년 1월: 전체 가계대출로 확대' : '2022 Jan: Expanded to all household loans'}</li>
            <li>{isKo ? '2024년: 총대출 1억원 이상 모든 차입자에게 적용' : '2024: Applies to all borrowers with total loans over 100M won'}</li>
            <li>{isKo ? 'DSR 40% 이하여야 정상 대출 가능' : 'Must be under 40% DSR for normal loan approval'}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            W("연소득 입력", "Enter annual income"),
            W("세전 연소득을 만원 단위로 입력합니다. 계산기가 자동으로 월소득으로 나눠 처리합니다.", "Gross annual income in 10K-won units — the tool divides by twelve internally."),
          ],
          [
            W("모든 대출의 월 상환액 합산", "List every loan payment"),
            W("주담대·전세대출·학자금·차량·신용대출 등 매달 나가는 원리금을 모두 더해 각 입력란에 배분하세요. 카드 할인수수료나 리스료는 DSR 산정 대상이 아닙니다.", "Sum the principal-and-interest of mortgage, jeonse, student, auto, and credit loans. Card installments and leases fall outside DSR."),
          ],
          [
            W("계산 후 등급 확인", "Calculate and read the grade"),
            W("결과는 30% 미만 양호(초록), 30~40% 주의(노랑), 40% 초과 위험(빨강)으로 색상 표시됩니다.", "Below 30% shows green (good), 30–40% yellow (caution), above 40% red (risk)."),
          ],
          [
            W("시나리오 비교", "Compare scenarios"),
            W("새 대출을 받기 전에 그 월 상환액을 기타 상환액에 더해 다시 계산해 보세요. 승인 가능성과 내 현금흐름의 여유가 동시에 보입니다.", "Before a new loan, add its payment to the 'other' field and recalculate — approval odds and cash-flow slack appear at once."),
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
        <p>
          {W(
            "월소득 500만원(연 6,000만원) 직장인이 대출을 하나씩 추가할 때마다 DSR이 어떻게 움직이는지 추적해 보겠습니다.",
            "Follow a salaried worker earning 5 million won monthly (60 million yearly) as each new loan moves the needle:",
          )}
        </p>
        {[
          {
            title: W("① 시작 — 주택담보대출만 있는 경우", "Step 1 — mortgage only"),
            body: W(
              "월 원금 80만원 + 이자 40만원 + 기타(자동차) 20만원 = 총 140만원. DSR = 140 ÷ 500 × 100 = 28.00% → 양호(초록).",
              "80 principal + 40 interest + 20 auto = 140 total. DSR = 140 ÷ 500 × 100 = 28.00% → Good (green).",
            ),
          },
          {
            title: W("② 전세자금대출 추가", "Step 2 — add a jeonse loan"),
            body: W(
              "월 50만원씩 내는 전세대출이 추가되면 총 상환액은 190만원. DSR = 190 ÷ 500 × 100 = 38.00% → 주의(노랑). 아직 규제선 안쪽이지만 여유는 얇아졌습니다.",
              "Adding a jeonse loan costing 50 brings the total to 190. DSR = 38.00% → Caution (yellow): inside the cap, but the margin is thin.",
            ),
          },
          {
            title: W("③ 신용대출까지 추가", "Step 3 — add a credit loan"),
            body: W(
              "월 30만원짜리 신용대출까지 받으면 총 220만원. DSR = 220 ÷ 500 × 100 = 44.00% → 위험(빨강). 규제선 40%를 넘어 은행권 신규 대출이 사실상 막히고, 금리 인상 시 연체 위험 구간에 진입합니다.",
              "A final credit loan of 30 lands at 220. DSR = 44.00% → Risk (red): past the 40% line, bank lending effectively closed, and any rate hike pushes toward delinquency territory.",
            ),
          },
        ].map((s, i) => (
          <div key={i}>
            <p className="font-semibold text-foreground mb-1">{s.title}</p>
            <p>{s.body}</p>
          </div>
        ))}
        <p>
          {W(
            "같은 예시를 역으로 쓰면 한도 계산도 됩니다. DSR 40% 허용 시 최대 월 상환액은 500 × 0.4 = 200만원이고, 현재 220만원이므로 20만원분을 줄여야 규제 안으로 돌아옵니다.",
            "Read backwards it becomes a limit check: at 40% DSR the maximum monthly service is 200, so being at 220 means trimming 20 to re-enter compliance.",
          )}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <BlockMath math={isKo ? "\\text{DSR} = \\dfrac{\\text{월 원금} + \\text{월 이자} + \\text{기타 대출 월 상환}}{\\text{연소득}/12} \\times 100" : "\\text{DSR} = \\dfrac{\\text{Monthly Principal} + \\text{Monthly Interest} + \\text{Other Loan Monthly}}{\\text{Annual Income}/12} \\times 100"} />
        <p className="mt-3">
          {isKo
            ? '예시: 연소득 5,000만원, 월 원금 150만원, 월 이자 100만원, 기타 대출 50만원인 경우'
            : 'Example: Annual income 50M won, monthly principal 1.5M, monthly interest 1M, other loan 500K'}
        </p>
        <div className="font-mono p-3 bg-muted rounded-lg text-xs">
          {isKo
            ? 'DSR = (150 + 100 + 50) / (5000 / 12) × 100 = 300 / 416.67 × 100 = 72%'
            : 'DSR = (1.5 + 1.0 + 0.5) / (50 / 12) × 100 = 3.0 / 4.17 × 100 = 72%'}
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">1</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? 'DSR 줄이기 방법' : 'How to Reduce DSR'}</p>
            <p className="mt-1">{isKo ? '대출 기간을 연장하면 월 상환액이 줄어들어 DSR이 낮아집니다. 또한 기존 대출을 상환하면 DSR에 포함되지 않습니다.' : 'Extending loan term reduces monthly payments and lowers DSR. Repaying existing loans removes them from DSR calculation.'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">2</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? 'DSR vs DTI 차이' : 'DSR vs DTI Difference'}</p>
            <p className="mt-1">{isKo ? 'DTI는 주택담보대출 원리금 + 기타 부채 이자만 포함하지만, DSR은 모든 대출의 원리금 상환액을 포함합니다. DSR이 더 포괄적입니다.' : 'DTI includes only mortgage P&I plus other debt interest, while DSR includes all loan principal & interest repayments. DSR is more comprehensive.'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">3</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? '스트레스 DSR' : 'Stress DSR'}</p>
            <p className="mt-1">{isKo ? '실제 금리에 가산금리(보통 0.6~1.0%)를 더해 산정하므로, 실제 DSR보다 높게 나올 수 있습니다. 금리 인상 가능성을 반영한 것입니다.' : 'A surcharge rate (typically 0.6~1.0%) is added to the actual rate, so stress DSR may be higher than actual DSR. This reflects potential rate increases.'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">4</span>
          <div>
            <p className="font-semibold text-foreground">{isKo ? 'DSR 기준 대출 한도' : 'DSR-Based Loan Limit'}</p>
            <p className="mt-1">{isKo ? 'DSR 40% 기준으로 계산하면: 최대 월 상환액 = (연소득/12) × 0.4. 이를 현재 대출 상환액에서 빼면 추가 대출 가능한 금액을 알 수 있습니다.' : 'Based on 40% DSR: Max monthly payment = (Annual Income/12) × 0.4. Subtract current loan payments to find additional borrowing capacity.'}</p>
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
