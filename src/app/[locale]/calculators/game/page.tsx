import type { Metadata } from "next";
import { buildCategoryMetadata } from "@/lib/calculatorSeo";
import ListingClient from "./GameListingClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildCategoryMetadata(params.locale, "game");
}

export default function Page() {
  return <ListingClient />;
}
