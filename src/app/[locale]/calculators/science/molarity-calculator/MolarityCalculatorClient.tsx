'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";
import FaqItem from "@/components/calculators/FaqItem";

const infoSection = (isKo: boolean) => {
  const L = (ko: string, en: string) => (isKo ? ko : en);
  return {
  calculatorDescription: (
    <div className="space-y-4">
      <p>
        <strong>{L('몰농도 계산기', 'Molarity Calculator')}</strong>{L('은 용액의 몰농도(molarity)를 정확하게 계산하는 화학 실험실의 핵심 도구입니다. 몰농도는 용액 1리터(L)에 녹아 있는 용질의 몰(mol) 수를 나타내는 농도의 표현 방법으로, 화학 반응의 양적 관계를 이해하는 데 가장 널리 사용되는 단위입니다.', ' is an essential tool for chemistry labs to accurately calculate the molarity of a solution. Molarity expresses the number of moles of solute dissolved in one liter (L) of solution, and is the most widely used unit for understanding quantitative relationships in chemical reactions.')}
      </p>
      <p>
        <strong>{L('몰농도(M)', 'Molarity (M)')}</strong>{L('은 화학에서 가장 기본적인 농도 단위로, 용액의 부피 대비 용질의 양을 나타냅니다. 몰농도의 단위는 ', ' is the most fundamental concentration unit in chemistry, representing the amount of solute relative to the solution volume. Its unit is ')}<strong>{L('몰 매 리터(mol/L)', 'moles per liter (mol/L)')}</strong>{L(' 또는 ', ' or ')}<strong>M(molar)</strong>{L('이라고 표기하며, 화학 반응의 계량적 계산, 시약 준비, 용액 희석 등 다양한 실험 활동에 필수적입니다.', ' (molar), and is indispensable for stoichiometric calculations, reagent preparation, solution dilution, and many other laboratory activities.')}
      </p>
      <p>
        {L('이 계산기는 두 가지 방법으로 몰농도를 계산합니다: 직접 몰 수와 부피를 입력하는 방법, 그리고 용질의 질량과 몰 질량을 통해 간접적으로 계산하는 방법입니다. 실험실에서 시약을 준비하거나 화학 반응을 설계할 때 정확한 농도 계산이 요구되는 다양한 분야에서 활용됩니다.', 'This calculator computes molarity in two ways: by directly entering moles and volume, or indirectly via the solute mass and molar mass. It is useful across many fields that require accurate concentration calculations when preparing reagents or designing chemical reactions.')}
      </p>
      <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
        {L('몰농도 계산은 제약 산업, 식품 과학, 환경 분석, 임상 연구 등 광범위한 분야에서 사용됩니다. 학생들에게는 화학의 기본 개념을 이해시키는 교육 도구로서, 연구자들에게는 정확한 실험 데이터를 확보하는 데 기여하는 실용적인 도구로 가치를 발휘합니다.', 'Molarity calculations are used in a wide range of fields such as the pharmaceutical industry, food science, environmental analysis, and clinical research. It serves as an educational tool that helps students grasp fundamental chemistry concepts and as a practical tool that helps researchers obtain accurate experimental data.')}
      </p>
      <TermGlossary items={[
        { term: L('몰농도(M)', 'Molarity (M)'), desc: L('용액 1리터(L)에 녹아 있는 용질의 몰(mol) 수로 나타내는 농도 단위이며, mol/L 또는 M으로 표기합니다.', 'A concentration unit expressed as the number of moles (mol) of solute dissolved in one liter (L) of solution, denoted as mol/L or M.') },
        { term: L('몰 질량', 'Molar mass'), desc: L('한 물질 1몰의 질량으로, 구성 원소들의 원자량 총합이며 단위는 g/mol입니다. 용질의 질량을 몰 수로 변환할 때 사용합니다.', 'The mass of one mole of a substance, equal to the sum of the atomic weights of its constituent elements, with unit g/mol. Used to convert solute mass into moles.') },
      ]} />
    </div>
  ),
  calculationFormula: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('몰농도 기본 공식', 'Basic Molarity Formula')}</h4>
        <p>{L('몰농도는 용질의 몰 수를 용액의 부피로 나누어 계산합니다.', 'Molarity is calculated by dividing the moles of solute by the solution volume.')}</p>
        <div className="my-4 p-4 bg-muted rounded-lg text-center">
          <BlockMath math="M = \dfrac{n}{V}" />
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">M</span>{L('은 몰농도(molarity)를 나타내며, 단위는 mol/L(M)입니다.', ' is the molarity, with unit mol/L (M).')}</li>
          <li><span className="font-semibold">n</span>{L('은 용질의 몰 수(moles)를 나타내며, 단위는 mol입니다.', ' is the number of moles of solute, with unit mol.')}</li>
          <li><span className="font-semibold">V</span>{L('는 용액의 부피(volume)를 나타내며, 단위는 리터(L)입니다.', ' is the solution volume, with unit liter (L).')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('질량 기반 계산 공식', 'Mass-Based Formula')}</h4>
        <p>{L('용질의 질량과 몰 질량을 통해 몰 수를 구한 후 몰농도를 계산합니다.', 'Calculate moles from the solute mass and molar mass, then compute molarity.')}</p>
        <div className="my-4 p-4 bg-muted rounded-lg text-center">
          <BlockMath math="M = \dfrac{m/MW}{V}" />
        </div>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold">m</span>{L('은 용질의 질량(mass)을 나타내며, 단위는 그램(g)입니다.', ' is the solute mass, with unit gram (g).')}</li>
          <li><span className="font-semibold">MW</span>{L('는 용질의 몰 질량(molecular weight)을 나타내며, 단위는 g/mol입니다.', ' is the molar mass (molecular weight), with unit g/mol.')}</li>
          <li><span className="font-semibold">V</span>{L('는 용액의 부피(volume)를 나타내며, 단위는 리터(L)입니다.', ' is the solution volume, with unit liter (L).')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('계산 예시', 'Example')}</h4>
        <p>{L('예를 들어, NaCl(식염) 58.44g을 물에 녹여 부피를 1L로 만들었다면?', 'For example, if 58.44 g of NaCl (table salt) is dissolved in water to make 1 L of solution?')}</p>
        <div className="my-2 p-3 bg-muted rounded-lg">
          <BlockMath math="M = (58.44\,\text{g} \div 58.44\,\text{g/mol}) \div 1\,\text{L} = 1\,\text{M}" />
        </div>
        <p>{L('따라서 이 용액의 몰농도는 1M(1 몰러)이며, 1L당 1몰의 NaCl이 용해되어 있습니다.', 'Therefore the molarity of this solution is 1 M (1 molar), meaning 1 mole of NaCl is dissolved per liter.')}</p>
      </div>
    </div>
  ),
  usefulTips: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('농도 단위 변환', 'Concentration Unit Conversion')}</h4>
        <p>{L('몰농도는 다양한 농도 단위로 변환될 수 있습니다.', 'Molarity can be converted into various concentration units.')}</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('몰농도(M):', 'Molarity (M):')}</strong> mol/L - {L('화학에서 가장 일반적으로 사용', 'most commonly used in chemistry')}</li>
          <li><strong>{L('질량농도:', 'Mass concentration:')}</strong> g/L - {L('질량 기반 농도 표현', 'mass-based concentration')}</li>
          <li><strong>{L('몰분율:', 'Molality:')}</strong> mol/kg - {L('용매 기준 농도 (고온고압 실험에 유용)', 'solvent-based concentration (useful for high-temp/high-pressure experiments)')}</li>
          <li><strong>{L('부피분율:', 'Volume fraction:')}</strong> mL/L - {L('부피 기반 농도 표현', 'volume-based concentration')}</li>
          <li><strong>{L('백분율:', 'Percentage:')}</strong> % - {L('전체 대비 비율 표현', 'ratio relative to the whole')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('희석 공식 활용', 'Using the Dilution Formula')}</h4>
        <p>{L('농도를 변경할 때 M₁V₁ = M₂V₂ 공식을 사용합니다.', 'Use the M₁V₁ = M₂V₂ formula when changing concentration.')}</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('희석:', 'Dilution:')}</strong> {L('원액을 희석하여 원하는 농도의 용액 준비', 'dilute the stock to prepare a solution of the desired concentration')}</li>
          <li><strong>{L('농축:', 'Concentration:')}</strong> {L('용매를 증발시켜 농도를 높임', 'raise concentration by evaporating the solvent')}</li>
          <li><strong>{L('혼합:', 'Mixing:')}</strong> {L('서로 다른 농도의 용액을 혼합', 'mix solutions of different concentrations')}</li>
        </ul>
      </div>
      <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200 rounded-r-lg">
        <p className="font-bold text-sm">⚠️ {L('주의사항', 'Caution')}</p>
        <p className="text-xs mt-1">
          {L('몰농도 계산 시 용액의 부피는 용질이 용해된 후의 최종 부피를 기준으로 합니다. 용질을 용매에 녹이면 부피가 변할 수 있으므로, 반드시 최종 부피를 측정하여 사용해야 합니다.', 'For molarity, the solution volume is based on the final volume after the solute is dissolved. Dissolving solute in solvent can change the volume, so you must measure and use the final volume.')}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('실생활 적용 사례', 'Real-Life Applications')}</h4>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('제약 산업:', 'Pharmaceuticals:')}</strong> {L('약물의 농도를 정확히 조절하여 의약품 제조', 'precisely control drug concentration for manufacturing')}</li>
          <li><strong>{L('식품 산업:', 'Food industry:')}</strong> {L('첨가물, 방부제, 향신료 등의 농도 조절', 'adjust concentrations of additives, preservatives, spices, etc.')}</li>
          <li><strong>{L('환경 과학:', 'Environmental science:')}</strong> {L('수질 오염도 측정, 대기 오염물질 분석', 'measure water pollution, analyze air pollutants')}</li>
          <li><strong>{L('임상 연구:', 'Clinical research:')}</strong> {L('혈액, 소변 등 생체 시료의 분석', 'analysis of biological samples such as blood and urine')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('실험실 팁', 'Lab Tips')}</h4>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('정밀 계량:', 'Precise weighing:')}</strong> {L('전자 저울을 사용하여 정확한 질량 측정', 'use an analytical balance for accurate mass measurement')}</li>
          <li><strong>{L('완전 용해:', 'Complete dissolution:')}</strong> {L('용질이 완전히 녹을 때까지 충분히 교반', 'stir thoroughly until the solute is fully dissolved')}</li>
          <li><strong>{L('온도 확인:', 'Check temperature:')}</strong> {L('온도에 따라 부피가 변할 수 있으므로 주의', 'note that volume can vary with temperature')}</li>
          <li><strong>{L('안전 장비:', 'Safety gear:')}</strong> {L('실험 시 보안경, 장갑 등 안전 장비 착용', 'wear goggles, gloves, and other safety gear during experiments')}</li>
        </ul>
      </div>
    </div>
  ),
  howToUse: (
    <ol className="space-y-3 text-sm list-decimal list-inside">
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('몰 수 입력', 'Enter moles of solute')}</span>{L(' → 용질의 몰 수(mol)를 입력합니다.', ' → Enter the moles of solute (mol).')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('부피 입력', 'Enter volume')}</span>{L(' → 용액의 부피를 리터(L) 단위로 입력합니다.', ' → Enter the solution volume in liters (L).')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('계산', 'Calculate')}</span>{L(' → 계산 버튼을 클릭합니다.', ' → Click the Calculate button.')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('결과 확인', 'View result')}</span>{L(' → 몰농도 값을 mol/L 또는 M 단위로 확인합니다.', ' → Check the molarity in mol/L or M.')}</li>
    </ol>
  ),
  workedExamples: (
    <div className="space-y-3 text-sm">
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">{L('0.5mol 용질, 1L 용액', '0.5 mol solute in 1 L solution')}</p>
        <p className="text-muted-foreground mt-1">M = 0.5mol ÷ 1L = 0.5M</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">{L('2mol 용질, 500mL(0.5L) 용액', '2 mol solute in 500 mL (0.5 L) solution')}</p>
        <p className="text-muted-foreground mt-1">M = 2mol ÷ 0.5L = 4M</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">NaCl 58.44g (1mol), 1L</p>
        <p className="text-muted-foreground mt-1">M = 1mol ÷ 1L = 1M</p>
      </div>
    </div>
  ),
  faq: (
    <div className="space-y-4">
      {[
        { q: L('몰농도란 무엇인가요?', 'What is molarity?'), a: L('몰농도는 용액 1리터(L)에 녹아 있는 용질의 몰(mol) 수로 나타내는 농도 단위이며, mol/L 또는 M으로 표기합니다. 화학 반응의 양적 관계를 다룰 때 가장 널리 사용됩니다.', 'Molarity is a concentration unit expressed as the number of moles of solute dissolved in one liter of solution, denoted mol/L or M. It is the most widely used unit for quantitative relationships in chemistry.') },
        { q: L('몰(mol)과 몰농도의 차이는 무엇인가요?', 'What is the difference between a mole and molarity?'), a: L('몰은 물질의 양(약 6.022 × 10²³ 개의 입자)을 나타내는 단위이고, 몰농도는 용질의 몰 수를 용액의 부피(L)로 나눈 농도입니다. 즉 몰은 양, 몰농도는 농도를 나타냅니다.', 'A mole is a unit of amount of substance (about 6.022 × 10²³ particles), while molarity is the concentration obtained by dividing moles of solute by the solution volume in liters. A mole measures quantity; molarity measures concentration.') },
        { q: L('그램(g)을 몰(mol)로 어떻게 변환하나요?', 'How do I convert grams to moles?'), a: L('질량(g)을 몰 질량(g/mol)으로 나누면 몰 수를 구할 수 있습니다. 예를 들어 NaCl 58.44g은 몰 질량이 58.44g/mol이므로 1몰이 됩니다.', 'Divide the mass in grams by the molar mass in g/mol to get the number of moles. For example, 58.44 g of NaCl divided by its molar mass of 58.44 g/mol equals 1 mole.') },
        { q: L('왜 부피를 반드시 리터(L) 단위로 사용하나요?', 'Why must volume be in liters?'), a: L('몰농도의 정의가 용액 1리터당 몰 수이므로, mL나 cm³ 등 다른 단위를 사용하면 결과가 달라집니다. mL는 1000으로 나누어 L로 변환해야 정확한 몰농도를 얻을 수 있습니다.', 'Since molarity is defined as moles per liter of solution, using other units such as mL or cm³ changes the result. Divide mL by 1000 to convert to liters for an accurate molarity.') },
        { q: L('희석하면 몰농도는 어떻게 변하나요?', 'How does dilution affect molarity?'), a: L('용매를 추가해 부피를 늘리면 용질의 몰 수는 변하지 않지만 몰농도는 낮아집니다. 희석 전후의 관계는 M₁V₁ = M₂V₂로 계산할 수 있습니다.', 'Adding solvent increases the volume while the moles of solute stay the same, so the molarity decreases. The relationship before and after dilution is given by M₁V₁ = M₂V₂.') },
      ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
    </div>
  ),
  };
};

