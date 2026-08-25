'use client';

import React from 'react';
import TankCalculator from '@/components/engineering-calculator/TankCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface TankCalculatorPageProps {
  infoSection: InfoSection;
}

export default function TankCalculatorPage({ infoSection }: TankCalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict.tankCalculator;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t.title}
      description={t.description}
      icon={<span>🛢️</span>}
      visualizationComponent={<></>}
      resultComponent={<TankCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
