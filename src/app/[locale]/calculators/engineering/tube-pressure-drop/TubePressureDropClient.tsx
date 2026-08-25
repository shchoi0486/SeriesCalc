'use client';

import React from 'react';
import TubePressureDropCalculator from '@/components/engineering-calculator/TubePressureDropCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface TubePressureDropPageProps {
  infoSection: InfoSection;
}

export default function TubePressureDropPage({ infoSection }: TubePressureDropPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.tubePressureDrop;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '튜브 압력 강하 계산기' : 'Tube Pressure Drop Calculator')}
      description={t?.description || (ko ? 'Darcy-Weisbach 식으로 튜브 내 압력 강하를 계산합니다.' : 'Calculate pressure drop in tubes.')}
      icon={<span>💧</span>}
      visualizationComponent={<></>}
      resultComponent={<TubePressureDropCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
