'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

const krSizes = [85, 90, 95, 100, 105, 110, 115, 120];
const usSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

function krToUs(kr: number): string {
  const idx = krSizes.indexOf(kr);
  if (idx !== -1) return usSizes[idx];
  if (kr < 85) return 'XS';
  if (kr > 120) return '4XL+';
  const closest = krSizes.reduce((prev, curr) => Math.abs(curr - kr) < Math.abs(prev - kr) ? curr : prev);
  return usSizes[krSizes.indexOf(closest)];
}

function usToKr(us: string): number {
  const idx = usSizes.indexOf(us.toUpperCase());
  return idx !== -1 ? krSizes[idx] : 100;
}

function krToEu(kr: number): number {
  return Math.round((kr - 10) * 0.5);
}

function krToChestCm(kr: number): string {
  return `${kr - 10}~${kr - 5}`;
}

function krToWaistCm(kr: number): string {
  return `${kr - 20}~${kr - 15}`;
}

const refTable = [
  { kr: 85, chest: '80~85', waist: '65~70', us: 'XS', eu: '38' },
  { kr: 90, chest: '85~90', waist: '70~75', us: 'S', eu: '40' },
  { kr: 95, chest: '90~95', waist: '75~80', us: 'M', eu: '42' },
  { kr: 100, chest: '95~100', waist: '80~85', us: 'L', eu: '44' },
  { kr: 105, chest: '100~105', waist: '85~90', us: 'XL', eu: '46' },
  { kr: 110, chest: '105~110', waist: '90~95', us: 'XXL', eu: '48' },
  { kr: 115, chest: '110~115', waist: '95~100', us: '3XL', eu: '50' },
  { kr: 120, chest: '115~120', waist: '100~105', us: '4XL', eu: '52' },
];

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface KoreanClothingSizeConverterPageProps {
  infoSection: InfoSection;
}

export default function KoreanClothingSizeConverterPage({ infoSection }: KoreanClothingSizeConverterPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [mode, setMode] = useState<'krToUs' | 'usToKr' | 'krToBody'>('krToUs');
  const [krSize, setKrSize] = useState('100');
  const [usSize, setUsSize] = useState('L');
  const [result, setResult] = useState<any>(null);

  const convert = useCallback(() => {
    if (mode === 'krToUs') {
      const kr = parseInt(krSize);
      if (isNaN(kr)) { setResult(null); return; }
      setResult({
        type: 'krToUs',
        kr,
        us: krToUs(kr),
        eu: krToEu(kr),
        chest: krToChestCm(kr),
        waist: krToWaistCm(kr),
      });
    } else if (mode === 'usToKr') {
      const kr = usToKr(usSize);
      setResult({
        type: 'usToKr',
        kr,
        us: usSize.toUpperCase(),
        eu: krToEu(kr),
        chest: krToChestCm(kr),
        waist: krToWaistCm(kr),
      });
    } else {
      const kr = parseInt(krSize);
      if (isNaN(kr)) { setResult(null); return; }
      setResult({
        type: 'krToBody',
        kr,
        us: krToUs(kr),
        eu: krToEu(kr),
        chest: krToChestCm(kr),
        waist: krToWaistCm(kr),
      });
    }
  }, [mode, krSize, usSize]);

  const reset = () => { setKrSize('100'); setUsSize('L'); setResult(null); };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label>{L('변환 모드', 'Conversion Mode')}</Label>
        <Select value={mode} onValueChange={(v) => setMode(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="krToUs">{L('한국 사이즈 → 미국/유럽', 'Korean Size → US/EU')}</SelectItem>
            <SelectItem value="usToKr">{L('미국 사이즈 → 한국', 'US Size → Korean')}</SelectItem>
            <SelectItem value="krToBody">{L('한국 사이즈 → 체형 정보', 'Korean Size → Body Measurements')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {(mode === 'krToUs' || mode === 'krToBody') && (
        <div>
          <Label>{L('한국 의류 사이즈', 'Korean Clothing Size')}</Label>
          <Select value={krSize} onValueChange={setKrSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {krSizes.map(s => (
                <SelectItem key={s} value={String(s)}>{s}호</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {mode === 'usToKr' && (
        <div>
          <Label>{L('미국 의류 사이즈', 'US Clothing Size')}</Label>
          <Select value={usSize} onValueChange={setUsSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {usSizes.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="flex space-x-2">
        <Button onClick={convert} className="flex-1">{L('변환', 'Convert')}</Button>
        <Button onClick={reset} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
      </div>
    </div>
  );

  const resultSection = (
    <div>
      {result ? (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{L('변환 결과', 'Conversion Result')}</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">KR</p>
                <p className="text-2xl font-bold">{result.kr}호</p>
              </div>
              <span className="text-xl">→</span>
              <div>
                <p className="text-xs text-muted-foreground">US</p>
                <p className="text-2xl font-bold">{result.us}</p>
              </div>
              <span className="text-xl">→</span>
              <div>
                <p className="text-xs text-muted-foreground">EU</p>
                <p className="text-2xl font-bold">{result.eu}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground">{L('가슴둘레 (cm)', 'Chest (cm)')}</p>
              <p className="font-bold">{result.chest}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground">{L('허리둘레 (cm)', 'Waist (cm)')}</p>
              <p className="font-bold">{result.waist}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? '사이즈를 입력하세요' : 'Enter a size to convert'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '한국 의류 사이즈 변환기' : 'Korean Clothing Size Converter'}
      description={isKo ? '한국(95, 100, 105...), 미국(S, M, L...), 유럽 의류 사이즈를 상호 변환합니다.' : 'Convert between Korean (95, 100, 105...), US (S, M, L...), and EU clothing sizes.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
