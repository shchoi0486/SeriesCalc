'use client';

import LocalizedLink from '@/components/LocalizedLink';
import { calculatorCategories } from '@/data/calculators';
import { MoreHorizontal } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const categoryStyle = { color: 'text-gray-600', border: 'border-gray-200 hover:border-gray-400', text: 'text-gray-600' };

export default function CalculatorCategories() {
  const { dict, locale } = useI18n();

  const getCategoryName = (id: string, fallbackName: string) => {
    const cat = dict.categories[id as keyof typeof dict.categories];
    return (cat && typeof cat === 'object' && 'name' in cat) ? cat.name : fallbackName;
  };

  const getCalculatorName = (id: string, fallbackName: string) => {
    const translated = dict.calculatorNames[id as keyof typeof dict.calculatorNames];
    return translated || fallbackName;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {calculatorCategories.map((category) => {
          const style = categoryStyle;
          const allCalculators = category.subcategories.flatMap(
            (subcategory) => subcategory.calculators
          ).filter(calculator => !calculator.locales || calculator.locales.includes(locale));
          const calculatorsToShow = allCalculators.slice(0, 5);
          const placeholdersNeeded = 5 - calculatorsToShow.length;
          const placeholderCalculators = Array.from({ length: placeholdersNeeded }, (_, i) => ({
            id: `placeholder-${category.id}-${i}`,
            name: dict.common.preparing,
            href: '#',
            isPlaceholder: true,
            emoji: '',
          }));

          const itemsToDisplay = [...calculatorsToShow, ...placeholderCalculators];

          return (
            <div key={category.id}>
              <LocalizedLink href={category.href} className="group mb-3 inline-block">
                <h3 className={`text-xl font-bold ${style.color} group-hover:underline`}>
                  {getCategoryName(category.id, category.name)}
                </h3>
              </LocalizedLink>
              <div className="flex flex-col gap-1">
                {itemsToDisplay.map((calculator) =>
                  calculator.isPlaceholder ? (
                    <div
                      key={calculator.id}
                      aria-disabled="true"
                      className="flex items-center gap-2.5 p-2.5 border border-dashed rounded-md border-gray-200 text-gray-400 dark:border-gray-800 cursor-not-allowed min-w-0"
                    >
                      <span className="text-lg leading-none shrink-0">🔜</span>
                      <span className="text-base font-normal truncate min-w-0">{getCalculatorName(calculator.id, calculator.name)}</span>
                    </div>
                  ) : (
                    <LocalizedLink
                      href={calculator.href}
                      key={calculator.id}
                      className={`flex items-center gap-2.5 p-2.5 border rounded-md transition-colors bg-white dark:bg-gray-950 ${style.border} hover:bg-gray-50 dark:hover:bg-gray-900 min-w-0`}
                    >
                      <span className="text-lg leading-none shrink-0">{calculator.emoji}</span>
                      <span className="text-base font-normal text-gray-800 dark:text-gray-200 truncate min-w-0" title={getCalculatorName(calculator.id, calculator.name)}>
                        {getCalculatorName(calculator.id, calculator.name)}
                      </span>
                    </LocalizedLink>
                  )
                )}
                <LocalizedLink
                  href={category.href}
                  className={`flex items-center gap-2.5 p-2.5 border rounded-md transition-colors bg-white dark:bg-gray-950 ${style.border} hover:bg-gray-50 dark:hover:bg-gray-900`}
                >
                  <MoreHorizontal className={`w-5 h-5 ${style.color}`} />
                  <span className="text-base font-normal text-gray-800 dark:text-gray-200">{dict.common.moreTopics}</span>
                </LocalizedLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}