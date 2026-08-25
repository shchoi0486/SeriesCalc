'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

function parseTime(str: string): number {
  const parts = str.split(':').map(Number);
  if (parts.length === 3 && parts.every(p => !isNaN(p))) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2 && parts.every(p => !isNaN(p))) {
    return parts[0] * 3600 + parts[1] * 60;
  }
  return NaN;
}

function formatTime(totalSec: number): string {
  const sign = totalSec < 0 ? '-' : '';
  const abs = Math.abs(totalSec);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.round(abs % 60);
  return `${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimeVerbose(totalSec: number): string {
  const sign = totalSec < 0 ? '-' : '';
  const abs = Math.abs(totalSec);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.round(abs % 60);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  if (s > 0) parts.push(`${s}초`);
  return sign + (parts.join(' ') || '0초');
}

function formatTimeVerboseEn(totalSec: number): string {
  const sign = totalSec < 0 ? '-' : '';
  const abs = Math.abs(totalSec);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.round(abs % 60);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0) parts.push(`${s}s`);
  return sign + (parts.join(' ') || '0s');
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface TimeCalculatorPageProps {
  infoSection: InfoSection;
}

export default function TimeCalculatorPage({ infoSection }: TimeCalculatorPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [time1, setTime1] = useState('');
  const [operator, setOperator] = useState('+');
  const [time2, setTime2] = useState('');
  const [result, setResult] = useState<{ formatted: string; verbose: string; totalSeconds: number } | null>(null);

  const calculate = useCallback(() => {
    const t1 = parseTime(time1);
    const t2 = parseTime(time2);
    if (isNaN(t1) || isNaN(t2)) { setResult(null); return; }
    const total = operator === '+' ? t1 + t2 : t1 - t2;
    setResult({
      formatted: formatTime(total),
      verbose: isKo ? formatTimeVerbose(total) : formatTimeVerboseEn(total),
      totalSeconds: total,
    });
  }, [time1, time2, operator, isKo]);

  const reset = () => { setTime1(''); setTime2(''); setResult(null); };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label>{L('시간 1 (시:분:초 또는 시:분)', 'Time 1 (hh:mm:ss or hh:mm)')}</Label>
        <Input value={time1} onChange={e => setTime1(e.target.value)} placeholder={isKo ? '예: 01:30:45' : 'e.g. 01:30:45'} />
      </div>
      <div>
        <Label>{L('연산자', 'Operator')}</Label>
        <Select value={operator} onValueChange={setOperator}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="+">+ ({L('덧셈', 'Add')})</SelectItem>
            <SelectItem value="-">- ({L('뺄셈', 'Subtract')})</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{L('시간 2 (시:분:초 또는 시:분)', 'Time 2 (hh:mm:ss or hh:mm)')}</Label>
        <Input value={time2} onChange={e => setTime2(e.target.value)} placeholder={isKo ? '예: 00:45:20' : 'e.g. 00:45:20'} />
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
            <p className="text-sm text-muted-foreground">{isKo ? '계산 결과' : 'Result'}</p>
            <p className="text-3xl font-bold font-mono mt-2">{result.formatted}</p>
            <p className="text-sm text-muted-foreground mt-2">{result.verbose}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-1">{L('상세 정보', 'Details')}</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-card rounded">
                <p className="text-muted-foreground">{L('시', 'Hours')}</p>
                <p className="font-bold text-lg">{Math.floor(Math.abs(result.totalSeconds) / 3600)}</p>
              </div>
              <div className="p-2 bg-card rounded">
                <p className="text-muted-foreground">{L('분', 'Minutes')}</p>
                <p className="font-bold text-lg">{Math.floor((Math.abs(result.totalSeconds) % 3600) / 60)}</p>
              </div>
              <div className="p-2 bg-card rounded">
                <p className="text-muted-foreground">{L('초', 'Seconds')}</p>
                <p className="font-bold text-lg">{Math.round(Math.abs(result.totalSeconds) % 60)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? '시간을 입력하세요' : 'Enter times to calculate'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '시간 덧셈/뺄셈 계산기' : 'Time Addition/Subtraction Calculator'}
      description={isKo ? '두 시간의 덧셈 또는 뺄셈을 시:분:초 단위로 정확하게 계산합니다.' : 'Accurately add or subtract two times in hours:minutes:seconds format.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
