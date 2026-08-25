import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./RandomNumberGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/others/random-number-generator", "others", "random-number-generator");
}

export default function Page() {
  return <CalculatorClient />;
}
