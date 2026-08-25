'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Input } from '@/components/ui/input';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";

const units = ['mL', 'L', 'gal', 'qt', 'pt', 'cup', 'fl oz', 'm³', 'cm³'] as const;
type Unit = typeof units[number];

const toLiters: Record<Unit, number> = {
  mL: 0.001,
  L: 1,
  gal: 3.78541,
  qt: 0.946353,
  pt: 0.473176,
  cup: 0.236588,
  'fl oz': 0.0295735,
  'm³': 1000,
  'cm³': 0.001,
};

function convertVolume(value: number, fromUnit: Unit): Record<Unit, number> {
  const liters = value * toLiters[fromUnit];
  const result: Record<string, number> = {};
  units.forEach((u) => {
    result[u] = liters / toLiters[u];
  });
  return result as Record<Unit, number>;
}

function formatNumber(n: number): string {
  if (n === 0) return '0';
  if (n < 0.0001 && n > 0) return n.toExponential(2);
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toFixed(4).replace(/\.?0+$/, '');
}

export default function VolumeConverter() {
  const { dict } = useI18n();
  const t = dict.volumeConverter;
  const pathname = usePathname();
  const isKo = pathname.startsWith('/ko');
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<Unit>(isKo ? 'L' : 'gal');
  const [results, setResults] = useState<Record<Unit, number>>({} as Record<Unit, number>);

  useEffect(() => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setResults(convertVolume(num, fromUnit));
    } else {
      const empty: Record<string, number> = {};
      units.forEach((u) => { empty[u] = 0; });
      setResults(empty as Record<Unit, number>);
    }
  }, [value, fromUnit]);

  const inputSection = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="volumeValue" className="w-24">{t.inputLabel}</label>
        <Input
          id="volumeValue"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t.inputPlaceholder}
          className="flex-grow"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value as Unit)}
          className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {units.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-3">
      {units.map((u) => (
        <div key={u} className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="text-sm font-medium">{t.unitLabels[u]}</span>
          <span className="text-sm font-bold text-primary">{formatNumber(results[u] ?? 0)} {u}</span>
        </div>
      ))}
    </div>
  );

    const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p dangerouslySetInnerHTML={{ __html: t.calculatorDescription.p1 }} />
        <p>{t.calculatorDescription.p2}</p>
        <p>{t.calculatorDescription.p3}</p>
        <p className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          {t.calculatorDescription.note}
        </p>
        <TermGlossary items={t.glossary} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center space-y-1">
            <BlockMath math="1\,\text{L} = 1{,}000\,\text{mL} = 1{,}000\,\text{cm}^3" />
            <BlockMath math="1\,\text{m}^3 = 1{,}000\,\text{L}" />
            <BlockMath math="1\,\text{gal(US)} = 3.78541\,\text{L}" />
            <BlockMath math="1\,\text{qt} = 0.946353\,\text{L}" />
            <BlockMath math="1\,\text{cup} = 0.236588\,\text{L}" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{dict.unitConverter.formulaTitle3}</h4>
          <p>{t.formulaExample}</p>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formulaResult}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title1}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items1.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title2}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items2.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title3}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items3.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title4}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items4.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title5}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items5.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.title6}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            {t.tips.items6.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('변환할 입력 단위를 선택하세요. (L, mL, gallon, cup 등)', 'Choose the input unit to convert from. (L, mL, gallon, cup, etc.)')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value you want to convert.')}</li>
          <li>{L('변환할 출력 단위를 선택하세요.', 'Choose the output unit to convert to.')}</li>
          <li>{L('변환을 실행하면 모든 단위의 결과가 자동으로 표시됩니다.', 'Run the conversion and results in all units are shown automatically.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 gallon → L</h4>
          <p>{L('1갤런(미국)은 약 3.785리터(L)입니다. 자동차 연료 용량에 자주 쓰입니다.', '1 US gallon is approximately 3.785 liters (L). It is often used for vehicle fuel capacity.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 L → mL / cup</h4>
          <p>{L('1리터는 1,000mL이며 약 4.227컵(cup)입니다. 요리에서 흔한 단위 변환입니다.', '1 liter is 1,000 mL and approximately 4.227 cups. This is a common cooking conversion.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">500 mL → L</h4>
          <p>{L('500밀리리터는 0.5리터입니다. 물병이나 음료 용량에서 자주 보는 값입니다.', '500 milliliters is 0.5 liters. This is a common size for water bottles and beverages.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('리터(L)와 갤런(gal)은 어떻게 다른가요?', 'How do liters and gallons differ?'),
            a: L('리터는 미터법의 부피 단위이고 갤런은 야드파운드법의 부피 단위입니다. 1미국 갤런은 약 3.785리터입니다.', 'The liter is the metric unit of volume while the gallon is the imperial unit of volume. One US gallon is about 3.785 liters.'),
          },
          {
            q: L('밀리리터(mL)와 세제곱센티미터(cc)의 관계는?', 'What is the relationship between milliliters (mL) and cubic centimeters (cc)?'),
            a: L('1mL는 정확히 1cc(세제곱센티미터, cm³)와 같습니다. 의료 주사기와 엔진 배기량에서 두 단위가 혼용됩니다.', '1 mL is exactly equal to 1 cc (cubic centimeter, cm³). The two units are used interchangeably in medical syringes and engine displacement.'),
          },
          {
            q: L('요리에서 컵(cup), 큰술(tbsp), 작은술(tsp)은 어떻게 되나요?', 'How do cooking measurements like cup, tablespoon, and teaspoon work?'),
            a: L('1컵은 약 236.6mL, 1큰술(tbsp)은 약 14.8mL, 1작은술(tsp)은 약 4.9mL입니다. 요리 레시피에서 흔히 쓰입니다.', '1 cup is about 236.6 mL, 1 tablespoon (tbsp) is about 14.8 mL, and 1 teaspoon (tsp) is about 4.9 mL. These are common in cooking recipes.'),
          },
          {
            q: L('미국 갤런과 영국 갤런은 어떻게 다른가요?', 'How do US and UK gallons differ?'),
            a: L('미국 갤런은 약 3.785리터이고 영국(UK) 갤런은 약 4.546리터입니다. 두 값이 약 20% 차이가 나므로 국가에 맞는 단위를 사용해야 합니다.', 'The US gallon is about 3.785 liters while the UK (imperial) gallon is about 4.546 liters. The values differ by about 20%, so use the unit matching the country.'),
          },
          {
            q: L('액량 온스(fl oz)와 온스(oz)는 같은가요?', 'Are fluid ounces (fl oz) and ounces (oz) the same?'),
            a: L('아닙니다. 액량 온스(fl oz)는 부피 단위이고 온스(oz)는 무게 단위입니다. 예를 들어 물 1fl oz는 약 29.57mL이지만, 재료에 따라 무게는 다릅니다.', 'No. Fluid ounces (fl oz) measure volume while ounces (oz) measure weight. For example, 1 fl oz of water is about 29.57 mL, but the weight varies by substance.'),
          },
        ].map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

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
