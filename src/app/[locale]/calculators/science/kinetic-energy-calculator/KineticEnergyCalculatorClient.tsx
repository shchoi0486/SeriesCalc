'use client';

import React, { useState } from 'react';
import CalculatorsLayout from '@/components/calculators/Calculatorslayout';
import TermGlossary from '@/components/calculators/TermGlossary';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/i18n/I18nProvider';
import { BlockMath } from "react-katex";
import { toast } from 'sonner';
import FaqItem from '@/components/calculators/FaqItem';

const KineticEnergyCalculator = () => {
  const { dict, locale } = useI18n();
  const t = dict.kineticEnergyCalculator;
  const isKo = locale === 'ko';
  const L = (ko: string, en: string) => (isKo ? ko : en);

  const [calculationType, setCalculationType] = useState('linear');
  const [mass, setMass] = useState<number | ''>('');
  const [velocity, setVelocity] = useState<number | ''>('');
  const [momentOfInertia, setMomentOfInertia] = useState<number | ''>('');
  const [angularVelocity, setAngularVelocity] = useState<number | ''>('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let ke;
    if (calculationType === 'linear') {
      if (mass === '' || velocity === '') {
        toast.error(t.placeholder);
        return;
      }
      ke = 0.5 * Number(mass) * Math.pow(Number(velocity), 2);
    } else {
      if (momentOfInertia === '' || angularVelocity === '') {
        toast.error(t.placeholder);
        return;
      }
      ke = 0.5 * Number(momentOfInertia) * Math.pow(Number(angularVelocity), 2);
    }
    setResult({ kineticEnergy: ke });
  };

  const inputSection = (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setCalculationType('linear')}
          variant={calculationType === 'linear' ? 'default' : 'outline'}
          className="flex-1"
        >
          {t.linearMotion}
        </Button>
        <Button
          onClick={() => setCalculationType('rotational')}
          variant={calculationType === 'rotational' ? 'default' : 'outline'}
          className="flex-1"
        >
          {t.rotationalMotion}
        </Button>
      </div>

      {calculationType === 'linear' ? (
        <>
          <div className="space-y-2">
            <label htmlFor="mass" className="text-sm font-medium">{t.inputMass}</label>
            <Input
              id="mass"
              type="number"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              placeholder={isKo ? '예: 10' : 'e.g. 10'}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="velocity" className="text-sm font-medium">{t.inputVelocity}</label>
            <Input
              id="velocity"
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              placeholder={isKo ? '예: 5' : 'e.g. 5'}
            />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label htmlFor="momentOfInertia" className="text-sm font-medium">{t.inputMomentOfInertia}</label>
            <Input
              id="momentOfInertia"
              type="number"
              value={momentOfInertia}
              onChange={(e) => setMomentOfInertia(Number(e.target.value))}
              placeholder={isKo ? '예: 0.5' : 'e.g. 0.5'}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="angularVelocity" className="text-sm font-medium">{t.inputAngularVelocity}</label>
            <Input
              id="angularVelocity"
              type="number"
              value={angularVelocity}
              onChange={(e) => setAngularVelocity(Number(e.target.value))}
              placeholder={isKo ? '예: 10' : 'e.g. 10'}
            />
          </div>
        </>
      )}
      <Button onClick={calculate} className="w-full">
        {t.calculateBtn}
      </Button>
    </div>
  );

  const resultSection = result ? (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-lg text-muted-foreground">{t.resultLabel}</p>
      <div className="flex items-baseline my-4">
        <span className="text-6xl font-bold tracking-tight">
          {result.kineticEnergy.toLocaleString(undefined, { maximumFractionDigits: 4 })}
        </span>
        <span className="text-2xl font-medium text-muted-foreground ml-2">J</span>
      </div>
      <div className="bg-muted rounded-lg p-4 w-full">
        <p className="text-sm text-muted-foreground mb-2">{t.inputValues}</p>
        <div className="text-sm space-y-1">
          {calculationType === 'linear' ? (
            <>
              <div className="flex justify-between">
                <span>{t.inputMass}:</span>
                <span className="font-medium">{mass} kg</span>
              </div>
              <div className="flex justify-between">
                <span>{t.inputVelocity}:</span>
                <span className="font-medium">{velocity} m/s</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span>{t.inputMomentOfInertia}:</span>
                <span className="font-medium">{momentOfInertia} kg·m²</span>
              </div>
              <div className="flex justify-between">
                <span>{t.inputAngularVelocity}:</span>
                <span className="font-medium">{angularVelocity} rad/s</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center text-muted-foreground h-full">
      {t.placeholder}
    </div>
  );

const infoSection = {
  calculatorDescription: (
    <div className="space-y-4">
      <p>
        <strong>{L('운동 에너지(Kinetic Energy) 계산기', 'Kinetic Energy Calculator')}</strong>{L('는 물체가 운동함으로써 가지게 되는 에너지를 정확하게 계산하는 물리학 도구입니다. 정지해 있는 물체는 운동 에너지가 0이지만, 움직이기 시작하는 순간부터 운동 에너지를 갖게 되며, 이 에너지는 물체의 질량과 속도에 의해 결정됩니다.', ' is a physics tool that accurately calculates the energy an object has by virtue of its motion. A stationary object has zero kinetic energy, but the moment it starts moving it gains kinetic energy, which is determined by the object’s mass and velocity.')}
      </p>
      <p>
        <strong>{L('운동 에너지의 핵심 특징', 'Key feature of kinetic energy')}</strong>{L('은 속도의 제곱에 비례한다는 것입니다. 속도가 2배 빨라지면 운동 에너지는 4배, 3배 빨라지면 9배로 기하급수적으로 증가합니다. 이것이 과속 운전이 위험한 이유이며, 충돌 시 파괴력이 커지는 원리입니다.', ' is that it is proportional to the square of velocity. Doubling the speed makes the kinetic energy four times larger, and tripling it makes it nine times larger — exponentially. This is why speeding is dangerous and why collision damage increases.')}
      </p>
      <p>
        {L('본 계산기는 두 가지 주요 유형의 운동 에너지를 계산할 수 있도록 설계되었습니다. ', 'This calculator is designed to compute two main types of kinetic energy. ')}<strong>{L('병진 운동 에너지', 'Translational kinetic energy')}</strong>{L('는 물체가 한 지점에서 다른 지점으로 이동할 때의 에너지이며, ', ' is the energy of an object moving from one point to another, and ')}<strong>{L('회전 운동 에너지', 'rotational kinetic energy')}</strong>{L('는 물체가 특정 축을 중심으로 회전할 때의 에너지입니다.', ' is the energy of an object rotating about a specific axis.')}
      </p>
      <p className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
        {L('이 계산기는 학생들에게 에너지 보존 법칙을 이해시키는 교육 도구로서, 엔지니어들에게는 기계 시스템 설계, 차량 충돌 분석, 스포츠 과학 연구 등에서 정확한 에너지 데이터를 제공하는 실용적인 도구로 활용됩니다.', 'This calculator serves as an educational tool that helps students understand the law of conservation of energy, and as a practical tool that gives engineers accurate energy data for machine system design, vehicle crash analysis, and sports science research.')}
      </p>
      <TermGlossary items={[
        { term: L('운동 에너지', 'Kinetic Energy'), desc: L('물체가 운동함으로써 가지는 에너지로, 질량과 속도의 제곱에 비례하며 단위는 줄(J)입니다.', 'The energy an object has due to motion; proportional to mass and the square of velocity, with unit joule (J).') },
        { term: L('관성 모멘트', 'Moment of Inertia'), desc: L('회전 운동에서 질량이 회전축으로부터 얼마나 멀리 분포했는지를 나타내는 값으로, 단위는 kg·m²입니다.', 'In rotational motion, how far the mass is distributed from the rotation axis; unit kg·m².') },
        { term: L('각속도', 'Angular Velocity'), desc: L('회전하는 물체가 단위 시간당 회전하는 각도로, 단위는 rad/s입니다.', 'The angle a rotating object turns per unit time, with unit rad/s.') },
      ]} />
    </div>
  ),
  calculationFormula: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-green-500 pl-3">{L('선형(병진) 운동 에너지 계산 공식', 'Linear (Translational) Kinetic Energy Formula')}</h4>
        <div className="p-4 bg-muted rounded-lg">
          <BlockMath math="KE = \tfrac{1}{2} m v^{2}" />
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          <li><strong className="font-semibold">KE</strong>: {L('운동 에너지, 단위는 줄(Joule, J)', 'kinetic energy, unit joule (J)')}</li>
          <li><strong className="font-semibold">m</strong>: {L('물체의 질량, 단위는 킬로그램(kg)', 'object mass, unit kilogram (kg)')}</li>
          <li><strong className="font-semibold">v</strong>: {L('물체의 속도, 단위는 미터 매 초(m/s)', 'object velocity, unit meters per second (m/s)')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-purple-500 pl-3">{L('회전 운동 에너지 계산 공식', 'Rotational Kinetic Energy Formula')}</h4>
        <div className="p-4 bg-muted rounded-lg">
          <BlockMath math="KE = \tfrac{1}{2} I \omega^{2}" />
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          <li><strong className="font-semibold">I</strong>: {L('관성 모멘트, 단위는 kg·m²', 'moment of inertia, unit kg·m²')}</li>
          <li><strong className="font-semibold">ω</strong>: {L('각속도, 단위는 라디안 매 초(rad/s)', 'angular velocity, unit radian per second (rad/s)')}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('계산 예시', 'Example')}</h4>
        <p>{L('질량 2kg인 공이 10m/s로 움직일 때의 운동 에너지는?', 'What is the kinetic energy of a 2 kg ball moving at 10 m/s?')}</p>
        <div className="my-2 p-3 bg-muted rounded-lg">
          <BlockMath math="KE = \tfrac{1}{2} \times 2\,\text{kg} \times (10\,\text{m/s})^2 = 100\,\text{J}" />
        </div>
        <p>{L('따라서 운동 에너지는 100줄(J)입니다.', 'Therefore the kinetic energy is 100 joules (J).')}</p>
      </div>
    </div>
  ),
  usefulTips: (
    <div className="space-y-6">
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('일-에너지 정리', 'Work-Energy Theorem')}</h4>
        <p>
          {L('물체에 가해진 총 일의 양은 물체의 운동 에너지 변화량과 같습니다. 양의 일을 하면 운동 에너지가 증가하고, 음의 일을 하면 감소합니다.', 'The total work done on an object equals the change in its kinetic energy. Positive work increases kinetic energy; negative work decreases it.')}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3">{L('실생활 적용 사례', 'Real-Life Applications')}</h4>
        <ul className="space-y-3">
          <li className="p-3 border-l-4 border-primary bg-muted rounded-lg">
            <p className="font-semibold text-sm">{L('교통 및 안전', 'Traffic and Safety')}</p>
            <p className="text-xs mt-1">
              {L('속도가 2배가 되면 운동 에너지는 4배가 됩니다. 제동 거리와 충돌 파괴력이 4배로 늘어나며, 이는 안전 테스트의 기초가 됩니다.', 'Doubling the speed makes kinetic energy four times larger. Braking distance and collision damage increase fourfold, which is the basis of safety testing.')}
            </p>
          </li>
          <li className="p-3 border-l-4 border-primary bg-muted rounded-lg">
            <p className="font-semibold text-sm">{L('스포츠 과학', 'Sports Science')}</p>
            <p className="text-xs mt-1">
              {L('골프 스윙, 테니스 서브, 축구 킥 모두 운동 에너지의 원리를 활용하며, 효율적인 에너지 전달이 경기력 향상의 핵심입니다.', 'Golf swings, tennis serves, and soccer kicks all use the principle of kinetic energy; efficient energy transfer is key to performance.')}
            </p>
          </li>
          <li className="p-3 border-l-4 border-primary bg-muted rounded-lg">
            <p className="font-semibold text-sm">{L('재생 에너지', 'Renewable Energy')}</p>
            <p className="text-xs mt-1">
              {L('풍력, 수력, 파력 발전기는 자연의 운동 에너지를 전기 에너지로 변환하는 기술입니다.', 'Wind, hydro, and wave power generators convert natural kinetic energy into electrical energy.')}
            </p>
          </li>
        </ul>
      </div>
      <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200 rounded-r-lg">
        <p className="font-bold text-sm">⚠️ {L('상대성 이론', 'Theory of Relativity')}</p>
        <p className="text-xs mt-1">
          {L('본 공식(KE = ½mv²)은 고전 역학의 공식으로, 속도가 빛의 속도에 비해 매우 느릴 때 유효합니다. 상대론적 속도에서는 아인슈타인의 특수 상대성 이론을 사용해야 합니다.', 'The formula KE = ½mv² is classical mechanics and valid when speed is much lower than the speed of light. At relativistic speeds, Einstein’s special relativity must be used.')}
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-2 border-l-4 border-teal-500 pl-3">{L('에너지 보존 법칙', 'Law of Conservation of Energy')}</h4>
        <p>{L('에너지는 형태가 변할 뿐 창조되거나 소멸되지 않습니다.', 'Energy changes form but is neither created nor destroyed.')}</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{L('위치 → 운동:', 'Potential → kinetic:')}</strong> {L('낙하하는 물체의 위치 에너지가 운동 에너지로 변환', 'a falling object’s potential energy converts to kinetic energy')}</li>
          <li><strong>{L('운동 → 열:', 'Kinetic → heat:')}</strong> {L('마찰에 의한 운동 에너지의 열에너지 변환', 'kinetic energy converts to heat via friction')}</li>
          <li><strong>{L('운동 → 탄성:', 'Kinetic → elastic:')}</strong> {L('스프링에 의해 저장되는 운동 에너지', 'kinetic energy stored by a spring')}</li>
        </ul>
      </div>
    </div>
  ),
  howToUse: (
    <ol className="space-y-3 text-sm list-decimal list-inside">
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('질량 입력', 'Enter mass')}</span>{L(' → 물체의 질량을 kg 단위로 입력합니다.', ' → Enter the object’s mass in kilograms (kg).')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('속도 입력', 'Enter velocity')}</span>{L(' → 물체의 속도를 m/s 단위로 입력합니다.', ' → Enter the velocity in meters per second (m/s).')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('계산', 'Calculate')}</span>{L(' → 계산 버튼을 클릭합니다.', ' → Click the Calculate button.')}</li>
      <li className="p-3 bg-muted rounded-lg"><span className="font-semibold">{L('결과 확인', 'View result')}</span>{L(' → 운동 에너지 값을 줄(J) 단위로 확인합니다.', ' → Check the kinetic energy in joules (J).')}</li>
    </ol>
  ),
  workedExamples: (
    <div className="space-y-3 text-sm">
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">2kg 물체, 3m/s</p>
        <p className="text-muted-foreground mt-1">KE = ½ × 2kg × (3m/s)² = 9J</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">{L('자동차 (1000kg, 20m/s)', 'Car (1000 kg, 20 m/s)')}</p>
        <p className="text-muted-foreground mt-1">KE = ½ × 1000kg × (20m/s)² = 200,000J (200kJ)</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-semibold">{L('야구공 (0.05kg, 40m/s)', 'Baseball (0.05 kg, 40 m/s)')}</p>
        <p className="text-muted-foreground mt-1">KE = ½ × 0.05kg × (40m/s)² = 40J</p>
      </div>
    </div>
  ),
  faq: (
    <div className="space-y-4">
      {[
        { q: L('운동 에너지 공식이 왜 ½mv²인가요?', 'Why is the kinetic energy formula ½mv²?'), a: L('½mv²은 물체를 정지 상태에서 속도 v까지 가속하는 데 필요한 일(힘 × 이동 거리)에서 유도됩니다. 일의 결과가 에너지로 저장되므로 계수 ½이 붙습니다.', 'The formula ½mv² is derived from the work (force × distance) needed to accelerate an object from rest to velocity v. That work is stored as energy, which is why the ½ coefficient appears.') },
        { q: L('왜 속도가 제곱되나요?', 'Why is velocity squared?'), a: L('속도가 제곱되므로 속도가 2배가 되면 운동 에너지는 4배로 증가합니다. 이것이 과속 운전 시 제동 거리와 충돌 파괴력이 급격히 커지는 이유입니다.', 'Because velocity is squared, doubling the speed quadruples the kinetic energy. This is why braking distance and collision damage rise sharply with speeding.') },
        { q: L('줄(J)은 무엇을 의미하나요?', 'What does the joule (J) mean?'), a: L('줄(J)은 에너지와 일의 국제 표준 단위로, 1J은 1N의 힘으로 물체를 1m 이동시키는 데 필요한 에너지입니다.', 'The joule (J) is the international standard unit of energy and work. One joule is the energy needed to move an object 1 meter with a force of 1 newton.') },
        { q: L('운동 에너지와 운동량의 차이는 무엇인가요?', 'What is the difference between kinetic energy and momentum?'), a: L('운동량(p = mv)은 속도에 비례하고 방향을 가진 벡터량입니다. 운동 에너지(KE = ½mv²)는 속도의 제곱에 비례하고 방향이 없는 스칼라량입니다.', 'Momentum (p = mv) is a vector quantity proportional to velocity and has direction. Kinetic energy (KE = ½mv²) is a scalar quantity proportional to the square of velocity with no direction.') },
        { q: L('질량과 속도 중 무엇이 운동 에너지에 더 큰 영향을 주나요?', 'Which affects kinetic energy more, mass or velocity?'), a: L('속도가 더 큰 영향을 줍니다. 속도가 2배가 되면 운동 에너지는 4배가 되지만, 질량이 2배가 되면 운동 에너지는 2배만 됩니다.', 'Velocity has a larger impact. Doubling the velocity quadruples the kinetic energy, whereas doubling the mass only doubles it.') },
      ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
    </div>
  ),
};

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

export default KineticEnergyCalculator;
