"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { NextPage } from 'next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { toast } from 'sonner';
import { round } from 'mathjs';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { formatNumber } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from '@/i18n/I18nProvider';

interface RepaymentScheduleItem {
  period: number;
  principalPayment: number;
  fee: number;
  monthlyPayment: number;
  cumulative: number;
}

interface CalculationResults {
  monthlyPayment: number;
  totalPayment: number;
  totalFee: number;
  principal: number;
  principalToTotalFeeRatio: number;
  totalFeeToTotalPaymentRatio: number;
  schedule: RepaymentScheduleItem[];
  statusBadgeColor: string;
  statusKey: 'error' | 'normal' | 'high' | 'medium';
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CreditCardInstallmentFeeCalculatorProps {
  infoSection: InfoSection;
}

const CreditCardInstallmentFeeCalculator = ({ infoSection }: CreditCardInstallmentFeeCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const [paymentAmount, setPaymentAmount] = useState<number>(1000000);
  const [installmentMonths, setInstallmentMonths] = useState<number>(12);
  const [interestFreeMonths, setInterestFreeMonths] = useState<number>(0);
  const [annualFeeRate, setAnnualFeeRate] = useState<number>(15);
  const [calculationCompleted, setCalculationCompleted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('table');

  const statusLabels: Record<'ko' | 'en', Record<CalculationResults['statusKey'], string>> = {
    ko: { error: '입력 오류', normal: '정상', high: '수수료 높음', medium: '수수료 보통' },
    en: { error: 'Input error', normal: 'Normal', high: 'High fee', medium: 'Moderate fee' },
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ''));
    if (!isNaN(value)) {
      setter(value);
    } else {
      setter(0);
    }
  };

