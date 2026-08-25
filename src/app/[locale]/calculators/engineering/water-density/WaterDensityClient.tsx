'use client';

import React from 'react';
import WaterDensity from '@/components/engineering-calculator/WaterDensity';
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
      title={t?.['water-density'] || (ko ? '물 밀도 계산기' : 'Water Density Calculator')}
      description={t?.['water-density'] || (ko ? '온도에 따른 물의 밀도를 계산합니다' : 'Calculate water density as a function of temperature')}
      icon={<span>💧</span>}
      visualizationComponent={<></>}
      resultComponent={<WaterDensity />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
