'use client';

import React from 'react';
import Iso2533AtmosphereCalculator from '@/components/engineering-calculator/Iso2533AtmosphereCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface Iso2533AtmospherePageProps {
  infoSection: InfoSection;
}

export default function Iso2533AtmospherePage({ infoSection }: Iso2533AtmospherePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.iso2533Atmosphere;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || L('ISO 2533 표준 대기', 'ISO 2533 Standard Atmosphere')}
      description={t?.description || L('ISO 2533 표준 모델로 고도별 대기 물성을 계산합니다.', 'Calculate atmospheric properties at various altitudes based on the ISO 2533 standard model.')}
      icon={<span>☁️</span>}
      visualizationComponent={<></>}
      resultComponent={<Iso2533AtmosphereCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
