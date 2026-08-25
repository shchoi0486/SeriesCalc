import TermGlossary from "@/components/calculators/TermGlossary";
import { BlockMath } from "react-katex";
import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./IncomeTaxCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/income-tax-calculator", "finance", "income-tax-calculator");
}

export default function IncomeTaxCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const isKo = params.locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? '소득세 계산기는 종합소득금액을 입력하면 기본공제와 인적공제를 차감한 과세표준에 대해 누진세율이 적용된 소득세와 지방소득세를 계산해주는 도구입니다. 2024년 기준 8단계 누진세율이 적용됩니다.' : 'The Income Tax Calculator computes income tax and local income tax by applying progressive tax rates (8 brackets as of 2024) on the taxable income after basic and dependent deductions from your gross income.'}</p>
        <TermGlossary items={[
          { term: isKo ? '종합소득금액' : 'Gross Income', desc: isKo ? '근로소득, 사업소득, 이자소득, 배당소득 등을 모두 합산한 연간 총소득입니다.' : 'Total annual income combining earned income, business income, interest, dividends, etc.' },
          { term: isKo ? '과세표준' : 'Taxable Income', desc: isKo ? '종합소득금액에서 각종 공제(기본공제, 인적공제 등)를 차감한 금액으로, 세율이 적용되는 기준 금액입니다.' : 'The amount after subtracting deductions (basic, dependent, etc.) from gross income; the base for applying tax rates.' },
          { term: isKo ? '누진세율' : 'Progressive Tax Rates', desc: isKo ? '소득이 높아질수록 세율이 높아지는 세금 체계입니다. 소득이 적은 구간은 낮은 세율이, 높은 구간은 높은 세율이 적용됩니다.' : 'A tax system where higher income is taxed at higher rates. Lower income brackets apply lower rates; higher brackets apply higher rates.' },
          { term: isKo ? '실효세율' : 'Effective Tax Rate', desc: isKo ? '실제로 납부한 세금을 소득으로 나눈 비율입니다. 실효세율이 높을수록 실제 부담이 큼을 의미합니다.' : 'The ratio of actual tax paid to income. A higher effective tax rate means a heavier tax burden.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '소득세 계산 공식 (2024년 기준)' : 'Income Tax Formula (2024)'}</p>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 과세표준 산출' : '1. Taxable Income'}</h3>
          <BlockMath math={isKo ? "\\text{과세표준} = \\text{종합소득금액} - \\text{기본공제}(150\\text{만원}) - \\text{인적공제}(1\\text{인당 } 150\\text{만원})" : "\\text{Taxable Income} = \\text{Gross Income} - \\text{Basic Ded. (1.5M)} - \\text{Dependent Ded. (1.5M each)}"} />
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 소득세 (누진세율)' : '2. Income Tax (Progressive Rates)'}</h3>
          <BlockMath math={isKo ? "\\text{소득세} = \\text{과세표준} \\times \\text{세율} - \\text{누진공제}" : "\\text{Income Tax} = \\text{Taxable Income} \\times \\text{Rate} - \\text{Progressive Deduction}"} />
          <div className="mt-3 text-sm">
            <p className="font-semibold mb-2">{isKo ? '세율표:' : 'Tax Brackets:'}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{isKo ? '~1,400만원: 6% (누진공제 0)' : '~14M KRW: 6% (deduction 0)'}</li>
              <li>{isKo ? '~5,000만원: 15% (누진공제 126만원)' : '~50M KRW: 15% (deduction 1.26M)'}</li>
              <li>{isKo ? '~8,800만원: 24% (누진공제 576만원)' : '~88M KRW: 24% (deduction 5.76M)'}</li>
              <li>{isKo ? '~1.5억: 35% (누진공제 1,496만원)' : '~150M KRW: 35% (deduction 14.96M)'}</li>
              <li>{isKo ? '~3억: 38% (누진공제 1,946만원)' : '~300M KRW: 38% (deduction 19.46M)'}</li>
              <li>{isKo ? '~5억: 40% (누진공제 2,546만원)' : '~500M KRW: 40% (deduction 25.46M)'}</li>
              <li>{isKo ? '~10억: 42% (누진공제 3,546만원)' : '~1B KRW: 42% (deduction 35.46M)'}</li>
              <li>{isKo ? '초과: 45% (누진공제 6,546만원)' : 'Over 1B KRW: 45% (deduction 65.46M)'}</li>
            </ul>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '3. 지방소득세' : '3. Local Income Tax'}</h3>
          <BlockMath math={isKo ? "\\text{지방소득세} = \\text{소득세} \\times 10\\%" : "\\text{Local Income Tax} = \\text{Income Tax} \\times 10\\%"} />
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 소득세 절세 꿀팁' : '💡 Income Tax Saving Tips'}</h2>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '1. 세액공제를 최대한 활용하라' : '1. Maximize Tax Credits'}</h3>
          <p className="mt-2">{isKo ? '연금저축/IRP(연간 최대 900만원, 세액공제 16.5%~13.2%), 신용카드 소득공제, 의료비·교육비 공제, 기부금 세액공제 등을 꼼꼼히 챙기면 실효세율을 크게 낮출 수 있습니다.' : 'Carefully claiming tax credits—Pension Savings/IRP (up to 9M/year, 16.5%~13.2%), credit card income deduction, medical/education deductions, donation credits—can significantly reduce your effective tax rate.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '2. 부양가족 공제를 빠짐없이 챙겨라' : '2. Claim All Dependent Deductions'}</h3>
          <p className="mt-2">{isKo ? '배우자, 자녀, 부모님 등 부양가족이 있다면 인적공제(1인당 150만원)를 반드시 챙기세요. 장애인 공제, 경로우대 공제 등 추가 공제도 놓치지 마세요.' : 'If you have a spouse, children, or parents as dependents, be sure to claim the dependent deduction (1.5M per person). Don\'t miss additional deductions like disability or elderly deductions.'}</p>
        </div>
        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? '3. 연말정산을 철저히 준비하라' : '3. Prepare Thoroughly for Year-end Settlement'}</h3>
          <p className="mt-2">{isKo ? '12월 말까지 공제 증빙서류(의료비 영수증, 교육비 내역, 주택임대차계약서 등)를 모두 준비하세요. 준비하지 못한 항목은 다음해 5월 종합소득세 신고에서 추가 가능합니다.' : 'Prepare all deduction documents (medical receipts, education records, lease contracts, etc.) by December. Missed items can be added during the May comprehensive income tax filing.'}</p>
        </div>
      </div>
    ),
  };

  return <CalculatorClient infoSection={infoSection} />;
}
