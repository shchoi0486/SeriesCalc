'use client';

import React from 'react';
import BearingLifeCalculator from '@/components/engineering-calculator/BearingLifeCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface BearingLifePageProps {
  infoSection: InfoSection;
}

export default function BearingLifePage({ infoSection }: BearingLifePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.bearingLife;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '베어링 수명(L10) 계산기' : 'Bearing Life (L10) Calculator')}
      description={t?.description || (ko ? 'ISO 281 기준 구름 베어링의 기본 정격 수명을 계산합니다.' : 'Calculate ISO 281 basic rating life for bearings.')}
      icon={<span>⚙️</span>}
      visualizationComponent={<></>}
      resultComponent={<BearingLifeCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
