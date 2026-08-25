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

const NATIONAL_PENSION_RATE = 0.045;
const NATIONAL_PENSION_MIN = 370000;
const NATIONAL_PENSION_MAX = 5900000;
const HEALTH_INSURANCE_RATE = 0.03545;
const LONG_TERM_CARE_RATE = 0.1281;
const EMPLOYMENT_INSURANCE_RATE = 0.009;

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

function calcIncomeTax(annualTaxableIncome: number): number {
  const bracket = INCOME_TAX_BRACKETS.find((b) => annualTaxableIncome <= b.max);
  if (!bracket) return 0;
  return Math.max(0, annualTaxableIncome * bracket.rate - bracket.deduction);
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface NetSalaryCalculatorProps {
  infoSection: InfoSection;
}

export default function NetSalaryCalculator({ infoSection }: NetSalaryCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const [monthlySalary, setMonthlySalary] = useState('500');
  const [nonTaxable, setNonTaxable] = useState('20');
  const [result, setResult] = useState<{
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    totalInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    totalDeductions: number;
    netSalary: number;
  } | null>(null);

  const handleCalculate = () => {
    const salaryManWon = parseNumber(monthlySalary);
    const nonTaxableManWon = parseNumber(nonTaxable);
    const salary = salaryManWon * 10000;
    const nonTaxableAmt = nonTaxableManWon * 10000;

    const pensionBase = Math.max(NATIONAL_PENSION_MIN, Math.min(salary, NATIONAL_PENSION_MAX));
    const nationalPension = pensionBase * NATIONAL_PENSION_RATE;

    const healthInsurance = salary * HEALTH_INSURANCE_RATE;
    const longTermCare = healthInsurance * LONG_TERM_CARE_RATE;
    const employmentInsurance = salary * EMPLOYMENT_INSURANCE_RATE;
    const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

    const annualTaxable = Math.max(0, (salary - nonTaxableAmt) * 12);
    const annualIncomeTax = calcIncomeTax(annualTaxable);
    const monthlyIncomeTax = annualIncomeTax / 12;
    const localIncomeTax = monthlyIncomeTax * 0.1;

    const totalDeductions = totalInsurance + monthlyIncomeTax + localIncomeTax;
    const netSalary = salary - totalDeductions;

    setResult({
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      totalInsurance,
      incomeTax: monthlyIncomeTax,
      localIncomeTax,
      totalDeductions,
      netSalary,
    });
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="monthlySalary">{isKo ? '월급 (만원)' : 'Monthly Salary (10K KRW)'}</Label>
        <Input
          id="monthlySalary"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          placeholder="500"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nonTaxable">{isKo ? '비과세 (만원)' : 'Non-taxable (10K KRW)'}</Label>
        <Input
          id="nonTaxable"
          value={nonTaxable}
          onChange={(e) => setNonTaxable(e.target.value)}
          placeholder="20"
          className="text-right"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">
        {isKo ? '계산하기' : 'Calculate'}
      </Button>
    </div>
  );

  const resultSection = result ? (
    <Card>
      <CardHeader>
        <CardTitle>{isKo ? '실수령액 결과' : 'Net Salary Result'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground">{isKo ? '월 실수령액' : 'Monthly Net Salary'}</p>
          <p className="text-3xl font-bold text-primary">{formatNumber(Math.round(result.netSalary))}{isKo ? '원' : ' KRW'}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {isKo ? '연 실수령액: ' : 'Annual Net: '}{formatNumber(Math.round(result.netSalary * 12))}{isKo ? '원' : ' KRW'}
          </p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{isKo ? '총 공제액' : 'Total Deductions'}</span>
          <span className="font-semibold text-destructive">{formatNumber(Math.round(result.totalDeductions))}{isKo ? '원' : ' KRW'}</span>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center h-40 text-muted-foreground">
      {isKo ? '정보 입력 후 계산하기 버튼을 눌러주세요.' : 'Enter values and click Calculate.'}
    </div>
  );

  const fullWidthSection = result ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isKo ? '공제 항목' : 'Deduction Item'}</TableHead>
          <TableHead className="text-right">{isKo ? '비율' : 'Rate'}</TableHead>
          <TableHead className="text-right">{isKo ? '금액 (월)' : 'Amount (Monthly)'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{isKo ? '국민연금' : 'National Pension'}</TableCell>
          <TableCell className="text-right">4.5%</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.nationalPension))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '건강보험' : 'Health Insurance'}</TableCell>
          <TableCell className="text-right">3.545%</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.healthInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '장기요양보험' : 'Long-term Care Insurance'}</TableCell>
          <TableCell className="text-right">12.81%<span className="text-xs text-muted-foreground">{isKo ? '(건강보험 대비)' : '(of health ins.)'}</span></TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.longTermCare))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '고용보험' : 'Employment Insurance'}</TableCell>
          <TableCell className="text-right">0.9%</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.employmentInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="font-semibold bg-muted/50">
          <TableCell>{isKo ? '4대보험 합계' : 'Total 4 Insurances'}</TableCell>
          <TableCell />
          <TableCell className="text-right">{formatNumber(Math.round(result.totalInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '소득세' : 'Income Tax'}</TableCell>
          <TableCell className="text-right">{isKo ? '간이세표' : 'Simplified'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.incomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '지방소득세' : 'Local Income Tax'}</TableCell>
          <TableCell className="text-right">10%</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.localIncomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="text-lg font-bold bg-muted">
          <TableCell>{isKo ? '총 공제액' : 'Total Deductions'}</TableCell>
          <TableCell />
          <TableCell className="text-right">{formatNumber(Math.round(result.totalDeductions))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? '실수령액 계산기' : 'Net Salary Calculator'}
      description={isKo ? '월급에서 4대보험과 세금을 제외한 실수령액을 계산합니다.' : 'Calculate your net take-home pay after 4 insurances and taxes.'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '상세 공제 내역' : 'Deduction Breakdown'}
      infoSection={infoSection}
    />
  );
}
