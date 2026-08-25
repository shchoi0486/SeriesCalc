'use client';

import { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/I18nProvider';

type PromptCategory = 'writing' | 'coding' | 'analysis' | 'creative';

const PROMPT_TEMPLATES_KO: Record<PromptCategory, string[]> = {
  writing: [
    '다음 주제에 대해 전문적이고 상세한 글을 작성해주세요: {topic}\n\n대상 독자: {audience}\n목적: {purpose}\n분량: {length}',
    '{topic}에 대한 비교 분석 글을 작성해주세요. 장단점을 균형있게 다루고, 실제 사례를 포함해주세요.',
    '{topic}에 대한 FAQ(자주 묻는 질문) 형식의 글을 작성해주세요. 최소 10개의 질문과 답변을 포함해주세요.',
    '{topic}의 역사, 현재, 미래를 시대별로 정리한 글을 작성해주세요.',
    '{topic}과 관련된 전문가 인터뷰 형식의 글을 작성해주세요. 질문과 답변 형식으로 작성해주세요.',
  ],
  coding: [
    '{language}로 {feature} 기능을 구현해주세요. 다음 요구사항을 충족해야 합니다:\n- {requirement1}\n- {requirement2}\n\n코드에 주석을 포함해주세요.',
    '다음 {language} 코드를 리뷰하고 개선점을 제안해주세요:\n```\n{code}\n```\n\n보안, 성능, 가독성 관점에서 분석해주세요.',
    '{language}로 {feature}에 대한 단위 테스트를 작성해주세요. 경계값 테스트와 예외 처리를 포함해주세요.',
    '{language}로 {feature}의 성능을 최적화하는 방법을 설명하고 코드 예제와 함께 제시해주세요.',
    '{language}로 {feature}를 구현하되, SOLID 원칙과 디자인 패턴을 적용해주세요.',
  ],
  analysis: [
    '다음 데이터를 분석하고 인사이트를 도출해주세요:\n{data}\n\n핵심 발견사항 3가지를 요약해주세요.',
    '{topic}에 대한 시장 분석 보고서를 작성해주세요. 다음 항목을 포함해주세요:\n- 시장 규모 및 성장률\n- 주요 경쟁사\n- SWOT 분석\n- 향후 전망',
    '다음 제품/서비스의 사용자 리뷰를 분석하고 긍정적/부정적 피드백을 분류해주세요:\n{reviews}',
    '{topic}에 대한 A/B 테스트 결과를 분석하고 통계적 유의성을 판단해주세요.',
    '다음 비즈니스 지표를 분석하고 개선 방안을 제시해주세요:\n{metrics}',
  ],
  creative: [
    '다음 키워드를 활용한 창작 스토리를 작성해주세요: {keywords}\n\n장르: {genre}\n분위기: {mood}\n분량: {length}',
    '{topic}에 대한 시(또는 노래 가사)를 작성해주세요. {mood} 분위기로 작성해주세요.',
    '다음 캐릭터에 대한 설정을 작성해주세요:\n이름: {name}\n배경: {background}\n성격: {personality}\n목표: {goal}',
    '{setting}을 배경으로 한 SF 단편 소설의 시작 부분을 작성해주세요.',
    '다음 브랜드의 슬로건과 캠페인 문구를 작성해주세요:\n브랜드: {brand}\n타겟: {target}\n가치관: {values}',
  ],
};

const PROMPT_TEMPLATES_EN: Record<PromptCategory, string[]> = {
  writing: [
    'Write a professional and detailed article on the following topic: {topic}\n\nTarget audience: {audience}\nPurpose: {purpose}\nLength: {length}',
    'Write a comparative analysis of {topic}. Cover pros and cons in a balanced way and include real examples.',
    'Write an FAQ-style article about {topic}. Include at least 10 questions and answers.',
    'Write an article that organizes the history, present, and future of {topic} by era.',
    'Write an article in the form of an expert interview about {topic}. Use a question-and-answer format.',
  ],
  coding: [
    'Implement a {feature} feature in {language}. It must meet the following requirements:\n- {requirement1}\n- {requirement2}\n\nInclude comments in the code.',
    'Review the following {language} code and suggest improvements:\n```\n{code}\n```\n\nAnalyze it from security, performance, and readability perspectives.',
    'Write unit tests for {feature} in {language}. Include boundary-value tests and exception handling.',
    'Explain how to optimize the performance of {feature} in {language}, and provide code examples.',
    'Implement {feature} in {language}, applying SOLID principles and design patterns.',
  ],
  analysis: [
    'Analyze the following data and derive insights:\n{data}\n\nSummarize the three key findings.',
    'Write a market analysis report on {topic}. Include the following:\n- Market size and growth rate\n- Key competitors\n- SWOT analysis\n- Future outlook',
    'Analyze user reviews of the following product/service and classify positive/negative feedback:\n{reviews}',
    'Analyze the A/B test results for {topic} and assess statistical significance.',
    'Analyze the following business metrics and suggest improvements:\n{metrics}',
  ],
  creative: [
    'Write a creative story using the following keywords: {keywords}\n\nGenre: {genre}\nMood: {mood}\nLength: {length}',
    'Write a poem (or song lyrics) about {topic}. Use a {mood} mood.',
    'Write a character profile for the following:\nName: {name}\nBackground: {background}\nPersonality: {personality}\nGoal: {goal}',
    'Write the opening of a science-fiction short story set in {setting}.',
    'Write a slogan and campaign copy for the following brand:\nBrand: {brand}\nTarget: {target}\nValues: {values}',
  ],
};

const FILLS_KO: Record<string, string> = {
  topic: '인공지능의 발전과 사회적 영향',
  audience: '일반 대중',
  purpose: '정보 전달 및 인사이트 제공',
  length: '2000자 내외',
  language: 'Python',
  feature: '사용자 인증 시스템',
  requirement1: 'JWT 토큰 기반 인증',
  requirement2: '비밀번호 해싱 (bcrypt)',
  code: 'function example() {\n  // code here\n}',
  data: '월별 매출: 1월 1000만원, 2월 1200만원, 3월 900만원',
  reviews: '좋았어요! 품질이 뛰어납니다.\n배송이 너무 늦었어요.\n가성비가 좋습니다.',
  metrics: '전환율: 2.5%, 이탈률: 45%, 평균 세션 시간: 3분',
  keywords: '우주, 시간, 외로움, 희망',
  genre: 'SF',
  mood: '몽환적이고 서정적인',
  name: '아라',
  background: '2150년 화성 식민지 출신',
  personality: '호기심이 많고 조용한 성격',
  goal: '지구로의 귀환',
  setting: '2150년 화성 식민지',
  brand: '테크노바',
  target: '20-30대 IT 전문가',
  values: '혁신, 효율성, 지속가능성',
};

const FILLS_EN: Record<string, string> = {
  topic: 'The development of AI and its social impact',
  audience: 'General public',
  purpose: 'Information sharing and insights',
  length: 'Around 2000 characters',
  language: 'Python',
  feature: 'User authentication system',
  requirement1: 'JWT token-based authentication',
  requirement2: 'Password hashing (bcrypt)',
  code: 'function example() {\n  // code here\n}',
  data: 'Monthly revenue: Jan 10M KRW, Feb 12M KRW, Mar 9M KRW',
  reviews: 'Great! Excellent quality.\nDelivery was too slow.\nGood value for money.',
  metrics: 'Conversion rate: 2.5%, Churn rate: 45%, Avg session time: 3 min',
  keywords: 'Space, time, loneliness, hope',
  genre: 'Sci-Fi',
  mood: 'Dreamy and lyrical',
  name: 'Ara',
  background: 'From a 2150 Mars colony',
  personality: 'Curious and quiet',
  goal: 'Return to Earth',
  setting: 'A Mars colony in 2150',
  brand: 'Technova',
  target: 'IT professionals in their 20s-30s',
  values: 'Innovation, efficiency, sustainability',
};

const DETAIL_LEVELS = ['기본', '상세', '매우 상세'];

function generatePrompts(category: PromptCategory, detailLevel: string, templates: Record<PromptCategory, string[]>): string[] {
  const tmpls = templates[category];
  const count = detailLevel === '기본' ? 2 : detailLevel === '상세' ? 4 : 6;
  return tmpls.slice(0, count);
}

function fillTemplate(template: string, fills: Record<string, string>): string {
  let result = template;
  Object.entries(fills).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  });
  return result;
}

