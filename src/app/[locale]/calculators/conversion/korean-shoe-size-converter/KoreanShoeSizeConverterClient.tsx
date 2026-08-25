'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import FaqItem from '@/components/calculators/FaqItem';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";

type SizeSystem = 'KR' | 'US' | 'EU' | 'JP' | 'mm';

const conversionTable: Record<SizeSystem, (mm: number) => number> = {
  mm: (mm) => mm,
  KR: (mm) => Math.round((mm * 10) + 5),
  US: (mm) => parseFloat((mm / 25.4 * 3 - (mm >= 250 ? 24 : 23)).toFixed(1)),
  EU: (mm) => Math.round(mm * 1.5 + 2),
  JP: (mm) => Math.round(mm),
};

const sizeToMm: Record<SizeSystem, (size: number) => number> = {
  mm: (s) => s,
  KR: (s) => (s - 5) / 10,
  US: (s) => ((s + 23) / 3) * 25.4,
  EU: (s) => (s - 2) / 1.5,
  JP: (s) => s,
};

const shoeRefTable = [
  { kr: 230, us: 5, eu: 37, jp: 23 },
  { kr: 235, us: 5.5, eu: 37.5, jp: 23.5 },
  { kr: 240, us: 6, eu: 38, jp: 24 },
  { kr: 245, us: 6.5, eu: 38.5, jp: 24.5 },
  { kr: 250, us: 7, eu: 39, jp: 25 },
  { kr: 255, us: 7.5, eu: 40, jp: 25.5 },
  { kr: 260, us: 8, eu: 40.5, jp: 26 },
  { kr: 265, us: 8.5, eu: 41, jp: 26.5 },
  { kr: 270, us: 9, eu: 42, jp: 27 },
  { kr: 275, us: 9.5, eu: 42.5, jp: 27.5 },
  { kr: 280, us: 10, eu: 43, jp: 28 },
  { kr: 285, us: 10.5, eu: 44, jp: 28.5 },
  { kr: 290, us: 11, eu: 44.5, jp: 29 },
];

