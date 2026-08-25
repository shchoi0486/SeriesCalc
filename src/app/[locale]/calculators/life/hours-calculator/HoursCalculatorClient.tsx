'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

function timeToMinutes(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length >= 2 && parts.every(p => !isNaN(p))) {
    return parts[0] * 60 + parts[1] + (parts.length === 3 ? parts[2] / 60 : 0);
  }
  return NaN;
}

function formatMinutes(mins: number, isKo: boolean = true): string {
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.round(Math.abs(mins) % 60);
  return isKo ? `${h}시간 ${m}분` : `${h}h ${m}m`;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface HoursCalculatorPageProps {
  infoSection: InfoSection;
}

export default function HoursCalculatorPage({ infoSection }: HoursCalculatorPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [clockIn, setClockIn] = useState('09:00');
  const [clockOut, setClockOut] = useState('18:00');
  const [breakMinutes, setBreakMinutes] = useState('60');
  const [workDays, setWorkDays] = useState('5');
  const [holidayHours, setHolidayHours] = useState('');
  const [nightStart, setNightStart] = useState('22:00');
  const [nightEnd, setNightEnd] = useState('06:00');
  const [baseHourlyWage, setBaseHourlyWage] = useState('10030');
  const [result, setResult] = useState<any>(null);

  const calculate = useCallback(() => {
    const inMin = timeToMinutes(clockIn);
    const outMin = timeToMinutes(clockOut);
    const brk = parseFloat(breakMinutes) || 0;
    const days = parseInt(workDays) || 0;
    const nightS = timeToMinutes(nightStart);
    const nightE = timeToMinutes(nightEnd);
    const hourlyWage = parseFloat(baseHourlyWage) || 10030;
    const holidayMinInput = parseFloat(holidayHours) || 0;

    if (isNaN(inMin) || isNaN(outMin) || days <= 0) { setResult(null); return; }

    let totalMin = outMin - inMin;
    if (totalMin < 0) totalMin += 24 * 60;
    totalMin -= brk;

    const dailyBaseLimit = 8 * 60;
    const dailyOvertimeLimit = 4 * 60;

    let baseMin = Math.min(totalMin, dailyBaseLimit);
    let overtimeMin = Math.min(Math.max(0, totalMin - dailyBaseLimit), dailyOvertimeLimit);

    let nightMin = 0;
    if (nightS !== nightE && totalMin > 0) {
      const nightStartMin = nightS;
      const nightEndMin = nightE;
      if (nightStartMin > nightEndMin) {
        if (inMin < nightStartMin && outMin > nightStartMin) {
          nightMin = Math.min(outMin, nightEndMin + 24 * 60) - nightStartMin;
        } else if (inMin >= nightStartMin || outMin <= nightEndMin) {
          nightMin = outMin > nightStartMin ? Math.min(outMin, nightEndMin + 24 * 60) - nightStartMin : 0;
        }
      } else {
        if (inMin < nightEndMin && outMin > nightStartMin) {
          nightMin = Math.min(outMin, nightEndMin) - nightStartMin;
        }
      }
      nightMin = Math.max(0, Math.min(nightMin, totalMin));
    }

    const dailyHolidayMin = holidayMinInput;
    const weeklyBaseMin = baseMin * days;
    const weeklyOvertimeMin = overtimeMin * days;
    const weeklyTotalMin = totalMin * days;
    const weeklyHolidayMin = dailyHolidayMin * days;

    const basePay = Math.round((baseMin / 60) * hourlyWage);
    const overtimePay = Math.round((overtimeMin / 60) * hourlyWage * 1.5);
    const nightPay = Math.round((nightMin / 60) * hourlyWage * 0.5);
    const holidayPay = Math.round((dailyHolidayMin / 60) * hourlyWage * 2.0);
    const totalPay = basePay + overtimePay + nightPay + holidayPay;
    const weeklyPay = totalPay * days;

    setResult({
      dailyBase: formatMinutes(baseMin, isKo),
      dailyOvertime: formatMinutes(overtimeMin, isKo),
      dailyNight: formatMinutes(nightMin, isKo),
      dailyHoliday: formatMinutes(dailyHolidayMin, isKo),
      dailyTotal: formatMinutes(totalMin, isKo),
      weeklyBase: formatMinutes(weeklyBaseMin, isKo),
      weeklyOvertime: formatMinutes(weeklyOvertimeMin, isKo),
      weeklyHoliday: formatMinutes(weeklyHolidayMin, isKo),
      weeklyTotal: formatMinutes(weeklyTotalMin, isKo),
      basePay,
      overtimePay,
      nightPay,
      holidayPay,
      totalPay,
      weeklyPay,
      baseMin,
      overtimeMin,
      nightMin,
      holidayMin: dailyHolidayMin,
      days,
    });
  }, [clockIn, clockOut, breakMinutes, workDays, holidayHours, nightStart, nightEnd, baseHourlyWage]);

  const reset = () => { setClockIn('09:00'); setClockOut('18:00'); setBreakMinutes('60'); setWorkDays('5'); setHolidayHours(''); setResult(null); };

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{L('출근 시간', 'Clock In')}</Label>
          <Input type="time" value={clockIn} onChange={e => setClockIn(e.target.value)} />
        </div>
        <div>
          <Label>{L('퇴근 시간', 'Clock Out')}</Label>
          <Input type="time" value={clockOut} onChange={e => setClockOut(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{L('휴게시간 (분)', 'Break (min)')}</Label>
          <Input type="number" value={breakMinutes} onChange={e => setBreakMinutes(e.target.value)} placeholder="60" />
        </div>
        <div>
          <Label>{L('근무일수 (주)', 'Work Days/Week')}</Label>
          <Input type="number" value={workDays} onChange={e => setWorkDays(e.target.value)} min="1" max="7" placeholder="5" />
        </div>
      </div>
      <div className="p-3 bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 rounded-r-lg">
        <p className="text-sm font-semibold">{L('휴일근무 시간 (일)', 'Holiday Hours (daily)')}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {L('공휴일이나 유급휴일에 근무하는 경우 하루 기준 시간을 입력하세요. 휴일수당(200%)이 적용됩니다.', 'Enter daily hours worked on public/paid holidays. Holiday premium (200%) applies.')}
        </p>
        <Input type="number" value={holidayHours} onChange={e => setHolidayHours(e.target.value)} placeholder="0" className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{L('야간 시작', 'Night Start')}</Label>
          <Input type="time" value={nightStart} onChange={e => setNightStart(e.target.value)} />
        </div>
        <div>
          <Label>{L('야간 종료', 'Night End')}</Label>
          <Input type="time" value={nightEnd} onChange={e => setNightEnd(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>{L('기본 시급 (원)', 'Base Hourly Wage (KRW)')}</Label>
        <Input type="number" value={baseHourlyWage} onChange={e => setBaseHourlyWage(e.target.value)} placeholder="10030" />
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
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{L('일간 근무시간', 'Daily Working Hours')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span>{L('기본근무', 'Regular')}:</span><span className="font-mono">{result.dailyBase}</span></div>
              <div className="flex justify-between"><span>{L('연장근무', 'Overtime')}:</span><span className="font-mono">{result.dailyOvertime}</span></div>
              <div className="flex justify-between"><span>{L('야간근무', 'Night')}:</span><span className="font-mono">{result.dailyNight}</span></div>
              <div className="flex justify-between"><span>{L('휴일근무', 'Holiday')}:</span><span className="font-mono">{result.dailyHoliday}</span></div>
              <div className="flex justify-between font-bold"><span>{L('총 근무시간', 'Total')}:</span><span className="font-mono">{result.dailyTotal}</span></div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{L('주간 근무시간', 'Weekly Working Hours')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between"><span>{L('기본근무', 'Regular')}:</span><span className="font-mono">{result.weeklyBase}</span></div>
              <div className="flex justify-between"><span>{L('연장근무', 'Overtime')}:</span><span className="font-mono">{result.weeklyOvertime}</span></div>
              <div className="flex justify-between"><span>{L('휴일근무', 'Holiday')}:</span><span className="font-mono">{result.weeklyHoliday}</span></div>
              <div className="flex justify-between font-bold"><span>{L('총 근무시간', 'Total')}:</span><span className="font-mono">{result.weeklyTotal}</span></div>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">{L('예상 급여 (일간)', 'Estimated Pay (Daily)')}</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>{L('기본급', 'Base')}:</span><span>₩{result.basePay.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>{L('연장수당 (150%)', 'Overtime (150%)')}:</span><span>₩{result.overtimePay.toLocaleString()}</span></div>
              {result.nightPay > 0 && <div className="flex justify-between"><span>{L('야간수당 (50%)', 'Night (50%)')}:</span><span>₩{result.nightPay.toLocaleString()}</span></div>}
              {result.holidayPay > 0 && <div className="flex justify-between"><span>{L('휴일수당 (200%)', 'Holiday (200%)')}:</span><span>₩{result.holidayPay.toLocaleString()}</span></div>}
              <div className="flex justify-between font-bold border-t pt-1"><span>{L('일일 총급여', 'Daily Total')}:</span><span>₩{result.totalPay.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{L('주간 예상 급여', 'Weekly Estimated Pay')}</p>
            <p className="text-2xl font-bold text-primary">₩{result.weeklyPay.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? '출퇴근 시간을 입력하세요' : 'Enter work hours to calculate'}</p>
        </div>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={isKo ? '근무시간 계산기' : 'Working Hours Calculator'}
      description={isKo ? '대한민국 노동법 기준으로 근무시간과 급여를 계산합니다.' : 'Calculate working hours and pay based on Korean labor law.'}
      variant="grouped"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