interface InfoSection {
  calculatorDescription: React.ReactNode;
  calculationFormula: React.ReactNode;
  containerSpecifications?: React.ReactNode;
  usefulTips: React.ReactNode;
}

interface PromptGeneratorProps {
  infoSection: InfoSection;
}

const PromptGenerator = ({ infoSection }: PromptGeneratorProps) => {
  const { dict, locale } = useI18n();
  const t = dict.promptGenerator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);
  const [category, setCategory] = useState<PromptCategory>('writing');
  const [detailLevel, setDetailLevel] = useState('상세');
  const [prompts, setPrompts] = useState<string[]>([]);

  const generate = () => {
    const templates = isKo ? PROMPT_TEMPLATES_KO : PROMPT_TEMPLATES_EN;
    const fills = isKo ? FILLS_KO : FILLS_EN;
    const tmpls = generatePrompts(category, detailLevel, templates);
    setPrompts(tmpls.map(tmpl => fillTemplate(tmpl, fills)));
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(prompts.join('\n\n---\n\n'));
  };

  const CATEGORY_KEYS: Record<PromptCategory, string> = {
    writing: t.writing,
    coding: t.coding,
    analysis: t.analysis,
    creative: t.creative,
  };

  const DETAIL_MAP: Record<string, string> = {
    '기본': t.basic,
    '상세': t.detailed,
    '매우 상세': t.veryDetailed,
  };

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.categoryLabel}</label>
        <Select value={category} onValueChange={(v) => setCategory(v as PromptCategory)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="writing">{t.writing}</SelectItem>
            <SelectItem value="coding">{t.coding}</SelectItem>
            <SelectItem value="analysis">{t.analysis}</SelectItem>
            <SelectItem value="creative">{t.creative}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.detailLabel}</label>
        <Select value={detailLevel} onValueChange={setDetailLevel}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DETAIL_LEVELS.map(level => (
              <SelectItem key={level} value={level}>{DETAIL_MAP[level] || level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={generate} className="w-full">{t.button}</Button>
    </div>
  );

  const resultSection = prompts.length > 0 ? (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={copyAll} className="w-full">{t.copyAllButton}</Button>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {prompts.map((prompt, i) => (
          <div key={i} className="p-3 bg-background border border-border rounded-lg">
            <div className="flex justify-between items-start gap-2">
              <pre className="text-xs whitespace-pre-wrap flex-1 font-sans">{prompt}</pre>
              <Button variant="ghost" size="sm" onClick={() => copyPrompt(prompt)} className="shrink-0">{t.copyButton}</Button>
            </div>
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

export default PromptGenerator;
