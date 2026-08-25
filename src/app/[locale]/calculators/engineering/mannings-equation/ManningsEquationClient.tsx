'use client';

import React from 'react';
import ManningsEquationCalculator from '@/components/engineering-calculator/ManningsEquationCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ManningsEquationPageProps {
  infoSection: InfoSection;
}

export default function ManningsEquationPage({ infoSection }: ManningsEquationPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.manningsEquation;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout 
      title={t?.title || "Manning's Equation Calculator"}
      description={t?.description || "Calculate open channel flow using Manning's formula."}
      icon={<span>🌊</span>}
      visualizationComponent={<></>}
      resultComponent={<ManningsEquationCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
