"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { formatNumber, parseNumber } from "@/utils/formatNumber";
import CalculatorsLayout from "@/components/calculators/Calculatorslayout";
import TermGlossary from '@/components/calculators/TermGlossary';

interface CalculationResult {
  year: number;
  principal: number;
  valuation: number;
  profit: number;
  rate: number;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface StockCompoundInterestCalculatorProps {
  infoSection: InfoSection;
}

export default function StockCompoundInterestCalculator({ infoSection }: StockCompoundInterestCalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState("10,000,000");
  const [monthlyInvestment, setMonthlyInvestment] = useState("500,000");
  const [annualReturn, setAnnualReturn] = useState("15");
  const [investmentPeriod, setInvestmentPeriod] = useState("20");
  const [results, setResults] = useState<CalculationResult[]>([]);

  const calculate = () => {
    const initial = parseNumber(initialInvestment);
    const monthly = parseNumber(monthlyInvestment);
    const annualRate = parseNumber(annualReturn) / 100;
    const period = parseNumber(investmentPeriod);

    if (isNaN(initial) || initial <= 0) {
      toast.error("초기 투자금을 올바르게 입력해주세요.");
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      toast.error("연 수익률을 올바르게 입력해주세요.");
      return;
    }
    if (isNaN(period) || period <= 0) {
      toast.error("투자 기간을 올바르게 입력해주세요.");
      return;
    }

    let currentValuation = initial;
    let totalPrincipal = initial;
    const newResults: CalculationResult[] = [];

    for (let i = 1; i <= period; i++) {
      const annualInvestment = monthly * 12;
      totalPrincipal += annualInvestment;
      currentValuation = (currentValuation + annualInvestment) * (1 + annualRate);

      const profit = currentValuation - totalPrincipal;
      const rate = (profit / totalPrincipal) * 100;

      newResults.push({
        year: i,
        principal: Math.round(totalPrincipal),
        valuation: Math.round(currentValuation),
        profit: Math.round(profit),
        rate: parseFloat(rate.toFixed(2)),
      });
    }
    setResults(newResults);
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="initialInvestment">초기 투자금 (원)</Label>
        <Input
          id="initialInvestment"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(formatNumber(e.target.value))}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <div>
        <Label htmlFor="monthlyInvestment">월 추가 투자금 (원)</Label>
        <Input
          id="monthlyInvestment"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(formatNumber(e.target.value))}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <div>
        <Label htmlFor="annualReturn">연 수익률 (%)</Label>
        <Input
          id="annualReturn"
          value={annualReturn}
          onChange={(e) => setAnnualReturn(e.target.value)}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <div>
        <Label htmlFor="investmentPeriod">투자 기간 (년)</Label>
        <Input
          id="investmentPeriod"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(e.target.value)}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <Button onClick={calculate} className="w-full">계산하기</Button>
    </div>
  );

  const resultSection = (
    <div className="h-full w-full flex items-center justify-center">
      {results.length > 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">최종 평가 금액</p>
          <p className="text-3xl font-bold text-primary">
            {formatNumber(results[results.length - 1].valuation)}원
          </p>
          <p className="text-sm text-muted-foreground mt-2">상세 내역은 아래 표를 확인하세요.</p>
        </div>
      ) : (
        <p>계산 결과가 여기에 표시됩니다.</p>
      )}
    </div>
  );

  const fullWidthSection = results.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>기간</TableHead>
          <TableHead className="text-right">투자 원금</TableHead>
          <TableHead className="text-right">평가 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((row) => (
          <TableRow key={row.year}>
            <TableCell>{row.year}년</TableCell>
            <TableCell className="text-right">{formatNumber(row.principal)}원</TableCell>
            <TableCell className="text-right">{formatNumber(row.valuation)}원</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null;

  return (
    <CalculatorsLayout
      title="주식 복리 계산기"
      description="장기 투자의 힘, 복리 효과를 직접 확인해보세요."
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle="상세 내역"
      infoSection={infoSection}
    />
  );
}