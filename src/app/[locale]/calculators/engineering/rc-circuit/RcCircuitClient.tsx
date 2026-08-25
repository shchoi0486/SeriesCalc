'use client';

import React from 'react';
import RcCircuitCalculator from '@/components/engineering-calculator/RcCircuitCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface RcCircuitPageProps {
  infoSection: InfoSection;
}

export default function RcCircuitPage({ infoSection }: RcCircuitPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.rcCircuit;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'RC 회로 계산기' : 'RC Circuit Calculator')}
      description={t?.description || (ko ? 'RC 회로의 시정수와 충전 특성을 계산합니다.' : 'Calculate RC circuit time constant and charging characteristics.')}
      icon={<span>⚡</span>}
      visualizationComponent={<></>}
      resultComponent={<RcCircuitCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
