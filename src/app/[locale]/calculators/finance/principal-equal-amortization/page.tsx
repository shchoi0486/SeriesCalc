import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./PrincipalEqualAmortizationClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/principal-equal-amortization", "finance", "principal-equal-amortization");
}

export default function Page() {
  return <CalculatorClient />;
}
