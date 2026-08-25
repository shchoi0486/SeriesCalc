'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { formatNumber, parseNumber } from '@/utils/formatNumber';

const INCOME_TAX_BRACKETS: { max: number; rate: number; deduction: number }[] = [
  { max: 14000000, rate: 0.06, deduction: 0 },
  { max: 50000000, rate: 0.15, deduction: 1260000 },
  { max: 88000000, rate: 0.24, deduction: 5760000 },
  { max: 150000000, rate: 0.35, deduction: 14960000 },
  { max: 300000000, rate: 0.38, deduction: 19460000 },
  { max: 500000000, rate: 0.40, deduction: 25460000 },
  { max: 1000000000, rate: 0.42, deduction: 35460000 },
  { max: Infinity, rate: 0.45, deduction: 65460000 },
];

function estimateAfterTaxMonthly(annualSalary: number): number {
  const bracket = INCOME_TAX_BRACKETS.find((b) => annualSalary <= b.max);
  if (!bracket) return 0;
  const annualTax = Math.max(0, annualSalary * bracket.rate - bracket.deduction);
  const localTax = annualTax * 0.1;
  const monthlyTax = (annualTax + localTax) / 12;
  return (annualSalary / 12) - monthlyTax;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SalaryConverterCalculatorProps {
  infoSection: InfoSection;
}

export default function SalaryConverterCalculator({ infoSection }: SalaryConverterCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const [mode, setMode] = useState<'annual' | 'monthly'>('annual');
  const [inputValue, setInputValue] = useState('5000');
  const [result, setResult] = useState<{
    annual: number;
    monthly: number;
    monthlyAfterTax: number;
    netEstimate: number;
  } | null>(null);

  const handleCalculate = () => {
    const val = parseNumber(inputValue) * 10000;
    let annual: number;
    let monthly: number;

    if (mode === 'annual') {
      annual = val;
      monthly = val / 12;
    } else {
      monthly = val;
      annual = val * 12;
    }

    const monthlyAfterTax = estimateAfterTaxMonthly(annual);
    const annualTax = (() => {
      const bracket = INCOME_TAX_BRACKETS.find((b) => annual <= b.max);
      if (!bracket) return 0;
      return Math.max(0, annual * bracket.rate - bracket.deduction);
    })();
    const totalTax = annualTax + annualTax * 0.1;
    const monthlyInsurance = (monthly * 0.045) + (monthly * 0.03545) + (monthly * 0.03545 * 0.1281) + (monthly * 0.009);
    const netEstimate = monthly - monthlyInsurance - (totalTax / 12);

    setResult({ annual, monthly, monthlyAfterTax, netEstimate });
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{isKo ? '입력 단위' : 'Input Unit'}</Label>
        <ToggleGroup type="single" value={mode} onValueChange={(v: 'annual' | 'monthly') => { if (v) setMode(v); }} className="w-full">
          <ToggleGroupItem value="annual" className="flex-1">{isKo ? '연봉 (만원)' : 'Annual Salary (10K)'}</ToggleGroupItem>
          <ToggleGroupItem value="monthly" className="flex-1">{isKo ? '월급 (만원)' : 'Monthly Salary (10K)'}</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2">
        <Label htmlFor="inputValue">{mode === 'annual' ? (isKo ? '연봉 (만원)' : 'Annual Salary (10K KRW)') : (isKo ? '월급 (만원)' : 'Monthly Salary (10K KRW)')}</Label>
        <Input
          id="inputValue"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={mode === 'annual' ? '5000' : '417'}
          className="text-right"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = result ? (
    <Card>
      <CardHeader>
        <CardTitle>{isKo ? '환산 결과' : 'Conversion Result'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '연봉 (세전)' : 'Annual Salary (Gross)'}</span>
          <span className="font-bold">{formatNumber(Math.round(result.annual))}{isKo ? '원' : ' KRW'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '월급 (세전)' : 'Monthly Salary (Gross)'}</span>
          <span className="font-bold">{formatNumber(Math.round(result.monthly))}{isKo ? '원' : ' KRW'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '세후 월급 (추정)' : 'Monthly After Tax (Est.)'}</span>
          <span className="font-bold text-blue-600">{formatNumber(Math.round(result.monthlyAfterTax))}{isKo ? '원' : ' KRW'}</span>
        </div>
        <div className="flex justify-between items-center border-t pt-3">
          <span className="text-muted-foreground">{isKo ? '실수령 (추정)' : 'Net Take-home (Est.)'}</span>
          <span className="font-bold text-lg text-primary">{formatNumber(Math.round(result.netEstimate))}{isKo ? '원' : ' KRW'}</span>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center h-40 text-muted-foreground">
      {isKo ? '금액 입력 후 계산하기 버튼을 눌러주세요.' : 'Enter an amount and click Calculate.'}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '연봉 변환 계산기' : 'Salary Converter Calculator'}
      description={isKo ? '연봉과 월급을 서로 환산하고 세후 예상 실수령액을 확인합니다.' : 'Convert between annual and monthly salary and see estimated after-tax pay.'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
