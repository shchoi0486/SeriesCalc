'use client';

import React from 'react';
import AsmeSectionViiiCalculator from '@/components/engineering-calculator/AsmeSectionViiiCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface AsmeSectionViiiPageProps {
  infoSection: InfoSection;
}

export default function AsmeSectionViiiPage({ infoSection }: AsmeSectionViiiPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.asmeSectionViii;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'ASME Section VIII 압력용기 계산기' : 'ASME Section VIII Vessel Calculator')}
      description={t?.description || (ko ? '압력용기의 필요 벽 두께를 계산합니다.' : 'Calculate the required thickness for pressure vessels.')}
      icon={<span>🛡️</span>}
      visualizationComponent={<></>}
      resultComponent={<AsmeSectionViiiCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
