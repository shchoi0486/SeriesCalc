'use client';

import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { formatNumber } from '@/utils/formatNumber';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PropertyTaxCalculatorProps {
  infoSection: InfoSection;
}

const PropertyTaxCalculator = ({ infoSection }: PropertyTaxCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const [assessedValue, setAssessedValue] = useState<number>(800000000);
  const [numHouses, setNumHouses] = useState<string>('1');
  const [fairValueRatio, setFairValueRatio] = useState<number>(70);
  const [results, setResults] = useState<{
    fairValue: number;
    taxBase: number;
    propertyTax: number;
  } | null>(null);

  const calculationResults = useMemo(() => {
    const P = assessedValue;
    const ratio = fairValueRatio / 100;
    const houses = parseInt(numHouses);

    if (isNaN(P) || P <= 0 || isNaN(ratio) || ratio <= 0 || ratio > 1 || isNaN(houses)) {
      return null;
    }

    const fairValue = P * ratio;

    let deduction: number;
    switch (houses) {
      case 1:
        deduction = 600000000;
        break;
      case 2:
        deduction = 900000000;
        break;
      case 3:
      default:
        deduction = 1200000000;
        break;
    }

    const taxBase = Math.max(0, fairValue - deduction);

    const taxBrackets = [
      { limit: 120000000, rate: 0.005 },
      { limit: 480000000, rate: 0.0075 },
      { limit: 880000000, rate: 0.01 },
      { limit: 1500000000, rate: 0.015 },
      { limit: 3000000000, rate: 0.025 },
      { limit: 5000000000, rate: 0.035 },
      { limit: Infinity, rate: 0.045 },
    ];

    let propertyTax = 0;
    let remainingBase = taxBase;
    let prevLimit = 0;

    for (const bracket of taxBrackets) {
      if (remainingBase <= 0) break;

      const bracketSize = bracket.limit - prevLimit;
      const taxableInBracket = Math.min(remainingBase, bracketSize);
      propertyTax += taxableInBracket * bracket.rate;
      remainingBase -= taxableInBracket;
      prevLimit = bracket.limit;
    }

    return { fairValue, taxBase, propertyTax: Math.round(propertyTax) };
  }, [assessedValue, numHouses, fairValueRatio]);

  const handleCalculate = () => {
    if (calculationResults) {
      setResults(calculationResults);
      toast.success(isKo ? '계산이 완료되었습니다.' : 'Calculation complete.');
    } else {
      toast.error(isKo ? '입력값을 확인해주세요.' : 'Please check your input.');
    }
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="assessedValue">{isKo ? '공시가격 (원)' : 'Official Assessed Price (KRW)'}</Label>
        <Input
          id="assessedValue"
          value={assessedValue.toLocaleString()}
          onChange={(e) => setAssessedValue(parseFloat(e.target.value.replace(/,/g, '')))}
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="numHouses">{isKo ? '주택 수' : 'Number of Houses'}</Label>
        <Select value={numHouses} onValueChange={setNumHouses}>
          <SelectTrigger id="numHouses">
            <SelectValue placeholder={isKo ? '주택 수 선택' : 'Select number of houses'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{isKo ? '1주택' : '1 House'}</SelectItem>
            <SelectItem value="2">{isKo ? '2주택' : '2 Houses'}</SelectItem>
            <SelectItem value="3">{isKo ? '3주택 이상' : '3+ Houses'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fairValueRatio">{isKo ? '공정가액비율 (%)' : 'Fair Value Ratio (%)'}</Label>
        <Input
          id="fairValueRatio"
          value={fairValueRatio}
          onChange={(e) => setFairValueRatio(parseFloat(e.target.value))}
          className="text-right"
          type="number"
          step="1"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = (
    <>
      {results ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium">{isKo ? '공정가액' : 'Fair Value'}</div>
            <div className="text-right">{formatNumber(Math.round(results.fairValue))}{isKo ? '원' : ' KRW'}</div>
            <div className="font-medium">{isKo ? '과세표준' : 'Tax Base'}</div>
            <div className="text-right">{formatNumber(Math.round(results.taxBase))}{isKo ? '원' : ' KRW'}</div>
            <div className="font-medium">{isKo ? '부동산세' : 'Property Tax'}</div>
            <div className="text-right font-bold text-red-600">{formatNumber(results.propertyTax)}{isKo ? '원' : ' KRW'}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {isKo ? '입력 후 계산하기 버튼을 눌러주세요.' : 'Please enter values and click Calculate.'}
        </div>
      )}
    </>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '부동산세 계산기' : 'Property Tax Calculator'}
      description={isKo ? '공시가격, 주택 수, 공정가액비율을 입력하여 부동산세를 계산합니다.' : 'Calculate property tax by entering the official price, number of houses, and fair-value ratio.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default PropertyTaxCalculator;