export default function KoreanShoeSizeConverterPage() {
  const { locale } = useI18n();
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [fromSystem, setFromSystem] = useState<SizeSystem>('KR');
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<Record<string, number> | null>(null);

  const convert = useCallback(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) { setResults(null); return; }
    const mm = sizeToMm[fromSystem](val);
    if (mm <= 0) { setResults(null); return; }
    const res: Record<string, number> = {};
    for (const sys of Object.keys(conversionTable) as SizeSystem[]) {
      res[sys] = parseFloat(conversionTable[sys](mm).toFixed(1));
    }
    setResults(res);
  }, [inputValue, fromSystem]);

  const reset = () => { setInputValue(''); setResults(null); };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <Label>{L('변환할 시스템', 'System to Convert From')}</Label>
        <Select value={fromSystem} onValueChange={(v) => setFromSystem(v as SizeSystem)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="KR">{L('한국 (KR)', 'Korea (KR)')}</SelectItem>
            <SelectItem value="US">{L('미국 (US)', 'United States (US)')}</SelectItem>
            <SelectItem value="EU">{L('유럽 (EU)', 'Europe (EU)')}</SelectItem>
            <SelectItem value="JP">{L('일본 (JP)', 'Japan (JP)')}</SelectItem>
            <SelectItem value="mm">{L('밀리미터 (mm)', 'Millimeters (mm)')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{L('사이즈 입력', 'Enter Size')}</Label>
        <Input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={isKo ? '예: 250' : 'e.g. 250'} />
      </div>
      <div className="flex space-x-2">
        <Button onClick={convert} className="flex-1">{L('변환', 'Convert')}</Button>
        <Button onClick={reset} variant="outline" className="flex-1">{L('초기화', 'Reset')}</Button>
      </div>
    </div>
  );

  const resultSection = (
    <div>
      {results ? (
        <div className="space-y-4">
          {(['KR', 'US', 'EU', 'JP', 'mm'] as SizeSystem[]).map(sys => (
            <div key={sys} className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm font-medium">
                {sys === 'KR' ? L('한국', 'Korea') : sys === 'US' ? L('미국', 'US') : sys === 'EU' ? L('유럽', 'EU') : sys === 'JP' ? L('일본', 'Japan') : L('밀리미터', 'Millimeters')}
              </span>
              <span className="text-lg font-bold text-primary">{results[sys]} {sys !== 'mm' ? L('호', '') : 'mm'}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">{isKo ? '사이즈를 입력하세요' : 'Enter a size to convert'}</p>
        </div>
      )}
    </div>
  );

  const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{L('한국 신발 사이즈 변환기', 'Korean Shoe Size Converter')}</strong>{L('는 한국, 미국, 유럽, 일본의 신발 사이즈를 상호 변환하는 도구입니다.', ' is a tool that converts shoe sizes between Korean, US, European, and Japanese systems.')}
        </p>
        <p>
          {L('각국의 신발 사이즈 시스템은 측정 단위와 공식이 다르기 때문에, 해외 직구나 여행 시 정확한 사이즈 변환이 필요합니다.', 'Each country has different shoe size measurement units and formulas, so accurate size conversion is needed for overseas purchases or travel.')}
        </p>
        <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
          {L('한국 사이즈는 발 길이(mm) × 10 + 5 공식을 기반으로 합니다. 예: 250mm 발 = 한국 250호.', 'Korean sizes are based on the formula: foot length (mm) × 10 + 5. E.g., 250mm foot = Korea size 250.')}
        </p>
        <TermGlossary items={[
          { term: L('한국 사이즈 (KR)', 'Korea Size (KR)'), desc: L('발 길이(mm)에 10을 곱하고 5를 더한 값입니다. 250, 255, 260 등 5mm 단위로 표시됩니다.', 'foot length (mm) × 10 + 5. Shown in 5mm increments like 250, 255, 260.') },
          { term: L('미국 사이즈 (US)', 'US Size'), desc: L('US 사이즈는 브랜드마다 약간의 차이가 있을 수 있습니다. 일반적으로 발 길이(mm) / 25.4 × 3 - 22~24 공식을 사용합니다.', 'US sizes may vary slightly by brand. Generally uses the formula: foot length (mm) / 25.4 × 3 - 22~24.') },
          { term: L('유럽 사이즈 (EU)', 'EU Size (EUR)'), desc: L('파리 포인트 시스템을 기반으로 하며, 발 길이(mm)에 약 1.5를 곱한 값입니다.', 'Based on the Paris Point system, approximately foot length (mm) × 1.5.') },
        ]} />
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('각국 변환 공식', 'Conversion Formulas')}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-3">
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">KR → mm</p>
              <BlockMath math="\text{mm} = \dfrac{\text{KR} - 5}{10}" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">mm → KR</p>
              <BlockMath math="\text{KR} = \text{mm} \times 10 + 5" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">mm → US</p>
              <BlockMath math="\text{US} = \dfrac{\text{mm}}{25.4} \times 3 - (22{\sim}24)" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">mm → EU</p>
              <BlockMath math="\text{EU} = \text{mm} \times 1.5 + 2" />
            </div>
            <div className="p-2 bg-card rounded">
              <p className="font-semibold text-sm">JP</p>
              <BlockMath math="\text{JP} \approx \text{mm}\ (\text{직접 mm 표시})" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('참고 사이즈표', 'Reference Size Table')}</h4>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-2 text-left">KR</th>
                  <th className="p-2 text-left">US</th>
                  <th className="p-2 text-left">EU</th>
                  <th className="p-2 text-left">JP</th>
                </tr>
              </thead>
              <tbody>
                {shoeRefTable.map(row => (
                  <tr key={row.kr} className="border-b border-border/50">
                    <td className="p-2 font-mono">{row.kr}</td>
                    <td className="p-2 font-mono">{row.us}</td>
                    <td className="p-2 font-mono">{row.eu}</td>
                    <td className="p-2 font-mono">{row.jp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-indigo-500 pl-3">{L('신발 사이즈 선택 팁', 'Shoe Size Selection Tips')}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{L('양발이 다를 경우 큰 쪽 기준으로 선택하세요.', 'If your feet are different sizes, choose based on the larger one.')}</li>
            <li>{L('하루 중 발이 붓는 시간대(오후~저녁)에 측정하는 것이 정확합니다.', 'Measuring during the time your feet swell (afternoon~evening) is more accurate.')}</li>
            <li>{L('운동화는 일반적으로 발보다 약간 큰 사이즈를 선택하는 것이 편안합니다.', 'For sneakers, choosing slightly larger than your foot is usually more comfortable.')}</li>
            <li>{L('브랜드마다 사이즈가 약간 다를 수 있으므로, 구매 전 사이즈표를 꼭 확인하세요.', 'Sizes may vary slightly by brand, so always check the size chart before purchasing.')}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('발 측정 방법', 'How to Measure Your Foot')}</h4>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>{L('벽에 종이를 대고 발을 올립니다.', 'Place paper against a wall and step on it.')}</li>
            <li>{L('벽에서 발가락 끝까지의 거리를 잽니다.', 'Measure from the wall to the tip of your longest toe.')}</li>
            <li>{L('양발 모두 측정하여 큰 쪽을 기준으로 합니다.', 'Measure both feet and use the larger one as your reference.')}</li>
            <li>{L('mm 단위로 기록합니다.', 'Record in mm.')}</li>
          </ol>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('변환할 시스템(한국 mm / 미국 / 유럽 등)을 선택하세요.', 'Select the system to convert from (Korean mm / US / EU, etc.).')}</li>
          <li>{L('사이즈를 입력하세요. 예: 250', 'Enter the size. e.g. 250')}</li>
          <li>{L('변환 버튼을 클릭하세요.', 'Click the Convert button.')}</li>
          <li>{L('다른 시스템에서의 동일한 사이즈를 확인하세요.', 'See the equivalent sizes in the other systems.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('한국 270mm → US / EU', 'Korean 270mm → US / EU')}</h4>
          <p>{L('한국 270mm는 미국 US 9.5, 유럽 EU 43에 해당합니다.', 'Korean 270mm corresponds to US 9.5 and EU 43.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('US 10 → 한국', 'US 10 → Korean')}</h4>
          <p>{L('미국 US 10은 한국 280mm에 해당합니다.', 'US size 10 corresponds to Korean 280mm.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('EU 42 → 한국', 'EU 42 → Korean')}</h4>
          <p>{L('유럽 EU 42는 한국 265mm에 해당합니다.', 'EU size 42 corresponds to Korean 265mm.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('한국 신발 사이즈는 왜 mm인가요?', 'Why is Korean shoe size in mm?'),
            a: L('한국 사이즈는 발 길이(mm)를 그대로 기준으로 합니다. 예를 들어 발 길이가 250mm이면 한국 사이즈 250입니다. 이는 발 길이를 직접 반영하므로 직관적입니다.', 'Korean sizing is based directly on foot length in mm. For example, a 250mm foot is size 250. Because it directly reflects foot length, it is intuitive.'),
          },
          {
            q: L('미국(US)과 유럽(EU) 사이즈는 어떻게 다른가요?', 'How do US and EU sizes differ?'),
            a: L('US 사이즈는 발 길이를 기준으로 한 체계이며 브랜드마다 약간씩 차이가 있습니다. EU 사이즈는 파리 포인트 체계로 발 길이(mm)에 약 1.5를 곱해 계산합니다.', 'US sizing is based on foot length and can vary slightly by brand. EU sizing uses the Paris Point system, roughly foot length (mm) × 1.5.'),
          },
          {
            q: L('발 너비(폭)는 고려되나요?', 'Is foot width considered?'),
            a: L('이 변환기는 길이(사이즈) 기준으로 변환합니다. 발 너비는 브랜드와 모델에 따라 다르므로, 넓은 발이라면 넓은 폭 옵션이 있는 신발을 선택하는 것이 좋습니다.', 'This converter converts by length (size). Foot width varies by brand and model, so if you have wide feet, look for shoes available in wide widths.'),
          },
          {
            q: L('반사이즈(half size)는 어떻게 되나요?', 'How do half sizes work?'),
            a: L('US와 EU는 반사이즈가 존재하며, 보통 5mm 간격의 한국 사이즈 사이에 해당합니다. 예를 들어 한국 275와 280 사이가 US 9.5에서 10으로 넘어가는 구간입니다.', 'US and EU have half sizes, which usually fall between Korean sizes spaced 5mm apart. For example, between Korean 275 and 280, US goes from 9.5 to 10.'),
          },
          {
            q: L('발 길이는 어떻게 측정하나요?', 'How do I measure my foot length?'),
            a: L('벽에 종이를 대고 발을 올린 뒤, 벽에서 가장 긴 발가락 끝까지의 거리를 측정합니다. 양발 모두 측정하여 큰 쪽을 기준으로 mm 단위로 기록하세요.', 'Place paper against a wall, step on it, and measure from the wall to the tip of your longest toe. Measure both feet, use the larger one, and record in mm.'),
          },
        ].map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    ),
  };

  return (
    <CalculatorsLayout
      title={isKo ? '한국 신발 사이즈 변환기' : 'Korean Shoe Size Converter'}
      description={isKo ? '한국, 미국, 유럽, 일본 신발 사이즈를 상호 변환합니다.' : 'Convert between Korean, US, European, and Japanese shoe sizes.'}
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
}
