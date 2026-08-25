'use client';

import React from 'react';
import SpecificSpeedCalculator from '@/components/engineering-calculator/SpecificSpeedCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SpecificSpeedPageProps {
  infoSection: InfoSection;
}

export default function SpecificSpeedPage({ infoSection }: SpecificSpeedPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.specificSpeed;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '펌프 비속도 계산기' : 'Pump Specific Speed Calculator')}
      description={t?.description || (ko ? '비속도로 최적 임펠러 형식을 결정합니다.' : 'Determine impeller type based on specific speed.')}
      icon={<span>🌀</span>}
      visualizationComponent={<></>}
      resultComponent={<SpecificSpeedCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
