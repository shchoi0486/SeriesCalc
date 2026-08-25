'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Input } from '@/components/ui/input';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";

const units = ['mg', 'g', 'kg', 'ton', 'oz', 'lb'] as const;
type Unit = typeof units[number];

const toGrams: Record<Unit, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  ton: 1000000,
  oz: 28.3495,
  lb: 453.592,
};

function convertWeight(value: number, fromUnit: Unit): Record<Unit, number> {
  const grams = value * toGrams[fromUnit];
  const result: Record<string, number> = {};
  units.forEach((u) => {
    result[u] = grams / toGrams[u];
  });
  return result as Record<Unit, number>;
}

function formatNumber(n: number): string {
  if (n === 0) return '0';
  if (n < 0.0001 && n > 0) return n.toExponential(2);
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toFixed(4).replace(/\.?0+$/, '');
}

export default function WeightConverter() {
  const { dict } = useI18n();
  const t = dict.weightConverter;
  const pathname = usePathname();
  const isKo = pathname.startsWith('/ko');
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<Unit>(isKo ? 'kg' : 'lb');
  const [results, setResults] = useState<Record<Unit, number>>({} as Record<Unit, number>);

  useEffect(() => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setResults(convertWeight(num, fromUnit));
    } else {
      const empty: Record<string, number> = {};
      units.forEach((u) => { empty[u] = 0; });
      setResults(empty as Record<Unit, number>);
    }
  }, [value, fromUnit]);

  const inputSection = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="weightValue" className="w-24">{t.inputLabel}</label>
        <Input
          id="weightValue"
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
            <BlockMath math="1\,\text{kg} = 1{,}000\,\text{g} = 1{,}000{,}000\,\text{mg}" />
            <BlockMath math="1\,\text{ton} = 1{,}000\,\text{kg}" />
            <BlockMath math="1\,\text{oz} = 28.3495\,\text{g}" />
            <BlockMath math="1\,\text{lb} = 16\,\text{oz} = 453.592\,\text{g}" />
            <BlockMath math="1\,\text{kg} \approx 2.2046\,\text{lb}" />
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
          <li>{L('변환할 입력 단위를 선택하세요. (g, kg, lb, oz 등)', 'Choose the input unit to convert from. (g, kg, lb, oz, etc.)')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value you want to convert.')}</li>
          <li>{L('변환할 출력 단위를 선택하세요.', 'Choose the output unit to convert to.')}</li>
          <li>{L('변환을 실행하면 모든 단위의 결과가 자동으로 표시됩니다.', 'Run the conversion and results in all units are shown automatically.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 kg → lb</h4>
          <p>{L('1킬로그램(kg)은 약 2.2046파운드(lb)입니다. 체중이나 화물 무게에 자주 쓰입니다.', '1 kilogram (kg) is approximately 2.2046 pounds (lb). It is often used for body weight and cargo.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 lb → g</h4>
          <p>{L('1파운드(lb)는 약 453.6그램(g)입니다. 미국 요리 레시피와 식품 포장에 쓰입니다.', '1 pound (lb) is approximately 453.6 grams (g). It is used in US recipes and food packaging.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">100 g → oz</h4>
          <p>{L('100그램(g)은 약 3.527온스(oz)입니다. 식품 영양 정보에서 흔한 변환입니다.', '100 grams (g) is approximately 3.527 ounces (oz). This is a common conversion in food nutrition.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('킬로그램(kg)과 파운드(lb)는 어떻게 다른가요?', 'How do kilograms and pounds differ?'),
            a: L('킬로그램은 미터법의 질량 단위이고 파운드는 야드파운드법의 질량 단위입니다. 1kg은 약 2.2046lb이며, 반대로 1lb는 약 0.4536kg입니다.', 'The kilogram is the metric unit of mass while the pound is the imperial unit of mass. 1 kg is about 2.2046 lb, and conversely 1 lb is about 0.4536 kg.'),
          },
          {
            q: L('그램(g)과 온스(oz)는 어떻게 다른가요?', 'How do grams and ounces differ?'),
            a: L('그램은 미터법의 작은 질량 단위이고 온스는 야드파운드법의 작은 질량 단위입니다. 1온스는 약 28.35그램입니다.', 'The gram is a small metric mass unit while the ounce is a small imperial mass unit. One ounce is about 28.35 grams.'),
          },
          {
            q: L('질량과 무게의 차이는 무엇인가요?', 'What is the difference between mass and weight?'),
            a: L('질량은 물체에 포함된 물질의 양으로 중력과 무관한 고유한 값입니다. 무게는 중력이 질량에 작용하는 힘으로, 장소에 따라 달라질 수 있습니다. 예를 들어 달에서는 체중이 약 1/6이 되지만 질량은 같습니다.', 'Mass is the amount of matter in an object and is independent of gravity. Weight is the force of gravity acting on mass, which changes with location. For example, on the Moon your weight is about 1/6 but your mass is unchanged.'),
          },
          {
            q: L('톤(ton)의 종류는 어떻게 되나요?', 'What are the different types of tons?'),
            a: L('미터법 톤(metric ton)은 1,000kg이며, 미국의 쇼트 톤(short ton)은 약 907kg(2,000lb)입니다. 영국의 롱 톤(long ton)은 약 1,016kg(2,240lb)입니다.', 'A metric ton is 1,000 kg, a US short ton is about 907 kg (2,000 lb), and a UK long ton is about 1,016 kg (2,240 lb).'),
          },
          {
            q: L('체중은 왜 나라에 따라 kg 또는 lb로 측정되나요?', 'Why is body weight measured in kg in some countries and lb in others?'),
            a: L('미터법을 사용하는 나라는 킬로그램(kg)으로, 야드파운드법을 사용하는 미국과 일부 국가는 파운드(lb)로 체중을 표기합니다. 이 도구로 두 단위를 쉽게 변환할 수 있습니다.', 'Countries using the metric system measure body weight in kilograms (kg), while the US and some other countries using the imperial system use pounds (lb). This tool converts easily between the two.'),
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
