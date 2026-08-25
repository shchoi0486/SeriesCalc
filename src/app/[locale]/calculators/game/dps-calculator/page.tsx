import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./DpsCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/game/dps-calculator", "game", "dps-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
