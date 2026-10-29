import type { Metadata } from "next";
import TermGlossary from "@/components/calculators/TermGlossary";
import { en } from "@/i18n/dictionaries/en";
import { ko } from "@/i18n/dictionaries/ko";
import SalaryCalculatorClient from "./SalaryCalculatorClient";

const CALC_PATH = "/calculators/finance/salary";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale === "ko" ? "ko" : "en";
  const t = (locale === "ko" ? ko : en).salary;
  const title = t.title;
  const description = t.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${CALC_PATH}`,
      languages: {
        ko: `/ko${CALC_PATH}`,
        en: `/en${CALC_PATH}`,
        "x-default": `/en${CALC_PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${CALC_PATH}`,
      type: "website",
      siteName: "SeriesCalc",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
  };
}

export default function SalaryCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale === "ko" ? "ko" : "en";
  const isKo = locale === "ko";

  const infoSection = {
    calculatorDescription: (
      <div className="text-base leading-relaxed space-y-4">
        <p>
          {isKo ? "'내 통장에 찍히는 진짜 내 돈은 얼마일까?' 모든 직장인의 공통적인 궁금증일 겁니다. " : "“How much is the real money that lands in my account?” That is a common question for every worker. "}<strong>{isKo ? '연봉 계산기' : 'Annual Salary Calculator'}</strong>{isKo ? '는 계약서에 명시된 연봉(세전 금액)을 기준으로, 복잡한 4대 보험과 세금을 제외하고 매달 실제로 수령하게 될 금액(세후 금액)을 정확하게 계산해주는 스마트한 도구입니다.' : ' accurately computes the actual amount (after-tax) you receive each month, excluding the complex 4 insurances and taxes, based on the annual salary (pre-tax) stated in your contract.'}
        </p>
        <p>
          {isKo ? '단순히 숫자만 확인하는 것을 넘어, 내 월급에서 어떤 항목들이 얼마나 공제되는지 명확히 파악할 수 있습니다. 이를 통해 합리적인 소비 계획을 세우고, 비과세 항목을 활용한 절세 전략을 수립하는 등 현명한 재무 관리의 첫걸음을 뗄 수 있습니다.' : 'Beyond simply checking numbers, you can clearly see which items are deducted and by how much from your monthly pay. This lets you make a reasonable spending plan and take the first step toward smart financial management, such as setting up a tax-saving strategy using non-taxable items.'}
        </p>
        <TermGlossary items={[
          { term: isKo ? '4대 보험' : 'Four Insurances', desc: isKo ? '국민연금·건강보험·장기요양보험·고용보험을 묶어 이르는 말로, 근로자의 사회안전망을 위해 급여에서 공제됩니다.' : 'An umbrella term for National Pension, Health Insurance, Long-term Care Insurance, and Employment Insurance, deducted from wages to fund workers’ social safety net.' },
          { term: isKo ? '비과세 소득' : 'Non-taxable Income', desc: isKo ? '식대, 차량유지비 등 과세 대상에서 제외되는 소득으로, 이를 활용하면 4대 보험료와 소득세를 함께 절약할 수 있습니다.' : 'Income excluded from the tax base, such as meal and vehicle allowances; using it saves both insurance premiums and income tax.' },
          { term: isKo ? '지방소득세' : 'Local Income Tax', desc: isKo ? '소득세의 10%로 산출되어 함께 공제되는 세금입니다.' : 'A tax calculated as 10% of the income tax and deducted together with it.' },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="text-base leading-relaxed space-y-6">
        <p className="font-semibold">{isKo ? '실수령액은 연봉에서 비과세 소득을 제외한 과세 대상 금액을 기준으로 각종 공제 항목을 뺀 금액입니다. 주요 공제 항목은 다음과 같습니다. (2026년 기준)' : 'Net take-home is the amount after subtracting various deductions from the taxable base (annual salary minus non-taxable income). Major deduction items are as follows. (as of 2026)'}</p>

        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '1. 4대 사회보험' : '1. Four Social Insurances'}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>{isKo ? <><strong>국민연금 (근로자 4.75%):</strong> 기준소득월액의 4.75%를 공제합니다. (2026.7~2027.6 기준 상한 659만원, 하한 41만원)</> : <><strong>National Pension (employee 4.75%):</strong> 4.75% of standard monthly income is deducted. (range 410K–6.59M for Jul 2026–Jun 2027)</>}
            </li>
            <li>{isKo ? <><strong>건강보험 (근로자 3.595%):</strong> 과세 대상 월 급여의 3.595%를 공제합니다.</> : <><strong>Health Insurance (employee 3.595%):</strong> 3.595% of taxable monthly pay is deducted.</>}</li>
            <li>{isKo ? <><strong>장기요양보험:</strong> 산출된 건강보험료의 13.14%를 추가로 공제합니다. (요율은 매년 변동될 수 있습니다)</> : <><strong>Long-term Care Insurance:</strong> An additional 13.14% of the computed health insurance premium is deducted. (rate may change yearly)</>}</li>
            <li>{isKo ? <><strong>고용보험 (근로자 0.9%):</strong> 전체 월 급여의 0.9%를 공제합니다.</> : <><strong>Employment Insurance (employee 0.9%):</strong> 0.9% of total monthly pay is deducted.</>}</li>
          </ul>
        </div>

        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-bold text-primary mb-3">{isKo ? '2. 소득세 및 지방소득세' : '2. Income Tax and Local Income Tax'}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>{isKo ? <><strong>소득세:</strong> 연간 과세소득에서 근로소득공제·기본공제(1인당 150만원)·연금보험료공제를 뺀 과세표준에 8단계 누진세율을 적용한 뒤, 근로소득세액공제를 반영해 월 원천징수액을 추정합니다. 국세청 간이세액표와는 공제 항목 차이로 ±5% 내외 차이가 날 수 있습니다.</> : <><strong>Income Tax:</strong> We estimate monthly withholding by applying the 8-bracket progressive rates to annual taxable income after the earned-income deduction, personal deduction (1.5M per dependent), and pension premium deduction, then applying the earned-income tax credit. Results may differ from the NTS table by roughly ±5%.</>}</li>
            <li>{isKo ? <><strong>지방소득세:</strong> 산출된 소득세의 10%를 공제합니다.</> : <><strong>Local Income Tax:</strong> 10% of the computed income tax is deducted.</>}</li>
          </ul>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="text-base leading-relaxed space-y-8">
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{isKo ? '💡 연봉 200% 활용을 위한 직장인 재테크 꿀팁' : '💡 Smart Money Tips to Get 200% from Your Salary'}</h2>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "1. '비과세 항목'을 최대로 활용하라" : "1. Maximize 'Non-taxable Items'"}</h3>
          <p className="mt-2">{isKo ? '연봉 협상 시, 비과세 항목을 적극적으로 활용하면 실질 소득을 높일 수 있습니다. 대표적인 비과세 항목은 다음과 같습니다.' : 'When negotiating salary, actively using non-taxable items can raise your real income. Representative non-taxable items are as follows.'}</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
            <li>{isKo ? <><strong>식대:</strong> 월 20만원까지 비과세 (연 240만원)</> : <><strong>Meal allowance:</strong> Up to 200K/month non-taxable (2.4M/year)</>}</li>
            <li>{isKo ? <><strong>차량유지비(자가운전보조금):</strong> 본인 명의 차량을 업무에 사용할 경우 월 20만원까지 비과세</> : <><strong>Vehicle upkeep (own-car subsidy):</strong> Up to 200K/month non-taxable if you use your own car for work</>}</li>
            <li>{isKo ? <><strong>육아수당:</strong> 만 6세 이하 자녀가 있을 경우 월 20만원까지 비과세</> : <><strong>Childcare allowance:</strong> Up to 200K/month non-taxable if you have a child under 6</>}</li>
          </ul>
          <p className="mt-2 text-sm">{isKo ? '예를 들어 연봉 5,000만원인 경우, 식대 비과세 240만원을 적용하면 과세 대상 소득이 4,760만원으로 줄어들어 4대 보험료와 소득세를 모두 절약할 수 있습니다.' : 'For example, with a 50M annual salary, applying the 2.4M meal non-taxable reduces taxable income to 47.6M, saving both insurance premiums and income tax.'}</p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "2. 연말정산, 미리 준비하는 자가 '13월의 월급'을 얻는다" : "2. Year-end Settlement: Prepare Early to Earn Your '13th Month's Pay'"}</h3>
          <p className="mt-2">{isKo ? '연말정산은 1년 동안 낸 세금을 최종 정산하는 과정입니다. 어떻게 준비하느냐에 따라 세금을 돌려받을 수도, 더 낼 수도 있습니다. 신용카드/체크카드 사용액, 의료비, 교육비, 월세액 등 공제 항목을 꼼꼼히 챙겨두세요. 특히 ' : 'Year-end settlement is the process of finalizing the tax paid over the year. Depending on preparation, you may get a refund or pay more. Carefully gather deductions such as credit/debit card spending, medical, education, and rent expenses. In particular, '}<strong>{isKo ? '연금저축/IRP' : 'Pension Savings / IRP'}</strong>{isKo ? '는 연간 최대 900만원까지 세액공제가 가능한 강력한 절세 상품이므로, 노후 준비와 절세를 동시에 잡는 것을 추천합니다.' : ' allows tax credits up to 9M per year—a powerful tax saver—so we recommend it to combine retirement prep and tax saving.'}</p>
        </div>

        <div className="p-5 rounded-lg bg-muted border-l-4 border-primary">
          <h3 className="font-bold text-lg text-primary">{isKo ? "3. 연봉 협상, '세전' 기준으로 당당하게 요구하라" : "3. Salary Negotiation: Assertively Demand on a 'Pre-tax' Basis"}</h3>
          <p className="mt-2">{isKo ? "모든 연봉 협상은 '세전' 금액을 기준으로 진행됩니다. 협상 전, 동종 업계와 직무의 평균 연봉 수준을 파악하고(커리어 플랫폼, 채용 사이트 등 활용), 지난 1년간의 자신의 성과를 구체적인 수치와 사례로 정리해두는 것이 중요합니다. 막연한 인상 요구보다는, '매출 10% 상승에 기여', '프로젝트 기간 2주 단축' 등 명확한 근거를 제시할 때 성공 확률이 높아집니다." : "All salary negotiations are based on the 'pre-tax' amount. Before negotiating, understand the average salary for your industry and role (via career platforms, job sites, etc.), and organize your past year's achievements with concrete numbers and examples. Rather than a vague raise request, success is more likely when you present clear evidence such as 'contributed to 10% sales growth' or 'shortened project by 2 weeks.'"}</p>
        </div>
      </div>
    ),
  };

  return <SalaryCalculatorClient infoSection={infoSection} />;
}
