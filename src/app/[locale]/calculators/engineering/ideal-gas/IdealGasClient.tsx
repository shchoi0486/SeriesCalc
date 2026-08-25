'use client';

import React from 'react';
import IdealGasCalculator from '@/components/engineering-calculator/IdealGasCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface IdealGasCalculatorPageProps {
  infoSection: InfoSection;
}

export default function IdealGasCalculatorPage({ infoSection }: IdealGasCalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.idealGas;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || L('이상기체 법칙 계산기', 'Ideal Gas Law Calculator')}
      description={t?.description || L('압력, 부피, 몰수, 온도의 관계를 이상기체 법칙으로 계산합니다.', 'Solve for pressure, volume, moles, or temperature using the ideal gas law.')}
      icon={<span>🧪</span>}
      visualizationComponent={<></>}
      resultComponent={<IdealGasCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
