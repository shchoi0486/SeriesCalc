import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./DistanceConverterClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/conversion/distance-converter", "conversion", "distance-converter");
}

export default function Page() {
  return <CalculatorClient />;
}
