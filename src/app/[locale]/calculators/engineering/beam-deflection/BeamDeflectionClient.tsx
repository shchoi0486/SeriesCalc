'use client';

import React from 'react';
import BeamDeflectionCalculator from '@/components/engineering-calculator/BeamDeflectionCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface BeamDeflectionPageProps {
  infoSection: InfoSection;
}

export default function BeamDeflectionPage({ infoSection }: BeamDeflectionPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.beamDeflection;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? '보 처짐 계산기' : 'Beam Deflection Calculator')}
      description={t?.description || (ko ? '외팔보의 최대 처짐을 계산합니다.' : 'Calculate the maximum deflection of a cantilever beam.')}
      icon={<span>🏗️</span>}
      visualizationComponent={<></>}
      resultComponent={<BeamDeflectionCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
