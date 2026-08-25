'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface JsonPrettifierProps {
  infoSection: InfoSection;
}

const JsonPrettifier = ({ infoSection }: JsonPrettifierProps) => {
  const { dict, locale } = useI18n();
  const t = dict.jsonPrettifier;
  const isKo = locale === 'ko';
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<number>(2);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const prettify = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed, null, indent));
    } catch (e: any) {
      setError(`${t.invalidJson} ${e.message}`);
      setResult('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.inputLabelMinified}</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name":"John","age":30,"scores":[1,2,3]}'
          className="min-h-[150px] font-mono text-xs"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.inputLabelIndent}</label>
        <Input
          type="number"
          min={1}
          max={8}
          value={indent}
          onChange={(e) => setIndent(Math.max(1, Math.min(8, parseInt(e.target.value) || 2)))}
        />
      </div>
      <Button onClick={prettify} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = error ? (
    <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
      {error}
    </div>
  ) : result ? (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <Textarea readOnly value={result} className="min-h-[200px] font-mono text-xs" />
    </div>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground h-full">
      {t.emptyPrompt}
    </div>
  );

  return (
    <CalculatorsLayout
      title={t.title}
      description={t.description}
      inputSection={inputSection}
      resultSection={resultSection}
      infoSection={infoSection}
      variant="split"
     />
  );
};

export default JsonPrettifier;
