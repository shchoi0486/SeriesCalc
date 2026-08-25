'use client';

import React from 'react';
import Api650TankCalculator from '@/components/engineering-calculator/Api650TankCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface Api650TankPageProps {
  infoSection: InfoSection;
}

export default function Api650TankPage({ infoSection }: Api650TankPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.api650Tank;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'API 650 탱크 두께 계산기' : 'API 650 Tank Thickness Calculator')}
      description={t?.description || (ko ? "API 650에 따른 육상 강재 저장탱크의 최소 shell 두께를 계산합니다." : "Calculate the minimum required shell thickness for welded steel storage tanks per API 650.")}
      icon={<span>🏭</span>}
      visualizationComponent={<></>}
      resultComponent={<Api650TankCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
