'use client';

import React from 'react';
import ThermalExpansionCalculator from '@/components/engineering-calculator/ThermalExpansionCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ThermalExpansionPageProps {
  infoSection: InfoSection;
}

export default function ThermalExpansionPage({ infoSection }: ThermalExpansionPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.thermalExpansion;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '선팽창 계산기' : 'Thermal Expansion Calculator')}
      description={t?.description || (ko ? '온도 변화에 따른 재료의 선팽창을 계산합니다.' : 'Calculate the linear thermal expansion of a material due to temperature changes.')}
      icon={<span>🔥</span>}
      visualizationComponent={<></>}
      resultComponent={<ThermalExpansionCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
