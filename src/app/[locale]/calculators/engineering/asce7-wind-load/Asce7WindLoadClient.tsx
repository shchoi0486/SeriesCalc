'use client';

import React from 'react';
import Asce7WindLoadCalculator from '@/components/engineering-calculator/Asce7WindLoadCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface Asce7WindLoadPageProps {
  infoSection: InfoSection;
}

export default function Asce7WindLoadPage({ infoSection }: Asce7WindLoadPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.asce7WindLoad;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'ASCE 7-16 풍하중 계산기' : 'ASCE 7-16 Wind Load Calculator')}
      description={t?.description || (ko ? 'ASCE 7-16 기준의 속도압(풍하중)을 계산합니다.' : 'Calculate velocity pressure based on ASCE 7-16 standard for structural wind load design.')}
      icon={<span>🌪️</span>}
      visualizationComponent={<></>}
      resultComponent={<Asce7WindLoadCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
