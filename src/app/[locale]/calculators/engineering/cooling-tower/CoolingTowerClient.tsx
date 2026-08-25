'use client';

import React from 'react';
import CoolingTowerCalculator from '@/components/engineering-calculator/CoolingTowerCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CoolingTowerPageProps {
  infoSection: InfoSection;
}

export default function CoolingTowerPage({ infoSection }: CoolingTowerPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.coolingTower;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '냉각탑 설계 계산기' : 'Cooling Tower Design Calculator')}
      description={t?.description || (ko ? '냉각탑의 레인지, 어프로치, 효율을 계산합니다.' : 'Calculate cooling tower Range, Approach, and Effectiveness.')}
      icon={<span>🏭</span>}
      visualizationComponent={<></>}
      resultComponent={<CoolingTowerCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
