'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/I18nProvider';

type SummaryLength = 'short' | 'medium' | 'long';

function splitSentences(text: string): string[] {
  return text
    .split(/[.!?。\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function getWordFrequency(sentences: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  const stopWords = new Set([
    '이', '가', '을', '를', '은', '는', '에', '의', '도', '로', '으로',
    '와', '과', '하고', '그리고', '그', '저', '것', '수', '등', '때문',
    '더', '좀', '잘', '안', '못', '아니', '있다', '없다', '하다', '되다',
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
    'before', 'after', 'and', 'but', 'or', 'nor', 'not', 'so', 'yet',
    'both', 'either', 'neither', 'each', 'every', 'all', 'any', 'few',
    'more', 'most', 'other', 'some', 'such', 'no', 'only', 'own', 'same',
    'than', 'too', 'very', 'just', 'because', 'if', 'when', 'while',
  ]);

  sentences.forEach(sentence => {
    const words = sentence.toLowerCase().split(/\s+/);
    words.forEach(word => {
      const cleaned = word.replace(/[^가-힣a-z0-9]/g, '');
      if (cleaned.length > 1 && !stopWords.has(cleaned)) {
        freq.set(cleaned, (freq.get(cleaned) || 0) + 1);
      }
    });
  });

  return freq;
}

function scoreSentence(sentence: string, freq: Map<string, number>): number {
  const words = sentence.toLowerCase().split(/\s+/);
  let score = 0;
  words.forEach(word => {
    const cleaned = word.replace(/[^가-힣a-z0-9]/g, '');
    score += freq.get(cleaned) || 0;
  });
  return score / Math.max(words.length, 1);
}

function summarize(text: string, length: SummaryLength): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return '';
  if (sentences.length <= 2) return sentences.join('. ');

  const targetCount = length === 'short' ? 2 : length === 'medium' ? Math.ceil(sentences.length * 0.3) : Math.ceil(sentences.length * 0.5);
  const count = Math.min(targetCount, sentences.length);

  const freq = getWordFrequency(sentences);
  const scored = sentences.map((s, i) => ({ text: s, score: scoreSentence(s, freq), index: i }));
  const sorted = [...scored].sort((a, b) => b.score - a.score);
  const selected = sorted.slice(0, count).sort((a, b) => a.index - b.index);

  return selected.map(s => s.text).join('. ') + '.';
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface TextSummarizerProps {
  infoSection: InfoSection;
}

const TextSummarizer = ({ infoSection }: TextSummarizerProps) => {
  const { dict, locale } = useI18n();
  const t = dict.textSummarizer;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const [input, setInput] = useState('');
  const [length, setLength] = useState<SummaryLength>('medium');
  const [result, setResult] = useState('');

  const process = () => {
    if (!input.trim()) return;
    setResult(summarize(input, length));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const originalWordCount = input ? input.split(/\s+/).length : 0;
  const summaryWordCount = result ? result.split(/\s+/).length : 0;

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.inputLabel}</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          className="min-h-[200px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.lengthLabel}</label>
        <Select value={length} onValueChange={(v) => setLength(v as SummaryLength)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">{t.short}</SelectItem>
            <SelectItem value="medium">{t.medium}</SelectItem>
            <SelectItem value="long">{t.long}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={process} className="w-full" disabled={!input.trim()}>{t.button}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <div className="flex gap-2 text-xs text-muted-foreground justify-center">
        <span>{t.wordCount.replace('{original}', String(originalWordCount)).replace('{summary}', String(summaryWordCount))}</span>
        <span>|</span>
        <span>{t.reduction.replace('{percent}', String(Math.round((1 - summaryWordCount / originalWordCount) * 100)))}</span>
      </div>
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <Textarea readOnly value={result} className="min-h-[150px] text-sm leading-relaxed" />
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

export default TextSummarizer;
