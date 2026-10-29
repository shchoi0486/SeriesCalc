'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { calculatorFaqs } from '@/data/calculatorFaqs';

/**
 * 계산기 페이지 하단 고유 FAQ.
 * infoSection.faq 가 이미 있으면 렌더링하지 않아 중복을 막는다.
 */
export default function CalculatorFaq({ hasOwnFaq }: { hasOwnFaq?: boolean }) {
  const pathname = usePathname() || '';
  const { locale, dict } = useI18n();
  const id = pathname.split('/').filter(Boolean).pop() || '';
  const entry = calculatorFaqs[id];
  if (hasOwnFaq || !entry) return null;

  const items = locale === 'ko' ? entry.ko : entry.en;
  if (!items.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <Card className="mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="w-5 h-5" />
          {dict.calculatorLayout.faq}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4 text-sm">
          {items.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
