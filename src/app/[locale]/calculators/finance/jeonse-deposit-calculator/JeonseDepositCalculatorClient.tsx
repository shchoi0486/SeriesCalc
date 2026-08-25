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

interface JeonseDepositCalculatorProps {
  infoSection: InfoSection;
}

const JeonseDepositCalculator = ({ infoSection }: JeonseDepositCalculatorProps) => {
  const { dict: d, locale } = useI18n();
  const isKo = locale === 'ko';

  const [deposit, setDeposit] = useState<number>(30000);
  const [housingPrice, setHousingPrice] = useState<number>(40000);
  const [annualIncome, setAnnualIncome] = useState<number>(6000);
  const [dti, setDti] = useState<number>(40);

  const [ltvLimit, setLtvLimit] = useState<number | null>(null);
  const [dsrLimit, setDsrLimit] = useState<number | null>(null);
  const [maxLoan, setMaxLoan] = useState<number | null>(null);

  const calculate = () => {
    if (deposit <= 0 || housingPrice <= 0 || annualIncome <= 0) return;

    // LTV 기준: 전세보증금 대출은 전세보증금의 80~90%
    // 주택가격 대비 전세보증금 비율에 따라 LTV 조정
    const depositRatio = deposit / housingPrice;
    let ltvRate = 0.8; // 기본 80%
    if (depositRatio >= 0.8) {
      ltvRate = 0.9; // 전세보증금이 주택가격의 80% 이상이면 90%
    } else if (depositRatio >= 0.6) {
      ltvRate = 0.85;
    }
    const ltvBased = Math.round(deposit * ltvRate);

    // DSR 기준: 월 상환액 / (연소득/12) ≤ DTI%
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * (dti / 100);

    // 전세자금대출은 보통 원리금균등 2년, 이자율 4% 가정
    const assumedRate = 0.04;
    const loanTermMonths = 24;
    const r = assumedRate / 12;
    const pmt = (maxMonthlyPayment);
    // PMT = P * r(1+r)^n / ((1+r)^n - 1)
    // P = PMT * ((1+r)^n - 1) / (r(1+r)^n)
    const dsrBased = Math.round(pmt * ((Math.pow(1 + r, loanTermMonths) - 1) / (r * Math.pow(1 + r, loanTermMonths))));

    const max = Math.min(ltvBased, dsrBased);

    setLtvLimit(ltvBased);
    setDsrLimit(dsrBased);
    setMaxLoan(max);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="deposit">{isKo ? '전세보증금 (만원)' : 'Jeonse Deposit (10K won)'}</Label>
        <Input
          id="deposit"
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="housingPrice">{isKo ? '주택가격 (만원)' : 'Housing Price (10K won)'}</Label>
        <Input
          id="housingPrice"
          type="number"
          value={housingPrice}
          onChange={(e) => setHousingPrice(Number(e.target.value))}
          className="text-right"
        />
      </div>
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
        <Label htmlFor="dti">{isKo ? '허용 DTI/DSR (%)' : 'Allowed DTI/DSR (%)'}</Label>
        <Input
          id="dti"
          type="number"
          step="1"
          value={dti}
          onChange={(e) => setDti(Number(e.target.value))}
          className="text-right"
        />
      </div>
      <Button onClick={calculate} className="w-full">{d.common.calculate}</Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-5">
      {maxLoan !== null ? (
        <>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground">{isKo ? '최대 대출한도' : 'Maximum Loan Limit'}</p>
            <p className="text-4xl font-extrabold text-primary mt-1">{maxLoan.toLocaleString()} {isKo ? '만원' : '10K won'}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isKo ? '(전세보증금 대비' : '(of deposit)'} {((maxLoan / deposit) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted">
                <tr className="border-b border-border">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">{isKo ? '기준' : 'Criterion'}</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">{isKo ? '한도 (만원)' : 'Limit (10K won)'}</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">{isKo ? '비율' : 'Ratio'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">LTV</td>
                  <td className="px-4 py-2.5 text-right font-medium">{ltvLimit?.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{ltvLimit ? ((ltvLimit / deposit) * 100).toFixed(1) : 0}%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 text-muted-foreground">DSR ({dti}%)</td>
                  <td className="px-4 py-2.5 text-right font-medium">{dsrLimit?.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right font-medium">{dsrLimit ? ((dsrLimit / deposit) * 100).toFixed(1) : 0}%</td>
                </tr>
                <tr className="bg-muted/50 font-semibold">
                  <td className="px-4 py-2.5">{isKo ? '대출 한도 (작은 값)' : 'Loan Limit (lower value)'}</td>
                  <td className="px-4 py-2.5 text-right text-primary">{maxLoan.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-primary">{((maxLoan / deposit) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {ltvLimit !== null && dsrLimit !== null && ltvLimit < dsrLimit && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              {isKo
                ? 'ℹ️ LTV 기준이 더 낮아 LTV 기준으로 대출한도가 결정되었습니다.'
                : 'ℹ️ LTV is the binding constraint for the loan limit.'}
            </div>
          )}
          {ltvLimit !== null && dsrLimit !== null && dsrLimit < ltvLimit && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
              {isKo
                ? 'ℹ️ DSR 기준이 더 낮아 상환능력이 대출한도의 병목입니다. 소득을 높이거나 DTI를 조정해보세요.'
                : 'ℹ️ DSR is the binding constraint. Increasing income or adjusting DTI can raise the limit.'}
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
      title={isKo ? '전세보증금 대출 한도' : 'Jeonse Deposit Loan Limit'}
      description={isKo ? '전세자금대출 최대 한도를 계산합니다' : 'Calculate maximum jeonse loan limit'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default JeonseDepositCalculator;
