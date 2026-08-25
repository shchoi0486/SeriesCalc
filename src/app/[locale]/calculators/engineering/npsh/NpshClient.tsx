'use client';

import React from 'react';
import NPSHCalculator from '@/components/engineering-calculator/NPSHCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface NPSHCalculatorPageProps {
  infoSection: InfoSection;
}

export default function NPSHCalculatorPage({ infoSection }: NPSHCalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict.npshCalculator;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t.title}
      description={t.description}
      icon={<span>💧</span>}
      visualizationComponent={<></>}
      resultComponent={<NPSHCalculator dict={t} />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
