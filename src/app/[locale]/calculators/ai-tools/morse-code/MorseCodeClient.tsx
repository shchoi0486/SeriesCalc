'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n/I18nProvider';

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
  '@': '.--.-.', ' ': '/',
};

const REVERSE_MAP: Record<string, string> = {};
Object.entries(MORSE_MAP).forEach(([char, morse]) => {
  REVERSE_MAP[morse] = char;
});

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_MAP[char] || char)
    .join(' ');
}

function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      return REVERSE_MAP[code] || code;
    })
    .join('');
}

function playMorse(morse: string) {
  const ctx = new AudioContext();
  let time = ctx.currentTime;
  const dotDuration = 0.08;
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration;
  const letterGap = dotDuration * 3;

  morse.split('').forEach(symbol => {
    if (symbol === '.') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dotDuration);
      osc.start(time);
      osc.stop(time + dotDuration);
      time += dotDuration + symbolGap;
    } else if (symbol === '-') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dashDuration);
      osc.start(time);
      osc.stop(time + dashDuration);
      time += dashDuration + symbolGap;
    } else if (symbol === ' ') {
      time += letterGap;
    }
  });
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface MorseCodeProps {
  infoSection: InfoSection;
}

const MorseCode = ({ infoSection }: MorseCodeProps) => {
  const { dict, locale } = useI18n();
  const t = dict.morseCode;
  const isKo = locale === 'ko';
  const [mode, setMode] = useState<'textToMorse' | 'morseToText'>('textToMorse');
  const [textInput, setTextInput] = useState('');
  const [morseInput, setMorseInput] = useState('');
  const [result, setResult] = useState('');

  const convert = () => {
    if (mode === 'textToMorse') {
      const morse = textToMorse(textInput);
      setResult(morse);
    } else {
      const text = morseToText(morseInput);
      setResult(text);
    }
  };

  const playSound = () => {
    if (result && mode === 'textToMorse') {
      playMorse(result);
    } else if (mode === 'morseToText' && morseInput) {
      playMorse(morseInput);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={mode === 'textToMorse' ? 'default' : 'outline'}
          onClick={() => { setMode('textToMorse'); setResult(''); }}
          className="flex-1"
        >
          {t.textToMorse}
        </Button>
        <Button
          variant={mode === 'morseToText' ? 'default' : 'outline'}
          onClick={() => { setMode('morseToText'); setResult(''); }}
          className="flex-1"
        >
          {t.morseToText}
        </Button>
      </div>

      {mode === 'textToMorse' ? (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.textInputLabel}</label>
          <Textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={t.textInputPlaceholder}
            className="min-h-[100px]"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.morseInputLabel}</label>
          <Input
            value={morseInput}
            onChange={(e) => setMorseInput(e.target.value)}
            placeholder={t.morseInputPlaceholder}
            className="font-mono"
          />
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={convert} className="flex-1">{t.convertButton}</Button>
        <Button variant="outline" onClick={playSound} className="flex-1">{t.playButton}</Button>
      </div>
    </div>
  );

  const resultSection = result ? (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <Textarea readOnly value={result} className="min-h-[100px] font-mono text-xs" />
      <p className="text-xs text-muted-foreground text-center">
        {mode === 'textToMorse'
          ? t.statsTextToMorse.replace('{chars}', String(textInput.length)).replace('{symbols}', String(result.split(' ').length))
          : t.statsMorseToText.replace('{symbols}', String(morseInput.split(' ').length)).replace('{chars}', String(result.length))
        }
      </p>
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

export default MorseCode;
