'use client';

import React from 'react';
import PipeSizing from '@/components/engineering-calculator/PipeSizing';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CalculatorPageProps {
  infoSection: InfoSection;
}

export default function CalculatorPage({ infoSection }: CalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.calculatorNames;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.['pipe-sizing'] || (ko ? '배관 사이즈 계산기' : 'Pipe Sizing Calculator')}
      description={t?.['pipe-sizing'] || (ko ? '최적의 배관 직경을 결정합니다' : 'Determine optimal pipe diameter')}
      icon={<span>🔧</span>}
      visualizationComponent={<></>}
      resultComponent={<PipeSizing />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