export default function MolarityCalculatorPage() {
  const { dict, locale } = useI18n();
  const t = dict.molarityCalculator;
  const isKo = locale === 'ko';

  const [moles, setMoles] = useState('');
  const [volume, setVolume] = useState('');
  const [molarity, setMolarity] = useState<number | null>(null);

  const [mass, setMass] = useState('');
  const [molecularWeight, setMolecularWeight] = useState('');
  const [massVolume, setMassVolume] = useState('');
  const [massMolarity, setMassMolarity] = useState<number | null>(null);
  const [massMoles, setMassMoles] = useState<number | null>(null);

  const handleDirectCalculate = useCallback(() => {
    const n = parseFloat(moles);
    const v = parseFloat(volume);
    if (!isNaN(n) && !isNaN(v) && v !== 0) {
      setMolarity(n / v);
    } else {
      setMolarity(null);
    }
  }, [moles, volume]);

  const handleDirectReset = useCallback(() => {
    setMoles('');
    setVolume('');
    setMolarity(null);
  }, []);

  const handleMassCalculate = useCallback(() => {
    const m = parseFloat(mass);
    const mw = parseFloat(molecularWeight);
    const v = parseFloat(massVolume);
    if (!isNaN(m) && !isNaN(mw) && !isNaN(v) && mw !== 0 && v !== 0) {
      const molesValue = m / mw;
      setMassMoles(molesValue);
      setMassMolarity(molesValue / v);
    } else {
      setMassMoles(null);
      setMassMolarity(null);
    }
  }, [mass, molecularWeight, massVolume]);

  const handleMassReset = useCallback(() => {
    setMass('');
    setMolecularWeight('');
    setMassVolume('');
    setMassMoles(null);
    setMassMolarity(null);
  }, []);

  const inputSection = (
    <Tabs defaultValue="direct">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="direct">{t.tabDirect}</TabsTrigger>
        <TabsTrigger value="mass">{t.tabMass}</TabsTrigger>
      </TabsList>
      <TabsContent value="direct" className="space-y-4 mt-4">
        <div>
          <Label htmlFor="moles">{t.inputMoles}</Label>
          <Input
            id="moles"
            type="number"
            value={moles}
            onChange={(e) => setMoles(e.target.value)}
            placeholder={isKo ? '예: 1' : 'e.g. 1'}
          />
        </div>
        <div>
          <Label htmlFor="volume">{t.inputVolume}</Label>
          <Input
            id="volume"
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            placeholder={isKo ? '예: 1' : 'e.g. 1'}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleDirectCalculate} className="flex-1">{t.calculateBtn}</Button>
          <Button onClick={handleDirectReset} variant="outline" className="flex-1">{t.resetBtn}</Button>
        </div>
      </TabsContent>
      <TabsContent value="mass" className="space-y-4 mt-4">
        <div>
          <Label htmlFor="mass">{t.inputMass}</Label>
          <Input
            id="mass"
            type="number"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            placeholder={isKo ? '예: 58.44' : 'e.g. 58.44'}
          />
        </div>
        <div>
          <Label htmlFor="molecularWeight">{t.inputMolecularWeight}</Label>
          <Input
            id="molecularWeight"
            type="number"
            value={molecularWeight}
            onChange={(e) => setMolecularWeight(e.target.value)}
            placeholder={isKo ? '예: 58.44' : 'e.g. 58.44'}
          />
        </div>
        <div>
          <Label htmlFor="massVolume">{t.inputMassVolume}</Label>
          <Input
            id="massVolume"
            type="number"
            value={massVolume}
            onChange={(e) => setMassVolume(e.target.value)}
            placeholder={isKo ? '예: 1' : 'e.g. 1'}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleMassCalculate} className="flex-1">{t.calculateBtn}</Button>
          <Button onClick={handleMassReset} variant="outline" className="flex-1">{t.resetBtn}</Button>
        </div>
      </TabsContent>
    </Tabs>
  );

  const resultSection = (
    <Tabs defaultValue="direct">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="direct">{t.resultDirectTitle}</TabsTrigger>
        <TabsTrigger value="mass">{t.resultMassTitle}</TabsTrigger>
      </TabsList>
      <TabsContent value="direct" className="mt-4">
        {molarity !== null ? (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{t.resultMolarity}</p>
            <p className="text-2xl font-bold">{molarity.toFixed(4)} M</p>
            <p className="text-sm text-muted-foreground mt-2">
              {molarity.toFixed(4)} mol/L
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{t.placeholder}</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="mass" className="mt-4">
        {massMolarity !== null && massMoles !== null ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{t.resultMolarity}</p>
              <p className="text-2xl font-bold">{massMolarity.toFixed(4)} M</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground">{t.resultMoles}</p>
                <p className="text-lg font-bold">{massMoles.toFixed(4)} mol</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <p className="text-xs text-muted-foreground">{t.resultMolarityLabel}</p>
                <p className="text-lg font-bold">{massMolarity.toFixed(4)} mol/L</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">{t.placeholder}</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection(isKo)}
      variant="split"
    />
  );
}
