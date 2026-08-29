'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { calculatorCategories } from '@/data/calculators';
import { isMarketAllowed } from '@/data/calculatorMarkets';

export default function RelatedCalculators() {
  const pathname = usePathname() || '';
  const { locale, dict } = useI18n();
  const segs = pathname.split('/').filter(Boolean);

  // Expected shape: /[locale]/calculators/[category]/[slug]
  if (segs.length < 4 || segs[1] !== 'calculators') return null;
  const category = segs[2];
  const slug = segs[3];
  const currentHref = `/calculators/${category}/${slug}`;

  let siblings: { id: string; href: string; name: string; locales?: string[] }[] = [];
  for (const cat of calculatorCategories) {
    if (cat.id !== category) continue;
    for (const sub of cat.subcategories) {
      if (sub.calculators.some((c) => c.href === currentHref)) {
        siblings = sub.calculators.filter((c) => c.href !== currentHref);
        break;
      }
    }
  }

  const visible = siblings.filter((c) => isMarketAllowed(c.href, locale));
  if (visible.length === 0) return null;

  return (
    <section className="mt-10" aria-label={dict.calculatorLayout.related}>
      <h2 className="text-xl font-bold mb-4">{dict.calculatorLayout.related}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((c) => {
          const name = dict.calculatorNames[c.id as keyof typeof dict.calculatorNames] || c.name;
          return (
            <li key={c.href}>
              <Link
                href={`/${locale}${c.href}`}
                className="flex items-center justify-between px-4 py-3 rounded-lg border hover:bg-accent transition-colors min-w-0"
              >
                <span className="text-sm font-medium min-w-0 truncate">{name}</span>
                <span className="text-muted-foreground shrink-0 ml-2">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
