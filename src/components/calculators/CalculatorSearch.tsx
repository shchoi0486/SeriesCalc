'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Adsense from "@/components/ads/Adsense";
import { useI18n } from '@/i18n/I18nProvider';

// 쉼표 뒤에서 줄바꿈되도록: 쉼표 앞은 그대로, 뒤 문구는 한 줄로 묶는다.
function renderTitle(title: string) {
  const idx = title.indexOf(',');
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx + 1)}
      {' '}
      <span className="whitespace-nowrap">{title.slice(idx + 1).trim()}</span>
    </>
  );
}

export default function CalculatorSearch() {
  const { dict } = useI18n();

  return (
    <section className="container mx-auto py-6 md:py-8 lg:py-8 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
              {renderTitle(dict.home.title)}
            </h1>
            <p className="mx-auto text-gray-600 md:text-lg dark:text-gray-400">
              {dict.home.subtitle}
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <Adsense />
          </div>
        </div>
      </div>
    </section>
  );
}