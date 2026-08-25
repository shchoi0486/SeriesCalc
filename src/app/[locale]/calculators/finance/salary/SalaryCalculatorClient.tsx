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

// 2025년 근로소득 간이세액표 (일부, 1인 가구 기준)
const incomeTaxTable: { max: number; tax: number }[] = [
  { max: 1060000, tax: 0 },
  { max: 1500000, tax: 6210 },
  { max: 2000000, tax: 25380 },
  { max: 2500000, tax: 61380 },
  { max: 3000000, tax: 113380 },
  { max: 3500000, tax: 187010 },
  { max: 4000000, tax: 277010 },
  { max: 4500000, tax: 382010 },
  { max: 5000000, tax: 497140 },
  { max: 6000000, tax: 737140 },
  { max: 7000000, tax: 1012140 },
  { max: 8000000, tax: 1322140 },
  { max: Infinity, tax: 1662140 },
];

const getIncomeTax = (monthlyTaxableIncome: number, dependents: number) => {
  // 부양가족 수에 따른 공제 (단순화된 예시)
  const deduction = (dependents - 1) * 20000;
  const taxableIncomeAfterDependents = Math.max(0, monthlyTaxableIncome - deduction);

  const matchedBracket = incomeTaxTable.find(bracket => taxableIncomeAfterDependents < bracket.max);
  return matchedBracket ? matchedBracket.tax : incomeTaxTable[incomeTaxTable.length - 1].tax;
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

    // 2025년 기준
    const nationalPensionMin = 390000;
    const nationalPensionMax = 6170000;
    const monthlySalaryForPension = Math.max(nationalPensionMin, Math.min(monthlySalary, nationalPensionMax));

    const nationalPension = monthlySalaryForPension * 0.045;
    const healthInsurance = monthlyTaxable * 0.03545;
    const longTermCareInsurance = healthInsurance * 0.1295; // 건강보험료의 12.95% (변동 가능)
    const employmentInsurance = monthlySalary * 0.009;

    const incomeTax = getIncomeTax(monthlyTaxable, numDependents);
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
          <p className="text-3xl font-bold text-blue-600">{formatNumber(Math.round(result.netMonthlySalary))}{isKo ? '원' : ' KRW'}</p>
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
          <TableCell>{isKo ? '국민연금 (4.5%)' : 'National Pension (4.5%)'}</TableCell>
          <TableCell className="text-right">{formatNumber(Math.round(result.deductions.nationalPension))}{isKo ? '원' : ' KRW'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{isKo ? '건강보험 (3.545%)' : 'Health Insurance (3.545%)'}</TableCell>
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
          <TableCell>{isKo ? '소득세 (간이세액)' : 'Income Tax (simplified)'}</TableCell>
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
