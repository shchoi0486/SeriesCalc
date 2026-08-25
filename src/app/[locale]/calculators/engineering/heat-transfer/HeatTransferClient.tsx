'use client';

import React from 'react';
import HeatTransferCalculator from '@/components/engineering-calculator/HeatTransferCalculator';
import CalculatorLayout from '@/components/engineering-calculator/CalculatorLayout';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface HeatTransferPageProps {
  infoSection: InfoSection;
}

export default function HeatTransferPage({ infoSection }: HeatTransferPageProps) {
  const { dict, locale, unitSystem } = useI18n();
  const t = dict?.common?.heatTransfer;
  const ko = locale === 'ko';
  const L = (koText: string, enText: string) => (ko ? koText : enText);
  const imperial = unitSystem === 'imperial';
  const kUnit = imperial ? 'BTU/(hr·ft·°F)' : 'W/(m·K)';
  const aUnit = imperial ? 'ft²' : 'm²';
  const dUnit = imperial ? 'in' : 'm';
  const qUnit = imperial ? 'BTU/hr' : 'W';
  const tUnit = imperial ? '°F' : '°C';

  return (
    <CalculatorLayout
      title={t?.title || L('열전도 계산기', 'Heat Conduction Calculator')}
      description={t?.description || L('재료를 통과하는 열전달률을 계산합니다.', 'Calculate the rate of heat transfer through a material.')}
      icon={<span>🌡️</span>}
      visualizationComponent={<></>}
      resultComponent={<HeatTransferCalculator />}
      infoSection={infoSection}
    >
      <></>
    </CalculatorLayout>
  );
}
