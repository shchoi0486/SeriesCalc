'use client';

import React from 'react';
import Din10220PipeCalculator from '@/components/engineering-calculator/Din10220PipeCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface Din10220PipePageProps {
  infoSection: InfoSection;
}

export default function Din10220PipePage({ infoSection }: Din10220PipePageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.din10220Pipe;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'DIN EN 10220 강관 파열 압력' : 'DIN EN 10220 Steel Tube Burst Pressure')}
      description={t?.description || (ko ? 'DIN EN 10220 치수와 DIN 재질 등급 기준으로 강관의 허용·파열 압력을 계산합니다.' : 'Calculate allowable and burst pressure for seamless/welded steel tubes per DIN EN 10220 dimensions and DIN material grades.')}
      icon={<span>🛡️</span>}
      visualizationComponent={<></>}
      resultComponent={<Din10220PipeCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
