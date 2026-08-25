"use client";

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { UNIT_DEFINITIONS, convert, DEFAULT_UNITS_BY_LOCALE } from '@/utils/unitConversion';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";

const group1 = ['length', 'area', 'volume', 'temperature'];
const group2 = ['flow', 'pressure', 'energy', 'mass', 'enthalpy'];

const NewUnitConverter = ({ category }: { category: string }) => {
  const { dict, locale, unitSystem } = useI18n();
  const t = dict.unitConverter;
  const categoryData = UNIT_DEFINITIONS[category];

  const units = useMemo(() => {
    if (!categoryData) return [];
    return Object.keys(categoryData.units);
  }, [categoryData]);

  const [fromUnit, setFromUnit] = useState('');
  const [fromValue, setFromValue] = useState('1');
  const [convertedValues, setConvertedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (categoryData && units.length > 0) {
      const localeKey = unitSystem === 'imperial' ? 'en' : 'ko';
      const defaultUnit = DEFAULT_UNITS_BY_LOCALE[localeKey]?.[category];
      setFromUnit(defaultUnit && units.includes(defaultUnit) ? defaultUnit : units[0]);
    } else {
      setFromUnit('');
    }
  }, [units, categoryData, category, unitSystem, locale]);

  useEffect(() => {
    if (!categoryData || !fromUnit || !units.includes(fromUnit)) {
      setConvertedValues({});
      return;
    }
    const value = parseFloat(fromValue);
    if (!isNaN(value)) {
      const newValues: { [key: string]: number } = {};
      units.forEach(unit => {
        newValues[unit] = convert(value, fromUnit, unit, category);
      });
      setConvertedValues(newValues);
    } else {
      setConvertedValues({});
    }
  }, [fromValue, fromUnit, category, units, categoryData]);

  if (!categoryData) return <p>{t.undefinedCategory}</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 relative flex-wrap sm:flex-nowrap">
        <select
          aria-label="Select unit to convert from"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full sm:w-[120px] border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        <Input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="text-right text-xs w-full sm:w-[200px]"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {units.map(unit => (
          <div key={unit} className="flex items-center justify-start gap-2">
            <span className="text-right w-[120px] text-xs py-2 px-3 bg-muted rounded-md shadow-inner">{convertedValues[unit]?.toFixed(2) || ''}</span>
            <span className="text-xs text-foreground whitespace-nowrap text-left font-bold">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const UnitConverterPage = () => {
  const { dict, locale } = useI18n();
  const t = dict.unitConverter;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const unitCategories = {
    group1: group1.map((id) => ({ id, name: dict.common.unitCategories[id as keyof typeof dict.common.unitCategories] || id })),
    group2: group2.map((id) => ({ id, name: dict.common.unitCategories[id as keyof typeof dict.common.unitCategories] || id })),
  };

  const groupLabels: { [key: string]: string } = {
    group1: t.groupLabels.group1,
    group2: t.groupLabels.group2,
  };

  const inputSection = (
    <div className="space-y-4">
      <Tabs defaultValue="group1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-10">
          <TabsTrigger value="group1">{groupLabels.group1}</TabsTrigger>
          <TabsTrigger value="group2">{groupLabels.group2}</TabsTrigger>
        </TabsList>

        <TabsContent value="group1" className="mt-4">
          <Tabs defaultValue={unitCategories.group1[0].id} className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-start flex-wrap gap-1">
              {unitCategories.group1.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
              ))}
            </TabsList>
            {unitCategories.group1.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <NewUnitConverter category={category.id} />
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="group2" className="mt-4">
          <Tabs defaultValue={unitCategories.group2[0].id} className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-start flex-wrap gap-1">
              {unitCategories.group2.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
              ))}
            </TabsList>
            {unitCategories.group2.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <NewUnitConverter category={category.id} />
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );

  const resultSection = null;

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
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle1}</h4>
          <p>{t.formulaDesc1}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center overflow-x-auto">
            <BlockMath math={t.formulaFormula} />
          </div>
          <p className="text-sm text-muted-foreground">{t.formulaExample}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle2}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <BlockMath math="^{\circ}\text{F} = ^{\circ}\text{C} \times \dfrac{9}{5} + 32" />
            <BlockMath math="\text{K} = ^{\circ}\text{C} + 273.15" />
          </div>
          <p className="text-sm text-muted-foreground">{t.formulaDesc2}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formulaTitle3}</h4>
          <p>{t.formulaExampleDesc}</p>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formulaExampleResult}</p>
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
          <li>{L('측정할 카테고리(길이, 넓이, 부피, 온도 등)를 선택하세요.', 'Choose the measurement category (length, area, volume, temperature, etc.).')}</li>
          <li>{L('변환할 입력 단위를 선택하세요.', 'Choose the input unit to convert from.')}</li>
          <li>{L('변환할 값을 입력하세요.', 'Enter the value you want to convert.')}</li>
          <li>{L('출력 단위로 변환된 값을 확인하세요.', 'Check the converted value in the output unit.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1000 mg → g</h4>
          <p>{L('1,000밀리그램(mg)은 정확히 1그램(g)입니다. 약물 용량 계산에서 자주 쓰입니다.', '1,000 milligrams (mg) is exactly 1 gram (g). It is commonly used in medication dosing.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 gallon → L</h4>
          <p>{L('1갤런(미국)은 약 3.785리터(L)입니다. 연료 효율이나 액체 용량에 쓰입니다.', '1 US gallon is approximately 3.785 liters (L). It is used for fuel efficiency and liquid capacity.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">1 yard → m</h4>
          <p>{L('1야드(yard)는 정확히 0.9144미터(m)입니다. 미국 미식축구에서 필드 거리로 자주 쓰입니다.', '1 yard is exactly 0.9144 meters (m). It is often used for field distances in American football.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('어떤 카테고리가 지원되나요?', 'Which categories are supported?'),
            a: L('길이, 넓이, 부피, 온도, 유량, 압력, 에너지, 질량, 엔탈피 등의 카테고리를 지원합니다. 각 카테고리에서 여러 단위를 서로 변환할 수 있습니다.', 'Supported categories include length, area, volume, temperature, flow, pressure, energy, mass, and enthalpy. Within each category, many units can be converted between each other.'),
          },
          {
            q: L('야드파운드법과 미터법의 차이는 무엇인가요?', 'What is the difference between imperial and metric units?'),
            a: L('미터법은 미터, 킬로미터, 리터, 킬로그램을 기반으로 하며 대부분의 국가에서 사용합니다. 야드파운드법은 피트, 마일, 갤런, 파운드를 사용하며 미국 등에서 주로 쓰입니다.', 'The metric system is based on meters, kilometers, liters, and kilograms and is used in most countries. The imperial system uses feet, miles, gallons, and pounds, mainly in the US.'),
          },
          {
            q: L('변환의 정밀도는 어느 정도인가요?', 'How precise are the conversions?'),
            a: L('변환 결과는 소수점 두 자리까지 표시됩니다. 계산은 정의된 변환 계수를 사용하므로 반올림 오차가 작습니다.', 'Conversion results are shown to two decimal places. Calculations use defined conversion factors, so rounding errors are minimal.'),
          },
          {
            q: L('복합 단위는 지원되나요?', 'Are compound units supported?'),
            a: L('이 변환기는 단순 단위 간 변환에 중점을 둡니다. m/s 같은 복합 단위나 복잡한 조합 단위는 이 도구에서 직접 지원되지 않을 수 있습니다.', 'This converter focuses on converting between simple units. Compound units like m/s or complex combined units may not be directly supported here.'),
          },
          {
            q: L('과학적 표기법은 어떻게 처리되나요?', 'How is scientific notation handled?'),
            a: L('매우 크거나 작은 값은 과학적 표기법(예: 1.23e+6)으로 표시되어 자릿수를 명확하게 표현합니다. 이를 통해 극단적인 값을 쉽게 읽을 수 있습니다.', 'Very large or small values are shown in scientific notation (e.g., 1.23e+6) to express magnitude clearly, making extreme values easy to read.'),
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
      showUnitToggle
    />
  );
};

export default UnitConverterPage;
