import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./KineticEnergyCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/kinetic-energy-calculator", "science", "kinetic-energy-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
