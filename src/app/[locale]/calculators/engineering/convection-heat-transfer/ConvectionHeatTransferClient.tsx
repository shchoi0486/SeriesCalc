'use client';

import React from 'react';
import ConvectionHeatTransfer from '@/components/engineering-calculator/ConvectionHeatTransfer';
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
      title={t?.['convection-heat-transfer'] || (ko ? '대류 열전달 계수 계산기' : 'Convection Heat Transfer Calculator')}
      description={t?.['convection-heat-transfer'] || (ko ? '대류 열전달 계수를 계산합니다' : 'Calculate convection heat transfer coefficient')}
      icon={<span>🔥</span>}
      visualizationComponent={<></>}
      resultComponent={<ConvectionHeatTransfer />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
