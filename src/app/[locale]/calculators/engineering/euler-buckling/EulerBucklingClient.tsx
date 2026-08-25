'use client';

import React from 'react';
import EulerBucklingCalculator from '@/components/engineering-calculator/EulerBucklingCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface EulerBucklingPageProps {
  infoSection: InfoSection;
}

export default function EulerBucklingPage({ infoSection }: EulerBucklingPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.eulerBuckling;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '오일러 좌굴 하중 계산기' : 'Euler Buckling Load Calculator')}
      description={t?.description || (ko ? '오일러 공식으로 기둥의 임계 좌굴 하중을 계산합니다.' : "Calculate the critical buckling load of a column using Euler's formula.")}
      icon={<span>🏛️</span>}
      visualizationComponent={<></>}
      resultComponent={<EulerBucklingCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
