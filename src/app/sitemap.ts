import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { calculatorCategories } from "@/data/calculators";
import { isMarketAllowed } from "@/data/calculatorMarkets";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://seriescalc.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/calculators", "/guides", "/about", "/editorial-policy", "/privacy-policy", "/terms-of-service", "/contact"];
  const guidePaths = [
    "/guides/salary-take-home-table",
    "/guides/salary-take-home",
    "/guides/jeonse-vs-wolse",
    "/guides/mortgage-repayment-types",
    "/guides/compound-interest-power",
    "/guides/dti-dsr",
    "/guides/deposit-savings",
    "/guides/npsh-cavitation",
    "/guides/pump-selection",
    "/guides/bmi-weight",
    "/guides/date-math",
    "/guides/metric-imperial",
    "/guides/percentage-mastery",
    "/guides/heat-insulation",
    "/guides/electrical-basics",
    "/guides/data-storage",
  ];

  const calcHrefs: string[] = [];
  for (const cat of calculatorCategories) {
    calcHrefs.push(cat.href);
    for (const sub of cat.subcategories) {
      for (const cal of sub.calculators) {
        calcHrefs.push(cal.href);
      }
    }
  }

  const urls: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const p of staticPaths) {
      urls.push({ url: `${SITE_URL}/${locale}${p}`, lastModified: now });
    }
    for (const href of calcHrefs) {
      if (isMarketAllowed(href, locale)) {
        urls.push({ url: `${SITE_URL}/${locale}${href}`, lastModified: now });
      }
    }
    for (const href of guidePaths) {
      urls.push({ url: `${SITE_URL}/${locale}${href}`, lastModified: now });
    }
  }

  return urls;
}
