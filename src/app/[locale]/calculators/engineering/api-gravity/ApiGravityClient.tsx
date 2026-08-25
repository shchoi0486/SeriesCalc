'use client';

import React from 'react';
import ApiGravityCalculator from '@/components/engineering-calculator/ApiGravityCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface ApiGravityPageProps {
  infoSection: InfoSection;
}

export default function ApiGravityPage({ infoSection }: ApiGravityPageProps) {
  const { dict, locale } = useI18n();
  const t = dict?.common?.apiGravity;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);

  return (
    <CalculatorLayout
      title={t?.title || (ko ? 'API 비중 계산기' : 'API Gravity Calculator')}
      description={t?.description || (ko ? 'API 비중과 비중(SG) 및 밀도를 상호 변환합니다.' : 'Convert between API Gravity and Specific Gravity.')}
      icon={<span>🛢️</span>}
      visualizationComponent={<></>}
      resultComponent={<ApiGravityCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
