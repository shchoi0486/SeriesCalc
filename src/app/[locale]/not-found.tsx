'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

export default function NotFound() {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h2 className="text-6xl font-bold text-foreground mb-4">404</h2>
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          {isKo ? '페이지를 찾을 수 없습니다' : 'Page not found'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isKo
            ? '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.'
            : 'The page you requested does not exist or has been moved.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {isKo ? '홈으로 돌아가기' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
