'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/I18nProvider';

import { toast } from 'sonner';
const randomNames = ['John', 'Jane', 'Alex', 'Sam', 'Chris', 'Pat', 'Morgan', 'Taylor', 'Jordan', 'Casey'];
const randomCities = ['Seoul', 'Tokyo', 'New York', 'London', 'Paris', 'Berlin', 'Sydney', 'Toronto'];

function generateRandomValue(key: string): string | number | boolean {
  const lower = key.toLowerCase();
  if (lower.includes('name')) return randomNames[Math.floor(Math.random() * randomNames.length)];
  if (lower.includes('age') || lower.includes('year')) return Math.floor(Math.random() * 60) + 18;
  if (lower.includes('email')) return `user${Math.floor(Math.random() * 1000)}@example.com`;
  if (lower.includes('city') || lower.includes('location')) return randomCities[Math.floor(Math.random() * randomCities.length)];
  if (lower.includes('price') || lower.includes('amount')) return Math.floor(Math.random() * 10000) + 100;
  if (lower.includes('id')) return Math.floor(Math.random() * 10000) + 1;
  if (lower.includes('active') || lower.includes('enabled')) return Math.random() > 0.3;
  return Math.floor(Math.random() * 1000);
}

function yamlValue(val: string | number | boolean): string {
  if (typeof val === 'string') return val.includes(':') || val.includes('#') ? `"${val}"` : val;
  return String(val);
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface YamlGeneratorProps {
  infoSection: InfoSection;
}

const YamlGenerator = ({ infoSection }: YamlGeneratorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.yamlGenerator;
  const isKo = locale === 'ko';
  const [itemCount, setItemCount] = useState<number>(3);
  const [keyNames, setKeyNames] = useState('name, age, email, city, active');
  const [result, setResult] = useState('');

  const generate = () => {
    const keys = keyNames.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (keys.length === 0) {
      toast.error(t.alertMessage);
      return;
    }

    let yaml = '---\nitems:\n';

    for (let i = 0; i < itemCount; i++) {
      yaml += `  - id: ${i + 1}\n`;
      keys.forEach(key => {
        const value = generateRandomValue(key);
        yaml += `    ${key}: ${yamlValue(value)}\n`;
      });
    }

    yaml += '...\n';
    setResult(yaml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const downloadYAML = () => {
    const blob = new Blob([result], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-data.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.itemCountLabel}</label>
        <Input
          type="number"
          min={1}
          max={100}
          value={itemCount}
          onChange={(e) => setItemCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.keyNamesLabel}</label>
        <Input
          value={keyNames}
          onChange={(e) => setKeyNames(e.target.value)}
          placeholder="name, age, email, city"
        />
      </div>
      <Button onClick={generate} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1">{t.copyButton}</Button>
        <Button variant="outline" size="sm" onClick={downloadYAML} className="flex-1">{t.downloadButton}</Button>
      </div>
      <Textarea readOnly value={result} className="min-h-[300px] font-mono text-xs" />
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

export default YamlGenerator;
