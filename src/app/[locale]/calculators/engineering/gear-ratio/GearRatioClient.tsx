'use client';

import React from 'react';
import GearRatioCalculator from '@/components/engineering-calculator/GearRatioCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface GearRatioPageProps {
  infoSection: InfoSection;
}

export default function GearRatioPage({ infoSection }: GearRatioPageProps) {
  const { dict, locale, unitSystem } = useI18n();
  const t = dict?.common?.gearRatio;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);
  const torqueUnit = unitSystem === 'imperial' ? 'lb-ft' : 'N·m';

  return (
    <CalculatorLayout
      title={t?.title || L('기어비 계산기', 'Gear Ratio Calculator')}
      description={t?.description || L('간단한 기어열의 기어비, 출력 속도, 출력 토크를 계산합니다.', 'Calculate the gear ratio, output speed, and output torque of a simple gear train.')}
      icon={<span>⚙️</span>}
      visualizationComponent={<></>}
      resultComponent={<GearRatioCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
