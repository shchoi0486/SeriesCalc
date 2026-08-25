'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatNumber, parseNumber } from '@/utils/formatNumber';

const TAX_BRACKETS: { max: number; rate: number; deduction: number }[] = [
  { max: 14000000, rate: 0.06, deduction: 0 },
  { max: 50000000, rate: 0.15, deduction: 1260000 },
  { max: 88000000, rate: 0.24, deduction: 5760000 },
  { max: 150000000, rate: 0.35, deduction: 14960000 },
  { max: 300000000, rate: 0.38, deduction: 19460000 },
  { max: 500000000, rate: 0.40, deduction: 25460000 },
  { max: 1000000000, rate: 0.42, deduction: 35460000 },
  { max: Infinity, rate: 0.45, deduction: 65460000 },
];

const BASIC_DEDUCTION = 1500000;
const DEPENDENT_DEDUCTION = 150000;

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface IncomeTaxCalculatorProps {
  infoSection: InfoSection;
}

export default function IncomeTaxCalculator({ infoSection }: IncomeTaxCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const [grossIncome, setGrossIncome] = useState('5000');
  const [dependents, setDependents] = useState('1');
  const [result, setResult] = useState<{
    grossIncomeManWon: number;
    totalDeductions: number;
    taxableIncome: number;
    bracketRate: number;
    incomeTax: number;
    localIncomeTax: number;
    totalTax: number;
    effectiveRate: number;
  } | null>(null);

  const handleCalculate = () => {
    const incomeManWon = parseNumber(grossIncome);
    const numDependents = parseInt(dependents, 10) || 1;
    const grossIncomeWon = incomeManWon * 10000;

    const totalDeductions = BASIC_DEDUCTION + (numDependents * DEPENDENT_DEDUCTION);
    const taxableIncome = Math.max(0, grossIncomeWon - totalDeductions);

    const bracket = TAX_BRACKETS.find((b) => taxableIncome <= b.max) || TAX_BRACKETS[TAX_BRACKETS.length - 1];
    const incomeTax = Math.max(0, taxableIncome * bracket.rate - bracket.deduction);
    const localIncomeTax = incomeTax * 0.1;
    const totalTax = incomeTax + localIncomeTax;
    const effectiveRate = grossIncomeWon > 0 ? (totalTax / grossIncomeWon) * 100 : 0;

    setResult({
      grossIncomeManWon: incomeManWon,
      totalDeductions,
      taxableIncome,
      bracketRate: bracket.rate,
      incomeTax,
      localIncomeTax,
      totalTax,
      effectiveRate,
    });
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="grossIncome">{isKo ? '종합소득금액 (만원)' : 'Gross Income (10K KRW)'}</Label>
        <Input
          id="grossIncome"
          value={grossIncome}
          onChange={(e) => setGrossIncome(e.target.value)}
          placeholder="5000"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dependents">{isKo ? '부양가족 수 (본인 포함)' : 'Dependents (incl. self)'}</Label>
        <Input
          id="dependents"
          value={dependents}
          onChange={(e) => setDependents(e.target.value)}
          placeholder="1"
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
        <CardTitle>{isKo ? '세금 계산 결과' : 'Tax Calculation Result'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground">{isKo ? '총 납부 세금' : 'Total Tax'}</p>
          <p className="text-3xl font-bold text-destructive">{formatNumber(Math.round(result.totalTax))}{isKo ? '원' : ' KRW'}</p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{isKo ? '실효세율' : 'Effective Tax Rate'}</span>
          <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{isKo ? '과세표준' : 'Taxable Income'}</span>
          <span className="font-semibold">{formatNumber(Math.round(result.taxableIncome))}{isKo ? '원' : ' KRW'}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{isKo ? '적용 세율' : 'Applied Rate'}</span>
          <span className="font-semibold">{(result.bracketRate * 100).toFixed(0)}%</span>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center h-40 text-muted-foreground">
      {isKo ? '소득금액 입력 후 계산하기 버튼을 눌러주세요.' : 'Enter income and click Calculate.'}
    </div>
  );

  const fullWidthSection = result ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isKo ? '항목' : 'Item'}</TableHead>
          <TableHead className="text-right">{isKo ? '금액' : 'Amount'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{isKo ? '종합소득금액' : 'Gross Income'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.grossIncomeManWon * 10000))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '기본공제' : 'Basic Deduction'}</TableCell>
          <TableCell className="text-right">-{formatNumber(BASIC_DEDUCTION)}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '인적공제' : 'Dependent Deduction'}</TableCell>
          <TableCell className="text-right">-{formatNumber(Math.round(result.totalDeductions - BASIC_DEDUCTION))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="font-semibold bg-muted/50">
          <TableCell>{isKo ? '과세표준' : 'Taxable Income'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.taxableIncome))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '소득세' : 'Income Tax'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.incomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '지방소득세 (10%)' : 'Local Income Tax (10%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.localIncomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="text-lg font-bold bg-muted">
          <TableCell>{isKo ? '총 세금' : 'Total Tax'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.totalTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? '소득세 계산기' : 'Income Tax Calculator'}
      description={isKo ? '종합소득금액을 입력하여 소득세와 지방소득세를 계산합니다.' : 'Enter your gross income to calculate income tax and local income tax.'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '상세 내역' : 'Tax Breakdown'}
      infoSection={infoSection}
    />
  );
}
