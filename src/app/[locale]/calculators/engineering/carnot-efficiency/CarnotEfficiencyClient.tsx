'use client';

import React from 'react';
import CarnotEfficiencyCalculator from '@/components/engineering-calculator/CarnotEfficiencyCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CarnotEfficiencyPageProps {
  infoSection: InfoSection;
}

export default function CarnotEfficiencyPage({ infoSection }: CarnotEfficiencyPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.carnotEfficiency;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '카르노 효율 계산기' : 'Carnot Efficiency Calculator')}
      description={t?.description || (ko ? '열기관의 이론적 최대 효율을 계산합니다.' : 'Calculate the maximum theoretical efficiency of a heat engine.')}
      icon={<span>🔥</span>}
      visualizationComponent={<></>}
      resultComponent={<CarnotEfficiencyCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
