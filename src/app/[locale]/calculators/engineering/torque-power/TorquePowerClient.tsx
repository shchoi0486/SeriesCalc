'use client';

import React from 'react';
import TorquePowerCalculator from '@/components/engineering-calculator/TorquePowerCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface TorquePowerPageProps {
  infoSection: InfoSection;
}

export default function TorquePowerPage({ infoSection }: TorquePowerPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.torquePower;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '토크·동력 계산기' : 'Torque & Power Calculator')}
      description={t?.description || (ko ? '토크와 회전 속도로 기계적 동력을 계산합니다.' : 'Calculate mechanical power from torque.')}
      icon={<span>⚙️</span>}
      visualizationComponent={<></>}
      resultComponent={<TorquePowerCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
