import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./IdealWeightCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/ideal-weight-calculator", "life", "ideal-weight-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
