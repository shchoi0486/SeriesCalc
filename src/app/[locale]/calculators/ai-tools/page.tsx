import type { Metadata } from "next";
import { buildCategoryMetadata } from "@/lib/calculatorSeo";
import ListingClient from "./AiToolsListingClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCategoryMetadata(params.locale, "ai-tools");
}

export default function Page() {
  return <ListingClient />;
}
