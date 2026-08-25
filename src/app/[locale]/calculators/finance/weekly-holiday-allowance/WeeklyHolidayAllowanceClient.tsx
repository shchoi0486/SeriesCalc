'use client'

import React, { useState, useMemo } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface WeeklyHolidayAllowanceCalculatorProps {
  infoSection: InfoSection;
}

const WeeklyHolidayAllowanceCalculator = ({ infoSection }: WeeklyHolidayAllowanceCalculatorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.weeklyHoliday;
  const isKo = locale === 'ko';

  const [hourlyWage, setHourlyWage] = useState<number>(0);
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(0);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(0);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value.replace(/,/g, ''));
    setter(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (value: string) => {
    const parsedValue = parseFloat(value);
    setter(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const handleReset = () => {
    setHourlyWage(0);
    setWorkHoursPerDay(0);
    setWorkDaysPerWeek(0);
  };

  const { calculatedWeeklyHolidayAllowance, calculatedWeeklyWorkHours } = useMemo(() => {
    if (isNaN(hourlyWage) || isNaN(workHoursPerDay) || isNaN(workDaysPerWeek) || hourlyWage <= 0 || workHoursPerDay <= 0 || workDaysPerWeek <= 0) {
      return {
        calculatedWeeklyHolidayAllowance: 0,
        calculatedWeeklyWorkHours: 0,
      };
    }

    const weeklyWorkHours = workHoursPerDay * workDaysPerWeek;
    let weeklyHolidayAllowance = 0;

    if (weeklyWorkHours >= 15) {
      weeklyHolidayAllowance = (weeklyWorkHours / 40) * 8 * hourlyWage;
    }

    return {
      calculatedWeeklyHolidayAllowance: Math.round(weeklyHolidayAllowance),
      calculatedWeeklyWorkHours: weeklyWorkHours,
    };
  }, [hourlyWage, workHoursPerDay, workDaysPerWeek]);

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hourlyWage">{t.inputs.hourlyWage}</Label>
        <Input
          id="hourlyWage"
          value={hourlyWage.toLocaleString()}
          onChange={handleInputChange(setHourlyWage)}
          type="text"
          inputMode="numeric"
          className="text-right"
          placeholder={t.placeholders.hourlyWage}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workHoursPerDay">{t.inputs.workHoursPerDay}</Label>
        <Input
          id="workHoursPerDay"
          value={workHoursPerDay.toLocaleString()}
          onChange={handleInputChange(setWorkHoursPerDay)}
          type="text"
          inputMode="numeric"
          className="text-right"
          placeholder={t.placeholders.workHoursPerDay}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workDaysPerWeek">{t.inputs.workDaysPerWeek}</Label>
        <Select onValueChange={handleSelectChange(setWorkDaysPerWeek)} value={String(workDaysPerWeek)}>
          <SelectTrigger id="workDaysPerWeek">
            <SelectValue placeholder={t.placeholders.workDaysPerWeek} />
          </SelectTrigger>
          <SelectContent>
            {[...Array(7)].map((_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}{isKo ? '일' : ' days'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleReset} className="w-full" variant="outline">
        {t.reset}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      <div className="flex justify-between text-lg font-semibold">
        <span>{t.results.weeklyWorkHours}</span>
        <span>{calculatedWeeklyWorkHours.toLocaleString()}{isKo ? ' 시간' : ' hours'}</span>
      </div>
      <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
        <span>{t.results.weeklyHolidayAllowance}</span>
        <span>{calculatedWeeklyHolidayAllowance.toLocaleString()}{isKo ? '원' : ' KRW'}</span>
      </div>
    </div>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default WeeklyHolidayAllowanceCalculator;
