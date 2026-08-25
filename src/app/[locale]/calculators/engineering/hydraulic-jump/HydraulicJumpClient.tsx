'use client';

import React from 'react';
import HydraulicJumpCalculator from '@/components/engineering-calculator/HydraulicJumpCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface HydraulicJumpPageProps {
  infoSection: InfoSection;
}

export default function HydraulicJumpPage({ infoSection }: HydraulicJumpPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.hydraulicJump;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || L('수력 도약 계산기', 'Hydraulic Jump Calculator')}
      description={t?.description || L('개수로 수력 도약의 도약 후 수심과 에너지 손실을 계산합니다.', 'Calculate sequent depth and energy loss in an open channel hydraulic jump.')}
      icon={<span>🌊</span>}
      visualizationComponent={<></>}
      resultComponent={<HydraulicJumpCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
