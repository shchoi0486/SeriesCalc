'use client';

import React from 'react';
import PumpPowerCalculator from '@/components/engineering-calculator/PumpPowerCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PumpPowerCalculatorPageProps {
  infoSection: InfoSection;
}

export default function PumpPowerCalculatorPage({ infoSection }: PumpPowerCalculatorPageProps) {
  const { dict, unitSystem, locale } = useI18n();
  const t = dict.pumpPower;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t.title}
      description={t.description}
      icon={<span>⚡</span>}
      visualizationComponent={<></>}
      resultComponent={<PumpPowerCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
