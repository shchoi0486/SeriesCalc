'use client';

import React from 'react';
import ReynoldsNumberCalculator from '@/components/engineering-calculator/ReynoldsNumberCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ReynoldsNumberPageProps {
  infoSection: InfoSection;
}

export default function ReynoldsNumberPage({ infoSection }: ReynoldsNumberPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.reynoldsNumber;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '레이놀즈 수 계산기' : 'Reynolds Number Calculator')}
      description={t?.description || (ko ? '레이놀즈 수를 계산해 유동이 층류·천이·난류 중 어느 것인지 판별합니다.' : 'Calculate the Reynolds number to determine whether a fluid flow is laminar, transient, or turbulent.')}
      icon={<span>🌊</span>}
      visualizationComponent={<></>}
      resultComponent={<ReynoldsNumberCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
