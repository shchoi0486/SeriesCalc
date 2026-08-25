'use client';

import React from 'react';
import FlowRateConverter from '@/components/engineering-calculator/FlowRateConverter';
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
      title={t?.['flow-rate-converter'] || (ko ? '유량 단위 변환기' : 'Flow Rate Unit Converter')}
      description={t?.['flow-rate-converter'] || (ko ? '유량 단위를 상호 변환합니다' : 'Convert between flow rate units')}
      icon={<span>🔄</span>}
      visualizationComponent={<></>}
      resultComponent={<FlowRateConverter />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
