import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./KoreanShoeSizeConverterClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/korean-shoe-size-converter", "conversion", "korean-shoe-size-converter");
}

export default function Page() {
  return <CalculatorClient />;
}
