'use client';

import React, { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Trash2, History } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import FaqItem from '@/components/calculators/FaqItem';

import { toast } from 'sonner';
interface NumberOptions {
  min: number;
  max: number;
  count: number;
  allowDuplicates: boolean;
  sort: boolean;
}

interface GenerationHistory {
  numbers: number[];
  timestamp: Date;
}

const RandomNumberGenerator: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.randomNumberGenerator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [options, setOptions] = useState<NumberOptions>({
    min: 1,
    max: 100,
    count: 5,
    allowDuplicates: true,
    sort: false,
  });
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [history, setHistory] = useState<GenerationHistory[]>([]);

  const generateNumbers = () => {
    const { min, max, count, allowDuplicates, sort } = options;
    const validMin = Math.min(min, max);
    const validMax = Math.max(min, max);
    const range = validMax - validMin + 1;

    if (!allowDuplicates && count > range) {
      toast.error(t.duplicateAlert.replace('{range}', String(range)));
      return;
    }

    const numbers: number[] = [];
    const used = new Set<number>();

    while (numbers.length < count) {
      const num = Math.floor(Math.random() * range) + validMin;
      if (allowDuplicates || !used.has(num)) {
        numbers.push(num);
        used.add(num);
      }
    }

    const result = sort ? [...numbers].sort((a, b) => a - b) : numbers;
    setGeneratedNumbers(result);
    setCopiedIndex(null);
    setCopiedAll(false);

    setHistory(prev => [
      { numbers: result, timestamp: new Date() },
      ...prev.slice(0, 9),
    ]);
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(generatedNumbers.join(', '));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleClear = () => {
    setGeneratedNumbers([]);
    setCopiedIndex(null);
    setCopiedAll(false);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.minValue}</label>
          <Input
            type="number"
            value={options.min}
            onChange={(e) => setOptions(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.maxValue}</label>
          <Input
            type="number"
            value={options.max}
            onChange={(e) => setOptions(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.count}</label>
        <Input
          type="number"
          min={1}
          max={100}
          value={options.count}
          onChange={(e) => setOptions(prev => ({ ...prev, count: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) }))}
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.allowDuplicates}
            onChange={(e) => setOptions(prev => ({ ...prev, allowDuplicates: e.target.checked }))}
            className="form-checkbox"
          />
          <span className="text-sm">{t.inputs.allowDuplicates}</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.sort}
            onChange={(e) => setOptions(prev => ({ ...prev, sort: e.target.checked }))}
            className="form-checkbox"
          />
          <span className="text-sm">{t.inputs.sort}</span>
        </label>
      </div>
      <div className="flex space-x-2">
        <Button onClick={generateNumbers}>{t.inputs.generate}</Button>
        <Button variant="secondary" onClick={handleClear}>
          <Trash2 className="w-4 h-4 mr-1" /> {t.inputs.reset}
        </Button>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-4">
      {generatedNumbers.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t.results.generated.replace('{count}', String(generatedNumbers.length))}</span>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              {copiedAll ? <Check className="w-4 h-4 mr-1 text-green-500" /> : <Copy className="w-4 h-4 mr-1" />}
              {t.results.copyAll}
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {generatedNumbers.map((num, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <code className="text-sm font-mono select-all">{num}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(String(num), index)}
                  className="shrink-0 h-6 w-6"
                >
                  {copiedIndex === index ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      {history.length > 0 && (
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{t.results.history}</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((entry, i) => (
              <div key={i} className="p-2 bg-muted rounded-md text-xs">
                <div className="flex justify-between text-muted-foreground mb-1">
                  <span>{entry.numbers.length}{t.results.countUnit}</span>
                  <span>{entry.timestamp.toLocaleTimeString()}</span>
                </div>
                <code className="break-all">{entry.numbers.join(', ')}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

    const infoSection = {
    calculatorDescription: (
      <div className="space-y-4">
        <p>
          <strong>{t.info.title}</strong> {t.info.p1}
        </p>
        <p>{t.info.p2}</p>
        <p>{t.info.p3}</p>
        <p className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          {t.info.tip}
        </p>
      </div>
    ),
    calculationFormula: (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.baseFormula}</h4>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-lg font-bold">{t.formula.formula}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.dedup}</h4>
          <p>{t.formula.dedupDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-sm">{t.formula.dedupFormula}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t.formula.dedupNote}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.sort}</h4>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formula.sortFormula}</p>
          </div>
          <p>{t.formula.sortNote}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.randomSelection}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.randomSelectionTip1}</li>
            <li>{t.tips.randomSelectionTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.fairDrawing}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.fairTip1}</li>
            <li>{t.tips.fairTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.testData}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.testTip1}</li>
            <li>{t.tips.testTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.gaming}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.gamingTip1}</li>
            <li>{t.tips.gamingTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.rangeNote}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.rangeTip1}</li>
            <li>{t.tips.rangeTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.secureRandom}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.secureTip1}</li>
            <li>{t.tips.secureTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('시작값(최솟값)과 끝값(최댓값) 범위를 설정하세요.', 'Set the minimum and maximum range for your numbers.')}</li>
          <li>{L('생성할 숫자의 개수를 입력하세요.', 'Enter how many numbers you want to generate.')}</li>
          <li>{L('중복 허용 여부와 정렬 여부를 선택하세요.', 'Choose whether to allow duplicates and whether to sort the results.')}</li>
          <li>{L('생성 버튼을 클릭하면 결과가 표시됩니다.', 'Click generate and your random numbers are displayed.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('주사위 시뮬레이션', 'Dice Simulation')}</h4>
          <p>{L('범위 1~6, 개수 2를 설정하면 주사위를 두 번 던진 것처럼 1에서 6 사이의 두 숫자가 생성됩니다.', 'Set the range 1-6 and count 2 to generate two numbers between 1 and 6, just like rolling a die twice.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('무작위 추출', 'Random Selection')}</h4>
          <p>{L('범위 1~100, 개수 5, 중복 없음을 선택하면 겹치지 않는 5개의 숫자가 생성됩니다.', 'Select range 1-100, count 5, and no duplicates to generate 5 unique numbers.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('정렬된 목록', 'Sorted List')}</h4>
          <p>{L('범위 1~100, 개수 5, 정렬을 선택하면 오름차순으로 정렬된 5개의 숫자가 생성됩니다.', 'Select range 1-100, count 5, and sort to generate 5 numbers in ascending order.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('Math.random()은 공정한가요?', 'Is Math.random() fair?'),
            a: L('Math.random()은 각 값이 나올 확률이 거의 균등하지만 완벽하게 균등하지는 않습니다. 대부분의 일반적인 용도에는 충분히 공정하지만, 보안이 중요한 용도에는 적합하지 않습니다.', 'Math.random() is nearly uniform but not perfectly so. It is fair enough for most everyday uses, but not suitable for security-critical applications.'),
          },
          {
            q: L('범위보다 개수가 많을 때 중복을 방지할 수 있나요?', 'Can duplicates be prevented when the count exceeds the range?'),
            a: L('아니요. 중복 없이 생성하려면 개수가 범위의 크기 이하여야 합니다. 개수가 범위를 초과하면 오류 메시지가 표시됩니다.', 'No. To generate without duplicates, the count must be less than or equal to the size of the range. An error is shown if the count exceeds the range.'),
          },
          {
            q: L('최솟값이 최댓값보다 크면 어떻게 되나요?', 'What happens if the minimum is greater than the maximum?'),
            a: L('계산기는 두 값을 자동으로 정렬하여 올바른 범위로 처리하므로 항상 유효한 결과를 생성합니다.', 'The calculator automatically sorts the two values into the correct range, so it always produces a valid result.'),
          },
          {
            q: L('생성된 번호에 편향이 없나요?', 'Are the generated numbers unbiased?'),
            a: L('네. 각 번호는 독립적으로 균등한 확률로 선택되므로 편향 없이 무작위로 생성됩니다.', 'Yes. Each number is selected independently with equal probability, so the results are unbiased and random.'),
          },
          {
            q: L('보안에 중요한 용도에는 어떤 난수를 사용해야 하나요?', 'Which random numbers should be used for security-critical purposes?'),
            a: L('암호학적으로 안전한 난수(예: crypto.getRandomValues)를 사용해야 합니다. Math.random()은 예측 가능할 수 있어 보안 용도에는 적합하지 않습니다.', 'You should use a cryptographically secure random source such as crypto.getRandomValues. Math.random() can be predictable and is not suitable for security.'),
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
      variant="split"
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
    />
  );
};

export default RandomNumberGenerator;
