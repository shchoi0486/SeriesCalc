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

interface AutoLoanCalculatorProps {
  infoSection: InfoSection;
}

const AutoLoanCalculator = ({ infoSection }: AutoLoanCalculatorProps) => {
  const { dict: d, locale, formatCurrency } = useI18n();
  const isEn = locale === 'en';

  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [apr, setApr] = useState<number>(5.5);

  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const calculate = () => {
    const principal = Math.max(0, vehiclePrice - downPayment);
    if (principal <= 0 || loanTermMonths <= 0 || apr <= 0) {
      setMonthlyPayment(null);
      setTotalInterest(null);
      setTotalCost(null);
      return;
    }
    const r = apr / 100 / 12;
    const n = loanTermMonths;
    const pmt = principal * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const total = pmt * n;
    const interest = total - principal;
    setMonthlyPayment(Math.round(pmt));
    setTotalInterest(Math.round(interest));
    setTotalCost(Math.round(total));
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="vehiclePrice">{isEn ? 'Vehicle Price ($)' : '차량 가격 ($)'}</Label>
        <Input
          id="vehiclePrice"
          type="number"
          value={vehiclePrice}
          onChange={(e) => setVehiclePrice(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="downPayment">{isEn ? 'Down Payment ($)' : '선수금 ($)'}</Label>
        <Input
          id="downPayment"
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="text-right"
        />
        <p className="text-xs text-muted-foreground">
          {isEn ? 'Loan Amount: ' : '대출금액: '}
          <strong className="text-foreground">${Math.max(0, vehiclePrice - downPayment).toLocaleString()}</strong>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="loanTermMonths">{isEn ? 'Loan Term (months)' : '대출기간 (개월)'}</Label>
          <Input
            id="loanTermMonths"
            type="number"
            value={loanTermMonths}
            onChange={(e) => setLoanTermMonths(Number(e.target.value))}
            className="text-right"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="apr">{isEn ? 'APR (%)' : '연이자율 (%)'}</Label>
          <Input
            id="apr"
            type="number"
            step="0.1"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
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
            <p className="text-sm text-muted-foreground">{isEn ? 'Monthly Payment' : '월 납부액'}</p>
            <p className="text-4xl font-extrabold text-primary mt-1">${monthlyPayment.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isEn ? 'per month for' : '매월'} {loanTermMonths} {isEn ? 'months' : '개월'}
            </p>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isEn ? 'Vehicle Price' : '차량 가격'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${vehiclePrice.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isEn ? 'Down Payment' : '선수금'}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-blue-600">${downPayment.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isEn ? 'Loan Amount' : '대출금액'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">${Math.max(0, vehiclePrice - downPayment).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isEn ? 'Total Interest' : '총 이자'}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-red-500">${totalInterest!.toLocaleString()}</td>
                </tr>
                <tr className="bg-muted/50 font-semibold">
                  <td className="px-4 py-2.5">{isEn ? 'Total Cost' : '총 상환액'}</td>
                  <td className="px-4 py-2.5 text-right">${totalCost!.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs">{isEn ? 'Interest Rate' : '이자율'}</p>
              <p className="font-bold text-foreground">{apr}% APR</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-muted-foreground text-xs">{isEn ? 'Loan Term' : '대출기간'}</p>
              <p className="font-bold text-foreground">{loanTermMonths} {isEn ? 'months' : '개월'}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
          <p>{isEn ? 'Enter values and press Calculate.' : '값을 입력하고 계산하기를 눌러주세요.'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isEn ? 'Auto Loan Calculator' : '자동차 대출 계산기'}
      description={isEn ? 'Estimate your monthly car payment' : '자동차 대출 월 납부액 계산'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default AutoLoanCalculator;
