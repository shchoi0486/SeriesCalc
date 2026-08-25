'use client';

import React from 'react';
import SpecificGravity from '@/components/engineering-calculator/SpecificGravity';
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
      title={t?.['specific-gravity'] || (ko ? '비중 계산기' : 'Specific Gravity Calculator')}
      description={t?.['specific-gravity'] || (ko ? '물 대비 특정 물질의 비중을 계산합니다' : 'Calculate specific gravity relative to water')}
      icon={<span>⚖️</span>}
      visualizationComponent={<></>}
      resultComponent={<SpecificGravity />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
