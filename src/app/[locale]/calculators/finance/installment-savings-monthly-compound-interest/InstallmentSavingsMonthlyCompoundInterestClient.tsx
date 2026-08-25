'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { formatNumber, parseNumber } from '@/utils/formatNumber';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface InstallmentSavingsMonthlyCompoundInterestCalculatorProps {
  infoSection: InfoSection;
}

const InstallmentSavingsMonthlyCompoundInterestCalculator = ({ infoSection }: InstallmentSavingsMonthlyCompoundInterestCalculatorProps) => {
  const [initialPrincipal, setInitialPrincipal] = useState<number>(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(100000);
  const [period, setPeriod] = useState<number>(12);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [depositTiming, setDepositTiming] = useState<'beginning' | 'end'>('beginning');
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setter(parseFloat(value || '0'));
  };
  
  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPeriod(parseInt(value || '0', 10));
  }

  const calculationResult = useMemo(() => {
    const principal = initialPrincipal;
    const monthly = monthlyDeposit;
    const months = period;
    const rate = annualInterestRate / 100;

    if (isNaN(principal) || isNaN(monthly) || isNaN(months) || isNaN(rate) || months <= 0 || rate <= 0) {
      return null;
    }

    const monthlyRate = rate / 12;
    let totalPrincipal = principal;
    let totalAmount = principal;
    const tableData = [];
    const chartData = [];

    for (let i = 1; i <= months; i++) {
      let interestThisMonth = 0;
      if (depositTiming === 'beginning') {
        totalAmount += monthly;
        totalPrincipal += monthly;
        interestThisMonth = totalAmount * monthlyRate;
        totalAmount += interestThisMonth;
      } else { // end of month
        interestThisMonth = totalAmount * monthlyRate;
        totalAmount += interestThisMonth;
        totalAmount += monthly;
        totalPrincipal += monthly;
      }

      tableData.push({
        month: i,
        principal: Math.round(totalPrincipal),
        interest: Math.round(interestThisMonth),
        total: Math.round(totalAmount),
      });

      chartData.push({
        name: `${i}개월`,
        원금: Math.round(totalPrincipal),
        이자와원금: Math.round(totalAmount),
      });
    }

    const totalInterest = totalAmount - totalPrincipal;

    return {
      totalPrincipal: Math.round(totalPrincipal),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      tableData,
      chartData,
    };
  }, [initialPrincipal, monthlyDeposit, period, annualInterestRate, depositTiming]);

  const handleCalculate = useCallback(() => {
    if (calculationResult) {
      setResult(calculationResult);
      toast.success('계산이 완료되었습니다.');
    } else {
      toast.error('입력값을 확인해주세요.');
    }
  }, [calculationResult]);

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="initialPrincipal">초기 투자금 (원)</Label>
        <Input id="initialPrincipal" value={initialPrincipal.toLocaleString()} onChange={handleInputChange(setInitialPrincipal)} className="text-right" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyDeposit">월 적립금 (원)</Label>
        <Input id="monthlyDeposit" value={monthlyDeposit.toLocaleString()} onChange={handleInputChange(setMonthlyDeposit)} className="text-right" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="period">투자기간 (개월)</Label>
        <Input id="period" value={period.toLocaleString()} onChange={handlePeriodChange} className="text-right" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualInterestRate">연 이자율 (%)</Label>
        <Input id="annualInterestRate" value={annualInterestRate.toLocaleString()} onChange={handleInputChange(setAnnualInterestRate)} className="text-right" />
      </div>
      <div className="space-y-2">
        <Label>적립 시점</Label>
        <ToggleGroup
          type="single"
          value={depositTiming}
          onValueChange={(value: 'beginning' | 'end') => value && setDepositTiming(value)}
          className="grid grid-cols-2"
        >
          <ToggleGroupItem value="beginning">월초</ToggleGroupItem>
          <ToggleGroupItem value="end">월말</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Button onClick={handleCalculate} className="w-full">계산하기</Button>
    </div>
  );

  const resultSection = (
    <>
      {result ? (
        <Card className="p-2">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">계산 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-2">
            <div className="flex justify-between">
              <span className="font-medium text-sm">총 원금</span>
              <span className="text-base">{result.totalPrincipal.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-sm">총 이자 (세전)</span>
              <span className="text-blue-500 text-base">{result.totalInterest.toLocaleString()}원</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>만기지급금액</span>
              <span className="text-xl font-bold text-primary">{result.totalAmount.toLocaleString()}원</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center text-muted-foreground h-full">
          입력 후 계산하기 버튼을 눌러주세요.
        </div>
      )}
    </>
  );

  const fullWidthSection = result ? (
    <Tabs defaultValue="chart" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chart">차트</TabsTrigger>
        <TabsTrigger value="details">월별 상세 내역</TabsTrigger>
      </TabsList>
      <TabsContent value="chart">
        <div className="w-full">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={result.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => value.toLocaleString()} />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()}원`} />
              <Legend />
              <Line type="monotone" dataKey="원금" stroke="#8884d8" />
              <Line type="monotone" dataKey="이자와원금" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="details">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>개월차</TableHead>
                <TableHead className="text-right">원금</TableHead>
                <TableHead className="text-right">이자 (세전)</TableHead>
                <TableHead className="text-right">누계</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.tableData.map((data: any) => (
                <TableRow key={data.month}>
                  <TableCell>{data.month}</TableCell>
                  <TableCell className="text-right">{data.principal.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{data.interest.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{data.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  ) : null;

  return (
    <CalculatorsLayout
      title="월 복리 적금 계산기"
      description="매월 꾸준히 모아 목돈을 만드는 월 복리 적금, 만기 예상 금액을 확인해보세요."
      variant="grouped"
      fullWidthSection={fullWidthSection}
      fullWidthTitle="상세 분석"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default InstallmentSavingsMonthlyCompoundInterestCalculator;