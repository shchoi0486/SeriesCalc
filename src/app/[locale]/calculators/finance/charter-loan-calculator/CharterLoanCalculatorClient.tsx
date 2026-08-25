'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CharterLoanCalculatorProps {
  infoSection: InfoSection;
}

const CharterLoanCalculator = ({ infoSection }: CharterLoanCalculatorProps) => {
  const { dict: d, locale, formatCurrency } = useI18n();
  const isKo = locale === 'ko';

  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [annualRate, setAnnualRate] = useState<number>(3.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(2);

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculate = () => {
    if (loanAmount <= 0 || annualRate <= 0 || loanTermYears <= 0) return;

    const n = loanTermYears * 12;
    const r = annualRate / 100 / 12;
    const pmt = loanAmount * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const total = pmt * n;
    const interest = total - loanAmount;

    setMonthlyPayment(Math.round(pmt));
    setTotalInterest(Math.round(interest));
    setTotalPayment(Math.round(total));
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="loanAmount">{isKo ? '대출금액 (만원)' : 'Loan Amount (10K won)'}</Label>
        <Input
          id="loanAmount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="annualRate">{isKo ? '연이자율 (%)' : 'Annual Rate (%)'}</Label>
          <Input
            id="annualRate"
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="text-right"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="loanTermYears">{isKo ? '대출기간 (년)' : 'Loan Term (years)'}</Label>
          <Input
            id="loanTermYears"
            type="number"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(Number(e.target.value))}
            className="text-right"
          />
        </div>
      </div>
      <Button onClick={calculate} className="w-full">{d.common.calculate}</Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-5">
      {monthlyPayment !== null ? (
        <>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground">{isKo ? '월 납부액' : 'Monthly Payment'}</p>
            <p className="text-4xl font-extrabold text-primary mt-1">
              {formatCurrency(monthlyPayment, 'KRW', { maximumFractionDigits: 0 }).replace('₩', '')} {isKo ? '만원' : '10K won'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isKo ? '매월' : 'Per month for'} {loanTermYears} {isKo ? '년간' : 'years'}
            </p>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '대출금액' : 'Loan Amount'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{loanAmount.toLocaleString()} {isKo ? '만원' : '10K won'}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '연이자율' : 'Annual Rate'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{annualRate}%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '대출기간' : 'Loan Term'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{loanTermYears} {isKo ? '년' : 'years'}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '총 이자' : 'Total Interest'}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-red-500">{totalInterest!.toLocaleString()} {isKo ? '만원' : '10K won'}</td>
                </tr>
                <tr className="bg-muted/50 font-semibold">
                  <td className="px-4 py-2.5">{isKo ? '총 상환액' : 'Total Payment'}</td>
                  <td className="px-4 py-2.5 text-right">{totalPayment!.toLocaleString()} {isKo ? '만원' : '10K won'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
          <p>{isKo ? '값을 입력하고 계산하기를 눌러주세요.' : 'Enter values and press Calculate.'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '전세자금대출 계산기' : 'Charter Loan Calculator'}
      description={isKo ? '전세자금대출 월 상환액과 이자를 계산합니다' : 'Calculate jeonse loan monthly payment and interest'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default CharterLoanCalculator;
