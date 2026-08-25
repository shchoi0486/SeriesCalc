'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber, parseNumber } from '@/utils/formatNumber';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface InflationCalculatorProps {
  infoSection: InfoSection;
}

export default function InflationCalculator({ infoSection }: InflationCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const currencySymbol = isKo ? '₩' : '$';

  const [pastAmount, setPastAmount] = useState('10000');
  const [pastIndex, setPastIndex] = useState('85');
  const [currentIndex, setCurrentIndex] = useState('110');
  const [years, setYears] = useState('5');
  const [result, setResult] = useState<{
    currentEquivalent: number;
    purchasingPowerLoss: number;
    purchasingPowerLossPercent: number;
    annualInflationRate: number;
    multiplier: number;
  } | null>(null);

  const handleCalculate = () => {
    const amount = parseNumber(pastAmount);
    const pIdx = parseNumber(pastIndex);
    const cIdx = parseNumber(currentIndex);
    const n = parseInt(years, 10) || 1;

    if (pIdx <= 0 || cIdx <= 0 || n <= 0) return;

    const currentEquivalent = amount * (cIdx / pIdx);
    const purchasingPowerLoss = currentEquivalent - amount;
    const purchasingPowerLossPercent = ((cIdx - pIdx) / pIdx) * 100;
    const annualInflationRate = (Math.pow(cIdx / pIdx, 1 / n) - 1) * 100;
    const multiplier = cIdx / pIdx;

    setResult({
      currentEquivalent,
      purchasingPowerLoss,
      purchasingPowerLossPercent,
      annualInflationRate,
      multiplier,
    });
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pastAmount">{isKo ? `과거 금액 (${currencySymbol})` : `Past Amount (${currencySymbol})`}</Label>
        <Input
          id="pastAmount"
          value={pastAmount}
          onChange={(e) => setPastAmount(e.target.value)}
          placeholder="10000"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pastIndex">{isKo ? '과거 연도 물가지수' : 'Past Year Price Index'}</Label>
        <Input
          id="pastIndex"
          value={pastIndex}
          onChange={(e) => setPastIndex(e.target.value)}
          placeholder="85"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentIndex">{isKo ? '현재 연도 물가지수' : 'Current Year Price Index'}</Label>
        <Input
          id="currentIndex"
          value={currentIndex}
          onChange={(e) => setCurrentIndex(e.target.value)}
          placeholder="110"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="years">{isKo ? '경과 연수' : 'Years Elapsed'}</Label>
        <Input
          id="years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="5"
          className="text-right"
          type="number"
          min="1"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = result ? (
    <Card>
      <CardHeader>
        <CardTitle>{isKo ? '물가상승률 결과' : 'Inflation Result'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground">{isKo ? '현재 동일 구매력 금액' : 'Equivalent Purchasing Power'}</p>
          <p className="text-3xl font-bold text-primary">{currencySymbol}{formatNumber(Math.round(result.currentEquivalent))}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '구매력 변화' : 'Purchasing Power Change'}</span>
          <span className="font-bold text-destructive">+{result.purchasingPowerLossPercent.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '연평균 물가상승률' : 'Avg Annual Inflation'}</span>
          <span className="font-semibold">{result.annualInflationRate.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '물가 배율' : 'Price Multiplier'}</span>
          <span className="font-semibold">{result.multiplier.toFixed(4)}x</span>
        </div>
        <div className="p-3 bg-muted rounded-lg text-sm text-center">
          {isKo
            ? `예전 ${currencySymbol}${formatNumber(parseNumber(pastAmount))}의 구매력은 현재 약 ${currencySymbol}${formatNumber(Math.round(result.currentEquivalent))}와 동일합니다.`
            : `The purchasing power of ${currencySymbol}${formatNumber(parseNumber(pastAmount))} in the past is equivalent to about ${currencySymbol}${formatNumber(Math.round(result.currentEquivalent))} today.`
          }
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center h-40 text-muted-foreground">
      {isKo ? '정보 입력 후 계산하기 버튼을 눌러주세요.' : 'Enter values and click Calculate.'}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '물가상승률 계산기' : 'Inflation Calculator'}
      description={isKo ? '과거 금액의 현재 구매력과 연평균 물가상승률을 계산합니다.' : 'Calculate the current purchasing power of past amounts and average annual inflation.'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
