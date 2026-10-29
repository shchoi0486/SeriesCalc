'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatNumber, parseNumber } from '@/utils/formatNumber';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SalaryCalculatorClientProps {
  infoSection: InfoSection;
}

// 소득세 과세표준 구간 (2026년 기준, 8단계 누진세율)
const INCOME_TAX_BRACKETS: { max: number; rate: number; deduction: number }[] = [
  { max: 14000000, rate: 0.06, deduction: 0 },
  { max: 50000000, rate: 0.15, deduction: 1260000 },
  { max: 88000000, rate: 0.24, deduction: 5760000 },
  { max: 150000000, rate: 0.35, deduction: 15440000 },
  { max: 300000000, rate: 0.38, deduction: 19940000 },
  { max: 500000000, rate: 0.40, deduction: 25940000 },
  { max: 1000000000, rate: 0.42, deduction: 35940000 },
  { max: Infinity, rate: 0.45, deduction: 65940000 },
];

// 근로소득공제 (소득세법 제47조)
const earnedIncomeDeduction = (annualGross: number): number => {
  if (annualGross <= 5000000) return annualGross * 0.7;
  if (annualGross <= 15000000) return 3500000 + (annualGross - 5000000) * 0.4;
  if (annualGross <= 45000000) return 7500000 + (annualGross - 15000000) * 0.15;
  if (annualGross <= 100000000) return 12000000 + (annualGross - 45000000) * 0.05;
  return Math.min(20000000, 14750000 + (annualGross - 100000000) * 0.02);
};

// 근로소득세액공제 한도 (총급여 기준)
const taxCreditLimit = (annualGross: number): number => {
  if (annualGross <= 33000000) return 740000;
  if (annualGross <= 70000000) return 660000;
  if (annualGross <= 120000000) return 500000;
  return 200000;
};

/**
 * 월 원천징수 소득세 근사값.
 * 국세청 간이세액표를 그대로 옮기는 대신, 연말정산 구조(근로소득공제 → 인적공제·연금보험료공제
 * → 누진세율 → 근로소득세액공제)로 계산한 뒤 12로 나눕니다. 실제 원천징수액과는
 * 표준세액공제·부양가족 세부 요건 등에 따라 차이가 날 수 있습니다.
 */
const getIncomeTax = (
  monthlyTaxableIncome: number,
  dependents: number,
  monthlyPensionEmployee: number
) => {
  const annualGross = Math.max(0, monthlyTaxableIncome * 12);
  if (annualGross === 0) return 0;

  const personalDeduction = 1500000 * Math.max(1, dependents);
  const pensionDeduction = Math.max(0, monthlyPensionEmployee * 12);
  const taxBase = Math.max(
    0,
    annualGross - earnedIncomeDeduction(annualGross) - personalDeduction - pensionDeduction
  );

  const bracket =
    INCOME_TAX_BRACKETS.find((b) => taxBase <= b.max) ?? INCOME_TAX_BRACKETS[0];
  const calculatedTax = Math.max(0, taxBase * bracket.rate - bracket.deduction);

  const rawCredit =
    calculatedTax <= 1300000
      ? calculatedTax * 0.55
      : 715000 + (calculatedTax - 1300000) * 0.3;
  const credit = Math.min(rawCredit, taxCreditLimit(annualGross));

  return Math.max(0, calculatedTax - credit) / 12;
};


