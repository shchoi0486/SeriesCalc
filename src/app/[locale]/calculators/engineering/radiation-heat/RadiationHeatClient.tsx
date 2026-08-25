'use client';

import React from 'react';
import RadiationHeatCalculator from '@/components/engineering-calculator/RadiationHeatCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface RadiationHeatPageProps {
  infoSection: InfoSection;
}

export default function RadiationHeatPage({ infoSection }: RadiationHeatPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.radiationHeat;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '복사 열전달 계산기' : 'Radiation Heat Calculator')}
      description={t?.description || (ko ? '슈테판-볼츠만 법칙으로 물체와 주위 사이의 순 복사 열전달량을 계산합니다.' : 'Calculate the net radiation heat transfer between an object and its surroundings using the Stefan-Boltzmann Law.')}
      icon={<span>☀️</span>}
      visualizationComponent={<></>}
      resultComponent={<RadiationHeatCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
