'use client';

import React, { useState, useEffect } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Input } from '@/components/ui/input';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

import { useRouter, usePathname } from 'next/navigation';

const currencies = ['USD', 'EUR', 'JPY', 'CNY', 'KRW', 'GBP'] as const;
type Currency = typeof currencies[number];

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  CNY: '¥',
  KRW: '₩',
  GBP: '£',
};

// 내장 기준 환율 (USD 기준). 실시간 조회에 실패했을 때만 사용하는 안전망입니다.
const FALLBACK_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 1.08,
  JPY: 0.0067,
  CNY: 0.14,
  KRW: 0.00074,
  GBP: 1.27,
};

function convertCurrency(
  value: number,
  fromCurrency: Currency,
  rates: Record<Currency, number>
): Record<Currency, number> {
  const usd = value * (rates[fromCurrency] ?? 1);
  const result: Record<string, number> = {};
  currencies.forEach((c) => {
    result[c] = usd / (rates[c] ?? 1);
  });
  return result as Record<Currency, number>;
}

function formatCurrency(value: number, currency: Currency): string {
  const symbol = currencySymbols[currency];
  if (currency === 'KRW' || currency === 'JPY') {
    return `${symbol}${Math.round(value).toLocaleString()}`;
  }
  return `${symbol}${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function formatNumber(n: number): string {
  if (n === 0) return '0';
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CurrencyConverterProps {
  infoSection: InfoSection;
}

export default function CurrencyConverter({ infoSection }: CurrencyConverterProps) {
  const { dict } = useI18n();
  const t = dict.currencyConverter;
  const pathname = usePathname();
  const isKo = pathname.startsWith('/ko');

  const [value, setValue] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<Currency>(isKo ? 'KRW' : 'USD');
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [results, setResults] = useState<Record<Currency, number>>({} as Record<Currency, number>);

  // 실시간(일 1회 갱신) 기준 환율을 시도하고, 실패하면 내장 환율을 그대로 사용합니다.
  useEffect(() => {
    let cancelled = false;
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data?.rates) return;
        const next = { ...FALLBACK_RATES };
        currencies.forEach((c) => {
          const rate = data.rates[c];
          if (typeof rate === 'number' && rate > 0) next[c] = rate;
        });
        setRates(next);
        if (typeof data.time_last_update_utc === 'string') {
          setRateDate(data.time_last_update_utc.slice(0, 16));
        }
      })
      .catch(() => {
        /* 오프라인·차단 환경에서는 내장 환율 사용 */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setResults(convertCurrency(num, fromCurrency, rates));
    } else {
      const empty: Record<string, number> = {};
      currencies.forEach((c) => { empty[c] = 0; });
      setResults(empty as Record<Currency, number>);
    }
  }, [value, fromCurrency, rates]);

  const inputSection = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="currencyValue" className="w-24">{t.inputLabel}</label>
        <Input
          id="currencyValue"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.inputPlaceholder}
          className="flex-grow"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value as Currency)}
          className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-3">
      {currencies.map((c) => (
        <div key={c} className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="text-sm font-medium">{t.currencyNames[c]}</span>
          <span className="text-sm font-bold text-primary">{formatCurrency(results[c] ?? 0, c)}</span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground pt-1">
        {rateDate
          ? isKo
            ? `기준 환율 갱신: ${rateDate} UTC · 중간환율(수수료 미포함)`
            : `Rates updated: ${rateDate} UTC · mid-market (fees excluded)`
          : isKo
            ? '내장 기준 환율로 계산했습니다(실시간 조회 불가). 실제 거래 전 은행 고시 환율을 확인하세요.'
            : 'Calculated with built-in reference rates (live lookup unavailable). Check your bank’s rate before transacting.'}
      </p>
    </div>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      inputSection={inputSection}
      resultSection={resultSection}
      variant="split"
      infoSection={infoSection}
    />
  );
}
