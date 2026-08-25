"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { formatNumber, parseNumber } from "@/utils/formatNumber";
import CalculatorsLayout from "@/components/calculators/Calculatorslayout";
import TermGlossary from '@/components/calculators/TermGlossary';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CagrCalculatorProps {
  infoSection: InfoSection;
}

export default function CagrCalculator({ infoSection }: CagrCalculatorProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const [startValue, setStartValue] = useState<number>(10000000);
  const [endValue, setEndValue] = useState<number>(20000000);
  const [period, setPeriod] = useState<number>(5);
  const [cagr, setCagr] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [view, setView] = useState('chart');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value.replace(/,/g, ''));
    setter(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const calculate = () => {
    if (isNaN(startValue) || startValue <= 0) {
      toast.error(isKo ? "초기 자산을 올바르게 입력해주세요." : "Please enter a valid starting value.");
      return;
    }
    if (isNaN(endValue)) {
      toast.error(isKo ? "최종 자산을 올바르게 입력해주세요." : "Please enter a valid ending value.");
      return;
    }
    if (isNaN(period) || period <= 0) {
      toast.error(isKo ? "투자 기간을 올바르게 입력해주세요." : "Please enter a valid investment period.");
      return;
    }

    const cagrValue = (Math.pow(endValue / startValue, 1 / period) - 1) * 100;

    if (isNaN(cagrValue) || !isFinite(cagrValue)) {
      setCagr(null);
      setChartData([]);
      toast.error(isKo ? "계산 결과가 유효하지 않습니다. 입력값을 확인해주세요." : "The calculation result is invalid. Please check your inputs.");
      return;
    }

    setCagr(cagrValue);

    const data = Array.from({ length: period + 1 }, (_, i) => {
      const year = i;
      const value = startValue * Math.pow(1 + cagrValue / 100, year);
      return {
        year: isKo ? `${year}년차` : `Year ${year}`,
        value: parseFloat(value.toFixed(0)),
      };
    });
    setChartData(data);
    toast.success(isKo ? "CAGR 계산이 완료되었습니다." : "CAGR calculation completed.");
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="startValue">{isKo ? '초기 자산 (원)' : 'Starting Value (KRW)'}</Label>
        <Input
          id="startValue"
          value={startValue.toLocaleString()}
          onChange={handleInputChange(setStartValue)}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <div>
        <Label htmlFor="endValue">{isKo ? '최종 자산 (원)' : 'Ending Value (KRW)'}</Label>
        <Input
          id="endValue"
          value={endValue.toLocaleString()}
          onChange={handleInputChange(setEndValue)}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <div>
        <Label htmlFor="period">{isKo ? '투자 기간 (년)' : 'Investment Period (years)'}</Label>
        <Input
          id="period"
          value={period.toLocaleString()}
          onChange={handleInputChange(setPeriod)}
          className="text-right"
          type="text"
          inputMode="numeric"
        />
      </div>
      <Button onClick={calculate} className="w-full">{isKo ? '계산하기' : 'Calculate'}</Button>
    </div>
  );

  const resultSection = (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {cagr !== null ? (
        <div className="space-y-4 w-full">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">{isKo ? '연평균 성장률 (CAGR)' : 'Compound Annual Growth Rate (CAGR)'}</p>
            <p className="text-4xl sm:text-5xl font-bold text-primary">
              {cagr.toFixed(2)}%
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">{isKo ? '총 성장률' : 'Total Growth'}</p>
              <p className="text-lg font-bold text-foreground">
                {((endValue / startValue - 1) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">{isKo ? '원금 2배 기간' : 'Time to Double'}</p>
              <p className="text-lg font-bold text-foreground">
                {cagr > 0 ? (Math.log(2) / Math.log(1 + cagr / 100)).toFixed(1) : '-'}{isKo ? '년' : ' yr'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>{isKo ? '계산 결과가 여기에 표시됩니다.' : 'Calculation results will appear here.'}</p>
        </div>
      )}
    </div>
  );

  const fullWidthSection = cagr !== null && chartData.length > 0 ? (
    <div>
      <div className="flex justify-end mb-2">
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value)} size="sm">
          <ToggleGroupItem value="chart">{isKo ? '차트' : 'Chart'}</ToggleGroupItem>
          <ToggleGroupItem value="table">{isKo ? '표' : 'Table'}</ToggleGroupItem>
        </ToggleGroup>
      </div>
      {view === 'chart' ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={12} />
            <YAxis tickFormatter={(value) => value.toLocaleString()} fontSize={12} />
            <RechartsTooltip formatter={(value: number) => isKo ? `${value.toLocaleString()} 원` : `${value.toLocaleString()} KRW`} />
            <Legend />
            <Line type="monotone" dataKey="value" name={isKo ? '자산가치' : 'Asset Value'} stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="max-h-[320px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isKo ? '연도' : 'Year'}</TableHead>
                <TableHead className="text-right">{isKo ? '자산가치 (원)' : 'Asset Value (KRW)'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((data) => (
                <TableRow key={data.year}>
                  <TableCell>{data.year}</TableCell>
                  <TableCell className="text-right">{data.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  ) : null;

  return (
    <CalculatorsLayout
      title={isKo ? 'CAGR (연평균 성장률) 계산기' : 'CAGR (Compound Annual Growth Rate) Calculator'}
      description={isKo ? '투자의 연평균 성장률을 계산하여 성과를 측정합니다.' : 'Calculate the compound annual growth rate to measure investment performance.'}
      fullWidthSection={fullWidthSection}
      fullWidthTitle={isKo ? '성장 추이' : 'Growth Trend'}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}