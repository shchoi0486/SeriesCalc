'use client';

import { useI18n } from '@/i18n/I18nProvider';

// literal env access only — Next.js only inlines NEXT_PUBLIC_* with static keys.
function readAffiliate(placement: string) {
  const p = placement.toUpperCase();
  if (p === 'CALC') {
    return {
      url: process.env.NEXT_PUBLIC_AFFILIATE_CALC_URL,
      labelKo: process.env.NEXT_PUBLIC_AFFILIATE_CALC_LABEL_KO,
      labelEn: process.env.NEXT_PUBLIC_AFFILIATE_CALC_LABEL_EN,
      descKo: process.env.NEXT_PUBLIC_AFFILIATE_CALC_DESC_KO,
      descEn: process.env.NEXT_PUBLIC_AFFILIATE_CALC_DESC_EN,
    };
  }
  if (p === 'GUIDE') {
    return {
      url: process.env.NEXT_PUBLIC_AFFILIATE_GUIDE_URL,
      labelKo: process.env.NEXT_PUBLIC_AFFILIATE_GUIDE_LABEL_KO,
      labelEn: process.env.NEXT_PUBLIC_AFFILIATE_GUIDE_LABEL_EN,
      descKo: process.env.NEXT_PUBLIC_AFFILIATE_GUIDE_DESC_KO,
      descEn: process.env.NEXT_PUBLIC_AFFILIATE_GUIDE_DESC_EN,
    };
  }
  return null;
}

export default function AffiliateSlot({ placement = 'calc' }: { placement?: string }) {
  const { locale, dict } = useI18n();
  const cfg = readAffiliate(placement);
  if (!cfg || !cfg.url) return null;

  const label = locale === 'ko' ? cfg.labelKo || cfg.labelEn || '' : cfg.labelEn || cfg.labelKo || '';
  const desc = locale === 'ko' ? cfg.descKo || '' : cfg.descEn || '';
  if (!label) return null;

  const cta = locale === 'ko' ? '자세히 보기 →' : 'Learn more →';

  return (
    <aside className="my-8 rounded-xl border bg-muted/40 p-4" aria-label={dict.calculatorLayout.sponsored}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
        {dict.calculatorLayout.sponsored}
      </div>
      <a href={cfg.url} target="_blank" rel="noopener noreferrer sponsored" className="block">
        <div className="text-base font-semibold hover:underline">{label}</div>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
        <span className="mt-2 inline-block text-sm font-medium text-primary">{cta}</span>
      </a>
    </aside>
  );
}
