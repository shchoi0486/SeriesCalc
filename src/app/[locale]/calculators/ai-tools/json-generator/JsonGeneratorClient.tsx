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
const randomCities = ['Seoul', 'Tokyo', 'New York', 'London', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Mumbai', 'Dubai'];
const randomEmails = ['user', 'test', 'demo', 'admin', 'hello', 'info', 'contact', 'support', 'sales', 'dev'];

function generateRandomValue(key: string): any {
  const lower = key.toLowerCase();
  if (lower.includes('name') || lower.includes('first')) return randomNames[Math.floor(Math.random() * randomNames.length)];
  if (lower.includes('last')) return randomNames[Math.floor(Math.random() * randomNames.length)];
  if (lower.includes('email')) return `${randomEmails[Math.floor(Math.random() * randomEmails.length)]}@example.com`;
  if (lower.includes('age') || lower.includes('year')) return Math.floor(Math.random() * 60) + 18;
  if (lower.includes('city') || lower.includes('location')) return randomCities[Math.floor(Math.random() * randomCities.length)];
  if (lower.includes('price') || lower.includes('amount') || lower.includes('salary')) return Math.floor(Math.random() * 100000) + 1000;
  if (lower.includes('id')) return Math.floor(Math.random() * 10000) + 1;
  if (lower.includes('active') || lower.includes('enabled')) return Math.random() > 0.3;
  if (lower.includes('date') || lower.includes('time')) return new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  if (lower.includes('score') || lower.includes('rating')) return Math.floor(Math.random() * 100);
  if (lower.includes('status')) return ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)];
  return Math.floor(Math.random() * 1000);
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface JsonGeneratorProps {
  infoSection: InfoSection;
}

const JsonGenerator = ({ infoSection }: JsonGeneratorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.jsonGenerator;
  const isKo = locale === 'ko';
  const [itemCount, setItemCount] = useState<number>(3);
  const [keyNames, setKeyNames] = useState('name, age, email, city');
  const [result, setResult] = useState('');

  const generate = () => {
    const keys = keyNames.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (keys.length === 0) {
      toast.error(t.alertMessage);
      return;
    }
    const items = Array.from({ length: itemCount }, (_, i) => {
      const obj: Record<string, any> = {};
      keys.forEach(key => {
        obj[key] = generateRandomValue(key);
      });
      return obj;
    });
    setResult(JSON.stringify(items, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const downloadJSON = () => {
    const blob = new Blob([result], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-data.json';
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
        <Button variant="outline" size="sm" onClick={downloadJSON} className="flex-1">{t.downloadButton}</Button>
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

export default JsonGenerator;
