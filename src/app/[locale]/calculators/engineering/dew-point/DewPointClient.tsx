'use client';

import React from 'react';
import DewPoint from '@/components/engineering-calculator/DewPoint';
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
      title={t?.['dew-point'] || (ko ? '이슬점 계산기' : 'Dew Point Calculator')}
      description={t?.['dew-point'] || (ko ? '이슬점, 습구 온도 및 절대 습도를 계산합니다' : 'Calculate dew point, wet bulb, absolute humidity')}
      icon={<span>🌡️</span>}
      visualizationComponent={<></>}
      resultComponent={<DewPoint />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
