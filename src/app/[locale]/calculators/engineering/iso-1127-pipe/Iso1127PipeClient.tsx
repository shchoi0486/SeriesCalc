'use client';

import React from 'react';
import Iso1127PipeCalculator from '@/components/engineering-calculator/Iso1127PipeCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface Iso1127PipePageProps {
  infoSection: InfoSection;
}

export default function Iso1127PipePage({ infoSection }: Iso1127PipePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.iso1127Pipe;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || L('ISO 1127 스테인리스강 튜브', 'ISO 1127 Stainless Steel Tube')}
      description={t?.description || L('ISO 1127 규격에 따라 스테인리스강 튜브의 무게와 치수를 계산합니다.', 'Calculate weight and dimensions of stainless steel tubes according to ISO 1127.')}
      icon={<span>⭕</span>}
      visualizationComponent={<></>}
      resultComponent={<Iso1127PipeCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
