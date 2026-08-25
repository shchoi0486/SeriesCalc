import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./BmrCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/life/bmr-calculator", "life", "bmr-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
