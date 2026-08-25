'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';

type MovingType = 'oneroom' | 'tworoom' | 'threeroom' | 'office';

const baseCosts: Record<MovingType, { min: number; max: number }> = {
  oneroom: { min: 50000, max: 150000 },
  tworoom: { min: 150000, max: 300000 },
  threeroom: { min: 250000, max: 500000 },
  office: { min: 200000, max: 600000 },
};

const distanceCostPerKm = 500;
const optionCosts: Record<string, { cost: number; ko: string; en: string }> = {
  aircon: { cost: 50000, ko: '에어컨 설치/이전', en: 'Air Conditioner' },
  piano: { cost: 150000, ko: '피아노 운반', en: 'Piano Moving' },
  wardrobe: { cost: 30000, ko: '붙박이장 이전', en: 'Wardrobe Moving' },
  fridge: { cost: 40000, ko: '냉장고 이전', en: 'Refrigerator Moving' },
  washer: { cost: 30000, ko: '세탁기 이전', en: 'Washer Moving' },
  disassembly: { cost: 30000, ko: '가구 분리/조립', en: 'Furniture Assembly' },
};

const formatWon = (n: number) => `\u20A9${n.toLocaleString()}`;

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface MovingCostCalculatorPageProps {
  infoSection: InfoSection;
}

export default function MovingCostCalculatorPage({ infoSection }: MovingCostCalculatorPageProps) {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [movingType, setMovingType] = useState<MovingType>('tworoom');
  const [distance, setDistance] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [floor, setFloor] = useState('');
  const [hasElevator, setHasElevator] = useState('yes');
  const [result, setResult] = useState<{ base: number; dist: number; floorExtra: number; options: number; total: number } | null>(null);

  const toggleOption = (key: string) => {
    setSelectedOptions(prev =>
      prev.includes(key) ? prev.filter(o => o !== key) : [...prev, key]
    );
  };

  const calculate = () => {
    const base = (baseCosts[movingType].min + baseCosts[movingType].max) / 2;
    const dist = (parseFloat(distance) || 0) * distanceCostPerKm;
    const floorNum = parseInt(floor) || 1;
    const floorExtra = floorNum >= 6 && hasElevator === 'no' ? (floorNum - 5) * 10000 : 0;
    const options = selectedOptions.reduce((sum, key) => sum + (optionCosts[key]?.cost || 0), 0);
    setResult({ base, dist, floorExtra, options, total: base + dist + floorExtra + options });
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label>{L('이사 유형', 'Moving Type')}</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {([
            ['oneroom', '원룸', 'Studio'],
            ['tworoom', '투룸', '2-Room'],
            ['threeroom', '쓰리룸', '3-Room'],
            ['office', '사무실', 'Office'],
          ] as const).map(([key, ko, en]) => (
            <Button
              key={key}
              variant={movingType === key ? 'default' : 'outline'}
              onClick={() => setMovingType(key)}
              className="text-sm"
            >
              {L(ko, en)}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>{L('이사 거리 (km)', 'Distance (km)')}</Label>
        <Input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="0" className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{L('층수', 'Floor')}</Label>
          <Input type="number" value={floor} onChange={e => setFloor(e.target.value)} placeholder="1" className="mt-1" />
        </div>
        <div>
          <Label>{L('엘리베이터', 'Elevator')}</Label>
          <div className="flex gap-2 mt-1">
            <Button variant={hasElevator === 'yes' ? 'default' : 'outline'} size="sm" onClick={() => setHasElevator('yes')}>{L('있음', 'Yes')}</Button>
            <Button variant={hasElevator === 'no' ? 'default' : 'outline'} size="sm" onClick={() => setHasElevator('no')}>{L('없음', 'No')}</Button>
          </div>
        </div>
      </div>
      <div>
        <Label>{L('추가 옵션', 'Additional Options')}</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.entries(optionCosts).map(([key, opt]) => (
            <Button
              key={key}
              variant={selectedOptions.includes(key) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleOption(key)}
              className="text-xs"
            >
              {L(opt.ko, opt.en)}
            </Button>
          ))}
        </div>
      </div>
      <Button onClick={calculate} className="w-full">{L('계산하기', 'Calculate')}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">{L('예상 총 이사 비용', 'Estimated Total Cost')}</p>
        <p className="text-2xl font-bold text-primary mt-1">{formatWon(result.total)}</p>
      </Card>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>{L('기본 이사비', 'Base Cost')}</span><span className="font-mono">{formatWon(result.base)}</span></div>
        <div className="flex justify-between"><span>{L('운송 거리비', 'Distance Cost')}</span><span className="font-mono">{formatWon(result.dist)}</span></div>
        <div className="flex justify-between"><span>{L('층수 추가비', 'Floor Surcharge')}</span><span className="font-mono">{formatWon(result.floorExtra)}</span></div>
        <div className="flex justify-between"><span>{L('추가 옵션비', 'Options Cost')}</span><span className="font-mono">{formatWon(result.options)}</span></div>
      </div>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-lg text-muted-foreground">{L('이사 정보를 입력하세요', 'Enter moving details to get an estimate')}</p>
    </div>
  );

  return (
    <CalculatorsLayout
      title={L('이사 비용 계산기', 'Moving Cost Calculator')}
      description={L('이사 유형, 거리, 옵션에 따른 예상 이사 비용을 계산합니다.', 'Estimate moving costs based on type, distance, and options.')}
      variant="grouped"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
