'use client';

import React from 'react';
import MomentOfInertia from '@/components/engineering-calculator/MomentOfInertia';
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
      title={t?.['moment-of-inertia'] || (ko ? '단면 2차 모멘트 계산기' : 'Moment of Inertia Calculator')}
      description={t?.['moment-of-inertia'] || (ko ? '다양한 단면의 2차 모멘트를 계산합니다' : 'Calculate second moment of area for various sections')}
      icon={<span>📐</span>}
      visualizationComponent={<></>}
      resultComponent={<MomentOfInertia />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
