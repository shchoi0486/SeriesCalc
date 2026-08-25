import type { Metadata } from "next";
import { en } from "@/i18n/dictionaries/en";
import { ko } from "@/i18n/dictionaries/ko";

type DictShape = typeof en;

const SITE_NAME = "All-in-Calc";

function camelize(id: string): string {
  return id.replace(/-([a-z])/g, (_m: string, c: string) => c.toUpperCase());
}

function prettify(id: string): string {
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type LocaleCopy = { title: string; description: string };

// 주요 계산기의 메타데이터(검색 결과 노출용)를 dict 값과 무관하게 우선 적용한다.
// UI 표시명(dict.calculatorNames)은 카테고리 페이지 등에서 재사용되므로 건드리지 않는다.
const META_OVERRIDES: Record<string, { ko: LocaleCopy; en: LocaleCopy }> = {
  "salary-calculator": {
    ko: {
      title: "연봉 실수령액 계산기 - 세후 월급, 4대보험·소득세 자동 계산",
      description:
        "2026년 기준으로 연봉별 실수령액을 계산하세요. 국민연금·건강보험·소득세·지방세를 반영한 세후 월급과 연봉→월 환산 금액을 즉시 확인할 수 있습니다.",
    },
    en: {
      title: "Take-Home Pay Calculator - Salary After Tax & Deductions",
      description:
        "Estimate your net monthly and yearly take-home pay in seconds. Enter your gross salary to see after-tax income with social insurance and tax deductions applied.",
    },
  },
  "net-salary-calculator": {
    ko: {
      title: "세후 실수령액 계산기 - 월급·연봉 세후 금액 조회",
      description:
        "월급이나 연봉을 입력하면 4대보험와 소득세를 뺀 실제 손에 쥐는 금액을 계산합니다. 연봉 협상, 이직 비교 시 세후 기준으로 정확하게 비교해 보세요.",
    },
    en: {
      title: "Net Salary Calculator - See Your Real After-Tax Income",
      description:
        "Find out exactly how much of your salary you keep. This free calculator applies income tax and insurance deductions to show your true net pay instantly.",
    },
  },
  "loan-interest": {
    ko: {
      title: "대출 이자 계산기 - 월 상환액·총 이자 한눈에",
      description:
        "대출금액, 금리, 기간만 입력하면 매월 갚아야 할 상환액과 총 이자 부담을 바로 계산합니다. 원리금균등 방식의 주택담보대출, 신용대출 이자를 미리 확인하세요.",
    },
    en: {
      title: "Loan Interest Calculator - Monthly Payment & Total Cost",
      description:
        "Calculate your monthly loan payment and total interest cost. Just enter the loan amount, interest rate and term to compare loans and plan repayment with confidence.",
    },
  },
  "mortgage-calculator": {
    ko: {
      title: "주택담보대출 계산기 - 월 납입액·LTV·총이자",
      description:
        "주택 가격과 대출 조건을 입력해 주닌대 월 상환액, 총 이자, LTV를 동시에 확인하세요. 고정·변동금리별 부담을 비교해 가장 유리한 대출 계획을 세워보세요.",
    },
    en: {
      title: "Mortgage Calculator - Monthly Payments, LTV & Interest",
      description:
        "Plan your home loan with confidence. Enter price, down payment, rate and term to see monthly payments, total interest and LTV — fixed vs variable compared.",
    },
  },
  "auto-loan-calculator": {
    ko: {
      title: "자동차 할부·대출 계산기 - 월 납입금 확인",
      description:
        "차량 가격, 계약금, 금리, 할부 개월 수를 입력하면 매월 내야 할 자동차 대출 상환액을 계산합니다. 구매 전 총 비용을 미리 파악하고 현명하게 선택하세요.",
    },
    en: {
      title: "Auto Loan Calculator - Monthly Car Payment Estimator",
      description:
        "Know before you buy. Enter vehicle price, down payment, APR and term to see your exact monthly car payment and total financing cost in seconds.",
    },
  },
  "charter-loan-calculator": {
    ko: {
      title: "전세자금대출 계산기 - 보증료·월 이자 계산",
      description:
        "전세 보증금과 대출 조건을 입력해 월 이자 부담과 대출 가능 금액을 추정합니다. 전세 계약 전 이자 비용을 미리 시뮬레이션해 보세요.",
    },
    en: {
      title: "Jeonse Loan Calculator - Korea Rent-Deposit Financing",
      description:
        "Estimate monthly interest and eligible amounts for a Jeonse (key money) housing loan in Korea. Compare guarantee options before signing your lease.",
    },
  },
  "jeonse-deposit-calculator": {
    ko: {
      title: "전세 적정 보증금 계산기 - 감정가 대비 안전선",
      description:
        "주택 감정가와 권장 보증금 비율로 안전한 전세가액 범위를 계산합니다. 깡통전세 위험을 줄이고 계약 전 적정 보증금을 확인하세요.",
    },
    en: {
      title: "Safe Jeonse Deposit Calculator - Max Recommended Amount",
      description:
        "Check whether a Jeonse deposit is safe. Based on appraisal value ratios, see the recommended maximum deposit to avoid over-leveraged leases in Korea.",
    },
  },
  "compound-interest": {
    ko: {
      title: "복리 계산기 - 투자 원금·이자 재테크 시뮬레이션",
      description:
        "원금, 금리, 투자 기간만 입력하면 복리로 불어나는 최종 금액과 이자 수익을 그래프로 확인합니다. 예금·적금·투자 상품의 장기 수익률을 미리 비교해 보세요.",
    },
    en: {
      title: "Compound Interest Calculator - Growth Over Time",
      description:
        "See how your money compounds. Enter principal, rate and years to watch savings grow month by month — perfect for deposits, investments and retirement planning.",
    },
  },
  "stock-compound-interest": {
    ko: {
      title: "주식 복리 계산기 - 배당 재투자 수익 시뮬레이션",
      description:
        "초기 투자금, 연 수익률, 배당 재투자 가정으로 주식 투자의 복리 성장 결과를 계산합니다. 10년, 20년 후 예상 자산을 미리 확인하고 투자 계획을 세우세요.",
    },
    en: {
      title: "Stock Compound Interest Calculator - Dividend Reinvestment",
      description:
        "Model long-term stock returns with dividend reinvestment. Set your initial amount, annual return and holding period to project portfolio growth over decades.",
    },
  },
  "deposit-interest": {
    ko: {
      title: "예금 이자 계산기 - 단복리·세후 실수령액",
      description:
        "예치 금액과 금리, 기간을 입력하면 단리·복리 각각의 만기 이자와 세후 실수령액(15.4% 과세)을 계산합니다. 은행 예금 상품 비교에 바로 활용하세요.",
    },
    en: {
      title: "Deposit Interest Calculator - Simple vs Compound, After Tax",
      description:
        "Compare simple and compound interest on term deposits, including withholding tax on earnings. Know your exact maturity amount before you lock in a rate.",
    },
  },
  "regular-installment-savings": {
    ko: {
      title: "적금 계산기 - 매월 납입액·만기 수령액(세후)",
      description:
        "매월 납입 금액, 금리, 가입 기간으로 적금 만기 수령액과 총 이자를 계산합니다. 단리·복리, 월복리 조건까지 반영해 나에게 맞는 적금 상품을 비교해 보세요.",
    },
    en: {
      title: "Installment Savings Calculator - Maturity Amount & Interest",
      description:
        "Enter your monthly deposit, rate and term to see the maturity value of an installment savings plan, including monthly compounding and after-tax returns.",
    },
  },
  "free-installment-savings": {
    ko: {
      title: "자유적금 계산기 - 목표 금액 역산 포함",
      description:
        "목표 모으고 싶은 금액이 있다면 기간과 금리에 따라 매월 필요한 납입액을 역산해 드립니다. 자유적금 만기 수령액 시뮬레이션도 함께 제공합니다.",
    },
    en: {
      title: "Flexible Savings Calculator - Hit Your Savings Goal",
      description:
        "Working toward a savings goal? Reverse-calculate the monthly deposit needed for your target amount, or simulate flexible installment savings growth.",
    },
  },
  "installment-savings-monthly-compound-interest": {
    ko: {
      title: "월복리 적금 계산기 - 복리 효과 극대화 비교",
      description:
        "매달 이자가 원금에 더해지는 월복리 적금의 만기 수령액을 계산합니다. 단리 상품과 얼마나 차이 나는지 비교해 같은 금리라도 더 유리한 상품을 고르세요.",
    },
    en: {
      title: "Monthly Compound Interest Savings Calculator",
      description:
        "See the power of monthly compounding. Calculate maturity values where interest is added to principal every month, and compare against simple-interest products.",
    },
  },
  cagr: {
    ko: {
      title: "CAGR 계산기 - 연평균 복리 수익률(성장률)",
      description:
        "초기 가치와 최종 가치, 투자 기간으로 연평균 복리 성장률(CAGR)을 계산합니다. 주식, 펀드, 매출 성장 등 서로 다른 기간의 수익률을 공정하게 비교하세요.",
    },
    en: {
      title: "CAGR Calculator - Compound Annual Growth Rate",
      description:
        "Measure true annualized returns. Enter beginning value, ending value and time period to compute CAGR — the fair way to compare investments of different lengths.",
    },
  },
  dti: {
    ko: {
      title: "DTI 계산기 - 소득 대비 부채 상환 비율",
      description:
        "연 소득과 대출 원리금 상환액으로 DTI(총부채상환비율)를 계산해 대출 가능 여부를 판단합니다. 주닌대·신용대출 심사 기준을 미리 체크해 보세요.",
    },
    en: {
      title: "DTI Calculator - Debt-to-Income Ratio Check",
      description:
        "Will you pass the lender's test? Calculate your debt-to-income ratio from income and monthly repayments to gauge loan eligibility before you apply.",
    },
  },
  "dsr-calculator": {
    ko: {
      title: "DSR 계산기 - 전 금융권 부채 상환비율 확인",
      description:
        "모든 대출의 연간 상환액과 연소득으로 DSR(대출상환비율)을 계산합니다. 규제 DSR 기준 대비 내 대출 한도를 미리 진단해 보세요.",
    },
    en: {
      title: "DSR Calculator - Total Debt Servicing Ratio (Korea)",
      description:
        "Add up repayments across all your loans and compare against income to calculate DSR. Diagnose your borrowing limit under Korea's lending rules.",
    },
  },
  vat: {
    ko: {
      title: "부가세 계산기 - 공급가액↔부가세 포함가 변환",
      description:
        "금액을 입력하면 공급가액과 부가세(10%) 포함가를 양방향으로 즉시 계산합니다. 견적서 작성, 세금계산서 발행 시 헷갈리는 부가세 처리를 간편하게 끝내세요.",
    },
    en: {
      title: "VAT Calculator - Add or Remove Sales Tax Instantly",
      description:
        "Convert between net supply price and VAT-inclusive totals in one click. Essential for quotes, invoices and tax filings — supports any custom VAT rate too.",
    },
  },
  "income-tax-calculator": {
    ko: {
      title: "소득세 계산기 - 근로소득 세금·연말정산 예상",
      description:
        "연봉과 공제 항목을 입력해 근로소득에 대한 소득세와 지방세를 예측합니다. 누진공제까지 자동 계산해 연말정산 예상 환급액 점검에 활용해 보세요.",
    },
    en: {
      title: "Income Tax Calculator - Estimate Your Annual Tax",
      description:
        "Estimate income tax on employment earnings with brackets and deductions applied automatically. Preview your annual tax bill before year-end settlement.",
    },
  },
  retirement: {
    ko: {
      title: "퇴직금 계산기 - 평균임금·근속연수 자동 산출",
      description:
        "재직일수와 임금 정보로 퇴직금(30일분 이상 임금 × 근속연수)을 계산합니다. 퇴직연금 DC형 운용성적과 비교해 유리한 수령 방법을 선택하세요.",
    },
    en: {
      title: "Severance Pay Calculator - Korean Retirement Benefits",
      description:
        "Compute statutory severance under Korean law: 30 days' average wages per year of service. Compare lump-sum vs DC pension outcomes before leaving.",
    },
  },
  "ordinary-wage": {
    ko: {
      title: "통상임금 계산기 - 연장·야간수당 기준 임금 산정",
      description:
        "기본급과 고정 수당을 입력해 통상임금에 포함되는 금액을 계산합니다. 연장·야간·휴일 근로수당과 연차수당 산정 기준을 정확히 확인하세요.",
    },
    en: {
      title: "Ordinary Wage Calculator - Overtime Rate Base (Korea)",
      description:
        "Determine which fixed allowances count toward ordinary wage — the base for overtime, night shift and annual leave allowances in Korea.",
    },
  },
  "weekly-holiday-allowance": {
    ko: {
      title: "주휴수당 계산기 - 주 15시간 이상 근로자",
      description:
        "1주 개근 조건의 근로자 주휴수당을 주 근로시간 기준으로 계산합니다. 아르바이트 직원 급여 명세서 작성 시 주휴수당 포함 여부와 금액을 정확히 넣으세요.",
    },
    en: {
      title: "Weekly Holiday Allowance Calculator - Korean Labor Law",
      description:
        "Calculate paid weekly holiday allowance for employees working 15+ hours per week. Get the exact amount to add to part-time payroll, guaranteed.",
    },
  },
  "annual-leave": {
    ko: {
      title: "연차 계산기 - 발생 연차·사용·잔여 일수 관리",
      description:
        "입사일과 사용 기록으로 1년 미만/이상 연차 발생 일수와 소멸 예정일을 계산합니다. 연차수당 미사용 금액까지 확인해 노무 관리에 활용하세요.",
    },
    en: {
      title: "Annual Leave Calculator - Accrual, Balance & Payout",
      description:
        "Track statutory annual leave accrual by hire date, remaining balance and expiration dates. Includes unused leave payout calculation for HR compliance.",
    },
  },
  insurance: {
    ko: {
      title: "보험 환급률 계산기 - 해약·만기환급금 예상",
      description:
        "납입 보험료와 가입 기간으로 해약환급금·만기환급금 예상액과 환급률을 추정합니다. 보험 설계 전 납입 대비 환급 구조를 미리 파악하세요.",
    },
    en: {
      title: "Insurance Refund Calculator - Surrender & Maturity Value",
      description:
        "Estimate surrender values and maturity refunds relative to premiums paid. Understand your policy's refund structure before committing long term.",
    },
  },
  "early-repayment-fee": {
    ko: {
      title: "대출 중도상환수수료 계산기 - 남은 기간별 금액",
      description:
        "대출 잔액, 약정 기간, 경과 기간으로 중도상환수수료를 계산합니다. 요율 구간을 반영해 갚는 시점에 따른 수수료 차이를 비교해 보세요.",
    },
    en: {
      title: "Prepayment Fee Calculator - Early Loan Repayment Cost",
      description:
        "Know the exit cost before you refinance. Calculate prepayment penalties by remaining period across typical sliding-rate schedules.",
    },
  },
  "credit-card-installment-fee": {
    ko: {
      title: "카드 할부 수수료 계산기 - 무이자·유이자 비교",
      description:
        "결제 금액과 할부 개월 수, 카드사 금리로 총 할부 수수료와 월 결제액을 계산합니다. 무이자 할부와 유이자 할부의 실제 비용 차이를 확인하세요.",
    },
    en: {
      title: "Credit Card Installment Fee Calculator - Total Cost",
      description:
        "See what installments really cost. Enter purchase amount, months and card APR to reveal total fees versus interest-free plans before you split a payment.",
    },
  },
  "installment-interest": {
    ko: {
      title: "할부 이자 계산기 - 거치·균등 상환 총비용",
      description:
        "물건값과 할부 조건(개월 수, 금리, 거치 기간)을 입력해 총 이자 비용과 월 상환액을 계산합니다. 일시불 할인과 할부 중 어떤 게 유리한지 판단하세요.",
    },
    en: {
      title: "Installment Payment Calculator - Interest & Monthly Cost",
      description:
        "Break down any installment purchase: total interest, monthly payment and grace-period effects. Decide between upfront discount vs financed payment.",
    },
  },
  "principal-equal-amortization": {
    ko: {
      title: "원금균등 상환 계산기 - 매월 상환액 변화 확인",
      description:
        "대출 원금, 금리, 기간으로 원금균등분할상환의 월 상환액을 계산합니다. 매달 줄어드는 이자 부담과 초기 상환액이 큰 특징을 원리금균등과 비교해 확인하세요.",
    },
    en: {
      title: "Equal Principal Payment Calculator - Declining Payments",
      description:
        "Calculate equal-principal amortization month by month: higher early payments that shrink as interest declines. Compare directly with equal total payment plans.",
    },
  },
  "principal-and-interest-equal-repayment": {
    ko: {
      title: "원리금균등 상환 계산기 - 고정 월 상환액 산출",
      description:
        "대출 조건 입력 시 매달 동일한 원리금균등 상환액과 총 이자, 전체 상환 스케줄을 계산합니다. 주닌대·학자금 대출 플랜 설계의 기준이 되는 방식입니다.",
    },
    en: {
      title: "Equal Principal & Interest Calculator - Fixed Payment Plan",
      description:
        "The standard mortgage math: constant monthly payments with interest front-loaded. See full amortization details for any loan amount, rate and term.",
    },
  },
  "inflation-calculator": {
    ko: {
      title: "물가상승률 계산기 - 과거↔미래 화폐 가치 환산",
      description:
        "인플레이션 가정 하에 오늘의 돈이 N년 후 얼마의 가치가 되는지, 과거 금액이 현재 가치로 얼마인지 계산합니다. 장기 저축 목표 설정에 필수 도구입니다.",
    },
    en: {
      title: "Inflation Calculator - Past & Future Money Value",
      description:
        "Convert money across time: what today's cash will be worth in 10, 20 or 30 years, or what past prices equal today. Essential for long-term planning.",
    },
  },
  "interest-rate-calculator": {
    ko: {
      title: "실효금리 계산기 - 연이율↔월이율·실질 이자율",
      description:
        "명목 금리와 복리 빈도로 실효연이율(EAR)을 계산하고 연·월·일 이율을 상호 변환합니다. 광고 금리 뒤에 숨은 실제 비용을 정확히 비교해 보세요.",
    },
    en: {
      title: "Effective Interest Rate Calculator - EAR & APY Conversion",
      description:
        "Cut through advertised rates. Convert nominal APR to effective annual rate (EAR/APY) with any compounding frequency and compare real borrowing costs.",
    },
  },
  "property-tax-calculator": {
    ko: {
      title: "종합부동산세·재산세 계산기 - 주택 보유 세금",
      description:
        "주택 공시가격과 보유 수에 따른 재산세와 종합부동산세를 예상합니다. 공제액과 세율구간을 자동 적용해 연간 부동산 보유 세 부담을 미리 확인하세요.",
    },
    en: {
      title: "Property Tax Calculator - Comprehensive Real Estate Tax",
      description:
        "Estimate annual property and comprehensive real estate tax by official price and holdings, with deductions and progressive brackets applied.",
    },
  },
  "amortization-schedule": {
    ko: {
      title: "상환 스케줄 계산기 - 대출 원금·이자 분해표",
      description:
        "대출 조건별로 매달 원금과 이자가 어떻게 나뉘는지 전체 상환표를 계산합니다. 조기상환 시점 검토와 총이자 절감 전략 수립에 활용해 보세요.",
    },
    en: {
      title: "Amortization Schedule Calculator - Principal vs Interest",
      description:
        "See exactly how each payment splits between principal and interest over the life of your loan — spot refinancing opportunities and total interest saved.",
    },
  },
  npsh: {
    ko: {
      title: "NPSH 계산기 - 펌프 흡입 여유 수두·캐비테이션 판정",
      description:
        "증기압, 흡입 높이, 마찰 손실을 반영해 펌프의 NPSHa(흡입 여유 수두)를 계산하고 캐비테이션 발생 여부를 판단합니다. 펌프 선정 필수 검토 도구입니다.",
    },
    en: {
      title: "NPSH Calculator - Net Positive Suction Head Available",
      description:
        "Prevent cavitation at the design stage. Compute NPSHa from vapor pressure, suction lift and friction losses and verify margin against pump NPSHr.",
    },
  },
  tank: {
    ko: {
      title: "탱크 용량 계산기 - 원통형·직사각형 물 탱크 부피",
      description:
        "수직·수평 원통형과 직사각형 탱크의 용량(리터, m³, 배럴)을 치수만으로 계산합니다. 저장 탱크 선정과 수위 관리를 위한 정확한 부피 산출에 사용하세요.",
    },
    en: {
      title: "Tank Volume Calculator - Cylindrical & Rectangular Tanks",
      description:
        "Get capacity in liters, m³ or barrels for vertical/horizontal cylinders and rectangular tanks from dimensions alone — ideal for storage sizing and level control.",
    },
  },
  "pipe-friction": {
    ko: {
      title: "배관 마찰 손실 계산기 - Darcy-Weisbach 수두 손실",
      description:
        "배관 길이, 직경, 유량, 재질(조도)로 마찰 수두 손실과 압력 강하를 계산합니다. 펌프 양정 산정의 핵심 입력값을 정확히 확보하세요.",
    },
    en: {
      title: "Pipe Friction Loss Calculator - Darcy-Weisbach Head Loss",
      description:
        "Compute friction head loss and pressure drop from pipe length, diameter, flow and roughness using the Darcy-Weisbach equation — key input for pump sizing.",
    },
  },
  "pump-power": {
    ko: {
      title: "펌프 동력 계산기 - 양정·유량 → 모터 출력(kW)",
      description:
        "유량과 양정, 펌프 효율을 입력해 수동력과 축동력, 필요 모터 출력(kW, HP)을 계산합니다. 펌프 선정 및 전원 설계 시 정확한 동력 요구량을 확인하세요.",
    },
    en: {
      title: "Pump Power Calculator - Hydraulic & Motor Power (kW/HP)",
      description:
        "Convert flow and head into required power: hydraulic power, shaft power and motor rating with efficiency applied. Pick pumps and electricals correctly.",
    },
  },
  "ohms-law": {
    ko: {
      title: "옴의 법칙 계산기 - V·I·R·P 상호 변환",
      description:
        "전압, 전류, 저항, 전력 중 두 값을 입력하면 옴의 법칙으로 나머지 값을 즉시 계산합니다. 전기 회로 설계와 부하 분석의 기본기를 빠르게 검증하세요.",
    },
    en: {
      title: "Ohm's Law Calculator - Solve Voltage, Current, Resistance",
      description:
        "Enter any two of voltage, current, resistance or power to solve the rest instantly. The fastest way to verify basic circuit values during design.",
    },
  },
  "voltage-drop": {
    ko: {
      title: "전압 강하 계산기 - 케이블 길이·단면적별 % 강하",
      description:
        "케이블 종류, 크기, 길이, 부하 전류로 전압 강하(V, %)를 계산합니다. 규정 허용치(3~5%) 이내인지 확인해 전선 크기를 올바르게 선정하세요.",
    },
    en: {
      title: "Voltage Drop Calculator - By Cable Size & Length",
      description:
        "Check single/three-phase voltage drop in volts and percent for any cable run, then verify compliance against 3–5% limits before choosing wire size.",
    },
  },
  "reynolds-number": {
    ko: {
      title: "레이놀즈 수 계산기 - 층류·난류 판별",
      description:
        "유체 밀도, 점도, 유속, 특성 길이로 레이놀즈 수를 계산해 흐름이 층류인지 난류인지 판별합니다. 열전달·압력강하 해석의 첫 단계를 정확히 시작하세요.",
    },
    en: {
      title: "Reynolds Number Calculator - Laminar or Turbulent Flow",
      description:
        "Determine flow regime instantly from density, viscosity, velocity and characteristic length — the first step in heat transfer and pressure drop analysis.",
    },
  },
  lmtd: {
    ko: {
      title: "LMTD 계산기 - 열교환기 대수평균 온도차",
      description:
        "열교환기 양측 유체의 입·출구 온도로 대수평균 온도차(LMTD)를 계산하고, 병렬·직렬 흐름 및 보정계수까지 반영한 유효 온도차를 구합니다.",
    },
    en: {
      title: "LMTD Calculator - Log Mean Temperature Difference",
      description:
        "Size heat exchangers accurately: compute log mean temperature difference for counterflow and parallel flow arrangements with correction factors applied.",
    },
  },
  "dew-point": {
    ko: {
      title: "이슬점 계산기 - 온도·습도에서 응결 시작 온도",
      description:
        "기온과 상대습도를 입력하면 이슬점 온도를 계산해 결로 발생 여부를 예측합니다. 건축 단열 설계, 배관 보온, 실내 쾌적성 관리에 활용하세요.",
    },
    en: {
      title: "Dew Point Calculator - Condensation Temperature from RH",
      description:
        "Enter air temperature and relative humidity to find the dew point. Predict condensation risk for building envelopes, chilled pipes and HVAC comfort.",
    },
  },
  "water-density": {
    ko: {
      title: "물 밀도 계산기 - 온도별 물 밀도(kg/m³)",
      description:
        "온도를 입력하면 해당 온도의 물 밀도(kg/m³)를 정밀하게 계산합니다. 유량 환산, 수두 계산, 실험 데이터 정규화 등 물성치가 필요한 모든 계산의 기초값입니다.",
    },
    en: {
      title: "Water Density Calculator - By Temperature (kg/m³)",
      description:
        "Get precise water density at any temperature for flow conversions, head calculations and lab work — the reference property behind countless fluid calcs.",
    },
  },
  "pressure-converter": {
    ko: {
      title: "압력 단위 변환기 - MPa·bar·psi·mmH₂O·atm",
      description:
        "MPa, bar, psi, mmH₂O, atm, torr 등 모든 압력 단위를 상호 즉시 변환합니다. 국내외 규격이 섞인 엔지니어링 문서 작업에서 단위 실수를 원천 차단하세요.",
    },
    en: {
      title: "Pressure Unit Converter - MPa, bar, psi, mmH₂O, atm",
      description:
        "Convert between MPa, bar, psi, mmH₂O, atm, torr and more in one place. Eliminate unit mistakes when working across international engineering standards.",
    },
  },
  "barlows-formula": {
    ko: {
      title: "Barlow 공식 계산기 - 배관 벽두께·허용 압력",
      description:
        "관 외경, 벽 두께, 재료 인장강도로 Barlow 공식 기반 내압(파열압)을 계산합니다. 배관 사양 검토와 안전율 확보 여부를 빠르게 1차 검증하세요.",
    },
    en: {
      title: "Barlow's Formula Calculator - Pipe Wall Thickness & Pressure",
      description:
        "Relate internal pressure, wall thickness, diameter and material strength for pipes. Quick first-pass checks of burst pressure and safety margins.",
    },
  },
  "beam-deflection": {
    ko: {
      title: "보 처짐 계산기 - 단순보·캔틸레버 처짐·모멘트",
      description:
        "하중 조건(집중·등분포), 지지 조건, 단면 성질에 따른 보의 최대 처짐과 모멘트를 계산합니다. 구조 검토 시 허용 처짐 기준 대비를 즉시 확인하세요.",
    },
    en: {
      title: "Beam Deflection Calculator - Simply Supported & Cantilever",
      description:
        "Compute max deflection, slope and bending moment for point and distributed loads on simply supported or cantilever beams — check limits instantly.",
    },
  },
  "u-value": {
    ko: {
      title: "U값 계산기 - 열관류율·단열 성능(W/㎡K)",
      description:
        "각 재료의 두께와 열전도율로 벽체·창호의 U값(열관류율)을 계산합니다. 건축 단열 기준 충족 여부와 R값 환산까지 확인해 에너지 설계에 반영하세요.",
    },
    en: {
      title: "U-Value Calculator - Thermal Transmittance (W/m²K)",
      description:
        "Layer up materials to compute overall U-value and R-value for walls, roofs and glazing. Verify insulation performance against energy code targets.",
    },
  },
  psychrometric: {
    ko: {
      title: "습공기 선도 계산기 - 엔탈피·절대습도·노점",
      description:
        "건구온도와 습도(상대/절대)로 습공기의 엔탈피, 절대습도, 노점, 습구온도를 계산합니다. 공조 설비 설계와 열부하 계산의 기본 물성치를 정확히 구하세요.",
    },
    en: {
      title: "Psychrometric Calculator - Enthalpy, Humidity Ratio & Wet Bulb",
      description:
        "From dry-bulb temperature and humidity, derive enthalpy, humidity ratio, dew point and wet-bulb temperature — core properties for HVAC design.",
    },
  },
  "cooling-tower": {
    ko: {
      title: "냉각탑 계산기 - 접근온도·순환수량·능력",
      description:
        "냉각탑 입·출구 수온과 공기 습구온도로 접근온도, 순환수량, 방열 능력을 계산합니다. 냉각탑 선정과 성능 검토 시 필요한 기본 지표를 빠르게 산출하세요.",
    },
    en: {
      title: "Cooling Tower Calculator - Approach, Flow & Capacity",
      description:
        "Evaluate cooling tower performance: approach temperature, circulation flow rate and heat rejection capacity from water and wet-bulb conditions.",
    },
  },
  "heat-transfer": {
    ko: {
      title: "열전달 계산기 - 전도·대류 열량(Q = U×A×ΔT)",
      description:
        "면적, 온도차, 열전달 계수(전도·대류)로 전달 열량을 계산합니다. 열교환기 용량 산정부터 단열 검토까지 다양한 열부하 계산에 활용하세요.",
    },
    en: {
      title: "Heat Transfer Calculator - Conduction & Convection (Q=UAT)",
      description:
        "Compute heat flow through surfaces using area, ΔT and combined transfer coefficients — from exchanger duty checks to envelope loss estimates.",
    },
  },
  "bmi-calculator": {
    ko: {
      title: "BMI 계산기 - 체질량지수·비만도·표준체중",
      description:
        "키와 몸무게로 BMI 지수를 계산하고 저체중~고도비만 단계와 표준체중을 함께 제공합니다. WHO·아시아 기준을 모두 지원하는 무료 체질량지수 계산기입니다.",
    },
    en: {
      title: "BMI Calculator - Body Mass Index & Healthy Weight Range",
      description:
        "Calculate BMI from height and weight with category classification, healthy weight range and target calories. Supports both WHO and Asian standards.",
    },
  },
  "korean-age": {
    ko: {
      title: "한국 나이 계산기 - 세는나이·만나이 동시 변환",
      description:
        "생년월일로 한국식 세는나이와 국제 표준 만나이를 동시에 계산해 드립니다. 나이 통일법 시행 후 혼란스러운 나이 계산을 정확히 정리하세요.",
    },
    en: {
      title: "Korean Age Calculator - Counting vs International Age",
      description:
        "Convert birth date to both Korean counting age and international age instantly. Clear up confusion since Korea standardized on international age.",
    },
  },
  "date-difference": {
    ko: {
      title: "날짜 계산기 - 두 날짜 사이 일수·디데이 계산",
      description:
        "시작일과 종료일 사이 총 일수, 주말 제외 영업일, 개월·주 단위 기간을 계산합니다. 프로젝트 일정, 디데이, 근속 기간 산정에 바로 쓰는 도구입니다.",
    },
    en: {
      title: "Date Difference Calculator - Days Between Two Dates",
      description:
        "Count days, weeks and months between dates, excluding weekends if needed. Perfect for countdowns, project timelines and tenure calculations.",
    },
  },
  "due-date-calculator": {
    ko: {
      title: "출산 예정일 계산기 - 임신 주수·태아 발달 단계",
      description:
        "마지막 월경일(Naegele 방식)로 출산 예정일과 현재 임신 주수, 태아 발달 단계를 계산합니다. 산전 검진 일정 계획에 필요한 정보를 한눈에 확인하세요.",
    },
    en: {
      title: "Due Date Calculator - Pregnancy Weeks & Fetal Stage",
      description:
        "Predict your due date from the last menstrual period (Naegele's rule), track current pregnancy week and see fetal development milestones along the way.",
    },
  },
  "percentage-calculator": {
    ko: {
      title: "퍼센트 계산기 - 백분율·증감률·역산 한번에",
      description:
        "X의 Y%, 증감률, 비율 역산 등 퍼센트 관련 계산을 한 화면에서 처리합니다. 할인율, 시험 점수, 팁, 세금 계산까지 자주 쓰는 백분율 계산을 빠르게.",
    },
    en: {
      title: "Percentage Calculator - Increase, Decrease & Reverse %",
      description:
        "All percent problems in one tool: X% of Y, percent change, reverse percentages and more — discounts, grades, tips and taxes solved instantly.",
    },
  },
  "hours-calculator": {
    ko: {
      title: "근무시간 계산기 - 출퇴근 시간·야간시간 분리",
      description:
        "출퇴근 시간과 휴게시간을 입력해 일·주별 총 근무시간을 계산합니다. 초과근무와 야간(22시~06시) 시간을 분리해 수당 계산 기초자료로 활용하세요.",
    },
    en: {
      title: "Hours Calculator - Work Time Between Clock In/Out",
      description:
        "Total daily or weekly work hours from clock-in/out times minus breaks, with overtime and night-hour splits ready for payroll calculations.",
    },
  },
  "calorie-calculator": {
    ko: {
      title: "칼로리 계산기 - BMR·TDEE 다이어트 목표 섭취량",
      description:
        "키, 몸무게, 활동량으로 기초대사량(BMR)과 하루 총 소비 칼로리(TDEE)를 계산해 감량·유지·증량 목표 섭취 칼로리를 제안합니다. 식단 관리의 출발점입니다.",
    },
    en: {
      title: "Calorie Calculator - BMR, TDEE & Daily Targets",
      description:
        "Find your basal metabolic rate and total daily energy expenditure, then get calorie targets for cutting, maintaining or bulking — dieting made precise.",
    },
  },
  "subnet-calculator": {
    ko: {
      title: "서브넷 계산기 - CIDR·서브넷 마스크·IP 범위",
      description:
        "IP 주소와 CIDR 프리픽스로 네트워크 주소, 브로드캐스트, 호스트 범위, 와일드카드 마스크를 즉시 계산합니다. 네트워크 설계와 시험 대비 필수 도구입니다.",
    },
    en: {
      title: "Subnet Calculator - CIDR, Mask & IP Range Breakdown",
      description:
        "Enter an IP and CIDR prefix to get network address, broadcast, host range, wildcard mask and usable hosts — network design and exam prep essential.",
    },
  },
  "qr-generator": {
    ko: {
      title: "QR 코드 생성기 - URL·텍스트 QR 무료 다운로드",
      description:
        "URL, 텍스트, 전화번호 등 어떤 내용이든 QR 코드로 즉시 만들어 PNG 이미지로 저장하세요. 회원가입 없이 무료로 무제한 생성 가능합니다.",
    },
    en: {
      title: "QR Code Generator - Free PNG Downloads, No Sign-up",
      description:
        "Turn URLs, text or phone numbers into scannable QR codes instantly and download as PNG. Unlimited generation, completely free, no account required.",
    },
  },
  "password-generator": {
    ko: {
      title: "비밀번호 생성기 - 안전한 강력한 랜덤 비밀번호",
      description:
        "길이, 문자 종류(대소문자·숫자·특수문자)를 지정해 추측 불가능한 랜덤 비밀번호를 로컬에서 생성합니다. 크랙 소요 시간 추정치도 함께 확인하세요.",
    },
    en: {
      title: "Password Generator - Strong Random Passwords Offline",
      description:
        "Generate cryptographically random passwords with custom length and character sets — created locally in your browser, with crack-time estimates shown.",
    },
  },
};

function alternatesFor(locale: string, calcPath: string) {
  const loc = locale === "ko" ? "ko" : "en";
  return {
    canonical: `/${loc}${calcPath}`,
    languages: {
      ko: `/ko${calcPath}`,
      en: `/en${calcPath}`,
      "x-default": `/en${calcPath}`,
    },
  };
}

function openGraphFor(
  locale: string,
  calcPath: string,
  title: string,
  description: string
) {
  const loc = locale === "ko" ? "ko" : "en";
  return {
    title,
    description,
    url: `/${loc}${calcPath}`,
    type: "website" as const,
    siteName: SITE_NAME,
    locale: loc === "ko" ? "ko_KR" : "en_US",
  };
}

export function buildCalculatorMetadata(
  locale: string,
  calcPath: string,
  category: string,
  id: string
): Metadata {
  const loc = locale === "ko" ? "ko" : "en";
  const dict: DictShape = loc === "ko" ? ko : en;

  const names = dict.calculatorNames as unknown as Record<string, string>;
  const descs = dict.calculatorDescriptions as unknown as Record<string, string>;
  const sections = dict as unknown as Record<
    string,
    { title?: string; description?: string }
  >;
  const section = sections[camelize(id)];

  const override = META_OVERRIDES[id]?.[loc];
  const title =
    override?.title ||
    names[id] ||
    (section && section.title) ||
    `${prettify(id)} | ${prettify(category)} Calculators - ${SITE_NAME}`;
  const description =
    override?.description ||
    descs[id] ||
    (section && section.description) ||
    `${title}. Free online ${category} calculator by ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: alternatesFor(loc, calcPath),
    openGraph: openGraphFor(loc, calcPath, title, description),
  };
}

export function buildCategoryMetadata(
  locale: string,
  category: string
): Metadata {
  const loc = locale === "ko" ? "ko" : "en";
  const dict: DictShape = loc === "ko" ? ko : en;
  const cats = dict.categories as unknown as Record<
    string,
    { name?: string; description?: string }
  >;
  const cat = cats[category];

  const title = cat?.name
    ? `${cat.name} Calculators | ${SITE_NAME}`
    : `${prettify(category)} Calculators | ${SITE_NAME}`;
  const description =
    cat?.description || `Browse free ${category} calculators on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: alternatesFor(loc, `/calculators/${category}`),
    openGraph: openGraphFor(
      loc,
      `/calculators/${category}`,
      title,
      description
    ),
  };
}
