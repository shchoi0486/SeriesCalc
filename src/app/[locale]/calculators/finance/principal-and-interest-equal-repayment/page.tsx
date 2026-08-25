import type { Metadata } from "next";
import { buildCalculatorMetadata } from "@/lib/calculatorSeo";
import CalculatorClient from "./PrincipalAndInterestEqualRepaymentClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCalculatorMetadata(params.locale, "/calculators/finance/principal-and-interest-equal-repayment", "finance", "principal-and-interest-equal-repayment");
}

export default function Page() {
  return <CalculatorClient />;
}
