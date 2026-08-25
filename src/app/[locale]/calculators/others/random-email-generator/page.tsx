import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./RandomEmailGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/others/random-email-generator", "others", "random-email-generator");
}

export default function Page() {
  return <CalculatorClient />;
}
