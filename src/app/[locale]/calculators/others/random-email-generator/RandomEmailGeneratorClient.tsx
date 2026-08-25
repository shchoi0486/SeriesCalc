'use client';

import React, { useState, useCallback } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Trash2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import FaqItem from '@/components/calculators/FaqItem';

const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'naver.com', 'daum.net'] as const;
type DomainOption = (typeof DOMAINS)[number] | 'custom' | 'random';

const ADJECTIVES = [
  'happy', 'sunny', 'lucky', 'clever', 'brave', 'swift', 'calm', 'eager', 'fair', 'kind',
  'bold', 'cool', 'dark', 'deep', 'fast', 'free', 'gold', 'gray', 'huge', 'keen',
  'long', 'mild', 'neat', 'rich', 'rose', 'safe', 'tall', 'thin', 'true', 'warm',
  'wild', 'wise', 'blue', 'cyan', 'lime', 'pink', 'red', 'teal', 'wine', 'coral',
];

const NOUNS = [
  'tiger', 'eagle', 'river', 'stone', 'cloud', 'flame', 'storm', 'pearl', 'tiger', 'wolf',
  'bear', 'hawk', 'lion', 'fox', 'deer', 'swan', 'moon', 'star', 'wind', 'rain',
  'snow', 'fire', 'wave', 'rock', 'tree', 'leaf', 'rose', 'lily', 'iris', 'vale',
  'lake', 'hill', 'cape', 'gate', 'ford', 'port', 'dale', 'field', 'grove', 'marsh',
];

