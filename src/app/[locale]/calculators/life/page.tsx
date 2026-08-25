import type { Metadata } from "next";
import { buildCategoryMetadata } from "@/lib/calculatorSeo";
import ListingClient from "./LifeListingClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCategoryMetadata(params.locale, "life");
}

export default function Page() {
  return <ListingClient />;
}
