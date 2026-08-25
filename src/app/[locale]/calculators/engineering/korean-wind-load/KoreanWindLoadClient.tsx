'use client';

import React, { useState, useMemo } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { useI18n } from '@/i18n/I18nProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type RegionType = 'urban' | 'coastal' | 'mountainous';

const REGION_LABELS: Record<RegionType, { ko: string; en: string }> = {
  urban: { ko: '도시지역', en: 'Urban' },
  coastal: { ko: '해안지역', en: 'Coastal' },
  mountainous: { ko: '산간지역', en: 'Mountainous' },
};

const WIND_SPEED_TABLE = [
  { region: '도시 (Urban)', v10: '25.0', v50: '30.0', v100: '33.0' },
  { region: '해안 (Coastal)', v10: '30.0', v50: '36.0', v100: '40.0' },
  { region: '산간 (Mountainous)', v10: '28.0', v50: '33.0', v100: '37.0' },
];

const WIND_PRESSURE_LEVELS = [
  { max: 500, label: { ko: '낮음', en: 'Low' }, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  { max: 1500, label: { ko: '보통', en: 'Moderate' }, color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  { max: 3000, label: { ko: '높음', en: 'High' }, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  { max: Infinity, label: { ko: '매우 높음', en: 'Very High' }, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
];

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface KoreanWindLoadCalculatorProps {
  infoSection: InfoSection;
}

const KoreanWindLoadCalculator = ({ infoSection }: KoreanWindLoadCalculatorProps) => {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [height, setHeight] = useState<string>('');
  const [windSpeed, setWindSpeed] = useState<string>('');
  const [cp, setCp] = useState<string>('1.3');
  const [area, setArea] = useState<string>('');
  const [region, setRegion] = useState<RegionType>('urban');

  const handleReset = () => {
    setHeight('');
    setWindSpeed('');
    setCp('1.3');
    setArea('');
    setRegion('urban');
  };

  const results = useMemo(() => {
    const h = parseFloat(height);
    const v = parseFloat(windSpeed);
    const cpVal = parseFloat(cp);
    const a = parseFloat(area);

    if (isNaN(h) || isNaN(v) || isNaN(cpVal) || isNaN(a)) return null;

    const rho = 1.225;
    const q0 = 0.5 * rho * v * v;
    const gfBase = region === 'coastal' ? 2.0 : region === 'mountainous' ? 1.8 : 1.5;
    const gf = Math.min(2.2, Math.max(1.0, gfBase + (h > 60 ? 0.2 : 0)));
    const q = q0 * cpVal * gf;
    const windLoad = q * a;

    let level = WIND_PRESSURE_LEVELS[WIND_PRESSURE_LEVELS.length - 1];
    for (const l of WIND_PRESSURE_LEVELS) {
      if (windLoad <= l.max) {
        level = l;
        break;
      }
    }

    return { q0, q, gf, windLoad, level, rho };
  }, [height, windSpeed, cp, area, region]);

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="height">{L('건물높이 (m)', 'Building Height (m)')}</Label>
        <Input
          id="height"
          type="number"
          min="0"
          step="0.1"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder={L('예: 30', 'e.g. 30')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="windSpeed">{L('기본풍속 (m/s)', 'Basic Wind Speed (m/s)')}</Label>
        <Input
          id="windSpeed"
          type="number"
          min="0"
          step="0.1"
          value={windSpeed}
          onChange={(e) => setWindSpeed(e.target.value)}
          placeholder={L('예: 30', 'e.g. 30')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cp">{L('풍압계수 (Cp)', 'Pressure Coefficient (Cp)')}</Label>
        <Input
          id="cp"
          type="number"
          min="0"
          step="0.01"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
          placeholder="1.3"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="area">{L('정면투사면적 (㎡)', 'Projected Frontal Area (㎡)')}</Label>
        <Input
          id="area"
          type="number"
          min="0"
          step="0.1"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder={L('예: 500', 'e.g. 500')}
        />
      </div>
      <div className="space-y-2">
        <Label>{L('지역구분', 'Region Type')}</Label>
        <Select value={region} onValueChange={(v) => setRegion(v as RegionType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urban">{REGION_LABELS.urban[isKo ? 'ko' : 'en']}</SelectItem>
            <SelectItem value="coastal">{REGION_LABELS.coastal[isKo ? 'ko' : 'en']}</SelectItem>
            <SelectItem value="mountainous">{REGION_LABELS.mountainous[isKo ? 'ko' : 'en']}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleReset} className="w-full" variant="outline">
        {L('초기화', 'Reset')}
      </Button>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {!results ? (
        <p className="text-muted-foreground text-center py-8">
          {L('모든 값을 입력하면 결과가 표시됩니다.', 'Enter all values to see results.')}
        </p>
      ) : (
        <>
          <div className={`p-4 rounded-lg text-center ${results.level.color}`}>
            <div className="text-sm font-medium mb-1">{L('풍하중 등급', 'Wind Load Level')}</div>
            <div className="text-2xl font-bold">{results.level.label[isKo ? 'ko' : 'en']}</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('공기밀도 (ρ)', 'Air Density (ρ)')}</span>
              <span className="font-mono">{results.rho} kg/m³</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('기본풍압 (q₀)', 'Base Pressure (q₀)')}</span>
              <span className="font-mono">{results.q0.toFixed(2)} Pa</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('돌풍계수 (Gf)', 'Gust Factor (Gf)')}</span>
              <span className="font-mono">{results.gf.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 bg-muted rounded-lg">
              <span className="font-medium">{L('설계풍압 (q)', 'Design Pressure (q)')}</span>
              <span className="font-mono">{results.q.toFixed(2)} Pa</span>
            </div>
            <div className="flex justify-between p-3 border-2 border-primary rounded-lg">
              <span className="font-bold">{L('풍하중 (W)', 'Wind Load (W)')}</span>
              <span className="font-mono font-bold text-lg">{results.windLoad.toFixed(2)} N</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <CalculatorsLayout
      title={L('한국 풍하중 계산기 (KDS 4110)', 'Korean Wind Load Calculator (KDS 4110)')}
      description={L(
        'KDS 4110 기준에 따라 건축물 풍하중을 계산합니다.',
        'Calculate wind loads on buildings per KDS 4110 standard.'
      )}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default KoreanWindLoadCalculator;
