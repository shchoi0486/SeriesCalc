'use client';

import React from 'react';
import PipeFrictionCalculator from '@/components/engineering-calculator/PipeFrictionCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PipeFrictionPageProps {
  infoSection: InfoSection;
}

export default function PipeFrictionPage({ infoSection }: PipeFrictionPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.pipeFriction;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout 
      title={t?.title || "Pipe Friction Loss Calculator"}
      description={t?.description || "Calculate the head loss and pressure loss due to friction in a pipe."}
      icon={<span>💧</span>}
      visualizationComponent={<></>}
      resultComponent={<PipeFrictionCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
