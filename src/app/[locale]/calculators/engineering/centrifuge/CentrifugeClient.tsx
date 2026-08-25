'use client';

import React from 'react';
import CentrifugeCalculator from '@/components/engineering-calculator/CentrifugeCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CentrifugePageProps {
  infoSection: InfoSection;
}

export default function CentrifugePage({ infoSection }: CentrifugePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.centrifuge;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '원심분리기(RCF) 계산기' : 'Centrifuge (RCF) Calculator')}
      description={t?.description || (ko ? '로터 반경과 RPM으로 상대 원심력(g-force)을 계산합니다.' : 'Calculate the Relative Centrifugal Force (g-force) based on rotor radius and RPM.')}
      icon={<span>🔄</span>}
      visualizationComponent={<></>}
      resultComponent={<CentrifugeCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
