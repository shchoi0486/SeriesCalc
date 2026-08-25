'use client';

import React from 'react';
import BarlowsFormulaCalculator from '@/components/engineering-calculator/BarlowsFormulaCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface BarlowsFormulaPageProps {
  infoSection: InfoSection;
}

export default function BarlowsFormulaPage({ infoSection }: BarlowsFormulaPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.barlowsFormula;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? "Barlow 공식 계산기" : "Barlow's Formula Calculator")}
      description={t?.description || (ko ? '강관의 내압·허용압·파열압을 계산합니다.' : "Calculate the internal, allowable, and ultimate burst pressure of a pipe.")}
      icon={<span>🛢️</span>}
      visualizationComponent={<></>}
      resultComponent={<BarlowsFormulaCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
