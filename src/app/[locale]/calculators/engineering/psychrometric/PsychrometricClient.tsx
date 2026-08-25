'use client';

import React from 'react';
import PsychrometricCalculator from '@/components/engineering-calculator/PsychrometricCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PsychrometricPageProps {
  infoSection: InfoSection;
}

export default function PsychrometricPage({ infoSection }: PsychrometricPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.psychrometric;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout 
      title={t?.title || "Psychrometric Calculator"}
      description={t?.description || "Calculate air properties and states."}
      icon={<span>☁️</span>}
      visualizationComponent={<></>}
      resultComponent={<PsychrometricCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
