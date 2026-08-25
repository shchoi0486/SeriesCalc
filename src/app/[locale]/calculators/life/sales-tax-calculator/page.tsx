
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import FaqItem from "@/components/calculators/FaqItem";
import CalculatorClient from "./SalesTaxCalculatorClient";
import { BlockMath } from "react-katex";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/sales-tax-calculator", "life", "sales-tax-calculator");
}



export default function SalesTaxCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const faqs: { q: string; a: string }[] = [
    {
      q: L("합계금액에서 공급가액을 구할 때 왜 원래대로 돌아가지 않나요?", "Why doesn't supply → total → supply return to the original?"),
      a: L(
        "합계에서 공급가액을 역산할 때 ÷1.10 연산에서 소수점이 발생하고, 반올림 과정에서 1원 오차가 생길 수 있습니다. 예: 공급가액 10,001원 → 부가세 1,000.1원 → 합계 11,001원(반올림). 이 합계에서 역산하면 11,001 ÷ 1.10 = 10,000.9원 → 10,001원이 됩니다. 다만 모든 경우에 such 귀환을 보장하지는 않으므로, 중요한 장부 기장에서는 원래 공급가액 기준으로 검증하세요.",
        "Division by 1.10 produces fractional won that round, causing 1-won discrepancies on round-trip. E.g., supply ₩10,001 → VAT ₩1,000 → total ₩11,001; reverse: ₩11,001 ÷ 1.10 ≈ ₩10,001. Not all cases return exactly — verify critical bookkeeping against the original supply figure.",
      ),
    },
    {
      q: L("간이과세자의 부가세율은 어떻게 다른가요?", "How do simplified-taxpayer VAT rates differ?"),
      a: L(
        "간이과세자(연 매출 8,000만원 미만)는 세율이 5%(일반 간이과세) 또는 1.5%(소규모 간이과세, 연 매출 4,800만원 미만)로 일반 사업자(10%)보다 낮습니다. 다만 간이과세자는 매입세액공제를 받을 수 없는 경우가 많으므로, 실제 부담하는 세율은 단순 비교가 어렵습니다. 이 계산기는 일반세율(10%) 기준이므로, 간이과세자라면 직접 해당 세율을 적용해야 합니다.",
        "Simplified taxpayers (annual sales < ₩80M) pay 5% or 1.5% (under ₩48M) instead of 10%, but input tax credits are often unavailable. This calculator uses the standard 10% rate; simplified taxpayers must apply their own rate manually.",
      ),
    },
    {
      q: L("부가세가 면제되는 거래가 있나요?", "Are there VAT-exempt transactions?"),
      a: L(
        "부가가치세법 제26조에 따라 의료·교육·금융·보험·부동산 임대 등 일정 서비스는 면세입니다. 또한 수출은 영세율(0%)이 적용되어 매출세액이 0이 되지만, 매입세액공제는 가능합니다. 면세 거래의 경우 이 계산기 결과와 실적이 다르므로, 면세 여부를 먼저 확인하세요.",
        "Medical, educational, financial, insurance, and real-estate rental services are exempt under VAT Act Article 26. Exports are zero-rated (0%), allowing input tax credits. This calculator does not account for exemptions or zero-rating — verify exemption status first.",
      ),
    },
    {
      q: L("카드결제 할인과 부가세는 어떻게 적용되나요?", "How do card-payment discounts interact with VAT?"),
      a: L(
        "카드사 프로모션(예: 카드사 10% 할인)은 통상 가맹점 대금에서 카드사가 할인분을 부담하므로, 사업자의 매출세액에는 영향을 주지 않습니다. 즉 고객이 카드 할인을 받아 실제 지불액이 줄어도, 사업자의 부가세 신고는 원래 공급가액 기준으로 합니다. 다만 '가맹점 부담 할인'은 매출이 줄어 부가세에도 영향이 있으니 구분이 중요합니다.",
        "Card-issuer promotions reduce the customer's payment but the merchant's VAT declaration remains based on the original supply amount. Merchant-borne discounts, however, reduce reported sales and thus VAT — distinguishing the two is critical.",
      ),
    },
    {
      q: L("세금계산서 발급 기준 금액은?", "What is the threshold for issuing a tax invoice?"),
      a: L(
        "사업자간 거래(B2B)에서는 공급가액 100원 이상이면 세금계산서 발급 의무가 있습니다. 개인 소비자 대상(B2C)에서는 현금영수증 발급 대상(연 500만원 이상 현금 거래 등)과 별개로, 사업자가 요청하면 세금계산서를 발급해야 합니다. 적격증빙 없이 지출한 비용은 매입세액공제를 받을 수 없으므로 주의하세요.",
        "B2B: tax invoices are mandatory for transactions of ₩100 or more. B2C: cash receipts are required for cash transactions ≥ ₩5M annually; otherwise tax invoices are issued on request. Expenses without qualifying evidence cannot claim input tax credits.",
      ),
    },
  ];

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4 leading-relaxed">
        <p>
          {L(
            '부가가치세(VAT) 포함 가격 계산기는 한국의 부가세(10%)를 기준으로 공급가액, 부가세, 합계금액을 상호 변환하여 계산해주는 도구입니다. 견적서 작성, 장부 기장, 세금 신고 등 다양한 실무 상황에서 활용할 수 있습니다.',
            'The Sales Tax (VAT) Calculator converts between supply amount, VAT, and total amount based on Korea\'s 10% VAT rate. It is useful for quoting, bookkeeping, and tax filing.',
          )}
        </p>
        <div>
          <h4 className="font-bold text-base mb-2">{L('3가지 입력 모드', '3 Input Modes')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('공급가액 입력 → 부가세(×0.10) + 합계(×1.10)', 'Supply Amount → VAT (×0.10) + Total (×1.10)')}</li>
            <li>{L('부가세 입력 → 공급가액(÷0.10) + 합계(공급+부가세)', 'VAT Amount → Supply (÷0.10) + Total (Supply+VAT)')}</li>
            <li>{L('합계금액 입력 → 공급가액(÷1.10) + 부가세(합계-공급)', 'Total Amount → Supply (÷1.10) + VAT (Total-Supply)')}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <ol className="space-y-4 text-sm text-muted-foreground">
        {[
          [
            L("모드 선택", "Choose mode"),
            L("알고 있는 값을 기준으로 공급가액/부가세/합계 중 하나를 입력 모드로 선택합니다.", "Select which figure you know: supply, VAT, or total."),
          ],
          [
            L("금액 입력", "Enter amount"),
            L("선택한 모드의 입력란에 금액을 넣으면 나머지 두 값이 자동 계산됩니다.", "Enter the known amount; the other two values are computed automatically."),
          ],
          [
            L("결과 확인", "Check results"),
            L("공급가액, 부가세, 합계금액이 모두 표시됩니다. 계산된 합계가 다른 항목과 일치하는지 교차 검증하세요.", "Supply, VAT, and total are all displayed. Cross-verify the computed total against other figures."),
          ],
          [
            L("적용", "Apply"),
            L("견적서·세금계산서 작성 시 공급가액과 부가세를 따로 표기해야 하므로, 이 결과를 그대로 활용할 수 있습니다.", "Quotation and tax invoices require supply and VAT listed separately — use the two figures directly."),
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
          <p className="font-semibold text-foreground mb-2">{L("예시 1 — 공급가액에서 합계 계산", "Example 1 — From supply amount")}</p>
          <p>
            {L(
              "공급가액 ₩500,000 → 부가세 = 500,000 × 0.10 = ₩50,000, 합계 = 500,000 + 50,000 = ₩550,000. 고객에게 청구할 총금액은 ₩550,000이며, 이 중 ₩50,000은 사업자가 국세청에 납부하는 부가세입니다.",
              "Supply ₩500,000 → VAT ₩50,000, total ₩550,000. The customer pays ₩550,000; of that, ₩50,000 is remitted to the NTS by the business.",
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">{L("예시 2 — 합계에서 공급가액 역산", "Example 2 — Reverse from total")}</p>
          <p>
            {L(
              "카드 전표 합계 ₩330,000 → 공급가액 = 330,000 ÷ 1.10 = ₩300,000, 부가세 = 330,000 − 300,000 = ₩30,000. 카드 전표 합계만 보고 원래 물건값을 역산할 때 이 공식을 씁니다.",
              "Card slip total ₩330,000 → supply = ₩300,000, VAT = ₩30,000. Use this reverse formula when recovering the original price from a card receipt total.",
            )}
          </p>
        </div>
        <p className="text-xs opacity-80">
          * {L("위 예시는 일반과세자 기준(10%)이며, 간이과세자·면세 사업자·수출(영세율)은 적용 세율이 다릅니다.", "Examples assume standard-rate taxpayer (10%); simplified, exempt, and export (zero-rate) cases differ.")}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-blue-500 pl-3">
            {L('부가세 계산 공식', 'VAT Calculation Formulas')}
          </h4>
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div>
              <p className="text-sm font-semibold mb-1">{L('1. 공급가액에서 계산', '1. From Supply Amount')}</p>
              <BlockMath math="\text{부가세} = \text{공급가액} \times 0.10" />
              <BlockMath math="\text{합계} = \text{공급가액} \times 1.10" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">{L('2. 합계금액에서 계산', '2. From Total Amount')}</p>
              <BlockMath math="\text{공급가액} = \text{합계} \div 1.10" />
              <BlockMath math="\text{부가세} = \text{합계} - \text{공급가액}" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('계산 예시', 'Calculation Example')}</h4>
          <div className="p-4 bg-muted rounded-lg text-sm space-y-1">
            <p><strong>{L('공급가액 100,000원인 경우:', 'Supply amount = 100,000 KRW:')}</strong></p>
            <p className="font-mono">부가세 = 100,000 × 0.10 = 10,000{isKo ? '원' : ' KRW'}</p>
            <p className="font-mono">합계 = 100,000 + 10,000 = 110,000{isKo ? '원' : ' KRW'}</p>
            <p className="mt-2"><strong>{L('합계 110,000원인 경우:', 'Total = 110,000 KRW:')}</strong></p>
            <p className="font-mono">공급가액 = 110,000 ÷ 1.1 = 100,000{isKo ? '원' : ' KRW'}</p>
            <p className="font-mono">부가세 = 110,000 - 100,000 = 10,000{isKo ? '원' : ' KRW'}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-4 leading-relaxed">
        <div>
          <h4 className="font-bold text-base mb-2">{L('부가세 계산 시 유의사항', 'VAT Calculation Tips')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('합계금액에서 공급가액을 구할 때 소수점 이하는 반올림 또는 버림 처리됩니다.', 'When calculating supply from total, decimals are rounded or truncated.')}</li>
            <li>{L('부가세 신고 시 세금계산서·카드매출전표 등 적격증빙을 반드시 확인하세요.', 'Verify qualifying evidence (tax invoices, card slips) when filing VAT.')}</li>
            <li>{L('간이과세자의 경우 세율이 5% 또는 1.5%로 다를 수 있습니다.', 'Simplified taxpayers may have a 5% or 1.5% rate instead of 10%.')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-base mb-2">{L('매출세액 vs 매입세액', 'Output Tax vs Input Tax')}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>{L('매출세액: 판매 시 부과하는 부가세 (거래처에 청구)', 'Output Tax: VAT charged on sales (billed to customers)')}</li>
            <li>{L('매입세액: 구매 시 지불한 부가세 (사업 경비에 포함)', 'Input Tax: VAT paid on purchases (included in business expenses)')}</li>
            <li>{L('납부세액 = 매출세액 - 매입세액 (매입세액공제)', 'Tax payable = Output tax − Input tax (input tax credit)')}</li>
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
