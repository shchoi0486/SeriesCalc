'use client';

import React from 'react';
import LMTDCalculator from '@/components/engineering-calculator/LMTDCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface LMTDPageProps {
  infoSection: InfoSection;
}

export default function LMTDPage({ infoSection }: LMTDPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.lmtd;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || L('대수평균온도차(LMTD) 계산기', 'LMTD Calculator')}
      description={t?.description || L('열교환기의 대수평균온도차(LMTD)를 계산합니다.', 'Calculate the Logarithmic Mean Temperature Difference for heat exchangers.')}
      icon={<span>🌡️</span>}
      visualizationComponent={<></>}
      resultComponent={<LMTDCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
