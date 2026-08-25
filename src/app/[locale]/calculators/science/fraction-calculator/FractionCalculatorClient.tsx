'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function simplify(numer: number, denom: number): [number, number] {
  if (denom === 0) return [numer, denom];
  const sign = (numer < 0) !== (denom < 0) ? -1 : 1;
  const g = gcd(Math.abs(numer), Math.abs(denom));
  return [sign * Math.abs(numer) / g, Math.abs(denom) / g];
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface FractionCalculatorPageProps {
  infoSection: InfoSection;
}

export default function FractionCalculatorPage({ infoSection }: FractionCalculatorPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [operator, setOperator] = useState('+');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [result, setResult] = useState<{ numer: number; denom: number; decimal: number } | null>(null);

  const calculate = useCallback(() => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult(null);
      return;
    }
    let rn: number, rd: number;
    switch (operator) {
      case '+': rn = n1 * d2 + n2 * d1; rd = d1 * d2; break;
      case '-': rn = n1 * d2 - n2 * d1; rd = d1 * d2; break;
      case '×': rn = n1 * n2; rd = d1 * d2; break;
      case '÷':
        if (n2 === 0) { setResult(null); return; }
        rn = n1 * d2; rd = d1 * n2;
        break;
      default: return;
    }
    const [sn, sd] = simplify(rn, rd);
    setResult({ numer: sn, denom: sd, decimal: sn / sd });
  }, [num1, den1, num2, den2, operator]);

  const reset = () => { setNum1(''); setDen1(''); setNum2(''); setDen2(''); setResult(null); };

  const FractionInput = ({ num, setNum, den, setDen, label }: { num: string; setNum: (v: string) => void; den: string; setDen: (v: string) => void; label: string }) => (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="flex items-center space-x-2">
        <div className="text-center">
          <Input type="number" value={num} onChange={e => setNum(e.target.value)} placeholder={isKo ? '분자' : 'Num'} className="w-20 text-center" />
          <div className="h-px bg-foreground my-1" />
          <Input type="number" value={den} onChange={e => setDen(e.target.value)} placeholder={isKo ? '분모' : 'Den'} className="w-20 text-center" />
        </div>
      </div>
    </div>
  );

  const inputSection = (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <FractionInput num={num1} setNum={setNum1} den={den1} setDen={setDen1} label={L('분수 1', 'Fraction 1')} />
        <Select value={operator} onValueChange={setOperator}>
          <SelectTrigger className="w-16 mt-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+</SelectItem>
            <SelectItem value="-">-</SelectItem>
            <SelectItem value="×">×</SelectItem>
            <SelectItem value="÷">÷</SelectItem>
          </SelectContent>
        </Select>
        <FractionInput num={num2} setNum={setNum2} den={den2} setDen={setDen2} label={L('분수 2', 'Fraction 2')} />
      </div>
      <div className="flex space-x-2">
        <Button onClick={calculate} className="flex-1">{L('계산', 'Calculate')}</Button>
        <Button onClick={reset} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
      </div>
    </div>
  );

  const resultSection = (
    <div>
      {result ? (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{L('계산 결과', 'Result')}</p>
            <div className="text-center my-2">
              <span className="font-mono text-2xl font-bold">
                {result.numer}
              </span>
              <span className="mx-1">/</span>
              <span className="font-mono text-2xl font-bold">
                {result.denom}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {L('소수:', 'Decimal:')} {result.decimal.toFixed(6)}
            </p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-1">{L('단계별 계산', 'Step-by-Step')}</p>
            <p className="text-xs font-mono">
              {num1}/{den1} {operator} {num2}/{den2}
            </p>
            <p className="text-xs font-mono mt-1">
              = {result.numer * (operator === '÷' ? 1 : 1)}/{result.denom}
              {result.numer !== result.numer || result.denom !== result.denom ? ` = ${result.numer}/${result.denom}` : ''}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? '분수를 입력하세요' : 'Enter fractions to calculate'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '분수 계산기' : 'Fraction Calculator'}
      description={isKo ? '두 분수의 사칙연산을 수행하고 기약분수와 소수로 결과를 표시합니다.' : 'Perform arithmetic on two fractions and see the result as a simplified fraction and decimal.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
