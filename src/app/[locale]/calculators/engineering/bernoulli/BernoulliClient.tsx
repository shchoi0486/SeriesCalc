'use client';

import React from 'react';
import BernoulliCalculator from '@/components/engineering-calculator/BernoulliCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface BernoulliPageProps {
  infoSection: InfoSection;
}

export default function BernoulliPage({ infoSection }: BernoulliPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.bernoulli;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '베르누이 방정식 계산기' : 'Bernoulli Equation Calculator')}
      description={t?.description || (ko ? '베르누이 원리로 유체의 유속과 압력을 계산합니다.' : "Calculate fluid flow using Bernoulli's principle.")}
      icon={<span>💧</span>}
      visualizationComponent={<></>}
      resultComponent={<BernoulliCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
