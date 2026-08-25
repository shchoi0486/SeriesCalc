'use client';

import React from 'react';
import AcPowerCalculator from '@/components/engineering-calculator/AcPowerCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface AcPowerPageProps {
  infoSection: InfoSection;
}

export default function AcPowerPage({ infoSection }: AcPowerPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.acPower;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '교류 전력 계산기' : 'AC Power Calculator')}
      description={t?.description || (ko ? '교류 회로의 유효·무효·피상 전력과 역률을 계산합니다.' : 'Calculate Real, Reactive, and Apparent Power in AC circuits.')}
      icon={<span>🔌</span>}
      visualizationComponent={<></>}
      resultComponent={<AcPowerCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
