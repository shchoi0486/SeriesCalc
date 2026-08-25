'use client';

import React, { useState, useMemo } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type InputMode = 'supply' | 'vat' | 'total';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface SalesTaxCalculatorProps {
  infoSection: InfoSection;
}

const SalesTaxCalculator = ({ infoSection }: SalesTaxCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [mode, setMode] = useState<InputMode>('supply');
  const [supplyAmount, setSupplyAmount] = useState<string>('');
  const [vatAmount, setVatAmount] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');

  const handleReset = () => {
    setMode('supply');
    setSupplyAmount('');
    setVatAmount('');
    setTotalAmount('');
  };

  const results = useMemo(() => {
    let supply = 0;
    let vat = 0;
    let total = 0;

    if (mode === 'supply') {
      const val = parseFloat(supplyAmount);
      if (isNaN(val) || val < 0) return null;
      supply = val;
      vat = Math.round(supply * 0.1);
      total = supply + vat;
    } else if (mode === 'vat') {
      const val = parseFloat(vatAmount);
      if (isNaN(val) || val < 0) return null;
      vat = val;
      supply = Math.round(vat / 0.1);
      total = supply + vat;
    } else {
      const val = parseFloat(totalAmount);
      if (isNaN(val) || val < 0) return null;
      total = val;
      supply = Math.round(total / 1.1);
      vat = total - supply;
    }

    return { supply, vat, total };
  }, [mode, supplyAmount, vatAmount, totalAmount]);

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {([
          { key: 'supply' as InputMode, label: L('공급가액 입력', 'Supply Amount') },
          { key: 'vat' as InputMode, label: L('부가세 입력', 'VAT Amount') },
          { key: 'total' as InputMode, label: L('합계금액 입력', 'Total Amount') },
        ]).map((item) => (
          <Button
            key={item.key}
            variant={mode === item.key ? 'default' : 'outline'}
            onClick={() => {
              setMode(item.key);
              setSupplyAmount('');
              setVatAmount('');
              setTotalAmount('');
            }}
            className="text-xs sm:text-sm"
          >
            {item.label}
          </Button>
        ))}
      </div>

      {mode === 'supply' && (
        <div className="space-y-2">
          <Label htmlFor="supplyInput">{L('공급가액 (원)', 'Supply Amount (KRW)')}</Label>
          <Input
            id="supplyInput"
            type="text"
            inputMode="numeric"
            value={supplyAmount}
            onChange={(e) => setSupplyAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder={L('공급가액 입력', 'Enter supply amount')}
            className="text-right"
          />
        </div>
      )}

      {mode === 'vat' && (
        <div className="space-y-2">
          <Label htmlFor="vatInput">{L('부가세 (원)', 'VAT Amount (KRW)')}</Label>
          <Input
            id="vatInput"
            type="text"
            inputMode="numeric"
            value={vatAmount}
            onChange={(e) => setVatAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder={L('부가세 입력', 'Enter VAT amount')}
            className="text-right"
          />
        </div>
      )}

      {mode === 'total' && (
        <div className="space-y-2">
          <Label htmlFor="totalInput">{L('합계금액 (원)', 'Total Amount (KRW)')}</Label>
          <Input
            id="totalInput"
            type="text"
            inputMode="numeric"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder={L('합계금액 입력', 'Enter total amount')}
            className="text-right"
          />
        </div>
      )}

      <Button onClick={handleReset} className="w-full" variant="outline">
        {L('초기화', 'Reset')}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {!results ? (
        <p className="text-muted-foreground text-center py-8">
          {L('값을 입력하면 결과가 표시됩니다.', 'Enter a value to see results.')}
        </p>
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('공급가액', 'Supply Amount')}</span>
              <span className="font-mono font-semibold">{results.supply.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('부가세 (10%)', 'VAT (10%)')}</span>
              <span className="font-mono font-semibold">{results.vat.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
            <div className="flex justify-between p-3 border-2 border-primary rounded-lg">
              <span className="font-bold">{L('합계금액', 'Total Amount')}</span>
              <span className="font-mono font-bold text-lg">{results.total.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
            </div>
          </div>

          {results.total > 0 && (
            <div className="mt-4">
              <div className="text-sm text-muted-foreground mb-2">{L('금액 비율', 'Amount Breakdown')}</div>
              <div className="w-full h-8 rounded-lg overflow-hidden flex">
                <div
                  className="bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${(results.supply / results.total) * 100}%` }}
                >
                  {((results.supply / results.total) * 100).toFixed(1)}%
                </div>
                <div
                  className="bg-orange-500 dark:bg-orange-600 flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${(results.vat / results.total) * 100}%` }}
                >
                  {((results.vat / results.total) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{L('공급가액', 'Supply')}</span>
                <span>{L('부가세', 'VAT')}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={L('부가세 포함 가격 계산기', 'Sales Tax (VAT) Calculator')}
      description={L(
        '공급가액·부가세·합계금액을 상호 변환합니다.',
        'Convert between supply amount, VAT, and total amount.'
      )}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default SalesTaxCalculator;
