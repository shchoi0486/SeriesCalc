import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./TorqueCalculatorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/science/torque-calculator", "science", "torque-calculator");
}

export default function Page() {
  return <CalculatorClient />;
}
