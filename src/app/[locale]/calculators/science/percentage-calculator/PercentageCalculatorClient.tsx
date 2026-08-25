'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PercentageCalculatorPageProps {
  infoSection: InfoSection;
}

export default function PercentageCalculatorPage({ infoSection }: PercentageCalculatorPageProps) {
  const { dict, locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [mode1A, setMode1A] = useState('');
  const [mode1B, setMode1B] = useState('');
  const [mode2A, setMode2A] = useState('');
  const [mode2B, setMode2B] = useState('');
  const [mode3A, setMode3A] = useState('');
  const [mode3B, setMode3B] = useState('');
  const [result1, setResult1] = useState<number | null>(null);
  const [result2, setResult2] = useState<number | null>(null);
  const [result3, setResult3] = useState<number | null>(null);

  const calcMode1 = useCallback(() => {
    const a = parseFloat(mode1A);
    const b = parseFloat(mode1B);
    if (!isNaN(a) && !isNaN(b)) setResult1((a * b) / 100);
    else setResult1(null);
  }, [mode1A, mode1B]);

  const calcMode2 = useCallback(() => {
    const a = parseFloat(mode2A);
    const b = parseFloat(mode2B);
    if (!isNaN(a) && !isNaN(b) && b !== 0) setResult2((a / b) * 100);
    else setResult2(null);
  }, [mode2A, mode2B]);

  const calcMode3 = useCallback(() => {
    const a = parseFloat(mode3A);
    const b = parseFloat(mode3B);
    if (!isNaN(a) && !isNaN(b)) setResult3(a * (1 + b / 100));
    else setResult3(null);
  }, [mode3A, mode3B]);

  const resetMode1 = () => { setMode1A(''); setMode1B(''); setResult1(null); };
  const resetMode2 = () => { setMode2A(''); setMode2B(''); setResult2(null); };
  const resetMode3 = () => { setMode3A(''); setMode3B(''); setResult3(null); };

  const inputSection = (
    <Tabs defaultValue="mode1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="mode1">{L('A의 B%?', 'A of B%?')}</TabsTrigger>
        <TabsTrigger value="mode2">{L('A는 B의 몇%?', 'A is what % of B?')}</TabsTrigger>
        <TabsTrigger value="mode3">{L('A에서 B% 증감', 'A +/- B%')}</TabsTrigger>
      </TabsList>
      <TabsContent value="mode1" className="space-y-4 mt-4">
        <div>
          <Label>{L('값 (A)', 'Value (A)')}</Label>
          <Input type="number" value={mode1A} onChange={e => setMode1A(e.target.value)} placeholder={isKo ? '예: 200' : 'e.g. 200'} />
        </div>
        <div>
          <Label>{L('퍼센트 (B%)', 'Percentage (B%)')}</Label>
          <Input type="number" value={mode1B} onChange={e => setMode1B(e.target.value)} placeholder={isKo ? '예: 15' : 'e.g. 15'} />
        </div>
        <div className="flex space-x-2">
          <Button onClick={calcMode1} className="flex-1">{L('계산', 'Calculate')}</Button>
          <Button onClick={resetMode1} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
        </div>
      </TabsContent>
      <TabsContent value="mode2" className="space-y-4 mt-4">
        <div>
          <Label>{L('값 (A)', 'Value (A)')}</Label>
          <Input type="number" value={mode2A} onChange={e => setMode2A(e.target.value)} placeholder={isKo ? '예: 30' : 'e.g. 30'} />
        </div>
        <div>
          <Label>{L('전체 값 (B)', 'Total Value (B)')}</Label>
          <Input type="number" value={mode2B} onChange={e => setMode2B(e.target.value)} placeholder={isKo ? '예: 200' : 'e.g. 200'} />
        </div>
        <div className="flex space-x-2">
          <Button onClick={calcMode2} className="flex-1">{L('계산', 'Calculate')}</Button>
          <Button onClick={resetMode2} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
        </div>
      </TabsContent>
      <TabsContent value="mode3" className="space-y-4 mt-4">
        <div>
          <Label>{L('원래 값 (A)', 'Original Value (A)')}</Label>
          <Input type="number" value={mode3A} onChange={e => setMode3A(e.target.value)} placeholder={isKo ? '예: 100000' : 'e.g. 100000'} />
        </div>
        <div>
          <Label>{L('변화율 (B%, 음수 가능)', 'Change Rate (B%, negative for decrease)')}</Label>
          <Input type="number" value={mode3B} onChange={e => setMode3B(e.target.value)} placeholder={isKo ? '예: 20 또는 -10' : 'e.g. 20 or -10'} />
        </div>
        <div className="flex space-x-2">
          <Button onClick={calcMode3} className="flex-1">{L('계산', 'Calculate')}</Button>
          <Button onClick={resetMode3} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
        </div>
      </TabsContent>
    </Tabs>
  );

  const resultSection = (
    <Tabs defaultValue="mode1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="mode1">{L('A의 B%', 'A of B%')}</TabsTrigger>
        <TabsTrigger value="mode2">{L('몇%?', 'What %?')}</TabsTrigger>
        <TabsTrigger value="mode3">{L('증감 결과', 'Change Result')}</TabsTrigger>
      </TabsList>
      <TabsContent value="mode1" className="mt-4">
        {result1 !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{isKo ? `${mode1A}의 ${mode1B}%` : `${mode1B}% of ${mode1A}`}</p>
            <p className="text-2xl font-bold">{result1.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{isKo ? '값을 입력하세요' : 'Enter values to calculate'}</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="mode2" className="mt-4">
        {result2 !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{isKo ? `${mode2A}는 ${mode2B}의` : `${mode2A} is what % of ${mode2B}`}</p>
            <p className="text-2xl font-bold">{result2.toLocaleString(undefined, { maximumFractionDigits: 4 })}%</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{isKo ? '값을 입력하세요' : 'Enter values to calculate'}</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="mode3" className="mt-4">
        {result3 !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{isKo ? `${mode3A}에서 ${mode3B}% ${parseFloat(mode3B) >= 0 ? '증가' : '감소'}` : `${mode3A} ${parseFloat(mode3B) >= 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(mode3B))}%`}</p>
            <p className="text-2xl font-bold">{result3.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {isKo ? `변화량: ${Math.abs(result3 - parseFloat(mode3A || '0')).toLocaleString(undefined, { maximumFractionDigits: 6 })}` : `Change: ${Math.abs(result3 - parseFloat(mode3A || '0')).toLocaleString(undefined, { maximumFractionDigits: 6 })}`}
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{isKo ? '값을 입력하세요' : 'Enter values to calculate'}</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '퍼센트 계산기' : 'Percentage Calculator'}
      description={isKo ? '세 가지 모드로 퍼센트(%) 관련 계산을 간편하게 수행합니다.' : 'Perform percentage calculations easily with three modes.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
