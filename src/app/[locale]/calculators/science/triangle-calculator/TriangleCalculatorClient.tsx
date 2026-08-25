'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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

interface TriangleCalculatorPageProps {
  infoSection: InfoSection;
}

export default function TriangleCalculatorPage({ infoSection }: TriangleCalculatorPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [mode, setMode] = useState('SAS');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const update = (key: string, val: string) => setInputs(prev => ({ ...prev, [key]: val }));

  const calculate = useCallback(() => {
    const v = (key: string) => parseFloat(inputs[key] || '');
    const deg2rad = (d: number) => (d * Math.PI) / 180;
    const rad2deg = (r: number) => (r * 180) / Math.PI;

    let sides: Record<string, number> = {};
    let angles: Record<string, number> = {};
    let area = 0;

    if (mode === 'SAS') {
      const a = v('a'), b = v('b'), C = v('C');
      if (isNaN(a) || isNaN(b) || isNaN(C)) { setResult(null); return; }
      const Crad = deg2rad(C);
      const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(Crad));
      const A = rad2deg(Math.asin((a * Math.sin(Crad)) / c));
      const B = 180 - A - C;
      sides = { a, b, c }; angles = { A, B, C };
      area = 0.5 * a * b * Math.sin(Crad);
    } else if (mode === 'ASA') {
      const A = v('A'), b = v('b'), B = v('B');
      if (isNaN(A) || isNaN(b) || isNaN(B)) { setResult(null); return; }
      const C = 180 - A - B;
      if (C <= 0) { setResult(null); return; }
      const Arad = deg2rad(A), Brad = deg2rad(B), Crad = deg2rad(C);
      const a = (b * Math.sin(Arad)) / Math.sin(Crad);
      const c = (b * Math.sin(Crad)) / Math.sin(Crad);
      sides = { a, b, c }; angles = { A, B, C };
      area = 0.5 * a * b * Math.sin(Crad);
    } else if (mode === 'SSS') {
      const a = v('a'), b = v('b'), c = v('c');
      if (isNaN(a) || isNaN(b) || isNaN(c)) { setResult(null); return; }
      if (a + b <= c || b + c <= a || a + c <= b) { setResult(null); return; }
      const A = rad2deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
      const B = rad2deg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
      const C = 180 - A - B;
      const s = (a + b + c) / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      sides = { a, b, c }; angles = { A, B, C };
    } else if (mode === 'AAS') {
      const A = v('A'), B = v('B'), a = v('a');
      if (isNaN(A) || isNaN(B) || isNaN(a)) { setResult(null); return; }
      const C = 180 - A - B;
      if (C <= 0) { setResult(null); return; }
      const Arad = deg2rad(A), Crad = deg2rad(C);
      const b = (a * Math.sin(deg2rad(B))) / Math.sin(Arad);
      const c = (a * Math.sin(Crad)) / Math.sin(Arad);
      sides = { a, b, c }; angles = { A, B, C };
      area = 0.5 * a * b * Math.sin(Crad);
    }
    setResult({ sides, angles, area });
  }, [mode, inputs]);

  const reset = () => { setInputs({}); setResult(null); };

  const inputFields: Record<string, { ko: string; en: string }[]> = {
    SAS: [{ ko: '변 a', en: 'Side a' }, { ko: '변 b', en: 'Side b' }, { ko: '각 C (도)', en: 'Angle C (°)' }],
    ASA: [{ ko: '각 A (도)', en: 'Angle A (°)' }, { ko: '변 b', en: 'Side b' }, { ko: '각 B (도)', en: 'Angle B (°)' }],
    SSS: [{ ko: '변 a', en: 'Side a' }, { ko: '변 b', en: 'Side b' }, { ko: '변 c', en: 'Side c' }],
    AAS: [{ ko: '각 A (도)', en: 'Angle A (°)' }, { ko: '각 B (도)', en: 'Angle B (°)' }, { ko: '변 a', en: 'Side a' }],
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label>{L('계산 모드', 'Calculation Mode')}</Label>
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="SAS">SAS</TabsTrigger>
            <TabsTrigger value="ASA">ASA</TabsTrigger>
            <TabsTrigger value="SSS">SSS</TabsTrigger>
            <TabsTrigger value="AAS">AAS</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-xs text-muted-foreground mt-1">
          {mode === 'SAS' && L('양변 + 포합각: 두 변과 그 사이 각', 'Two sides + included angle')}
          {mode === 'ASA' && L('양각 + 포합변: 두 각과 그 사이 변', 'Two angles + included side')}
          {mode === 'SSS' && L('삼변: 세 변의 길이', 'Three sides')}
          {mode === 'AAS' && L('양각 + 비포합변: 두 각과 한 변', 'Two angles + a non-included side')}
        </p>
      </div>
      {inputFields[mode].map((field) => (
        <div key={field.en}>
          <Label>{isKo ? field.ko : field.en}</Label>
          <Input type="number" value={inputs[field.en] || ''} onChange={e => update(field.en, e.target.value)} placeholder="0" />
        </div>
      ))}
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
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{L('변의 길이', 'Side Lengths')}</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">a</p><p className="font-bold">{result.sides.a.toFixed(4)}</p></div>
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">b</p><p className="font-bold">{result.sides.b.toFixed(4)}</p></div>
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">c</p><p className="font-bold">{result.sides.c.toFixed(4)}</p></div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{L('각의 크기', 'Angle Measures')}</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">A</p><p className="font-bold">{result.angles.A.toFixed(2)}°</p></div>
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">B</p><p className="font-bold">{result.angles.B.toFixed(2)}°</p></div>
              <div className="p-2 bg-card rounded"><p className="text-xs text-muted-foreground">C</p><p className="font-bold">{result.angles.C.toFixed(2)}°</p></div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{L('넓이', 'Area')}</p>
            <p className="text-2xl font-bold">{result.area.toFixed(4)}</p>
            <p className="text-xs text-muted-foreground mt-1">= 0.5 × a × b × sin(C)</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? ' 값을 입력하세요' : 'Enter values to calculate'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '삼각형 계산기' : 'Triangle Calculator'}
      description={isKo ? 'SAS, ASA, SSS, AAS 모드로 삼각형의 모든 변과 각, 넓이를 계산합니다.' : 'Calculate all sides, angles, and area of a triangle using SAS, ASA, SSS, or AAS modes.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
