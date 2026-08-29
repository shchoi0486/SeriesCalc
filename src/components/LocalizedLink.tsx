'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

// 내부 콘텐츠 링크(/calculators, /guides 등)에 현재 로케일 접두사를 붙여
// 미들웨어 쿠키 추론에 의존하지 않고 언어가 유지되도록 한다.
export default function LocalizedLink({
  href,
  ...props
}: { href: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  const { locale } = useI18n();
  if (
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('/ko') &&
    !href.startsWith('/en')
  ) {
    return <Link href={`/${locale}${href}`} {...props} />;
  }
  return <Link href={href} {...props} />;
}
