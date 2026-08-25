'use client';

import React from 'react';
import PumpAffinityCalculator from '@/components/engineering-calculator/PumpAffinityCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PumpAffinityPageProps {
  infoSection: InfoSection;
}

export default function PumpAffinityPage({ infoSection }: PumpAffinityPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.pumpAffinity;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '펌프 상사법칙 계산기' : 'Pump Affinity Laws Calculator')}
      description={t?.description || (ko ? '회전수 변화에 따른 펌프 성능 변화를 계산합니다.' : "Calculate pump performance changes using affinity laws.")}
      icon={<span>🔄</span>}
      visualizationComponent={<></>}
      resultComponent={<PumpAffinityCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
