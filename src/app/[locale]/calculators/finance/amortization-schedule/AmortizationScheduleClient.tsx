'use client';

import { useState, useMemo } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface AmortizationScheduleProps {
  infoSection: InfoSection;
}

const AmortizationSchedule = ({ infoSection }: AmortizationScheduleProps) => {
  const { dict: d, locale, formatCurrency } = useI18n();
  const isKo = locale === 'ko';

  const [loanAmount, setLoanAmount] = useState<number>(100000000);
  const [annualRate, setAnnualRate] = useState<number>(5);
  const [loanTermYears, setLoanTermYears] = useState<number>(10);
  const [repaymentType, setRepaymentType] = useState<string>('equal_installment');

  const [calculated, setCalculated] = useState(false);

  const schedule = useMemo((): ScheduleRow[] => {
    if (loanAmount <= 0 || annualRate <= 0 || loanTermYears <= 0) return [];
    const n = loanTermYears * 12;
    const r = annualRate / 100 / 12;
    const rows: ScheduleRow[] = [];
    let balance = loanAmount;

    if (repaymentType === 'equal_installment') {
      // 원리금균등 (PMT)
      const pmt = loanAmount * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      for (let mo = 1; mo <= n; mo++) {
        const interest = balance * r;
        const principal = pmt - interest;
        balance = Math.max(0, balance - principal);
        rows.push({ month: mo, payment: Math.round(pmt), principal: Math.round(principal), interest: Math.round(interest), balance: Math.round(balance) });
      }
    } else {
      // 원금균등
      const equalPrincipal = loanAmount / n;
      for (let mo = 1; mo <= n; mo++) {
        const interest = balance * r;
        const payment = equalPrincipal + interest;
        balance = Math.max(0, balance - equalPrincipal);
        rows.push({ month: mo, payment: Math.round(payment), principal: Math.round(equalPrincipal), interest: Math.round(interest), balance: Math.round(balance) });
      }
    }
    return rows;
  }, [loanAmount, annualRate, loanTermYears, repaymentType]);

  const summary = useMemo(() => {
    if (schedule.length === 0) return null;
    const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
    const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    return { totalPayment, totalInterest, totalPrincipal: loanAmount };
  }, [schedule, loanAmount]);

  const calculate = () => {
    setCalculated(true);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="loanAmount">{isKo ? '대출금액 (원)' : 'Loan Amount'}</Label>
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
      <div className="space-y-1">
        <Label>{isKo ? '상환방식' : 'Repayment Type'}</Label>
        <Select value={repaymentType} onValueChange={setRepaymentType}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equal_installment">{isKo ? '원리금균등' : 'Equal Installment (PMT)'}</SelectItem>
            <SelectItem value="equal_principal">{isKo ? '원금균등' : 'Equal Principal'}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={calculate} className="w-full">{d.common.calculate}</Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-5">
      {calculated && summary ? (
        <>
          {summary && (
            <>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
                <p className="text-sm text-muted-foreground">{isKo ? '월 납부액 (첫 달)' : 'Monthly Payment (first month)'}</p>
                <p className="text-4xl font-extrabold text-primary mt-1">{formatCurrency(schedule[0].payment)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">{isKo ? '대출금액' : 'Loan Amount'}</p>
                  <p className="font-bold text-foreground">{formatCurrency(summary.totalPrincipal)}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">{isKo ? '총 이자' : 'Total Interest'}</p>
                  <p className="font-bold text-red-500">{formatCurrency(summary.totalInterest)}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">{isKo ? '총 상환액' : 'Total Payment'}</p>
                  <p className="font-bold text-foreground">{formatCurrency(summary.totalPayment)}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">{isKo ? '이자비율' : 'Interest Ratio'}</p>
                  <p className="font-bold text-foreground">{((summary.totalInterest / summary.totalPayment) * 100).toFixed(1)}%</p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
          <p>{isKo ? '값을 입력하고 계산하기를 눌러주세요.' : 'Enter values and press Calculate.'}</p>
        </div>
      )}
    </div>
  );

  const fullWidthSection = calculated && schedule.length > 0 ? (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-2">{isKo ? '월별 상환 스케줄' : 'Monthly Amortization Schedule'}</h3>
      <div className="max-h-[480px] overflow-auto rounded-lg border border-border">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 bg-muted">
            <tr className="text-muted-foreground border-b border-border">
              <th className="px-3 py-2 text-left font-medium">{isKo ? '월' : 'Month'}</th>
              <th className="px-3 py-2 text-right font-medium">{isKo ? '납부액' : 'Payment'}</th>
              <th className="px-3 py-2 text-right font-medium">{isKo ? '원금' : 'Principal'}</th>
              <th className="px-3 py-2 text-right font-medium">{isKo ? '이자' : 'Interest'}</th>
              <th className="px-3 py-2 text-right font-medium">{isKo ? '잔액' : 'Balance'}</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-3 py-2 text-foreground">{row.month}</td>
                <td className="px-3 py-2 text-right text-foreground">{formatCurrency(row.payment)}</td>
                <td className="px-3 py-2 text-right text-blue-600">{formatCurrency(row.principal)}</td>
                <td className="px-3 py-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
                <td className="px-3 py-2 text-right text-muted-foreground">{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? '상환 스케줄 계산기' : 'Amortization Schedule Calculator'}
      description={isKo ? '대출 상환 스케줄을 상세히 확인하세요' : 'View detailed loan repayment schedule'}
      variant="split"
      fullWidthSection={fullWidthSection}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default AmortizationSchedule;
