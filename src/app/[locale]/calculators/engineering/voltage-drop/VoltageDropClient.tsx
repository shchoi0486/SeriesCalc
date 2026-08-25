'use client';

import React from 'react';
import VoltageDropCalculator from '@/components/engineering-calculator/VoltageDropCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface VoltageDropPageProps {
  infoSection: InfoSection;
}

export default function VoltageDropPage({ infoSection }: VoltageDropPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.voltageDrop;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '전압 강하 계산기' : 'Voltage Drop Calculator')}
      description={t?.description || (ko ? '전기 회로의 전압 강하를 계산합니다.' : 'Calculate the voltage drop in an electrical circuit.')}
      icon={<span>⚡</span>}
      visualizationComponent={<></>}
      resultComponent={<VoltageDropCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