const RandomEmailGenerator: React.FC = () => {
  const { dict, locale } = useI18n();
  const t = dict.randomEmailGenerator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [domain, setDomain] = useState<DomainOption>('random');
  const [customDomain, setCustomDomain] = useState('');
  const [count, setCount] = useState(5);
  const [generatedEmails, setGeneratedEmails] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateRandomEmail = useCallback((useCustom: boolean, customDom: string): string => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const num = Math.floor(Math.random() * 9999);
    const username = `${adj}${noun}${num}`;

    let selectedDomain: string;
    if (useCustom && customDom.trim()) {
      selectedDomain = customDom.trim().replace('@', '');
    } else if (domain === 'random') {
      selectedDomain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
    } else {
      selectedDomain = domain;
    }

    return `${username}@${selectedDomain}`;
  }, [domain]);

  const handleGenerate = () => {
    const emails: string[] = [];
    const useCustom = domain === 'custom';
    for (let i = 0; i < count; i++) {
      emails.push(generateRandomEmail(useCustom, customDomain));
    }
    setGeneratedEmails(emails);
    setCopiedIndex(null);
  };

  const handleCopy = async (email: string, index: number) => {
    await navigator.clipboard.writeText(email);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(generatedEmails.join('\n'));
  };

  const handleClear = () => {
    setGeneratedEmails([]);
    setCopiedIndex(null);
  };

  const inputSection = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.domainSelect}</label>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value as DomainOption)}
          className="w-full border rounded-md px-3 py-2 bg-background"
        >
          <option value="random">{t.inputs.random}</option>
          {DOMAINS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
          <option value="custom">{t.inputs.customDomain}</option>
        </select>
      </div>

      {domain === 'custom' && (
        <div>
          <label className="block text-sm font-medium mb-1">{t.inputs.customDomainLabel}</label>
          <Input
            type="text"
            placeholder="example.com"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">{t.inputs.count}</label>
        <Input
          type="number"
          min={1}
          max={50}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
        />
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
      {generatedEmails.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">{t.results.empty}</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{t.results.generated.replace('{count}', String(generatedEmails.length))}</span>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="w-4 h-4 mr-1" /> {t.results.copyAll}
            </Button>
          </div>
          {generatedEmails.map((email, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <code className="flex-1 text-sm font-mono break-all select-all">{email}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(email, index)}
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
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.structure}</h4>
          <p>{t.formula.structureDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-sm">{t.formula.structureFormula}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.combinations}</h4>
          <p>{t.formula.comboDesc}</p>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-lg font-bold">{t.formula.comboFormula}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-2 border-l-4 border-border pl-3">{t.formula.domainSelect}</h4>
          <p>{t.formula.domainDesc}</p>
          <div className="my-2 p-3 bg-muted rounded-lg">
            <p className="font-mono text-sm text-center">{t.formula.domainFormula}</p>
          </div>
        </div>
      </div>
    ),
    usefulTips: (
      <div className="space-y-6">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.testAccounts}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.testTip1}</li>
            <li>{t.tips.testTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.privacy}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.privacyTip1}</li>
            <li>{t.tips.privacyTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.devTool}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.devTip1}</li>
            <li>{t.tips.devTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.domainFormat}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.domainTip1}</li>
            <li>{t.tips.domainTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.verification}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.verTip1}</li>
            <li>{t.tips.verTip2}</li>
          </ul>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{t.tips.bulkGen}</h4>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>{t.tips.bulkTip1}</li>
            <li>{t.tips.bulkTip2}</li>
          </ul>
        </div>
      </div>
    ),
    howToUse: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>{L('도메인을 선택하세요. (임의, 특정 도메인, 또는 사용자 지정)', 'Choose a domain: random, a specific provider, or your own custom domain.')}</li>
          <li>{L('생성할 이메일 개수를 입력하세요.', 'Set how many emails to generate.')}</li>
          <li>{L('생성 버튼을 클릭하면 이메일이 만들어집니다.', 'Click generate to create the emails.')}</li>
          <li>{L('원하는 이메일을 복사하거나 모두 복사하세요.', 'Copy individual emails or copy them all.')}</li>
        </ol>
      </div>
    ),
    workedExamples: (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('Gmail 도메인', 'Gmail Domain')}</h4>
          <p>{L('도메인으로 gmail.com을 선택하고 개수 5를 설정하면 행복한 동물 이름과 숫자 조합의 5개 이메일이 생성됩니다. 예: happytiger1234@gmail.com', 'Choose gmail.com as the domain and set count 5 to generate 5 emails combining an adjective, noun, and number, e.g. happytiger1234@gmail.com.')}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-bold text-lg mb-2">{L('임의 도메인', 'Random Domains')}</h4>
          <p>{L('임의 도메인을 선택하고 개수 10을 설정하면 gmail, yahoo, outlook 등 다양한 도메인의 10개 이메일이 생성됩니다.', 'Select random domains and set count 10 to generate 10 emails across gmail, yahoo, outlook, and other providers.')}</p>
        </div>
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          {
            q: L('생성된 이메일 형식은 어떻게 되나요?', 'What is the format of the generated emails?'),
            a: L('각 이메일은 형용사+명사+숫자로 구성된 사용자 이름과 선택한 도메인의 조합입니다. 예: bravewolf4821@gmail.com', 'Each email combines a username made of adjective+noun+number with the selected domain, e.g. bravewolf4821@gmail.com.'),
          },
          {
            q: L('이 이메일은 실제로 존재하고 유효한가요?', 'Are these emails real and valid?'),
            a: L('아니요. 이 이메일은 무작위로 생성된 가짜 주소로, 실제 받은 편지함이나 계정이 존재하지 않습니다.', 'No. These are randomly generated fake addresses with no real mailbox or account behind them.'),
          },
          {
            q: L('어떤 도메인을 선택할 수 있나요?', 'What domain options are available?'),
            a: L('gmail.com, yahoo.com, outlook.com, hotmail.com, naver.com, daum.net 같은 인기 도메인 중에서 선택하거나 나만의 사용자 지정 도메인을 입력할 수 있습니다.', 'You can choose from popular domains such as gmail.com, yahoo.com, outlook.com, hotmail.com, naver.com, and daum.net, or enter your own custom domain.'),
          },
          {
            q: L('테스트 용도로 사용해도 되나요?', 'Can I use these for testing?'),
            a: L('네. 개발 및 테스트 목적으로 유용하지만, 실제 서비스 가입이나 실서비스에 사용해서는 안 됩니다.', 'Yes, they are useful for development and testing, but they should never be used to sign up for or interact with real services.'),
          },
          {
            q: L('생성된 이메일의 개인정보는 안전한가요?', 'Are the generated emails private?'),
            a: L('네. 모든 이메일은 브라우저에서 로컬로 생성되며 서버로 전송되거나 저장되지 않으므로 개인정보가 수집되지 않습니다.', 'Yes. All emails are generated locally in your browser and are never sent to or stored on a server, so no personal data is collected.'),
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

export default RandomEmailGenerator;
