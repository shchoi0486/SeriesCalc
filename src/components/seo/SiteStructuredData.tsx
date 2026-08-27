import type { Locale } from '@/i18n/config';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://seriescalc.com').replace(/\/$/, '');

export default function SiteStructuredData({ locale }: { locale?: Locale }) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SeriesCalc',
    url: SITE_URL,
    logo: `${SITE_URL}/logo/seriescalc.png`,
  };

  const website: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SeriesCalc',
    url: SITE_URL,
  };
  if (locale) {
    website.inLanguage = locale === 'ko' ? 'ko-KR' : 'en-US';
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
