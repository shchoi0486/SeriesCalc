'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/I18nProvider';

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface UrlEncoderProps {
  infoSection: InfoSection;
}

const UrlEncoder = ({ infoSection }: UrlEncoderProps) => {
  const { dict, locale } = useI18n();
  const t = dict.urlEncoder;
  const isKo = locale === 'ko';
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'component' | 'full'>('component');

  const encode = () => {
    if (mode === 'component') {
      setResult(encodeURIComponent(input));
    } else {
      setResult(encodeURI(input));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.inputLabel}</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          className="min-h-[120px]"
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={mode === 'component' ? 'default' : 'outline'}
          onClick={() => setMode('component')}
          className="flex-1"
        >
          {t.encodeComponentButton}
        </Button>
        <Button
          variant={mode === 'full' ? 'default' : 'outline'}
          onClick={() => setMode('full')}
          className="flex-1"
        >
          {t.encodeFullButton}
        </Button>
      </div>
      <Button onClick={encode} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <Textarea readOnly value={result} className="min-h-[100px] font-mono text-xs" />
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

export default UrlEncoder;
