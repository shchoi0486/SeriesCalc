'use client';

import React from 'react';
import CycloneEfficiencyCalculator from '@/components/engineering-calculator/CycloneEfficiencyCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CycloneEfficiencyPageProps {
  infoSection: InfoSection;
}

export default function CycloneEfficiencyPage({ infoSection }: CycloneEfficiencyPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.cycloneEfficiency;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '사이클론 분리기 효율 계산기' : 'Cyclone Separator Calculator')}
      description={t?.description || (ko ? '입구 조건과 물성으로 사이클론의 분리 한계 입경(d₅₀)을 계산합니다.' : 'Calculate the cut size (d₅₀) of a cyclone from inlet conditions and fluid properties.')}
      icon={<span>🌪️</span>}
      visualizationComponent={<></>}
      resultComponent={<CycloneEfficiencyCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
