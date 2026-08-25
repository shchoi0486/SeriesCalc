'use client';

import React from 'react';
import WaterHammerCalculator from '@/components/engineering-calculator/WaterHammerCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface WaterHammerPageProps {
  infoSection: InfoSection;
}

export default function WaterHammerPage({ infoSection }: WaterHammerPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.waterHammer;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '수격 현상(압력 서지) 계산기' : 'Water Hammer (Pressure Surge) Calculator')}
      description={t?.description || (ko ? '밸브 급폐쇄로 인한 최대 압력 서지를 계산합니다.' : 'Calculate maximum pressure surge from water hammer.')}
      icon={<span>💥</span>}
      visualizationComponent={<></>}
      resultComponent={<WaterHammerCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
