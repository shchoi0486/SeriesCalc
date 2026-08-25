'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Input } from '@/components/ui/input';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";

const units = ['mm', 'cm', 'm', 'km', 'inch', 'foot', 'yard', 'mile'] as const;
type Unit = typeof units[number];

const toMeters: Record<Unit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

function convertDistance(value: number, fromUnit: Unit): Record<Unit, number> {
  const meters = value * toMeters[fromUnit];
  const result: Record<string, number> = {};
  units.forEach((u) => {
    result[u] = meters / toMeters[u];
  });
  return result as Record<Unit, number>;
}

function formatNumber(n: number): string {
  if (n === 0) return '0';
  if (n < 0.0001 && n > 0) return n.toExponential(2);
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toFixed(6).replace(/\.?0+$/, '');
}

export default function DistanceConverter() {
  const { dict } = useI18n();
  const t = dict.distanceConverter;
  const pathname = usePathname();
  const isKo = pathname.startsWith('/ko');
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState<Unit>(isKo ? 'm' : 'foot');
  const [results, setResults] = useState<Record<Unit, number>>({} as Record<Unit, number>);

  useEffect(() => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setResults(convertDistance(num, fromUnit));
    } else {
      const empty: Record<string, number> = {};
      units.forEach((u) => { empty[u] = 0; });
      setResults(empty as Record<Unit, number>);
    }
  }, [value, fromUnit]);

  const inputSection = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="distanceValue" className="w-24">{t.inputLabel}</label>
        <Input
          id="distanceValue"
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
            <BlockMath math="1\,\text{m} = 100\,\text{cm} = 1{,}000\,\text{mm}" />
            <BlockMath math="1\,\text{km} = 1{,}000\,\text{m}" />
            <BlockMath math="1\,\text{inch} = 2.54\,\text{cm}" />
            <BlockMath math="1\,\text{foot} = 12\,\text{inch} = 30.48\,\text{cm}" />
            <BlockMath math="1\,\text{yard} = 3\,\text{feet} = 0.9144\,\text{m}" />
            <BlockMath math="1\,\text{mile} = 1.609344\,\text{km}" />
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
          <li>{L('변환할 입력 단위를 선택하세요. (m, km, mile, yard, ft 등)', 'Choose the input unit to convert from. (m, km, mile, yard, ft, etc.)')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value you want to convert.')}</li>
          <li>{L('변환할 출력 단위를 선택하세요.', 'Choose the output unit to convert to.')}</li>
          <li>{L('변환을 실행하면 모든 단위의 결과가 자동으로 표시됩니다.', 'Run the conversion and results in all units are shown automatically.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 mile → km</h4>
          <p>{L('1마일은 약 1.609km입니다. 마라톤이나 도로 거리 표시에서 자주 쓰입니다.', '1 mile is approximately 1.609 km. It is often used for marathons and road distance signs.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">5 km → m / yd</h4>
          <p>{L('5km는 5,000m이며 약 5,468야드(yard)입니다. 달리기 코스에서 흔한 거리입니다.', '5 km is 5,000 m and approximately 5,468 yards. It is a common running race distance.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 inch → cm</h4>
          <p>{L('1인치는 정확히 2.54cm입니다. 화면 크기나 작은 물건의 길이에 쓰입니다.', '1 inch is exactly 2.54 cm. It is used for screen sizes and small object lengths.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('미터법과 야드파운드법의 차이는 무엇인가요?', 'What is the difference between the metric and imperial systems?'),
            a: L('미터법(SI)은 미터(m), 킬로미터(km)를 사용하며 대부분의 나라에서 쓰입니다. 야드파운드법은 마일(mile), 야드(yard), 피트(foot), 인치(inch)를 사용하며 미국, 영국 등에서 주로 쓰입니다.', 'The metric system (SI) uses meters (m) and kilometers (km) and is used in most countries. The imperial system uses miles, yards, feet, and inches, mainly in the US and UK.'),
          },
          {
            q: L('마일을 킬로미터로 변환하는 계수는 무엇인가요?', 'What is the conversion factor from miles to kilometers?'),
            a: L('1마일은 정확히 1.609344km입니다. 대략적으로 1 mile ≈ 1.6 km로 계산하면 쉽습니다.', '1 mile is exactly 1.609344 km. As a quick estimate, 1 mile ≈ 1.6 km.'),
          },
          {
            q: L('각 단위는 언제 사용하는 것이 좋나요?', 'When should I use each unit?'),
            a: L('미터법 국가에서는 짧은 거리에는 미터(m)와 센티미터(cm), 긴 거리에는 킬로미터(km)를 사용합니다. 미국에서는 도로 거리에 마일, 신장과 작은 거리에 피트와 인치를 사용합니다.', 'In metric countries, use meters (m) and centimeters (cm) for short distances and kilometers (km) for long ones. In the US, miles are used for roads, and feet and inches for height and short lengths.'),
          },
          {
            q: L('해리(nautical mile)는 무엇인가요?', 'What is a nautical mile?'),
            a: L('해리는 항공과 해상에서 사용되는 단위로, 1해리는 약 1.852km입니다. 위도 1분(1/60도)에 해당하며 위성 항법과 항해에 사용됩니다.', 'A nautical mile is used in aviation and maritime navigation, equal to about 1.852 km. It corresponds to one minute of latitude and is used in navigation and GPS.'),
          },
          {
            q: L('정밀도와 반올림은 어떻게 되나요?', 'How are precision and rounding handled?'),
            a: L('변환 결과는 최대 소수점 6자리까지 표시됩니다. 큰 수는 천 단위 구분 기호로 표시되고, 매우 작은 값은 지수 표기법으로 표시됩니다.', 'Conversion results are shown to up to 6 decimal places. Large numbers use thousands separators, and very small values are shown in exponential notation.'),
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
