'use client';

import React from 'react';
import HeatCapacity from '@/components/engineering-calculator/HeatCapacity';
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
      title={t?.['heat-capacity'] || (ko ? '열용량 계산기' : 'Heat Capacity Calculator')}
      description={t?.['heat-capacity'] || (ko ? '물질의 온도 변화에 필요한 열에너지를 계산합니다' : 'Calculate heat energy for temperature change')}
      icon={<span>🔥</span>}
      visualizationComponent={<></>}
      resultComponent={<HeatCapacity />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
