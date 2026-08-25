'use client';

import React from 'react';
import FreeFallCalculator from '@/components/engineering-calculator/FreeFallCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface FreeFallCalculatorPageProps {
  infoSection: InfoSection;
}

export default function FreeFallCalculatorPage({ infoSection }: FreeFallCalculatorPageProps) {
  const { dict, locale, unitSystem } = useI18n();
  const t = dict?.freeFall;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);
  const imperial = unitSystem === 'imperial';
  const velUnit = imperial ? 'ft/s' : 'm/s';
  const lenUnit = imperial ? 'ft' : 'm';
  const gVal = imperial ? '32.174 ft/s²' : '9.80665 m/s²';

  return (
    <CalculatorLayout
      title={t?.title || L('자유 낙하 계산기', 'Free Fall Calculator')}
      description={t?.description || L('초기 속도와 낙하 시간으로 최종 속도와 이동 거리를 계산합니다.', 'Calculate final velocity and distance from initial velocity and fall time.')}
      icon={<span>🍎</span>}
      visualizationComponent={<></>}
      resultComponent={<FreeFallCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
