'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n/I18nProvider';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'ratione', 'sequi', 'nesciunt',
];

const SENTENCE_STARTERS = [
  'Lorem ipsum dolor sit amet', 'Sed ut perspiciatis unde omnis', 'Nemo enim ipsam voluptatem',
  'Neque porro quisquam est', 'Ut enim ad minima veniam', 'Quis autem vel eum iure',
  'At vero eos et accusamus', 'Nam libero tempore', 'Temporibus autem quibusdam',
  'Itaque earum rerum hic tenetur', 'Nam libero tempore cum soluta',
];

function generateWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(): string {
  const length = Math.floor(Math.random() * 10) + 6;
  const words = [SENTENCE_STARTERS[Math.floor(Math.random() * SENTENCE_STARTERS.length)]];
  for (let i = 1; i < length; i++) {
    words.push(generateWord());
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(sentenceCount: number): string {
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ');
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface LoremIpsumGeneratorProps {
  infoSection: InfoSection;
}

const LoremIpsumGenerator = ({ infoSection }: LoremIpsumGeneratorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.loremIpsumGenerator;
  const isKo = locale === 'ko';
  const [paragraphCount, setParagraphCount] = useState<number>(3);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState<number>(5);
  const [result, setResult] = useState('');

  const generate = () => {
    const paragraphs = Array.from(
      { length: paragraphCount },
      () => generateParagraph(sentencesPerParagraph)
    );
    setResult(paragraphs.join('\n\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const wordCount = result ? result.split(/\s+/).length : 0;
  const charCount = result.length;

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.paragraphsLabel}</label>
        <Input
          type="number"
          min={1}
          max={20}
          value={paragraphCount}
          onChange={(e) => setParagraphCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.sentencesLabel}</label>
        <Input
          type="number"
          min={1}
          max={20}
          value={sentencesPerParagraph}
          onChange={(e) => setSentencesPerParagraph(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
        />
      </div>
      <Button onClick={generate} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <div className="flex gap-2 text-xs text-muted-foreground justify-center">
        <span>{t.wordCount.replace('{n}', String(wordCount))}</span>
        <span>|</span>
        <span>{t.charCount.replace('{n}', String(charCount))}</span>
        <span>|</span>
        <span>{t.paraCount.replace('{n}', String(paragraphCount))}</span>
      </div>
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <Textarea readOnly value={result} className="min-h-[250px] text-sm leading-relaxed" />
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

export default LoremIpsumGenerator;
