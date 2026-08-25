import type { Metadata } from "next";
import { buildCategoryMetadata } from "@/lib/calculatorSeo";
import ListingClient from "./EngineeringListingClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCategoryMetadata(params.locale, "engineering");
}

export default function Page() {
  return <ListingClient />;
}
