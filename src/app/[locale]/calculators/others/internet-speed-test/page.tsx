import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./InternetSpeedTestClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/others/internet-speed-test", "others", "internet-speed-test");
}

export default function Page() {
  return <CalculatorClient />;
}
