'use client';

import React from 'react';
import StressStrainCalculator from '@/components/engineering-calculator/StressStrainCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface StressStrainPageProps {
  infoSection: InfoSection;
}

export default function StressStrainPage({ infoSection }: StressStrainPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.stressStrain;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '응력·변형률 계산기' : 'Stress & Strain Calculator')}
      description={t?.description || (ko ? '축 하중을 받는 재료의 응력, 변형률, 영률을 계산합니다.' : 'Calculate stress, strain, and Young\'s modulus of a material under axial load.')}
      icon={<span>🏗️</span>}
      visualizationComponent={<></>}
      resultComponent={<StressStrainCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
