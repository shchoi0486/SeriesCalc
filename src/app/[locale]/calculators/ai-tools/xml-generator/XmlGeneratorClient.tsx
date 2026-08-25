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

function generateRandomValue(field: string): string {
  const lower = field.toLowerCase();
  if (lower.includes('name')) return randomNames[Math.floor(Math.random() * randomNames.length)];
  if (lower.includes('age') || lower.includes('year')) return String(Math.floor(Math.random() * 60) + 18);
  if (lower.includes('email')) return `user${Math.floor(Math.random() * 1000)}@example.com`;
  if (lower.includes('city') || lower.includes('location')) return randomCities[Math.floor(Math.random() * randomCities.length)];
  if (lower.includes('price') || lower.includes('amount')) return String(Math.floor(Math.random() * 10000) + 100);
  if (lower.includes('id')) return String(Math.floor(Math.random() * 10000) + 1);
  if (lower.includes('active') || lower.includes('enabled')) return Math.random() > 0.3 ? 'true' : 'false';
  return String(Math.floor(Math.random() * 1000));
}

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface XmlGeneratorProps {
  infoSection: InfoSection;
}

const XmlGenerator = ({ infoSection }: XmlGeneratorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.xmlGenerator;
  const isKo = locale === 'ko';
  const [rootElement, setRootElement] = useState('data');
  const [itemName, setItemName] = useState('item');
  const [fieldNames, setFieldNames] = useState('name, age, email, city');
  const [itemCount, setItemCount] = useState<number>(3);
  const [result, setResult] = useState('');

  const generate = () => {
    const fields = fieldNames.split(',').map(f => f.trim()).filter(f => f.length > 0);
    if (fields.length === 0) {
      toast.error(t.alertMessage);
      return;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n`;

    for (let i = 0; i < itemCount; i++) {
      xml += `  <${itemName}>\n`;
      fields.forEach(field => {
        const tagName = field.replace(/\s+/g, '_');
        xml += `    <${tagName}>${escapeXml(generateRandomValue(field))}</${tagName}>\n`;
      });
      xml += `  </${itemName}>\n`;
    }

    xml += `</${rootElement}>`;
    setResult(xml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const downloadXML = () => {
    const blob = new Blob([result], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.rootLabel}</label>
        <Input value={rootElement} onChange={(e) => setRootElement(e.target.value)} placeholder="data" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.itemLabel}</label>
        <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="item" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.fieldLabel}</label>
        <Input value={fieldNames} onChange={(e) => setFieldNames(e.target.value)} placeholder="name, age, email, city" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.countLabel}</label>
        <Input
          type="number"
          min={1}
          max={100}
          value={itemCount}
          onChange={(e) => setItemCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
        />
      </div>
      <Button onClick={generate} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1">{t.copyButton}</Button>
        <Button variant="outline" size="sm" onClick={downloadXML} className="flex-1">{t.downloadButton}</Button>
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

export default XmlGenerator;
