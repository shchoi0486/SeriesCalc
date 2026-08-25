'use client';

import React from 'react';
import SoundPressureCalculator from '@/components/engineering-calculator/SoundPressureCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SoundPressurePageProps {
  infoSection: InfoSection;
}

export default function SoundPressurePage({ infoSection }: SoundPressurePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.soundPressure;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '음압 레벨 거리 계산기' : 'Sound Pressure Level (SPL) Distance Calculator')}
      description={t?.description || (ko ? '거리에 따른 음압 레벨 감쇠를 계산합니다.' : 'Calculate sound attenuation over distance.')}
      icon={<span>🔊</span>}
      visualizationComponent={<></>}
      resultComponent={<SoundPressureCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
