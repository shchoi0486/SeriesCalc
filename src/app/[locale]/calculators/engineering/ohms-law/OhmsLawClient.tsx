'use client';

import React from 'react';
import OhmsLawCalculator from '@/components/engineering-calculator/OhmsLawCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface OhmsLawCalculatorPageProps {
  infoSection: InfoSection;
}

export default function OhmsLawCalculatorPage({ infoSection }: OhmsLawCalculatorPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.ohmsLaw;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || "Ohm's Law Calculator"}
      description={t?.description || "Calculate voltage, current, resistance and power."}
      icon={<span>⚡</span>}
      visualizationComponent={<></>}
      resultComponent={<OhmsLawCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
