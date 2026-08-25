'use client';

import React from 'react';
import OrificeFlowCalculator from '@/components/engineering-calculator/OrificeFlowCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface OrificeFlowPageProps {
  infoSection: InfoSection;
}

export default function OrificeFlowPage({ infoSection }: OrificeFlowPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.orificeFlow;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout 
      title={t?.title || "Orifice Flow Calculator"}
      description={t?.description || "Calculate flow rate using orifice plate."}
      icon={<span>🚰</span>}
      visualizationComponent={<></>}
      resultComponent={<OrificeFlowCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
