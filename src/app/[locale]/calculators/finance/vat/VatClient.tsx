'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// import { formatNumber, parseNumber } from '@/utils/formatNumber';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface VatCalculatorProps {
  infoSection: InfoSection;
}

const VatCalculator = ({ infoSection }: VatCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [supplyAmount, setSupplyAmount] = useState<number>(0)
  const [calculationType, setCalculationType] = useState<'totalAmount' | 'supplyAmount'>('totalAmount')

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/[^0-9.]/g, '');
    const numericValue = cleanedValue ? parseFloat(cleanedValue) : 0;
    setter(isNaN(numericValue) ? 0 : numericValue);
  };

  const handleReset = () => {
    setTotalAmount(0);
    setSupplyAmount(0);
    setCalculationType('totalAmount');
  };

  const { calculatedSupplyAmount, calculatedVatAmount, calculatedTotalAmount } = useMemo(() => {
    let supply = 0;
    let vat = 0;
    let total = 0;

    if (calculationType === 'totalAmount') {
      // const parsedTotal = parseNumber(totalAmount);
      if (!isNaN(totalAmount) && totalAmount > 0) {
        total = totalAmount;
        supply = Math.round(total / 1.1);
        vat = total - supply;
      }
    } else {
      // const parsedSupply = parseNumber(supplyAmount);
      if (!isNaN(supplyAmount) && supplyAmount > 0) {
        supply = supplyAmount;
        vat = Math.round(supply * 0.1);
        total = supply + vat;
      }
    }

    return {
      calculatedSupplyAmount: supply.toLocaleString(),
      calculatedVatAmount: vat.toLocaleString(),
      calculatedTotalAmount: total.toLocaleString(),
    };
  }, [totalAmount, supplyAmount, calculationType]);

  const inputSection = (
    <div className="space-y-4">
      <RadioGroup
        defaultValue="totalAmount"
        value={calculationType}
        onValueChange={(value: 'totalAmount' | 'supplyAmount') => {
          setCalculationType(value);
          handleReset(); // 계산 방식 변경 시 초기화
        }}
        className="grid grid-cols-2 gap-4"
      >
        <Label
          htmlFor="totalAmountRadio"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem id="totalAmountRadio" value="totalAmount" className="sr-only" />
          <span>{isKo ? '합계금액으로 계산' : 'Calculate from Total'}</span>
        </Label>
        <Label
          htmlFor="supplyAmountRadio"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem id="supplyAmountRadio" value="supplyAmount" className="sr-only" />
          <span>{isKo ? '공급가액으로 계산' : 'Calculate from Supply'}</span>
        </Label>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="totalAmountInput">{isKo ? '합계금액 (원)' : 'Total Amount (KRW)'}</Label>
        <Input
          id="totalAmountInput"
          value={totalAmount.toLocaleString()}
          onChange={handleInputChange(setTotalAmount)}
          type="text"
          inputMode="numeric"
          className="text-right"
          placeholder={isKo ? '합계금액 입력' : 'Enter total amount'}
          disabled={calculationType !== 'totalAmount'}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplyAmountInput">{isKo ? '공급가액 (원)' : 'Supply Amount (KRW)'}</Label>
        <Input
          id="supplyAmountInput"
          value={supplyAmount.toLocaleString()}
          onChange={handleInputChange(setSupplyAmount)}
          type="text"
          inputMode="numeric"
          className="text-right"
          placeholder={isKo ? '공급가액 입력' : 'Enter supply amount'}
          disabled={calculationType !== 'supplyAmount'}
        />
      </div>
      <Button onClick={handleReset} className="w-full" variant="outline">
        {isKo ? '초기화' : 'Reset'}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      <div className="flex justify-between text-lg font-semibold">
        <span>{isKo ? '공급가액:' : 'Supply Amount:'}</span>
        <span>{calculatedSupplyAmount}{isKo ? '원' : ' KRW'}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>{isKo ? '부가세:' : 'VAT:'}</span>
        <span>{calculatedVatAmount}{isKo ? '원' : ' KRW'}</span>
      </div>
      <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
        <span>{isKo ? '합계금액:' : 'Total Amount:'}</span>
        <span>{calculatedTotalAmount}{isKo ? '원' : ' KRW'}</span>
      </div>
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '부가가치세 계산기' : 'VAT Calculator'}
      description={isKo ? '합계금액 또는 공급가액을 입력하여 부가가치세를 계산합니다.' : 'Enter the total amount or supply amount to calculate VAT.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  )
}

export default VatCalculator