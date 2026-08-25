import type { Metadata } from "next";
import { buildCategoryMetadata } from "@/lib/calculatorSeo";
import ListingClient from "./ScienceListingClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCategoryMetadata(params.locale, "science");
}

export default function Page() {
  return <ListingClient />;
}
