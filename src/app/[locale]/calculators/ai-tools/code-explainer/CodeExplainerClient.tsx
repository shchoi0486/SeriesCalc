'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/I18nProvider';

type Language = 'javascript' | 'python' | 'java' | 'html' | 'css';

interface CodeExplanation {
  type: string;
  content: string;
}

function analyzeCode(isKo: boolean, code: string, language: Language): CodeExplanation[] {
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const explanations: CodeExplanation[] = [];
  const lines = code.split('\n');

  const functionPatterns: Record<Language, RegExp> = {
    javascript: /(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|\w+\s*=>))/g,
    python: /def\s+(\w+)\s*\(/g,
    java: /(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\(/g,
    html: /<(\w+)(?:\s[^>]*)?>/g,
    css: /(\w+)\s*\{/g,
  };

  const commentPatterns: Record<Language, RegExp> = {
    javascript: /\/\/(.+)|\/\*[\s\S]*?\*\//g,
    python: /#(.+)/g,
    java: /\/\/(.+)|\/\*[\s\S]*?\*\//g,
    html: /<!--[\s\S]*?-->/g,
    css: /\/\*[\s\S]*?\*\//g,
  };

  const keywords: Record<Language, string[]> = {
    javascript: ['if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'return', 'class', 'extends', 'import', 'export', 'const', 'let', 'var', 'function', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'typeof', 'instanceof'],
    python: ['if', 'elif', 'else', 'for', 'while', 'def', 'class', 'return', 'import', 'from', 'try', 'except', 'finally', 'with', 'as', 'yield', 'lambda', 'pass', 'break', 'continue', 'raise', 'True', 'False', 'None', 'self'],
    java: ['if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'return', 'class', 'interface', 'extends', 'implements', 'import', 'package', 'public', 'private', 'protected', 'static', 'final', 'void', 'new', 'this', 'super', 'try', 'catch', 'finally', 'throw', 'throws'],
    html: ['div', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'img', 'section', 'article', 'nav', 'header', 'footer', 'main'],
    css: ['color', 'background', 'margin', 'padding', 'border', 'display', 'position', 'font-size', 'font-weight', 'text-align', 'width', 'height', 'flex', 'grid', 'transition', 'animation', 'transform'],
  };

  const functions: string[] = [];
  const funcPattern = functionPatterns[language];
  let match;
  while ((match = funcPattern.exec(code)) !== null) {
    const name = match[1] || match[2];
    if (name && !functions.includes(name)) {
      functions.push(name);
    }
  }

  if (functions.length > 0) {
    explanations.push({
      type: L('함수/메서드', 'Functions/Methods'),
      content: L(`다음 함수/메서드들이 코드에서 사용되었습니다:\n${functions.map(f => `• ${f}()`).join('\n')}\n\n이 함수들은 각각 특정 작업을 수행하며, 코드의 모듈화와 재사용성을 높여줍니다.`,
        `The following functions/methods are used in the code:\n${functions.map(f => `• ${f}()`).join('\n')}\n\nEach performs a specific task, improving the code’s modularity and reusability.`),
    });
  }

  const comments: string[] = [];
  const commentPattern = commentPatterns[language];
  while ((match = commentPattern.exec(code)) !== null) {
    const comment = (match[1] || match[0]).trim();
    if (comment) {
      comments.push(comment);
    }
  }

  if (comments.length > 0) {
    explanations.push({
      type: L('주석', 'Comments'),
      content: L(`코드에 포함된 주석:\n${comments.map(c => `• ${c}`).join('\n')}\n\n주석은 코드의 의도와 동작을 설명하는 중요한 요소입니다.`,
        `Comments included in the code:\n${comments.map(c => `• ${c}`).join('\n')}\n\nComments are important for explaining the intent and behavior of the code.`),
    });
  }

  const usedKeywords = new Set<string>();
  const langKeywords = keywords[language];
  langKeywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'g');
    if (regex.test(code)) {
      usedKeywords.add(kw);
    }
  });

  const controlFlow = ['if', 'else', 'for', 'while', 'switch', 'case', 'try', 'catch', 'elif', 'except'];
  const controlKeywords = [...usedKeywords].filter(kw => controlFlow.includes(kw));

  if (controlKeywords.length > 0) {
    explanations.push({
      type: L('제어 구조', 'Control Structures'),
      content: L(`사용된 제어 구조:\n${controlKeywords.map(kw => `• ${kw}`).join('\n')}\n\n이 구조들은 코드의 실행 흐름을 제어합니다.`,
        `Control structures used:\n${controlKeywords.map(kw => `• ${kw}`).join('\n')}\n\nThese structures control the execution flow of the code.`),
    });
  }

  const variableKeywords = ['const', 'let', 'var', 'def', 'class', 'self', 'this'];
  const varKeywords = [...usedKeywords].filter(kw => variableKeywords.includes(kw));

  if (varKeywords.length > 0) {
    const declarations = code.split('\n').filter(line =>
      varKeywords.some(kw => line.trim().startsWith(kw))
    );
    if (declarations.length > 0) {
      explanations.push({
        type: L('변수/클래스 선언', 'Variable/Class Declarations'),
        content: L(`변수 및 클래스 선언:\n${declarations.slice(0, 10).map(d => `• ${d.trim()}`).join('\n')}${declarations.length > 10 ? `\n... 외 ${declarations.length - 10}개` : ''}`,
          `Variable and class declarations:\n${declarations.slice(0, 10).map(d => `• ${d.trim()}`).join('\n')}${declarations.length > 10 ? `\n... and ${declarations.length - 10} more` : ''}`),
      });
    }
  }

  const lineCount = lines.length;
  const charCount = code.length;
  const blankLines = lines.filter(l => l.trim() === '').length;

  explanations.push({
    type: L('코드 통계', 'Code Statistics'),
    content: L(`총 ${lineCount}줄, ${charCount}자\n빈 줄: ${blankLines}줄\n사용된 언어: ${language.charAt(0).toUpperCase() + language.slice(1)}`,
      `Total ${lineCount} lines, ${charCount} characters\nBlank lines: ${blankLines}\nLanguage: ${language.charAt(0).toUpperCase() + language.slice(1)}`),
  });

  if (explanations.length === 0) {
    explanations.push({
      type: L('분석 결과', 'Analysis Result'),
      content: L('특정한 패턴이 감지되지 않았습니다. 코드를 더 입력하면 분석 결과를 확인할 수 있습니다.', 'No specific pattern was detected. Enter more code to see analysis results.'),
    });
  }

  return explanations;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface CodeExplainerProps {
  infoSection: InfoSection;
}

const CodeExplainer = ({ infoSection }: CodeExplainerProps) => {
  const { dict, locale } = useI18n();
  const t = dict.codeExplainer;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [explanations, setExplanations] = useState<CodeExplanation[]>([]);

  const explain = () => {
    if (!code.trim()) return;
    setExplanations(analyzeCode(isKo, code, language));
  };

  const copyToClipboard = () => {
    const text = explanations.map(e => `[${e.type}]\n${e.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.languageLabel}</label>
        <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.codeLabel}</label>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t.codePlaceholder}
          className="min-h-[200px] font-mono text-xs"
        />
      </div>
      <Button onClick={explain} className="w-full" disabled={!code.trim()}>{t.button}</Button>
    </div>
  );

  const resultSection = explanations.length > 0 ? (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={copyToClipboard} className="w-full">{t.copyButton}</Button>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {explanations.map((exp, i) => (
          <div key={i} className="p-3 bg-background border border-border rounded-lg">
            <h4 className="font-medium text-sm mb-2">{exp.type}</h4>
            <pre className="text-xs whitespace-pre-wrap text-muted-foreground font-sans">{exp.content}</pre>
          </div>
        ))}
      </div>
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

export default CodeExplainer;