  const calculationResults = useMemo<CalculationResults>(() => {
    if (paymentAmount <= 0 || installmentMonths <= 0 || annualFeeRate < 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalFee: 0,
        principal: 0,
        principalToTotalFeeRatio: 0,
        totalFeeToTotalPaymentRatio: 0,
        schedule: [],
        statusBadgeColor: 'bg-gray-500',
        statusKey: 'error',
      };
    }

    let totalFee = 0;
    let totalPayment = 0;
    const schedule: RepaymentScheduleItem[] = [];
    let remainingPrincipal = paymentAmount;

    for (let i = 1; i <= installmentMonths; i++) {
      let fee = 0;
      let principalRepayment = 0;
      let currentMonthlyPayment = 0;

      if (i <= interestFreeMonths) {
        // 무이자 기간
        principalRepayment = paymentAmount / installmentMonths;
        fee = 0;
        currentMonthlyPayment = principalRepayment;
      } else {
        // 유이자 기간
        const effectiveMonths = installmentMonths - interestFreeMonths;
        const monthlyRate = annualFeeRate / 100 / 12;

        if (effectiveMonths > 0 && monthlyRate > 0) {
          // 무이자 기간 이후 남은 원금에 대해 원리금 균등 상환 계산
          const principalAfterInterestFree = paymentAmount - (paymentAmount / installmentMonths) * interestFreeMonths;
          const monthlyPaymentForInterestPeriod = (principalAfterInterestFree * monthlyRate * Math.pow(1 + monthlyRate, effectiveMonths)) / (Math.pow(1 + monthlyRate, effectiveMonths) - 1);
          
          // 현재 회차의 이자 계산 (남은 원금 기준)
          fee = remainingPrincipal * monthlyRate;
          principalRepayment = monthlyPaymentForInterestPeriod - fee;
          currentMonthlyPayment = monthlyPaymentForInterestPeriod;

          // 마지막 회차 처리: 오차로 인해 남은 원금을 모두 상환하도록 조정
          if (i === installmentMonths) {
            principalRepayment = remainingPrincipal;
            currentMonthlyPayment = principalRepayment + fee;
          }

        } else if (effectiveMonths > 0 && monthlyRate === 0) {
          // 이자율이 0인 유이자 기간 (거의 발생하지 않지만 예외 처리)
          principalRepayment = remainingPrincipal / (installmentMonths - i + 1);
          fee = 0;
          currentMonthlyPayment = principalRepayment;
        } else {
          // 무이자 기간이 전체 할부 개월 수와 같거나 긴 경우
          principalRepayment = remainingPrincipal / (installmentMonths - i + 1);
          fee = 0;
          currentMonthlyPayment = principalRepayment;
        }
      }
      
      remainingPrincipal -= principalRepayment;
      totalFee += fee;
      totalPayment += currentMonthlyPayment;

      schedule.push({
        period: i,
        principalPayment: round(principalRepayment),
        fee: round(fee),
        monthlyPayment: round(currentMonthlyPayment),
        cumulative: round(totalPayment),
      });
    }

    const principalToTotalFeeRatio = totalFee > 0 ? (totalFee / paymentAmount) * 100 : 0;
    const totalFeeToTotalPaymentRatio = totalPayment > 0 ? (totalFee / totalPayment) * 100 : 0;

    let statusBadgeColor = 'bg-green-500';
    let statusKey: CalculationResults['statusKey'] = 'normal';
    if (totalFeeToTotalPaymentRatio > 10) {
      statusBadgeColor = 'bg-red-500';
      statusKey = 'high';
    } else if (totalFeeToTotalPaymentRatio > 5) {
      statusBadgeColor = 'bg-yellow-500 text-black';
      statusKey = 'medium';
    }


    return {
      monthlyPayment: round(totalPayment / installmentMonths),
      totalPayment: round(totalPayment),
      totalFee: round(totalFee),
      principal: paymentAmount,
      principalToTotalFeeRatio: round(principalToTotalFeeRatio, 2),
      totalFeeToTotalPaymentRatio: round(totalFeeToTotalPaymentRatio, 2),
      schedule,
      statusBadgeColor,
      statusKey,
    };
  }, [paymentAmount, installmentMonths, interestFreeMonths, annualFeeRate]);

  const handleCalculate = useCallback(() => {
    if (paymentAmount <= 0) {
      toast.error(isKo ? "결제 금액을 입력해주세요." : "Please enter the payment amount.");
      setCalculationCompleted(false);
      return;
    }
    if (installmentMonths <= 0) {
      toast.error(isKo ? "할부 개월 수를 입력해주세요." : "Please enter the number of installment months.");
      setCalculationCompleted(false);
      return;
    }
    if (annualFeeRate < 0) {
      toast.error(isKo ? "할부 수수료율은 0 이상이어야 합니다." : "The installment fee rate must be 0 or greater.");
      setCalculationCompleted(false);
      return;
    }
    // calculationResults useMemo에 의해 자동 계산되므로 별도 로직 불필요
    toast.success(isKo ? "할부 수수료 계산이 완료되었습니다." : "Installment fee calculation completed.");
    setCalculationCompleted(true);
  }, [paymentAmount, installmentMonths, annualFeeRate, isKo]);

  const pieData = useMemo(() => {
    if (!calculationCompleted || calculationResults.totalPayment === 0) return [];
    return [
      { name: isKo ? '원금' : 'Principal', value: calculationResults.principal, fill: '#8884d8' },
      { name: isKo ? '총 할부 수수료' : 'Total installment fee', value: calculationResults.totalFee, fill: '#82ca9d' },
    ];
  }, [calculationCompleted, calculationResults, isKo]);

  const inputSection = (
    <div className="space-y-6">
      {/* 결제 금액 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label htmlFor="paymentAmount">{isKo ? '결제 금액 (원)' : 'Payment amount (KRW)'}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-gray-600 cursor-help">
                <span className="text-xs">?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isKo ? '결제할 금액을 입력합니다.' : 'Enter the amount to be charged.'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="paymentAmount"
          type="text"
          value={formatNumber(paymentAmount)}
          onChange={handleInputChange(setPaymentAmount)}
          placeholder={isKo ? "예: 5,000,000" : "e.g. 5,000,000"}
          className="text-right"
        />
      </div>

      {/* 할부 개월 수 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label htmlFor="installmentMonths">{isKo ? '할부 개월 수 (개월)' : 'Installment period (months)'}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-gray-600 cursor-help">
                <span className="text-xs">?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isKo ? '할부 기간을 개월 단위로 입력합니다.' : 'Enter the installment period in months.'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="installmentMonths"
          type="number"
          value={installmentMonths}
          onChange={handleInputChange(setInstallmentMonths)}
          placeholder={isKo ? "예: 12" : "e.g. 12"}
          className="text-right"
        />
        <p className="text-sm text-muted-foreground mt-1">{isKo ? '일반적으로 최대 36개월까지 가능합니다.' : 'Typically available up to 36 months.'}</p>
      </div>

      {/* 무이자 할부 개월 수 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label htmlFor="interestFreeMonths">{isKo ? '무이자 할부 개월 수 (개월)' : 'Interest-free installment months'}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-gray-600 cursor-help">
                <span className="text-xs">?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isKo ? '무이자 할부 기간을 개월 단위로 입력합니다.' : 'Enter the interest-free installment period in months.'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="interestFreeMonths"
          type="number"
          value={interestFreeMonths}
          onChange={handleInputChange(setInterestFreeMonths)}
          placeholder={isKo ? "예: 0" : "e.g. 0"}
          className="text-right"
        />
        <p className="text-sm text-muted-foreground mt-1">{isKo ? '할부 개월 수보다 클 수 없습니다.' : 'Cannot exceed the installment period.'}</p>
      </div>

      {/* 할부 수수료율 */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label htmlFor="annualFeeRate">{isKo ? '할부 수수료율 (연 %)' : 'Installment fee rate (annual %)'}</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-gray-600 cursor-help">
                <span className="text-xs">?</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isKo ? '연간 할부 수수료율을 퍼센트 단위로 입력합니다.' : 'Enter the annual installment fee rate as a percentage.'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="annualFeeRate"
          type="number"
          value={annualFeeRate}
          onChange={handleInputChange(setAnnualFeeRate)}
          placeholder={isKo ? "예: 15" : "e.g. 15"}
          step="0.1"
          className="text-right"
        />
        <p className="text-sm text-muted-foreground mt-1">{isKo ? '일반적으로 카드사마다 다르며 0.5%~1.5% 내외입니다.' : 'Varies by card issuer, typically around 0.5%–1.5%.'}</p>
      </div>

      <Button onClick={handleCalculate} className="w-full">
        {isKo ? '계산하기' : 'Calculate'}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {calculationCompleted && calculationResults.totalPayment > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-base">{isKo ? '계산 결과:' : 'Calculation result:'}</span>
            <Badge className={`${calculationResults.statusBadgeColor} text-base`}>{statusLabels[isKo ? 'ko' : 'en'][calculationResults.statusKey]}</Badge>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span>{isKo ? '총 결제 금액:' : 'Total payment amount:'}</span>
              <span>{formatNumber(calculationResults.principal)} {isKo ? '원' : 'KRW'}</span>
            </div>
            <div className="flex justify-between">
              <span>{isKo ? '총 할부 수수료:' : 'Total installment fee:'}</span>
              <span>{formatNumber(calculationResults.totalFee)} {isKo ? '원' : 'KRW'}</span>
            </div>
            <div className="flex justify-between">
              <span>{isKo ? '총 상환 금액:' : 'Total repayment:'}</span>
              <span className="font-bold">{formatNumber(calculationResults.totalPayment)} {isKo ? '원' : 'KRW'}</span>
            </div>
            <div className="flex justify-between">
              <span>{isKo ? '월 평균 납부액:' : 'Average monthly payment:'}</span>
              <span>{formatNumber(calculationResults.monthlyPayment)} {isKo ? '원' : 'KRW'}</span>
            </div>
            <div className="flex justify-between">
              <span>{isKo ? '원금 대비 할부 수수료 비율:' : 'Installment fee to principal ratio:'}</span>
              <span>{calculationResults.principalToTotalFeeRatio}%</span>
            </div>
            <div className="flex justify-between">
              <span>{isKo ? '총 상환 금액 대비 할부 수수료 비율:' : 'Installment fee to total repayment ratio:'}</span>
              <span>{calculationResults.totalFeeToTotalPaymentRatio}%</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">{isKo ? '계산하기 버튼을 클릭하여 결과를 확인하세요.' : 'Click Calculate to see the result.'}</p>
        </div>
      )}
    </div>
  );

  const fullWidthSection = calculationCompleted && calculationResults.totalPayment > 0 ? (
    <div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="text-base font-semibold">{isKo ? '할부 구성' : 'Installment breakdown'}</h3>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => { if (value) setViewMode(value as "chart" | "table"); }} defaultValue="table">
          <ToggleGroupItem value="table">{isKo ? '테이블' : 'Table'}</ToggleGroupItem>
          <ToggleGroupItem value="chart">{isKo ? '차트' : 'Chart'}</ToggleGroupItem>
        </ToggleGroup>
      </div>
      {viewMode === 'chart' ? (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <RechartsTooltip
                formatter={(value: number) => `${formatNumber(value)} ${isKo ? '원' : 'KRW'}`}
              />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap w-[50px] text-xs">{isKo ? '회차' : 'Period'}</TableHead>
                <TableHead className="text-right whitespace-nowrap">{isKo ? '원금' : 'Principal'}</TableHead>
                <TableHead className="text-right whitespace-nowrap">{isKo ? '수수료' : 'Fee'}</TableHead>
                <TableHead className="text-right whitespace-nowrap">{isKo ? '월 납부' : 'Monthly'}</TableHead>
                <TableHead className="text-right whitespace-nowrap">{isKo ? '누적 상환' : 'Cumulative'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculationResults.schedule.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap w-[50px] text-xs">{item.period}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.principalPayment)}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.fee)}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.monthlyPayment)}</TableCell>
                  <TableCell className="text-right">{formatNumber(item.cumulative)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? "신용카드 할부 수수료 계산기" : "Credit Card Installment Fee Calculator"}
      description={isKo ? "신용카드 할부 구매 시 발생하는 수수료와 월별 상환액을 계산합니다." : "Calculate the fee and monthly repayment for credit card installment purchases."}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? "비용 분포" : "Cost distribution"}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default CreditCardInstallmentFeeCalculator;
