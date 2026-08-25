'use client';

import React from 'react';
import UValueCalculator from '@/components/engineering-calculator/UValueCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface UValuePageProps {
  infoSection: InfoSection;
}

export default function UValuePage({ infoSection }: UValuePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.uValue;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '열관류율(U-Value) 계산기' : 'Thermal Transmittance (U-Value) Calculator')}
      description={t?.description || (ko ? '다층 벽의 열관류율과 열저항을 계산합니다.' : 'Calculate U-Value and thermal resistance.')}
      icon={<span>🧱</span>}
      visualizationComponent={<></>}
      resultComponent={<UValueCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
