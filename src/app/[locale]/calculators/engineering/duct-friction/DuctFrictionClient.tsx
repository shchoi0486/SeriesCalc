'use client';

import React from 'react';
import DuctFrictionCalculator from '@/components/engineering-calculator/DuctFrictionCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface DuctFrictionPageProps {
  infoSection: InfoSection;
}

export default function DuctFrictionPage({ infoSection }: DuctFrictionPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.ductFriction;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '공기 덕트 마찰 계산기' : 'Air Duct Friction Calculator')}
      description={t?.description || (ko ? '직사각형 또는 원형 공기 덕트의 마찰 손실을 계산합니다.' : 'Calculate friction loss in rectangular or circular air ducts.')}
      icon={<span>💨</span>}
      visualizationComponent={<></>}
      resultComponent={<DuctFrictionCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
