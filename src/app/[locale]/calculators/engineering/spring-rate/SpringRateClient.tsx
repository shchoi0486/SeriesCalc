'use client';

import React from 'react';
import SpringRateCalculator from '@/components/engineering-calculator/SpringRateCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SpringRatePageProps {
  infoSection: InfoSection;
}

export default function SpringRatePage({ infoSection }: SpringRatePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.springRate;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '스프링 상수 계산기' : 'Spring Rate Calculator')}
      description={t?.description || (ko ? '헬리컬 압축 스프링의 스프링 상수(강성)를 계산합니다.' : 'Calculate the spring constant (rate) of a helical compression spring.')}
      icon={<span>⚙️</span>}
      visualizationComponent={<></>}
      resultComponent={<SpringRateCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
