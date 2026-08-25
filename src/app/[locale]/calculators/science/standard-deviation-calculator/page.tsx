import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./StandardDeviationCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/standard-deviation-calculator", "science", "standard-deviation-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
