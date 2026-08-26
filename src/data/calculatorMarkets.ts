// 경량 시장(국가) 제한 맵 — 미들웨어(edge)에서 아이콘 import 없이 사용하기 위해
// 별도 파일로 분리. calculators.ts의 `locales` 필드와 동기화 유지 필요.
// 값이 없으면 모든 시장(comon) 노출, 배열이 있으면 해당 시장에서만 노출.
export type Market = "ko" | "en";

export const calculatorMarkets: Record<string, Market[] | undefined> = {
  "/calculators/finance/dsr-calculator": ["ko"],
  "/calculators/finance/auto-loan-calculator": ["en"],
  "/calculators/finance/jeonse-deposit-calculator": ["ko"],
  "/calculators/finance/charter-loan-calculator": ["ko"],
  "/calculators/finance/net-salary-calculator": ["ko"],
  "/calculators/finance/salary-calculator": ["ko"],
  "/calculators/finance/income-tax-calculator": ["ko"],
  "/calculators/finance/vat": ["ko"],
  "/calculators/finance/ordinary-wage": ["ko"],
  "/calculators/finance/insurance": ["ko"],
  "/calculators/finance/retirement": ["ko"],
  "/calculators/finance/annual-leave": ["ko"],
  "/calculators/conversion/korean-shoe-size-converter": ["ko"],
  "/calculators/conversion/korean-clothing-size-converter": ["ko"],
  "/calculators/life/hours-calculator": ["ko"],
  "/calculators/life/sales-tax-calculator": ["ko"],
  "/calculators/life/moving-cost-calculator": ["ko"],
  "/calculators/life/gpa-calculator": ["ko"],
  "/calculators/engineering/korean-wind-load": ["ko"],
  // 신규 국가전용 계산기
  "/calculators/finance/401k": ["en"],
  "/calculators/finance/mortgage-piti": ["en"],
  "/calculators/finance/credit-card-payoff": ["en"],
  "/calculators/finance/rsu-tax": ["en"],
  "/calculators/finance/jeonse-vs-wolse": ["ko"],
  "/calculators/finance/acquisition-tax": ["ko"],
  "/calculators/finance/isa": ["ko"],
};

export function isMarketAllowed(href: string, market: Market): boolean {
  const allowed = calculatorMarkets[href];
  if (!allowed) return true;
  return allowed.includes(market);
}
