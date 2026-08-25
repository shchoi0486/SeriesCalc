import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./InvoiceGeneratorClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/others/invoice-generator", "others", "invoice-generator");
}

export default function Page() {
  return <CalculatorClient />;
}
