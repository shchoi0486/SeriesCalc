'use client';

import React from 'react';
import SensibleHeatCalculator from '@/components/engineering-calculator/SensibleHeatCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SensibleHeatPageProps {
  infoSection: InfoSection;
}

export default function SensibleHeatPage({ infoSection }: SensibleHeatPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.sensibleHeat;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '현열 계산기' : 'Sensible Heat Calculator')}
      description={t?.description || (ko ? '온도 변화에 필요한 현열 부하를 계산합니다.' : 'Calculate the sensible heat load required to change temperature.')}
      icon={<span>❄️</span>}
      visualizationComponent={<></>}
      resultComponent={<SensibleHeatCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
