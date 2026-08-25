'use client';

import React from 'react';
import AsmeB313Calculator from '@/components/engineering-calculator/AsmeB313Calculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface AsmeB313PageProps {
  infoSection: InfoSection;
}

export default function AsmeB313Page({ infoSection }: AsmeB313PageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.asmeB313;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'ASME B31.3 배관 계산기' : 'ASME B31.3 Pipe Calculator')}
      description={t?.description || (ko ? 'ASME B31.3 코드 기반으로 배관의 허용 압력 또는 필요 벽 두께를 계산합니다.' : 'Calculate allowable pressure or required wall thickness of a pipe.')}
      icon={<span>🔧</span>}
      visualizationComponent={<></>}
      resultComponent={<AsmeB313Calculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
