'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

type GuideLink = { slug: string; ko: string; en: string };

const BY_CATEGORY: Record<string, GuideLink[]> = {
  finance: [
    { slug: 'salary-take-home', ko: '연봉 실수령액 가이드', en: 'Take-Home Pay Guide' },
    { slug: 'dti-dsr', ko: 'DTI·DSR 가이드', en: 'DTI & DSR Guide' },
    { slug: 'deposit-savings', ko: '예금·적금 이자 가이드', en: 'Savings Interest Guide' },
    { slug: 'compound-interest-power', ko: '복리의 힘', en: 'The Power of Compound Interest' },
    { slug: 'mortgage-repayment-types', ko: '상환 방식 비교', en: 'Repayment Methods Compared' },
  ],
  engineering: [
    { slug: 'npsh-cavitation', ko: 'NPSH·캐비테이션 가이드', en: 'NPSH & Cavitation Guide' },
    { slug: 'pump-selection', ko: '펌프 선정 가이드', en: 'Pump Selection Guide' },
    { slug: 'heat-insulation', ko: '단열·열전달 가이드', en: 'Insulation & Heat Transfer Guide' },
    { slug: 'electrical-basics', ko: '전기 기초 가이드', en: 'Electrical Basics Guide' },
  ],
  science: [
    { slug: 'percentage-mastery', ko: '퍼센트 완전정복', en: 'Percentage Mastery' },
    { slug: 'metric-imperial', ko: '단위계 가이드', en: 'Unit Systems Guide' },
  ],
  conversion: [
    { slug: 'metric-imperial', ko: '미터법 vs 야드파운드법', en: 'Metric vs Imperial' },
    { slug: 'data-storage', ko: '데이터 용량 가이드', en: 'Data Storage Guide' },
  ],
  life: [
    { slug: 'bmi-weight', ko: 'BMI·체중 관리 가이드', en: 'BMI & Weight Guide' },
    { slug: 'date-math', ko: '날짜 계산 가이드', en: 'Date Math Guide' },
  ],
  'ai-tools': [
    { slug: 'data-storage', ko: '데이터 용량 가이드', en: 'Data Storage Guide' },
  ],
};

export default function RelatedGuides() {
  const pathname = usePathname() || '';
  const { locale } = useI18n();
  const segs = pathname.split('/').filter(Boolean);
  const category = segs[2];
  const guides = BY_CATEGORY[category];
  if (!guides || !guides.length) return null;

  const isKo = locale === 'ko';

  return (
    <section className="mt-8" aria-label={isKo ? '관련 가이드' : 'Related guides'}>
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
        <BookOpen className="w-5 h-5" />
        {isKo ? '함께 읽으면 좋은 가이드' : 'Guides to read next'}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr">
        {guides.slice(0, 4).map((g) => (
          <li key={g.slug} className="w-full min-w-0">
            <Link
              href={`/${locale}/guides/${g.slug}`}
              className="flex h-full w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm hover:bg-accent transition-colors"
            >
              <span className="min-w-0 truncate break-words [overflow-wrap:anywhere]">{isKo ? g.ko : g.en}</span>
              <span className="text-muted-foreground ml-2 shrink-0">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
