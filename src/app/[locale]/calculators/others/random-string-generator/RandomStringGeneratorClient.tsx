'use client';

import React, { useState, useCallback } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Trash2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import FaqItem from '@/components/calculators/FaqItem';

interface StringOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  count: number;
}

const RandomStringGenerator: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.randomStringGenerator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [options, setOptions] = useState<StringOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    count: 5,
  });
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateRandomString = useCallback((length: number, opts: StringOptions): string => {
    let charset = '';
    if (opts.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (opts.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (opts.numbers) charset += '0123456789';
    if (opts.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    return result;
  }, []);

  const handleGenerate = () => {
    const strings: string[] = [];
    for (let i = 0; i < options.count; i++) {
      strings.push(generateRandomString(options.length, options));
    }
    setGeneratedStrings(strings);
    setCopiedIndex(null);
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(generatedStrings.join('\n'));
  };

  const handleClear = () => {
    setGeneratedStrings([]);
    setCopiedIndex(null);
  };

  const toggleOption = (key: keyof Omit<StringOptions, 'length' | 'count'>) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.stringLength}</label>
        <Input
          type="number"
          min={1}
          max={256}
          value={options.length}
          onChange={(e) => setOptions(prev => ({ ...prev, length: Math.max(1, Math.min(256, parseInt(e.target.value) || 1)) }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.stringCount}</label>
        <Input
          type="number"
          min={1}
          max={50}
          value={options.count}
          onChange={(e) => setOptions(prev => ({ ...prev, count: Math.max(1, Math.min(50, parseInt(e.target.value) || 1)) }))}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{t.inputs.charType}</label>
        {[
          { key: 'uppercase' as const, label: t.inputs.uppercase },
          { key: 'lowercase' as const, label: t.inputs.lowercase },
          { key: 'numbers' as const, label: t.inputs.numbers },
          { key: 'symbols' as const, label: t.inputs.symbols },
        ].map(item => (
          <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options[item.key]}
              onChange={() => toggleOption(item.key)}
              className="form-checkbox"
            />
            <span className="text-sm">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="flex space-x-2">
        <Button onClick={handleGenerate}>{t.inputs.generate}</Button>
        <Button variant="secondary" onClick={handleClear}>
          <Trash2 className="w-4 h-4 mr-1" /> {t.inputs.reset}
        </Button>
      </div>
    </div>
  );

  const resultSection = (
    <div className="space-y-3">
      {generatedStrings.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t.results.generated.replace('{count}', String(generatedStrings.length))}</span>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-1" /> {t.results.copyAll}
            </Button>
          </div>
          {generatedStrings.map((str, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <code className="flex-1 text-sm font-mono break-all select-all">{str}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(str, index)}
                className="shrink-0"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </>
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
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.charset}</h4>
          <p>{t.formula.charsetDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-sm">uppercase + lowercase + numbers + symbols</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.combinations}</h4>
          <p>{t.formula.comboDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-lg font-bold">{t.formula.comboFormula}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t.formula.example}</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.mapping}</h4>
          <p>{t.formula.mappingDesc}</p>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formula.mappingFormula}</p>
          </div>
          <p>{t.formula.mappingNote}</p>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.passwordLength}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.tip1}</li>
            <li>{t.tips.tip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.apiKey}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.apiKeyTip1}</li>
            <li>{t.tips.apiKeyTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.noReuse}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.noReuseTip1}</li>
            <li>{t.tips.noReuseTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.safeStorage}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.safeTip1}</li>
            <li>{t.tips.safeTip2}</li>
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
          <h4 className="font-bold text-lg mb-2">{t.tips.complexity}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.complexTip1}</li>
            <li>{t.tips.complexTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('문자열의 길이를 설정하세요. (1~256자)', 'Set the length of the string (1-256 characters).')}</li>
          <li>{L('사용할 문자 집합을 선택하세요. (대문자, 소문자, 숫자, 기호)', 'Choose the character set to use (uppercase, lowercase, numbers, symbols).')}</li>
          <li>{L('생성할 문자열 개수를 입력하고 생성 버튼을 클릭하세요.', 'Enter how many strings to generate and click generate.')}</li>
          <li>{L('원하는 문자열을 복사하거나 모두 복사하세요.', 'Copy individual strings or copy them all.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('영숫자 8자', '8-Character Alphanumeric')}</h4>
          <p>{L('길이 8에 대문자, 소문자, 숫자를 선택하면 정확히 8자로 구성된 영숫자 문자열이 생성됩니다. 예: Kx9mQ2pZ', 'Choose length 8 with uppercase, lowercase, and numbers to generate exactly 8 alphanumeric characters, e.g. Kx9mQ2pZ.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('기호 포함 16자', '16 Characters with Symbols')}</h4>
          <p>{L('길이 16에 모든 문자 유형을 선택하면 기호가 포함된 강력한 16자 문자열이 생성됩니다. 예: A#b9!kD$f2@Lm4&Q', 'Choose length 16 with all character types to generate a strong 16-character string containing symbols, e.g. A#b9!kD$f2@Lm4&Q.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('길이 제한', 'Length Limit')}</h4>
          <p>{L('길이는 1에서 256 사이로 제한됩니다. 이 범위를 벗어나는 값을 입력하면 자동으로 가장 가까운 허용 값으로 조정됩니다.', 'Length is limited to between 1 and 256. Values outside this range are automatically clamped to the nearest allowed value.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('어떤 문자 집합을 선택할 수 있나요?', 'What character sets are available?'),
            a: L('대문자(A-Z), 소문자(a-z), 숫자(0-9), 그리고 특수 기호(!@#$%^&* 등)를 조합하여 선택할 수 있습니다. 하나도 선택하지 않으면 소문자만 사용됩니다.', 'You can combine uppercase (A-Z), lowercase (a-z), numbers (0-9), and special symbols such as !@#$%^&*. If none are selected, lowercase letters are used by default.'),
          },
          {
            q: L('이 생성기는 암호화에 안전한가요?', 'Is this generator cryptographically secure?'),
            a: L('네. 이 생성기는 Math.random() 대신 crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 제공합니다.', 'Yes. Unlike Math.random(), this generator uses crypto.getRandomValues() to provide cryptographically secure randomness.'),
          },
          {
            q: L('비밀번호에는 어떤 길이가 권장되나요?', 'What length is recommended for passwords?'),
            a: L('비밀번호에는 16자 이상, 특히 기호를 포함한 문자열을 권장합니다. 길이가 길수록 추측이나 무차별 대입 공격에 강해집니다.', 'A length of 16 characters or more, ideally including symbols, is recommended for passwords. Longer strings are far more resistant to guessing and brute-force attacks.'),
          },
          {
            q: L('중복 문자열이 생성될 확률은 얼마인가요?', 'What is the probability of duplicate strings?'),
            a: L('문자 집합 크기가 n이고 길이가 L일 때 가능한 조합은 n의 L제곱입니다. 길이와 문자 종류가 충분하다면 중복 확률은 극히 낮습니다.', 'With a character set of size n and length L, there are n raised to the power of L possible combinations. With sufficient length and variety, the probability of duplicates is extremely low.'),
          },
          {
            q: L('이 문자열은 어떤 용도로 사용할 수 있나요?', 'What can I use these strings for?'),
            a: L('비밀번호, API 키, 인증 토큰, 세션 ID, 일회용 코드 등 보안이 필요한 다양한 용도에 사용할 수 있습니다.', 'These strings are ideal for passwords, API keys, auth tokens, session IDs, and one-time codes wherever strong randomness is required.'),
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

export default RandomStringGenerator;
