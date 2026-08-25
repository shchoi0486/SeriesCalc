'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface DsrCalculatorProps {
  infoSection: InfoSection;
}

const DsrCalculator = ({ infoSection }: DsrCalculatorProps) => {
  const { dict: d, locale } = useI18n();
  const isKo = locale === 'ko';

  const [annualIncome, setAnnualIncome] = useState<number>(5000);
  const [monthlyPrincipal, setMonthlyPrincipal] = useState<number>(150);
  const [monthlyInterest, setMonthlyInterest] = useState<number>(100);
  const [otherLoanPayment, setOtherLoanPayment] = useState<number>(50);

  const [dsr, setDsr] = useState<number | null>(null);

  const calculate = () => {
    if (annualIncome <= 0) return;
    const monthlyIncome = annualIncome / 12;
    const totalMonthly = monthlyPrincipal + monthlyInterest + otherLoanPayment;
    const result = (totalMonthly / monthlyIncome) * 100;
    setDsr(Math.round(result * 100) / 100);
  };

  const getDsrColor = (value: number) => {
    if (value < 30) return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: isKo ? '양호' : 'Good' };
    if (value <= 40) return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: isKo ? '주의' : 'Caution' };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: isKo ? '위험' : 'Risk' };
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="annualIncome">{isKo ? '연소득 (만원)' : 'Annual Income (10K won)'}</Label>
        <Input
          id="annualIncome"
          type="number"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="monthlyPrincipal">{isKo ? '월 원금상환액 (만원)' : 'Monthly Principal (10K won)'}</Label>
        <Input
          id="monthlyPrincipal"
          type="number"
          value={monthlyPrincipal}
          onChange={(e) => setMonthlyPrincipal(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="monthlyInterest">{isKo ? '월 이자상환액 (만원)' : 'Monthly Interest (10K won)'}</Label>
        <Input
          id="monthlyInterest"
          type="number"
          value={monthlyInterest}
          onChange={(e) => setMonthlyInterest(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="otherLoanPayment">{isKo ? '기타대출 월 상환액 (만원)' : 'Other Loan Monthly (10K won)'}</Label>
        <Input
          id="otherLoanPayment"
          type="number"
          value={otherLoanPayment}
          onChange={(e) => setOtherLoanPayment(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <Button onClick={calculate} className="w-full">{d.common.calculate}</Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-5">
      {dsr !== null ? (
        <>
          <div className="text-center p-5 rounded-xl border-2" style={{ borderColor: getDsrColor(dsr).text.replace('text-', '').includes('green') ? '#22c55e' : dsr <= 40 ? '#eab308' : '#ef4444' }}>
            <p className="text-sm text-muted-foreground">{isKo ? 'DSR 비율' : 'DSR Ratio'}</p>
            <p className={`text-5xl font-extrabold mt-1 ${getDsrColor(dsr).text}`}>{dsr}%</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getDsrColor(dsr).bg} ${getDsrColor(dsr).text} ${getDsrColor(dsr).border} border`}>
              {getDsrColor(dsr).label}
            </span>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted">
                <tr className="border-b border-border">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">{isKo ? '항목' : 'Item'}</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">{isKo ? '금액 (만원)' : 'Amount (10K won)'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '월 원금상환' : 'Monthly Principal'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{monthlyPrincipal.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '월 이자상환' : 'Monthly Interest'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{monthlyInterest.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '기타대출 월 상환' : 'Other Loan Monthly'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{otherLoanPayment.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border bg-muted/50 font-semibold">
                  <td className="px-4 py-2.5">{isKo ? '월 총 상환액' : 'Total Monthly Payment'}</td>
                  <td className="px-4 py-2.5 text-right">{(monthlyPrincipal + monthlyInterest + otherLoanPayment).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">{isKo ? '월 소득 (연소득/12)' : 'Monthly Income (Annual/12)'}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{(annualIncome / 12).toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {dsr > 40 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {isKo
                ? '⚠️ DSR 40%를 초과합니다. 총대출 1억원 이상인 경우 DSR 40% 규제가 적용되어 대출이 제한될 수 있습니다.'
                : '⚠️ DSR exceeds 40%. Loans may be restricted under the 40% DSR regulation when total loans exceed 100 million won.'}
            </div>
          )}
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
      title={isKo ? 'DSR 계산기' : 'DSR Calculator'}
      description={isKo ? '총부채원리금상환비율(DSR)을 계산합니다' : 'Calculate your Debt Service Ratio'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default DsrCalculator;
