'use client';

import React, { useState, useMemo } from 'react';
import { NextPage } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface OrdinaryWageCalculatorProps {
  infoSection: InfoSection;
}

const OrdinaryWageCalculator = ({ infoSection }: OrdinaryWageCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const [baseSalary, setBaseSalary] = useState<number>(3000000);
  const [monthlyAllowances, setMonthlyAllowances] = useState<number>(200000);
  const [annualBonuses, setAnnualBonuses] = useState<number>(5000000);
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<number>(40);

  // 숫자 입력 처리 핸들러 정의
  const handleInputChange = (setter: (value: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
      const numericValue = cleanedValue ? parseFloat(cleanedValue) : 0;
      setter(isNaN(numericValue) ? 0 : numericValue);
    };
  };

  const [results, setResults] = useState<{
    hourlyWage: number;
    dailyWage: number;
    monthlyWage: number;
    annualWage: number;
  } | null>(null);

  const calculationResults = useMemo(() => {
    const base = baseSalary;
    const allowances = monthlyAllowances;
    const bonuses = annualBonuses;
    const hours = workHoursPerWeek;

    if (isNaN(base) || isNaN(allowances) || isNaN(bonuses) || isNaN(hours) || hours <= 0) {
      return null;
    }

    const totalMonthlyWage = base + allowances + bonuses / 12;
    const calculatedHourlyWage = totalMonthlyWage / 209; // 주 40시간 기준 월 소정근로시간
    const calculatedDailyWage = calculatedHourlyWage * (hours / 5);

    return {
      hourlyWage: calculatedHourlyWage,
      dailyWage: calculatedDailyWage,
      monthlyWage: totalMonthlyWage,
      annualWage: totalMonthlyWage * 12,
    };
  }, [baseSalary, monthlyAllowances, annualBonuses, workHoursPerWeek]);

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
        <Label htmlFor="baseSalary">{isKo ? '월 기본급 (원)' : 'Monthly Base Salary (KRW)'}</Label>
        <Input
          id="baseSalary"
          value={baseSalary.toLocaleString()}
          onChange={(e) => handleInputChange(setBaseSalary)(e)}
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyAllowances">{isKo ? '월 기타수당 (원)' : 'Monthly Allowances (KRW)'}</Label>
        <Input
          id="monthlyAllowances"
          value={monthlyAllowances.toLocaleString()}
          onChange={(e) => handleInputChange(setMonthlyAllowances)(e)}
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualBonuses">{isKo ? '연간 상여금 (원)' : 'Annual Bonus (KRW)'}</Label>
        <Input
          id="annualBonuses"
          value={annualBonuses.toLocaleString()}
          onChange={(e) => handleInputChange(setAnnualBonuses)(e)}
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workHoursPerWeek">{isKo ? '주당 근로시간' : 'Work Hours per Week'}</Label>
        <Input
          id="workHoursPerWeek"
          value={workHoursPerWeek.toLocaleString()}
          onChange={(e) => handleInputChange(setWorkHoursPerWeek)(e)}
          className="text-right"
          type="number"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = (
    <>
      {results ? (
        <Card>
          <CardHeader>
            <CardTitle>{isKo ? '계산 결과' : 'Calculation Result'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex justify-between items-center">
              <span>{isKo ? '시간급 통상임금' : 'Hourly Ordinary Wage'}</span>
              <span className="font-bold">{results.hourlyWage.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{isKo ? '일급 통상임금' : 'Daily Ordinary Wage'}</span>
              <span className="font-bold">{results.dailyWage.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{isKo ? '월급 통상임금' : 'Monthly Ordinary Wage'}</span>
              <span className="font-bold">{results.monthlyWage.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{isKo ? '연봉 환산액' : 'Annualized Salary'}</span>
              <span className="font-bold">{results.annualWage.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {isKo ? '입력 후 계산하기 버튼을 눌러주세요.' : 'Please enter values and click Calculate.'}
        </div>
      )}
    </>
  );


  return (
    <CalculatorsLayout
      title={isKo ? '통상임금 계산기' : 'Ordinary Wage Calculator'}
      description={isKo ? '월 기본급, 수당, 상여금 등을 입력하여 통상임금을 계산합니다.' : 'Calculate your ordinary wage by entering monthly base salary, allowances, bonus, and more.'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default OrdinaryWageCalculator;