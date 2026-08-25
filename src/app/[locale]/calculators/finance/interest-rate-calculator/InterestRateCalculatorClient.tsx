'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { parseNumber } from '@/utils/formatNumber';

type RateUnit = 'annual' | 'monthly' | 'daily';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface InterestRateCalculatorProps {
  infoSection: InfoSection;
}

export default function InterestRateCalculator({ infoSection }: InterestRateCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';

  const [inputRate, setInputRate] = useState('5');
  const [inputUnit, setInputUnit] = useState<RateUnit>('annual');
  const [compoundingFreq, setCompoundingFreq] = useState('12');
  const [result, setResult] = useState<{
    annualRate: number;
    monthlyRate: number;
    dailyRate: number;
    nominalRate: number;
    effectiveRate: number;
  } | null>(null);

  const handleCalculate = () => {
    const rate = parseNumber(inputRate) / 100;
    const n = parseInt(compoundingFreq, 10) || 12;

    let annualRate: number;

    switch (inputUnit) {
      case 'annual':
        annualRate = rate;
        break;
      case 'monthly':
        annualRate = rate * 12;
        break;
      case 'daily':
        annualRate = rate * 365;
        break;
      default:
        annualRate = rate;
    }

    const monthlyRate = annualRate / 12;
    const dailyRate = annualRate / 365;

    const effectiveRate = Math.pow(1 + annualRate / n, n) - 1;

    setResult({
      annualRate,
      monthlyRate,
      dailyRate,
      nominalRate: annualRate,
      effectiveRate,
    });
  };

  const fmt = (v: number) => (v * 100).toFixed(4);

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="inputRate">{isKo ? '이자율 (%)' : 'Interest Rate (%)'}</Label>
        <Input
          id="inputRate"
          value={inputRate}
          onChange={(e) => setInputRate(e.target.value)}
          placeholder="5"
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label>{isKo ? '입력 단위' : 'Input Unit'}</Label>
        <ToggleGroup type="single" value={inputUnit} onValueChange={(v: RateUnit) => { if (v) setInputUnit(v); }} className="w-full">
          <ToggleGroupItem value="annual" className="flex-1">{isKo ? '연이율' : 'Annual'}</ToggleGroupItem>
          <ToggleGroupItem value="monthly" className="flex-1">{isKo ? '월이율' : 'Monthly'}</ToggleGroupItem>
          <ToggleGroupItem value="daily" className="flex-1">{isKo ? '일이율' : 'Daily'}</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="space-y-2">
        <Label htmlFor="compoundingFreq">{isKo ? '이자 계산 주기 (연)' : 'Compounding Frequency (per year)'}</Label>
        <Input
          id="compoundingFreq"
          value={compoundingFreq}
          onChange={(e) => setCompoundingFreq(e.target.value)}
          placeholder="12"
          className="text-right"
          type="number"
          min="1"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = result ? (
    <Card>
      <CardHeader>
        <CardTitle>{isKo ? '환산 결과' : 'Conversion Result'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '연이율' : 'Annual Rate'}</span>
          <span className="font-bold">{fmt(result.annualRate)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '월이율' : 'Monthly Rate'}</span>
          <span className="font-bold">{fmt(result.monthlyRate)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{isKo ? '일이율' : 'Daily Rate'}</span>
          <span className="font-bold">{fmt(result.dailyRate)}%</span>
        </div>
        <div className="border-t pt-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{isKo ? '명목 이자율' : 'Nominal Rate'}</span>
            <span className="font-semibold">{fmt(result.nominalRate)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{isKo ? '실효 이자율' : 'Effective Rate'}</span>
            <span className="font-bold text-primary text-lg">{fmt(result.effectiveRate)}%</span>
          </div>
          <div className="p-3 bg-muted rounded-lg text-sm text-center">
            {isKo
              ? `명목 ${fmt(result.nominalRate)}% → 실효 ${fmt(result.effectiveRate)}% (복리 ${compoundingFreq}회)`
              : `Nominal ${fmt(result.nominalRate)}% → Effective ${fmt(result.effectiveRate)}% (compounded ${compoundingFreq}x)`
            }
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center h-40 text-muted-foreground">
      {isKo ? '이자율 입력 후 계산하기 버튼을 눌러주세요.' : 'Enter an interest rate and click Calculate.'}
    </div>
  );

  const fullWidthSection = result ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isKo ? '구분' : 'Type'}</TableHead>
          <TableHead className="text-right">{isKo ? '연이율' : 'Annual'}</TableHead>
          <TableHead className="text-right">{isKo ? '월이율' : 'Monthly'}</TableHead>
          <TableHead className="text-right">{isKo ? '일이율' : 'Daily'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">{isKo ? '명목 이자율' : 'Nominal Rate'}</TableCell>
          <TableCell className="text-right">{fmt(result.nominalRate)}%</TableCell>
          <TableCell className="text-right">{fmt(result.monthlyRate)}%</TableCell>
          <TableCell className="text-right">{fmt(result.dailyRate)}%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">{isKo ? '실효 이자율' : 'Effective Rate'}</TableCell>
          <TableCell className="text-right">{fmt(result.effectiveRate)}%</TableCell>
          <TableCell className="text-right">-</TableCell>
          <TableCell className="text-right">-</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? '이자율 변환 계산기' : 'Interest Rate Converter'}
      description={isKo ? '연이율, 월이율, 일을율을 환산하고 실효 이자율을 계산합니다.' : 'Convert between annual, monthly, and daily rates and compute effective interest rates.'}
      inputSection={inputSection}
      resultSection={resultSection}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '명목 vs 실효 이자율 비교' : 'Nominal vs Effective Rate Comparison'}
      infoSection={infoSection}
    />
  );
}
