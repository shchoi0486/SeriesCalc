'use client';

import React from 'react';
import WireGauge from '@/components/engineering-calculator/WireGauge';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CalculatorPageProps {
  infoSection: InfoSection;
}

export default function CalculatorPage({ infoSection }: CalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.calculatorNames;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.['wire-gauge'] || (ko ? '와이어 게이지 계산기' : 'Wire Gauge (AWG) Calculator')}
      description={t?.['wire-gauge'] || (ko ? 'AWG 와이어 게이지 치수 및 저항을 조회합니다' : 'Look up AWG wire dimensions and resistance')}
      icon={<span>⚡</span>}
      visualizationComponent={<></>}
      resultComponent={<WireGauge />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