export default function SalaryCalculatorClient({ infoSection }: SalaryCalculatorClientProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const [annualSalary, setAnnualSalary] = useState('50,000,000');
  const [nonTaxableAmount, setNonTaxableAmount] = useState('2,400,000'); // 식대 20만원 * 12개월
  const [dependents, setDependents] = useState('1');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const annual = parseNumber(annualSalary);
    const nonTaxable = parseNumber(nonTaxableAmount);
    const numDependents = parseInt(dependents, 10);

    const taxableAnnual = annual - nonTaxable;
    const monthlySalary = annual / 12;
    const monthlyTaxable = taxableAnnual / 12;

    // 2026년 기준 (국민연금 9.5%, 건강보험 7.19%, 장기요양 건강보험료의 13.14%)
    const nationalPensionMin = 410000;
    const nationalPensionMax = 6590000;
    const monthlySalaryForPension = Math.max(nationalPensionMin, Math.min(monthlySalary, nationalPensionMax));

    const nationalPension = monthlySalaryForPension * 0.0475;
    const healthInsurance = monthlyTaxable * 0.03595;
    const longTermCareInsurance = healthInsurance * 0.1314;
    const employmentInsurance = monthlySalary * 0.009;

    const incomeTax = getIncomeTax(monthlyTaxable, numDependents, nationalPension);
    const localIncomeTax = incomeTax * 0.1;

    const totalDeductions = nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance + incomeTax + localIncomeTax;
    const netMonthlySalary = monthlySalary - totalDeductions;

    setResult({
      annualSalary: annual,
      monthlySalary,
      nonTaxable,
      deductions: {
        nationalPension,
        healthInsurance,
        longTermCareInsurance,
        employmentInsurance,
        incomeTax,
        localIncomeTax,
      },
      totalDeductions,
      netMonthlySalary,
      netAnnualSalary: netMonthlySalary * 12,
    });
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="annualSalary">{isKo ? '연봉 (세전)' : 'Annual Salary (Gross)'}</Label>
        <Input id="annualSalary" value={annualSalary} onChange={e => setAnnualSalary(formatNumber(e.target.value))} className="text-right" />
      </div>
      <div>
        <Label htmlFor="nonTaxableAmount">{isKo ? '연간 비과세액 (식대, 차량유지비 등)' : 'Annual Non-taxable Amount (meal, vehicle, etc.)'}</Label>
        <Input id="nonTaxableAmount" value={nonTaxableAmount} onChange={e => setNonTaxableAmount(formatNumber(e.target.value))} className="text-right" />
      </div>
      <div>
        <Label htmlFor="dependents">{isKo ? '부양가족 수 (본인 포함)' : 'Number of Dependents (incl. self)'}</Label>
        <Select value={dependents} onValueChange={setDependents}>
            <SelectTrigger>
                <SelectValue placeholder={isKo ? '부양가족 수를 선택하세요' : 'Select number of dependents'} />
            </SelectTrigger>
            <SelectContent>
                {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}{isKo ? '명' : ''}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = result ? (
    <Card>
      <CardHeader>
        <CardTitle>{isKo ? '예상 실수령액' : 'Estimated Net Take-Home'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg">{isKo ? '월 실수령액' : 'Monthly Net Pay'}</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(Math.round(result.netMonthlySalary))}{isKo ? '원' : ' KRW'}</p>
          <p className="text-muted-foreground mt-1">{isKo ? '연 실수령액: ' : 'Annual Net Pay: '}{formatNumber(Math.round(result.netAnnualSalary))}{isKo ? '원' : ' KRW'}</p>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground h-40">{isKo ? '정보 입력 후 계산하기 버튼을 눌러주세요.' : 'Please enter information and click Calculate.'}</div>
  );

  const fullWidthSection = result ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isKo ? '공제 항목' : 'Deduction Item'}</TableHead>
          <TableHead className="text-right">{isKo ? '금액 (월)' : 'Amount (Monthly)'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{isKo ? '국민연금 (4.75%)' : 'National Pension (4.75%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.nationalPension))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '건강보험 (3.595%)' : 'Health Insurance (3.595%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.healthInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '장기요양보험' : 'Long-term Care Insurance'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.longTermCareInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '고용보험 (0.9%)' : 'Employment Insurance (0.9%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.employmentInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="font-semibold">
          <TableCell>{isKo ? '4대 보험 합계' : 'Total of 4 Insurances'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.nationalPension + result.deductions.healthInsurance + result.deductions.longTermCareInsurance + result.deductions.employmentInsurance))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '소득세 (연말정산 구조 추정)' : 'Income Tax (year-end settlement estimate)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.incomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '지방소득세 (10%)' : 'Local Income Tax (10%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.localIncomeTax))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow className="text-lg font-bold bg-muted">
          <TableCell>{isKo ? '총 공제액' : 'Total Deductions'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.totalDeductions))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? '연봉 실수령액 계산기' : 'Net Salary Calculator'}
      description={isKo ? '4대 보험과 세금을 제외한 내 진짜 월급은 얼마일까요?' : 'What is your real monthly pay after the 4 insurances and taxes?'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '상세 내역' : 'Details'}
      infoSection={infoSection}
    />
  );
}
